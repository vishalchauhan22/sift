import "../chunk-BYZ2GIR3.js";
const REQUEST_PUSH_PERMISSIONS = "request_push_permissions";
const SHOW_AVATAR_TOOLTIP = "show_avatar_tooltip";
const EMAIL_VERIFIED = "email_verified";
const DESKTOP_STOP_REC_TOOLTIP = "desktop_stop_rec_tooltip";
const SHOW_NEW_GET_STARTED_CHECKLIST_BANNER = "website_show_new_get_started_checklist_banner";
const GMAIL_INTEGRATION_SHARE_PAGE_UPSELL = "gmail_integration_share_page_upsell";
const EDUCATION_USER_UPGRADED_MODAL = "education_user_upgraded_modal";
const SHOW_GET_STARTED_CHECKLIST = "show_get_started_checklist";
const SHOW_DOWNLOAD_VIDEO_INFO_MODAL = "show_download_video_info_modal";
const SHOW_MOBILE_BANNER_PROMPT_ON_SHARE_PAGE = "show_mobile_banner_prompt";
const SHOW_DATA_RETENTION_WARNING = "show_data_retention_warning";
const SHOW_NON_DEFAULT_WORKSPACE_BANNER = "show_non_default_workspace_banner";
const SHOW_MILESTONE_POST_RECORDING_CELEBRATION = "show_milestone_post_recording_celebration";
const ALL = [
  REQUEST_PUSH_PERMISSIONS,
  SHOW_AVATAR_TOOLTIP,
  EMAIL_VERIFIED,
  DESKTOP_STOP_REC_TOOLTIP,
  SHOW_NEW_GET_STARTED_CHECKLIST_BANNER,
  GMAIL_INTEGRATION_SHARE_PAGE_UPSELL,
  SHOW_GET_STARTED_CHECKLIST,
  SHOW_DOWNLOAD_VIDEO_INFO_MODAL,
  SHOW_MOBILE_BANNER_PROMPT_ON_SHARE_PAGE,
  SHOW_DATA_RETENTION_WARNING,
  SHOW_NON_DEFAULT_WORKSPACE_BANNER,
  SHOW_MILESTONE_POST_RECORDING_CELEBRATION
];
const TRIGGERS_DEFAULTS = {
  [DESKTOP_STOP_REC_TOOLTIP]: {
    complete: false,
    show: false
  },
  [EDUCATION_USER_UPGRADED_MODAL]: {
    show: true,
    complete: false
  },
  [EMAIL_VERIFIED]: {
    complete: false,
    show: false
  },
  [GMAIL_INTEGRATION_SHARE_PAGE_UPSELL]: {
    complete: false,
    show: false
  },
  [REQUEST_PUSH_PERMISSIONS]: {
    complete: false,
    show: false
  },
  [SHOW_AVATAR_TOOLTIP]: {
    complete: false,
    show: false
  },
  [SHOW_DATA_RETENTION_WARNING]: {
    complete: false,
    show: true
  },
  [SHOW_DOWNLOAD_VIDEO_INFO_MODAL]: {
    complete: false,
    show: true
  },
  [SHOW_GET_STARTED_CHECKLIST]: {
    complete: false,
    show: true
  },
  [SHOW_MILESTONE_POST_RECORDING_CELEBRATION]: {
    complete: false,
    show: true
  },
  [SHOW_MOBILE_BANNER_PROMPT_ON_SHARE_PAGE]: {
    complete: false,
    show: true
  },
  [SHOW_NEW_GET_STARTED_CHECKLIST_BANNER]: {
    complete: false,
    show: false
  }
};
export {
  ALL,
  DESKTOP_STOP_REC_TOOLTIP,
  EDUCATION_USER_UPGRADED_MODAL,
  EMAIL_VERIFIED,
  GMAIL_INTEGRATION_SHARE_PAGE_UPSELL,
  REQUEST_PUSH_PERMISSIONS,
  SHOW_AVATAR_TOOLTIP,
  SHOW_DATA_RETENTION_WARNING,
  SHOW_DOWNLOAD_VIDEO_INFO_MODAL,
  SHOW_GET_STARTED_CHECKLIST,
  SHOW_MILESTONE_POST_RECORDING_CELEBRATION,
  SHOW_MOBILE_BANNER_PROMPT_ON_SHARE_PAGE,
  SHOW_NEW_GET_STARTED_CHECKLIST_BANNER,
  SHOW_NON_DEFAULT_WORKSPACE_BANNER,
  TRIGGERS_DEFAULTS
};
//# sourceMappingURL=triggers.js.map
