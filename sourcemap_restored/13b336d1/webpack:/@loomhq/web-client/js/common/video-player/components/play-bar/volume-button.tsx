/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { u } from '@loomhq/lens';
import { SvgVolumeX } from '@loomhq/lens/icons/volume-x';
import { SvgVolume1 } from '@loomhq/lens/icons/volume1';
import { SvgVolume2 } from '@loomhq/lens/icons/volume2';

import { useVolumeSlider, useVolume } from '../../hooks';
import { hotKeys } from '../../hotkeys';
import { fastTransition, xFastTransition } from '../../variables';
import { RangeSlider } from '../range-slider';
import { PlayerButton } from './player-button';

const VolumeIcon = ({
  volume,
  muted = false,
}: {
  volume: number;
  muted?: boolean;
}) => {
  if (muted || volume === 0) {
    return <SvgVolumeX />;
  }

  if (volume > 0.5) {
    return <SvgVolume2 />;
  }

  return <SvgVolume1 />;
};

const VolumeBtnWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const VolumeInputSection = styled.div`
  position: absolute;
  width: ${u(15)};
  left: 100%;
  top: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  align-content: center;
  z-index: 2;
  padding: 0 ${u(1.5)};
  transition: ${fastTransition}ms ${xFastTransition}ms;
  backdrop-filter: blur(${u(0.875)});
  opacity: 0;
  transform: translateX(${u(-1)});
  border-radius: var(--lns-radius-medium);
  pointer-events: none;

  .VolumeBtnWrapper:hover &,
  &:focus-within {
    opacity: 1;
    transform: translateX(0);
    pointer-events: unset;
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    border-radius: var(--lns-radius-medium);
    background: hsla(0, 0%, 13%, 0.9);
    opacity: 0.9;
    z-index: -2;

    @supports (backdrop-filter: blur(${u(0.875)})) {
      display: none;
    }
  }
`;

export const VolumeBtn = ({
  videoId,
  isMinimal,
}: {
  videoId: string;
  isMinimal?: boolean;
}): JSX.Element => {
  const ref = useVolumeSlider(videoId);
  const { volume, muted, onToggleMuted } = useVolume(videoId);
  const label = muted ? 'Unmute' : 'Mute';

  return (
    <VolumeBtnWrapper className="VolumeBtnWrapper">
      <PlayerButton
        label={label}
        shortcut={hotKeys.mute.label}
        icon={<VolumeIcon volume={volume} muted={muted} />}
        onClick={onToggleMuted}
        backgroundColor={isMinimal ? 'background' : undefined}
        data-name="MuteBtn"
      />
      {!isMinimal && (
        <VolumeInputSection>
          <RangeSlider
            alwaysVisible
            isRounded
            color="var(--lns-color-body)"
            ariaLabel="Volume"
            ref={ref}
          />
        </VolumeInputSection>
      )}
    </VolumeBtnWrapper>
  );
};
