import { useCurrentUserSelector } from '@js/common/current-user';
import {
  GetGroupsWithPublicContentPermissionsQuery,
  useGetGroupsWithPublicContentPermissionsQuery,
} from '@js/common/share-video/share-modal/GetGroupsWithPublicContentPermissions.generated';

import { WorkspaceSetting } from '@loomhq/shared-utilities/constants/settings';
import { ContentVisibility } from '@loomhq/shared-utilities/constants/visibility';
import { ContentVisibilityProperty } from '@js/globalTypes.generated';
import { useWorkspaceSetting } from '@js/hooks/workspaceSettings';

export function isUserPublicSharingAllowed(
  isWorkspaceAllowed: boolean,
  groups: GetGroupsWithPublicContentPermissionsQuery | undefined,
  userId: number
): boolean {
  if (isWorkspaceAllowed) {
    return true;
  }

  if (
    groups?.getWorkspaceGroupsForWorkspace?.__typename ===
    'getWorkspaceGroupsPayload'
  ) {
    const publicSharingGroups =
      groups.getWorkspaceGroupsForWorkspace.results.map(group =>
        group.members.map(member => member.user_id)
      ) ?? [];

    return publicSharingGroups.flat().includes(String(userId));
  }

  return false;
}

export function useIsPublicSharingAllowed({
  workspaceId,
}: {
  workspaceId: string | null;
}): boolean {
  const { value: contentRestrictionValue } = useWorkspaceSetting(
    WorkspaceSetting.CONTENT_PRIVACY_RESTRICTIONS
  );
  const currentUserId = useCurrentUserSelector(user => user.id, NaN);
  const publicSharingAllowedInWorkspace =
    contentRestrictionValue?.visibility !== ContentVisibility.WORKSPACE;

  const { data: groupsWithPublicContentPermissions } =
    useGetGroupsWithPublicContentPermissionsQuery({
      variables: {
        workspaceId: workspaceId || '',
        withContentPermissions: ContentVisibilityProperty.Public,
      },
      skip: !workspaceId || publicSharingAllowedInWorkspace,
    });

  return isUserPublicSharingAllowed(
    publicSharingAllowedInWorkspace,
    groupsWithPublicContentPermissions,
    currentUserId
  );
}
