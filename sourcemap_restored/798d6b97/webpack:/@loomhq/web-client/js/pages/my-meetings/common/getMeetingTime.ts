import { CalendarMeeting } from '@js/globalTypes.generated';

/**
 * Returns a display friendly time
 *
 * @param time
 * @returns
 */
const stringifyTime = (time: Date): string => {
  return time
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .replace(' ', '')
    .toLowerCase();
};

/**
 * Returns a display friendly format for a meeting time
 *
 * @param meeting
 * @returns
 */
export const getMeetingTime = (meeting: CalendarMeeting): string => {
  const start = new Date(`${meeting.startTime}`);
  const startString = stringifyTime(start);

  if (meeting.durationMins) {
    const end = start.setMinutes(start.getMinutes() + meeting.durationMins);
    const endString = stringifyTime(new Date(end));
    return `${startString} – ${endString}`;
  }

  return startString;
};
