import "../chunk-BYZ2GIR3.js";
import { VideoMeetingPlatform } from "../constants/calendarMeetings";
const HEX_32_REGEX = "[a-fA-F0-9]{32}";
const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const DOMAIN_REGEX = /^(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const EXTRACT_EMAILS_REGEX = /(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})/gi;
const LOOM_HOST_REGEX_STR = "^(https?://)?((stage.loom.com|loom.com|www.loom.com|loomlocal.com:(?:4444|4445)|[a-z0-9-.]+.(ngrok|eu.ngrok)(-free)?.(io|app)|(.*.public.atlastunnel.com))";
const LOOM_SHARE_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/share/([a-zA-Z0-9-]*-)?(?<videoId>[a-f0-9]{32}))");
const LOOM_EDIT_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/edit/([a-zA-Z0-9-]*-)?(?<videoId>[a-f0-9]{32}))");
const LOOM_EMBED_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/embed/([a-zA-Z0-9-]*-)?(?<videoId>[a-f0-9]{32}))");
const LOOM_EMBED_ATLASSIAN_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/embed/atlassian(?:\\?.*?&?videoId=(?<videoId>[a-zA-Z0-9]{32})(?:&|$)))");
const LOOM_ALIAS_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/a/([a-zA-Z0-9-]*-)?(?<videoId>[a-f0-9]{32}))");
const LOOM_SPACE_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/spaces/([a-zA-Z0-9-]*-)?(?<spaceId>[0-9]+))");
const LOOM_FOLDER_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/looms/videos/([a-zA-Z0-9-]*-)?(?<folderId>[a-f0-9]{32}))");
const LOOM_PROFILE_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/profile/([a-zA-Z0-9-]*-)?(?<profileId>[a-f0-9]+))");
const LOOM_SCREENSHOT_PAGE_REGEX_STR = "^(?:https?://)?(?:(?:stage.loom.com|loom.com|www.loom.com|loomlocal.com:(?:4444|4445)|[a-z0-9-.]+.(?:ngrok|eu.ngrok)(?:-free)?.(?:io|app)|(?:.*.public.atlastunnel.com))/i/(?<id>".concat(HEX_32_REGEX, "))");
const LOOM_GENERATE_VIDEO_PAGE_REGEX_STR = "".concat(LOOM_HOST_REGEX_STR, "/generate-video/(?<draftVideoId>[-a-f0-9]{36}))(?:/.*)?");
const LOOM_GENERATE_VIDEO_PAGE_REGEX = new RegExp(
  LOOM_GENERATE_VIDEO_PAGE_REGEX_STR
);
const LOOM_EMBED_PAGE_REGEX = new RegExp(LOOM_EMBED_PAGE_REGEX_STR);
const LOOM_SCREENSHOT_PAGE_REGEX = new RegExp(
  LOOM_SCREENSHOT_PAGE_REGEX_STR
);
const URL_REGEX = /^((https?|ftp):\/\/)(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i;
const ZOOM_URL_REGEX = new RegExp("https:\\/\\/(?:[\\w-]+\\.)?zoom\\.us\\/(?<type>j|my)\\/(?<code>[\\w\\.]+)[-\\w()@:%+\\.~#?&/=]*$");
const MEET_URL_REGEX = new RegExp("^(?<scheme>https:\\/\\/)?meet\\.google\\.com\\/(?<code>\\w{3}-\\w{4}-\\w{3})[-a-zA-Z0-9()@:%_+\\.~#?&/=]*$");
const TEAMS_URL_REGEX = new RegExp("^https:\\/\\/teams\\.microsoft\\.com\\/(?<type>meet\\/|l\\/meetup-join\\/)(?<code>[-a-zA-Z0-9()@:%_+\\.~#?&/=]*)$");
const TEAMS_MEET_NOW_TYPE = /^meet/;
const ALL_MEETING_URL_REGEXS = {
  [VideoMeetingPlatform.GOOGLE_MEET]: MEET_URL_REGEX,
  [VideoMeetingPlatform.ZOOM]: ZOOM_URL_REGEX,
  [VideoMeetingPlatform.MICROSOFT_TEAMS]: TEAMS_URL_REGEX
};
const LIVE_MEETING_URL_REGEX = /https:\/\/teams.live.com\/.*$/;
const MAX_COMMENT_LENGTH = 5e3;
const MAX_COMMENT_SERVER_LENGTH = 7e3;
const MAX_IPV6_LENGTH = 45;
const MAX_VIDEO_NAME_LENGTH = 100;
const MIN_COMMENT_LENGTH = 1;
const FOLDER_BANNED_CHARS_ARR = [
  "<",
  ">",
  "\\",
  "/",
  ":",
  "?",
  "*",
  '"',
  "|"
];
const BANNED_CHARS_REGEX = new RegExp(
  "\\".concat(FOLDER_BANNED_CHARS_ARR.join("|\\")),
  "i"
);
const BANNED_CHARS_ERROR_MESSAGE = "The following characters are not allowed: ".concat(FOLDER_BANNED_CHARS_ARR.join(
  " "
));
const FIRST_NAME_MAX_LENGTH = 20;
const LAST_NAME_MAX_LENGTH = 25;
const FIRST_NAME_MAX_PARTS = 2;
const MIN_PASSWORD_LENGTH = 8;
const USER_ID_REGEX_CHECK = new RegExp(/^[0-9]+$/);
const NUMBER_REGEX_CHECK = new RegExp(/^[0-9]+$/);
const WORKSPACE_ID_REGEX_CHECK = new RegExp(/^[0-9]+$/);
const HEX_REGEX = /^[a-fA-F0-9]+$/;
const ATTACHMENT_S3_ID_REGEX = HEX_32_REGEX;
const COUPON_ID_REGEX = HEX_32_REGEX;
const EMAIL_VERIFICATION_TOKEN_REGEX = HEX_32_REGEX;
const FOLDER_ID_REGEX = HEX_32_REGEX;
const INCOMPLETE_USER_TOKEN_REGEX = HEX_32_REGEX;
const RESET_PASSWORD_TOKEN_REGEX = HEX_32_REGEX;
const ORGANIZATION_INVITATION_REGEX = HEX_32_REGEX;
const VIDEO_ID_REGEX = HEX_32_REGEX;
const VIDEO_CLIP_ID_REGEX = HEX_32_REGEX;
const SHARE_ID_REGEX = HEX_32_REGEX;
const ANONYMOUS_ID_REGEX = HEX_32_REGEX;
const VIDEO_TIMESTAMP_REGEX = /^(\d+):([0-5]\d)?$/i;
const POSITIVE_FLOAT_REGEX = /^\d+(\.\d+)?$/;
const POSITIVE_INTEGER_REGEX = /^\d+$/;
const SCREENSHOT_ID_REGEX = HEX_32_REGEX;
const SCREENSHOT_URL_ID_REGEX = "[a-zA-Z0-9]{18,32}";
const ACTIVITY_RESPONSE_ID_REGEX = HEX_32_REGEX;
const DATE_RANGE_REGEX = /^\d{4}-((0[0-9])|(1[0-9]))(-((0[1-9])|([1-2][0-9])|(3[0-1])))$/;
const PART_NUMBER_REGEX = /^(?:sessions\/raw\/|sessions-raw-)[a-fA-F0-9]+-(?:audio\d+-|video\d+-)?(\d+)\.(?:ts|m4s)/;
const EMBED_VIDEO_ROUTE_PATHNAME_REGEX = new RegExp(
  "^/embed/(".concat(VIDEO_ID_REGEX, ")$"),
  "i"
);
const SHARE_VIDEO_ROUTE_PATHNAME_REGEX = new RegExp(
  "^/share/(".concat(VIDEO_ID_REGEX, ")$"),
  "i"
);
const CHAPTERS_TIMESTAMP_REGEX = new RegExp(
  /^(?:(?:[0-5]?\d):)?(?:[0-5]?\d):(?:[0-5]\d)$/
);
const VIDEO_ID_REGEX_CHECK = new RegExp(/^[a-fA-F0-9]{32}?$/i);
const FOLDER_ID_REGEX_CHECK = new RegExp(/^[a-fA-F0-9]{32}?$/i);
const SCREENSHOT_ID_REGEX_CHECK = new RegExp(/^[a-fA-F0-9]{32}?$/i);
const EMAIL_REGEX_CHECK = new RegExp(EMAIL_REGEX);
const HHMMSS_REGEX = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;
const HHMMSS_REGEX_SINGLE = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/;
const USER_ROLE_REGEX = /^(thinker|admin|client)$/;
const HEX_COLOR_REGEX = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
const ALL_DASHES_REGEX = /-/g;
const BLACKLISTED_NAME_CHARACTERS = /[@.]/;
const PASSWORD_WITHOUT_SPACES = /^\S+$/;
const URL_FOLDER_ID_REGEX = new RegExp("-".concat(FOLDER_ID_REGEX, "$"));
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLACK_USER_AGENT_REGEX = /Slack\/\d+\.\d+.\d+/i;
const ELECTRON_USER_AGENT_REGEX = /Electron\/\d+\.\d+.\d+/i;
const blacklistedNameCharacters = (str) => {
  return BLACKLISTED_NAME_CHARACTERS.test(str);
};
const email = (e) => {
  return EMAIL_REGEX.test(e);
};
const domain = (d) => {
  return DOMAIN_REGEX.test(d);
};
const url = (u) => {
  return URL_REGEX.test(u);
};
const CALENDLY_URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)?calendly\.com\/.+/;
const ipRegex = () => {
  const v4 = "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}";
  const v6seg = "[0-9a-fA-F]{1,4}";
  const v6 = "\n  (\n  (?:".concat(v6seg, ":){7}(?:").concat(v6seg, "|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n  (?:").concat(v6seg, ":){6}(?:").concat(v4, "|:").concat(v6seg, "|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n  (?:").concat(v6seg, ":){5}(?::").concat(v4, "|(:").concat(v6seg, "){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n  (?:").concat(v6seg, ":){4}(?:(:").concat(v6seg, "){0,1}:").concat(v4, "|(:").concat(v6seg, "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n  (?:").concat(v6seg, ":){3}(?:(:").concat(v6seg, "){0,2}:").concat(v4, "|(:").concat(v6seg, "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n  (?:").concat(v6seg, ":){2}(?:(:").concat(v6seg, "){0,3}:").concat(v4, "|(:").concat(v6seg, "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n  (?:").concat(v6seg, ":){1}(?:(:").concat(v6seg, "){0,4}:").concat(v4, "|(:").concat(v6seg, "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n  (?::((?::").concat(v6seg, "){0,5}:").concat(v4, "|(?::").concat(v6seg, "){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n  )(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n  ").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
  const ip = (opts) => opts && opts.exact ? new RegExp("(?:^".concat(v4, "$)|(?:^").concat(v6, "$)")) : new RegExp("(?:".concat(v4, ")|(?:").concat(v6, ")"), "g");
  ip.v4 = (opts) => opts && opts.exact ? new RegExp("^".concat(v4, "$")) : new RegExp(v4, "g");
  ip.v6 = (opts) => opts && opts.exact ? new RegExp("^".concat(v6, "$")) : new RegExp(v6, "g");
  return ip;
};
const hex = (str) => {
  return HEX_REGEX.test(str);
};
const isHexColor = (str) => {
  return HEX_COLOR_REGEX.test(str);
};
const isString = (obj) => {
  return typeof obj === "string";
};
const stringNotEmpty = (str) => {
  return isString(str) && str.trim().length > 0;
};
const PASSWORD_RULES = {
  MIN_LENGTH: (pw) => pw.length < 8,
  MAX_LENGTH: (pw) => pw.length > 64,
  UPPER_CASE: (pw) => !/[A-Z]+/.test(pw),
  LOWER_CASE: (pw) => !/[a-z]+/.test(pw),
  NUMBER: (pw) => !/\d+/.test(pw),
  SYMBOL: (pw) => !/[^a-zA-Z0-9]+/.test(pw)
};
const PASSWORD_EXPLANATION = {
  MIN_LENGTH: "at least 8 characters",
  MAX_LENGTH: "at most 64 characters",
  UPPER_CASE: "at least one uppercase character",
  LOWER_CASE: "at least one lowercase character",
  NUMBER: "at least one digit (0-9)",
  SYMBOL: "at least one symbol (!, $, @, *, etc)"
};
const validatePassword = (password) => {
  if (!isString(password)) {
    return ["INVALID_STRING"];
  }
  return Object.keys(PASSWORD_RULES).filter((rule) => {
    return PASSWORD_RULES[rule](password);
  });
};
const validatePasswordMinLength = (password) => {
  if (!isString(password)) {
    return false;
  }
  return !PASSWORD_RULES["MIN_LENGTH"](password);
};
const explainPasswordViolations = (passwordViolations) => {
  if (passwordViolations.length === 0) {
    return null;
  }
  return "Password needs: " + passwordViolations.map((rule) => {
    return PASSWORD_EXPLANATION[rule];
  }).join(", ");
};
const videoTimestamp = (str) => {
  return VIDEO_TIMESTAMP_REGEX.test(str);
};
function invalidUserFirstName(firstName) {
  if (firstName.length > FIRST_NAME_MAX_LENGTH) {
    return "Character limit reached";
  }
  if (blacklistedNameCharacters(firstName)) {
    return "Special characters not allowed";
  }
  return null;
}
function invalidUserLastName(lastName) {
  if (lastName.length > LAST_NAME_MAX_LENGTH) {
    return "Character limit reached";
  }
  if (blacklistedNameCharacters(lastName)) {
    return "Special characters not allowed";
  }
  return null;
}
const validateIsSlackDesktop = (userAgent) => {
  try {
    return SLACK_USER_AGENT_REGEX.test(userAgent) && ELECTRON_USER_AGENT_REGEX.test(userAgent);
  } catch (err) {
    return false;
  }
};
const isSharePageUrl = (url2) => {
  return new RegExp(LOOM_SHARE_PAGE_REGEX_STR).test(url2);
};
const isScreenshotPageUrl = (url2) => {
  return LOOM_SCREENSHOT_PAGE_REGEX.test(url2);
};
const isValidMeetingUrl = (url2) => {
  return Object.values(ALL_MEETING_URL_REGEXS).some((regex) => regex.test(url2));
};
const isKnownUnsupportedMeetingUrl = (url2) => {
  var _a;
  if ((_a = url2.match(LIVE_MEETING_URL_REGEX)) == null ? void 0 : _a[0]) {
    return "Sorry! Loom currently only supports Microsoft 365 Teams links.";
  }
  return null;
};
const expandZoomUrl = async (meetingUrl) => {
  try {
    const response = await fetch(meetingUrl, { method: "HEAD" });
    return response.url;
  } catch (e) {
    return null;
  }
};
const finalValidMeetingUrl = async (meetingUrl) => {
  for (const [platform, regex] of Object.entries(ALL_MEETING_URL_REGEXS)) {
    const matches = meetingUrl.match(regex);
    const url2 = matches == null ? void 0 : matches[0];
    if (url2) {
      if (parseInt(platform) === VideoMeetingPlatform.ZOOM && matches[1] === "my") {
        const finalMeetingUrl = await expandZoomUrl(url2);
        return finalMeetingUrl;
      }
      return url2;
    }
  }
  return null;
};
const getZoomMeetingIdFromUrl = (url2) => {
  const m = url2.match(ZOOM_URL_REGEX);
  return m == null ? void 0 : m[2];
};
const codeAndPlatformFromMeetingUrl = (url2) => {
  var _a;
  for (const [platform, regex] of Object.entries(ALL_MEETING_URL_REGEXS)) {
    const matches = url2.match(regex);
    if (matches) {
      if (parseInt(platform) === VideoMeetingPlatform.MICROSOFT_TEAMS && !((_a = matches.groups) == null ? void 0 : _a.type.match(TEAMS_MEET_NOW_TYPE))) {
        return { platform, code: matches[0] };
      }
      return { platform, code: matches.groups.code.split("?")[0] };
    }
  }
  return null;
};
export {
  ACTIVITY_RESPONSE_ID_REGEX,
  ALL_DASHES_REGEX,
  ALL_MEETING_URL_REGEXS,
  ANONYMOUS_ID_REGEX,
  ATTACHMENT_S3_ID_REGEX,
  BANNED_CHARS_ERROR_MESSAGE,
  BANNED_CHARS_REGEX,
  BLACKLISTED_NAME_CHARACTERS,
  CALENDLY_URL_REGEX,
  CHAPTERS_TIMESTAMP_REGEX,
  COUPON_ID_REGEX,
  DATE_RANGE_REGEX,
  DOMAIN_REGEX,
  ELECTRON_USER_AGENT_REGEX,
  EMAIL_REGEX,
  EMAIL_REGEX_CHECK,
  EMAIL_VERIFICATION_TOKEN_REGEX,
  EMBED_VIDEO_ROUTE_PATHNAME_REGEX,
  EXTRACT_EMAILS_REGEX,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MAX_PARTS,
  FOLDER_BANNED_CHARS_ARR,
  FOLDER_ID_REGEX,
  FOLDER_ID_REGEX_CHECK,
  HEX_32_REGEX,
  HEX_COLOR_REGEX,
  HEX_REGEX,
  HHMMSS_REGEX,
  HHMMSS_REGEX_SINGLE,
  INCOMPLETE_USER_TOKEN_REGEX,
  LAST_NAME_MAX_LENGTH,
  LOOM_ALIAS_PAGE_REGEX_STR,
  LOOM_EDIT_PAGE_REGEX_STR,
  LOOM_EMBED_ATLASSIAN_PAGE_REGEX_STR,
  LOOM_EMBED_PAGE_REGEX,
  LOOM_EMBED_PAGE_REGEX_STR,
  LOOM_FOLDER_PAGE_REGEX_STR,
  LOOM_GENERATE_VIDEO_PAGE_REGEX,
  LOOM_PROFILE_PAGE_REGEX_STR,
  LOOM_SCREENSHOT_PAGE_REGEX,
  LOOM_SCREENSHOT_PAGE_REGEX_STR,
  LOOM_SHARE_PAGE_REGEX_STR,
  LOOM_SPACE_PAGE_REGEX_STR,
  MAX_COMMENT_LENGTH,
  MAX_COMMENT_SERVER_LENGTH,
  MAX_IPV6_LENGTH,
  MAX_VIDEO_NAME_LENGTH,
  MIN_COMMENT_LENGTH,
  MIN_PASSWORD_LENGTH,
  NUMBER_REGEX_CHECK,
  ORGANIZATION_INVITATION_REGEX,
  PART_NUMBER_REGEX,
  PASSWORD_WITHOUT_SPACES,
  POSITIVE_FLOAT_REGEX,
  POSITIVE_INTEGER_REGEX,
  RESET_PASSWORD_TOKEN_REGEX,
  SCREENSHOT_ID_REGEX,
  SCREENSHOT_ID_REGEX_CHECK,
  SCREENSHOT_URL_ID_REGEX,
  SHARE_ID_REGEX,
  SHARE_VIDEO_ROUTE_PATHNAME_REGEX,
  SLACK_USER_AGENT_REGEX,
  URL_FOLDER_ID_REGEX,
  URL_REGEX,
  USER_ID_REGEX_CHECK,
  USER_ROLE_REGEX,
  UUID_REGEX,
  VIDEO_CLIP_ID_REGEX,
  VIDEO_ID_REGEX,
  VIDEO_ID_REGEX_CHECK,
  VIDEO_TIMESTAMP_REGEX,
  WORKSPACE_ID_REGEX_CHECK,
  ZOOM_URL_REGEX,
  blacklistedNameCharacters,
  codeAndPlatformFromMeetingUrl,
  domain,
  email,
  explainPasswordViolations,
  finalValidMeetingUrl,
  getZoomMeetingIdFromUrl,
  hex,
  invalidUserFirstName,
  invalidUserLastName,
  ipRegex,
  isHexColor,
  isKnownUnsupportedMeetingUrl,
  isScreenshotPageUrl,
  isSharePageUrl,
  isString,
  isValidMeetingUrl,
  stringNotEmpty,
  url,
  validateIsSlackDesktop,
  validatePassword,
  validatePasswordMinLength,
  videoTimestamp
};
//# sourceMappingURL=validateUtils.js.map
