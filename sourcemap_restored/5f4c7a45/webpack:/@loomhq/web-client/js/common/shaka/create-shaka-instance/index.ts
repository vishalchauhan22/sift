import {
  loadUrl,
  UPGRADED_SHAKA_PLAYER_CONFIGURATION,
  ShakaInstance,
} from '@js/common/shaka';

// This mux.js dependency is NOT the same as mux.com. It's an implicit dependency of Shaka Player.
// So while it may look like we can remove it, we can't. Removing it will cause HLS videos to break.
import muxjs from 'mux.js';

// @ts-expect-error shaka typing is weird
import shakaForkLatest from 'shaka-player-latest';

import { M3U8 } from '@loomhq/shared-utilities/constants/mimes';

import { ShakaInstanceArgType } from '../types';

export const createShakaInstance = ({
  manifestUrl,
  videoElement,
  partCredentials,
  onLoadError = () => undefined,
  preload,
  mimeType,
  abrConfig,
}: ShakaInstanceArgType): Promise<ShakaInstance> => {
  if (mimeType === M3U8) {
    // muxjs is for serving HLS with Shaka Player where .ts files cannot be played
    // It's an implicit dependency of Shaka Player. Even though this line looks like it's
    // writing a global variable that never gets read, it is actually read by Shaka Player.
    globalThis.muxjs = muxjs;
  }

  const player = new shakaForkLatest.Player(videoElement);

  const shakaConfiguration = UPGRADED_SHAKA_PLAYER_CONFIGURATION;

  player.configure({
    ...shakaConfiguration,
    streaming: {
      ...shakaConfiguration.streaming,
      bufferingGoal: preload ? shakaConfiguration.streaming?.bufferingGoal : 0,
      useNativeHlsOnSafari: true,
    },
    abr: abrConfig,
  });

  loadUrl({
    player,
    manifestUrl,
    partCredentials,
    mimeType,
  }).catch(error => {
    onLoadError(error);
  });

  return player;
};
