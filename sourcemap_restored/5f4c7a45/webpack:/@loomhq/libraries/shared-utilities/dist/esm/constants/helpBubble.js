import "../chunk-BYZ2GIR3.js";
const TICKET_CATEGORIES = {
  GENERAL: "general",
  TECHNICAL: "technical",
  ACCOUNT: "account",
  BILLING: "billing",
  FEATURE_REQUEST: "feature_request",
  OTHER: "other",
  GDPR_USER: "gdpr_eu_based_user",
  NON_GDPR_USER: "non_eu_based_user"
};
const CATEGORY_OPTIONS = {
  zendesk: [
    {
      value: TICKET_CATEGORIES.GENERAL,
      title: "Question about how Loom works"
    },
    {
      value: TICKET_CATEGORIES.TECHNICAL,
      title: "Technical issues and bugs"
    },
    { value: TICKET_CATEGORIES.ACCOUNT, title: "My Loom account" },
    { value: TICKET_CATEGORIES.BILLING, title: "Billing, payment, pricing" },
    {
      value: TICKET_CATEGORIES.FEATURE_REQUEST,
      title: "Product suggestions and feature requests"
    },
    { value: TICKET_CATEGORIES.OTHER, title: "Other" }
  ],
  atlassian: [
    {
      value: TICKET_CATEGORIES.GENERAL,
      title: "Question about how Loom works"
    },
    {
      value: TICKET_CATEGORIES.TECHNICAL,
      title: "Technical issues and bugs"
    },
    { value: TICKET_CATEGORIES.ACCOUNT, title: "My Loom account" },
    { value: TICKET_CATEGORIES.BILLING, title: "Billing, payment, pricing" },
    {
      value: TICKET_CATEGORIES.FEATURE_REQUEST,
      title: "Product suggestions and feature requests"
    },
    { value: TICKET_CATEGORIES.OTHER, title: "Other" }
  ]
};
const USER_LOCALE = [
  { title: "Yes, I am located in Europe.", value: TICKET_CATEGORIES.GDPR_USER },
  { title: "No, I am not.", value: TICKET_CATEGORIES.NON_GDPR_USER }
];
const GENERAL_OPTIONS = [
  { title: "Plans available", value: "hiw_plans" },
  { title: "Recording a video", value: "hiw_recording_a_video" },
  { title: "Sharing my video", value: "hiw_sharing_my_video" },
  {
    title: "Video privacy and security",
    value: "hiw_privacy_and_security"
  },
  {
    title: "Managing my video (editing, archiving, deleting)",
    value: "hiw_managing_my_video"
  },
  { title: "Features available", value: "hiw_features_available" },
  {
    title: "My account and profile settings",
    value: "hiw_account_profile_settings"
  },
  {
    title: "Installing Loom (app, extension, mobile)",
    value: "hiw_installing_loom"
  },
  { title: "Help with integrations", value: "hiw_integrations" }
];
const ATLASSIAN_MANAGED_REASON_PLANS_AVAILABLE = "Plans available";
const ATLASSIAN_MANAGED_REASON_RECORDING = "Recording";
const ATLASSIAN_MANAGED_REASON_SHARING = "Sharing";
const ATLASSIAN_MANAGED_REASON_PRIVACY_AND_SECURITY = "Privacy and security";
const ATLASSIAN_MANAGED_REASON_MANAGING_VIDEOS = "Managing videos";
const ATLASSIAN_MANAGED_REASON_FEATURES_AVAILABLE = "Features available";
const ATLASSIAN_MANAGED_REASON_ACCOUNT_SETTINGS = "Account settings";
const ATLASSIAN_MANAGED_REASON_INTEGRATION_HELP = "Integrations help";
const ATLASSIAN_MANAGED_REASON_INSTALLING_LOOM = "Installing Loom";
const GENERAL_OPTIONS_ATLASSIAN_MANAGED = [
  { title: "Plans available", value: ATLASSIAN_MANAGED_REASON_PLANS_AVAILABLE },
  { title: "Recording a video", value: ATLASSIAN_MANAGED_REASON_RECORDING },
  { title: "Sharing my video", value: ATLASSIAN_MANAGED_REASON_SHARING },
  {
    title: "Video privacy and security",
    value: ATLASSIAN_MANAGED_REASON_PRIVACY_AND_SECURITY
  },
  {
    title: "Managing my video (editing, archiving, deleting)",
    value: ATLASSIAN_MANAGED_REASON_MANAGING_VIDEOS
  },
  {
    title: "Features available",
    value: ATLASSIAN_MANAGED_REASON_FEATURES_AVAILABLE
  },
  {
    title: "My account and profile settings",
    value: ATLASSIAN_MANAGED_REASON_ACCOUNT_SETTINGS
  },
  {
    title: "Installing Loom (app, extension, mobile)",
    value: ATLASSIAN_MANAGED_REASON_INSTALLING_LOOM
  },
  {
    title: "Help with integrations",
    value: ATLASSIAN_MANAGED_REASON_INTEGRATION_HELP
  }
];
const TECHNICAL_OPTIONS = [
  {
    title: "Workspace issues (video limits, inviting members)",
    value: "ti_workspace_issues"
  },
  { title: "I can't find my videos", value: "ti_cant_find_videos" },
  {
    title: "I'm having trouble installing Loom",
    value: "ti_installing_loom"
  },
  {
    title: "I can't record / the recording is crashing",
    value: "ti_crashing"
  },
  { title: "I can't download my video", value: "ti_download_issues" },
  {
    title: "My video won't upload / I can't watch my video",
    value: "ti_processing_issues"
  },
  {
    title: "I'm having microphone and/or camera issues",
    value: "ti_mic_cam_issues"
  },
  {
    title: "I need to report a bug / feature is not working correctly",
    value: "ti_bug"
  },
  { title: "I'm getting an error message", value: "ti_error_message" },
  { title: "Can't access my account", value: "ti_cant_access_account" }
];
const ATLASSIAN_MANAGED_REASON_WORKSPACE_ISSUES = "Workspace issues";
const ATLASSIAN_MANAGED_REASON_FIND_VIDEOS = "Can't find my videos";
const ATLASSIAN_MANAGED_REASON_INSTALLATION_TROUBLE = "Installation trouble";
const ATLASSIAN_MANAGED_REASON_CANT_RECORD = "Can't record";
const ATLASSIAN_MANAGED_REASON_CANT_DOWNLOAD = "Can't download video";
const ATLASSIAN_MANAGED_REASON_WONT_UPLOAD = "Video won't upload";
const ATLASSIAN_MANAGED_REASON_MIC_CAMERA = "Microphone/camera issues";
const ATLASSIAN_MANAGED_REASON_REPORT_BUG = "Report a bug";
const ATLASSIAN_MANAGED_REASON_ERROR_MESSAGES = "Error messages";
const ATLASSIAN_MANAGED_REASON_CANT_ACCESS_ACCOUNT = "Can't access account";
const ATLASSIAN_MANAGED_REASON_TRANSCRIPT_AI = "Transcript/AI/editing/ issue";
const TECHNICAL_OPTIONS_ATLASSIAN_MANAGED = [
  {
    title: "Workspace issues (video limits, inviting members)",
    value: ATLASSIAN_MANAGED_REASON_WORKSPACE_ISSUES
  },
  {
    title: "I can't find my videos",
    value: ATLASSIAN_MANAGED_REASON_FIND_VIDEOS
  },
  {
    title: "I'm having trouble installing Loom",
    value: ATLASSIAN_MANAGED_REASON_INSTALLATION_TROUBLE
  },
  {
    title: "I can't record / the recording is crashing",
    value: ATLASSIAN_MANAGED_REASON_CANT_RECORD
  },
  {
    title: "I can't download my video",
    value: ATLASSIAN_MANAGED_REASON_CANT_DOWNLOAD
  },
  {
    title: "My video won't upload / I can't watch my video",
    value: ATLASSIAN_MANAGED_REASON_WONT_UPLOAD
  },
  {
    title: "I'm having microphone and/or camera issues",
    value: ATLASSIAN_MANAGED_REASON_MIC_CAMERA
  },
  {
    title: "I need to report a bug / feature is not working correctly",
    value: ATLASSIAN_MANAGED_REASON_REPORT_BUG
  },
  {
    title: "I'm getting an error message",
    value: ATLASSIAN_MANAGED_REASON_ERROR_MESSAGES
  },
  {
    title: "Can't access my account",
    value: ATLASSIAN_MANAGED_REASON_CANT_ACCESS_ACCOUNT
  },
  {
    title: "I need help with Integrations",
    value: ATLASSIAN_MANAGED_REASON_INTEGRATION_HELP
  },
  {
    title: "I'm having issues with AI or editing features",
    value: ATLASSIAN_MANAGED_REASON_TRANSCRIPT_AI
  }
];
const ACCOUNT_OPTIONS_NON_LOGGED_IN_USER = [
  {
    title: "Merging accounts or transferring videos",
    value: "am_merge_transfer"
  },
  {
    title: "Updating account details, changing email, resetting password, etc...",
    value: "am_update"
  },
  { title: "Can't access my account", value: "am_cant_access_account" },
  { title: "Deleting my account", value: "am_delete_account" }
];
const ACCOUNT_OPTIONS = [
  { title: "Upgrading my subscription", value: "am_upgrade" },
  { title: "Extending my trial", value: "am_extending_my_trial" },
  ...ACCOUNT_OPTIONS_NON_LOGGED_IN_USER
];
const ACCOUNT_UPDATE_DETAILS = "Update account details";
const ACCOUNT_MERGE = "Merge accounts";
const ACCOUNT_CANT_ACCESS = "Can't access account";
const ACCOUNT_DELETE = "Deleting my account";
const ACCOUNT_ISSUES = {
  ACCOUNT_UPDATE_DETAILS,
  ACCOUNT_MERGE,
  ACCOUNT_CANT_ACCESS,
  ACCOUNT_DELETE
};
const ACCOUNT_OPTIONS_ATLASSIAN_MANAGED = Object.values(
  ACCOUNT_ISSUES
).map((issue) => {
  return { title: issue, value: issue };
});
const BILLING_OPTIONS = [
  { title: "Upgrading my account", value: "bp_upgrade" },
  {
    title: "Downgrading or cancelling my account",
    value: "bp_downgrade"
  },
  { title: "Billing or payment problem", value: "bp_payment_issues" },
  { title: "Extending my trial", value: "bp_trial_extension" },
  { title: "Update invoice", value: "update_invoice" },
  { title: "Requesting a refund", value: "bp_refund_request" }
];
const BILLING_UPGRADING_MY_ACCOUNT = "Upgrading my account";
const BILLING_DOWNGRADE_CANCEL_ACCOUNT = "Downgrading or cancelling my account";
const BILLING_BILLING_PAYMENT_PROBLEM = "Billing or payment problem";
const BILLING_EXTENDING_TRIAL = "Extending my trial";
const BILLING_UPDATE_INVOICE = "Update invoice";
const BILLING_REQUESTING_REFUND = "Requesting a refund";
const BILLING_ISSUES = {
  BILLING_UPGRADING_MY_ACCOUNT,
  BILLING_DOWNGRADE_CANCEL_ACCOUNT,
  BILLING_BILLING_PAYMENT_PROBLEM,
  BILLING_EXTENDING_TRIAL,
  BILLING_UPDATE_INVOICE,
  BILLING_REQUESTING_REFUND
};
const BILLING_OPTIONS_ATLASSIAN_MANAGED = Object.values(
  BILLING_ISSUES
).map((issue) => {
  return { title: issue, value: issue };
});
const CHROME_EXTENSION = "Chrome Extension";
const DESKTOP_APPLICATION_WINDOWS = "Desktop Application (Windows)";
const DESKTOP_APPLICATION_MAC = "Desktop Application (Mac)";
const MOBILE_IOS_APP = "Mobile iOS App";
const MOBILE_ANDROID_APP = "Mobile Android App";
const LOOM_SDK = "loomSDK";
const MY_VIDEO_DASHBOARD = "My Video Dashboard";
const PLATFORM_OPTIONS_ATLASSIAN = {
  CHROME_EXTENSION,
  DESKTOP_APPLICATION_WINDOWS,
  DESKTOP_APPLICATION_MAC,
  MOBILE_IOS_APP,
  MOBILE_ANDROID_APP,
  LOOM_SDK,
  MY_VIDEO_DASHBOARD
};
const PLATFORM_OPTIONS_ATLASSIAN_MANAGED = Object.values(
  PLATFORM_OPTIONS_ATLASSIAN
).map((platform) => {
  return { title: platform, value: platform };
});
const CATEGORY_ISSUES_MAP = {
  [TICKET_CATEGORIES.GENERAL]: {
    zendesk: GENERAL_OPTIONS,
    atlassian: GENERAL_OPTIONS_ATLASSIAN_MANAGED
  },
  [TICKET_CATEGORIES.TECHNICAL]: {
    zendesk: TECHNICAL_OPTIONS,
    atlassian: TECHNICAL_OPTIONS_ATLASSIAN_MANAGED
  },
  [TICKET_CATEGORIES.ACCOUNT]: {
    // Per conversations below, legacy users see the same options as Atlassian managed users
    // https://atlassian.slack.com/archives/C08DZTRQJUC/p1752778075733049?thread_ts=1752711829.021399&cid=C08DZTRQJUC
    zendesk: ACCOUNT_OPTIONS_ATLASSIAN_MANAGED,
    atlassian: ACCOUNT_OPTIONS_ATLASSIAN_MANAGED,
    nonLoggedInUser: ACCOUNT_OPTIONS_NON_LOGGED_IN_USER
  },
  [TICKET_CATEGORIES.BILLING]: {
    zendesk: BILLING_OPTIONS,
    atlassian: BILLING_OPTIONS_ATLASSIAN_MANAGED
  }
};
export {
  ACCOUNT_CANT_ACCESS,
  ACCOUNT_DELETE,
  ACCOUNT_ISSUES,
  ACCOUNT_MERGE,
  ACCOUNT_OPTIONS,
  ACCOUNT_OPTIONS_ATLASSIAN_MANAGED,
  ACCOUNT_OPTIONS_NON_LOGGED_IN_USER,
  ACCOUNT_UPDATE_DETAILS,
  ATLASSIAN_MANAGED_REASON_ACCOUNT_SETTINGS,
  ATLASSIAN_MANAGED_REASON_CANT_ACCESS_ACCOUNT,
  ATLASSIAN_MANAGED_REASON_CANT_DOWNLOAD,
  ATLASSIAN_MANAGED_REASON_CANT_RECORD,
  ATLASSIAN_MANAGED_REASON_ERROR_MESSAGES,
  ATLASSIAN_MANAGED_REASON_FEATURES_AVAILABLE,
  ATLASSIAN_MANAGED_REASON_FIND_VIDEOS,
  ATLASSIAN_MANAGED_REASON_INSTALLATION_TROUBLE,
  ATLASSIAN_MANAGED_REASON_INSTALLING_LOOM,
  ATLASSIAN_MANAGED_REASON_INTEGRATION_HELP,
  ATLASSIAN_MANAGED_REASON_MANAGING_VIDEOS,
  ATLASSIAN_MANAGED_REASON_MIC_CAMERA,
  ATLASSIAN_MANAGED_REASON_PLANS_AVAILABLE,
  ATLASSIAN_MANAGED_REASON_PRIVACY_AND_SECURITY,
  ATLASSIAN_MANAGED_REASON_RECORDING,
  ATLASSIAN_MANAGED_REASON_REPORT_BUG,
  ATLASSIAN_MANAGED_REASON_SHARING,
  ATLASSIAN_MANAGED_REASON_TRANSCRIPT_AI,
  ATLASSIAN_MANAGED_REASON_WONT_UPLOAD,
  ATLASSIAN_MANAGED_REASON_WORKSPACE_ISSUES,
  BILLING_BILLING_PAYMENT_PROBLEM,
  BILLING_DOWNGRADE_CANCEL_ACCOUNT,
  BILLING_EXTENDING_TRIAL,
  BILLING_ISSUES,
  BILLING_OPTIONS,
  BILLING_OPTIONS_ATLASSIAN_MANAGED,
  BILLING_REQUESTING_REFUND,
  BILLING_UPDATE_INVOICE,
  BILLING_UPGRADING_MY_ACCOUNT,
  CATEGORY_ISSUES_MAP,
  CATEGORY_OPTIONS,
  CHROME_EXTENSION,
  DESKTOP_APPLICATION_MAC,
  DESKTOP_APPLICATION_WINDOWS,
  GENERAL_OPTIONS,
  GENERAL_OPTIONS_ATLASSIAN_MANAGED,
  LOOM_SDK,
  MOBILE_ANDROID_APP,
  MOBILE_IOS_APP,
  MY_VIDEO_DASHBOARD,
  PLATFORM_OPTIONS_ATLASSIAN,
  PLATFORM_OPTIONS_ATLASSIAN_MANAGED,
  TECHNICAL_OPTIONS,
  TECHNICAL_OPTIONS_ATLASSIAN_MANAGED,
  TICKET_CATEGORIES,
  USER_LOCALE
};
//# sourceMappingURL=helpBubble.js.map
