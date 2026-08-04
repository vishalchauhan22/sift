// See https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.PlayerConfiguration

// @ts-expect-error shaka typing is weird
import shakaForkLatest from 'shaka-player-latest';

import { ShakaPlayerConfiguration } from '@js/common/shaka';

export const SHAKA_PLAYER_CONFIGURATION: ShakaPlayerConfiguration = {
  manifest: {
    hls: {
      sequenceMode: false,
    },
    retryParameters: {
      maxAttempts: 5,
    },
  },
  streaming: {
    bufferingGoal: 60,
    rebufferingGoal: 1.9,
    observeQualityChanges: true,
    preferNativeHls: false,
    retryParameters: {
      maxAttempts: 5,
    },
    useNativeHlsOnSafari: true,
  },
};

export const UPGRADED_SHAKA_PLAYER_CONFIGURATION: ShakaPlayerConfiguration = {
  manifest: {
    hls: {
      sequenceMode: false,
      ignoreManifestTimestampsInSegmentsMode: true,
    },
    retryParameters: {
      maxAttempts: 5,
    },
  },
  streaming: {
    bufferingGoal: 60,
    rebufferingGoal: 1.9,
    observeQualityChanges: true,
    preferNativeHls: false,
    retryParameters: {
      maxAttempts: 5,
    },
    useNativeHlsOnSafari: true,
  },
};

export const isShakaSupported = (): boolean => {
  return shakaForkLatest.Player.isBrowserSupported();
};

export const MEDIA_ERR_DECODE = 'MEDIA_ERR_DECODE';
export const MEDIA_ERR_SRC_NOT_SUPPORTED = 'MEDIA_ERR_SRC_NOT_SUPPORTED';
export const MANIFEST = 'MANIFEST';
export const SEGMENT = 'SEGMENT';
