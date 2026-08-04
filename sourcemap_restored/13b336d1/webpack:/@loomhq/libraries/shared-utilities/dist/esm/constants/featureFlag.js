import "../chunk-BYZ2GIR3.js";
import { Team } from "./product";
import { STATSIG_ANALYTICS_LIST, ControlType, EXPERIMENTS } from "./statsig";
const CONTROL = "control";
const VARIANT = "variant";
const DUMMY_VARIANT = "dummy-".concat(VARIANT);
const ACTIVE = "active";
const VARIANT_AND_ACTIVE = [VARIANT, ACTIVE, "".concat(VARIANT, "-excluded")];
const ROLLOUT_DATA_RETENTION_CIRCUIT_BREAKER = "rollout-data-retention-circuit-breaker";
const SHUTOFF_STRIPE_RATE_LIMIT = "shutoff-stripe-rate-limit";
const ROLLOUT_PRICING_BACKFILL = "rollout-pricing-backfill";
const ROLLOUT_BILLING_QUANTITY_SMART_SYNC = (
  // migrated
  "rollout-billing-quantity-smart-sync"
);
const ROLLOUT_LOOM_QUANTITY_SMART_SYNC = "rollout-loom-quantity-sync";
const GATE_BILLING_DIGITAL_WALLETS = "loom-billing-digital-wallets-gate";
const ROLLOUT_FALL_24_TRIAL_NET_NEW = "rollout-fall-24-trial-net-new";
const ROLLOUT_FALL_24_EDUCATION_DESCOPE = (
  //migrated
  "rollout-fall-2024-education-descope"
);
const CHECKOUT_UI_IMPROVEMENT = "checkout-ui-improvement-q3-25";
const ROLLOUT_DATA_RETENTION_DELETION_LIMIT = "rollout-data-retention-deletion-limit";
const ROLLOUT_WORKSPACE_PROVISIONING_INTEGRATION = "rollout-workspace-provisioning-integration";
const ROLLOUT_EMBED_FOLDERS = "rollout-embed-folders";
const ROLLOUT_FOLDER_PERMISSIONS = "rollout-folder-permissions";
const ATLASSIAN_PREF_CENTER_HEALTHCHECK_PING_INTERVAL = "atlassian-pref-center-healthcheck-ping-interval";
const EXP_SHARE_PAGE_SLUGS = "exp-share-page-slugs";
const ROLLOUT_VIDEO_PLAYER_PRE_PLAY_SCREEN = "rollout-video-player-pre-play-screen";
const ROLLOUT_AVSERVER_BYPASS_DASH = "rollout-avserver-bypass-dash";
const ROLLOUT_ACCOUNT_SUSPENSION_LACK_OF_PAYMENT = "rollout-account-suspension-lack-of-payment";
const ROLLOUT_LIMIT_BUSINESS_CREATOR_LITE = "rollout-limit-business-creator-lite";
const ROLLOUT_MOBILE_REMINDER_TO_RECORD = "rollout-mobile-reminder-to-record";
const MINT_LPID_COOKIE_IN_TOKEN_HANDLER = "mint-lpid-cookie-in-token-handler";
const ROLLOUT_WHISPER_SEGMENT_COMPRESSION = (
  // migrated
  "rollout-whisper-segment-compression"
);
const UPGRADE_GPT_MODEL_FOR_TRANSCRIPT_BASED_AI = "upgrade-gpt-model-for-transcript-based-ai";
const BRAINTRUST_SAMPLE_RATE_AUTO_CONTEXT = (
  // migrated
  "braintrust-sample-rate-auto-context"
);
const BRAINTRUST_SAMPLE_RATE_MEETING_RECORDINGS = (
  // migrated
  "braintrust-sample-rate-meeting-recordings"
);
const BRAINTRUST_SAMPLE_RATE_SHARE_MESSAGES = (
  // migrated
  "braintrust-sample-rate-share-messages"
);
const EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING = (
  // migrated
  "experiment-default-silence-and-filler-word-trimming"
);
const EXPERIMENT_SEMANTIC_SEARCH = "experiment-semantic-search";
const EXPERIMENT_SEMANTIC_SEARCH_UI = "experiment-semantic-search-ui";
const ROLLOUT_SEMANTIC_SEARCH_AUTO_BACKFILL = (
  // migrated
  "rollout-semantic-search-auto-backfill"
);
const SEND_HLS_PLAYBACK_STATS = "send_hls_playback_stats";
const PERMANENT_CAN_CHANGE_SALES_SUPPORT_TYPE = "permanent-can-change-sales-support-type";
const ROLLOUT_CALENDLY_MODAL = "rollout-calendly-modal";
const ROLLOUT_INTEGRATIONS_ZOOM_GA_UI = "rollout-integration-zoom-ga-ui";
const ROLLOUT_INTEGRATIONS_DATASYNC = "rollout-integrations-datasync";
const HIDE_DURING_DOWNTIME = "hide-during-downtime";
const MENTION_PROCESSING_SHUTOFF = "at-mention-processing-emergency-shutoff";
const ENABLE_ACCOUNT_RENEWAL_NOTICE = "enable-account-renewal";
const ROLLOUT_CAM_BUBBLE_ON_BOARDING = "rollout-cam-bubble-on-boarding-0";
const DISABLE_EXTENSION_NOTIFICATIONS = (
  // migrated
  "disable-extension-notifications"
);
const SALESFORCE_INTEGRATION_VERSION = "salesforce_integration_version";
const ROLLOUT_STREAM_UPLOADER_WINDOWS_2 = "rollout-stream-uploader-windows-2";
const ROLLOUT_STREAM_UPLOADER_MAC = "rollout-stream-uploader-mac";
const ROLLOUT_CAM_SPLIT_ENCODING = "rollout-cam-split-encoding";
const ROLLOUT_ISOLATED_UPLOADER = "rollout-isolated-uploader";
const DESKTOP_RELEASE_CHANNEL = "desktop-recorder-release-channel-v2";
const RECORDING_CLIENTS_BANNER = "recording-clients-banner";
const ROLLOUT_DESKTOP_AIRHORN = "rollout-desktop-airhorn";
const ROLLOUT_CLIENTS_SCREENSHOT_DELAYED_FTUX = (
  // migrated
  "rollout-screenshots-delayed-ftux"
);
const DESKTOP_BITDRIFT_LOGGING = "desktop_bitdrift_logging";
const ENABLE_OIDC_JWT_MIDDLEWARE = "enable-oidc-jwt-middleware";
const WHITE_LABEL_PLAYER_FEATURE = "white-label-player-feature";
const EXTENSION_UPLOAD_STREAMING = "extension-upload-streaming";
const TEST_APIS_ENABLED = "test-apis-enabled";
const COMPANION_SITE_CONTROL_SETTINGS_SITE_LIST = "constants-companion-site-control-settings-site-list";
const ROLLOUT_SPEAKER_NOTES_OLD_RECORDER = "rollout-speaker-notes-old-recorder";
const EXPERIMENT_POST_RECORDING_CELEBRATION_CONTINUOUS_V2 = "experiment-post-record-celebrations-2-continuous-v2.2";
const ROLLOUT_LOG_MOBILE_ACTIVE_USER_EVENT = (
  // migrated
  "rollout-log-mobile-active-user-event"
);
const SIGNUP_ALLOW_DOMAIN = "signup-allow-domain";
const SHOW_EXTENSION_DOWNLOAD = "show-extension-download";
const ROLLOUT_NEW_UNFURLED_LOOMS_IN_COMMENTS = "rollout-new-unfurled-looms-in-comments";
const ROLLOUT_CSRF_PROTECTION = "rollout-csrf-protection";
const ROLLOUT_IOS_NOTIFICATION_BADGE = "ios-push-notification-badge";
const ROLLOUT_DESKTOP_RECORDER_ONBOARDING_SCREENS = "rollout-desktop-recorder-onboarding-screens";
const SEASONAL_LAUNCH_TOUR = "seasonal-launch-tour";
const SEASONAL_LAUNCH_MODAL_VARIANTS = "seasonal-launch-modal-variants";
const CONFIG_BILLING_HEX_PARSER = "billing-hex-parser-config";
const BILL_THE_ASSISTANT_SCRIPT_CONFIG = "bill-the-assistant-script-config";
const CONFIG_WELCOME_LOOMS_IDS_LOOMHQ = "config-welcome-looms-ids-loomhq";
const AVSERVER_SEGMENT_SPLITTING = "avserver-segment-splitting";
const AVSERVER_V5_SEGMENT_SPLITTING = "avserver-v5-segment-splitting";
const AVSERVER_HLS_EXT_X_MEDIA_SUBS = "avserver-hls-ext-x-media-subs";
const ULTRAFAST_4K_ENCODING = "ultrafast-4k-encoding";
const ROLLOUT_STREAMHUB_PERMISSIONS_PROCESSING = "rollout-streamhub-permissions-processing-percent";
const ROLLOUT_STREAMHUB_USER_PROFILE_UPDATE_PROCESSING = "rollout-streamhub-user-profile-update-processing-percent";
const LOOM_POST_VIEW_DISCOVERY = "loom-post-view-discovery";
const CAN_DISCOVER_VERSION = "can-discover-version";
const ROLLOUT_SLACK_CONNECT_PROMPT_TO_NEWLY_CONNECTING_WORKSPACES = (
  // migrated
  "rollout-slack-connect-prompt-to-newly-connecting-workspaces"
);
const ATLASSIAN_SIGNUPS_FOR_TESTING = "create-test-atlassian-signups";
const SKIP_PRS_FETCHING = "skip-prs-fetching";
const KILLSWITCH_ATLASSIAN_TOKEN_AUTH = "killswitch-atlassian-token-auth";
const KILLSWITCH_LINK_RESOLVER = "killswitch-link-resolver";
const ROLLOUT_ATLASSIAN_NOTIFICATIONS = "rollout-atlassian-notifications";
const KILLSWITCH_GSAC = "killswitch-gsac";
const EMAIL_SPAM_RATE_LIMITS = "email-spam-rate-limits";
const ROLLOUT_EMAIL_SERVICE_PROVIDER = "rollout-email-service-provider";
const ROLLOUT_PERIPHERAL_COOKIE = "rollout-peripheral-cookie";
const ROLLOUT_SESSION_SAMESITE_UPDATE = "rollout-session-samesite-update";
const ENABLE_WORKOS_DOMAIN_CONNECTION_MAP = "enable-workos-domain-cache";
const CONFIG_PREVENT_ENTERPRISE_AUTOJOIN_SSO = "config-prevent-enterprise-autojoin-sso";
const HACK_FORCE_ADD_USERS_TO_ATLASSIAN = (
  //Temp until Atlassian workspace moves to Admin hub: Patch for missing workos events for Atlassian
  "hack-force-add-users-to-atlassian"
);
const INSIGHTS_MILESTONE_TIME_SAVED = "insights-milestone-time-saved";
const INSIGHTS_DIGEST_SELECT_EMAILS = "insights-digest-select-emails";
const ROLLOUT_NOTIFICATION_SETTINGS_V2 = (
  // migrated
  "rollout-notification-settings-v2"
);
const EXP_UPDATED_MOBILE_ONBOARDING = "exp-updated-mobile-onboarding";
const ADD_MOBILE_DOWNLOAD_INVITATION = "add-mobile-download-invitation-new";
const RABBITMQ_CONSUMER_STARTUP_CONTROL = "rabbitmq-consumer-startup";
const FIX_PERSISTENT_RECORD_MULTIPLE_RECORDERS_TRIGGERING_NUMBER_VARIANT = (
  // migrated
  "fix-persistent-record-multiple-recorders-triggering-number-variant"
);
const EXP_ANON_COMMENTS_SIDEBAR_GATING = "experiment-anon-comments-sidebar-gating";
const EXP_AI_WORKFLOWS_FOR_VIEWERS = "exp-ai-workflows-for-viewers";
const ROLLOUT_COMMUNITY_LOOMS = "rollout-community-looms";
const ROLLOUT_COMMUNITY_LOOMS_VARIANTS = [true];
const CONFIG_COMMUNITY_EMPTY_STATE_LOOM_IDS = (
  // migrated
  "config-community-empty-state-loom-ids-loomhq"
);
const ROLLOUT_POST_TO_COMMUNITY = "rollout-post-to-community";
const EXPERIMENT_LIBRARY_INSIGHTS_V2 = "exp-library-insights-v2";
const EXP_HOMEPAGE_HERO_VIDEOS_EMBED = "experiment-homepage-hero-video-embed";
const STAGING_LOOM_DOMAIN_SUGGESTED_WS_CONFIG = "staging-loom-domain-suggested-ws";
const EXP_UPDATE_SIGNUP_ON_PAUSE = "exp-update-signup-on-pause";
const DARK_MODE_TOGGLE = "dark-mode-toggle";
const ROLLOUT_SELF_VIEW_CACHING = "rollout-self-view-caching";
const CONFIG_ENABLE_DEV_TOOLS = "enable-dev-tools";
const ROLLOUT_LOOM_SSR_USER_SWAP = "rollout-loom-ssr-user-swap";
const REWATCH_MEETINGS = "rewatch-meetings";
const MEETING_RECORDING_LIBRARY_FILTER = "rewatch_meetings_-_library_filter";
const REWATCH_MEETINGS_PIN_ENGLISH_LANGUAGE = (
  // migrated
  "rewatch-meetings-pin-english-language"
);
const REWATCH_ZOOM_LOCAL_RECORDING_DISABLED_WARNING = "rewatch-zoom-local-recording-disabled-warning";
const GENERATE_TRANSCRIPT_CTA = "generate-transcript-cta";
const ROLLOUT_BLOCK_UPLOAD_TRANSCRIPTION = (
  // migrated
  "rollout-block-upload-transcription"
);
const RECORDING_CLIENTS_SCHEDULED_DOWNTIME = "recording-clients-scheduled-downtime";
const ROLLOUT_NEW_DELETE = "rollout-new-delete";
const FEATURE_FLAGS_ANALYTICS_LIST = [
  ...STATSIG_ANALYTICS_LIST,
  // Statsig experiments
  DISABLE_EXTENSION_NOTIFICATIONS,
  ROLLOUT_STREAM_UPLOADER_WINDOWS_2,
  ROLLOUT_STREAM_UPLOADER_MAC,
  ROLLOUT_CAM_BUBBLE_ON_BOARDING,
  ROLLOUT_PRICING_BACKFILL,
  WHITE_LABEL_PLAYER_FEATURE,
  EXTENSION_UPLOAD_STREAMING,
  ROLLOUT_SPEAKER_NOTES_OLD_RECORDER,
  ROLLOUT_SLACK_CONNECT_PROMPT_TO_NEWLY_CONNECTING_WORKSPACES,
  ROLLOUT_COMMUNITY_LOOMS,
  ROLLOUT_LOG_MOBILE_ACTIVE_USER_EVENT,
  EXP_ANON_COMMENTS_SIDEBAR_GATING,
  INSIGHTS_MILESTONE_TIME_SAVED,
  ROLLOUT_WHISPER_SEGMENT_COMPRESSION,
  ROLLOUT_EMAIL_SERVICE_PROVIDER,
  DESKTOP_RELEASE_CHANNEL,
  EXP_SHARE_PAGE_SLUGS,
  ROLLOUT_DESKTOP_RECORDER_ONBOARDING_SCREENS,
  EXPERIMENT_SEMANTIC_SEARCH,
  EXPERIMENT_SEMANTIC_SEARCH_UI,
  EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING,
  ATLASSIAN_SIGNUPS_FOR_TESTING,
  AVSERVER_SEGMENT_SPLITTING,
  AVSERVER_V5_SEGMENT_SPLITTING,
  EXPERIMENT_LIBRARY_INSIGHTS_V2,
  EXP_UPDATE_SIGNUP_ON_PAUSE,
  EXP_UPDATED_MOBILE_ONBOARDING,
  ROLLOUT_FALL_24_TRIAL_NET_NEW,
  ROLLOUT_FALL_24_EDUCATION_DESCOPE,
  GENERATE_TRANSCRIPT_CTA,
  ADD_MOBILE_DOWNLOAD_INVITATION,
  REWATCH_MEETINGS,
  ROLLOUT_CLIENTS_SCREENSHOT_DELAYED_FTUX,
  EXPERIMENTS.EXP_LOOM_CHROME_DEVELOPER_CONTEXT,
  ROLLOUT_LOOM_QUANTITY_SMART_SYNC
];
const SEGMENT_EVENT_IGNORE_LIST = {
  "experiment-loom-companion-beam-v2": [
    "active",
    "ineligible",
    "ineligible-request-source",
    "ineligible-logged-in",
    "ineligible-recording-limit",
    "ineligible-workspace-role",
    "ineligible-scopes"
  ]
};
const THIS_SHOULD_NOT_MAKE_IT_TO_PROD = "THIS_SHOULD_NOT_MAKE_IT_TO_PROD";
const EXAMPLE_FLAG_TO_MIGRATE = "example-flag-to-migrate";
const STATSIG_MIGRATION_FLAGS_OBJ = {
  [ROLLOUT_COMMUNITY_LOOMS]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-community-looms"
  },
  [CONFIG_COMMUNITY_EMPTY_STATE_LOOM_IDS]: {
    team: Team.Outreach,
    newControlType: ControlType.DYNAMIC_CONFIG,
    newKey: "config-community-empty-state-loom-ids-loomhq-3",
    useNewResult: true,
    statsigLink: "https://console.statsig.com/dynamic_configs/config-community-empty-state-loom-ids-loomhq-3"
  },
  [RECORDING_CLIENTS_BANNER]: {
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/recording-clients-banner"
  },
  [ROLLOUT_STREAM_UPLOADER_WINDOWS_2]: {
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-stream-uploader-windows-2"
  },
  [ROLLOUT_STREAM_UPLOADER_MAC]: {
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-stream-uploader-mac"
  },
  [ROLLOUT_CAM_SPLIT_ENCODING]: {
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-cam-split-encoding"
  },
  [RECORDING_CLIENTS_SCHEDULED_DOWNTIME]: {
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/recording-clients-scheduled-downtime"
  },
  [ROLLOUT_DESKTOP_AIRHORN]: {
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-desktop-airhorn"
  },
  [DESKTOP_RELEASE_CHANNEL]: {
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/desktop-recorder-release-channel-v2"
  },
  [DESKTOP_BITDRIFT_LOGGING]: {
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/desktop_bitdrift_logging"
  },
  [FIX_PERSISTENT_RECORD_MULTIPLE_RECORDERS_TRIGGERING_NUMBER_VARIANT]: {
    team: Team.RecordingClients,
    newKey: "persistent-record-desktop-wait-config",
    newControlType: ControlType.DYNAMIC_CONFIG,
    configGetValue: true,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/persistent-record-desktop-wait-config"
  },
  [COMPANION_SITE_CONTROL_SETTINGS_SITE_LIST]: {
    team: Team.RecordingClients,
    newKey: "companion-site-control-settings-site-list",
    statsigLink: "https://console.statsig.com/experiments/companion-site-control-settings-site-list",
    useNewResult: true
  },
  [ROLLOUT_ISOLATED_UPLOADER]: {
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    statsigLink: "https://console.statsig.com/gates/rollout-isolated-uploader",
    useNewResult: true
  },
  [DISABLE_EXTENSION_NOTIFICATIONS]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/disable-extension-notifications"
  },
  [DARK_MODE_TOGGLE]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/dark-mode-toggle"
  },
  [GENERATE_TRANSCRIPT_CTA]: {
    team: Team.ShareAndTransform,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/generate-transcript-cta"
  },
  // sdk constant
  ["rollout-sdk-ftux-onboarding"]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-sdk-ftux-onboarding"
  },
  [ENABLE_WORKOS_DOMAIN_CONNECTION_MAP]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/enable-workos-domain-cache"
  },
  // chrome-extension?
  ["experiment-loom-companion-beam-v4"]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/experiment-loom-companion-beam-v4"
  },
  [ROLLOUT_POST_TO_COMMUNITY]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-post-to-community"
  },
  [ROLLOUT_SLACK_CONNECT_PROMPT_TO_NEWLY_CONNECTING_WORKSPACES]: {
    team: Team.Outreach,
    newKey: "rollout-slack-connect-prompt-to-newly-conn-wkspce",
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-slack-connect-prompt-to-newly-conn-wkspce"
  },
  [ROLLOUT_LOG_MOBILE_ACTIVE_USER_EVENT]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-log-mobile-active-user-event"
  },
  [SIGNUP_ALLOW_DOMAIN]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/signup-allow-domain"
  },
  [CONFIG_PREVENT_ENTERPRISE_AUTOJOIN_SSO]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/config-prevent-enterprise-autojoin-sso"
  },
  [ROLLOUT_NOTIFICATION_SETTINGS_V2]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-notification-settings-v2"
  },
  [INSIGHTS_MILESTONE_TIME_SAVED]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/insights-milestone-time-saved"
  },
  [ROLLOUT_PERIPHERAL_COOKIE]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-peripheral-cookie"
  },
  [EXP_SHARE_PAGE_SLUGS]: {
    team: Team.EnterpriseReadiness,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/exp-share-page-slugs"
  },
  [ROLLOUT_SELF_VIEW_CACHING]: {
    team: Team.EnterpriseReadiness,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-self-view-caching"
  },
  [CONFIG_ENABLE_DEV_TOOLS]: {
    team: Team.CorePlatform,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/enable-dev-tools"
  },
  ["debug-menu"]: {
    team: Team.Mobile,
    // iOS
    newKey: "loom-ios-debug-menu",
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/loom-ios-debug-menu"
  },
  ["ios-killswitch"]: {
    team: Team.Mobile,
    // iOS
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/ios-killswitch"
  },
  ["ios-video-view-rating-prompt"]: {
    team: Team.Mobile,
    // iOS
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/ios-video-view-rating-prompt"
  },
  [ROLLOUT_WHISPER_SEGMENT_COMPRESSION]: {
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-whisper-segment-compression"
  },
  ["sck-h-264-encoder-outstanding-frames-count"]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/sck-h-264-encoder-outstanding-frames-count"
  },
  // desktop
  [EXPERIMENT_SEMANTIC_SEARCH]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/experiment-semantic-search"
  },
  // chrome-extension
  ["dash-segment-duration"]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/dash-segment-duration"
  },
  [AVSERVER_SEGMENT_SPLITTING]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/avserver-segment-splitting"
  },
  [AVSERVER_HLS_EXT_X_MEDIA_SUBS]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/avserver-hls-ext-x-media-subs"
  },
  [EXPERIMENT_SEMANTIC_SEARCH_UI]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/experiment-semantic-search-ui"
  },
  [AVSERVER_V5_SEGMENT_SPLITTING]: {
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    newKey: "avserver-v5-segment-splitting-gate",
    statsigLink: "https://console.statsig.com/gates/avserver-v5-segment-splitting-gate"
  },
  [ULTRAFAST_4K_ENCODING]: {
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/ultrafast-4k-encoding"
  },
  [ROLLOUT_SEMANTIC_SEARCH_AUTO_BACKFILL]: {
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-semantic-search-auto-backfill"
  },
  [ROLLOUT_BLOCK_UPLOAD_TRANSCRIPTION]: {
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-block-upload-transcription"
  },
  [EXP_UPDATE_SIGNUP_ON_PAUSE]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/exp-update-signup-on-pause"
  },
  [ROLLOUT_CLIENTS_SCREENSHOT_DELAYED_FTUX]: {
    team: Team.ShareAndTransform,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-screenshots-delayed-ftux"
  },
  [BRAINTRUST_SAMPLE_RATE_SHARE_MESSAGES]: {
    team: Team.ShareAndTransform,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/braintrust-sample-rate-share-messages"
  },
  [SEASONAL_LAUNCH_MODAL_VARIANTS]: {
    team: Team.ShareAndTransform,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/seasonal-launch-modal-variants"
  },
  [UPGRADE_GPT_MODEL_FOR_TRANSCRIPT_BASED_AI]: {
    team: Team.ShareAndTransform,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/upgrade-gpt-model-for-transcript-based-ai"
  },
  [CONFIG_WELCOME_LOOMS_IDS_LOOMHQ]: {
    team: Team.Outreach,
    newControlType: ControlType.DYNAMIC_CONFIG,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/dynamic_configs/config-welcome-looms-ids-loomhq"
  },
  [SHOW_EXTENSION_DOWNLOAD]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/show-extension-download"
  },
  [EXP_UPDATED_MOBILE_ONBOARDING]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/exp-updated-mobile-onboarding"
  },
  [EXP_HOMEPAGE_HERO_VIDEOS_EMBED]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/experiment-homepage-hero-video-embed"
  },
  [HACK_FORCE_ADD_USERS_TO_ATLASSIAN]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/hack-force-add-users-to-atlassian"
  },
  [ATLASSIAN_SIGNUPS_FOR_TESTING]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/create-test-atlassian-signups"
  },
  [STAGING_LOOM_DOMAIN_SUGGESTED_WS_CONFIG]: {
    team: Team.Outreach,
    newControlType: ControlType.DYNAMIC_CONFIG,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/dynamic_configs/staging-loom-domain-suggested-ws"
  },
  ["rollout-new-sdk-ui"]: {
    // SDK
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-new-sdk-ui"
  },
  ["rollout-ai-in-sdk"]: {
    // SDK
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-ai-in-sdk"
  },
  ["release-sdk-onboarding"]: {
    // SDK
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/release-sdk-onboarding"
  },
  ["rollout-sdk-cascading-recorders-m1"]: {
    // SDK
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-sdk-cascading-recorders-m1"
  },
  ["rollout-sdk-cascading-recorders-m3"]: {
    // SDK
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-sdk-cascading-recorders-m3"
  },
  [ROLLOUT_ATLASSIAN_NOTIFICATIONS]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-atlassian-notifications"
  },
  [SKIP_PRS_FETCHING]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/skip-prs-fetching"
  },
  ["rollout-segment-duration"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-segment-duration"
  },
  ["media-anomalies-ui"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/media-anomalies-ui"
  },
  ["macos-h264-encoder-feature-config"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/macos-h264-encoder-feature-config"
  },
  ["audio-format-change-max-discard-buffers"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/audio-format-change-max-discard-buffers"
  },
  ["macos-aac-encoder-feature-config"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/macos-aac-encoder-feature-config"
  },
  ["loom-desktop-new-ipc-channel"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/loom-desktop-new-ipc-channel"
  },
  ["native-recorder-crashpad-reporting-endpoint"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/native-recorder-crashpad-reporting-endpoint"
  },
  ["native-recorder-sentry-config"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/native-recorder-sentry-config"
  },
  ["mac-os-new-session-manager-implementation"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/mac-os-new-session-manager-implementation"
  },
  ["rollout-hardware-encoder-for-windows"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-hardware-encoder-for-windows"
  },
  ["rollout-desktop-native-media-uploader"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-desktop-native-media-uploader"
  },
  ["rollout-audio-system-for-macos"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-audio-system-for-macos"
  },
  ["sck-use-encoder-dimension-for-stream-output"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/sck-use-encoder-dimension-for-stream-output"
  },
  ["sck-disable-wallclock-timestamp-workaround"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/sck-disable-wallclock-timestamp-workaround"
  },
  ["sck-pixel-format"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/sck-pixel-format"
  },
  ["sck-disable-constant-framerate-enforcer"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/sck-disable-constant-framerate-enforcer"
  },
  ["sck-queue-depth"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/sck-queue-depth"
  },
  ["enable-desktop-unified-camera"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/enable-desktop-unified-camera"
  },
  ["desktop-sck-video-source-config"]: {
    // desktop
    team: Team.Mint,
    newControlType: ControlType.STATSIG_EXPERIMENT,
    newKey: "exp-desktop-sck-video-source-config",
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/exp-desktop-sck-video-source-config"
  },
  [ROLLOUT_EMBED_FOLDERS]: {
    team: Team.IntegrateOrganizeCollaborate,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-embed-folders"
  },
  [SALESFORCE_INTEGRATION_VERSION]: {
    team: Team.IntegrateOrganizeCollaborate,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/salesforce_integration_version"
  },
  ["session-pruning-script"]: {
    team: Team.Outreach,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/session-pruning-script"
  },
  [SEND_HLS_PLAYBACK_STATS]: {
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/send_hls_playback_stats"
  },
  ["media-anomalies"]: {
    // desktop / mint
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/media-anomalies"
  },
  [ROLLOUT_AVSERVER_BYPASS_DASH]: {
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-avserver-bypass-dash"
  },
  ["variables-textinput-improvements"]: {
    // mint
    team: Team.Mint,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/variables-textinput-improvements"
  },
  ["rollout-av-split-stream"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-av-split-stream"
  },
  ["rollout-mac-audio-capture-method"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-mac-audio-capture-method"
  },
  [ROLLOUT_LIMIT_BUSINESS_CREATOR_LITE]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-limit-business-creator-lite"
  },
  [PERMANENT_CAN_CHANGE_SALES_SUPPORT_TYPE]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/permanent-can-change-sales-support-type"
  },
  ["permanent-admin-override-subscription"]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/permanent-admin-override-subscription"
  },
  [SHUTOFF_STRIPE_RATE_LIMIT]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/shutoff-stripe-rate-limit"
  },
  [ROLLOUT_BILLING_QUANTITY_SMART_SYNC]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-billing-quantity-smart-sync"
  },
  [BILL_THE_ASSISTANT_SCRIPT_CONFIG]: {
    team: Team.Billing,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/bill-the-assistant-script-config"
  },
  [CONFIG_BILLING_HEX_PARSER]: {
    team: Team.Billing,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/billing-hex-parser-config"
  },
  [ROLLOUT_PRICING_BACKFILL]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-pricing-backfill"
  },
  [ROLLOUT_FOLDER_PERMISSIONS]: {
    team: Team.IntegrateOrganizeCollaborate,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-folder-permissions"
  },
  [INSIGHTS_DIGEST_SELECT_EMAILS]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/insights-digest-select-emails"
  },
  [EXP_AI_WORKFLOWS_FOR_VIEWERS]: {
    team: Team.Outreach,
    useNewResult: true
  },
  [ROLLOUT_CALENDLY_MODAL]: {
    team: Team.IntegrateOrganizeCollaborate,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-calendly-modal"
  },
  [ROLLOUT_EMAIL_SERVICE_PROVIDER]: {
    team: Team.IntegrateOrganizeCollaborate,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-email-service-provider"
  },
  [ROLLOUT_DATA_RETENTION_CIRCUIT_BREAKER]: {
    team: Team.IntegrateOrganizeCollaborate,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-data-retention-circuit-breaker"
  },
  [REWATCH_MEETINGS]: {
    team: Team.MeetingRecording,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rewatch-meetings"
  },
  [BRAINTRUST_SAMPLE_RATE_MEETING_RECORDINGS]: {
    team: Team.MeetingRecording,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/braintrust-sample-rate-meeting-recordings"
  },
  [REWATCH_ZOOM_LOCAL_RECORDING_DISABLED_WARNING]: {
    team: Team.MeetingRecording,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rewatch-zoom-local-recording-disabled-warning"
  },
  [REWATCH_MEETINGS_PIN_ENGLISH_LANGUAGE]: {
    team: Team.MeetingRecording,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rewatch-meetings-pin-english-language"
  },
  ["guest-recording-limits"]: {
    // sdk
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/guest-recording-limits"
  },
  [WHITE_LABEL_PLAYER_FEATURE]: {
    team: Team.RecordingClients,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/white-label-player-feature"
  },
  ["rollout-sdk-permissions-visibility"]: {
    // sdk
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-sdk-permissions-visibility"
  },
  ["rollout-sdk-recorder-education"]: {
    // sdk
    team: Team.RecordingClients,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-sdk-recorder-education"
  },
  ["switch-slack-record-command"]: {
    // services/integrations
    team: Team.IntegrateOrganizeCollaborate,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/switch-slack-record-command"
  },
  [CHECKOUT_UI_IMPROVEMENT]: {
    team: Team.Billing,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/checkout-ui-improvement-q3-25"
  },
  [ROLLOUT_SESSION_SAMESITE_UPDATE]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-session-samesite-update"
  },
  [ENABLE_OIDC_JWT_MIDDLEWARE]: {
    team: Team.Outreach,
    useNewResult: true,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    statsigLink: "https://console.statsig.com/gates/enable-oidc-jwt-middleware"
  },
  [MENTION_PROCESSING_SHUTOFF]: {
    team: Team.Outreach,
    useNewResult: true,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    statsigLink: "https://console.statsig.com/gates/at-mention-processing-emergency-shutoff"
  },
  [EMAIL_SPAM_RATE_LIMITS]: {
    team: Team.Outreach,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/email-spam-rate-limits"
  },
  [ROLLOUT_CSRF_PROTECTION]: {
    team: Team.Outreach,
    useNewResult: true,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    statsigLink: "https://console.statsig.com/gates/rollout-csrf-protection"
  },
  ["desktop-force-sck"]: {
    // desktop
    team: Team.Mint,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/desktop-force-sck"
  },
  [SEASONAL_LAUNCH_TOUR]: {
    team: Team.ShareAndTransform,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/seasonal-launch-tour"
  },
  [ROLLOUT_FALL_24_EDUCATION_DESCOPE]: {
    team: Team.Billing,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/rollout-fall-2024-education-descope"
  },
  [EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING]: {
    team: Team.ShareAndTransform,
    newKey: "exp-default-silence-and-filler-word-trimming",
    newControlType: ControlType.DYNAMIC_CONFIG,
    configGetValue: true,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/dynamic_configs/exp-default-silence-and-filler-word-trimming"
  },
  [BRAINTRUST_SAMPLE_RATE_AUTO_CONTEXT]: {
    team: Team.ShareAndTransform,
    newControlType: ControlType.DYNAMIC_CONFIG,
    configGetValue: true,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/dynamic_configs/braintrust-sample-rate-auto-context"
  },
  ["experiment-nudges-prompt-fix"]: {
    team: Team.ShareAndTransform,
    newControlType: ControlType.STATSIG_FEATURE_GATE,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/gates/experiment-nudges-prompt-fix"
  },
  ["rollout-screenshots-new-experience_v2"]: {
    team: Team.ShareAndTransform,
    useNewResult: true,
    statsigLink: "https://console.statsig.com/experiments/rollout-screenshots-new-experience_v2"
  }
};
export {
  ACTIVE,
  ADD_MOBILE_DOWNLOAD_INVITATION,
  ATLASSIAN_PREF_CENTER_HEALTHCHECK_PING_INTERVAL,
  ATLASSIAN_SIGNUPS_FOR_TESTING,
  AVSERVER_HLS_EXT_X_MEDIA_SUBS,
  AVSERVER_SEGMENT_SPLITTING,
  AVSERVER_V5_SEGMENT_SPLITTING,
  BILL_THE_ASSISTANT_SCRIPT_CONFIG,
  BRAINTRUST_SAMPLE_RATE_AUTO_CONTEXT,
  BRAINTRUST_SAMPLE_RATE_MEETING_RECORDINGS,
  BRAINTRUST_SAMPLE_RATE_SHARE_MESSAGES,
  CAN_DISCOVER_VERSION,
  CHECKOUT_UI_IMPROVEMENT,
  COMPANION_SITE_CONTROL_SETTINGS_SITE_LIST,
  CONFIG_BILLING_HEX_PARSER,
  CONFIG_COMMUNITY_EMPTY_STATE_LOOM_IDS,
  CONFIG_ENABLE_DEV_TOOLS,
  CONFIG_PREVENT_ENTERPRISE_AUTOJOIN_SSO,
  CONFIG_WELCOME_LOOMS_IDS_LOOMHQ,
  CONTROL,
  DARK_MODE_TOGGLE,
  DESKTOP_BITDRIFT_LOGGING,
  DESKTOP_RELEASE_CHANNEL,
  DISABLE_EXTENSION_NOTIFICATIONS,
  DUMMY_VARIANT,
  EMAIL_SPAM_RATE_LIMITS,
  ENABLE_ACCOUNT_RENEWAL_NOTICE,
  ENABLE_OIDC_JWT_MIDDLEWARE,
  ENABLE_WORKOS_DOMAIN_CONNECTION_MAP,
  EXAMPLE_FLAG_TO_MIGRATE,
  EXPERIMENT_DEFAULT_SILENCE_AND_FILLER_WORD_TRIMMING,
  EXPERIMENT_LIBRARY_INSIGHTS_V2,
  EXPERIMENT_POST_RECORDING_CELEBRATION_CONTINUOUS_V2,
  EXPERIMENT_SEMANTIC_SEARCH,
  EXPERIMENT_SEMANTIC_SEARCH_UI,
  EXP_AI_WORKFLOWS_FOR_VIEWERS,
  EXP_ANON_COMMENTS_SIDEBAR_GATING,
  EXP_HOMEPAGE_HERO_VIDEOS_EMBED,
  EXP_SHARE_PAGE_SLUGS,
  EXP_UPDATED_MOBILE_ONBOARDING,
  EXP_UPDATE_SIGNUP_ON_PAUSE,
  EXTENSION_UPLOAD_STREAMING,
  FEATURE_FLAGS_ANALYTICS_LIST,
  FIX_PERSISTENT_RECORD_MULTIPLE_RECORDERS_TRIGGERING_NUMBER_VARIANT,
  GATE_BILLING_DIGITAL_WALLETS,
  GENERATE_TRANSCRIPT_CTA,
  HACK_FORCE_ADD_USERS_TO_ATLASSIAN,
  HIDE_DURING_DOWNTIME,
  INSIGHTS_DIGEST_SELECT_EMAILS,
  INSIGHTS_MILESTONE_TIME_SAVED,
  KILLSWITCH_ATLASSIAN_TOKEN_AUTH,
  KILLSWITCH_GSAC,
  KILLSWITCH_LINK_RESOLVER,
  LOOM_POST_VIEW_DISCOVERY,
  MEETING_RECORDING_LIBRARY_FILTER,
  MENTION_PROCESSING_SHUTOFF,
  MINT_LPID_COOKIE_IN_TOKEN_HANDLER,
  PERMANENT_CAN_CHANGE_SALES_SUPPORT_TYPE,
  RABBITMQ_CONSUMER_STARTUP_CONTROL,
  RECORDING_CLIENTS_BANNER,
  RECORDING_CLIENTS_SCHEDULED_DOWNTIME,
  REWATCH_MEETINGS,
  REWATCH_MEETINGS_PIN_ENGLISH_LANGUAGE,
  REWATCH_ZOOM_LOCAL_RECORDING_DISABLED_WARNING,
  ROLLOUT_ACCOUNT_SUSPENSION_LACK_OF_PAYMENT,
  ROLLOUT_ATLASSIAN_NOTIFICATIONS,
  ROLLOUT_AVSERVER_BYPASS_DASH,
  ROLLOUT_BILLING_QUANTITY_SMART_SYNC,
  ROLLOUT_BLOCK_UPLOAD_TRANSCRIPTION,
  ROLLOUT_CALENDLY_MODAL,
  ROLLOUT_CAM_BUBBLE_ON_BOARDING,
  ROLLOUT_CLIENTS_SCREENSHOT_DELAYED_FTUX,
  ROLLOUT_COMMUNITY_LOOMS,
  ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
  ROLLOUT_CSRF_PROTECTION,
  ROLLOUT_DATA_RETENTION_CIRCUIT_BREAKER,
  ROLLOUT_DATA_RETENTION_DELETION_LIMIT,
  ROLLOUT_DESKTOP_AIRHORN,
  ROLLOUT_DESKTOP_RECORDER_ONBOARDING_SCREENS,
  ROLLOUT_EMAIL_SERVICE_PROVIDER,
  ROLLOUT_EMBED_FOLDERS,
  ROLLOUT_FALL_24_EDUCATION_DESCOPE,
  ROLLOUT_FALL_24_TRIAL_NET_NEW,
  ROLLOUT_FOLDER_PERMISSIONS,
  ROLLOUT_INTEGRATIONS_DATASYNC,
  ROLLOUT_INTEGRATIONS_ZOOM_GA_UI,
  ROLLOUT_IOS_NOTIFICATION_BADGE,
  ROLLOUT_LIMIT_BUSINESS_CREATOR_LITE,
  ROLLOUT_LOG_MOBILE_ACTIVE_USER_EVENT,
  ROLLOUT_LOOM_QUANTITY_SMART_SYNC,
  ROLLOUT_LOOM_SSR_USER_SWAP,
  ROLLOUT_MOBILE_REMINDER_TO_RECORD,
  ROLLOUT_NEW_DELETE,
  ROLLOUT_NEW_UNFURLED_LOOMS_IN_COMMENTS,
  ROLLOUT_NOTIFICATION_SETTINGS_V2,
  ROLLOUT_PERIPHERAL_COOKIE,
  ROLLOUT_POST_TO_COMMUNITY,
  ROLLOUT_PRICING_BACKFILL,
  ROLLOUT_SELF_VIEW_CACHING,
  ROLLOUT_SEMANTIC_SEARCH_AUTO_BACKFILL,
  ROLLOUT_SESSION_SAMESITE_UPDATE,
  ROLLOUT_SLACK_CONNECT_PROMPT_TO_NEWLY_CONNECTING_WORKSPACES,
  ROLLOUT_SPEAKER_NOTES_OLD_RECORDER,
  ROLLOUT_STREAMHUB_PERMISSIONS_PROCESSING,
  ROLLOUT_STREAMHUB_USER_PROFILE_UPDATE_PROCESSING,
  ROLLOUT_VIDEO_PLAYER_PRE_PLAY_SCREEN,
  ROLLOUT_WHISPER_SEGMENT_COMPRESSION,
  ROLLOUT_WORKSPACE_PROVISIONING_INTEGRATION,
  SALESFORCE_INTEGRATION_VERSION,
  SEASONAL_LAUNCH_MODAL_VARIANTS,
  SEASONAL_LAUNCH_TOUR,
  SEGMENT_EVENT_IGNORE_LIST,
  SEND_HLS_PLAYBACK_STATS,
  SHOW_EXTENSION_DOWNLOAD,
  SHUTOFF_STRIPE_RATE_LIMIT,
  SIGNUP_ALLOW_DOMAIN,
  SKIP_PRS_FETCHING,
  STAGING_LOOM_DOMAIN_SUGGESTED_WS_CONFIG,
  STATSIG_MIGRATION_FLAGS_OBJ,
  TEST_APIS_ENABLED,
  THIS_SHOULD_NOT_MAKE_IT_TO_PROD,
  ULTRAFAST_4K_ENCODING,
  UPGRADE_GPT_MODEL_FOR_TRANSCRIPT_BASED_AI,
  VARIANT,
  VARIANT_AND_ACTIVE,
  WHITE_LABEL_PLAYER_FEATURE
};
//# sourceMappingURL=featureFlag.js.map
