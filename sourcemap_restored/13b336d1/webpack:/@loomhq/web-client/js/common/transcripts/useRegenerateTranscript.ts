import { useDispatch } from 'react-redux';
import * as analytics from '@js/utilities/analytics';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { TRANSCRIPTION_REGENERATE_CLICKED } from '@js/constants/events';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { updateRetranscriptionStatus } from '@js/actions/shareVideo';
import { RetranscriptionStatus } from '@js/utilities/transcript/statuses';
import { resetTranscription as legacyResetTranscription } from '@js/reducers/transcription';
import * as logger from '@js/utilities/loggerx';
import { useTranscriptStore } from '@js/common/transcripts/useTranscriptStore';
import { useRegenerateTranscriptMutation } from './RegenerateTranscript.generated';
import { useVideoContext } from '@js/common/video-player';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useTranscriptLanguage } from '@js/common/transcripts';
import { Language } from '@js/globalTypes.generated';
import { Language as TranscriptLanguage } from '@loomhq/shared-utilities/types/transcription';

export const useRegenerateTranscript = (source: string) => {
  const dispatch = useDispatch();
  const { setRetranscriptionStatus, resetTranscription } = useTranscriptStore();
  const [regenerateTranscript] = useRegenerateTranscriptMutation();
  const { language: transcriptLanguage } = useTranscriptLanguage();

  const {
    video: { id: videoId },
    setVideoProperties,
    setVideo,
  } = useVideoContext();

  return (newLanguage?: TranscriptLanguage): void => {
    const lang = (newLanguage ??
      transcriptLanguage ??
      Language.Unknown) as Language;

    analytics.track(
      TRANSCRIPTION_REGENERATE_CLICKED,
      withIdentifiers(
        TRANSCRIPTION_REGENERATE_CLICKED,
        AnalyticsEntityId.video(videoId, 'video_id')
      )
    );
    // Optimistically assume the transcription will start (avoid UI flicker). If
    //  it doesn't actually starts we revert to not-started.
    dispatch(updateRetranscriptionStatus(RetranscriptionStatus.STARTED));
    setRetranscriptionStatus(RetranscriptionStatus.STARTED);

    regenerateTranscript({
      variables: {
        videoId,
        language: lang,
        source: `ui_${source}`,
      },
      onCompleted: data => {
        // update successfully completed with expected result
        if (
          data.retranscribeVideo?.__typename === 'RetranscribeVideoPayload' &&
          data.retranscribeVideo.video
        ) {
          const video = data.retranscribeVideo.video;
          const trimId = video.processing_information.trim_id;
          const recordingVersion = video.video_properties
            .recording_version as string;

          // it may have been needed to convert the video to clips so we
          // should update the video with the latest info returned.
          setVideo({
            processingInformation: {
              trimId,
            },
          });

          setVideoProperties({
            recordingVersion,
          });

          // start waiting for the updated transcript
          dispatch(legacyResetTranscription());
          resetTranscription();

          // update completed with error and unexpected payload
        } else if (
          data.retranscribeVideo?.__typename !== 'RetranscribeVideoPayload' &&
          data.retranscribeVideo?.message
        ) {
          dispatch(
            updateRetranscriptionStatus(RetranscriptionStatus.NOT_STARTED)
          );
          setRetranscriptionStatus(RetranscriptionStatus.NOT_STARTED);
          logger.error(
            new Error(
              `Retranscribe request failed: ${data.retranscribeVideo.message}`
            ),
            {
              message: 'failed saving Data Retention settings',
            },
            { feature: Feature.TranscriptPanel }
          );
        }
      },

      onError: () => {
        dispatch(
          updateRetranscriptionStatus(RetranscriptionStatus.NOT_STARTED)
        );
        setRetranscriptionStatus(RetranscriptionStatus.NOT_STARTED);
      },
    });
  };
};
