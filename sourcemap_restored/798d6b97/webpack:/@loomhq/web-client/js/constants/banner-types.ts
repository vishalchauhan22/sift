import format from 'date-fns/format';

const FORMAT_KEY = 'dd_MM_yy';

export const DOWNTIME_BANNER_KEY = 'loomDowntimeBanner';

export const DAILY_BANNER_KEYS = [DOWNTIME_BANNER_KEY];

export const getDowntimeDateVal = (): string => {
  return format(new Date(), FORMAT_KEY);
};

export const PERMISSION_BANNER_SHARE_PAGE = 'sharePage';
export const PERMISSION_BANNER_LIBRARY = 'library';
export const PERMISSION_BANNER_DESTINATION = 'destination';
