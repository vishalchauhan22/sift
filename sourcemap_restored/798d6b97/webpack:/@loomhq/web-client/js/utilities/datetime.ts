import format from 'date-fns/format';

import * as logger from './loggerx';

import type { CalendarMeeting } from '../globalTypes.generated';

export const shortDateTime = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export const longDateTime = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const longMonthNumericDay = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});

export const longMonthNumericDayYear = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

/**
 * Wraps date-fns/format to catch errors and return an empty string
 */
export function safeDateFormat(...args: Parameters<typeof format>): string {
  try {
    return format(...args);
  } catch (e) {
    logger.warning(e, { message: 'Error formatting date', args });

    return '';
  }
}

export function getRelativeDateLabel(date: Date): string {
  // Today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const isToday = date >= startOfToday && date <= endOfToday;

  // Tomorrow
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  const endOfTomorrow = new Date(startOfTomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);
  const isTomorrow = date > endOfToday && date <= endOfTomorrow;

  // Yesterday
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const isYesterday = date >= startOfYesterday && date < startOfToday;

  // Determine the label based on the meeting date
  if (isToday) {
    return 'Today';
  } else if (isTomorrow) {
    return 'Tomorrow';
  } else if (isYesterday) {
    return 'Yesterday';
  }

  // All other past and future dates, show the date
  return date.toLocaleString('default', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
}

export function getMeetingDateLabel(meeting: CalendarMeeting): string {
  return getRelativeDateLabel(new Date(meeting.startTime));
}
