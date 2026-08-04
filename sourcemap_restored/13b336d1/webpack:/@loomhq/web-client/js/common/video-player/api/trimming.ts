export type PlayRange = {
  from: number;
  to: number;
};

export function isTrimmed(timeMs: number, { from, to }: PlayRange): boolean {
  return from <= timeMs && to > timeMs;
}

export function convertTimeWithRanges(
  timeMs: number,
  ranges: PlayRange[]
): number {
  timeMs = roundToDoublePrecision(timeMs);
  let shiftedTime = timeMs;

  ranges?.find(({ from, to }) => {
    // compare using >, not >=, so time on the "to" edge still works
    if (isTrimmed(timeMs, { from, to })) {
      // found a trim range that contains the time, making this time not a visible one.
      shiftedTime = NaN;

      // stop comparing more ranges
      return true;
    }

    if (from > timeMs) {
      // stop comparing more ranges as they're all after the given time
      return true;
    }

    // this range ends before the given time, subtract its length from the converted time
    shiftedTime -= to - from;

    return false;
  });

  return Math.max(shiftedTime, 0);
}

export function isTimePlayable(timeMs: number, ranges: PlayRange[]): boolean {
  return !ranges.find(range => isTrimmed(timeMs, range));
}

export function getLastPlayableTime(
  fullDuration: number,
  ranges: PlayRange[]
): number {
  const lastTrimmedSegment = ranges[ranges.length - 1];

  if (fullDuration > lastTrimmedSegment.to) {
    return fullDuration;
  }

  // duration has been trimmed out, new artificial duration is:
  return lastTrimmedSegment.from;
}

export function getNextPlayableTime(
  timeMs: number,
  ranges: PlayRange[]
): number {
  ranges.forEach(({ from, to }) => {
    if (isTrimmed(timeMs, { from, to })) {
      // the trailing edge of a range is always playable
      timeMs = to;
    }
  });

  return timeMs;
}

export const getDurationWithRanges = (
  fullDuration: number,
  trimRanges: PlayRange[]
): number =>
  trimRanges.reduce((totalTime, trimRange) => {
    const rangeLength = trimRange.to - trimRange.from;

    return totalTime - rangeLength;
  }, fullDuration);

export const convertTrimTimeToFullTime = (
  timeMs: number,
  ranges: PlayRange[]
): number => {
  let accumulatedShift = 0;

  ranges?.find(({ from, to }) => {
    if (from > timeMs + accumulatedShift) {
      return true;
    }

    accumulatedShift += to - from;

    return false;
  });

  return timeMs + accumulatedShift;
};

export const formatRanges = (ranges: PlayRange[]): PlayRange[] => {
  return ranges.map(({ from, to }) => ({
    from: roundToDoublePrecision(from),
    to: roundToDoublePrecision(to),
  }));
};
export const roundToDoublePrecision = (num: number): number =>
  Math.round(num * 100) / 100;
