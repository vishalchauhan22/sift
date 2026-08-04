import React from 'react';

import { Text, Container, Split } from '@loomhq/lens';
import {
  ConnectGoogleCalendar,
  ConnectMicrosoftOutlook,
} from '@js/common/calendar-integrations';
import {
  MeetingRecordingImage,
  MeetingRecordingAMNImage,
} from '@js/common/meeting-recordings';
import * as analytics from '@js/utilities/analytics';

import {
  CALENDAR_EMPTY_STATE_GOOGLE_CLICKED,
  CALENDAR_EMPTY_STATE_OUTLOOK_CLICKED,
} from './constants';

export const ConnectCalendar = ({
  hasAmnAccess,
}: {
  hasAmnAccess: boolean;
}): JSX.Element => {
  const handleCalendarConnectionChange = (connected: boolean) => {
    if (connected) {
      window.location.href = '/meetings/setup';
    }
  };

  const handleGoogleOnClick = () => {
    analytics.track(CALENDAR_EMPTY_STATE_GOOGLE_CLICKED);
  };
  const handleOutlookOnClick = () => {
    analytics.track(CALENDAR_EMPTY_STATE_OUTLOOK_CLICKED);
  };

  return (
    <Container maxWidth="647px" marginX="auto">
      {hasAmnAccess ? <MeetingRecordingAMNImage /> : <MeetingRecordingImage />}
      <Container marginY="xlarge" marginX="auto">
        <Split gap="medium" justifyContent="center">
          <Text alignment="center" size="heading-md" htmlTag="h1">
            Stay in the loop with meeting recordings
          </Text>
          <Container maxWidth="504px">
            <Text alignment="center" size="body-lg" color="bodyDimmed">
              Connect a calendar to record, take notes
              {hasAmnAccess && ' in Confluence'}, and send a meeting recap with
              Loom AI for meetings.
            </Text>
          </Container>
        </Split>
      </Container>
      <Split gap="medium" justifyContent="center">
        <ConnectGoogleCalendar
          variant="branded-primary"
          size="large"
          handleCalendarConnectionChange={handleCalendarConnectionChange}
          handleClick={handleGoogleOnClick}
        />

        <ConnectMicrosoftOutlook
          variant="branded-neutral"
          handleCalendarConnectionChange={handleCalendarConnectionChange}
          size="large"
          handleClick={handleOutlookOnClick}
        />
      </Split>
    </Container>
  );
};
