/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import { keyframes } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { u } from '@loomhq/lens';

import {
  transportIsOpenClassName,
  videoMouseIsActiveClassName,
} from '../../variables';

export const animationDuration = 1200;
export const staggerDelay = animationDuration / 10;
export const jumpTiming = 90;
const svgWidth = 55;

export const newEmojiClassName = 'newEmoji';
export const currentEmojiClassName = 'currentEmoji';

const grow = keyframes`
  8% {
    stroke-dashoffset: 25%;
  }
  24%, 100% {
    stroke-dashoffset: -25%;
  }
`;

const ConfettiWrapper = styled.span`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: none;
  width: ${u(svgWidth / 8)};

  svg path {
    stroke-dasharray: 25%;
    stroke-dashoffset: 25%;
    animation-fill-mode: forwards;
    animation-delay: var(--animationDelay);

    .${currentEmojiClassName}:not(${newEmojiClassName}) & {
      animation-name: ${grow};
      animation-duration: ${animationDuration}ms;

      .${videoMouseIsActiveClassName} &,
      .${transportIsOpenClassName} & {
        animation-duration: 0ms;
      }
    }
  }

  .${videoMouseIsActiveClassName} &,
  .${transportIsOpenClassName} & {
    animation-duration: 0ms;
  }

  &.${newEmojiClassName} svg path {
    animation-name: ${grow};
    animation-duration: ${animationDuration}ms;
  }

  // prevent delay on rapid clicking
  &.${newEmojiClassName} {
    animation-delay: 0ms;
  }
`;

const confettiGroups = [
  [
    'M11.5208 21.9497L1.979 18.0504',
    'M15.1324 16.4417L8 9',
    'M40.3494 15.3636L47.7334 8.1715',
    'M42.9998 22.1919L52.2349 17.6134',
  ],
  [
    'M11.5208 21.9497L1.979 18.0504',
    'M35.7361 10.3772L40.3468 1.15807',
    'M40.3967 13.4116L47.6861 6.12353',
  ],
  [
    'M11.8728 20.5653L1.6272 19.4348',
    'M11.8544 25.2869L1.64575 26.7134',
    'M35.7361 10.3772L40.3468 1.15807',
    'M40.3967 13.4116L47.6861 6.12353',
  ],
  [
    'M12.5903 17.7703L2.90967 14.2297',
    'M15.9834 11.9399L7.51685 6.0603',
    'M42.9064 25.328L53.1767 26.207',
    'M41.9652 16.6583L52.1179 14.877',
  ],
];

export const Confetti = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const [randomGroup, setRandomGroup] = React.useState(0);

  React.useEffect(() => {
    setRandomGroup(Math.floor(Math.random() * confettiGroups.length));
  }, []);

  return (
    <ConfettiWrapper className={className}>
      <svg viewBox={`0 0 ${svgWidth} 31`} fill="none">
        {confettiGroups[randomGroup].map((d, index) => (
          <path
            d={d}
            key={index}
            stroke="#FFDB25"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </ConfettiWrapper>
  );
};
