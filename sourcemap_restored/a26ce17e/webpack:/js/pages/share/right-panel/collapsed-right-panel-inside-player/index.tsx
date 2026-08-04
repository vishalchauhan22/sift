import classNames from 'classnames';

import { useIsSidebarCollapsedOrStacked } from '@js/common/layout';
import { useShouldShowViewsTab } from '@js/common/right-panel/useShouldShowViewersTab';
import {
  useCommentsCount,
  usePlayerHasStarted,
  useVideoContext,
} from '@js/common/video-player';

import _debounce from 'lodash/debounce';

// TODO: Import css tyles modularly instead of importing
// the full sheet
import './styles.css';

import {
  useCurrentUserCanEdit,
  useToggleRightPanel,
  useOnTab,
  TabTypes,
  TAB_LIST,
  useHasCreateTabAccess,
} from '@js/pages/share/common';
import React from 'react';

import { Arrange, IconButton, Spacer, Tooltip } from '@loomhq/lens';
import { SvgBarChart } from '@loomhq/lens/icons/bar-chart';

import { SvgComment } from '@loomhq/lens/icons/comment';

import { SvgScissors } from '@loomhq/lens/icons/scissors';
import { SvgSparkle } from '@loomhq/lens/icons/sparkle';
import { SvgTranscript } from '@loomhq/lens/icons/transcript';

const CollapsedCommentIcon = ({
  switchToTab,
}: {
  switchToTab: (tabName: TabTypes) => void;
}): React.ReactElement => {
  const totalCommentsCount: number = useCommentsCount();
  const formattedCommentsCount: string =
    totalCommentsCount > 9 ? '9+' : `${totalCommentsCount}`;

  return (
    <div id="collapsed-sidebar-button-comment-icon">
      <IconButton
        altText="Activity"
        className="collapsed-sidebar-button-icon"
        icon={<SvgComment />}
        onClick={() => switchToTab(TAB_LIST.Activity)}
      />

      {totalCommentsCount > 0 && (
        <span id="collapsed-sidebar-button-comment-icon-number">
          {formattedCommentsCount}
        </span>
      )}
    </div>
  );
};

export const CollapsedRightPanelInsidePlayer = (): React.ReactElement => {
  const {
    video: { id: videoId },
  } = useVideoContext();
  const hasPlayerStarted = usePlayerHasStarted(videoId);
  const currentUserCanEdit = useCurrentUserCanEdit();
  const openRightPanel = useToggleRightPanel();
  const shouldShowViewsTab = useShouldShowViewsTab();
  const { isStacked, isCollapsed } = useIsSidebarCollapsedOrStacked();
  const hasCreateTabAccess = useHasCreateTabAccess();

  const { onTab, setOnTab } = useOnTab();

  // debounce makes the buttons feel less jumpy
  const switchToTab = _debounce((tabName: TabTypes) => {
    openRightPanel(true);
    onTab !== tabName && setOnTab(tabName);
  }, 100);

  const shouldHide = !isCollapsed || isStacked;

  return (
    <div
      className={classNames(
        'collapsed-sidebar-buttons',
        !hasPlayerStarted && 'prePlay',
        hasPlayerStarted && 'postPlay',
        !shouldHide && 'isVisible'
      )}
    >
      <Spacer top={2} bottom={2}>
        <Arrange gap={2} autoFlow="row">
          {currentUserCanEdit && (
            <Tooltip placement="leftCenter" content="Edit">
              <IconButton
                altText="Edit"
                className="collapsed-sidebar-button-icon"
                icon={<SvgScissors />}
                onClick={() => switchToTab(TAB_LIST.Edit)}
              />
            </Tooltip>
          )}

          {hasCreateTabAccess && (
            <Tooltip placement="leftCenter" content="Create">
              <IconButton
                altText="Create"
                className="collapsed-sidebar-button-icon"
                icon={<SvgSparkle />}
                onClick={() => switchToTab(TAB_LIST.Create)}
              />
            </Tooltip>
          )}

          <Tooltip placement="leftCenter" content="Activity">
            <CollapsedCommentIcon switchToTab={switchToTab} />
          </Tooltip>

          <Tooltip placement="leftCenter" content="Transcript">
            <IconButton
              altText="Transcript"
              className="collapsed-sidebar-button-icon"
              icon={<SvgTranscript />}
              onClick={() => switchToTab(TAB_LIST.Transcript)}
            />
          </Tooltip>

          {shouldShowViewsTab && (
            <Tooltip placement="leftCenter" content="Views">
              <IconButton
                altText="Views"
                className="collapsed-sidebar-button-icon"
                icon={<SvgBarChart />}
                onClick={() => switchToTab(TAB_LIST.Views)}
              />
            </Tooltip>
          )}
        </Arrange>
      </Spacer>
    </div>
  );
};
