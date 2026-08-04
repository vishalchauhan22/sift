// The redux syncing this component provides will be unnecessary once we move away from fetchShareVideoDownloadUrlCreator

import { useVideoContext } from '@js/common/video-player';
import React from 'react';
import { useGetTranscodedVideoUrl } from '@js/common/video/useGetTranscodedVideoUrl';

export const VideoModelSync = (): null => {
  const {
    video: { complete: isVideoComplete },
  } = useVideoContext();
  const { fetchShareVideoDownloadUrl } = useGetTranscodedVideoUrl();

  // todo: move somewhere else
  React.useEffect(() => {
    if (!isVideoComplete) {
      return;
    }

    fetchShareVideoDownloadUrl();
  }, [isVideoComplete, fetchShareVideoDownloadUrl]);

  return null;
};
