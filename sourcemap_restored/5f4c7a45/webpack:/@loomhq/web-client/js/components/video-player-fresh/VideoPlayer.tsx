import { EmojiReactionListHandler } from '@js/common/emojis/emoji-reaction-list-handler';
import { useHandleSource } from '@js/common/shaka';
import {
  ClipVideoPlayer as ClipPlayer,
  SharePlayer,
  analyticsInit,
  useMakeClip,
  useVideoContext,
} from '@js/common/video-player';
import { VideoGlobalContainer } from '@js/common/video-player/components/video-global-container';
import { LazyUploadProgress as UploadProgressOverlay } from '@js/common/video-player/components/upload-progress';

import {
  useAutoComments,
  useAutoReactions,
} from '@js/pages/share/comments/common/auto-comment-and-reaction/hooks';
import React, { ReactNode } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { SuccessMarkers } from '@js/utilities/rum/constants';

import { SuccessMarker } from '@js/utilities/rum/markers';

import { CommentPortalForm } from '../../pages/share/comments/video-player';
import { CommentsOverlayLazy } from '../../pages/share/comments/video-player-overlay';
import * as analytics from '../../utilities/analytics';
import { CommentsHandler } from './CommentsHandler';
import { ExtendedReactionsHandler } from './ExtendedReactionsHandler';
import { ReactionsHandler } from './ReactionsHandler';
import { WatchLaterHandler } from './WatchLaterHandler';
import {
  PLAYER_CLIP_VIDEO,
  PLAYER_EMBED_VIDEO,
  PLAYER_SHARE_VIDEO,
} from './constants';
import { useStickyClosedCaptions } from './hooks/closedCaptions';
import { useLastWatchedTime } from './hooks/lastWatchedTime';
import { useLiveRewindTrim } from './hooks/liverewindTrim';
import { useStickyPlaybackRate } from './hooks/playbackRate';
import { useStickyVolume } from './hooks/volume';
import { useHandleEmbedParams } from './utils/urlCustomization';
import { ContinueWatchingMobileBannerAsync as ContinueWatchingMobileBanner } from './video-overlays/continue-watching-mobile-banner/async';
import { LazyEmbedSignupOverlay as EmbedSignUpOverlay } from './video-overlays/signup-overlay/EmbedSignupModal';
import { LazyShareSignupOverlay as ShareSignupOverlay } from './video-overlays/signup-overlay/ShareSignupModal';
import { useSeekPreviewUrl } from './video-seek-preview/useVideoSeekPreview';
import { useInitVideoSession } from './video-session/analytics-hooks';

const LoadSlackConnect = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "LoadSlackConnect" */ './utils/LoadSlackConnect'
  ).then(module => ({ default: module.LoadSlackConnect }))
);

export const EmbedVideoPlayer: React.FC<
  React.PropsWithChildren<{
    preload?: boolean;
  }>
> = ({ children, preload = false }): JSX.Element => {
  const { video } = useVideoContext();

  useHandleEmbedParams();

  // start autoloading in slack
  // since our iframe is loaded
  // after clicking play on their pre-play screen
  useHandleSource(video, {
    preload,
    playerName: PLAYER_EMBED_VIDEO,
  });
  useInitVideoSession(video);
  useLastWatchedTime(video);
  useStickyPlaybackRate(video);
  useStickyVolume(video);
  useStickyClosedCaptions(video);
  useSeekPreviewUrl(video.modelId, video.processingInformation?.trimId);

  return (
    <>
      <VideoGlobalContainer>
        <UploadProgressOverlay />
        <EmbedSignUpOverlay />
        <CommentsOverlayLazy />
        {children}
        <SuccessMarker name={SuccessMarkers.VideoPlayer} />
      </VideoGlobalContainer>

      <CommentPortalForm />
      {video.commentsEnabled && <CommentsHandler />}
      {video.reactionsEnabled ? (
        <>
          <ReactionsHandler />
          <ExtendedReactionsHandler />
          <EmojiReactionListHandler />
        </>
      ) : null}
      <AnalyticsLoader />
      <React.Suspense fallback={null}>
        <LoadSlackConnect />
      </React.Suspense>
    </>
  );
};

export const ShareVideoPlayer = ({
  children,
  skipLastWatchTime,
}: {
  children: ReactNode;
  skipLastWatchTime: boolean;
}): JSX.Element => {
  const { video } = useVideoContext();
  const commentsEnabled = video.commentsEnabled;
  const reactionsEnabled = video.commentsEnabled;

  useHandleSource(video, {
    preload: true,
    playerName: PLAYER_SHARE_VIDEO,
  });
  useInitVideoSession(video);
  useLastWatchedTime(video, skipLastWatchTime);
  useStickyPlaybackRate(video);
  useStickyVolume(video);
  useStickyClosedCaptions(video);
  useHandleEmbedParams();
  useAutoComments({ commentsEnabled });
  useAutoReactions({ reactionsEnabled });
  useSeekPreviewUrl(video.id, video.processingInformation?.trimId);
  useLiveRewindTrim(video);

  return (
    <>
      <VideoGlobalContainer>
        <UploadProgressOverlay />
        <CommentsOverlayLazy isSharePlayer={true} />
        <ShareSignupOverlay />
        <ContinueWatchingMobileBanner />
        {children}

        <SharePlayer />
        <SuccessMarker name={SuccessMarkers.VideoPlayer} />
      </VideoGlobalContainer>

      <CommentPortalForm />
      {video.commentsEnabled && <CommentsHandler />}
      {video.reactionsEnabled ? (
        <>
          <ReactionsHandler />
          <ExtendedReactionsHandler />
          <EmojiReactionListHandler />
        </>
      ) : null}
      <WatchLaterHandler />
      <AnalyticsLoader />
    </>
  );
};

export function ClipVideoPlayer({
  clip,
}: {
  clip: [number, number];
}): JSX.Element {
  const { video } = useVideoContext();

  useHandleSource(video, { playerName: PLAYER_CLIP_VIDEO });
  useMakeClip(video.id, clip);

  return (
    <>
      <VideoGlobalContainer>
        <ClipPlayer />
      </VideoGlobalContainer>
      <AnalyticsLoader />
    </>
  );
}

const freshPlayerAnalytics = {
  track: (name, payload) => {
    analytics.track(name, { ...payload, freshPlayer: true });
  },
};

const AnalyticsLoader = () => {
  React.useEffect(() => {
    analyticsInit(freshPlayerAnalytics);
  }, []);

  return null;
};
