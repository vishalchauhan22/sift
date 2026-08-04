import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

interface UpgradeButtonDecisionParams {
  isAdmin: boolean;
  atlassianPlanUrl: string | null;
  isEnterprise: boolean;
  isBusinessAi: boolean;
  isTrialing: boolean;
  isAutoConverting: boolean;
  source: RequestPlanUpgradeLocations;
}

type UpgradeButtonType =
  | 'admin-upgrade'
  | 'contact-sales'
  | 'request-upgrade'
  | 'none';

export const determineUpgradeButtonType = ({
  isAdmin,
  atlassianPlanUrl,
  isEnterprise,
  isBusinessAi,
  isTrialing,
  isAutoConverting,
}: UpgradeButtonDecisionParams): UpgradeButtonType => {
  // Show contact sales button when:
  // 1. User is on business plan with AI add-on AND is an admin
  // 2. AND either:
  //     2a. They are in an auto-converting trial, OR
  //     2b. They are not in a trial
  const showContactSalesButton =
    isBusinessAi &&
    isAdmin &&
    ((isAutoConverting && isTrialing) || (!isAutoConverting && !isTrialing));

  if (showContactSalesButton) {
    return 'contact-sales';
  }

  // Show admin upgrade button when:
  // 1. User is an admin AND has plan URL AND not on enterprise plan
  // 2. AND either:
  //     2a. They are not on business AI plan, OR
  //     2b. They are in a trial that is not auto-converting
  if (
    isAdmin &&
    atlassianPlanUrl !== null &&
    !isEnterprise &&
    !isBusinessAi &&
    (!isTrialing || (isTrialing && !isAutoConverting))
  ) {
    return 'admin-upgrade';
  }

  // For non-admins, show request upgrade button if not on enterprise or business AI
  if (!isEnterprise && !isBusinessAi) {
    return 'request-upgrade';
  }

  // If none of the above conditions are met, return 'none'
  return 'none';
};
