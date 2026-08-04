import { useVideoPasswordContext } from '@js/common/video-password';

import { useVideoContext } from '../video-player';

export const useUserCanAccessTranscript = (): boolean => {
  const { video } = useVideoContext();
  const { isProtected, password } = useVideoPasswordContext();

  return Boolean(
    video?.isOwner ||
      ((!isProtected || Boolean(isProtected && password)) &&
        video?.showTranscriptToViewer)
  );
};
