import "../chunk-BYZ2GIR3.js";
import { Team } from "./product";
import { UserPropertyEnum } from "./userProperties";
const MAX_FTUX = 2;
const FTUX_NOTIFICATIONS = {
  [UserPropertyEnum.GLOBAL_LIMIT_BANNER]: {
    priority: 0,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.IDENTITY_MIGRATION_BANNER_FTUX]: {
    priority: 0,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.WORKSPACE_MIGRATION_BANNER_FTUX]: {
    priority: 0,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.MEMBER_VIDEO_LIMIT_BANNER]: {
    priority: 0,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.WORKSPACE_CONTENT_LIMIT_BANNER]: {
    priority: 0,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.RECORDER_DOWNLOAD_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.CREATOR_LITE_MEMBER_LIMIT_BANNER]: {
    priority: 0
  },
  [UserPropertyEnum.CONTINUE_WATCHING_MOBILE_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.APPROACHING_LIMIT_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.MOBILE_DOWNLOAD_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.MEMBER_VIDEO_THRESHOLD_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.WEB_PERMISSIONS_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.DATA_RETENTION_BANNER]: {
    priority: 1,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.GLOBAL_ADMIN_DUNNING_BANNER]: {
    priority: 0,
    team: Team.Billing,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.GLOBAL_ADMIN_PAYMENT_AUTHENTICATION_BANNER]: {
    priority: 0,
    team: Team.Billing,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.LOOM_AI_TRIAL_ENDED_FTUX]: {
    priority: 0,
    team: Team.Billing,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.EOY_2024_FTUX]: {
    priority: 0,
    expires: Date.UTC(2025, 1, 31),
    team: Team.Outreach,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.SEASONAL_LAUNCH_TOUR]: {
    priority: 0,
    team: Team.ShareAndTransform,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.SEASONAL_LAUNCH_MODAL_VARIANTS]: {
    priority: 0,
    team: Team.ShareAndTransform,
    skipCleanupReminder: false
  },
  [UserPropertyEnum.INCENTIVES_PAGE_SIDE_NAV_FTUX]: {
    priority: 2,
    team: Team.Outreach,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.SHARE_PAGE_ONBOARDING_WELCOME_FTUX]: {
    priority: 1,
    team: Team.Outreach,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.CONSOLIDATED_EDIT_FTUX]: {
    priority: 0,
    team: Team.ShareAndTransform,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.CONSOLIDATED_EDIT_TTS_BANNER_FTUX]: {
    priority: 0,
    team: Team.ShareAndTransform,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.CALENDAR_AUTOMATIONS_VIEWED]: {
    priority: 0,
    team: Team.MeetingRecording,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.OVERLAYS_WAVEFORM_FTUX]: {
    priority: 0,
    team: Team.ShareAndTransform,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.CONSOLIDATED_EDIT_TTS_MODAL_FTUX]: {
    priority: 0,
    team: Team.ShareAndTransform,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.MEETING_RECORDINGS_SETUP_FINISHED_FTUX]: {
    priority: 0,
    team: Team.MeetingRecording,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.MEETING_RECORDING_CONNECT_CALENDAR_POPUP_FTUX]: {
    priority: 1,
    team: Team.MeetingRecording,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.SLACK_BACKLINKS_FTUX]: {
    priority: 1,
    team: Team.IntegrateOrganizeCollaborate,
    skipCleanupReminder: true
  },
  [UserPropertyEnum.ZOOM_TO_CLICK_SHARE_PAGE_FTUX]: {
    priority: 1,
    team: Team.ShareAndTransform
  },
  [UserPropertyEnum.POST_WORKSPACE_MIGRATION_MODAL_FTUX]: {
    priority: 0,
    skipCleanupReminder: true
  }
};
const ALL_FTUX = Object.keys(FTUX_NOTIFICATIONS);
export {
  ALL_FTUX,
  FTUX_NOTIFICATIONS,
  MAX_FTUX
};
//# sourceMappingURL=ftux.js.map
