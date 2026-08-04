import cx from 'classnames';
import {
  selectDisplayName,
  useCurrentUserSelector,
} from '@js/common/current-user';
import { ErrorText } from '@js/common/error-management';
import { useRespondToVideoTaskMutation } from '@js/common/tasks/RespondToVideoTask.generated';
import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { VIEWER_ACKNOWLEDGED_TASK } from '@js/pages/share/comments/common/comments-header/tasks/constants/events';
import React, { useState } from 'react';

import { getCloudfrontURI } from '@js/utilities/avatar';

import * as logger from '@js/utilities/loggerx';

import { Align, Arrange, Container, Text, TextButton, u } from '@loomhq/lens';
import { timeUtils, VideoActivitySource } from '@loomhq/shared-utilities';
import { NotificationType as Type } from '@loomhq/shared-utilities/constants/notifications';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import * as analytics from '@js/utilities/analytics';

import NotificationsVideoPlayer, {
  getSnippetTimestamps,
} from '../notifications-video-player';
import { VideoTaskMentionCardProps } from '../types';
import { CommentContainer, NotificationLink } from './common';
import styles from './styles.module.less';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

const { secondsToVideoTS } = timeUtils;

const ACK_BUTTON_TEXT = 'Got it';

interface cardNotificationData {
  id: number;
  videoId: string;
  userId: number;
  content: string;
  createdAt: string;
  avatar: string;
  userName: string;
  respondedAt: string;
  timestamp: number;
  responded: boolean;
  source: VideoActivitySource;
}

const AcknowledgeButton = ({
  task,
  onError,
}: {
  task: cardNotificationData;
  onError?: () => void;
}): JSX.Element => {
  const taskId = task.id;
  const [currentUserResponded, setCurrentUserResponded] = useState(
    Boolean(task.respondedAt)
  );

  const logError = (err: Error | string) => {
    logger.error(
      err,
      {
        taskId,
      },
      {
        feature: Feature.VideoTasks,
      }
    );
    onError?.();
  };

  const [respondToTask, { loading: loadingRespond }] =
    useRespondToVideoTaskMutation({
      onError: err => {
        logError(err);
      },
      onCompleted: data => {
        if (
          data?.respondToVideoTask?.__typename !== 'RespondToVideoTaskPayload'
        ) {
          logError(
            `Failed to respond to task in onCompleted: ${data?.respondToVideoTask?.message}`
          );
        }
      },
    });

  const currentUserRespondToTask = () => {
    const toggledResponse = !currentUserResponded;

    respondToTask({
      variables: { id: task.id, responded: toggledResponse, password: null },
    });
    setCurrentUserResponded(toggledResponse);

    analytics.track(VIEWER_ACKNOWLEDGED_TASK, {
      ...withIdentifiers(
        VIEWER_ACKNOWLEDGED_TASK,
        AnalyticsEntityId.video(task.videoId, 'video_id'),
        AnalyticsEntityId.commentPost(task.id, 'string', 'task_id')
      ),
      location: 'notif',
      status: toggledResponse ? 'acknowledged' : 'un-acknowledged',
      source: task.source,
    });
  };

  return (
    <Container marginLeft="calc(-1 * var(--lns-space-xsmall))">
      <TextButton
        className={cx({
          [styles.videoCardAckBtnChecked]: currentUserResponded,
        })}
        size="medium"
        onClick={() => currentUserRespondToTask()}
        disabled={loadingRespond}
      >
        <Arrange gap="xsmall">
          <div style={{ width: u(5) }}>{ACK_BUTTON_TEXT}</div>
          <span role="img" aria-labelledby={ACK_BUTTON_TEXT}>
            👍
          </span>
        </Arrange>
      </TextButton>
    </Container>
  );
};

export const VideoTaskMentionCard = ({
  notification,
}: VideoTaskMentionCardProps): JSX.Element => {
  if (notification.notificationType !== Type.VideoTaskMention) {
    throw new Error(
      `Invalid notification type: ${notification.notificationType}`
    );
  }

  const [errorMessage, setErrorMessage] = useState('');

  const displayName = useCurrentUserSelector(selectDisplayName, 'Anonymous');
  const avatars = useCurrentUserSelector(user => user.avatars, []);

  const avatarThumbPath = avatars[0]?.thumb;
  const userAvatarSrc = avatarThumbPath
    ? getCloudfrontURI(avatarThumbPath)
    : '';

  const onAckFailure = () => {
    setErrorMessage('Failed to respond to task, please try again');
  };

  const videoTask = notification.data?.videoTask as cardNotificationData;

  const [startTimestamp, stopTimestamp] = getSnippetTimestamps();

  const titleActionPrefix = 'You were mentioned in a task on';

  const notificationBody = (
    <Container>
      <Container>
        <Arrange justifyContent="space-between" gap="medium">
          <Align alignment="topCenter">
            <Text hasEllipsis className="width:full">
              <Text color="bodyDimmed" isInline>
                {titleActionPrefix}{' '}
              </Text>
              <NotificationLink url={notification.url}>
                {notification.video?.name}
              </NotificationLink>
            </Text>
          </Align>
        </Arrange>
        {/* <Spacer top="0.625rem" />*/}
        {/* transcript stuff was here*/}
      </Container>
      <CommentContainer
        avatarSrc={videoTask?.avatar}
        name={videoTask?.userName}
        createdAt={formatDistanceToNow(new Date(videoTask?.createdAt), {
          addSuffix: true,
        })}
        content={videoTask?.content}
        profileId={videoTask?.userId}
        timestamp={secondsToVideoTS(videoTask?.timestamp)}
        url={notification.url}
      />

      <Arrange gap={1.5} columns={['2rem', '1fr']} alignItems="start">
        <UserAvatar
          avatarSize={4}
          avatarSrc={userAvatarSrc}
          name={displayName}
        />

        <AcknowledgeButton task={videoTask} onError={() => onAckFailure()} />
      </Arrange>
      <ErrorText error={errorMessage} marginLeft={5.5} />
    </Container>
  );

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'auto'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      {notification.data ? (
        notificationBody
      ) : (
        <Container
          backgroundColor="backgroundSecondary"
          radius="large"
          borderSide="all"
          padding="small"
          paddingLeft="medium"
        >
          <Text isDimmed>[Comment not available]</Text>
        </Container>
      )}

      <div className="none sm-block">
        <Align alignment="topCenter">
          <Container radius="large" borderSide="all" overflow="hidden">
            <NotificationsVideoPlayer
              startTimestamp={startTimestamp}
              stopTimestamp={stopTimestamp}
              title={notification.video?.name}
              url={notification.url}
              videoModel={notification.video.enhancedVideo}
            />
          </Container>
        </Align>
      </div>
    </Arrange>
  );
};
