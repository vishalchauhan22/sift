/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import { keyframes } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { Icon } from '@loomhq/lens';
import { SvgBack5 } from '@loomhq/lens/icons/back5';
import { SvgChevronsRight } from '@loomhq/lens/icons/chevrons-right';
import { SvgForward5 } from '@loomhq/lens/icons/forward5';
import { SvgPause } from '@loomhq/lens/icons/pause';
import { SvgPlay } from '@loomhq/lens/icons/play';
import { SvgVolumeX } from '@loomhq/lens/icons/volume-x';
import { SvgVolume1 } from '@loomhq/lens/icons/volume1';
import { SvgVolume2 } from '@loomhq/lens/icons/volume2';

import { BlinkEvents } from '../../api';
import {
  usePlayerFromContext,
  useUserInitiatedPlaybackActions,
} from '../../hooks';
import { getPlayButtonSize } from '../../utils';
import { colors } from '../../variables';
import { useViewportContext } from '../../viewportContext';

const blinkDuration = 400;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
  }
`;

const BlinkIconSection = styled.div<{ blinkIconIsVisible: boolean }>`
  position: absolute;
  z-index: 1;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: fit-content;
  display: flex;
  place-items: center;
  pointer-events: none;
  ${props => !props.blinkIconIsVisible && `display: none`};
  animation: ${fadeIn} ${blinkDuration}ms forwards;
`;

const SpeedIcon = styled.div<{ size: string }>`
  font-size: ${props => props.size};
  weight: --lns-fontWeight-bold;
`;

const BlinkIconWrapper = styled.div<{ size: string }>`
  height: ${props => props.size};
  width: ${props => props.size};
  background: ${colors.videoOverlaySoft};
  border-radius: 100%;
  display: grid;
  place-items: center;
`;

const BlinkIcon = ({ icon }: { icon: React.ReactNode }) => {
  const { width, height } = useViewportContext();
  const size = getPlayButtonSize(width, height);
  const iconSize = `calc(${size} / 2)`;

  return (
    <BlinkIconWrapper size={size}>
      <Icon color="white" icon={icon} size={iconSize} />
    </BlinkIconWrapper>
  );
};

const DynamicSpeedIcon = (): JSX.Element => {
  const { width, height } = useViewportContext();
  const player = usePlayerFromContext();
  const size = getPlayButtonSize(width, height);
  const speedSize = `calc(${size} / 2.5)`;
  const playbackRate = player?.playbackRate;

  if (Number.isNaN(playbackRate)) {
    return <SvgChevronsRight />;
  }

  return <SpeedIcon size={speedSize}>{playbackRate}×</SpeedIcon>;
};

const getIcon = (status: BlinkEvents) => {
  switch (status) {
    case BlinkEvents.play:
      return <SvgPlay />;
    case BlinkEvents.pause:
      return <SvgPause />;
    case BlinkEvents.stepBackward:
      return <SvgBack5 />;
    case BlinkEvents.stepForward:
      return <SvgForward5 />;
    case BlinkEvents.mute:
      return <SvgVolumeX />;
    case BlinkEvents.unmute1:
      return <SvgVolume1 />;
    case BlinkEvents.unmute2:
      return <SvgVolume2 />;
    case BlinkEvents.speedUpdate:
      return <DynamicSpeedIcon />;
    default:
      null;
  }
};

export const PlayPauseOverlay = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const { status } = useUserInitiatedPlaybackActions(videoId);

  return <PlayPauseBlink status={status} />;
};

export const PlayPauseBlink = ({
  status,
}: {
  status?: BlinkEvents;
}): JSX.Element => {
  const Icon = status ? getIcon(status) : null;
  const [blinkIconIsVisible, setBlinkIconIsVisible] = useState(false);

  useEffect(() => {
    if (!status) {
      return;
    }

    setBlinkIconIsVisible(true);

    const timer = setTimeout(() => setBlinkIconIsVisible(false), blinkDuration);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <BlinkIconSection blinkIconIsVisible={blinkIconIsVisible}>
      <BlinkIcon icon={Icon} />
    </BlinkIconSection>
  );
};
