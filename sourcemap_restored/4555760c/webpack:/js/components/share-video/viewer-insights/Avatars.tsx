// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React from 'react';

import { Avatar } from '@loomhq/lens';

import { ViewerAvatar } from './components';

const AvatarContainer = styled.div<{ size: number }>`
  z-index: 1; // to go above the non-image avatar elements
  padding: 2px; // visible border
  margin-left: -8px; // overlap with previous
  border-radius: var(--lns-radius-full);
  background-color: var(--lns-color-background);
  position: relative;
  transition: background-color 0.3s ease 0s;

  // HACK(tatiana, avatar-container): Pseudo element is necessary to prevent visual bug given limitations of the colours we're using: https://www.loom.com/share/14601cc42a9a45688b8b84df2648011c
  &[data-style-id='avatar-container']::before,
  &[data-style-id='avatar-container']::after,
  &[data-style-id='task-responses']::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -4;
    background-color: var(--lns-color-backgroundSecondary);
    border-radius: inherit;
    transition: inherit;
  }

  ${props =>
    props.size &&
    `width: ${props.size * 8 + 4}px;
  height: ${props.size * 8 + 4}px;`}
`;

export type SimpleAvatarType = {
  thumb?: string;
  name?: string;
};

const PlusMoreAvatar = ({
  count,
  size,
}: {
  count: number;
  size: number;
}): JSX.Element => {
  // max is 99 as we only want to show 2 digits
  return (
    <AvatarContainer size={size}>
      <Avatar size={size} letter={`+${Math.min(count, 99)}`} />
    </AvatarContainer>
  );
};

type AvatarsProps = {
  avatars: SimpleAvatarType[];
  size?: number;
  dataStyleId?: string;
};

export const Avatars = ({
  avatars = [],
  size = 3,
  dataStyleId = undefined,
}: AvatarsProps): JSX.Element | null => {
  if (avatars.length === 0) {
    return null;
  }

  const avatarCount = avatars.length;
  const moreThanThree = avatarCount > 3;

  if (moreThanThree) {
    const firstTwoAvatars = avatars.slice(0, 2);

    avatars = firstTwoAvatars;
  }

  return (
    <div className="flex ml:small mr:small">
      {avatars.map((avatar, i) => {
        return avatar ? (
          <AvatarContainer key={i} size={size} data-style-id={dataStyleId}>
            <ViewerAvatar
              size={size}
              avatar={avatar.thumb}
              name={avatar.name}
            />
          </AvatarContainer>
        ) : null;
      })}
      {moreThanThree ? (
        <PlusMoreAvatar count={avatarCount - 2} size={size} />
      ) : null}
    </div>
  );
};
