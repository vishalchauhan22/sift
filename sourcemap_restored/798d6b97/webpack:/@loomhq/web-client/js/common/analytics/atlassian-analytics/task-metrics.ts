import { selectFromCurrentUserCache } from '@js/common/current-user';
import { getAtlassianAnalyticsClient } from './get-analytics-client';
import { getVideoIdFromCurrentUrl } from './utilities/getVideoIdFromCurrentUrl';
import { distributionMetric, incrementMetric } from '@js/utilities/metrics';
import * as loggerx from '@js/utilities/loggerx';
import { FeatureNames } from '@loomhq/shared-utilities';
import {
  GasIdentifiers,
  TaskId as TaskIdType,
  TaskName,
  SendGasEventArgs,
  SendLogArgs,
  SendIncrementMetricArgs,
  SendDistributionMetricArgs,
} from '@loomhq/shared-utilities/utilities/task-metrics/types';
import {
  generateRandomTraceId,
  sendStartEvent,
  sendSuccessEvent,
  sendFailEvent,
  sendAbortEvent,
} from '@loomhq/shared-utilities/utilities/task-metrics/send-task-metrics';
import { Feature } from '@loomhq/shared-utilities/constants/product';

export type TaskId = TaskIdType;

const DEFAULT_TASK_TIMEOUT_MS = 30000;

/**
 * A sessionId is a unique identifier for a single page load.
 */
const sessionId = generateRandomTraceId();

type ProvidedIdentifiers = {
  videoId?: string | null;
  userId?: number | null;
  workspaceId?: string | null;
};

/**
 * Use web client state to populate default identifiers if not provided.
 */
const getGasIdentifiers = (
  providedIdentifiers: ProvidedIdentifiers
): GasIdentifiers => {
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
    organizationId: providedIdentifiers.workspaceId ?? defaultWorkspaceId,
    sessionId,
  };
};

const sendGasEvent = (args: SendGasEventArgs): void => {
  const analyticsClient = getAtlassianAnalyticsClient();
  analyticsClient
    .sendOperationalEvent(args.payload)
    .then(() => {
      incrementMetric('frontend.atlassian_analytics.send_event.success', {
        eventType: 'operational',
      });
    })
    .catch(error => {
      incrementMetric('frontend.atlassian_analytics.send_event.error', {
        eventType: 'operational',
      });
      loggerx.error(
        error,
        {
          message: 'Error sending Atlassian analytics operational event',
          eventDetails: args.payload,
        },
        { feature: Feature.AtlassianAnalytics }
      );
    });
};

const sendLog = (args: SendLogArgs): void => {
  loggerx.info(args.message, args.tags);
};

const sendIncrementMetric = (args: SendIncrementMetricArgs): void => {
  incrementMetric(args.metricName, args.tags);
};

const sendDistributionMetric = (args: SendDistributionMetricArgs): void => {
  distributionMetric(args.metricName, args.durationMs, args.tags);
};

type TaskStartData = {
  startTimeMs: number;
  startArgs: TaskStartArgs;
};

// In-memory store of task start data that can be correlated with completion events
const taskIdToTaskStartDataMap: Record<TaskId, TaskStartData> = {};

type TaskStartArgs = ProvidedIdentifiers & {
  task: TaskName;
  source: string;
  feature: FeatureNames;
  timeoutMs?: number;
  usePageLoadAsStartTime?: boolean;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task was started.
 * The taskId is generated and returned.
 * This taskId should be passed into the subsequent completion events.
 */
export const taskStart = (args: TaskStartArgs): TaskId => {
  const identifiers = getGasIdentifiers(args);
  const { task, source, feature } = args;
  const taskId = sendStartEvent({
    task,
    source,
    feature,
    identifiers,
    sendGasEvent,
    sendLog,
    sendIncrementMetric,
  });

  // Store the start time
  taskIdToTaskStartDataMap[taskId] = {
    startTimeMs: args.usePageLoadAsStartTime ? 0 : performance.now(),
    startArgs: args,
  };

  // Timeout by failing the task if it hasn't completed within the timeout period
  setTimeout(() => {
    if (taskIdToTaskStartDataMap[taskId]) {
      taskFail({ taskId, failureReason: 'timeout' });
    }
  }, args.timeoutMs ?? DEFAULT_TASK_TIMEOUT_MS);

  // Return the generated taskId to use in the subsequent completion events
  return taskId;
};

type TaskSuccessArgs = {
  taskId: TaskId;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task was completed successfully.
 * The taskId is required, and should be obtained from the taskStart function.
 */
export const taskSuccess = ({ taskId }: TaskSuccessArgs): void => {
  const startData = taskIdToTaskStartDataMap[taskId];
  if (!startData) {
    return;
  }

  const durationMs = performance.now() - startData.startTimeMs;
  const { task, source, feature } = startData.startArgs;
  const identifiers = getGasIdentifiers(startData.startArgs);

  sendSuccessEvent({
    taskId,
    task,
    source,
    feature,
    durationMs,
    identifiers,
    sendGasEvent,
    sendLog,
    sendDistributionMetric,
  });

  delete taskIdToTaskStartDataMap[taskId];
};

type TaskFailArgs = {
  taskId: TaskId;
  failureReason?: 'timeout' | 'error';
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task failed.
 * A failed task is one that was completed with an unexpected error.
 * The taskId is required, and should be obtained from the taskStart function.
 */
export const taskFail = ({
  taskId,
  failureReason = 'error',
}: TaskFailArgs): void => {
  const startData = taskIdToTaskStartDataMap[taskId];
  if (!startData) {
    return;
  }

  const durationMs = performance.now() - startData.startTimeMs;
  const { task, source, feature } = startData.startArgs;
  const identifiers = getGasIdentifiers(startData.startArgs);

  sendFailEvent({
    taskId,
    task,
    source,
    feature,
    durationMs,
    failureReason,
    identifiers,
    sendGasEvent,
    sendLog,
    sendDistributionMetric,
  });

  delete taskIdToTaskStartDataMap[taskId];
};

type TaskAbortArgs = {
  taskId: TaskId;
};

/**
 * Sends a health metric to datadog and GASv3 as an operational event indicating that the task was aborted.
 * An aborted task is one that was manually cancelled by the user, or encountered an expected error (eg. loading a transcript for a video with no audio).
 * The taskId is required, and should be obtained from the taskStart function.
 */
export const taskAbort = ({ taskId }: TaskAbortArgs): void => {
  const startData = taskIdToTaskStartDataMap[taskId];
  if (!startData) {
    return;
  }

  const durationMs = performance.now() - startData.startTimeMs;
  const { task, source, feature } = startData.startArgs;
  const identifiers = getGasIdentifiers(startData.startArgs);

  sendAbortEvent({
    taskId,
    task,
    source,
    feature,
    durationMs,
    identifiers,
    sendGasEvent,
    sendLog,
    sendDistributionMetric,
  });

  delete taskIdToTaskStartDataMap[taskId];
};
