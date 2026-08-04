import { ApolloError } from '@apollo/client';

import {
  useDownloadDisabledForVideoQuery,
  DownloadDisabledForVideoQuery,
} from './GetDownloadsDisabledForVideo.generated';
import { useVideoPasswordContext } from '@js/common/video-password';

interface DownloadsDisabledResult {
  areDownloadsDisabled: boolean;
  refetchDownloadDisabledForVideo: () => Promise<boolean>;
}

/**
 * Hook to check if downloads are disabled for a video
 * It retrieves the download disabled workspace setting for the video's organization
 * @param videoId - The ID of the video to check
 * @returns An object containing:
 *  - areDownloadsDisabled: boolean indicating if downloads are disabled
 */
export const useDownloadDisabledForVideo = (
  videoId?: string
): DownloadsDisabledResult => {
  const { password } = useVideoPasswordContext();

  const {
    data: downloadDisabledForVideo,
    error: downloadDisabledForVideoError,
    refetch,
  } = useDownloadDisabledForVideoQuery({
    variables: { videoId: videoId ?? '', password },
    skip: !videoId,
  });

  const areDownloadsDisabled = areDownloadsDisabledForVideo(
    downloadDisabledForVideoError,
    downloadDisabledForVideo
  );

  const refetchDownloadDisabledForVideo = async () => {
    const {
      data: downloadDisabledForVideoRefetchData,
      error: downloadDisabledForVideoRefetchError,
    } = await refetch();

    const result = areDownloadsDisabledForVideo(
      downloadDisabledForVideoRefetchError,
      downloadDisabledForVideoRefetchData
    );

    return result;
  };

  return {
    areDownloadsDisabled,
    refetchDownloadDisabledForVideo,
  };
};

const areDownloadsDisabledForVideo = (
  downloadDisabledForVideoError: ApolloError | undefined,
  downloadDisabledForVideo: DownloadDisabledForVideoQuery | undefined
): boolean => {
  const areDownloadsDisabled =
    !downloadDisabledForVideoError &&
    downloadDisabledForVideo?.getVideo?.__typename === 'RegularUserVideo' &&
    downloadDisabledForVideo.getVideo.downloadDisabledForWorkspace === true;
  return areDownloadsDisabled;
};
