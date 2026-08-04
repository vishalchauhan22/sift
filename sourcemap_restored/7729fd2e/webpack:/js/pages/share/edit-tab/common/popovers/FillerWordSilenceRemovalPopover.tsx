import React from 'react';

import EditTooltipImg from '@assets/img/quick-edit-tooltip.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const FillerWordSilenceRemovalPopover = (): JSX.Element => {
  return (
    <EditSidebarTooltip
      isClosable={false}
      betaPillVariant={null}
      img={EditTooltipImg}
      altText="Remove silences and filler words introduction"
      title="Auto-remove ums, ahs, and awkward silences"
      text="Easily enhance your video and remove filler words and silences in one click."
    />
  );
};
