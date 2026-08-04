import debounce from 'lodash/debounce';
import { useEffect } from 'react';

import {
  Video,
  usePlayerFromContext,
  SystemEvents,
} from '@js/common/video-player';
import { PLAYBACK_VOLUME } from '@js/constants/localStorage';

import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

const DEFAULT_VOLUME = 1;

function isVolumeValid(volume: number): boolean {
  return volume >= 0 && volume <= 1;
}

function setStickyAudioVolume(volume: number): void {
  if (isVolumeValid(volume)) {
    setLocalStorageKey(PLAYBACK_VOLUME, volume);
  }
}

function getStickyAudioVolume(): number {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const volumeFromLS = getLocalStorageKey(PLAYBACK_VOLUME) ?? DEFAULT_VOLUME;
  const stickyVolume = Number(volumeFromLS);

  if (!Number.isNaN(stickyVolume) && isVolumeValid(stickyVolume)) {
    return stickyVolume;
  }

  return DEFAULT_VOLUME;
}

export function useStickyVolume(video: Video): void {
  const player = usePlayerFromContext();

  useEffect(() => {
    if (!player) {
      return;
    }

    player.volume = getStickyAudioVolume();
  }, [player]);

  useEffect(() => {
    if (!player) {
      return;
    }

    const debouncedOnVolumeChanged = debounce((volume: number) => {
      if (!player.isReady()) {
        return;
      }

      setStickyAudioVolume(volume);
    }, 500);

    player.on([SystemEvents.volume], debouncedOnVolumeChanged);

    return () => {
      player.off([SystemEvents.volume], debouncedOnVolumeChanged);
    };
  }, [player, video.modelId]);
}
