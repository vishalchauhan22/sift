import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useEffect, useRef, useState } from 'react';

import { ErrorSeverities } from '@js/constants/error-severities';

import fetch from '@js/utilities/fetch';
import * as loggerx from '@js/utilities/loggerx';

import { Language, Transcript } from '@loomhq/shared-utilities';
import { Team } from '@loomhq/shared-utilities/constants/product';
import { TranscriptionStatus } from '@loomhq/shared-utilities/constants/videoTranscript';

import {
  isTerminalTranscriptionStatus,
  isTranscriptionStatusContainingTranscript,
} from '@loomhq/shared-utilities/utilities/transcriptionUtils';

import {
  GetTranscriptQuery,
  useGetTranscriptQuery,
} from './GetTranscript.generated';

import { useGetTranscriptStatusQuery } from './GetTranscriptStatus.generated';
import {
  TranscriptStatusChangedDocument,
  TranscriptStatusChangedSubscription,
} from './TranscriptStatusChanged.generated';
import { useUserCanAccessTranscript } from './useUserCanAccessTranscript';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { Language as GeneratedLanguage } from '@js/globalTypes.generated';
import { captionsStore } from '../video-player/hooks/captionsStore';
import { useGetCaptionsLanguageStatusQuery } from '../video-player/components/play-bar/settings-menu/GetCaptionsLanguageStatus.generated';
import {
  CaptionTranslationCompletedDocument,
  CaptionTranslationCompletedSubscription,
} from '../video-player/components/play-bar/settings-menu/CaptionTranslationCompleted.generated';

const TRANSCRIPT_TIMEOUT_MS = 600_000; // 10 minutes

const getLanguage = (language: GeneratedLanguage | null): Language | null =>
  language as Language | null;

const fetchFromSourceUrl = async (sourceUrl: string, videoId: string) => {
  const sourceUrlResponse = await fetch(sourceUrl);

  if (!sourceUrlResponse.ok) {
    loggerx.error(
      'Failed to fetch transcript json',
      {
        message: `Failed to fetch transcript json`,
        videoId,
      },
      { team: Team.ShareAndTransform }
    );

    return;
  }

  const sourceJson = await sourceUrlResponse.json();

  // Note: it's possible that a video may have a phrase with only punctuations (e.g. the last phrase has "." only)
  // In this case, the phrase will have ts = -1 which will break the transcript panel, so filtering out those phrase here.
  if (sourceJson?.phrases) {
    const filteredPhrases = sourceJson.phrases.filter(
      phrase => phrase?.ts >= 0
    );

    sourceJson.phrases = filteredPhrases;
  }
  return sourceJson;
};

type TranscriptAndCaptionDetails = {
  captionsUrl: string | null;
  sourceUrl: string | null;
  status: TranscriptionStatus | null;
  language: Language | null;
  captionsTranslationInProgress: boolean | null;
  captionsInOriginalLanguage: boolean;
  version: number;
};

const selectTranscriptAndCaptionDetails = (
  data: GetTranscriptQuery | undefined,
  loading: boolean,
  error: Error | undefined
): TranscriptAndCaptionDetails => {
  if (
    loading ||
    error ||
    !data ||
    data?.fetchVideoTranscript?.__typename !== 'VideoTranscriptDetails'
  ) {
    return {
      captionsUrl: null,
      sourceUrl: null,
      status: null,
      language: null,
      captionsTranslationInProgress: null,
      captionsInOriginalLanguage: false,
      version: -1,
    };
  }

  const transcriptDetailsFromServer = data?.fetchVideoTranscript;
  const transcriptDetailsNeeded: TranscriptAndCaptionDetails = {
    captionsUrl: transcriptDetailsFromServer.captions_source_url,
    sourceUrl: transcriptDetailsFromServer.source_url,
    status: transcriptDetailsFromServer.transcription_status,
    language: getLanguage(transcriptDetailsFromServer.language),
    captionsTranslationInProgress:
      transcriptDetailsFromServer.captionsTranslationInProgress,
    captionsInOriginalLanguage:
      transcriptDetailsFromServer.captionsInOriginalLanguage ?? false,
    version: transcriptDetailsFromServer.version,
  };
  return transcriptDetailsNeeded;
};

type UseTranscriptReturnType = {
  transcript: Transcript | null;
  transcriptStatus: TranscriptionStatus | null;
  language: Language | null;
  captionsUrl: string | null;
  refetch: () => void;
  isCaptionsTranslationInProgress: boolean | null;
  hasTranslationError: boolean;
  isCaptionsInOriginalLanguage: boolean;
  version: number;
};

