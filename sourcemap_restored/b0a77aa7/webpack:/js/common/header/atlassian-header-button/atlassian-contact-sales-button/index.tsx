import { CONTACT_SALES_CTA_CLICK } from '@js/constants/events';

import { ATLASSIAN_CONTACT_SALES } from '@js/constants/routes';

import React from 'react';

import { Button, Tooltip } from '@loomhq/lens';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import * as analytics from '@js/utilities/analytics';

interface Props {
  size?: 'small' | 'medium' | 'large';
}

export const AtlassianContactSalesButton = (
  props: Props
): JSX.Element | null => {
  const largeScreen = useMatchLargeTabletOrDesktop();

  const buttonSize = props.size ?? (largeScreen ? 'medium' : 'small');

  const launchContactSalesForm = () => {
    analytics.track(CONTACT_SALES_CTA_CLICK, {
      path: window.location.pathname,
    });

    const url = new URL(ATLASSIAN_CONTACT_SALES);

    window.open(url.toString());
  };

  return (
    <Tooltip content="Contact our team" placement="bottomCenter" tabIndex={-1}>
      <Button
        size={buttonSize}
        onClick={launchContactSalesForm}
        variant="neutral"
      >
        Contact Sales
      </Button>
    </Tooltip>
  );
};

export const MemoizedAtlassianContactSalesButton = React.memo(
  AtlassianContactSalesButton
);
