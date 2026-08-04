import "../chunk-BYZ2GIR3.js";
import {
  EmailStatus,
  isPresetBackgroundName,
  isHexColor
} from "../types";
import { CameraPickerRegion } from "./videoComposition";
var UserPropertyEnum = /* @__PURE__ */ ((UserPropertyEnum2) => {
  UserPropertyEnum2["BOOLEAN_VALUE"] = "booleanValue";
  UserPropertyEnum2["NUMBER_VALUE"] = "numberValue";
  UserPropertyEnum2["STRING_VALUE"] = "stringValue";
  UserPropertyEnum2["JSON_VALUE"] = "jsonValue";
  UserPropertyEnum2["DEFAULT_WORKSPACE"] = "userDefaultWorkspace";
  UserPropertyEnum2["AUTO_ASSIGNED_DEFAULT_WORKSPACE"] = "autoAssignedDefaultWorkspace";
  UserPropertyEnum2["AUTO_ASSIGNED_DEFAULT_WORKSPACE_NAME"] = "autoAssignedDefaultWorkspaceName";
  UserPropertyEnum2["PROFILE"] = "profile";
  UserPropertyEnum2["PROFILE_URL"] = "profileUrl";
  UserPropertyEnum2["SUGGEST_PUBLISHING_ON_TAG"] = "suggestPublishingOnTag";
  UserPropertyEnum2["SIGNUP_LOCATION"] = "signupLocation";
  UserPropertyEnum2["HAS_GIVEN_CONSENT_FOR_AI_AUDIO_GENERATION_FOR_VARIABLES"] = "has_given_consent_for_ai_audio_generation_for_variables";
  UserPropertyEnum2["GLOBAL_LIMIT_BANNER"] = "global_limit_banner";
  UserPropertyEnum2["IDENTITY_MIGRATION_BANNER_FTUX"] = "identity_migration_banner_ftux";
  UserPropertyEnum2["WORKSPACE_MIGRATION_BANNER_FTUX"] = "workspace_migration_banner_ftux";
  UserPropertyEnum2["MEMBER_VIDEO_LIMIT_BANNER"] = "member_video_limit_banner";
  UserPropertyEnum2["WORKSPACE_CONTENT_LIMIT_BANNER"] = "workspace_content_limit_banner";
  UserPropertyEnum2["RECORDER_DOWNLOAD_BANNER"] = "recorder_download_banner";
  UserPropertyEnum2["CREATOR_LITE_MEMBER_LIMIT_BANNER"] = "creator_lite_member_limit_banner";
  UserPropertyEnum2["CONTINUE_WATCHING_MOBILE_BANNER"] = "continue_watching_mobile_banner";
  UserPropertyEnum2["APPROACHING_LIMIT_BANNER"] = "approaching_limit_banner";
  UserPropertyEnum2["MOBILE_DOWNLOAD_BANNER"] = "mobile_download_banner";
  UserPropertyEnum2["MEMBER_VIDEO_THRESHOLD_BANNER"] = "member_video_threshold_banner";
  UserPropertyEnum2["WEB_PERMISSIONS_BANNER"] = "web_permissions_banner";
  UserPropertyEnum2["DATA_RETENTION_BANNER"] = "data_retention_banner";
  UserPropertyEnum2["RECEIVED_HIGH_VIDEO_VIEWS"] = "received_high_video_views";
  UserPropertyEnum2["SIGNUP_APP_SOURCE"] = "signup_app_source";
  UserPropertyEnum2["RECENTLY_SHARED_WITH"] = "recently_shared_with_entities";
  UserPropertyEnum2["SEEN_MV3_FTUX"] = "seen_mv3_ftux";
  UserPropertyEnum2["GLOBAL_ADMIN_DUNNING_BANNER"] = "global_admin_dunning_banner";
  UserPropertyEnum2["GLOBAL_ADMIN_PAYMENT_AUTHENTICATION_BANNER"] = "global_admin_payment_authentication_banner";
  UserPropertyEnum2["CREATOR_LITE_MEMBER_LIMIT_GLOBAL_BANNER"] = "creator_lite_limit_global_banner";
  UserPropertyEnum2["AUTO_COMMENT_AND_REACTION"] = "auto_comment_and_reaction";
  UserPropertyEnum2["SINGLE_DELIVERY_NOTIFICATIONS"] = "single_delivery_notifications";
  UserPropertyEnum2["LOOM_AI_TRIAL_ENDED_FTUX"] = "loom_ai_trial_ended_ftux";
  UserPropertyEnum2["EMAIL_STATUS"] = "email_status";
  UserPropertyEnum2["EOY_2024_FTUX"] = "eoy_2024_ftux";
  UserPropertyEnum2["SEASONAL_LAUNCH_TOUR"] = "seasonal_launch_tour";
  UserPropertyEnum2["SEASONAL_LAUNCH_MODAL_VARIANTS"] = "seasonal_launch_modal_fall_24";
  UserPropertyEnum2["INCENTIVES_PAGE_SIDE_NAV_FTUX"] = "incentives_page_side_nav_ftux";
  UserPropertyEnum2["SHADOW_BANNED"] = "shadow_banned";
  UserPropertyEnum2["SHARE_PAGE_ONBOARDING_WELCOME_FTUX"] = "share_page_onboarding_welcome_ftux";
  UserPropertyEnum2["PENDING_ATLASSIAN_WORKSPACE_MEMBERSHIPS"] = "pending_atlassian_workspace_memberships";
  UserPropertyEnum2["OPTED_INTO_MARKETING_COMMUNICATION"] = "opted_into_marketing_communication";
  UserPropertyEnum2["ATLASSIAN_LOCALE"] = "atlassian_locale";
  UserPropertyEnum2["LOCALE_REQUIRES_MARKETING_COMMUNICATION_OPT_IN"] = "locale_requires_marketing_communication_opt_in";
  UserPropertyEnum2["CONSOLIDATED_EDIT_FTUX"] = "consolidated_edit_ftux";
  UserPropertyEnum2["CONSOLIDATED_EDIT_TTS_BANNER_FTUX"] = "consolidated_edit_tts_banner_ftux";
  UserPropertyEnum2["CONSOLIDATED_EDIT_TTS_MODAL_FTUX"] = "consolidated_edit_tts_modal_ftux";
  UserPropertyEnum2["REFETCH"] = "refetch";
  UserPropertyEnum2["CALENDAR_AUTOMATIONS_VIEWED"] = "calendar_automations_viewed";
  UserPropertyEnum2["OVERLAYS_WAVEFORM_FTUX"] = "overlays_waveform_ftux";
  UserPropertyEnum2["ROLE_MANDATORY_MODAL"] = "role_mandatory_modal";
  UserPropertyEnum2["ENTERED_WINTER_LAUNCH_2025_AI_TRAIL"] = "entered_winter_launch_2025_ai_trial";
  UserPropertyEnum2["MEETING_RECORDINGS_SETUP_FINISHED_FTUX"] = "meeting_recordings_setup_finished_ftux";
  UserPropertyEnum2["MEETING_RECORDING_CONNECT_CALENDAR_BANNER_FTUX"] = "meeting_recording_connect_calendar_banner_ftux";
  UserPropertyEnum2["MEETING_RECORDING_CONNECT_CALENDAR_POPUP_FTUX"] = "meeting_recording_connect_calendar_popup_ftux";
  UserPropertyEnum2["MEETING_RECORDING_SHOULD_SHOW_LEGACY_ZOOM_INTEGRATION_DISABLED_BANNER"] = "meeting_recording_should_show_legacy_zoom_integration_disabled_banner";
  UserPropertyEnum2["ENTERED_USAGE_BIZ_AI_TRIAL"] = "entered_usage_biz_ai_trial-hot-119733";
  UserPropertyEnum2["USAGE_BIZ_AI_TRIAL_VARIANT"] = "usage_biz_ai_trial_variant";
  UserPropertyEnum2["SLACK_BACKLINKS_FTUX"] = "slack_backlinks_ftux";
  UserPropertyEnum2["LEGACY_USER_FORCED_MIGRATION"] = "legacy_user_forced_migration";
  UserPropertyEnum2["MEETING_RECORDING_LANGUAGE"] = "meetingRecordingLanguage";
  UserPropertyEnum2["SHOULD_APPLY_AUTO_ZOOMS"] = "should_apply_auto_zooms";
  UserPropertyEnum2["ZOOM_TO_CLICK_SHARE_PAGE_FTUX"] = "zoom_to_click_share_page_ftux";
  UserPropertyEnum2["CAMERA_BUBBLE_REGION"] = "camera_bubble_region";
  UserPropertyEnum2["SCREENSHOT_BACKGROUND"] = "screenshot_background";
  UserPropertyEnum2["POST_WORKSPACE_MIGRATION_MODAL_FTUX"] = "post_workspace_migration_modal_ftux";
  return UserPropertyEnum2;
})(UserPropertyEnum || {});
const userProperties = {
  // Used for testing
  ["booleanValue" /* BOOLEAN_VALUE */]: {
    defaultValue: false,
    type: Boolean
  },
  // Used for testing
  ["numberValue" /* NUMBER_VALUE */]: {
    defaultValue: 0,
    type: Number
  },
  // Used for testing
  ["stringValue" /* STRING_VALUE */]: {
    defaultValue: "",
    type: String
  },
  // Used for testing
  ["jsonValue" /* JSON_VALUE */]: {
    defaultValue: null,
    type: JSON
  },
  ["userDefaultWorkspace" /* DEFAULT_WORKSPACE */]: {
    defaultValue: 0,
    type: Number
  },
  ["autoAssignedDefaultWorkspace" /* AUTO_ASSIGNED_DEFAULT_WORKSPACE */]: {
    defaultValue: 0,
    type: Number
  },
  ["autoAssignedDefaultWorkspaceName" /* AUTO_ASSIGNED_DEFAULT_WORKSPACE_NAME */]: {
    defaultValue: "",
    type: String
  },
  ["suggestPublishingOnTag" /* SUGGEST_PUBLISHING_ON_TAG */]: {
    defaultValue: true,
    type: Boolean
  },
  ["profile" /* PROFILE */]: {
    defaultValue: {
      v1: {
        role: "",
        location: "",
        introLoom: ""
      }
    },
    type: JSON
  },
  ["profileUrl" /* PROFILE_URL */]: {
    defaultValue: "",
    type: String
  },
  ["signupLocation" /* SIGNUP_LOCATION */]: {
    defaultValue: "",
    type: String
  },
  ["has_given_consent_for_ai_audio_generation_for_variables" /* HAS_GIVEN_CONSENT_FOR_AI_AUDIO_GENERATION_FOR_VARIABLES */]: {
    defaultValue: false,
    type: Boolean
  },
  // ftux user properties
  // true --> dismissed
  // false --> undismissed
  ["global_limit_banner" /* GLOBAL_LIMIT_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["identity_migration_banner_ftux" /* IDENTITY_MIGRATION_BANNER_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["workspace_migration_banner_ftux" /* WORKSPACE_MIGRATION_BANNER_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["post_workspace_migration_modal_ftux" /* POST_WORKSPACE_MIGRATION_MODAL_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["member_video_limit_banner" /* MEMBER_VIDEO_LIMIT_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["workspace_content_limit_banner" /* WORKSPACE_CONTENT_LIMIT_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["recorder_download_banner" /* RECORDER_DOWNLOAD_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["creator_lite_member_limit_banner" /* CREATOR_LITE_MEMBER_LIMIT_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["continue_watching_mobile_banner" /* CONTINUE_WATCHING_MOBILE_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["approaching_limit_banner" /* APPROACHING_LIMIT_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["mobile_download_banner" /* MOBILE_DOWNLOAD_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["member_video_threshold_banner" /* MEMBER_VIDEO_THRESHOLD_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["web_permissions_banner" /* WEB_PERMISSIONS_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["data_retention_banner" /* DATA_RETENTION_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["received_high_video_views" /* RECEIVED_HIGH_VIDEO_VIEWS */]: {
    defaultValue: false,
    type: Boolean
  },
  ["signup_app_source" /* SIGNUP_APP_SOURCE */]: {
    defaultValue: "",
    type: String
  },
  ["recently_shared_with_entities" /* RECENTLY_SHARED_WITH */]: {
    defaultValue: [],
    type: JSON
  },
  ["seen_mv3_ftux" /* SEEN_MV3_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["creator_lite_limit_global_banner" /* CREATOR_LITE_MEMBER_LIMIT_GLOBAL_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["global_admin_dunning_banner" /* GLOBAL_ADMIN_DUNNING_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["global_admin_payment_authentication_banner" /* GLOBAL_ADMIN_PAYMENT_AUTHENTICATION_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["auto_comment_and_reaction" /* AUTO_COMMENT_AND_REACTION */]: {
    defaultValue: false,
    type: Boolean
  },
  ["single_delivery_notifications" /* SINGLE_DELIVERY_NOTIFICATIONS */]: {
    defaultValue: {},
    type: JSON
  },
  ["loom_ai_trial_ended_ftux" /* LOOM_AI_TRIAL_ENDED_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["email_status" /* EMAIL_STATUS */]: {
    defaultValue: "",
    type: String
  },
  ["eoy_2024_ftux" /* EOY_2024_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["seasonal_launch_tour" /* SEASONAL_LAUNCH_TOUR */]: {
    defaultValue: false,
    type: Boolean
  },
  ["seasonal_launch_modal_fall_24" /* SEASONAL_LAUNCH_MODAL_VARIANTS */]: {
    defaultValue: false,
    type: Boolean
  },
  ["incentives_page_side_nav_ftux" /* INCENTIVES_PAGE_SIDE_NAV_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["shadow_banned" /* SHADOW_BANNED */]: {
    defaultValue: false,
    type: Boolean
  },
  ["share_page_onboarding_welcome_ftux" /* SHARE_PAGE_ONBOARDING_WELCOME_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["pending_atlassian_workspace_memberships" /* PENDING_ATLASSIAN_WORKSPACE_MEMBERSHIPS */]: {
    defaultValue: [],
    type: JSON
  },
  ["opted_into_marketing_communication" /* OPTED_INTO_MARKETING_COMMUNICATION */]: {
    defaultValue: false,
    type: Boolean
  },
  ["atlassian_locale" /* ATLASSIAN_LOCALE */]: {
    defaultValue: "",
    type: String
  },
  ["refetch" /* REFETCH */]: {
    defaultValue: false,
    type: Boolean
  },
  ["locale_requires_marketing_communication_opt_in" /* LOCALE_REQUIRES_MARKETING_COMMUNICATION_OPT_IN */]: {
    defaultValue: null,
    type: Boolean
  },
  ["consolidated_edit_ftux" /* CONSOLIDATED_EDIT_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["consolidated_edit_tts_banner_ftux" /* CONSOLIDATED_EDIT_TTS_BANNER_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["consolidated_edit_tts_modal_ftux" /* CONSOLIDATED_EDIT_TTS_MODAL_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["calendar_automations_viewed" /* CALENDAR_AUTOMATIONS_VIEWED */]: {
    defaultValue: false,
    type: Boolean
  },
  ["overlays_waveform_ftux" /* OVERLAYS_WAVEFORM_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["role_mandatory_modal" /* ROLE_MANDATORY_MODAL */]: {
    defaultValue: false,
    type: Boolean
  },
  ["entered_winter_launch_2025_ai_trial" /* ENTERED_WINTER_LAUNCH_2025_AI_TRAIL */]: {
    defaultValue: false,
    type: Boolean
  },
  ["meeting_recordings_setup_finished_ftux" /* MEETING_RECORDINGS_SETUP_FINISHED_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["meeting_recording_connect_calendar_banner_ftux" /* MEETING_RECORDING_CONNECT_CALENDAR_BANNER_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["meeting_recording_connect_calendar_popup_ftux" /* MEETING_RECORDING_CONNECT_CALENDAR_POPUP_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["meeting_recording_should_show_legacy_zoom_integration_disabled_banner" /* MEETING_RECORDING_SHOULD_SHOW_LEGACY_ZOOM_INTEGRATION_DISABLED_BANNER */]: {
    defaultValue: false,
    type: Boolean
  },
  ["entered_usage_biz_ai_trial-hot-119733" /* ENTERED_USAGE_BIZ_AI_TRIAL */]: {
    defaultValue: false,
    type: Boolean
  },
  ["usage_biz_ai_trial_variant" /* USAGE_BIZ_AI_TRIAL_VARIANT */]: {
    defaultValue: "",
    type: String
  },
  ["slack_backlinks_ftux" /* SLACK_BACKLINKS_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["legacy_user_forced_migration" /* LEGACY_USER_FORCED_MIGRATION */]: {
    defaultValue: false,
    type: Boolean
  },
  ["meetingRecordingLanguage" /* MEETING_RECORDING_LANGUAGE */]: {
    defaultValue: "",
    type: String
  },
  ["should_apply_auto_zooms" /* SHOULD_APPLY_AUTO_ZOOMS */]: {
    defaultValue: true,
    type: Boolean
  },
  ["zoom_to_click_share_page_ftux" /* ZOOM_TO_CLICK_SHARE_PAGE_FTUX */]: {
    defaultValue: false,
    type: Boolean
  },
  ["camera_bubble_region" /* CAMERA_BUBBLE_REGION */]: {
    defaultValue: CameraPickerRegion.BottomLeft,
    type: String
  },
  ["screenshot_background" /* SCREENSHOT_BACKGROUND */]: {
    defaultValue: "none",
    type: String
  }
};
const userPropertyValidators = {
  ["email_status" /* EMAIL_STATUS */]: {
    validator: (value) => {
      return Object.values(EmailStatus).includes(value);
    }
  },
  ["camera_bubble_region" /* CAMERA_BUBBLE_REGION */]: {
    validator: (value) => {
      return Object.values(CameraPickerRegion).includes(value);
    }
  },
  ["screenshot_background" /* SCREENSHOT_BACKGROUND */]: {
    validator: (value) => {
      return isPresetBackgroundName(value) || isHexColor(value) || value === "none";
    }
  }
};
export {
  UserPropertyEnum,
  userProperties,
  userPropertyValidators
};
//# sourceMappingURL=userProperties.js.map
