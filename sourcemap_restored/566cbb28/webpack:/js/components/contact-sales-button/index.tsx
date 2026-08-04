import { CONTACT_SALES_CTA_CLICK } from '@js/constants/events';

import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React, { useEffect } from 'react';

import useLocalStorageState from 'use-local-storage-state';
import { isPureTrial } from '@js/utilities/billingAndPayments/billingDetailsUtil';

import { Button, Tooltip } from '@loomhq/lens';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import * as analytics from '@js/utilities/analytics';

function useSyncBillingDataToLocalStorage() {
  const workspace = useGetSelectedWorkspace();

  const { data, called } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  const billing = data?.billing?.billing_details;
  const customer = data?.customer;
  const assignment =
    customer?.__typename === 'LoomCustomer' && customer?.third_tier_assignment;
  const pureTrial = isPureTrial(billing);
  const isPaused = Boolean(billing?.paused);

  const [, setIsPaused] = useLocalStorageState('billingIsPaused');
  const [, setIsTrialing] = useLocalStorageState('isPureTrial');
  const [, setThirdTierAssignment] = useLocalStorageState(
    'third_tier_assignment'
  );

  /**
   * @description This useEffect is implemented to set the local storage state and accessed in the marketing site which is a separate application.
   * @todo This should be removed once the marketing site is integrated with the main application or make direct API calls to get the billing details.
   */
  useEffect(() => {
    if (called) {
      setIsPaused(isPaused);
      setIsTrialing(pureTrial);

      if (assignment) {
        setThirdTierAssignment(assignment);
      }
    }
    // The local storage setters are causing the effect to run infinitely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pureTrial, isPaused, assignment, called]);
}

interface Props {
  size?: 'small' | 'medium' | 'large';
}

export const ContactSalesButton = (props: Props): JSX.Element | null => {
  useSyncBillingDataToLocalStorage();

  const largeScreen = useMatchLargeTabletOrDesktop();

  const buttonSize = props.size ?? (largeScreen ? 'medium' : 'small');

  const launchContactSalesForm = () => {
    analytics.track(CONTACT_SALES_CTA_CLICK, {
      path: window.location.pathname,
    });

    const url = new URL('/connect/enterprise', window.location.origin);

    window.open(url.toString(), '_blank');
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

export const MemoizedContactSalesButton = React.memo(ContactSalesButton);
