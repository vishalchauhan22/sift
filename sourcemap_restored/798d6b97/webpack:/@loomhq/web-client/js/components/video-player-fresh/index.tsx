// TODO(tatiana): Move common files into common folders
// or colocate children components within this folder
// Handling in separate PR to keep PR size manageable
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports

import React, { useEffect, useMemo } from 'react';

import { Container, useMedia } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { WORKSPACE_PLAN_STARTER_FREE } from '@loomhq/shared-utilities/constants/workspacePlans';
import {
  Page,
  getVideoIdFromPageUrl,
} from '@loomhq/shared-utilities/utilities/urlUtils';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import {
  PasswordContextProvider,
  useVideoPasswordContext,
} from '@js/common/video-password';
import {
  CheckEmailGatingBeforeRenderingVideoPlayer,
  EmbedVideoPlayer as EmbedPlayer,
  FeedPlayer,
  MaybeRestrictedVideoModel,
  PlaybarTypes,
  SlackEmbedVideoPlayer,
  UserContext,
  VideoContextProvider,
  VideoModel,
  useVideoContext,
} from '@js/common/video-player';
import { AspectRatio } from '@js/components/video-player-fresh/layers';
import { NOT_FOUND } from '@js/constants/routes';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';
import { usePreloadVideo } from '@js/pages/share/common';
import { useVideoAspectRatio } from '@js/pages/share/useVideoAspectRatio';
import { useExpVizCohesionShell } from '@js/hooks/experiments/useExpVizCohesionShell';
import { ShareVideoPlayerErrorBoundary } from '@js/pages/share/video-player-error-boundary';
import { useVideoEditStore } from '@js/pages/share/common/edit';
import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { LARGE_TABLET_MIN_WIDTH } from '../../constants/breakpoints';

import { isSlackDesktop } from '../../utilities/device';

import {
  ClipVideoPlayer,
  EmbedVideoPlayer,
  ShareVideoPlayer,
} from './VideoPlayer';
import { WithFeatureFlags } from './WithFeatureFlag';
import { ErrorLayer } from './error-layer';
import { WithPassword } from './password';
import { PrivacyChangedCard } from './privacy-changed-card';
import { ClipVideoClip, parseGraphQLVideo, sanitizeClip } from './utils';
import {
  VideoFromGraphQl,
  parseVideoEmbed,
  useUserContext,
} from './utils/model';
import {
  useAutoplayRequested,
  useParamCustomization,
} from './utils/urlCustomization';
import { VideoSourceProvider } from './video-source/context';
import classNames from 'classnames';

const LazyPermissionLayer = reactLazyRetry(() =>
  import(/* webpackChunkName: "PermissionLayer" */ './permission').then(
    module => ({ default: module.PermissionLayer })
  )
);

const VideoPlayer: React.FC<
  React.PropsWithChildren<{
    videoModel: MaybeRestrictedVideoModel;
    localCustomization?: Record<string, string | boolean>;
    shouldUseSsrSource?: boolean;
    isTrim?: boolean;
    needsPassword?: boolean;
    isProtected?: boolean;
  }>
> = ({
  videoModel,
  children,
  localCustomization = {},
  needsPassword = false,
  shouldUseSsrSource = false,
  isTrim,
  isProtected = false,
}): JSX.Element => {
  const customUserContext = useUserContext();
  const customization = useParamCustomization();
  const { initPasswordStore } = useVideoPasswordContext();

  useEffect(() => {
    initPasswordStore({
      isProtected,
      needsPassword,
    });
  }, [initPasswordStore, needsPassword, videoModel, isProtected]);

  if (videoModel.noAccess) {
    return (
      <React.Suspense fallback={null}>
        <LazyPermissionLayer videoModel={videoModel} />
      </React.Suspense>
    );
  }

  const isFreeTier =
    videoModel.videoWorkspacePlan === WORKSPACE_PLAN_STARTER_FREE;

  const showLoomBranding = isFreeTier;

  return (
    <VideoContextProvider
      video={videoModel}
      userContext={customUserContext}
      customization={{
        ...customization,
        ...localCustomization,
        whiteLabelPlayer: videoModel.whiteLabelPlayer,
        showPoweredByLoom: showLoomBranding,
        showLoomWatermark: showLoomBranding,
      }}
    >
      <CheckEmailGatingBeforeRenderingVideoPlayer>
        <WithFeatureFlags />
        <WithPassword>
          <VideoSourceProvider
            // We change the key here in order to force this component to re-fetch its query to get an updated video source URL
            key={`${videoModel.processingInformation?.trimId}${isTrim}`}
            videoId={videoModel.id}
            shouldUseSsrSource={shouldUseSsrSource}
          >
            {children}
          </VideoSourceProvider>
        </WithPassword>
      </CheckEmailGatingBeforeRenderingVideoPlayer>
    </VideoContextProvider>
  );
};

const SharePageVideoPlayer: React.FC<
  React.PropsWithChildren<{
    videoModel: MaybeRestrictedVideoModel;
    customUserContext?: UserContext;
    localCustomization?: Record<string, string | boolean>;
    shouldUseSsrSource?: boolean;
  }>
> = ({ videoModel, children, shouldUseSsrSource = false }): JSX.Element => {
  if (videoModel.noAccess) {
    return (
      <React.Suspense fallback={null}>
        <LazyPermissionLayer videoModel={videoModel} />
      </React.Suspense>
    );
  }

  return (
    <CheckEmailGatingBeforeRenderingVideoPlayer>
      <WithFeatureFlags />
      <WithPassword>
        <VideoSourceProvider
          // We change the key here in order to force this component to re-fetch its query to get an updated video source URL
          key={`${videoModel.processingInformation?.trimId}`}
          videoId={videoModel.id}
          shouldUseSsrSource={shouldUseSsrSource}
        >
          {children}
        </VideoSourceProvider>
      </WithPassword>
    </CheckEmailGatingBeforeRenderingVideoPlayer>
  );
};

