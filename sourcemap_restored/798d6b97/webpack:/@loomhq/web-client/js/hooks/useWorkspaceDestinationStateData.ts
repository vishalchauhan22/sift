import { useMemo } from 'react';

import { workspaceDestinationStateUtils } from '@loomhq/shared-utilities';
import { MemberPropertyEnum } from '@loomhq/shared-utilities/constants/memberProperties';
import {
  useMemberProperty,
  useUpdateMemberProperty,
} from '@js/hooks/memberProperties';

import { useWorkspaceCounts } from './useCounts';

const { getWorkspaceDestinationState, WorkspaceDestinationState } =
  workspaceDestinationStateUtils;

export function useWorkspaceDestinationStateData(): {
  total_workspace_visible_videos: number;
  total_workspace_members: number;
  workspace_state: workspaceDestinationStateUtils.WorkspaceDestinationState;
} | null {
  const videoCounts = useWorkspaceCounts('videos');
  const userCounts = useWorkspaceCounts('users');
  const { updateMemberProperty: updateHomeStateDensity } =
    useUpdateMemberProperty(MemberPropertyEnum.HOME_STATE_DENSITY);
  const { value: memberHomeStateDensity } = useMemberProperty(
    MemberPropertyEnum.HOME_STATE_DENSITY
  );

  return useMemo(() => {
    if (!videoCounts || !userCounts) {
      return null;
    }

    const totalWorkspaceVisibleVideos =
      videoCounts?.total_published_videos ?? 0;
    const totalWorkspaceMembers = userCounts?.total_workspace_users ?? 1;

    const workspaceDestinationState = getWorkspaceDestinationState({
      publishedVideoCounts: totalWorkspaceVisibleVideos,
      totalUsers: totalWorkspaceMembers,
    });

    // If the workspace is in an empty state, use the home state density stored in the member property,
    // which will default to empty state, unless they've seen a non-empty state in the past, in which case
    // we never want to show the empty state again going forward.
    if (workspaceDestinationState === WorkspaceDestinationState.EMPTY) {
      return {
        total_workspace_visible_videos: totalWorkspaceVisibleVideos,
        total_workspace_members: totalWorkspaceMembers,
        workspace_state: memberHomeStateDensity,
      };
    }

    if (workspaceDestinationState !== memberHomeStateDensity) {
      updateHomeStateDensity(workspaceDestinationState);
    }

    return {
      total_workspace_visible_videos: totalWorkspaceVisibleVideos,
      total_workspace_members: totalWorkspaceMembers,
      workspace_state: workspaceDestinationState,
    };
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoCounts, userCounts, memberHomeStateDensity]);
}
