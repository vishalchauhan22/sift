import classNames from 'classnames';

import React from 'react';

import { Container, Spacer } from '@loomhq/lens';

import { SidebarTabErrorBoundary } from '@js/common/right-panel/SidebarTabErrorBoundary';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { ViewerInsightsList } from '@js/components/share-video/viewer-insights/list';
import {
  EditToolsTypes,
  TAB_LIST,
  TabTypes,
  useOnTab,
} from '@js/pages/share/common';

// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { EditTabWrapper as EditTab } from '@js/pages/share/edit-tab';

import { SIDEBAR_HEIGHT } from '@js/pages/share/right-panel/common';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { SettingsTabController } from '@js/pages/share/video-settings';

import { ActivityTabWithErrorBondary } from './activity-tab';
import { CreateTabWithErrorBoundary } from './create-tab';

import { getTabsHeight } from '@js/components/share-video-fresh/right-panel/heights';
import { MeetingRecapTab } from './meeting-recap-tab';
import { SummaryAndChapters } from './summary-and-chapters';
import { TranscriptAsync as Transcript } from './transcript/async';

export const TabContent = ({
  tabsToShow,
  isViewerSelected,
  onEditSubpage,
  setOnEditSubpage,
}: {
  tabsToShow: TabTypes[];
  isViewerSelected: boolean;
  onEditSubpage: EditToolsTypes | null;
  setOnEditSubpage: (subpage: EditToolsTypes | null) => void;
}): React.ReactElement => {
  const { onTab } = useOnTab();
  const tabsHeight = getTabsHeight();

  const containerHeight = `calc(100% - ${tabsHeight}px)`;

  return (
    <Container position="relative" height={containerHeight}>
      {tabsToShow.includes(TAB_LIST.Recap) && (
        <SidebarTabErrorBoundary
          name="Activity Transcript Sidebar Recap"
          feature={Feature.RecapTab}
          tabName="Recap"
        >
          {onTab === TAB_LIST.Recap ? <MeetingRecapTab /> : null}
        </SidebarTabErrorBoundary>
      )}

      {tabsToShow.includes(TAB_LIST.Edit) && (
        <SidebarTabErrorBoundary
          name="Activity Transcript Sidebar Edit"
          feature={Feature.TranscriptEdit}
          tabName="Editor"
        >
          {onTab === TAB_LIST.Edit && (
            <div style={{ height: onEditSubpage ? SIDEBAR_HEIGHT : 'auto' }}>
              <EditTab
                editSubtab={onEditSubpage}
                setEditSubtab={setOnEditSubpage}
              />
            </div>
          )}
        </SidebarTabErrorBoundary>
      )}

      {tabsToShow.includes(TAB_LIST.Activity) && (
        <ActivityTabWithErrorBondary />
      )}

      {tabsToShow.includes(TAB_LIST.Create) &&
        (onTab === TAB_LIST.Create ? <CreateTabWithErrorBoundary /> : null)}

      {tabsToShow.includes(TAB_LIST.Transcript) && (
        <SidebarTabErrorBoundary
          name="Activity Transcript Sidebar Transcript"
          feature={Feature.TranscriptEdit}
          tabName="Transcript"
        >
          {onTab == TAB_LIST.Transcript && <Transcript />}
        </SidebarTabErrorBoundary>
      )}

      {tabsToShow.includes(TAB_LIST.Views) && (
        <>
          {onTab === TAB_LIST.Views && (
            <div>
              <SidebarTabErrorBoundary
                name="Activity Transcript Sidebar Viewer Insights"
                feature={Feature.EngagementInsights}
                tabName="Views"
              >
                <Spacer left={3} right={3}>
                  {
                    // #Note: it is necessary to have this conditional since ViewerInsightsList needs to be reloaded when we're on active viewer
                    isViewerSelected ? (
                      <Spacer top={3}>
                        <ViewerInsightsList inActivitySidebar />
                      </Spacer>
                    ) : (
                      <ViewerInsightsList inActivitySidebar />
                    )
                  }
                </Spacer>
              </SidebarTabErrorBoundary>
            </div>
          )}
        </>
      )}

      {tabsToShow.includes(TAB_LIST.Settings) && (
        <SidebarTabErrorBoundary
          name="Activity Transcript Sidebar Settings"
          feature={Feature.VideoSettings}
          tabName="Settings"
        >
          <div style={onTab === TAB_LIST.Settings ? {} : { display: 'none' }}>
            <SettingsTabController
              goBackToEditPage={() => setOnEditSubpage(null)}
            />
          </div>
        </SidebarTabErrorBoundary>
      )}

      {tabsToShow.includes(TAB_LIST.Overview) && (
        <SidebarTabErrorBoundary
          name="Activity Transcript Overview Settings"
          feature={Feature.MobileTranscriptSignupGate}
          tabName="Overview"
        >
          <div className={classNames({ none: onTab !== TAB_LIST.Overview })}>
            <SummaryAndChapters />
          </div>
        </SidebarTabErrorBoundary>
      )}
    </Container>
  );
};
