// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { VideoGlobalContainer } from '@js/common/video-player/components/video-global-container';
import { useStickyPlaybackRate } from '@js/components/video-player-fresh/hooks/playbackRate';
import React from 'react';

import { Arrange, useMedia } from '@loomhq/lens';

import {
  ControlsLayerClip,
  ControlsLayerEmbed,
  ControlsLayerFeed,
  ControlsLayerShare,
  SimpleEndActions,
  isMarketingLoom,
} from '..';
import { isSuggestionForVideoPreviouslyClicked } from '../common';
import { Captions, StylizedCaptions } from '../components/captions';
import { EmailGate } from '../components/email-gating';
import { useIsEmailGatingIncomplete } from '../components/email-gating/useIsEmailGatingIncomplete';
import { EndOfVideoCommentOverlayWithAiNudges } from '../components/end-of-video-comment-overlay-with-nudges';
import { LayersContainer } from '../components/layers-container';
import { PlayButton } from '../components/play-button';
import { PlayerBackdrop } from '../components/player-backdrop';
import { PosterVideo } from '../components/poster-video';
import { VideoPlayer } from '../components/video-player';
import { SuggestedVideo } from '../components/video-player/end-of-video-suggested-video';
import {
  useIsRawEmbedVideo,
  useUserContext,
  useVideoContext,
  VideoPlatform,
} from '../context';
import {
  useCaptions,
  useHandleDefaultSpeedRateParam,
  useInitialTimeLoaded,
  useInstallHotKeys,
  usePlayerHasStarted,
  usePlayerIsWaiting,
  usePlayingStatus,
  useShouldShowEovCommentOverlayWithNudges,
  useUpdateVideoPlatform,
  useOnEndHardGateTrigger,
  useStylizedCaptionsEnabled,
} from '../hooks';
import {
  ControlsLayer,
  ControlsLayerSlackEmbed,
  SimpleTransportComponents,
  SlackPermissionsLayer,
} from '../layers';
import { Layer } from '../layers/layer';
import { WaitingLayer } from '../layers/waiting-layer';
import { isInSlackVideoBlock } from '../utils';
import { videoContainerClassName } from '../variables';
import { getShowCaptions } from '@js/utilities/localStorage';
import { useTranscript } from '@js/common/transcripts';

const CaptionsBox = ({
  videoId,
  forceActive = false,
}: {
  videoId: string;
  forceActive?: boolean;
}) => {
  const { captionsUrl, isCaptionsTranslationInProgress } = useTranscript();

  const ref = useCaptions(videoId, captionsUrl || '', forceActive);

  if (!captionsUrl || isCaptionsTranslationInProgress) {
    return null;
  }

  return <Captions ref={ref} />;
};

const StylizedCaptionsBox = ({
  videoId,
  forceActive = false,
}: {
  videoId: string;
  forceActive?: boolean;
}) => {
  const { captionsUrl, isCaptionsTranslationInProgress } = useTranscript();

  const ref = useCaptions(videoId, captionsUrl || '', forceActive);

  if (!captionsUrl || isCaptionsTranslationInProgress) {
    return null;
  }

  return <StylizedCaptions ref={ref} />;
};

const VideoContainerWrapper = styled.div`
  height: 100%;
  z-index: 1;
  position: relative;
`;

export const CheckEmailGatingBeforeRenderingVideoPlayer = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const { video } = useVideoContext();

  const isEmailGatingIncomplete = useIsEmailGatingIncomplete();

  if (isEmailGatingIncomplete) {
    return (
      // VideoGlobalContainer sets Lens unit size for scaling
      <VideoGlobalContainer>
        <VideoContainer>
          <LayersContainer>
            <EmailGate />
            <PosterVideo thumbnails={video.thumbnails} video={video} />
            <PlayerBackdrop videoId={video.id} />
          </LayersContainer>
        </VideoContainer>
      </VideoGlobalContainer>
    );
  }

  return <>{children}</>;
};

