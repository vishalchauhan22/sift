import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { GetPaginatedCalendarMeetingsQuery } from '../GetPaginatedCalendarMeetings.generated';
import { calendarMeetingsRange } from '@loomhq/shared-utilities/utilities/calendarMeetings';
import { getRelativeDateLabel } from '@js/utilities/datetime';
import {
  ConnectedServiceIntegrationEnumType,
  CalendarInfo,
  CalendarMeeting,
} from '@js/globalTypes.generated';

import {
  useGetCalendarMeetingsQuery,
  GetCalendarMeetingsQuery,
} from '../GetCalendarMeetings.generated';

export const GetEmailDomains = (): Array<string> => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const { rangeStart, rangeEnd } = calendarMeetingsRange(timeZone);
  const { data: getCalendarMeetingsData } = useGetCalendarMeetingsQuery({
    variables: { rangeStart, rangeEnd },
  });

  return getCalendarMeetingsData?.me?.calendars?.[0]?.emailDomains ?? [];
};

export const workspaceDomainWording = (): string => {
  const emailDomains = GetEmailDomains();

  return emailDomains.length > 1
    ? `${emailDomains.map(e => `@${e}`).join(', ')} emails`
    : `an @${emailDomains[0]} email`;
};

export const GetWorkspaceName = (): string => {
  const { name: workspaceName } = useGetSelectedWorkspace();
  return workspaceName;
};

export const parseDataFromCalendarMeetingsQuery = (
  data: GetCalendarMeetingsQuery | undefined
): {
  calendars: CalendarInfo[];
  meetings: CalendarMeeting[];
  googleCalendar: CalendarInfo | undefined;
  microsoftOutlook: CalendarInfo | undefined;
  emailDomains: string[];
} => {
  const calendars = (data?.me?.calendars ?? []) as CalendarInfo[];
  const googleCalendar = calendars.find(
    calendar =>
      calendar.integrationType === ConnectedServiceIntegrationEnumType.Gcal
  );
  const microsoftOutlook = calendars.find(
    calendar =>
      calendar.integrationType ===
      ConnectedServiceIntegrationEnumType.MicrosoftGraph
  );
  const meetings = (calendars
    .flatMap(c => c.meetings)
    .sort(
      (a, b) =>
        new Date(a?.startTime ?? 0).getTime() -
        new Date(b?.startTime ?? 0).getTime()
    ) || []) as CalendarMeeting[];
  const emailDomains = data?.me?.calendars?.[0]?.emailDomains ?? [];
  return {
    calendars,
    meetings,
    googleCalendar,
    microsoftOutlook,
    emailDomains,
  };
};

export const parsePaginatedDataFromCalendarMeetingsQuery = (
  data: GetPaginatedCalendarMeetingsQuery | undefined
): {
  calendars: CalendarInfo[];
  meetings: CalendarMeeting[];
  googleCalendar: CalendarInfo | undefined;
  microsoftOutlook: CalendarInfo | undefined;
  emailDomains: string[];
  hasNextPage: boolean;
  endCursor?: string;
} => {
  const calendars = (data?.me?.calendars ?? []) as CalendarInfo[];
  const googleCalendar = calendars.find(
    calendar =>
      calendar.integrationType === ConnectedServiceIntegrationEnumType.Gcal
  );
  const microsoftOutlook = calendars.find(
    calendar =>
      calendar.integrationType ===
      ConnectedServiceIntegrationEnumType.MicrosoftGraph
  );

  const meetings = calendars.flatMap(
    c =>
      c.paginatedMeetings?.edges?.flatMap(edge =>
        edge?.node ? [edge.node] : []
      ) || []
  ) as CalendarMeeting[];

  // If any of the calendars has next page
  const hasNextPage = calendars.some(
    calendar => calendar.paginatedMeetings?.pageInfo?.hasNextPage ?? false
  );

  // Pick first non-null endCursor from the calendars
  // While this isn't perfect for multiple calendars usage,
  // which is low-usage, it ensures we have a valid endCursor. We may need to adjust
  const endCursor = calendars.reduce<string | undefined>((acc, calendar) => {
    const cursor = calendar.paginatedMeetings?.pageInfo?.endCursor;
    return acc ?? (cursor !== null ? cursor : undefined);
  }, undefined);

  const emailDomains = data?.me?.calendars?.[0]?.emailDomains ?? [];

  return {
    calendars,
    meetings,
    googleCalendar,
    microsoftOutlook,
    emailDomains,
    hasNextPage,
    endCursor,
  };
};

type GroupedMeeting = { day: string; meetings: CalendarMeeting[] };

/**
 * Returns array of meetings grouped by day in the order of the sortOrder
 *
 * sortOrder options:
 *   asc = oldest first
 *   desc = newest first
 */
export function sortAndGroupMeetingsByDay(
  meetings: CalendarMeeting[],
  sortOrder: 'asc' | 'desc'
): GroupedMeeting[] {
  // Sort meetings by start time so they are in order __within__ the day groupings
  // Meetings __within___ a day should always be ascending
  const sortedMeetings = meetings.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  // Group meetings by actual date
  const groupedMeetings: Record<string, CalendarMeeting[]> = {};
  sortedMeetings.forEach(meeting => {
    const day = new Date(meeting.startTime);

    // Skip meetings with invalid dates
    if (isNaN(day.getTime())) {
      return;
    }

    day.setHours(0, 0, 0, 0);
    const key = day.toISOString();

    if (!groupedMeetings[key]) {
      groupedMeetings[key] = [];
    }

    groupedMeetings[key].push(meeting);
  });

  const sortedDaysWithLabels = Object.keys(groupedMeetings).sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a).getTime() - new Date(b).getTime()
      : new Date(b).getTime() - new Date(a).getTime();
  });

  return sortedDaysWithLabels.map(day => ({
    day: getRelativeDateLabel(new Date(day)),
    meetings: groupedMeetings[day],
  }));
}
