// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { useOnPlayCallback, usePlayerHasStarted, usePlayingStatus } from '..';
import { zIndexes } from '../utils';
import { colors, defaultTransition } from '../variables';

export const EMBED_PAUSE_Z_INDEX = '1';

const Wrapper = styled.div<{
  withDarkBackdrop?: boolean;
  withLightBackdrop?: boolean;
  withHoverBackdrop?: boolean;
  disablePointerEvents: boolean;
}>`
  background-color: ${props =>
    props.withLightBackdrop && colors.playerBackdrop};
  z-index: ${zIndexes.playerBackdrop};
  transition: ${defaultTransition}ms background;
  ${props => props.disablePointerEvents && `pointer-events: none;`};
  ${props =>
    props.withDarkBackdrop && `background-color: ${colors.playerBackdropDark}`};
  .LayersContainer:hover & {
    ${props =>
      props.withHoverBackdrop &&
      `background-color: ${colors.playerBackdropHover}`};
  }
`;

export const PlayerBackdrop = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const { status } = usePlayingStatus(videoId);
  const hasStarted = usePlayerHasStarted(videoId);
  const hasEnded = status === 'ended';

  const onPlay = useOnPlayCallback(videoId);

  const withLightBackdrop = !hasStarted;
  const withDarkBackdrop = hasEnded;
  const withHoverBackdrop = !hasEnded && !hasStarted;

  return (
    // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
    <Wrapper
      disablePointerEvents={hasStarted}
      data-name="PlayerBackdrop"
      withDarkBackdrop={withDarkBackdrop}
      withLightBackdrop={withLightBackdrop}
      withHoverBackdrop={withHoverBackdrop}
      onClick={onPlay}
    />
  );
};
