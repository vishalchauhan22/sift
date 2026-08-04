/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';

import { useContainerBoundary, usePlayerFromContext } from '../../hooks';
import { LoomLink } from '../loom-link';

export const WatchOnLoomButton = (): JSX.Element => {
  const { ref, boundaryRef } = useContainerBoundary();
  const container = boundaryRef.current as HTMLElement;
  const player = usePlayerFromContext();

  const onWatchOnLoomClick = () => {
    if (!player) {
      return;
    }

    player.pause();
  };

  return (
    <div ref={ref}>
      <Tooltip
        container={container}
        content="Watch on Loom"
        placement="bottomRight"
        keepOpen
      >
        <LoomLink title="Open video in Loom" onClick={onWatchOnLoomClick}>
          <IconButton
            altText="Open video in Loom"
            icon={<SvgExternalLink />}
            data-name="WatchOnLoomBtn"
          />
        </LoomLink>
      </Tooltip>
    </div>
  );
};
