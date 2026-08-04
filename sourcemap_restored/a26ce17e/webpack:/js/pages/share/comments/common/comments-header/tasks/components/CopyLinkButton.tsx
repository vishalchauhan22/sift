import React from 'react';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgLink } from '@loomhq/lens/icons/link';

export const CopyLinkButton = ({
  isCopied,
  onClick,
}: {
  isCopied: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <Tooltip
      content={isCopied ? 'Link copied!' : 'Copy link'}
      placement="topCenter"
    >
      <IconButton
        altText="Copy link"
        icon={<SvgLink />}
        size="small"
        iconColor="bodyDimmed"
        onClick={onClick}
      />
    </Tooltip>
  );
};
