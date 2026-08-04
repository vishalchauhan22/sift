import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';

import { useGetVideoRecordingClientQuery } from './GetVideoRecordingClient.generated';

export const useIsMeetingRecording: (videoId: string) => boolean = videoId => {
  const { password } = useVideoPasswordContext();
  const { data } = useGetVideoRecordingClientQuery({
    variables: { videoId, password },
  });

  // Handle any backend errors etc, anything that produces a response which is not a well formed video
  if (data?.getVideo?.__typename !== 'RegularUserVideo') {
    return false;
  }

  return data.getVideo.video_properties.recordingClient === 'meeting_bot';
};
