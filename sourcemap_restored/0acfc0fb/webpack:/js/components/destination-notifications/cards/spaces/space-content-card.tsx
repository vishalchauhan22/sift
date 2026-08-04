import { SPACES_PAGE } from '@js/constants/routes';

import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';
import { spacesUtils } from '@loomhq/shared-utilities';

import { ProfileCard } from '../../ProfileCard';
import NotificationVideoCardLarge from '../../notification-video-card-large';
import { SpaceContentCardProps } from '../../types';
import { CommentContainer, NotificationLink } from '../common';
import { getNotificationOwner } from '../utils';

const { getSlug } = spacesUtils;

export const SpaceContentCard = ({
  notification,
}: SpaceContentCardProps): JSX.Element => {
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
            A video was shared with{' '}
            <NotificationLink
              url={`${SPACES_PAGE}/${getSlug({
                id: notification.data.spaceId,
                name: notification.data.spaceName,
              })}`}
            >
              <Text color="body" fontWeight="bold" isInline>
                {notification.data?.spaceName}
              </Text>
            </NotificationLink>
          </Text>
        </Container>
        {notification.content ? (
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
        ) : (
          <Container paddingBottom="small">
            <Arrange gap={1.5}>
              <ProfileCard
                avatarMode={true}
                notificationOwner={notificationOwner}
              >
                <UserAvatar
                  avatarSize={4}
                  avatarSrc={notificationOwner.avatar ?? ''}
                  name={notificationOwner.name}
                />
              </ProfileCard>

              <Arrange gap="xsmall">
                <ProfileCard
                  avatarMode={false}
                  notificationOwner={notificationOwner}
                >
                  <Text fontWeight="bold" isInline>
                    {notificationOwner.name}
                  </Text>
                </ProfileCard>
                <Text color="bodyDimmed" isInline>
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </Arrange>
            </Arrange>
          </Container>
        )}

        {notification?.video && (
          <Container paddingBottom="small">
            <NotificationVideoCardLarge
              video={notification.video.enhancedVideo}
              workspace={notification.workspace}
            />
          </Container>
        )}
      </Container>
    </Arrange>
  );
};
