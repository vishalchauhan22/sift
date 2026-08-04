/* eslint-disable @loomhq/loom/no-js-extension */
import { timeUtils } from '@loomhq/shared-utilities';

const { secondsToLongVideoTS } = timeUtils;

const TenMinutesInSeconds = 600;
const OneHourInSeconds = 3600;

// Takes a timestamp in the form of seconds and returns in the form of
// H:MM:SS, MM:SS, or M:SS depending on the total video duration
export const formatTimeStamp = (seconds, duration) => {
  const timestamp = secondsToLongVideoTS(Math.round(seconds));

  // if duration is under ten minutes then return timestamp in form of M:SS
  // show transcripts by default experiment:
  // when duration is undefined (happens in the first few ms) -> we send the most likely possibility
  if (!duration || duration < TenMinutesInSeconds) {
    return timestamp.slice(4);
  }

  // if duration is over 10 minutes but under an hour then return
  // timestamp in the form of MM:SS
  if (duration < OneHourInSeconds) {
    return timestamp.slice(3);
  }

  // if duration is over an hour then return timestamp in the form of H:MM:SS
  return timestamp.slice(1);
};

export const shouldMutePlayerAtTarget = (target, ranges) => {
  const len = ranges.length;
  const emptyRanges = len < 1;

  if (emptyRanges) {
    return false;
  }

  const targetBeforeRanges = target < ranges[0][0];
  const targetAfterRanges = target > ranges[len - 1][1];

  // We should not mute at the current timestamp
  if (targetBeforeRanges || targetAfterRanges) {
    return false;
  }

  let low = 0;
  let high = len - 1;

  while (low <= high) {
    const mid = (low + (high - low) / 2) | 0;
    const lowerBound = ranges[mid][0];
    const upperBound = ranges[mid][1];

    if (lowerBound <= target && target <= upperBound) {
      return true;
    } else if (upperBound < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return false;
};
