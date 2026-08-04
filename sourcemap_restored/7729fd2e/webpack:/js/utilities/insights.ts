import {
  format,
  startOfWeek,
  endOfWeek,
  sub,
  parse,
  startOfMonth,
  formatDistanceToNow,
} from 'date-fns';
import _sampleSize from 'lodash/sampleSize';
import pluralize from 'pluralize';

import {
  HubDateRange,
  ImpactfulVideoTypes,
} from '@loomhq/shared-utilities/constants/insights';

export const SEC_IN_MIN = 60;
export const MIN_IN_HOUR = 60;

export const getFormattedDateRange = (
  rangeType: keyof typeof HubDateRange,
  interval: number
): string => {
  const currentDate = new Date();
  let formattedDateRange;

  switch (rangeType) {
    case HubDateRange.WEEK:
      {
        const currentWeek = sub(currentDate, {
          weeks: interval,
        });

        formattedDateRange = `${format(
          startOfWeek(currentWeek),
          'M/d/yyyy'
        )} - ${format(endOfWeek(currentWeek), 'M/d/yyyy')}`;
      }

      break;
    case HubDateRange.MONTH:
      {
        const currentMonth = sub(currentDate, {
          months: interval,
        });

        formattedDateRange = format(currentMonth, 'MMMM');
      }
      break;
    default:
  }

  return formattedDateRange;
};
export const getFormattedDateRangeForToolTips = (
  rangeType: keyof typeof HubDateRange,
  startTime: string,
  endTime: string
): string => {
  let formattedDateRange;
  const parsedStartTime = parse(startTime, 'yyyy.M.dd', new Date());
  const parsedEndTime = parse(endTime, 'yyyy.M.dd', new Date());

  switch (rangeType) {
    case HubDateRange.MONTH:
      {
        formattedDateRange = `${format(parsedStartTime, 'LLLL d')} – ${format(
          parsedEndTime,
          'LLLL d'
        )}`;
      }

      break;
    case HubDateRange.WEEK:
      {
        formattedDateRange = format(parsedStartTime, 'LLLL d, yyyy');
      }
      break;
    default:
  }

  return formattedDateRange;
};
export const getDateLabels = (
  rangeType: keyof typeof HubDateRange,
  date: string
): string => {
  let label;

  switch (rangeType) {
    case HubDateRange.MONTH:
      label = format(parse(date, 'yyyy.MM.dd', new Date()), 'M/d');

      break;
    case HubDateRange.WEEK:
      label = format(parse(date, 'yyyy.MM.dd', new Date()), 'EEEEEE');
      break;
    default:
  }

  return label;
};
export const getMostAsyncDayCopy = (
  rangeType: keyof typeof HubDateRange,
  date: string
): string => {
  let copy;

  switch (rangeType) {
    case HubDateRange.MONTH:
      copy = `Week of ${format(
        parse(date, 'yyyy.M.dd', new Date()),
        'M/d'
      )} was a highlight.`;

      break;
    case HubDateRange.WEEK:
      copy = `${format(
        parse(date, 'yyyy.M.dd', new Date()),
        'eeee'
      )} was your most async day.`;
      break;
    default:
      'Become more async';
  }

  return copy;
};

export const randomizeImpactfulVideos = (
  cardContent: Record<string, any>
): Array<any> => {
  let videoList: Array<any> = [];

  Object.keys(ImpactfulVideoTypes).forEach(cardType => {
    if (cardContent?.[cardType]?.isValid) {
      videoList = videoList.concat(cardContent?.[cardType]?.videoList);
    }
  });
  videoList = _sampleSize(videoList, videoList.length);

  return videoList;
};

export const getImpactfulVideoStatement = (
  content: Record<string, any>,
  totalVideos: number
): string => {
  let statement;

  switch (content?.type) {
    case ImpactfulVideoTypes?.INFLUENTIAL:
      statement = `Your video helped ${pluralize(
        'person',
        content?.totalUniqueViews,
        true
      )}  stay in sync.`;
      break;
    case ImpactfulVideoTypes?.OLD_GEM:
      statement = `Here’s an old video that’s getting value.`;
      break;
    case ImpactfulVideoTypes?.ONE_ON_ONE_LOOP:
      statement = `Here are ${totalVideos?.toString()} ways you helped your team.`;
      break;
    case ImpactfulVideoTypes?.SINGLE_VIDEO:
      statement = `Time to celebrate your first view!`;
      break;
    default:
      statement = '';
  }

  return statement;
};
export const getImpactfulVideoRoiStatement = (
  content: Record<string, any>
): string => {
  let statement;

  switch (content?.type) {
    case ImpactfulVideoTypes?.INFLUENTIAL:
      {
        const timeSaved = getTimeSaved({
          videoViews: content?.totalViews,
          videoDuration: content?.videoDuration,
        });
        const timeSavedText = getTimeSavedText({ secondsSaved: timeSaved });

        statement = timeSavedText ? `${timeSavedText} saved` : '';
      }
      break;
    case ImpactfulVideoTypes?.OLD_GEM:
    case ImpactfulVideoTypes?.ONE_ON_ONE_LOOP:
    case ImpactfulVideoTypes?.SINGLE_VIDEO:
      statement = `${formatDistanceToNow(
        new Date(content?.createdDate * 1000)
      )} ago`;
      break;
    default:
      statement = '';
  }

  return statement;
};
export const getStartDateForInterval = (
  rangeType: keyof typeof HubDateRange,
  interval: number
): Date => {
  const currentDate = new Date();
  let startDate;

  switch (rangeType) {
    case HubDateRange.WEEK:
      {
        const currentWeek = sub(currentDate, {
          weeks: interval,
        });

        startDate = startOfWeek(currentWeek);
      }

      break;
    case HubDateRange.MONTH:
      {
        const currentMonth = sub(currentDate, {
          months: interval,
        });

        startDate = startOfMonth(currentMonth);
      }
      break;
    default:
  }

  return startDate;
};
export const getTimeSaved = ({
  videoViews,
  videoDuration, // duration in seconds
}: {
  videoViews: number;
  videoDuration: number;
}): number => {
  if (!videoViews || !videoDuration) {
    return 0;
  }

  const secondsSaved = (videoViews - 1) * videoDuration;

  return secondsSaved;
};
export const getTimeSavedText = ({
  secondsSaved,
}: {
  secondsSaved: number;
}): string => {
  let timeSavedText;
  const minsSaved = Math.round(secondsSaved / SEC_IN_MIN);
  const hoursSaved = Math.min(
    Math.round(secondsSaved / (SEC_IN_MIN * MIN_IN_HOUR)),
    80
  ); // Limit at 80 hours saved

  if (!minsSaved) {
    return '';
  }

  if (minsSaved < 60) {
    timeSavedText = `${minsSaved} ${pluralize('minute', minsSaved)}`;
  } else {
    timeSavedText = `${hoursSaved} ${pluralize('hour', hoursSaved)}`;
  }

  return timeSavedText;
};
