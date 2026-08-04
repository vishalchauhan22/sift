import { sendVideoPlaybackEvent } from '@js/common/analytics/atlassian-analytics/use-send-operational-event';
import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { isShakaSupported } from '@js/common/shaka';

import { Player, SystemEvents } from '@js/common/video-player';
import { Video, useVideoContext } from '@js/common/video-player/context';
import { usePlayer } from '@js/common/video-player/hooks';
import {
  DEFAULT_TO_MP4_REASONS,
  formatCommonEventFields,
  getVideoAge,
  PLAYER_EVENTS,
  PlayerContext,
  ReportPlayerDistributionFn,
  ReportPlayerEventFn,
} from '@js/components/video-player-fresh/playback/events';
import {
  destroyMseTech,
  setupPlayerJsAdapter,
  shouldWaitForTranscodeComplete,
} from '@js/components/video-player-fresh/utils';
import { setupMp4 } from '@js/components/video-player-fresh/utils/mp4';
import {
  playerDistributionMetric,
  playerIncrementMetric,
} from '@js/components/video-player-fresh/utils/player-logging';
import { VideoSourceContext } from '@js/components/video-player-fresh/video-source/context';
import React, { useState, useCallback } from 'react';
import { getCookie } from '@js/utilities/cookieUtils';

import { M3u8Adapter } from '@js/utilities/m3u8adapter';
import { useTriggerContext } from '@js/utilities/rum/TransitionTimer';
import {
  MarkersForTriggers,
  SuccessMarkers,
} from '@js/utilities/rum/constants';
import { useMarkRUMSuccess } from '@js/utilities/rum/markers';

import { getParam } from '@js/utilities/url';

import { KEY_ANON_COMMENT } from '@loomhq/shared-utilities/constants/cookie';

import { DASH, M3U8, MP4 } from '@loomhq/shared-utilities/constants/mimes';

import { V4 } from '@loomhq/shared-utilities/constants/recordingVersions';

import {
  logPlayerStatsToDataDogRum,
  LogReason,
} from './logPlayerStatsToDatadogRum';
import { refreshIfPolicyExpired } from './refresh-if-policy-expired';
import { setupShaka } from './setup-shaka';

// Only used by browsers that don't support the Network Information API (e.g. Firefox)
// This is set a little higher than our highest rung so the highest quality variant is selected on start
const DEFAULT_BANDWIDTH_ESTIMATE_BPS = 4000000;

