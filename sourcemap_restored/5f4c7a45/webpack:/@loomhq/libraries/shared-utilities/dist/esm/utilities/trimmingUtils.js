import "../chunk-BYZ2GIR3.js";
const convertTrimTimeToFullTime = (timeMs, trimRanges) => {
  let accumulatedShift = 0;
  trimRanges == null ? void 0 : trimRanges.some(({ from, to }) => {
    if (from > timeMs + accumulatedShift) {
      return true;
    }
    accumulatedShift += to - from;
    return false;
  });
  return timeMs + accumulatedShift;
};
const convertFullTimeToTrimTime = (timeMs, trimRanges) => {
  let shiftedTime = timeMs;
  trimRanges == null ? void 0 : trimRanges.some(({ from, to }) => {
    const compareFrom = Math.ceil(from / 1e3) * 1e3;
    const compareTo = Math.floor(to / 1e3) * 1e3;
    if (compareFrom <= timeMs && compareTo > timeMs) {
      shiftedTime = NaN;
      return true;
    }
    if (compareFrom > timeMs) {
      return true;
    }
    shiftedTime -= to - from;
    return false;
  });
  return Math.max(shiftedTime, 0);
};
const isElementInsideRange = ({
  elementStart,
  elementEnd,
  rangeFrom,
  rangeTo
}) => {
  return elementStart >= rangeFrom && elementEnd <= rangeTo;
};
const getTrimVideoDuration = (fullDuration, trimRanges) => trimRanges.reduce((totalTime, trimRange) => {
  return totalTime - (trimRange.to - trimRange.from) / 1e3;
}, fullDuration);
export {
  convertFullTimeToTrimTime,
  convertTrimTimeToFullTime,
  getTrimVideoDuration,
  isElementInsideRange
};
//# sourceMappingURL=trimmingUtils.js.map
