import { Player, Video } from '@js/common/video-player';
import { PlayerLogTypes } from '@js/components/video-player-fresh/playerLogTypes';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';

import { VIDEO_PLAYER_MP4_REQUESTED } from '../../../constants/events';
import * as loggerx from '../../../utilities/loggerx';
import { PLAYER_EVENTS, ReportPlayerEventFn } from '../playback/events';
import { makePushPlayerLogs, PLAYER_LOG_SLICE } from './player-logging';

import { VideoSource } from '@js/components/video-player-fresh/video-source/useVideoSource';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

function getPercentProgress(
  currentTime: number,
  duration: number
): number | null {
  if (duration === 0) {
    return null;
  }

  // round to nearest 10 to avoid cardinality explosion
  return Math.round((currentTime / duration) * 10) * 10;
}

export const setupMp4 = ({
  player,
  fallbackFrom,
  defaultToMp4Reason,
  source,
  playerTimeAtError,
  playerStatusAtError,
  video,
  userAnonId,
  reportPlayerEvent,
}: {
  player: Player;
  fallbackFrom: string;
  defaultToMp4Reason: string;
  source: VideoSource;
  playerStatusAtError: Player['status'] | null;
  playerTimeAtError: number | null;
  video: Video;
  userAnonId: string;
  reportPlayerEvent: ReportPlayerEventFn;
}): void => {
  const pushPlayerLogs = makePushPlayerLogs(player);

  // If the source takes a long time to come back and the player is playing,
  // it'll hang unless this is set to true:
  const shouldPlayerResume = playerStatusAtError === 'playing';

  reportPlayerEvent(PLAYER_EVENTS.MP4_FALLBACK, {
    defaultToMp4Reason: fallbackFrom === 'default' ? defaultToMp4Reason : null,
    progress: getPercentProgress(
      playerTimeAtError ?? 0,
      video.videoProperties?.playableDuration ?? 0
    ),
  });

  player.media.src = source.sourceUrl;

  pushPlayerLogs(PlayerLogTypes.mp4Init, {
    shouldPlayerResume,
    playerTimeAtError,
  });

  player.mediaOn(['abort'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Abort, {
      data,
    });
  });

  player.mediaOn(['canplay'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4CanPlay, {
      data,
    });
  });

  player.mediaOn(['canplaythrough'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4CanPlayThrough, {
      data,
    });
  });

  player.mediaOn(['durationchange'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4DurationChange, {
      data,
    });
  });

  player.mediaOn(['emptied'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Emptied, {
      data,
    });
  });

  player.mediaOn(['ended'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Ended, {
      data,
    });
  });

  player.mediaOn(['error'], err => {
    loggerx.error(
      Error('MP4 Player errored'),
      {
        error: err,
        logsCount: player.logs.length,
        lastLogs: player.logs.slice(PLAYER_LOG_SLICE),
      },
      { feature: Feature.VideoPlayer }
    );

    pushPlayerLogs(PlayerLogTypes.mp4Error, {
      err,
    });
    reportPlayerEvent(PLAYER_EVENTS.MP4_ERROR);
  });

  player.mediaOn(['loadeddata'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4LoadedData, {
      data,
    });
  });

  player.mediaOn(['loadedmetadata'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4LoadedMetaData, {
      data,
    });
  });

  player.mediaOn(['loadstart'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4LoadStart, {
      data,
    });
  });

  player.mediaOn(['pause'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Pause, {
      data,
    });
  });

  player.mediaOn(['play'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Play, {
      data,
    });
  });

  player.mediaOn(['playing'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Playing, {
      data,
    });
  });

  player.mediaOn(['progress'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Progress, {
      data,
    });
  });

  player.mediaOn(['ratechange'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4RateChange, {
      data,
    });
  });

  player.mediaOn(['seeked'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Seeked, {
      data,
    });
  });

  player.mediaOn(['seeking'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Seeking, {
      data,
    });
  });

  player.mediaOn(['stalled'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Stalled, {
      data,
    });
  });

  player.mediaOn(['suspend'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Suspend, {
      data,
    });
  });

  player.mediaOn(['volumechange'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4VolumeChange, {
      data,
    });
  });

  player.mediaOn(['waiting'], data => {
    pushPlayerLogs(PlayerLogTypes.mp4Waiting, {
      data,
    });
  });

  // fallback: load mp4 and update playback rate from 0
  player.media.load();
  player.playbackRate = player.playbackRate || 1;

  // sets player time to what it was before error
  if (playerTimeAtError) {
    player.currentTime = playerTimeAtError;
  }

  // resumes player if fallback occurred during play
  if (shouldPlayerResume) {
    player.togglePlay();
  }

  analytics.track(VIDEO_PLAYER_MP4_REQUESTED, {
    ...withIdentifiers(
      VIDEO_PLAYER_MP4_REQUESTED,
      AnalyticsEntityId.video(video.id, 'videoId'),
      AnalyticsEntityId.anonymous(userAnonId, 'userAnonId')
    ),
    currentTime: player.currentTime,
  });
};
