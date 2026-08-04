import "../chunk-BYZ2GIR3.js";
import round from "lodash/round";
import pluralize from "pluralize";
import { HHMMSS_REGEX_SINGLE, CHAPTERS_TIMESTAMP_REGEX } from "./validateUtils";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const secondsToVideoTS = (secondsToConvert = 0, precision) => {
  if (isNaN(secondsToConvert)) {
    throw new Error("secondsToVideoTS param must be a number");
  }
  if (precision && precision < 0) {
    throw new Error("secondsToVideoTS precision must be 0 or greater");
  }
  if (precision != null) {
    secondsToConvert = round(secondsToConvert, precision);
  }
  const hours = Math.floor(secondsToConvert / 3600);
  const minutes = Math.floor((secondsToConvert - hours * 3600) / 60);
  const seconds = secondsToConvert - hours * 3600 - minutes * 60;
  let timestamp = "";
  if (hours > 0) {
    timestamp += "".concat(hours, ":").padStart(3, "0");
  }
  if (minutes > 0) {
    if (hours === 0) {
      timestamp += "".concat(minutes, ":");
    } else {
      timestamp += "".concat(minutes, ":").padStart(3, "0");
    }
  } else if (hours > 0) {
    timestamp += "00:";
  } else {
    timestamp += "0:";
  }
  timestamp += seconds.toString().padStart(2, "0");
  if (precision != null) {
    const timeParts = timestamp.split(":");
    const onlySecs = Number(timeParts[timeParts.length - 1]);
    if (precision === 0) {
      timeParts[timeParts.length - 1] = onlySecs.toFixed(precision).padStart(2, "0");
    } else {
      timeParts[timeParts.length - 1] = onlySecs.toFixed(precision).padStart(precision + 3, "0");
    }
    return timeParts.join(":");
  }
  return timestamp;
};
const secondsToLongVideoTS = (secondsToConvert = 0) => {
  const hours = Math.floor(secondsToConvert / 3600);
  const minutes = Math.floor((secondsToConvert - hours * 3600) / 60);
  const seconds = Math.round(secondsToConvert - hours * 3600 - minutes * 60);
  let timestamp = "";
  if (hours < 10) {
    timestamp += "0";
  }
  timestamp += "".concat(hours, ":");
  if (minutes < 10) {
    timestamp += "0";
  }
  timestamp += "".concat(minutes, ":");
  if (seconds < 10) {
    timestamp += "0";
  }
  timestamp += seconds;
  return timestamp;
};
function normalizeTimeUnit(numberString) {
  if (isNaN(Number(numberString))) {
    throw "Invalid timestamp provided";
  }
  return numberString.length === 1 ? "0".concat(numberString) : numberString;
}
const hhMmSsToSeconds = (timeString) => {
  let timeValues = timeString.split(":");
  if (timeValues.length < 3) {
    timeValues = timeValues.map(normalizeTimeUnit).reduce((acc, curr) => "".concat(acc, ":").concat(curr), "00").split(":");
  } else if (!HHMMSS_REGEX_SINGLE.test(timeString)) {
    throw "Invalid timestamp provided: ".concat(timeString);
  }
  return Number(timeValues[0]) * 60 * 60 + Number(timeValues[1]) * 60 + Number(timeValues[2]);
};
const chapterLiteralToSeconds = (literal) => {
  const emptyString = literal.length === 0;
  const containsTimestamp = CHAPTERS_TIMESTAMP_REGEX.test(literal);
  if (emptyString || !containsTimestamp) {
    return null;
  }
  const reverseTimeStamp = literal.split(":").reverse();
  const [seconds, mins, hours] = reverseTimeStamp;
  const hoursToSeconds = hours ? Number(hours) * 60 * 60 : 0;
  const minsToSeconds = Number(mins) * 60;
  return hoursToSeconds + minsToSeconds + Number(seconds);
};
const shorthandTimestampMomentConfig = () => {
  return {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "1s",
      ss: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1mo",
      MM: "%dmo",
      y: "1y",
      yy: "%dy"
    }
  };
};
function secondsToHumanReadableString(seconds) {
  const numYears = Math.floor(seconds / 31536e3);
  const numDays = Math.floor(seconds % 31536e3 / 86400);
  const numHours = Math.floor(seconds % 31536e3 % 86400 / 3600);
  let numMinutes = Math.floor(seconds % 31536e3 % 86400 % 3600 / 60);
  const numSeconds = seconds % 31536e3 % 86400 % 3600 % 60;
  let humanReadableString = "";
  if (numYears) {
    humanReadableString += "".concat(Math.trunc(numYears), " ").concat(pluralize(
      "year",
      numYears
    ), " ");
  }
  if (numDays) {
    humanReadableString += "".concat(Math.trunc(numDays), " ").concat(pluralize(
      "day",
      numDays
    ), " ");
  }
  if (numHours) {
    humanReadableString += "".concat(Math.trunc(numHours), " ").concat(pluralize(
      "hour",
      numHours
    ), " ");
  }
  if (numMinutes) {
    if (numSeconds >= 30) {
      numMinutes++;
    }
    humanReadableString += "".concat(Math.trunc(numMinutes), " min ");
  }
  if (seconds < 60 && numSeconds) {
    humanReadableString += "".concat(Math.trunc(numSeconds), " sec");
  }
  return humanReadableString.trim();
}
const HOUR_IN_SECONDS = 3600;
const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;
const isToday = (startDate) => {
  const today = /* @__PURE__ */ new Date();
  startDate = new Date(startDate);
  return startDate.getDate() == today.getDate() && startDate.getMonth() == today.getMonth() && startDate.getFullYear() == today.getFullYear();
};
const MS_IN_DAY = 1e3 * 3600 * 24;
const daysAgo = (dateString) => {
  const msDiff = (/* @__PURE__ */ new Date()).getTime() - new Date(dateString).getTime();
  return Math.floor(msDiff / MS_IN_DAY);
};
const MS_IN_HOUR = 1e3 * 3600;
const hoursAgo = (dateString) => {
  const msDiff = (/* @__PURE__ */ new Date()).getTime() - new Date(dateString).getTime();
  return Math.floor(msDiff / MS_IN_HOUR);
};
const MS_IN_SECOND = 1e3;
const secondsAgo = (dateString) => {
  const msDiff = (/* @__PURE__ */ new Date()).getTime() - new Date(dateString).getTime();
  return Math.floor(msDiff / MS_IN_SECOND);
};
function secondsToMilliseconds(seconds) {
  return seconds * 1e3;
}
function millisecondsToSeconds(ms) {
  return Math.floor(ms / 1e3);
}
function unixTimestampToDate(timestamp) {
  const milliseconds = secondsToMilliseconds(timestamp);
  return new Date(milliseconds);
}
const formatDateToHumanReadableString = (dateString) => {
  const dateObj = new Date(dateString);
  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return "".concat(months[month], " ").concat(date, ", ").concat(year, ", ").concat(time);
};
export {
  DAY_IN_SECONDS,
  HOUR_IN_SECONDS,
  chapterLiteralToSeconds,
  daysAgo,
  formatDateToHumanReadableString,
  hhMmSsToSeconds,
  hoursAgo,
  isToday,
  millisecondsToSeconds,
  secondsAgo,
  secondsToHumanReadableString,
  secondsToLongVideoTS,
  secondsToMilliseconds,
  secondsToVideoTS,
  shorthandTimestampMomentConfig,
  sleep,
  unixTimestampToDate
};
//# sourceMappingURL=timeUtils.js.map
