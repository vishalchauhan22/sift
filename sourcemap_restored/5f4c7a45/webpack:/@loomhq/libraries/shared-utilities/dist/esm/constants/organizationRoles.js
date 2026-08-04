import "../chunk-BYZ2GIR3.js";
import * as scopesConstants from "./scopes";
const {
  INVITE_ADMIN_ACTION,
  INVITE_CREATOR_ACTION,
  INVITE_CREATOR_LITE_ACTION,
  INVITE_VIEWER_ACTION
} = scopesConstants;
const ORG_ROLE_ADMIN = "admin";
const ORG_ROLE_VIEWER = "viewer";
const ORG_ROLE_CREATOR = "creator";
const ORG_ROLE_CREATOR_LITE = "creator_lite";
const ORG_ROLE_GUEST = "guest";
const ORG_ROLE_USER = "user";
const TEMP_ORG_ROLE_MEMBER_DISPLAY_NAME = "Member";
const ORG_ROLE_INDEFINITE_ARTICLE_MAP = {
  [ORG_ROLE_ADMIN]: "an",
  [ORG_ROLE_CREATOR]: "a",
  [ORG_ROLE_CREATOR_LITE]: "a",
  [ORG_ROLE_GUEST]: "a",
  [ORG_ROLE_VIEWER]: "a"
};
const ORG_ROLE_DISPLAY_NAMES = {
  [ORG_ROLE_ADMIN]: "Admin",
  [ORG_ROLE_CREATOR]: "Creator",
  [ORG_ROLE_CREATOR_LITE]: "Creator Lite",
  [ORG_ROLE_GUEST]: "Guest",
  [ORG_ROLE_VIEWER]: "Viewer"
};
const ORG_ROLE_DESCRIPTIONS = {
  [ORG_ROLE_ADMIN]: "Manages Workspace. Can record unlimited videos.",
  [ORG_ROLE_CREATOR]: "Can record unlimited videos.",
  [ORG_ROLE_CREATOR_LITE]: "Can record videos up to 5 min each.",
  [ORG_ROLE_GUEST]: "Shared SDK account. Anonymous users can record videos with limits.",
  [ORG_ROLE_VIEWER]: "View-only access. Cannot record."
};
const ALL_ORG_ROLES = [
  ORG_ROLE_ADMIN,
  ORG_ROLE_VIEWER,
  ORG_ROLE_CREATOR,
  ORG_ROLE_CREATOR_LITE,
  ORG_ROLE_GUEST
];
const PAID_ORG_ROLES = [ORG_ROLE_ADMIN, ORG_ROLE_CREATOR];
const ORG_ROLE_HIERARCHY = {
  [ORG_ROLE_ADMIN]: 4,
  [ORG_ROLE_CREATOR]: 3,
  [ORG_ROLE_CREATOR_LITE]: 2,
  [ORG_ROLE_VIEWER]: 1,
  [ORG_ROLE_GUEST]: 0
};
const ROLE_DEMOTION = "role-demotion";
const ROLE_PROMOTION = "role-promotion";
const ORG_UPDATE_ROLE_SOURCE = {
  UNKNOWN: "unknown",
  ADMIN_ACTION: "admin-action",
  PLAN_DOWNGRADE: "plan-downgrade",
  PLAN_UPGRADE: "plan-upgrade",
  TRANSFER_ADMIN: "transfer-admin",
  DOWNGRADE_TO_FREE: "downgrade-to-free",
  ROLE_UPGRADE_REQUEST: "role-upgrade-request",
  BILLING: "billing",
  SINGLE_PLAYER__ACCOUNT_DELETE: "single-player-account-delete"
};
const ONBOARDING_INVITE_SOURCE = "welcome-onboarding";
const CHECKLIST_INVITE_SOURCE = "checklist-invite";
const IN_APP_INVITE_SOURCE = "team-invite-modal";
const ADMIN_TOOL_INVITE_SOURCE = "admin-tool";
const VIDEO_SHARE_INVITE_SOURCE = "video-share";
const SLACK_CONTACT_IMPORT_INVITE_SOURCE = "contact_import_slack";
const GOOGLE_CONTACT_IMPORT_INVITE_SOURCE = "contact_import_google";
const SHARE_VIDEO_MODAL_INVITE_SOURCE = "share_video_modal";
const VIDEO_ACCESS_REQUEST_INVITE_SOURCE = "share_video_modal";
const WORKSPACE_SETTINGS_SOURCE = "workspace-settings";
const INSIGHTS_ANONYMOUS_VIEWS_SOURCE = "insights-anonymous-views";
const ROLE_CHANGE_QUANTITY_DELTAS_MAP = {
  [ORG_ROLE_ADMIN]: {
    [ORG_ROLE_CREATOR]: {
      admins: -1,
      creators: 1,
      viewers: 0
    },
    [ORG_ROLE_VIEWER]: {
      admins: -1,
      creators: 0,
      viewers: 1
    },
    [ORG_ROLE_CREATOR_LITE]: {
      admins: -1,
      creators: 0,
      viewers: 1
    }
  },
  [ORG_ROLE_CREATOR]: {
    [ORG_ROLE_ADMIN]: {
      admins: 1,
      creators: -1,
      viewers: 0
    },
    [ORG_ROLE_VIEWER]: {
      admins: 0,
      creators: -1,
      viewers: 1
    },
    [ORG_ROLE_CREATOR_LITE]: {
      admins: 0,
      creators: -1,
      viewers: 1
    }
  },
  [ORG_ROLE_VIEWER]: {
    [ORG_ROLE_ADMIN]: {
      admins: 1,
      creators: 0,
      viewers: -1
    },
    [ORG_ROLE_CREATOR]: {
      admins: 0,
      creators: 1,
      viewers: -1
    },
    [ORG_ROLE_CREATOR_LITE]: {
      admins: 0,
      creators: 0,
      viewers: 0
    }
  },
  [ORG_ROLE_CREATOR_LITE]: {
    [ORG_ROLE_ADMIN]: {
      admins: 1,
      creators: 0,
      viewers: -1
    },
    [ORG_ROLE_CREATOR]: {
      admins: 0,
      creators: 1,
      viewers: -1
    },
    [ORG_ROLE_VIEWER]: {
      admins: 0,
      creators: 0,
      viewers: 0
    }
  }
};
const SCOPE_FOR_ROLE = {
  [ORG_ROLE_ADMIN]: INVITE_ADMIN_ACTION,
  [ORG_ROLE_CREATOR]: INVITE_CREATOR_ACTION,
  [ORG_ROLE_CREATOR_LITE]: INVITE_CREATOR_LITE_ACTION,
  [ORG_ROLE_VIEWER]: INVITE_VIEWER_ACTION
};
export {
  ADMIN_TOOL_INVITE_SOURCE,
  ALL_ORG_ROLES,
  CHECKLIST_INVITE_SOURCE,
  GOOGLE_CONTACT_IMPORT_INVITE_SOURCE,
  INSIGHTS_ANONYMOUS_VIEWS_SOURCE,
  IN_APP_INVITE_SOURCE,
  ONBOARDING_INVITE_SOURCE,
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR,
  ORG_ROLE_CREATOR_LITE,
  ORG_ROLE_DESCRIPTIONS,
  ORG_ROLE_DISPLAY_NAMES,
  ORG_ROLE_GUEST,
  ORG_ROLE_HIERARCHY,
  ORG_ROLE_INDEFINITE_ARTICLE_MAP,
  ORG_ROLE_USER,
  ORG_ROLE_VIEWER,
  ORG_UPDATE_ROLE_SOURCE,
  PAID_ORG_ROLES,
  ROLE_CHANGE_QUANTITY_DELTAS_MAP,
  ROLE_DEMOTION,
  ROLE_PROMOTION,
  SCOPE_FOR_ROLE,
  SHARE_VIDEO_MODAL_INVITE_SOURCE,
  SLACK_CONTACT_IMPORT_INVITE_SOURCE,
  TEMP_ORG_ROLE_MEMBER_DISPLAY_NAME,
  VIDEO_ACCESS_REQUEST_INVITE_SOURCE,
  VIDEO_SHARE_INVITE_SOURCE,
  WORKSPACE_SETTINGS_SOURCE
};
//# sourceMappingURL=organizationRoles.js.map
