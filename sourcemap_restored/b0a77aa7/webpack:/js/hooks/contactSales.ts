import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import {
  useGetRoleAndPlan,
  useGetSelectedWorkspace,
} from '@js/hooks/workspace';
import { useOnboardingStore } from '@js/hooks/onboarding/useOnboardingStore';

import { summarizeSchedule } from '@js/utilities/billing/schedule';

import { getProductGrants } from '@loomhq/billing-core/utility';
import {
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import {
  WORKSPACE_ADD_ON_PLAN_AI,
  WORKSPACE_PLAN_BUSINESS,
} from '@loomhq/shared-utilities/constants/workspacePlans';

export const useShouldSeeNavHeaderContactSalesCta = (): [
  boolean,
  {
    loading: boolean;
    called: boolean;
  },
] => {
  const { useCasePlan } = useOnboardingStore();

  const { userRole, workspacePlan } = useGetRoleAndPlan();
  const selectedWorkspace = useGetSelectedWorkspace();
  const { data, loading, called } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: selectedWorkspace?.id,
    },
    skip: !selectedWorkspace?.id,
  });

  const pureTrial = Boolean(data?.billing?.billing_details?.plan?.pure_trial);
  const business = workspacePlan === WORKSPACE_PLAN_BUSINESS;

  const testClock = data?.billing?.billing_details?.customer?.test_clock;
  const frozenTime = testClock?.frozen_time
    ? new Date(testClock.frozen_time * 1000)
    : null;

  const schedule: any = data?.billing?.billing_details?.plan?.schedule;

  const scheduleSummary = schedule
    ? summarizeSchedule({
        schedule,
        unixDate: frozenTime ? frozenTime.getTime() / 1000 : Date.now() / 1000,
      })
    : null;

  const hasAi = Boolean(
    data?.billing?.billing_details?.add_ons.some(
      a => getProductGrants(a.price.product).addon === WORKSPACE_ADD_ON_PLAN_AI
    ) ||
      scheduleSummary?.nextPhase?.grants?.some(
        a => a.addon === WORKSPACE_ADD_ON_PLAN_AI
      )
  );

  const validRole = [ORG_ROLE_ADMIN, ORG_ROLE_CREATOR].includes(userRole);

  /**
   * @description Once we rollout Fall Launch, we'll be officially in a Tiered
   * pricing model. Enterprise is the top tier and Business + AI is below it.
   */
  const display = Boolean(
    validRole && business && hasAi && !pureTrial && useCasePlan
  );

  return [
    display,
    {
      loading,
      called,
    },
  ];
};
