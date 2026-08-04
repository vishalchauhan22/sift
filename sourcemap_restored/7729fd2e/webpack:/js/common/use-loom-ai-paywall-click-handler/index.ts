import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { useLoomAiAddonPurchaseOnClick } from '@js/common/use-loom-ai-add-on-purchase-on-click';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

import { isPureTrial } from '@js/utilities/billingAndPayments/billingDetailsUtil';

import { getProductGrants } from '@loomhq/billing-core/utility';
import {
  ORG_ROLE_CREATOR_LITE,
  ORG_ROLE_ADMIN,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import { SALES_SUPPORT_TYPE_LED } from '@loomhq/shared-utilities/constants/salesSupportTypes';
import {
  WORKSPACE_PLAN_STARTER_FREE,
  WORKSPACE_PLAN_ENTERPRISE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { Addon } from '@js/globalTypes.generated';

export const useLoomAiPaywallClickHandler = (
  source: RequestPlanUpgradeLocations = RequestPlanUpgradeLocations.AI_SIDEBAR_CTA
): {
  onClick: () => void;
} => {
  const workspace = useGetSelectedWorkspace();

  // TODO(creator systems): fix to handle error and loading states
  const { data } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  const billing = data?.billing?.billing_details;

  const workspaceType = workspace?.type;
  const pureTrial = billing ? isPureTrial(billing) : false;
  const salesLed =
    workspace?.organization_properties?.salesSupportType ===
    SALES_SUPPORT_TYPE_LED;

  const enterprise = workspaceType === WORKSPACE_PLAN_ENTERPRISE;
  const isEnterpriseLike = salesLed || enterprise;
  const addOns = billing?.add_ons ?? [];
  const aiAddOn = addOns
    ? addOns.find(a => getProductGrants(a.price.product).addon === Addon.Ai)
    : undefined;
  const paused = Boolean(billing?.paused);

  const shouldRequestRoleUpgrade =
    aiAddOn && workspace?.memberRole === ORG_ROLE_CREATOR_LITE;
  const shouldRequestPlanUpgrade =
    !aiAddOn && workspace?.memberRole !== ORG_ROLE_ADMIN;
  const shouldRequest = shouldRequestRoleUpgrade || shouldRequestPlanUpgrade;

  let purchaseType;

  switch (true) {
    case shouldRequest:
      purchaseType = 'request-ai';
      break;
    case aiAddOn &&
      getProductGrants(aiAddOn.price.product).addon === Addon.Ai &&
      !pureTrial:
      purchaseType = 'has-ai-addon';
      break;
    case isEnterpriseLike:
      purchaseType = 'sales-led';
      break;
    case workspaceType === WORKSPACE_PLAN_STARTER_FREE || pureTrial:
      purchaseType = 'with-base-plan';
      break;
    default:
      purchaseType = 'add-on-only';
  }

  const { onClick } = useLoomAiAddonPurchaseOnClick({
    purchaseType,
    source,
    pureTrial,
    paused,
  });

  return {
    onClick,
  };
};
