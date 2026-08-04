import { useEffect, useMemo, useRef } from 'react';
import { NEW_ARCH_RELEASE_UTC_DATE } from '@loomhq/shared-utilities/constants/videoTranscript';

import { useVideoContext } from '@js/common/video-player';
import {
  useGetVideoCanBeEditedWithoutRetranscriptionQuery,
  GetVideoCanBeEditedWithoutRetranscriptionDocument,
  GetVideoCanBeEditedWithoutRetranscriptionQuery,
} from './GetVideoCanBeEditedWithoutRetranscription.generated';
import { useTranscriptStatus } from '@js/common/transcripts';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';

const getCanBeEdited = ({
  data,
  loading,
  error,
}: ApolloQueryResult<
  GetVideoCanBeEditedWithoutRetranscriptionQuery | undefined
>) => {
  if (
    loading ||
    error ||
    !data ||
    !data.getVideoCanBeEditedWithoutRetranscription ||
    data.getVideoCanBeEditedWithoutRetranscription.__typename !==
      'GetVideoCanBeEditedWithoutRetranscriptionPayload'
  ) {
    return null;
  }

  return data.getVideoCanBeEditedWithoutRetranscription.canBeEdited;
};

export const useTranscriptRegenerationRequiredToEdit = (): boolean | null => {
  const {
    video: { modelId: videoId, createdAt, currentUserCanEdit = false },
  } = useVideoContext();
  const {
    transcriptRegenerating,
    transcriptSuccessful,
    transcriptStatus,
    transcriptInProgress,
    transcriptAvailable,
  } = useTranscriptStatus();
  const client = useApolloClient();
  const shouldSkip =
    !currentUserCanEdit || new Date(createdAt) >= NEW_ARCH_RELEASE_UTC_DATE;
  const transcriptHasBeenTriggered = useRef<null | boolean>(null);

  const result = useGetVideoCanBeEditedWithoutRetranscriptionQuery({
    variables: { videoId },
    skip: shouldSkip,
  });

  const canBeEdited = useMemo(() => getCanBeEdited(result), [result]);

  useEffect(() => {
    // let's set the ref when we first detect a change in transcript status due to regeneration
    if (
      transcriptStatus !== null &&
      transcriptRegenerating &&
      transcriptHasBeenTriggered.current === null
    ) {
      transcriptHasBeenTriggered.current = true;
    }
  }, [transcriptRegenerating, transcriptStatus]);

  useEffect(() => {
    if (shouldSkip) {
      return;
    }

    // Don't proceed if we don't know the current state or transcript is not available
    if (
      canBeEdited === null ||
      transcriptStatus === null ||
      !transcriptAvailable ||
      transcriptHasBeenTriggered.current === null
    ) {
      return;
    }

    // Update cache directly after a successful transcript regeneration
    if (
      !canBeEdited &&
      transcriptHasBeenTriggered.current !== transcriptRegenerating &&
      transcriptSuccessful
    ) {
      client.writeQuery({
        query: GetVideoCanBeEditedWithoutRetranscriptionDocument,
        variables: { videoId },
        data: {
          getVideoCanBeEditedWithoutRetranscription: {
            __typename: 'GetVideoCanBeEditedWithoutRetranscriptionPayload',
            canBeEdited: true,
          },
        },
      });
    }
  }, [
    transcriptRegenerating,
    transcriptSuccessful,
    client,
    videoId,
    result,
    canBeEdited,
    transcriptStatus,
    transcriptInProgress,
    transcriptAvailable,
    shouldSkip,
  ]);

  if (shouldSkip || canBeEdited === null) {
    return false;
  }

  return !canBeEdited;
};
