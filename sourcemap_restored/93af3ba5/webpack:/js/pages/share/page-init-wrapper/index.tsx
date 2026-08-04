import { ErrorSeverities } from '@js/constants/error-severities';

import { SHARE_PAGE_ANON_EMAIL_PROVIDED_IN_URL_PARAM } from '@js/constants/events';

import { GOOGLE_PREVIEW_LINK_CLICKED } from '@js/constants/metrics';

import { NOT_FOUND } from '@js/constants/routes';

import { AnalyticsTrackPageWrapper } from '@js/common/analytics';

import { PageContextProvider } from '@js/common/context/page';
import { PageNames } from '@js/common/context/page/constants';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { PageDwellPageWrapper } from '@js/common/dwell-time';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { ModalContainer } from '@js/common/modal-container';
import { useTheaterMode } from '@js/common/theater-mode';
import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoPasswordContext } from '@js/common/video-password';
import { VideoContextProvider } from '@js/common/video-player';
import { useUpdateVideo } from '@js/common/video/useUpdateVideo';
import { AnonCreatorSignupBanner } from '@js/components/anon-creator-signup-banner';
import { HighlightCommentContext } from '@js/components/share-video/comments/player-content/comment/HighlightCommentContext';
import {
  parseVideo,
  userContext,
} from '@js/components/video-player-fresh/utils';

import { useAnonCreatorMode } from '@js/hooks/useAnonCreatorMode';

import { useGetUserCreator } from '@js/hooks/useGetUserCreator';
import { TAB_LIST, usePreloadVideo } from '@js/pages/share/common';
import { ChaptersContextProvider } from '@js/pages/share/common/chapters';
import {
  HighlightReplyContext,
  DescriptionContextProvider,
} from '@js/pages/share/common/context';
import { SeasonalLaunchSharePageTourContextProvider } from '@js/pages/share/common/context/seasonal-launch-tour-context';
import { ShareVideoWrapper as ShareVideo } from '@js/pages/share/page-init-wrapper/share-video-wrapper';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';

import { incrementMetric } from '@js/utilities/metrics';
import { ShareVideoFreshRUMWrapper } from '@js/utilities/rum/ShareVideoFreshRUMWrapper';

import {
  GOOGLE_PROJECTS,
  GOOGLE_PROJECTS_APP_SOURCES,
} from '@loomhq/shared-utilities/constants/googlePreview';
import {
  COMMENT_ID_QUERY_PARAM,
  REPLY_ID_QUERY_PARAM,
} from '@loomhq/shared-utilities/constants/mention';

import { Page as PageEnum } from '@loomhq/shared-utilities/constants/product';
import { getVideoIdFromPageUrl } from '@loomhq/shared-utilities/utilities/urlUtils';
import { useRightPanelTabStore } from '../common/useRightPanelTabStore';
import { useRightPanelExpansion } from '../common/use-right-panel-expansion';
import * as analytics from '@js/utilities/analytics';
import { setDocumentTitle } from '@js/utilities/video';
import { useFromRecorder } from '@js/common/useFromRecorder';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { WorkflowTemplateType } from '@js/globalTypes.generated';

export const ShareVideoInitWrapper: FC<
  React.PropsWithChildren<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    focusTitleParam: boolean;
    mutedParam: boolean;
    timeParam: string;
    shouldOpenInsights: boolean;
    fromRecorderParam: boolean;
    fromTutorialParam: boolean;
    recordingLimitParam: boolean;
    activeTabParam: TAB_LIST | null;
    oauthError: string;
    anonEmailParam: string;
    openSharePermissionsParam: boolean;
    cascadingRecordersTabUuidParam: string;
    recordingDocumentationTypeParam?: WorkflowTemplateType;
  }>
