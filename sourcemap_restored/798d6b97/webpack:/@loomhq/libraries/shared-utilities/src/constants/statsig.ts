/* eslint-disable sort-keys */
/*
IMPORTANT: READ BEFORE ADDING NEW FLAG
If you would like your flag to be sent to our analytics services, you must also add the flag
to STATSIG_ANALYTICS_LIST.

For general statsig documentation, please visit
https://hello.atlassian.net/wiki/spaces/loomhq/pages/5016097228
or go/loomstatsig
*/

// A/B/n Experiments
export const EXPERIMENTS = {
  AA_LOOM_LIBRARY_EXPERIMENT: 'aa-loom-library-experiment',
  AA_SHARE_ENGAGEMENT_BAR: 'aa-share-engagement-bar-exp',
  EXAMPLE_EXPERIMENT: 'example-exp',
  EXP_AI_WORKFLOWS_FOR_VIEWERS: 'exp-ai-workflows-for-viewers-2',
  EXP_AI_WORKFLOWS_FOR_VIEWERS_PHASE_2: 'exp-ai-workflows-for-viewers-phase-2',
  EXP_HIGH_VIDEO_VIEWS_NOTIFICATIONS_RERUN:
    'experiment-high-video-views-notifications-2',
  EXP_MWEB_TRANSCRIPT: 'exp-mweb-transcript',
  EXP_MWEB_COMMENTING: 'exp-mweb-commenting',
  EXP_MWEB_EOVN: 'exp-mweb-eov-comment-nudge',
  EXP_ROLLOUT_FEDCM_FOR_ONE_TAP: 'exp-rollout-fedcm-for-one-tap',
  EXPERIMENT_HIGHLIGHT_LOOM_VALUE:
    'experiment-highlight-value-of-loom-to-anon-users',
  EXPERIMENT_LOOM_ATTACHED_INVITE_REDESIGN_V2:
    'exp-loom-attached-invite-redesign-v2',
  EXPERIMENT_ROLE_QUESTION_MANDATORY_V2: 'exp-make-role-question-mandatory-v2',
  EXPERIMENT_VIDEO_GENERATION_CHROME_EXT_BUTTON:
    'experiment-video-generation-chrome-ext-button',
  GENERATE_VIDEO_EXPERIMENT: 'generate-video-experiment',
  ROLLOUT_EOY_TAKEOVER_INSIGHTS: 'eoy-takeover-insights',
  WINTER_LAUNCH_2025_CONFIG: 'loom-winter-launch-25-config',
  EXP_PICTURE_IN_SCRIPTURE: 'exp-picture-in-scripture',
  DOWNGRADE_FLOW: 'downgrade-flow-experiment',
  ROLLOUT_SCREENSHOTS_BACKGROUND: 'rollout-screenshots-background',
  BRAIN_TRUST_SAMPLE_RATE_LOOM_CATEGORIZATION:
    'braintrust-sample-rate-loom-categorization',
  EXP_CHECKLIST_V3: 'exp-onboarding-checklist-v3',
  EXP_SMART_INVITES: 'project-smart-invites-experiment',
  EXP_LOOM_SIGNUP_REDIRECT_TO_IDAC: 'exp-loom-signups-redirect-to-idac-v2',
  EXP_USAGE_BIZ_AI_TRIAL: 'usage-biz-ai-trial',
  LOOM_CSM_AI_CHAT_EXPERIMENT: 'loom-csm-ai-chat-experiment',
  USAGE_BASED_TRIAL_CONFIG: 'loom-usage-based-trial-config',
  EXP_UPDATE_WELCOME_STEP: 'project-update-welcome-step-onboarding',
  EXP_INTEGRATED_CHECKLIST_WITH_USE_CASES:
    'exp_integrated_checklist_with_use_cases',
  EXP_WORKFLOW_NEW_HEADER: 'workflow_new_header',
  EXP_LOOM_EXAMPLES_IN_SDK: 'loom_examples_in_sdk_experiment',
  EXP_VISUAL_COHESION_SHELL: 'loom_visual_cohesion_shell',
  EXP_PINNED_LOOMS_MY_LIBRARY: 'experiment-pinned-looms-my-library',
  EXP_LOOM_CHROME_DEVELOPER_CONTEXT: 'exp-loom-chrome-developer-context',
  EXP_SMART_INVITES_IN_TI_MODAL: 'exp-smart-invites-in-ti-modal',
  EXP_THIRTY_DAY_TRIAL: 'loom-thirty-day-trial-experiment',
  EXP_WORKSPACE_AUTO_JOIN_CHANGE: 'experiment-workspace-autojoin-change',
  EXP_IN_APP_ANNUAL_SAVINGS: 'billing_annual_savings_ui_exp',
  MR2_MEETING_RECORDING_NOTES: 'mr2-meeting-recording-notes',
  ROLLOUT_LOOM_EDIT_TTS: 'rollout-loom-edit-tts',
  LOOM_ASYNC_WORKFLOWS_WORKFLOWS_TAB_REVAMP: 'loom-ai-workflows-tab-revamp',
  EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE_V2:
    'exp-visual-refresh-on-anon-share-page-gate-v2',
  EXP_MWEB_COMMENTING_V2: 'exp-mweb-commenting-v2',
  EXP_ASG_MWEB_ONBOARDING_REFRESH: 'exp-asg-mweb-onboarding-refresh',
  EXP_SHARE_PAGE_BACKGROUND_PICKER: 'loom_share_page_background_picker',
  EXP_SHARE_PAGE_BACKGROUND_PICKER_AA: 'loom_share_page_background_picker_aa',
  EXP_DIGITAL_WALLETS: 'exp-loom-digital-wallets',
  ROLLOUT_BRAND_BLUEIFY: 'loom_brand_from_purple_to_blue',
  CAM_SPLIT_WITH_AUTO_ZOOM_AND_LOCATION_PICKER:
    'loom_cam_split_with_auto_zoom_and_location_picker',
  EXP_AUTO_SHORTEN: 'loom-auto-shorten-experiment-a-b',
} as const;