// The EmbedPageVideo component should Only be used on the embed page,
// because it depends on the SSR video object
export const EmbedPageContainer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}): JSX.Element => (
  <Container position="fixed" top={0} left={0} bottom={0} right={0}>
    {children}
  </Container>
);

export const EmbedPageVideo = (): JSX.Element | null => {
  const isAtlassianEmbed = window.location.href.includes('/embed/atlassian');
  const videoId = getVideoIdFromPageUrl(
    window.location.href,
    isAtlassianEmbed ? Page.embedAtlassian : Page.embed
  );
  const { videoModel: videoFromServer, loading } = usePreloadVideo({
    videoId,
  });
  const autoplay = useAutoplayRequested();
  const { injectCustomBrandColors } = useCustomBranding({ videoId });

  useEffect(() => {
    injectCustomBrandColors();
  });

  if (loading) {
    return null;
  }

  if (!loading && !videoFromServer) {
    window.location.href = NOT_FOUND;

    return null;
  }

  const video = parseVideoEmbed(videoFromServer);

  return (
    <EmbedPageContainer>
      <VideoPlayer
        videoModel={video}
        isProtected={videoFromServer?.is_protected}
        needsPassword={videoFromServer?.needs_password}
      >
        <ErrorLayer />
        <EmbedVideoPlayer preload={isSlackDesktop || autoplay}>
          {isSlackDesktop ? (
            <SlackEmbedVideoPlayer />
          ) : (
            <EmbedPlayer isActive={true} />
          )}
        </EmbedVideoPlayer>
      </VideoPlayer>
    </EmbedPageContainer>
  );
};

type EmbedVideoProps = {
  videoModel: VideoFromGraphQl;
};

// The EmbedVideo component can be used anywhere we want to embed a video,
// and we have a GraphQL Video model
export const EmbedVideo = ({ videoModel }: EmbedVideoProps): JSX.Element => {
  const video = parseGraphQLVideo(videoModel) as VideoModel;

  return (
    <VideoPlayer videoModel={video}>
      <EmbedVideoPlayer>
        <EmbedPlayer />
      </EmbedVideoPlayer>
    </VideoPlayer>
  );
};

export const SharePageVideo = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const enforcedPlaybar = useMedia(
    [
      `(max-width: ${LARGE_TABLET_MIN_WIDTH}px)`,
      `(min-width: ${LARGE_TABLET_MIN_WIDTH}px)`,
    ],

    [PlaybarTypes.Embed, PlaybarTypes.Default],
    PlaybarTypes.Default
  );

  const { video } = useVideoContext();
  const userContext = useUserContext();
  const customUserContext = { ...userContext, uid: video.id };
  const { hasBeenEdited } = useVideoEditStore();
  const aspectRatio = useVideoAspectRatio();
  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const userCanEdit = video.currentUserCanEdit;
  const { isExpVizCohesionShell } = useExpVizCohesionShell(userCanEdit);

  return (
    <article>
      <div
        className={classNames(
          isExpVizCohesionShell && 'radius:200',
          'videoFrame'
        )}
      >
        <AspectRatio
          isDisabled={!onLargeTabletOrDesktop} // at smaller screen sizes (<768px) forcing aspect ratio can cause very small videos
          aspectRatio={aspectRatio}
        >
          <ShareVideoPlayerErrorBoundary
            name="Share Page Video Player"
            feature={Feature.VideoPlayer}
          >
            <SharePageVideoPlayer
              videoModel={video}
              customUserContext={customUserContext}
              localCustomization={{ enforcedPlaybar }}
              shouldUseSsrSource={!hasBeenEdited}
            >
              <ShareVideoPlayer skipLastWatchTime={hasBeenEdited}>
                {children}
              </ShareVideoPlayer>
            </SharePageVideoPlayer>
          </ShareVideoPlayerErrorBoundary>
        </AspectRatio>
      </div>
    </article>
  );
};

// FeedEmbedVideo is just like EmbedVideo, except it's meant to be used as a part of
// a card that provides video name, author and other info. These are excluded from the
// player itself.
export const FeedVideo = ({ videoModel }: EmbedVideoProps): JSX.Element => {
  const video = parseGraphQLVideo(videoModel) as VideoModel;

  const needsPassword =
    videoModel.needs_password !== undefined ? videoModel.needs_password : true;

  return (
    <PasswordContextProvider>
      <VideoPlayer videoModel={video} needsPassword={needsPassword}>
        <EmbedVideoPlayer>
          <FeedPlayer />
        </EmbedVideoPlayer>
      </VideoPlayer>
    </PasswordContextProvider>
  );
};

type ClipVideoProps = { videoModel: VideoFromGraphQl; clip: ClipVideoClip };

// The ClipVideo player is meant for the notifications page. It's a simplified version
// of the player that does not include many elements, and plays a subset of the entire video.
export const ClipVideo = ({
  videoModel,
  clip,
}: ClipVideoProps): JSX.Element | null => {
  const video = parseGraphQLVideo(videoModel) as VideoModel;

  const sanitizedClip = useMemo(() => sanitizeClip(video, clip), [video, clip]);

  if (!video) {
    return null;
  }

  if (video.noAccess) {
    return <PrivacyChangedCard />;
  }

  const needsPassword =
    videoModel.needs_password !== undefined ? videoModel.needs_password : true;

  return (
    <PasswordContextProvider>
      <VideoPlayer videoModel={video} needsPassword={needsPassword}>
        <ClipVideoPlayer clip={sanitizedClip} />
      </VideoPlayer>
    </PasswordContextProvider>
  );
};
