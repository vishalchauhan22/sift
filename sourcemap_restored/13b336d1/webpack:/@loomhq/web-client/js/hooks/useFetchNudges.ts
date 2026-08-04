import { ApolloError } from '@apollo/client';

import { useVideoContext } from '@js/common/video-player';

import { useFetchVideoNudgesQuery } from '@js/utilities/FetchVideoNudges.generated';

import { NudgeType, VideoNudge } from '@js/globalTypes.generated';

export function useFetchNudges({
  skip,
  nudgeType = NudgeType.Affirmation,
}: {
  skip?: boolean | undefined;
  nudgeType?: NudgeType;
} = {}): {
  nudges?: Array<VideoNudge>;
  loading: boolean;
  error?: ApolloError;
} {
  const { video } = useVideoContext();

  const { data, loading, error } = useFetchVideoNudgesQuery({
    variables: { id: video.modelId, nudgeType },
    skip,
  });

  const nudgesPayload = data?.fetchVideoNudges;

  const nudges =
    nudgesPayload?.__typename === 'NudgesPayload' && nudgesPayload.nudges
      ? nudgesPayload.nudges
      : undefined;

  return {
    loading,
    error,
    nudges,
  };
}
