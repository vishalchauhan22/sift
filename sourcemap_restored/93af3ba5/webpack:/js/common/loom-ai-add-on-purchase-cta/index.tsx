import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React from 'react';

import { isPureTrial } from '@js/utilities/billingAndPayments/billingDetailsUtil';

import { Button } from '@loomhq/lens';

import { useLoomAiAddonPurchaseOnClick } from '../use-loom-ai-add-on-purchase-on-click';
import { PurchaseCtaClickOptions } from './types';

interface PurchaseCtaProps
  extends Omit<PurchaseCtaClickOptions, 'paused' | 'pureTrial'> {
  buttonVariant: 'primary' | 'ai';
  showAiPanelWithWorkflows?: boolean;
  cta?: string;
  onCloseClick?: () => Promise<void>;
}

export const LoomAiAddonPurchaseCta = (
  props: PurchaseCtaProps
): JSX.Element | null => {
  const workspace = useGetSelectedWorkspace();
  const { data, loading } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace,
  });
  const billing = data?.billing?.billing_details;
  const paused = Boolean(billing?.paused);
  const pureTrial = billing ? isPureTrial(billing) : false;

  const { onClick } = useLoomAiAddonPurchaseOnClick({
    ...props,
    paused,
    pureTrial,
  });

  if (loading) {
    return null;
  }

  switch (props.purchaseType) {
    case 'request-ai':
      return (
        <Button variant={props.buttonVariant} type="button" onClick={onClick}>
          {props.cta || 'Upgrade'}
        </Button>
      );
    case 'sales-led':
      return (
        <Button
          type="button"
          variant={props.buttonVariant}
          htmlTag="a"
          onClick={onClick}
        >
          {props.cta || 'Contact Sales'}
        </Button>
      );
    case 'add-on-only':
      return (
        <Button
          type="button"
          onClick={onClick}
          variant={
            props.showAiPanelWithWorkflows ? 'neutral' : props.buttonVariant
          }
          style={{ width: 'fit-content' }}
        >
          {props.cta
            ? props.cta
            : props.showAiPanelWithWorkflows
              ? 'Upgrade to Loom AI'
              : 'Buy Now'}
        </Button>
      );
    case 'has-ai-addon':
      return (
        <Button variant={props.buttonVariant} type="button" onClick={onClick}>
          {props.cta || 'Get Started'}
        </Button>
      );
    default:
      return (
        <Button variant={props.buttonVariant} htmlTag="a" onClick={onClick}>
          {props.cta || 'Upgrade'}
        </Button>
      );
  }
};
