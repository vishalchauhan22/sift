import { trimmingUtils } from '@loomhq/shared-utilities';

interface TrimRange {
  from: number;
  to: number;
  id?: string;
}

interface BoundingRange {
  from: number;
  to: number;
}

interface ProcessingInformation {
  trim_id?: string | null;
  trim_progress?: number;
  instant_editing_enabled?: boolean;
}

interface Video {
  processing_information?: ProcessingInformation | null;
}

const DEFAULT_TRIM_RANGE_LENGTH = 0.2; // percentage (20%) of video

const {
  convertTrimTimeToFullTime,
  convertFullTimeToTrimTime,
  getTrimVideoDuration,
  isElementInsideRange,
} = trimmingUtils;

export {
  convertTrimTimeToFullTime,
  convertFullTimeToTrimTime,
  getTrimVideoDuration,
  isElementInsideRange,
};

// given a current trim range, the array of all other trim ranges, duration of
// the video, and an optional time padding for the bounds, return a bounding
// range that doesn't allow the current trim range to extend into other ranges
// or exceed the time bounds of the video
//
// all times are in *milliseconds*
export const getBoundingRange = (
  currentTrimRange: TrimRange,
  trimRanges: TrimRange[],
  duration: number,
  padding = 1
): BoundingRange => {
  const boundingRange = { from: 0, to: duration };

  // find the bounds for this trim range
  // {
  //    from: `0` or the closest `to` segment + <padding>
  //    to:   `duration` of video or the closest `from` segment + <padding>
  // }
  trimRanges.some(trimRange => {
    if (trimRange.to <= currentTrimRange.from) {
      boundingRange.from = trimRange.to + padding;
    }

    if (trimRange.from >= currentTrimRange.to) {
      boundingRange.to = trimRange.from - padding;

      return true;
    }
  });

  return boundingRange;
};

// given a current time, new time, duration of the video, and an array of trim
// ranges, give a new time by skipping over any ranges
//
// expects: currentTime, newTime, and duration to be in *milliseconds*
// expects: trimRanges to take the form { from: milliseconds, to: milliseconds }
// returns: time in seconds
export const getNewTimeSkipRanges = (
  currentTime: number,
  newTime: number,
  duration: number,
  trimRanges: TrimRange[],
  currentTrimRange: TrimRange | null,
  checkMedian = false
): number => {
  let newTimeToReturn = newTime;

  const currentTrimRangeId =
    currentTrimRange != null ? currentTrimRange.id : null;
  const movingLeft = newTime < currentTime;

  for (const trimRange of trimRanges) {
    if (
      currentTrimRangeId === trimRange.id ||
      trimRange.from >= newTime ||
      trimRange.to <= newTime
    ) {
      continue;
    }

    // initialize the new time to be to the left or right of the closest trim
    // range
    newTimeToReturn = !movingLeft ? trimRange.from - 1 : trimRange.to + 1;

    const overTrimMedian = newTime > (trimRange.from + trimRange.to) / 2;

    // skip over the range
    if (!movingLeft && (!checkMedian || overTrimMedian)) {
      if (trimRange.to >= duration) {
        newTimeToReturn = trimRange.from - 1;
      } else {
        newTimeToReturn = trimRange.to + 1;
      }
    } else if (!movingLeft && (!checkMedian || !overTrimMedian)) {
      if (trimRange.from <= 0) {
        newTimeToReturn = trimRange.to + 1;
      } else {
        newTimeToReturn = trimRange.from - 1;
      }
    }
  }

  return newTimeToReturn;
};

export const waitingForTrim = (video: Video): boolean => {
  const { processing_information: processingInformation } = video;

  if (processingInformation == null) {
    return false;
  }
  const {
    trim_id: trimId,
    trim_progress: trimProgress,
    instant_editing_enabled: instantEditingEnabled,
  } = processingInformation;

  return !instantEditingEnabled && trimId != null && trimProgress !== 100;
};

// give a current time, duration of the video and the trim ranges, create a
// suitable trim range at the current time
//
// all times in *milliseconds*
export const createCurrentTrimRange = (
  currentTime: number,
  duration: number,
  trimRanges: TrimRange[]
): TrimRange => {
  let currentTrimRangeStart = currentTime;
  let currentTrimRangeEnd: number;

  let trimRangeAfterStart: TrimRange | null = null;
  let trimRangeBeforeStart: TrimRange | null = null;

  trimRanges.some(trimRange => {
    if (trimRange.to <= currentTrimRangeStart) {
      trimRangeBeforeStart = trimRange;
    }

    if (trimRange.from > currentTrimRangeStart) {
      trimRangeAfterStart = trimRange;

      return true;
    }
  });

  // end the trim segment as either 10% from this current point, the end
  // of the video, or the beginning of the next trim segment
  currentTrimRangeEnd = Math.min(
    currentTrimRangeStart + duration * DEFAULT_TRIM_RANGE_LENGTH,
    duration,
    trimRangeAfterStart?.['from'] ? trimRangeAfterStart['from'] - 1 : duration
  );

  // check to see if the range is right at the end and empty
  // if so, try to extend it backwards
  if (
    currentTrimRangeStart === currentTrimRangeEnd &&
    currentTrimRangeEnd === duration
  ) {
    currentTrimRangeEnd = currentTrimRangeStart;
    currentTrimRangeStart = Math.max(
      currentTrimRangeStart - duration * DEFAULT_TRIM_RANGE_LENGTH,
      trimRangeBeforeStart?.['to'] ? trimRangeBeforeStart['to'] + 1 : 0
    );
  }

  return {
    from: currentTrimRangeStart,
    to: currentTrimRangeEnd,
  };
};

// given the requested trim bound time, the current trim range, the bounding range,
// whether we're moving the lower or upper bound, and an optional time padding,
// return a new bounding time that falls within the bounding range and does not
// cause the lower bound to exceed the upper bound
//
// all times are in *milliseconds*
export const getNewTrimBoundTime = (
  requestedTime: number,
  currentTrimRange: TrimRange,
  boundingRange: BoundingRange,
  isLowerBound = true,
  padding = 1
): number => {
  let newBoundTime: number;

  if (isLowerBound) {
    newBoundTime = Math.max(requestedTime, boundingRange.from);
    newBoundTime = Math.min(newBoundTime, currentTrimRange.to - padding);
  } else {
    newBoundTime = Math.min(requestedTime, boundingRange.to);
    newBoundTime = Math.max(newBoundTime, currentTrimRange.from + padding);
  }

  return newBoundTime;
};
