import { LoggedInOnly } from '@js/common/current-user';
import { useSetPlayerTime, useVideoContext } from '@js/common/video-player';
import { useClipboard } from '@js/hooks/useClipboard';
import { useDeleteTask } from '@js/pages/share/comments/common/comments-header/tasks/hooks/useDeleteTask';
import { PostBodyFreshEmbed } from '@js/pages/share/comments/common/grouped-comments/comment-thread/comment-post/PostBodyFreshEmbed';
import { getFormattedDateForHeader } from '@js/pages/share/comments/common/helpers';
import React, { useState } from 'react';

import { Text, Arrange, Container, ErrorContainer } from '@loomhq/lens';

import { timeUtils } from '@loomhq/shared-utilities';
import { VIDEO_TASK_ID_QUERY_PARAM } from '@loomhq/shared-utilities/constants/mention';
import { VideoTask } from '@js/globalTypes.generated';

import * as analytics from '@js/utilities/analytics';
import { getShareVideoUrl } from '@js/utilities/video';

import { TASK_DISCARDED } from '../constants/events';
import { CheckIcon } from './CheckIcon';
import styles from './Task.module.less';
import { TaskButtonGroup } from './TaskButtonGroup';
import { TaskInput } from './TaskInput';
import { TaskOnHoverButtons } from './TaskOnHoverButtons';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const { secondsToVideoTS } = timeUtils;

export const Task = ({
  task,
  isSuggested = false,
}: {
  task: VideoTask;
  isSuggested: boolean;
}): JSX.Element => {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const literalTS = secondsToVideoTS(task.time_stamp);

  const {
    video: { id: videoId, currentUserCanEdit = false },
  } = useVideoContext();
  const showEditIcon = currentUserCanEdit;
  const showDeleteIcon = !isSuggested && currentUserCanEdit;
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const username = task.owner?.display_name;

  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const taskInputRef = React.useRef<HTMLTextAreaElement>(null);

  const setPlayerTime = useSetPlayerTime({
    videoId,
  });

  const onEditClick = () => {
    // set the video player to be on the task's timestamp
    setPlayerTime(task.time_stamp);

    setIsEditing(true);
  };

  const [deleteTask, { loading: loadingDelete }] = useDeleteTask(
    task,
    setErrorMessage
  );

  const onDeleteClick = () => {
    deleteTask();

    analytics.track(TASK_DISCARDED, {
      ...withIdentifiers(
        TASK_DISCARDED,
        AnalyticsEntityId.video(task.video_id, 'video_id'),
        AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
      ),
      target: 'approved task',
      source: task.source,
    });
  };

  const url = getShareVideoUrl(task.video_id);
  let urlToTask = url.concat('?', VIDEO_TASK_ID_QUERY_PARAM, '=', task.id);

  if (typeof task.time_stamp === 'number') {
    urlToTask = urlToTask.concat('&t=', String(task.time_stamp));
  }

  const [isLinkCopied, setIsLinkCopied] = useClipboard(urlToTask, {
    successDuration: 2000,
  });

  const onCopyLinkClick = () => {
    setIsLinkCopied();
  };

  if (isEditing) {
    return (
      <TaskInput
        task={task}
        onClose={() => setIsEditing(false)}
        taskInputRef={taskInputRef}
        isSuggested={isSuggested}
        setErrorMessage={setErrorMessage}
      />
    );
  }

  return (
    <Container
      id={`sidebar-video-task-${task.id}`}
      className={styles.taskContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      padding={isSuggested ? 'small' : ''}
      marginX={isSuggested ? 'calc(-1 * var(--lns-space-small))' : ''}
    >
      <ErrorContainer
        errorActive={Boolean(errorMessage)}
        errorMessage={errorMessage}
      >
        <Arrange autoFlow="column" gap="small" alignItems="start">
          <CheckIcon isSuggested={isSuggested} />
          <Arrange gap="xsmall" autoFlow="row">
            <Arrange gap="small">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
              <div
                onClick={() => setPlayerTime(task.time_stamp)}
                className={styles.timestampWrapper}
              >
                <Text color="primary" fontWeight="bold">
                  {literalTS}
                </Text>
              </div>
              {!isSuggested ? (
                <Text size="body-sm" color="bodyDimmed">
                  {`${getFormattedDateForHeader(task.approved_at, {
                    showShorthand: true,
                  })} ${username ? `by ${username}` : `by video owner`}`}
                </Text>
              ) : null}
            </Arrange>
            <TaskOnHoverButtons
              isHovering={isHovering}
              editButton={{
                show: showEditIcon,
                onClick: onEditClick,
              }}
              deleteButton={{
                show: showDeleteIcon,
                onClick: onDeleteClick,
                isLoading: loadingDelete,
              }}
              copyLinkButton={{
                show: !isSuggested,
                isCopied: isLinkCopied,
                onClick: onCopyLinkClick,
              }}
            />

            <PostBodyFreshEmbed comment={task} />
            <LoggedInOnly>
              <TaskButtonGroup
                task={task}
                isSuggested={isSuggested}
                setErrorMessage={setErrorMessage}
              />
            </LoggedInOnly>
          </Arrange>
        </Arrange>
      </ErrorContainer>
    </Container>
  );
};
