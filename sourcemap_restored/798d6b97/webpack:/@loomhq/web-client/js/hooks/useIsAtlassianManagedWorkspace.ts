import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';

import { isAtlassianManagedWorkspace } from '@js/utilities/workspace';

export const useIsAtlassianManagedWorkspace = (): boolean => {
  const { selectedWorkspace } = useGetWorkspaceMemberships();

  return isAtlassianManagedWorkspace(selectedWorkspace ?? null);
};
