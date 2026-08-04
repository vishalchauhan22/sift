import { useVideoPasswordContext } from '@js/common/video-password';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useEffect, useMemo } from 'react';

import { SuccessMarkers } from '@js/utilities/rum/constants';

import { useMarkRUMSuccess } from '@js/utilities/rum/markers';

import { VIDEO_EDIT_BY_TRANSCRIPT_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { PARTIAL as TRANSCRIPTION_STATUS_PARTIAL } from '@loomhq/shared-utilities/constants/videoTranscript';
import {
  isTerminalTranscriptionStatus,
  isTranscriptionStatusContainingTranscript,
  isUnfinishedTranscriptionStatus,
} from '@loomhq/shared-utilities/utilities/transcriptionUtils';

import { TranscriptionStatuses, WordType } from '@js/globalTypes.generated';

import {
  ClipId,
  PhraseIndex,
  Token,
  TokenIndex,
  TokenKey,
  TranscriptPhrase,
} from '../types';
import {
  ConsolidatedEditFetchTimestampedWordsQuery,
  useConsolidatedEditFetchTimestampedWordsQuery,
} from './ConsolidatedEditFetchTimestampedWords.generated';
import { useConsolidatedEditGetTranscriptStatusQuery } from './ConsolidatedEditFetchTranscriptStatus.generated';
import {
  ConsolidatedEditTranscriptStatusChangedDocument,
  ConsolidatedEditTranscriptStatusChangedSubscription,
} from './ConsolidatedEditTranscriptStatusChanged.generated';
import { replaceTranscriptPhrasesWithTextReplacements } from './replaceTranscriptPhrasesWithTextReplacements';
import { useVideoTextReplacements } from '../use-video-text-replacements';
import { useEditTtsEnabledStatus } from '../useEditTtsEnabledStatus';

const NUMBER_OF_PHRASES_TO_SHOW_BEHIND_PAYWALL = 8;

const getTokenKey = ({
  clipId,
  phraseIndex,
  tokenIndex,
}: {
  clipId: ClipId;
  phraseIndex: PhraseIndex;
  tokenIndex: TokenIndex;
}): TokenKey => {
  return `${clipId}:${phraseIndex}:${tokenIndex}`;
};

export const selectTranscriptPhrases = ({
  transcriptData,
  hasEditByTranscriptAccess,
}: {
  transcriptData: ConsolidatedEditFetchTimestampedWordsQuery | undefined;
  hasEditByTranscriptAccess: boolean;
}): TranscriptPhrase[] => {
  if (
    transcriptData?.fetchTimestampedWords?.__typename !==
    'TimestampedWordsPayload'
  ) {
    return [];
  }

  const serverPhrases = transcriptData.fetchTimestampedWords.transcript.phrases;
  let phrases: TranscriptPhrase[] = [];

  // Only add valid tokens, and convert everything to milliseconds
  serverPhrases.forEach((phrase, phraseIndex) => {
    const clipId = phrase.clipId ?? '';

    const tokens: Token[] = [];
    const tokenKeys: Set<TokenKey> = new Set();

    phrase.tokens.forEach((token, tokenIndex) => {
      const key = getTokenKey({ clipId, phraseIndex, tokenIndex });

      if (
        token.type === WordType.Text &&
        token.start !== null &&
        token.end !== null
      ) {
        tokenKeys.add(key);
        tokens.push({
          start: Math.floor(token.start * 1000),
          end: Math.floor(token.end * 1000),
          type: WordType.Text,
          value: token.value,
          key,
          clipId,
          phraseIndex,
          tokenIndex,
        });
      } else if (token.type === WordType.Punct) {
        tokenKeys.add(key);
        tokens.push({
          type: WordType.Punct,
          value: token.value,
          key,
          clipId,
          phraseIndex,
          tokenIndex,
        });
      } else if (token.type === WordType.Silence && token.start && token.end) {
        tokenKeys.add(key);
        tokens.push({
          type: WordType.Silence,
          start: Math.floor(token.start * 1000),
          end: Math.floor(token.end * 1000),
          key,
          clipId,
          phraseIndex,
          tokenIndex,
        });
      }
    });
    phrases.push({
      start: Math.floor(phrase.start * 1000),
      clipId,
      tokens,
      tokenKeys,
    });
  });

  if (!hasEditByTranscriptAccess) {
    phrases = phrases.slice(0, NUMBER_OF_PHRASES_TO_SHOW_BEHIND_PAYWALL);
  }

  return phrases;
};

type VideoTranscriptStatus = 'loading' | 'available' | 'unavailable';

type UseEditableVideoTranscriptResult = {
  isBulkTrimmingReady: boolean;
  transcriptStatus: VideoTranscriptStatus;
  transcriptPhrases: TranscriptPhrase[];
};

export const useEditableVideoTranscript = ({
  videoId,
}: {
  videoId: string;
}): UseEditableVideoTranscriptResult => {
  const { password } = useVideoPasswordContext();
  const markRumSuccess = useMarkRUMSuccess();
  const hasEditByTranscriptAccess = useHasScope(
    VIDEO_EDIT_BY_TRANSCRIPT_ACCESS
  );
  const editTtsEnabledStatus = useEditTtsEnabledStatus();

  const {
    data: transcriptData,
    refetch: refetchTimestampedWords,
    loading: arePhrasesLoading,
    error: transcriptError,
  } = useConsolidatedEditFetchTimestampedWordsQuery({
    variables: { videoId, password },
    onCompleted: data => {
      if (
        data.fetchTimestampedWords?.__typename === 'TimestampedWordsPayload'
      ) {
        markRumSuccess(SuccessMarkers.TranscriptLoaded);
      }
    },
  });

  const {
    videoTextReplacements,
    areTextReplacementsLoading,
    textReplacementsError,
  } = useVideoTextReplacements({
    videoId,
  });

  const transcriptPhrasesWithoutReplacements = useMemo(
    () =>
      selectTranscriptPhrases({
        transcriptData,
        hasEditByTranscriptAccess,
      }),
    [hasEditByTranscriptAccess, transcriptData]
  );

  const transcriptPhrases = useMemo(() => {
    if (editTtsEnabledStatus !== 'enabled') {
      return transcriptPhrasesWithoutReplacements;
    }
    return replaceTranscriptPhrasesWithTextReplacements({
      videoTextReplacements,
      transcriptPhrases: transcriptPhrasesWithoutReplacements,
    });
  }, [
    editTtsEnabledStatus,
    transcriptPhrasesWithoutReplacements,
    videoTextReplacements,
  ]);

  const hasTranscriptPhrases = transcriptPhrases.length > 0;

  const {
    data: videoTranscriptStatusData,
    subscribeToMore,
    error: transcriptStatusError,
    loading: isTranscriptStatusLoading,
  } = useConsolidatedEditGetTranscriptStatusQuery({
    variables: { videoId, password },
    skip: arePhrasesLoading,
  });

  // The video's transcript status. Note that this might be in an in progress state (i.e trimming) despite
  // us having successfully loaded the transcript phrases (as those access the clip's transcripts)
  const videoTranscriptStatus = useMemo(() => {
    return videoTranscriptStatusData?.fetchVideoTranscript?.__typename ===
      'VideoTranscriptDetails'
      ? videoTranscriptStatusData.fetchVideoTranscript.transcription_status
      : null;
  }, [videoTranscriptStatusData]);

  useEffect(() => {
    subscribeToMore<ConsolidatedEditTranscriptStatusChangedSubscription>({
      document: ConsolidatedEditTranscriptStatusChangedDocument,
      variables: { videoId },
      updateQuery: (prev, { subscriptionData }) => {
        if (
          prev.fetchVideoTranscript?.__typename !== 'VideoTranscriptDetails' ||
          !subscriptionData.data.transcriptStatus?.status
        ) {
          return prev;
        }

        const newVideoTranscriptStatus = subscriptionData.data.transcriptStatus
          .status as TranscriptionStatuses;

        const transcriptWasInProgress = videoTranscriptStatus
          ? isUnfinishedTranscriptionStatus(videoTranscriptStatus)
          : false;
        const newTranscriptStatusContainsTranscript =
          isTranscriptionStatusContainingTranscript(newVideoTranscriptStatus);
        const newTranscriptStatusIsTerminal = isTerminalTranscriptionStatus(
          newVideoTranscriptStatus
        );

        // If the video transcript was in an in-progress status, and now changed to a completed status,
        // and we haven't successfully loaded any phrases yet, trigger a refetch of the transcript phrases
        const shouldRefetchInitialTranscript =
          !hasTranscriptPhrases &&
          transcriptWasInProgress &&
          newTranscriptStatusContainsTranscript;

        // If the video transcript is moving from 'partial' to a terminal status, refetch as we have more words
        const shouldRefetchFinalTranscript =
          videoTranscriptStatus === TRANSCRIPTION_STATUS_PARTIAL &&
          newTranscriptStatusIsTerminal;

        if (shouldRefetchInitialTranscript || shouldRefetchFinalTranscript) {
          refetchTimestampedWords();
        }

        // Update the transcriptStatus in the apollo cache (and returned from this hook)
        return Object.assign({}, prev, {
          fetchVideoTranscript: {
            ...prev.fetchVideoTranscript,
            transcription_status: newVideoTranscriptStatus,
          },
        });
      },
    });
  }, [
    subscribeToMore,
    videoTranscriptStatus,
    videoId,
    refetchTimestampedWords,
    hasTranscriptPhrases,
  ]);

  const isVideoTranscriptUnfinished = videoTranscriptStatus
    ? isUnfinishedTranscriptionStatus(videoTranscriptStatus)
    : false;

  // Current implementation for the bulk trim mutations will error out
  // if the transcript status is not in this list (even though theoretically it
  // might not be strictly necessary)
  const doesVideoTranscriptContainTranscript = videoTranscriptStatus
    ? isTranscriptionStatusContainingTranscript(videoTranscriptStatus)
    : false;

  const isBulkTrimmingReady =
    hasTranscriptPhrases && doesVideoTranscriptContainTranscript;

  // If we hit an error fetching either the transcript status or the transcript
  if (transcriptError || transcriptStatusError || textReplacementsError) {
    return {
      transcriptStatus: 'unavailable',
      transcriptPhrases,
      isBulkTrimmingReady,
    };
  }

  // If we're still initially fetching the transcript or text replacements
  if (
    (arePhrasesLoading ||
      isTranscriptStatusLoading ||
      areTextReplacementsLoading) &&
    !hasTranscriptPhrases
  ) {
    return {
      transcriptStatus: 'loading',
      transcriptPhrases,
      isBulkTrimmingReady,
    };
  }

  // If we've fetched the transcript, there's no phrases, but the transcript is in an unfinished state
  if (
    !arePhrasesLoading &&
    !hasTranscriptPhrases &&
    isVideoTranscriptUnfinished
  ) {
    return {
      transcriptStatus: 'loading',
      transcriptPhrases,
      isBulkTrimmingReady,
    };
  }

  // Otherwise, transcript availability is based on the presence of phrases
  return {
    transcriptStatus: hasTranscriptPhrases ? 'available' : 'unavailable',
    isBulkTrimmingReady,
    transcriptPhrases,
  };
};
