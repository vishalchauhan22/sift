import React from 'react';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';

export const DeleteIconButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}): JSX.Element => {
  return (
    <Tooltip content="Delete" tabIndex={-1}>
      <IconButton
        altText="Delete task button"
        icon={<SvgTrash />}
        size="small"
        iconColor="bodyDimmed"
        onClick={onClick}
        isDisabled={isLoading}
      />
    </Tooltip>
  );
};