// eslint-disable-next-line react/display-name
export const VideoContainer = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <VideoContainerWrapper ref={ref} className={videoContainerClassName}>
      {children}
    </VideoContainerWrapper>
  );
});

export function SharePlayer(): JSX.Element {
  const { video } = useVideoContext();
  const [showCommentOverlay, setIsLayerInvisible] =
    useShouldShowEovCommentOverlayWithNudges();

  const isMobileScreenWidth = useMedia(['(max-width: 767px)'], [true], false);

  useUpdateVideoPlatform(video.id, VideoPlatform.sharePagePlayer);
  useOnEndHardGateTrigger(video.id, video.owner?.displayName);

  const { isLoggedUser } = useUserContext();
  const videoId = video.id;
  const isSuggestionForThisVideoPreviouslyClicked =
    isSuggestionForVideoPreviouslyClicked(videoId);
  const showSuggestedVideoContainer =
    !isLoggedUser &&
    !isSuggestionForThisVideoPreviouslyClicked &&
    !isMobileScreenWidth;

  return (
    <Player
      endOfVideoComponent={
        showCommentOverlay && !isMarketingLoom(videoId) ? (
          <EndOfVideoCommentOverlayWithAiNudges
            setIsLayerInvisible={setIsLayerInvisible}
          />
        ) : showSuggestedVideoContainer ? (
          <>
            <PlayerBackdrop videoId={video.id} />
            <SuggestedVideo videoId={video.id} />
          </>
        ) : (
          <>
            <PlayerBackdrop videoId={video.id} />
            <SimpleEndActions />
          </>
        )
      }
      controlsLayerComponent={<ControlsLayerShare videoId={video.id} />}
      showCaptionBox={true}
    />
  );
}

const Player = ({
  endOfVideoComponent,
  controlsLayerComponent,
  showCaptionBox = false,
}: {
  endOfVideoComponent?: JSX.Element;
  controlsLayerComponent: JSX.Element;
  showCaptionBox?: boolean;
}) => {
  const { video } = useVideoContext();
  const { stylizedCaptionsEnabled } = useStylizedCaptionsEnabled();
  const { status } = usePlayingStatus(video.id);
  const hasStarted = usePlayerHasStarted(video.id);
  const hasEnded = status === 'ended';
  const isWaiting = usePlayerIsWaiting(video.id);

  useInstallHotKeys(video.id);
  useStickyPlaybackRate(video);

  return (
    <VideoContainer>
      {!hasStarted && (
        <LayersContainer>
          {controlsLayerComponent}
          <PosterVideo thumbnails={video.thumbnails} video={video} />
          <PlayerBackdrop videoId={video.id} />
        </LayersContainer>
      )}

      <LayersContainer isHidden={!hasStarted} className="VideoLayersContainer">
        {isWaiting && <WaitingLayer />}
        {controlsLayerComponent}
        {stylizedCaptionsEnabled ? (
          showCaptionBox ? (
            <StylizedCaptionsBox videoId={video.id} />
          ) : null
        ) : showCaptionBox ? (
          <CaptionsBox videoId={video.id} />
        ) : null}

        <VideoPlayer src={video.src} videoId={video.id} />
        {hasEnded && endOfVideoComponent}
      </LayersContainer>
    </VideoContainer>
  );
};

