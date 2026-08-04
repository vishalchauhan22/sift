import "../chunk-BYZ2GIR3.js";
const snakeToTitleCase = (stringToConvert) => {
  return stringToConvert.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
};
const titleToSnakeCase = (stringToConvert) => stringToConvert.split(" ").join("_").toLowerCase();
const rot13Cipher = (string) => {
  return string.replace(/[a-z]/gi, (x) => {
    return String.fromCharCode(
      x.charCodeAt(0) + (x.toLowerCase() <= "m" ? 13 : -13)
    );
  });
};
const trimAndLowerCase = (stringToConvert) => {
  return stringToConvert.trim().toLowerCase();
};
function extractLastStringSegment(str, delimiters = [".", "_", "-", "+"]) {
  let lastName = str;
  for (const delimiter of delimiters) {
    const segments = str.split(delimiter);
    if (segments.length > 1) {
      lastName = segments[segments.length - 1];
      break;
    }
  }
  return lastName;
}
function limitStringWithEllipses(str, limit) {
  return str.length > limit ? "".concat(str.substring(0, limit - 3), "...") : str;
}
function formatAsStringWithOxfordComma(list) {
  let result = "";
  if (list.length === 1) {
    result = list[0];
  } else if (list.length === 2) {
    result = list.join(" and ");
  } else if (list.length > 2) {
    result = list.slice(0, -1).join(", ") + ", and " + list.slice(-1);
  }
  return result;
}
const formatAsSentenceCase = (string) => {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
function isNonEmptyString(str) {
  return typeof str === "string" && str !== "";
}
export {
  extractLastStringSegment,
  formatAsSentenceCase,
  formatAsStringWithOxfordComma,
  isNonEmptyString,
  limitStringWithEllipses,
  rot13Cipher,
  snakeToTitleCase,
  titleToSnakeCase,
  trimAndLowerCase
};
//# sourceMappingURL=stringUtils.js.map
