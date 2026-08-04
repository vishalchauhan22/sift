/**
 * Formats a date into a unified standard for admin use as string.
 *
 * @param date - Date to format, either as a Date object or a date string.
 * @returns Formatted date string in the 'DD MMM YYYY, HH:mm:ss' format in UTC 24-hr time
 */

export const formatAdminDate = (date: Date): string => {
  return new Date(date).toLocaleString('en-GB', {
    timeZone: 'UTC',
    day: '2-digit', // Includes leading 0
    month: 'short', // Abbr month name (e.g., Sept)
    year: 'numeric', // 4-digit year
    hour: '2-digit', // Includes leading 0
    minute: '2-digit', // Includes leading 0
    second: '2-digit', // Includes leading 0
    hour12: false, //  24-hour time
  });
};

export const formatAdminTime = (date: Date, includeMillis = false): string => {
  const time = new Date(date).toLocaleString('en-GB', {
    timeZone: 'UTC',
    hour: '2-digit', // Includes leading 0
    minute: '2-digit', // Includes leading 0
    second: '2-digit', // Includes leading 0
    hour12: false, //  24-hour time
  });

  if (!includeMillis) {
    return time;
  }

  return time + '.' + date.getMilliseconds();
};