// Boolean feature toggle
// https://docs.statsig.com/feature-flags/working-with
export const FEATURE_GATES = {
  ACCOUNT_LIFECYCLE_REQUEST_RETRY: 'loom-account-lifecycle-request-retry',
  ALLOW_LEGACY_AND_ATLASSIAN_ENTERPRISE_MEMBERSHIP:
    'allow-legacy-and-atlassian-enterprise-membership',
  ALLOWLIST_IPS_FOR_WORKSPACES: 'allowlist-ips-for-workspaces',
  AMN_USE_RENDERED_ADF: 'amn-use-rendered-adf',
  LINK_EXPIRATION_CRON_JOB: 'link-expiration-cron-job',
  REWATCH_MEETINGS_USE_ZOOM_JOIN_TOKEN:
    'rewatch_meetings_-_use_zoom_join_token',
  CALENDAR_MEETING_WRITE_SCOPE: `calendar_meeting_write_scope`,
  TESTING_AUTO_SHORTEN_VIDEOS: 'testing-auto-shorten-videos',
  ROLLOUT_TRANSLATE_CAPTIONS: 'rollout-translate-captions',
  LOOM_DEPRECATE_OLD_TRANSCRIPTS_ARCHITECTURE:
    'loom-deprecate-old-transcripts-architecture',
  BRAINTRUST_LOGGING: 'braintrust-logging',
  LOOM_ROLLOUT_INTERCOM_CHAT_BOT_GATE: 'loom-rollout-intercom-chat-bot-gate',
  ROLLOUT_LOOM_JAC_MIGRATION_GIVE_FEEDBACK:
    'rollout-loom-jac-migration-give-feedback',
  ROLLOUT_CSM_FOR_SUPPORT_TICKET_CREATION:
    'rollout-csm-for-support-ticket-creation',
  SHADOW_CSM_FOR_SUPPORT_TICKET_CREATION:
    'shadow-csm-for-support-ticket-creation',
  SEND_CSM_AI_TRANSCRIPT_TO_GSAC: 'send_csm_ai_transcript_to_gsac',
  SEND_ATLASSIAN_MASTERED_LABEL_TO_CSM:
    'loomcsm-188_add_atlassian_mastered_flag_to_csm',
  TRANSCODER_GPU_TRANSCODING: 'transcoder_gpu_transcoding',
  ROLLOUT_DIRECT_SHARE_SEARCH: 'rollout-direct-share-loom',
  REWATCH_MEETINGS_ZOOM_CONSOLIDATION: 'rewatch_meetings_-_zoom_consolidation',
  REWATCH_MEETINGS_SUMMARY_PROMPT_V2: 'rewatch-meetings-summary-prompt-2',
  REWATCH_USE_MEETING_SECTIONS_FOR_RECAPS:
    'rewatch-use-meeting-sections-for-recaps',
  REWATCH_USE_MEETING_TYPE_EMAIL: 'rewatch-use-meeting-type-email',

  REWATCH_MEETINGS_TASKS_PROMPT_V2: 'rewatch-meetings-tasks-prompt-v2',
  MEETING_RECORDING_RULES: 'meeting-recordings-rules',
  MEETING_RECORDING_REGENERATION: 'meeting-recording-regeneration',

  LOOM_CONTENT_EXPORT: 'loom-content-export',
  LOOM_LOW_LATENCY_TRANSCRIPTION: 'loom-low-latency-transcription',

  WRITE_CONTENT_TO_WORKSPACE_USER_SPECIAL_FOLDERS:
    'write-content-to-workspace-user-special-folders',
  ROLLOUT_PICTURE_IN_SCRIPUTRE_TO_OTHER_DOC_TYPES:
    'rollout_picture_in_scripture_to_other_doc_types',
  ROLLOUT_DISABLE_DOWNLOADS_FOR_WORKSPACE:
    'rollout-disable-downloads-at-workspace-level',
  ROLLOUT_GLOBAL_ADMIN_VIEW: 'loom-rollout-global-admin-view',
  DESKTOP_CAMERA_SERVICE: 'desktop-camera-service',
  ROLLOUT_SHARD_COMPATIBILITY: 'loom-rollout-shard-compatibility',
  ROLLOUT_SCREENSHOTS_MORE_ANNOTATIONS:
    'rollout-screenshots-more-annotations-gate',
  ROLLOUT_SCREENSHOT_OVERLAY_TOOLBAR: 'rollout-screenshot-overlay-toolbar-gate',
  ROLLOUT_PAGE_DWELL_METRIC: 'rollout-page-dwell-metric',
  ROLLOUT_DASH_ENC_TIME_BASE_FLAG: 'rollout-dash-enc-time-base-flag',
  ROLLOUT_MEMBERSHIP_PROPERTIES_CACHE:
    'rollout-use-membership-properties-cache',
  LOG_CROSS_TRANSACTIONS_BY_ID: 'log-cross-transactions-by-id',
  LOOM_EDIT_TTS: 'loom-tts-edit',
  LOOM_VIDEO_BACKGROUNDS: 'loom-video-backgrounds',
  LOOM_CAM_LOCATION_PICKER: 'loom-cam-location-picker',
  LOOM_CUSTOM_IMAGE_BACKGROUNDS: 'loom-custom-image-backgrounds',
  LOOM_LOVABILITY_SURVEY: 'loom-lovability-survey',
  SMART_PROMPTS_PR_DESCRIPTION: 'smart-prompts-pr-description',
  SMART_PROMPTS_SOP: 'smart-prompts-sop',
  SMART_PROMPTS_CODE_DOCS: 'smart-prompts-code-docs',
  SMART_PROMPTS_QA_STEPS: 'smart-prompts-qa-steps',
  SMART_PROMPTS_STEP_BY_STEP: 'smart-prompts-step-by-step',
  LOOM_INSERT_CLIP_AT_TIMESTAMP: 'loom-insert-clip-at-timestamp',
  LOOM_PLAYGROUND: 'loom-playground',
  LOOM_GLOBAL_SCOPED_SHADOW_FLAG: 'loom-global-scoped-shadow-flag',
  LOOM_GLOBAL_SESSION_CUTOVER_FLAG: 'loom-global-session-cutover-flag',
  LOOM_GLOBAL_SESSION_SHADOW_FLAG: 'loom-global-session-shadow-flag',
  LOOM_ENTERPRISE_DUAL_WRITE_SESSION_STORE_FLAG:
    'loom-enterprise-dual-write-session-store-flag',
  LOOM_ENTERPRISE_EDGE_LOGIN_CLIENT_ROUTING:
    'loom-enterprise-edge-login-client-routing',
  LOOM_PRICING_PAGE_CALCULATOR_FEATURE: 'loom_pricing_page_calculator_feature',
  LOOM_DIRECT_TO_NEW_AUTH_VERIFY: 'loom-direct-to-new-auth-verify',
  LOOM_ROLLOUT_INLINE_COMMENT_REACTIONS:
    'loom-rollout-inline-comment-reactions',
  LOOM_ENABLE_PRIMARY_SPACE_NOTIFICATIONS:
    'loom-enable-primary-space-notifications',
  V8_PERFORMANCE_TEST_DEFAULT_COMPOSITION:
    'v8-performance-test-default-composition',
  LOOM_TTS_FILLER_WORD_REMOVAL: 'loom-tts-filler-word-removal',
  GENERATE_MP4_JOB: 'combine-transcode-trim-job',
  TRANSCODER_HLS_PARALLEL_EXECUTION: 'transcoder-hls-parallel-execution',
  GENERATE_SMART_THUMBNAILS: 'loom-generate-smart-thumbnails',
  ROLLOUT_AVSERVER_SEGMENT_REFACTOR: 'rollout-avserver-segment-refactor',
  RECORDING_SETTINGS_FOR_PUBLIC_DOMAIN_USERS:
    'record_meeting_default_settings_for_public_emails',
  ROLLOUT_UGC_ADMIN_CONTROL_STREAMHUB_EVENTS:
    'rollout-ugc-admin-control-publish-streamhub-events',
  ROLLOUT_UGC_ADMIN_CONTROL_SETTINGS: 'rollout-ugc-admin-control-settings',
  ROLLOUT_UGC_USER_CONSENT: 'rollout-ugc-user-consent',
  PUBLIC_LINK_CONTROLS_FOR_PREMIUM: 'public-link-controls-for-premium',
  GROUPS_TO_SPACES_FOR_PREMIUM: 'groups-to-spaces-for-premium',
  ROLLOUT_LOOM_TAB_HASH_ROUTES: 'rollout-loom-tab-hash-routes',
  ROLLOUT_MEETING_RECORDING_BOT_CONTROLS:
    'rollout-meeting-recording-bot-controls',
  MEETING_RECORDINGS_SEND_EMAIL_ON_REGENERATION:
    'meeting-recordings-send-email-on-regeneration',
  CONSUME_GROUPS_FOR_PREMIUM: 'consume-groups-for-premium',
  SLACK_SUGGEST_PUBLISH_TO_SPACE: 'slack_suggest_publish_to_space',
  LOOM_SLACK_AUTO_PUBLISH_TO_SPACE: 'loom-slack-auto-publish-to-space',
  DIRTY_FLAG_REDIS_SESSIONS: 'loom-auth-cut-writes-on-redis-session-tt-updates',
  LOOM_PRIVACY_SETTINGS_REFRESH: 'loom-privacy-settings-refresh',
  BACKGROUND_TEST_4K: 'background-test-4k',
  OAUTH_IN_MAIN_WINDOW: 'loom-oauth-in-main-window',
  AUTOMATED_MEETING_NOTES_WORKSPACE_SETTING:
    'automated_meeting_notes_workspace_setting',
  LOOM_TRANSCRIPT_VOCABULARY: 'loom-transcript-vocabulary',
  LOOM_ALLOW_PROVISIONING_FOR_ATLASSIAN_WORKSPACE:
    'loom-allow-provisioning-for-atlassian-workspace',
  MINIMUM_WEB_APP_VERSION: 'minimum_web_app_version',
  TDP_OS_UPLOAD: 'loom-tdp-os-upload',
  LOOM_WILLIAM_HACKATHON: 'loom-william-hackathon',
  DESKTOP_MEETING_RECORDINGS: 'desktop_meeting_recordings',
  ZOOM_TO_CLICK: 'zoom-to-click-gate',
  ZOOM_TO_CLICK_AUTO_APPLY_GATE: 'zoom-to-click-auto-apply-gate',
  LOOM_ADMIN_PORTAL_RBAC_ENABLED: 'loom-admin-portal-rbac-enabled',
  LOOM_EDGE_SHARD_ROUTING_GATE: 'loom_edge_shard_routing_gate',
  LIVE_TRANSCRIPTS: 'loom-meeting-recordings-live-transcripts',
  MEETING_RECORDING_LIVE_MEETING_AGENT_FEATURES:
    'mr-live-meeting-agent-features',
  LOOM_ORGANIZATIONS_ID_READ_MIGRATION: 'loom-organizations-id-read-migration',
  LOOM_ASYNC_WORKFLOWS_LOOM_CONNIE_LOCATION:
    'loom-async-workflows-loom-connie-location',
  /**
   * {@link https://switcheroo.atlassian.com/ui/gates/3985b3f6-93e0-453b-bfa4-193d1dc641ad/key/loom_screen_space_flags_placement | Flag in Switcheroo}
   */
  SCREEN_SPACE_FLAG_PLACEMENT: 'loom_screen_space_flags_placement',
  LOOM_CSAMFOUND_VERIFICATION: 'loom-csamfound-verification',
  LOOM_CCP_REQUEST_UPGRADE_FLOW_ROLLOUT:
    'loom-ccp-request-upgrade-flow-rollout',
  LOOM_AUTO_LOOMS_BETA_LAUNCH: 'loom-auto-looms-beta-launch',
  NOTIFICATIONS_POPOVER_GATE: 'notifications-popover-gate',
  WORKSPACE_REQUEST_MANAGEMENT: 'loom-workspace-requests-management',
  LOOM_CCP_INVOICE_MIGRATION: 'loom-ccp-invoice-migration',
  LOOM_COMPOSER: 'loom-composer',
  LOOM_CREATE_TRELLO_CARD_ASYNC_TASK: 'loom-create-trello-card-async-task',
  LOOM_TDP_OS_AVSERVER: 'loom-tdp-os-avserver',
  LOOM_TDP_OS_AUDIO_VARIABLES: 'loom-tdp-os-audio-variables',
  LOOM_TDP_OS_CAPTIONS: 'loom-tdp-os-captions',
  LOOM_ADD_PRIORITY_FIELD_TO_CONTACT_FORM:
    'loom_add_priority_field_to_contact_form',
  LOOM_JIRA_1P_INTEGRATION: 'loom_jira1p_integration',
  LOOM_TDP_OS_SCREENSHOTS: 'loom-tdp-os-screenshots',
  LOOM_ASSET_CSAM_INTEGRATION: 'loom-asset-csam-integration',
  LOOM_MEETING_ASSISTANT_TAB: 'loom-meeting-assistant-tab',
  LOOM_USE_CPUS_IN_SHARE_MODAL: 'loom-use-cpus-in-share-modal',
  LOOM_MP4_REGENERATION_FROM_PLAYER_ENABLED:
    'loom-mp4-regeneration-from-player-enabled',
  TRANSLATED_CAPTIONS_CHUNKING: 'translated-captions-chunking',
  LOOM_AMN_POST_MEETING_RECAP_GENERATION_GATE:
    'loom-amn-post-meeting-recap-generation-gate',
  LOOM_EDITIONS_AWARENESS_BUTTON: 'loom-ea-eu-25',
  LOOM_AMN_POST_MEETING_RECAP_GENERATION_BUG_FIXES:
    'loom-amn-post-meeting-recap-generation-bug-fixes',
} as const;

