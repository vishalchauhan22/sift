import cn from 'classnames';
import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useEffect, useRef, useState } from 'react';

import { Arrange, Container, Spacer, Text } from '@loomhq/lens';
import { NotificationType } from '@loomhq/shared-utilities/constants/notifications';

import { ProfileCard } from '../ProfileCard';
import { FirstViewCardProps } from '../types';
import { NotificationLink } from './common';
import styles from './styles.module.less';
import { getNotificationOwner } from './utils';
export const FirstViewCard = ({
  notification,
}: FirstViewCardProps): JSX.Element => {
  const [showCelebration, setShowCelebration] = useState(false);

  const notificationOwner = getNotificationOwner(notification.user);

  const ref = useRef<HTMLDivElement>(null);

  const isWeaveVfv =
    notification.notificationType === NotificationType.WeaveFirstVideoView;

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShowCelebration(true);
        }
      },
      { threshold: 1, rootMargin: '-20% 0px -28% 0px' }
    );

    ref.current && io.observe(ref.current);

    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className={styles.celebrationContainer} ref={ref}>
        <Text
          className={cn(
            styles.celebrationIcon,
            showCelebration && styles.showCelebration
          )}
          isInline
        >
          🎉
        </Text>
        <Container
          className={cn(
            styles.celebrationText,
            showCelebration && styles.showCelebration
          )}
        >
          <Text color="bodyDimmed" isInline htmlTag="h2">
            First view on{' '}
          </Text>
          <NotificationLink url={notification.url}>
            {notification.video?.name}
          </NotificationLink>
          {isWeaveVfv && (
            <Text color="bodyDimmed" isInline>
              {' '}
              which contains a clip you recorded
            </Text>
          )}
        </Container>
      </div>
      <Spacer top="medium" />
      <Arrange gap={1.5}>
        <ProfileCard avatarMode={true} notificationOwner={notificationOwner}>
          <UserAvatar
            avatarSize={4}
            avatarSrc={notificationOwner.avatar}
            name={notificationOwner.name}
          />
        </ProfileCard>
        <Arrange>
          <ProfileCard avatarMode={false} notificationOwner={notificationOwner}>
            <Text fontWeight="bold" isInline>
              {notificationOwner.name}
            </Text>
          </ProfileCard>
          <Text color="bodyDimmed" isInline>
            &nbsp;watched・
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </Arrange>
      </Arrange>
    </>
  );
};
