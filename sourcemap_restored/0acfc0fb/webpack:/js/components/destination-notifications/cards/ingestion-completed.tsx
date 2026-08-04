import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';

import NotificationVideoCardLarge from '../notification-video-card-large';
import { IngestionCompletedCardProps } from '../types';
import { CommentContainer } from './common';
import { getNotificationOwner } from './utils';

export const IngestionCompletedCard = ({
  notification,
}: IngestionCompletedCardProps): JSX.Element => {
  const notificationOwner = getNotificationOwner(notification.user);

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'minmax(250px, auto)'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      <Container>
        <Container paddingBottom="medium">
          <Text color="bodyDimmed" isInline>
            A meeting you attended has been added to Loom
          </Text>
        </Container>
        <Container paddingBottom="small">
          <CommentContainer
            avatarSrc={notificationOwner.avatar ?? ''}
            name={notificationOwner.name}
            createdAt={formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
            content={notification.content}
            profileId={notificationOwner.id}
            verticallyCenter
          />
        </Container>
        <NotificationVideoCardLarge
          video={notification.video.enhancedVideo}
          workspace={notification.workspace}
        />
      </Container>
    </Arrange>
  );
};
