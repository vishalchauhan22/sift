import "../chunk-BYZ2GIR3.js";
import { Feature } from "./product";
const DEFAULT_PAGINATION_LIMIT = 25;
const NOTIFICATIONS_UPDATED_TOPIC = "notifications_updated_topic";
const RECORDING_EVENT_TOPIC = "recording_event_topic";
const RECORDING_COMPLETED_TOPIC = "recording_completed_topic";
const GIF_GENERATED_TOPIC = "gif_generated_topic";
const WAVEFORM_GENERATION_TOPIC = "waveform_generation_topic";
const WAVEFORM_DATA_CHANGED_TOPIC = "waveform_data_changed_topic";
const SESSION_REQUEST_TOKEN_GENERATED_TOPIC = "session_request_token_generated_topic";
const INTELLIGENCE_COMPLETED_TOPIC = "intelligence_completed_topic";
const SCREENSHOTS_INTELLIGENCE_COMPLETED_TOPIC = "screenshots_intelligence_completed_topic";
const VARIABLES_TASK_STATUS = "variables_task_status";
const EDIT_TTS_TASK_STATUS = "edit_tts_task_status";
const VIDEO_GENERATION_STATUS_TOPIC = "video_generation_status_topic";
const AI_LIMITS_UPDATED_TOPIC = "ai_limits_updated_topic";
const VIDEO_COMMENT_ADDED_TOPIC = "video_comment_added_topic";
function getVideoCreatedByUserTopic(userId) {
  return "".concat(RECORDING_COMPLETED_TOPIC, ":user_id:").concat(userId);
}
function getVideoCommentAddedTopic(videoId) {
  return "".concat(VIDEO_COMMENT_ADDED_TOPIC, ":video_id:").concat(videoId);
}
var DeliveryMethods = /* @__PURE__ */ ((DeliveryMethods2) => {
  DeliveryMethods2["Mail"] = "mail";
  DeliveryMethods2["Mobile"] = "mobile";
  DeliveryMethods2["Web"] = "web";
  DeliveryMethods2["Slack"] = "slack";
  DeliveryMethods2["AtlassianNotifications"] = "atlassianNotifications";
  return DeliveryMethods2;
})(DeliveryMethods || {});
var NotificationStatuses = /* @__PURE__ */ ((NotificationStatuses2) => {
  NotificationStatuses2["CREATED"] = "created";
  NotificationStatuses2["SENT"] = "sent";
  NotificationStatuses2["DELIVERED"] = "delivered";
  NotificationStatuses2["SEEN"] = "seen";
  NotificationStatuses2["READ"] = "read";
  return NotificationStatuses2;
})(NotificationStatuses || {});
var NotificationDDActions = /* @__PURE__ */ ((NotificationDDActions2) => {
  NotificationDDActions2["SUCCESS"] = "success";
  NotificationDDActions2["FAILURE"] = "failure";
  NotificationDDActions2["NOOP"] = "noop";
  return NotificationDDActions2;
})(NotificationDDActions || {});
const DELIVERY_MAIL = "mail" /* Mail */;
const DELIVERY_MOBILE = "mobile" /* Mobile */;
const DELIVERY_WEB = "web" /* Web */;
const DELIVERY_SLACK = "slack" /* Slack */;
const DELIVERY_ATLASSIAN_NOTIFICATIONS = "atlassianNotifications" /* AtlassianNotifications */;
const DELIVERY_METHODS_AVAILABLE = Object.values(DeliveryMethods);
const QUERY_SHARED = "shared";
const QUERY_COMMENT = "comments";
const QUERY_REACTIONS_AND_VIEWS = "reactions_and_views";
const QUERY_OTHER = "other";
const QUERY_ALL = "all";
var NotificationQueryType = /* @__PURE__ */ ((NotificationQueryType2) => {
  NotificationQueryType2[NotificationQueryType2["SHARED"] = QUERY_SHARED] = "SHARED";
  NotificationQueryType2[NotificationQueryType2["COMMENT"] = QUERY_COMMENT] = "COMMENT";
  NotificationQueryType2[NotificationQueryType2["REACTIONS_AND_VIEWS"] = QUERY_REACTIONS_AND_VIEWS] = "REACTIONS_AND_VIEWS";
  NotificationQueryType2[NotificationQueryType2["OTHER"] = QUERY_OTHER] = "OTHER";
  NotificationQueryType2[NotificationQueryType2["ALL"] = QUERY_ALL] = "ALL";
  return NotificationQueryType2;
})(NotificationQueryType || {});
const PUSH_SERVER_CONTACT_EMAIL = "mailto:team@loom.com";
const INVALID_SUBSCRIPTION_ERROR = "InvalidStateError";
const PERMISSION_GRANTED = "granted";
const PERMISSION_DENIED = "denied";
const PERMISSION_DEFAULT = "default";
const PERMISSION_PROMPT = "prompt";
const DEVICE_UNSUPPORTED = "device_unsupported";
const CREATED = "created";
const SENT = "sent";
const DELIVERED = "delivered";
const SEEN = "seen";
const READ = "read";
const NOTIF_STATUSES = [CREATED, SENT, DELIVERED, SEEN, READ];
const OPEN_URL = "open_url";
const NOTIFICATION_URL_PARAMS = {
  reactor: "user_id_of_reactor",
  startAndPause: "start_and_pause"
};
var NotificationType = /* @__PURE__ */ ((NotificationType2) => {
  NotificationType2["RetranscriptionSuccess"] = "retranscription_success_notification";
  NotificationType2["RetranscriptionFailure"] = "retranscription_failure_notification";
  NotificationType2["VideoTaskResponse"] = "video_task_response_notification";
  NotificationType2["VideoTaskMention"] = "video_task_mention_notification";
  NotificationType2["CalendarEfficiency"] = "calendar_efficiency_notification";
  NotificationType2["BusinessAiTrialWelcome"] = "business_ai_trial_welcome";
  NotificationType2["InsightsTimeSaved"] = "insights_time_saved_notification";
  NotificationType2["InsightsViewMilestone"] = "insights_view_milestone_notification";
  NotificationType2["VideoUsedAsWeaveClip"] = "video_used_as_weave_clip";
  NotificationType2["CommentReply"] = "comment_reply_notification";
  NotificationType2["FirstVideoView"] = "first_video_view_notification";
  NotificationType2["HighVideoViews"] = "high_video_views_notification";
  NotificationType2["WeaveFirstVideoView"] = "weave_video_first_view";
  NotificationType2["AddWatchLater"] = "added_to_watch_later_notification";
  NotificationType2["VideoComment"] = "video_comment_notification";
  NotificationType2["VideoReaction"] = "video_reaction_notification";
  NotificationType2["ContentLimitApproaching"] = "content_limit_approaching_notification";
  NotificationType2["ContentLimitReached"] = "content_limit_reached_notification";
  NotificationType2["CreatorLiteLimitApproaching"] = "creator_lite_limit_approaching_notification";
  NotificationType2["CreatorLiteLimitReached"] = "creator_lite_limit_reached_notification";
  NotificationType2["MembershipRoleChanged"] = "membership_role_change_notification";
  NotificationType2["WorkspaceInvitation"] = "workspace_invitation_notification";
  NotificationType2["ShareVideo"] = "share_video_notification";
  NotificationType2["ReshareVideo"] = "reshare_video_notification";
  NotificationType2["VideoPrivacyChange"] = "video_privacy_change_notification";
  NotificationType2["ExternalVideoIngestionProcessing"] = "external_ingestion_processing_notification";
  NotificationType2["ExternalVideoIngestionCompleted"] = "external_ingestion_completed_notification";
  NotificationType2["IngestionIntegrationEnabled"] = "ingestion_integration_enabled_notification";
  NotificationType2["SpaceInvitation"] = "space_invitation_notification";
  NotificationType2["SpaceContent"] = "space_content_notification";
  NotificationType2["SpaceAllHandsContent"] = "space_all_hands_content_notification";
  NotificationType2["SpaceAdminAction"] = "space_admin_action_notification";
  NotificationType2["SpaceStateChange"] = "space_state_change_notification";
  NotificationType2["SpaceVideoMoved"] = "space_item_moved_notification";
  NotificationType2["CommentMention"] = "comment_mention_notification";
  NotificationType2["PostCommentMention"] = "post_comment_mention_notification";
  NotificationType2["ReplyCommentMention"] = "reply_comment_mention_notification";
  NotificationType2["VideoReactionBundle"] = "videoReactionBundle";
  NotificationType2["RecordingNudgeAfterXViewsGiven"] = "recording_nudge_after_x_views_given_notification";
  NotificationType2["ReminderToRecord"] = "reminder_to_record_notification";
  NotificationType2["NewFollower"] = "new_follower_notification";
  NotificationType2["InsightsDigest"] = "insights_digest_notification";
  NotificationType2["InsightsMonthlyDigest"] = "insights_monthly_digest_notification";
  NotificationType2["WatchLaterReminder"] = "watch_later_reminder_notification";
  NotificationType2["SendWatchLaterReminderWeekdaysOnly"] = "send_watch_later_reminder_weekdays_only_setting";
  NotificationType2["OrgInviteAcceptedWithIncentives"] = "org_invite_accepted_with_incentives";
  return NotificationType2;
})(NotificationType || {});
var NotificationClientType = /* @__PURE__ */ ((NotificationClientType2) => {
  NotificationClientType2["Reply"] = "reply";
  NotificationClientType2["Comment"] = "comment";
  NotificationClientType2["Reaction"] = "reaction";
  NotificationClientType2["FirstVideoView"] = "vfv";
  NotificationClientType2["WatchLater"] = "watchList";
  NotificationClientType2["ContentLimitApproaching"] = "contentLimitApproaching";
  NotificationClientType2["ContentLimitReached"] = "contentLimitReached";
  NotificationClientType2["CreatorLiteLimitApproaching"] = "creatorLiteLimitApproaching";
  NotificationClientType2["CreatorLiteLimitReached"] = "creatorLiteLimitReached";
  NotificationClientType2["MembershipRoleChange"] = "membershipRoleChange";
  NotificationClientType2["ShareVideo"] = "shareVideo";
  NotificationClientType2["ReshareVideo"] = "reshareVideo";
  NotificationClientType2["VideoPrivacyChange"] = "videoPrivacyChange";
  NotificationClientType2["PostCommentMention"] = "postCommentMention";
  NotificationClientType2["ReplyCommentMention"] = "replyCommentMention";
  NotificationClientType2["ExternalIngestionProcessing"] = "externalIngestionProcessing";
  NotificationClientType2["ExternalIngestionCompleted"] = "externalIngestionCompleted";
  NotificationClientType2["CommentMention"] = "commentMention";
  NotificationClientType2["WorkspaceInvitation"] = "workspaceInvitation";
  NotificationClientType2["NewFollower"] = "newfollower";
  NotificationClientType2["InsightsDigest"] = "insightsDigest";
  return NotificationClientType2;
})(NotificationClientType || {});
const VIDEO_REACTION_PUSH_NOTIF_CLICK = "Video Reaction Push Notif Click";
const RETRANSCRIPTION_SUCCESS_PUSH_NOTIFICATION_SENT = "Retranscription success Push Notification Sent";
const RETRANSCRIPTION_FAILURE_PUSH_NOTIFICATION_SENT = "Retranscription failure Push Notification Sent";
const VIDEO_TASK_RESPONSE_PUSH_NOTIFICATION_SENT = "Video task response Push Notification Sent";
const VIDEO_TASK_MENTION_PUSH_NOTIFICATION_SENT = "Video task mention Push Notification Sent";
const CALENDAR_EFFICIENCY_PUSH_NOTIFICATION_SENT = "Calendar_efficiency Push Notification Sent";
const BUSINESS_AI_TRIAL_WELCOME_PUSH_NOTIFICATION_SENT = "Business_Ai_trial_welcome Push Notification Sent";
const INSIGHTS_TIME_SAVED_PUSH_NOTIFICATION_SENT = "Insights_time_saved Push Notification Sent";
const INSIGHTS_VIEW_MILESTONE_PUSH_NOTIFICATION_SENT = "Insights_view_milestone Push Notification Sent";
const RECORDING_NUDGE_AFTER_X_VIEWS_GIVEN_PUSH_NOTIFICATION_SENT = "Recording_nudge_after_x_views_given Push Notification Sent";
const VIDEO_USED_AS_WEAVE_CLIP_NOTIFICATION = "Video Used as Weave Clip Notification";
const COMMENT_REPLY_PUSH_NOTIFICATION_SENT = "Comment Reply Push Notification Sent";
const CONTENT_LIMIT_REACHED_NOTIFICATION_SENT = "Content Limit Reached Notification Sent";
const CREATOR_LITE_LIMIT_APPROACHING_NOTIFICATION_SENT = "Creator Lite Limit Approaching Notification Sent";
const CREATOR_LITE_LIMIT_REACHED_NOTIFICATION_SENT = "Creator Lite Limit Reached Notification Sent";
const HIGH_VIDEO_VIEWS_NOTIFICATION_SENT = "High Video Views Notification Sent";
const WEAVE_FIRST_VIDEO_VIEW_PUSH_NOTIFICATION_SENT = "Weave First Video View Push Notification Sent";
const WORKSPACE_INVITATION_NOTIFICATION_SENT = "Workspace Invitation Notification Sent";
const VIDEO_REACTION_EVENT = "Video Reaction Push Notification Sent";
const MEMBERSHIP_ROLE_CHANGE_NOTIFICATION_SENT = "Membership Role Change Notification Sent";
const ADDED_TO_WATCH_LATER_PUSH_NOTIFICATION_SENT = "Added to Watch Later Push Notification Sent";
const VIDEO_SHARE_PUSH_NOTIFICATION_SENT = "Video Share Push Notification Sent";
const VIDEO_RE_SHARE_PUSH_NOTIFICATION_SENT = "Video Re-share Push Notification Sent";
const VIDEO_PRIVACY_CHANGE_PUSH_NOTIFICATION_SENT = "Video Privacy Change Push Notification Sent";
const POST_COMMENT_MENTION_NOTIFICATION_SENT = "Post Comment Mention Notification Sent";
const REPLY_COMMENT_MENTION_NOTIFICATION_SENT = "Reply Comment Mention Notification Sent";
const EXTERNAL_VIDEO_INGESTION_PROCESSING_NOTIFICATION_SENT = "External Video Ingestion Processing Notification Sent";
const EXTERNAL_VIDEO_INGESTION_COMPLETED_NOTIFICATION_SENT = "External Video Ingestion Completed Notification Sent";
const INGESTION_INTEGRATION_ENABLED_NOTIFICATION_SENT = "Ingestion Integration Enabled Notification Sent";
const SPACE_INVITATION_NOTIFICATION_SENT = "Space Invitation Notification Sent";
const NEW_SPACE_CONTENT_NOTIFICATION_SENT = "New Space Content Notification Sent";
const NEW_ALL_HANDS_SPACE_CONTENT_NOTIFICATION_SENT = "New All Hands Space Content Notification Sent";
const NEW_SPACE_ADMIN_ACTION_NOTIFICATION_SENT = "New Space Admin Action Notification Sent";
const NEW_SPACE_STATE_CHANGE_NOTIFICATION_SENT = "New Space State Change Notification Sent";
const SPACE_VIDEO_MOVED_NOTIFICATION_SENT = "Space Video Moved Notification Sent";
const CONTENT_LIMIT_APPROACHING_NOTIFICATION_SENT = "Content Limit Approaching Notification Sent";
const COMMENT_MENTION_NOTIFICATION_SENT = "Comment Mention Notification Sent";
const NEW_FOLLOWER_NOTIFICATION_SENT = "New follower Notification Sent";
const NEW_INSIGHTS_DIGEST_NOTIFICATION_SENT = "New Insights Digest Notification Sent";
const NEW_INSIGHTS_MONTHLY_DIGEST_NOTIFICATION_SENT = "New Insights Monthly Digest Notification Sent";
const NEW_WATCH_LATER_LIST_REMINDER_SENT = "New Watch Later List Reminder Sent";
var DeliveryTypes = /* @__PURE__ */ ((DeliveryTypes2) => {
  DeliveryTypes2["INSTANT"] = "instant";
  DeliveryTypes2["NEXT_DAY"] = "next_day";
  DeliveryTypes2["NEXT_DAY_SKIP_WEEKENDS"] = "next_day_skip_weekends";
  return DeliveryTypes2;
})(DeliveryTypes || {});
const NOTIFICATIONS_CONFIGURATION = {
  // PLOP_NOTIFICATION_STEP2
  ["retranscription_success_notification" /* RetranscriptionSuccess */]: {
    type: "retranscription_success_notification" /* RetranscriptionSuccess */,
    clientName: "retranscription_success_notification" /* RetranscriptionSuccess */,
    sentEvent: RETRANSCRIPTION_SUCCESS_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Retranscription success Push Notification Clicked",
    canToggle: true,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    feature: Feature.TranscriptExtraction
  },
  ["retranscription_failure_notification" /* RetranscriptionFailure */]: {
    type: "retranscription_failure_notification" /* RetranscriptionFailure */,
    clientName: "retranscription_failure_notification" /* RetranscriptionFailure */,
    sentEvent: RETRANSCRIPTION_FAILURE_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Retranscription failure Push Notification Clicked",
    canToggle: true,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    feature: Feature.TranscriptExtraction
  },
  ["video_task_response_notification" /* VideoTaskResponse */]: {
    type: "video_task_response_notification" /* VideoTaskResponse */,
    clientName: "video_task_response_notification" /* VideoTaskResponse */,
    sentEvent: VIDEO_TASK_RESPONSE_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Video task response Push Notification Clicked",
    canToggle: true,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    feature: Feature.VideoTasks
  },
  ["video_task_mention_notification" /* VideoTaskMention */]: {
    type: "video_task_mention_notification" /* VideoTaskMention */,
    clientName: "video_task_mention_notification" /* VideoTaskMention */,
    sentEvent: VIDEO_TASK_MENTION_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Video task mention Push Notification Clicked",
    canToggle: true,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    feature: Feature.VideoTasks
  },
  ["calendar_efficiency_notification" /* CalendarEfficiency */]: {
    type: "calendar_efficiency_notification" /* CalendarEfficiency */,
    clientName: "calendar_efficiency_notification" /* CalendarEfficiency */,
    sentEvent: CALENDAR_EFFICIENCY_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Calendar_efficiency Push Notification Clicked",
    canToggle: false,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    deliveryMethodOverrides: {},
    feature: Feature.GrowthNotifications
  },
  ["business_ai_trial_welcome" /* BusinessAiTrialWelcome */]: {
    type: "business_ai_trial_welcome" /* BusinessAiTrialWelcome */,
    clientName: "business_ai_trial_welcome" /* BusinessAiTrialWelcome */,
    sentEvent: BUSINESS_AI_TRIAL_WELCOME_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Business_Ai_trial_welcome Push Notification Clicked",
    canToggle: false,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    deliveryMethodOverrides: {},
    feature: Feature.BusinessTrial
  },
  ["insights_time_saved_notification" /* InsightsTimeSaved */]: {
    type: "insights_time_saved_notification" /* InsightsTimeSaved */,
    clientName: "insights_time_saved_notification" /* InsightsTimeSaved */,
    sentEvent: INSIGHTS_TIME_SAVED_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Insights_time_saved Push Notification Clicked",
    canToggle: false,
    deliveryMethods: [DELIVERY_WEB],
    deliveryMethodOverrides: {},
    feature: Feature.InsightsHub
  },
  ["insights_view_milestone_notification" /* InsightsViewMilestone */]: {
    type: "insights_view_milestone_notification" /* InsightsViewMilestone */,
    clientName: "insights_view_milestone_notification" /* InsightsViewMilestone */,
    sentEvent: INSIGHTS_VIEW_MILESTONE_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Insights_view_milestone Push Notification Clicked",
    canToggle: true,
    deliveryMethods: [DELIVERY_WEB],
    deliveryMethodOverrides: {},
    feature: Feature.InsightsHub
  },
  ["recording_nudge_after_x_views_given_notification" /* RecordingNudgeAfterXViewsGiven */]: {
    type: "recording_nudge_after_x_views_given_notification" /* RecordingNudgeAfterXViewsGiven */,
    clientName: "recording_nudge_after_x_views_given_notification" /* RecordingNudgeAfterXViewsGiven */,
    sentEvent: RECORDING_NUDGE_AFTER_X_VIEWS_GIVEN_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Recording_nudge_after_x_views_given Push Notification Clicked",
    canToggle: false,
    deliveryMethods: [DELIVERY_MAIL, DELIVERY_WEB],
    feature: Feature.GrowthNotifications
  },
  ["video_used_as_weave_clip" /* VideoUsedAsWeaveClip */]: {
    type: "video_used_as_weave_clip" /* VideoUsedAsWeaveClip */,
    clientName: "video_used_as_weave_clip" /* VideoUsedAsWeaveClip */,
    sentEvent: VIDEO_USED_AS_WEAVE_CLIP_NOTIFICATION,
    webPushEvent: "Video Used As Weave Clip Click",
    canToggle: true,
    feature: Feature.VideoEditing
  },
  ["comment_reply_notification" /* CommentReply */]: {
    type: "comment_reply_notification" /* CommentReply */,
    clientName: "reply" /* Reply */,
    sentEvent: COMMENT_REPLY_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Comment Reply Push Notif Click",
    canToggle: true,
    feature: Feature.Comments
  },
  ["content_limit_reached_notification" /* ContentLimitReached */]: {
    type: "content_limit_reached_notification" /* ContentLimitReached */,
    clientName: "contentLimitReached" /* ContentLimitReached */,
    sentEvent: CONTENT_LIMIT_REACHED_NOTIFICATION_SENT,
    webPushEvent: "Reached Content Limit Notif Click",
    feature: Feature.MemberLimits
  },
  ["creator_lite_limit_approaching_notification" /* CreatorLiteLimitApproaching */]: {
    type: "creator_lite_limit_approaching_notification" /* CreatorLiteLimitApproaching */,
    clientName: "creatorLiteLimitApproaching" /* CreatorLiteLimitApproaching */,
    sentEvent: CREATOR_LITE_LIMIT_APPROACHING_NOTIFICATION_SENT,
    webPushEvent: "Approaching Creator Lite Limit Notif Click",
    feature: Feature.WorkspaceLimits
  },
  ["creator_lite_limit_reached_notification" /* CreatorLiteLimitReached */]: {
    type: "creator_lite_limit_reached_notification" /* CreatorLiteLimitReached */,
    clientName: "creatorLiteLimitReached" /* CreatorLiteLimitReached */,
    sentEvent: CREATOR_LITE_LIMIT_REACHED_NOTIFICATION_SENT,
    webPushEvent: "Reached Creator Lite Limit Notif Click",
    feature: Feature.WorkspaceLimits
  },
  ["first_video_view_notification" /* FirstVideoView */]: {
    type: "first_video_view_notification" /* FirstVideoView */,
    clientName: "vfv" /* FirstVideoView */,
    webPushEvent: "First Video View Push Notif Click",
    canToggle: true,
    feature: Feature.WorkspaceManagement
  },
  ["high_video_views_notification" /* HighVideoViews */]: {
    type: "high_video_views_notification" /* HighVideoViews */,
    clientName: "high_video_views_notification" /* HighVideoViews */,
    sentEvent: HIGH_VIDEO_VIEWS_NOTIFICATION_SENT,
    webPushEvent: "High Video Views Notif Click",
    canToggle: true
  },
  ["weave_video_first_view" /* WeaveFirstVideoView */]: {
    type: "weave_video_first_view" /* WeaveFirstVideoView */,
    clientName: "weave_video_first_view" /* WeaveFirstVideoView */,
    sentEvent: WEAVE_FIRST_VIDEO_VIEW_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Weave First Video View Push Notif Click",
    canToggle: true,
    feature: Feature.VideoEditing
  },
  ["video_comment_notification" /* VideoComment */]: {
    type: "video_comment_notification" /* VideoComment */,
    clientName: "comment" /* Comment */,
    webPushEvent: "Video Comment Push Notif Click",
    canToggle: true,
    feature: Feature.Comments
  },
  ["workspace_invitation_notification" /* WorkspaceInvitation */]: {
    type: "workspace_invitation_notification" /* WorkspaceInvitation */,
    clientName: "workspaceInvitation" /* WorkspaceInvitation */,
    sentEvent: WORKSPACE_INVITATION_NOTIFICATION_SENT,
    deliveryMethods: ["mail" /* Mail */]
  },
  ["video_reaction_notification" /* VideoReaction */]: {
    type: "video_reaction_notification" /* VideoReaction */,
    clientName: "reaction" /* Reaction */,
    sentEvent: VIDEO_REACTION_EVENT,
    webPushEvent: VIDEO_REACTION_PUSH_NOTIF_CLICK,
    canToggle: true,
    deliveryMethodOverrides: {
      [DELIVERY_MAIL]: false
    },
    feature: Feature.VideoReactions
  },
  ["membership_role_change_notification" /* MembershipRoleChanged */]: {
    type: "membership_role_change_notification" /* MembershipRoleChanged */,
    clientName: "membershipRoleChange" /* MembershipRoleChange */,
    sentEvent: MEMBERSHIP_ROLE_CHANGE_NOTIFICATION_SENT,
    feature: Feature.WorkspaceManagement
  },
  ["added_to_watch_later_notification" /* AddWatchLater */]: {
    type: "added_to_watch_later_notification" /* AddWatchLater */,
    clientName: "watchList" /* WatchLater */,
    sentEvent: ADDED_TO_WATCH_LATER_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Watch Later Push Notification Click",
    canToggle: true,
    feature: Feature.WatchLater
  },
  ["share_video_notification" /* ShareVideo */]: {
    type: "share_video_notification" /* ShareVideo */,
    clientName: "shareVideo" /* ShareVideo */,
    sentEvent: VIDEO_SHARE_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Video Share Push Notif Click",
    canToggle: true,
    iOSCategory: "watch-later"
  },
  ["reshare_video_notification" /* ReshareVideo */]: {
    type: "reshare_video_notification" /* ReshareVideo */,
    clientName: "reshareVideo" /* ReshareVideo */,
    sentEvent: VIDEO_RE_SHARE_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Video Re-share Push Notif Click",
    canToggle: true,
    deliveryMethodOverrides: {
      [DELIVERY_MAIL]: false
    }
  },
  ["video_privacy_change_notification" /* VideoPrivacyChange */]: {
    type: "video_privacy_change_notification" /* VideoPrivacyChange */,
    clientName: "videoPrivacyChange" /* VideoPrivacyChange */,
    sentEvent: VIDEO_PRIVACY_CHANGE_PUSH_NOTIFICATION_SENT,
    webPushEvent: "Video Privacy Change Push Notif Click",
    canToggle: true,
    deliveryMethodOverrides: {
      [DELIVERY_MAIL]: false
    },
    feature: Feature.VideoSettings
  },
  ["post_comment_mention_notification" /* PostCommentMention */]: {
    type: "post_comment_mention_notification" /* PostCommentMention */,
    clientName: "postCommentMention" /* PostCommentMention */,
    sentEvent: POST_COMMENT_MENTION_NOTIFICATION_SENT,
    webPushEvent: "Comment Mention Push Notif Click",
    feature: Feature.Comments
  },
  ["reply_comment_mention_notification" /* ReplyCommentMention */]: {
    type: "reply_comment_mention_notification" /* ReplyCommentMention */,
    clientName: "replyCommentMention" /* ReplyCommentMention */,
    sentEvent: REPLY_COMMENT_MENTION_NOTIFICATION_SENT,
    webPushEvent: "Reply Comment Mention Push Notif Click",
    feature: Feature.Comments
  },
  ["external_ingestion_processing_notification" /* ExternalVideoIngestionProcessing */]: {
    type: "external_ingestion_processing_notification" /* ExternalVideoIngestionProcessing */,
    clientName: "externalIngestionProcessing" /* ExternalIngestionProcessing */,
    sentEvent: EXTERNAL_VIDEO_INGESTION_PROCESSING_NOTIFICATION_SENT,
    webPushEvent: "External Ingestion Processing Notif Click",
    canToggle: true,
    feature: Feature.VideoUpload
  },
  ["external_ingestion_completed_notification" /* ExternalVideoIngestionCompleted */]: {
    type: "external_ingestion_completed_notification" /* ExternalVideoIngestionCompleted */,
    clientName: "externalIngestionCompleted" /* ExternalIngestionCompleted */,
    sentEvent: EXTERNAL_VIDEO_INGESTION_COMPLETED_NOTIFICATION_SENT,
    webPushEvent: "External Ingestion Completed Notif Click",
    canToggle: true,
    feature: Feature.VideoUpload
  },
  ["ingestion_integration_enabled_notification" /* IngestionIntegrationEnabled */]: {
    type: "ingestion_integration_enabled_notification" /* IngestionIntegrationEnabled */,
    clientName: "ingestion_integration_enabled_notification" /* IngestionIntegrationEnabled */,
    sentEvent: INGESTION_INTEGRATION_ENABLED_NOTIFICATION_SENT,
    webPushEvent: "Ingestion Integration Enabled Notif Click",
    feature: Feature.WorkspaceManagement
  },
  ["space_invitation_notification" /* SpaceInvitation */]: {
    type: "space_invitation_notification" /* SpaceInvitation */,
    clientName: "space_invitation_notification" /* SpaceInvitation */,
    sentEvent: SPACE_INVITATION_NOTIFICATION_SENT,
    webPushEvent: "Space Invitation Notification Click",
    canToggle: true,
    feature: Feature.Spaces
  },
  ["space_content_notification" /* SpaceContent */]: {
    type: "space_content_notification" /* SpaceContent */,
    clientName: "space_content_notification" /* SpaceContent */,
    sentEvent: NEW_SPACE_CONTENT_NOTIFICATION_SENT,
    webPushEvent: "New Space Content Notification Click",
    canToggle: true,
    feature: Feature.Spaces
  },
  ["space_all_hands_content_notification" /* SpaceAllHandsContent */]: {
    type: "space_all_hands_content_notification" /* SpaceAllHandsContent */,
    clientName: "space_all_hands_content_notification" /* SpaceAllHandsContent */,
    sentEvent: NEW_ALL_HANDS_SPACE_CONTENT_NOTIFICATION_SENT,
    webPushEvent: "New All Hands Space Content Notification Click",
    canToggle: true,
    feature: Feature.Spaces
  },
  ["space_admin_action_notification" /* SpaceAdminAction */]: {
    type: "space_admin_action_notification" /* SpaceAdminAction */,
    clientName: "space_admin_action_notification" /* SpaceAdminAction */,
    sentEvent: NEW_SPACE_ADMIN_ACTION_NOTIFICATION_SENT,
    webPushEvent: "New Space Admin Action Notification Click",
    canToggle: true,
    feature: Feature.Spaces
  },
  ["space_state_change_notification" /* SpaceStateChange */]: {
    type: "space_state_change_notification" /* SpaceStateChange */,
    clientName: "space_state_change_notification" /* SpaceStateChange */,
    sentEvent: NEW_SPACE_STATE_CHANGE_NOTIFICATION_SENT,
    webPushEvent: "New Space State Change Notification Click",
    canToggle: true,
    feature: Feature.Spaces
  },
  ["space_item_moved_notification" /* SpaceVideoMoved */]: {
    type: "space_item_moved_notification" /* SpaceVideoMoved */,
    clientName: "space_item_moved_notification" /* SpaceVideoMoved */,
    sentEvent: SPACE_VIDEO_MOVED_NOTIFICATION_SENT,
    webPushEvent: "Space Video Moved Notification Click",
    feature: Feature.Spaces
  },
  ["content_limit_approaching_notification" /* ContentLimitApproaching */]: {
    type: "content_limit_approaching_notification" /* ContentLimitApproaching */,
    clientName: "contentLimitApproaching" /* ContentLimitApproaching */,
    sentEvent: CONTENT_LIMIT_APPROACHING_NOTIFICATION_SENT,
    webPushEvent: "Approaching Content Limit Notif Click",
    feature: Feature.MemberLimits
  },
  ["reminder_to_record_notification" /* ReminderToRecord */]: {
    type: "reminder_to_record_notification" /* ReminderToRecord */,
    clientName: "reminder_to_record_notification" /* ReminderToRecord */,
    webPushEvent: "Reminder To Record Notif Click",
    canToggle: true,
    feature: Feature.RemindersToRecord
  },
  // TODO: Is this still used? May need to keep for legacy reasons
  ["comment_mention_notification" /* CommentMention */]: {
    type: "comment_mention_notification" /* CommentMention */,
    clientName: "commentMention" /* CommentMention */,
    sentEvent: COMMENT_MENTION_NOTIFICATION_SENT,
    canToggle: true,
    feature: Feature.Comments
  },
  // This notification is a special notification
  // that mirrors the regular reaction notification
  ["videoReactionBundle" /* VideoReactionBundle */]: {
    type: "videoReactionBundle" /* VideoReactionBundle */,
    clientName: "reaction" /* Reaction */,
    sentEvent: VIDEO_REACTION_EVENT,
    webPushEvent: VIDEO_REACTION_PUSH_NOTIF_CLICK,
    feature: Feature.VideoReactions
  },
  ["new_follower_notification" /* NewFollower */]: {
    type: "new_follower_notification" /* NewFollower */,
    clientName: "newfollower" /* NewFollower */,
    sentEvent: NEW_FOLLOWER_NOTIFICATION_SENT,
    canToggle: true,
    webPushEvent: "New follower Notification Click",
    feature: Feature.Followers
  },
  ["insights_digest_notification" /* InsightsDigest */]: {
    type: "insights_digest_notification" /* InsightsDigest */,
    clientName: "insightsDigest" /* InsightsDigest */,
    sentEvent: NEW_INSIGHTS_DIGEST_NOTIFICATION_SENT,
    deliveryMethods: [DELIVERY_MAIL],
    canToggle: true,
    webPushEvent: "New Insights Digest Notification Click",
    feature: Feature.InsightsDigest
  },
  // Note: the InsightsMonthlyDigest notification type
  // uses the InsightsDigest notification type settings
  // to determine delivery methods. The 'Insights into my Loom usage'
  // toggle in user settings controls both notifications.
  // Therefore, you will not see records with notification_type of
  // insights_monthly_digest_notification in the
  // notification_settings_v2 table.
  ["insights_monthly_digest_notification" /* InsightsMonthlyDigest */]: {
    type: "insights_monthly_digest_notification" /* InsightsMonthlyDigest */,
    clientName: "insights_monthly_digest_notification" /* InsightsMonthlyDigest */,
    sentEvent: NEW_INSIGHTS_MONTHLY_DIGEST_NOTIFICATION_SENT,
    deliveryMethods: [DELIVERY_MAIL],
    deliveryMethodOverrides: {
      [DELIVERY_MOBILE]: false,
      [DELIVERY_WEB]: false
    },
    canToggle: true,
    webPushEvent: "New Insights Monthly Digest Notification Click",
    feature: Feature.InsightsDigest
  },
  ["watch_later_reminder_notification" /* WatchLaterReminder */]: {
    type: "watch_later_reminder_notification" /* WatchLaterReminder */,
    clientName: "watch_later_reminder_notification" /* WatchLaterReminder */,
    sentEvent: NEW_WATCH_LATER_LIST_REMINDER_SENT,
    canToggle: true,
    feature: Feature.WatchLater
  },
  ["send_watch_later_reminder_weekdays_only_setting" /* SendWatchLaterReminderWeekdaysOnly */]: {
    type: "send_watch_later_reminder_weekdays_only_setting" /* SendWatchLaterReminderWeekdaysOnly */,
    clientName: "send_watch_later_reminder_weekdays_only_setting" /* SendWatchLaterReminderWeekdaysOnly */,
    canToggle: true,
    feature: Feature.WatchLater
  },
  ["org_invite_accepted_with_incentives" /* OrgInviteAcceptedWithIncentives */]: {
    type: "org_invite_accepted_with_incentives" /* OrgInviteAcceptedWithIncentives */,
    clientName: "org_invite_accepted_with_incentives" /* OrgInviteAcceptedWithIncentives */,
    canToggle: false,
    feature: Feature.IncentivesPage
  }
};
const NOTIFICATION_TYPES = Object.values(NotificationType).filter(
  (notifType) => {
    return ![
      // Filter out this notification as it is a special type
      // of 'reaction' notification
      "videoReactionBundle" /* VideoReactionBundle */,
      // These notifications are not saved in the DB
      "workspace_invitation_notification" /* WorkspaceInvitation */,
      "comment_mention_notification" /* CommentMention */,
      "watch_later_reminder_notification" /* WatchLaterReminder */,
      "send_watch_later_reminder_weekdays_only_setting" /* SendWatchLaterReminderWeekdaysOnly */
    ].includes(notifType);
  }
);
var NotificationSettingsV2TableExcludeType = /* @__PURE__ */ ((NotificationSettingsV2TableExcludeType2) => {
  NotificationSettingsV2TableExcludeType2["VideoReactionBundle"] = "videoReactionBundle";
  NotificationSettingsV2TableExcludeType2["SendWatchLaterReminderWeekdaysOnly"] = "send_watch_later_reminder_weekdays_only_setting";
  NotificationSettingsV2TableExcludeType2["PostCommentMention"] = "post_comment_mention_notification";
  NotificationSettingsV2TableExcludeType2["ReplyCommentMention"] = "reply_comment_mention_notification";
  NotificationSettingsV2TableExcludeType2["SpaceVideoMoved"] = "space_item_moved_notification";
  NotificationSettingsV2TableExcludeType2["ContentLimitApproaching"] = "content_limit_approaching_notification";
  NotificationSettingsV2TableExcludeType2["ContentLimitReached"] = "content_limit_reached_notification";
  NotificationSettingsV2TableExcludeType2["CreatorLiteLimitApproaching"] = "creator_lite_limit_approaching_notification";
  NotificationSettingsV2TableExcludeType2["CreatorLiteLimitReached"] = "creator_lite_limit_reached_notification";
  NotificationSettingsV2TableExcludeType2["MembershipRoleChanged"] = "membership_role_change_notification";
  NotificationSettingsV2TableExcludeType2["WorkspaceInvitation"] = "workspace_invitation_notification";
  NotificationSettingsV2TableExcludeType2["IngestionIntegrationEnabled"] = "ingestion_integration_enabled_notification";
  return NotificationSettingsV2TableExcludeType2;
})(NotificationSettingsV2TableExcludeType || {});
const SINGLE_DELIVERY_NOTIFICATIONS = [
  "recording_nudge_after_x_views_given_notification" /* RecordingNudgeAfterXViewsGiven */,
  "calendar_efficiency_notification" /* CalendarEfficiency */
];
const TOGGLE_NOTIFICATION_TYPES = Object.values(
  NOTIFICATIONS_CONFIGURATION
).filter(({ canToggle }) => canToggle).map(({ type }) => type);
const NOTIFICATION_CLIENT_NAMES = Object.values(
  NOTIFICATIONS_CONFIGURATION
).map(({ clientName }) => clientName);
const COMMENT_REPLY_NOTIFICATION = "comment_reply_notification" /* CommentReply */;
const FIRST_VIDEO_VIEW_NOTIFICATION = "first_video_view_notification" /* FirstVideoView */;
const ADDED_TO_WATCH_LATER_NOTIFICATION = "added_to_watch_later_notification" /* AddWatchLater */;
const VIDEO_COMMENT_NOTIFICATION = "video_comment_notification" /* VideoComment */;
const VIDEO_REACTION_NOTIFICATION = "video_reaction_notification" /* VideoReaction */;
const CONTENT_LIMIT_APPROACHING_NOTIFICATION = "content_limit_approaching_notification" /* ContentLimitApproaching */;
const CONTENT_LIMIT_REACHED_NOTIFICATION = "content_limit_reached_notification" /* ContentLimitReached */;
const CREATOR_LITE_LIMIT_APPROACHING_NOTIFICATION = "creator_lite_limit_approaching_notification" /* CreatorLiteLimitApproaching */;
const CREATOR_LITE_LIMIT_REACHED_NOTIFICATION = "creator_lite_limit_reached_notification" /* CreatorLiteLimitReached */;
const MEMBERSHIP_ROLE_CHANGE_NOTIFICATION = "membership_role_change_notification" /* MembershipRoleChanged */;
const WORKSPACE_INVITATION_NOTIFICATION = "workspace_invitation_notification" /* WorkspaceInvitation */;
const SHARE_VIDEO_NOTIFICATION = "share_video_notification" /* ShareVideo */;
const RESHARE_VIDEO_NOTIFICATION = "reshare_video_notification" /* ReshareVideo */;
const VIDEO_PRIVACY_CHANGE_NOTIFICATION = "video_privacy_change_notification" /* VideoPrivacyChange */;
const EXTERNAL_VIDEO_INGESTION_PROCESSING_NOTIFICATION = "external_ingestion_processing_notification" /* ExternalVideoIngestionProcessing */;
const EXTERNAL_VIDEO_INGESTION_COMPLETED_NOTIFICATION = "external_ingestion_completed_notification" /* ExternalVideoIngestionCompleted */;
const REMINDER_TO_RECORD_NOTIFICATION = "reminder_to_record_notification" /* ReminderToRecord */;
const COMMENT_MENTION_NOTIFICATION = "comment_mention_notification" /* CommentMention */;
const POST_COMMENT_MENTION_NOTIFICATION = "post_comment_mention_notification" /* PostCommentMention */;
const REPLY_COMMENT_MENTION_NOTIFICATION = "reply_comment_mention_notification" /* ReplyCommentMention */;
const VIDEO_TASK_MENTION_NOTIFICATION = "video_task_mention_notification" /* VideoTaskMention */;
const VIDEO_TASK_RESPONSE_NOTIFICATION = "video_task_response_notification" /* VideoTaskResponse */;
const RETRANSCRIPTION_SUCCESS = "retranscription_success_notification" /* RetranscriptionSuccess */;
const RETRANSCRIPTION_FAILURE = "retranscription_failure_notification" /* RetranscriptionFailure */;
const VIDEO_REACTION_BUNDLE_NOTIFICATION = "videoReactionBundle" /* VideoReactionBundle */;
const NEW_FOLLOWER = "new_follower_notification" /* NewFollower */;
export {
  ADDED_TO_WATCH_LATER_NOTIFICATION,
  ADDED_TO_WATCH_LATER_PUSH_NOTIFICATION_SENT,
  AI_LIMITS_UPDATED_TOPIC,
  BUSINESS_AI_TRIAL_WELCOME_PUSH_NOTIFICATION_SENT,
  CALENDAR_EFFICIENCY_PUSH_NOTIFICATION_SENT,
  COMMENT_MENTION_NOTIFICATION,
  COMMENT_MENTION_NOTIFICATION_SENT,
  COMMENT_REPLY_NOTIFICATION,
  COMMENT_REPLY_PUSH_NOTIFICATION_SENT,
  CONTENT_LIMIT_APPROACHING_NOTIFICATION,
  CONTENT_LIMIT_APPROACHING_NOTIFICATION_SENT,
  CONTENT_LIMIT_REACHED_NOTIFICATION,
  CONTENT_LIMIT_REACHED_NOTIFICATION_SENT,
  CREATED,
  CREATOR_LITE_LIMIT_APPROACHING_NOTIFICATION,
  CREATOR_LITE_LIMIT_APPROACHING_NOTIFICATION_SENT,
  CREATOR_LITE_LIMIT_REACHED_NOTIFICATION,
  CREATOR_LITE_LIMIT_REACHED_NOTIFICATION_SENT,
  DEFAULT_PAGINATION_LIMIT,
  DELIVERED,
  DELIVERY_ATLASSIAN_NOTIFICATIONS,
  DELIVERY_MAIL,
  DELIVERY_METHODS_AVAILABLE,
  DELIVERY_MOBILE,
  DELIVERY_SLACK,
  DELIVERY_WEB,
  DEVICE_UNSUPPORTED,
  DeliveryMethods,
  DeliveryTypes,
  EDIT_TTS_TASK_STATUS,
  EXTERNAL_VIDEO_INGESTION_COMPLETED_NOTIFICATION,
  EXTERNAL_VIDEO_INGESTION_COMPLETED_NOTIFICATION_SENT,
  EXTERNAL_VIDEO_INGESTION_PROCESSING_NOTIFICATION,
  EXTERNAL_VIDEO_INGESTION_PROCESSING_NOTIFICATION_SENT,
  FIRST_VIDEO_VIEW_NOTIFICATION,
  GIF_GENERATED_TOPIC,
  HIGH_VIDEO_VIEWS_NOTIFICATION_SENT,
  INGESTION_INTEGRATION_ENABLED_NOTIFICATION_SENT,
  INSIGHTS_TIME_SAVED_PUSH_NOTIFICATION_SENT,
  INSIGHTS_VIEW_MILESTONE_PUSH_NOTIFICATION_SENT,
  INTELLIGENCE_COMPLETED_TOPIC,
  INVALID_SUBSCRIPTION_ERROR,
  MEMBERSHIP_ROLE_CHANGE_NOTIFICATION,
  MEMBERSHIP_ROLE_CHANGE_NOTIFICATION_SENT,
  NEW_ALL_HANDS_SPACE_CONTENT_NOTIFICATION_SENT,
  NEW_FOLLOWER,
  NEW_FOLLOWER_NOTIFICATION_SENT,
  NEW_INSIGHTS_DIGEST_NOTIFICATION_SENT,
  NEW_INSIGHTS_MONTHLY_DIGEST_NOTIFICATION_SENT,
  NEW_SPACE_ADMIN_ACTION_NOTIFICATION_SENT,
  NEW_SPACE_CONTENT_NOTIFICATION_SENT,
  NEW_SPACE_STATE_CHANGE_NOTIFICATION_SENT,
  NEW_WATCH_LATER_LIST_REMINDER_SENT,
  NOTIFICATIONS_CONFIGURATION,
  NOTIFICATIONS_UPDATED_TOPIC,
  NOTIFICATION_CLIENT_NAMES,
  NOTIFICATION_TYPES,
  NOTIFICATION_URL_PARAMS,
  NOTIF_STATUSES,
  NotificationClientType,
  NotificationDDActions,
  NotificationQueryType,
  NotificationSettingsV2TableExcludeType,
  NotificationStatuses,
  NotificationType,
  OPEN_URL,
  PERMISSION_DEFAULT,
  PERMISSION_DENIED,
  PERMISSION_GRANTED,
  PERMISSION_PROMPT,
  POST_COMMENT_MENTION_NOTIFICATION,
  POST_COMMENT_MENTION_NOTIFICATION_SENT,
  PUSH_SERVER_CONTACT_EMAIL,
  QUERY_ALL,
  QUERY_COMMENT,
  QUERY_OTHER,
  QUERY_REACTIONS_AND_VIEWS,
  QUERY_SHARED,
  READ,
  RECORDING_COMPLETED_TOPIC,
  RECORDING_EVENT_TOPIC,
  RECORDING_NUDGE_AFTER_X_VIEWS_GIVEN_PUSH_NOTIFICATION_SENT,
  REMINDER_TO_RECORD_NOTIFICATION,
  REPLY_COMMENT_MENTION_NOTIFICATION,
  REPLY_COMMENT_MENTION_NOTIFICATION_SENT,
  RESHARE_VIDEO_NOTIFICATION,
  RETRANSCRIPTION_FAILURE,
  RETRANSCRIPTION_FAILURE_PUSH_NOTIFICATION_SENT,
  RETRANSCRIPTION_SUCCESS,
  RETRANSCRIPTION_SUCCESS_PUSH_NOTIFICATION_SENT,
  SCREENSHOTS_INTELLIGENCE_COMPLETED_TOPIC,
  SEEN,
  SENT,
  SESSION_REQUEST_TOKEN_GENERATED_TOPIC,
  SHARE_VIDEO_NOTIFICATION,
  SINGLE_DELIVERY_NOTIFICATIONS,
  SPACE_INVITATION_NOTIFICATION_SENT,
  SPACE_VIDEO_MOVED_NOTIFICATION_SENT,
  TOGGLE_NOTIFICATION_TYPES,
  VARIABLES_TASK_STATUS,
  VIDEO_COMMENT_ADDED_TOPIC,
  VIDEO_COMMENT_NOTIFICATION,
  VIDEO_GENERATION_STATUS_TOPIC,
  VIDEO_PRIVACY_CHANGE_NOTIFICATION,
  VIDEO_PRIVACY_CHANGE_PUSH_NOTIFICATION_SENT,
  VIDEO_REACTION_BUNDLE_NOTIFICATION,
  VIDEO_REACTION_EVENT,
  VIDEO_REACTION_NOTIFICATION,
  VIDEO_REACTION_PUSH_NOTIF_CLICK,
  VIDEO_RE_SHARE_PUSH_NOTIFICATION_SENT,
  VIDEO_SHARE_PUSH_NOTIFICATION_SENT,
  VIDEO_TASK_MENTION_NOTIFICATION,
  VIDEO_TASK_MENTION_PUSH_NOTIFICATION_SENT,
  VIDEO_TASK_RESPONSE_NOTIFICATION,
  VIDEO_TASK_RESPONSE_PUSH_NOTIFICATION_SENT,
  VIDEO_USED_AS_WEAVE_CLIP_NOTIFICATION,
  WAVEFORM_DATA_CHANGED_TOPIC,
  WAVEFORM_GENERATION_TOPIC,
  WEAVE_FIRST_VIDEO_VIEW_PUSH_NOTIFICATION_SENT,
  WORKSPACE_INVITATION_NOTIFICATION,
  WORKSPACE_INVITATION_NOTIFICATION_SENT,
  getVideoCommentAddedTopic,
  getVideoCreatedByUserTopic
};
//# sourceMappingURL=notifications.js.map
