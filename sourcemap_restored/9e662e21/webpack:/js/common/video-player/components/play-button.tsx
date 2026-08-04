// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { useBrandingPrimaryColor } from '../context';
import { useOnPlayCallback } from '../hooks';
import { getContrast, getPlayButtonSize } from '../utils';
import { defaultTransition } from '../variables';
import { useViewportContext } from '../viewportContext';

const Wrapper = styled.button<{ size: string }>`
  --size: ${props => props.size};

  appearance: none;
  background: none;
  border: none;
  padding: 0;
  box-shadow: var(--lns-shadow-small);
  width: var(--size);
  height: var(--size);
  border-radius: 100%;
  transition: ${defaultTransition}ms transform;
  cursor: pointer;

  .LayersContainer:hover & {
    transform: scale(1.1);
  }
`;

const PlayButtonSvg = ({
  backgroundColor,
  iconColor,
}: {
  backgroundColor: string;
  iconColor: string;
}) => (
  <svg viewBox="0 0 90 90" fill="none">
    <path
      fill={backgroundColor}
      opacity={0.3}
      d="M45 90C69.8529 90 90 69.8527 90 44.9999C90 20.1471 69.8529 0 45 0C20.1472 0 0 20.1471 0 44.9999C0 69.8527 20.1472 90 45 90Z"
    />
    <path
      fill={backgroundColor}
      d="M45 85C67.0914 85 85 67.0913 85 44.9999C85 22.9086 67.0914 5 45 5C22.9086 5 5 22.9086 5 44.9999C5 67.0913 22.9086 85 45 85Z"
    />
    <path
      d="M35 33.268V56.732C35 58.5212 37.0582 59.6083 38.6432 58.6344L57.8999 46.9025C59.3667 46.0192 59.3667 43.9808 57.8999 43.0749L38.6432 31.3656C37.0582 30.3917 35 31.4788 35 33.268Z"
      fill={iconColor}
      opacity={0.8}
    />
  </svg>
);

export const PlayButton = ({
  videoId,
  ...props
}: {
  videoId: string;
}): JSX.Element => {
  const onPlay = useOnPlayCallback(videoId);
  const { width, height } = useViewportContext();
  const brandingColor = useBrandingPrimaryColor();
  const backgroundColor = brandingColor || '#ffffff';
  const isLight = getContrast(backgroundColor);
  const iconColor = isLight ? 'black' : 'white';
  const size = getPlayButtonSize(width, height);

  return (
    <Wrapper
      size={size}
      onClick={onPlay}
      {...props}
      type="button"
      aria-label="Play the video"
      data-name="PlayButton"
      id="LoomPlayButton"
    >
      <PlayButtonSvg backgroundColor={backgroundColor} iconColor={iconColor} />
    </Wrapper>
  );
};
