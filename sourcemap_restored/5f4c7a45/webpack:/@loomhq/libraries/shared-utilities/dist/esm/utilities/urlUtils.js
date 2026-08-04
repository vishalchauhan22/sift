import "../chunk-BYZ2GIR3.js";
import slugify from "slugify";
import * as validateUtils from "./validateUtils";
const {
  LOOM_EDIT_PAGE_REGEX_STR,
  LOOM_EMBED_ATLASSIAN_PAGE_REGEX_STR,
  LOOM_EMBED_PAGE_REGEX_STR,
  LOOM_SHARE_PAGE_REGEX_STR
} = validateUtils;
const getVideoURL = (videoID, url) => {
  return "".concat(url, "/share/").concat(videoID);
};
const getVideoAliasURL = (videoAliasID, url) => {
  return "".concat(url, "/a/").concat(videoAliasID);
};
const getOEmbedShareURL = (videoID, url) => "".concat(url, "/v1/oembed?url=").concat(global.encodeURIComponent(
  getVideoURL(videoID, url)
));
const getOEmbedAliasURL = (videoAliasID, url) => "".concat(url, "/v1/oembed?url=").concat(global.encodeURIComponent(
  getVideoAliasURL(videoAliasID, url)
));
const getloginUrlWithRedirect = (redirect = null, loginCustomTitle = null, loginUrl) => {
  const url = new URL(loginUrl);
  if (redirect) {
    url.searchParams.append("redirect_after", redirect);
  }
  if (loginCustomTitle) {
    url.searchParams.append("custom_title", loginCustomTitle);
  }
  return url.toString();
};
var Page = /* @__PURE__ */ ((Page2) => {
  Page2[Page2["edit"] = 0] = "edit";
  Page2[Page2["embed"] = 1] = "embed";
  Page2[Page2["embedAtlassian"] = 2] = "embedAtlassian";
  Page2[Page2["share"] = 3] = "share";
  return Page2;
})(Page || {});
const urlRegexMap = {
  [0 /* edit */]: LOOM_EDIT_PAGE_REGEX_STR,
  [1 /* embed */]: LOOM_EMBED_PAGE_REGEX_STR,
  [2 /* embedAtlassian */]: LOOM_EMBED_ATLASSIAN_PAGE_REGEX_STR,
  [3 /* share */]: LOOM_SHARE_PAGE_REGEX_STR
};
const getVideoIdFromPageUrl = (url, page = 3 /* share */) => {
  var _a, _b;
  if (!url) {
    return null;
  }
  new URL(url);
  try {
    const regex = urlRegexMap[page];
    const loomRegex = new RegExp(regex);
    const match = url.match(loomRegex);
    if (!match) {
      return null;
    }
    return (_b = (_a = match.groups) == null ? void 0 : _a.videoId) != null ? _b : null;
  } catch (e) {
    return null;
  }
};
const getScreenshotIdFromScreenshotPageUrl = (url) => {
  var _a;
  if (!url) {
    return null;
  }
  const matches = url.match(validateUtils.LOOM_SCREENSHOT_PAGE_REGEX);
  if (!matches) {
    return null;
  }
  const { id } = (_a = matches.groups) != null ? _a : {};
  return id;
};
const getDraftVideoIdFromGenerateVideoPageUrl = (url) => {
  var _a;
  const matches = url.match(validateUtils.LOOM_GENERATE_VIDEO_PAGE_REGEX);
  if (!matches) {
    return null;
  }
  const { draftVideoId } = (_a = matches.groups) != null ? _a : {};
  return draftVideoId;
};
const withParam = (name, value, url) => {
  const newUrl = new URL(url);
  newUrl.searchParams.append(name, value);
  return newUrl.toString();
};
const getSlugForVideo = (name) => {
  return "".concat(slugify(name, { strict: true }).substring(0, 80));
};
const LOOM_BASE_REGEX_STR = "(?:https?://)?((?:stage.loom.com|loom.com|www.loom.com|loomlocal.com:4444|support.loom.com|cdn.loon.com)/.*)";
const LOOM_URL_REGEX = new RegExp("^".concat(LOOM_BASE_REGEX_STR, "$"));
const ATLASSIAN_REFERRER_HOST = ".atlassian.net/";
const isLoomUrl = (url) => LOOM_URL_REGEX.test(url);
const isAtlassianReferrer = (url) => url.endsWith(ATLASSIAN_REFERRER_HOST);
const cleanMeetingUrl = (url) => {
  let trimmedMeetingUrl = url.trim();
  trimmedMeetingUrl = trimmedMeetingUrl.replace(/^https?:/, "https:");
  if (!trimmedMeetingUrl.match(/^https:/)) {
    trimmedMeetingUrl = "https://".concat(trimmedMeetingUrl);
  }
  return trimmedMeetingUrl;
};
export {
  Page,
  cleanMeetingUrl,
  getDraftVideoIdFromGenerateVideoPageUrl,
  getOEmbedAliasURL,
  getOEmbedShareURL,
  getScreenshotIdFromScreenshotPageUrl,
  getSlugForVideo,
  getVideoAliasURL,
  getVideoIdFromPageUrl,
  getVideoURL,
  getloginUrlWithRedirect,
  isAtlassianReferrer,
  isLoomUrl,
  withParam
};
//# sourceMappingURL=urlUtils.js.map
