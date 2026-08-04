import React from 'react';

import ConsolidatedEditTooltipWithOverlaysImg from '@assets/img/consolidated-edit-tooltip-with-overlays.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const ConsolidatedEditPopover = (): JSX.Element => {
  return (
    <EditSidebarTooltip
      isClosable={false}
      betaPillVariant={null}
      img={ConsolidatedEditTooltipWithOverlaysImg}
      altText="Consolidated Editor introduction"
      title="Polish and edit your video"
      text="Streamlined editing, trim and stitch clips, and add boxes, text & arrow overlays for extra clarity"
    />
  );
};
