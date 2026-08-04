import "../chunk-BYZ2GIR3.js";
const SOURCE_PLAY_HLS = "source-play-hls";
const SOURCE_PLAY_DASH = "source-play-dash";
const SOURCE_PLAY_MP4 = "source-play-mp4";
const SOURCE_PLAY_TRIM_HLS = "source-play-trim-hls";
const SOURCE_PLAY_TRIM_MP4 = "source-play-trim-mp4";
const SOURCE_PLAY_WEBM = "source-play-webm";
const SOURCE_PLAY_WEBM_STREAMED = "source-play-webm-streamed";
const THUMB_DEFAULT = "default";
const THUMB_DEFAULT_PLAY = "default-play";
const THUMB_DEFAULT_4x3 = "default-4x3";
const THUMB_4x3 = "4x3";
const OG_THUMB_FULL = "og-full";
const THUMB_FULL = "full";
const THUMB_FULL_PLAY = "full-play";
const THUMB_GIF = "default-gif";
const THUMB_GIF_PLAY = "defaultGifPlay";
const THUMB_VIDEO_PREVIEW = "animated-preview";
const THUMB_EXT_JPG = "jpg";
const THUMB_EXT_PNG = "png";
const ARCHIVED_ANY = "any";
const ARCHIVED_EXCLUDED = "excluded";
const ARCHIVED_EXCLUSIVELY = "exclusively";
const VIDEO_PRIVACY_PUBLIC = "public";
const VIDEO_PRIVACY_WORKSPACE = "workspace";
const VIDEO_PRIVACY_OWNER = "owner";
const VIDEO_PRIVACY_CUSTOM_ACCESS = "custom";
const MAX_VIDEO_TITLE_LENGTH = 200;
const VIDEO_PRIVACY_TYPES = [
  VIDEO_PRIVACY_PUBLIC,
  VIDEO_PRIVACY_WORKSPACE,
  VIDEO_PRIVACY_OWNER
];
var VideoPrivacyTypes = /* @__PURE__ */ ((VideoPrivacyTypes2) => {
  VideoPrivacyTypes2["VIDEO_PRIVACY_PUBLIC"] = "public";
  VideoPrivacyTypes2["VIDEO_PRIVACY_WORKSPACE"] = "workspace";
  VideoPrivacyTypes2["VIDEO_PRIVACY_OWNER"] = "owner";
  return VideoPrivacyTypes2;
})(VideoPrivacyTypes || {});
var DOWNLOADABLE_BY_ENUM = /* @__PURE__ */ ((DOWNLOADABLE_BY_ENUM2) => {
  DOWNLOADABLE_BY_ENUM2["NO_ONE"] = "no_one";
  DOWNLOADABLE_BY_ENUM2["OWNER"] = "owner";
  DOWNLOADABLE_BY_ENUM2["EDITORS"] = "editors";
  DOWNLOADABLE_BY_ENUM2["WORKSPACE"] = "workspace";
  DOWNLOADABLE_BY_ENUM2["ANYONE"] = "anyone";
  return DOWNLOADABLE_BY_ENUM2;
})(DOWNLOADABLE_BY_ENUM || {});
const V4_SINGLE_BITRATE = "singlebitrate";
const PLACEHOLDER_PRIVATE_THUMBNAIL_PATH = {
  ".png": "placeholders/private-video.png",
  ".jpg": "placeholders/private-video.jpg",
  ".gif": "placeholders/private-video.gif"
};
const PLACEHOLDER_PASSWORD_PROTECTED_THUMBNAIL_PATH = {
  ".png": "placeholders/password-video.png",
  ".jpg": "placeholders/password-video.jpg",
  ".gif": "placeholders/password-video.gif"
};
const WAVEFORM_IN_PROGRESS = "inProgress";
const WAVEFORM_SUCCESS = "success";
const WAVEFORM_FAILURE = "failure";
const WAVEFORM_GENERATION_STATUSES = [
  WAVEFORM_IN_PROGRESS,
  WAVEFORM_SUCCESS,
  WAVEFORM_FAILURE
];
const SUGGESTED_PLAYBACK_RATE_NONE = "none";
const SUGGESTED_PLAYBACK_RATES = [
  SUGGESTED_PLAYBACK_RATE_NONE,
  "x80",
  "x100",
  "x120",
  "x150",
  "x170",
  "x200",
  "x250"
];
const REGENERATION_MP4_FALLBACK = "MP4_FALLBACK";
const REGENERATION_DOWNLOAD = "DOWNLOAD";
const REGENERATION_TYPES = [
  REGENERATION_MP4_FALLBACK,
  REGENERATION_DOWNLOAD
];
const REGENERATION_TTL_IN_DAYS = {
  [REGENERATION_MP4_FALLBACK]: null,
  [REGENERATION_DOWNLOAD]: 14
};
export {
  ARCHIVED_ANY,
  ARCHIVED_EXCLUDED,
  ARCHIVED_EXCLUSIVELY,
  DOWNLOADABLE_BY_ENUM,
  MAX_VIDEO_TITLE_LENGTH,
  OG_THUMB_FULL,
  PLACEHOLDER_PASSWORD_PROTECTED_THUMBNAIL_PATH,
  PLACEHOLDER_PRIVATE_THUMBNAIL_PATH,
  REGENERATION_DOWNLOAD,
  REGENERATION_MP4_FALLBACK,
  REGENERATION_TTL_IN_DAYS,
  REGENERATION_TYPES,
  SOURCE_PLAY_DASH,
  SOURCE_PLAY_HLS,
  SOURCE_PLAY_MP4,
  SOURCE_PLAY_TRIM_HLS,
  SOURCE_PLAY_TRIM_MP4,
  SOURCE_PLAY_WEBM,
  SOURCE_PLAY_WEBM_STREAMED,
  SUGGESTED_PLAYBACK_RATES,
  SUGGESTED_PLAYBACK_RATE_NONE,
  THUMB_4x3,
  THUMB_DEFAULT,
  THUMB_DEFAULT_4x3,
  THUMB_DEFAULT_PLAY,
  THUMB_EXT_JPG,
  THUMB_EXT_PNG,
  THUMB_FULL,
  THUMB_FULL_PLAY,
  THUMB_GIF,
  THUMB_GIF_PLAY,
  THUMB_VIDEO_PREVIEW,
  V4_SINGLE_BITRATE,
  VIDEO_PRIVACY_CUSTOM_ACCESS,
  VIDEO_PRIVACY_OWNER,
  VIDEO_PRIVACY_PUBLIC,
  VIDEO_PRIVACY_TYPES,
  VIDEO_PRIVACY_WORKSPACE,
  VideoPrivacyTypes,
  WAVEFORM_FAILURE,
  WAVEFORM_GENERATION_STATUSES,
  WAVEFORM_IN_PROGRESS,
  WAVEFORM_SUCCESS
};
//# sourceMappingURL=video.js.map
