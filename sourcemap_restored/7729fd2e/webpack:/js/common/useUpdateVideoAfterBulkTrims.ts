import { TrimRange, useVideoContext } from '@js/common/video-player';
import { useGetTranscodedVideoUrl } from '@js/common/video/useGetTranscodedVideoUrl';
import { useGetTranscodedVideoUrlStore } from '@js/common/video/useGetTranscodedVideoUrlStore';
import { useDispatch } from 'react-redux';

import { resetTranscription as legacyResetTranscription } from '@js/reducers/transcription';

import { ProcessingInformation } from '@js/globalTypes.generated';
import { useTranscriptStore } from '@js/common/transcripts/useTranscriptStore';
import { useVideoEditStore } from '@js/pages/share/common/edit';

type UpdatedVideoFields = {
  playable_duration: number | null;
  processing_information: ProcessingInformation;
};

export const useUpdateVideoAfterBulkTrims = (): ((
  updatedVideoFields: UpdatedVideoFields
) => void) => {
  const dispatch = useDispatch();
  const { setVideo, setVideoProperties } = useVideoContext();
  const { fetchShareVideoDownloadUrl } = useGetTranscodedVideoUrl();
  const { clearUrl } = useGetTranscodedVideoUrlStore();
  const { resetTranscription } = useTranscriptStore();
  const { setHasBeenEdited } = useVideoEditStore();

  return (updatedVideo: UpdatedVideoFields): void => {
    setHasBeenEdited(true);

    setVideo({
      processingInformation: {
        trimId: updatedVideo.processing_information.trim_id,
        trimProgress: updatedVideo.processing_information.trim_progress,
        trimRanges: updatedVideo.processing_information
          .trim_ranges as TrimRange[],
        videoUploadValid: Boolean(
          updatedVideo.processing_information.videoUploadValid
        ),
      },
    });

    setVideoProperties({
      playableDuration: updatedVideo.playable_duration,
    });

    clearUrl();
    fetchShareVideoDownloadUrl();
    dispatch(legacyResetTranscription());
    resetTranscription();
  };
};
