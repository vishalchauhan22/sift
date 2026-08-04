import { SemanticParser } from '@js/common/comments';
import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useState, useRef } from 'react';

import {
  Align,
  Arrange,
  Container,
  Text,
  Spacer,
  Link,
  TextButton,
  Icon,
} from '@loomhq/lens';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';

import { timeUtils } from '@loomhq/shared-utilities';
import { NotificationType as Type } from '@loomhq/shared-utilities/constants/notifications';
import styles from '@js/components/destination-notifications/cards/styles.module.less';

import useCommentVideoEmbed from '@js/hooks/useCommentVideoEmbed';

import NotificationsVideoPlayer, {
  getSnippetTimestamps,
} from '../notifications-video-player';
import { VideoTaskResponseCardProps } from '../types';
import { NotificationLink, COMMENT_TRIM_LENGTH } from './common';
const { secondsToVideoTS } = timeUtils;

const ACK_TEXT = 'Got it';

interface cardNotificationData {
  id: number;
  userId: number;
  content: string;
  respondedAt: string;
  responderAvatarSrc: string;
  responderDisplayName: string;
  timestamp: number;
}

type CommentContainerProps = {
  respondedAt: string;
  responderAvatarSrc: string;
  responderDisplayName: string;
  content?: string;
  timestamp?: string;
  isDimmed?: boolean;
  url?: string;
};

const TaskResponseContainer = ({
  respondedAt,
  responderAvatarSrc,
  responderDisplayName,
  content,
  timestamp,
  isDimmed,
  url,
}: CommentContainerProps): JSX.Element => {
  const color = isDimmed && 'bodyDimmed';
  const contentLength = content?.length || 0;
  const [seeMore, setSeeMore] = useState(contentLength > COMMENT_TRIM_LENGTH);

  const ref = useRef();

  useCommentVideoEmbed(ref);

  return (
    <Spacer bottom="medium">
      <Arrange alignContent="end">
        <Icon icon={<SvgCheckCircle />} color="primary" size={5} />
        <div>
          <Arrange alignItems="start">
            {timestamp && (
              <div>
                &nbsp;
                <Link className={styles.link} href={url} variant="neutral">
                  <Text color="bodyDimmed" isInline>
                    at {timestamp}
                  </Text>
                </Link>
              </div>
            )}

            <Text color="bodyDimmed">・{respondedAt}</Text>
          </Arrange>
        </div>
      </Arrange>
      <Spacer left="xlarge">
        <Text {...(color && { color })}>
          <SemanticParser
            withPills={true}
            comment={{ content }}
            trimLength={seeMore ? COMMENT_TRIM_LENGTH : undefined}
            afterBlock={
              seeMore ? (
                <TextButton
                  onClick={() => setSeeMore(false)}
                  size="small"
                  offsetSide="left"
                >
                  See more
                </TextButton>
              ) : undefined
            }
          />
        </Text>
        <Spacer top="small" />
        <Arrange gap={1.5} columns={['2rem', '1fr']} alignContent="start">
          <UserAvatar
            avatarSize={4}
            avatarSrc={responderAvatarSrc}
            name={responderDisplayName}
          />

          <Arrange gap="xsmall">
            <div>
              <Text fontWeight="bold" isInline>
                {responderDisplayName}
              </Text>
              {' responded '}
              <Text fontWeight="bold" isInline>
                {ACK_TEXT}
              </Text>
            </div>
            <span role="img" aria-labelledby={ACK_TEXT}>
              👍
            </span>
          </Arrange>
        </Arrange>
      </Spacer>
    </Spacer>
  );
};

export const VideoTaskResponseCard = ({
  notification,
}: VideoTaskResponseCardProps): JSX.Element => {
  if (notification.notificationType !== Type.VideoTaskResponse) {
    throw new Error(
      `Invalid notification type: ${notification.notificationType}`
    );
  }

  const videoTask = notification.data?.videoTask as cardNotificationData;

  const [startTimestamp, stopTimestamp] = getSnippetTimestamps();

  const titleActionPrefix = 'Response to your task on';

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
      </Container>
      <TaskResponseContainer
        respondedAt={formatDistanceToNow(new Date(videoTask?.respondedAt), {
          addSuffix: true,
        })}
        responderAvatarSrc={videoTask?.responderAvatarSrc}
        responderDisplayName={videoTask?.responderDisplayName}
        content={videoTask?.content}
        timestamp={secondsToVideoTS(videoTask?.timestamp)}
        url={notification.url}
      />
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
