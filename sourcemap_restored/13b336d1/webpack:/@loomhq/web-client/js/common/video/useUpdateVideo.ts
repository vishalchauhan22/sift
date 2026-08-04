import { waitingForTrim } from '@js/utilities/trimming';

import { useUpdateVideoPlayerSourceHook } from './useUpdateVideoPlayerSourceHook';

/*
@deprecated - Please refrain from using this hook,
it's going to get removed once we move away from redux
if you have questions reach out to the Core Platform team
*/
export const useUpdateVideo = (): {
  updateVideo: (video: any) => void;
} => {
  const { updateVideoPlayerSourceHook } = useUpdateVideoPlayerSourceHook();

  const updateVideo = video => {
    const {
      complete,
      needs_password: needsPassword,
      viewerNeedsPermission,
    } = video;

    // Handle parsed and non-parsed video objects
    const videoId = video.videoId ?? video.id;

    if (video.white_label_player) {
      video.comments_enabled = false;
      video.use_emojis = false;
    }

    if (viewerNeedsPermission || needsPassword || complete === false) {
      return;
    }

    // we are waiting on a trim to finish processing - poll for the video source
    // after
    if (waitingForTrim(video)) {
      return;
    }

    updateVideoPlayerSourceHook({ videoId });
  };

  return {
    updateVideo,
  };
};
