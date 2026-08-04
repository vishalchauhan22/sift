import React from 'react';

import { IconButton, Tooltip, Arrange } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

type CloseButtonProps = {
  onClick: () => void;
};

export const CloseButton = ({ onClick }: CloseButtonProps): React.ReactNode => {
  return (
    <Tooltip
      tabIndex={-1}
      content="Close"
      placement="bottomCenter"
      delay="long"
    >
      <IconButton
        icon={
          <Arrange>
            <SvgClose />
          </Arrange>
        }
        altText="Close"
        onClick={onClick}
      />
    </Tooltip>
  );
};
