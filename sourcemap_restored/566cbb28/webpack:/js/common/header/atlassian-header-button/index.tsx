import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { useCurrentUserSelector } from '@js/common/current-user';
import { hasAnyAiScope } from '@js/common/current-user/schema/getLoomSsrUserCompat/hasAnyAiScope';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

import React from 'react';

import { useGetWorkspaceAggEntitlementsQuery } from '@js/utilities/billing/GetWorkspaceAGGEntitlements.generated';
import { useGetAggChangePlanUrlQuery } from '@js/utilities/billing/getAGGChangePlanUrl.generated';

import { MemoizedAtlassianContactSalesButton } from './atlassian-contact-sales-button';
import { RequestUpgradeButton } from './requestUpgradeButton';
import { UpgradeButton } from './upgradeButton';

import { determineUpgradeButtonType } from './utils';

export const AtlassianHeaderButton = ({
  source = RequestPlanUpgradeLocations.HEADER,
}: {
  source?: RequestPlanUpgradeLocations;
}): React.ReactElement | null => {
  const workspace = useGetSelectedWorkspace();
  const hasAiAddOn = useCurrentUserSelector(user => hasAnyAiScope(user), false);

  const isEnterprise = workspace.type === 'enterprise';
  const isBusinessAi = workspace.type === 'business' && hasAiAddOn;

  const { data: atlassianPlanData, loading: atlassianPlanLoading } =
    useGetAggChangePlanUrlQuery({
      variables: {
        workspaceId: workspace.id,
      },
      // Enterprise users don't need to see the CTA, so we don't need
      // to fetch this data. Additionally, if the workspace is unavailable
      // we don't need to fetch this data.
      skip: !workspace || isEnterprise,
    });

  const { data: entitlementData } = useGetWorkspaceAggEntitlementsQuery({
    variables: {
      workspaceId: workspace.id,
    },
    // Enterprise users don't need to see the CTA, so we don't need
    // to fetch this data. Additionally, if the workspace is unavailable
    // we don't need to fetch this data.
    skip: !workspace || isEnterprise,
  });

  if (!workspace || isEnterprise) {
    return null;
  }

  const atlassianPlanPayload =
    atlassianPlanData?.getAGGChangePlanUrl?.__typename ===
    'GetAGGChangePlanUrlPayload'
      ? atlassianPlanData?.getAGGChangePlanUrl
      : null;
  const entitlementPayload =
    entitlementData?.getWorkspaceAGGEntitlements?.__typename ===
    'GetWorkspaceAGGEntitlementsPayload'
      ? entitlementData?.getWorkspaceAGGEntitlements
      : null;

  const atlassianPlanUrl = atlassianPlanPayload?.url;
  const isCollection = atlassianPlanPayload?.isCollection;
  const entitlements = entitlementPayload?.entitlements;

  if (
    atlassianPlanLoading ||
    !atlassianPlanUrl ||
    isCollection ||
    !entitlements
  ) {
    return null;
  }

  const isAtlassianBillingUser =
    atlassianPlanPayload?.isAvailableToUser ?? false;
  const isAutoConverting = entitlements[0]?.autoConverting ?? false;
  const isTrialing = entitlements[0]?.trialing ?? false;

  const buttonType = determineUpgradeButtonType({
    isAdmin: isAtlassianBillingUser,
    atlassianPlanUrl,
    isEnterprise,
    isBusinessAi,
    isTrialing,
    isAutoConverting,
    source,
  });

  switch (buttonType) {
    case 'admin-upgrade':
      return <UpgradeButton atlassianPlanUrl={atlassianPlanUrl} />;
    case 'contact-sales':
      return <MemoizedAtlassianContactSalesButton />;
    case 'request-upgrade':
      return <RequestUpgradeButton source={source} />;
    case 'none':
    default:
      return null;
  }
};
