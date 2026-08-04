import { useCallback } from 'react';

import { useRightPanelExpansion } from './use-right-panel-expansion';
import { useTheaterMode } from '@js/common/theater-mode';
import { useViewerInsight } from '@js/common/viewer-insights';

import { LARGE_DESKTOP_MIN_WIDTH } from '@js/constants/breakpoints';
import { useMatchMedia } from '@js/hooks/useMatchMedia';

export const useToggleRightPanel = (): ((
  shouldOpenRightPanel: boolean
) => void) => {
  const { setExpandRightPanel } = useRightPanelExpansion();
  const isStacked = useMatchMedia(`(max-width: ${LARGE_DESKTOP_MIN_WIDTH}px)`);
  const { toggleIsViewerSelected, isViewerSelected } = useViewerInsight();
  const { setIsInTheaterMode } = useTheaterMode();

  const toggleRightPanel = useCallback(
    (shouldOpenRightPanel: boolean) => {
      if (isStacked) {
        // if stacked, we do not want to collapse/expand
        return;
      }

      setExpandRightPanel(false);

      // open right panel == theater mode false
      const newTheaterMode = !shouldOpenRightPanel;

      setIsInTheaterMode(newTheaterMode);

      if (newTheaterMode && isViewerSelected) {
        toggleIsViewerSelected();
      }
    },
    [
      setExpandRightPanel,
      isStacked,
      isViewerSelected,
      toggleIsViewerSelected,
      setIsInTheaterMode,
    ]
  );

  return toggleRightPanel;
};
