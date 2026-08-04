import { LOOM_URI } from '@js/constants/routes';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { Align, Container, Text } from '@loomhq/lens';

import NotificationVideoCardLarge from '../notification-video-card-large';
import { VideoUsedAsClipCardProps } from '../types';
import { CommentContainer, NotificationLink } from './common';
import { getNotificationOwner } from './utils';
export const VideoUsedAsClipCard = ({
  notification,
}: VideoUsedAsClipCardProps): JSX.Element => {
  const notificationOwner = getNotificationOwner(notification.user);

  return (
    <>
      <Container paddingBottom="medium">
        <Align alignment="topCenter">
          <Text hasEllipsis className="width:full">
            <NotificationLink
              url={`${LOOM_URI}/share/${notification.data?.clipId}`}
            >
              {notification.data?.clipName}
            </NotificationLink>
            <Text color="bodyDimmed" isInline>
              {` `}was added to another video
            </Text>
          </Text>
        </Align>
      </Container>

      <Container paddingBottom="small">
        <CommentContainer
          avatarSrc={notificationOwner.avatar ?? ''}
          name={notificationOwner.name}
          createdAt={formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
          profileId={notificationOwner.id}
          verticallyCenter
        />
      </Container>

      <NotificationVideoCardLarge
        video={notification.video.enhancedVideo}
        workspace={notification.workspace}
      />
    </>
  );
};
