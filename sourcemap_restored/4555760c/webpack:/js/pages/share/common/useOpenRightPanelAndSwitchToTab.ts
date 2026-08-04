import { useIsSidebarCollapsedOrStacked } from '@js/common/layout';

import { TAB_LIST } from './constants';

import { useOnTab } from './useOnTab';
import { useToggleRightPanel } from './useToggleRightPanel';

export const useOpenRightPanelAndSwitchToTab = (): ((
  tab?: TAB_LIST
) => void) => {
  const { onTab, setOnTab } = useOnTab();
  const toggleRightPanel = useToggleRightPanel();

  const { isCollapsed } = useIsSidebarCollapsedOrStacked();

  const openRightPanelAndSwitchToTab = (tab = TAB_LIST.Activity) => {
    if (onTab !== tab) {
      setOnTab(tab);
    }

    if (isCollapsed) {
      toggleRightPanel(true);
    }
  };

  return openRightPanelAndSwitchToTab;
};
