import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { useGetWorkspaceAggEntitlementsQuery } from '@js/utilities/billing/GetWorkspaceAGGEntitlements.generated';
import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';

import {
  getDaysLeftInTrialFromBillingDetails,
  isPureTrial,
} from '@js/utilities/billingAndPayments/billingDetailsUtil';
import { isFromPublicSharePage } from '@js/utilities/url';

import { MILLISECONDS_TO } from '@loomhq/shared-utilities/constants/units';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

type UpgradeBannerReturnType = {
  show: boolean;
  daysLeftInTrial: number;
};

export const useUpgradeBanner = (): UpgradeBannerReturnType => {
  const { fromPublicSharePage: isSharePage } = isFromPublicSharePage();

  const workspace = useGetSelectedWorkspace();
  const atlassianManaged = useIsAtlassianManagedWorkspace();

  const starterFree = workspace?.type === WORKSPACE_PLAN_STARTER_FREE;
  const business = workspace?.type === WORKSPACE_PLAN_BUSINESS;

  const { data, loading } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  const billingDetails = data?.billing?.billing_details;

  const { data: entitlementData, loading: entitlementDataLoading } =
    useGetWorkspaceAggEntitlementsQuery({
      variables: {
        workspaceId: workspace?.id,
      },
      skip: !workspace || !atlassianManaged,
    });

  const entitlement =
    entitlementData?.getWorkspaceAGGEntitlements?.__typename ===
    'GetWorkspaceAGGEntitlementsPayload'
      ? entitlementData.getWorkspaceAGGEntitlements.entitlements[0]
      : null;

  const ccpTrialing = entitlement?.trialing;

  const trialDaysLeft = workspace?.site_id
    ? Math.ceil((entitlement?.timeLeft || 0) / MILLISECONDS_TO.DAY)
    : getDaysLeftInTrialFromBillingDetails(billingDetails);

  const daysLeftInTrial = Math.max(trialDaysLeft, 1);

  const subscriptionTrial = workspace?.site_id
    ? ccpTrialing
    : isPureTrial(billingDetails);
  const businessSubscriptionTrial = business && subscriptionTrial;

  const show = Boolean(
    isSharePage && (starterFree || businessSubscriptionTrial)
  );

  if (loading || entitlementDataLoading) {
    return {
      show: false,
      daysLeftInTrial: 0,
    };
  }

  return {
    show,
    daysLeftInTrial,
  };
};
