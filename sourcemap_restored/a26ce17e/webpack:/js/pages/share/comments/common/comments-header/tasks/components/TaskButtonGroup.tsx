import { useCurrentUserSelector } from '@js/common/current-user';
import { useVideoPasswordContext } from '@js/common/video-password';

import { useVideoContext } from '@js/common/video-player';
import {
  Avatars,
  SimpleAvatarType,
} from '@js/components/share-video/viewer-insights/Avatars';
import React, { useState } from 'react';

import {
  Text,
  Arrange,
  TextButton,
  Button,
  Spacer,
  Container,
} from '@loomhq/lens';
import { ActivityResponse, VideoTask } from '@js/globalTypes.generated';
import * as analytics from '@js/utilities/analytics';

import {
  TASK_ACCEPTED,
  TASK_DISCARDED,
  VIEWER_ACKNOWLEDGED_TASK,
} from '../constants/events';
import { useApproveTask } from '../hooks/useApproveTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useRespondToTask } from '../hooks/useRespondToTask';
import styles from './TaskButtonGroup.module.less';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const GOT_IT_BUTTON_TEXT = 'Got it';

const AcknowledgeButton = ({
  task,
  setErrorMessage,
}: {
  task: VideoTask;
  setErrorMessage: (errorMessage: string | undefined) => void;
}): JSX.Element => {
  const { password } = useVideoPasswordContext();
  const currentUserId = useCurrentUserSelector(user => user.id, undefined);
  const responsesList = task.responses as ActivityResponse[];

  const currentUserRespondedInitial = Boolean(
    responsesList?.find(
      response => response?.user?.id === String(currentUserId)
    )
  );

  const [currentUserResponded, setCurrentUserResponded] = useState(
    currentUserRespondedInitial
  );
  const [respondToTask, { loading: loadingRespond }] = useRespondToTask(
    task,
    setErrorMessage
  );

  const currentUserRespondToTask = () => {
    const toggledResponse = !currentUserResponded;

    respondToTask({
      variables: {
        id: task.id,
        responded: toggledResponse,
        password,
      },
    });
    setCurrentUserResponded(toggledResponse);

    analytics.track(VIEWER_ACKNOWLEDGED_TASK, {
      ...withIdentifiers(
        VIEWER_ACKNOWLEDGED_TASK,
        AnalyticsEntityId.video(task.video_id, 'video_id'),
        AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
      ),
      location: 'share page',
      status: toggledResponse ? 'acknowledged' : 'un-acknowledged',
      source: task.source,
    });
  };

  return (
    <Container marginLeft="calc(-1 * var(--lns-space-xsmall))">
      <TextButton
        className={currentUserResponded ? styles.gotItChecked : undefined}
        size="small"
        onClick={() => currentUserRespondToTask()}
        disabled={loadingRespond}
      >
        <Arrange gap="xsmall">
          <div>{GOT_IT_BUTTON_TEXT}</div>
          <span role="img" aria-labelledby={GOT_IT_BUTTON_TEXT}>
            👍
          </span>
        </Arrange>
      </TextButton>
    </Container>
  );
};

export const TaskButtonGroup = ({
  task,
  isSuggested,
  setErrorMessage,
}: {
  task: VideoTask;
  isSuggested: boolean;
  setErrorMessage: (errorMessage: string | undefined) => void;
}): JSX.Element | null => {
  const {
    video: { currentUserCanEdit },
  } = useVideoContext();
  const responsesList = task.responses as ActivityResponse[];

  const [approveTask, { loading: loadingApprove }] = useApproveTask(
    task,
    setErrorMessage
  );
  const [deleteTask, { loading: loadingDelete }] = useDeleteTask(
    task,
    setErrorMessage
  );

  const onClickApprove = () => {
    approveTask();

    analytics.track(TASK_ACCEPTED, {
      ...withIdentifiers(
        TASK_ACCEPTED,
        AnalyticsEntityId.video(task.video_id, 'video_id'),
        AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
      ),
      source: task.source,
    });
  };

  const onClickDelete = () => {
    deleteTask();

    analytics.track(TASK_DISCARDED, {
      ...withIdentifiers(
        TASK_DISCARDED,
        AnalyticsEntityId.video(task.video_id, 'video_id'),
        AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
      ),
      target: 'suggested task',
      source: task.source,
    });
  };

  const hasResponses = Boolean(responsesList?.length);

  let avatars: SimpleAvatarType[] = [];

  if (hasResponses) {
    avatars = responsesList.map<SimpleAvatarType>(response => {
      const user = response.user;
      const firstAvatar = user?.avatars?.[0];

      return {
        thumb: firstAvatar?.thumb,
        name: user?.display_name,
      };
    });
  }

  if (!isSuggested) {
    return (
      <Arrange gap="small">
        {currentUserCanEdit ? (
          hasResponses ? (
            <Text size="body-sm" color="bodyDimmed">
              {GOT_IT_BUTTON_TEXT}
            </Text>
          ) : null
        ) : (
          <AcknowledgeButton task={task} setErrorMessage={setErrorMessage} />
        )}
        {hasResponses ? (
          <Avatars avatars={avatars} size={2} dataStyleId="task-responses" />
        ) : null}
      </Arrange>
    );
  }

  return (
    <Spacer top="xsmall">
      <Arrange gap="small">
        <Button size="small" onClick={onClickApprove} disabled={loadingApprove}>
          Accept
        </Button>
        <TextButton
          size="small"
          onClick={onClickDelete}
          disabled={loadingDelete}
        >
          Dismiss
        </TextButton>
      </Arrange>
    </Spacer>
  );
};
