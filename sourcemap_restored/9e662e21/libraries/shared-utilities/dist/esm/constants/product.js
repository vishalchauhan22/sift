import "../chunk-BYZ2GIR3.js";
import { FeatureNames } from "./features";
var Page = /* @__PURE__ */ ((Page2) => {
  Page2["AccountSettings"] = "account";
  Page2["AdminManagement"] = "admin-management";
  Page2["AdvancedAiMeetingNotes"] = "advanced-ai-meeting-notes";
  Page2["AiConfluencePage"] = "ai-confluence-page";
  Page2["AiMeetingNotes"] = "ai-meeting-notes";
  Page2["ApiKeyManagement"] = "ApiKeyManagement";
  Page2["ArchivedLooms"] = "Archived Looms Page";
  Page2["ArchivedSpaces"] = "Archived Spaces Page";
  Page2["AuthValidate"] = "auth-validate";
  Page2["AllNotifications"] = "All Notifications Page";
  Page2["Canvas"] = "canvas";
  Page2["ChangePassword"] = "change-password";
  Page2["ClosedSpaces"] = "Closed Spaces Page";
  Page2["ConsolidatedEdit"] = "consolidated_editor";
  Page2["CommentsNotifications"] = "Comments Notifications Page";
  Page2["Destination"] = "destination";
  Page2["DeveloperPortal"] = "developer-portal";
  Page2["DeveloperPortalOnboarding"] = "DeveloperPortalOnboarding";
  Page2["Download"] = "download";
  Page2["SegmentDownload"] = "Download";
  Page2["SegmentSettings"] = "Settings";
  Page2["DownloadDesktop"] = "download-desktop";
  Page2["SegmentDownloadDesktop"] = "Download Desktop";
  Page2["DownloadLoom"] = "download-loom";
  Page2["EditByTranscript"] = "edit-by-transcript";
  Page2["Edit"] = "edit";
  Page2["Embed"] = "embed-video";
  Page2["Embed404"] = "embed-404";
  Page2["EmbedSpace"] = "embed-space";
  Page2["SegmentEmbedSpace"] = "Embed Space Page";
  Page2["Error404"] = "error-404";
  Page2["GenerateVideo"] = "generate-video";
  Page2["Google"] = "google";
  Page2["History"] = "History";
  Page2["Invite"] = "invite";
  Page2["IndividualScreenshot"] = "Individual Screenshot";
  Page2["IndividualVideo"] = "Individual Video";
  Page2["Incentives"] = "Incentives Page";
  Page2["InviteLinkExpired"] = "invite-link-expired";
  Page2["InviteConfirmation"] = "invite-confirmation";
  Page2["LaunchLoom"] = "launch-loom";
  Page2["LoommateAdminTools"] = "loommate-admin-tools";
  Page2["MeetingsPast"] = "meetings-past";
  Page2["MeetingsRules"] = "meetings-rules";
  Page2["MeetingsRulesCreate"] = "meetings-rules-create";
  Page2["MeetingsRulesEdit"] = "meetings-rules-edit";
  Page2["MeetingsSettings"] = "meetings-settings";
  Page2["MeetingRecordingSettings"] = "Meeting recording settings";
  Page2["MeetingSurface"] = "meeting-surface";
  Page2["MyMeetings"] = "My Meetings";
  Page2["MergeAtlassianProfile"] = "merge-atlassian-profile";
  Page2["Notifications"] = "Notifications Page";
  Page2["OAuthCallback"] = "oauth-callback";
  Page2["OpenSpaces"] = "Open Spaces Page";
  Page2["Playground"] = "Playground";
  Page2["RecoverVideos"] = "recover-videos";
  Page2["RequestToJoin"] = "request-to-join";
  Page2["ResetPassword"] = "reset-password";
  Page2["Screenshot"] = "screenshots";
  Page2["ScreenshotPrivate"] = "screenshot-private";
  Page2["SelectActiveWorkspace"] = "select-active-workspace";
  Page2["Settings"] = "settings";
  Page2["SettingsSwitchAiDefaultOff"] = "settings-switch-ai-default-off";
  Page2["Share"] = "share-video-fresh";
  Page2["ShareFolder"] = "Share Folder Page";
  Page2["ShareNotifications"] = "Shared Notifications Page";
  Page2["ShareVideo404"] = "share-video-404";
  Page2["ShareVideoExpired"] = "share-video-expired";
  Page2["Signup"] = "signup";
  Page2["SignupViaVideoJoinRequest"] = "signup-via-video-join-request";
  Page2["SignupViaWorkspaceJoinRequest"] = "signup-via-workspace-join-request";
  Page2["SignupViaRoleUpgradeRequest"] = "signup-via-role-upgrade-request";
  Page2["SlackConnect"] = "slack-connect";
  Page2["SlackRecord"] = "slack-record";
  Page2["SlackSharedAuthSuccess"] = "slack-shared-auth-success";
  Page2["SubscriptionResume"] = "subscription-resume";
  Page2["SubscriptionDowngrade"] = "subscription-downgrade";
  Page2["SegmentInviteConfirmation"] = "Invite Confirmation";
  Page2["SegmentSubscriptionDowngrade"] = "Auto Downgrade Screen";
  Page2["SegmentTermsAndConditionsAccept"] = "Terms of Service Accept";
  Page2["SubscriptionPause"] = "subscription-pause";
  Page2["SuspendedAccount"] = "suspended-account";
  Page2["Tag"] = "Tag Page";
  Page2["TermsAndConditions"] = "terms-and-conditions";
  Page2["TermsAndConditionsAccept"] = "terms-and-conditions-accept";
  Page2["Test"] = "test";
  Page2["Unsubscribe"] = "unsubscribe";
  Page2["UpgradeBrowser"] = "upgrade-browser";
  Page2["UpgradePlan"] = "upgrade-plan";
  Page2["UpgradePlanComplete"] = "upgrade-plan-complete";
  Page2["UserHomeFeed"] = "User Home Feed";
  Page2["UserProfileExpandedState"] = "User Profile Expanded State";
  Page2["VariablesEdit"] = "variables-edit-page";
  Page2["VariablesEditPhoneticHints"] = "variables-edit-phonetic-hints";
  Page2["VerifyEmail"] = "verify-email";
  Page2["VideosLooms"] = "Videos Looms Page";
  Page2["ViewApplicationDetail"] = "ViewApplicationDetail";
  Page2["Welcome"] = "welcome";
  Page2["WatchLater"] = "Watch Later";
  Page2["WorkspaceSettings"] = "workspace";
  Page2["ZoomMeetingsLooms"] = "Zoom Meetings Looms Page";
  return Page2;
})(Page || {});
const Team = {
  Acquisition: teamInfoHelper(
    "Acquisition",
    "C08LB4Z7URX",
    // #loom-acquisition-alerts
    "@loomhq/acquisition"
  ),
  Activation: teamInfoHelper(
    "Activation",
    "C08L31F139R",
    // #loom-activation-alerts
    "@loomhq/activation"
  ),
  AdminX: teamInfoHelper(
    "AdminX",
    "C01J3KYBM6U",
    // team-adminx
    "@loomhq/adminx"
  ),
  AsyncWorkflows: teamInfoHelper(
    "Async Workflows",
    "C090NCZTFA7",
    // #loom-async-workflows-pod
    "@loomhq/async-workflows"
  ),
  Billing: teamInfoHelper(
    "Billing",
    "C011LNPG53N",
    // team-eng-billing
    "@loomhq/billing"
  ),
  Capture: teamInfoHelper(
    "Capture",
    "C03HC1VDMEZ",
    // team-capture-chat
    "@loomhq/recording-clients"
  ),
  /**
   * @deprecated This team is no longer in effect
   * Route any questions to #eng-chat
   */
  Collaborate: teamInfoHelper(
    "Collaborate",
    "C01HAN3Q56H",
    // team-collaborate
    "@loomhq/collaborate"
  ),
  CorePlatform: teamInfoHelper(
    "Core Platform",
    "C02F8S5P6FK",
    // team-core-platform-alerts
    "@loomhq/core-platform"
  ),
  DeveloperExperience: teamInfoHelper(
    "Developer Experience",
    "C02QFRE3EEB",
    // team-eng-devex
    "@loomhq/devex"
  ),
  EnterpriseReadiness: teamInfoHelper(
    "Enterprise Readiness",
    "C06JLQV14LX",
    // loom-enterprise-readiness
    "@loomhq/enterprise-readiness"
  ),
  Identity: teamInfoHelper(
    "Identity",
    "C08KQGHFXQX",
    // #loom-identity-alerts
    "@loomhq/identity"
  ),
  Infra: teamInfoHelper(
    "Infra",
    "CRDF78HDM",
    // team-infra
    "@loomhq/infrastructure"
  ),
  IntegrateOrganizeCollaborate: teamInfoHelper(
    "Integrate Organize Collaborate",
    "C07J0P2KDQC",
    // team-ioc-alerts
    "@loomhq/integrate-organize-collaborate"
  ),
  IntegrationExperience: teamInfoHelper(
    "Integration Experience",
    "C085YF6J2E4",
    // loom-eng-integrations-experience
    "@loomhq/integration-experience"
  ),
  Mint: teamInfoHelper(
    "Media and Intelligence",
    "CPHFGHUQ2",
    // team-eng-media-and-intelligence
    "@loomhq/mint"
  ),
  Mobile: teamInfoHelper(
    "Mobile",
    "CEBHVB4E6",
    // team-mobile,
    "@loomhq/mobile"
  ),
  Outreach: teamInfoHelper(
    "Outreach",
    "C04N1TJTP0A",
    // team-outreach-alerts
    "@loomhq/outreach-eng"
  ),
  RecordingClients: teamInfoHelper(
    "Recording Clients",
    "C03HC1VDMEZ",
    // team-recording-clients-chat
    "@loomhq/recording-clients"
  ),
  Rewatch: teamInfoHelper(
    "Rewatch",
    "C07K6KSGHM1",
    // loom-eng-rewatch
    "@loomhq/rewatch"
  ),
  ShareAndTransform: teamInfoHelper(
    "Share and Transform",
    "C03HAKAMKH6",
    // team-share-and-transform-chat
    "@loomhq/share-and-transform"
  ),
  Undetermined: teamInfoHelper(
    "undetermined",
    "C02QFRE3EEB",
    // team-eng-devex
    "@loomhq/devex"
  ),
  Workspaces: teamInfoHelper(
    "Workspaces",
    "C082Z7XM2E5",
    // loom-workspaces-alerts
    "@loomhq/workspaces"
  )
};
function teamInfoHelper(name, primarySlackChannelId, githubTeamName) {
  return { name, primarySlackChannelId, githubTeamName };
}
const feat = (name, team) => ({
  name,
  team
});
const UNDETERMINED_FEATURE = feat(FeatureNames.Undetermined, Team.Undetermined);
const Feature = {
  AVServer: feat(FeatureNames.AVServer, Team.Mint),
  AccountLifecycleApi: feat(
    FeatureNames.AccountLifecycleApi,
    Team.Undetermined
  ),
  AccountSuspension: feat(FeatureNames.AccountSuspension, Team.Billing),
  Acl: feat(FeatureNames.Acl, Team.IntegrateOrganizeCollaborate),
  ActivityTab: feat(
    FeatureNames.ActivityTab,
    Team.IntegrateOrganizeCollaborate
  ),
  AdminSoftDeletion: feat(FeatureNames.AdminSoftDeletion, Team.Workspaces),
  AdminTools: feat(FeatureNames.AdminTools, Team.Undetermined),
  AdminWorkspaceVisibility: feat(
    FeatureNames.WorkspaceVisibility,
    Team.Workspaces
  ),
  AiAddOn: feat(FeatureNames.AiAddOn, Team.Billing),
  AiAgents: feat(FeatureNames.AiAgents, Team.Mint),
  AiConfluencePage: feat(
    FeatureNames.AiConfluencePage,
    Team.IntegrationExperience
  ),
  AiLimitManagement: feat(FeatureNames.AiLimitManagement, Team.Billing),
  AiWorkflowsTabV2: feat(FeatureNames.AiWorkflowsTabV2, Team.AsyncWorkflows),
  AndroidApp: feat(FeatureNames.AndroidApp, Team.Mobile),
  AndroidRecorder: feat(FeatureNames.AndroidRecorder, Team.Mobile),
  Anonymous: feat(FeatureNames.Anonymous, Team.Outreach),
  AnonymousEngagementInsights: feat(
    FeatureNames.AnonymousEngagementInsights,
    Team.Outreach
  ),
  AnonymousHeader: feat(FeatureNames.AnonymousHeader, Team.Outreach),
  AnonymousShareGateModal: feat(
    FeatureNames.AnonymousShareGateModal,
    Team.Outreach
  ),
  AnonymousUnsubscribeRepository: feat(
    FeatureNames.AnonymousUnsubscribeRepository,
    Team.Outreach
  ),
  ApolloServer: feat(FeatureNames.ApolloServer, Team.CorePlatform),
  Assets: feat(FeatureNames.Assets, Team.ShareAndTransform),
  AtlassianAdminHubAuditLogs: feat(
    FeatureNames.AtlassianAdminHubAuditLogs,
    Team.EnterpriseReadiness
  ),
  AtlassianAnalytics: feat(FeatureNames.AtlassianAnalytics, Team.CorePlatform),
  AtlassianApiAgent: feat(FeatureNames.AtlassianApiAgent, Team.Undetermined),
  AtlassianAuth: feat(FeatureNames.AtlassianAuth, Team.Outreach),
  AtlassianAutomations: feat(
    FeatureNames.AtlassianAutomations,
    Team.IntegrationExperience
  ),
  AtlassianGraphqlAgent: feat(FeatureNames.AtlassianGraphqlAgent, Team.Billing),
  AtlassianGroups: feat(FeatureNames.AtlassianGroups, Team.Workspaces),
  AtlassianLinkResolution: feat(
    FeatureNames.AtlassianLinkResolution,
    Team.Outreach
  ),
  AtlassianManagedBilling: feat(
    FeatureNames.AtlassianManagedBilling,
    Team.Billing
  ),
  AtlassianManagedWorkspaceDeletion: feat(
    FeatureNames.AtlassianManagedWorkspaceDeletion,
    Team.Workspaces
  ),
  AtlassianMergeProfile: feat(
    FeatureNames.AtlassianMergeProfile,
    Team.Outreach
  ),
  AtlassianPostOffice: feat(FeatureNames.AtlassianPostOffice, Team.Outreach),
  AtlassianSearch: feat(FeatureNames.AtlassianSearch, Team.Outreach),
  AtlassianSignups: feat(FeatureNames.AtlassianSignups, Team.Outreach),
  AtlassianTwgAgent: feat(FeatureNames.AtlassianTwgAgent, Team.Undetermined),
  AtlassianUserProvisioning: feat(
    FeatureNames.AtlassianUserProvisioning,
    Team.Undetermined
  ),
  Authentication: feat(FeatureNames.Authentication, Team.Outreach),
  Authorization: feat(FeatureNames.Authorization, Team.Outreach),
  AutoCommentAndReaction: feat(
    FeatureNames.AutoCommentAndReaction,
    Team.Outreach
  ),
  AutoEOVN: feat(FeatureNames.AutoEOVN, Team.Outreach),
  AutomatedMeetingNotes: feat(
    FeatureNames.AutomatedMeetingNotes,
    Team.IntegrationExperience
  ),
  BacklinkRepository: feat(
    FeatureNames.BacklinkRepository,
    Team.IntegrateOrganizeCollaborate
  ),
  BacklinkService: feat(
    FeatureNames.BacklinkService,
    Team.IntegrateOrganizeCollaborate
  ),
  BacklinkServiceInternal: feat(
    FeatureNames.BacklinkServiceInternal,
    Team.IntegrateOrganizeCollaborate
  ),
  Banners: feat(FeatureNames.Banners, Team.Undetermined),
  BannersWorkspaceInvites: feat(
    FeatureNames.BannersWorkspaceInvites,
    Team.Outreach
  ),
  BillingEntityRepository: feat(
    FeatureNames.BillingEntityRepository,
    Team.Billing
  ),
  BillingModals: feat(FeatureNames.BillingModals, Team.Billing),
  BillingQuantitySmartSync: feat(
    FeatureNames.BillingQuantitySmartSync,
    Team.Billing
  ),
  BillingQuantitySyncJob: feat(
    FeatureNames.BillingQuantitySyncJob,
    Team.Billing
  ),
  Blurring: feat(FeatureNames.Blurring, Team.Capture),
  BusinessTrial: feat(FeatureNames.BusinessTrial, Team.Outreach),
  CSAM: feat(FeatureNames.CSAM, Team.Mint),
  CalendarMeetings: feat(FeatureNames.CalendarMeetings, Team.Rewatch),
  Calendly: feat(FeatureNames.Calendly, Team.IntegrateOrganizeCollaborate),
  CameraBubble: feat(FeatureNames.CameraBubble, Team.Capture),
  CameraFrames: feat(FeatureNames.CameraFrames, Team.Capture),
  Canvas: feat(FeatureNames.Canvas, Team.ShareAndTransform),
  CcpApiGatewayAgent: feat(FeatureNames.CcpApiGatewayAgent, Team.Undetermined),
  Chapters: feat(FeatureNames.Chapters, Team.ShareAndTransform),
  Checkout: feat(FeatureNames.Checkout, Team.Billing),
  CheckoutUIImprovementExp: feat(
    FeatureNames.CheckoutUIImprovementExp,
    Team.Billing
  ),
  ChromeExtension: feat(FeatureNames.ChromeExtension, Team.Capture),
  CloudProvisionerGroupProvisioning: feat(
    FeatureNames.CloudProvisionerGroupProvisioning,
    Team.Workspaces
  ),
  CloudProvisionerIntegration: feat(
    FeatureNames.CloudProvisionerIntegration,
    Team.Workspaces
  ),
  CloudProvisionerUserProvisioning: feat(
    FeatureNames.CloudProvisionerUserProvisioning,
    Team.Undetermined
  ),
  CommentReactions: feat(FeatureNames.CommentReactions, Team.ShareAndTransform),
  Comments: feat(FeatureNames.Comments, Team.ShareAndTransform),
  Confetti: feat(FeatureNames.Confetti, Team.Capture),
  ConfirmationToast: feat(
    FeatureNames.ConfirmationToast,
    Team.IntegrateOrganizeCollaborate
  ),
  ConfluenceAgent: feat(
    FeatureNames.ConfluenceAgent,
    Team.IntegrationExperience
  ),
  ContactSales: feat(FeatureNames.ContactSales, Team.Outreach),
  ContactSupport: feat(FeatureNames.ContactSupport, Team.Outreach),
  ContactSync: feat(
    FeatureNames.ContactSync,
    Team.IntegrateOrganizeCollaborate
  ),
  ContentExport: feat(FeatureNames.ContentExport, Team.Undetermined),
  ConvoAiAgent: feat(FeatureNames.ConvoAiAgent, Team.Mint),
  CopyLinkSection: feat(
    FeatureNames.CopyLinkSection,
    Team.IntegrateOrganizeCollaborate
  ),
  CreateTestData: feat(FeatureNames.CreateTestData, Team.Billing),
  CtaLinks: feat(FeatureNames.CtaLinks, Team.ShareAndTransform),
  CustomBranding: feat(FeatureNames.CustomBranding, Team.Outreach),
  CustomThumbnails: feat(FeatureNames.CustomThumbnails, Team.ShareAndTransform),
  DataRetention: feat(FeatureNames.DataRetention, Team.Outreach),
  DeleteS3AssetsForVideo: feat(FeatureNames.DeleteS3AssetsForVideo, Team.Mint),
  DesktopApp: feat(FeatureNames.DesktopApp, Team.Mint),
  DesktopRecorder: feat(FeatureNames.DesktopRecorder, Team.Mint),
  DevToolsApolloCache: feat(
    FeatureNames.DevToolsApolloCache,
    Team.CorePlatform
  ),
  DevToolsEnvVars: feat(FeatureNames.DevToolsEnvVars, Team.DeveloperExperience),
  DevToolsFeatureFlags: feat(
    FeatureNames.DevToolsFeatureFlags,
    Team.CorePlatform
  ),
  DeveloperPortal: feat(FeatureNames.DeveloperPortal, Team.Capture),
  Discounts: feat(FeatureNames.Discounts, Team.Billing),
  Downgrade: feat(FeatureNames.Downgrade, Team.Billing),
  DownloadLoom: feat(FeatureNames.DownloadLoom, Team.Outreach),
  Drawing: feat(FeatureNames.Drawing, Team.Capture),
  DunningEmail: feat(FeatureNames.DunningEmail, Team.Billing),
  DynamicPandP: feat(FeatureNames.DynamicPandP, Team.Billing),
  EdgeServerProxy: feat(FeatureNames.EdgeServerProxy, Team.EnterpriseReadiness),
  EdgeServerShutdown: feat(
    FeatureNames.EdgeServerShutdown,
    Team.EnterpriseReadiness
  ),
  EditByTranscript: feat(FeatureNames.EditByTranscript, Team.ShareAndTransform),
  EditPage: feat(FeatureNames.EditPage, Team.ShareAndTransform),
  EditPageHeader: feat(FeatureNames.EditPageHeader, Team.ShareAndTransform),
  EditPageTranscript: feat(
    FeatureNames.EditPageTranscript,
    Team.ShareAndTransform
  ),
  EditPageWaveform: feat(FeatureNames.EditPageWaveform, Team.ShareAndTransform),
  EditTTS: feat(FeatureNames.EditTTS, Team.Mint),
  EditTab: feat(FeatureNames.EditTab, Team.ShareAndTransform),
  EditZoomInstructionsRepository: feat(
    FeatureNames.EditZoomInstructionsRepository,
    Team.ShareAndTransform
  ),
  Email: feat(FeatureNames.Email, Team.Outreach),
  EmailGating: feat(
    FeatureNames.EmailGating,
    Team.IntegrateOrganizeCollaborate
  ),
  EmailServiceProviderIntegration: feat(
    FeatureNames.EmailServiceProviderIntegration,
    Team.Outreach
  ),
  EmailVerification: feat(FeatureNames.EmailVerification, Team.Outreach),
  EmailVerificationTokenRepository: feat(
    FeatureNames.EmailVerificationTokenRepository,
    Team.Identity
  ),
  EmbedSDK: feat(FeatureNames.EmbedSDK, Team.CorePlatform),
  EmbedSpaces: feat(
    FeatureNames.EmbedSpaces,
    Team.IntegrateOrganizeCollaborate
  ),
  EmojiPicker: feat(FeatureNames.EmojiPicker, Team.ShareAndTransform),
  EngagementInsights: feat(
    FeatureNames.EngagementInsights,
    Team.ShareAndTransform
  ),
  Error404: feat(FeatureNames.Error404, Team.CorePlatform),
  ExtensionRecorder: feat(FeatureNames.ExtensionRecorder, Team.Capture),
  FTUX: feat(FeatureNames.FTUX, Team.Outreach),
  Fall24BusinessDescopeUponRenewal: feat(
    FeatureNames.Fall24BusinessDescopeUponRenewal,
    Team.Billing
  ),
  Fall24EducationNewPackage: feat(
    FeatureNames.Fall24EducationNewPackage,
    Team.Billing
  ),
  Fall24Emails: feat(FeatureNames.Fall24Emails, Team.Billing),
  Fall24StarterFreeNewPackage: feat(
    FeatureNames.Fall24StarterFreeNewPackage,
    Team.Billing
  ),
  Fall24Trial: feat(FeatureNames.Fall24Trial, Team.Billing),
  FeatureWrapper: feat(FeatureNames.FeatureWrapper, Team.CorePlatform),
  FolderRepository: feat(
    FeatureNames.FolderRepository,
    Team.EnterpriseReadiness
  ),
  Folders: feat(FeatureNames.Folders, Team.IntegrateOrganizeCollaborate),
  Followers: feat(FeatureNames.Followers, Team.Outreach),
  FourthPlanExperiment: feat(FeatureNames.FourthPlanExperiment, Team.Billing),
  GenVideo: feat(FeatureNames.GenVideo, Team.ShareAndTransform),
  GlobalAdminView: feat(FeatureNames.GlobalAdminView, Team.EnterpriseReadiness),
  GlobalDB: feat(FeatureNames.GlobalDB, Team.EnterpriseReadiness),
  GoogleLinkPreview: feat(FeatureNames.GoogleLinkPreview, Team.Outreach),
  GoogleOneTap: feat(FeatureNames.GoogleOneTap, Team.Outreach),
  GraphQLFederation: feat(
    FeatureNames.GraphQLFederation,
    Team.EnterpriseReadiness
  ),
  GrowthNotifications: feat(FeatureNames.GrowthNotifications, Team.Outreach),
  Header: feat(FeatureNames.Header, Team.CorePlatform),
  HelpBubble: feat(FeatureNames.HelpBubble, Team.Outreach),
  HighlightValueOfLoomToAnonUsers: feat(
    FeatureNames.HighlightValueOfLoomToAnonUsers,
    Team.Outreach
  ),
  HistoryPage: feat(
    FeatureNames.HistoryPage,
    Team.IntegrateOrganizeCollaborate
  ),
  Hubspot: feat(FeatureNames.Hubspot, Team.Outreach),
  IOSApp: feat(FeatureNames.IOSApp, Team.Mobile),
  IOSRecorder: feat(FeatureNames.IOSRecorder, Team.Mobile),
  IncentivesPage: feat(FeatureNames.IncentivesPage, Team.Outreach),
  InitWorkspaceSubscription: feat(
    FeatureNames.InitWorkspaceSubscription,
    Team.Billing
  ),
  InsightsDigest: feat(FeatureNames.InsightsDigest, Team.Outreach),
  InsightsHub: feat(FeatureNames.InsightsHub, Team.Outreach),
  InstantTranscriptions: feat(FeatureNames.InstantTranscriptions, Team.Mint),
  IntegrationSettings: feat(
    FeatureNames.IntegrationSettings,
    Team.IntegrateOrganizeCollaborate
  ),
  Integrations: feat(
    FeatureNames.Integrations,
    Team.IntegrateOrganizeCollaborate
  ),
  Intercom: feat(FeatureNames.Intercom, Team.IntegrateOrganizeCollaborate),
  InternalApi: feat(FeatureNames.InternalApi, Team.Undetermined),
  InternalGraphql: feat(
    FeatureNames.InternalGraphql,
    Team.IntegrationExperience
  ),
  Invites: feat(FeatureNames.Invites, Team.Outreach),
  LegacyInvoiceMigration: feat(
    FeatureNames.LegacyInvoiceMigration,
    Team.Workspaces
  ),
  LegacyUserMigration: feat(
    FeatureNames.LegacyUserMigration,
    Team.Undetermined
  ),
  LegacyWorkspaceGroups: feat(
    FeatureNames.LegacyWorkspaceGroups,
    Team.Workspaces
  ),
  LegacyWorkspaceMigration: feat(
    FeatureNames.LegacyWorkspaceMigration,
    Team.Undetermined
  ),
  Library: feat(FeatureNames.Library, Team.IntegrateOrganizeCollaborate),
  LightAdjustment: feat(FeatureNames.LightAdjustment, Team.Capture),
  LiveRewind: feat(FeatureNames.LiveRewind, Team.Capture),
  LiveTranscripts: feat(FeatureNames.LiveTranscripts, Team.Rewatch),
  LoomAiDefaultOnSetting: feat(
    FeatureNames.LoomAiDefaultOnSetting,
    Team.Billing
  ),
  LoomAiSettings: feat(FeatureNames.LoomAiSettings, Team.Billing),
  LoomCCP: feat(FeatureNames.LoomCCP, Team.Billing),
  LoomHome: feat(FeatureNames.LoomHome, Team.IntegrateOrganizeCollaborate),
  LoomInvoice: feat(FeatureNames.LoomInvoice, Team.Billing),
  LoomScript: feat(FeatureNames.LoomScript, Team.Billing),
  LoomTransform: feat(
    FeatureNames.LoomTransform,
    Team.IntegrateOrganizeCollaborate
  ),
  MCP: feat(FeatureNames.MCP, Team.Mint),
  MagicLinks: feat(FeatureNames.MagicLinks, Team.Undetermined),
  ManageSubscriptionAddOnItems: feat(
    FeatureNames.ManageSubscriptionAddOnItems,
    Team.Billing
  ),
  MeetingLiveAssistant: feat(FeatureNames.MeetingLiveAssistant, Team.Mint),
  MeetingRecordingBotMessages: feat(
    FeatureNames.MeetingRecordingBotMessages,
    Team.Rewatch
  ),
  MeetingRecordingFtux: feat(FeatureNames.MeetingRecordingFtux, Team.Rewatch),
  MemberLimits: feat(FeatureNames.MemberLimits, Team.Outreach),
  MemberProperties: feat(
    FeatureNames.MemberProperties,
    Team.EnterpriseReadiness
  ),
  MemberVideoThreshold: feat(FeatureNames.MemberVideoThreshold, Team.Billing),
  MembershipRoleUpdateRequestRepository: feat(
    FeatureNames.MembershipRoleUpdateRequestRepository,
    Team.Billing
  ),
  Mentions: feat(FeatureNames.Mentions, Team.ShareAndTransform),
  MobileAutoComplete: feat(FeatureNames.MobileAutoComplete, Team.Mobile),
  MobileTranscriptSignupGate: feat(
    FeatureNames.MobileTranscriptSignupGate,
    Team.Outreach
  ),
  ModalContainer: feat(FeatureNames.ModalContainer, Team.CorePlatform),
  Navigation: feat(FeatureNames.Navigation, Team.Undetermined),
  NavigationFollowing: feat(FeatureNames.NavigationFollowing, Team.Outreach),
  NavigationSpaces: feat(
    FeatureNames.NavigationSpaces,
    Team.IntegrateOrganizeCollaborate
  ),
  NavigationSuggestedFollows: feat(
    FeatureNames.NavigationSuggestedFollows,
    Team.Outreach
  ),
  Network: feat(FeatureNames.Network, Team.Undetermined),
  NotificationIndexRepository: feat(
    FeatureNames.NotificationIndexRepository,
    Team.EnterpriseReadiness
  ),
  NotificationIndexService: feat(
    FeatureNames.NotificationIndexService,
    Team.EnterpriseReadiness
  ),
  NotificationRepository: feat(
    FeatureNames.NotificationRepository,
    Team.Outreach
  ),
  NotificationService: feat(FeatureNames.NotificationService, Team.Outreach),
  Notifications: feat(FeatureNames.Notifications, Team.Outreach),
  ObjectStoreService: feat(FeatureNames.ObjectStoreService, Team.Mint),
  Onboarding: feat(FeatureNames.Onboarding, Team.Outreach),
  OverflowActionsMenu: feat(
    FeatureNames.OverflowActionsMenu,
    Team.IntegrateOrganizeCollaborate
  ),
  PaywallModals: feat(FeatureNames.PaywallModals, Team.Billing),
  PdeWorkflows: feat(FeatureNames.PdeWorkflows, Team.ShareAndTransform),
  PersonalizedAudio: feat(
    FeatureNames.PersonalizedAudio,
    Team.ShareAndTransform
  ),
  PersonalizedTitles: feat(
    FeatureNames.PersonalizedTitles,
    Team.ShareAndTransform
  ),
  PiiMapperEmailUuid: feat(FeatureNames.PiiMapperEmailUuid, Team.Outreach),
  Playground: feat(FeatureNames.Playground, Team.Activation),
  PnP: feat(FeatureNames.PnP, Team.Billing),
  PollingUtility: feat(FeatureNames.PollingUtility, Team.Undetermined),
  PostRecordCelebration: feat(
    FeatureNames.PostRecordCelebration,
    Team.Outreach
  ),
  PricingAndPackaging: feat(FeatureNames.PricingAndPackaging, Team.Billing),
  Profile: feat(FeatureNames.Profile, Team.IntegrateOrganizeCollaborate),
  Publishing: feat(FeatureNames.Publishing, Team.IntegrateOrganizeCollaborate),
  RBAC: feat(FeatureNames.RBAC, Team.Outreach),
  RabbitCoreUtils: feat(FeatureNames.RabbitCoreUtils, Team.Outreach),
  RecapTab: feat(FeatureNames.RecapTab, Team.Rewatch),
  RecordComment: feat(FeatureNames.RecordComment, Team.ShareAndTransform),
  RecordingCountdown: feat(FeatureNames.RecordingCountdown, Team.Capture),
  Redis: feat(FeatureNames.Redis, Team.CorePlatform),
  ReferralLinks: feat(FeatureNames.ReferralLinks, Team.Outreach),
  RemindersToRecord: feat(FeatureNames.RemindersToRecord, Team.Outreach),
  RequestWorkspaceAccess: feat(
    FeatureNames.RequestWorkspaceAccess,
    Team.Outreach
  ),
  ResetPassword: feat(FeatureNames.ResetPassword, Team.Outreach),
  RewatchBulkImport: feat(FeatureNames.RewatchBulkImport, Team.Rewatch),
  RovoVideoBackfill: feat(
    FeatureNames.RovoVideoBackfill,
    Team.IntegrationExperience
  ),
  SDKRecorder: feat(FeatureNames.SDKRecorder, Team.Capture),
  SFDC: feat(FeatureNames.SFDC, Team.IntegrateOrganizeCollaborate),
  ScopesAndLimits: feat(FeatureNames.ScopesAndLimits, Team.Billing),
  ScreenshotAnnotationsRepository: feat(
    FeatureNames.ScreenshotAnnotationsRepository,
    Team.EnterpriseReadiness
  ),
  ScreenshotSettings: feat(
    FeatureNames.ScreenshotSettings,
    Team.ShareAndTransform
  ),
  Screenshots: feat(FeatureNames.Screenshots, Team.ShareAndTransform),
  ScreenshotsIntelligence: feat(
    FeatureNames.ScreenshotsIntelligence,
    Team.ShareAndTransform
  ),
  Search: feat(FeatureNames.Search, Team.Mint),
  SearchSemantic: feat(FeatureNames.SearchSemantic, Team.Mint),
  SeasonalLaunch: feat(FeatureNames.SeasonalLaunch, Team.ShareAndTransform),
  SelfViewRepository: feat(FeatureNames.SelfView, Team.Outreach),
  SessionStore: feat(FeatureNames.SessionStore, Team.EnterpriseReadiness),
  ShadowBan: feat(FeatureNames.ShadowBan, Team.Outreach),
  ShareModal: feat(FeatureNames.ShareModal, Team.IntegrateOrganizeCollaborate),
  ShareModalEmailTab: feat(FeatureNames.ShareModalEmailTab, Team.Outreach),
  ShareModalEmbedTab: feat(
    FeatureNames.ShareModalEmbedTab,
    Team.IntegrateOrganizeCollaborate
  ),
  ShareModalGlobalFooter: feat(
    FeatureNames.ShareModalGlobalFooter,
    Team.IntegrateOrganizeCollaborate
  ),
  ShareModalPasswordSection: feat(
    FeatureNames.ShareModalPasswordSection,
    Team.IntegrateOrganizeCollaborate
  ),
  ShareModalShareTab: feat(FeatureNames.ShareModalShareTab, Team.Outreach),
  ShareModalSocialTab: feat(FeatureNames.ShareModalSocialTab, Team.Outreach),
  SharePage: feat(FeatureNames.SharePage, Team.CorePlatform),
  ShareToSpaceButton: feat(
    FeatureNames.ShareToSpaceButton,
    Team.IntegrateOrganizeCollaborate
  ),
  Signup: feat(FeatureNames.Signup, Team.Outreach),
  SiteEntity: feat(FeatureNames.SiteEntity, Team.EnterpriseReadiness),
  Slack: feat(FeatureNames.Slack, Team.IntegrateOrganizeCollaborate),
  SlackBacklinks: feat(
    FeatureNames.SlackBacklinks,
    Team.IntegrateOrganizeCollaborate
  ),
  SmartThumbnails: feat(FeatureNames.SmartThumbnails, Team.Mint),
  SocialLinkPreview: feat(FeatureNames.SocialLinkPreview, Team.Outreach),
  SpaceRepository: feat(
    FeatureNames.SpaceRepository,
    Team.IntegrateOrganizeCollaborate
  ),
  Spaces: feat(FeatureNames.Spaces, Team.IntegrateOrganizeCollaborate),
  SpeakerNotes: feat(FeatureNames.SpeakerNotes, Team.Capture),
  StaticFeatureFlag: feat(
    FeatureNames.StaticFeatureFlag,
    Team.EnterpriseReadiness
  ),
  StreamHubConsumer: feat(FeatureNames.StreamHubConsumer, Team.Workspaces),
  StreamHubConsumerCSAM: feat(FeatureNames.StreamHubConsumerCSAM, Team.Mint),
  StreamHubConsumerEntitlementCreated: feat(
    FeatureNames.StreamHubConsumerEntitlementCreated,
    Team.Billing
  ),
  StreamHubConsumerEntitlementUpdated: feat(
    FeatureNames.StreamHubConsumerEntitlementUpdated,
    Team.Billing
  ),
  StreamHubConsumerGroups: feat(
    FeatureNames.StreamHubConsumerGroups,
    Team.Workspaces
  ),
  StreamHubConsumerInvoiceUpdated: feat(
    FeatureNames.StreamHubConsumerInvoiceUpdated,
    Team.Billing
  ),
  StreamHubConsumerSoftDeleteTokenExpiry: feat(
    FeatureNames.StreamHubConsumerSoftDeleteTokenExpiry,
    Team.Workspaces
  ),
  StreamHubProducer: feat(FeatureNames.StreamHubProducer, Team.Outreach),
  StripeApi: feat(FeatureNames.StripeApi, Team.Billing),
  StripeEventHandler: feat(FeatureNames.StripeEventHandler, Team.Billing),
  StripeInvoice: feat(FeatureNames.StripeInvoice, Team.Billing),
  StripeSubscriptionUpdatedWebhook: feat(
    FeatureNames.StripeSubscriptionUpdatedWebhook,
    Team.Billing
  ),
  StylizedCaptions: feat(FeatureNames.StylizedCaptions, Team.ShareAndTransform),
  Subscription: feat(FeatureNames.Subscription, Team.Billing),
  SubscriptionAddOnRepository: feat(
    FeatureNames.SubscriptionAddOnRepository,
    Team.Billing
  ),
  SubscriptionDowngrade: feat(FeatureNames.SubscriptionDowngrade, Team.Billing),
  SuggestedWorkspaces: feat(FeatureNames.SuggestedWorkspaces, Team.Workspaces),
  Tagging: feat(FeatureNames.Tagging, Team.IntegrateOrganizeCollaborate),
  TcsApi: feat(FeatureNames.TcsApi, Team.IntegrationExperience),
  TcsSidecar: feat(FeatureNames.TcsSidecar, Team.Workspaces),
  TdpApi: feat(FeatureNames.TdpApi, Team.EnterpriseReadiness),
  TeamInsights: feat(FeatureNames.TeamInsights, Team.Outreach),
  TermsAndConditions: feat(FeatureNames.TeamInsights, Team.Outreach),
  Test: feat(FeatureNames.Test, Team.Undetermined),
  TestVideoCreation: feat(
    FeatureNames.TestVideoCreation,
    Team.ShareAndTransform
  ),
  ThumbnailGeneration: feat(FeatureNames.ThumbnailGeneration, Team.Mint),
  TitleBar: feat(FeatureNames.TitleBar, Team.ShareAndTransform),
  TouchUpAppearance: feat(FeatureNames.TouchUpAppearance, Team.Capture),
  Transcoding: feat(FeatureNames.Transcoding, Team.Mint),
  TranscriptEdit: feat(FeatureNames.TranscriptEdit, Team.ShareAndTransform),
  TranscriptExtraction: feat(
    FeatureNames.TranscriptExtraction,
    Team.ShareAndTransform
  ),
  TranscriptInsights: feat(FeatureNames.TranscriptInsights, Team.Outreach),
  TranscriptPanel: feat(FeatureNames.TranscriptPanel, Team.ShareAndTransform),
  TranscriptSpeakerAssignment: feat(
    FeatureNames.TranscriptSpeakerAssignment,
    Team.Rewatch
  ),
  TranscriptTools: feat(FeatureNames.TranscriptTools, Team.ShareAndTransform),
  TransferIn: feat(FeatureNames.TransferIn, Team.Workspaces),
  TranslatedCaptions: feat(
    FeatureNames.TranslatedCaptions,
    Team.ShareAndTransform
  ),
  TrendingLooms: feat(
    FeatureNames.TrendingLooms,
    Team.IntegrateOrganizeCollaborate
  ),
  UgcDataUseSettings: feat(
    FeatureNames.UgcDataUseSettings,
    Team.EnterpriseReadiness
  ),
  Undetermined: UNDETERMINED_FEATURE,
  UpgradeBrowser: feat(FeatureNames.UpgradeBrowser, Team.CorePlatform),
  UploadProxy: feat(FeatureNames.UploadProxy, Team.Mint),
  UsageBIZAITrialExperiment: feat(
    FeatureNames.UsageBIZAITrialExperiment,
    Team.Billing
  ),
  UserApolloCache: feat(FeatureNames.UserApolloCache, Team.CorePlatform),
  UserAvatars: feat(FeatureNames.UserAvatars, Team.Outreach),
  UserGraphql: feat(FeatureNames.UserGraphql, Team.CorePlatform),
  UserIdentityRepository: feat(
    FeatureNames.UserIdentityRepository,
    Team.Identity
  ),
  UserProperties: feat(FeatureNames.UserProperties, Team.Outreach),
  UserRedux: feat(FeatureNames.UserRedux, Team.CorePlatform),
  UserReports: feat(FeatureNames.UserReports, Team.Outreach),
  UserRepository: feat(FeatureNames.UserRepository, Team.CorePlatform),
  UserService: feat(FeatureNames.UserService, Team.CorePlatform),
  UserServiceInternal: feat(
    FeatureNames.UserServiceInternal,
    Team.CorePlatform
  ),
  Variables: feat(FeatureNames.Variables, Team.IntegrateOrganizeCollaborate),
  VideoArchival: feat(FeatureNames.VideoArchival, Team.ShareAndTransform),
  VideoBackground: feat(FeatureNames.VideoBackground, Team.ShareAndTransform),
  VideoClipRepository: feat(
    FeatureNames.VideoClipRepository,
    Team.ShareAndTransform
  ),
  VideoDeletion: feat(FeatureNames.VideoDeletion, Team.ShareAndTransform),
  VideoDocumentsRepository: feat(
    FeatureNames.VideoDocumentsRepository,
    Team.IntegrateOrganizeCollaborate
  ),
  VideoDownload: feat(FeatureNames.VideoDownload, Team.Mint),
  VideoDuplication: feat(FeatureNames.VideoDuplication, Team.ShareAndTransform),
  VideoEditing: feat(FeatureNames.VideoEditing, Team.ShareAndTransform),
  VideoGraphql: feat(FeatureNames.VideoGraphql, Team.CorePlatform),
  VideoIntelligence: feat(FeatureNames.VideoIntelligence, Team.Mint),
  VideoInternalService: feat(
    FeatureNames.VideoInternalService,
    Team.CorePlatform
  ),
  VideoMetadata: feat(FeatureNames.VideoMetadata, Team.ShareAndTransform),
  VideoPackaging: feat(FeatureNames.VideoPackaging, Team.ShareAndTransform),
  VideoPlayIntervalSummaryRepository: feat(
    FeatureNames.VideoPlayIntervalSummaryRepository,
    Team.Outreach
  ),
  VideoPlayback: feat(FeatureNames.VideoPlayback, Team.CorePlatform),
  VideoPlayer: feat(FeatureNames.VideoPlayer, Team.Mint),
  VideoPreload: feat(FeatureNames.VideoPreload, Team.CorePlatform),
  VideoReactions: feat(FeatureNames.VideoReactions, Team.ShareAndTransform),
  VideoRecovery: feat(FeatureNames.VideoRecovery, Team.ShareAndTransform),
  VideoRepository: feat(FeatureNames.VideoRepository, Team.CorePlatform),
  VideoService: feat(FeatureNames.VideoService, Team.CorePlatform),
  VideoSettings: feat(FeatureNames.VideoSettings, Team.ShareAndTransform),
  VideoSoftDeletion: feat(FeatureNames.VideoSoftDeletion, Team.Mint),
  VideoSpeakers: feat(FeatureNames.VideoSpeakers, Team.Rewatch),
  VideoSuggestion: feat(FeatureNames.VideoSuggestion, Team.Outreach),
  VideoTasks: feat(FeatureNames.VideoTasks, Team.ShareAndTransform),
  VideoUpload: feat(FeatureNames.VideoUpload, Team.ShareAndTransform),
  VideoZooms: feat(FeatureNames.VideoZooms, Team.ShareAndTransform),
  VirtualBackgrounds: feat(FeatureNames.VirtualBackgrounds, Team.Capture),
  WatchLater: feat(FeatureNames.WatchLater, Team.IntegrateOrganizeCollaborate),
  WaveformGeneration: feat(FeatureNames.WaveformGeneration, Team.Mint),
  WelcomeApp: feat(FeatureNames.WelcomeApp, Team.Activation),
  WelcomeAppDownloadOptions: feat(
    FeatureNames.WelcomeAppDownloadOptions,
    Team.Activation
  ),
  WelcomeAppInviteTeammatesStep: feat(
    FeatureNames.WelcomeAppInviteTeammatesStep,
    Team.Activation
  ),
  WelcomeAppMeetingRecording: feat(
    FeatureNames.WelcomeAppMeetingRecording,
    Team.Activation
  ),
  WelcomeAppPersona: feat(FeatureNames.WelcomeAppPersona, Team.Activation),
  WelcomeAppSuggestedWorkspaceStep: feat(
    FeatureNames.WelcomeAppSuggestedWorkspaceStep,
    Team.Activation
  ),
  WelcomeAppWelcomeStep: feat(
    FeatureNames.WelcomeAppWelcomeStep,
    Team.Activation
  ),
  WelcomeAppWorkspaceCreateStep: feat(
    FeatureNames.WelcomeAppWorkspaceCreateStep,
    Team.Activation
  ),
  WinterLaunch2025AITrialExperiment: feat(
    FeatureNames.WinterLaunch2025AITrialExperiment,
    Team.Billing
  ),
  WorkOS: feat(FeatureNames.WorkOS, Team.Outreach),
  WorkspaceAcf: feat(FeatureNames.WorkspaceAcf, Team.Workspaces),
  WorkspaceCache: feat(FeatureNames.WorkspaceCache, Team.Workspaces),
  WorkspaceConsolidationAdminTools: feat(
    FeatureNames.WorkspaceConsolidationAdminTools,
    Team.Outreach
  ),
  WorkspaceDeletionTokens: feat(
    FeatureNames.WorkspaceDeletionTokens,
    Team.Workspaces
  ),
  WorkspaceDisableDownload: feat(
    FeatureNames.WorkspaceDisableDownload,
    Team.EnterpriseReadiness
  ),
  WorkspaceDomains: feat(FeatureNames.WorkspaceDomains, Team.Workspaces),
  WorkspaceIndex: feat(FeatureNames.WorkspaceIndex, Team.EnterpriseReadiness),
  WorkspaceInsights: feat(FeatureNames.WorkspaceInsights, Team.Outreach),
  WorkspaceLimits: feat(FeatureNames.WorkspaceLimits, Team.Outreach),
  WorkspaceLinkExpiration: feat(
    FeatureNames.WorkspaceLinkExpiration,
    Team.EnterpriseReadiness
  ),
  WorkspaceLoader: feat(FeatureNames.WorkspaceLoader, Team.CorePlatform),
  WorkspaceManagement: feat(
    FeatureNames.WorkspaceManagement,
    Team.IntegrateOrganizeCollaborate
  ),
  WorkspaceMemberSearch: feat(
    FeatureNames.WorkspaceMemberSearch,
    Team.Workspaces
  ),
  WorkspacePrivacySettings: feat(
    FeatureNames.WorkspacePrivacySettings,
    Team.Undetermined
  ),
  WorkspaceRepository: feat(
    FeatureNames.WorkspaceRepository,
    Team.CorePlatform
  ),
  WorkspaceRequests: feat(FeatureNames.WorkspaceRequests, Team.Workspaces),
  WorkspaceService: feat(FeatureNames.WorkspaceService, Team.CorePlatform),
  WorkspaceSettings: feat(FeatureNames.WorkspaceSettings, Team.Workspaces),
  WorkspaceVideoActions: feat(
    FeatureNames.WorkspaceVideoActions,
    Team.ShareAndTransform
  ),
  Zoom: feat(FeatureNames.Zoom, Team.IntegrateOrganizeCollaborate)
};
const FEATURES_BY_NAME = Object.entries(Feature).reduce((map, [_, feature]) => {
  map[feature.name] = feature;
  return map;
}, {});
const getTeamFromFeatureName = (featureName) => {
  var _a, _b;
  return (_b = (_a = FEATURES_BY_NAME[featureName]) == null ? void 0 : _a.team) != null ? _b : Team.Undetermined;
};
export {
  Feature,
  Page,
  Team,
  getTeamFromFeatureName
};
//# sourceMappingURL=product.js.map