export const useTranscript = (): UseTranscriptReturnType => {
  const {
    video: { activeVideoTranscriptId, modelId: videoId },
  } = useVideoContext();
  const { showErrorBar } = useErrorBar();
  const userCanAccessTranscript = useUserCanAccessTranscript();
  const { password } = useVideoPasswordContext();

  const {
    captionsLanguageSelection,
    setCaptionsLanguageSelection,
    setHasCaptionsLanguageChanged,
    hasCaptionsLanguageChanged,
  } = captionsStore(state => state);

  const {
    data,
    loading,
    error,
    refetch: refetchAllTranscriptDetails,
  } = useGetTranscriptQuery({
    variables: {
      videoId,
      password,
      captionsLanguageSelection,
    },
    skip: !videoId || !userCanAccessTranscript || !activeVideoTranscriptId,
    fetchPolicy: hasCaptionsLanguageChanged ? 'network-only' : 'cache-first',
    onCompleted: completedData => {
      if (
        completedData?.fetchVideoTranscript?.__typename !==
        'VideoTranscriptDetails'
      ) {
        showErrorBar({
          message: 'Oops! Failed to fetch transcript.',
          severity: ErrorSeverities.ERROR,
        });
      }

      if (
        completedData.fetchVideoTranscript.__typename ===
          'VideoTranscriptDetails' &&
        captionsLanguageSelection
      ) {
        const transcriptDetails = completedData.fetchVideoTranscript;
        const currentSelectedLanguage = captionsLanguageSelection;
        const originalLanguage = getLanguage(transcriptDetails?.language);

        const isCaptionsInOriginalLanguage =
          transcriptDetails.captionsInOriginalLanguage === true;
        const isCaptionTranslationErrorFallback =
          transcriptDetails.captionTranslationErrorFallback === true;
        const isCaptionsTranslatedDifferentThanSelected =
          transcriptDetails.captionsTranslatedLanguage !==
          currentSelectedLanguage;

        const shouldResetCaptionsLanguageSelection =
          isCaptionsInOriginalLanguage &&
          isCaptionTranslationErrorFallback &&
          originalLanguage &&
          isCaptionsTranslatedDifferentThanSelected;

        if (isCaptionTranslationErrorFallback) {
          setHasTranslationError(true);

          setTimeout(() => {
            setHasTranslationError(false);
          }, 5000);
        }

        if (shouldResetCaptionsLanguageSelection) {
          setCaptionsLanguageSelection(originalLanguage);
          setHasCaptionsLanguageChanged(true);
        }
      }
    },
    onError: queryError => {
      showErrorBar({
        message: 'Oops! Failed to fetch transcript.',
        severity: ErrorSeverities.ERROR,
      });
      loggerx.error(
        queryError,
        {
          message: `Error fetching transcript for video id ${videoId}: ${queryError}`,
          videoId,
          captionsLanguageSelection,
        },
        { team: Team.ShareAndTransform }
      );
    },
  });

  const { subscribeToMore } = useGetTranscriptStatusQuery({
    variables: { videoId, password },
    skip: !videoId,
  });

  const unsubscribeRef = useRef<() => void>();

  useEffect(() => {
    if (!videoId) {
      loggerx.info(
        'Skipping transcript status subscription as no videoId provided',
        {},
        { team: Team.ShareAndTransform }
      );
      return;
    }
    unsubscribeRef.current =
      subscribeToMore<TranscriptStatusChangedSubscription>({
        document: TranscriptStatusChangedDocument,
        variables: { videoId },
        updateQuery: (prev, { subscriptionData }) => {
          // typecast needed to correctly check if the status is terminal below
          // if the status string is not part of the TranscriptionStatus type, it should fail anyway
          const newTranscriptStatus = subscriptionData.data?.transcriptStatus
            .status as TranscriptionStatus;
          if (
            prev.fetchVideoTranscript?.__typename !==
              'VideoTranscriptDetails' ||
            !newTranscriptStatus
          ) {
            return prev;
          }

          // erintodo: figure out how to handle this
          if (isTerminalTranscriptionStatus(newTranscriptStatus)) {
            // if we receive a terminal status, then we no longer have an active subscription
            // so we mark this as undefined to avoid marking a timeout later
            unsubscribeRef.current = undefined;
          }

          // since we only get the updated status from the subscription
          // we need to refetch the entire transcript details
          refetchAllTranscriptDetails();

          return Object.assign({}, prev, {
            fetchVideoTranscript: {
              ...prev.fetchVideoTranscript,
              transcription_status: newTranscriptStatus,
            },
          });
        },
      });
  }, [subscribeToMore, videoId, refetchAllTranscriptDetails]);

  const hasValidLanguageSelection = captionsLanguageSelection;

  const { subscribeToMore: subscribeToMoreCaptions } =
    useGetCaptionsLanguageStatusQuery({
      variables: { videoId, password, captionsLanguageSelection },
      skip: !videoId || !hasValidLanguageSelection,
    });

  const captionUnsubscribeRef = useRef<() => void>();

  useEffect(() => {
    // Only set up subscription if we have a valid language selection
    if (!videoId || !hasValidLanguageSelection) {
      return;
    }

    // Clean up existing subscription if language changed or component re-rendered
    if (captionUnsubscribeRef.current) {
      captionUnsubscribeRef.current();
      captionUnsubscribeRef.current = undefined;
    }

    captionUnsubscribeRef.current =
      subscribeToMoreCaptions<CaptionTranslationCompletedSubscription>({
        document: CaptionTranslationCompletedDocument,
        variables: { videoId, captionsLanguageSelection },
        updateQuery: (prev, { subscriptionData }) => {
          const captionData =
            subscriptionData.data?.captionTranslationCompleted;

          if (
            prev.fetchVideoTranscript?.__typename !==
              'VideoTranscriptDetails' ||
            !captionData
          ) {
            return prev;
          }

          if (captionData.success !== undefined || captionData.errorMessage) {
            captionUnsubscribeRef.current = undefined;

            if (captionData.success) {
              // Translation succeeded - update with new captions URL
              return Object.assign({}, prev, {
                fetchVideoTranscript: {
                  ...prev.fetchVideoTranscript,
                  captionsTranslationInProgress: false,
                  captions_source_url: captionData.translatedCaptionsUrl,
                  captionsTranslatedLanguage: captionData.language,
                  captionsInOriginalLanguage: false,
                  captionTranslationErrorFallback: false,
                },
              });
            }

            // Translation failed (success: false) - fall back to original captions
            if (prev?.fetchVideoTranscript?.language) {
              setCaptionsLanguageSelection(prev.fetchVideoTranscript.language);
            }

            setHasTranslationError(true);

            setTimeout(() => {
              setHasTranslationError(false);
            }, 5000);

            return Object.assign({}, prev, {
              fetchVideoTranscript: {
                ...prev.fetchVideoTranscript,
                captionsTranslationInProgress: false,
                captionTranslationErrorFallback: Boolean(
                  captionData.errorMessage
                ),
                captionsInOriginalLanguage: true,
                captionsTranslatedLanguage: prev.fetchVideoTranscript.language,
                captions_source_url: prev.fetchVideoTranscript.captions_url,
              },
            });
          }

          // If not a terminal state, translation is still in progress
          return Object.assign({}, prev, {
            fetchVideoTranscript: {
              ...prev.fetchVideoTranscript,
              captionsTranslationInProgress: true,
            },
          });
        },
      });
  }, [
    subscribeToMoreCaptions,
    videoId,
    captionsLanguageSelection,
    setCaptionsLanguageSelection,
    hasValidLanguageSelection,
  ]);

  const {
    sourceUrl,
    status,
    language,
    captionsUrl,
    captionsTranslationInProgress,
    captionsInOriginalLanguage,
    version,
  } = selectTranscriptAndCaptionDetails(data, loading, error);

  const isCaptionsTranslationInProgress =
    captionsTranslationInProgress ?? false;

  // state needed to store the transcript after async fetch
  const [transcript, setTranscript] = useState<Transcript | null>(null);

  // Track translation errors that persist through auto-reset
  const [hasTranslationError, setHasTranslationError] = useState(false);

  useEffect(() => {
    const fetchTranscript = async () => {
      const isTranscriptAvailable = Boolean(
        status && isTranscriptionStatusContainingTranscript(status) && sourceUrl
      );
      if (!isTranscriptAvailable || !sourceUrl) {
        setTranscript(null);
        return;
      }
      const transcriptResponse = await fetchFromSourceUrl(sourceUrl, videoId);
      if (!transcriptResponse) {
        setTranscript(null);
        return;
      }

      setTranscript(transcriptResponse);
    };
    fetchTranscript();
  }, [sourceUrl, status, videoId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      if (captionUnsubscribeRef.current) {
        captionUnsubscribeRef.current();
      }
    }, TRANSCRIPT_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  return {
    transcript,
    transcriptStatus: status,
    language,
    captionsUrl,
    refetch: refetchAllTranscriptDetails,
    isCaptionsTranslationInProgress: loading || isCaptionsTranslationInProgress,
    hasTranslationError,
    isCaptionsInOriginalLanguage: captionsInOriginalLanguage,
    version,
  };
};
