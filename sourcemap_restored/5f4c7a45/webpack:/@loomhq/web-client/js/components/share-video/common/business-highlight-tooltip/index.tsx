import React from 'react';

import { Arrange, Icon, Spacer, Text, Tooltip } from '@loomhq/lens';
import { SvgEditions } from '@loomhq/lens/icons/editions';

/*
 * THIS COMPONENT SHOULD ONLY BE RENDERED AFTER CHECKING FOR
 * NO PRICE ELASTICITY EXPERIMENT AND BUSINESS TRIAL
 */
export const BusinessHighlightTooltip = ({
  children,
  tooltipText,
  tooltipDirection,
  inActivitySidebar = false,
}: {
  children: React.ReactNode;
  tooltipDirection: 'bottomCenter' | 'rightCenter' | 'leftCenter' | 'topCenter';
  tooltipText: string;
  inActivitySidebar?: boolean;
}): JSX.Element => {
  return (
    <div className="businessHighlightTooltipWrapper">
      <Tooltip
        placement={tooltipDirection}
        tabIndex={-1}
        triggerOffset={8}
        maxWidth={inActivitySidebar ? 30 : undefined}
        isInline={false}
        keepOpen
        content={
          <>
            <Arrange gap="small">
              <Icon color="upgradeHover" size={2} icon={<SvgEditions />} />
              <Text color="upgradeHover" size="body-sm" fontWeight="bold">
                Available with your trial
              </Text>
            </Arrange>
            <Spacer bottom={1} />
            <Text size="body-sm">{tooltipText}</Text>
          </>
        }
      >
        {children}
      </Tooltip>
    </div>
  );
};
