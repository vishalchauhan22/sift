import classnames from 'classnames';
import { useCurrentUserSelector } from '@js/common/current-user';
import UserAvatar from '@js/components/user-avatar';
import { Avatar } from '@js/pages/share/join-team-banner/types';
import React from 'react';

import { getUserAvatarThumb } from '@js/utilities/avatar';
import { getMostCompleteNamePossible } from '@js/utilities/user';

import { Container, Text, TextSize } from '@loomhq/lens';

import styles from './styles.module.css';
import { formatRemainder } from './utilities';

const RemainderAvatar = ({
  remainder,
  avatarSize,
  size,
}: {
  remainder: number;
  avatarSize: number;
  size?: TextSize;
}) => {
  let textSize: TextSize = 'body-md';

  if (size) {
    textSize = size;
  } else if (remainder > 1000) {
    textSize = 'body-sm';
  }

  const formattedRemainder = formatRemainder(remainder);

  return (
    <div className="relative">
      <Container
        htmlTag="span"
        backgroundColor="background"
        contentColor="bodyDimmed"
        width={avatarSize}
        height={avatarSize}
        radius="round"
      >
        <Text fontWeight="bold" alignment="center" size={textSize}>
          +{formattedRemainder}
        </Text>
      </Container>
    </div>
  );
};

export interface UserData {
  id: unknown;
  avatarSrc?: string;
  name: string;
}

interface Props {
  className?: string;
  alignment?: 'left' | 'right';
  maxImages?: number;
  userData?: Array<UserData> | Avatar[]; // Avatar[] is for backwards compatibility: consolidation as TODO
  avatarSize?: number;
  showRemainderAvatar?: boolean;
  showUnRenderedLabel?: boolean;
  prioritizeCurrentUser?: boolean;
  justify?: 'left' | 'right' | 'center';
  remainderTextSize?: TextSize;
}

export const FacePile = ({
  className = undefined,
  alignment = 'left',
  maxImages = 5,
  userData = [],
  avatarSize = 3,
  showRemainderAvatar = true,
  showUnRenderedLabel = true,
  prioritizeCurrentUser = false,
  justify = 'left',
  remainderTextSize,
}: Props): JSX.Element => {
  const currentUserId = useCurrentUserSelector(user => user.id, NaN);
  const userAvatarThumb = useCurrentUserSelector(
    user => getUserAvatarThumb(user.avatars),
    undefined
  );
  const userFullName = useCurrentUserSelector(
    getMostCompleteNamePossible,
    'Anonymous'
  );

  const getAvatarsToShow = () => {
    if (!showRemainderAvatar && !showUnRenderedLabel) {
      return maxImages;
    }

    return userData.length > maxImages ? maxImages - 1 : maxImages;
  };

  const avatars = (userData as Array<UserData>)
    .filter(user => (prioritizeCurrentUser ? user.id !== currentUserId : true))
    .slice(0, getAvatarsToShow())
    .map((userDataItem, i) => {
      return (
        <UserAvatar
          avatarSrc={userDataItem.avatarSrc}
          name={userDataItem.name ?? undefined}
          avatarSize={avatarSize}
          key={i}
        />
      );
    });

  if (prioritizeCurrentUser) {
    avatars.push(
      <UserAvatar
        avatarSrc={userAvatarThumb}
        name={userFullName}
        avatarSize={avatarSize}
        key={avatars.length}
      />
    );
  }

  let unRenderedLabel;
  const unRenderedAvatarCount = userData.length - avatars.length;

  if (unRenderedAvatarCount > 0) {
    if (showRemainderAvatar) {
      avatars.push(
        <RemainderAvatar
          remainder={unRenderedAvatarCount}
          avatarSize={avatarSize}
          key={avatars.length}
          size={remainderTextSize}
        />
      );
    } else if (showUnRenderedLabel) {
      unRenderedLabel = (
        <div
          className="text:body-md weight:bold c:grey6 ml:small mt:small"
          data-testId="face-pile-count"
        >
          +{formatRemainder(unRenderedAvatarCount)}
        </div>
      );
    }
  }

  return (
    <span
      className={classnames(styles.facePile, 'flex flexDirection:row', {
        [styles.isCentered]: justify === 'center',
      })}
    >
      <ul
        className={classnames(
          styles.facePile,
          {
            [styles.isRightAligned]: alignment === 'right',
          },
          className
        )}
      >
        {avatars.filter(Boolean).map((avatar, index) => (
          <li key={index}>{avatar}</li>
        ))}
      </ul>
      {unRenderedLabel}
    </span>
  );
};