export function useHandleSource(
  video: Video,
  {
    preload = false,
    playerName,
  }: {
    // If true, we start prefetching video segments immediately.
    // This is primarily useful for the main share page player, where
    // we want to prioritize fast playback. For players like embed,
    // notifications, or comments, we don't want to start prefetching
    // because it's not clear if the user will actually play the video.
    preload?: boolean; // The name of the player. This is used for logging purposes.
    playerName: string;
  }
): void {
  const player = usePlayer(video.id);

  const {
    setVideo,
    video: {
      videoWorkspacePlan,
      videoWorkspacePlanIncludesAI,
      videoWorkspaceSiteId,
      modelId,
    },
  } = useVideoContext();
  const waitForTranscodeComplete = shouldWaitForTranscodeComplete(
    video.videoProperties?.mediaMetadataRotation
  );
  const abrConfig = {
    defaultBandwidthEstimate: DEFAULT_BANDWIDTH_ESTIMATE_BPS,
  };
  const shouldForceMp4 = getParam('forceMp4') === 'true';

  // We use a ref here so that we can update this without triggering a re-render
  const defaultToMp4ReasonRef = React.useRef<string>(
    waitForTranscodeComplete
      ? DEFAULT_TO_MP4_REASONS.WAIT_FOR_TRANSCODE
      : shouldForceMp4
        ? DEFAULT_TO_MP4_REASONS.QUERY_PARAM
        : DEFAULT_TO_MP4_REASONS.UNKNOWN
  );

  const [playerInfoAtError, setPlayerInfoAtError] = useState<{
    time: number | null;
    status: Player['status'] | null;
  }>({ time: null, status: null });

  const videoSourceContext = React.useContext(VideoSourceContext);

  const { markSuccess: markTriggerSuccess } = useTriggerContext();
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const { source, initialMimeType, forceMp4, setForceMp4 } = videoSourceContext;

  // Store this as a state variable so that it only gets calculated the very first time this runs.
  const [fallbackFrom] = useState(() =>
    forceMp4 ? 'default' : initialMimeType
  );

  // Called when Shaka streaming fails. When this occurs, we switch to MP4 playback,
  // which does not use Shaka.
  const onUnrecoverableError = useCallback(() => {
    // Mark the time when we failed so that we can resume from that point
    // when we switch to MP4.
    setPlayerInfoAtError({
      time: player?.started ? player.currentTime : null,
      status: player?.status ?? null,
    });
    setForceMp4(true);
  }, [setForceMp4, player]);

  const makePlayerContext = (): PlayerContext => {
    return {
      videoRecordingVersion: video.videoProperties.recordingVersion,
      videoMimeType: initialMimeType,
      playerName,
      videoAge: getVideoAge(video),
      currentMimeType: forceMp4 ? MP4 : initialMimeType,
    };
  };
  const reportPlayerEvent: ReportPlayerEventFn = (
    eventName,
    extras = {},
    { flush = false } = {}
  ) => {
    const playerContext = makePlayerContext();
    playerIncrementMetric({
      name: eventName,
      tags: {
        ...formatCommonEventFields({
          playerContext,
          extras,
        }),
        videoWorkspacePlan,
        hasComposition:
          videoSourceContext.source?.sourceUrl.includes('-composition-'),
      },
      flush,
    });

    if (
      playerContext.videoRecordingVersion !== V4 &&
      (eventName === PLAYER_EVENTS.LOADING_STARTED ||
        (eventName === PLAYER_EVENTS.PLAYER_ERROR && extras.fatal))
    ) {
      // Send viewing operational event to Atlassian Analytics
      sendVideoPlaybackEvent({
        eventName,
        extras,
        videoId: modelId,
        videoWorkspacePlan: videoWorkspacePlan || '',
        videoWorkspacePlanIncludesAI: videoWorkspacePlanIncludesAI || false,
        videoWorkspaceSiteId: videoWorkspaceSiteId || '',
        videoWorkspaceLoomOrgId: Number(video.organizationId),
        playerContext,
      });
    }
  };
  const reportPlayerDistribution: ReportPlayerDistributionFn = (
    eventName: string,
    duration: number,
    extras = {}
  ) => {
    playerDistributionMetric(
      eventName,
      duration,
      formatCommonEventFields({
        playerContext: makePlayerContext(),
        extras,
      })
    );
  };
  // https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.Stats
  const reportShakaStats = ({ stats }: { stats: Record<string, any> }) => {
    reportPlayerDistribution(
      PLAYER_EVENTS.STATS_STALLS_DETECTED,
      stats.stallsDetected ?? 0
    );
    reportPlayerDistribution(
      PLAYER_EVENTS.STATS_PLAY_TIME,
      stats.playTime ?? 0
    );
    reportPlayerDistribution(
      PLAYER_EVENTS.STATS_STREAM_BANDWIDTH,
      stats.streamBandwidth ?? 0
    );
  };
  const anonId = getCookie(KEY_ANON_COMMENT);

  // Pass in anon id if user is not logged in
  const { id: userIdOrAnonId, email: userEmail } = useCurrentUserSelector(
    (user: any) => user,
    { id: anonId, email: '' }
  );
  const markSuccess = useMarkRUMSuccess();

  const isVideoPlayable = (video: Video): boolean => {
    if (video.uploadComplete && !source) {
      return false;
    }

    if (!player || !video.uploadComplete) {
      return false;
    }

    return true;
  };

  const setupGetLoomPlayerLogs = () => {
    if (!player) {
      return;
    }

    if (
      userEmail &&
      userEmail.match(/@loom\.com/) &&
      !window.getLoomPlayerLogs
    ) {
      window.getLoomPlayerLogs = () => {
        return player.logs;
      };
    }
  };

  React.useEffect(
    () => {
      if (!isVideoPlayable(video) || !source) {
        return;
      }

      if (!player) {
        return;
      }

      markSuccess(SuccessMarkers.ShakaPlayerInit);

      setupGetLoomPlayerLogs();

      // update videoSource
      const nextVideoObj = {
        ...video,
        // need to set id to DB model ID and not current randomly generated uuid to update
        source,
        id: video.modelId ?? '',
      };

      setVideo(nextVideoObj as Video);

      const mimeType = source.sourceMimeType;

      player.mime = mimeType;

      let hasLoggedPlaybackStarted = false;
      let hasLoggedShakaStats = false;
      let hasLoggedCanPlay = false;
      let playbackRequestTime: number | null = null;
      let seekRequestTime: number | null = null;
      // Track current rate so that we can resume playback if there's a seek stall
      let currentRate: number = player.playbackRate;
      // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
      const markRUMVideoCanPlay = () => {
        if (hasLoggedCanPlay) {
          return;
        }

        hasLoggedCanPlay = true;

        markSuccess(SuccessMarkers.VideoCanPlay);
        markTriggerSuccess(MarkersForTriggers.VideoCanPlay);
      };

      const logPlaybackRequested = () => {
        playbackRequestTime = performance.now();
        reportPlayerEvent(PLAYER_EVENTS.PLAYBACK_START_REQUESTED);
      };
      const logPlaybackStarted = () => {
        if (hasLoggedPlaybackStarted) {
          return;
        }

        hasLoggedPlaybackStarted = true;

        if (playbackRequestTime) {
          reportPlayerDistribution(
            PLAYER_EVENTS.PLAYBACK_STARTUP_TIME,
            performance.now() - playbackRequestTime
          );
        }

        reportPlayerEvent(PLAYER_EVENTS.PLAYBACK_STARTED);
      };
      const logPlaybackEnded = () => {
        if (!hasLoggedShakaStats) {
          hasLoggedShakaStats = true;

          if (player.mseTech) {
            reportShakaStats({
              stats: player.mseTech.getStats(),
            });
            logPlayerStatsToDataDogRum(
              player.mseTech.getStats(),
              LogReason.PlaybackEnded
            );
          }
        }

        reportPlayerEvent(PLAYER_EVENTS.PLAYBACK_FINISHED, {}, { flush: true });
      };
      const logBeforeUnload = () => {
        if (player.userRequestedPlayback && !player.started) {
          // reportShakaStats will flush.
          reportPlayerEvent(
            PLAYER_EVENTS.EXIT_BEFORE_START,
            {},
            { flush: true }
          );
        } else if (player.mseTech) {
          logPlayerStatsToDataDogRum(
            player.mseTech.getStats(),
            LogReason.BeforeUnloadEvent
          );
        }
      };
      const startSeekingMetric = () => {
        seekRequestTime = performance.now();
      };
      const endSeekingMetric = () => {
        if (seekRequestTime) {
          reportPlayerDistribution(
            PLAYER_EVENTS.SEEKING_TIME,
            performance.now() - seekRequestTime
          );
          seekRequestTime = null;
        }

        if (
          player.playbackRate !== currentRate &&
          M3u8Adapter.currentPlatformSupportsNativeHls()
        ) {
          // Native HLS players (i.e., Safari or iOS) sometimes have seek issues
          // where playback stops or jump back after seeking. To fix this, we manually
          // set the playback rate back to what it was.
          // See https://github.com/shaka-project/shaka-player/issues/3367 for more deais.
          player.playbackRate = currentRate;
        }
      };

      const trackCurrentRate = () => {
        currentRate = player.playbackRate;
      };

      player.mediaOn(['canplay'], markRUMVideoCanPlay);
      player.mediaOn(['seeking'], startSeekingMetric);
      player.mediaOn(['canplay'], endSeekingMetric);
      player.on([SystemEvents.started], logPlaybackStarted);
      player.mediaOn(['ended'], logPlaybackEnded);
      // PlaybackRequested should trigger once and not immediately.
      player.on([SystemEvents.userPlay], logPlaybackRequested, true, true);
      player.mediaOn(['ratechange'], trackCurrentRate);
      window.addEventListener('beforeunload', logBeforeUnload);

      if (refreshIfPolicyExpired(source)) {
        return;
      }

      const initialFallbackToMp4 = ({
        metricTag,
        stage,
        defaultToMp4Reason,
      }: {
        metricTag: string;
        stage: string;
        defaultToMp4Reason: string;
      }) => {
        setForceMp4(true);
        defaultToMp4ReasonRef.current = defaultToMp4Reason;

        reportPlayerEvent(metricTag, {
          videoType: mimeType,
          stage,
        });
      };

      if (mimeType === MP4) {
        if (initialMimeType === MP4) {
          defaultToMp4ReasonRef.current =
            DEFAULT_TO_MP4_REASONS.ORIGINAL_VIDEO_SOURCE;
        }

        setupMp4({
          player,
          fallbackFrom,
          defaultToMp4Reason: defaultToMp4ReasonRef.current,
          source,
          playerStatusAtError: playerInfoAtError.status,
          playerTimeAtError: playerInfoAtError.time,
          video,
          userAnonId: userIdOrAnonId ?? '',
          reportPlayerEvent,
        });
      } else if (mimeType === DASH || mimeType === M3U8) {
        const isSupported = isShakaSupported();

        if (!isSupported) {
          initialFallbackToMp4({
            metricTag: 'shaka.unsupported',
            stage: 'isShakaSupported',
            defaultToMp4Reason: DEFAULT_TO_MP4_REASONS.SHAKA_UNSUPPORTED,
          });

          return;
        }

        setupShaka({
          mimeType,
          player,
          video,
          source,
          onUnrecoverableError,
          preload,
          reportPlayerEvent,
          reportPlayerDistribution,
          abrConfig,
          markSuccess,
          isLoggedIn,
        });
      } else {
        throw new Error('Mimetype should be either M3U8, MP4 or DASH');
      }

      // setup embed API
      setupPlayerJsAdapter(player.media);

      return () => {
        destroyMseTech(player);
        player.mediaOn(['canplay'], markRUMVideoCanPlay);
        player.mediaOff(['play'], logPlaybackStarted);
        player.mediaOff(['ended'], logPlaybackEnded);
        player.mediaOff(['ratechange'], trackCurrentRate);
        player.off([SystemEvents.userPlay], logPlaybackRequested);
      };
    },

    // we DO not want video to be a dependency
    // captions will cause the effect to re-run
    // in a quick succession, breaking playback.
    // shut up eslinter!
    // eslint-disable-next-line
    [player, source, userIdOrAnonId, video.uploadComplete]
  );
}
