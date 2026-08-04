// TODO(tatiana): Move common files into common folders
// or colocate children components within this folder
// Handling in separate PR to keep PR size manageable
import './styles.less';

import classNames from 'classnames';

import React, { Suspense, useEffect, useRef } from 'react';

import { Container } from '@loomhq/lens';
import { TEAM_ACCOUNT_TYPES } from '@loomhq/shared-utilities/constants/accountTypes';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  AUTHENTICATED_USER_ACCESS,
  SUGGESTED_WORKSPACE_BANNER,
} from '@loomhq/shared-utilities/constants/scopes';
import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';
import { useCtaForm } from '@js/common/cta-form';
import {
  LoggedInOnly,
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { SilentErrorBoundary } from '@js/common/error-management';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { HelpBubble } from '@js/common/help-bubble';
import { useTheaterMode } from '@js/common/theater-mode';
import { useThumbnailFlow } from '@js/common/thumbnail-flow';
import { FetchTranscriptWithGql } from '@js/common/transcripts';
import { Player, usePlayer, useVideoContext } from '@js/common/video-player';
import { RoleCompletionToast } from '@js/common/welcome/role-completion-toast';
import { useGetVideoQuery } from '@js/pages/admin/media-tools/community-content/GetVideo.generated';
import {
  CALLOUTS,
  useSidebarCallout,
} from '@js/components/layout/navigation/sidebar-callout';
import { SHARE_PAGE } from '@js/components/record-button';
import {
  SDK,
  DESKTOP,
  CHROME_EXTENSION,
} from '@js/components/record-button/constants';
import { PersistentRecordButtonAsync as PersistentRecordButton } from '@js/components/record-button/persistent-record-button-async';

import { Banners } from '@js/components/share-video/banners';
import { CtaPreview } from '@js/components/share-video/cta-modal';
import { HeaderContent as SharePageHeaderContent } from '@js/components/share-video/header-content';
import { SharePageVideo } from '@js/components/video-player-fresh';
import { isStaging } from '@js/constants/environment';

import { useExpRoleQuestionMandatory } from '@js/hooks/experiments/useExpRoleQuestionMandatory';
import { useRoleMandatoryModal } from '@js/hooks/onboarding/useRoleMandatoryModal';
import { useAnonCreatorMode } from '@js/hooks/useAnonCreatorMode';
import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';
import { useHardGateViewModalOnLoad } from '@js/hooks/useHardGateMobileViews';
import { useHasScope } from '@js/hooks/useHasScopes';

import {
  useMatchLargeTabletOrDesktop,
  useMatchMobileOrSmallTablet,
} from '@js/hooks/useMatchMedia';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { AnonymousShareHeaderAsync as AnonShareHeader } from '@js/pages/share/anonymous-share-header/async';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { CelebrationLayerAsync as CelebrationLayer } from '@js/pages/share/celebration-layer/async';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { MobileCommentInputContainer } from '@js/pages/share/comments/common';
import { useHideInformationDueToPassword } from '@js/pages/share/common';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { ContextAdapter } from '@js/pages/share/context-adapter';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { EngagementBarAsync as EngagementBar } from '@js/pages/share/engagement-bar/async';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { JoinTeamBanner } from '@js/pages/share/join-team-banner';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { LoomBranding } from '@js/pages/share/loom-branding';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { Modals } from '@js/pages/share/modals';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { LoomAiTrialEndedController } from '@js/pages/share/modals/loom-ai-trial-ended-controller';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { LayoutWrapper } from '@js/pages/share/page-layout-wrapper';
import {
  CollapsedRightPanelInsidePlayer,
  RightPanelWithResizer,
  // eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
} from '@js/pages/share/right-panel';

// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { ThumbnailPositioner } from '@js/pages/share/thumbnail-positioner';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { TutorialLayer } from '@js/pages/share/tutorial-layer';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { useHandleParams } from '@js/pages/share/use-handle-params';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { useVideoAspectRatio } from '@js/pages/share/useVideoAspectRatio';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { VideoMetadataWrapper as VideoMetadata } from '@js/pages/share/video-metadata';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { VideoModelSync } from '@js/pages/share/video-model-sync';

import { isMobile } from '@js/utilities/device';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { useSetCascadingRecordersDetails } from './common/cascading-recorders';
import { GoogleOneTap } from './google-one-tap';
import { useBulkLoadedFeatureFlags } from './use-bulk-loaded-feature-flags';

import { SharePageProps } from '@js/pages/share/common/types';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';
import { useScreenInLandscapeMode } from '@js/hooks/useScreenInLandscapeMode';
import { useFullScreenToggleAgent } from './useFullScreenToggleAgent';
import { useFullscreenToast } from './useFullscreenToast';
import { FullscreenToast } from './FullscreenToast';
import { useUpdateRecordingVideoDocumentType } from '@js/common/workflows/common/useUpdateRecordingVideoDocumetType';
import { ZoomToClickSharePageFtux } from './zoom-to-click-share-page-ftux';

const RecordButton = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "RecordButton" */ '@js/components/record-button'
  ).then(module => ({ default: module.RecordButton }))
);

