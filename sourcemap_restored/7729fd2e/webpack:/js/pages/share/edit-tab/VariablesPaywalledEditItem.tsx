import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React, { useState } from 'react';

import { Popover } from '@loomhq/lens';
import { SvgVariables } from '@loomhq/lens/icons/variables';

import { VariablesPopover } from './common/popovers';

import { PaywalledEditItem } from './edit-item';

export const VariablesPaywalledEditItem = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledPopover
      isOpen={isOpen}
      placement="leftCenter"
      rootId="container"
      offset={1}
      content={<VariablesPopover />}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <PaywalledEditItem
          title={'Add an audio variable'}
          icon={<SvgVariables />}
          upgradeSourceLocation={RequestPlanUpgradeLocations.VARIABLES}
        />
      </div>
    </StyledPopover>
  );
};

const StyledPopover = styled(Popover)`
  width: 100%;
`;
