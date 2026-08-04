import React from 'react';

import TooltipWithOverlaysImg from '@assets/img/consolidated-edit-tooltip-with-overlays-and-links.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const PaywalledEditToolsPopover = (): JSX.Element => {
  return (
    <EditSidebarTooltip
      isClosable={false}
      betaPillVariant={null}
      img={TooltipWithOverlaysImg}
      altText="Edit tools introduction"
      title="Polish and edit your video"
      text="Streamlined editing, trim and stitch clips, and add a CTA link, boxes, text & arrow overlays for extra clarity"
    />
  );
};
