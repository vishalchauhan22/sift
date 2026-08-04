import React, { useEffect } from 'react';

import { Arrange, Container, IconButton, Spacer, Tooltip } from '@loomhq/lens';
import { SvgBell } from '@loomhq/lens/icons/bell';
import { EXP_DOWNLOAD_GATING } from '@loomhq/shared-utilities/constants/featureFlag';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { VIDEO_DOWNLOAD_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { WORKSPACE_PLAN_STARTER_FREE } from '@loomhq/shared-utilities/constants/workspacePlans';
import { AtlassianManaged } from '@js/common/atlassian-workspace';
import { AtlassianHeaderButton } from '@js/common/header/atlassian-header-button';
import { MediaQuery } from '@js/common/layout';
import { useUnseenNotificationsCount } from '@js/common/notifications/useUnseenNotificationCount';
import { useShouldHideLeftNav } from '@js/common/useShouldHideLeftNav';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useExpVizCohesionShareTitle } from '@js/hooks/experiments/useExpVizCohesionShareTitle';
import { HeaderUpgradeButton } from '@js/components/HeaderUpgradeButton';
import { MemoizedContactSalesButton } from '@js/components/contact-sales-button';
import { CopyShareVideoLinkIconTextButton } from '@js/common/share-video/copy-link-button';
import SearchIcon from '@js/components/destination-search/search-bar/search-bar-mobile';
import HeaderPortal from '@js/components/layout/header/portal';
import { UpgradePrompt } from '@js/components/profile-bubble/upgrade-prompt';
import {
  SMALL_DESKTOP_MAX_WIDTH,
  SMALL_DESKTOP_MIN_WIDTH,
} from '@js/constants/breakpoints';

import { LOOM_BARE_URI, NOTIFICATIONS_PAGE } from '@js/constants/routes';

import { useShouldSeeNavHeaderContactSalesCta } from '@js/hooks/contactSales';
import { useIncentivesPage } from '@js/hooks/experiments/useIncentivesPage';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useStartDownload } from '@js/hooks/header';

import { useAnonCreatorMode } from '@js/hooks/useAnonCreatorMode';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useMatchDesktop, useMatchMobileOnly } from '@js/hooks/useMatchMedia';
import { useStorageIncentiveEligibility } from '@js/hooks/useStorageIncentiveEligibility';
import {
  useGetSelectedWorkspace,
  useUserInSameWorkspaceAsItem,
} from '@js/hooks/workspace';
import { useHideInformationDueToPassword } from '@js/pages/share/common';
import { useUpgradeBanner } from '@js/pages/share/upgrade-banner/useUpgradeBanner';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';
import { getParam, removeParamsFromQueryString } from '@js/utilities/url';

import { OverflowMenu } from '../overflow-menu';

import { ViewerInsights } from '../viewer-insights';
import { HeaderContentAnonymousDesktop } from './header-content-anonymous-desktop';
import { SplitShareCopyButton } from './split-share-copy-button';
import styles from './styles.module.less';
import { useGetTranscodedVideoUrlStore } from '@js/common/video/useGetTranscodedVideoUrlStore';

type HeaderContentProps = {
  isLoggedIn: boolean;
  fromRecorderParam: boolean;
  fromTutorialParam: boolean;
};

const LoadingContent = () => (
  <Spacer top={1} bottom={1}>
    <Arrange gap="medium">
      <Container
        height={4}
        width={4}
        backgroundColor="disabledBackground"
        radius="full"
      />

      <Container
        height={4}
        width={12}
        backgroundColor="disabledBackground"
        radius="full"
      />
    </Arrange>
  </Spacer>
);

