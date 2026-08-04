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
var GetVideoSsrDocument = gql(_a || (_a = __template(["\n    query GetVideoSSR($id: ID!, $password: String) {\n  getVideo(id: $id, password: $password) {\n    __typename\n    ... on PrivateVideo {\n      id\n      status\n      message\n      __typename\n    }\n    ... on VideoPasswordMissingOrIncorrect {\n      id\n      message\n      __typename\n    }\n    ... on RegularUserVideo {\n      id\n      __typename\n      defaultThumbnails {\n        default\n        static\n        __typename\n      }\n      signedThumbnails {\n        animatedPreview\n        default\n        default4X3\n        defaultPlay\n        ogFull\n        full\n        fullPlay\n        defaultGif\n        defaultGifPlay\n      }\n      dashUrl: nullableRawCdnUrl(acceptableMimes: [DASH], password: $password) {\n        url\n        credentials {\n          Policy\n          Signature\n          KeyPairId\n        }\n      }\n      hlsUrl: nullableRawCdnUrl(acceptableMimes: [M3U8], password: $password) {\n        url\n        credentials {\n          Policy\n          Signature\n          KeyPairId\n        }\n      }\n      active_video_transcript_id\n      archived\n      chapters\n      comments_enabled\n      comments_email_enabled\n      complete\n      createdAt\n      cta {\n        enabled\n        url\n        text\n        mods\n        is_auto\n        approved_at\n      }\n      currentUserCanEdit\n      current_user_is_owner\n      description\n      download_enabled\n      downloadable\n      downloadableBy\n      email_gate_video_type\n      stylizedCaptions\n      viewerCaptionsOn\n      folder_id\n      folder {\n        id\n        special_id\n        name\n        visibility\n      }\n      isCommunityLoom\n      viewer_marked_for_watch_later: isOnWatchLaterList\n      isParentOfPersonalizedCopies\n      personalizationType\n      isMeetingRecording\n      is_protected\n      is_team_shared: isTeamShared\n      loom_branded_player\n      name\n      needs_password\n      organization_idv2\n      organization {\n        name\n        brand_logo_path: brandLogoPath\n        brand_show_branding: brandShowBranding\n        brand_primary_color: brandPrimaryColor\n        createdAt\n        description\n        planIncludesAI\n        hidden\n        id\n        organization_properties\n        site_id\n        status\n        tags\n        trial_ended\n        trial_ends_at\n        trial_type\n        type\n        updatedAt\n        workspace_logo_path: workspaceLogoPath\n      }\n      owner_id\n      owner {\n        id\n        first_name\n        display_name\n        avatars {\n          name\n          large\n          thumb\n          iosLarge\n          iosThumb\n          isAtlassianMastered\n        }\n        status\n        profile {\n          profileInfo {\n            role\n            location\n          }\n          profileUrl\n        }\n      }\n      privacy\n      processing_information {\n        instant_editing_enabled\n        noise_cancellation_type\n        replacements {\n          type\n        }\n        trim_id\n        trim_ranges {\n          from\n          to\n        }\n        videoUploadMessage\n        videoUploadValid\n        trim_progress\n        split_segment_ttl\n      }\n      record_reply_enabled\n      s3_id\n      salesforce_engagement_tracking\n      show_analytics_to_viewer\n      show_transcript_to_viewer\n      spaces {\n        id\n        name\n        data_age_limit_in_seconds\n        isArchived\n        is_primary\n        privacy\n      }\n      suggested_playback_rate\n      use_emojis\n      use_gif\n      video_properties {\n        avgBitRate\n        client\n        camera_enabled\n        client_version\n        countdown\n        duration\n        durationMs\n        format\n        height\n        ingestion_type\n        liveRewindTrimmedSections\n        mediaMetadataRotation\n        microphone_enabled\n        os\n        os_version\n        recordingClient\n        recording_type\n        recording_version\n        screen_type\n        sdkPartnerIdv2\n        tab_audio\n        trim_duration\n        width\n      }\n      playable_duration\n      signedDefaultThumbnails {\n        default\n        static\n      }\n      source_duration\n      thumbnails {\n        default\n        default4X3\n        defaultPlay\n        ogFull\n        full\n        fullPlay\n        defaultGif\n        defaultGifPlay\n        animatedPreview\n      }\n      viewerNeedsPermission\n      viewers_can_weave\n      views {\n        total\n        distinct\n        named {\n          firstName\n          lastName\n          avatar\n        }\n      }\n      visibility\n      waveform_generation\n      white_label_player\n    }\n  }\n  getFeatureFlags {\n    featureFlags\n  }\n}\n    "])));
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
  []
);
var GET_PAGINATED_INSIGHTS_POLICY = createDefaultPolicy(
  "EngagementInsightsSummary",
  "paginatedViewers",
  ["id"]
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
var typePolicies = __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, GET_SPACE_MEMBERS), GET_MY_SPACE_MEMBERSHIPS), GET_MY_CLOSED_SPACE_MEMBERSHIPS), GET_OPEN_SPACES), GET_WORKSPACE_ARCHIVED_SPACES), GET_WORKSPACE_SPACES), GET_PUBLISHED_FOLDERS), GET_LOOMS), GET_LIBRARY_LOOMS), GET_COMMUNITY_LOOMS_FOR_PROFILE), GET_NOTIFICATIONS), GET_PROFILE_VIDEOS), GET_SCREENSHOTS), GET_USER_GROUPINGS), GET_WORKSPACE_GROUPINGS), ADMIN_FIND_FOLDERS), ADMIN_GET_VIDEO_GROUPINGS_BY_OWNER), ADMIN_GET_GROUPINGS_BY_VIDEO_ID), ADMIN_GET_VIDEOS), COMMENT_POLICY), REACTION_POLICY), GET_FOLLOWEDBY_STREAMS), GET_FOLLOWING_STREAMS), GET_PUBLIC_FOLDER_LOOMS), JIRA_PROJECT_POLICY), JIRA_ISSUE_TYPE_POLICY), JIRA_ISSUE_PRIORITY_POLICY), LINEAR_ASSIGNEES_POLICY), LINEAR_PROJECTS_POLICY), LINEAR_TEAMS_POLICY), GET_ENGAGEMENT_INSIGHTS_POLICY), GET_PAGINATED_INSIGHTS_POLICY), REGULAR_USER_VIDEO), GET_AVATAR), REGULAR_USER_PROFILE), REGULAR_USER), CALENDAR_INFO_POLICY), {
  Query: QueryPolicies
  // Add additional type policies here
  // ...
});
export {
  GetCurrentUserSsrDocument,
  GetVideoSsrDocument,
  dataIdFromObject,
  typePolicies,
  useGetCurrentUserSsrLazyQuery,
  useGetCurrentUserSsrQuery,
  useGetVideoSsrLazyQuery,
  useGetVideoSsrQuery
};
//# sourceMappingURL=index.js.map