type SharePageWrapperProps = Pick<
  SharePageProps,
  | 'focusTitle'
  | 'fromRecorderParam'
  | 'fromTutorialParam'
  | 'recordingLimitParam'
  | 'cascadingRecordersTabUuidParam'
  | 'userCanEdit'
  | 'recordingDocumentationTypeParam'
>;

// Exported for testing purposes, to simplify testing this component in isolation
export const SharePageWrapper: React.FC<
  React.PropsWithChildren<SharePageWrapperProps>
> = ({
  children,
  focusTitle,
  fromRecorderParam,
  fromTutorialParam,
  recordingLimitParam,
  cascadingRecordersTabUuidParam,
  recordingDocumentationTypeParam,
}): React.ReactElement => {
  const { video } = useVideoContext();
  const { description, id: videoId, organizationId } = video;
  const { isInTheaterMode } = useTheaterMode();
  const isMobileOrSmallTablet = useMatchMobileOrSmallTablet();
  const { isInThumbnailFlow } = useThumbnailFlow();
  const { hasCustomLogo: hasCustomWorkspaceLogo, shouldShowLoomBranding } =
    useCustomBranding({ videoId });
  const anonCreatorMode = useAnonCreatorMode(videoId);
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isTeamAccount = useCurrentUserSelector(
    user =>
      Boolean(
        user.accountType && TEAM_ACCOUNT_TYPES.includes(user.accountType)
      ),
    false
  );
  const hasAuthenticatedAccessScope = useHasScope(AUTHENTICATED_USER_ACCESS);
  const useAnonymousNavigation =
    !isLoggedIn || !hasAuthenticatedAccessScope || !isTeamAccount;

  const hasSuggestedWorkspaceBanner = useHasScope(SUGGESTED_WORKSPACE_BANNER);
  const currentUserIsOwner = useCurrentUserIsOwner({ videoId: video.id });
  const {
    errorBar: { showing: errorBarShown },
  } = useErrorBar();

  useBulkLoadedFeatureFlags();

  useSetCascadingRecordersDetails(video, cascadingRecordersTabUuidParam);

  const sharePageWrapperRef = useRef<HTMLDivElement>(null);
  const videoMetadataWrapperRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const aspectRatio = useVideoAspectRatio();

  useEffect(() => {
    sharePageWrapperRef.current?.style?.setProperty(
      '--aspectRatio',
      String(aspectRatio)
    );
  }, [aspectRatio]);

  // scroll the video metadata wrapper into view when in thumbnail flow so that the video's
  // always in user's view
  useEffect(() => {
    if (isInThumbnailFlow) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      videoMetadataWrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isInThumbnailFlow]);

  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const hideInformationDueToPassword = useHideInformationDueToPassword();
  const showRightPanelWithResizer =
    !hideInformationDueToPassword && !fromTutorialParam;

  const hideSideNav = onLargeTabletOrDesktop;

  const hideBlackBarsInVideo = hideSideNav;
  const { isExpMwebCommenting } = useExpMwebCommenting();
  const isInLandscapeMode = useScreenInLandscapeMode();
  const shouldShiftSharePageWrapperRight =
    isExpMwebCommenting && isInLandscapeMode && isMobileOrSmallTablet;

  const sharePageWrapperCn = classNames('sharePageWrapper', {
    'current-user-is-owner': currentUserIsOwner,
    'error-bar-shown': errorBarShown,
    theaterMode: isInTheaterMode,
    hideSideNav,
    hasDescription: Boolean(description),
    hideBlackBarsInVideo,
    // When we're changing thumbnail, we want to make the video container aspect ratio
    // to 1.78 (~ 16:9) so that we can recommend a constant aspect ratio/dimension.
    // One way to do this is making the containerMaxHeight to 100vh. See the corresponding styles.less file.
    isInThumbnailFlow,
    shouldShiftSharePageWrapperRight,
  });

  const meetsGoogleOneTapConditions = !isLoggedIn && !isMobile;

  const sidebarCallout = useSidebarCallout();

  const isChecklistShown =
    sidebarCallout === CALLOUTS.GET_STARTED_CHECKLIST_CALLOUT;

  const loggedOutDesktop = !isLoggedIn && !isMobileOrSmallTablet;

  const shouldSeeLoomBrandingPersistentRecorderButton =
    shouldShowLoomBranding && hasCustomWorkspaceLogo;

  const showRecordButton =
    hideBlackBarsInVideo &&
    !isChecklistShown &&
    !shouldSeeLoomBrandingPersistentRecorderButton;

  const userIsLoggedIn = useIsCurrentUserLoggedIn();
  const persona = useCurrentUserSelector(
    user => (user.persona as any)?.persona_v1?.use_case_plan_persona,
    null
  ) as string;

  const userHasRole = Boolean(persona);
  const isExpRoleQuestionMandatory = useExpRoleQuestionMandatory();

  useRoleMandatoryModal(
    isExpRoleQuestionMandatory,
    userIsLoggedIn,
    userHasRole
  );

  const isLandscape = useScreenInLandscapeMode();
  const isPortraitOnExpMwebCommenting = isExpMwebCommenting && !isLandscape;
  const isLandscapeOnExpMwebCommenting = isExpMwebCommenting && isLandscape;

  const player = usePlayer(videoId) as Player;
  const { setFullScreenToggleAgent, fullScreenToggleAgent } =
    useFullScreenToggleAgent();

  // Fullscreen toast functionality
  const { isToastOpen, onToastClick, onToastClose } =
    useFullscreenToast(videoId);

  // TODO(eagarwal): Move to a separate hook if ExpMwebCommenting is successful
  useEffect(() => {
    const autoToggleFullScreenOnLandscape =
      isExpMwebCommenting &&
      isInLandscapeMode &&
      !document.fullscreenElement &&
      fullScreenToggleAgent === 'none';

    const autoExitFullScreenOnPortraitIfAutoTriggered =
      isExpMwebCommenting &&
      !isInLandscapeMode &&
      document.fullscreenElement &&
      fullScreenToggleAgent === 'auto';

    const handleFullscreen = async () => {
      if (autoToggleFullScreenOnLandscape) {
        try {
          await player?.toggleFullscreen();
          setFullScreenToggleAgent('auto');
        } catch (error) {
          setFullScreenToggleAgent('none');
          // Auto-fullscreen failed due to browser security constraints
          // wherein fullscreen must be toggled by user interaction
        }
      } else if (autoExitFullScreenOnPortraitIfAutoTriggered) {
        player?.toggleFullscreen();
        setFullScreenToggleAgent('none');
      }
    };

    handleFullscreen();
  }, [
    isExpMwebCommenting,
    isInLandscapeMode,
    fullScreenToggleAgent,
    player,
    setFullScreenToggleAgent,
  ]);

  useUpdateRecordingVideoDocumentType({
    recordingDocumentationType: recordingDocumentationTypeParam,
  });

  return (
    <LayoutWrapper
      useAnonymousNavigation={useAnonymousNavigation}
      videoId={videoId}
    >
      <RoleCompletionToast />
      <FullscreenToast
        isOpen={isToastOpen}
        onClick={onToastClick}
        onClose={onToastClose}
      />
      <div ref={sharePageWrapperRef} className={sharePageWrapperCn}>
        {isLoggedIn && hasSuggestedWorkspaceBanner ? (
          <JoinTeamBanner organizationId={organizationId} />
        ) : null}

        <div className="sharePageContainer">
          <div
            ref={videoMetadataWrapperRef}
            id="videoAndMetadataWrapper"
            className="videoAndMetadataWrapper"
            style={
              isExpMwebCommenting && !isLoggedIn && isInLandscapeMode
                ? { marginTop: '64px' }
                : undefined
            }
          >
            {loggedOutDesktop ? <AnonShareHeader /> : null}

            <div className="videoContainer">
              <Banners />
              {children}

              {/* Desktop only engagement bar */}
              {!isMobile ? <EngagementBar /> : null}
              {showRecordButton ? (
                <SilentErrorBoundary feature={Feature.SDKRecorder}>
                  <Suspense fallback={null}>
                    <Container
                      position="fixed"
                      left="xlarge"
                      bottom="large"
                      zIndex={1}
                    >
                      <RecordButton
                        priorityList={
                          isLoggedIn ? [CHROME_EXTENSION, DESKTOP, SDK] : [SDK]
                        }
                        location={SHARE_PAGE}
                      >
                        <PersistentRecordButton
                          isCollapsed={true}
                          hideSideNav={true}
                          isOnSharePage={true}
                        />
                      </RecordButton>
                    </Container>
                  </Suspense>
                </SilentErrorBoundary>
              ) : null}
            </div>
            <VideoMetadata
              anonCreatorMode={anonCreatorMode}
              focusTitle={focusTitle}
              fromRecorderParam={fromRecorderParam}
            />
            {/* Mobile-web only engagement bar */}
            {isMobile && !isExpMwebCommenting ? <EngagementBar /> : null}
          </div>
          {isLandscapeOnExpMwebCommenting ? <EngagementBar /> : null}

          {showRightPanelWithResizer ? (
            <RightPanelWithResizer
              useDefaultWidth={isInThumbnailFlow}
              ref={rightPanelRef}
            />
          ) : null}
          {currentUserIsOwner ? <LoomAiTrialEndedController /> : null}
          <LoggedInOnly>
            <HelpBubble inVideoWrapper={true} rightPanelRef={rightPanelRef} />
          </LoggedInOnly>

          {isPortraitOnExpMwebCommenting ? (
            <div className="sticky-engagement-bar">
              <Container
                backgroundColor="white"
                borderSide="top"
                paddingX={3}
                paddingBottom={1.5}
              >
                <EngagementBar />
              </Container>
            </div>
          ) : null}
        </div>
      </div>

      <div id="gmail-integration-share-page-placeholder" />
      {shouldSeeLoomBrandingPersistentRecorderButton ? <LoomBranding /> : null}

      <FetchTranscriptWithGql />

      {/* // 🚩 Start: EXP_MWEB_COMMENTING */}
      <MobileCommentInputContainer />
      {/* // 🚩 End: EXP_MWEB_COMMENTING */}

      <SharePageHeaderContent
        isLoggedIn={isLoggedIn}
        fromRecorderParam={fromRecorderParam}
        fromTutorialParam={fromTutorialParam}
      />
      <Modals
        fromRecorderParam={fromRecorderParam}
        recordingLimitParam={recordingLimitParam}
      />
      {meetsGoogleOneTapConditions && !isStaging ? <GoogleOneTap /> : null}
    </LayoutWrapper>
  );
};

