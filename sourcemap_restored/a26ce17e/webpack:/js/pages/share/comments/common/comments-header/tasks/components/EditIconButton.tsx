import React from 'react';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgEditBorder } from '@loomhq/lens/icons/edit-border';

export const EditIconButton = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  return (
    <Tooltip content="Edit" tabIndex={-1}>
      <IconButton
        altText="Edit task button"
        icon={<SvgEditBorder />}
        size="small"
        iconColor="bodyDimmed"
        onClick={onClick}
      />
    </Tooltip>
  );
};
