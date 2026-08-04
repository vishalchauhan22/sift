import { useConfirmationToast } from '@js/common/confirmation-toast';
import {
  selectWorkspaceId,
  useCurrentUserSelector,
} from '@js/common/current-user';
import { MeetingPageTrackingNames } from '@js/common/meeting-recordings';
import { defaultProfileData } from '@js/components/profile-bubble/types';
import { CalendarMeeting } from '@js/globalTypes.generated';
import { useGetMemberVideoLimits } from '@js/hooks/workspace';
import { getMeetingTime } from '@js/pages/my-meetings/common';
import { shouldShowMeetingSettings } from '@js/pages/my-meetings/utils';
import React, { SyntheticEvent, useEffect, useState, useId } from 'react';
import { useIsPublicSharingAllowed } from '@js/utilities/contentPrivacy';
import { reactLazyRetry } from '@js/utilities/reactLazyRetry';
import { MeetingNotesButton } from './MeetingNotesButton';
import { RecordingStatus } from './recording-status';

import {
  Arrange,
  Container,
  IconButton,
  Link,
  Spacer,
  Split,
  SplitSection,
  Switch,
  Text,
  Tooltip,
} from '@loomhq/lens';
import { SvgSettings } from '@loomhq/lens/icons/settings';

import { useToggleCalendarMeetingMutation } from './ToggleCalendarMeeting.generated';
import styles from './styles.module.css';

interface MeetingProps {
  meeting: CalendarMeeting;
  emailDomains: string[];
  readOnly?: boolean;
  openModalForMeetingGuid: string | number | null;
  setOpenModalForMeetingGuid: (
    calendarMeetingGuid: string | number | null
  ) => void;
  onCloseModal?: () => void;
  // 'skip' if you do not want to track. Currently only for admin tooling usage
  source: MeetingPageTrackingNames | 'skip';
}

const MeetingShareModal = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "MeetingShareModal" */ '@js/pages/my-meetings/meeting-share-modal'
  ).then(module => ({ default: module.MeetingShareModal }))
);

