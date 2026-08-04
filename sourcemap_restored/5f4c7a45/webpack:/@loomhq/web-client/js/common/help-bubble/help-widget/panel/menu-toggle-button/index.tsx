import React from 'react';

import { IconButton, Tooltip, Arrange } from '@loomhq/lens';
import { SvgAlignLeft } from '@loomhq/lens/icons/align-left';
import { SvgArrowLeft } from '@loomhq/lens/icons/arrow-left';

type MenuToggleButtonProps = {
  isMenuOpen: boolean;
  onClick: () => void;
};

export const MenuToggleButton = ({
  isMenuOpen,
  onClick,
}: MenuToggleButtonProps): React.ReactNode => {
  const { tooltipContent, icon, iconAltText } = isMenuOpen
    ? {
        tooltipContent: 'Back',
        icon: <SvgArrowLeft />,
        iconAltText: 'Back',
      }
    : {
        tooltipContent: 'Menu',
        icon: <SvgAlignLeft />,
        iconAltText: 'Menu',
      };

  return (
    <Tooltip
      tabIndex={-1}
      content={tooltipContent}
      placement="bottomCenter"
      delay="long"
    >
      <IconButton
        icon={<Arrange>{icon}</Arrange>}
        altText={iconAltText}
        onClick={onClick}
      />
    </Tooltip>
  );
};
