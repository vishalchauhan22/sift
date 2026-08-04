import "../chunk-BYZ2GIR3.js";
import * as workspaceDestinationStateUtils from "../utilities/workspaceDestinationStateUtils";
import { AI } from "./limits";
const { WorkspaceDestinationState } = workspaceDestinationStateUtils;
var MemberPropertyEnum = /* @__PURE__ */ ((MemberPropertyEnum2) => {
  MemberPropertyEnum2["BOOLEAN_VALUE"] = "booleanValue";
  MemberPropertyEnum2["NUMBER_VALUE"] = "numberValue";
  MemberPropertyEnum2["STRING_VALUE"] = "stringValue";
  MemberPropertyEnum2["JSON_VALUE"] = "jsonValue";
  MemberPropertyEnum2["LIMITS_OVERRIDE"] = "limitsOverride";
  MemberPropertyEnum2["RECENTLY_USED_TAGS"] = "recentlyUsedTags";
  MemberPropertyEnum2["DECLINED_SUGGESTED_FOLLOW_STREAMS"] = "declinedSuggestedFollowStreams";
  MemberPropertyEnum2["ZOOM_AUTO_INGESTION"] = "zoomAutoIngestion";
  MemberPropertyEnum2["ZOOM_ALL_INGESTION"] = "zoomAllIngestion";
  MemberPropertyEnum2["HOME_STATE_DENSITY"] = "homeStateDensity";
  MemberPropertyEnum2["ENFORCE_CREATOR_LITE_LIMIT"] = "enforceCreatorLiteLimit";
  MemberPropertyEnum2["DELETED_VIDEO_COUNT"] = "deletedVideoCount";
  MemberPropertyEnum2["DEFAULT_CTA"] = "defaultCta";
  MemberPropertyEnum2["AMN_SETTINGS"] = "amnSettings";
  return MemberPropertyEnum2;
})(MemberPropertyEnum || {});
const memberProperties = {
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
  ["limitsOverride" /* LIMITS_OVERRIDE */]: {
    defaultValue: {
      STARTER_FREE: {
        ADMIN: {
          TOTAL_VIDEOS: 25
        }
      },
      CREATOR_LITE: {
        TOTAL_VIDEOS: 25,
        VIDEO_DURATION: 300
      },
      [AI]: 5
    },
    type: JSON
  },
  // A user's recently used tags, stored in order from most recent to least recent.
  ["recentlyUsedTags" /* RECENTLY_USED_TAGS */]: {
    defaultValue: [],
    type: JSON
  },
  // A user's declined suggested streams to follow
  ["declinedSuggestedFollowStreams" /* DECLINED_SUGGESTED_FOLLOW_STREAMS */]: {
    defaultValue: [],
    type: JSON
  },
  // If a user has enabled or disabled zoom auto ingestion feature
  ["zoomAutoIngestion" /* ZOOM_AUTO_INGESTION */]: {
    defaultValue: {},
    type: JSON
  },
  // If a user has enabled or disabled zoom feature completely
  ["zoomAllIngestion" /* ZOOM_ALL_INGESTION */]: {
    defaultValue: true,
    type: Boolean
  },
  ["homeStateDensity" /* HOME_STATE_DENSITY */]: {
    defaultValue: WorkspaceDestinationState.EMPTY,
    type: String
  },
  // If a user is a creator lite added past limit
  ["enforceCreatorLiteLimit" /* ENFORCE_CREATOR_LITE_LIMIT */]: {
    defaultValue: false,
    type: Boolean
  },
  ["deletedVideoCount" /* DELETED_VIDEO_COUNT */]: {
    defaultValue: 0,
    type: Number
  },
  ["defaultCta" /* DEFAULT_CTA */]: {
    defaultValue: {},
    type: JSON
  },
  ["amnSettings" /* AMN_SETTINGS */]: {
    defaultValue: {
      enabled: false
    },
    type: JSON
  }
};
const memberPropertyValidators = {
  ["amnSettings" /* AMN_SETTINGS */]: {
    validator: (value) => {
      return Boolean(
        value && typeof value === "object" && Object.keys(value).length === 1 && "enabled" in value
      );
    }
  }
};
export {
  MemberPropertyEnum,
  memberProperties,
  memberPropertyValidators
};
//# sourceMappingURL=memberProperties.js.map
