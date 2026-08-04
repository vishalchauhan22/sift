import { useVideoPasswordContext } from '@js/common/video-password';
import {
  ConsolidatedEditTextReplacementFragment,
  useConsolidatedEditGetVideoTextReplacementsQuery,
} from './ConsolidatedEditGetVideoTextReplacements.generated';
import { useMemo } from 'react';
import { ApolloError } from '@apollo/client';
import { useConsolidatedEditVideoTextReplacementsUpdatedSubscription } from './ConsolidatedEditVideoTextReplacementsUpdated.generated';
import { AudioGenerationStatus } from '@js/globalTypes.generated';

// The list of audio generation statuses that will still be playable in the
// preview player (i.e when the count of these change, the preview player should be refreshed)
const PLAYABLE_AUDIO_GENERATION_STATUSES: Set<AudioGenerationStatus> = new Set([
  AudioGenerationStatus.Completed,
  AudioGenerationStatus.PendingDeletion,
  AudioGenerationStatus.Deleting,
]);

const GENERATING_AUDIO_GENERATION_STATUSES: Set<AudioGenerationStatus> =
  new Set([
    AudioGenerationStatus.PendingCreation,
    AudioGenerationStatus.Creating,
    AudioGenerationStatus.Regenerating,
  ]);

const REVERTING_AUDIO_GENERATION_STATUSES: Set<AudioGenerationStatus> = new Set(
  [AudioGenerationStatus.PendingDeletion, AudioGenerationStatus.Deleting]
);

type UseVideoTextReplacementsArgs = {
  videoId: string;
  onError?: (errorMessage: string) => void;
  onPlayableContentChange?: () => void;
};

type UseVideoTextReplacementsResult = {
  videoTextReplacements: ConsolidatedEditTextReplacementFragment[];
  areTextReplacementsLoading: boolean;
  isAudioGenerationInProgress: boolean;
  isAudioRevertingInProgress: boolean;
  textReplacementsError?: ApolloError;
};

const hasPlayableContentChanged = ({
  oldVideoTextReplacements,
  newVideoTextReplacements,
}: {
  oldVideoTextReplacements: ConsolidatedEditTextReplacementFragment[];
  newVideoTextReplacements: ConsolidatedEditTextReplacementFragment[];
}): boolean => {
  // Create sets of playable replacement IDs for efficient comparison
  const oldPlayableIds = new Set(
    oldVideoTextReplacements
      .filter(replacement =>
        PLAYABLE_AUDIO_GENERATION_STATUSES.has(
          replacement.audioGenerationStatus
        )
      )
      .map(replacement => replacement.id)
  );

  const newPlayableIds = new Set(
    newVideoTextReplacements
      .filter(replacement =>
        PLAYABLE_AUDIO_GENERATION_STATUSES.has(
          replacement.audioGenerationStatus
        )
      )
      .map(replacement => replacement.id)
  );

  // Check if the sets are different (handles additions, removals, and status changes)
  if (oldPlayableIds.size !== newPlayableIds.size) {
    return true;
  }

  // Check if any IDs are different
  for (const id of oldPlayableIds) {
    if (!newPlayableIds.has(id)) {
      return true;
    }
  }

  return false;
};

export const useVideoTextReplacements = ({
  videoId,
  onPlayableContentChange,
  onError,
}: UseVideoTextReplacementsArgs): UseVideoTextReplacementsResult => {
  const { password } = useVideoPasswordContext();
  const {
    data: videoTextReplacementsData,
    loading: areTextReplacementsLoading,
  } = useConsolidatedEditGetVideoTextReplacementsQuery({
    variables: { videoId, password },
    onCompleted: data => {
      if (data.getVideo?.__typename === 'RegularUserVideo' || !onError) {
        return;
      }
      onError('Error getting audio replacements');
    },
    onError: () => {
      if (!onError) {
        return;
      }
      onError('Error getting audio replacements');
    },
  });

  const videoTextReplacements = useMemo(() => {
    if (
      videoTextReplacementsData?.getVideo?.__typename !== 'RegularUserVideo'
    ) {
      return [];
    }
    return videoTextReplacementsData.getVideo.textReplacements;
  }, [videoTextReplacementsData]);

  const isAudioGenerationInProgress = useMemo(() => {
    return videoTextReplacements.some(textReplacement =>
      GENERATING_AUDIO_GENERATION_STATUSES.has(
        textReplacement.audioGenerationStatus
      )
    );
  }, [videoTextReplacements]);

  const isAudioRevertingInProgress = useMemo(() => {
    return videoTextReplacements.some(textReplacement =>
      REVERTING_AUDIO_GENERATION_STATUSES.has(
        textReplacement.audioGenerationStatus
      )
    );
  }, [videoTextReplacements]);

  // Emit events when the text replacements change in such a way that the preview player
  // should be refreshed
  useConsolidatedEditVideoTextReplacementsUpdatedSubscription({
    variables: { videoId },
    onData: ({ data }) => {
      if (
        data?.data?.videoTextReplacementsUpdated?.video?.__typename !==
        'RegularUserVideo'
      ) {
        return;
      }

      const payload = data.data.videoTextReplacementsUpdated;
      const newVideoTextReplacements = payload.video.textReplacements;

      if (payload.errorMessage && onError) {
        onError('Error updating audio replacements');
      }

      const hasChanged = hasPlayableContentChanged({
        oldVideoTextReplacements: videoTextReplacements,
        newVideoTextReplacements,
      });

      if (hasChanged && onPlayableContentChange) {
        onPlayableContentChange();
      }
    },
  });

  return {
    videoTextReplacements,
    isAudioGenerationInProgress,
    isAudioRevertingInProgress,
    areTextReplacementsLoading,
  };
};
