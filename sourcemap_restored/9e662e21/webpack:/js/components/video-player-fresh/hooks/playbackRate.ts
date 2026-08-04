import {
  STICKY_PLAYBACK_OFF,
  STICKY_PLAYBACK_PARAM,
} from '@js/constants/playbackRate';

import {
  Player,
  Video,
  SystemEvents,
  UiEvents,
  SuggestedPlaybackRates,
  usePlayer,
} from '@js/common/video-player';
import { useEffect } from 'react';

import { convertSuggestedPlaybackRateFromEnumToNumber } from '@js/utilities/playbackRate';

import { getParam } from '@js/utilities/url';

import { SDK_RECORDER } from '@loomhq/shared-utilities/constants/recordingClients';
import { SUGGESTED_PLAYBACK_RATE_NONE } from '@loomhq/shared-utilities/constants/video';
import {
  PLAYBACK_RATE,
  WATCH_TIME_SAVED_CELEBRATION_SEEN,
} from '@js/constants/localStorage';

import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

const PLAYBACK_RATE_1X = 1;
const DEFAULT_PLAYBACK_RATE = 1.2;

export function useStickyPlaybackRate(video: Video): void {
  const player = usePlayer(video.id);

  const playbackRates = Player.rates();
  const suggestedPlaybackRate =
    video.suggestedPlaybackRate || SUGGESTED_PLAYBACK_RATE_NONE;
  const isOwner = Boolean(video.isOwner);
  const recordingClient = video.videoProperties?.recordingClient;

  useEffect(() => {
    if (!player) {
      return;
    }

    player.playbackRate = getInitialPlaybackRate(
      suggestedPlaybackRate,
      isOwner,
      recordingClient
    );

    if (!player.isReady()) {
      // player will transition to its default playback rate when ready, set that
      player.media.defaultPlaybackRate = getInitialPlaybackRate(
        suggestedPlaybackRate,
        isOwner,
        recordingClient
      );
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, suggestedPlaybackRate, isOwner]);

  useEffect(() => {
    if (!player) {
      return;
    }

    const onSpeedChange = () => {
      if (!playbackRates.includes(player.playbackRate)) {
        return;
      }

      if (!player.isReady()) {
        player.media.defaultPlaybackRate = player.playbackRate;
      }
    };

    const onRateClicked = () => {
      // only save playback rate to local storage if
      // the rate is manually changed by the user
      savePlaybackRate(player.playbackRate);
    };

    player.on([SystemEvents.speed], onSpeedChange);
    player.on([UiEvents.rateChangeClicked], onRateClicked);

    return () => {
      player.off([SystemEvents.speed], onSpeedChange);
      player.off([UiEvents.rateChangeClicked], onRateClicked);
    };
  }, [player, playbackRates, video.modelId]);
}

function getInitialPlaybackRate(
  suggestedPlaybackRate: SuggestedPlaybackRates,
  isOwner: boolean,
  recordingClient: string | undefined
) {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const playbackFromLS = getLocalStoragePlaybackRate();

  if (
    playbackFromLS === STICKY_PLAYBACK_OFF ||
    recordingClient === SDK_RECORDER
  ) {
    return PLAYBACK_RATE_1X;
  }

  const userHasSetPlaybackRatePreference = playbackFromLS != null;
  const suggestedPlaybackRateIsSet =
    suggestedPlaybackRate !== SUGGESTED_PLAYBACK_RATE_NONE;

  // if the user's playback rate preference is
  // faster than 1x, don't show the "saved time" banner
  if (userHasSetPlaybackRatePreference && playbackFromLS > PLAYBACK_RATE_1X) {
    setLocalStorageKey(WATCH_TIME_SAVED_CELEBRATION_SEEN, true);
  }

  // if video has a suggested playback rate
  // and the user is the owner or they haven't set their playback rate preference,
  // set playback rate to the suggested playback rate
  const setInitialPlaybackRateAsSuggestedRate =
    suggestedPlaybackRateIsSet &&
    (!userHasSetPlaybackRatePreference || isOwner);

  if (setInitialPlaybackRateAsSuggestedRate) {
    return convertSuggestedPlaybackRateFromEnumToNumber(suggestedPlaybackRate);
  }

  // if the initial rate hasn't been set to the suggested playback rate
  // and the user has a playback preference,
  // set playback rate to the user's preference
  if (userHasSetPlaybackRatePreference) {
    return playbackFromLS;
  }

  // default playback rate is 1.2x
  return DEFAULT_PLAYBACK_RATE;
}

function savePlaybackRate(playbackRate: number) {
  if (getLocalStoragePlaybackRate() === STICKY_PLAYBACK_OFF) {
    return;
  }

  setLocalStorageKey(PLAYBACK_RATE, playbackRate);
}

function getLocalStoragePlaybackRate() {
  const playbackQueryParam = getParam(STICKY_PLAYBACK_PARAM);

  if (playbackQueryParam === STICKY_PLAYBACK_OFF) {
    setLocalStorageKey(PLAYBACK_RATE, STICKY_PLAYBACK_OFF);

    return STICKY_PLAYBACK_OFF;
  }

  return getLocalStorageKey(PLAYBACK_RATE);
}
