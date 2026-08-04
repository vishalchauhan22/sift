/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useTranscript } from '@js/common/transcripts/useTranscript';

import React, {
  type FC,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { LoomURL } from '@loomhq/enums';
import { Align, Arrange, Container, spaces, Text } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import { ChaptersBar } from '../../components/chapters-bar/index';
import {
  ChaptersValidation,
  validateChapters,
} from '../../components/chapters-bar/utils';
import { DurationPill } from '../../components/duration-pill';
import {
  MinimalPlayBarContentEmbed,
  PlayBar,
  TrimPlayBar,
} from '../../components/play-bar';
import { PlayButton } from '../../components/play-button';
import {
  PoweredByLoomTitle,
  PoweredByLoomTitleWrapper,
} from '../../components/powered-by-loom-title';
import { ProgressBar, ProgressBarClip } from '../../components/progress-bar';
import { ReactionsBar } from '../../components/reactions-bar';
import { Show } from '../../components/show';
import { TimeToWatchBar } from '../../components/time-to-watch-bar';
import {
  VideoInfoShare,
  VideoInfoEmbed,
  VideoInfoFeed,
} from '../../components/video-info';
import { WatchLaterButtonPrePlay } from '../../components/watch-later-button';
import {
  PlaybarTypes,
  useCommentsEnabled,
  useHideSpeedSelector,
  useHideTopBar,
  useIsMinimalPlayer,
  useReactionsEnabled,
  useShowLoomWatermark,
  useShowPoweredByLoom,
  useVideoContext,
  useVideoId,
  Video,
} from '../../context';
import {
  usePlayingStatus,
  usePlayerHasStarted,
  useInitialTimeLoaded,
  useGuideTextVisibility,
  getActiveLanguageName,
} from '../../hooks';
import { useIsWatchLaterEnabled } from '../../hooks/watchLater';
import { zIndexes } from '../../utils';
import {
  videoMouseIsActiveClassName,
  defaultTransition,
  videoGlobalContainerClassName,
  reactionsBarHeight,
  commentReactionSize,
  ctaBottomMargin,
  transportIsOpenClassName,
} from '../../variables';
import { useViewportContext } from '../../viewportContext';
import { useVideoChaptersUpdatedSubscription } from './VideoChaptersUpdated.generated';
import styles from './styles.module.css';
import { TransportSection } from './transport-section';
import { useCtaForm, useGetCta, type Cta } from '@js/common/cta-form';
import { SvgSettings } from '@loomhq/lens/icons/settings';
import { captionsStore } from '../../hooks/captionsStore';
import { useHasAccessToTranslatedCaptions } from '../../components/play-bar/settings-menu/useHasAccessToTranslatedCaptions';

const Wrapper = styled.div<{
  isPlaying?: boolean;
}>`
  overflow: hidden;
  overflow: clip;
  z-index: ${zIndexes.controlsLayer};
  height: 100%;
  display: grid;
  position: relative;
  pointer-events: none;
  align-items: center;
  & > * {
    pointer-events: initial;
  }
`;

const VideoInfoSection = styled.div<{
  videoInfoIsHideable?: boolean;
  width?: string;
  ctaLocation?: string;
  ctaOnlyShowAtEndOfVideo?: boolean;
  hasStarted?: boolean;
}>`
  height: fit-content;
  ${props => props.width && `width: ${props.width}`};
  position: absolute;

  // when hover on CTA, it will bring itself to the front so that an open
  // comment won't block it
  &:hover {
    z-index: 1;
  }

  ${props =>
    props.ctaLocation === 'top-left' &&
    `top: 0;
     left: 0;`};

  // default val is top-right
  ${props =>
    (!props.ctaLocation || props.ctaLocation === 'top-right') &&
    `top: 0;
     right: 0;`};

  /*
   * decide if we add bottom margin to the CTA button:
   * - if the transport section is open OR mouse is hovering on player,
   *   we need to add bottom margin to the CTA button
   * - if not, the CTA button should stick with the bottom edge
  */

  ${props =>
    props.ctaLocation === 'bottom-left' &&
    `bottom: ${commentReactionSize};
     left: 0;`};

  ${props =>
    props.ctaLocation === 'bottom-right' &&
    `bottom: ${commentReactionSize};
     right: 0;`};

  .${videoMouseIsActiveClassName} &,
  .${transportIsOpenClassName} & {
    ${props =>
      props.ctaLocation === 'bottom-left' &&
      props.hasStarted &&
      `bottom: ${ctaBottomMargin};`};
  }

  .${videoMouseIsActiveClassName} &,
  .${transportIsOpenClassName} & {
    ${props =>
      props.ctaLocation === 'bottom-right' &&
      props.hasStarted &&
      `bottom: ${ctaBottomMargin};`};
  }

  // default is false
  ${props => props.ctaOnlyShowAtEndOfVideo && `visibility: hidden`};

  ${props =>
    props.videoInfoIsHideable &&
    `
  transition: ${defaultTransition}ms;
  opacity: 0;

  &:hover, .${videoMouseIsActiveClassName} & {
    opacity: 1;
  }
  `}
`;

const PlayButtonOptionsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: fit-content;
  margin: 0 auto;
`;

const PlayOptionsSection = styled.div<{
  gap: string;
  gapFromPlayButton: string;
}>`
  position: absolute;
  top: calc(100% + ${props => props.gapFromPlayButton});
  display: flex;
  gap: ${props => props.gap};
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  pointer-events: none;

  & > * {
    pointer-events: initial;
  }
`;

const getLocationClassname = (location: string) => {
  return location.toLowerCase().split(' ').join('-');
};

const VideoInfoComponentsShare: FC<{ cta: Cta }> = ({ cta }) => {
  return (
    <FeatureWrapper
      feature={Feature.CtaLinks}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <VideoInfoComponentsShareWithoutFeatureWrapper cta={cta} />
    </FeatureWrapper>
  );
};

const VideoInfoComponentsShareWithoutFeatureWrapper: FC<{ cta: Cta }> = ({
  cta,
}) => {
  const ctaLocation = cta?.ctaMods?.location
    ? getLocationClassname(cta?.ctaMods?.location)
    : 'top-right';
  const ctaOnlyShowAtEndOfVideo =
    cta?.ctaMods?.only_show_at_end_of_video || false;
  const videoId = useVideoId();
  const hasStarted = usePlayerHasStarted(videoId);
  const { featureLoadedRef } = useFeatureWrapper();

  return (
    <Show afterHeight={200}>
      <VideoInfoSection
        videoInfoIsHideable={false}
        ctaLocation={ctaLocation}
        ctaOnlyShowAtEndOfVideo={ctaOnlyShowAtEndOfVideo}
        hasStarted={hasStarted}
      >
        <div ref={featureLoadedRef}>
          <VideoInfoShare cta={cta} />
        </div>
      </VideoInfoSection>
    </Show>
  );
};

const VideoInfoComponentsEmbed = ({ videoId }: { videoId: string }) => {
  const showLoomWatermark = useShowLoomWatermark();

  return (
    <VideoInfoSection width="100%">
      <VideoInfoEmbed videoId={videoId} withLoomWatermark={showLoomWatermark} />
    </VideoInfoSection>
  );
};

const VideoInfoComponentsFeed = ({ videoId }: { videoId: string }) => {
  const { status } = usePlayingStatus(videoId);
  const hasStarted = usePlayerHasStarted(videoId);
  const videoInfoIsHideable = !hasStarted || status === 'playing';

  return (
    <Show afterHeight={200}>
      <VideoInfoSection videoInfoIsHideable={videoInfoIsHideable} width="100%">
        <VideoInfoFeed videoId={videoId} />
      </VideoInfoSection>
    </Show>
  );
};

type UseFetchChaptersWithPollingArgs = {
  skipChaptersSubscription?: boolean;
};

export function useFetchChaptersWithPolling({
  skipChaptersSubscription = false,
}: UseFetchChaptersWithPollingArgs = {}): string | null {
  const {
    video: { modelId: videoId },
  } = useVideoContext();
  const { password } = useVideoPasswordContext();
  let content: string | null = '';

  const {
    data: chapterData,
    loading: fetchingChapters,
    error,
  } = useVideoChaptersUpdatedSubscription({
    variables: { videoId, password },
    skip: skipChaptersSubscription,
  });

  const result = chapterData?.videoChaptersUpdated;

  if (!fetchingChapters && result?.__typename === 'VideoChapters') {
    content = result?.content ?? '';
  }

  if (error) {
    return null;
  }

  return content;
}

const TransportComponents = ({
  videoId,
  playbarType,
  skipChaptersSubscription = false,
}: {
  videoId: string;
  playbarType: PlaybarTypes;
  skipChaptersSubscription?: boolean;
}) => {
  const hasStarted = usePlayerHasStarted(videoId);
  const initialTimeLoaded = useInitialTimeLoaded(videoId);
  const { video } = useVideoContext();
  const [showChaptersBar, setShowChaptersBar] = useState(false);

  const { videoProperties } = video;
  const chapters = useFetchChaptersWithPolling({ skipChaptersSubscription });
  const [chaptersToValidate, setChaptersToValidate] = useState(chapters);

  const videoDuration = videoProperties?.playableDuration ?? null;
  const firstValidation = validateChapters(chapters || '', videoDuration);
  const [validatedChapters, setValidatedChapters] =
    useState<ChaptersValidation>(firstValidation);

  const showProgressBar = hasStarted || initialTimeLoaded;

  useEffect(() => {
    if (chapters != null) {
      setChaptersToValidate(chapters);
    }
  }, [chapters]);

  useEffect(() => {
    // if validated chapters are not yet set, try again when chapters or videoDuration updates
    if (chaptersToValidate != null && videoDuration) {
      const validation = validateChapters(chaptersToValidate, videoDuration);

      setValidatedChapters(validation);
    }
  }, [chaptersToValidate, videoDuration]);

  useEffect(() => {
    if (validatedChapters.chapters !== null) {
      setShowChaptersBar(true);
    } else {
      setShowChaptersBar(false);
    }
  }, [validatedChapters]);

  return (
    <TransportSection showChaptersBar={showChaptersBar}>
      <ReactionsBar videoId={videoId} />
      {showChaptersBar && (
        <ChaptersBar
          videoId={videoId}
          validatedChapters={validatedChapters}
          videoDuration={videoDuration}
        />
      )}
      {!showChaptersBar && showProgressBar && (
        <ProgressBar videoId={videoId} modelId={video.modelId} />
      )}
      {hasStarted && <PlayBar type={playbarType} videoId={videoId} />}
    </TransportSection>
  );
};

const ClosedCaptionsHelpGuide = ({
  captionsLanguageSelection,
  hasTranslationError,
}: {
  captionsLanguageSelection: string;
  hasTranslationError: boolean;
}): JSX.Element => {
  const currentLanguage = getActiveLanguageName(captionsLanguageSelection);

  if (hasTranslationError) {
    return (
      <>
        <Container
          radius="medium"
          width="max-content"
          zIndex={1}
          className={styles.helperText}
        >
          <Arrange gap="small" autoFlow="row">
            <Text
              size="body-lg"
              fontWeight="regular"
              color="white"
              className={styles.helperTextComponent}
            >
              CC: Failed to load selected language. Captions are defaulted to
              video&apos;s default language
            </Text>
          </Arrange>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container
        radius="medium"
        width="max-content"
        zIndex={1}
        className={styles.helperText}
      >
        <Arrange gap="small" autoFlow="row">
          <Text
            size="body-lg"
            fontWeight="regular"
            color="white"
            className={styles.helperTextComponent}
          >
            {`CC: ${currentLanguage} (Auto-generated)`}
          </Text>
          <Text
            size="body-lg"
            fontWeight="regular"
            color="white"
            className={styles.helperTextComponent}
          >
            <Arrange gap="small" autoFlow="column">
              <SvgSettings />
              {'Click settings for languages and more options'}
            </Arrange>
          </Text>
        </Arrange>
      </Container>
    </>
  );
};

export const SimpleTransportComponents = ({
  videoId,
  showProgressBar,
  showPlayBar,
}: {
  videoId: string;
  showProgressBar: boolean;
  showPlayBar: boolean;
}): JSX.Element => {
  return (
    <TransportSection sticky>
      {showProgressBar && <ProgressBar videoId={videoId} />}
      {showPlayBar && <TrimPlayBar videoId={videoId} />}
    </TransportSection>
  );
};

export const ControlsLayer = ({
  video,
  brandLogo = undefined,
  cta,
  showPlayButton = false,
  isPlaying = false,
  playOptions,
  transport,
}: {
  video: Video;
  brandLogo?: React.ReactNode;
  cta?: Cta | null;
  showPlayButton?: boolean;
  isPlaying?: boolean;
  playOptions?: React.ReactNode;
  transport?: React.ReactNode;
}): JSX.Element => {
  const videoId = video.id;

  const hasAccessToTranslateCaptions = useHasAccessToTranslatedCaptions();
  const { captionsLanguageSelection } = captionsStore(state => state);

  const { hasTranslationError } = useTranscript();

  const { isVisible } = useGuideTextVisibility(videoId);

  const displayCaptionsHelpGuide =
    !showPlayButton && hasAccessToTranslateCaptions && isVisible;

  return (
    <Wrapper isPlaying={isPlaying} data-name="ControlsLayerShare">
      {brandLogo}
      {showPlayButton && (
        <PlayButtonOptionsSection>
          <PlayButton videoId={videoId} />
          {playOptions}
        </PlayButtonOptionsSection>
      )}
      {cta && <VideoInfoComponentsShare cta={cta} />}
      {displayCaptionsHelpGuide && (
        <ClosedCaptionsHelpGuide
          captionsLanguageSelection={captionsLanguageSelection}
          hasTranslationError={hasTranslationError}
        />
      )}
      {transport}
    </Wrapper>
  );
};

export const BrandLogoInVideoPlayerContainer: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Container
      position="absolute"
      top={spaces.xsmall + spaces.small}
      left={spaces.xsmall + spaces.small}
      backgroundColor="white"
      padding="medium"
      radius="large"
    >
      <Align alignment="center">{children}</Align>
    </Container>
  );
};

export const BrandLogoInVideoPlayer = ({
  logoSvg,
}: {
  logoSvg: string;
}): JSX.Element => {
  return (
    <BrandLogoInVideoPlayerContainer>
      <img src={logoSvg} alt="brand logo" className={styles.customBrandLogo} />
    </BrandLogoInVideoPlayerContainer>
  );
};

export const ControlsLayerShare: FC<PropsWithChildren<{ videoId: string }>> = ({
  videoId,
}) => {
  const hasStarted = usePlayerHasStarted(videoId);
  const { video } = useVideoContext();
  const isPrePlayMode = !hasStarted;
  const isWatchLaterEnabled = useIsWatchLaterEnabled();
  const isLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const persistedCta = useGetCta(videoId);
  const storedCta = useCtaForm();
  const cta = storedCta.isEditingCta ? storedCta : persistedCta;

  const { brandLogoPath } = useCustomBranding({
    videoId,
  });

  const showBrandLogo =
    isPrePlayMode && isLargeTabletOrDesktop && brandLogoPath;

  return (
    <ControlsLayer
      video={video}
      cta={cta}
      brandLogo={
        showBrandLogo ? (
          <BrandLogoInVideoPlayer logoSvg={brandLogoPath} />
        ) : undefined
      }
      showPlayButton={isPrePlayMode && video.uploadComplete}
      playOptions={
        <PlayOptionsSection
          gap="var(--lns-space-small)"
          gapFromPlayButton="var(--lns-space-medium)"
        >
          <TimeToWatchBar videoId={videoId} />
          {isWatchLaterEnabled && <WatchLaterButtonPrePlay videoId={videoId} />}
        </PlayOptionsSection>
      }
      transport={
        <TransportComponents
          videoId={videoId}
          playbarType={PlaybarTypes.Default}
        />
      }
    />
  );
};

export const ControlsLayerEmbedMinimal: FC<
  PropsWithChildren<{ videoId: string }>
> = ({ videoId, ...props }) => {
  const hasStarted = usePlayerHasStarted(videoId);
  const { video } = useVideoContext();

  return (
    <Wrapper {...props} data-name="ControlsLayerEmbed">
      {!hasStarted && video.uploadComplete && (
        <Container width="fit-content" margin="0 auto" position="relative">
          <PlayButton videoId={videoId} />
        </Container>
      )}
      {hasStarted && (
        <Container bottom={0} position="absolute" width="100%">
          <MinimalPlayBarContentEmbed videoId={videoId} />
        </Container>
      )}
    </Wrapper>
  );
};

export const ControlsLayerEmbed: FC<PropsWithChildren<{ videoId: string }>> = ({
  videoId,
  ...props
}) => {
  const hasStarted = usePlayerHasStarted(videoId);
  const hideTopBar = useHideTopBar();
  const hideSpeedSelector = useHideSpeedSelector();
  const { video } = useVideoContext();
  const showPoweredByLoom = useShowPoweredByLoom();
  const isMinimalEmbedPlayer = useIsMinimalPlayer();

  const { height } = useViewportContext();
  const gapSize = height > 300 ? 'medium' : 'small';
  const optionsGap = `var(--lns-space-${gapSize})`;

  const hasAccessToTranslateCaptions = useHasAccessToTranslatedCaptions();
  const { captionsLanguageSelection } = captionsStore(state => state);

  const { hasTranslationError } = useTranscript();

  const { isVisible } = useGuideTextVisibility(videoId);

  const displayCaptionsHelpGuide =
    hasStarted &&
    video.uploadComplete &&
    hasAccessToTranslateCaptions &&
    isVisible;

  if (isMinimalEmbedPlayer) {
    return <ControlsLayerEmbedMinimal videoId={videoId} />;
  }

  return (
    <Wrapper {...props} data-name="ControlsLayerEmbed">
      {!hideTopBar && <VideoInfoComponentsEmbed videoId={videoId} />}
      {displayCaptionsHelpGuide && (
        <ClosedCaptionsHelpGuide
          captionsLanguageSelection={captionsLanguageSelection}
          hasTranslationError={hasTranslationError}
        />
      )}
      {!hasStarted && video.uploadComplete && (
        <PlayButtonOptionsSection>
          <PlayButton videoId={videoId} />
          {!hideSpeedSelector ? (
            <PlayOptionsSection gap={optionsGap} gapFromPlayButton={optionsGap}>
              <TimeToWatchBar videoId={videoId} />
            </PlayOptionsSection>
          ) : null}
          {showPoweredByLoom && (
            <PoweredByLoomTitleWrapper>
              <PoweredByLoomTitle
                onClick={() =>
                  window.open(
                    `${LoomURL.Production}?utm_source=embed&utm_medium=powered-by`
                  )
                }
              />
            </PoweredByLoomTitleWrapper>
          )}
        </PlayButtonOptionsSection>
      )}
      <TransportComponents videoId={videoId} playbarType={PlaybarTypes.Embed} />
    </Wrapper>
  );
};

export const ControlsLayerSlackEmbed: FC<
  PropsWithChildren<{ videoId: string }>
> = ({ videoId, ...props }) => {
  return (
    <Wrapper {...props} data-name="ControlsLayerSlackEmbed">
      <VideoInfoComponentsEmbed videoId={videoId} />
      <TransportComponents videoId={videoId} playbarType={PlaybarTypes.Embed} />
    </Wrapper>
  );
};

const DurationPillSectionFeed = styled.div<{
  hasReposition: boolean;
  pillOffset: string;
}>`
  --pillOffset: ${props => `var(--lns-space-${props.pillOffset})`};

  transition: transform ${defaultTransition}ms;
  position: absolute;
  right: var(--pillOffset);
  bottom: var(--pillOffset);
  pointer-events: none;

  --translateY: ${props =>
    props.hasReposition && `calc(-1 * ${reactionsBarHeight})`};

  .${videoGlobalContainerClassName}:hover & {
    transform: translateY(var(--translateY));
  }
`;

export const ControlsLayerFeed: FC<PropsWithChildren<{ videoId: string }>> = ({
  videoId,
  ...props
}) => {
  const hasStarted = usePlayerHasStarted(videoId);
  const commentsEnabled = useCommentsEnabled();
  const reactionsEnabled = useReactionsEnabled();
  const hasReposition = commentsEnabled || reactionsEnabled;
  const { width } = useViewportContext();
  const pillOffset = width < 600 ? 'small' : 'medium';

  return (
    <Wrapper {...props} data-name="ControlsLayerFeed">
      {!hasStarted && (
        <>
          <Container width="fit-content" margin="0 auto">
            <PlayButton videoId={videoId} />
          </Container>
          <DurationPillSectionFeed
            hasReposition={hasReposition}
            pillOffset={pillOffset}
          >
            <DurationPill />
          </DurationPillSectionFeed>
        </>
      )}
      <VideoInfoComponentsFeed videoId={videoId} />
      <TransportComponents
        videoId={videoId}
        playbarType={PlaybarTypes.Embed}
        skipChaptersSubscription
      />
    </Wrapper>
  );
};

export const ControlsLayerClip: FC<PropsWithChildren<{ videoId: string }>> = ({
  videoId,
  ...props
}) => {
  return (
    <Wrapper {...props} data-name="ControlsLayerClip">
      <Container position="absolute" bottom={0} width="100%">
        <ProgressBarClip videoId={videoId} />
      </Container>
    </Wrapper>
  );
};
