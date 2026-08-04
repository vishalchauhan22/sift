import "../chunk-BYZ2GIR3.js";
const ADMIN_READ = "admin.read";
const VIDEOS_CREATE = "videos.create";
const MOST_RECENT_VIDEO_READ = "most-recent-video.read";
const MY_VIDEOS_READ = "my-videos.read";
const FOLDER_READ = "folder.read";
const USER_UPDATE = "user.update";
const SSO_DOMAIN_MAP_EXPIRY_MINS = 20;
const SSO_DOMAIN_CACHE_LOCK = "sso-domain-map-lock";
const DOMAIN_STATUS_PENDING = "pending";
const DOMAIN_STATUS_ACTIVE = "active";
const AUTH0_TOKEN_ORGID = "https://loom.com/orgId";
const REQUEST_TO_JOIN_SUCCESS = "success";
const REQUEST_TO_JOIN_FAILURE_SSO = "failure_sso";
const REQUEST_TO_JOIN_STATUSES = [
  REQUEST_TO_JOIN_SUCCESS,
  REQUEST_TO_JOIN_FAILURE_SSO
];
const SLACK_TARGET_URI = "https://slack.com/target_uri";
const SLACK_TEAM_DOMAIN_URI = "https://slack.com/team_domain";
const SLACK_TEAM_ID_URI = "https://slack.com/team_id";
const SLACK_TEAM_NAME_URI = "https://slack.com/team_name";
const SLACK_USER_ID_URI = "https://slack.com/user_id";
const LOOMMATE_PORTAL_SCOPES = {
  ALL_ACCESS: "loommate_portal_scopes-full_access",
  SSO: "loommate_portal_scopes-sso",
  DOMAINS: "loommate_portal_scopes-domains",
  BILLING: "loommate_portal_scopes-billing"
};
const LOOM_OAUTH_POP_UP_SESSION_STORE_KEY = "loom_oauth_pop_up";
const AUTH_FLOW_TYPES = {
  POPUP: "popup",
  MAIN_WINDOW: "main_window",
  IOS: "ios"
};
const RESET_PASSWORD_VALIDATION_ERROR_CODES = {
  INVALID_TOKEN: "invalid_token",
  EXPIRED_TOKEN: "expired_token",
  INTERNAL_ERROR: "internal_error"
};
export {
  ADMIN_READ,
  AUTH0_TOKEN_ORGID,
  AUTH_FLOW_TYPES,
  DOMAIN_STATUS_ACTIVE,
  DOMAIN_STATUS_PENDING,
  FOLDER_READ,
  LOOMMATE_PORTAL_SCOPES,
  LOOM_OAUTH_POP_UP_SESSION_STORE_KEY,
  MOST_RECENT_VIDEO_READ,
  MY_VIDEOS_READ,
  REQUEST_TO_JOIN_FAILURE_SSO,
  REQUEST_TO_JOIN_STATUSES,
  REQUEST_TO_JOIN_SUCCESS,
  RESET_PASSWORD_VALIDATION_ERROR_CODES,
  SLACK_TARGET_URI,
  SLACK_TEAM_DOMAIN_URI,
  SLACK_TEAM_ID_URI,
  SLACK_TEAM_NAME_URI,
  SLACK_USER_ID_URI,
  SSO_DOMAIN_CACHE_LOCK,
  SSO_DOMAIN_MAP_EXPIRY_MINS,
  USER_UPDATE,
  VIDEOS_CREATE
};
//# sourceMappingURL=auth.js.map
