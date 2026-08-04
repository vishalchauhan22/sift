import { FollowButton } from '@js/common/follow-button';
import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { Arrange, Container, Spacer, Text, Button } from '@loomhq/lens';

import { ProfileCard } from '../ProfileCard';
import { NewFollowerCardProps } from '../types';
import { getNotificationOwner } from './utils';

export const NewFollowerCard = ({
  notification,
}: NewFollowerCardProps): JSX.Element => {
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
            You have a new follower
          </Text>
        </Container>
        <Container
          borderSide="all"
          radius="large"
          padding="medium"
          overflow="hidden"
          maxWidth="43.25rem"
        >
          <Container>
            <Arrange gap={1.5} alignItems="center">
              <ProfileCard
                avatarMode={true}
                notificationOwner={notificationOwner}
              >
                <UserAvatar
                  avatarSize={4}
                  avatarSrc={notificationOwner.avatar}
                  name={notificationOwner.name}
                />
              </ProfileCard>
              <Arrange>
                <ProfileCard
                  avatarMode={false}
                  notificationOwner={notificationOwner}
                >
                  <Text fontWeight="bold" isInline>
                    {notificationOwner.name}
                  </Text>
                </ProfileCard>
                <Text color="bodyDimmed" isInline className="px:xsmall">
                  started following you
                </Text>
                <Text fontWeight="bold" isInline>
                  {notification.data.spaceName}
                </Text>
                <Text color="bodyDimmed" isInline>
                  ・
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </Arrange>
            </Arrange>
          </Container>
          <Spacer bottom={2} />
          <Arrange gap="small" justifyContent="end">
            <FollowButton
              profileId={notification.data.followerId}
              hasFullWidth={false}
              hideToggle={true}
              showStatus={false}
            />
            <Button
              htmlTag="a"
              variant="neutral"
              href={`/profile/${notification.data.profileUrl}`}
            >
              View profile
            </Button>
          </Arrange>
        </Container>
      </Container>
    </Arrange>
  );
};
