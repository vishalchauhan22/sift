import { useIsMeetingRecording } from '@js/common/meeting-recordings/useIsMeetingRecording';
import { useVideoContext } from '@js/common/video-player';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';

import { AI_FILLER_WORD_PLUS_REMOVAL } from '@loomhq/shared-utilities/constants/scopes';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

const MAX_VIDEO_DURATION_FOR_FILLER_WORDS_PLUS = 20 * 60; // 20 minutes in seconds

export const useHasAccessToRemoveFillerWordsPlus = ({
  videoId,
}: {
  videoId: string;
}): boolean => {
  const hasFillerWordPlusRemovalScope = useHasAIFeatureAccess(
    AI_FILLER_WORD_PLUS_REMOVAL
  );

  const inFillerWordsPlusFlag = useFeatureFlagValue(
    FEATURE_GATES.TESTING_AUTO_SHORTEN_VIDEOS,
    ControlType.STATSIG_FEATURE_GATE
  );

  const isMeetingRecording = useIsMeetingRecording(videoId);

  const { video } = useVideoContext();

  // Use sourceDuration or playableDuration, whichever is available (not null or undefined)
  // If neither is available, default to MAX_VIDEO_DURATION_FOR_FILLER_WORDS_PLUS and don't process FW+
  const videoDuration =
    video?.videoProperties?.sourceDuration ??
    video?.videoProperties?.playableDuration ??
    MAX_VIDEO_DURATION_FOR_FILLER_WORDS_PLUS;

  const hasFillerWordsPlusAvailable = Boolean(
    hasFillerWordPlusRemovalScope &&
      inFillerWordsPlusFlag &&
      !isMeetingRecording &&
      videoDuration < MAX_VIDEO_DURATION_FOR_FILLER_WORDS_PLUS
  );

  return hasFillerWordsPlusAvailable;
};
