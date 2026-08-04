import {
  __publicField
} from "../chunk-BYZ2GIR3.js";
const WORKSPACE_ACCESS_DENIED = "workspace access denied";
const WORKSPACE_NOT_FOUND = "workspace not found";
const INTERNAL_ERROR_RETRY_LATER = "Internal error, please retry later or contact our support";
const NO_VIDEO_FOUND = "Video not found";
const INVALID_VIDEO_ID = "Invalid videoId provided";
const INVALID_VIDEO_ID_FETCH_TRANSCRIPT = "Invalid videoId supplied for fetching transcript";
const NO_TRANSCRIPT_ASSOCIATED_WITH_VIDEO = "No transcript associated with video";
const NO_VIDEO_TRANSCRIPT_FOUND = "No video transcript found";
const VIDEO_IS_ARCHIVED = "Video is archived";
const VIEWER_DOES_NOT_HAVE_PERMISSION = "Viewer does not have permission";
const UPDATE_TRANSCRIPT_DENIED = "Update Transcript Denied";
const REVERT_CORRECTIONS_DENIED = "Update Transcript Denied";
const INVALID_INPUT_ERR = "Please enter a valid User ID, Video Link, Folder ID, or Workspace ID";
const NO_VIDEO_MATCH_ERR = "No videos match your search";
const NO_SCREENSHOT_MATCH_ERR = "No screenshots match your search";
const INVALID_USER_ID_ERR = "Invalid user id";
class InvalidMemberOverrideRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidMemberOverrideRequestError";
  }
}
class LoomGraphQLError extends Error {
  /**
   * Construct a loom gql error
   * @param {string} message Error message
   * @param {string} typename Gql __typename
   * @param {string} feature Feature name
   */
  constructor(message, typename, feature = "") {
    super(message);
    this.name = LoomGraphQLError.name;
    this.typename = typename;
    this.feature = feature;
  }
}
const _ClipUpdateError = class _ClipUpdateError extends Error {
  constructor(reason, message, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _ClipUpdateError);
    }
    this.name = "ClipUpdateError";
    this.reason = reason;
    this.message = message;
  }
};
__publicField(_ClipUpdateError, "REASONS", {
  CLIPS_NOT_ACCEPTED: "CLIPS_NOT_ACCEPTED",
  NO_CLIPS: "NO_CLIPS",
  DUPLICATE_ENTRIES: "DUPLICATE_ENTRIES",
  BAD_POSITION: "BAD_POSITION",
  UNMATCHED_CLIP: "UNMATCHED_CLIP",
  OVER_DURATION: "OVER_DURATION"
});
let ClipUpdateError = _ClipUpdateError;
export {
  ClipUpdateError,
  INTERNAL_ERROR_RETRY_LATER,
  INVALID_INPUT_ERR,
  INVALID_USER_ID_ERR,
  INVALID_VIDEO_ID,
  INVALID_VIDEO_ID_FETCH_TRANSCRIPT,
  InvalidMemberOverrideRequestError,
  LoomGraphQLError,
  NO_SCREENSHOT_MATCH_ERR,
  NO_TRANSCRIPT_ASSOCIATED_WITH_VIDEO,
  NO_VIDEO_FOUND,
  NO_VIDEO_MATCH_ERR,
  NO_VIDEO_TRANSCRIPT_FOUND,
  REVERT_CORRECTIONS_DENIED,
  UPDATE_TRANSCRIPT_DENIED,
  VIDEO_IS_ARCHIVED,
  VIEWER_DOES_NOT_HAVE_PERMISSION,
  WORKSPACE_ACCESS_DENIED,
  WORKSPACE_NOT_FOUND
};
//# sourceMappingURL=errors.js.map
