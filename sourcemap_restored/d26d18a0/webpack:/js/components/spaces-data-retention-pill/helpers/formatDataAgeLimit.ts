import pluralize from 'pluralize';

import { SPACES_DATA_RETENTION_TYPES } from '@loomhq/shared-utilities/constants/dataRetention';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
const ONE_YEAR_IN_SECONDS = 365 * ONE_DAY_IN_SECONDS;

// Example: {type: 'Limit',  compact: '30d', expanded: '30 days'}
export type FormattedDataAgeLimit = {
  type: string;
  compact: string;
  expanded: string;
};

export const formatDataAgeLimit = (
  numOfSeconds: number
): FormattedDataAgeLimit => {
  if (numOfSeconds === -1) {
    return {
      type: SPACES_DATA_RETENTION_TYPES.INFINITE,
      compact: 'Forever',
      expanded: 'Forever',
    };
  }

  if (numOfSeconds !== 0 && numOfSeconds % ONE_YEAR_IN_SECONDS === 0) {
    const numOfYears = numOfSeconds / ONE_YEAR_IN_SECONDS;

    return {
      type: SPACES_DATA_RETENTION_TYPES.LIMIT,
      compact: `${numOfYears}y`,
      expanded: `${numOfYears} ${pluralize('year', numOfYears)}`,
    };
  }

  const numOfDays = Math.floor(numOfSeconds / ONE_DAY_IN_SECONDS);

  return {
    type: SPACES_DATA_RETENTION_TYPES.LIMIT,
    compact: `${numOfDays}d`,
    expanded: `${numOfDays} ${pluralize('day', numOfDays)}`,
  };
};
