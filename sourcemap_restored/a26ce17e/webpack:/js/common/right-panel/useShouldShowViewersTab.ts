import { useVideoId } from '@js/common/video-player';

import { useAnonCreatorMode } from '@js/hooks/useAnonCreatorMode';
import { useUserInSameWorkspaceAsItem } from '@js/hooks/workspace';

import { useGetVideoViewerPermissionsQuery } from './GetVideoViewerPermissions.generated';

export const useShouldShowViewsTab = (): boolean => {
  const videoId = useVideoId();
  const { data, loading, error } = useGetVideoViewerPermissionsQuery({
    variables: { videoId },
  });

  const {
    organization = { id: null },
    show_analytics_to_viewer = false,
    currentUserCanEdit = false,
  } = data?.getVideo?.__typename === 'RegularUserVideo' ? data.getVideo : {};

  const organizationId = organization.id;
  const shouldShowInsightsToViewer = show_analytics_to_viewer;

  const viewerInMatchingWorkspace =
    useUserInSameWorkspaceAsItem(organizationId);
  const anonCreatorMode = useAnonCreatorMode(videoId);
  const shouldShowViewersTab = viewerInMatchingWorkspace || anonCreatorMode;

  if (loading || error) {
    return false;
  }

  return (
    shouldShowViewersTab && (currentUserCanEdit || shouldShowInsightsToViewer)
  );
};
