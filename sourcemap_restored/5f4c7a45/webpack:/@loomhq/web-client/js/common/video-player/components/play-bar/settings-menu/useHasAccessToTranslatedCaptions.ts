import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useIsMeetingRecording } from '@js/common/meeting-recordings/useIsMeetingRecording';
import { useVideoContext } from '@js/common/video-player/context';
import { useTranscript } from '@js/common/transcripts';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery } from './GetVideoWorkspaceAiSettingForCaptionsLanguage.generated';

export const useHasAccessToTranslatedCaptions = (): boolean => {
  const {
    video: { modelId: videoId },
  } = useVideoContext();

  const { password } = useVideoPasswordContext();

  const inTranslatedCaptionsFlag = useFeatureFlagValue(
    FEATURE_GATES.ROLLOUT_TRANSLATE_CAPTIONS,
    ControlType.STATSIG_FEATURE_GATE
  );

  const { captionsUrl, isCaptionsTranslationInProgress } = useTranscript();

  const isMeetingRecording = useIsMeetingRecording(videoId);

  const { data, loading, error } =
    useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery({
      variables: {
        videoId,
        password,
      },
    });

  const video = data?.getVideo;

  const dataNotRegularUserVideo = video?.__typename !== 'RegularUserVideo';

  if (dataNotRegularUserVideo) {
    return false;
  }

  const dataNotComplete = loading || error || !video || !video.organization;

  if (dataNotComplete) {
    return false;
  }

  const videoWorkspacePlanHasAi = Boolean(video.organization.planIncludesAI);
  const videoWorkspaceAllowsAi = Boolean(video.organization.workspaceAllowsAi);

  // If video's workspace plan does NOT include AI → allow access (return true)
  // If video's workspace plan DOES include AI → only allow if workspace explicitly allows AI
  const workspaceAllowsTranslatedCaptions =
    !videoWorkspacePlanHasAi || videoWorkspaceAllowsAi;

  const hasTranslatedCaptionsAccess = Boolean(
    (isCaptionsTranslationInProgress || captionsUrl) &&
      inTranslatedCaptionsFlag &&
      !isMeetingRecording &&
      workspaceAllowsTranslatedCaptions
  );

  return hasTranslatedCaptionsAccess;
};
