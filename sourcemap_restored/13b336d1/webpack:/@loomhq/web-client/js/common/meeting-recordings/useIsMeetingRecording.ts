import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';

import { useGetVideoRecordingClientQuery } from './GetVideoRecordingClient.generated';
import { ApolloError } from '@apollo/client';

type UseIsMeetingRecordingReturnType = {
  isMeetingRecording: boolean | null;
  isLoading: boolean;
  error?: ApolloError | Error;
};

export const useIsMeetingRecording: (
  videoId: string
) => UseIsMeetingRecordingReturnType = videoId => {
  const { password } = useVideoPasswordContext();
  const { data, loading, error } = useGetVideoRecordingClientQuery({
    variables: { videoId, password },
  });

  // If still loading, return loading state
  if (loading) {
    return {
      isMeetingRecording: null,
      isLoading: true,
      error: undefined,
    };
  }

  if (data?.getVideo?.__typename === 'RegularUserVideo') {
    return {
      isMeetingRecording:
        data.getVideo.video_properties.recordingClient === 'meeting_bot',
      isLoading: false,
    };
  }

  // Handle any backend errors etc, anything that produces a response which is not a well formed video
  return {
    isMeetingRecording: null,
    isLoading: false,
    error: error || new Error('Error fetching meeting recording client'),
  };
};