// https://docs.statsig.com/dynamic-config
export const DYNAMIC_CONFIGS = {
  STAGING_DOMAIN_SUGGESTED_WS_CONFIG: 'staging-domain-suggested-ws-config',
  CONFIG_WELCOME_LOOM_IDS: 'config-welcome-looms-ids',
  CONFIG_COMMUNITY_EMPTY_STATE_LOOM_IDS:
    'config-community-empty-state-loom-ids',
  LEGACY_USER_MIGRATION_CONFIG: 'loom-legacy-user-migration',
  LOOM_MONTHLY_INSIGHTS_DIGEST_JOB_MODE:
    'loom-monthly-insights-digest-job-mode',
  ZOOM_TO_CLICK_CONFIG: 'edit-zoom-config',
  ZOOM_BEHAVIOR_CONFIG: 'edit-zoom-behavior-config',
  LOOM_BRAINTRUST_SAMPLE_RATE_AVATARS: 'loom-braintrust-sample-rate-avatars',
  LOOM_BRAINTRUST_SAMPLE_RATE_AVATARS_OVERLAYS:
    'loom-braintrust-sample-rate-avatars-overlays',
  LOOM_BRAINTRUST_SAMPLE_RATE_AVATARS_SCRIPTS:
    'loom-braintrust-sample-rate-avatars-scripts',
  LOOM_SEARCH_BACKFILL_QUEUE_CONFIGURATION:
    'loom-search-backfill-queue-configuration',
  ACL_SYNCING_QUEUE_CONFIGURATION: 'acl-syncing-queue-configuration',
  LOOM_COMPOSER_PROMPTS: 'loom-composer-prompts',
  LOOM_CCP_BULK_INVOICE_MIGRATION: 'loom-ccp-bulk-invoice-migration',
} as const;

