import { useCurrentUserSelector } from '@js/common/current-user';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useMemo } from 'react';

import {
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR_LITE,
  ORG_ROLE_GUEST,
  WorkspaceRole,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import { CREATE_SPACE } from '@loomhq/shared-utilities/constants/scopes';
import {
  WORKSPACE_PLAN_STARTER_FREE,
  WorkspacePlan,
} from '@loomhq/shared-utilities/constants/workspacePlans';

import { useGetTotalActiveSpacesQuery } from './GetTotalActiveSpaces.generated';
import { useGetSelectedWorkspace } from './workspace-basic';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';

export * from './workspace-basic';

export const useGetUserRoleForSelectedWorkspace = (): string | undefined => {
  const { selectedWorkspace } = useGetWorkspaceMemberships();

  return selectedWorkspace?.memberRole;
};

export const useCheckIfSdkSharedUser = (): boolean => {
  const selectedWorkspace = useGetSelectedWorkspace() as any;

  return selectedWorkspace?.memberRole === ORG_ROLE_GUEST;
};

export const useGetDefaultWorkspace = (): any => {
  const { data: workspaces } = useGetWorkspaceMemberships();
  const defaultWorkspaceId =
    useCurrentUserSelector(user => user.defaultWorkspaceId, null) ?? '';

  const defaultWorkspace = useMemo(() => {
    return workspaces?.find(
      workspace => workspace.id === defaultWorkspaceId.toString()
    );
  }, [workspaces, defaultWorkspaceId]);

  return defaultWorkspace || {};
};

export const useGetWorkspaceMemberRoles = (): any[] => {
  const selectedWorkspace = useGetSelectedWorkspace() as any;

  if (!selectedWorkspace?.id) {
    return [];
  }

  return selectedWorkspace.memberRoles;
};

export const useGetRolesForMemberInvitations = (): any[] => {
  const memberRoles = useGetWorkspaceMemberRoles();

  return memberRoles.filter(role => role.inviteable).sort();
};

export const useGetMemberVideoLimits = (): {
  approachingLimit?: boolean;
  nearLimit?: boolean;
  exceededLimit?: boolean;
  limit?: number;
  remainingVideos?: number;
  totalVideos?: number;
} => {
  const selectedWorkspace = useGetSelectedWorkspace() as any;

  const limit = Number(selectedWorkspace?.memberLimits?.TOTAL_VIDEOS) || 0;

  if (limit <= 0) {
    return {};
  }

  const totalVideos =
    Number(selectedWorkspace?.counts?.videos?.total_member_created_videos) || 0;
  const remainingVideos = limit - totalVideos;
  const exceededLimit = remainingVideos <= 0;
  const nearLimit = remainingVideos === 1;
  const approachingLimit = remainingVideos <= 5;

  return {
    approachingLimit,
    nearLimit,
    exceededLimit,
    limit,
    remainingVideos,
    totalVideos,
  };
};

export const useGetCreatorLiteMemberLimits = (): {
  showBanner: boolean;
  creatorLiteMemberLimit: number;
} => {
  const currentUserRole = useCurrentUserSelector(user => user.role, '');
  const selectedWorkspace = useGetSelectedWorkspace() as any;
  const availableRoles = useGetWorkspaceMemberRoles();

  const creatorLiteMemberLimit =
    selectedWorkspace?.limits?.CREATOR_LITE_MEMBER_LIMIT || 0;

  let totalCreatorLites =
    selectedWorkspace?.counts?.users?.total_active_creator_lites || 0;

  // Admins count towards limit in starter free workspaces
  if (selectedWorkspace?.type === WORKSPACE_PLAN_STARTER_FREE) {
    totalCreatorLites +=
      selectedWorkspace?.counts?.users?.total_active_admins || 0;
  }

  const showBanner =
    selectedWorkspace?.type === WORKSPACE_PLAN_STARTER_FREE &&
    currentUserRole === ORG_ROLE_ADMIN &&
    availableRoles.some(r => r.value === ORG_ROLE_CREATOR_LITE) &&
    creatorLiteMemberLimit > 0 &&
    totalCreatorLites >= creatorLiteMemberLimit;

  return { showBanner, creatorLiteMemberLimit };
};

export const useGetSpaceLimits = (): {
  showCreateSpacePaywall: boolean;
  showBrowseSpaces: boolean;
  totalActiveSpaces: number;
  userRole: WorkspaceRole;
  workspacePlan: WorkspacePlan;
} => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const hasCreateScope = useHasScope(CREATE_SPACE);

  // use this to check on the space count instead of looking at state
  // because the state is not updated immediately after creating a space
  const { data } = useGetTotalActiveSpacesQuery({ fetchPolicy: 'no-cache' });

  const totalActiveSpaces =
    data?.userWorkspaceMemberships?.[0]?.organization?.counts?.spaces
      ?.total_active_spaces || 0;

  const userRole = useCurrentUserSelector(
    user => user.role,
    null
  ) as WorkspaceRole;
  const workspacePlan = selectedWorkspace?.type;

  const showBrowseSpaces = totalActiveSpaces > 1 || hasCreateScope;

  const showCreateSpacePaywall = !hasCreateScope;

  return {
    showBrowseSpaces,
    showCreateSpacePaywall,
    totalActiveSpaces,
    userRole,
    workspacePlan,
  };
};

export const useGetRoleAndPlan = (): {
  userRole: 'admin' | 'viewer' | 'creator' | 'creator_lite';
  workspacePlan: 'starter_free' | 'business' | 'enterprise' | 'education';
} => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const userRole = selectedWorkspace?.memberRole;
  const workspacePlan = selectedWorkspace?.type;

  return {
    userRole,
    workspacePlan,
  };
};
export const useUserInSameWorkspaceAsItem = (
  organizationId?: string | null
): boolean => {
  const selectedWorkspace = useGetSelectedWorkspace();

  if (organizationId) {
    return selectedWorkspace?.id == organizationId;
  }

  return false;
};
