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

  const [getTranscodedUrl, { data, stopPolling }] =
    useGetVideoTranscodedUrlLazyQuery({
      onError: error => {
        if (error.networkError) {
          return;
        }
        stopPolling();
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
      pollInterval: 1000,
    });

    const timeoutId = setTimeout(() => {
      stopPolling();
      loggerx.warning('Timeout reached for polling for download URL', {
        videoId,
      });
    }, 30000);

    if (data && data.getVideoTranscodedUrl) {
      if (data.getVideoTranscodedUrl.__typename === 'VideoSource') {
        setUrl(data.getVideoTranscodedUrl.url);
        stopPolling();
      }
      //EntityNotFound error indicates the trimmed video URL is still processing
      else if (
        data.getVideoTranscodedUrl.__typename !== 'EntityNotFoundError'
      ) {
        loggerx.warning('Failed to get transcoded video url', {
          errorType: data.getVideoTranscodedUrl.__typename,
        });
        stopPolling();
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    isOwner,
    downloadable,
    videoId,
    getTranscodedUrl,
    data,
    stopPolling,
    setUrl,
    isVideoProtected,
    password,
  ]);

  return {
    fetchShareVideoDownloadUrl,
  };
};
