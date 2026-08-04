import { useState, useMemo, useEffect } from 'react';
import { Transcript, Phrase } from '@loomhq/shared-utilities';
import { useVideoContext } from '../video-player';
import {
  GetLiveTranscriptQuery,
  useGetLiveTranscriptQuery,
} from '../live-transcripts/GetLiveTranscript.generated';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useLiveTranscriptUpdatedSubscription } from './LiveTranscriptStatusSubscription.generated';
import { useIsMeetingRecording } from '@js/common/meeting-recordings/useIsMeetingRecording';
import * as loggerx from '@js/utilities/loggerx';
import { useTranscript } from '../transcripts';
import { useTranscriptStore } from '../transcripts/useTranscriptStore';
import { isTerminalTranscriptionStatus } from '@loomhq/shared-utilities/utilities/transcriptionUtils';

interface UseLiveTranscriptsReturnType {
  transcript: Transcript | null;
  hasError: boolean;
  status: 'updated' | 'completed' | null | undefined;
  isLiveTranscriptRunning: boolean;
}

const deriveTranscriptFromQueryData = (
  data: GetLiveTranscriptQuery | undefined
): Transcript | null => {
  if (!data?.fetchLiveTranscript) {
    return null;
  }

  if (
    data.fetchLiveTranscript.__typename === 'GenericError' ||
    data.fetchLiveTranscript.__typename === 'UserNotAuthorizedError' ||
    data.fetchLiveTranscript.__typename === 'LiveTranscriptNotReady'
  ) {
    return null;
  }

  return {
    phrases: (data.fetchLiveTranscript.phrases ?? []) as Phrase[],
    schemaVersion: data.fetchLiveTranscript.schemaVersion ?? '',
  };
};

export const useLiveTranscripts = (): UseLiveTranscriptsReturnType => {
  const [hasError, setHasError] = useState(false);
  // TODO: better typify status
  const [status, setStatus] = useState<
    'updated' | 'completed' | null | undefined
  >(null);
  const { video } = useVideoContext();
  const videoId = video?.id;
  const flagValue = useFeatureFlagValue<boolean>(
    FEATURE_GATES.LIVE_TRANSCRIPTS,
    ControlType.STATSIG_FEATURE_GATE
  );
  const { isCorrectMode } = useTranscriptStore();
  const { transcriptStatus } = useTranscript();

  const isLiveTranscriptEnabled = flagValue === true;
  const isMeeting = useIsMeetingRecording(videoId);
  const isTranscriptTerminal = isTerminalTranscriptionStatus(transcriptStatus);

  const {
    data: liveTranscriptData,
    loading: getLiveTranscriptLoading,
    refetch: refetchLiveTranscript,
  } = useGetLiveTranscriptQuery({
    variables: {
      videoId,
    },
    skip:
      !isLiveTranscriptEnabled ||
      isTranscriptTerminal ||
      !isMeeting ||
      !videoId,
    onError: error => {
      loggerx.error(
        error,
        {
          message: `Error fetching live transcript`,
          videoId,
        },
        { feature: Feature.LiveTranscripts }
      );
      setHasError(true);
    },
  });

  // Derive transcript from query data
  const transcript: Transcript | null = useMemo(
    () => deriveTranscriptFromQueryData(liveTranscriptData),
    [liveTranscriptData]
  );

  const isLiveTranscriptRunning = Boolean(
    !isTranscriptTerminal &&
      !isCorrectMode &&
      transcript &&
      status === 'updated'
  );

  // Handle error states and logging based on query data
  useEffect(() => {
    if (!liveTranscriptData?.fetchLiveTranscript) {
      return;
    }

    if (liveTranscriptData.fetchLiveTranscript.__typename === 'GenericError') {
      loggerx.error(
        'Error fetching live transcript',
        {
          message: `Error fetching live transcript`,
          videoId,
        },
        { feature: Feature.LiveTranscripts }
      );
      setHasError(true);
    } else if (
      liveTranscriptData.fetchLiveTranscript.__typename ===
      'UserNotAuthorizedError'
    ) {
      loggerx.error(
        'User is not authorized for live transcript',
        {
          message: `User is not authorized for live transcript`,
          videoId,
        },
        { feature: Feature.LiveTranscripts }
      );
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [liveTranscriptData, videoId]);

  useLiveTranscriptUpdatedSubscription({
    variables: {
      videoId,
    },
    skip:
      !isLiveTranscriptEnabled ||
      isTranscriptTerminal ||
      !isMeeting ||
      !videoId,
    onData: options => {
      const shouldRefetch =
        !getLiveTranscriptLoading &&
        videoId &&
        options.data.data?.liveTranscriptEvent?.status !== 'completed';

      if (shouldRefetch) {
        refetchLiveTranscript();
      }

      setStatus(options.data.data?.liveTranscriptEvent?.status);
    },
  });

  return {
    transcript,
    hasError,
    status,
    isLiveTranscriptRunning,
  };
};
