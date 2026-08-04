import cn from 'classnames';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useCurrentTime } from '@js/common/video-player';
import { CommentTextArea } from '@js/pages/share/comments/common/comment-text-area';
import React, { useState } from 'react';

import { Arrange, TextButton, Button, Container } from '@loomhq/lens';

import { timeUtils } from '@loomhq/shared-utilities';

import { VideoTask } from '@js/globalTypes.generated';

import * as analytics from '@js/utilities/analytics';

import { TASK_EDITED, TASK_ACCEPTED } from '../constants/events';

import { useAddTask } from '../hooks/useAddTask';
import { useApproveTask } from '../hooks/useApproveTask';

import { useUpdateTask } from '../hooks/useUpdateTask';
import { CheckIcon } from './CheckIcon';
import styles from './TaskInput.module.less';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const { secondsToVideoTS } = timeUtils;

export const TaskInput = ({
  onClose,
  videoId,
  task = {
    id: '',
    content: '',
    time_stamp: 0,
    video_id: videoId,
  } as VideoTask,
  isSuggested = false,
  isNew = false,
  taskInputRef,
  setErrorMessage,
}: {
  onClose: () => void;
  videoId?: string;
  task?: VideoTask;
  isSuggested?: boolean;
  isNew?: boolean;
  taskInputRef: React.RefObject<HTMLTextAreaElement>;
  setErrorMessage?: (errorMessage: string | undefined) => void;
}): JSX.Element => {
  const [newTaskValue, setNewTaskValue] = useState(task.content || '');
  const [isFocused, setIsFocused] = useState(false);
  const { currentTime } = useCurrentTime(videoId ?? '');

  const roundedCurrentTime = Math.round(currentTime);
  const timestamp = secondsToVideoTS(roundedCurrentTime);

  const saveable = newTaskValue.trim() !== '';

  const [approveTask, { loading: loadingApprove }] = useApproveTask(
    {
      ...task,
      content: newTaskValue.trim(),
      time_stamp: roundedCurrentTime,
    },
    setErrorMessage
  );

  const { password } = useVideoPasswordContext();

  const [addTask, { loading: loadingAdd }] = useAddTask({
    videoId: task.video_id,
    content: newTaskValue.trim(),
    timestamp: roundedCurrentTime,
    setErrorMessage,
    password,
  });

  const [updateTask, { loading: loadingUpdate }] = useUpdateTask(
    {
      ...task,
      content: newTaskValue.trim(),
      time_stamp: roundedCurrentTime,
    },
    setErrorMessage
  );

  const handleConfirm = () => {
    if (!saveable) {
      return;
    }

    setNewTaskValue(newTaskValue.trim());

    if (isNew) {
      addTask();
    } else if (isSuggested) {
      approveTask();
      analytics.track(TASK_EDITED, {
        ...withIdentifiers(
          TASK_EDITED,
          AnalyticsEntityId.video(task.video_id, 'video_id'),
          AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
        ),
        source: task.source,
      });
      analytics.track(TASK_ACCEPTED, {
        ...withIdentifiers(
          TASK_ACCEPTED,
          AnalyticsEntityId.video(task.video_id, 'video_id'),
          AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
        ),
        source: task.source,
      });
    } else {
      updateTask();
      analytics.track(TASK_EDITED, {
        ...withIdentifiers(
          TASK_EDITED,
          AnalyticsEntityId.video(task.video_id, 'video_id'),
          AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
        ),
        source: task.source,
      });
    }

    onClose();
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const el = e.target;

    if (!el) {
      return;
    }

    const end = el.value.length;

    // place cursor at the end
    el.setSelectionRange(end, end);

    setIsFocused(true);
  };

  const onBlur = e => {
    const containerLostFocus = !e.currentTarget.contains(e.relatedTarget);

    // close the input field when focus is lost and no content entered
    if (containerLostFocus && !newTaskValue) {
      onClose();
    }

    setIsFocused(false);

    // if the click event happens on a button outside of the container,
    // go ahead and execute that. If we don't have this check here,
    // the input form simply closes and no click events follow
    if (e?.relatedTarget?.tagName === 'BUTTON') {
      e.relatedTarget.click();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // we don't need to check task.content when creating a new task,
    // thus we have !isNew here.
    if (!isNew && (!task.content || !newTaskValue)) {
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (saveable) {
        handleConfirm();
      }
    }

    if (e.key === 'Escape') {
      onClose();
    }
  };

  // auto focus on the text area
  React.useEffect(() => {
    taskInputRef?.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(styles.editTaskArea, {
        [styles.isFocused]: isFocused,
        [styles.isNewEntryPoint]: isNew,
      })}
      onBlur={onBlur}
    >
      <Arrange
        columns={['auto', '1fr']}
        alignItems="start"
        justifyContent="start"
      >
        <Container className="pt:small">
          <CheckIcon isSuggested={isSuggested} />
        </Container>
        <Arrange autoFlow="row" gap="xsmall" justifyContent="stretch">
          <CommentTextArea
            textAreaRef={taskInputRef}
            comment={newTaskValue}
            setComment={setNewTaskValue}
            onKeyDown={onKeyDown}
            autofocus={true}
            inputSize="small"
            placeholder=""
            showCustomPlaceHolder={true}
            onFocus={onFocus}
            dataTestId="auto-tasks-input"
          />

          <Arrange gap="small" justifyContent="end">
            <TextButton size="small" onClick={onClose}>
              Cancel
            </TextButton>
            <Button
              variant="primary"
              size="small"
              onClick={handleConfirm}
              isDisabled={
                loadingApprove || loadingAdd || loadingUpdate || !saveable
              }
            >
              Confirm task{timestamp != null ? ` at ${timestamp}` : ''}
            </Button>
          </Arrange>
        </Arrange>
      </Arrange>
    </div>
  );
};
