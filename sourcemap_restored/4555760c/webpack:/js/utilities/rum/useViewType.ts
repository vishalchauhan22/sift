import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';

import { ViewType } from './types';

export function useViewType(): ViewType {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const {
    video: { id: videoId },
  } = useVideoContext();
  const isVideoOwner = useCurrentUserIsOwner({ videoId });

  if (isVideoOwner) {
    return ViewType.CREATOR;
  }

  if (!isLoggedIn) {
    return ViewType.ANONYMOUS;
  }

  return ViewType.VIEWER;
}
