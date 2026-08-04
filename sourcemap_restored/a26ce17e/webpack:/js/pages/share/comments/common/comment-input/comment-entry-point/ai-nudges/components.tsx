// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Button, Text } from '@loomhq/lens';

const DURATION_IN_SEC_SHORT = 1.5;
const DURATION_IN_SEC_LONG = 3;

const ADJUSTED_RADIUS_IN_PX = 13; // to match curve of NudgeWithOverflowButton

const BorderGradient = styled.div`
  position: relative;
  display: inline-block;
  padding: 1px;
  background-color: var(--lns-color-blurpleMedium);
  background-size: cover;
  border-radius: ${ADJUSTED_RADIUS_IN_PX}px;
  z-index: 0;

  &:hover {
    background-color: var(--lns-color-blurpleStrong);
  }

  /* Using pseudo elements to create layers of border for fading effect */

  &::before,
  &::after {
    content: '';
    opacity: 0;
    border-radius: ${ADJUSTED_RADIUS_IN_PX}px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &::before {
    background-color: #d8d5dd;
    z-index: -2;
    animation: fadeOut ${DURATION_IN_SEC_SHORT}s;
  }

  &::after {
    background-image: linear-gradient(to bottom, #9747ff, #dc43be);
    z-index: -1;
    animation: fadeInOut ${DURATION_IN_SEC_LONG}s;
  }
`;

const NudgeWithOverflowButton = (styled as any)(Button)`
  width: 100%;
  border-radius: 12px;
  background-color: var(--lns-color-blurpleMedium);
  height: 4rem;
  color: var(--lns-color-blurpleStrong);
  animation: fadeIn ${DURATION_IN_SEC_LONG}s;

  &:hover {
    background-color: var(--lns-color-blurpleStrong);
    color: #ffffff;
  }

  span {
    max-width: 100%;
    text-wrap: wrap;
    word-break: break-word;
  }
`;

export const NudgeWithOverflow = ({
  nudgeContent,
  isNudgeSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  nudgeContent: string;
  isNudgeSelected: boolean;
  onClick: () => void;
  onMouseEnter: ((commentText: string) => void) | undefined;
  onMouseLeave: ((commentText: string) => void) | undefined;
}): JSX.Element => {
  return (
    <BorderGradient>
      <NudgeWithOverflowButton
        size="medium"
        variant="primary"
        disabled={isNudgeSelected}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Text
          hasEllipsis
          ellipsisLines={2}
          alignment="left"
          size="body-sm"
          style={{ animation: `fadeInText ${DURATION_IN_SEC_LONG}s` }}
        >
          {nudgeContent}
        </Text>
      </NudgeWithOverflowButton>
    </BorderGradient>
  );
};
