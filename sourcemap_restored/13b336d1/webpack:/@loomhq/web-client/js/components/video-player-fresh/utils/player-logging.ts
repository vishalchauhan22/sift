import { Player } from '@js/common/video-player';

import {
  sendDistributionMetric,
  sendIncrementMetric,
  flushPendingMetrics,
  MetricDistribution,
} from '@loomhq/loom-js-statsd/frontend';
import {
  DASH,
  M3U8,
  VideoPlaybackMimeType,
} from '@loomhq/shared-utilities/constants/mimes';

type VideoPlaybackMimeTypeCopy = VideoPlaybackMimeType;

export const PLAYER_LOG_SLICE = -10;

export const makePushPlayerLogs = (player: Player) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (name: string, context?: any): void => {
    if (!player) {
      return;
    }

    player.pushLog(name, context);
  };
};

interface PlayerIncrementMetricParams {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  tags?: Record<string, any>;
  count?: number;
  flush?: boolean;
}

export const playerIncrementMetric = ({
  name,
  tags = {},
  count = 1,
  flush = false,
}: PlayerIncrementMetricParams): void => {
  sendIncrementMetric({ name: `player.${name}`, count, tags });

  if (flush) {
    flushPendingMetrics();
  }
};

export const playerDistributionMetric = (
  name: string,
  value: number,
  tags: MetricDistribution['tags']
): void => {
  sendDistributionMetric({
    name: `player.${name}`,
    value: Number(value),
    tags,
  });
};

export const parseCacheHeaderString = (header = ''): string => {
  if (!header || !header.split) {
    return '';
  }

  return String(header).split(' ')[0];
};

const PAGE_LOAD_TIMESTAMP = Date.now();

// Get the time since the page loaded, rounded to the nearest hundred seconds
export const getRoundedTs = (): number =>
  Math.round((Date.now() - PAGE_LOAD_TIMESTAMP) / 100) * 100;

export function getLogTypesByMimeType(mimeType: VideoPlaybackMimeTypeCopy): {
  loggingPrefix: string;
  logTypeLoadError: string;
  logTypeInit: string;
  logTypeFragmentLoaded: string;
  logTypeBuffering: string;
  logTypeSetupError: string;
  logTypePlaybackError: string;
  logTypePlaybackErrorMax: string;
  logTypeStreamingError: string;
  logTypeStreamingErrorMax: string;
} {
  if (mimeType !== DASH && mimeType !== M3U8) {
    throw new Error('Shaka only supports Dash or HLS');
  }

  if (mimeType === DASH) {
    return {
      loggingPrefix: 'dash',
      logTypeLoadError: 'dashLoadError',
      logTypeInit: 'dashInit',
      logTypeFragmentLoaded: 'dashFragmentLoaded',
      logTypeBuffering: 'dashBuffering',
      logTypeSetupError: 'dashSetupError',
      logTypePlaybackError: 'dashPlaybackError',
      logTypePlaybackErrorMax: 'dashPlaybackErrorMax',
      logTypeStreamingError: 'dashStreamingError',
      logTypeStreamingErrorMax: 'dashStreamingErrorMax',
    };
  }

  return {
    loggingPrefix: 'hlsShaka',
    logTypeLoadError: 'hlsShakaLoadError',
    logTypeInit: 'hlsShakaInit',
    logTypeFragmentLoaded: 'hlsShakaFragmentLoaded',
    logTypeBuffering: 'hlsShakaBuffering',
    logTypeSetupError: 'hlsShakaSetupError',
    logTypePlaybackError: 'hlsShakaPlaybackError',
    logTypePlaybackErrorMax: 'hlsShakaPlaybackErrorMax',
    logTypeStreamingError: 'hlsShakaStreamingError',
    logTypeStreamingErrorMax: 'hlsShakaStreamingErrorMax',
  };
}
