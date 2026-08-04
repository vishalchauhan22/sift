/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { Arrange, IconButtonBox, u } from '@loomhq/lens';

import { usePlaybackRate, usePopoverHandler } from '../../hooks';
import { hotKeys } from '../../hotkeys';
import { videoGlobalContainerClassName } from '../../variables';
import { SpeedSelector } from '../speed-selector';
import {
  PlayerButtonTooltip,
  WithHotKey,
} from './player-button/player-button-tooltip';
import { SettingsPopover } from './settings-popover';

const SpeedText = styled.span`
  font-size: ${u(2.125)};
  font-weight: var(--lns-fontWeight-bold);
  color: var(--lns-color-body);
  letter-spacing: -0.03em;
`;

export const SpeedButton = ({
  videoId,
  rolloutTranslateCaptions,
}: {
  videoId: string;
  rolloutTranslateCaptions?: boolean;
}): JSX.Element => {
  const [settingsIsOpen, setSettingsIsOpen, ref] = usePopoverHandler();
  const { rate } = usePlaybackRate(videoId);

  useEffect(() => {
    setSettingsIsOpen(false);
  }, [rate, setSettingsIsOpen]);

  const boundaryRef = React.useRef<Element>();

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current as Element;

    boundaryRef.current = element.closest(
      `.${videoGlobalContainerClassName}`
    ) as Element;
  }, [ref]);

  return (
    <div ref={ref}>
      <SettingsPopover
        isOpen={settingsIsOpen}
        content={
          <Arrange gap="medium" autoFlow="row">
            <WithHotKey label="Playback Speed" shortcut={hotKeys.speed.label} />
            <SpeedSelector
              videoId={videoId}
              rolloutTranslateCaptions={rolloutTranslateCaptions}
            />
          </Arrange>
        }
      >
        <PlayerButtonTooltip
          label={settingsIsOpen ? '' : `Playback Speed`}
          shortcut={settingsIsOpen ? '' : hotKeys.speed.label}
        >
          <IconButtonBox
            size="medium"
            onClick={() => setSettingsIsOpen(!settingsIsOpen)}
            data-name="SpeedBtn"
          >
            <SpeedText>{rate}×</SpeedText>
          </IconButtonBox>
        </PlayerButtonTooltip>
      </SettingsPopover>
    </div>
  );
};
