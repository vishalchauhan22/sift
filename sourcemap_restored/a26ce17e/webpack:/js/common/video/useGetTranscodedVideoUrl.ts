import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useGetTranscodedVideoUrlStore } from '@js/common/video/useGetTranscodedVideoUrlStore';
import { useCallback } from 'react';
import * as loggerx from '@js/utilities/loggerx';

import { useGetVideoTranscodedUrlLazyQuery } from './GetVideoTranscodedUrl.generated';

export const useGetTranscodedVideoUrl = (): {
  fetchShareVideoDownloadUrl: () => void;
} => {
  const { isProtected: isVideoProtected, password } = useVideoPasswordContext();
  const {
    video: { id: videoId, downloadable, isOwner },
  } = useVideoContext();
  const { setUrl } = useGetTranscodedVideoUrlStore();

  const [getTranscodedUrl] = useGetVideoTranscodedUrlLazyQuery({
    onCompleted: data => {
      if (data?.getVideoTranscodedUrl) {
        if (data.getVideoTranscodedUrl.__typename === 'VideoSource') {
          setUrl(data.getVideoTranscodedUrl.url);
        }
        //EntityNotFound error indicates the trimmed video URL is still processing
        else if (
          data.getVideoTranscodedUrl.__typename !== 'EntityNotFoundError'
        ) {
          loggerx.warning('Failed to get transcoded video url', {
            errorType: data.getVideoTranscodedUrl.__typename,
          });
        }
      }
    },
    onError: error => {
      if (error.networkError) {
        return;
      }
      loggerx.warning('error fetching share video download url', { error });
    },
  });

  const fetchShareVideoDownloadUrl = useCallback(() => {
    if (!downloadable) {
      return;
    }

    if (!isOwner && isVideoProtected && password == null) {
      return;
    }

    getTranscodedUrl({
      variables: {
        videoId,
      },
    });
  }, [
    isOwner,
    downloadable,
    videoId,
    getTranscodedUrl,
    isVideoProtected,
    password,
  ]);

  return {
    fetchShareVideoDownloadUrl,
  };
};
