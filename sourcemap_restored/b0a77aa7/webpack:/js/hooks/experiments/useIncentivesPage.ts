import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';

import { WORKSPACE_PLAN_STARTER_FREE } from '@loomhq/shared-utilities/constants/workspacePlans';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';

export const useIncentivesPage = (): boolean => {
  const { selectedWorkspace: workspace } = useGetWorkspaceMemberships();
  const userIsLoggedIn = useIsCurrentUserLoggedIn();
  const isAtlassianManagedWorkspace = useIsAtlassianManagedWorkspace();
  const isStarterFree = workspace?.type === WORKSPACE_PLAN_STARTER_FREE;

  if (isAtlassianManagedWorkspace) {
    return false;
  }

  return userIsLoggedIn && isStarterFree;
};
