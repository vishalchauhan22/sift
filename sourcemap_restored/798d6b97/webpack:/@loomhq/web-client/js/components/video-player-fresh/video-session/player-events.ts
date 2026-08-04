import {
  EMOJI_REACTION_CLICKED,
  EMOJI_REACTION_CREATED,
  FULL_SCREEN_CLICK,
  PLAYBACK_RATE_CHANGE,
  QUALITY_SELECTOR_CHANGE,
  SHOW_VIDEO_PLAYER_END_SCREEN,
  START_SCREEN_SPEED_SELECTOR_CLICK,
  TOGGLE_CAPTIONS_OFF,
  TOGGLE_CAPTIONS_ON,
  VIDEO_PLAYER_ENTER_COMMENT_MODE,
  VIDEO_PLAYER_STEP,
  VIDEO_PLAYER_VIDEO_PAUSE,
  VIDEO_PLAYER_VIDEO_PLAY_START,
  VIDEO_STARTED_WITH_CAPTIONS_OFF,
  VIDEO_STARTED_WITH_CAPTIONS_ON,
  VIDEO_START_NOISE_SUPPRESSION,
  WATCH_AGAIN_CLICK,
} from '@js/constants/events';

import {
  NewReactionPayload,
  ReactionClickedPayload,
  SystemEvents,
  UiEvents,
  Video,
  VideoStepPayload,
  getActiveLanguageName,
  usePlayerFromContext,
  usePlayingStatus,
} from '@js/common/video-player';
import { SectionTitleContext } from '@js/contexts/SectionTitleContext';
import once from 'lodash/once';
import { useContext, useEffect, useMemo, useState } from 'react';

import { deviceDetails } from '@js/utilities/device';
import { SuccessMarkers } from '@js/utilities/rum/constants';
import { useMarkRUMSuccess } from '@js/utilities/rum/markers';

import { track } from '@js/utilities/analytics';

import { getAnonUserId } from '@js/utilities/auth-anon';
import { useTranscript } from '@js/common/transcripts';
import { captionsStore } from '@js/common/video-player/hooks/captionsStore';

