// eslint-disable-next-line no-restricted-imports
import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useMemo } from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';
import { NotificationClientType } from '@loomhq/shared-utilities/constants/notifications';
import {
  VIDEO_PRIVACY_CUSTOM_ACCESS,
  VIDEO_PRIVACY_PUBLIC,
  VIDEO_PRIVACY_WORKSPACE,
} from '@loomhq/shared-utilities/constants/video';

import { ProfileCard } from '../ProfileCard';
import { AccessChangeCardProps } from '../types';
import { NotificationLink } from './common';
import { getNotificationOwner } from './utils';

const getAccessChangeContent = privacyType => {
  switch (privacyType) {
    case VIDEO_PRIVACY_PUBLIC:
      return 'made your video public';
    case VIDEO_PRIVACY_WORKSPACE:
      return 'gave the team access to your video';
    case VIDEO_PRIVACY_CUSTOM_ACCESS:
      return 'restricted access to your video';
    default:
      return 'changed your video privacy';
  }
};

export const AccessChangeCard = ({
  notification,
}: AccessChangeCardProps): JSX.Element => {
  const content = useMemo(() => {
    switch (notification.notificationType) {
      case NotificationClientType.ReshareVideo:
        return `reshared your video with ${notification.receiver?.name}`;
      case NotificationClientType.VideoPrivacyChange:
      default:
        return getAccessChangeContent(notification.privacyType);
    }
  }, [
    notification.privacyType,
    notification.notificationType,
    notification.receiver?.name,
  ]);

  const notificationOwner = getNotificationOwner(notification.user);

  return (
    <>
      <Container paddingBottom="medium">
        <Text color="bodyDimmed" isInline>
          Access change to{' '}
        </Text>
        <NotificationLink url={notification.url}>
          {notification.video?.name}
        </NotificationLink>
      </Container>
      <Container>
        <Arrange gap={1.5}>
          <ProfileCard avatarMode={true} notificationOwner={notificationOwner}>
            <UserAvatar
              avatarSize={4}
              avatarSrc={notificationOwner.avatar}
              name={notificationOwner.name}
            />
          </ProfileCard>
          <Arrange gap="xsmall">
            <ProfileCard
              avatarMode={false}
              notificationOwner={notificationOwner}
            >
              <Text fontWeight="bold">{notification.user?.name}</Text>
            </ProfileCard>
            <Text color="bodyDimmed">{content}</Text>
            <Text color="bodyDimmed">
              ・
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </Arrange>
        </Arrange>
      </Container>
    </>
  );
};
