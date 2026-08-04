import { ConnectedServiceIntegrationEnumType } from '@js/globalTypes.generated';

import {
  GetCalendarsConnectedForUserQuery,
  useGetCalendarsConnectedForUserQuery,
} from './GetCalendarsConnectedForUser.generated';

const selectMeetingsData = (
  getCalendarMeetingsData: GetCalendarsConnectedForUserQuery | undefined
) => {
  const calendars = getCalendarMeetingsData?.me?.calendars ?? [];
  const googleCalendar = calendars.find(
    calendar =>
      calendar.integrationType === ConnectedServiceIntegrationEnumType.Gcal
  );
  const microsoftOutlook = calendars.find(
    calendar =>
      calendar.integrationType ===
      ConnectedServiceIntegrationEnumType.MicrosoftGraph
  );
  const microsoftOutlookConnected = Boolean(microsoftOutlook);
  const googleCalendarConnected = Boolean(googleCalendar);

  return { microsoftOutlookConnected, googleCalendarConnected };
};

export const useGetCalendarsConnected = (): {
  googleCalendarConnected: boolean;
  microsoftOutlookConnected: boolean;
} => {
  const { data: getCalendarMeetingsData } =
    useGetCalendarsConnectedForUserQuery();

  const { microsoftOutlookConnected, googleCalendarConnected } =
    selectMeetingsData(getCalendarMeetingsData);

  return {
    googleCalendarConnected,
    microsoftOutlookConnected,
  };
};
