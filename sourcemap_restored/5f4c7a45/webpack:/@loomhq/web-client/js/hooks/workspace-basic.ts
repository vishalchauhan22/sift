import { ALL_WORKSPACE_PLANS } from '@loomhq/shared-utilities/constants/workspacePlans';

import type { WorkspaceRole } from '@loomhq/shared-utilities/constants/organizationRoles';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';

export const useGetSelectedWorkspaceWithFetchingStatus = (): {
  selectedWorkspace: any;
  isFetching: boolean;
} => {
  const { selectedWorkspace = {}, loading: isFetching } =
    useGetWorkspaceMemberships();

  return { selectedWorkspace, isFetching };
};

export type SelectedWorkspaceType = {
  id: number;
  site_id: string;
  type: (typeof ALL_WORKSPACE_PLANS)[number];
  name: string;
  memberRole: string;
  totalActiveCreators: number;
  workspaceId?: number;
  organization_properties: {
    salesSupportType: string;
  };
  counts: {
    videos: {
      total_shared_active_videos: number;
    };
  };
};

/**
 * useGetSelectedWorkspace is a backwards-compatible way to get the selected workspace without fetching status–many parts of the codebase use Object.keys(selectedWorkspace) to inspect whether the workspace exists or not
 */
export const useGetSelectedWorkspace = (): any => {
  const selectedWorkspaceWithStatus =
    useGetSelectedWorkspaceWithFetchingStatus();

  return selectedWorkspaceWithStatus.selectedWorkspace;
};

/**
 * @todo we don't have a mapped type for the workspace object yet, so we're using any
 * @param property
 * @returns
 */
export function useWorkspaceProperty<Value = any>(property: string): Value {
  const workspace = useGetSelectedWorkspace();

  return workspace?.['organization_properties']?.[property];
}

export function useWorkspaceFreeRole(): WorkspaceRole {
  const workspace = useGetSelectedWorkspace();
  const roles = workspace?.memberRoles ?? [];

  /**
   * A free role can be either creator_lite or viewer,
   * depending on their workspace member architecture.
   */
  const freeRole: WorkspaceRole =
    roles.find(r => r.is_free)?.value ?? 'creator_lite';

  return freeRole;
}
