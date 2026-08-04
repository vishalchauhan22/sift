import {
  SUCCESS,
  TranscriptionStatus,
  UNSUPPORTED_LANGUAGE,
} from '@loomhq/shared-utilities/constants/videoTranscript';
import {
  isTranscriptionStatusContainingTranscript,
  isUnfinishedTranscriptionStatus,
  isUnsuccessfulTranscriptionStatus,
} from '@loomhq/shared-utilities/utilities/transcriptionUtils';
import { useTranscript } from './useTranscript';

export const useTranscriptStatus = (): TranscriptStatus => {
  const { transcript, transcriptStatus } = useTranscript();

  const transcriptEmpty = !transcript?.phrases?.length;

  const languageUnavailable = transcriptStatus === UNSUPPORTED_LANGUAGE;

  const transcriptUnsuccessful =
    isUnsuccessfulTranscriptionStatus(transcriptStatus);
  const transcriptInProgress =
    isUnfinishedTranscriptionStatus(transcriptStatus);
  const transcriptAvailable =
    isTranscriptionStatusContainingTranscript(transcriptStatus) &&
    !transcriptEmpty;
  const transcriptSuccessful = transcriptStatus === SUCCESS;

  const transcriptRegenerating =
    !transcriptUnsuccessful &&
    !isTranscriptionStatusContainingTranscript(transcriptStatus);

  return {
    transcriptStatus,
    languageUnavailable,
    transcriptAvailable,
    transcriptEmpty,
    transcriptInProgress,
    transcriptRegenerating,
    transcriptUnsuccessful,
    transcriptSuccessful,
  };
};

type TranscriptStatus = {
  transcriptStatus: TranscriptionStatus | null;
  languageUnavailable: boolean;
  transcriptAvailable: boolean;
  transcriptUnsuccessful: boolean;
  transcriptEmpty: boolean;
  transcriptInProgress: boolean;
  transcriptRegenerating: boolean;
  transcriptSuccessful: boolean;
};
