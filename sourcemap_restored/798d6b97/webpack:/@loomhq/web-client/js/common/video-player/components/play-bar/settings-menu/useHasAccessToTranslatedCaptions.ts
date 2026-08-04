import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

import { useFlagIsActivated } from '@js/hooks/featureFlag';
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

  const inTranslatedCaptionsFlag = useFlagIsActivated({
    flag: FEATURE_GATES.ROLLOUT_TRANSLATE_CAPTIONS,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  const { captionsUrl, isCaptionsTranslationInProgress } = useTranscript();

  const { isMeetingRecording } = useIsMeetingRecording(videoId);

  const { data, loading, error } =
    useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery({
      variables: {
        videoId,
        password,
      },
    });

  const videoFromQuery = data?.getVideo;

  const dataNotRegularUserVideo =
    videoFromQuery?.__typename !== 'RegularUserVideo';

  if (dataNotRegularUserVideo) {
    return false;
  }

  const dataNotComplete =
    loading || error || !videoFromQuery || !videoFromQuery.organization;

  if (dataNotComplete) {
    return false;
  }

  const videoWorkspacePlanHasAi = Boolean(
    videoFromQuery.organization.planIncludesAI
  );
  const videoWorkspaceAllowsAi = Boolean(
    videoFromQuery.organization.workspaceAllowsAi
  );

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
