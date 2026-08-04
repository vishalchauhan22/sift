import React from 'react';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgChevronsRight } from '@loomhq/lens/icons/chevrons-right';
import { useToggleRightPanel } from '@js/pages/share/common';

import $ from './styles.module.css';

export const CollapseButton = (): React.ReactElement => {
  const toggleRightPanel = useToggleRightPanel();

  return (
    <div className={$.toggleSidebarButton}>
      <Tooltip
        isInline={false}
        content={`Hide sidebar`}
        shortcut={['T']}
        placement="rightCenter"
      >
        <IconButton
          altText={`Hide sidebar`}
          icon={<SvgChevronsRight />}
          onClick={() => {
            toggleRightPanel(false);
          }}
        />
      </Tooltip>
    </div>
  );
};
