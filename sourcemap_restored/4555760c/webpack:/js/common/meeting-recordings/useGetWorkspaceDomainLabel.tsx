import { calendarMeetingsRange } from '@loomhq/shared-utilities/utilities/calendarMeetings';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { useGetCalendarMeetingsQuery } from '@js/pages/my-meetings/GetCalendarMeetings.generated';

import { parseDataFromCalendarMeetingsQuery } from '@js/pages/my-meetings/utils';

// TODO: this should be replaced by a query that doesn't need to call the
// calendars API
const useGetWorkspaceEmailDomains = (): string[] => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const { rangeStart, rangeEnd } = calendarMeetingsRange(timeZone, 0);
  const { data: getCalendarMeetingsData } = useGetCalendarMeetingsQuery({
    variables: { rangeStart, rangeEnd },
    fetchPolicy: `cache-and-network`,
    nextFetchPolicy: `cache-first`,
  });
  const { emailDomains } = parseDataFromCalendarMeetingsQuery(
    getCalendarMeetingsData
  );

  return emailDomains;
};

export const useGetWorkspaceDomainLabel = ({
  isTooltip = false,
}: {
  isTooltip?: boolean;
} = {}): string => {
  const emailDomains = useGetWorkspaceEmailDomains();
  const currentWorkspace = useGetSelectedWorkspace();

  const emailDomainsDisplayStr = emailDomains
    .map(value => `@${value}`)
    .join(',');

  /* Anything in <brackets> is optional/conditional.
   * <Meetings you own, where> All invitees are in the <ACME> workspace <or have an @acme.com email><.>
   */

  const optionalWorkspaceName = currentWorkspace.name
    ? ` ${currentWorkspace.name}`
    : '';
  // Prefix for tooltip only
  const prefix = isTooltip ? 'Meetings you own, where all' : 'All';
  const optionalEmailClause = emailDomainsDisplayStr
    ? `or have an
          ${emailDomainsDisplayStr} email`
    : '';

  // No period for tooltip
  const punctuation = isTooltip ? '' : '.';

  return `${prefix} invitees are in the${optionalWorkspaceName} workspace ${optionalEmailClause}${punctuation}`;
};
