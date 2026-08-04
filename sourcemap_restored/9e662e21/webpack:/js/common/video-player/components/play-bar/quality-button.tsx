/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { Arrange } from '@loomhq/lens';
import { SvgSettings } from '@loomhq/lens/icons/settings';

import { usePopoverHandler } from '../../hooks';
import { videoGlobalContainerClassName } from '../../variables';
import { QualitySelector } from '../quality-selector';
import { PlayerButton } from './player-button';
import { WithHotKey } from './player-button/player-button-tooltip';
import { SettingsPopover } from './settings-popover';

type QualityButtonProps = {
  videoId: string;
};

export const QualityButton: React.FC<
  React.PropsWithChildren<QualityButtonProps>
> = ({ videoId }) => {
  const [qualityMenuIsOpen, setQualityMenuIsOpen, ref] = usePopoverHandler();

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

  const handleOnPlayerButtonClick = React.useCallback(() => {
    setQualityMenuIsOpen(!qualityMenuIsOpen);
  }, [qualityMenuIsOpen, setQualityMenuIsOpen]);

  return (
    <div ref={ref}>
      <SettingsPopover
        isOpen={qualityMenuIsOpen}
        content={
          <Arrange gap="medium" autoFlow="row">
            <WithHotKey label="Quality" />
            <QualitySelector videoId={videoId} />
          </Arrange>
        }
      >
        <PlayerButton
          label={qualityMenuIsOpen ? '' : 'Quality'}
          icon={<SvgSettings />}
          onClick={handleOnPlayerButtonClick}
        />
      </SettingsPopover>
    </div>
  );
};
