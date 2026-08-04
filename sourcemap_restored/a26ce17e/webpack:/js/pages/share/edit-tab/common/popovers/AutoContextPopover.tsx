import React from 'react';

import AutoContextPopoverImg from '@assets/img/auto-context-popover.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const AutoContextPopover = (): JSX.Element => {
  return (
    <EditSidebarTooltip
      isClosable={false}
      betaPillVariant={null}
      img={AutoContextPopoverImg}
      altText="Auto context introduction"
      title="Auto-enhance videos with AI"
      text="Auto-titles, summaries, and chapters entice your viewers to click play."
    />
  );
};
