import "../chunk-BYZ2GIR3.js";
import { ORG_ROLE_CREATOR_LITE } from "./organizationRoles";
var WorkspaceSetting = /* @__PURE__ */ ((WorkspaceSetting2) => {
  WorkspaceSetting2["BILLING_EMAIL_NOTIFS"] = "billingEmailNotifications";
  WorkspaceSetting2["COMPANY_DOMAIN_DEFAULT"] = "companyDomainDefault";
  WorkspaceSetting2["CONTENT_ACCESS_AND_VIEWING"] = "contentAccessAndViewing";
  WorkspaceSetting2["CONTENT_PRIVACY_RESTRICTIONS"] = "contentPrivacyRestrictions";
  WorkspaceSetting2["CREATOR_LITE_LIMIT_ENFORCED"] = "creatorLiteLimitEnforced";
  WorkspaceSetting2["CREATORS_TOP_INVITE_ROLE"] = "creatorsTopInviteRole";
  WorkspaceSetting2["CUSTOM_ROLE_UPGRADE_MESSAGE"] = "customRoleUpgradeMessage";
  WorkspaceSetting2["DATA_RETENTION"] = "dataRetention";
  WorkspaceSetting2["DOMAIN_CAPTURE"] = "domainCapture";
  WorkspaceSetting2["DATE_ELIGIBLE_FOR_DELETION"] = "dateEligibileForDeletion";
  WorkspaceSetting2["DOWNLOADS_DISABLED"] = "downloadsDisabled";
  WorkspaceSetting2["GOOGLE_CONTACT_SYNC"] = "googleContactSync";
  WorkspaceSetting2["HAS_CREATOR_LITE"] = "hasCreatorLite";
  WorkspaceSetting2["LINK_EXPIRATION"] = "linkExpiration";
  WorkspaceSetting2["MANUAL_SKIP_COMMUNICATION_FLAGS"] = "manualSkipCommunicationFlags";
  WorkspaceSetting2["MEMBER_INVITATION_ALLOWED"] = "memberInvitationAllowed";
  WorkspaceSetting2["MISSING_ACTIVE_SUBSCRIPTION_REMEDIATION"] = "missingActiveSubscriptionRemediation";
  WorkspaceSetting2["PNP_CREATOR_LITE_DOWNLOAD_UPDATE"] = "pnpCreatorLiteDownloadUpdate";
  WorkspaceSetting2["PNP_FILLER_WORD_V1_UPDATE"] = "pnpFillerWordV1Update";
  WorkspaceSetting2["PRIVATE_CONTENT_DEFAULT"] = "privateContentDefault";
  WorkspaceSetting2["PRIVATE_VIDEO_PREVIEW"] = "showVideoPreview";
  WorkspaceSetting2["SALESFORCE_VIDEO_DEFAULTS_FOR_GROUPS"] = "salesforceVideoDefaultsForGroups";
  WorkspaceSetting2["SCIM"] = "scim";
  WorkspaceSetting2["SCIM_TOS"] = "scimToS";
  WorkspaceSetting2["SCIM_USERS_PENDING_ACTION"] = "scimUsersPendingAction";
  WorkspaceSetting2["SETTINGS_POPULATED"] = "settingsPopulated";
  WorkspaceSetting2["SLACK_CONTACT_SYNC"] = "slackContactSync";
  WorkspaceSetting2["SLACK_PRIVATE_VIDEO_PREVIEW"] = "slackPrivateVideoPreview";
  WorkspaceSetting2["SSO_ENFORCEMENT"] = "ssoEnforcement";
  WorkspaceSetting2["USER_DEPROVISIONING"] = "userDeprovisioning";
  WorkspaceSetting2["WORKOS"] = "workos";
  WorkspaceSetting2["WORKSPACE_AUTOJOIN"] = "workspaceAutojoin";
  WorkspaceSetting2["WORKSPACE_DOMAIN_JOIN_INFO"] = "workspaceDomainJoinInfo";
  WorkspaceSetting2["WORKSPACE_PERSONA"] = "workspacePersona";
  WorkspaceSetting2["ZOOM_CONTENT_DEFAULT"] = "zoomContentDefault";
  WorkspaceSetting2["ZOOM_INGESTION_USER_DEFAULT"] = "zoomIngestionUserDefault";
  WorkspaceSetting2["ZOOM_INTEGRATION"] = "zoomIntegration";
  WorkspaceSetting2["ALLOWS_AI"] = "allowsAI";
  WorkspaceSetting2["ALLOWS_AMN"] = "allowsAMN";
  WorkspaceSetting2["MEETING_RECORDING_LANGUAGE"] = "meetingRecordingLanguage";
  WorkspaceSetting2["HIDE_VIEWER_ROLE"] = "hideViewerRole";
  WorkspaceSetting2["CONTENT_DELETION_PROGRESS"] = "contentDeletionProgress";
  WorkspaceSetting2["ENABLE_AUTO_USER_MIGRATION"] = "enableAutoUserMigration";
  WorkspaceSetting2["FALL_LAUNCH_2024_BUSINESS_DESCOPE_EDIT_BY_TRANSCRIPT"] = "fallLaunch2024BusinessDescopeEditByTranscript";
  WorkspaceSetting2["FALL_LAUNCH_2024_BUSINESS_DESCOPE_EDIT_BY_TRANSCRIPT_V2"] = "fallLaunch2024BusinessDescopeEditByTranscriptV2";
  WorkspaceSetting2["FALL_LAUNCH_2024_BUSINESS_DESCOPE_EDIT_BY_TRANSCRIPT_V3"] = "fallLaunch2024BusinessDescopeEditByTranscriptV3";
  WorkspaceSetting2["CONFLUENCE_ACTIVATION_ID"] = "confluenceActivationId";
  WorkspaceSetting2["WORKSPACE_DELETION_STAGE"] = "workspaceDeletionStage";
  return WorkspaceSetting2;
})(WorkspaceSetting || {});
const settingOptions = {
  ["downloadsDisabled" /* DOWNLOADS_DISABLED */]: {
    defaultValue: false,
    type: Boolean
  },
  ["contentAccessAndViewing" /* CONTENT_ACCESS_AND_VIEWING */]: {
    defaultValue: "public",
    type: String
  },
  ["fallLaunch2024BusinessDescopeEditByTranscript" /* FALL_LAUNCH_2024_BUSINESS_DESCOPE_EDIT_BY_TRANSCRIPT */]: {
    defaultValue: false,
    type: Boolean
  },
  ["fallLaunch2024BusinessDescopeEditByTranscriptV2" /* FALL_LAUNCH_2024_BUSINESS_DESCOPE_EDIT_BY_TRANSCRIPT_V2 */]: {
    defaultValue: false,
    type: Boolean
  },
  ["fallLaunch2024BusinessDescopeEditByTranscriptV3" /* FALL_LAUNCH_2024_BUSINESS_DESCOPE_EDIT_BY_TRANSCRIPT_V3 */]: {
    defaultValue: false,
    type: Boolean
  },
  ["hideViewerRole" /* HIDE_VIEWER_ROLE */]: {
    defaultValue: false,
    type: Boolean
  },
  ["allowsAI" /* ALLOWS_AI */]: {
    defaultValue: true,
    type: Boolean
  },
  ["meetingRecordingLanguage" /* MEETING_RECORDING_LANGUAGE */]: {
    defaultValue: "",
    type: String
  },
  ["settingsPopulated" /* SETTINGS_POPULATED */]: {
    defaultValue: false,
    type: Boolean
  },
  ["privateContentDefault" /* PRIVATE_CONTENT_DEFAULT */]: {
    defaultValue: false,
    type: Boolean
  },
  ["creatorsTopInviteRole" /* CREATORS_TOP_INVITE_ROLE */]: {
    defaultValue: ORG_ROLE_CREATOR_LITE,
    type: String
  },
  // map of domain to domain options, defaults per domain:
  // domain: { domain: domain, defaultJoinRole: viewer, autoJoin: false }
  ["workspaceDomainJoinInfo" /* WORKSPACE_DOMAIN_JOIN_INFO */]: {
    type: JSON
  },
  ["workspacePersona" /* WORKSPACE_PERSONA */]: {
    defaultValue: null,
    type: JSON
  },
  ["scim" /* SCIM */]: {
    defaultValue: false,
    type: Boolean
  },
  ["scimToS" /* SCIM_TOS */]: {
    defaultValue: true,
    type: Boolean
  },
  ["customRoleUpgradeMessage" /* CUSTOM_ROLE_UPGRADE_MESSAGE */]: {
    defaultValue: "",
    type: String
  },
  ["billingEmailNotifications" /* BILLING_EMAIL_NOTIFS */]: {
    defaultValue: true,
    type: Boolean
  },
  ["dataRetention" /* DATA_RETENTION */]: {
    defaultValue: null,
    type: JSON
  },
  ["slackContactSync" /* SLACK_CONTACT_SYNC */]: {
    defaultValue: null,
    type: JSON
  },
  ["googleContactSync" /* GOOGLE_CONTACT_SYNC */]: {
    defaultValue: null,
    type: JSON
  },
  ["contentPrivacyRestrictions" /* CONTENT_PRIVACY_RESTRICTIONS */]: {
    defaultValue: null,
    type: JSON
  },
  ["zoomIntegration" /* ZOOM_INTEGRATION */]: {
    defaultValue: false,
    type: Boolean
  },
  ["zoomContentDefault" /* ZOOM_CONTENT_DEFAULT */]: {
    defaultValue: null,
    type: JSON
  },
  ["zoomIngestionUserDefault" /* ZOOM_INGESTION_USER_DEFAULT */]: {
    defaultValue: true,
    type: Boolean
  },
  ["showVideoPreview" /* PRIVATE_VIDEO_PREVIEW */]: {
    defaultValue: false,
    type: Boolean
  },
  ["workos" /* WORKOS */]: {
    defaultValue: null,
    type: JSON
  },
  ["companyDomainDefault" /* COMPANY_DOMAIN_DEFAULT */]: {
    defaultValue: true,
    type: Boolean
  },
  ["salesforceVideoDefaultsForGroups" /* SALESFORCE_VIDEO_DEFAULTS_FOR_GROUPS */]: {
    defaultValue: null,
    type: JSON
  },
  // Deprecated -- do not use
  ["hasCreatorLite" /* HAS_CREATOR_LITE */]: {
    defaultValue: true,
    type: Boolean
  },
  ["manualSkipCommunicationFlags" /* MANUAL_SKIP_COMMUNICATION_FLAGS */]: {
    defaultValue: null,
    type: JSON
  },
  ["workspaceAutojoin" /* WORKSPACE_AUTOJOIN */]: {
    defaultValue: false,
    type: Boolean
  },
  ["domainCapture" /* DOMAIN_CAPTURE */]: {
    defaultValue: true,
    type: Boolean
  },
  ["ssoEnforcement" /* SSO_ENFORCEMENT */]: {
    defaultValue: true,
    type: Boolean
  },
  ["userDeprovisioning" /* USER_DEPROVISIONING */]: {
    defaultValue: null,
    type: JSON
  },
  ["scimUsersPendingAction" /* SCIM_USERS_PENDING_ACTION */]: {
    defaultValue: null,
    type: JSON
  },
  ["memberInvitationAllowed" /* MEMBER_INVITATION_ALLOWED */]: {
    defaultValue: true,
    type: Boolean
  },
  ["creatorLiteLimitEnforced" /* CREATOR_LITE_LIMIT_ENFORCED */]: {
    defaultValue: false,
    type: Boolean
  },
  ["missingActiveSubscriptionRemediation" /* MISSING_ACTIVE_SUBSCRIPTION_REMEDIATION */]: {
    defaultValue: null,
    type: JSON
  },
  ["slackPrivateVideoPreview" /* SLACK_PRIVATE_VIDEO_PREVIEW */]: {
    defaultValue: null,
    type: JSON
  },
  ["pnpCreatorLiteDownloadUpdate" /* PNP_CREATOR_LITE_DOWNLOAD_UPDATE */]: {
    defaultValue: false,
    type: Boolean
  },
  ["pnpFillerWordV1Update" /* PNP_FILLER_WORD_V1_UPDATE */]: {
    defaultValue: false,
    type: Boolean
  },
  ["dateEligibileForDeletion" /* DATE_ELIGIBLE_FOR_DELETION */]: {
    defaultValue: null,
    type: Date
  },
  ["confluenceActivationId" /* CONFLUENCE_ACTIVATION_ID */]: {
    defaultValue: "",
    type: String
  },
  ["workspaceDeletionStage" /* WORKSPACE_DELETION_STAGE */]: {
    defaultValue: "",
    type: String
  },
  ["contentDeletionProgress" /* CONTENT_DELETION_PROGRESS */]: {
    defaultValue: null,
    type: JSON
  },
  ["linkExpiration" /* LINK_EXPIRATION */]: {
    defaultValue: null,
    type: JSON
  },
  ["allowsAMN" /* ALLOWS_AMN */]: {
    defaultValue: true,
    type: Boolean
  },
  ["enableAutoUserMigration" /* ENABLE_AUTO_USER_MIGRATION */]: {
    defaultValue: false,
    type: Boolean
  }
};
const SettingsOptOutForGenericLog = [
  "userDeprovisioning" /* USER_DEPROVISIONING */,
  "userDeprovisioning" /* USER_DEPROVISIONING */,
  "contentPrivacyRestrictions" /* CONTENT_PRIVACY_RESTRICTIONS */,
  "workspaceDomainJoinInfo" /* WORKSPACE_DOMAIN_JOIN_INFO */,
  "privateContentDefault" /* PRIVATE_CONTENT_DEFAULT */,
  "googleContactSync" /* GOOGLE_CONTACT_SYNC */,
  "slackContactSync" /* SLACK_CONTACT_SYNC */,
  "linkExpiration" /* LINK_EXPIRATION */
];
export {
  SettingsOptOutForGenericLog,
  WorkspaceSetting,
  settingOptions
};
//# sourceMappingURL=settings.js.map
