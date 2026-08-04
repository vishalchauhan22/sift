import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';

export const useRoleLimit = (limitName: string): any => {
  const { selectedWorkspace } = useGetWorkspaceMemberships();

  const allRoleLimits = selectedWorkspace?.memberLimits;

  return limitName ? allRoleLimits?.[limitName] : allRoleLimits;
};
