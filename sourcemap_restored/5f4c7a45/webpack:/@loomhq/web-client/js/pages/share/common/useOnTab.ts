import { useCallback, useEffect } from 'react';

import { useVideoContext } from '@js/common/video-player';
import { RIGHT_SIDEBAR_NAVIGATION_ITEM_CLICKED } from '@js/constants/events';
import {
  TabTypes,
  getTabFromSlug,
  getSlugFromTab,
} from '@js/pages/share/common';
import { useRightPanelTabStore } from './useRightPanelTabStore';
import * as analytics from '@js/utilities/analytics';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';

import { useSetInitialTab } from './useSetInitialTab';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const getTabFromHash = (): TabTypes => {
  const hash = window.location.hash.slice(1); // Remove the # symbol
  return getTabFromSlug(hash);
};

export const useOnTab = (): {
  onTab: TabTypes | null;
  setOnTab: (newTab: TabTypes) => void;
} => {
  const {
    video: { id: videoId },
  } = useVideoContext();

  const { currentRightPanelTab, setCurrentRightPanelTab } =
    useRightPanelTabStore();

  const isHashRoutingEnabled = useFeatureFlagValue(
    FEATURE_GATES.ROLLOUT_LOOM_TAB_HASH_ROUTES,
    ControlType.STATSIG_FEATURE_GATE
  );

  const setOnTab = useCallback(
    (newTab: TabTypes) => {
      if (currentRightPanelTab != null) {
        // dont send on initial page load
        analytics.track(RIGHT_SIDEBAR_NAVIGATION_ITEM_CLICKED, {
          ...withIdentifiers(
            RIGHT_SIDEBAR_NAVIGATION_ITEM_CLICKED,
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          primary_navigation_item: newTab,
        });
      }

      setCurrentRightPanelTab(newTab);

      if (!isHashRoutingEnabled) {
        return;
      }

      // Update URL hash with the slugified tab name
      window.location.hash = getSlugFromTab(newTab);
    },
    [
      setCurrentRightPanelTab,
      currentRightPanelTab,
      videoId,
      isHashRoutingEnabled,
    ]
  );

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const tabFromHash = getTabFromHash();
      if (tabFromHash !== currentRightPanelTab) {
        setOnTab(tabFromHash);
      }
    };

    if (!isHashRoutingEnabled) {
      return;
    }

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRightPanelTab, isHashRoutingEnabled, setOnTab]);

  useSetInitialTab({ onTab: currentRightPanelTab, setOnTab });

  return { onTab: currentRightPanelTab, setOnTab };
};
