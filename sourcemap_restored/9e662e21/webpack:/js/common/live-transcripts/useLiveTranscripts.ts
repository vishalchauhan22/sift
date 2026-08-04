import { Phrase, Transcript } from '@loomhq/shared-utilities';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useEffect, useMemo, useState } from 'react';
import {
  GetLiveTranscriptQuery,
  useGetLiveTranscriptQuery,
} from '../live-transcripts/GetLiveTranscript.generated';

import { useIsMeetingRecording } from '@js/common/meeting-recordings/useIsMeetingRecording';
import * as loggerx from '@js/utilities/loggerx';
import { isTerminalTranscriptionStatus } from '@loomhq/shared-utilities/utilities/transcriptionUtils';
import { useTranscript } from '../transcripts';
import { useTranscriptStore } from '../transcripts/useTranscriptStore';
import { useLiveTranscriptUpdatedSubscription } from './LiveTranscriptStatusSubscription.generated';
import {
  LiveTranscriptStatusType,
  UseLiveTranscriptsReturnType,
} from './types';

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

// Provides transcript output and status based on a videoId
export const useLiveTranscripts = (
  videoId: string
): UseLiveTranscriptsReturnType => {
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState<LiveTranscriptStatusType>(null);

  const { isCorrectMode } = useTranscriptStore();
  const { transcriptStatus } = useTranscript();

  const isMeeting = useIsMeetingRecording(videoId);
  const isTranscriptTerminal = isTerminalTranscriptionStatus(transcriptStatus);

  const {
    data: liveTranscriptData,
    loading: getLiveTranscriptLoading,
    refetch: refetchLiveTranscript,
  } = useGetLiveTranscriptQuery({
    variables: {
      videoId: videoId!,
    },
    skip: isTranscriptTerminal || !isMeeting || !videoId,
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
      videoId: videoId!,
    },
    skip: isTranscriptTerminal || !isMeeting || !videoId,
    onData: options => {
      const shouldRefetch =
        !getLiveTranscriptLoading &&
        videoId &&
        options.data.data?.liveTranscriptEvent?.status !== 'completed';

      if (shouldRefetch) {
        refetchLiveTranscript();
      }

      setStatus(options.data.data?.liveTranscriptEvent?.status ?? null);
    },
  });

  return {
    transcript,
    hasError,
    status,
    isLiveTranscriptRunning,
  };
};
