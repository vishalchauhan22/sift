import React from 'react';

import WorkflowsPopoverImg from '@assets/img/workflows-popover.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const WorkflowsPopover = (): JSX.Element => {
  return (
    <EditSidebarTooltip
      isClosable={false}
      betaPillVariant={null}
      img={WorkflowsPopoverImg}
      altText="AI workflows introduction"
      title="Complete important workflows fast"
      text="Instantly turn your video into a doc, message, or bug report with AI workflows."
    />
  );
};
