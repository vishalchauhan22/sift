import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { AtlassianManaged } from '@js/common/atlassian-workspace';
import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { AtlassianHeaderButton } from '@js/common/header/atlassian-header-button';
import { HeaderUpgradeButton } from '@js/components/HeaderUpgradeButton';
import UpgradePrompt from '@js/components/profile-bubble/upgrade-prompt';

import { useIncentivesPage } from '@js/hooks/experiments/useIncentivesPage';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import pluralize from 'pluralize';

import React from 'react';
import { isTrialing } from '@js/utilities/billingAndPayments/billingDetailsUtil';

import { getProductGrants } from '@loomhq/billing-core/utility';
import { Align, Arrange, Container, Text } from '@loomhq/lens';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { useUpgradeBanner } from './useUpgradeBanner';
import { Addon } from '../../../globalTypes.generated';

export const UpgradeBanner = (): JSX.Element | null => {
  const workspace = useGetSelectedWorkspace();
  const isStarterFree = workspace?.type === WORKSPACE_PLAN_STARTER_FREE;

  const { show, daysLeftInTrial } = useUpgradeBanner();
  const shouldShowIncentives = useIncentivesPage();

  const { data, loading } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  if (loading) {
    return null;
  }

  if (!show) {
    return null;
  }

  const products = new Set([
    ...((data?.billing?.billing_details?.plan?.product && [
      data?.billing?.billing_details?.plan?.product,
    ]) ||
      []),
    ...(data?.billing?.billing_details?.add_ons.map(
      addon => addon.price.product
    ) || []),
  ]);
  const grants = Array.from(products).map(product => getProductGrants(product));
  const tier3Trialing =
    grants.some(
      g => g.base === WORKSPACE_PLAN_BUSINESS && g.addon === Addon.Ai
    ) && isTrialing(data?.billing?.billing_details);

  // Ensure that the trial days remaining is at least 1
  const trialDaysRemaining = Math.max(daysLeftInTrial, 1);
  const trialDaysRemainingText = pluralize('day', trialDaysRemaining, true);

  let cta;

  switch (true) {
    case tier3Trialing:
      cta = `Enjoy unlimited recording and AI features for the next ${trialDaysRemainingText}.`;
      break;
    case isStarterFree:
      cta = (
        <Arrange gap="xsmall">
          <UpgradePrompt
            inUpgradeBanner
            shouldShowIncentives={shouldShowIncentives}
          />
          <div>Upgrade for unlimited video storage.</div>
        </Arrange>
      );
      break;
    default:
      cta = `Unlimited recording length + video storage for the next ${trialDaysRemainingText}.`;
  }

  return (
    <Container className="width:full p:medium" backgroundColor="highlight">
      <Align>
        <Arrange gap="medium">
          <Text fontWeight="bold" color="blurpleStrong">
            {cta}
          </Text>
          <AtlassianManaged
            LoomUI={
              <HeaderUpgradeButton
                source={RequestPlanUpgradeLocations.UPGRADE_BANNER}
              />
            }
            AtlassianUI={<AtlassianHeaderButton />}
          />
        </Arrange>
      </Align>
    </Container>
  );
};
