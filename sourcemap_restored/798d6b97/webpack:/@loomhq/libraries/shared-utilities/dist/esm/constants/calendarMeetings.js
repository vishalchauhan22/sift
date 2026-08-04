import "../chunk-BYZ2GIR3.js";
const CALENDAR_UPDATED_TOPIC = "calendar_completed_topic";
var ConnectedServiceIntegrationType = /* @__PURE__ */ ((ConnectedServiceIntegrationType2) => {
  ConnectedServiceIntegrationType2["GOOGLE_CALENDAR"] = "gcal";
  ConnectedServiceIntegrationType2["MICROSOFT_OUTLOOK"] = "microsoft_graph";
  return ConnectedServiceIntegrationType2;
})(ConnectedServiceIntegrationType || {});
const HUMAN_READABLE_CALENDAR_NAMES = {
  ["gcal" /* GOOGLE_CALENDAR */]: "Google Calendar",
  ["microsoft_graph" /* MICROSOFT_OUTLOOK */]: "Microsoft Outlook Calendar"
};
var MeetingRecordingSummaryNotificationEnum = /* @__PURE__ */ ((MeetingRecordingSummaryNotificationEnum2) => {
  MeetingRecordingSummaryNotificationEnum2["DISABLED"] = "disabled";
  MeetingRecordingSummaryNotificationEnum2["RECORDER_ONLY"] = "recorder_only";
  MeetingRecordingSummaryNotificationEnum2["INTERNAL_ONLY"] = "internal_only";
  MeetingRecordingSummaryNotificationEnum2["EXTERNAL_ONLY"] = "external_only";
  MeetingRecordingSummaryNotificationEnum2["EVERYONE"] = "everyone";
  return MeetingRecordingSummaryNotificationEnum2;
})(MeetingRecordingSummaryNotificationEnum || {});
var MeetingRecordingAccessEnum = /* @__PURE__ */ ((MeetingRecordingAccessEnum2) => {
  MeetingRecordingAccessEnum2["DISABLED"] = "disabled";
  MeetingRecordingAccessEnum2["CAN_EDIT"] = "can_edit";
  MeetingRecordingAccessEnum2["CAN_VIEW"] = "can_view";
  return MeetingRecordingAccessEnum2;
})(MeetingRecordingAccessEnum || {});
var MeetingRecordingLinkSharingEnum = /* @__PURE__ */ ((MeetingRecordingLinkSharingEnum2) => {
  MeetingRecordingLinkSharingEnum2["ONLY_PEOPLE_ADDED"] = "only_people_added";
  MeetingRecordingLinkSharingEnum2["ANYONE"] = "anyone";
  MeetingRecordingLinkSharingEnum2["WORKSPACE"] = "workspace";
  return MeetingRecordingLinkSharingEnum2;
})(MeetingRecordingLinkSharingEnum || {});
var AutoRecordOwnedMeetingsEnum = /* @__PURE__ */ ((AutoRecordOwnedMeetingsEnum2) => {
  AutoRecordOwnedMeetingsEnum2["ALL"] = "all";
  AutoRecordOwnedMeetingsEnum2["WORKSPACE"] = "workspace";
  AutoRecordOwnedMeetingsEnum2["NONE"] = "none";
  return AutoRecordOwnedMeetingsEnum2;
})(AutoRecordOwnedMeetingsEnum || {});
var AutomationKindEnum = /* @__PURE__ */ ((AutomationKindEnum2) => {
  AutomationKindEnum2["INTERNAL"] = "internal";
  AutomationKindEnum2["EXTERNAL"] = "external";
  AutomationKindEnum2["CUSTOM"] = "custom";
  return AutomationKindEnum2;
})(AutomationKindEnum || {});
var MeetingBotSourceEnum = /* @__PURE__ */ ((MeetingBotSourceEnum2) => {
  MeetingBotSourceEnum2["CALENDAR_MEETING"] = "calendar_meeting";
  MeetingBotSourceEnum2["RECORD_NOW"] = "record_now";
  MeetingBotSourceEnum2["ATLASSIAN_INTERNAL"] = "atlassian_internal";
  return MeetingBotSourceEnum2;
})(MeetingBotSourceEnum || {});
const CalendarMeetingSource = {
  ZOOM: 0,
  GOOGLE_CALENDAR: 1,
  MICROSOFT_OUTLOOK: 2
};
const VideoMeetingPlatform = {
  GOOGLE_MEET: 0,
  MICROSOFT_TEAMS: 1,
  WEBEX: 2,
  ZOOM: 3
};
const MeetingAttendanceStatus = {
  TENTATIVE: 0,
  DECLINED: 1,
  ACCEPTED: 2
};
var MeetingInviteeStatus = /* @__PURE__ */ ((MeetingInviteeStatus2) => {
  MeetingInviteeStatus2["TENTATIVE"] = "tentative";
  MeetingInviteeStatus2["DECLINED"] = "declined";
  MeetingInviteeStatus2["ACCEPTED"] = "accepted";
  return MeetingInviteeStatus2;
})(MeetingInviteeStatus || {});
export {
  AutoRecordOwnedMeetingsEnum,
  AutomationKindEnum,
  CALENDAR_UPDATED_TOPIC,
  CalendarMeetingSource,
  ConnectedServiceIntegrationType,
  HUMAN_READABLE_CALENDAR_NAMES,
  MeetingAttendanceStatus,
  MeetingBotSourceEnum,
  MeetingInviteeStatus,
  MeetingRecordingAccessEnum,
  MeetingRecordingLinkSharingEnum,
  MeetingRecordingSummaryNotificationEnum,
  VideoMeetingPlatform
};
//# sourceMappingURL=calendarMeetings.js.map
