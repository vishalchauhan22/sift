/**
 * Displays the status of a meeting recording:
 *
 * Post-meeting
 * - Recorded: Shows View recording button
 * - Not recorded: Displays "Not recorded" text
 *
 * Pre-meeting
 * - Current user recording: Displays "External meeting" or "Internal meeting" label
 * - Other user recording: Displays recorder's name. If the current user is the organizer, displays "Claim meeting" link
 *
 */
import React from 'react';
import {
  Button,
  Container,
  Icon,
  Link,
  Split,
  Text,
  Arrange,
} from '@loomhq/lens';
import { SvgZapOutline } from '@loomhq/lens/icons/zap-outline';
import { useClaimCalendarMeetingRecordingMutation } from './ClaimCalendarMeetingRecording.generated';
import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';

import { MeetingPageTrackingNames } from '@js/common/meeting-recordings';
import { CalendarMeeting } from '@js/globalTypes.generated';

type RecordingStatusProps = {
  meeting: CalendarMeeting;
  currentUserId: string;
  source: MeetingPageTrackingNames | 'skip'; // 'skip' if you do not want to track. Currently only for admin tooling usage
};

export const RecordingStatus: React.FC<RecordingStatusProps> = ({
  meeting,
  currentUserId,
  source,
}) => {
  const [claimCalendarMeetingRecording] =
    useClaimCalendarMeetingRecordingMutation();
  const { sendUiEvent } = useAnalytics();

  const claimMeeting = () => {
    claimCalendarMeetingRecording({
      variables: { calendarMeetingId: meeting.id },
      update: cache => {
        cache.modify({
          id: cache.identify(meeting),
          fields: {
            record() {
              return true;
            },
            recorder() {
              return { __typename: 'RegularUser', id: currentUserId };
            },
          },
        });
      },
    });
  };

  const handleAnalyticsOnClick = () => {
    sendUiEvent({
      action: 'clicked',
      actionSubject: 'link',
      actionSubjectId: 'viewRecordingLink',
      source,
    });
  };

  const currentUserRecording =
    meeting.recorder && meeting.recorder.id === currentUserId;
  const otherUserRecording =
    meeting.recorder && meeting.recorder.id !== currentUserId;
  const organizerViewing = meeting.organizer?.id === currentUserId;
  const recorderName = meeting.recorder
    ? `${meeting.recorder.first_name} ${meeting.recorder.last_name}`
    : '';

  const pastMeeting = meeting.past || meeting.videoId;
  if (pastMeeting) {
    if (meeting.videoId) {
      return (
        <Button
          onClick={handleAnalyticsOnClick}
          href={`/share/${meeting.videoId}`}
          htmlTag="a"
        >
          View recording
        </Button>
      );
    } else if (!meeting.recorder) {
      return <Text color="bodyDimmed">Not recorded</Text>;
    }
  } else {
    if (
      currentUserRecording &&
      !meeting.automationsOverridden &&
      meeting.owned
    ) {
      return (
        <Container
          backgroundColor="blurpleLight"
          paddingLeft={1.5}
          paddingRight="medium"
          paddingY="7px"
          radius="100"
        >
          <Split gap="6px">
            <Icon color="blurple" size={2.5} icon={<SvgZapOutline />} />
            <Text color="blurple">
              {meeting.hasExternalParticipants
                ? 'External meeting'
                : 'Internal meeting'}
            </Text>
          </Split>
        </Container>
      );
    } else if (otherUserRecording && organizerViewing) {
      return (
        <Split direction="column" alignItems="flex-end">
          <Arrange
            justifyContent="stretch"
            maxWidth={{ default: '380px', medium: '200px', large: '350px' }}
          >
            <Text hasEllipsis color="bodyDimmed">
              {recorderName}
            </Text>
            <Text color="bodyDimmed">&nbsp;recording</Text>
          </Arrange>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link htmlTag="button" onClick={claimMeeting}>
            Claim meeting
          </Link>
        </Split>
      );
    } else if (otherUserRecording) {
      return (
        <Arrange
          justifyContent="stretch"
          maxWidth={{ default: '380px', medium: '200px', large: '350px' }}
        >
          <Text hasEllipsis color="bodyDimmed">
            {recorderName}
          </Text>
          <Text color="bodyDimmed">&nbsp;recording</Text>
        </Arrange>
      );
    }
  }

  return null;
};