// Analytics - note when you add a flag to this list, it may take anywhere from 4-6 hours for it to start sending data to snowflake.
// For more information, please see https://hello.atlassian.net/wiki/spaces/loomhq/pages/4981636096/Loom+Statsig+Experimentation+Checklist#Monitoring-your-experiment
export const STATSIG_ANALYTICS_LIST = [
  EXPERIMENTS.AA_LOOM_LIBRARY_EXPERIMENT,
  EXPERIMENTS.EXPERIMENT_ROLE_QUESTION_MANDATORY_V2,
  EXPERIMENTS.EXP_ROLLOUT_FEDCM_FOR_ONE_TAP,
  EXPERIMENTS.EXP_MWEB_TRANSCRIPT,
  EXPERIMENTS.EXP_MWEB_COMMENTING,
  EXPERIMENTS.EXP_MWEB_EOVN,
  EXPERIMENTS.EXP_AI_WORKFLOWS_FOR_VIEWERS,
  EXPERIMENTS.EXP_AI_WORKFLOWS_FOR_VIEWERS_PHASE_2,
  FEATURE_GATES.LOOM_ROLLOUT_INTERCOM_CHAT_BOT_GATE,
  EXPERIMENTS.EXPERIMENT_HIGHLIGHT_LOOM_VALUE,
  EXPERIMENTS.AA_SHARE_ENGAGEMENT_BAR,
  EXPERIMENTS.EXP_PICTURE_IN_SCRIPTURE,
  EXPERIMENTS.EXP_HIGH_VIDEO_VIEWS_NOTIFICATIONS_RERUN,
  EXPERIMENTS.DOWNGRADE_FLOW,
  EXPERIMENTS.ROLLOUT_SCREENSHOTS_BACKGROUND,
  FEATURE_GATES.ROLLOUT_PAGE_DWELL_METRIC,
  EXPERIMENTS.EXP_CHECKLIST_V3,
  EXPERIMENTS.EXP_SMART_INVITES,
  EXPERIMENTS.EXP_LOOM_SIGNUP_REDIRECT_TO_IDAC,
  EXPERIMENTS.EXP_USAGE_BIZ_AI_TRIAL,
  FEATURE_GATES.TESTING_AUTO_SHORTEN_VIDEOS,
  FEATURE_GATES.ROLLOUT_TRANSLATE_CAPTIONS,
  EXPERIMENTS.EXP_UPDATE_WELCOME_STEP,
  EXPERIMENTS.EXP_INTEGRATED_CHECKLIST_WITH_USE_CASES,
  FEATURE_GATES.LOOM_VIDEO_BACKGROUNDS,
  FEATURE_GATES.LOOM_CAM_LOCATION_PICKER,
  FEATURE_GATES.LOOM_CUSTOM_IMAGE_BACKGROUNDS,
  FEATURE_GATES.LOOM_LOVABILITY_SURVEY,
  EXPERIMENTS.LOOM_CSM_AI_CHAT_EXPERIMENT,
  EXPERIMENTS.EXP_LOOM_EXAMPLES_IN_SDK,
  EXPERIMENTS.EXP_WORKFLOW_NEW_HEADER,
  FEATURE_GATES.DESKTOP_MEETING_RECORDINGS,
  EXPERIMENTS.EXP_VISUAL_COHESION_SHELL,
  FEATURE_GATES.LOOM_PRICING_PAGE_CALCULATOR_FEATURE,
  EXPERIMENTS.EXP_LOOM_CHROME_DEVELOPER_CONTEXT,
  EXPERIMENTS.EXP_SMART_INVITES_IN_TI_MODAL,
  EXPERIMENTS.EXP_THIRTY_DAY_TRIAL,
  EXPERIMENTS.EXP_WORKSPACE_AUTO_JOIN_CHANGE,
  EXPERIMENTS.EXP_IN_APP_ANNUAL_SAVINGS,
  EXPERIMENTS.MR2_MEETING_RECORDING_NOTES,
  EXPERIMENTS.ROLLOUT_LOOM_EDIT_TTS,
  EXPERIMENTS.LOOM_ASYNC_WORKFLOWS_WORKFLOWS_TAB_REVAMP,
  EXPERIMENTS.EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE_V2,
  EXPERIMENTS.EXP_MWEB_COMMENTING_V2,
  EXPERIMENTS.EXP_ASG_MWEB_ONBOARDING_REFRESH,
  EXPERIMENTS.EXP_SHARE_PAGE_BACKGROUND_PICKER,
  EXPERIMENTS.EXP_SHARE_PAGE_BACKGROUND_PICKER_AA,
  EXPERIMENTS.EXP_DIGITAL_WALLETS,
  FEATURE_GATES.LOOM_ASSET_CSAM_INTEGRATION,
  EXPERIMENTS.CAM_SPLIT_WITH_AUTO_ZOOM_AND_LOCATION_PICKER,
  EXPERIMENTS.EXP_AUTO_SHORTEN,
  FEATURE_GATES.TRANSLATED_CAPTIONS_CHUNKING,
] as const;

export enum ControlType {
  // note: all LD flags have been migrated and are now evaluated on Statsig
  MIGRATED_FEATURE_FLAG = 'launchdarkly_feature_flag',
  STATSIG_EXPERIMENT = 'statsig_experiment',
  STATSIG_FEATURE_GATE = 'statsig_feature_gate',
  DYNAMIC_CONFIG = 'dynamic_config',
}

export enum FlagReturnValues {
  CONTROL = 'control',
  VARIANT = 'variant',
  VARIANT_1 = 'variant-1',
  VARIANT_2 = 'variant-2',
  VARIANT_3 = 'variant-3',
  VARIANT_4 = 'variant-4',
  INELIGIBLE = 'ineligible',
  // for excluding overrides in A/B tests
  VARIANT_EXCLUDED = 'variant-excluded',
  // for A/A tests
  DUMMY_CONTROL = 'dummy-control',
  DUMMY_VARIANT = 'dummy-variant',
}
