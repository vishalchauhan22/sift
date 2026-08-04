import cn from 'classnames';

import { secondsToHumanReadableString } from '@js/common/video-player';
import UserAvatar from '@js/components/user-avatar';
import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';

import styles from './styles.module.css';

export interface MobileEmptyStateVideoCardProps {
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  ownerName: string;
  ownerAvatarUrl?: string;
  duration?: number;
}

export const MobileEmptyStateVideoCard = ({
  title,
  videoUrl,
  duration = 0,
  thumbnailUrl,
  ownerName,
  ownerAvatarUrl,
}: MobileEmptyStateVideoCardProps): JSX.Element | null => {
  const thumbnailAltText = `${title} thumbnail`;

  const onClickHandler = () => {
    // TODO: analytics
  };

  const displayDuration = secondsToHumanReadableString(duration);

  return (
    <a href={videoUrl} onClick={onClickHandler}>
      <Container radius="large" borderSide="all" padding="medium">
        <Arrange columns="auto 1fr">
          <div
            className={cn(
              'overflow:hidden radius:large relative',
              styles.thumbnailContainer
            )}
          >
            <img
              src={thumbnailUrl}
              alt={thumbnailAltText}
              className={cn('radius:medium width:full')}
            />
            {displayDuration ? (
              <Container
                position="absolute"
                right="xsmall"
                bottom="xsmall"
                backgroundColor="backdropDark"
                padding="xsmall"
                radius="medium"
              >
                <Text color="white" size="body-sm" fontWeight="bold">
                  {displayDuration}
                </Text>
              </Container>
            ) : null}
          </div>
          <Container padding="small" height="full">
            <Arrange autoFlow="row" gap="small">
              <Text fontWeight="bold" ellipsisLines={2} hasEllipsis={true}>
                {title}
              </Text>
              <Arrange autoFlow="column" gap="small" alignContent="start">
                <UserAvatar
                  avatarSize={3}
                  avatarSrc={ownerAvatarUrl}
                  name={ownerName}
                />
                <Text fontWeight="book" ellipsisLines={1} hasEllipsis={true}>
                  {ownerName}
                </Text>
              </Arrange>
            </Arrange>
          </Container>
        </Arrange>
      </Container>
    </a>
  );
};
