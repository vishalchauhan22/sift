import { useCallback, useEffect } from 'react';

import { useVideoContext } from '@js/common/video-player';
import { RIGHT_SIDEBAR_NAVIGATION_ITEM_CLICKED } from '@js/constants/events';
import { TabTypes, TAB_LIST } from '@js/pages/share/common';
import { useRightPanelTabStore } from './useRightPanelTabStore';
import * as analytics from '@js/utilities/analytics';

import { useSetInitialTab } from './useSetInitialTab';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { useHistory } from 'react-router-dom';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { getParam, hasParam, updateQueryParam } from '@js/utilities/url';

const TAB_QUERY_PARAM = 'tab';

/**
 * Performs case-insensitive lookup of tab name in TAB_LIST
 * @param tabParam The tab parameter from URL (potentially any casing)
 * @returns The correctly cased TabTypes value if found, null otherwise
 */
const findTabParam = (tabParam: string): TabTypes | null => {
  const tabEntries = Object.entries(TAB_LIST) as [string, TabTypes][];
  const foundEntry = tabEntries.find(
    ([, value]) => value.toLowerCase() === tabParam.toLowerCase()
  );
  return foundEntry ? foundEntry[1] : null;
};

export const useOnTab = (): {
  onTab: TabTypes | null;
  setOnTab: (newTab: TabTypes, skipAnalyticsTracking?: boolean) => void;
} => {
  const flagValue = useFeatureFlagValue(
    FEATURE_GATES.ROLLOUT_LOOM_TAB_HASH_ROUTES,
    ControlType.STATSIG_FEATURE_GATE
  );

  const isHashRoutingEnabled = flagValue === true;
  const hasTabParam = hasParam(TAB_QUERY_PARAM);

  const {
    video: { id: videoId },
  } = useVideoContext();

  const { currentRightPanelTab, setCurrentRightPanelTab } =
    useRightPanelTabStore();

  const history = useHistory();
  const searchParamTab = hasTabParam ? getParam(TAB_QUERY_PARAM) : null;

  const setOnTab = useCallback(
    (newTab: TabTypes, skipAnalyticsTracking = false) => {
      if (currentRightPanelTab != null && !skipAnalyticsTracking) {
        // dont send on initial page load or when explicitly skipped
        analytics.track(RIGHT_SIDEBAR_NAVIGATION_ITEM_CLICKED, {
          ...withIdentifiers(
            RIGHT_SIDEBAR_NAVIGATION_ITEM_CLICKED,
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          primary_navigation_item: newTab,
        });
      }
      setCurrentRightPanelTab(newTab);
      if (isHashRoutingEnabled && hasTabParam) {
        const updatedQueryParams = updateQueryParam(
          window.location.href,
          TAB_QUERY_PARAM,
          newTab
        );
        history.push({ search: updatedQueryParams });
      }
    },
    [
      setCurrentRightPanelTab,
      history,
      currentRightPanelTab,
      videoId,
      isHashRoutingEnabled,
      hasTabParam,
    ]
  );

  const validTab = searchParamTab ? findTabParam(searchParamTab) : null;
  const initialTab = validTab || currentRightPanelTab;

  // Syncs the tab from the url to currentRightPanelTab
  useEffect(() => {
    if (isHashRoutingEnabled && !currentRightPanelTab && validTab) {
      setOnTab(validTab);
    }
  }, [currentRightPanelTab, validTab, history, setOnTab, isHashRoutingEnabled]);

  useSetInitialTab({ onTab: initialTab, setOnTab });

  return { onTab: currentRightPanelTab, setOnTab };
};