export function usePlayerEventsListener(video: Video): void {
  const player = usePlayerFromContext();
  const sectionTitle = useContext(SectionTitleContext);
  const [pauseFired, setPauseFired] = useState(false);
  const [startCaptionsFired, setStartCaptionsFired] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const markRUMSuccess = useMarkRUMSuccess();
  const markVideoPlayerReady = useMemo(
    () =>
      once(() => {
        markRUMSuccess(SuccessMarkers.VideoPlayerReady);
      }),
    [markRUMSuccess]
  );

  const { captionsUrl, isCaptionsInOriginalLanguage } = useTranscript();
  const { captionsLanguageSelection } = captionsStore(state => state);
  const currentLanguage = getActiveLanguageName(captionsLanguageSelection);

  usePlayingStatusAnalytics(video);

  useEffect(() => {
    if (player?.started) {
      track(VIDEO_PLAYER_VIDEO_PLAY_START, {
        captions: player.closedCaptions,
        currentTime: player.duration,
        videoId: video.modelId,
        freshPlayer: true,
      });
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.started]);

  // noise suppression analytics
  useEffect(() => {
    if (player?.started) {
      track(VIDEO_START_NOISE_SUPPRESSION, {
        video_id: video.modelId,
        noise_suppression: Boolean(
          video.processingInformation?.noiseSuppression
        ),
      });
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.started, video.processingInformation?.noiseSuppression]);

  // caption start analytics
  useEffect(() => {
    if (playerReady && player?.started && captionsUrl && !startCaptionsFired) {
      const captionsActive = player?.closedCaptions;

      const eventName = captionsActive
        ? VIDEO_STARTED_WITH_CAPTIONS_ON
        : VIDEO_STARTED_WITH_CAPTIONS_OFF;

      track(eventName, {
        video_id: video.modelId,
        captions_visible: captionsActive,
        is_Default_Language: isCaptionsInOriginalLanguage,
        language: currentLanguage,
      });

      setStartCaptionsFired(false);
    }
  }, [
    playerReady,
    player?.started,
    player?.closedCaptions,
    video.modelId,
    captionsUrl,
    startCaptionsFired,
    currentLanguage,
    isCaptionsInOriginalLanguage,
  ]);

  useEffect(() => {
    // don't re-fire pause event
    if (player?.started && player?.paused && !pauseFired) {
      track(VIDEO_PLAYER_VIDEO_PAUSE, {
        currentTime: player.duration,
        videoId: video.modelId,
        freshPlayer: true,
      });

      setPauseFired(true);
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.paused, pauseFired, player?.started]);

  useEffect(() => {
    if (!player) {
      return;
    }

    const onSpeedChange = () => {
      const speed = player.playbackRate;

      track(PLAYBACK_RATE_CHANGE, {
        playbackRate: speed,
        currentTime: player.duration,
        videoId: video.modelId,
        videoView: video.views,
      });

      if (!player.started) {
        track(START_SCREEN_SPEED_SELECTOR_CLICK, {
          playbackRate: speed,
          videoId: video.modelId,
        });
      }
    };

    const toggleClosedCaptions = () => {
      const event = player.closedCaptions
        ? TOGGLE_CAPTIONS_ON
        : TOGGLE_CAPTIONS_OFF;

      track(event, {
        currentUserIsOwner: video.isOwner,
        video_id: video.modelId,
        captions_visible: player.closedCaptions,
      });
    };

    const reactionCreated = (payload: NewReactionPayload) => {
      track(EMOJI_REACTION_CREATED, {
        video_id: video.modelId,
        sentiment: payload.type,
        place_used: payload.placeUsed ?? null,
        freshPlayer: true,
        videoView: video.views,
      });
    };

    const watchAgainClicked = () => {
      track(WATCH_AGAIN_CLICK, {
        video_id: video.modelId,
      });
    };

    const emojiReactionClicked = (payload: ReactionClickedPayload) => {
      track(EMOJI_REACTION_CLICKED, {
        video_id: video.modelId,
        currentUserIsOwner: video.isOwner,
        sentiment: payload.type,
      });
    };

    const fullScreenClicked = () => {
      track(FULL_SCREEN_CLICK);
    };

    const videoStepClicked = (payload: VideoStepPayload) => {
      track(VIDEO_PLAYER_STEP, {
        stepType: payload.direction === 'back' ? 'back' : 'forward',
        stepDuration: payload.amount,
        videoId: video.modelId,
      });
    };

    const onCommentMode = (isOpen: boolean) => {
      if (isOpen) {
        track(VIDEO_PLAYER_ENTER_COMMENT_MODE, {
          video_id: video.modelId,
          from_end_screen: player.status === 'ended',
        });
      }
    };

    const onQualityChange = ({ qualitySelection }) => {
      track(QUALITY_SELECTOR_CHANGE, {
        video_id: video.modelId,
        anonymous_user_id: getAnonUserId(),
        quality_selection: qualitySelection,
        currentTime: player.duration,
        deviceDetails,
      });
    };

    const onReady = () => {
      setPlayerReady(true);
      markVideoPlayerReady();
    };

    player.on([UiEvents.rateChangeClicked], onSpeedChange);
    player.on([UiEvents.videoQualityChanged], onQualityChange);
    player.on([SystemEvents.closedCaptions], toggleClosedCaptions, false, true);
    player.on([SystemEvents.ready], onReady);
    player.on([UiEvents.newReaction], reactionCreated);
    player.on([UiEvents.watchAgainClicked], watchAgainClicked);
    player.on([UiEvents.reactionClicked], emojiReactionClicked);
    player.on([UiEvents.fullScreenClicked], fullScreenClicked);
    player.on([UiEvents.videoStepClicked], videoStepClicked);
    player.on([UiEvents.commentFormToggle], onCommentMode);

    return () => {
      player.off([UiEvents.rateChangeClicked], onSpeedChange);
      player.off([UiEvents.videoQualityChanged], onQualityChange);
      player.off([SystemEvents.closedCaptions], toggleClosedCaptions);
      player.off([SystemEvents.ready], onReady);
      player.off([UiEvents.newReaction], reactionCreated);
      player.off([UiEvents.watchAgainClicked], watchAgainClicked);
      player.off([UiEvents.reactionClicked], emojiReactionClicked);
      player.off([UiEvents.fullScreenClicked], fullScreenClicked);
      player.off([UiEvents.videoStepClicked], videoStepClicked);
      player.off([UiEvents.commentFormToggle], onCommentMode);
    };
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markRUMSuccess, player, video]);
}

function usePlayingStatusAnalytics(video: Video) {
  const { status } = usePlayingStatus(video.id);

  useEffect(() => {
    if (status === 'ended') {
      track(SHOW_VIDEO_PLAYER_END_SCREEN, {
        cta_type: 'large-cta',
        video_id: video.modelId,
        from_url: window.location.href,
      });
    }
  }, [status, video]);
}
