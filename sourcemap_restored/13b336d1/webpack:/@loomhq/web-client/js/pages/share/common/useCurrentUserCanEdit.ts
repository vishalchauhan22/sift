import { useVideoContext } from '@js/common/video-player';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

export const useCurrentUserCanEdit = (): boolean => {
  const {
    video: { currentUserCanEdit },
  } = useVideoContext();

  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  return Boolean(currentUserCanEdit && onLargeTabletOrDesktop);
};
