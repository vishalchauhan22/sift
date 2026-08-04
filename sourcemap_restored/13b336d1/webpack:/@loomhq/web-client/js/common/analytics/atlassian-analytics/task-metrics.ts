import { selectFromCurrentUserCache } from '@js/common/current-user';
import { getAtlassianAnalyticsClient } from './get-analytics-client';
import { getVideoIdFromCurrentUrl } from './utilities/getVideoIdFromCurrentUrl';
import { incrementMetric } from '@js/utilities/metrics';
import * as loggerx from '@js/utilities/loggerx';

/** VitalStats-compatible Health Metric Types.
 * See https://hello.atlassian.net/wiki/spaces/VSTATS/pages/883578082/Instrumentation+Principles+-+VitalStats for more details.
 **/

/**
 * When a user has committed to performing an action, a taskStart metric _must_ be sent.
 * When the action is completed, it must be one of 3 possible resulting actions:
 * - taskSuccess: The action was completed successfully.
 * - taskFail: The action failed with an unexpected error.
 * - taskAbort: The action was aborted by the user or encountered an unexpected error (eg. loading a transcript for a video with no audio).
 */
type TaskAction = 'taskStart' | 'taskAbort' | 'taskFail' | 'taskSuccess';

/**
 * A task name is a string in the format of `verb-noun`.
 */
type Verb = string;
type Noun = string;
export type TaskName = `${Verb}-${Noun}`;

/**
 * A branded type representing a unique identifier for a single health metric task. It is returned
 * by the `sendHealthMetric` function when a taskStart event is sent, and should be passed into the subsequent completion events.
 */
export type TaskId = string & { __brand: 'TaskId' };

