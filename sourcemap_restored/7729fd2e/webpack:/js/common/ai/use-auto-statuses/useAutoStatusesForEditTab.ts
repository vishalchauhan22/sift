import {
  AUTO_FILLER_WORD_REMOVAL,
  AUTO_SILENCE_REMOVAL,
} from '@js/constants/events';

import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { useTranscriptStatus } from '@js/common/transcripts';
import { usePlayerHasStarted } from '@js/common/video-player';
import { useChaptersContext } from '@js/pages/share/common/chapters';
import { useState, useEffect } from 'react';

import * as loggerx from '@js/utilities/loggerx';

import {
  AutoChapterStatusesType,
  IntelligenceStatusType,
} from '@js/globalTypes.generated';

import * as analytics from '@js/utilities/analytics';

import { useAutoFeatureStatuses } from './useAutoFeatureStatuses';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { useFromRecorder } from '@js/common/useFromRecorder';

type AutoStatusesReturnType = {
  autoTitleGenerated: boolean;
  autoSummaryGenerated: boolean;
  autoChaptersGenerated: boolean;
  hasUserEditedTitle: boolean;
  hasUserEditedSummary: boolean;
  hasUserEditedChapters: boolean;
  transcriptAvailable: boolean;
  transcriptUnsuccessful: boolean;
  transcriptInProgress: boolean;
  transcriptRegenerating: boolean;
  isAiGenerating: boolean;
  hasError: boolean;
  isStatusesFetching: boolean;
};

const isStatusPending = (
  status: IntelligenceStatusType | AutoChapterStatusesType | null
) => {
  return [
    null,
    IntelligenceStatusType.Pending,
    AutoChapterStatusesType.InProgress,
  ].includes(status);
};

const isStatusAuto = (
  status: IntelligenceStatusType | AutoChapterStatusesType | null
) => {
  return (
    status !== null &&
    [IntelligenceStatusType.Auto, AutoChapterStatusesType.Success].includes(
      status
    )
  );
};

const isUserEdited = (status: IntelligenceStatusType | null) => {
  return status === IntelligenceStatusType.User;
};

export const useAutoStatusesForEditTab = ({
  videoId,
  skip = false,
}: {
  videoId: string;
  skip?: boolean;
}): AutoStatusesReturnType => {
  const { fromRecorder: isFromRecorder } = useFromRecorder();
  const hasPlayerStarted = usePlayerHasStarted(videoId);
  const { setShowConfirmationToast } = useConfirmationToast();
  const [
    hasHandledAutoFillerWordAndSilenceRemovalWhenFromRecorder,
    setHasHandledAutoFillerWordAndSilenceRemovalWhenFromRecorder,
  ] = useState(false);

  const {
    transcriptAvailable,
    transcriptInProgress,
    transcriptRegenerating,
    transcriptUnsuccessful,
  } = useTranscriptStatus();

  const {
    autoTitleStatus,
    autoDescriptionStatus,
    autoChaptersStatus,
    numberOfFillerWordsTrimmed,
    secondsOfSilenceTrimmed,
    isLoading: isStatusesFetching,
    hasError,
  } = useAutoFeatureStatuses({ videoId, skip });

  const autoChaptersWillNotCome =
    autoChaptersStatus === AutoChapterStatusesType.NotStarted;

  const isAutoTitleFinished = !isStatusPending(autoTitleStatus);
  const autoTitleGenerated = isStatusAuto(autoTitleStatus);
  const isAutoDescriptionFinished = !isStatusPending(autoDescriptionStatus);
  const autoSummaryGenerated = isStatusAuto(autoDescriptionStatus);
  const isAutoChaptersFinished =
    autoChaptersWillNotCome || !isStatusPending(autoChaptersStatus);
  const autoChaptersGenerated = isStatusAuto(autoChaptersStatus);

  const areAllVisibleFeaturesFinished =
    isAutoTitleFinished && isAutoDescriptionFinished && isAutoChaptersFinished;

  const { userEdited: hasUserEditedChapters } = useChaptersContext();

  useEffect(() => {
    // It's possible the user came from the recorder and loaded the video before filler words / silences were auto-trimmed
    // In this case, reload the video if they haven't started playing it yet, otherwise show a toast prompting them to refresh the page
    if (
      isFromRecorder &&
      !hasHandledAutoFillerWordAndSilenceRemovalWhenFromRecorder &&
      (secondsOfSilenceTrimmed > 0 || numberOfFillerWordsTrimmed > 0)
    ) {
      if (secondsOfSilenceTrimmed > 0) {
        analytics.track(AUTO_SILENCE_REMOVAL, {
          ...withIdentifiers(
            AUTO_SILENCE_REMOVAL,
            AnalyticsEntityId.video(videoId, 'videoId')
          ),
          secondsOfSilenceTrimmed,
        });
      }

      if (numberOfFillerWordsTrimmed > 0) {
        analytics.track(AUTO_FILLER_WORD_REMOVAL, {
          ...withIdentifiers(
            AUTO_FILLER_WORD_REMOVAL,
            AnalyticsEntityId.video(videoId, 'videoId')
          ),
          numberOfFillerWordsTrimmed,
        });
      }

      setHasHandledAutoFillerWordAndSilenceRemovalWhenFromRecorder(true);

      const logPrefix = 'auto-fws-removal:';
      const logContext = {
        videoId,
        secondsOfSilenceTrimmed,
        numberOfFillerWordsTrimmed,
      };

      if (hasPlayerStarted) {
        loggerx.info(`${logPrefix} completed after video played`, logContext);

        setShowConfirmationToast(
          `We've automatically trimmed filler words and silences from your video! Please reload to see the changes.`
        );
      } else {
        loggerx.info(`${logPrefix} completed before video played`, logContext);
      }
    }
  }, [
    isFromRecorder,
    numberOfFillerWordsTrimmed,
    secondsOfSilenceTrimmed,
    hasHandledAutoFillerWordAndSilenceRemovalWhenFromRecorder,
    setHasHandledAutoFillerWordAndSilenceRemovalWhenFromRecorder,
    hasPlayerStarted,
    videoId,
    setShowConfirmationToast,
  ]);

  return {
    autoChaptersGenerated,
    autoSummaryGenerated,
    autoTitleGenerated,
    hasError,
    hasUserEditedChapters,
    hasUserEditedSummary: isUserEdited(autoDescriptionStatus),
    hasUserEditedTitle: isUserEdited(autoTitleStatus),
    isAiGenerating:
      isStatusesFetching || (!areAllVisibleFeaturesFinished && isFromRecorder),
    isStatusesFetching,
    transcriptAvailable,
    transcriptInProgress,
    transcriptRegenerating,
    transcriptUnsuccessful,
  };
};
