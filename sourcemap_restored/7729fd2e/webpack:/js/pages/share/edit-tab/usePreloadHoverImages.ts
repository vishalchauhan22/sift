import { usePreloadImages } from '@js/hooks/usePreloadImages';

import AddALinkPng from '@assets/img/add-a-link-tooltip.png';
import VariablesTooltip from '@assets/img/audio-variables-tooltip-1.png';
import ConsolidatedEditTooltipWithOverlaysImg from '@assets/img/consolidated-edit-tooltip-with-overlays.png';

const HOVER_IMAGES = [
  ConsolidatedEditTooltipWithOverlaysImg,
  VariablesTooltip,
  AddALinkPng,
];

export const usePreloadHoverImages = (): void => {
  usePreloadImages(HOVER_IMAGES);
};
