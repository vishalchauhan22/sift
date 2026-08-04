import React from 'react';

import { RECORD_REPLY_SOURCE } from '@js/constants/sdk';
import RecordAReplyPng from '@assets/img/record-a-reply-tooltip.png';
import { RecordReplyButtonAsync } from '@js/pages/share/common/record-reply/async';
import {
  RightPanelTooltip,
  RightPanelTooltipContent,
  // Below can be resolved when the comment panel is
  // moved into the right-panel
  // eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
} from '@js/pages/share/right-panel';

export const RecordReplyIconButton = (): JSX.Element => {
  return (
    <RightPanelTooltip
      placement={'bottomRight'}
      tooltipContent={
        <RightPanelTooltipContent
          text="Respond by recording a new Loom"
          altText="Record a Reply"
          img={RecordAReplyPng}
          imgWidth="210px"
        />
      }
    >
      <RecordReplyButtonAsync
        compact
        iconColor="bodyDimmed"
        source={RECORD_REPLY_SOURCE.SIDEBAR_ENTRY_POINT}
      />
    </RightPanelTooltip>
  );
};
