import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import {
  PURCHASE_AI_MODAL,
  RESUME_PAUSED_SUBSCRIPTION_MODAL,
} from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { navigateToCheckout } from '@js/utilities/billing/checkout';
import { isPureTrial } from '@js/utilities/billingAndPayments/billingDetailsUtil';

import { getProductGrants } from '@loomhq/billing-core/utility';
import { WORKSPACE_PLAN_BUSINESS } from '@loomhq/shared-utilities/constants/workspacePlans';
import { Addon } from '@js/globalTypes.generated';

import { useGetSelectedWorkspace } from '../hooks/workspace-basic';

type UpgradeAction =
  | 'resume-paused-subscription'
  | 'navigate-to-checkout'
  | 'upgrade-active-subscription';

interface Props {
  children: (args: { showModal: () => void }) => JSX.Element | null;
}

export const StarterUpgradeModalButton = ({
  children,
}: Props): JSX.Element | null => {
  const { openModal } = useModals();
  const workspace = useGetSelectedWorkspace();
  const { data, loading } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });

  if (loading) {
    return null;
  }

  const billing = data?.billing?.billing_details;
  const paused = Boolean(billing?.paused);
  const business = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const aiAddOn = Boolean(
    billing?.add_ons.some(
      a => getProductGrants(a.price.product).addon === Addon.Ai
    )
  );

  const showPurchaseAiModal = Boolean(
    business && !aiAddOn && !isPureTrial(billing)
  );

  let action: UpgradeAction;

  if (paused) {
    action = 'resume-paused-subscription';
  } else if (showPurchaseAiModal) {
    action = 'upgrade-active-subscription';
  } else {
    action = 'navigate-to-checkout';
  }

  const showModal = () => {
    switch (action) {
      case 'resume-paused-subscription':
        openModal({ modalType: RESUME_PAUSED_SUBSCRIPTION_MODAL });
        break;
      case 'navigate-to-checkout':
        navigateToCheckout();
        break;
      case 'upgrade-active-subscription':
        openModal({
          modalType: PURCHASE_AI_MODAL,
          options: {
            source: 'StarterUpgradeModalButton',
          },
        });
        break;
      default:
        break;
    }
  };

  return children({ showModal });
};