> = ({
  data,
  focusTitleParam,
  mutedParam,
  timeParam,
  shouldOpenInsights,
  fromRecorderParam,
  fromTutorialParam,
  recordingLimitParam,
  activeTabParam,
  oauthError,
  anonEmailParam,
  openSharePermissionsParam,
  cascadingRecordersTabUuidParam,
  recordingDocumentationTypeParam,
}) => {
  const { showErrorBar } = useErrorBar();
  const [isInitialized, setIsInitialized] = useState(false);
  const { initPasswordStore } = useVideoPasswordContext();
  const { setCurrentRightPanelTab } = useRightPanelTabStore();
  const videoId = getVideoIdFromPageUrl(window.location.href);
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { updateVideo } = useUpdateVideo();
  const { setAnonUserName } = useAnonUserName();
  const { setIsInTheaterMode, isInTheaterMode } = useTheaterMode();
  const { setExpandRightPanel } = useRightPanelExpansion();

  const { videoModel: videoFromServer, loading } = usePreloadVideo({
    videoId,
  });

  const { injectCustomBrandColors } = useCustomBranding({ videoId });
  const anonCreatorMode = useAnonCreatorMode(videoId);
  const getUserCreator = useGetUserCreator();
  const { setFromRecorder } = useFromRecorder();

  useLayoutEffect(() => {
    if (!loading && !videoFromServer && !isInitialized) {
      window.location.href = NOT_FOUND;
    }
  }, [isInitialized, loading, videoFromServer]);

  // Initialize video state
  useLayoutEffect(() => {
    if (!loading && videoFromServer && !isInitialized) {
      if (oauthError) {
        showErrorBar({
          message: decodeURIComponent(oauthError),
          severity: ErrorSeverities.ERROR,
        });
      }

      initPasswordStore({
        isProtected: videoFromServer.is_protected,
        needsPassword: videoFromServer.needs_password,
      });
      getUserCreator();
      updateVideo(videoFromServer);
      setDocumentTitle(videoFromServer.name);
      setFromRecorder(fromRecorderParam);

      if (activeTabParam) {
        setCurrentRightPanelTab(activeTabParam);
      }

      setExpandRightPanel(fromRecorderParam);

      injectCustomBrandColors();

      // Always start in default mode if coming from recorder
      if (!fromRecorderParam && isInTheaterMode) {
        setIsInTheaterMode(true);
      }

      setIsInitialized(true);
    }
  }, [
    activeTabParam,
    fromRecorderParam,
    initPasswordStore,
    injectCustomBrandColors,
    isInitialized,
    getUserCreator,
    loading,
    oauthError,
    showErrorBar,
    updateVideo,
    videoFromServer,
    setIsInTheaterMode,
    isInTheaterMode,
    setCurrentRightPanelTab,
    setFromRecorder,
    setExpandRightPanel,
  ]);

  useEffect(() => {
    if (!loading && anonEmailParam && !isLoggedIn) {
      setAnonUserName(anonEmailParam);

      const videoId = videoFromServer ? videoFromServer.id : null;

      analytics.track(
        SHARE_PAGE_ANON_EMAIL_PROVIDED_IN_URL_PARAM,
        withIdentifiers(
          SHARE_PAGE_ANON_EMAIL_PROVIDED_IN_URL_PARAM,
          AnalyticsEntityId.video(videoId, 'videoId')
        )
      );
    }
  }, [anonEmailParam, isLoggedIn, loading, videoFromServer, setAnonUserName]);

  useEffect(() => {
    const documentReferrer = document.referrer;
    const isFromGoogleDocs =
      GOOGLE_PROJECTS_APP_SOURCES[GOOGLE_PROJECTS.smartChip].includes(
        documentReferrer
      );
    const isFromGoogleChat =
      GOOGLE_PROJECTS_APP_SOURCES[GOOGLE_PROJECTS.googleChat].includes(
        documentReferrer
      );

    if (isFromGoogleDocs || isFromGoogleChat) {
      incrementMetric(GOOGLE_PREVIEW_LINK_CLICKED, {
        type: isFromGoogleDocs
          ? GOOGLE_PROJECTS_APP_SOURCES[GOOGLE_PROJECTS.smartChip]
          : GOOGLE_PROJECTS_APP_SOURCES[GOOGLE_PROJECTS.googleChat],
      });
    }
  }, []);

  // Return null while waiting for the redirect to happen
  // and waiting for synchronous dispatches to complete
  if (loading || !videoFromServer || !isInitialized) {
    return null;
  }

  const currentUserIsOwner = videoFromServer.current_user_is_owner;

  // the share page forces the videoId as internal id
  // for the main video
  const customUserContext = { ...userContext, uid: videoFromServer.id };

  return (
    <VideoContextProvider
      video={parseVideo(videoFromServer)}
      userContext={customUserContext}
    >
      <PageContextProvider pageName={PageNames.SHARE}>
        <ShareVideoFreshRUMWrapper>
          <AnalyticsTrackPageWrapper
            pageName={PageEnum.IndividualVideo}
            props={{
              is_owner: currentUserIsOwner,
              fresh: true,
              isCommunityLoom: videoFromServer.isCommunityLoom,
            }}
          >
            <PageDwellPageWrapper
              pageName={PageEnum.IndividualVideo}
              props={{
                videoId,
              }}
            >
              <ChaptersContextProvider>
                <SeasonalLaunchSharePageTourContextProvider>
                  {anonCreatorMode && <AnonCreatorSignupBanner />}
                  <HighlightCommentContext.Provider
                    value={data[COMMENT_ID_QUERY_PARAM]}
                  >
                    <HighlightReplyContext.Provider
                      value={data[REPLY_ID_QUERY_PARAM]}
                    >
                      <DescriptionContextProvider>
                        <ShareVideo
                          focusTitle={focusTitleParam}
                          mutedParam={mutedParam}
                          timeParam={timeParam}
                          shouldOpenInsights={shouldOpenInsights}
                          fromRecorderParam={fromRecorderParam}
                          fromTutorialParam={fromTutorialParam}
                          cascadingRecordersTabUuidParam={
                            cascadingRecordersTabUuidParam
                          }
                          recordingLimitParam={recordingLimitParam}
                          openSharePermissionsParam={openSharePermissionsParam}
                          isMeetingRecording={
                            videoFromServer.isMeetingRecording
                          }
                          recordingDocumentationTypeParam={
                            recordingDocumentationTypeParam
                          }
                        />
                      </DescriptionContextProvider>
                    </HighlightReplyContext.Provider>
                  </HighlightCommentContext.Provider>
                  <ModalContainer />
                </SeasonalLaunchSharePageTourContextProvider>
              </ChaptersContextProvider>
            </PageDwellPageWrapper>
          </AnalyticsTrackPageWrapper>
        </ShareVideoFreshRUMWrapper>
      </PageContextProvider>
    </VideoContextProvider>
  );
};
