import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';

import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';

import { InviteFlow } from '@js/globalTypes.generated';

export function useStorageIncentiveEligibility(): boolean {
  const { inviteFlow } = useInvitationCapabilities();
  const { selectedWorkspace } = useGetWorkspaceMemberships();

  const plan = selectedWorkspace?.type;
  const role = selectedWorkspace?.memberRole;

  if (!plan || !role) {
    return false;
  }

  // Do not show storage incentives to enterprise or education users
  if (plan === 'enterprise' || plan === 'education') {
    return false;
  }

  // Creator Lites are the only eligible role on business accounts
  if (plan === 'business' && role !== 'creator_lite') {
    return false;
  }

  if (inviteFlow === InviteFlow.Atlassian) {
    return false;
  }
  // Everybody else gets storage incentives
  return true;
}
