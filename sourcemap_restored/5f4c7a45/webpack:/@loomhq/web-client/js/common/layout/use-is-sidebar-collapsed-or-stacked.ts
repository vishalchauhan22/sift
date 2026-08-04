// TODO: Update this hook to more meaningfully use and update state, such as with updateExpandRightPanelAfterRecording

import { LARGE_DESKTOP_MIN_WIDTH } from '@js/constants/breakpoints';

import { useTheaterMode } from '@js/common/theater-mode';
import { useMatchMedia } from '@js/hooks/useMatchMedia';
import { useRightPanelExpansion } from '@js/pages/share/common/use-right-panel-expansion';

type SidebarCollapsedOrStackedReturnType = {
  isStacked: boolean;
  isCollapsed: boolean;
};

export const useIsSidebarCollapsedOrStacked =
  (): SidebarCollapsedOrStackedReturnType => {
    const { isInTheaterMode } = useTheaterMode();
    const isStacked = useMatchMedia(
      `(max-width: ${LARGE_DESKTOP_MIN_WIDTH}px)`
    );

    const { expandRightPanel: shouldExpandRightPanel } =
      useRightPanelExpansion();

    const isCollapsed =
      isInTheaterMode && !isStacked && !shouldExpandRightPanel;

    return { isStacked, isCollapsed };
  };