const HeaderContentWithoutFeatureWrapper = ({
  isLoggedIn,
  fromRecorderParam,
  fromTutorialParam,
}: HeaderContentProps): JSX.Element => {
  const startDownload = useStartDownload();
  const workspace = useGetSelectedWorkspace();
  const isMobile = useMatchMobileOnly();

  const { count: unseenNotificationsCount } = useUnseenNotificationsCount();

  const shouldShowIncentives = useIncentivesPage();
  const {
    video: {
      downloadable: isDownloadVideoEnabled,
      id: videoId,
      isOwner: currentUserIsOwner,
      title: videoTitle,
      organizationId,
    },
  } = useVideoContext();
  const anonCreatorMode = useAnonCreatorMode(videoId);
  const { password } = useVideoPasswordContext();
  const { url: downloadUrl } = useGetTranscodedVideoUrlStore();

  const [displayContactSalesCta] = useShouldSeeNavHeaderContactSalesCta();

  const shouldSeeContactSalesCtaInHeader = displayContactSalesCta && !isMobile;

  const isDownloadGateExperiment = useFlagIsActivated({
    flag: EXP_DOWNLOAD_GATING,
    activationValues: ['variant-2'],
  });

  const viewerInMatchingWorkspace =
    useUserInSameWorkspaceAsItem(organizationId);

  const hasDownloadsScope = useHasScope(VIDEO_DOWNLOAD_ACCESS);

  const downloadName = `${videoTitle || videoId}.mp4`;

  useEffect(() => {
    const startDownloadParam = getParam('start_download');
    const canStartDownload =
      hasDownloadsScope &&
      startDownloadParam &&
      isLoggedIn &&
      isDownloadVideoEnabled &&
      downloadUrl;

    if (canStartDownload) {
      startDownload({
        url: downloadUrl,
        name: downloadName,
        opts: {
          video_id: videoId,
          is_owner: currentUserIsOwner,
        },
        password,
      });

      // remove the param in url after downloading
      const { pathname, search } = window.location;

      const newQueryString = removeParamsFromQueryString(
        ['start_download'],
        search
      );

      window.history.replaceState('', '', `${pathname}${newQueryString}`);
    }
  }, [
    hasDownloadsScope,
    downloadName,
    downloadUrl,
    isDownloadVideoEnabled,
    isLoggedIn,
    currentUserIsOwner,
    videoId,
    password,
    startDownload,
  ]);
  const { featureLoadedRef } = useFeatureWrapper();

  const hideSideNav = useShouldHideLeftNav();

  const currentPlanIsFreePlan = workspace.type === WORKSPACE_PLAN_STARTER_FREE;

  const showVideoLimitsInHeader = useStorageIncentiveEligibility();

  const hideInformationDueToPassword = useHideInformationDueToPassword();
  const showLoadingState = isDownloadGateExperiment === undefined;
  const loggedOutDesktop = !isLoggedIn && !isMobile;
  const loggedOutMobile = !isLoggedIn && isMobile;

  const showUpgradePrompt = showVideoLimitsInHeader && !isMobile;
  const showCopyLinkTutorial = Boolean(
    fromRecorderParam && fromTutorialParam && currentUserIsOwner
  );

  const { show: showingUpgradeBanner } = useUpgradeBanner();
  const onDesktop = useMatchDesktop();
  const { expVizCohesionShareTitleVariant } = useExpVizCohesionShareTitle();
  const showViewsUnderVideo = expVizCohesionShareTitleVariant === 'variant-2';

  if (hideInformationDueToPassword) {
    return <></>;
  }

  if (showLoadingState) {
    return (
      <HeaderPortal>
        <div ref={featureLoadedRef}>
          <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MAX_WIDTH}px)`}>
            <LoadingContent />
          </MediaQuery>
        </div>
      </HeaderPortal>
    );
  }

  if (loggedOutDesktop) {
    return (
      <HeaderPortal>
        <div ref={featureLoadedRef}>
          <HeaderContentAnonymousDesktop videoId={videoId} />
        </div>
      </HeaderPortal>
    );
  }

  if (loggedOutMobile) {
    return (
      <HeaderPortal>
        <div ref={featureLoadedRef}>
          <CopyShareVideoLinkIconTextButton
            organizationId={organizationId}
            videoId={videoId}
            videoName={videoTitle}
            analyticsSource="share_page"
            showTutorial={showCopyLinkTutorial}
          />
        </div>
      </HeaderPortal>
    );
  }

  return (
    <HeaderPortal>
      <div ref={featureLoadedRef} className={styles.headerContentWrapper}>
        <Arrange gap="medium">
          {!hideSideNav ? (
            <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MAX_WIDTH}px)`}>
              <SearchIcon />
            </MediaQuery>
          ) : null}

          {showViewsUnderVideo === false ? (
            <ViewerInsights videoId={videoId} />
          ) : null}

          {!showingUpgradeBanner && currentPlanIsFreePlan && !onDesktop ? (
            <CopyShareVideoLinkIconTextButton
              organizationId={organizationId}
              videoId={videoId}
              videoName={videoTitle}
              analyticsSource="share_page"
              showTutorial={showCopyLinkTutorial}
            />
          ) : (
            <SplitShareCopyButton
              organizationId={organizationId}
              isLoggedIn={isLoggedIn}
              videoId={videoId}
              videoTitle={videoTitle}
              showCopyLinkTutorial={showCopyLinkTutorial}
              viewerInMatchingWorkspace={viewerInMatchingWorkspace}
            />
          )}

          {hideSideNav ? (
            <>
              {showUpgradePrompt && !showingUpgradeBanner ? (
                <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MAX_WIDTH}px)`}>
                  <UpgradePrompt
                    minimal
                    shouldShowIncentives={shouldShowIncentives}
                  />
                </MediaQuery>
              ) : null}

              <AtlassianManaged
                LoomUI={
                  shouldSeeContactSalesCtaInHeader ? (
                    <MemoizedContactSalesButton />
                  ) : showingUpgradeBanner ? null : (
                    <HeaderUpgradeButton />
                  )
                }
                AtlassianUI={
                  showingUpgradeBanner ? null : <AtlassianHeaderButton />
                }
              />

              <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MIN_WIDTH}px)`}>
                <SearchIcon />

                <Tooltip content="Notifications" placement="bottomCenter">
                  <div>
                    {unseenNotificationsCount > 0 && (
                      <div className={styles.bubble}>
                        <Container
                          backgroundColor="record"
                          height="small"
                          width="small"
                        />
                      </div>
                    )}
                    <IconButton
                      altText="Notifications"
                      icon={<SvgBell />}
                      onClick={event => {
                        // Open in new tab if cmd or ctrl is held down
                        if (event.metaKey || event.ctrlKey) {
                          window.open(
                            `https://${LOOM_BARE_URI}${NOTIFICATIONS_PAGE}`,
                            '_blank'
                          );
                        } else {
                          window.open(
                            `https://${LOOM_BARE_URI}${NOTIFICATIONS_PAGE}`,
                            '_self',
                            'noopener'
                          );
                        }
                      }}
                    />
                  </div>
                </Tooltip>
              </MediaQuery>
            </>
          ) : null}

          {!anonCreatorMode ? (
            <OverflowMenu
              currentPlanIsFreePlan={currentPlanIsFreePlan}
              isDownloadGateExperiment={isDownloadGateExperiment}
            />
          ) : null}
        </Arrange>
      </div>
    </HeaderPortal>
  );
};

export const HeaderContent = (props: HeaderContentProps): JSX.Element => (
  <FeatureWrapper
    feature={Feature.Header}
    errorType={ErrorBoundaryTypes.SILENT}
  >
    <HeaderContentWithoutFeatureWrapper {...props} />
  </FeatureWrapper>
);
