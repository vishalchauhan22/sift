import classNames from 'classnames';

import _debounce from 'lodash/debounce';

import React, { forwardRef, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { Container, Spacer, Tabs, Tab as LensTab } from '@loomhq/lens';
import { REWATCH_MEETINGS } from '@loomhq/shared-utilities/constants/featureFlag';
import {
  ControlType,
  EXPERIMENTS,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { ACTIVE_TAB_PARAM } from '@loomhq/shared-utilities/constants/urlParams';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useIsSidebarCollapsedOrStacked } from '@js/common/layout';
import { useIsMeetingRecording } from '@js/common/meeting-recordings';
import { useShouldShowViewsTab } from '@js/common/right-panel/useShouldShowViewersTab';

import { useThumbnailFlow } from '@js/common/thumbnail-flow';
import { useVideoContext } from '@js/common/video-player';
import { useIsEmailGatingIncomplete } from '@js/common/video-player/components/email-gating/useIsEmailGatingIncomplete';
import { useViewerInsight } from '@js/common/viewer-insights';
import { useGetUserIntegrationSettingsQuery } from '@js/components/account-settings/account-settings-integrations/GetUserIntegrationSettings.generated';

import { SHARE_PAGE_RIGHT_PANEL_WIDTH } from '@js/constants/localStorage';
import { useFeatureFlagValue, useFlagIsActivated } from '@js/hooks/featureFlag';
import { useIsTrialingAIAddOn } from '@js/hooks/useIsTrialingAIAddOn';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';
import {
  EDIT_TOOLS_LIST,
  EditToolsTypes,
  useCurrentUserCanEdit,
  useOnTab,
  TAB_LIST,
  TabTypes,
  Z_INDICES,
} from '@js/pages/share/common';
import { useSeasonalLaunchSharePageTourContext } from '@js/pages/share/common/context/seasonal-launch-tour-context';

import {
  ViewMeetingNotesInConfluenceButton,
  DEFAULT_RIGHT_PANEL_WIDTH,
  MIN_RIGHT_PANEL_WIDTH,
} from '@js/pages/share/right-panel/common';
// TODO: Properly relocate useCurrentUserCanEditVideo
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { useCurrentUserCanEditVideo } from '@js/pages/share/common/video-description';
import { useDefaultSettings } from '@js/pages/share/common/settings/useDefaultSettingsStore';
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';
import { getParam } from '@js/utilities/url';

import { EditorToolTip } from './EditorToolTip';
import { TabContent } from './TabContent';

import { CollapseButton } from './collapse-button';
import { RECAP_TAB_RIGHT_PANEL_WIDTH } from './meeting-recap-tab';
import { RightPanelResizer } from './resizer';
import { isMobile } from '@js/utilities/device';

const RightPanel: React.FC<{
  responsiveWidth?: number;
  setIsResizerDisabled?: (disabled: boolean) => void;
}> = ({ responsiveWidth, setIsResizerDisabled }) => {
  const {
    video: {
      id: videoId,
      showTranscriptToViewer: transcriptsEnabled,
      description: videoDescription,
    },
  } = useVideoContext();
  const { isStacked, isCollapsed } = useIsSidebarCollapsedOrStacked();
  const { onTab, setOnTab } = useOnTab();
  const width = isCollapsed ? 0 : responsiveWidth || DEFAULT_RIGHT_PANEL_WIDTH;
  const {
    toggleIsViewerSelected,
    isViewerSelected: isViewerInsightsActive,
    selectedViewer: isViewerSelected,
  } = useViewerInsight();
  const showViewsTab = useShouldShowViewsTab();
  const userCanEdit = useCurrentUserCanEdit();
  const isMeetingRecording = useIsMeetingRecording(videoId);
  const workspaceAllowsAiAccess = useWorkspaceAllowsAi();
  const shouldShowRecapTab =
    isMeetingRecording && (workspaceAllowsAiAccess || videoDescription);
  const { showDefaultSettings, setShowDefaultSettings } = useDefaultSettings();
  const isEmailGatingIncomplete = useIsEmailGatingIncomplete();
  const aiAccess = useCurrentUserSelector(user => user.aiAccess, null);
  const hasAiAccess = Object.values(aiAccess || {}).some(
    hasAccess => hasAccess
  );
  const isTrialingAiAddOn = useIsTrialingAIAddOn();

  useFlagIsActivated({
    flag: EXPERIMENTS.EXP_PICTURE_IN_SCRIPTURE,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: ['variant', 'variant-excluded'],
    eligibilityPreCheckFunction: () => {
      if (hasAiAccess || isTrialingAiAddOn) {
        return {
          pass: true,
        };
      }

      return {
        pass: false,
        failReason:
          "Users who don't have access to AI will not see the picture in scripture.",
      };
    },
  });

  const showTranscriptTab =
    (userCanEdit || transcriptsEnabled) && !isEmailGatingIncomplete;

  const [onEditSubpage, setOnEditSubpage] = useState<EditToolsTypes | null>(
    null
  );

  const { isActive } = useSeasonalLaunchSharePageTourContext();
  const activeTabParam = getParam(ACTIVE_TAB_PARAM);

  const currentUserCanEdit = useCurrentUserCanEditVideo(videoId);

  // helps with new comment entry point and scrolling of comments
  const [isScrolled, setIsScrolled] = useState(false);

  const rewatchMeetingsFeatureEnabled = useFeatureFlagValue(REWATCH_MEETINGS);

  const flagValue = useFeatureFlagValue(
    FEATURE_GATES.ROLLOUT_LOOM_TAB_HASH_ROUTES,
    ControlType.STATSIG_FEATURE_GATE
  );

  const isHashRoutingEnabled = flagValue === true;

  const { data: integrationSettings } = useGetUserIntegrationSettingsQuery({});
  const googleCalendarConnected = Boolean(
    integrationSettings?.me?.calendars?.length
  );

  const {
    thumbnailData: { thumbnailLocal },
    startThumbnailFlow,
  } = useThumbnailFlow();

  useEffect(() => {
    if (thumbnailLocal) {
      startThumbnailFlow();
      setOnEditSubpage(EDIT_TOOLS_LIST.Thumbnail);
    }

    if (!thumbnailLocal) {
      // if the local thumbnail does not exist
      // set the local editSubpage to null
      setOnEditSubpage(null);
    }

    if (showDefaultSettings) {
      setOnEditSubpage(EDIT_TOOLS_LIST.Settings);

      // Allow the subpage to also load before
      // resetting the default settings value
      setTimeout(() => {
        setShowDefaultSettings(false);
      });
    }

    if (!isHashRoutingEnabled && activeTabParam === TAB_LIST.Edit) {
      setOnTab(TAB_LIST.Edit);
    }
  }, [
    showDefaultSettings,
    setShowDefaultSettings,
    thumbnailLocal,
    activeTabParam,
    isHashRoutingEnabled,
    setOnTab,
    startThumbnailFlow,
  ]);

  const tabsToShow: TAB_LIST[] = [];

  if (shouldShowRecapTab) {
    tabsToShow.push(TAB_LIST.Recap);
  }

  if (userCanEdit) {
    tabsToShow.push(TAB_LIST.Edit);
  } else {
    if (onTab === TAB_LIST.Edit) {
      setOnEditSubpage(null);
      setOnTab(TAB_LIST.Activity);
    }
  }

  tabsToShow.push(TAB_LIST.Activity);

  if (showTranscriptTab) {
    tabsToShow.push(TAB_LIST.Transcript);
  }

  // Hide views tab for mobile web
  if (showViewsTab && !isMobile) {
    tabsToShow.push(TAB_LIST.Views);
  }

  if (userCanEdit) {
    tabsToShow.push(TAB_LIST.Settings);
  }

  useEffect(() => {
    if (setIsResizerDisabled) {
      const isOnSubpage = onEditSubpage || isViewerSelected;

      setIsResizerDisabled(isOnSubpage);
    }
  }, [onEditSubpage, isViewerSelected, setIsResizerDisabled]);

  useEffect(() => {
    if (isViewerInsightsActive && onTab !== TAB_LIST.Views) {
      setOnTab(TAB_LIST.Views);
    }
    // NOTE(tatiana)/TODO(viewx-2183-fix-missing-deps-issues-in): Not sure why we're using useEffect here to managed the tab states. Ideally refactor to remove useEffect, or at the very least, resolve missing dependency arrays propertly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewerInsightsActive]);

  useEffect(() => {
    if (isActive) {
      setOnTab(TAB_LIST.Edit);
    }
  }, [isActive, setOnTab]);

  useEffect(() => {
    if (
      (onTab === TAB_LIST.Views && !isViewerInsightsActive) ||
      (onTab !== TAB_LIST.Views && isViewerInsightsActive)
    ) {
      toggleIsViewerSelected();
    }
    // note: adding isViewerInsightsActive doesn't work well because of useEffect above
    // NOTE(tatiana)/TODO(viewx-2183-fix-missing-deps-issues-in): Not sure why we're using useEffect here to managed the tab states. Ideally refactor to remove useEffect, or at the very least, resolve missing dependency arrays properly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTab, toggleIsViewerSelected]);

  const showCollapseButton = !isStacked && !onEditSubpage && !isViewerSelected;

  const handleScroll = e => {
    setIsScrolled(e.target.scrollTop > 0);
  };

  // on Mobile Web:
  // Overview tab is used to display summary and chapters
  // Recap is prioritized over Overview
  const shouldShowOverviewTab =
    (videoDescription || currentUserCanEdit) && !shouldShowRecapTab && isMobile;
  if (shouldShowOverviewTab) {
    tabsToShow.push(TAB_LIST.Overview);
  }

  return (
    <Container
      borderSide="top"
      borderWidth={
        googleCalendarConnected || !rewatchMeetingsFeatureEnabled
          ? '2px'
          : '0px'
      }
      borderColor="backgroundSecondary"
      className={classNames('activitySidebarContainer', {
        collapsed: isCollapsed,
        stacked: isStacked,
        'sidebar-scrolled': isScrolled,
      })}
      id="activity-sidebar-container"
      width={isStacked ? 'unset' : `${width}px`}
      style={{
        overflowY: isStacked ? 'inherit' : 'auto',
        overflowX: 'hidden',
      }}
      onScroll={handleScroll}
    >
      {onTab === TAB_LIST.Recap && Boolean(videoDescription) && (
        <ViewMeetingNotesInConfluenceButton />
      )}

      <Container
        backgroundColor="background"
        style={{
          position: 'sticky',
          top: 0,
        }}
        zIndex={Z_INDICES.SIDEBAR}
      >
        {!isViewerSelected && !onEditSubpage && (
          <div id="right-panel-tabs">
            <Spacer top={2} left={3} right={isMobile ? 3 : 0}>
              <Tabs isPilledDesign={isMobile ? true : false}>
                {tabsToShow.map(tabName => {
                  return (
                    <Tab
                      key={tabName}
                      tabName={tabName}
                      isActive={tabName === onTab}
                      handleClick={() => setOnTab(tabName)}
                    />
                  );
                })}
              </Tabs>
            </Spacer>
          </div>
        )}

        {showCollapseButton && <CollapseButton />}
      </Container>
      <TabContent
        tabsToShow={tabsToShow}
        isViewerSelected={isViewerSelected}
        onEditSubpage={onEditSubpage}
        setOnEditSubpage={setOnEditSubpage}
      />
    </Container>
  );
};

const Tab = ({
  tabName,
  isActive,
  handleClick,
}: {
  tabName: TabTypes;
  isActive: boolean;
  handleClick: () => void;
}): JSX.Element => {
  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const Content = () => (
    <div>
      {tabName}
      {isActive ? <EditorToolTip tabName={tabName} /> : null}
    </div>
  );

  return (
    <LensTab
      isActive={isActive}
      className={isActive ? 'active-tab' : undefined}
      onClick={handleClick}
      data-testid={`sidebar-tab-${tabName}`}
    >
      <Content />
    </LensTab>
  );
};

export const RightPanelWithResizer = forwardRef<
  HTMLDivElement,
  { useDefaultWidth: boolean }
>(({ useDefaultWidth = false }, ref) => {
  const observed = (ref as React.MutableRefObject<HTMLDivElement>)?.current;

  const localStorageWidth = getLocalStorageKey(SHARE_PAGE_RIGHT_PANEL_WIDTH);
  const { onTab } = useOnTab();

  const localRightPanelWidth =
    !localStorageWidth || localStorageWidth < MIN_RIGHT_PANEL_WIDTH
      ? DEFAULT_RIGHT_PANEL_WIDTH
      : localStorageWidth;

  const [rightPanelWidth, setRightPanelWidth] = useState(localRightPanelWidth);
  const { isStacked, isCollapsed } = useIsSidebarCollapsedOrStacked();

  const [currentWidth, setCurrentWidth] = useState(0);
  const [resizableReady, setResizableReady] = useState(false);
  const [isResizerDisabled, setIsResizerDisabled] = useState(false);
  const setLocalWidth = _debounce(width => {
    setLocalStorageKey(SHARE_PAGE_RIGHT_PANEL_WIDTH, width);
  }, 300);

  // 1. Don't update the localWidth as we may retrieve it later,
  // see useEffect 2
  useEffect(() => {
    if (!useDefaultWidth) {
      setLocalWidth(rightPanelWidth);
    }
  }, [rightPanelWidth, setLocalWidth, useDefaultWidth]);

  // 2. We may retrieve the localWidth when we're not useDefaultWidth
  useEffect(() => {
    if (onTab === TAB_LIST.Recap) {
      setRightPanelWidth(RECAP_TAB_RIGHT_PANEL_WIDTH);
    } else {
      setRightPanelWidth(
        useDefaultWidth ? DEFAULT_RIGHT_PANEL_WIDTH : localRightPanelWidth
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDefaultWidth, onTab]);

  useEffect(() => {
    const update = e => {
      const width = e[0].target.clientWidth;

      setCurrentWidth(width);
    };

    const ro = new ResizeObserver(_debounce(update, 100));

    if (observed) {
      ro.observe(observed);
    }

    return () => ro.disconnect();
  }, [observed, ref]);

  useEffect(() => {
    if (isCollapsed) {
      setResizableReady(false);
    } else {
      // when open (not collapsed), it's resizable ready when the currentWidth gets to the set rightPanelWidth
      // this help with keeping the transition when opening/closing the sidebar
      if (!resizableReady && currentWidth === rightPanelWidth) {
        setResizableReady(true);
      }
    }
  }, [isCollapsed, currentWidth, resizableReady, rightPanelWidth]);

  return (
    <div ref={ref} className="rightPanelWrapper">
      <RightPanelResizer
        setWidth={setRightPanelWidth}
        disabled={isStacked || isCollapsed || isResizerDisabled}
      />
      <RightPanel
        responsiveWidth={rightPanelWidth}
        setIsResizerDisabled={setIsResizerDisabled}
      />
    </div>
  );
});
RightPanelWithResizer.displayName = 'RightPanelWithResizer';
