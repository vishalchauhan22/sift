import Scopes from '@js/components/scopes';
import React from 'react';
import { CalendarMeeting } from '@js/globalTypes.generated';
import {
  MeetingPageTrackingNames,
  useMeetingRecorderHasAmnQuery,
  useGetMeetingNotesPageQuery,
} from '@js/common/meeting-recordings';
import {
  AMN_REFERRAL_SOURCES,
  AMN_REFERRAL_SOURCE_QUERY_PARAM,
} from '@loomhq/shared-utilities/constants/analyticsSources';
import { AI_POWERED_MEETING_NOTES_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';
import confluenceLogo from '@assets/img/logos/amn-confluence.svg';
import { Button, Split } from '@loomhq/lens';

type MeetingNotesButtonProps = {
  meeting: CalendarMeeting;
  workspaceId: string | null;
  source: MeetingPageTrackingNames | 'skip'; // 'skip' if you do not want to track. Currently only for admin tooling usage
};

export const MeetingNotesButton: React.FC<MeetingNotesButtonProps> = ({
  meeting,
  workspaceId,
  source,
}) => {
  // For future meetings, check if recorder has AMN access/enabled
  const { data: meetingRecorderHasAmn, loading: meetingRecorderHasAmnLoading } =
    useMeetingRecorderHasAmnQuery({
      variables: {
        recorderId: meeting.recorder?.id || '',
      },
      skip: !meeting.recorder?.id || meeting.past,
      fetchPolicy: 'cache-and-network',
    });

  // For past meetings, check if notes page exists
  const { data: meetingNotesPageData, loading: meetingNotesPageLoading } =
    useGetMeetingNotesPageQuery({
      variables: { videoId: meeting.videoId || '' },
      skip: !meeting.past || !meeting.videoId,
    });

  const { sendUiEvent } = useAnalytics();
  const referralSourceQueryParam = `${AMN_REFERRAL_SOURCE_QUERY_PARAM}=${AMN_REFERRAL_SOURCES.LOOM_MEETINGS}`;
  const handleAnalyticsOnClick = () => {
    sendUiEvent({
      action: 'clicked',
      actionSubject: 'link',
      actionSubjectId: 'meetingNotesInMeetingsPageLink',
      source,
    });
  };

  if (meetingRecorderHasAmnLoading || meetingNotesPageLoading) {
    return null;
  }

  const pastMeetingNotesPageUrl =
    meetingNotesPageData?.getVideo?.__typename === 'RegularUserVideo' &&
    meetingNotesPageData?.getVideo?.meetingNotesPage?.pageUrl;

  const showMeetingNotesButton = meeting.past
    ? Boolean(meeting.videoId && pastMeetingNotesPageUrl)
    : Boolean(
        meeting.recorder &&
          meetingRecorderHasAmn?.meetingRecorderHasAmn?.__typename ===
            'MeetingRecorderHasAmnPayload' &&
          meetingRecorderHasAmn?.meetingRecorderHasAmn?.eligible
      );

  const buttonHref =
    pastMeetingNotesPageUrl ||
    `/confluence-meeting-notes?meeting=${meeting.calendarMeetingId}&workspace=${workspaceId}&${referralSourceQueryParam}`;

  return showMeetingNotesButton ? (
    <Scopes name={AI_POWERED_MEETING_NOTES_ACCESS}>
      <Button onClick={handleAnalyticsOnClick} href={buttonHref} htmlTag="a">
        <Split gap="6px">
          <img src={confluenceLogo} alt="confluence logo" height={'24px'} />
          Open meeting notes
        </Split>
      </Button>
    </Scopes>
  ) : null;
};