export const Meeting = ({
  meeting,
  emailDomains,
  readOnly = false,
  openModalForMeetingGuid,
  setOpenModalForMeetingGuid,
  source,
  onCloseModal,
}: MeetingProps): JSX.Element => {
  const [isUpcomingMeeting, setIsUpcomingMeeting] = useState(false);
  const meetingTitleId = useId();

  const workspaceId = useCurrentUserSelector(selectWorkspaceId, null);
  const publicSharingAllowed = useIsPublicSharingAllowed({ workspaceId });

  const memberVideoLimits = useGetMemberVideoLimits();

  const { setShowConfirmationToast } = useConfirmationToast();

  useEffect(() => {
    const meetingStartTime: Date = new Date(`${meeting.startTime}`);
    const currentTime: Date = new Date();

    const diffInMs: number = meetingStartTime.getTime() - currentTime.getTime();
    const diffInMins: number = diffInMs / 60000;

    if (!meeting.past && diffInMins < 30) {
      setIsUpcomingMeeting(true);
    } else {
      setIsUpcomingMeeting(false);
    }
  }, [meeting.past, meeting.startTime]);

  // TODO: handle loading and error states
  const [toggleCalendarMeetingMutation] = useToggleCalendarMeetingMutation();

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const currentUser = useCurrentUserSelector(user => user, defaultProfileData);
  const currentUserId = currentUser.id.toString();
  const ERROR_MESSAGE = `There was an error saving this meeting`;

  const toggleRecord = (event: SyntheticEvent) => {
    const recordMeeting = (event.target as HTMLInputElement).checked;
    toggleCalendarMeetingMutation({
      variables: {
        input: {
          calendarMeetingGuid: meeting.calendarMeetingGuid,
          record: recordMeeting,
          timeZone,
        },
      },
      onError() {
        // TODO: Replace with localised error text
        // Toasts should be for successes only
        setShowConfirmationToast(ERROR_MESSAGE);
      },
      onCompleted(data) {
        if (
          data.toggleCalendarMeeting &&
          (data.toggleCalendarMeeting.__typename !==
            'ToggleCalendarMeetingPayload' ||
            !data?.toggleCalendarMeeting?.success)
        ) {
          // TODO: Replace with localised error text
          // Toasts should be for successes only
          setShowConfirmationToast(ERROR_MESSAGE);
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        toggleCalendarMeeting: {
          __typename: 'ToggleCalendarMeetingPayload',
          success: true,
          meetings: [
            // @ts-expect-error - we just pass the attributes actually used by the query
            {
              ...meeting,
              automationsOverridden: true,
              record: recordMeeting,
              recorder: recordMeeting
                ? { __typename: 'RegularUser', id: currentUserId }
                : null,
              __typename: 'CalendarMeeting',
            },
          ],
        },
      },
    });
  };

  const { first_name, last_name } = meeting.organizer || {};
  const organizerName: string =
    first_name && last_name
      ? `${first_name} ${last_name}`.trim()
      : meeting.organizerEmail || 'unknown';

  const organizerViewing = meeting.organizer?.id == currentUserId;
  const otherUserRecording =
    meeting.recorder && meeting.recorder.id != currentUserId;
  const pastMeeting = meeting.past || meeting.videoId;

  const showMeetingSettings = shouldShowMeetingSettings(meeting, currentUserId);

  return (
    <Container
      borderSide="all"
      borderWidth="1px"
      className={styles.meetingWrapper}
      marginTop="16px"
      padding="20px"
      radius="xlarge"
    >
      <Split
        alignItems={{ default: 'flex-start', small: 'center' }}
        gap="medium"
        wrap="nowrap"
      >
        <SplitSection grow={1} shrink={1} basis={0} minWidth={0}>
          <Split
            alignItems={{ default: 'flex-start', small: 'center' }}
            direction={{ default: 'column', small: 'row' }}
            columnGap="44px"
            rowGap={showMeetingSettings ? '12px' : 'small'}
            justifyContent="space-between"
            wrap={{ default: 'wrap', medium: 'nowrap' }}
          >
            <SplitSection grow={1} shrink={1} basis={0} minWidth={0}>
              <div>
                <Split>
                  {meeting.past ? (
                    <Text
                      color="bodyDimmed"
                      variant="title"
                      hasEllipsis
                      ellipsisLines={2}
                      id={meetingTitleId}
                    >
                      {meeting.title}
                    </Text>
                  ) : (
                    <Text
                      variant="title"
                      hasEllipsis
                      ellipsisLines={2}
                      id={meetingTitleId}
                    >
                      <a
                        href={`${meeting.url}`}
                        className={styles.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {meeting.title}
                      </a>
                    </Text>
                  )}
                </Split>
                <Spacer top="small" />
                <Split alignItems="center" rowGap={0} columnGap="small">
                  <Text color="bodyDimmed">{getMeetingTime(meeting)}</Text>
                  {!organizerViewing ? (
                    <>
                      <Text color="bodyDimmed">·</Text>
                      <Arrange justifyContent="stretch" maxWidth="400px">
                        <Text color="bodyDimmed" hasEllipsis>
                          Owned by {organizerName}
                        </Text>
                      </Arrange>
                    </>
                  ) : null}
                  {meeting.hasExternalParticipants ? (
                    <>
                      <Text color="bodyDimmed">·</Text>
                      <Tooltip
                        content="This meeting includes participants from outside of your organization"
                        placement="topCenter"
                      >
                        <Text color="bodyDimmed" hasEllipsis>
                          External
                        </Text>
                      </Tooltip>
                    </>
                  ) : null}
                  {meeting.url && isUpcomingMeeting && !meeting.videoId && (
                    <>
                      <Text color="bodyDimmed">·</Text>
                      <Link href={meeting.url} target="_blank">
                        Join meeting
                      </Link>
                    </>
                  )}
                </Split>
              </div>
            </SplitSection>
            <SplitSection grow={0} shrink={0}>
              <Split columnGap="12px">
                <Arrange gap="12px" justifyContent="stretch">
                  {showMeetingSettings && (
                    <IconButton
                      className={styles.meetingSettingsMenu}
                      altText={`Meeting settings: ${meeting.title}`}
                      icon={<SvgSettings />}
                      onClick={() =>
                        setOpenModalForMeetingGuid(meeting.calendarMeetingGuid)
                      }
                    />
                  )}
                  <MeetingNotesButton
                    meeting={meeting}
                    workspaceId={workspaceId}
                    source={source}
                    meetingTitleId={meetingTitleId}
                  />

                  <RecordingStatus
                    meeting={meeting}
                    currentUserId={currentUserId}
                    source={source}
                    meetingTitleId={meetingTitleId}
                  />
                </Arrange>
              </Split>
            </SplitSection>
          </Split>
        </SplitSection>
        <SplitSection shrink={0} grow={0}>
          {!pastMeeting && (
            <Tooltip
              isDisabled={!memberVideoLimits.exceededLimit}
              placement="topCenter"
              content="You’ve hit your limit of free videos so this meeting won’t be recorded."
            >
              <Switch
                size="large"
                ariaLabel="Record this meeting"
                isActive={Boolean(meeting.recorder)}
                onChange={!readOnly ? toggleRecord : undefined}
                isDisabled={
                  otherUserRecording || memberVideoLimits.exceededLimit
                }
                readOnly={readOnly}
              />
            </Tooltip>
          )}
        </SplitSection>
      </Split>
      <MeetingShareModal
        meeting={meeting}
        emailDomains={emailDomains}
        onClose={() => {
          setOpenModalForMeetingGuid(null);
          onCloseModal?.();
        }}
        open={
          showMeetingSettings &&
          openModalForMeetingGuid === meeting.calendarMeetingGuid
        }
        publicSharingAllowed={publicSharingAllowed}
        readOnly={readOnly}
      />
    </Container>
  );
};