export const ShareVideoWrapper = (
  props: SharePageProps
): React.ReactElement => {
  const { isInThumbnailFlow } = useThumbnailFlow();

  const { video } = useVideoContext();
  const cta = useCtaForm();
  const { currentUserCanEdit } = video;
  const { sendScreenEvent } = useAnalytics();

  const { data: videoData } = useGetVideoQuery({
    variables: {
      id: video.id,
    },
  });

  useEffect(() => {
    if (videoData?.getVideo) {
      sendScreenEvent({
        name: 'loomVideoShare',
        attributes: {
          isMeetingRecording: props.isMeetingRecording,
        },
      });
    }
  }, [videoData?.getVideo, props.isMeetingRecording, sendScreenEvent]);

  useHandleParams({
    shouldOpenInsights: props.shouldOpenInsights,
    fromRecorderParam: props.fromRecorderParam,
    openSharePermissionsParam: props.openSharePermissionsParam,
  });
  useHardGateViewModalOnLoad(video.id);
  const currentUserIsOwner = useCurrentUserIsOwner({ videoId: video.id });
  const showTutorial =
    props.fromTutorialParam && props.fromRecorderParam && currentUserIsOwner;

  return (
    <SharePageWrapper
      focusTitle={props.focusTitle}
      fromRecorderParam={props.fromRecorderParam}
      fromTutorialParam={props.fromTutorialParam}
      recordingLimitParam={props.recordingLimitParam}
      userCanEdit={currentUserCanEdit}
      recordingDocumentationTypeParam={props.recordingDocumentationTypeParam}
    >
      {showTutorial ? <TutorialLayer /> : null}
      <SharePageVideo>
        <CelebrationLayer
          fromRecorderParam={props.fromRecorderParam}
          isFromTutorial={props.fromTutorialParam}
        />

        <CollapsedRightPanelInsidePlayer />
        <ContextAdapter />
        <VideoModelSync />
        {cta?.isEditingCta && currentUserIsOwner ? <CtaPreview /> : null}
        {isInThumbnailFlow ? <ThumbnailPositioner /> : null}
        <ZoomToClickSharePageFtux />
      </SharePageVideo>
    </SharePageWrapper>
  );
};
