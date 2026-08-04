import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';

export const useIsUserMemberOfVideoWorkspace = (): boolean => {
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const {
    video: { organizationId },
  } = useVideoContext();

  const selectedWorkspace = useGetSelectedWorkspace();

  if (!isLoggedIn || !selectedWorkspace?.id) {
    return false;
  }

  return selectedWorkspace.id === organizationId;
};
