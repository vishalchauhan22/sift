import {
  HEADER_PERSISTENT_UPGRADE_BUTTON_CLICKED,
  SEASONAL_LAUNCH_FTUX_MODAL_DISMISSED,
} from '@js/constants/events';

import React, { useEffect, useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import {
  getGrantHierarchy,
  getProductGrants,
} from '@loomhq/billing-core/utility';
import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';
import {
  WORKSPACE_ADD_ON_PLAN_AI,
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';

import { NonAdminPersistentUpgradeButton } from './NonAdminPersistentUpgradeButton';
import { PersistentUpgradeButton } from './PersistentUpgradeButton';
import { useGetWorkspaceBillingDetailsQuery } from '../../common/billing/getWorkspaceBillingDetails.generated';
import { RequestPlanUpgradeLocations } from '../../constants/requestPlanUpgradeLocations';
import { useGetSelectedWorkspace } from '../../hooks/workspace-basic';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';
import { track } from '../../utilities/analytics';
import { isPureTrial } from '../../utilities/billingAndPayments/billingDetailsUtil';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { Variant } from '@js/common/seasonal-launch-modal/common/types';
import { SEASONAL_LAUNCH_MODAL_VARIANTS } from '@loomhq/shared-utilities/constants/featureFlag';

interface HeaderUpgradeButtonProps {
  source?: RequestPlanUpgradeLocations;
}

export const HeaderUpgradeButton = ({
  source = RequestPlanUpgradeLocations.HEADER,
}: HeaderUpgradeButtonProps): JSX.Element | null => {
  const workspace = useGetSelectedWorkspace();
  const hasAiFeatureAccess = useHasAIFeatureAccess();
  const { value: workspacePersona } = useWorkspaceSetting(
    WorkspaceSetting.WORKSPACE_PERSONA
  );

  const { data, loading } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  const billing = data?.billing?.billing_details;

  const grants = billing?.plan?.product
    ? getProductGrants(billing?.plan?.product)
    : null;

  const grantsScore = grants ? getGrantHierarchy(grants) : 0;
  const maxMonetizationGrantScore = getGrantHierarchy({
    base: WORKSPACE_PLAN_BUSINESS,
  });
  const shouldMonetize = grantsScore <= maxMonetizationGrantScore;

  const aiAddOn = Boolean(
    billing?.add_ons?.some(
      a => getProductGrants(a.price.product).addon === WORKSPACE_ADD_ON_PLAN_AI
    )
  );
  const admin = workspace?.memberRole === ORG_ROLE_ADMIN;
  const business = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const starterFree = workspace?.type === WORKSPACE_PLAN_STARTER_FREE;
  const pureTrial = isPureTrial(billing);
  const isPaused = Boolean(billing?.paused);

  const [, setIsPaused] = useLocalStorageState('billingIsPaused');
  const [, setIsTrialing] = useLocalStorageState('isPureTrial');

  const seasonalLaunchModalVariantsFeatureFlagValue: Variant =
    useFeatureFlagValue(SEASONAL_LAUNCH_MODAL_VARIANTS);

  useEffect(() => {
    // set local storage for paused and trialing status
    if (!loading) {
      setIsPaused(isPaused);
      setIsTrialing(pureTrial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pureTrial, isPaused]);

  const trackSeasonalLaunchDismissal = useCallback(() => {
    const trackingProps = {
      ai_addOn: hasAiFeatureAccess,
      role: workspace.memberRole,
      persona: workspacePersona?.persona_v1?.use_case_plan || null,
      workspace_type: workspace.type,
    };

    track(SEASONAL_LAUNCH_FTUX_MODAL_DISMISSED, {
      ...trackingProps,
      source: `plan-upgrade-${seasonalLaunchModalVariantsFeatureFlagValue}`,
    });
  }, [
    hasAiFeatureAccess,
    workspace.memberRole,
    workspacePersona?.persona_v1?.use_case_plan,
    workspace.type,
    seasonalLaunchModalVariantsFeatureFlagValue,
  ]);

  if (loading) {
    return null;
  }

  const isNonAdminStarterFree = !admin && starterFree;
  const isInBusinessTrial = pureTrial && business;
  const isNonAdminBusinessTrial = isInBusinessTrial && !admin;
  const nonAdminUpgradeable = shouldMonetize && !admin;

  /**
   * Admin persistent upgrade button should be shown for:
   * - starter free
   * - pure trial (any plan without a payment method)
   * - business plan without AI add-on (as we want them to upgrade to tier 3)
   */
  const showAdminPersistentUpgradeButton =
    admin && (starterFree || pureTrial || (!pureTrial && business && !aiAddOn));

  // Show request to upgrade button for business creators lite & creators, and starter_free non-admin
  const showNonAdminPersistentUpgradeButton =
    isNonAdminStarterFree || isNonAdminBusinessTrial || nonAdminUpgradeable;

  if (showAdminPersistentUpgradeButton) {
    return (
      <PersistentUpgradeButton
        onClick={() => {
          track(HEADER_PERSISTENT_UPGRADE_BUTTON_CLICKED, {
            workspacePlan: workspace?.type,
            source,
          });
          trackSeasonalLaunchDismissal();
        }}
      />
    );
  }

  if (showNonAdminPersistentUpgradeButton) {
    return (
      <NonAdminPersistentUpgradeButton
        source={source}
        onUpgradeClick={trackSeasonalLaunchDismissal}
      />
    );
  }

  return null;
};
