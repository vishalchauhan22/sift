var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// src/GetVideoSSR.generated.tsx
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
var defaultOptions = {};
var _a;
var GetVideoSsrDocument = gql(_a || (_a = __template(["\n    query GetVideoSSR($id: ID!, $password: String) {\n  getVideo(id: $id, password: $password) {\n    __typename\n    ... on PrivateVideo {\n      id\n      status\n      message\n      __typename\n    }\n    ... on VideoPasswordMissingOrIncorrect {\n      id\n      message\n      __typename\n    }\n    ... on RegularUserVideo {\n      id\n      __typename\n      defaultThumbnails {\n        default\n        static\n        __typename\n      }\n      signedThumbnails {\n        animatedPreview\n        default\n        default4X3\n        defaultPlay\n        ogFull\n        full\n        fullPlay\n        defaultGif\n        defaultGifPlay\n      }\n      dashUrl: nullableRawCdnUrl(acceptableMimes: [DASH], password: $password) {\n        url\n        credentials {\n          Policy\n          Signature\n          KeyPairId\n        }\n      }\n      hlsUrl: nullableRawCdnUrl(acceptableMimes: [M3U8], password: $password) {\n        url\n        credentials {\n          Policy\n          Signature\n          KeyPairId\n        }\n      }\n      active_video_transcript_id\n      archived\n      chapters\n      comments_enabled\n      comments_email_enabled\n      complete\n      createdAt\n      cta {\n        enabled\n        url\n        text\n        mods\n        is_auto\n        approved_at\n      }\n      currentUserCanEdit\n      current_user_is_owner\n      description\n      download_enabled\n      downloadable\n      downloadableBy\n      email_gate_video_type\n      stylizedCaptions\n      viewerCaptionsOn\n      folder_id\n      folder {\n        id\n        special_id\n        name\n        visibility\n      }\n      isCommunityLoom\n      viewer_marked_for_watch_later: isOnWatchLaterList\n      isParentOfPersonalizedCopies\n      personalizationType\n      isMeetingRecording\n      calendarMeetingGuid\n      is_protected\n      is_team_shared: isTeamShared\n      loom_branded_player\n      name\n      needs_password\n      organization_idv2\n      organization {\n        name\n        brand_logo_path: brandLogoPath\n        brand_show_branding: brandShowBranding\n        brand_primary_color: brandPrimaryColor\n        createdAt\n        description\n        planIncludesAI\n        hidden\n        id\n        organization_properties\n        site_id\n        status\n        tags\n        trial_ended\n        trial_ends_at\n        trial_type\n        type\n        updatedAt\n        workspace_logo_path: workspaceLogoPath\n      }\n      owner_id\n      owner {\n        id\n        first_name\n        display_name\n        avatars {\n          name\n          large\n          thumb\n          iosLarge\n          iosThumb\n          isAtlassianMastered\n        }\n        status\n        profile {\n          profileInfo {\n            role\n            location\n          }\n          profileUrl\n        }\n      }\n      privacy\n      processing_information {\n        instant_editing_enabled\n        noise_cancellation_type\n        replacements {\n          type\n        }\n        trim_id\n        trim_ranges {\n          from\n          to\n        }\n        videoUploadMessage\n        videoUploadValid\n        trim_progress\n        split_segment_ttl\n      }\n      record_reply_enabled\n      s3_id\n      salesforce_engagement_tracking\n      show_analytics_to_viewer\n      show_transcript_to_viewer\n      spaces {\n        id\n        name\n        data_age_limit_in_seconds\n        isArchived\n        is_primary\n        privacy\n      }\n      suggested_playback_rate\n      use_emojis\n      use_gif\n      video_properties {\n        avgBitRate\n        client\n        camera_enabled\n        client_version\n        countdown\n        duration\n        durationMs\n        externalUpload\n        format\n        height\n        ingestion_type\n        liveRewindTrimmedSections\n        mediaMetadataRotation\n        microphone_enabled\n        os\n        os_version\n        recordingClient\n        recording_type\n        recording_version\n        screen_type\n        sdkPartnerIdv2\n        tab_audio\n        trim_duration\n        width\n      }\n      playable_duration\n      signedDefaultThumbnails {\n        default\n        static\n      }\n      source_duration\n      thumbnails {\n        default\n        default4X3\n        defaultPlay\n        ogFull\n        full\n        fullPlay\n        defaultGif\n        defaultGifPlay\n        animatedPreview\n      }\n      viewerNeedsPermission\n      viewers_can_weave\n      views {\n        total\n        distinct\n        named {\n          firstName\n          lastName\n          avatar\n        }\n      }\n      visibility\n      waveform_generation\n      white_label_player\n    }\n  }\n  getFeatureFlags {\n    featureFlags\n  }\n}\n    "])));
function useGetVideoSsrQuery(baseOptions) {
  const options = __spreadValues(__spreadValues({}, defaultOptions), baseOptions);
  return Apollo.useQuery(GetVideoSsrDocument, options);
}
function useGetVideoSsrLazyQuery(baseOptions) {
  const options = __spreadValues(__spreadValues({}, defaultOptions), baseOptions);
  return Apollo.useLazyQuery(GetVideoSsrDocument, options);
}

// src/GetCurrentUserSSR.generated.tsx
import { gql as gql2 } from "@apollo/client";
import * as Apollo2 from "@apollo/client";
var defaultOptions2 = {};
var _a2;
var GetCurrentUserSsrDocument = gql2(_a2 || (_a2 = __template(["\n    query GetCurrentUserSSR {\n  getCurrentUser {\n    __typename\n    ... on GetCurrentUserPayload {\n      user {\n        id\n        aa_date_linked\n        aa_date_mastered\n        aa_id\n        aa_is_mastered\n        email\n        first_name\n        last_name\n        account_type\n        aiAccess {\n          autoTitles\n          autoSummaries\n          autoChapters\n          autoTasks\n        }\n        availableFtux {\n          name\n          priority\n        }\n        avatars {\n          large\n          name\n          thumb\n        }\n        basic_video_limit\n        capabilities\n        checklist {\n          add_teammate\n          complete_onboarding\n          create_account\n          customize_video_name\n          download_recorder\n          email_verified\n          filled_account_settings\n          first_cam_recording\n          first_video_recording\n          first_video_upload\n          first_video_viewed\n          followed_us_on_twitter\n          has_reached_recording_limit\n          has_viewed_screenshots\n          liked_us_on_facebook\n          push_notification_enabled\n          share_video\n          shared_first_video_on_facebook\n          tweeted_first_video\n          has_viewed_videos\n          meeting_recording\n        }\n        company_name\n        companyPosition\n        createdAt\n        default_workspace_id\n        deletion_pending\n        elevio_hash\n        intercomHash\n        identityMigrationEligibleDate\n        hasActivatedMobile\n        has_activated_chrome_extension\n        has_activated_desktop_app\n        hasWebPushSubcription\n        help_options\n        integration_settings\n        isEducationVerified\n        isFirstRecording\n        isSdkSharedUser\n        memberships(currentOnly: true) {\n          id\n          member_role\n          member_status\n          isSelected\n          organization {\n            id\n            is_pure_trial\n            name\n            type\n            hidden\n            site_id\n          }\n        }\n        notification_settings\n        oauths {\n          id\n          createdAt\n          email\n          external_avatar\n          medium\n          team_id\n          updatedAt\n        }\n        onboarding\n        passwordIsSet\n        persona\n        recorder_settings\n        role\n        scopes\n        status\n        terms_accepted\n        terms_accepted_created_at\n        triggers {\n          complete\n          name\n          show\n        }\n        videoSettings {\n          auto_filler_word_removal\n          auto_silence_removal\n          show_transcript_to_viewer\n          show_analytics_to_viewer\n          suggested_playback_rate\n          download_enabled\n          record_reply_enabled\n          viewers_can_weave_default\n          comments_enabled\n          comments_email_enabled\n          use_emojis\n          use_gif\n          auto_cta\n          auto_title\n          auto_eovn\n          auto_summary\n          auto_chapters\n          auto_tasks\n          loom_branded_player\n          noise_suppression\n          email_gate_video_type\n          stylizedCaptions\n          viewerCaptionsOn\n        }\n        screenshotSettings {\n          screenshotAutoTitle\n        }\n      }\n    }\n  }\n}\n    "])));
function useGetCurrentUserSsrQuery(baseOptions) {
  const options = __spreadValues(__spreadValues({}, defaultOptions2), baseOptions);
  return Apollo2.useQuery(GetCurrentUserSsrDocument, options);
}
function useGetCurrentUserSsrLazyQuery(baseOptions) {
  const options = __spreadValues(__spreadValues({}, defaultOptions2), baseOptions);
  return Apollo2.useLazyQuery(GetCurrentUserSsrDocument, options);
}

// src/typePolicies.ts
import { defaultDataIdFromObject } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
var createDefaultPolicy = (typename, field, keyArgs) => {
  return {
    [typename]: {
      fields: {
        [field]: relayStylePagination(keyArgs)
      }
    }
  };
};
var GET_SPACE_MEMBERS = createDefaultPolicy(
  "GetSpaceMembersPayload",
  "members",
  ["spaceId"]
);
var GET_MY_SPACE_MEMBERSHIPS = createDefaultPolicy(
  "GetMySpaceMembershipsPayload",
  "memberships",
  []
);
var GET_MY_CLOSED_SPACE_MEMBERSHIPS = createDefaultPolicy(
  "GetMyClosedSpaceMembershipsPayload",
  "memberships",
  []
);
var GET_WORKSPACE_ARCHIVED_SPACES = createDefaultPolicy(
  "GetWorkspaceArchivedSpacesPayload",
  "spaces",
  []
);
var GET_OPEN_SPACES = createDefaultPolicy(
  "GetOpenSpacesPayload",
  "spaces",
  []
);
var GET_WORKSPACE_SPACES = createDefaultPolicy(
  "GetWorkspaceSpacesPayload",
  "spaces",
  []
);
var GET_PUBLISHED_FOLDERS = createDefaultPolicy(
  "GetPublishedFoldersPayload",
  "folders",
  [
    "parentFolderId",
    "source",
    "sourceValue",
    "sortOrder",
    "sortType",
    "filters",
    "timeRange"
  ]
);
var GET_LOOMS = createDefaultPolicy("GetLoomsPayload", "videos", [
  "folderId",
  "source",
  "sourceValue",
  "sortType",
  "sortOrder",
  "filters",
  "timeRange"
]);
var GET_LIBRARY_LOOMS = createDefaultPolicy(
  "GetLibraryLoomsPayload",
  "videos",
  ["folderId"]
);
var GET_COMMUNITY_LOOMS_FOR_PROFILE = createDefaultPolicy(
  "GetCommunityLoomsForProfilePayload",
  "videos",
  ["profileUrl", "sortOrder", "sortType", "filters"]
);
var GET_PUBLIC_FOLDER_LOOMS = createDefaultPolicy(
  "GetPublicFolderLoomsPayload",
  "videos",
  ["folderId"]
);
var GET_NOTIFICATIONS = createDefaultPolicy(
  "GetNotificationsPayload",
  "notifications",
  ["notificationType"]
);
var GET_PROFILE_VIDEOS = createDefaultPolicy(
  "RegularUserProfile",
  "profileVideos",
  ["sortType, sortOrder"]
);
var GET_SCREENSHOTS = createDefaultPolicy(
  "GetScreenshotsPayload",
  "screenshots",
  ["source"]
);
var GET_USER_GROUPINGS = createDefaultPolicy(
  "UserGroupingsPayload",
  "entries",
  ["userId", "workspaceId", "groupingType"]
);
var GET_WORKSPACE_GROUPINGS = createDefaultPolicy(
  "WorkspaceGroupingsPayload",
  "entries",
  ["workspaceId", "groupingType", "tag"]
);
var ADMIN_FIND_FOLDERS = createDefaultPolicy(
  "AdminFindFoldersPayload",
  "folders",
  ["ownerId", "workspaceId", "spaceId", "parentFolderId", "search"]
);
var ADMIN_GET_VIDEO_GROUPINGS_BY_OWNER = createDefaultPolicy(
  "AdminGetVideoGroupingsByOwnerPayload",
  "groupings",
  ["groupingId", "videoId", "type"]
);
var ADMIN_GET_GROUPINGS_BY_VIDEO_ID = createDefaultPolicy(
  "AdminGetGroupingsByVideoIdPayload",
  "groupings",
  ["groupingId", "videoId", "type"]
);
var ADMIN_GET_VIDEOS = createDefaultPolicy(
  "AdminGetVideosPayload",
  "videoConnection",
  ["ownerId", "workspaceId", "folderId", "spaceId", "search"]
);
var JIRA_PROJECT_POLICY = createDefaultPolicy("JiraSite", "projects", [
  "id",
  "siteId"
]);
var JIRA_ISSUE_TYPE_POLICY = createDefaultPolicy(
  "JiraProject",
  "issuetypes",
  ["id", "siteId"]
);
var JIRA_ISSUE_PRIORITY_POLICY = createDefaultPolicy(
  "JiraSite",
  "issuePriorities",
  ["id", "siteId"]
);
var LINEAR_ASSIGNEES_POLICY = createDefaultPolicy(
  "LinearAssigneesPayload",
  "assignees",
  ["search"]
);
var LINEAR_TEAMS_POLICY = createDefaultPolicy("LinearTeamsPayload", "teams", [
  "search"
]);
var LINEAR_PROJECTS_POLICY = createDefaultPolicy(
  "LinearProjectsPayload",
  "projects",
  ["id", "teamId"]
);
var GET_ENGAGEMENT_INSIGHTS_POLICY = createDefaultPolicy(
  "EngagementInsightsSummary",
  "viewers",
  ["id"]
);
var CALENDAR_INFO_POLICY = createDefaultPolicy(
  "CalendarInfo",
  "paginatedMeetings",
  ["guid"]
);
var GET_PAGINATED_INSIGHTS_POLICY = createDefaultPolicy(
  "EngagementInsightsSummary",
  "paginatedViewers",
  ["id"]
);
var GET_WORKSPACE_VIDEOS = createDefaultPolicy(
  "GetWorkspaceVideosPayload",
  "videos",
  ["workspaceId", "searchQuery", "sort", "filters"]
);
var REGULAR_USER_VIDEO = {
  RegularUserVideo: {
    fields: {
      credentials: {
        merge: true
      },
      cta: {
        merge: true
      },
      defaultThumbnails: {
        merge: true
      },
      nullableRawCdnUrl: {
        merge: true
      },
      processing_information: {
        merge: true
      },
      signedDefaultThumbnails: {
        merge: true
      },
      signedThumbnails: {
        merge: true
      },
      sources: {
        merge: true
      },
      thumbnails: {
        merge: true
      },
      video_feature_flags: {
        merge: true
      },
      video_properties: {
        merge: true
      },
      views: {
        merge: true
      },
      boundedTrimRanges: {
        merge: false
      },
      waveformData: {
        merge: false
      }
    }
  }
};
var COMMENT_POLICY = {
  PublicVideoComment: {
    fields: {
      locallyDeleted: {
        read: (value) => value ? value : false
      },
      inFlightContent: {
        read: (value) => value ? value : null
      }
    }
  }
};
var REGULAR_USER_PROFILE = {
  RegularUserProfile: {
    fields: {
      profileInfo: {
        merge: true
      }
    }
  }
};
var REGULAR_USER = {
  RegularUser: {
    fields: {
      profile: {
        merge: true
      }
    }
  }
};
var REACTION_POLICY = {
  PublicVideoReaction: {
    fields: {
      locallyCreated: {
        read: (value) => value || false
      },
      localId: {
        read: (value) => value || null
      }
    }
  }
};
var REACTION_QUERY_POLICY = {
  // Override the default merge policy of reactions, so we can delete elements easily
  videoReactionsForVideo: { merge: false }
};
var GET_FOLLOWEDBY_STREAMS = createDefaultPolicy(
  "getFollowedByPayload",
  "profileList",
  ["profileId"]
);
var GET_FOLLOWING_STREAMS = createDefaultPolicy(
  "getFollowsPayload",
  "profileList",
  ["profileId"]
);
var GET_AVATAR = {
  Avatar: {
    keyFields: ["thumb"]
  }
};
var QueryPolicies = { fields: __spreadValues({}, REACTION_QUERY_POLICY) };
var dataIdFromObject = (responseObject) => {
  var _a3;
  if (responseObject.__typename === "PublicVideoComment" && !responseObject.children_comments) {
    return "PublicVideoReply:".concat(responseObject.id);
  }
  const { __typename, id, idv2, guid } = responseObject;
  const objectId = (_a3 = idv2 != null ? idv2 : id) != null ? _a3 : guid;
  if (__typename && objectId) {
    return "".concat(__typename, ":").concat(objectId);
  }
  return defaultDataIdFromObject(responseObject);
};
var typePolicies = __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, GET_SPACE_MEMBERS), GET_MY_SPACE_MEMBERSHIPS), GET_MY_CLOSED_SPACE_MEMBERSHIPS), GET_OPEN_SPACES), GET_WORKSPACE_ARCHIVED_SPACES), GET_WORKSPACE_SPACES), GET_PUBLISHED_FOLDERS), GET_LOOMS), GET_LIBRARY_LOOMS), GET_COMMUNITY_LOOMS_FOR_PROFILE), GET_NOTIFICATIONS), GET_PROFILE_VIDEOS), GET_SCREENSHOTS), GET_USER_GROUPINGS), GET_WORKSPACE_GROUPINGS), GET_WORKSPACE_VIDEOS), ADMIN_FIND_FOLDERS), ADMIN_GET_VIDEO_GROUPINGS_BY_OWNER), ADMIN_GET_GROUPINGS_BY_VIDEO_ID), ADMIN_GET_VIDEOS), COMMENT_POLICY), REACTION_POLICY), GET_FOLLOWEDBY_STREAMS), GET_FOLLOWING_STREAMS), GET_PUBLIC_FOLDER_LOOMS), JIRA_PROJECT_POLICY), JIRA_ISSUE_TYPE_POLICY), JIRA_ISSUE_PRIORITY_POLICY), LINEAR_ASSIGNEES_POLICY), LINEAR_PROJECTS_POLICY), LINEAR_TEAMS_POLICY), GET_ENGAGEMENT_INSIGHTS_POLICY), GET_PAGINATED_INSIGHTS_POLICY), REGULAR_USER_VIDEO), GET_AVATAR), REGULAR_USER_PROFILE), REGULAR_USER), CALENDAR_INFO_POLICY), {
  CalendarMeeting: {
    keyFields: ["calendarMeetingGuid"],
    fields: {
      recordingFolders: {
        merge(_existing = [], incoming = []) {
          return incoming;
        }
      },
      recordingSpaces: {
        merge(_existing = [], incoming = []) {
          return incoming;
        }
      }
    }
  },
  Query: QueryPolicies
  // Add additional type policies here
  // ...
});

