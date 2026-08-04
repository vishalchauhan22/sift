import { useIsSidebarCollapsedOrStacked } from '@js/common/layout';

export const useIsRightPanelOpen = (): boolean => {
  const { isCollapsed } = useIsSidebarCollapsedOrStacked();

  return !isCollapsed;
};
