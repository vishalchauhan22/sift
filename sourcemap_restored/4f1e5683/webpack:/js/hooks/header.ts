import { VIDEO_DOWNLOAD_COMPLETED } from '@js/constants/events';

import { useVideoDownload } from '@js/common/header/video-download/useVideoDownload';
import { useGetVideoTranscodedUrlLazyQuery } from '@js/common/video/GetVideoTranscodedUrl.generated';
import { useGetTranscodedVideoUrlStore } from '@js/common/video/useGetTranscodedVideoUrlStore';
import {
  abortDownload,
  createDownload,
  saveDownload,
} from '@js/utilities/download-progress';

import * as logger from '@js/utilities/loggerx';
import { isPolicyExpired } from '@js/utilities/part-credentials';
import { trackDownloadClick } from '@js/utilities/video-session/mediaAnalyticsEvent';

import { Team } from '@loomhq/shared-utilities/constants/product';

import * as analytics from '@js/utilities/analytics';

const getPolicyFromUrl = (url: string) => {
  if (!url) {
    return null;
  }

  try {
    const urlObj = new URL(url);

    return urlObj.searchParams.get('Policy');
  } catch (e) {
    logger.error(
      e,
      { message: 'Failed to get policy from Url' },
      {
        team: Team.Mint,
      }
    );

    return null;
  }
};

export const downloadVideo = (
  url: string,
  name: string,
  opts: {
    is_owner?: boolean;
    video_id: string;
    video_age?: string;
  }
): void => {
  const { setDownloading, setDownloadingPercentage, resetDownloading } =
    useVideoDownload.getState();
  const onError = () => {
    resetDownloading();
  };

  const onProgress = (progress: number) => {
    setDownloadingPercentage(progress);
  };

  const onCompleted = () => {
    resetDownloading();
    trackDownloadClick(opts.video_id);
    analytics.track(VIDEO_DOWNLOAD_COMPLETED, opts);

    saveDownload();
  };

  createDownload(url, name, { onProgress, onCompleted, onError });
  setDownloading();
};

export type StartDownloadParams = {
  url: string;
  name: string;
  opts: {
    is_owner?: boolean;
    video_id: string;
    video_age?: string;
  };
  password?: string | null;
};

export function useStartDownload(): (params: StartDownloadParams) => void {
  const { isDownloading } = useVideoDownload();
  const [getTranscodedUrl] = useGetVideoTranscodedUrlLazyQuery();
  const { setUrl } = useGetTranscodedVideoUrlStore();

  return (params: StartDownloadParams): void => {
    const { url, name, opts, password } = params;

    if (isDownloading) {
      return;
    }

    const policy = getPolicyFromUrl(url);

    if (policy && isPolicyExpired(policy)) {
      getTranscodedUrl({
        variables: {
          videoId: opts.video_id,
        },
        fetchPolicy: 'network-only',
      })
        .then(response => {
          if (response.error) {
            return Promise.reject(response.error.message);
          }

          const videoData = response.data?.getVideoTranscodedUrl;
          if (!videoData) {
            const errorMessage =
              'Error refreshing credentials for download url: no data found';
            return Promise.reject(errorMessage);
          }

          if (videoData.__typename === 'VideoSource' && videoData.url) {
            setUrl(videoData.url);
            downloadVideo(videoData.url, name, opts);
          } else {
            const errorMessage = `Error refreshing credentials for download url: ${videoData.__typename}`;
            return Promise.reject(errorMessage);
          }
        })
        .catch((promise: string) => {
          logger.warning(promise, {
            video_id: opts.video_id,
          });
          throw new Error(promise);
        });
    } else {
      downloadVideo(url, name, opts);
    }
  };
}

export function useAbortDownload(): () => void {
  const { resetDownloading } = useVideoDownload();

  return () => {
    resetDownloading();
    abortDownload();
  };
}