export function EmbedVideoPlayer({
  isActive = false,
}: {
  isActive?: boolean;
}): JSX.Element {
  const { video } = useVideoContext();
  const { stylizedCaptionsEnabled } = useStylizedCaptionsEnabled();
  const { status } = usePlayingStatus(video.id);
  const hasStarted = usePlayerHasStarted(video.id);
  const hasEnded = status === 'ended';
  const isWaiting = usePlayerIsWaiting(video.id);
  const isRawEmbedVideo = useIsRawEmbedVideo();

  const [showOverlay, setIsEovCommentsOverlayInvisible] =
    useShouldShowEovCommentOverlayWithNudges();

  useUpdateVideoPlatform(video.id, VideoPlatform.embedPlayer);
  useInstallHotKeys(video.id, { isActive: isActive && video.uploadComplete });
  useHandleDefaultSpeedRateParam(video.id); // TODO: support for share player after approval

  if (isRawEmbedVideo) {
    return <RawVideoPlayer />;
  }

  return (
    <VideoContainer>
      {!hasStarted && (
        <LayersContainer isEmbed>
          <ControlsLayerEmbed videoId={video.id} />
          <PosterVideo thumbnails={video.thumbnails} video={video} />
          <PlayerBackdrop videoId={video.id} />
        </LayersContainer>
      )}
      <LayersContainer
        isHidden={!hasStarted}
        isEmbed
        className="VideoLayersContainer"
      >
        {isWaiting && <WaitingLayer />}
        {hasEnded && (
          <>
            {showOverlay ? (
              <EndOfVideoCommentOverlayWithAiNudges
                setIsLayerInvisible={setIsEovCommentsOverlayInvisible}
                hideCloseButton
                isEmbed
              />
            ) : (
              <>
                <PlayerBackdrop videoId={video.id} />
                <SimpleEndActions />
              </>
            )}
          </>
        )}

        {stylizedCaptionsEnabled ? (
          <StylizedCaptionsBox videoId={video.id} />
        ) : (
          <CaptionsBox videoId={video.id} />
        )}
        <VideoPlayer src={video.src} videoId={video.id} />
        <ControlsLayerEmbed videoId={video.id} />
      </LayersContainer>
    </VideoContainer>
  );
}

export function RawVideoPlayer(): JSX.Element {
  const { video } = useVideoContext();
  const hasStarted = usePlayerHasStarted(video.id);

  return (
    <VideoContainer>
      {!hasStarted && (
        <LayersContainer isEmbed>
          <PosterVideo thumbnails={video.thumbnails} video={video} />
        </LayersContainer>
      )}
      <LayersContainer
        isHidden={!hasStarted}
        isEmbed
        className="VideoLayersContainer"
      >
        <VideoPlayer src={video.src} videoId={video.id} />
      </LayersContainer>
    </VideoContainer>
  );
}

export function SlackEmbedVideoPlayer(): JSX.Element {
  const { video, setHideWatchOnLoom } = useVideoContext();
  const { stylizedCaptionsEnabled } = useStylizedCaptionsEnabled();
  const { requestedSlackPermissionLayer } = useUserContext();
  const { status } = usePlayingStatus(video.id);
  const hasEnded = status === 'ended';
  const isWaiting = usePlayerIsWaiting(video.id);

  const [showOverlay, setIsEovCommentsOverlayInvisible] =
    useShouldShowEovCommentOverlayWithNudges();

  useUpdateVideoPlatform(video.id, VideoPlatform.slackPlayer);
  useInstallHotKeys(video.id, { isActive: video.uploadComplete });

  React.useEffect(() => {
    if (isInSlackVideoBlock()) {
      setHideWatchOnLoom(true);
    }
  }, [setHideWatchOnLoom]);

  return (
    <VideoContainer>
      <LayersContainer isEmbed className="VideoLayersContainer">
        {isWaiting && <WaitingLayer />}
        {hasEnded && (
          <>
            {showOverlay ? (
              <EndOfVideoCommentOverlayWithAiNudges
                setIsLayerInvisible={setIsEovCommentsOverlayInvisible}
                hideCloseButton
                isEmbed
              />
            ) : (
              <>
                <PlayerBackdrop videoId={video.id} />
                <SimpleEndActions />
              </>
            )}
          </>
        )}

        {stylizedCaptionsEnabled ? (
          <StylizedCaptionsBox videoId={video.id} />
        ) : (
          <CaptionsBox videoId={video.id} />
        )}

        <VideoPlayer autoPlay src={video.src} videoId={video.id} />
        <ControlsLayerSlackEmbed videoId={video.id} />

        {requestedSlackPermissionLayer ? (
          <SlackPermissionsLayer videoId={video.id} />
        ) : null}
      </LayersContainer>
    </VideoContainer>
  );
}

