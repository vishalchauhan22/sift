import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';
import { WORKSPACE_PLAN_STARTER_FREE } from '@loomhq/shared-utilities/constants/workspacePlans';

import { useGetSelectedWorkspace } from '../workspace-basic';

export const useStarterFreeAdmin = (): boolean => {
  const workspace = useGetSelectedWorkspace();

  const isAdmin = workspace?.memberRole === ORG_ROLE_ADMIN;
  const isWorkspaceStarterFree =
    workspace?.type === WORKSPACE_PLAN_STARTER_FREE;

  return isAdmin && isWorkspaceStarterFree;
};
