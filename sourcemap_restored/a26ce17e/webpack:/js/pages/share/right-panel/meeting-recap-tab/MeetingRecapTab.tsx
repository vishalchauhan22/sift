import { SUPPORTED_REGENERATION_TYPES } from '@loomhq/shared-utilities/constants/meetingRecordings';
import { MeetingTypeEnum } from '@loomhq/shared-utilities/constants/videoProperties';

import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';
import { useAutoSummaryAi } from '@js/common/intelligence';
import { useRegenerateMeetingRecapMutation } from '@js/common/meeting-recordings/meeting/RegenerateMeetingRecap.generated';
import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import { useVideoContext } from '@js/common/video-player';

import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';

import React, { useEffect, useState } from 'react';

import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';

import { Container } from '@loomhq/lens';

import { IntelligenceStatusType } from '@js/globalTypes.generated';

import { ActionItems } from './ActionItems';
import { useGetMeetingRecapVideoQuery } from './GetMeetingRecapVideo.generated';
import { MeetingRecordingCta } from './MeetingRecordingCta';
import { MeetingRecapHeader } from './MeetingRecapHeader';
import { MeetingSummary } from './MeetingSummary';
import { MeetingSummaryError } from './MeetingSummaryError';
import { RecapLoader } from './RecapLoader';
import { Resources } from './Resources';

export const MeetingRecapTab = (): JSX.Element => {
  const {
    video: { id: videoId, organizationId: workspaceId },
  } = useVideoContext();

  const { password } = useVideoPasswordContext();

  const { sendUiEvent, sendTrackEvent } = useAnalytics();

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });
  const currentUserIsOwner = useCurrentUserIsOwner({ videoId });

  const autoSummaryAi = useAutoSummaryAi({
    isOwnerAfterRecording,
  });

  const { data, loading, refetch } = useGetMeetingRecapVideoQuery({
    variables: { videoId, password },
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (
        data?.getVideo?.__typename === 'RegularUserVideo' &&
        !(isAwaitingRegeneration || isGeneratingSummary)
      ) {
        setDescription(data?.getVideo?.description);

        if (
          data?.getVideo?.meetingRecordingInfo?.__typename ===
            'MeetingRecordingInfo' &&
          !meetingSummaryType
        ) {
          setMeetingSummaryType(
            data?.getVideo?.meetingRecordingInfo?.meetingType as MeetingTypeEnum
          );
        }
      }
    },
  });

  const [description, setDescription] = useState<string | null>(null);
  const [isAwaitingRegeneration, setIsAwaitingRegeneration] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetingSummaryType, setMeetingSummaryType] =
    useState<MeetingTypeEnum>();

  useEffect(() => {
    // Sets error if the auto features query has no data or errored while regenerating the summary
    if (
      !autoSummaryAi.autoSummary &&
      !autoSummaryAi.autoSummaryStatus &&
      (isAwaitingRegeneration || isGeneratingSummary)
    ) {
      setError('Auto summary generation failed');
      setIsAwaitingRegeneration(false);
      setIsGeneratingSummary(false);
    }
    //  Refetches the video information after the summary description has been successfully regenerated
    else if (
      autoSummaryAi.autoSummaryStatus === IntelligenceStatusType.Pending &&
      isAwaitingRegeneration
    ) {
      setIsAwaitingRegeneration(false);
      setIsGeneratingSummary(true);
    } else if (
      autoSummaryAi.autoSummaryStatus !== IntelligenceStatusType.Pending &&
      isGeneratingSummary
    ) {
      sendTrackEvent({
        action: 'success',
        actionSubject: 'meetingRecordingsRegenerateRecap',
        source: 'meetingRecapTab',
        attributes: {
          videoId,
          organizationId: workspaceId,
          template: meetingSummaryType,
        },
      });
      refetch();
      setIsGeneratingSummary(false);
    }
  }, [
    autoSummaryAi.autoSummary,
    autoSummaryAi.autoSummaryStatus,
    isAwaitingRegeneration,
    isGeneratingSummary,
    meetingSummaryType,
    refetch,
    sendTrackEvent,
    workspaceId,
    videoId,
  ]);

  let playableDuration: number | null = 0;
  if (data?.getVideo?.__typename === 'RegularUserVideo') {
    playableDuration = data?.getVideo?.playable_duration ?? 0;
  }

  const [regenerateMeetingRecap] = useRegenerateMeetingRecapMutation();

  const handleMeetingSummaryTypeClick = async (
    meetingType: MeetingTypeEnum
  ) => {
    if (meetingSummaryType !== meetingType) {
      setMeetingSummaryType(meetingType);
      const { data } = await regenerateMeetingRecap({
        variables: { videoId, meetingType },
      });

      if (
        data &&
        data.regenerateMeetingRecap?.__typename ===
          'RegenerateMeetingRecapPayload'
      ) {
        if (
          data.regenerateMeetingRecap.regenerateMeetingRecap?.success === true
        ) {
          setIsAwaitingRegeneration(true);
        } else {
          setError(
            data.regenerateMeetingRecap.regenerateMeetingRecap?.message ??
              'Meeting recap regeneration failed'
          );
        }
      }
    }

    sendUiEvent({
      action: 'clicked',
      actionSubject: 'meetingRecordingsTemplate',
      attributes: {
        videoId,
        organizationId: workspaceId,
        template: meetingType,
      },
      source: 'meetingRecapTab',
    });
  };

  const meetingSummaryOptions = Array.from(
    SUPPORTED_REGENERATION_TYPES.entries()
  ).map(([key, value]) => ({
    title: value,
    onClick: () => handleMeetingSummaryTypeClick(key),
    selected: meetingSummaryType === key,
  }));

  const isLoading =
    loading ||
    isAwaitingRegeneration ||
    isGeneratingSummary ||
    autoSummaryAi.isWaiting;
  const hitAutoSummaryLimit =
    !autoSummaryAi.autoSummary && !autoSummaryAi.autoSummaryStatus && !error;

  return (
    <Container padding="large">
      <MeetingRecordingCta
        showCta={(!description || hitAutoSummaryLimit) && !isLoading}
      />

      {description && (
        <Container position="relative" paddingTop="small" paddingX="small">
          <MeetingRecapHeader
            videoId={videoId}
            workspaceId={workspaceId}
            hasRegenerationAccess={currentUserIsOwner}
            meetingSummaryType={meetingSummaryType}
            meetingSummaryOptions={meetingSummaryOptions}
            isLoading={isLoading}
            hasErrored={Boolean(error)}
          />

          {isLoading ? (
            <RecapLoader />
          ) : error ? (
            <MeetingSummaryError videoId={videoId} workspaceId={workspaceId} />
          ) : (
            <Container>
              {autoSummaryAi.hasAccess ? (
                <>
                  <Resources />
                  <ActionItems videoId={videoId} />
                </>
              ) : null}
              <>
                <MeetingSummary
                  description={description}
                  playableDuration={playableDuration}
                  videoId={videoId}
                  workspaceId={workspaceId}
                  meetingSummaryType={meetingSummaryType}
                />
                {autoSummaryAi.isExpected && isOwnerAfterRecording && (
                  <SuccessMarker name={AiFeatureMarkers.AutoSummary} />
                )}
              </>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
};
