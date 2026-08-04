import React from 'react';

import { Button } from '@loomhq/lens';
import { SvgCollapseReplies } from '@loomhq/lens/icons/collapse-replies';
import { SvgExpandReplies } from '@loomhq/lens/icons/expand-replies';

export const ExpandOrCollapseRepliesButton = ({
  isCollapsed,
  onClick,
  extraRepliesCount,
}: {
  isCollapsed: boolean;
  onClick: () => void;
  extraRepliesCount?: number;
}): React.ReactElement => {
  return (
    <Button
      icon={isCollapsed ? <SvgExpandReplies /> : <SvgCollapseReplies />}
      iconPosition={isCollapsed ? 'left' : 'right'}
      onClick={onClick}
      size="small"
      style={{ border: 'none', color: 'var(--lns-color-bodyDimmed)' }}
    >
      {isCollapsed
        ? `${extraRepliesCount} more ${
            Number(extraRepliesCount) > 1 ? 'replies' : 'reply'
          }`
        : `Collapse replies`}
    </Button>
  );
};
