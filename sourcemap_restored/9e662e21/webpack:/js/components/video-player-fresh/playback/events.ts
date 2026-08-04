import { HOME_PAGE, NOTIFICATIONS_PAGE } from '@js/constants/routes';

import Bowser from 'bowser';

import { Video } from '@js/common/video-player';
import { VideoModel } from '@js/common/video-player/context';
import { deviceDetails } from '@js/utilities/device';

// prefix 'player.' is added in playerIncrementMetric.
// Docs: https://hello.atlassian.net/wiki/spaces/bd1da5ce3af34660a23b9404c3a2e566/pages/5221117238
/* eslint-disable sort-keys --  the PLAYER_EVENTS keys seem to be in order of behavior which may be clearer to read */
export const PLAYER_EVENTS = {
  // Events reported as metrics to Datadog

  // When we first initialize the Shaka player
  LOADING_STARTED: 'loadingStarted',
  // When the player is ready to play
  READY: 'ready',
  // When the user clicks the play button
  PLAYBACK_START_REQUESTED: 'playbackStartRequested',
  // When the video starts playing (theoretically after the user clicks play)
  PLAYBACK_STARTED: 'playbackStarted',
  // When there's an error while playing
  PLAYER_ERROR: 'playerError',
  // When we get a gapjumped event from Shaka (https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:GapJumpedEvent)
  GAP_JUMPED: 'gapJumped',
  // When we get a stalldetected event from Shaka (https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:StallDetectedEvent)
  STALL_DETECTED: 'stallDetected',
  // When the resolution variant changes (either from the user changing resolution or Shaka automatically doing it)
  VARIANT_CHANGED: 'variantChanged',
  // Whe we get a buffering event from Shaka (https://shaka-player-demo.appspot.com/docs/api/shaka.Player.html#.event:BufferingEvent)
  BUFFERING: 'buffering',
  // When the user leaves the page after they clicked play but before the video started (indicates user frustration)
  EXIT_BEFORE_START: 'exitBeforeStart',
  // When we switch to playing the video's mp4 because the HLS/DASH stream failed
  MP4_FALLBACK: 'mp4Fallback',
  // When the mp4 playback fails
  MP4_ERROR: 'mp4Error',
  // When the playback reaches the end of the video
  PLAYBACK_FINISHED: 'playbackFinished',
  // For reporting stats that Shaka already measures (https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.Stats)
  STATS_STALLS_DETECTED: 'statsStallsDetected',
  STATS_PLAY_TIME: 'statsPlayTime',
  STATS_TRACK_SWITCHES: 'statsTrackSwitches',
  STATS_MANIFEST_TIME: 'statsManifestTime',
  STATS_STREAM_BANDWIDTH: 'statsStreamBandwidth',

  // Events reported as distributions to Datadog (for performance monitoring)

  // The time between PLAYBACK_START_REQUESTED and PLAYBACK_STARTED
  PLAYBACK_STARTUP_TIME: 'playbackStartupTime',
  // The time the player takes between seek requested and playback can begin.
  SEEKING_TIME: 'seekingTime',
  // The time the player spends in a buffering state
  BUFFERING_TIME: 'bufferingTime',
  // The time it takes to load a fragment
  FRAGMENT_LOAD_TIME: 'fragmentLoadTime',
  // The number of stalldetected events received over the course of playing a video fully
  PLAYBACK_STALLS: 'playbackStalls',
};
/* eslint-enable sort-keys */

export const ERROR_CATEGORIES = {
  SETUP: 'setup',
  LOAD: 'load',
  PLAYBACK: 'playback',
  STREAMING: 'streaming',
};

const SUPPORTED_BROWSER_NAMES = [
  'chrome',
  'microsoft_edge',
  'firefox',
  'opera',
  'safari',
];

const SUPPORTED_OPERATING_SYSTEM_NAMES = [
  'windows',
  'macos',
  'android',
  'chrome_os',
  'linux',
  'ios',
];

export type ReportPlayerEventFn = (
  eventName: string,
  extras?: Record<string, unknown>,
  opts?: { flush?: boolean }
) => void;
export type ReportPlayerDistributionFn = (
  eventName: string,
  value: number,
  extras?: Record<string, unknown>
) => void;

export const DEFAULT_TO_MP4_REASONS = {
  WAIT_FOR_TRANSCODE: 'waitForTranscode',
  QUERY_PARAM: 'queryParam',
  DASH_UNSUPPORTED: 'dashUnsupported',
  HLS_UNSUPPORTED: 'hlsUnsupported',
  SHAKA_UNSUPPORTED: 'shakaUnsupported',
  ORIGINAL_VIDEO_SOURCE: 'originalVideoSource',
  UNKNOWN: 'unknown',
};

type UAInfo = {
  osName: Bowser.Parser.ParsedResult['os']['name'];
  browserName: Bowser.Parser.ParsedResult['browser']['name'];
};
type PlayerInfo = {
  player?: 'shaka' | 'hlsjs';
  playerVersion?: string;
};

type PlayerVideoInfo = {
  videoRecordingVersion: VideoModel['videoProperties']['recordingVersion'];
  videoMimeType?: string;
  playerName: string;
  videoAge: string;
  currentMimeType: string;
};

export type PlayerContext = PlayerInfo & PlayerVideoInfo;

type Extras = { extras?: Record<string, unknown> };

export type PlayerEventCommonFields = PlayerInfo &
  PlayerVideoInfo &
  UAInfo & {
    page: string;
  };

export function getCurrentPageName(): string {
  const pathname = window.location.pathname;

  if (pathname.startsWith(HOME_PAGE)) {
    return 'home';
  }

  if (pathname.startsWith(NOTIFICATIONS_PAGE)) {
    return 'notifications';
  }

  if (pathname.startsWith('/share')) {
    return 'share';
  }

  if (pathname.startsWith('/embed')) {
    return 'embed';
  }

  return 'other';
}

export function getCleanedBrowserName(browserName: string | undefined): string {
  if (
    browserName &&
    SUPPORTED_BROWSER_NAMES.includes(browserName.toLowerCase())
  ) {
    return browserName;
  }

  return 'other';
}

export function getCleanedOSName(osName: string | undefined): string {
  if (
    osName &&
    SUPPORTED_OPERATING_SYSTEM_NAMES.includes(osName.toLowerCase())
  ) {
    return osName;
  }

  return 'other';
}

export function formatCommonEventFields({
  playerContext,
  extras,
}: {
  playerContext: PlayerContext;
  extras: Extras;
}): PlayerEventCommonFields {
  return {
    osName: getCleanedOSName(deviceDetails.os.name),
    browserName: getCleanedBrowserName(deviceDetails.browser.name),
    ...playerContext,
    ...extras,
    page: getCurrentPageName(),
  };
}

export function getVideoAge(video: Video): string {
  const createdAt = new Date(video.createdAt);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - createdAt.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 24) {
    return 'lessThanADay';
  } else if (diffInDays < 7) {
    return 'lessThanAWeek';
  } else if (diffInDays < 30) {
    return 'lessThan30Days';
  } else if (diffInDays < 90) {
    return 'lessThan90Days';
  }

  return 'moreThan90Days';
}