// Using same implementation as trello here: https://bitbucket.org/trello/web/src/75ad40e33946db2ed72dd84dcad531a813472922/packages/atlassian-analytics/src/AnalyticsClient.ts#lines-320
const generateRandomTraceId = (): string => {
  // Generates 64 bit string
  // Taken from openzipkin/zipkin-js
  // https://github.com/openzipkin/zipkin-js/blob/50d9c3afb662c2d18d688ecef66883d6c5326f4b/packages/zipkin/src/tracer/randomTraceId.js
  const digits = '0123456789abcdef';
  let n = '';
  for (let i = 0; i < 16; i += 1) {
    const rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
};

const generateTaskId = (): TaskId => {
  // Return 128 bit trace ids (32 hexadecimal digits)
  // https://github.com/openzipkin/zipkin-js/blob/98f7796d54199ccb2a81dea04c466a40814ccb24/packages/zipkin/src/tracer/index.js#L77
  // but support B3 single format with fist 32 bits (8 digits) as epoch seconds
  // https://github.com/openzipkin/b3-propagation/blob/master/STATUS.md#epoch128
  const epochSeconds = Math.floor(Date.now() / 1000).toString(16);
  const remainingBits =
    generateRandomTraceId().slice(8) + generateRandomTraceId();

  return (epochSeconds + remainingBits) as TaskId;
};

/**
 * A sessionId is a unique identifier for a single page load.
 */
const sessionId = generateRandomTraceId();

type TaskPayload = {
  action: TaskAction;
  actionSubject: 'ui';
  source: string;
  attributes: {
    task: TaskName;
    taskId: TaskId;
    sessionId: string;
    videoId?: string | null;
    userId?: number | null;
    workspaceId?: string | null;
  };
};

type Identifiers = {
  videoId?: string | null;
  userId?: number | null;
  workspaceId?: string | null;
};

const getIdentifiers = (providedIdentifiers: Identifiers): Identifiers => {
  const defaultVideoId = getVideoIdFromCurrentUrl();
  const defaultUserId = selectFromCurrentUserCache(user => user.id, null);
  const memberships = selectFromCurrentUserCache(
    user => user.memberships,
    null
  );
  const selectedWorkspaceId = memberships?.find(
    membership => membership.isSelected
  )?.organization.id;
  const userDefaultWorkspaceId = selectFromCurrentUserCache(
    user => user.defaultWorkspaceId,
    null
  );
  const defaultWorkspaceId = selectedWorkspaceId ?? userDefaultWorkspaceId;

  return {
    videoId: providedIdentifiers.videoId ?? defaultVideoId,
    userId: providedIdentifiers.userId ?? defaultUserId,
    workspaceId: providedIdentifiers.workspaceId ?? defaultWorkspaceId,
  };
};

type GetTaskPayloadArgs = Identifiers & {
  action: TaskAction;
  task: TaskName;
  source: string;
  taskId: TaskId;
};

const getTaskPayload = ({
  action,
  task,
  taskId,
  source,
  videoId,
  userId,
  workspaceId,
}: GetTaskPayloadArgs): TaskPayload => {
  return {
    action,
    actionSubject: 'ui',
    source,
    attributes: {
      task,
      taskId,
      videoId,
      userId,
      workspaceId,
      sessionId,
    },
  };
};

const sendEvent = (payload: TaskPayload): void => {
  const analyticsClient = getAtlassianAnalyticsClient();
  // Increment metric in datadog (with no additional tags/context)
  const metricName = `${payload.source}.${payload.attributes.task}.${payload.action}`;
  incrementMetric(metricName);

  // Send log to datadog (with all additional tags/context)
  loggerx.info(metricName, payload);

  // Send event to atlassian analytics (with all additional tags/context)
  analyticsClient.sendOperationalEvent(payload);
};

type TaskStartArgs = Identifiers & {
  task: TaskName;
  source: string;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task was started.
 * The taskId is generated and returned.
 * This taskId should be passed into the subsequent completion events.
 */
export const taskStart = (args: TaskStartArgs): TaskId => {
  const { task, source } = args;
  const { videoId, userId, workspaceId } = getIdentifiers(args);
  const taskId = generateTaskId();

  const payload = getTaskPayload({
    action: 'taskStart',
    task,
    taskId,
    source,
    videoId,
    userId,
    workspaceId,
  });

  sendEvent(payload);

  return taskId;
};

type TaskSuccessArgs = Identifiers & {
  task: TaskName;
  taskId: TaskId;
  source: string;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task was completed successfully.
 * A successful task is one that was completed without any errors.
 * The taskId is required, and should be obtained from the taskStart function.
 */
export const taskSuccess = (args: TaskSuccessArgs): void => {
  const { task, source, taskId } = args;
  const { videoId, userId, workspaceId } = getIdentifiers(args);

  const payload = getTaskPayload({
    action: 'taskSuccess',
    task,
    taskId,
    source,
    videoId,
    userId,
    workspaceId,
  });

  sendEvent(payload);
};

type TaskFailArgs = Identifiers & {
  task: TaskName;
  taskId: TaskId;
  source: string;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task failed.
 * A failed task is one that was completed with an unexpected error.
 * The taskId is required, and should be obtained from the taskStart function.
 */
export const taskFail = (args: TaskFailArgs): void => {
  const { task, source, taskId } = args;
  const { videoId, userId, workspaceId } = getIdentifiers(args);

  const payload = getTaskPayload({
    action: 'taskFail',
    task,
    taskId,
    source,
    videoId,
    userId,
    workspaceId,
  });

  sendEvent(payload);
};

type TaskAbortArgs = Identifiers & {
  task: TaskName;
  taskId: TaskId;
  source: string;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task was aborted.
 * An aborted task is one that was manually cancelled by the user, or encountered an expected error (eg. loading a transcript for a video with no audio).
 * The taskId is required, and should be obtained from the taskStart function.
 */
export const taskAbort = (args: TaskAbortArgs): void => {
  const { task, source, taskId } = args;
  const { videoId, userId, workspaceId } = getIdentifiers(args);

  const payload = getTaskPayload({
    action: 'taskAbort',
    task,
    taskId,
    source,
    videoId,
    userId,
    workspaceId,
  });

  sendEvent(payload);
};
