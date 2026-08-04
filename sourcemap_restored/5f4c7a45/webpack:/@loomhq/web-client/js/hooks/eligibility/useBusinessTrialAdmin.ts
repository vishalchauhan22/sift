import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';

import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';
import { WORKSPACE_PLAN_BUSINESS } from '@loomhq/shared-utilities/constants/workspacePlans';

import { isPureTrial } from '../../utilities/billingAndPayments/billingDetailsUtil';
import { useGetSelectedWorkspace } from '../workspace-basic';

export function useBusinessTrialAdmin(): boolean {
  const workspace = useGetSelectedWorkspace();
  const { data } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });
  const billingDetails = data?.billing?.billing_details;

  const isWorkspaceBusiness = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const isWorkspaceOnPureTrial = isPureTrial(billingDetails as any);
  const isEligible = isWorkspaceBusiness && isWorkspaceOnPureTrial;
  const isAdmin = workspace?.memberRole === ORG_ROLE_ADMIN;

  return isEligible && isAdmin;
}