export function ClipVideoPlayer(): JSX.Element {
  const { video } = useVideoContext();
  const { stylizedCaptionsEnabled } = useStylizedCaptionsEnabled();
  const isWaiting = usePlayerIsWaiting(video.id);
  const hasStarted = usePlayerHasStarted(video.id);
  const { status } = usePlayingStatus(video.id);
  const isPaused = status === 'paused';

  const thumbnails = {
    staticFullUrl: video.thumbnails.staticFullUrl,
    defaultFullUrl: video.thumbnails.staticFullUrl,
  };

  const captionsVisibilityInStorage = getShowCaptions();

  return (
    <VideoContainer>
      {!hasStarted && (
        <LayersContainer>
          <PlayClipOverlay videoId={video.id} />
          <PosterVideo thumbnails={thumbnails} video={video} />
        </LayersContainer>
      )}

      <LayersContainer>
        {isWaiting && <WaitingLayer />}
        {!isWaiting && isPaused && <PlayClipOverlay videoId={video.id} />}
        {captionsVisibilityInStorage &&
          (stylizedCaptionsEnabled ? (
            <StylizedCaptionsBox videoId={video.id} forceActive />
          ) : (
            <CaptionsBox videoId={video.id} forceActive />
          ))}
        <VideoPlayer src={video.src} videoId={video.id} />
        <ControlsLayerClip videoId={video.id} />
      </LayersContainer>
    </VideoContainer>
  );
}

function PlayClipOverlay({ videoId }: { videoId: string }) {
  return (
    <>
      <Layer zIndexLayer="posterActionsLayer" data-name="PlayClipOverlay">
        <Arrange width="100%" height="100%" justifyContent="center">
          <PlayButton videoId={videoId} />
        </Arrange>
      </Layer>
    </>
  );
}

export function FeedPlayer(): JSX.Element {
  const { video } = useVideoContext();
  const { stylizedCaptionsEnabled } = useStylizedCaptionsEnabled();
  const hasStarted = usePlayerHasStarted(video.id);
  const isWaiting = usePlayerIsWaiting(video.id);

  useInstallHotKeys(video.id);
  const { status } = usePlayingStatus(video.id);
  const hasEnded = status === 'ended';

  return (
    <VideoContainer>
      {!hasStarted && (
        <LayersContainer>
          <ControlsLayerFeed videoId={video.id} />
          <PosterVideo thumbnails={video.thumbnails} video={video} />
          <PlayerBackdrop videoId={video.id} />
        </LayersContainer>
      )}
      <LayersContainer isHidden={!hasStarted} className="VideoLayersContainer">
        {isWaiting && <WaitingLayer />}
        {hasEnded && <SimpleEndActions />}
        <PlayerBackdrop videoId={video.id} />
        <ControlsLayerFeed videoId={video.id} />
        <VideoPlayer src={video.src} videoId={video.id} />
        {stylizedCaptionsEnabled ? (
          <StylizedCaptionsBox videoId={video.id} />
        ) : (
          <CaptionsBox videoId={video.id} />
        )}
      </LayersContainer>
    </VideoContainer>
  );
}

export function EditByTranscriptVideoPlayer(): JSX.Element {
  const { video } = useVideoContext();
  const hasStarted = usePlayerHasStarted(video.id);
  const isPrePlayMode = !hasStarted;
  const initialTimeLoaded = useInitialTimeLoaded(video.id);
  const showProgressBar = hasStarted || initialTimeLoaded;

  return (
    <Player
      controlsLayerComponent={
        <ControlsLayer
          showPlayButton={isPrePlayMode && video.uploadComplete}
          transport={
            <SimpleTransportComponents
              videoId={video.id}
              showProgressBar={showProgressBar}
              showPlayBar={hasStarted}
            />
          }
          video={video}
        />
      }
    />
  );
}
