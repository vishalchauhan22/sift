import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';

export const useWorkspaceLimit = (limitName?: string): any => {
  const { selectedWorkspace } = useGetWorkspaceMemberships();

  const allWorkspaceLimits = selectedWorkspace?.limits;

  return limitName ? allWorkspaceLimits?.[limitName] : allWorkspaceLimits;
};
