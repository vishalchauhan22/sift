import "../chunk-BYZ2GIR3.js";
const ATTACHMENT = "attachment";
const CSS = "text/css";
const CSV = "text/csv";
const FORM_URL_ENCODED = "application/x-www-form-urlencoded";
const GRAPHQL = "application/graphql";
const HTML = "text/html";
const JSON = "application/json";
const M3U8 = "application/vnd.apple.mpegurl";
const DASH = "application/dash+xml";
const MOV = "video/quicktime";
const MP4 = "video/mp4";
const MULTIPART_FORM_DATA = "multipart/form-data";
const PDF = "application/pdf";
const PLAIN_TEXT = "text/plain";
const XML = "text/xml";
const PNG = "image/png";
const JPEG = "image/jpeg";
const GIF = "image/gif";
const GPP = "video/3gpp";
const MP2T = "video/MP2T";
const VIDEO_WEBM = "video/webm";
const AUDIO_WEBM = "audio/webm";
const MIME_TYPE_AVI = "video/avi";
const MIME_TYPE_AVI_VND = "video/vnd.avi";
const MIME_TYPE_AVI_MSVIDEO = "video/msvideo";
const MIME_TYPE_AVI_X_MSVIDEO = "video/x-msvideo";
const MIME_TYPE_WMA = "audio/x-ms-wma";
const MIME_TYPE_WMV_ASF = "application/vnd.ms-asf";
const MIME_TYPE_WMV = "video/x-ms-asf";
const MIME_TYPE_WMV_VIDEO = "video/x-ms-wmv";
const MIME_TYPE_MATROSKA_VIDEO = "video/x-matroska";
const MIME_TYPE_M4V_VIDEO = "video/x-m4v";
const ALLOWED_VIDEO_UPLOAD_MIMES = [
  MP4,
  MOV,
  VIDEO_WEBM,
  MIME_TYPE_M4V_VIDEO,
  MIME_TYPE_WMA,
  MIME_TYPE_WMV,
  MIME_TYPE_WMV_ASF,
  MIME_TYPE_WMV_VIDEO,
  MIME_TYPE_AVI,
  MIME_TYPE_AVI_VND,
  MIME_TYPE_AVI_MSVIDEO,
  MIME_TYPE_AVI_X_MSVIDEO,
  GPP,
  MIME_TYPE_MATROSKA_VIDEO
];
const FILE_EXTENSION_MP4 = ".mp4";
const FILE_EXTENSION_MOV = ".mov";
const FILE_EXTENSION_WEBM = ".webm";
const FILE_EXTENSION_WMV = ".wmv";
const FILE_EXTENSION_AVI = ".avi";
const FILE_EXTENSION_M4V = ".m4v";
const FILE_EXTENSION_MPD = ".mpd";
const FILE_EXTENSION_M3U8 = ".m3u8";
const ALLOWED_VIDEO_UPLOAD_EXTENSIONS = /* @__PURE__ */ new Set([
  FILE_EXTENSION_MP4,
  FILE_EXTENSION_MOV,
  FILE_EXTENSION_WEBM,
  FILE_EXTENSION_WMV,
  FILE_EXTENSION_AVI,
  FILE_EXTENSION_M4V
]);
const VIDEO_PLAYBACK_MIME_TYPES = [M3U8, DASH, MP4];
const VIDEO_PLAYBACK_MIME_TYPES_TO_ENUM_STRING = {
  [M3U8]: "M3U8",
  [MP4]: "MP4",
  [DASH]: "DASH"
};
export {
  ALLOWED_VIDEO_UPLOAD_EXTENSIONS,
  ALLOWED_VIDEO_UPLOAD_MIMES,
  ATTACHMENT,
  AUDIO_WEBM,
  CSS,
  CSV,
  DASH,
  FILE_EXTENSION_AVI,
  FILE_EXTENSION_M3U8,
  FILE_EXTENSION_M4V,
  FILE_EXTENSION_MOV,
  FILE_EXTENSION_MP4,
  FILE_EXTENSION_MPD,
  FILE_EXTENSION_WEBM,
  FILE_EXTENSION_WMV,
  FORM_URL_ENCODED,
  GIF,
  GPP,
  GRAPHQL,
  HTML,
  JPEG,
  JSON,
  M3U8,
  MIME_TYPE_AVI,
  MIME_TYPE_AVI_MSVIDEO,
  MIME_TYPE_AVI_VND,
  MIME_TYPE_AVI_X_MSVIDEO,
  MIME_TYPE_M4V_VIDEO,
  MIME_TYPE_MATROSKA_VIDEO,
  MIME_TYPE_WMA,
  MIME_TYPE_WMV,
  MIME_TYPE_WMV_ASF,
  MIME_TYPE_WMV_VIDEO,
  MOV,
  MP2T,
  MP4,
  MULTIPART_FORM_DATA,
  PDF,
  PLAIN_TEXT,
  PNG,
  VIDEO_PLAYBACK_MIME_TYPES_TO_ENUM_STRING,
  VIDEO_WEBM,
  XML
};
//# sourceMappingURL=mimes.js.map
