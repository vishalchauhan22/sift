import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

import { timeUtils } from '@loomhq/shared-utilities';

const { formatDateToHumanReadableString } = timeUtils;

type FormattedDateOptions = {
  showShorthand: boolean;
};

export const getFormattedDateForHeader = (
  createdAt: string | number | Date,
  options: FormattedDateOptions = { showShorthand: false }
): string => {
  const { showShorthand } = options;
  const dateToday = new Date();
  const dateCreatedAt = new Date(createdAt);

  if (showShorthand) {
    const diffInMinutes = differenceInMinutes(dateToday, dateCreatedAt, {
      roundingMethod: 'floor',
    });

    // less than 2 minutes
    if (diffInMinutes < 2) {
      return 'Just now';
    }

    // less than 1 hour
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    // less than 1 day
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    // less than equal to 1 week
    if (diffInDays <= 7) {
      return `${diffInDays}d`;
    }

    // return date if more than 1 week
    const humanReadableDate =
      formatDateToHumanReadableString(dateCreatedAt)?.split(',')[0];

    const yearCreatedAt = new Date(dateCreatedAt).getFullYear();

    if (yearCreatedAt !== dateToday.getFullYear()) {
      return `${humanReadableDate}, ${yearCreatedAt}`;
    }

    return humanReadableDate;
  }

  let result = formatDistanceStrict(dateCreatedAt, dateToday, {
    addSuffix: true,
    roundingMethod: 'floor',
  });

  if (result.includes('second')) {
    return 'now';
  }

  const diffInWeeks = differenceInWeeks(dateToday, dateCreatedAt);

  if (diffInWeeks >= 1 && differenceInMonths(dateToday, dateCreatedAt) < 1) {
    result = `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  return result;
};
