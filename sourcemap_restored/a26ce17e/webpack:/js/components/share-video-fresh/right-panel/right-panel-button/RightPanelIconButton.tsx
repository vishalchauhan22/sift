import React from 'react';

import { IconButton } from '@loomhq/lens';

type RightPanelIconButtonProps = {
  onClick: () => void;
  buttonIcon: React.ReactElement;
  onMouseEnter?: () => void;
  isDisabled?: boolean;
  altText: string;
  isCompact?: boolean;
};

export const RightPanelIconButton = ({
  onClick,
  buttonIcon,
  onMouseEnter,
  isDisabled = false,
  altText,
}: RightPanelIconButtonProps): React.ReactElement => {
  return (
    <IconButton
      altText={altText}
      isDisabled={isDisabled}
      size="small"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      icon={buttonIcon}
    />
  );
};