// src/globalTypes.generated.ts
var Access = /* @__PURE__ */ ((Access2) => {
  Access2["CanEdit"] = "can_edit";
  Access2["CanView"] = "can_view";
  Access2["Disabled"] = "disabled";
  return Access2;
})(Access || {});
var AccountSuspensionReasons = /* @__PURE__ */ ((AccountSuspensionReasons2) => {
  AccountSuspensionReasons2["SuspendedNonPayment"] = "suspended_non_payment";
  return AccountSuspensionReasons2;
})(AccountSuspensionReasons || {});
var Addon = /* @__PURE__ */ ((Addon2) => {
  Addon2["Ai"] = "AI";
  return Addon2;
})(Addon || {});
var AdminVideoPrivacyType = /* @__PURE__ */ ((AdminVideoPrivacyType2) => {
  AdminVideoPrivacyType2["Owner"] = "owner";
  AdminVideoPrivacyType2["Public"] = "public";
  AdminVideoPrivacyType2["Workspace"] = "workspace";
  return AdminVideoPrivacyType2;
})(AdminVideoPrivacyType || {});
var AdminVideoPrivacyTypeForWorkspace = /* @__PURE__ */ ((AdminVideoPrivacyTypeForWorkspace2) => {
  AdminVideoPrivacyTypeForWorkspace2["Owner"] = "owner";
  AdminVideoPrivacyTypeForWorkspace2["Public"] = "public";
  AdminVideoPrivacyTypeForWorkspace2["Workspace"] = "workspace";
  return AdminVideoPrivacyTypeForWorkspace2;
})(AdminVideoPrivacyTypeForWorkspace || {});
var AdvancedAiMeetingNotesFailureReason = /* @__PURE__ */ ((AdvancedAiMeetingNotesFailureReason2) => {
  AdvancedAiMeetingNotesFailureReason2["FailedToBuildMeetingNotes"] = "FAILED_TO_BUILD_MEETING_NOTES";
  AdvancedAiMeetingNotesFailureReason2["InvalidConfluenceClient"] = "INVALID_CONFLUENCE_CLIENT";
  AdvancedAiMeetingNotesFailureReason2["InvalidTemplateId"] = "INVALID_TEMPLATE_ID";
  AdvancedAiMeetingNotesFailureReason2["InvalidVideoId"] = "INVALID_VIDEO_ID";
  AdvancedAiMeetingNotesFailureReason2["NotMeetingRecording"] = "NOT_MEETING_RECORDING";
  AdvancedAiMeetingNotesFailureReason2["NoTranscriptAvailable"] = "NO_TRANSCRIPT_AVAILABLE";
  AdvancedAiMeetingNotesFailureReason2["UnknownError"] = "UNKNOWN_ERROR";
  return AdvancedAiMeetingNotesFailureReason2;
})(AdvancedAiMeetingNotesFailureReason || {});
var AppSourceType = /* @__PURE__ */ ((AppSourceType2) => {
  AppSourceType2["ChromeExtension"] = "CHROME_EXTENSION";
  AppSourceType2["MobileAndroid"] = "MOBILE_ANDROID";
  AppSourceType2["MobileIos"] = "MOBILE_IOS";
  AppSourceType2["SlackDesktop"] = "SLACK_DESKTOP";
  AppSourceType2["Web"] = "WEB";
  AppSourceType2["WebDesktop"] = "WEB_DESKTOP";
  AppSourceType2["WebMobile"] = "WEB_MOBILE";
  AppSourceType2["WebTablet"] = "WEB_TABLET";
  AppSourceType2["WebTv"] = "WEB_TV";
  return AppSourceType2;
})(AppSourceType || {});
var AudioGenerationStatus = /* @__PURE__ */ ((AudioGenerationStatus2) => {
  AudioGenerationStatus2["Completed"] = "COMPLETED";
  AudioGenerationStatus2["Creating"] = "CREATING";
  AudioGenerationStatus2["Deleting"] = "DELETING";
  AudioGenerationStatus2["Failed"] = "FAILED";
  AudioGenerationStatus2["PendingCreation"] = "PENDING_CREATION";
  AudioGenerationStatus2["PendingDeletion"] = "PENDING_DELETION";
  AudioGenerationStatus2["Regenerating"] = "REGENERATING";
  return AudioGenerationStatus2;
})(AudioGenerationStatus || {});
var AutoChapterStatusesType = /* @__PURE__ */ ((AutoChapterStatusesType2) => {
  AutoChapterStatusesType2["Failure"] = "failure";
  AutoChapterStatusesType2["InProgress"] = "in_progress";
  AutoChapterStatusesType2["NotStarted"] = "not_started";
  AutoChapterStatusesType2["Success"] = "success";
  AutoChapterStatusesType2["Unsupported"] = "unsupported";
  return AutoChapterStatusesType2;
})(AutoChapterStatusesType || {});
var AutoCommentUpdateTarget = /* @__PURE__ */ ((AutoCommentUpdateTarget2) => {
  AutoCommentUpdateTarget2["ShowCommentToCreator"] = "showCommentToCreator";
  AutoCommentUpdateTarget2["ShowFirstEmoji"] = "showFirstEmoji";
  AutoCommentUpdateTarget2["ShowSecondEmoji"] = "showSecondEmoji";
  AutoCommentUpdateTarget2["VideoCreatedAt"] = "videoCreatedAt";
  AutoCommentUpdateTarget2["VideoDuration"] = "videoDuration";
  return AutoCommentUpdateTarget2;
})(AutoCommentUpdateTarget || {});
var AutoContextFeatureStatusValue = /* @__PURE__ */ ((AutoContextFeatureStatusValue2) => {
  AutoContextFeatureStatusValue2["Failure"] = "FAILURE";
  AutoContextFeatureStatusValue2["Pending"] = "PENDING";
  AutoContextFeatureStatusValue2["Success"] = "SUCCESS";
  AutoContextFeatureStatusValue2["Unknown"] = "UNKNOWN";
  return AutoContextFeatureStatusValue2;
})(AutoContextFeatureStatusValue || {});
var AutoContextLanguage = /* @__PURE__ */ ((AutoContextLanguage2) => {
  AutoContextLanguage2["Af"] = "AF";
  AutoContextLanguage2["Am"] = "AM";
  AutoContextLanguage2["As"] = "AS";
  AutoContextLanguage2["Ba"] = "BA";
  AutoContextLanguage2["Be"] = "BE";
  AutoContextLanguage2["Bg"] = "BG";
  AutoContextLanguage2["Bn"] = "BN";
  AutoContextLanguage2["Bo"] = "BO";
  AutoContextLanguage2["Br"] = "BR";
  AutoContextLanguage2["Bs"] = "BS";
  AutoContextLanguage2["Ca"] = "CA";
  AutoContextLanguage2["Cs"] = "CS";
  AutoContextLanguage2["Cy"] = "CY";
  AutoContextLanguage2["Da"] = "DA";
  AutoContextLanguage2["De"] = "DE";
  AutoContextLanguage2["El"] = "EL";
  AutoContextLanguage2["En"] = "EN";
  AutoContextLanguage2["Es"] = "ES";
  AutoContextLanguage2["Et"] = "ET";
  AutoContextLanguage2["Eu"] = "EU";
  AutoContextLanguage2["Fi"] = "FI";
  AutoContextLanguage2["Fo"] = "FO";
  AutoContextLanguage2["Fr"] = "FR";
  AutoContextLanguage2["Gl"] = "GL";
  AutoContextLanguage2["Gu"] = "GU";
  AutoContextLanguage2["Ha"] = "HA";
  AutoContextLanguage2["Haw"] = "HAW";
  AutoContextLanguage2["Hi"] = "HI";
  AutoContextLanguage2["Hr"] = "HR";
  AutoContextLanguage2["Ht"] = "HT";
  AutoContextLanguage2["Hu"] = "HU";
  AutoContextLanguage2["Hy"] = "HY";
  AutoContextLanguage2["Id"] = "ID";
  AutoContextLanguage2["Is"] = "IS";
  AutoContextLanguage2["It"] = "IT";
  AutoContextLanguage2["Ja"] = "JA";
  AutoContextLanguage2["Jw"] = "JW";
  AutoContextLanguage2["Ka"] = "KA";
  AutoContextLanguage2["Kk"] = "KK";
  AutoContextLanguage2["Km"] = "KM";
  AutoContextLanguage2["Kn"] = "KN";
  AutoContextLanguage2["Ko"] = "KO";
  AutoContextLanguage2["La"] = "LA";
  AutoContextLanguage2["Lb"] = "LB";
  AutoContextLanguage2["Ln"] = "LN";
  AutoContextLanguage2["Lo"] = "LO";
  AutoContextLanguage2["Lt"] = "LT";
  AutoContextLanguage2["Lv"] = "LV";
  AutoContextLanguage2["Mg"] = "MG";
  AutoContextLanguage2["Mi"] = "MI";
  AutoContextLanguage2["Mk"] = "MK";
  AutoContextLanguage2["Ml"] = "ML";
  AutoContextLanguage2["Mn"] = "MN";
  AutoContextLanguage2["Mr"] = "MR";
  AutoContextLanguage2["Ms"] = "MS";
  AutoContextLanguage2["Mt"] = "MT";
  AutoContextLanguage2["My"] = "MY";
  AutoContextLanguage2["Ne"] = "NE";
  AutoContextLanguage2["Nl"] = "NL";
  AutoContextLanguage2["Nn"] = "NN";
  AutoContextLanguage2["No"] = "NO";
  AutoContextLanguage2["Oc"] = "OC";
  AutoContextLanguage2["Pa"] = "PA";
  AutoContextLanguage2["Pl"] = "PL";
  AutoContextLanguage2["Ps"] = "PS";
  AutoContextLanguage2["Pt"] = "PT";
  AutoContextLanguage2["Ro"] = "RO";
  AutoContextLanguage2["Ru"] = "RU";
  AutoContextLanguage2["Sa"] = "SA";
  AutoContextLanguage2["Sd"] = "SD";
  AutoContextLanguage2["Si"] = "SI";
  AutoContextLanguage2["Sk"] = "SK";
  AutoContextLanguage2["Sl"] = "SL";
  AutoContextLanguage2["Sn"] = "SN";
  AutoContextLanguage2["So"] = "SO";
  AutoContextLanguage2["Sq"] = "SQ";
  AutoContextLanguage2["Sr"] = "SR";
  AutoContextLanguage2["Su"] = "SU";
  AutoContextLanguage2["Sv"] = "SV";
  AutoContextLanguage2["Sw"] = "SW";
  AutoContextLanguage2["Ta"] = "TA";
  AutoContextLanguage2["Te"] = "TE";
  AutoContextLanguage2["Tg"] = "TG";
  AutoContextLanguage2["Th"] = "TH";
  AutoContextLanguage2["Tk"] = "TK";
  AutoContextLanguage2["Tl"] = "TL";
  AutoContextLanguage2["Tr"] = "TR";
  AutoContextLanguage2["Tt"] = "TT";
  AutoContextLanguage2["Uk"] = "UK";
  AutoContextLanguage2["Unknown"] = "UNKNOWN";
  AutoContextLanguage2["Uz"] = "UZ";
  AutoContextLanguage2["Vi"] = "VI";
  AutoContextLanguage2["Yi"] = "YI";
  AutoContextLanguage2["Yo"] = "YO";
  AutoContextLanguage2["Zh"] = "ZH";
  return AutoContextLanguage2;
})(AutoContextLanguage || {});
var AutoRecordOwnedMeetingsType = /* @__PURE__ */ ((AutoRecordOwnedMeetingsType2) => {
  AutoRecordOwnedMeetingsType2["All"] = "all";
  AutoRecordOwnedMeetingsType2["None"] = "none";
  AutoRecordOwnedMeetingsType2["Workspace"] = "workspace";
  return AutoRecordOwnedMeetingsType2;
})(AutoRecordOwnedMeetingsType || {});
var AutomationKindEnumType = /* @__PURE__ */ ((AutomationKindEnumType2) => {
  AutomationKindEnumType2["Custom"] = "custom";
  AutomationKindEnumType2["External"] = "external";
  AutomationKindEnumType2["Internal"] = "internal";
  return AutomationKindEnumType2;
})(AutomationKindEnumType || {});
var BacklinkMediaType = /* @__PURE__ */ ((BacklinkMediaType2) => {
  BacklinkMediaType2["Screenshot"] = "screenshot";
  BacklinkMediaType2["Video"] = "video";
  return BacklinkMediaType2;
})(BacklinkMediaType || {});
var BacklinkSourceType = /* @__PURE__ */ ((BacklinkSourceType2) => {
  BacklinkSourceType2["Slack"] = "SLACK";
  return BacklinkSourceType2;
})(BacklinkSourceType || {});
var BannerFormattingType = /* @__PURE__ */ ((BannerFormattingType2) => {
  BannerFormattingType2["Emphasized"] = "EMPHASIZED";
  BannerFormattingType2["Plain"] = "PLAIN";
  return BannerFormattingType2;
})(BannerFormattingType || {});
var BannerName = /* @__PURE__ */ ((BannerName2) => {
  BannerName2["AdminInteractions"] = "ADMIN_INTERACTIONS";
  BannerName2["AdminLoomsRecorded"] = "ADMIN_LOOMS_RECORDED";
  BannerName2["AdminLoomsWatchedTime"] = "ADMIN_LOOMS_WATCHED_TIME";
  BannerName2["AdminMeetingsSaved"] = "ADMIN_MEETINGS_SAVED";
  BannerName2["TeamVideosConsumed"] = "TEAM_VIDEOS_CONSUMED";
  BannerName2["TeamVideosPosted"] = "TEAM_VIDEOS_POSTED";
  BannerName2["UserLibrary"] = "USER_LIBRARY";
  return BannerName2;
})(BannerName || {});
var BannerType = /* @__PURE__ */ ((BannerType2) => {
  BannerType2["Admin"] = "ADMIN";
  BannerType2["Team"] = "TEAM";
  BannerType2["User"] = "USER";
  return BannerType2;
})(BannerType || {});
var BillingCadenceType = /* @__PURE__ */ ((BillingCadenceType2) => {
  BillingCadenceType2["Monthly"] = "monthly";
  BillingCadenceType2["Quarterly"] = "quarterly";
  BillingCadenceType2["Yearly"] = "yearly";
  return BillingCadenceType2;
})(BillingCadenceType || {});
var BotActionTypeInput = /* @__PURE__ */ ((BotActionTypeInput2) => {
  BotActionTypeInput2["Cancel"] = "cancel";
  BotActionTypeInput2["Pause"] = "pause";
  BotActionTypeInput2["Resume"] = "resume";
  BotActionTypeInput2["Stop"] = "stop";
  return BotActionTypeInput2;
})(BotActionTypeInput || {});
var BotControlsState = /* @__PURE__ */ ((BotControlsState2) => {
  BotControlsState2["Canceled"] = "CANCELED";
  BotControlsState2["Idle"] = "IDLE";
  BotControlsState2["Paused"] = "PAUSED";
  BotControlsState2["Recording"] = "RECORDING";
  BotControlsState2["Stopped"] = "STOPPED";
  return BotControlsState2;
})(BotControlsState || {});
var BotMeetingEventType = /* @__PURE__ */ ((BotMeetingEventType2) => {
  BotMeetingEventType2["CancelRecording"] = "cancelRecording";
  BotMeetingEventType2["ParticipantsLeft"] = "participantsLeft";
  BotMeetingEventType2["PauseRecording"] = "pauseRecording";
  BotMeetingEventType2["ResumeRecording"] = "resumeRecording";
  BotMeetingEventType2["StopRecording"] = "stopRecording";
  return BotMeetingEventType2;
})(BotMeetingEventType || {});
var BotServerMessageType = /* @__PURE__ */ ((BotServerMessageType2) => {
  BotServerMessageType2["BotInitializationData"] = "bot_initialization_data";
  BotServerMessageType2["Cancel"] = "cancel";
  BotServerMessageType2["Pause"] = "pause";
  BotServerMessageType2["PostChatMessage"] = "post_chat_message";
  BotServerMessageType2["Resume"] = "resume";
  BotServerMessageType2["Stop"] = "stop";
  return BotServerMessageType2;
})(BotServerMessageType || {});
var CameraPickerRegion = /* @__PURE__ */ ((CameraPickerRegion2) => {
  CameraPickerRegion2["BottomCenter"] = "bottom_center";
  CameraPickerRegion2["BottomLeft"] = "bottom_left";
  CameraPickerRegion2["BottomRight"] = "bottom_right";
  CameraPickerRegion2["MiddleCenter"] = "middle_center";
  CameraPickerRegion2["MiddleLeft"] = "middle_left";
  CameraPickerRegion2["MiddleRight"] = "middle_right";
  CameraPickerRegion2["TopCenter"] = "top_center";
  CameraPickerRegion2["TopLeft"] = "top_left";
  CameraPickerRegion2["TopRight"] = "top_right";
  return CameraPickerRegion2;
})(CameraPickerRegion || {});
var CaptureType = /* @__PURE__ */ ((CaptureType2) => {
  CaptureType2["PictureInScriptureImage"] = "picture_in_scripture_image";
  CaptureType2["UserScreenshot"] = "user_screenshot";
  return CaptureType2;
})(CaptureType || {});
var ChecklistItem = /* @__PURE__ */ ((ChecklistItem2) => {
  ChecklistItem2["AddTeammate"] = "add_teammate";
  ChecklistItem2["CompleteOnboarding"] = "complete_onboarding";
  ChecklistItem2["CreateAccount"] = "create_account";
  ChecklistItem2["CustomizeVideoName"] = "customize_video_name";
  ChecklistItem2["DownloadRecorder"] = "download_recorder";
  ChecklistItem2["EmailVerified"] = "email_verified";
  ChecklistItem2["FilledAccountSettings"] = "filled_account_settings";
  ChecklistItem2["FirstCamRecording"] = "first_cam_recording";
  ChecklistItem2["FirstVideoRecording"] = "first_video_recording";
  ChecklistItem2["FirstVideoUpload"] = "first_video_upload";
  ChecklistItem2["FirstVideoViewed"] = "first_video_viewed";
  ChecklistItem2["FollowedUsOnTwitter"] = "followed_us_on_twitter";
  ChecklistItem2["HasReachedRecordingLimit"] = "has_reached_recording_limit";
  ChecklistItem2["HasViewedScreenshots"] = "has_viewed_screenshots";
  ChecklistItem2["HasViewedVideos"] = "has_viewed_videos";
  ChecklistItem2["LikedUsOnFacebook"] = "liked_us_on_facebook";
  ChecklistItem2["MeetingRecording"] = "meeting_recording";
  ChecklistItem2["PushNotificationEnabled"] = "push_notification_enabled";
  ChecklistItem2["ShareVideo"] = "share_video";
  ChecklistItem2["SharedFirstVideoOnFacebook"] = "shared_first_video_on_facebook";
  ChecklistItem2["TweetedFirstVideo"] = "tweeted_first_video";
  return ChecklistItem2;
})(ChecklistItem || {});
var CloudfrontVideoAcceptableMime = /* @__PURE__ */ ((CloudfrontVideoAcceptableMime2) => {
  CloudfrontVideoAcceptableMime2["Dash"] = "DASH";
  CloudfrontVideoAcceptableMime2["M3U8"] = "M3U8";
  CloudfrontVideoAcceptableMime2["Mp4"] = "MP4";
  CloudfrontVideoAcceptableMime2["Webm"] = "WEBM";
  return CloudfrontVideoAcceptableMime2;
})(CloudfrontVideoAcceptableMime || {});
var CommentType = /* @__PURE__ */ ((CommentType2) => {
  CommentType2["Comment"] = "COMMENT";
  CommentType2["Reply"] = "REPLY";
  return CommentType2;
})(CommentType || {});
var ConfluenceContentTypes = /* @__PURE__ */ ((ConfluenceContentTypes2) => {
  ConfluenceContentTypes2["Database"] = "database";
  ConfluenceContentTypes2["Folder"] = "folder";
  ConfluenceContentTypes2["Page"] = "page";
  ConfluenceContentTypes2["Whiteboard"] = "whiteboard";
  return ConfluenceContentTypes2;
})(ConfluenceContentTypes || {});
var Conjunction = /* @__PURE__ */ ((Conjunction2) => {
  Conjunction2["And"] = "and";
  Conjunction2["Or"] = "or";
  return Conjunction2;
})(Conjunction || {});
var ConnectedServiceIntegrationEnumType = /* @__PURE__ */ ((ConnectedServiceIntegrationEnumType2) => {
  ConnectedServiceIntegrationEnumType2["Gcal"] = "gcal";
  ConnectedServiceIntegrationEnumType2["MicrosoftGraph"] = "microsoft_graph";
  return ConnectedServiceIntegrationEnumType2;
})(ConnectedServiceIntegrationEnumType || {});
var ContactSalesCompanySize = /* @__PURE__ */ ((ContactSalesCompanySize2) => {
  ContactSalesCompanySize2["Range1"] = "Range1";
  ContactSalesCompanySize2["Range2"] = "Range2";
  ContactSalesCompanySize2["Range3"] = "Range3";
  ContactSalesCompanySize2["Range4"] = "Range4";
  ContactSalesCompanySize2["Range5"] = "Range5";
  ContactSalesCompanySize2["Range6"] = "Range6";
  ContactSalesCompanySize2["Range7"] = "Range7";
  ContactSalesCompanySize2["Range8"] = "Range8";
  return ContactSalesCompanySize2;
})(ContactSalesCompanySize || {});
var ContactSalesUseCase = /* @__PURE__ */ ((ContactSalesUseCase2) => {
  ContactSalesUseCase2["BuyLicense"] = "BuyLicense";
  ContactSalesUseCase2["LearnAboutEnterprise"] = "LearnAboutEnterprise";
  ContactSalesUseCase2["LoomForSchool"] = "LoomForSchool";
  ContactSalesUseCase2["ProductEvaluation"] = "ProductEvaluation";
  return ContactSalesUseCase2;
})(ContactSalesUseCase || {});
var ContentVisibilityProperty = /* @__PURE__ */ ((ContentVisibilityProperty2) => {
  ContentVisibilityProperty2["Public"] = "public";
  ContentVisibilityProperty2["Workspace"] = "workspace";
  return ContentVisibilityProperty2;
})(ContentVisibilityProperty || {});
var ControlTypeEnum = /* @__PURE__ */ ((ControlTypeEnum2) => {
  ControlTypeEnum2["DynamicConfig"] = "dynamic_config";
  ControlTypeEnum2["LaunchdarklyFeatureFlag"] = "launchdarkly_feature_flag";
  ControlTypeEnum2["StatsigExperiment"] = "statsig_experiment";
  ControlTypeEnum2["StatsigFeatureGate"] = "statsig_feature_gate";
  return ControlTypeEnum2;
})(ControlTypeEnum || {});
var CorrectionEditType = /* @__PURE__ */ ((CorrectionEditType2) => {
  CorrectionEditType2["Insert"] = "insert";
  CorrectionEditType2["Remove"] = "remove";
  CorrectionEditType2["Replace"] = "replace";
  return CorrectionEditType2;
})(CorrectionEditType || {});
var CorrectionPositionType = /* @__PURE__ */ ((CorrectionPositionType2) => {
  CorrectionPositionType2["After"] = "after";
  CorrectionPositionType2["Before"] = "before";
  return CorrectionPositionType2;
})(CorrectionPositionType || {});
var CorrectionSourceType = /* @__PURE__ */ ((CorrectionSourceType2) => {
  CorrectionSourceType2["Auto"] = "auto";
  CorrectionSourceType2["User"] = "user";
  return CorrectionSourceType2;
})(CorrectionSourceType || {});
var DataRetentionInterval = /* @__PURE__ */ ((DataRetentionInterval2) => {
  DataRetentionInterval2["Days"] = "days";
  DataRetentionInterval2["Years"] = "years";
  return DataRetentionInterval2;
})(DataRetentionInterval || {});
var DataRetentionKeep = /* @__PURE__ */ ((DataRetentionKeep2) => {
  DataRetentionKeep2["Published"] = "published";
  DataRetentionKeep2["Team"] = "team";
  return DataRetentionKeep2;
})(DataRetentionKeep || {});
var DateType = /* @__PURE__ */ ((DateType2) => {
  DateType2["AllTime"] = "ALL_TIME";
  DateType2["LastNinetyDays"] = "LAST_NINETY_DAYS";
  DateType2["LastYear"] = "LAST_YEAR";
  return DateType2;
})(DateType || {});
var DefaultSsoRoleEnum = /* @__PURE__ */ ((DefaultSsoRoleEnum2) => {
  DefaultSsoRoleEnum2["Creator"] = "creator";
  DefaultSsoRoleEnum2["Viewer"] = "viewer";
  return DefaultSsoRoleEnum2;
})(DefaultSsoRoleEnum || {});
var DeletionEffective = /* @__PURE__ */ ((DeletionEffective2) => {
  DeletionEffective2["Deferred"] = "DEFERRED";
  DeletionEffective2["Delayed"] = "DELAYED";
  DeletionEffective2["Immediately"] = "IMMEDIATELY";
  return DeletionEffective2;
})(DeletionEffective || {});
var DeliveryType = /* @__PURE__ */ ((DeliveryType2) => {
  DeliveryType2["Instant"] = "INSTANT";
  DeliveryType2["NextDay"] = "NEXT_DAY";
  DeliveryType2["NextDaySkipWeekends"] = "NEXT_DAY_SKIP_WEEKENDS";
  return DeliveryType2;
})(DeliveryType || {});
var DesktopVersionTypes = /* @__PURE__ */ ((DesktopVersionTypes2) => {
  DesktopVersionTypes2["Latest"] = "latest";
  DesktopVersionTypes2["LowCadenceLatest"] = "low_cadence_latest";
  DesktopVersionTypes2["Nightly"] = "nightly";
  DesktopVersionTypes2["Trunk"] = "trunk";
  return DesktopVersionTypes2;
})(DesktopVersionTypes || {});
var DownloadableByType = /* @__PURE__ */ ((DownloadableByType2) => {
  DownloadableByType2["Anyone"] = "anyone";
  DownloadableByType2["Editors"] = "editors";
  DownloadableByType2["NoOne"] = "no_one";
  DownloadableByType2["Owner"] = "owner";
  DownloadableByType2["Workspace"] = "workspace";
  return DownloadableByType2;
})(DownloadableByType || {});
var EmailGateVideoType = /* @__PURE__ */ ((EmailGateVideoType2) => {
  EmailGateVideoType2["Hard"] = "HARD";
  EmailGateVideoType2["None"] = "NONE";
  EmailGateVideoType2["Soft"] = "SOFT";
  return EmailGateVideoType2;
})(EmailGateVideoType || {});
var FillerWordRemoval = /* @__PURE__ */ ((FillerWordRemoval2) => {
  FillerWordRemoval2["None"] = "none";
  FillerWordRemoval2["Text"] = "text";
  FillerWordRemoval2["TextAudio"] = "text_audio";
  return FillerWordRemoval2;
})(FillerWordRemoval || {});
var FolderAccessLevel = /* @__PURE__ */ ((FolderAccessLevel2) => {
  FolderAccessLevel2["Read"] = "read";
  FolderAccessLevel2["Readwrite"] = "readwrite";
  return FolderAccessLevel2;
})(FolderAccessLevel || {});
var FolderSource = /* @__PURE__ */ ((FolderSource2) => {
  FolderSource2["Active"] = "ACTIVE";
  FolderSource2["Archived"] = "ARCHIVED";
  FolderSource2["Public"] = "PUBLIC";
  FolderSource2["Space"] = "SPACE";
  return FolderSource2;
})(FolderSource || {});
var FolderVisibilityType = /* @__PURE__ */ ((FolderVisibilityType2) => {
  FolderVisibilityType2["Owner"] = "owner";
  FolderVisibilityType2["Workspace"] = "workspace";
  return FolderVisibilityType2;
})(FolderVisibilityType || {});
var GenerateMeetingNotesForVideoFailureReason = /* @__PURE__ */ ((GenerateMeetingNotesForVideoFailureReason2) => {
  GenerateMeetingNotesForVideoFailureReason2["ConfluenceHandledError"] = "CONFLUENCE_HANDLED_ERROR";
  GenerateMeetingNotesForVideoFailureReason2["MeetingNotFound"] = "MEETING_NOT_FOUND";
  GenerateMeetingNotesForVideoFailureReason2["MissingPermissions"] = "MISSING_PERMISSIONS";
  GenerateMeetingNotesForVideoFailureReason2["RecordingDisabled"] = "RECORDING_DISABLED";
  GenerateMeetingNotesForVideoFailureReason2["Unexpected"] = "UNEXPECTED";
  GenerateMeetingNotesForVideoFailureReason2["VideoNotFound"] = "VIDEO_NOT_FOUND";
  GenerateMeetingNotesForVideoFailureReason2["VideoRecorderNotFound"] = "VIDEO_RECORDER_NOT_FOUND";
  return GenerateMeetingNotesForVideoFailureReason2;
})(GenerateMeetingNotesForVideoFailureReason || {});
var GenerateVideoSourceType = /* @__PURE__ */ ((GenerateVideoSourceType2) => {
  GenerateVideoSourceType2["HtmlUploadId"] = "HTML_UPLOAD_ID";
  GenerateVideoSourceType2["ScrapableUrl"] = "SCRAPABLE_URL";
  return GenerateVideoSourceType2;
})(GenerateVideoSourceType || {});
var GenerationSource = /* @__PURE__ */ ((GenerationSource2) => {
  GenerationSource2["New"] = "new";
  GenerationSource2["Regenerated"] = "regenerated";
  GenerationSource2["Saved"] = "saved";
  return GenerationSource2;
})(GenerationSource || {});
var GroupingTypeEnum = /* @__PURE__ */ ((GroupingTypeEnum2) => {
  GroupingTypeEnum2["CommunityProfileVideos"] = "COMMUNITY_PROFILE_VIDEOS";
  GroupingTypeEnum2["CommunityVideos"] = "COMMUNITY_VIDEOS";
  GroupingTypeEnum2["Folder"] = "FOLDER";
  GroupingTypeEnum2["MeetingRecording"] = "MEETING_RECORDING";
  GroupingTypeEnum2["PinnedVideosInFolder"] = "PINNED_VIDEOS_IN_FOLDER";
  GroupingTypeEnum2["SpacePosted"] = "SPACE_POSTED";
  GroupingTypeEnum2["UserArchivedVideos"] = "USER_ARCHIVED_VIDEOS";
  GroupingTypeEnum2["UserCommunityVideos"] = "USER_COMMUNITY_VIDEOS";
  GroupingTypeEnum2["UserOwnedVideos"] = "USER_OWNED_VIDEOS";
  GroupingTypeEnum2["UserProfileVideos"] = "USER_PROFILE_VIDEOS";
  GroupingTypeEnum2["UserSharedWithMeVideos"] = "USER_SHARED_WITH_ME_VIDEOS";
  GroupingTypeEnum2["UserWatchLater"] = "USER_WATCH_LATER";
  GroupingTypeEnum2["VideoPersonalization"] = "VIDEO_PERSONALIZATION";
  GroupingTypeEnum2["VideoPersonalizationWithAudio"] = "VIDEO_PERSONALIZATION_WITH_AUDIO";
  GroupingTypeEnum2["WorkspacePublished"] = "WORKSPACE_PUBLISHED";
  GroupingTypeEnum2["WorkspaceTag"] = "WORKSPACE_TAG";
  return GroupingTypeEnum2;
})(GroupingTypeEnum || {});
var IntelligenceAvailableStatusType = /* @__PURE__ */ ((IntelligenceAvailableStatusType2) => {
  IntelligenceAvailableStatusType2["Auto"] = "AUTO";
  IntelligenceAvailableStatusType2["Invalid"] = "INVALID";
  IntelligenceAvailableStatusType2["Pending"] = "PENDING";
  IntelligenceAvailableStatusType2["Unknown"] = "UNKNOWN";
  IntelligenceAvailableStatusType2["User"] = "USER";
  return IntelligenceAvailableStatusType2;
})(IntelligenceAvailableStatusType || {});
var IntelligenceStatusType = /* @__PURE__ */ ((IntelligenceStatusType2) => {
  IntelligenceStatusType2["Auto"] = "AUTO";
  IntelligenceStatusType2["Invalid"] = "INVALID";
  IntelligenceStatusType2["Pending"] = "PENDING";
  IntelligenceStatusType2["Unknown"] = "UNKNOWN";
  IntelligenceStatusType2["User"] = "USER";
  return IntelligenceStatusType2;
})(IntelligenceStatusType || {});
var InviteFlow = /* @__PURE__ */ ((InviteFlow2) => {
  InviteFlow2["Atlassian"] = "ATLASSIAN";
  InviteFlow2["Loom"] = "LOOM";
  InviteFlow2["None"] = "NONE";
  return InviteFlow2;
})(InviteFlow || {});
var InviteSetting = /* @__PURE__ */ ((InviteSetting2) => {
  InviteSetting2["Anyone"] = "ANYONE";
  InviteSetting2["AnyoneAdminApproval"] = "ANYONE_ADMIN_APPROVAL";
  InviteSetting2["DomainRestricted"] = "DOMAIN_RESTRICTED";
  InviteSetting2["DomainRestrictedDirectAnyoneAdminApproval"] = "DOMAIN_RESTRICTED_DIRECT_ANYONE_ADMIN_APPROVAL";
  InviteSetting2["None"] = "NONE";
  return InviteSetting2;
})(InviteSetting || {});
var InvitedRoleType = /* @__PURE__ */ ((InvitedRoleType2) => {
  InvitedRoleType2["Admin"] = "admin";
  InvitedRoleType2["Creator"] = "creator";
  InvitedRoleType2["CreatorLite"] = "creator_lite";
  InvitedRoleType2["Guest"] = "guest";
  InvitedRoleType2["Viewer"] = "viewer";
  return InvitedRoleType2;
})(InvitedRoleType || {});
var InvoiceStatus = /* @__PURE__ */ ((InvoiceStatus2) => {
  InvoiceStatus2["Draft"] = "draft";
  InvoiceStatus2["Open"] = "open";
  InvoiceStatus2["Paid"] = "paid";
  InvoiceStatus2["Uncollectible"] = "uncollectible";
  InvoiceStatus2["Void"] = "void";
  return InvoiceStatus2;
})(InvoiceStatus || {});
var JiraAuthResponseCode = /* @__PURE__ */ ((JiraAuthResponseCode2) => {
  JiraAuthResponseCode2["TokenRefreshFailed"] = "token_refresh_failed";
  return JiraAuthResponseCode2;
})(JiraAuthResponseCode || {});
var JiraErrorCode = /* @__PURE__ */ ((JiraErrorCode2) => {
  JiraErrorCode2["ApiResponse"] = "apiResponse";
  JiraErrorCode2["Assignee"] = "assignee";
  JiraErrorCode2["Customfield"] = "customfield";
  JiraErrorCode2["JiraSiteIdRequired"] = "jiraSiteIdRequired";
  return JiraErrorCode2;
})(JiraErrorCode || {});
var JiraSearchableFieldType = /* @__PURE__ */ ((JiraSearchableFieldType2) => {
  JiraSearchableFieldType2["Assignees"] = "assignees";
  JiraSearchableFieldType2["IssueTypes"] = "issueTypes";
  JiraSearchableFieldType2["Projects"] = "projects";
  return JiraSearchableFieldType2;
})(JiraSearchableFieldType || {});
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["Af"] = "af";
  Language2["Am"] = "am";
  Language2["As"] = "as";
  Language2["Ba"] = "ba";
  Language2["Be"] = "be";
  Language2["Bg"] = "bg";
  Language2["Bn"] = "bn";
  Language2["Bo"] = "bo";
  Language2["Br"] = "br";
  Language2["Bs"] = "bs";
  Language2["Ca"] = "ca";
  Language2["Cs"] = "cs";
  Language2["Cy"] = "cy";
  Language2["Da"] = "da";
  Language2["De"] = "de";
  Language2["El"] = "el";
  Language2["En"] = "en";
  Language2["Es"] = "es";
  Language2["Et"] = "et";
  Language2["Eu"] = "eu";
  Language2["Fi"] = "fi";
  Language2["Fo"] = "fo";
  Language2["Fr"] = "fr";
  Language2["Gl"] = "gl";
  Language2["Gu"] = "gu";
  Language2["Ha"] = "ha";
  Language2["Haw"] = "haw";
  Language2["Hi"] = "hi";
  Language2["Hr"] = "hr";
  Language2["Ht"] = "ht";
  Language2["Hu"] = "hu";
  Language2["Hy"] = "hy";
  Language2["Id"] = "id";
  Language2["Is"] = "is";
  Language2["It"] = "it";
  Language2["Ja"] = "ja";
  Language2["Jw"] = "jw";
  Language2["Ka"] = "ka";
  Language2["Kk"] = "kk";
  Language2["Km"] = "km";
  Language2["Kn"] = "kn";
  Language2["Ko"] = "ko";
  Language2["La"] = "la";
  Language2["Lb"] = "lb";
  Language2["Ln"] = "ln";
  Language2["Lo"] = "lo";
  Language2["Lt"] = "lt";
  Language2["Lv"] = "lv";
  Language2["Mg"] = "mg";
  Language2["Mi"] = "mi";
  Language2["Mk"] = "mk";
  Language2["Ml"] = "ml";
  Language2["Mn"] = "mn";
  Language2["Mr"] = "mr";
  Language2["Ms"] = "ms";
  Language2["Mt"] = "mt";
  Language2["My"] = "my";
  Language2["Ne"] = "ne";
  Language2["Nl"] = "nl";
  Language2["Nn"] = "nn";
  Language2["No"] = "no";
  Language2["Oc"] = "oc";
  Language2["Pa"] = "pa";
  Language2["Pl"] = "pl";
  Language2["Ps"] = "ps";
  Language2["Pt"] = "pt";
  Language2["Ro"] = "ro";
  Language2["Ru"] = "ru";
  Language2["Sa"] = "sa";
  Language2["Sd"] = "sd";
  Language2["Si"] = "si";
  Language2["Sk"] = "sk";
  Language2["Sl"] = "sl";
  Language2["Sn"] = "sn";
  Language2["So"] = "so";
  Language2["Sq"] = "sq";
  Language2["Sr"] = "sr";
  Language2["Su"] = "su";
  Language2["Sv"] = "sv";
  Language2["Sw"] = "sw";
  Language2["Ta"] = "ta";
  Language2["Te"] = "te";
  Language2["Tg"] = "tg";
  Language2["Th"] = "th";
  Language2["Tk"] = "tk";
  Language2["Tl"] = "tl";
  Language2["Tr"] = "tr";
  Language2["Tt"] = "tt";
  Language2["Uk"] = "uk";
  Language2["Unknown"] = "unknown";
  Language2["Uz"] = "uz";
  Language2["Vi"] = "vi";
  Language2["Yi"] = "yi";
  Language2["Yo"] = "yo";
  Language2["Zh"] = "zh";
  return Language2;
})(Language || {});
var LinkSharing = /* @__PURE__ */ ((LinkSharing2) => {
  LinkSharing2["Anyone"] = "anyone";
  LinkSharing2["OnlyPeopleAdded"] = "only_people_added";
  LinkSharing2["Workspace"] = "workspace";
  return LinkSharing2;
})(LinkSharing || {});
var LiveTranscriptStatusType = /* @__PURE__ */ ((LiveTranscriptStatusType2) => {
  LiveTranscriptStatusType2["Cancelled"] = "cancelled";
  LiveTranscriptStatusType2["Completed"] = "completed";
  LiveTranscriptStatusType2["Updated"] = "updated";
  return LiveTranscriptStatusType2;
})(LiveTranscriptStatusType || {});
var LoomsAnonProfileCollectionFilterType = /* @__PURE__ */ ((LoomsAnonProfileCollectionFilterType2) => {
  LoomsAnonProfileCollectionFilterType2["CommunityProfile"] = "COMMUNITY_PROFILE";
  return LoomsAnonProfileCollectionFilterType2;
})(LoomsAnonProfileCollectionFilterType || {});
var LoomsCollectionFilterType = /* @__PURE__ */ ((LoomsCollectionFilterType2) => {
  LoomsCollectionFilterType2["CommunityProfile"] = "COMMUNITY_PROFILE";
  LoomsCollectionFilterType2["CommunityPublished"] = "COMMUNITY_PUBLISHED";
  LoomsCollectionFilterType2["CreatedByMe"] = "CREATED_BY_ME";
  LoomsCollectionFilterType2["CreatedByOthers"] = "CREATED_BY_OTHERS";
  LoomsCollectionFilterType2["InFolder"] = "IN_FOLDER";
  LoomsCollectionFilterType2["Looms"] = "LOOMS";
  LoomsCollectionFilterType2["MeetingRecording"] = "MEETING_RECORDING";
  LoomsCollectionFilterType2["NotInFolder"] = "NOT_IN_FOLDER";
  LoomsCollectionFilterType2["Profile"] = "PROFILE";
  LoomsCollectionFilterType2["Published"] = "PUBLISHED";
  LoomsCollectionFilterType2["SharedWithMe"] = "SHARED_WITH_ME";
  LoomsCollectionFilterType2["Tag"] = "TAG";
  LoomsCollectionFilterType2["Unpublished"] = "UNPUBLISHED";
  LoomsCollectionFilterType2["WorkspaceProfile"] = "WORKSPACE_PROFILE";
  return LoomsCollectionFilterType2;
})(LoomsCollectionFilterType || {});
var LoomsSortGrouping = /* @__PURE__ */ ((LoomsSortGrouping2) => {
  LoomsSortGrouping2["CommunityProfileVideos"] = "COMMUNITY_PROFILE_VIDEOS";
  LoomsSortGrouping2["CommunityVideos"] = "COMMUNITY_VIDEOS";
  LoomsSortGrouping2["Folder"] = "FOLDER";
  LoomsSortGrouping2["MeetingRecording"] = "MEETING_RECORDING";
  LoomsSortGrouping2["PinnedVideosInFolder"] = "PINNED_VIDEOS_IN_FOLDER";
  LoomsSortGrouping2["SpacePosted"] = "SPACE_POSTED";
  LoomsSortGrouping2["UserArchivedVideos"] = "USER_ARCHIVED_VIDEOS";
  LoomsSortGrouping2["UserCommunityVideos"] = "USER_COMMUNITY_VIDEOS";
  LoomsSortGrouping2["UserOwnedVideos"] = "USER_OWNED_VIDEOS";
  LoomsSortGrouping2["UserProfileVideos"] = "USER_PROFILE_VIDEOS";
  LoomsSortGrouping2["UserSharedWithMeVideos"] = "USER_SHARED_WITH_ME_VIDEOS";
  LoomsSortGrouping2["UserWatchLater"] = "USER_WATCH_LATER";
  LoomsSortGrouping2["VideoPersonalization"] = "VIDEO_PERSONALIZATION";
  LoomsSortGrouping2["VideoPersonalizationWithAudio"] = "VIDEO_PERSONALIZATION_WITH_AUDIO";
  LoomsSortGrouping2["WorkspacePublished"] = "WORKSPACE_PUBLISHED";
  LoomsSortGrouping2["WorkspaceTag"] = "WORKSPACE_TAG";
  return LoomsSortGrouping2;
})(LoomsSortGrouping || {});
var LoomsSortOrder = /* @__PURE__ */ ((LoomsSortOrder2) => {
  LoomsSortOrder2["Asc"] = "ASC";
  LoomsSortOrder2["Desc"] = "DESC";
  return LoomsSortOrder2;
})(LoomsSortOrder || {});
var LoomsSortType = /* @__PURE__ */ ((LoomsSortType2) => {
  LoomsSortType2["Custom"] = "CUSTOM";
  LoomsSortType2["Grouping"] = "GROUPING";
  LoomsSortType2["Name"] = "NAME";
  LoomsSortType2["Recent"] = "RECENT";
  return LoomsSortType2;
})(LoomsSortType || {});
var LoomsSource = /* @__PURE__ */ ((LoomsSource2) => {
  LoomsSource2["All"] = "ALL";
  LoomsSource2["AllPublicSpaces"] = "ALL_PUBLIC_SPACES";
  LoomsSource2["Archived"] = "ARCHIVED";
  LoomsSource2["Mine"] = "MINE";
  LoomsSource2["Shared"] = "SHARED";
  LoomsSource2["Space"] = "SPACE";
  LoomsSource2["UserProfileSpaces"] = "USER_PROFILE_SPACES";
  LoomsSource2["UserPublicSpaces"] = "USER_PUBLIC_SPACES";
  LoomsSource2["UserSpace"] = "USER_SPACE";
  LoomsSource2["WatchLater"] = "WATCH_LATER";
  return LoomsSource2;
})(LoomsSource || {});
var MagicMeetingNotesFailureReason = /* @__PURE__ */ ((MagicMeetingNotesFailureReason2) => {
  MagicMeetingNotesFailureReason2["ConfluenceHandledError"] = "CONFLUENCE_HANDLED_ERROR";
  MagicMeetingNotesFailureReason2["MissingPermissions"] = "MISSING_PERMISSIONS";
  MagicMeetingNotesFailureReason2["NotAmnEligible"] = "NOT_AMN_ELIGIBLE";
  MagicMeetingNotesFailureReason2["RecordingDisabled"] = "RECORDING_DISABLED";
  MagicMeetingNotesFailureReason2["Unexpected"] = "UNEXPECTED";
  return MagicMeetingNotesFailureReason2;
})(MagicMeetingNotesFailureReason || {});
var MediaTranscriptStatus = /* @__PURE__ */ ((MediaTranscriptStatus2) => {
  MediaTranscriptStatus2["Final"] = "final";
  MediaTranscriptStatus2["Partial"] = "partial";
  return MediaTranscriptStatus2;
})(MediaTranscriptStatus || {});
var MeetingRecordingAccessInput = /* @__PURE__ */ ((MeetingRecordingAccessInput2) => {
  MeetingRecordingAccessInput2["CanEdit"] = "can_edit";
  MeetingRecordingAccessInput2["CanView"] = "can_view";
  MeetingRecordingAccessInput2["Disabled"] = "disabled";
  return MeetingRecordingAccessInput2;
})(MeetingRecordingAccessInput || {});
var MeetingRecordingAccessType = /* @__PURE__ */ ((MeetingRecordingAccessType2) => {
  MeetingRecordingAccessType2["CanEdit"] = "can_edit";
  MeetingRecordingAccessType2["CanView"] = "can_view";
  MeetingRecordingAccessType2["Disabled"] = "disabled";
  return MeetingRecordingAccessType2;
})(MeetingRecordingAccessType || {});
var MeetingRecordingLinkSharingInput = /* @__PURE__ */ ((MeetingRecordingLinkSharingInput2) => {
  MeetingRecordingLinkSharingInput2["Anyone"] = "anyone";
  MeetingRecordingLinkSharingInput2["OnlyPeopleAdded"] = "only_people_added";
  MeetingRecordingLinkSharingInput2["Workspace"] = "workspace";
  return MeetingRecordingLinkSharingInput2;
})(MeetingRecordingLinkSharingInput || {});
var MeetingRecordingLinkSharingType = /* @__PURE__ */ ((MeetingRecordingLinkSharingType2) => {
  MeetingRecordingLinkSharingType2["Anyone"] = "anyone";
  MeetingRecordingLinkSharingType2["OnlyPeopleAdded"] = "only_people_added";
  MeetingRecordingLinkSharingType2["Workspace"] = "workspace";
  return MeetingRecordingLinkSharingType2;
})(MeetingRecordingLinkSharingType || {});
var MeetingRecordingSummaryNotificationInput = /* @__PURE__ */ ((MeetingRecordingSummaryNotificationInput2) => {
  MeetingRecordingSummaryNotificationInput2["Disabled"] = "disabled";
  MeetingRecordingSummaryNotificationInput2["Everyone"] = "everyone";
  MeetingRecordingSummaryNotificationInput2["ExternalOnly"] = "external_only";
  MeetingRecordingSummaryNotificationInput2["InternalOnly"] = "internal_only";
  MeetingRecordingSummaryNotificationInput2["RecorderOnly"] = "recorder_only";
  return MeetingRecordingSummaryNotificationInput2;
})(MeetingRecordingSummaryNotificationInput || {});
var MeetingRecordingSummaryNotificationType = /* @__PURE__ */ ((MeetingRecordingSummaryNotificationType2) => {
  MeetingRecordingSummaryNotificationType2["Disabled"] = "disabled";
  MeetingRecordingSummaryNotificationType2["Everyone"] = "everyone";
  MeetingRecordingSummaryNotificationType2["ExternalOnly"] = "external_only";
  MeetingRecordingSummaryNotificationType2["InternalOnly"] = "internal_only";
  MeetingRecordingSummaryNotificationType2["RecorderOnly"] = "recorder_only";
  return MeetingRecordingSummaryNotificationType2;
})(MeetingRecordingSummaryNotificationType || {});
var MeetingSourceProperty = /* @__PURE__ */ ((MeetingSourceProperty2) => {
  MeetingSourceProperty2["Zoom"] = "zoom";
  return MeetingSourceProperty2;
})(MeetingSourceProperty || {});
var MeetingTypeProperty = /* @__PURE__ */ ((MeetingTypeProperty2) => {
  MeetingTypeProperty2["ZoomRecurringMeetingType"] = "ZOOM_RECURRING_MEETING_TYPE";
  MeetingTypeProperty2["ZoomRecurringMeetingWithNoEnddateType"] = "ZOOM_RECURRING_MEETING_WITH_NO_ENDDATE_TYPE";
  MeetingTypeProperty2["ZoomScheduledMeetingType"] = "ZOOM_SCHEDULED_MEETING_TYPE";
  return MeetingTypeProperty2;
})(MeetingTypeProperty || {});
var MemberPropertyEnum = /* @__PURE__ */ ((MemberPropertyEnum2) => {
  MemberPropertyEnum2["AmnSettings"] = "amnSettings";
  MemberPropertyEnum2["BooleanValue"] = "booleanValue";
  MemberPropertyEnum2["DeclinedSuggestedFollowStreams"] = "declinedSuggestedFollowStreams";
  MemberPropertyEnum2["DefaultCta"] = "defaultCta";
  MemberPropertyEnum2["DeletedVideoCount"] = "deletedVideoCount";
  MemberPropertyEnum2["EnforceCreatorLiteLimit"] = "enforceCreatorLiteLimit";
  MemberPropertyEnum2["HomeStateDensity"] = "homeStateDensity";
  MemberPropertyEnum2["JsonValue"] = "jsonValue";
  MemberPropertyEnum2["LimitsOverride"] = "limitsOverride";
  MemberPropertyEnum2["NumberValue"] = "numberValue";
  MemberPropertyEnum2["RecentlyUsedTags"] = "recentlyUsedTags";
  MemberPropertyEnum2["StringValue"] = "stringValue";
  MemberPropertyEnum2["ZoomAllIngestion"] = "zoomAllIngestion";
  MemberPropertyEnum2["ZoomAutoIngestion"] = "zoomAutoIngestion";
  return MemberPropertyEnum2;
})(MemberPropertyEnum || {});
var MobileHomeActivityReason = /* @__PURE__ */ ((MobileHomeActivityReason2) => {
  MobileHomeActivityReason2["FirstVideoView"] = "FIRST_VIDEO_VIEW";
  MobileHomeActivityReason2["NewComment"] = "NEW_COMMENT";
  MobileHomeActivityReason2["NewCommentReply"] = "NEW_COMMENT_REPLY";
  MobileHomeActivityReason2["NewReaction"] = "NEW_REACTION";
  return MobileHomeActivityReason2;
})(MobileHomeActivityReason || {});
var NotificationDeliveryType = /* @__PURE__ */ ((NotificationDeliveryType2) => {
  NotificationDeliveryType2["AtlassianNotifications"] = "atlassianNotifications";
  NotificationDeliveryType2["Mail"] = "mail";
  NotificationDeliveryType2["Mobile"] = "mobile";
  NotificationDeliveryType2["Slack"] = "slack";
  NotificationDeliveryType2["Web"] = "web";
  return NotificationDeliveryType2;
})(NotificationDeliveryType || {});
var NotificationQueryType = /* @__PURE__ */ ((NotificationQueryType2) => {
  NotificationQueryType2["All"] = "all";
  NotificationQueryType2["Comments"] = "comments";
  NotificationQueryType2["Other"] = "other";
  NotificationQueryType2["ReactionsAndViews"] = "reactions_and_views";
  NotificationQueryType2["Shared"] = "shared";
  return NotificationQueryType2;
})(NotificationQueryType || {});
var NotificationSettingName = /* @__PURE__ */ ((NotificationSettingName2) => {
  NotificationSettingName2["AddedToWatchLaterNotification"] = "added_to_watch_later_notification";
  NotificationSettingName2["CommentMentionNotification"] = "comment_mention_notification";
  NotificationSettingName2["CommentReplyNotification"] = "comment_reply_notification";
  NotificationSettingName2["ExternalIngestionCompletedNotification"] = "external_ingestion_completed_notification";
  NotificationSettingName2["ExternalIngestionProcessingNotification"] = "external_ingestion_processing_notification";
  NotificationSettingName2["FirstVideoViewNotification"] = "first_video_view_notification";
  NotificationSettingName2["HighVideoViewsNotification"] = "high_video_views_notification";
  NotificationSettingName2["InsightsDigestNotification"] = "insights_digest_notification";
  NotificationSettingName2["InsightsMonthlyDigestNotification"] = "insights_monthly_digest_notification";
  NotificationSettingName2["InsightsViewMilestoneNotification"] = "insights_view_milestone_notification";
  NotificationSettingName2["NewFollowerNotification"] = "new_follower_notification";
  NotificationSettingName2["ReminderToRecordNotification"] = "reminder_to_record_notification";
  NotificationSettingName2["ReshareVideoNotification"] = "reshare_video_notification";
  NotificationSettingName2["RetranscriptionFailureNotification"] = "retranscription_failure_notification";
  NotificationSettingName2["RetranscriptionSuccessNotification"] = "retranscription_success_notification";
  NotificationSettingName2["SendWatchLaterReminderWeekdaysOnlySetting"] = "send_watch_later_reminder_weekdays_only_setting";
  NotificationSettingName2["ShareVideoNotification"] = "share_video_notification";
  NotificationSettingName2["SpaceAdminActionNotification"] = "space_admin_action_notification";
  NotificationSettingName2["SpaceAllHandsContentNotification"] = "space_all_hands_content_notification";
  NotificationSettingName2["SpaceContentNotification"] = "space_content_notification";
  NotificationSettingName2["SpaceInvitationNotification"] = "space_invitation_notification";
  NotificationSettingName2["SpaceStateChangeNotification"] = "space_state_change_notification";
  NotificationSettingName2["VideoCommentNotification"] = "video_comment_notification";
  NotificationSettingName2["VideoPrivacyChangeNotification"] = "video_privacy_change_notification";
  NotificationSettingName2["VideoReactionNotification"] = "video_reaction_notification";
  NotificationSettingName2["VideoTaskMentionNotification"] = "video_task_mention_notification";
  NotificationSettingName2["VideoTaskResponseNotification"] = "video_task_response_notification";
  NotificationSettingName2["VideoUsedAsWeaveClip"] = "video_used_as_weave_clip";
  NotificationSettingName2["WatchLaterReminderNotification"] = "watch_later_reminder_notification";
  NotificationSettingName2["WeaveVideoFirstView"] = "weave_video_first_view";
  return NotificationSettingName2;
})(NotificationSettingName || {});
var NotificationStatus = /* @__PURE__ */ ((NotificationStatus2) => {
  NotificationStatus2["Created"] = "created";
  NotificationStatus2["Delivered"] = "delivered";
  NotificationStatus2["Read"] = "read";
  NotificationStatus2["Seen"] = "seen";
  NotificationStatus2["Sent"] = "sent";
  return NotificationStatus2;
})(NotificationStatus || {});
var NotificationTrayType = /* @__PURE__ */ ((NotificationTrayType2) => {
  NotificationTrayType2["BulkReaction"] = "bulkReaction";
  NotificationTrayType2["BusinessAiTrialWelcome"] = "business_ai_trial_welcome";
  NotificationTrayType2["CalendarEfficiencyNotification"] = "calendar_efficiency_notification";
  NotificationTrayType2["Comment"] = "comment";
  NotificationTrayType2["CommentMention"] = "commentMention";
  NotificationTrayType2["ContentLimitApproaching"] = "contentLimitApproaching";
  NotificationTrayType2["ContentLimitReached"] = "contentLimitReached";
  NotificationTrayType2["CreatorLiteLimitApproaching"] = "creatorLiteLimitApproaching";
  NotificationTrayType2["CreatorLiteLimitReached"] = "creatorLiteLimitReached";
  NotificationTrayType2["ExternalIngestionCompleted"] = "externalIngestionCompleted";
  NotificationTrayType2["ExternalIngestionProcessing"] = "externalIngestionProcessing";
  NotificationTrayType2["HighVideoViewsNotification"] = "high_video_views_notification";
  NotificationTrayType2["IngestionIntegrationEnabledNotification"] = "ingestion_integration_enabled_notification";
  NotificationTrayType2["InsightsDigest"] = "insightsDigest";
  NotificationTrayType2["InsightsMonthlyDigestNotification"] = "insights_monthly_digest_notification";
  NotificationTrayType2["InsightsTimeSavedNotification"] = "insights_time_saved_notification";
  NotificationTrayType2["InsightsViewMilestoneNotification"] = "insights_view_milestone_notification";
  NotificationTrayType2["MembershipRoleChange"] = "membershipRoleChange";
  NotificationTrayType2["Newfollower"] = "newfollower";
  NotificationTrayType2["OrgInviteAcceptedWithIncentives"] = "org_invite_accepted_with_incentives";
  NotificationTrayType2["PostCommentMention"] = "postCommentMention";
  NotificationTrayType2["PostWorkspaceMigrationAdminNotification"] = "post_workspace_migration_admin_notification";
  NotificationTrayType2["PreWorkspaceMigrationAdminNotification"] = "pre_workspace_migration_admin_notification";
  NotificationTrayType2["Reaction"] = "reaction";
  NotificationTrayType2["RecordingNudgeAfterXViewsGivenNotification"] = "recording_nudge_after_x_views_given_notification";
  NotificationTrayType2["ReminderToRecordNotification"] = "reminder_to_record_notification";
  NotificationTrayType2["Reply"] = "reply";
  NotificationTrayType2["ReplyCommentMention"] = "replyCommentMention";
  NotificationTrayType2["ReshareVideo"] = "reshareVideo";
  NotificationTrayType2["RetranscriptionFailureNotification"] = "retranscription_failure_notification";
  NotificationTrayType2["RetranscriptionSuccessNotification"] = "retranscription_success_notification";
  NotificationTrayType2["SendWatchLaterReminderWeekdaysOnlySetting"] = "send_watch_later_reminder_weekdays_only_setting";
  NotificationTrayType2["ShareVideo"] = "shareVideo";
  NotificationTrayType2["SpaceAdminActionNotification"] = "space_admin_action_notification";
  NotificationTrayType2["SpaceAllHandsContentNotification"] = "space_all_hands_content_notification";
  NotificationTrayType2["SpaceContentNotification"] = "space_content_notification";
  NotificationTrayType2["SpaceInvitationNotification"] = "space_invitation_notification";
  NotificationTrayType2["SpaceItemMovedNotification"] = "space_item_moved_notification";
  NotificationTrayType2["SpaceStateChangeNotification"] = "space_state_change_notification";
  NotificationTrayType2["Vfv"] = "vfv";
  NotificationTrayType2["VideoPrivacyChange"] = "videoPrivacyChange";
  NotificationTrayType2["VideoTaskMentionNotification"] = "video_task_mention_notification";
  NotificationTrayType2["VideoTaskResponseNotification"] = "video_task_response_notification";
  NotificationTrayType2["VideoTrimCompleteNotification"] = "video_trim_complete_notification";
  NotificationTrayType2["VideoUsedAsWeaveClip"] = "video_used_as_weave_clip";
  NotificationTrayType2["WatchList"] = "watchList";
  NotificationTrayType2["WatchLaterReminderNotification"] = "watch_later_reminder_notification";
  NotificationTrayType2["WeaveVideoFirstView"] = "weave_video_first_view";
  NotificationTrayType2["WorkspaceInvitation"] = "workspaceInvitation";
  return NotificationTrayType2;
})(NotificationTrayType || {});
var NotificationType = /* @__PURE__ */ ((NotificationType2) => {
  NotificationType2["AddedToWatchLaterNotification"] = "added_to_watch_later_notification";
  NotificationType2["BusinessAiTrialWelcome"] = "business_ai_trial_welcome";
  NotificationType2["CalendarEfficiencyNotification"] = "calendar_efficiency_notification";
  NotificationType2["CommentReplyNotification"] = "comment_reply_notification";
  NotificationType2["ContentLimitApproachingNotification"] = "content_limit_approaching_notification";
  NotificationType2["ContentLimitReachedNotification"] = "content_limit_reached_notification";
  NotificationType2["CreatorLiteLimitApproachingNotification"] = "creator_lite_limit_approaching_notification";
  NotificationType2["CreatorLiteLimitReachedNotification"] = "creator_lite_limit_reached_notification";
  NotificationType2["ExternalIngestionCompletedNotification"] = "external_ingestion_completed_notification";
  NotificationType2["ExternalIngestionProcessingNotification"] = "external_ingestion_processing_notification";
  NotificationType2["FirstVideoViewNotification"] = "first_video_view_notification";
  NotificationType2["HighVideoViewsNotification"] = "high_video_views_notification";
  NotificationType2["IngestionIntegrationEnabledNotification"] = "ingestion_integration_enabled_notification";
  NotificationType2["InsightsDigestNotification"] = "insights_digest_notification";
  NotificationType2["InsightsMonthlyDigestNotification"] = "insights_monthly_digest_notification";
  NotificationType2["InsightsTimeSavedNotification"] = "insights_time_saved_notification";
  NotificationType2["InsightsViewMilestoneNotification"] = "insights_view_milestone_notification";
  NotificationType2["MembershipRoleChangeNotification"] = "membership_role_change_notification";
  NotificationType2["NewFollowerNotification"] = "new_follower_notification";
  NotificationType2["OrgInviteAcceptedWithIncentives"] = "org_invite_accepted_with_incentives";
  NotificationType2["PostCommentMentionNotification"] = "post_comment_mention_notification";
  NotificationType2["RecordingNudgeAfterXViewsGivenNotification"] = "recording_nudge_after_x_views_given_notification";
  NotificationType2["ReminderToRecordNotification"] = "reminder_to_record_notification";
  NotificationType2["ReplyCommentMentionNotification"] = "reply_comment_mention_notification";
  NotificationType2["ReshareVideoNotification"] = "reshare_video_notification";
  NotificationType2["RetranscriptionFailureNotification"] = "retranscription_failure_notification";
  NotificationType2["RetranscriptionSuccessNotification"] = "retranscription_success_notification";
  NotificationType2["ShareVideoNotification"] = "share_video_notification";
  NotificationType2["SpaceAdminActionNotification"] = "space_admin_action_notification";
  NotificationType2["SpaceAllHandsContentNotification"] = "space_all_hands_content_notification";
  NotificationType2["SpaceContentNotification"] = "space_content_notification";
  NotificationType2["SpaceInvitationNotification"] = "space_invitation_notification";
  NotificationType2["SpaceItemMovedNotification"] = "space_item_moved_notification";
  NotificationType2["SpaceStateChangeNotification"] = "space_state_change_notification";
  NotificationType2["VideoCommentNotification"] = "video_comment_notification";
  NotificationType2["VideoPrivacyChangeNotification"] = "video_privacy_change_notification";
  NotificationType2["VideoReactionNotification"] = "video_reaction_notification";
  NotificationType2["VideoTaskMentionNotification"] = "video_task_mention_notification";
  NotificationType2["VideoTaskResponseNotification"] = "video_task_response_notification";
  NotificationType2["VideoUsedAsWeaveClip"] = "video_used_as_weave_clip";
  NotificationType2["WeaveVideoFirstView"] = "weave_video_first_view";
  return NotificationType2;
})(NotificationType || {});
var NudgeType = /* @__PURE__ */ ((NudgeType2) => {
  NudgeType2["Affirmation"] = "affirmation";
  NudgeType2["Inquiry"] = "inquiry";
  return NudgeType2;
})(NudgeType || {});
var OrgRole = /* @__PURE__ */ ((OrgRole2) => {
  OrgRole2["Admin"] = "admin";
  OrgRole2["Creator"] = "creator";
  OrgRole2["CreatorLite"] = "creator_lite";
  OrgRole2["Guest"] = "guest";
  OrgRole2["Viewer"] = "viewer";
  return OrgRole2;
})(OrgRole || {});
var OrganizationMemberRole = /* @__PURE__ */ ((OrganizationMemberRole2) => {
  OrganizationMemberRole2["Admin"] = "admin";
  OrganizationMemberRole2["Creator"] = "creator";
  OrganizationMemberRole2["CreatorLite"] = "creator_lite";
  OrganizationMemberRole2["Guest"] = "guest";
  OrganizationMemberRole2["Viewer"] = "viewer";
  return OrganizationMemberRole2;
})(OrganizationMemberRole || {});
var OrganizationMemberStatus = /* @__PURE__ */ ((OrganizationMemberStatus2) => {
  OrganizationMemberStatus2["Active"] = "active";
  OrganizationMemberStatus2["Deactivated"] = "deactivated";
  OrganizationMemberStatus2["DeactivatedScim"] = "deactivated_scim";
  return OrganizationMemberStatus2;
})(OrganizationMemberStatus || {});
var ParticipantsInclude = /* @__PURE__ */ ((ParticipantsInclude2) => {
  ParticipantsInclude2["Anyone"] = "anyone";
  ParticipantsInclude2["External"] = "external";
  ParticipantsInclude2["Internal"] = "internal";
  return ParticipantsInclude2;
})(ParticipantsInclude || {});
var PhraseRangeType = /* @__PURE__ */ ((PhraseRangeType2) => {
  PhraseRangeType2["Punct"] = "punct";
  PhraseRangeType2["Text"] = "text";
  return PhraseRangeType2;
})(PhraseRangeType || {});
var PlanInterval = /* @__PURE__ */ ((PlanInterval2) => {
  PlanInterval2["Month"] = "month";
  PlanInterval2["Year"] = "year";
  return PlanInterval2;
})(PlanInterval || {});
var PresetVariablesEnum = /* @__PURE__ */ ((PresetVariablesEnum2) => {
  PresetVariablesEnum2["CompanyName"] = "company_name";
  PresetVariablesEnum2["Name"] = "name";
  PresetVariablesEnum2["Variable"] = "variable";
  return PresetVariablesEnum2;
})(PresetVariablesEnum || {});
var ProcessingServices = /* @__PURE__ */ ((ProcessingServices2) => {
  ProcessingServices2["AssemblyAiAsync"] = "assembly_ai_async";
  ProcessingServices2["InstantWhisper"] = "instant_whisper";
  ProcessingServices2["RevAiAsync"] = "rev_ai_async";
  return ProcessingServices2;
})(ProcessingServices || {});
var Product = /* @__PURE__ */ ((Product2) => {
  Product2["Ai"] = "AI";
  Product2["Business"] = "business";
  Product2["Enterprise"] = "enterprise";
  return Product2;
})(Product || {});
var PublicVideoCommentType = /* @__PURE__ */ ((PublicVideoCommentType2) => {
  PublicVideoCommentType2["Comment"] = "COMMENT";
  PublicVideoCommentType2["Reply"] = "REPLY";
  return PublicVideoCommentType2;
})(PublicVideoCommentType || {});
var QuantitySmartSyncAction = /* @__PURE__ */ ((QuantitySmartSyncAction2) => {
  QuantitySmartSyncAction2["Clear"] = "clear";
  QuantitySmartSyncAction2["Process"] = "process";
  return QuantitySmartSyncAction2;
})(QuantitySmartSyncAction || {});
var ReactionType = /* @__PURE__ */ ((ReactionType2) => {
  ReactionType2["Extended"] = "extended";
  ReactionType2["Loom"] = "loom";
  return ReactionType2;
})(ReactionType || {});
var RecordingClient = /* @__PURE__ */ ((RecordingClient2) => {
  RecordingClient2["Android"] = "android";
  RecordingClient2["Desktop"] = "desktop";
  RecordingClient2["Extension"] = "extension";
  RecordingClient2["Ios"] = "ios";
  RecordingClient2["MeetingBot"] = "meeting_bot";
  RecordingClient2["SdkRecorder"] = "sdk_recorder";
  return RecordingClient2;
})(RecordingClient || {});
var RecordingType = /* @__PURE__ */ ((RecordingType2) => {
  RecordingType2["Cam"] = "cam";
  RecordingType2["Screen"] = "screen";
  RecordingType2["ScreenCam"] = "screen_cam";
  return RecordingType2;
})(RecordingType || {});
var RecordingVersion = /* @__PURE__ */ ((RecordingVersion2) => {
  RecordingVersion2["Default"] = "default";
  RecordingVersion2["Unknown"] = "unknown";
  RecordingVersion2["V2"] = "v2";
  RecordingVersion2["V3"] = "v3";
  RecordingVersion2["V4"] = "v4";
  RecordingVersion2["V5"] = "v5";
  RecordingVersion2["V6"] = "v6";
  RecordingVersion2["V7"] = "v7";
  RecordingVersion2["V8"] = "v8";
  return RecordingVersion2;
})(RecordingVersion || {});
var RegenerationType = /* @__PURE__ */ ((RegenerationType2) => {
  RegenerationType2["Download"] = "DOWNLOAD";
  RegenerationType2["Mp4Fallback"] = "MP4_FALLBACK";
  return RegenerationType2;
})(RegenerationType || {});
var RegularUserActivityType = /* @__PURE__ */ ((RegularUserActivityType2) => {
  RegularUserActivityType2["Comment"] = "COMMENT";
  RegularUserActivityType2["VideoReaction"] = "VIDEO_REACTION";
  RegularUserActivityType2["View"] = "VIEW";
  return RegularUserActivityType2;
})(RegularUserActivityType || {});
var RequestToJoinWorkspaceForVideoStatus = /* @__PURE__ */ ((RequestToJoinWorkspaceForVideoStatus2) => {
  RequestToJoinWorkspaceForVideoStatus2["FailureSso"] = "failure_sso";
  RequestToJoinWorkspaceForVideoStatus2["Success"] = "success";
  return RequestToJoinWorkspaceForVideoStatus2;
})(RequestToJoinWorkspaceForVideoStatus || {});
var RequestToJoinWorkspaceStatus = /* @__PURE__ */ ((RequestToJoinWorkspaceStatus2) => {
  RequestToJoinWorkspaceStatus2["AlreadyMember"] = "already_member";
  RequestToJoinWorkspaceStatus2["AlreadyRequested"] = "already_requested";
  RequestToJoinWorkspaceStatus2["Autojoined"] = "autojoined";
  RequestToJoinWorkspaceStatus2["DomainNotAssociated"] = "domain_not_associated";
  RequestToJoinWorkspaceStatus2["RequestFailed"] = "request_failed";
  RequestToJoinWorkspaceStatus2["Requested"] = "requested";
  return RequestToJoinWorkspaceStatus2;
})(RequestToJoinWorkspaceStatus || {});
var RequestToUpgradeWorkspaceStatusType = /* @__PURE__ */ ((RequestToUpgradeWorkspaceStatusType2) => {
  RequestToUpgradeWorkspaceStatusType2["Approved"] = "APPROVED";
  RequestToUpgradeWorkspaceStatusType2["Pending"] = "PENDING";
  return RequestToUpgradeWorkspaceStatusType2;
})(RequestToUpgradeWorkspaceStatusType || {});
var RequestToUpgradeWorkspaceTargetAddOnType = /* @__PURE__ */ ((RequestToUpgradeWorkspaceTargetAddOnType2) => {
  RequestToUpgradeWorkspaceTargetAddOnType2["Ai"] = "AI";
  return RequestToUpgradeWorkspaceTargetAddOnType2;
})(RequestToUpgradeWorkspaceTargetAddOnType || {});
var RequestToUpgradeWorkspaceTargetPlanType = /* @__PURE__ */ ((RequestToUpgradeWorkspaceTargetPlanType2) => {
  RequestToUpgradeWorkspaceTargetPlanType2["Business"] = "business";
  RequestToUpgradeWorkspaceTargetPlanType2["Enterprise"] = "enterprise";
  return RequestToUpgradeWorkspaceTargetPlanType2;
})(RequestToUpgradeWorkspaceTargetPlanType || {});
var RequestToUpgradeWorkspaceTargetRoleType = /* @__PURE__ */ ((RequestToUpgradeWorkspaceTargetRoleType2) => {
  RequestToUpgradeWorkspaceTargetRoleType2["Admin"] = "admin";
  RequestToUpgradeWorkspaceTargetRoleType2["Creator"] = "creator";
  return RequestToUpgradeWorkspaceTargetRoleType2;
})(RequestToUpgradeWorkspaceTargetRoleType || {});
var RequestToUpgradeWorkspaceUpgradeType = /* @__PURE__ */ ((RequestToUpgradeWorkspaceUpgradeType2) => {
  RequestToUpgradeWorkspaceUpgradeType2["AddOn"] = "add_on";
  RequestToUpgradeWorkspaceUpgradeType2["Plan"] = "plan";
  RequestToUpgradeWorkspaceUpgradeType2["Role"] = "role";
  return RequestToUpgradeWorkspaceUpgradeType2;
})(RequestToUpgradeWorkspaceUpgradeType || {});
var RequestVideoAccessFlow = /* @__PURE__ */ ((RequestVideoAccessFlow2) => {
  RequestVideoAccessFlow2["AtlassianLogin"] = "ATLASSIAN_LOGIN";
  RequestVideoAccessFlow2["AtlassianRequestWorkspaceAccess"] = "ATLASSIAN_REQUEST_WORKSPACE_ACCESS";
  RequestVideoAccessFlow2["LoomLogin"] = "LOOM_LOGIN";
  RequestVideoAccessFlow2["LoomRequestVideoAndWorkspaceAccessFlow"] = "LOOM_REQUEST_VIDEO_AND_WORKSPACE_ACCESS_FLOW";
  RequestVideoAccessFlow2["MergeAccount"] = "MERGE_ACCOUNT";
  RequestVideoAccessFlow2["None"] = "NONE";
  RequestVideoAccessFlow2["RequestIndividualVideoAccess"] = "REQUEST_INDIVIDUAL_VIDEO_ACCESS";
  return RequestVideoAccessFlow2;
})(RequestVideoAccessFlow || {});
var ResumeFailedVideoUploadInstruction = /* @__PURE__ */ ((ResumeFailedVideoUploadInstruction2) => {
  ResumeFailedVideoUploadInstruction2["Delete"] = "DELETE";
  ResumeFailedVideoUploadInstruction2["Resume"] = "RESUME";
  ResumeFailedVideoUploadInstruction2["Skip"] = "SKIP";
  return ResumeFailedVideoUploadInstruction2;
})(ResumeFailedVideoUploadInstruction || {});
var ScreenshotAccessLevel = /* @__PURE__ */ ((ScreenshotAccessLevel2) => {
  ScreenshotAccessLevel2["Read"] = "read";
  ScreenshotAccessLevel2["Readwrite"] = "readwrite";
  return ScreenshotAccessLevel2;
})(ScreenshotAccessLevel || {});
var ScreenshotPrivacyTypes = /* @__PURE__ */ ((ScreenshotPrivacyTypes2) => {
  ScreenshotPrivacyTypes2["Private"] = "private";
  ScreenshotPrivacyTypes2["Public"] = "public";
  ScreenshotPrivacyTypes2["Workspace"] = "workspace";
  return ScreenshotPrivacyTypes2;
})(ScreenshotPrivacyTypes || {});
var ScreenshotSource = /* @__PURE__ */ ((ScreenshotSource2) => {
  ScreenshotSource2["EditedOriginal"] = "edited_original";
  ScreenshotSource2["EditedThumbnail"] = "edited_thumbnail";
  ScreenshotSource2["Original"] = "original";
  ScreenshotSource2["Thumbnail"] = "thumbnail";
  return ScreenshotSource2;
})(ScreenshotSource || {});
var SearchModelType = /* @__PURE__ */ ((SearchModelType2) => {
  SearchModelType2["Folder"] = "folder";
  SearchModelType2["Video"] = "video";
  return SearchModelType2;
})(SearchModelType || {});
var ShareMessageType = /* @__PURE__ */ ((ShareMessageType2) => {
  ShareMessageType2["Chat"] = "chat";
  ShareMessageType2["Email"] = "email";
  return ShareMessageType2;
})(ShareMessageType || {});
var SpacePrivacy = /* @__PURE__ */ ((SpacePrivacy2) => {
  SpacePrivacy2["Workspace"] = "workspace";
  return SpacePrivacy2;
})(SpacePrivacy || {});
var StreamHubConsumerQueue = /* @__PURE__ */ ((StreamHubConsumerQueue2) => {
  StreamHubConsumerQueue2["StreamhubConsumerBilling"] = "streamhub_consumer_billing";
  StreamHubConsumerQueue2["StreamhubConsumerCloudProvisioner"] = "streamhub_consumer_cloud_provisioner";
  StreamHubConsumerQueue2["StreamhubConsumerCsam"] = "streamhub_consumer_csam";
  StreamHubConsumerQueue2["StreamhubConsumerGroups"] = "streamhub_consumer_groups";
  StreamHubConsumerQueue2["StreamhubConsumerIdentity"] = "streamhub_consumer_identity";
  StreamHubConsumerQueue2["StreamhubConsumerMeetings"] = "streamhub_consumer_meetings";
  StreamHubConsumerQueue2["StreamhubConsumerPermissionsEvents"] = "streamhub_consumer_permissions_events";
  StreamHubConsumerQueue2["StreamhubConsumerProfileUpdates"] = "streamhub_consumer_profile_updates";
  StreamHubConsumerQueue2["StreamhubConsumerSessionDeletion"] = "streamhub_consumer_session_deletion";
  StreamHubConsumerQueue2["StreamhubConsumerUserDeletion"] = "streamhub_consumer_user_deletion";
  return StreamHubConsumerQueue2;
})(StreamHubConsumerQueue || {});
var StripeErrorType = /* @__PURE__ */ ((StripeErrorType2) => {
  StripeErrorType2["StripeApiError"] = "StripeAPIError";
  StripeErrorType2["StripeAuthenticationError"] = "StripeAuthenticationError";
  StripeErrorType2["StripeCardError"] = "StripeCardError";
  StripeErrorType2["StripeConnectionError"] = "StripeConnectionError";
  StripeErrorType2["StripeError"] = "StripeError";
  StripeErrorType2["StripeIdempotencyError"] = "StripeIdempotencyError";
  StripeErrorType2["StripeInvalidGrantError"] = "StripeInvalidGrantError";
  StripeErrorType2["StripeInvalidRequestError"] = "StripeInvalidRequestError";
  StripeErrorType2["StripePermissionError"] = "StripePermissionError";
  StripeErrorType2["StripeRateLimitError"] = "StripeRateLimitError";
  StripeErrorType2["StripeSignatureVerificationError"] = "StripeSignatureVerificationError";
  return StripeErrorType2;
})(StripeErrorType || {});
var SubscriptionScheduleStatus = /* @__PURE__ */ ((SubscriptionScheduleStatus2) => {
  SubscriptionScheduleStatus2["Active"] = "active";
  SubscriptionScheduleStatus2["Canceled"] = "canceled";
  SubscriptionScheduleStatus2["Completed"] = "completed";
  SubscriptionScheduleStatus2["NotStarted"] = "not_started";
  SubscriptionScheduleStatus2["Released"] = "released";
  return SubscriptionScheduleStatus2;
})(SubscriptionScheduleStatus || {});
var SuggestedPlaybackRate = /* @__PURE__ */ ((SuggestedPlaybackRate2) => {
  SuggestedPlaybackRate2["None"] = "none";
  SuggestedPlaybackRate2["X80"] = "x80";
  SuggestedPlaybackRate2["X100"] = "x100";
  SuggestedPlaybackRate2["X120"] = "x120";
  SuggestedPlaybackRate2["X150"] = "x150";
  SuggestedPlaybackRate2["X170"] = "x170";
  SuggestedPlaybackRate2["X200"] = "x200";
  SuggestedPlaybackRate2["X250"] = "x250";
  return SuggestedPlaybackRate2;
})(SuggestedPlaybackRate || {});
var SummaryNotification = /* @__PURE__ */ ((SummaryNotification2) => {
  SummaryNotification2["Disabled"] = "disabled";
  SummaryNotification2["Everyone"] = "everyone";
  SummaryNotification2["ExternalOnly"] = "external_only";
  SummaryNotification2["InternalOnly"] = "internal_only";
  SummaryNotification2["RecorderOnly"] = "recorder_only";
  return SummaryNotification2;
})(SummaryNotification || {});
var TermMatch = /* @__PURE__ */ ((TermMatch2) => {
  TermMatch2["Excludes"] = "excludes";
  TermMatch2["Includes"] = "includes";
  TermMatch2["Is"] = "is";
  return TermMatch2;
})(TermMatch || {});
var ThirdTierVariation = /* @__PURE__ */ ((ThirdTierVariation2) => {
  ThirdTierVariation2["Control"] = "control";
  ThirdTierVariation2["Dec_2022PricingPackage"] = "dec_2022_pricing_package";
  ThirdTierVariation2["Ineligible"] = "ineligible";
  ThirdTierVariation2["Nov_2023PricingPackage"] = "nov_2023_pricing_package";
  ThirdTierVariation2["PhaseTwoAggressive"] = "phase_two_aggressive";
  ThirdTierVariation2["PhaseTwoConservative"] = "phase_two_conservative";
  return ThirdTierVariation2;
})(ThirdTierVariation || {});
var TimestampType = /* @__PURE__ */ ((TimestampType2) => {
  TimestampType2["Day"] = "DAY";
  TimestampType2["Month"] = "MONTH";
  return TimestampType2;
})(TimestampType || {});
var TranscriptionStatuses = /* @__PURE__ */ ((TranscriptionStatuses2) => {
  TranscriptionStatuses2["Failed"] = "failed";
  TranscriptionStatuses2["InProgress"] = "in_progress";
  TranscriptionStatuses2["NoAudio"] = "no_audio";
  TranscriptionStatuses2["Partial"] = "partial";
  TranscriptionStatuses2["ReadyToTranscribe"] = "ready_to_transcribe";
  TranscriptionStatuses2["ShortDuration"] = "short_duration";
  TranscriptionStatuses2["Started"] = "started";
  TranscriptionStatuses2["Success"] = "success";
  TranscriptionStatuses2["TranscodingFailure"] = "transcoding_failure";
  TranscriptionStatuses2["Trimming"] = "trimming";
  TranscriptionStatuses2["UnsupportedLanguage"] = "unsupported_language";
  return TranscriptionStatuses2;
})(TranscriptionStatuses || {});
var TrendingAlgorithm = /* @__PURE__ */ ((TrendingAlgorithm2) => {
  TrendingAlgorithm2["TumblingTrending"] = "tumbling_trending";
  TrendingAlgorithm2["TumblingTrendingEnsemble"] = "tumbling_trending_ensemble";
  return TrendingAlgorithm2;
})(TrendingAlgorithm || {});
var TrendingTagAlgorithm = /* @__PURE__ */ ((TrendingTagAlgorithm2) => {
  TrendingTagAlgorithm2["TumblingTrendingTags"] = "tumbling_trending_tags";
  TrendingTagAlgorithm2["TumblingTrendingTagsEnsemble"] = "tumbling_trending_tags_ensemble";
  return TrendingTagAlgorithm2;
})(TrendingTagAlgorithm || {});
var TtsCodes = /* @__PURE__ */ ((TtsCodes2) => {
  TtsCodes2["Failure"] = "FAILURE";
  TtsCodes2["Ignored"] = "IGNORED";
  TtsCodes2["Pending"] = "PENDING";
  TtsCodes2["Received"] = "RECEIVED";
  TtsCodes2["Rejected"] = "REJECTED";
  TtsCodes2["Retry"] = "RETRY";
  TtsCodes2["Revoked"] = "REVOKED";
  TtsCodes2["Started"] = "STARTED";
  TtsCodes2["Success"] = "SUCCESS";
  return TtsCodes2;
})(TtsCodes || {});
var TtsFeedbackType = /* @__PURE__ */ ((TtsFeedbackType2) => {
  TtsFeedbackType2["Negative"] = "negative";
  TtsFeedbackType2["Positive"] = "positive";
  return TtsFeedbackType2;
})(TtsFeedbackType || {});
var TtsPriorityCode = /* @__PURE__ */ ((TtsPriorityCode2) => {
  TtsPriorityCode2["Default"] = "default";
  TtsPriorityCode2["High"] = "high";
  TtsPriorityCode2["Low"] = "low";
  return TtsPriorityCode2;
})(TtsPriorityCode || {});
var UiLocation = /* @__PURE__ */ ((UiLocation2) => {
  UiLocation2["Dashboard"] = "dashboard";
  UiLocation2["PostRecord"] = "post_record";
  UiLocation2["SharePage"] = "share_page";
  return UiLocation2;
})(UiLocation || {});
var UpdateConfluenceMeetingNotesLocationErrorType = /* @__PURE__ */ ((UpdateConfluenceMeetingNotesLocationErrorType2) => {
  UpdateConfluenceMeetingNotesLocationErrorType2["Exception"] = "EXCEPTION";
  UpdateConfluenceMeetingNotesLocationErrorType2["ReadPermissionError"] = "READ_PERMISSION_ERROR";
  UpdateConfluenceMeetingNotesLocationErrorType2["ValidationError"] = "VALIDATION_ERROR";
  UpdateConfluenceMeetingNotesLocationErrorType2["WritePermissionError"] = "WRITE_PERMISSION_ERROR";
  return UpdateConfluenceMeetingNotesLocationErrorType2;
})(UpdateConfluenceMeetingNotesLocationErrorType || {});
var UserIdentitieProviderEnum = /* @__PURE__ */ ((UserIdentitieProviderEnum2) => {
  UserIdentitieProviderEnum2["Apple"] = "apple";
  UserIdentitieProviderEnum2["Google"] = "google";
  UserIdentitieProviderEnum2["Slack"] = "slack";
  UserIdentitieProviderEnum2["Windows"] = "windows";
  UserIdentitieProviderEnum2["Workos"] = "workos";
  return UserIdentitieProviderEnum2;
})(UserIdentitieProviderEnum || {});
var UserStatusEnum = /* @__PURE__ */ ((UserStatusEnum2) => {
  UserStatusEnum2["Banned"] = "BANNED";
  UserStatusEnum2["Deactivated"] = "DEACTIVATED";
  UserStatusEnum2["DeactivatedScim"] = "DEACTIVATED_SCIM";
  UserStatusEnum2["NeedsEmailVerification"] = "NEEDS_EMAIL_VERIFICATION";
  UserStatusEnum2["Verified"] = "VERIFIED";
  return UserStatusEnum2;
})(UserStatusEnum || {});
var VideoAccessLevel = /* @__PURE__ */ ((VideoAccessLevel2) => {
  VideoAccessLevel2["Read"] = "read";
  VideoAccessLevel2["Readwrite"] = "readwrite";
  return VideoAccessLevel2;
})(VideoAccessLevel || {});
var VideoAclEntryType = /* @__PURE__ */ ((VideoAclEntryType2) => {
  VideoAclEntryType2["Space"] = "space";
  VideoAclEntryType2["User"] = "user";
  VideoAclEntryType2["UserEmail"] = "userEmail";
  return VideoAclEntryType2;
})(VideoAclEntryType || {});
var VideoActivitySource = /* @__PURE__ */ ((VideoActivitySource2) => {
  VideoActivitySource2["Auto"] = "auto";
  VideoActivitySource2["User"] = "user";
  return VideoActivitySource2;
})(VideoActivitySource || {});
var VideoActivityType = /* @__PURE__ */ ((VideoActivityType2) => {
  VideoActivityType2["Comment"] = "comment";
  VideoActivityType2["Task"] = "task";
  return VideoActivityType2;
})(VideoActivityType || {});
var VideoLanguage = /* @__PURE__ */ ((VideoLanguage2) => {
  VideoLanguage2["Af"] = "af";
  VideoLanguage2["Am"] = "am";
  VideoLanguage2["As"] = "as";
  VideoLanguage2["Ba"] = "ba";
  VideoLanguage2["Be"] = "be";
  VideoLanguage2["Bg"] = "bg";
  VideoLanguage2["Bn"] = "bn";
  VideoLanguage2["Bo"] = "bo";
  VideoLanguage2["Br"] = "br";
  VideoLanguage2["Bs"] = "bs";
  VideoLanguage2["Ca"] = "ca";
  VideoLanguage2["Cs"] = "cs";
  VideoLanguage2["Cy"] = "cy";
  VideoLanguage2["Da"] = "da";
  VideoLanguage2["De"] = "de";
  VideoLanguage2["El"] = "el";
  VideoLanguage2["En"] = "en";
  VideoLanguage2["Es"] = "es";
  VideoLanguage2["Et"] = "et";
  VideoLanguage2["Eu"] = "eu";
  VideoLanguage2["Fi"] = "fi";
  VideoLanguage2["Fo"] = "fo";
  VideoLanguage2["Fr"] = "fr";
  VideoLanguage2["Gl"] = "gl";
  VideoLanguage2["Gu"] = "gu";
  VideoLanguage2["Ha"] = "ha";
  VideoLanguage2["Haw"] = "haw";
  VideoLanguage2["Hi"] = "hi";
  VideoLanguage2["Hr"] = "hr";
  VideoLanguage2["Ht"] = "ht";
  VideoLanguage2["Hu"] = "hu";
  VideoLanguage2["Hy"] = "hy";
  VideoLanguage2["Id"] = "id";
  VideoLanguage2["Is"] = "is";
  VideoLanguage2["It"] = "it";
  VideoLanguage2["Ja"] = "ja";
  VideoLanguage2["Jw"] = "jw";
  VideoLanguage2["Ka"] = "ka";
  VideoLanguage2["Kk"] = "kk";
  VideoLanguage2["Km"] = "km";
  VideoLanguage2["Kn"] = "kn";
  VideoLanguage2["Ko"] = "ko";
  VideoLanguage2["La"] = "la";
  VideoLanguage2["Lb"] = "lb";
  VideoLanguage2["Ln"] = "ln";
  VideoLanguage2["Lo"] = "lo";
  VideoLanguage2["Lt"] = "lt";
  VideoLanguage2["Lv"] = "lv";
  VideoLanguage2["Mg"] = "mg";
  VideoLanguage2["Mi"] = "mi";
  VideoLanguage2["Mk"] = "mk";
  VideoLanguage2["Ml"] = "ml";
  VideoLanguage2["Mn"] = "mn";
  VideoLanguage2["Mr"] = "mr";
  VideoLanguage2["Ms"] = "ms";
  VideoLanguage2["Mt"] = "mt";
  VideoLanguage2["My"] = "my";
  VideoLanguage2["Ne"] = "ne";
  VideoLanguage2["Nl"] = "nl";
  VideoLanguage2["Nn"] = "nn";
  VideoLanguage2["No"] = "no";
  VideoLanguage2["Oc"] = "oc";
  VideoLanguage2["Pa"] = "pa";
  VideoLanguage2["Pl"] = "pl";
  VideoLanguage2["Ps"] = "ps";
  VideoLanguage2["Pt"] = "pt";
  VideoLanguage2["Ro"] = "ro";
  VideoLanguage2["Ru"] = "ru";
  VideoLanguage2["Sa"] = "sa";
  VideoLanguage2["Sd"] = "sd";
  VideoLanguage2["Si"] = "si";
  VideoLanguage2["Sk"] = "sk";
  VideoLanguage2["Sl"] = "sl";
  VideoLanguage2["Sn"] = "sn";
  VideoLanguage2["So"] = "so";
  VideoLanguage2["Sq"] = "sq";
  VideoLanguage2["Sr"] = "sr";
  VideoLanguage2["Su"] = "su";
  VideoLanguage2["Sv"] = "sv";
  VideoLanguage2["Sw"] = "sw";
  VideoLanguage2["Ta"] = "ta";
  VideoLanguage2["Te"] = "te";
  VideoLanguage2["Tg"] = "tg";
  VideoLanguage2["Th"] = "th";
  VideoLanguage2["Tk"] = "tk";
  VideoLanguage2["Tl"] = "tl";
  VideoLanguage2["Tr"] = "tr";
  VideoLanguage2["Tt"] = "tt";
  VideoLanguage2["Uk"] = "uk";
  VideoLanguage2["Unknown"] = "unknown";
  VideoLanguage2["Uz"] = "uz";
  VideoLanguage2["Vi"] = "vi";
  VideoLanguage2["Yi"] = "yi";
  VideoLanguage2["Yo"] = "yo";
  VideoLanguage2["Zh"] = "zh";
  return VideoLanguage2;
})(VideoLanguage || {});
var VideoPersonalizationType = /* @__PURE__ */ ((VideoPersonalizationType2) => {
  VideoPersonalizationType2["Audio"] = "Audio";
  VideoPersonalizationType2["Title"] = "Title";
  return VideoPersonalizationType2;
})(VideoPersonalizationType || {});
var VideoPrivacyProperty = /* @__PURE__ */ ((VideoPrivacyProperty2) => {
  VideoPrivacyProperty2["Owner"] = "owner";
  VideoPrivacyProperty2["Public"] = "public";
  VideoPrivacyProperty2["Workspace"] = "workspace";
  return VideoPrivacyProperty2;
})(VideoPrivacyProperty || {});
var VideoPrivacyStatus = /* @__PURE__ */ ((VideoPrivacyStatus2) => {
  VideoPrivacyStatus2["Owner"] = "owner";
  VideoPrivacyStatus2["Public"] = "public";
  VideoPrivacyStatus2["Workspace"] = "workspace";
  return VideoPrivacyStatus2;
})(VideoPrivacyStatus || {});
var VideoPropertyType = /* @__PURE__ */ ((VideoPropertyType2) => {
  VideoPropertyType2["AffirmationAiStatus"] = "affirmation_ai_status";
  VideoPropertyType2["AutoChaptersStatus"] = "auto_chapters_status";
  VideoPropertyType2["AutoSummaryStatus"] = "auto_summary_status";
  VideoPropertyType2["AutoTasksStatus"] = "auto_tasks_status";
  VideoPropertyType2["AutoTitleStatus"] = "auto_title_status";
  VideoPropertyType2["AutoTrimSilenceAndFillerWords"] = "auto_trim_silence_and_filler_words";
  VideoPropertyType2["AutoZoomsStatus"] = "auto_zooms_status";
  VideoPropertyType2["BooleanValue"] = "booleanValue";
  VideoPropertyType2["Chapters"] = "chapters";
  VideoPropertyType2["DismissWorkflowSneekpeek"] = "dismiss_workflow_sneekpeek";
  VideoPropertyType2["EmailGateVideoType"] = "email_gate_video_type";
  VideoPropertyType2["ExpirationDate"] = "expiration_date";
  VideoPropertyType2["GenVideoDraftId"] = "gen_video_draft_id";
  VideoPropertyType2["InquiryAiStatus"] = "inquiry_ai_status";
  VideoPropertyType2["JsonValue"] = "jsonValue";
  VideoPropertyType2["LoomCategory"] = "loom_category";
  VideoPropertyType2["Meeting"] = "meeting";
  VideoPropertyType2["NumberValue"] = "numberValue";
  VideoPropertyType2["PromptOverrides"] = "prompt_overrides";
  VideoPropertyType2["RecordingDocumentationType"] = "recording_documentation_type";
  VideoPropertyType2["RewatchImport"] = "rewatch_import";
  VideoPropertyType2["SalesforceEngagementTracking"] = "salesforce_engagement_tracking";
  VideoPropertyType2["StringValue"] = "stringValue";
  VideoPropertyType2["StylizedCaptions"] = "stylized_captions";
  VideoPropertyType2["SummaryPromptOverride"] = "summary_prompt_override";
  VideoPropertyType2["TranscriptionLanguage"] = "transcription_language";
  VideoPropertyType2["VariablesRecipientEmail"] = "variablesRecipientEmail";
  VideoPropertyType2["VideoVariables"] = "video_variables";
  VideoPropertyType2["ViewerCaptionsOn"] = "viewer_captions_on";
  return VideoPropertyType2;
})(VideoPropertyType || {});
var VideoVisibilityProperty = /* @__PURE__ */ ((VideoVisibilityProperty2) => {
  VideoVisibilityProperty2["Owner"] = "owner";
  VideoVisibilityProperty2["Public"] = "public";
  VideoVisibilityProperty2["Workspace"] = "workspace";
  return VideoVisibilityProperty2;
})(VideoVisibilityProperty || {});
var VideoVisibilityType = /* @__PURE__ */ ((VideoVisibilityType2) => {
  VideoVisibilityType2["Owner"] = "owner";
  VideoVisibilityType2["Public"] = "public";
  VideoVisibilityType2["Workspace"] = "workspace";
  return VideoVisibilityType2;
})(VideoVisibilityType || {});
var VideoWaveformGenerationStatuses = /* @__PURE__ */ ((VideoWaveformGenerationStatuses2) => {
  VideoWaveformGenerationStatuses2["Failure"] = "failure";
  VideoWaveformGenerationStatuses2["InProgress"] = "inProgress";
  VideoWaveformGenerationStatuses2["Success"] = "success";
  return VideoWaveformGenerationStatuses2;
})(VideoWaveformGenerationStatuses || {});
var WaveformGenerationStatus = /* @__PURE__ */ ((WaveformGenerationStatus2) => {
  WaveformGenerationStatus2["Failure"] = "failure";
  WaveformGenerationStatus2["InProgress"] = "inProgress";
  WaveformGenerationStatus2["Success"] = "success";
  return WaveformGenerationStatus2;
})(WaveformGenerationStatus || {});
var WordType = /* @__PURE__ */ ((WordType2) => {
  WordType2["Punct"] = "punct";
  WordType2["Silence"] = "silence";
  WordType2["Text"] = "text";
  return WordType2;
})(WordType || {});
var WorkflowTemplateType = /* @__PURE__ */ ((WorkflowTemplateType2) => {
  WorkflowTemplateType2["BugReport"] = "BUG_REPORT";
  WorkflowTemplateType2["Message"] = "MESSAGE";
  WorkflowTemplateType2["CategorizationFactuality"] = "categorization_factuality";
  WorkflowTemplateType2["Chat"] = "chat";
  WorkflowTemplateType2["CodeDocs"] = "code_docs";
  WorkflowTemplateType2["Email"] = "email";
  WorkflowTemplateType2["IssueGeneration"] = "issue_generation";
  WorkflowTemplateType2["Jira"] = "jira";
  WorkflowTemplateType2["Linear"] = "linear";
  WorkflowTemplateType2["LoomCategorization"] = "loom_categorization";
  WorkflowTemplateType2["PrDescription"] = "pr_description";
  WorkflowTemplateType2["QaSteps"] = "qa_steps";
  WorkflowTemplateType2["Sop"] = "sop";
  WorkflowTemplateType2["StepByStep"] = "step_by_step";
  WorkflowTemplateType2["Summary"] = "summary";
  return WorkflowTemplateType2;
})(WorkflowTemplateType || {});
var WorkspaceAtlassianProvisioningStatus = /* @__PURE__ */ ((WorkspaceAtlassianProvisioningStatus2) => {
  WorkspaceAtlassianProvisioningStatus2["Active"] = "active";
  WorkspaceAtlassianProvisioningStatus2["Destroyed"] = "destroyed";
  WorkspaceAtlassianProvisioningStatus2["Suspended"] = "suspended";
  return WorkspaceAtlassianProvisioningStatus2;
})(WorkspaceAtlassianProvisioningStatus || {});
var WorkspaceAuditLogAction = /* @__PURE__ */ ((WorkspaceAuditLogAction2) => {
  WorkspaceAuditLogAction2["ActionMembershipDsyncRoleChange"] = "action_membership_dsync_role_change";
  WorkspaceAuditLogAction2["ActionMembershipScimRoleChange"] = "action_membership_scim_role_change";
  WorkspaceAuditLogAction2["ActionScheduleSubscriptionPause"] = "action_schedule_subscription_pause";
  WorkspaceAuditLogAction2["ActionSpaceCreated"] = "action_space_created";
  WorkspaceAuditLogAction2["ActionSpaceDeleted"] = "action_space_deleted";
  WorkspaceAuditLogAction2["ActionSpaceGroupsUpdated"] = "action_space_groups_updated";
  WorkspaceAuditLogAction2["ActionSpaceMembersAdded"] = "action_space_members_added";
  WorkspaceAuditLogAction2["ActionSpaceMembersRemoved"] = "action_space_members_removed";
  WorkspaceAuditLogAction2["ActionSpacePrivacyUpdated"] = "action_space_privacy_updated";
  WorkspaceAuditLogAction2["ActionSpaceUpdatedWithDataAgeLimit"] = "action_space_updated_with_data_age_limit";
  WorkspaceAuditLogAction2["ActionSpaceVideoDeleted"] = "action_space_video_deleted";
  WorkspaceAuditLogAction2["ActionWorkspaceAccountReinstated"] = "action_workspace_account_reinstated";
  WorkspaceAuditLogAction2["ActionWorkspaceAccountSuspended"] = "action_workspace_account_suspended";
  WorkspaceAuditLogAction2["ActionWorkspaceAdhocBillAdjustment"] = "action_workspace_adhoc_bill_adjustment";
  WorkspaceAuditLogAction2["ActionWorkspaceAdhocBillCredit"] = "action_workspace_adhoc_bill_credit";
  WorkspaceAuditLogAction2["ActionWorkspaceBillableAdded"] = "action_workspace_billable_added";
  WorkspaceAuditLogAction2["ActionWorkspaceBillableDeleted"] = "action_workspace_billable_deleted";
  WorkspaceAuditLogAction2["ActionWorkspaceBillableRoleChange"] = "action_workspace_billable_role_change";
  WorkspaceAuditLogAction2["ActionWorkspaceBillableStatusChange"] = "action_workspace_billable_status_change";
  WorkspaceAuditLogAction2["ActionWorkspaceDunningEmailSent"] = "action_workspace_dunning_email_sent";
  WorkspaceAuditLogAction2["ActionWorkspaceInviteLinkCreated"] = "action_workspace_invite_link_created";
  WorkspaceAuditLogAction2["ActionWorkspaceInviteLinkDisabled"] = "action_workspace_invite_link_disabled";
  WorkspaceAuditLogAction2["ActionWorkspaceInviteLinkJoin"] = "action_workspace_invite_link_join";
  WorkspaceAuditLogAction2["ActionWorkspaceInviteLinkToggled"] = "action_workspace_invite_link_toggled";
  WorkspaceAuditLogAction2["ActionWorkspaceSubscriptionChanged"] = "action_workspace_subscription_changed";
  WorkspaceAuditLogAction2["ActionWorkspaceSubscriptionCreated"] = "action_workspace_subscription_created";
  WorkspaceAuditLogAction2["ActionWorkspaceSubscriptionDeleted"] = "action_workspace_subscription_deleted";
  WorkspaceAuditLogAction2["ActionWorkspaceUpdateUserRole"] = "action_workspace_update_user_role";
  WorkspaceAuditLogAction2["ActionWorkspaceVideoVisibilityChange"] = "action_workspace_video_visibility_change";
  WorkspaceAuditLogAction2["ActionWorkspaceZoomConnectChange"] = "action_workspace_zoom_connect_change";
  WorkspaceAuditLogAction2["UserLogin"] = "user_login";
  WorkspaceAuditLogAction2["UserStatusUpdate"] = "user_status_update";
  WorkspaceAuditLogAction2["VideoArchived"] = "video_archived";
  WorkspaceAuditLogAction2["VideoComment"] = "video_comment";
  WorkspaceAuditLogAction2["VideoCreated"] = "video_created";
  WorkspaceAuditLogAction2["VideoDeleted"] = "video_deleted";
  WorkspaceAuditLogAction2["VideoDirectShare"] = "video_direct_share";
  WorkspaceAuditLogAction2["VideoDownloaded"] = "video_downloaded";
  WorkspaceAuditLogAction2["VideoDuplicated"] = "video_duplicated";
  WorkspaceAuditLogAction2["VideoExpiredLinkAccessUpdated"] = "video_expired_link_access_updated";
  WorkspaceAuditLogAction2["VideoLinkExpirationChange"] = "video_link_expiration_change";
  WorkspaceAuditLogAction2["VideoPasswordChange"] = "video_password_change";
  WorkspaceAuditLogAction2["VideoPrivacyChange"] = "video_privacy_change";
  WorkspaceAuditLogAction2["VideoReaction"] = "video_reaction";
  WorkspaceAuditLogAction2["VideoRemovedDirectShare"] = "video_removed_direct_share";
  WorkspaceAuditLogAction2["VideoSearchIndexingChange"] = "video_search_indexing_change";
  WorkspaceAuditLogAction2["VideoUnarchived"] = "video_unarchived";
  WorkspaceAuditLogAction2["VideoUpdated"] = "video_updated";
  WorkspaceAuditLogAction2["VideoViewed"] = "video_viewed";
  WorkspaceAuditLogAction2["WorkspaceAutoJoin"] = "workspace_auto_join";
  WorkspaceAuditLogAction2["WorkspaceContentPrivacySettingChange"] = "workspace_content_privacy_setting_change";
  WorkspaceAuditLogAction2["WorkspaceDataRetentionChange"] = "workspace_data_retention_change";
  WorkspaceAuditLogAction2["WorkspaceDataRetentionDeletion"] = "workspace_data_retention_deletion";
  WorkspaceAuditLogAction2["WorkspaceDefaultPrivacyChange"] = "workspace_default_privacy_change";
  WorkspaceAuditLogAction2["WorkspaceDomainPrivacySettingChange"] = "workspace_domain_privacy_setting_change";
  WorkspaceAuditLogAction2["WorkspaceDomainSettingsChange"] = "workspace_domain_settings_change";
  WorkspaceAuditLogAction2["WorkspaceDomainVerificationChange"] = "workspace_domain_verification_change";
  WorkspaceAuditLogAction2["WorkspaceGoogleIntegrationChange"] = "workspace_google_integration_change";
  WorkspaceAuditLogAction2["WorkspaceGroupChange"] = "workspace_group_change";
  WorkspaceAuditLogAction2["WorkspaceGroupMemberChange"] = "workspace_group_member_change";
  WorkspaceAuditLogAction2["WorkspaceJoinRequestAcknowledgement"] = "workspace_join_request_acknowledgement";
  WorkspaceAuditLogAction2["WorkspaceLinkExpirationChange"] = "workspace_link_expiration_change";
  WorkspaceAuditLogAction2["WorkspaceSalesSupportTypeChange"] = "workspace_sales_support_type_change";
  WorkspaceAuditLogAction2["WorkspaceScimChange"] = "workspace_scim_change";
  WorkspaceAuditLogAction2["WorkspaceScimUserDeactivation"] = "workspace_scim_user_deactivation";
  WorkspaceAuditLogAction2["WorkspaceSettingChange"] = "workspace_setting_change";
  WorkspaceAuditLogAction2["WorkspaceSlackIntegrationChange"] = "workspace_slack_integration_change";
  WorkspaceAuditLogAction2["WorkspaceSsoChange"] = "workspace_sso_change";
  WorkspaceAuditLogAction2["WorkspaceStatusChange"] = "workspace_status_change";
  WorkspaceAuditLogAction2["WorkspaceUserDeletion"] = "workspace_user_deletion";
  WorkspaceAuditLogAction2["WorkspaceUserDeprovisioningSettingChange"] = "workspace_user_deprovisioning_setting_change";
  WorkspaceAuditLogAction2["WorkspaceUserTransferContent"] = "workspace_user_transfer_content";
  WorkspaceAuditLogAction2["WorkspaceVideoAccessUpdated"] = "workspace_video_access_updated";
  WorkspaceAuditLogAction2["WorkspaceVideoOwnerUpdated"] = "workspace_video_owner_updated";
  return WorkspaceAuditLogAction2;
})(WorkspaceAuditLogAction || {});
var WorkspaceContactSource = /* @__PURE__ */ ((WorkspaceContactSource2) => {
  WorkspaceContactSource2["Google"] = "google";
  WorkspaceContactSource2["Slack"] = "slack";
  WorkspaceContactSource2["Zoom"] = "zoom";
  return WorkspaceContactSource2;
})(WorkspaceContactSource || {});
var WorkspaceContactType = /* @__PURE__ */ ((WorkspaceContactType2) => {
  WorkspaceContactType2["Email"] = "email";
  WorkspaceContactType2["Handle"] = "handle";
  WorkspaceContactType2["Slack"] = "slack";
  return WorkspaceContactType2;
})(WorkspaceContactType || {});
var WorkspaceEmailAuditLogAction = /* @__PURE__ */ ((WorkspaceEmailAuditLogAction2) => {
  WorkspaceEmailAuditLogAction2["ActionMembershipDsyncRoleChange"] = "action_membership_dsync_role_change";
  WorkspaceEmailAuditLogAction2["ActionMembershipScimRoleChange"] = "action_membership_scim_role_change";
  WorkspaceEmailAuditLogAction2["ActionScheduleSubscriptionPause"] = "action_schedule_subscription_pause";
  WorkspaceEmailAuditLogAction2["ActionSpaceCreated"] = "action_space_created";
  WorkspaceEmailAuditLogAction2["ActionSpaceDeleted"] = "action_space_deleted";
  WorkspaceEmailAuditLogAction2["ActionSpaceGroupsUpdated"] = "action_space_groups_updated";
  WorkspaceEmailAuditLogAction2["ActionSpaceMembersAdded"] = "action_space_members_added";
  WorkspaceEmailAuditLogAction2["ActionSpaceMembersRemoved"] = "action_space_members_removed";
  WorkspaceEmailAuditLogAction2["ActionSpacePrivacyUpdated"] = "action_space_privacy_updated";
  WorkspaceEmailAuditLogAction2["ActionSpaceUpdatedWithDataAgeLimit"] = "action_space_updated_with_data_age_limit";
  WorkspaceEmailAuditLogAction2["ActionSpaceVideoDeleted"] = "action_space_video_deleted";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceAccountReinstated"] = "action_workspace_account_reinstated";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceAccountSuspended"] = "action_workspace_account_suspended";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceAdhocBillAdjustment"] = "action_workspace_adhoc_bill_adjustment";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceAdhocBillCredit"] = "action_workspace_adhoc_bill_credit";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceBillableAdded"] = "action_workspace_billable_added";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceBillableDeleted"] = "action_workspace_billable_deleted";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceBillableRoleChange"] = "action_workspace_billable_role_change";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceBillableStatusChange"] = "action_workspace_billable_status_change";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceDunningEmailSent"] = "action_workspace_dunning_email_sent";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceInviteLinkCreated"] = "action_workspace_invite_link_created";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceInviteLinkDisabled"] = "action_workspace_invite_link_disabled";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceInviteLinkJoin"] = "action_workspace_invite_link_join";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceInviteLinkToggled"] = "action_workspace_invite_link_toggled";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceSubscriptionChanged"] = "action_workspace_subscription_changed";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceSubscriptionCreated"] = "action_workspace_subscription_created";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceSubscriptionDeleted"] = "action_workspace_subscription_deleted";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceUpdateUserRole"] = "action_workspace_update_user_role";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceVideoVisibilityChange"] = "action_workspace_video_visibility_change";
  WorkspaceEmailAuditLogAction2["ActionWorkspaceZoomConnectChange"] = "action_workspace_zoom_connect_change";
  WorkspaceEmailAuditLogAction2["UserLogin"] = "user_login";
  WorkspaceEmailAuditLogAction2["UserStatusUpdate"] = "user_status_update";
  WorkspaceEmailAuditLogAction2["VideoArchived"] = "video_archived";
  WorkspaceEmailAuditLogAction2["VideoComment"] = "video_comment";
  WorkspaceEmailAuditLogAction2["VideoCreated"] = "video_created";
  WorkspaceEmailAuditLogAction2["VideoDeleted"] = "video_deleted";
  WorkspaceEmailAuditLogAction2["VideoDirectShare"] = "video_direct_share";
  WorkspaceEmailAuditLogAction2["VideoDownloaded"] = "video_downloaded";
  WorkspaceEmailAuditLogAction2["VideoDuplicated"] = "video_duplicated";
  WorkspaceEmailAuditLogAction2["VideoExpiredLinkAccessUpdated"] = "video_expired_link_access_updated";
  WorkspaceEmailAuditLogAction2["VideoLinkExpirationChange"] = "video_link_expiration_change";
  WorkspaceEmailAuditLogAction2["VideoPasswordChange"] = "video_password_change";
  WorkspaceEmailAuditLogAction2["VideoPrivacyChange"] = "video_privacy_change";
  WorkspaceEmailAuditLogAction2["VideoReaction"] = "video_reaction";
  WorkspaceEmailAuditLogAction2["VideoRemovedDirectShare"] = "video_removed_direct_share";
  WorkspaceEmailAuditLogAction2["VideoSearchIndexingChange"] = "video_search_indexing_change";
  WorkspaceEmailAuditLogAction2["VideoUnarchived"] = "video_unarchived";
  WorkspaceEmailAuditLogAction2["VideoUpdated"] = "video_updated";
  WorkspaceEmailAuditLogAction2["VideoViewed"] = "video_viewed";
  WorkspaceEmailAuditLogAction2["WorkspaceAutoJoin"] = "workspace_auto_join";
  WorkspaceEmailAuditLogAction2["WorkspaceContentPrivacySettingChange"] = "workspace_content_privacy_setting_change";
  WorkspaceEmailAuditLogAction2["WorkspaceDataRetentionChange"] = "workspace_data_retention_change";
  WorkspaceEmailAuditLogAction2["WorkspaceDataRetentionDeletion"] = "workspace_data_retention_deletion";
  WorkspaceEmailAuditLogAction2["WorkspaceDefaultPrivacyChange"] = "workspace_default_privacy_change";
  WorkspaceEmailAuditLogAction2["WorkspaceDomainPrivacySettingChange"] = "workspace_domain_privacy_setting_change";
  WorkspaceEmailAuditLogAction2["WorkspaceDomainSettingsChange"] = "workspace_domain_settings_change";
  WorkspaceEmailAuditLogAction2["WorkspaceDomainVerificationChange"] = "workspace_domain_verification_change";
  WorkspaceEmailAuditLogAction2["WorkspaceGoogleIntegrationChange"] = "workspace_google_integration_change";
  WorkspaceEmailAuditLogAction2["WorkspaceGroupChange"] = "workspace_group_change";
  WorkspaceEmailAuditLogAction2["WorkspaceGroupMemberChange"] = "workspace_group_member_change";
  WorkspaceEmailAuditLogAction2["WorkspaceJoinRequestAcknowledgement"] = "workspace_join_request_acknowledgement";
  WorkspaceEmailAuditLogAction2["WorkspaceLinkExpirationChange"] = "workspace_link_expiration_change";
  WorkspaceEmailAuditLogAction2["WorkspaceSalesSupportTypeChange"] = "workspace_sales_support_type_change";
  WorkspaceEmailAuditLogAction2["WorkspaceScimChange"] = "workspace_scim_change";
  WorkspaceEmailAuditLogAction2["WorkspaceScimUserDeactivation"] = "workspace_scim_user_deactivation";
  WorkspaceEmailAuditLogAction2["WorkspaceSettingChange"] = "workspace_setting_change";
  WorkspaceEmailAuditLogAction2["WorkspaceSlackIntegrationChange"] = "workspace_slack_integration_change";
  WorkspaceEmailAuditLogAction2["WorkspaceSsoChange"] = "workspace_sso_change";
  WorkspaceEmailAuditLogAction2["WorkspaceStatusChange"] = "workspace_status_change";
  WorkspaceEmailAuditLogAction2["WorkspaceUserDeletion"] = "workspace_user_deletion";
  WorkspaceEmailAuditLogAction2["WorkspaceUserDeprovisioningSettingChange"] = "workspace_user_deprovisioning_setting_change";
  WorkspaceEmailAuditLogAction2["WorkspaceUserTransferContent"] = "workspace_user_transfer_content";
  WorkspaceEmailAuditLogAction2["WorkspaceVideoAccessUpdated"] = "workspace_video_access_updated";
  WorkspaceEmailAuditLogAction2["WorkspaceVideoOwnerUpdated"] = "workspace_video_owner_updated";
  return WorkspaceEmailAuditLogAction2;
})(WorkspaceEmailAuditLogAction || {});
var WorkspaceGroupMemberSource = /* @__PURE__ */ ((WorkspaceGroupMemberSource2) => {
  WorkspaceGroupMemberSource2["Admin"] = "admin";
  WorkspaceGroupMemberSource2["Google"] = "google";
  WorkspaceGroupMemberSource2["Scim"] = "scim";
  WorkspaceGroupMemberSource2["Slack"] = "slack";
  return WorkspaceGroupMemberSource2;
})(WorkspaceGroupMemberSource || {});
var WorkspaceJoinRequestStatus = /* @__PURE__ */ ((WorkspaceJoinRequestStatus2) => {
  WorkspaceJoinRequestStatus2["Approved"] = "approved";
  WorkspaceJoinRequestStatus2["Declined"] = "declined";
  WorkspaceJoinRequestStatus2["Pending"] = "pending";
  WorkspaceJoinRequestStatus2["Voided"] = "voided";
  return WorkspaceJoinRequestStatus2;
})(WorkspaceJoinRequestStatus || {});
var WorkspacePlan = /* @__PURE__ */ ((WorkspacePlan2) => {
  WorkspacePlan2["Business"] = "business";
  WorkspacePlan2["Education"] = "education";
  WorkspacePlan2["Enterprise"] = "enterprise";
  WorkspacePlan2["StarterFree"] = "starter_free";
  return WorkspacePlan2;
})(WorkspacePlan || {});
var WorkspaceVideoFilterType = /* @__PURE__ */ ((WorkspaceVideoFilterType2) => {
  WorkspaceVideoFilterType2["CreatedAt"] = "CREATED_AT";
  WorkspaceVideoFilterType2["OwnerId"] = "OWNER_ID";
  WorkspaceVideoFilterType2["Privacy"] = "PRIVACY";
  WorkspaceVideoFilterType2["PrivacyType"] = "PRIVACY_TYPE";
  WorkspaceVideoFilterType2["RecordingType"] = "RECORDING_TYPE";
  return WorkspaceVideoFilterType2;
})(WorkspaceVideoFilterType || {});
var WorkspaceVideoSortType = /* @__PURE__ */ ((WorkspaceVideoSortType2) => {
  WorkspaceVideoSortType2["CreatedAt"] = "CREATED_AT";
  WorkspaceVideoSortType2["Privacy"] = "PRIVACY";
  WorkspaceVideoSortType2["RecordingType"] = "RECORDING_TYPE";
  WorkspaceVideoSortType2["TotalViews"] = "TOTAL_VIEWS";
  WorkspaceVideoSortType2["VideoName"] = "VIDEO_NAME";
  return WorkspaceVideoSortType2;
})(WorkspaceVideoSortType || {});
var ZoomCreatedBy = /* @__PURE__ */ ((ZoomCreatedBy2) => {
  ZoomCreatedBy2["Auto"] = "AUTO";
  ZoomCreatedBy2["User"] = "USER";
  return ZoomCreatedBy2;
})(ZoomCreatedBy || {});
var ZoomType = /* @__PURE__ */ ((ZoomType2) => {
  ZoomType2["Click"] = "CLICK";
  ZoomType2["Cursor"] = "CURSOR";
  ZoomType2["Static"] = "STATIC";
  return ZoomType2;
})(ZoomType || {});
export {
  Access,
  AccountSuspensionReasons,
  Addon,
  AdminVideoPrivacyType,
  AdminVideoPrivacyTypeForWorkspace,
  AdvancedAiMeetingNotesFailureReason,
  AppSourceType,
  AudioGenerationStatus,
  AutoChapterStatusesType,
  AutoCommentUpdateTarget,
  AutoContextFeatureStatusValue,
  AutoContextLanguage,
  AutoRecordOwnedMeetingsType,
  AutomationKindEnumType,
  BacklinkMediaType,
  BacklinkSourceType,
  BannerFormattingType,
  BannerName,
  BannerType,
  BillingCadenceType,
  BotActionTypeInput,
  BotControlsState,
  BotMeetingEventType,
  BotServerMessageType,
  CameraPickerRegion,
  CaptureType,
  ChecklistItem,
  CloudfrontVideoAcceptableMime,
  CommentType,
  ConfluenceContentTypes,
  Conjunction,
  ConnectedServiceIntegrationEnumType,
  ContactSalesCompanySize,
  ContactSalesUseCase,
  ContentVisibilityProperty,
  ControlTypeEnum,
  CorrectionEditType,
  CorrectionPositionType,
  CorrectionSourceType,
  DataRetentionInterval,
  DataRetentionKeep,
  DateType,
  DefaultSsoRoleEnum,
  DeletionEffective,
  DeliveryType,
  DesktopVersionTypes,
  DownloadableByType,
  EmailGateVideoType,
  FillerWordRemoval,
  FolderAccessLevel,
  FolderSource,
  FolderVisibilityType,
  GenerateMeetingNotesForVideoFailureReason,
  GenerateVideoSourceType,
  GenerationSource,
  GetCurrentUserSsrDocument,
  GetVideoSsrDocument,
  GroupingTypeEnum,
  IntelligenceAvailableStatusType,
  IntelligenceStatusType,
  InviteFlow,
  InviteSetting,
  InvitedRoleType,
  InvoiceStatus,
  JiraAuthResponseCode,
  JiraErrorCode,
  JiraSearchableFieldType,
  Language,
  LinkSharing,
  LiveTranscriptStatusType,
  LoomsAnonProfileCollectionFilterType,
  LoomsCollectionFilterType,
  LoomsSortGrouping,
  LoomsSortOrder,
  LoomsSortType,
  LoomsSource,
  MagicMeetingNotesFailureReason,
  MediaTranscriptStatus,
  MeetingRecordingAccessInput,
  MeetingRecordingAccessType,
  MeetingRecordingLinkSharingInput,
  MeetingRecordingLinkSharingType,
  MeetingRecordingSummaryNotificationInput,
  MeetingRecordingSummaryNotificationType,
  MeetingSourceProperty,
  MeetingTypeProperty,
  MemberPropertyEnum,
  MobileHomeActivityReason,
  NotificationDeliveryType,
  NotificationQueryType,
  NotificationSettingName,
  NotificationStatus,
  NotificationTrayType,
  NotificationType,
  NudgeType,
  OrgRole,
  OrganizationMemberRole,
  OrganizationMemberStatus,
  ParticipantsInclude,
  PhraseRangeType,
  PlanInterval,
  PresetVariablesEnum,
  ProcessingServices,
  Product,
  PublicVideoCommentType,
  QuantitySmartSyncAction,
  ReactionType,
  RecordingClient,
  RecordingType,
  RecordingVersion,
  RegenerationType,
  RegularUserActivityType,
  RequestToJoinWorkspaceForVideoStatus,
  RequestToJoinWorkspaceStatus,
  RequestToUpgradeWorkspaceStatusType,
  RequestToUpgradeWorkspaceTargetAddOnType,
  RequestToUpgradeWorkspaceTargetPlanType,
  RequestToUpgradeWorkspaceTargetRoleType,
  RequestToUpgradeWorkspaceUpgradeType,
  RequestVideoAccessFlow,
  ResumeFailedVideoUploadInstruction,
  ScreenshotAccessLevel,
  ScreenshotPrivacyTypes,
  ScreenshotSource,
  SearchModelType,
  ShareMessageType,
  SpacePrivacy,
  StreamHubConsumerQueue,
  StripeErrorType,
  SubscriptionScheduleStatus,
  SuggestedPlaybackRate,
  SummaryNotification,
  TermMatch,
  ThirdTierVariation,
  TimestampType,
  TranscriptionStatuses,
  TrendingAlgorithm,
  TrendingTagAlgorithm,
  TtsCodes,
  TtsFeedbackType,
  TtsPriorityCode,
  UiLocation,
  UpdateConfluenceMeetingNotesLocationErrorType,
  UserIdentitieProviderEnum,
  UserStatusEnum,
  VideoAccessLevel,
  VideoAclEntryType,
  VideoActivitySource,
  VideoActivityType,
  VideoLanguage,
  VideoPersonalizationType,
  VideoPrivacyProperty,
  VideoPrivacyStatus,
  VideoPropertyType,
  VideoVisibilityProperty,
  VideoVisibilityType,
  VideoWaveformGenerationStatuses,
  WaveformGenerationStatus,
  WordType,
  WorkflowTemplateType,
  WorkspaceAtlassianProvisioningStatus,
  WorkspaceAuditLogAction,
  WorkspaceContactSource,
  WorkspaceContactType,
  WorkspaceEmailAuditLogAction,
  WorkspaceGroupMemberSource,
  WorkspaceJoinRequestStatus,
  WorkspacePlan,
  WorkspaceVideoFilterType,
  WorkspaceVideoSortType,
  ZoomCreatedBy,
  ZoomType,
  dataIdFromObject,
  typePolicies,
  useGetCurrentUserSsrLazyQuery,
  useGetCurrentUserSsrQuery,
  useGetVideoSsrLazyQuery,
  useGetVideoSsrQuery
};
//# sourceMappingURL=index.js.map
