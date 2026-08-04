import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';

import { WORKSPACE_PLAN_BUSINESS } from '@loomhq/shared-utilities/constants/workspacePlans';

import { useGetSelectedWorkspace } from '../../hooks/workspace-basic';
import { isPureTrial } from '../../utilities/billingAndPayments/billingDetailsUtil';

export function useOnBusinessTrial(): boolean {
  const workspace = useGetSelectedWorkspace();
  const { data } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  const billingDetails = data?.billing?.billing_details;

  const isWorkspaceBusiness = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const isWorkspaceOnPureTrial = isPureTrial(billingDetails);
  const isEligible = isWorkspaceBusiness && isWorkspaceOnPureTrial;

  return isEligible;
}
