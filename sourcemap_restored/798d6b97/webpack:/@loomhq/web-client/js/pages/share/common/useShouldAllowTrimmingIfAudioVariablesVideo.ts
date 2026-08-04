import { useVideoContext } from '@js/common/video-player';

import { VideoPersonalizationType } from '@js/globalTypes.generated';

export const useShouldAllowTrimmingIfAudioVariablesVideo = (): boolean => {
  const {
    video: { personalizationType, isParentOfPersonalizedCopies },
  } = useVideoContext();

  const isAudioVariablesVideo =
    personalizationType === VideoPersonalizationType.Audio;
  const isAudioVariablesChildVideo =
    isAudioVariablesVideo && !isParentOfPersonalizedCopies;
  const isAudioVariablesParentVideo =
    isAudioVariablesVideo && isParentOfPersonalizedCopies;

  if (isAudioVariablesChildVideo) {
    // If child audio variables video, we allow trimming if in feature flag
    return true;
  }

  if (isAudioVariablesParentVideo) {
    // If parent of audio variables videos, we do not allow trimming
    return false;
  }

  // If not audio variables video, we allow trimming
  return true;
};
