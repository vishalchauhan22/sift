/* eslint-disable no-console */
import React from 'react';

import { videoContainerClassName } from '../variables';
import { usePlayer } from './player';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as logger from '@js/utilities/loggerx';

export const toggleTheaterEvent = new Event('theater');
export function toggleTheater({
  player,
  isTheater,
  videoId,
}: {
  player: HTMLVideoElement | null;
  isTheater: boolean;
  videoId: string;
}): void {
  if (!player) {
    return;
  }

  const cL = (player.closest(`.${videoContainerClassName}`) as HTMLElement)
    .classList;

  try {
    if (isTheater && !cL.contains('theater')) {
      cL.add('theater');
      window.localStorage.setItem(`theater:${videoId}`, '1');
    }

    if (!isTheater) {
      cL.remove('theater');
      window.localStorage.removeItem(`theater:${videoId}`);
    }
  } catch (e) {
    logger.error(
      e,
      {
        message: 'Error toggling theater mode',
      },
      { feature: Feature.VideoPlayer }
    );
  }
}

export function getTheaterPreference(videoId: string): boolean {
  try {
    return Boolean(window.localStorage.getItem(`theater:${videoId}`));
  } catch (e) {
    logger.error(
      e,
      {
        message: 'Error getting theater preference',
      },
      { feature: Feature.VideoPlayer }
    );
    return false;
  }
}

export const useTheaterMode = (videoId: string): (() => void) => {
  const player = usePlayer(videoId);
  const onClick = React.useCallback(() => {
    player?.toggleTheaterMode();
  }, [player]);

  return onClick;
};
