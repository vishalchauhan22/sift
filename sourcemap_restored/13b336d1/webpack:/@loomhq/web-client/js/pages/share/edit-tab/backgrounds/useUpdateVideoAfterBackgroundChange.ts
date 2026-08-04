import { usePlayer, useVideoContext } from '@js/common/video-player';
import { useGetTranscodedVideoUrl } from '@js/common/video/useGetTranscodedVideoUrl';
import { useGetTranscodedVideoUrlStore } from '@js/common/video/useGetTranscodedVideoUrlStore';
import { ProcessingInformation } from '@loomhq/graphql-preload/src/globalTypes.generated';
import { useSkipPrePlayState } from '@js/common/video-player/hooks/useSkipPrePlayState';
import { useVideoEditStore } from '@js/pages/share/common/edit';

export const useUpdateVideoAfterBackgroundChange = (): ((
  updatedProcessingInformation: ProcessingInformation
) => void) => {
  const { setVideo, video } = useVideoContext();
  const { clearUrl } = useGetTranscodedVideoUrlStore();
  const { fetchShareVideoDownloadUrl } = useGetTranscodedVideoUrl();

  const { setHasBeenEdited } = useVideoEditStore();
  const { setSkipPrePlayState, setUpdatedPlayerTime } = useSkipPrePlayState();
  const player = usePlayer(video.id);

  return (updatedProcessingInformation: ProcessingInformation) => {
    // helpful after refreshing the video player
    setHasBeenEdited(true);
    setSkipPrePlayState(true);
    const currentPlayerTime = player?.currentTime || 0;
    const currentPlayerDuration = player?.duration || 0;
    // if the player is at the beginning or end of the video, we set it to the first frame
    // to avoid showing a blank screen or weird end screen state
    if (currentPlayerTime >= currentPlayerDuration || currentPlayerTime === 0) {
      setUpdatedPlayerTime(0.01);
    } else {
      setUpdatedPlayerTime(currentPlayerTime);
    }

    setVideo({
      processingInformation: {
        trimId: updatedProcessingInformation.trim_id,
        trimProgress: updatedProcessingInformation.trim_progress,
        videoUploadValid:
          updatedProcessingInformation.videoUploadValid ?? undefined,
      },
    });
    clearUrl();
    fetchShareVideoDownloadUrl();
  };
};
