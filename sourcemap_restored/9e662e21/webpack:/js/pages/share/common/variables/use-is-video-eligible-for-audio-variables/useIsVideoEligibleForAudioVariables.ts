import { useTranscriptStatus } from '@js/common/transcripts';
import { useVideoContext } from '@js/common/video-player';

import { useGetAudioVariablesEligibilityForVariablesEntryPointQuery } from './GetAudioVariablesEligibilityForVariablesEntryPoint.generated';
import { selectAudioVariablesEligibilityData } from './selectAudioVariablesEligibilityData';

export const useIsVideoEligibleForAudioVariables = (): {
  hasAccess: boolean;
  reason: string | null;
} => {
  const {
    video: { id: videoId, uploadComplete },
  } = useVideoContext();

  const { transcriptInProgress, transcriptUnsuccessful } =
    useTranscriptStatus();

  const { data } = useGetAudioVariablesEligibilityForVariablesEntryPointQuery({
    variables: {
      videoId,
    },
    skip: !uploadComplete || transcriptUnsuccessful || transcriptInProgress,
    fetchPolicy: 'cache-first',
  });

  const audioVariablesEligibilityData = selectAudioVariablesEligibilityData(
    data,
    Boolean(uploadComplete),
    transcriptInProgress,
    !transcriptUnsuccessful
  );

  return audioVariablesEligibilityData;
};
