export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A type for a versatile value that could be any basic data type or JSON. */
  BasicScalar: { input: any; output: any; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AiAddonPrices = {
  __typename?: 'AIAddonPrices';
  annual?: Maybe<Price>;
  monthly?: Maybe<Price>;
};

export type AcceptInviteLinkInvitationPayload = {
  __typename?: 'AcceptInviteLinkInvitationPayload';
  redirect: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AcceptInviteLinkInvitationResponse = AcceptInviteLinkInvitationPayload | GenericError | InviteLinkDisabledError | InviteLinkNotFoundError | InviteLinkWorkspaceSsoError | UserNotAuthorizedError;

export enum Access {
  CanEdit = 'can_edit',
  CanView = 'can_view',
  Disabled = 'disabled'
}

export type AccessibleJiraSitesPayload = {
  __typename?: 'AccessibleJiraSitesPayload';
  /** Whether the user needs to authenticate with Atlassian or not before proceeding */
  needsAtlassianAuth?: Maybe<Scalars['Boolean']['output']>;
  responseCode?: Maybe<JiraAuthResponseCode>;
  responseMessage?: Maybe<Scalars['String']['output']>;
  /** The Jira sites/workspaces available to the user */
  sites: Array<JiraSite>;
};

export type AccessibleJiraSitesResponse = AccessibleJiraSitesPayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type AccountCreatedButNoTermsAccepted = Error & {
  __typename?: 'AccountCreatedButNoTermsAccepted';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type AccountIsExternallyMasteredError = Error & {
  __typename?: 'AccountIsExternallyMasteredError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export enum AccountSuspensionReasons {
  SuspendedNonPayment = 'suspended_non_payment'
}

export type AcknowledgedSessionSyncTokenError = Error & {
  __typename?: 'AcknowledgedSessionSyncTokenError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

/** The ACL entries for a video */
export type AclEntries = {
  __typename?: 'AclEntries';
  /** The domain ACL entries, if they exist */
  domainEntries?: Maybe<Array<Maybe<DomainVideoAclEntry>>>;
  /** The workspace ACL entry, if one exists */
  workspaceEntry?: Maybe<WorkspaceVideoAclEntry>;
};

export type ActiveUsersGraphInsights = {
  __typename?: 'ActiveUsersGraphInsights';
  activeUsersCountDataPoints?: Maybe<Array<Maybe<DataPoint>>>;
  activeUsersCountTimestampType?: Maybe<TimestampType>;
};

export type ActivityResponse = {
  __typename?: 'ActivityResponse';
  comment_post_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  responded_at?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<RegularUser>;
  user_id: Scalars['Int']['output'];
};

export type AddActiveClipsToVideoPayload = {
  __typename?: 'AddActiveClipsToVideoPayload';
  video?: Maybe<RegularUserVideo>;
};

export type AddActiveClipsToVideoResponse = AddActiveClipsToVideoPayload | GenericError | InputValidationError | InvalidRequestWarning | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type AddAssetPayload = {
  __typename?: 'AddAssetPayload';
  asset: Asset;
};

export type AddAssetResponse = AddAssetPayload | GenericError | UserNotAuthorizedError;

export type AddAutoZoomsToVideoInput = {
  /** videoId to add auto zooms to */
  videoId: Scalars['ID']['input'];
};

export type AddAutoZoomsToVideoPayload = {
  __typename?: 'AddAutoZoomsToVideoPayload';
  video: RegularUserVideo;
};

export type AddAutoZoomsToVideoResponse = AddAutoZoomsToVideoPayload | GenericError | UserNotAuthorizedError;

export type AddDomainsToApiKeyUnion = GenericError | AddDomainsToApiKeyResult;

export type AddMemberToWorkspacePayload = {
  __typename?: 'AddMemberToWorkspacePayload';
  ok: Scalars['Boolean']['output'];
};

export type AddMemberToWorkspaceResponse = AddMemberToWorkspacePayload | GenericError;

/** Add on enabled */
export type AddOnEnabled = {
  AI: Scalars['Boolean']['input'];
};

export type AddOrEditVideoEmailPayload = {
  __typename?: 'AddOrEditVideoEmailPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddOrEditVideoEmailResponse = AddOrEditVideoEmailPayload | GenericError | UserNotAuthorizedError;

export type AddParentSpaceToFolderPermissionsResponse = GenericError | InputValidationError | UserNotAuthorizedError | AddParentSpaceToFolderPermissionsPayload;

export type AddSsoDomain = {
  __typename?: 'AddSsoDomain';
  addSsoDomain: Scalars['Boolean']['output'];
};

export type AddSsoDomainForOrgResponse = AddSsoDomain | GenericError | InputValidationError | UserNotAuthorizedError;

export type AddSubscriptionItemsResponse = GenericError | InputValidationError | OperationResultStatus | UserNotAuthorizedError;

export type AddTagToVideoPayload = {
  __typename?: 'AddTagToVideoPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
};

export type AddTagToVideoResponse = AddTagToVideoPayload | GenericError | InputValidationError | TagsPasswordProtectedVideoError | UserNotAuthorizedError;

export type AddUserToScreenshotAccess = {
  __typename?: 'AddUserToScreenshotAccess';
  /** Screenshot privacy */
  privacy?: Maybe<ScreenshotPrivacyTypes>;
};

export type AddUserToScreenshotAccessResponse = AddUserToScreenshotAccess | EntityNotFoundError | GenericError | UserNotAuthorizedError;

export type AddUserToSpacePayload = {
  __typename?: 'AddUserToSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddUserToSpaceResponse = AddUserToSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AddUsersOrGroupsToFolderPermissionsResponse = GenericError | InputValidationError | UserNotAuthorizedError | AddUsersOrGroupsToFolderPermissionsPayload;

export type AddUsersToWorkspaceGroupResponse = GenericError | InputValidationError | UserNotAuthorizedError | AddUsersToWorkspaceGroupPayload;

export type AddVideoClipsPayload = {
  __typename?: 'AddVideoClipsPayload';
  clips?: Maybe<Array<Maybe<VideoClipDetails>>>;
};

export type AddVideoClipsResponse = AddVideoClipsPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError | WeaveCreatorDisabledStitching | WeavePasswordProtectedVideoError;

export type AddVideoToWatchLaterListPayload = {
  __typename?: 'AddVideoToWatchLaterListPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddVideoToWatchLaterListResponse = AddVideoToWatchLaterListPayload | GenericError | UserNotAuthorizedError;

/** Add on within a subscription */
export enum Addon {
  Ai = 'AI'
}

export type AddonPrices = {
  __typename?: 'AddonPrices';
  AI?: Maybe<AiAddonPrices>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type AdminAddMembersToWorkspacePayload = {
  __typename?: 'AdminAddMembersToWorkspacePayload';
  message: Scalars['String']['output'];
  ok: Scalars['Boolean']['output'];
};

export type AdminAddMembersToWorkspaceResponse = AdminAddMembersToWorkspacePayload | GenericError | UserNotAuthorizedError;

export type AdminAddOrExtendTrialPayload = {
  __typename?: 'AdminAddOrExtendTrialPayload';
  billing_period?: Maybe<BillingPeriod>;
  plan?: Maybe<Plan>;
};

export type AdminAddSpaceMembersPayload = {
  __typename?: 'AdminAddSpaceMembersPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminAddSpaceMembersResponse = AdminAddSpaceMembersPayload | GenericError | UserNotAuthorizedError;

export type AdminAddWorkspaceDomainPayload = {
  __typename?: 'AdminAddWorkspaceDomainPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminAddWorkspaceDomainResponse = AdminAddWorkspaceDomainPayload | GenericError | UserNotAuthorizedError;

export type AdminAddWorkspaceToQuantityJobPayload = {
  __typename?: 'AdminAddWorkspaceToQuantityJobPayload';
  count?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminAddWorkspaceToQuantityJobResponse = AdminAddWorkspaceToQuantityJobPayload | GenericError | UserNotAuthorizedError;

export type AdminAutoContextAuditLog = {
  __typename?: 'AdminAutoContextAuditLog';
  featureStatuses?: Maybe<Array<Maybe<AdminAutoContextFeatureStatus>>>;
  language?: Maybe<AutoContextLanguage>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AdminAutoContextFeatureStatus = {
  __typename?: 'AdminAutoContextFeatureStatus';
  featureKey?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AutoContextFeatureStatusValue>;
};

export type AdminBackfillBillingEntityPayload = {
  __typename?: 'AdminBackfillBillingEntityPayload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminBackfillBillingEntityResponse = AdminBackfillBillingEntityPayload | GenericError | UserNotAuthorizedError;

export type AdminBackfillStripeCustomerPayload = {
  __typename?: 'AdminBackfillStripeCustomerPayload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminBackfillStripeCustomerResponse = AdminBackfillStripeCustomerPayload | GenericError | UserNotAuthorizedError;

export type AdminBillingProductsPayload = {
  __typename?: 'AdminBillingProductsPayload';
  products?: Maybe<Array<Maybe<BillingProduct>>>;
};

export type AdminBillingProductsResponse = AdminBillingProductsPayload | GenericError | UserNotAuthorizedError;

export type AdminBulkAddTagToVideoPayload = {
  __typename?: 'AdminBulkAddTagToVideoPayload';
  failedVideoIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  successfulTags?: Maybe<Scalars['Int']['output']>;
  unsuccessfulTags?: Maybe<Scalars['Int']['output']>;
};

export type AdminBulkAddTagToVideosResponse = AdminBulkAddTagToVideoPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkBanUsersPayload = {
  __typename?: 'AdminBulkBanUsersPayload';
  alreadyBannedUserIds?: Maybe<Array<Scalars['String']['output']>>;
  already_banned: Scalars['Int']['output'];
  failedUserIds?: Maybe<Array<Scalars['String']['output']>>;
  failed_banned: Scalars['Int']['output'];
  successfully_banned: Scalars['Int']['output'];
};

export type AdminBulkBanUsersResponse = AdminBulkBanUsersPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkDeleteGroupingsByPrimaryKeyPayload = {
  __typename?: 'AdminBulkDeleteGroupingsByPrimaryKeyPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminBulkDeleteGroupingsByPrimaryKeyResponse = AdminBulkDeleteGroupingsByPrimaryKeyPayload | GenericError | UserNotAuthorizedError;

export type AdminBulkDeleteSlackMessagesPayload = {
  __typename?: 'AdminBulkDeleteSlackMessagesPayload';
  failedToDeleteMessages: Array<Maybe<FailedToDeleteSlackMessage>>;
  message: Scalars['String']['output'];
};

export type AdminBulkDeleteSlackMessagesResponse = AdminBulkDeleteSlackMessagesPayload | GenericError | UserNotAuthorizedError;

export type AdminBulkImportVideosPayload = {
  __typename?: 'AdminBulkImportVideosPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminBulkImportVideosResponse = AdminBulkImportVideosPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkMoveFoldersPayload = {
  __typename?: 'AdminBulkMoveFoldersPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  updatedFolders?: Maybe<Scalars['Int']['output']>;
  updatedVideos?: Maybe<Scalars['Int']['output']>;
};

export type AdminBulkMoveFoldersResponse = AdminBulkMoveFoldersPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkMoveFoldersToSpacePayload = {
  __typename?: 'AdminBulkMoveFoldersToSpacePayload';
  failedFolderIds: Array<Scalars['String']['output']>;
  failedVideoIds: Array<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  successfulFolderIds: Array<Scalars['String']['output']>;
  successfulVideoIds: Array<Scalars['String']['output']>;
};

export type AdminBulkMoveFoldersToSpaceResponse = AdminBulkMoveFoldersToSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkMoveVideosPayload = {
  __typename?: 'AdminBulkMoveVideosPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  updatedVideos?: Maybe<Scalars['Int']['output']>;
};

export type AdminBulkMoveVideosResponse = AdminBulkMoveVideosPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkMoveVideosToSpacePayload = {
  __typename?: 'AdminBulkMoveVideosToSpacePayload';
  failedVideoIds: Array<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  successfulVideoIds: Array<Scalars['String']['output']>;
};

export type AdminBulkMoveVideosToSpaceResponse = AdminBulkMoveVideosToSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkOverridePlaybackSourcePayload = {
  __typename?: 'AdminBulkOverridePlaybackSourcePayload';
  failures?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
};

export type AdminBulkOverridePlaybackSourceResponse = AdminBulkOverridePlaybackSourcePayload | GenericError | UserNotAuthorizedError;

export type AdminBulkShareVideosToSpacePayload = {
  __typename?: 'AdminBulkShareVideosToSpacePayload';
  jobId?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminBulkShareVideosToSpaceResponse = AdminBulkShareVideosToSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminBulkTransferVideosToUserResponse = BulkTransferVideosToUserPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminCacheWorkosOrgDomainsPayload = {
  __typename?: 'AdminCacheWorkosOrgDomainsPayload';
  failedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AdminCacheWorkosOrgDomainsResponse = AdminCacheWorkosOrgDomainsPayload | GenericError | UserNotAuthorizedError;

export type AdminCancelPendingDowngradeRequestPayloadType = {
  __typename?: 'AdminCancelPendingDowngradeRequestPayloadType';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminCancelPendingDowngradeResponse = AdminCancelPendingDowngradeRequestPayloadType | GenericError | UserNotAuthorizedError;

export type AdminChangeSpacesStatePayload = {
  __typename?: 'AdminChangeSpacesStatePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminChangeSpacesStateResponse = AdminChangeSpacesStatePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminChangeUserEmailResponse = GenericError | UserEmailChangeResponse | UserNotAuthorizedError;

export type AdminConvertVideoToV6Payload = {
  __typename?: 'AdminConvertVideoToV6Payload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminConvertVideoToV6Response = AdminConvertVideoToV6Payload | GenericError | UserNotAuthorizedError;

export type AdminDeleteAllSessionsForUserPayload = {
  __typename?: 'AdminDeleteAllSessionsForUserPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminDeleteAllSessionsForUserResponse = AdminDeleteAllSessionsForUserPayload | GenericError | UserNotAuthorizedError;

export type AdminDeleteSessionForUserPayload = {
  __typename?: 'AdminDeleteSessionForUserPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminDeleteSessionForUserResponse = AdminDeleteSessionForUserPayload | GenericError | UserNotAuthorizedError;

export type AdminDeleteUserResponse = {
  __typename?: 'AdminDeleteUserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminDeleteWorkspaceMemberPayload = {
  __typename?: 'AdminDeleteWorkspaceMemberPayload';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AdminDeleteWorkspaceMemberResponse = AdminDeleteWorkspaceMemberPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminDisconnectSlackSubscriptionConnectionByIdPayload = {
  __typename?: 'AdminDisconnectSlackSubscriptionConnectionByIdPayload';
  success: Scalars['Boolean']['output'];
};

export type AdminDisconnectSlackSubscriptionConnectionByIdResponse = AdminDisconnectSlackSubscriptionConnectionByIdPayload | GenericError | UserNotAuthorizedError;

export type AdminDispatchStreamHubMessage = {
  __typename?: 'AdminDispatchStreamHubMessage';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminDispatchStreamHubMessageResponse = AdminDispatchStreamHubMessage | GenericError | UserNotAuthorizedError;

export type AdminEditableTranscript = {
  __typename?: 'AdminEditableTranscript';
  language?: Maybe<Language>;
  monologues: Array<EditableMonologue>;
  status?: Maybe<MediaTranscriptStatus>;
};

export type AdminEndTrialPayload = {
  __typename?: 'AdminEndTrialPayload';
  billing_period?: Maybe<BillingPeriod>;
  plan?: Maybe<Plan>;
};

export type AdminEvaluatePrivacyAndDiscoverabilityForUserPayload = {
  __typename?: 'AdminEvaluatePrivacyAndDiscoverabilityForUserPayload';
  discoverability?: Maybe<DiscoverabilityEvaluation>;
  privacy?: Maybe<PrivacyEvaluation>;
};

export type AdminEvaluatePrivacyAndDiscoverabilityForUserResponse = AdminEvaluatePrivacyAndDiscoverabilityForUserPayload | GenericError | UserNotAuthorizedError;

export type AdminFfProbeClipData = {
  __typename?: 'AdminFFProbeClipData';
  clipFFProbeAudioData: Scalars['String']['output'];
  clipFFProbeVideoData: Scalars['String']['output'];
  clipId: Scalars['String']['output'];
};

export type AdminFfProbeData = {
  __typename?: 'AdminFFProbeData';
  clipFFProbeData: Array<AdminFfProbeClipData>;
  videoFFProbeAudioData?: Maybe<Scalars['String']['output']>;
  videoFFProbeVideoData?: Maybe<Scalars['String']['output']>;
  videoId: Scalars['ID']['output'];
};

export type AdminFfProbeDataResponse = AdminFfProbeData | GenericError | UserNotAuthorizedError;

export type AdminFetchDesktopLogsPayload = {
  __typename?: 'AdminFetchDesktopLogsPayload';
  logFileObjects?: Maybe<Array<Maybe<LogFileObject>>>;
};

export type AdminFetchDesktopVersionPayload = {
  __typename?: 'AdminFetchDesktopVersionPayload';
  macDesktopVersion?: Maybe<Scalars['String']['output']>;
  windowsDesktopVersion?: Maybe<Scalars['String']['output']>;
};

export type AdminFindFoldersPayload = {
  __typename?: 'AdminFindFoldersPayload';
  folders?: Maybe<Array<Maybe<RegularUserFolder>>>;
};

export type AdminFindFoldersResponse = AdminFindFoldersPayload | GenericError | UserNotAuthorizedError;

export type AdminFindSpacesPayload = {
  __typename?: 'AdminFindSpacesPayload';
  spaces?: Maybe<Array<Maybe<Space>>>;
};

export type AdminFindSpacesResponse = AdminFindSpacesPayload | GenericError | UserNotAuthorizedError;

export type AdminFindUsersInDomainResponse = FindUsersInDomainPayload | GenericError | UserNotAuthorizedError;

export type AdminFlushWorkosDomainsPayload = {
  __typename?: 'AdminFlushWorkosDomainsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminFlushWorkosDomainsResponse = AdminFlushWorkosDomainsPayload | GenericError | UserNotAuthorizedError;

export type AdminForceAtlassianMasterUsers = {
  __typename?: 'AdminForceAtlassianMasterUsers';
  results?: Maybe<Array<Maybe<AdminForceAtlassianMasterUsersResult>>>;
};

export type AdminForceAtlassianMasterUsersInput = {
  sendAtlassianProfileMergedEmail: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};

export type AdminForceAtlassianMasterUsersResponse = AdminForceAtlassianMasterUsers | GenericError | UserNotAuthorizedError;

export type AdminForceAtlassianMasterUsersResult = {
  __typename?: 'AdminForceAtlassianMasterUsersResult';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  userId: Scalars['ID']['output'];
};

export type AdminForceTriggerDataRetentionResponse = DataRetentionTriggerResponse | GenericError | UserNotAuthorizedError;

export type AdminGetAiLimitPayload = {
  __typename?: 'AdminGetAILimitPayload';
  hasAddOn?: Maybe<Scalars['Boolean']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminGetAiLimitResponse = AdminGetAiLimitPayload | GenericError | UserNotAuthorizedError;

export type AdminGetAutoContextAuditLogPayload = {
  __typename?: 'AdminGetAutoContextAuditLogPayload';
  auditLog: AdminAutoContextAuditLog;
  error: Scalars['String']['output'];
  promptInfo?: Maybe<AdminPromptInfo>;
};

export type AdminGetAutoContextAuditLogResponse = AdminGetAutoContextAuditLogPayload | EntityNotFoundError | GenericError | UserNotAuthorizedError;

export type AdminGetBillingEntityPayload = {
  __typename?: 'AdminGetBillingEntityPayload';
  status?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type AdminGetBillingEntityResponse = AdminGetBillingEntityPayload | GenericError | UserNotAuthorizedError;

export type AdminGetCalendarInfoPayload = {
  __typename?: 'AdminGetCalendarInfoPayload';
  calendarInfo: Array<CalendarInfo>;
};

export type AdminGetCalendarInfoResponse = AdminGetCalendarInfoPayload | GenericError | UserNotAuthorizedError;

export type AdminGetDesktopLogsResponse = AdminFetchDesktopLogsPayload | GenericError | UserNotAuthorizedError;

export type AdminGetDesktopVersionResponse = AdminFetchDesktopVersionPayload | GenericError | UserNotAuthorizedError;

export type AdminGetDeveloperAccountResponse = AdminSdkApiKeys | GenericError | UserNotAuthorizedError;

/** Get all clip Editable transcript for a video */
export type AdminGetEditableTranscriptPayload = {
  __typename?: 'AdminGetEditableTranscriptPayload';
  video: VideoWithEditableTranscriptOrClips;
};

export type AdminGetEditableTranscriptResponse = AdminGetEditableTranscriptPayload | GenericError | UserNotAuthorizedError;

export type AdminGetEmailDigestInsightsPayloadType = {
  __typename?: 'AdminGetEmailDigestInsightsPayloadType';
  monthlyDigestInsights?: Maybe<Scalars['String']['output']>;
};

export type AdminGetEmailDigestInsightsResponse = AdminGetEmailDigestInsightsPayloadType | GenericError | UserNotAuthorizedError;

export type AdminGetFolderPermissionsPayload = {
  __typename?: 'AdminGetFolderPermissionsPayload';
  inheritPermissions: Scalars['Boolean']['output'];
  permissions?: Maybe<FolderAclEntrySet>;
};

export type AdminGetFolderPermissionsResponse = AdminGetFolderPermissionsPayload | GenericError | UserNotAuthorizedError;

export type AdminGetGroupingsByVideoIdPayload = {
  __typename?: 'AdminGetGroupingsByVideoIdPayload';
  groupings?: Maybe<GroupingConnection>;
};


export type AdminGetGroupingsByVideoIdPayloadGroupingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  videoId: Scalars['ID']['input'];
};

export type AdminGetGroupingsByVideoIdResponse = AdminGetGroupingsByVideoIdPayload | GenericError | UserNotAuthorizedError;

export type AdminGetIncentiveEligibleInvitesResponse = GenericError | UserNotAuthorizedError | AdminGetIncentiveEligibleInvitesPayloadType;

export type AdminGetIntegrationSubscriptionQueryResponse = GenericError | IntegrationSubscription | UserNotAuthorizedError;

export type AdminGetIntegrationSubscriptionsForSalesforcePayload = {
  __typename?: 'AdminGetIntegrationSubscriptionsForSalesforcePayload';
  integrationSubscriptions?: Maybe<Array<Maybe<IntegrationSubscriptionWithWorkspaceInformation>>>;
};

export type AdminGetIntegrationSubscriptionsForSalesforceResponse = AdminGetIntegrationSubscriptionsForSalesforcePayload | GenericError | UserNotAuthorizedError;

export type AdminGetInvoiceDetailsPayload = {
  __typename?: 'AdminGetInvoiceDetailsPayload';
  amount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  members?: Maybe<Array<Maybe<MembershipRoleUpdates>>>;
  period_end?: Maybe<Scalars['Date']['output']>;
  period_start?: Maybe<Scalars['Date']['output']>;
  workspace_id?: Maybe<Scalars['Int']['output']>;
  workspace_idv2?: Maybe<Scalars['ID']['output']>;
  workspace_name?: Maybe<Scalars['String']['output']>;
};

export type AdminGetInvoiceDetailsResponse = AdminGetInvoiceDetailsPayload | GenericError | UserNotAuthorizedError;

export type AdminGetInvoicesPayload = {
  __typename?: 'AdminGetInvoicesPayload';
  /** Invoices from Loom */
  loomInvoices: Array<LoomInvoice>;
  /** Invoices from Stripe */
  stripeInvoices: Array<StripeInvoice>;
};

export type AdminGetInvoicesResponse = AdminGetInvoicesPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminGetJobStatusPayload = {
  __typename?: 'AdminGetJobStatusPayload';
  completed: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  output?: Maybe<Scalars['JSON']['output']>;
  progress: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type AdminGetJobStatusResponse = AdminGetJobStatusPayload | GenericError | UserNotAuthorizedError;

export type AdminGetLegacyWorkspaceMigrationPayload = {
  __typename?: 'AdminGetLegacyWorkspaceMigrationPayload';
  entitlementId: Scalars['String']['output'];
  entitlementSlug: Scalars['String']['output'];
  migrationCompletedAt?: Maybe<Scalars['String']['output']>;
  optOut?: Maybe<Scalars['Boolean']['output']>;
  status: Scalars['String']['output'];
  workspaceId: Scalars['String']['output'];
};

export type AdminGetLegacyWorkspaceMigrationResponse = AdminGetLegacyWorkspaceMigrationPayload | GenericError | UserNotAuthorizedError;

/** Get all clip SoT transcript for a video */
export type AdminGetMediaTranscriptPayload = {
  __typename?: 'AdminGetMediaTranscriptPayload';
  video: VideoWithMediaTranscriptOrClips;
};

export type AdminGetMediaTranscriptResponse = AdminGetMediaTranscriptPayload | GenericError | UserNotAuthorizedError;

export type AdminGetMeetingBotInfoPayload = {
  __typename?: 'AdminGetMeetingBotInfoPayload';
  meetingBotInfos: Array<Maybe<AdminMeetingBotInfo>>;
};

export type AdminGetMeetingBotInfoResponse = AdminGetMeetingBotInfoPayload | GenericError | UserNotAuthorizedError;

export type AdminGetMeetingInfoPayload = {
  __typename?: 'AdminGetMeetingInfoPayload';
  calendarMeetings?: Maybe<Array<LoomMeeting>>;
  impromptuMeetings?: Maybe<Array<ImpromptuMeeting>>;
  videoMeeting?: Maybe<VideoMeeting>;
};

export type AdminGetMeetingInfoResponse = AdminGetMeetingInfoPayload | GenericError | UserNotAuthorizedError;

export type AdminGetMostRecentUserVideoRecordingClientVersionPayload = {
  __typename?: 'AdminGetMostRecentUserVideoRecordingClientVersionPayload';
  createdAt: Scalars['Date']['output'];
  recordingClientOs?: Maybe<Scalars['String']['output']>;
  recordingClientOsVersion?: Maybe<Scalars['String']['output']>;
  recordingClientType?: Maybe<Scalars['String']['output']>;
  recordingClientVersion?: Maybe<Scalars['String']['output']>;
  videoId?: Maybe<Scalars['String']['output']>;
};

export type AdminGetMostRecentUserVideoRecordingClientVersionResponse = AdminGetMostRecentUserVideoRecordingClientVersionPayload | GenericError | UserNotAuthorizedError;

export type AdminGetReferralLinkUrlPayloadType = {
  __typename?: 'AdminGetReferralLinkUrlPayloadType';
  enabled?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  referral_link_url?: Maybe<Scalars['String']['output']>;
};

export type AdminGetReferralLinkUrlResponse = AdminGetReferralLinkUrlPayloadType | GenericError | UserNotAuthorizedError;

export type AdminGetSessionsForUserPayload = {
  __typename?: 'AdminGetSessionsForUserPayload';
  sessions?: Maybe<Array<Maybe<UserSession>>>;
};

export type AdminGetSessionsForUserResponse = AdminGetSessionsForUserPayload | GenericError | UserNotAuthorizedError;

export type AdminGetSlackSubscriptionConnectionsForUserPayload = {
  __typename?: 'AdminGetSlackSubscriptionConnectionsForUserPayload';
  countOfSubscriptions?: Maybe<Scalars['Int']['output']>;
  formattedUserConnections?: Maybe<Array<Maybe<FormattedUserConnections>>>;
};

export type AdminGetSlackSubscriptionConnectionsForUserResponse = AdminGetSlackSubscriptionConnectionsForUserPayload | GenericError | UserNotAuthorizedError;

export type AdminGetSpaceMembersPayload = {
  __typename?: 'AdminGetSpaceMembersPayload';
  members?: Maybe<Array<Maybe<SpaceMember>>>;
};

export type AdminGetSpaceMembersResponse = AdminGetSpaceMembersPayload | GenericError | UserNotAuthorizedError;

export type AdminGetSpacePayload = {
  __typename?: 'AdminGetSpacePayload';
  space?: Maybe<Space>;
};

export type AdminGetSpaceResponse = AdminGetSpacePayload | GenericError | UserNotAuthorizedError;

export type AdminGetSpaceVideosPayload = {
  __typename?: 'AdminGetSpaceVideosPayload';
  videos?: Maybe<RegularUserVideoConnection>;
};


export type AdminGetSpaceVideosPayloadVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  spaceId: Scalars['ID']['input'];
};

export type AdminGetSpaceVideosResponse = AdminGetSpaceVideosPayload | GenericError | UserNotAuthorizedError;

export type AdminGetStripeEventDetailsPayload = {
  __typename?: 'AdminGetStripeEventDetailsPayload';
  createdAt?: Maybe<Scalars['Date']['output']>;
  data?: Maybe<Scalars['BasicScalar']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  workspace_id?: Maybe<Scalars['Int']['output']>;
  workspace_idv2?: Maybe<Scalars['ID']['output']>;
};

export type AdminGetStripeEventDetailsResponse = AdminGetStripeEventDetailsPayload | GenericError | UserNotAuthorizedError;

export type AdminGetTagsByVideoIdResponse = GenericError | GetTagsByVideoIdPayload | UserNotAuthorizedError;

export type AdminGetTierPricesPayload = {
  __typename?: 'AdminGetTierPricesPayload';
  priceHistory?: Maybe<PriceHistory>;
  tierPrices?: Maybe<Array<Maybe<TierPricesArray>>>;
};

export type AdminGetTierPricesResponse = AdminGetTierPricesPayload | GenericError | UserNotAuthorizedError;

export type AdminGetTopWorkspaceByUserEmailDomainResponse = GenericError | JoinableWorkspace | UserNotAuthorizedError;

export type AdminGetTranscodeStatusArgs = {
  jobType: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
};

export type AdminGetTranscodeStatusPayload = {
  __typename?: 'AdminGetTranscodeStatusPayload';
  videoStatuses: Array<Maybe<GetVideoTranscodeStatus>>;
};

export type AdminGetTranscodeStatusResponse = AdminGetTranscodeStatusPayload | GenericError | UserNotAuthorizedError;

export type AdminGetUserPayload = {
  __typename?: 'AdminGetUserPayload';
  user: RegularUser;
};

export type AdminGetUserPropertyResponse = GenericError | PersonProperty | UserNotAuthorizedError;

export type AdminGetUserResponse = AdminGetUserPayload | GenericError | UserNotAuthorizedError;

export type AdminGetUsersByDomainPayload = {
  __typename?: 'AdminGetUsersByDomainPayload';
  totalUserCount?: Maybe<Scalars['Int']['output']>;
  usersWithWorkspacePlan?: Maybe<Array<Maybe<UserWithWorkspacePlan>>>;
};

export type AdminGetUsersByDomainResponse = AdminGetUsersByDomainPayload | GenericError | UserNotAuthorizedError;

export type AdminGetUsersPayload = {
  __typename?: 'AdminGetUsersPayload';
  users: Array<Maybe<RegularUser>>;
};

export type AdminGetUsersResponse = AdminGetUsersPayload | GenericError | UserNotAuthorizedError;

export type AdminGetVariablesVideosAndFolderInformationPayload = {
  __typename?: 'AdminGetVariablesVideosAndFolderInformationPayload';
  childVideos?: Maybe<Array<Maybe<RegularUserVideo>>>;
  parentVideo?: Maybe<RegularUserVideo>;
};

export type AdminGetVariablesVideosAndFolderInformationResponse = AdminGetVariablesVideosAndFolderInformationPayload | GenericError | UserNotAuthorizedError;

export type AdminGetVideoGroupingsByOwnerPayload = {
  __typename?: 'AdminGetVideoGroupingsByOwnerPayload';
  groupings?: Maybe<GroupingConnection>;
};


export type AdminGetVideoGroupingsByOwnerPayloadGroupingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  userQuery: Scalars['String']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type AdminGetVideoGroupingsByOwnerResponse = AdminGetVideoGroupingsByOwnerPayload | GenericError | UserNotAuthorizedError;

export type AdminGetVideoSharesPayload = {
  __typename?: 'AdminGetVideoSharesPayload';
  /** Spaces where this video is posted */
  spacePostings?: Maybe<Array<AdminVideoSpacePosting>>;
  /** Users this video has been shared with */
  userShares?: Maybe<Array<AdminVideoUserShare>>;
};

export type AdminGetVideoSharesResponse = AdminGetVideoSharesPayload | GenericError | UserNotAuthorizedError;

/** Filtered paginated list of videos */
export type AdminGetVideosPayload = {
  __typename?: 'AdminGetVideosPayload';
  video?: Maybe<RegularUserVideo>;
  videoConnection?: Maybe<AdminGetVideosPayloadVideoConnection_Connection>;
};


/** Filtered paginated list of videos */
export type AdminGetVideosPayloadVideoArgs = {
  id: Scalars['ID']['input'];
};


/** Filtered paginated list of videos */
export type AdminGetVideosPayloadVideoConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  createdAfter?: InputMaybe<Scalars['String']['input']>;
  createdBefore?: InputMaybe<Scalars['String']['input']>;
  filterFolderId?: InputMaybe<Scalars['ID']['input']>;
  filterUserId?: InputMaybe<Scalars['ID']['input']>;
  filterWorkspaceId?: InputMaybe<Scalars['ID']['input']>;
  first: Scalars['Int']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  includeArchived?: InputMaybe<Scalars['Boolean']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  recordingClient?: InputMaybe<Scalars['String']['input']>;
  recordingVersion?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type AdminGetVideosPayloadVideoConnection_Connection = {
  __typename?: 'AdminGetVideosPayloadVideoConnection_Connection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<RegularUserVideoEdge>>>;
  /** Flattened list of RegularUserVideo type */
  nodes?: Maybe<Array<Maybe<RegularUserVideo>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  /** Total number of videos (excluding text search) */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type AdminGetVideosResponse = AdminGetVideosPayload | GenericError | UserNotAuthorizedError;

/** Get all clip Viewable transcript for a video */
export type AdminGetViewableTranscriptPayload = {
  __typename?: 'AdminGetViewableTranscriptPayload';
  video: VideoWithViewableTranscriptOrClips;
};

export type AdminGetViewableTranscriptResponse = AdminGetViewableTranscriptPayload | GenericError | UserNotAuthorizedError;

export type AdminGetVisibleTotalForTagResponse = GenericError | GetVisibleTotalForTagPayload | UserNotAuthorizedError;

export type AdminGetWorkosConnectionPayload = {
  __typename?: 'AdminGetWorkosConnectionPayload';
  data: Scalars['JSON']['output'];
};

export type AdminGetWorkosConnectionResponse = AdminGetWorkosConnectionPayload | GenericError | UserNotAuthorizedError;

export type AdminGetWorkosDomainsPayload = {
  __typename?: 'AdminGetWorkosDomainsPayload';
  domains?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AdminGetWorkosDomainsResponse = AdminGetWorkosDomainsPayload | GenericError | UserNotAuthorizedError;

export type AdminGetWorkosUserIdsPayload = {
  __typename?: 'AdminGetWorkosUserIdsPayload';
  failedUsers: Array<GetWorkosUserQueryFailure>;
  users: Array<GetWorkosUser>;
};

export type AdminGetWorkosUserIdsResponse = AdminGetWorkosUserIdsPayload | GenericError | UserNotAuthorizedError;

export type AdminGetWorkspaceAuditLogs = {
  __typename?: 'AdminGetWorkspaceAuditLogs';
  hasMoreRecords?: Maybe<Scalars['Boolean']['output']>;
  workspaceAuditLogs?: Maybe<Array<Maybe<WorkspaceAuditLog>>>;
};

export type AdminGetWorkspaceAuditLogsResponse = AdminGetWorkspaceAuditLogs | GenericError | UserNotAuthorizedError;

export type AdminGetWorkspaceByAnyIdPayload = {
  __typename?: 'AdminGetWorkspaceByAnyIdPayload';
  billing?: Maybe<BillingEntity>;
  organization?: Maybe<Organization>;
};

export type AdminGetWorkspaceDomains = {
  __typename?: 'AdminGetWorkspaceDomains';
  workspaceDomains?: Maybe<Array<Maybe<WorkspaceDomain>>>;
};

export type AdminGetWorkspaceDomainsResponse = AdminGetWorkspaceDomains | GenericError | UserNotAuthorizedError;

export type AdminGetWorkspaceEmailAuditLogs = {
  __typename?: 'AdminGetWorkspaceEmailAuditLogs';
  workspaceEmailAuditLogs?: Maybe<Array<Maybe<WorkspaceEmailAuditLog>>>;
};

export type AdminGetWorkspaceEmailAuditLogsResponse = AdminGetWorkspaceEmailAuditLogs | GenericError | UserNotAuthorizedError;

export type AdminGetWorkspaceQuantitySyncCountPayload = {
  __typename?: 'AdminGetWorkspaceQuantitySyncCountPayload';
  count?: Maybe<Scalars['Int']['output']>;
};

export type AdminGetWorkspaceQuantitySyncCountResponse = AdminGetWorkspaceQuantitySyncCountPayload | GenericError | UserNotAuthorizedError;

export type AdminGetWorkspaceSettingsResponse = AdminWorkspaceSetting | GenericError | UserNotAuthorizedError;

export type AdminGetWorkspaceVideoAction = {
  __typename?: 'AdminGetWorkspaceVideoAction';
  workspaceVideoAction?: Maybe<Array<Maybe<WorkspaceVideoAction>>>;
};

export type AdminGetWorkspaceVideoActionResponse = AdminGetWorkspaceVideoAction | GenericError | UserNotAuthorizedError;

export type AdminHideWorkspacePayload = {
  __typename?: 'AdminHideWorkspacePayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminHideWorkspaceResponse = AdminHideWorkspacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminImpersonatePayload = {
  __typename?: 'AdminImpersonatePayload';
  user?: Maybe<RegularUser>;
};

export type AdminInteractionsInsight = BannerInsight & {
  __typename?: 'AdminInteractionsInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  secondaryMessage?: Maybe<Scalars['String']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  totalCommentCount?: Maybe<Scalars['Int']['output']>;
  totalReactionCount?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export type AdminInvalidatJitCdnCacheResponse = GenericError | InvalidatJitCdnCachePayload | UserNotAuthorizedError;

export type AdminListIntegrationQueryPayload = {
  __typename?: 'AdminListIntegrationQueryPayload';
  integrations?: Maybe<Array<Maybe<Integration>>>;
};

export type AdminListIntegrationQueryResponse = AdminListIntegrationQueryPayload | GenericError | UserNotAuthorizedError;

export type AdminListIntegrationSubscriptionQueryPayload = {
  __typename?: 'AdminListIntegrationSubscriptionQueryPayload';
  integrationSubscriptions?: Maybe<Array<Maybe<IntegrationSubscription>>>;
};

export type AdminListIntegrationSubscriptionQueryResponse = AdminListIntegrationSubscriptionQueryPayload | GenericError | UserNotAuthorizedError;

export type AdminListSdkPartnersQueryPayload = {
  __typename?: 'AdminListSDKPartnersQueryPayload';
  sdkPartners?: Maybe<Array<Maybe<AdminSdkPartner>>>;
};

export type AdminListSdkPartnersQueryResponse = AdminListSdkPartnersQueryPayload | GenericError | UserNotAuthorizedError;

export type AdminListSubscriptionUserConnectionsQueryPayload = {
  __typename?: 'AdminListSubscriptionUserConnectionsQueryPayload';
  subscriptionUserConnections?: Maybe<Array<Maybe<SubscriptionUserConnection>>>;
};

export type AdminListSubscriptionUserConnectionsQueryResponse = AdminListSubscriptionUserConnectionsQueryPayload | GenericError | UserNotAuthorizedError;

export type AdminLoomsRecordedInsight = BannerInsight & {
  __typename?: 'AdminLoomsRecordedInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  secondaryMessage?: Maybe<Scalars['String']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  totalRecorded?: Maybe<Scalars['Int']['output']>;
  totalRecordedDurationSeconds?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export type AdminLoomsWatchedInsight = BannerInsight & {
  __typename?: 'AdminLoomsWatchedInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  secondaryMessage?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  totalViewDurationSeconds?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<BannerType>;
  units?: Maybe<Scalars['String']['output']>;
  version: Scalars['Int']['output'];
};

export type AdminMarkInvoiceAsPaidPayload = {
  __typename?: 'AdminMarkInvoiceAsPaidPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminMarkInvoiceAsPaidResponse = AdminMarkInvoiceAsPaidPayload | GenericError | UserNotAuthorizedError;

export type AdminMediaTranscript = {
  __typename?: 'AdminMediaTranscript';
  language?: Maybe<Language>;
  monologues: Array<MediaMonologue>;
  status?: Maybe<MediaTranscriptStatus>;
};

export type AdminMeetingBotInfo = {
  __typename?: 'AdminMeetingBotInfo';
  allInvitees?: Maybe<Array<AdminMeetingInvitee>>;
  calendarMeetingGuid?: Maybe<Scalars['ID']['output']>;
  calendarMeetingId?: Maybe<Scalars['ID']['output']>;
  debugImages?: Maybe<Array<Scalars['String']['output']>>;
  emailRecipients?: Maybe<Array<Scalars['String']['output']>>;
  emailSummary?: Maybe<Scalars['String']['output']>;
  emailedInvitees?: Maybe<Array<AdminMeetingInvitee>>;
  externalId?: Maybe<Scalars['ID']['output']>;
  log: Array<MeetingInfoLog>;
  loomVideoId?: Maybe<Scalars['ID']['output']>;
  meetingCode?: Maybe<Scalars['String']['output']>;
  meetingPlatform?: Maybe<Scalars['String']['output']>;
  meetingUrl?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<RegularUser>;
  publicSharingBlockedInWorkspace?: Maybe<Scalars['Boolean']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  startsAt?: Maybe<Scalars['String']['output']>;
  statusChanges: Array<MeetingInfoStatusChange>;
  title?: Maybe<Scalars['String']['output']>;
  userGuid: Scalars['ID']['output'];
  usingConsentHub?: Maybe<Scalars['Boolean']['output']>;
  usingSfmc?: Maybe<Scalars['Boolean']['output']>;
  videoDownloadableBy?: Maybe<Scalars['String']['output']>;
  videoMeetingGuid?: Maybe<Scalars['ID']['output']>;
};

export type AdminMeetingInvitee = {
  __typename?: 'AdminMeetingInvitee';
  email: Scalars['String']['output'];
  isInternal?: Maybe<Scalars['Boolean']['output']>;
  isOrganizer?: Maybe<Scalars['Boolean']['output']>;
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<RegularUser>;
  wasEmailed?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminMeetingsSavedInsight = BannerInsight & {
  __typename?: 'AdminMeetingsSavedInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  meetingsSaved?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  secondaryMessage?: Maybe<Scalars['String']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export type AdminMigrateContentToReactivatedPersonalWorkspacePayloadType = {
  __typename?: 'AdminMigrateContentToReactivatedPersonalWorkspacePayloadType';
  assetsMigrated?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  workspaceId?: Maybe<Scalars['Int']['output']>;
  workspaceIdv2?: Maybe<Scalars['ID']['output']>;
};

export type AdminMigrateContentToReactivatedPersonalWorkspaceResponse = AdminMigrateContentToReactivatedPersonalWorkspacePayloadType | GenericError | UserNotAuthorizedError | UserNotFoundError;

export type AdminMutations = {
  __typename?: 'AdminMutations';
  createTestVideosForUser?: Maybe<CreateTestVideosForUserRes>;
};


export type AdminMutationsCreateTestVideosForUserArgs = {
  numberOfVideos: Scalars['Int']['input'];
  organizationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type AdminOverrideLimitsResponse = AdminOverrideLimitsResult | GenericError | MaximumRecordsExceededError | UserNotAuthorizedError;

export type AdminOverrideLimitsResult = {
  __typename?: 'AdminOverrideLimitsResult';
  limitType: Scalars['String']['output'];
  newLimitValue: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  updatedUserIds: Array<Scalars['Int']['output']>;
  updatedUsersCount: Scalars['Int']['output'];
  workspaceId: Scalars['Int']['output'];
};

export type AdminOverrideSubscriptionResponse = AdminOverrideSubscriptionResult | GenericError | UserNotAuthorizedError;

export type AdminOverrideSubscriptionResult = {
  __typename?: 'AdminOverrideSubscriptionResult';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type AdminPopulateSearchIndexResponse = AdminPopulateSearchIndexResult | GenericError | UserNotAuthorizedError;

export type AdminPopulateSearchIndexResult = {
  __typename?: 'AdminPopulateSearchIndexResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminPortalLinkPayload = {
  __typename?: 'AdminPortalLinkPayload';
  link?: Maybe<Scalars['String']['output']>;
};

export type AdminPromptInfo = {
  __typename?: 'AdminPromptInfo';
  caluclatedOverrides?: Maybe<Scalars['String']['output']>;
  currentPromptOverrides?: Maybe<Scalars['String']['output']>;
  defaultPrompts?: Maybe<Scalars['String']['output']>;
  isMeetingRecording?: Maybe<Scalars['Boolean']['output']>;
  transcript?: Maybe<Scalars['String']['output']>;
};

export type AdminPurgeConnectionIdCachePayload = {
  __typename?: 'AdminPurgeConnectionIdCachePayload';
  success: Scalars['Boolean']['output'];
};

export type AdminPurgeConnectionIdCacheResponse = AdminPurgeConnectionIdCachePayload | GenericError | UserNotAuthorizedError;

export type AdminReconcileWorkspaceMembershipResponse = GenericError | UserNotAuthorizedError | AdminReconcileWorkspaceMembershipPayload;

export type AdminRecreateUserGroupingsResponse = GenericError | RecreateUserGroupingsPayload | UserNotAuthorizedError;

export type AdminRecreateVideoGroupingsResponse = GenericError | InputValidationError | RecreateVideoGroupingsPayload | UserNotAuthorizedError;

export type AdminRegenerateAutoContext = {
  __typename?: 'AdminRegenerateAutoContext';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminRegenerateAutoContextPayload = {
  __typename?: 'AdminRegenerateAutoContextPayload';
  regenerateAutoContext?: Maybe<AdminRegenerateAutoContext>;
};

export type AdminRegenerateAutoContextResponse = AdminRegenerateAutoContextPayload | EntityNotFoundError | GenericError | UserNotAuthorizedError;

export type AdminRemoveSpaceMembersPayload = {
  __typename?: 'AdminRemoveSpaceMembersPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminRemoveSpaceMembersResponse = AdminRemoveSpaceMembersPayload | GenericError | UserNotAuthorizedError;

export type AdminRemoveWorkspaceDomainPayload = {
  __typename?: 'AdminRemoveWorkspaceDomainPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminRemoveWorkspaceDomainResponse = AdminRemoveWorkspaceDomainPayload | GenericError | UserNotAuthorizedError;

export type AdminRepairOverlaysPayload = {
  __typename?: 'AdminRepairOverlaysPayload';
  messages: Array<Scalars['String']['output']>;
};

export type AdminRepairOverlaysResponse = AdminRepairOverlaysPayload | GenericError | UserNotAuthorizedError;

export type AdminRequestToTransferContentPayload = {
  __typename?: 'AdminRequestToTransferContentPayload';
  status: Scalars['String']['output'];
};

export type AdminRequestToTransferContentResponse = AdminRequestToTransferContentPayload | GenericError | UserNotAuthorizedError;

/** Admin tool to reset the flat model Redis cache for a given set of model IDs */
export type AdminResetModelCachePayload = {
  __typename?: 'AdminResetModelCachePayload';
  success: Scalars['Boolean']['output'];
};

export type AdminResetModelCacheResponse = AdminResetModelCachePayload | GenericError | UserNotAuthorizedError;

export type AdminResetUserResponse = GenericError | UserNotAuthorizedError | AdminResetUserPayload;

export type AdminRunWorkspaceQuantitySyncJobPayload = {
  __typename?: 'AdminRunWorkspaceQuantitySyncJobPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminRunWorkspaceQuantitySyncJobResponse = AdminRunWorkspaceQuantitySyncJobPayload | GenericError | UserNotAuthorizedError;

export type AdminSdkApiKeys = {
  __typename?: 'AdminSDKApiKeys';
  developerAccountId?: Maybe<Scalars['Int']['output']>;
  sdkApiKeys: Array<Maybe<AdminSdkPartner>>;
};

export type AdminSdkPartner = {
  __typename?: 'AdminSDKPartner';
  createdAt: Scalars['Date']['output'];
  developerAccountId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSandboxKey?: Maybe<Scalars['Boolean']['output']>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  partnerName?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type AdminSearchPaginatedWorkspaceMembersResponse = AdminSearchPaginatedWorkspaceMembersResult | GenericError | UserNotAuthorizedError;

export type AdminSearchPaginatedWorkspaceMembersResult = {
  __typename?: 'AdminSearchPaginatedWorkspaceMembersResult';
  members?: Maybe<OrganizationMemberConnection>;
};


export type AdminSearchPaginatedWorkspaceMembersResultMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  afterDate?: InputMaybe<Scalars['String']['input']>;
  beforeDate?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  roles: Array<OrganizationMemberRole>;
  sortOrder?: Scalars['String']['input'];
  statuses: Array<OrganizationMemberStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

export type AdminStartSiteEntityMigrationPayload = {
  __typename?: 'AdminStartSiteEntityMigrationPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminStartSiteEntityMigrationResponse = AdminStartSiteEntityMigrationPayload | GenericError | UserNotAuthorizedError;

export type AdminSubmitBackgroundUserMigrationJobPayload = {
  __typename?: 'AdminSubmitBackgroundUserMigrationJobPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminSubmitBackgroundUserMigrationJobResponse = AdminSubmitBackgroundUserMigrationJobPayload | GenericError | UserNotAuthorizedError;

export type AdminSubmitLegacyUserMigrationPayload = {
  __typename?: 'AdminSubmitLegacyUserMigrationPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminSubmitLegacyUserMigrationResponse = AdminSubmitLegacyUserMigrationPayload | GenericError | UserNotAuthorizedError;

export type AdminSubmitStripeEventPayload = {
  __typename?: 'AdminSubmitStripeEventPayload';
  info?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminSubmitStripeEventResponse = AdminSubmitStripeEventPayload | GenericError | UserNotAuthorizedError;

export type AdminSyncAtlassianWorkspaceGroupsResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type AdminSyncBillingEntityPayload = {
  __typename?: 'AdminSyncBillingEntityPayload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminSyncBillingEntityResponse = AdminSyncBillingEntityPayload | GenericError | UserNotAuthorizedError;

export type AdminSyncWorkosGroupsByDirectoryPayload = {
  __typename?: 'AdminSyncWorkosGroupsByDirectoryPayload';
  failedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AdminSyncWorkosGroupsByDirectoryResponse = AdminSyncWorkosGroupsByDirectoryPayload | GenericError | UserNotAuthorizedError;

export type AdminSyncWorkosGroupsPayload = {
  __typename?: 'AdminSyncWorkosGroupsPayload';
  failedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AdminSyncWorkosGroupsResponse = AdminSyncWorkosGroupsPayload | GenericError | UserNotAuthorizedError;

export type AdminSyncWorkosUsersByDirectoryPayload = {
  __typename?: 'AdminSyncWorkosUsersByDirectoryPayload';
  failedIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AdminSyncWorkosUsersByDirectoryResponse = AdminSyncWorkosUsersByDirectoryPayload | GenericError | UserNotAuthorizedError;

export type AdminSyncWorkosUsersPayload = {
  __typename?: 'AdminSyncWorkosUsersPayload';
  failedEmails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AdminSyncWorkosUsersResponse = AdminSyncWorkosUsersPayload | GenericError | UserNotAuthorizedError;

export type AdminToggleAutoJoinPayload = {
  __typename?: 'AdminToggleAutoJoinPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminToggleAutoJoinResponse = AdminToggleAutoJoinPayload | GenericError | UserNotAuthorizedError;

export type AdminToggleWorkspaceConsolidationPayload = {
  __typename?: 'AdminToggleWorkspaceConsolidationPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminToggleWorkspaceConsolidationResponse = AdminToggleWorkspaceConsolidationPayload | GenericError | UserNotAuthorizedError;

export type AdminTransferContentStatusResponse = {
  __typename?: 'AdminTransferContentStatusResponse';
  percentDone?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type AdminTriggerDataSyncCollectorResponse = DataSyncCollectorTriggerResponse | GenericError | UserNotAuthorizedError;

export type AdminUnhideWorkspacePayload = {
  __typename?: 'AdminUnhideWorkspacePayload';
  success: Scalars['Boolean']['output'];
};

export type AdminUnhideWorkspaceResponse = AdminUnhideWorkspacePayload | GenericError | UserNotAuthorizedError;

export type AdminUpdateCoupon = {
  __typename?: 'AdminUpdateCoupon';
  discount?: Maybe<Discount>;
};

export type AdminUpdateCouponResponse = AdminUpdateCoupon | GenericError | UserNotAuthorizedError;

export type AdminUpdateFolderInput = {
  field: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUpdateFolderPayload = {
  __typename?: 'AdminUpdateFolderPayload';
  folder?: Maybe<RegularUserFolder>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUpdateFolderResponse = AdminUpdateFolderPayload | GenericError | UserNotAuthorizedError;

export type AdminUpdateMemberPropertyResponse = GenericError | UpdatedPersonProperty | UserNotAuthorizedError;

export type AdminUpdateMemberWorkspaceRolePayloadType = {
  __typename?: 'AdminUpdateMemberWorkspaceRolePayloadType';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUpdateMemberWorkspaceRoleResponse = AdminUpdateMemberWorkspaceRolePayloadType | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminUpdateMembersRoleResponse = AdminUpdateMembersRoleResult | GenericError | UserNotAuthorizedError;

export type AdminUpdateMembersRoleResult = {
  __typename?: 'AdminUpdateMembersRoleResult';
  invalidEntries?: Maybe<Array<Maybe<InvalidMemberRoleUpdateEntry>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUpdatePromptOverridesPayload = {
  __typename?: 'AdminUpdatePromptOverridesPayload';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AdminUpdatePromptOverridesResponse = AdminUpdatePromptOverridesPayload | GenericError | UserNotAuthorizedError;

export type AdminUpdateReferralLinkEnabledPayloadType = {
  __typename?: 'AdminUpdateReferralLinkEnabledPayloadType';
  updated?: Maybe<Scalars['Boolean']['output']>;
};

export type AdminUpdateReferralLinkEnabledResponse = AdminUpdateReferralLinkEnabledPayloadType | GenericError | UserNotAuthorizedError;

export type AdminUpdateSalesSupportTypeResponse = GenericError | Organization | UserNotAuthorizedError;

export type AdminUpdateUserDefaultWorkspaceResponse = GenericError | UpdateDefaultWorkspaceResponse | UserNotAuthorizedError;

export type AdminUpdateUserPropertyResponse = GenericError | UpdatedPersonProperty | UserNotAuthorizedError;

export type AdminUpdateUserStatusPayload = {
  __typename?: 'AdminUpdateUserStatusPayload';
  success: Scalars['Boolean']['output'];
};

export type AdminUpdateUserStatusResponse = AdminUpdateUserStatusPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminUpdateVideoPrivacyPayload = {
  __typename?: 'AdminUpdateVideoPrivacyPayload';
  jobId: Scalars['ID']['output'];
  success: Scalars['Boolean']['output'];
};

export type AdminUpdateVideoPrivacyResponse = AdminUpdateVideoPrivacyPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AdminUpdateWorkspaceAtlassianFieldsResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type AdminUpdateWorkspaceCustomerPayload = {
  __typename?: 'AdminUpdateWorkspaceCustomerPayload';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminUpdateWorkspaceCustomerResponse = AdminUpdateWorkspaceCustomerPayload | GenericError | UserNotAuthorizedError;

export type AdminUpdateWorkspacePlanResponse = GenericError | InputValidationError | Organization | UserNotAuthorizedError;

export type AdminUpdateWorkspaceSettingResponse = GenericError | UserNotAuthorizedError | WorkspaceSetting;

export type AdminUpdateWorkspaceTierResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type AdminVerifyUserResponse = {
  __typename?: 'AdminVerifyUserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum AdminVideoPrivacyType {
  Owner = 'owner',
  Public = 'public',
  Workspace = 'workspace'
}

export type AdminVideoSpacePosting = {
  __typename?: 'AdminVideoSpacePosting';
  spaceId?: Maybe<Scalars['ID']['output']>;
  spaceName?: Maybe<Scalars['String']['output']>;
  spaceType?: Maybe<Scalars['String']['output']>;
};

export type AdminVideoUserShare = {
  __typename?: 'AdminVideoUserShare';
  permission?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type AdminViewableTranscript = {
  __typename?: 'AdminViewableTranscript';
  language?: Maybe<Language>;
  monologues: Array<ViewableMonologue>;
  status?: Maybe<MediaTranscriptStatus>;
};

export type AdminWorkspaceSetting = {
  __typename?: 'AdminWorkspaceSetting';
  settings: Array<Maybe<WorkspaceSetting>>;
};

export type AdvanceTestClockResponse = GenericError | UserNotAuthorizedError | AdvanceClockPlayload;

/** Error returned when unsuccessful with generating advanced AI meeting notes page link */
export type AdvancedAiMeetingNotesFailure = {
  __typename?: 'AdvancedAiMeetingNotesFailure';
  reason?: Maybe<AdvancedAiMeetingNotesFailureReason>;
};

/** Failure reason when generating advanced AI meeting notes page link */
export enum AdvancedAiMeetingNotesFailureReason {
  FailedToBuildMeetingNotes = 'FAILED_TO_BUILD_MEETING_NOTES',
  InvalidConfluenceClient = 'INVALID_CONFLUENCE_CLIENT',
  InvalidTemplateId = 'INVALID_TEMPLATE_ID',
  InvalidVideoId = 'INVALID_VIDEO_ID',
  NotMeetingRecording = 'NOT_MEETING_RECORDING',
  NoTranscriptAvailable = 'NO_TRANSCRIPT_AVAILABLE',
  UnknownError = 'UNKNOWN_ERROR'
}

export type AdvancedAiMeetingNotesPageLinkInput = {
  /** Atlassian account ID to use for creating meeting artifacts */
  aaid?: InputMaybe<Scalars['ID']['input']>;
  /** Array of context strings to provide to the AI agent */
  context?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Whether to use production Confluence instance */
  isProduction?: InputMaybe<Scalars['Boolean']['input']>;
  /** Local Confluence endpoint URL for testing */
  localEndpoint?: InputMaybe<Scalars['String']['input']>;
  /** ID of the parent Confluence page where the meeting notes will be created */
  parentId: Scalars['ID']['input'];
  /** JSON string containing templateId and replacements configuration */
  settings: Scalars['String']['input'];
  /** Atlassian Cloud ID of the Confluence site to use for creating meeting artifacts */
  siteId?: InputMaybe<Scalars['ID']['input']>;
  /** User authentication token for direct endpoint access */
  userToken?: InputMaybe<Scalars['String']['input']>;
  /** ID of the meeting recording video */
  videoId: Scalars['ID']['input'];
};

export type AdvancedAiMeetingNotesResponse = AdvancedAiMeetingNotesFailure | AdvancedAiMeetingNotesResult | GenericError | UserNotAuthorizedError;

/** Response containing Confluence page link */
export type AdvancedAiMeetingNotesResult = {
  __typename?: 'AdvancedAiMeetingNotesResult';
  url?: Maybe<Scalars['String']['output']>;
};

export type AggTokenRefreshError = Error & {
  __typename?: 'AggTokenRefreshError';
  feature?: Maybe<Feature>;
  isAggTokenForcedLogout?: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
};

export type AiAccess = {
  __typename?: 'AiAccess';
  autoChapters?: Maybe<Scalars['Boolean']['output']>;
  autoSummaries?: Maybe<Scalars['Boolean']['output']>;
  autoTasks?: Maybe<Scalars['Boolean']['output']>;
  autoTitles?: Maybe<Scalars['Boolean']['output']>;
};

export type AiMeetingNotesLocationPayload = {
  __typename?: 'AiMeetingNotesLocationPayload';
  location?: Maybe<ConfluenceContent>;
};

export type AiMeetingNotesLocationResponse = AiMeetingNotesLocationPayload | GenericError | UserNotAuthorizedError;

export type AiTriesCountPayload = {
  __typename?: 'AiTriesCountPayload';
  aiTries: Scalars['Int']['output'];
};

export type AppSettings = {
  __typename?: 'AppSettings';
  sidebar_hidden: Scalars['Boolean']['output'];
};

export enum AppSourceType {
  ChromeExtension = 'CHROME_EXTENSION',
  MobileAndroid = 'MOBILE_ANDROID',
  MobileIos = 'MOBILE_IOS',
  SlackDesktop = 'SLACK_DESKTOP',
  Web = 'WEB',
  WebDesktop = 'WEB_DESKTOP',
  WebMobile = 'WEB_MOBILE',
  WebTablet = 'WEB_TABLET',
  WebTv = 'WEB_TV'
}

export type AppleAuthError = Error & {
  __typename?: 'AppleAuthError';
  error?: Maybe<Scalars['String']['output']>;
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type AppleLoginOrSignupUserResponse = {
  __typename?: 'AppleLoginOrSignupUserResponse';
  accountCreated: Scalars['Boolean']['output'];
  /** deprecated session sync token associated with a user session */
  loomSst?: Maybe<Scalars['String']['output']>;
  user: RegularUser;
};

export type ApplicationPageResult = {
  __typename?: 'ApplicationPageResult';
  application?: Maybe<RecordSdkApplication>;
};

export type ApplyFillerWordRemovalTtsInput = {
  /** Password to access if the video is password protected. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** ID of the video to update. */
  videoId: Scalars['ID']['input'];
};

export type ApplyFillerWordRemovalTtsPayload = {
  __typename?: 'ApplyFillerWordRemovalTTSPayload';
  video: RegularUserVideo;
};

export type ApplyFillerWordRemovalTtsResponse = ApplyFillerWordRemovalTtsPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type ApplyVideoLimitOverrideResponse = GenericError | UserNotAuthorizedError | ApplyVideoLimitOverridePayloadType;

export type ApproveAutoCtaPayload = {
  __typename?: 'ApproveAutoCtaPayload';
  approved_at?: Maybe<Scalars['String']['output']>;
};

export type ApproveAutoCtaResponse = ApproveAutoCtaPayload | GenericError | UserNotAuthorizedError;

export type ApproveVideoTaskPayload = {
  __typename?: 'ApproveVideoTaskPayload';
  task?: Maybe<VideoTask>;
};

export type ApproveVideoTaskResponse = ApproveVideoTaskPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type ArchiveFoldersPayload = {
  __typename?: 'ArchiveFoldersPayload';
  folders?: Maybe<Array<RegularUserFolder>>;
};

export type ArchiveFoldersResponse = ArchiveFoldersPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type ArchiveSpacePayload = {
  __typename?: 'ArchiveSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ArchiveSpaceResponse = ArchiveSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type ArchiveVideosPayload = {
  __typename?: 'ArchiveVideosPayload';
  videos?: Maybe<Array<RegularUserVideo>>;
};

export type ArchiveVideosResponse = ArchiveVideosPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type Asset = {
  __typename?: 'Asset';
  createdAt?: Maybe<Scalars['Date']['output']>;
  fileType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastUsedAt?: Maybe<Scalars['Date']['output']>;
  s3Id?: Maybe<Scalars['String']['output']>;
  srcUrl?: Maybe<Scalars['String']['output']>;
  uploadLocation?: Maybe<Scalars['String']['output']>;
  uploadedFileName?: Maybe<Scalars['String']['output']>;
};

export type AsyncBehaviorListPayloadType = {
  __typename?: 'AsyncBehaviorListPayloadType';
  data?: Maybe<Array<Maybe<AsyncBehaviorPayloadType>>>;
  isValid?: Maybe<Scalars['Boolean']['output']>;
  mostAsyncIndex?: Maybe<Scalars['String']['output']>;
  mostAsyncNumber?: Maybe<Scalars['Int']['output']>;
  totalViewsGiven?: Maybe<Scalars['Int']['output']>;
  totalViewsReceived?: Maybe<Scalars['Int']['output']>;
};

export type AsyncBehaviorPayloadType = {
  __typename?: 'AsyncBehaviorPayloadType';
  endTime?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  videoViewGiven?: Maybe<Scalars['Int']['output']>;
  videoViewReceived?: Maybe<Scalars['Int']['output']>;
};

export type AtlassianLocaleResponseResponse = GenericError | GetAtlassianLocalePayload;

export enum AudioGenerationStatus {
  Completed = 'COMPLETED',
  Creating = 'CREATING',
  Deleting = 'DELETING',
  Failed = 'FAILED',
  PendingCreation = 'PENDING_CREATION',
  PendingDeletion = 'PENDING_DELETION',
  Regenerating = 'REGENERATING'
}

export type AudioVariable = {
  __typename?: 'AudioVariable';
  endTsInOriginalForSentence?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  originalSelectionEndInSecs?: Maybe<Scalars['Float']['output']>;
  originalSelectionStartInSecs?: Maybe<Scalars['Float']['output']>;
  s3Key?: Maybe<Scalars['String']['output']>;
  startTsInOriginalForSentence?: Maybe<Scalars['Float']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
  word?: Maybe<Scalars['String']['output']>;
};

export enum AutoChapterStatusesType {
  Failure = 'failure',
  InProgress = 'in_progress',
  NotStarted = 'not_started',
  Success = 'success',
  Unsupported = 'unsupported'
}

export enum AutoCommentUpdateTarget {
  ShowCommentToCreator = 'showCommentToCreator',
  ShowFirstEmoji = 'showFirstEmoji',
  ShowSecondEmoji = 'showSecondEmoji',
  VideoCreatedAt = 'videoCreatedAt',
  VideoDuration = 'videoDuration'
}

/** status of the auto context feature */
export enum AutoContextFeatureStatusValue {
  Failure = 'FAILURE',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

/** language of the auto context */
export enum AutoContextLanguage {
  Af = 'AF',
  Am = 'AM',
  As = 'AS',
  Ba = 'BA',
  Be = 'BE',
  Bg = 'BG',
  Bn = 'BN',
  Bo = 'BO',
  Br = 'BR',
  Bs = 'BS',
  Ca = 'CA',
  Cs = 'CS',
  Cy = 'CY',
  Da = 'DA',
  De = 'DE',
  El = 'EL',
  En = 'EN',
  Es = 'ES',
  Et = 'ET',
  Eu = 'EU',
  Fi = 'FI',
  Fo = 'FO',
  Fr = 'FR',
  Gl = 'GL',
  Gu = 'GU',
  Ha = 'HA',
  Haw = 'HAW',
  Hi = 'HI',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Hy = 'HY',
  Id = 'ID',
  Is = 'IS',
  It = 'IT',
  Ja = 'JA',
  Jw = 'JW',
  Ka = 'KA',
  Kk = 'KK',
  Km = 'KM',
  Kn = 'KN',
  Ko = 'KO',
  La = 'LA',
  Lb = 'LB',
  Ln = 'LN',
  Lo = 'LO',
  Lt = 'LT',
  Lv = 'LV',
  Mg = 'MG',
  Mi = 'MI',
  Mk = 'MK',
  Ml = 'ML',
  Mn = 'MN',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  My = 'MY',
  Ne = 'NE',
  Nl = 'NL',
  Nn = 'NN',
  No = 'NO',
  Oc = 'OC',
  Pa = 'PA',
  Pl = 'PL',
  Ps = 'PS',
  Pt = 'PT',
  Ro = 'RO',
  Ru = 'RU',
  Sa = 'SA',
  Sd = 'SD',
  Si = 'SI',
  Sk = 'SK',
  Sl = 'SL',
  Sn = 'SN',
  So = 'SO',
  Sq = 'SQ',
  Sr = 'SR',
  Su = 'SU',
  Sv = 'SV',
  Sw = 'SW',
  Ta = 'TA',
  Te = 'TE',
  Tg = 'TG',
  Th = 'TH',
  Tk = 'TK',
  Tl = 'TL',
  Tr = 'TR',
  Tt = 'TT',
  Uk = 'UK',
  Unknown = 'UNKNOWN',
  Uz = 'UZ',
  Vi = 'VI',
  Yi = 'YI',
  Yo = 'YO',
  Zh = 'ZH'
}

export type AutoFeatureStatusChangedResponse = {
  __typename?: 'AutoFeatureStatusChangedResponse';
  autoFeatureStatuses?: Maybe<AutoFeatureStatuses>;
};

export type AutoFeatureStatuses = {
  __typename?: 'AutoFeatureStatuses';
  autoChaptersStatus?: Maybe<AutoChapterStatusesType>;
  autoDescription?: Maybe<Scalars['String']['output']>;
  autoDescriptionStatus?: Maybe<IntelligenceStatusType>;
  autoTasksCount?: Maybe<Scalars['Int']['output']>;
  autoTasksStatus?: Maybe<IntelligenceStatusType>;
  autoTitle?: Maybe<Scalars['String']['output']>;
  autoTitleStatus?: Maybe<IntelligenceStatusType>;
  hasFillerWordPlusRemovalEnabled: Scalars['Boolean']['output'];
  hasFillerWordRemovalEnabled: Scalars['Boolean']['output'];
  hasSilenceRemovalEnabled: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  numberOfFillerWordsPlusTrimmed?: Maybe<Scalars['Int']['output']>;
  numberOfFillerWordsTrimmed?: Maybe<Scalars['Int']['output']>;
  secondsOfSilenceTrimmed?: Maybe<Scalars['Int']['output']>;
};

export enum AutoRecordOwnedMeetingsType {
  All = 'all',
  None = 'none',
  Workspace = 'workspace'
}

export type AutomatedMeetingNotesUserPermissionsPayload = {
  __typename?: 'AutomatedMeetingNotesUserPermissionsPayload';
  hasPermission: Scalars['Boolean']['output'];
};

export type AutomatedMeetingNotesUserPermissionsResponse = AutomatedMeetingNotesUserPermissionsPayload | GenericError;

export type Automation = {
  __typename?: 'Automation';
  autoRecord?: Maybe<Scalars['Boolean']['output']>;
  confluenceLocationId?: Maybe<Scalars['String']['output']>;
  conjunction1: Conjunction;
  conjunction2: Conjunction;
  enabled: Scalars['Boolean']['output'];
  externalInviteeAccess: Access;
  folderIds?: Maybe<Array<Scalars['String']['output']>>;
  guid: Scalars['ID']['output'];
  linkSharing: LinkSharing;
  meetingType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  participantsInclude: ParticipantsInclude;
  spaceIds?: Maybe<Array<Scalars['String']['output']>>;
  summaryNotification: SummaryNotification;
  term1?: Maybe<Scalars['String']['output']>;
  term1MatchType: TermMatch;
  term2?: Maybe<Scalars['String']['output']>;
  term2MatchType: TermMatch;
  term3?: Maybe<Scalars['String']['output']>;
  term3MatchType: TermMatch;
  workspaceMemberAccess: Access;
};

export type AutomationCreateInput = {
  /** When true, automatically records the meeting */
  autoRecord?: InputMaybe<Scalars['Boolean']['input']>;
  /** Id of the Confluence location to save the meeting notes */
  confluenceLocationId?: InputMaybe<Scalars['String']['input']>;
  /** Conjunction for the first two terms */
  conjunction1?: InputMaybe<Conjunction>;
  /** Conjunction for the last two terms */
  conjunction2?: InputMaybe<Conjunction>;
  /** When true, the automation is enabled */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** External invitee access setting for the automation */
  externalInviteeAccess?: InputMaybe<Access>;
  /** List of folder IDs to move the video to */
  folderIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Link sharing setting for the automation */
  linkSharing?: InputMaybe<LinkSharing>;
  /** Meeting type to use when generating a recap with this automation */
  meetingType?: InputMaybe<Scalars['String']['input']>;
  /** Name of the automation */
  name: Scalars['String']['input'];
  /** Participants include setting for the automation */
  participantsInclude?: InputMaybe<ParticipantsInclude>;
  /** List of space IDs to move the video to */
  spaceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Summary notification setting for the automation */
  summaryNotification?: InputMaybe<SummaryNotification>;
  /** First term to match against the meeting title */
  term1?: InputMaybe<Scalars['String']['input']>;
  /** Match type for the first term */
  term1MatchType?: InputMaybe<TermMatch>;
  /** Second term to match against the meeting title */
  term2?: InputMaybe<Scalars['String']['input']>;
  /** Match type for the second term */
  term2MatchType?: InputMaybe<TermMatch>;
  /** Third term to match against the meeting title */
  term3?: InputMaybe<Scalars['String']['input']>;
  /** Match type for the third term */
  term3MatchType?: InputMaybe<TermMatch>;
  /** Workspace member access setting for the automation */
  workspaceMemberAccess?: InputMaybe<Access>;
};

export type AutomationDestroyInput = {
  /** guid of the automation to destroy */
  guid: Scalars['ID']['input'];
};

export enum AutomationKindEnumType {
  Custom = 'custom',
  External = 'external',
  Internal = 'internal'
}

export type AutomationRestoreDefaultsPayload = {
  __typename?: 'AutomationRestoreDefaultsPayload';
  calendarAutomation: CalendarAutomation;
  success: Scalars['Boolean']['output'];
};

export type AutomationRestoreDefaultsResponse = AutomationRestoreDefaultsPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type AutomationUpdateInput = {
  /** When true, automatically records the meeting */
  autoRecord?: InputMaybe<Scalars['Boolean']['input']>;
  /** Id of the Confluence location to save the meeting notes */
  confluenceLocationId?: InputMaybe<Scalars['String']['input']>;
  /** Conjunction for the first two terms */
  conjunction1?: InputMaybe<Conjunction>;
  /** Conjunction for the last two terms */
  conjunction2?: InputMaybe<Conjunction>;
  /** When true, the automation is enabled */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** External invitee access setting for the automation */
  externalInviteeAccess?: InputMaybe<Access>;
  /** List of folder IDs to move the video to */
  folderIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** GUID of the automation to update */
  guid: Scalars['ID']['input'];
  /** Link sharing setting for the automation */
  linkSharing?: InputMaybe<LinkSharing>;
  /** Meeting type to use when generating a recap with this automation */
  meetingType?: InputMaybe<Scalars['String']['input']>;
  /** Name of the automation */
  name: Scalars['String']['input'];
  /** Participants include setting for the automation */
  participantsInclude?: InputMaybe<ParticipantsInclude>;
  /** List of space IDs to move the video to */
  spaceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Summary notification setting for the automation */
  summaryNotification?: InputMaybe<SummaryNotification>;
  /** First term to match against the meeting title */
  term1?: InputMaybe<Scalars['String']['input']>;
  /** Match type for the first term */
  term1MatchType?: InputMaybe<TermMatch>;
  /** Second term to match against the meeting title */
  term2?: InputMaybe<Scalars['String']['input']>;
  /** Match type for the second term */
  term2MatchType?: InputMaybe<TermMatch>;
  /** Third term to match against the meeting title */
  term3?: InputMaybe<Scalars['String']['input']>;
  /** Match type for the third term */
  term3MatchType?: InputMaybe<TermMatch>;
  /** Workspace member access setting for the automation */
  workspaceMemberAccess?: InputMaybe<Access>;
};

export type AvailableFtux = {
  __typename?: 'AvailableFtux';
  name?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
};

export type Avatar = {
  __typename?: 'Avatar';
  iosLarge: Scalars['String']['output'];
  iosThumb: Scalars['String']['output'];
  isAtlassianMastered?: Maybe<Scalars['Boolean']['output']>;
  large: Scalars['String']['output'];
  name: Scalars['String']['output'];
  thumb: Scalars['String']['output'];
};

export type AvatarInput = {
  iosLarge?: InputMaybe<Scalars['String']['input']>;
  iosThumb?: InputMaybe<Scalars['String']['input']>;
  isAtlassianMastered?: InputMaybe<Scalars['Boolean']['input']>;
  large: Scalars['String']['input'];
  name: Scalars['String']['input'];
  thumb: Scalars['String']['input'];
};

export type BackgroundUserMigrationInput = {
  datasource: Datasource;
  dryRun: Scalars['Boolean']['input'];
  shouldResetErrorCount: Scalars['Boolean']['input'];
};

export type Backlink = {
  __typename?: 'Backlink';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  isSynced: Scalars['Boolean']['output'];
  mediaId: Scalars['ID']['output'];
  mediaType: BacklinkMediaType;
  source: BacklinkSourceType;
  sourceLink: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum BacklinkMediaType {
  Screenshot = 'screenshot',
  Video = 'video'
}

export enum BacklinkSourceType {
  Slack = 'SLACK'
}

export enum BannerFormattingType {
  Emphasized = 'EMPHASIZED',
  Plain = 'PLAIN'
}

export type BannerInsight = {
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export type BannerInsightMessageChunk = {
  __typename?: 'BannerInsightMessageChunk';
  /** The text in this chunk */
  text?: Maybe<Scalars['String']['output']>;
  /** Formatting type of this chunk */
  type?: Maybe<BannerFormattingType>;
};

/** The banner insight name */
export enum BannerName {
  AdminInteractions = 'ADMIN_INTERACTIONS',
  AdminLoomsRecorded = 'ADMIN_LOOMS_RECORDED',
  AdminLoomsWatchedTime = 'ADMIN_LOOMS_WATCHED_TIME',
  AdminMeetingsSaved = 'ADMIN_MEETINGS_SAVED',
  TeamVideosConsumed = 'TEAM_VIDEOS_CONSUMED',
  TeamVideosPosted = 'TEAM_VIDEOS_POSTED',
  UserLibrary = 'USER_LIBRARY'
}

/** The banner insight types to fetch */
export enum BannerType {
  Admin = 'ADMIN',
  Team = 'TEAM',
  User = 'USER'
}

export type BasePrices = {
  __typename?: 'BasePrices';
  annual: Price;
  monthly: Price;
};

export type BatchMoveFoldersToLibraryPayload = {
  __typename?: 'BatchMoveFoldersToLibraryPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BatchMoveFoldersToLibraryResponse = BatchMoveFoldersToLibraryPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type BatchMoveFoldersToSpacePayload = {
  __typename?: 'BatchMoveFoldersToSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BatchMoveFoldersToSpaceResponse = BatchMoveFoldersToSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type BatchShareVideosToSpacesPayload = {
  __typename?: 'BatchShareVideosToSpacesPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BatchShareVideosToSpacesResponse = BatchShareVideosToSpacesPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export enum BillingCadenceType {
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

export type BillingDelta = {
  __typename?: 'BillingDelta';
  itemJSON?: Maybe<Scalars['JSON']['output']>;
  user?: Maybe<RegularUser>;
};

export type BillingDeltas = {
  __typename?: 'BillingDeltas';
  countsJSON?: Maybe<Scalars['JSON']['output']>;
  items?: Maybe<Array<Maybe<BillingDelta>>>;
};

export type BillingDetails = {
  __typename?: 'BillingDetails';
  add_ons: Array<SubscriptionItem>;
  billing_period?: Maybe<BillingPeriod>;
  customer?: Maybe<Customer>;
  hasPaymentSource?: Maybe<Scalars['Boolean']['output']>;
  invoices?: Maybe<Invoices>;
  paused?: Maybe<SubscriptionSchedule>;
  plan?: Maybe<Plan>;
  status?: Maybe<Scalars['String']['output']>;
};

export type BillingEntity = {
  __typename?: 'BillingEntity';
  billing_deltas?: Maybe<BillingDeltas>;
  billing_details?: Maybe<BillingDetails>;
  external_customer_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organization_id?: Maybe<Scalars['Int']['output']>;
  organization_idv2?: Maybe<Scalars['ID']['output']>;
};

export type BillingPeriod = {
  __typename?: 'BillingPeriod';
  account_balance?: Maybe<Scalars['Int']['output']>;
  cancel_at?: Maybe<Scalars['Float']['output']>;
  cancel_at_period_end?: Maybe<Scalars['Boolean']['output']>;
  discount?: Maybe<Discount>;
  next_charge_date?: Maybe<Scalars['Float']['output']>;
  period_end?: Maybe<Scalars['Float']['output']>;
  period_start?: Maybe<Scalars['Float']['output']>;
  subscription_id?: Maybe<Scalars['String']['output']>;
  trial_end?: Maybe<Scalars['Float']['output']>;
};

export type BillingPlan = {
  __typename?: 'BillingPlan';
  active: Scalars['Boolean']['output'];
  amount: Scalars['Int']['output'];
  created: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['String']['output'];
  interval: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  product: Scalars['String']['output'];
};

export type BillingProduct = {
  __typename?: 'BillingProduct';
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  sales_led: Scalars['Boolean']['output'];
};

export type BlacklistSdkPrivateKeyPayload = {
  __typename?: 'BlacklistSdkPrivateKeyPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BlacklistSdkPrivateKeyResponse = BlacklistSdkPrivateKeyPayload | GenericError | UserNotAuthorizedError;

export type BooleanObject = {
  __typename?: 'BooleanObject';
  id?: Maybe<Scalars['ID']['output']>;
  value?: Maybe<Scalars['Boolean']['output']>;
};

export enum BotActionTypeInput {
  Cancel = 'cancel',
  Pause = 'pause',
  Resume = 'resume',
  Stop = 'stop'
}

export enum BotControlsState {
  Canceled = 'CANCELED',
  Idle = 'IDLE',
  Paused = 'PAUSED',
  Recording = 'RECORDING',
  Stopped = 'STOPPED'
}

export enum BotMeetingEventType {
  CancelRecording = 'cancelRecording',
  ParticipantsLeft = 'participantsLeft',
  PauseRecording = 'pauseRecording',
  ResumeRecording = 'resumeRecording',
  StopRecording = 'stopRecording'
}

export type BotMessageResponse = {
  __typename?: 'BotMessageResponse';
  data: Scalars['BasicScalar']['output'];
  id: Scalars['String']['output'];
  type: BotMessageType;
};

export enum BotMessageType {
  Cancel = 'cancel',
  FoundPreviousRecurringMeetingVideoId = 'found_previous_recurring_meeting_video_id',
  Pause = 'pause',
  PostChatMessage = 'post_chat_message',
  Resume = 'resume',
  Stop = 'stop'
}

export type BotMessagesResponse = {
  __typename?: 'BotMessagesResponse';
  messages: Array<BotMessageResponse>;
};

export type BotOutgoingMessageHandlerInput = {
  actingUser?: InputMaybe<Scalars['String']['input']>;
  event: BotMeetingEventType;
  meetingBotGuid: Scalars['ID']['input'];
};

export type BotOutgoingMessageHandlerPayload = {
  __typename?: 'BotOutgoingMessageHandlerPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BotOutgoingMessageHandlerResponse = BotOutgoingMessageHandlerPayload | GenericError | UserNotAuthorizedError;

export type BulkDeleteFoldersPayload = {
  __typename?: 'BulkDeleteFoldersPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BulkDeleteFoldersResponse = BulkDeleteFoldersPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type BulkDeleteVideosPayload = {
  __typename?: 'BulkDeleteVideosPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BulkDeleteVideosResponse = BulkDeleteVideosPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type BulkMoveFoldersResponse = GenericError | InputValidationError | MoveFolderPayload | UserNotAuthorizedError;

export type BulkMoveVideosResponse = GenericError | InputValidationError | MoveVideoPayload | UserNotAuthorizedError;

export type BulkSetUpNewSdkPartnersPayload = {
  __typename?: 'BulkSetUpNewSdkPartnersPayload';
  partnerInfo: Array<Maybe<SdkPartnerInfoResponse>>;
};

export type BulkSetUpNewSdkPartnersResponse = BulkSetUpNewSdkPartnersPayload | GenericError | UserNotAuthorizedError;

export type BulkTransferVideosToUserPayload = {
  __typename?: 'BulkTransferVideosToUserPayload';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type BulkTrimClipsPayload = {
  __typename?: 'BulkTrimClipsPayload';
  removalCounts?: Maybe<BulkTrimClipsRemovalCounts>;
  removalWasPartial?: Maybe<Scalars['Boolean']['output']>;
  video?: Maybe<RegularUserVideo>;
};

export type BulkTrimClipsRemovalCounts = {
  __typename?: 'BulkTrimClipsRemovalCounts';
  fillerWords?: Maybe<Scalars['Int']['output']>;
  secondsOfSilence?: Maybe<Scalars['Int']['output']>;
  silenceGaps?: Maybe<Scalars['Int']['output']>;
};

export type BulkTrimClipsResponse = BulkTrimClipsPayload | ClipUpdateError | GenericError | InputValidationError | InvalidRequestWarning | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type BulkUndoTrimPayload = {
  __typename?: 'BulkUndoTrimPayload';
  video?: Maybe<RegularUserVideo>;
};

export type BulkUndoTrimResponse = BulkUndoTrimPayload | ClipUpdateError | GenericError | InputValidationError | InvalidRequestWarning | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type BusinessAiPrices = {
  __typename?: 'BusinessAiPrices';
  annual?: Maybe<Price>;
  monthly?: Maybe<Price>;
};

export type BusinessTrialWelcomeCardProps = {
  __typename?: 'BusinessTrialWelcomeCardProps';
  notification?: Maybe<BusinessTrialWelcomeNotification>;
};

export type BusinessTrialWelcomeCardPropsResponse = BusinessTrialWelcomeCardProps | GenericError | InputValidationError | UserNotAuthorizedError;

export type BusinessTrialWelcomeNotification = {
  __typename?: 'BusinessTrialWelcomeNotification';
  workspace?: Maybe<NotificationWorkspace>;
};

export type Cta = {
  __typename?: 'CTA';
  approved_at?: Maybe<Scalars['Date']['output']>;
  enabled: Scalars['Boolean']['output'];
  is_auto?: Maybe<Scalars['Boolean']['output']>;
  mods?: Maybe<Scalars['JSON']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CalendarAutomation = {
  __typename?: 'CalendarAutomation';
  automationId: Scalars['ID']['output'];
  /** @deprecated no longer used */
  defaultRecordingPermissionsOverridden: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  guid: Scalars['String']['output'];
  /** @deprecated no longer used */
  id: Scalars['ID']['output'];
  /** @deprecated no longer used */
  kind: AutomationKindEnumType;
  name?: Maybe<Scalars['String']['output']>;
  recordingLinkSharing: MeetingRecordingLinkSharingType;
  recordingSummaryNotificationSetting: MeetingRecordingSummaryNotificationType;
  recordingWorkspaceMemberAccess: MeetingRecordingAccessType;
  /** @deprecated no longer used */
  userId: Scalars['ID']['output'];
};

export type CalendarInfo = {
  __typename?: 'CalendarInfo';
  activatedAt: Scalars['Date']['output'];
  active: Scalars['Boolean']['output'];
  emailDomains: Array<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  /** @deprecated not used at all */
  id: Scalars['ID']['output'];
  integrationKey: Scalars['String']['output'];
  integrationType: ConnectedServiceIntegrationEnumType;
  lastSyncedAt?: Maybe<Scalars['Date']['output']>;
  meetings: Array<Maybe<CalendarMeeting>>;
  paginatedMeetings?: Maybe<CalendarMeetingConnection>;
  recordingLinkSharing: MeetingRecordingLinkSharingType;
  recordingSummaryNotificationSetting: MeetingRecordingSummaryNotificationType;
  recordingWorkspaceMemberAccess: MeetingRecordingAccessType;
  userGuid: Scalars['String']['output'];
};


export type CalendarInfoMeetingsArgs = {
  rangeEnd: Scalars['String']['input'];
  rangeStart: Scalars['String']['input'];
};


export type CalendarInfoPaginatedMeetingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type CalendarMeeting = {
  __typename?: 'CalendarMeeting';
  automationsOverridden: Scalars['Boolean']['output'];
  calendarMeetingGuid: Scalars['ID']['output'];
  calendarMeetingId: Scalars['ID']['output'];
  code?: Maybe<Scalars['String']['output']>;
  /** @deprecated not used at all */
  connectedServiceId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  /** @deprecated not used at all */
  description?: Maybe<Scalars['String']['output']>;
  durationMins?: Maybe<Scalars['Int']['output']>;
  externalInviteeAccess: MeetingRecordingAccessType;
  hasExternalParticipants: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  organizer?: Maybe<RegularUser>;
  organizerEmail?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use 'recorder' instead */
  otherRecorder?: Maybe<RegularUser>;
  owned: Scalars['Boolean']['output'];
  past: Scalars['Boolean']['output'];
  platform?: Maybe<Scalars['String']['output']>;
  record: Scalars['Boolean']['output'];
  recorder?: Maybe<RegularUser>;
  recordingFolders?: Maybe<Array<Maybe<RegularUserFolder>>>;
  recordingLinkSharing: MeetingRecordingLinkSharingType;
  recordingSpaces?: Maybe<Array<Maybe<Space>>>;
  recordingSummaryNotificationSetting: MeetingRecordingSummaryNotificationType;
  recordingUserGrantees: Array<SyncedMeetingLoomUserGrantee>;
  recordingWorkspaceMemberAccess: MeetingRecordingAccessType;
  recurring?: Maybe<Scalars['Boolean']['output']>;
  startTime?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use 'videoId' instead */
  video?: Maybe<RegularUserVideo>;
  videoId?: Maybe<Scalars['ID']['output']>;
  videoMeetingGuid: Scalars['ID']['output'];
};

export type CalendarMeetingConnection = {
  __typename?: 'CalendarMeetingConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<CalendarMeetingEdge>>>;
  /** Flattened list of CalendarMeeting type */
  nodes?: Maybe<Array<Maybe<CalendarMeeting>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type CalendarMeetingEdge = {
  __typename?: 'CalendarMeetingEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<CalendarMeeting>;
};

export type CalendarUpdatedResponse = {
  __typename?: 'CalendarUpdatedResponse';
  updated: Scalars['Boolean']['output'];
};

export enum CameraPickerRegion {
  BottomCenter = 'BOTTOM_CENTER',
  BottomLeft = 'BOTTOM_LEFT',
  BottomRight = 'BOTTOM_RIGHT',
  MiddleCenter = 'MIDDLE_CENTER',
  MiddleLeft = 'MIDDLE_LEFT',
  MiddleRight = 'MIDDLE_RIGHT',
  TopCenter = 'TOP_CENTER',
  TopLeft = 'TOP_LEFT',
  TopRight = 'TOP_RIGHT'
}

export type CancelMembershipRoleDowngradeRequestResponse = GenericError | InputValidationError | UserNotAuthorizedError | CancelMembershipRoleDowngradeRequestPayloadType;

export type CancelPendingDeletionPayload = {
  __typename?: 'CancelPendingDeletionPayload';
  success: Scalars['Boolean']['output'];
};

export type CancelPendingDeletionResponse = CancelPendingDeletionPayload | GenericError | UserNotAuthorizedError;

export type CaptionTranslationCompletedPayload = {
  __typename?: 'CaptionTranslationCompletedPayload';
  /** Error message if translation failed */
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** The target language for the translation */
  language: Scalars['String']['output'];
  /** Whether the translation was successful */
  success: Scalars['Boolean']['output'];
  /** The URL of the translated captions file */
  translatedCaptionsUrl?: Maybe<Scalars['String']['output']>;
  /** The ID of the video that was translated */
  videoId: Scalars['ID']['output'];
};

export enum CaptureType {
  PictureInScriptureImage = 'picture_in_scripture_image',
  UserScreenshot = 'user_screenshot'
}

export type CardError = Error & {
  __typename?: 'CardError';
  code?: Maybe<Scalars['String']['output']>;
  decline_code?: Maybe<Scalars['String']['output']>;
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type CheckIfUserOnlyTeamAdminPayload = {
  __typename?: 'CheckIfUserOnlyTeamAdminPayload';
  success: Scalars['Boolean']['output'];
};

export type CheckIfUserOnlyTeamAdminResponse = CheckIfUserOnlyTeamAdminPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type CheckUserBelongsToEnterpriseWorkosWorkspace = {
  __typename?: 'CheckUserBelongsToEnterpriseWorkosWorkspace';
  result?: Maybe<Scalars['Boolean']['output']>;
};

export type CheckUserBelongsToEnterpriseWorkosWorkspaceResponse = CheckUserBelongsToEnterpriseWorkosWorkspace | GenericError | UserNotAuthorizedError;

export enum ChecklistItem {
  AddTeammate = 'add_teammate',
  CompleteOnboarding = 'complete_onboarding',
  CreateAccount = 'create_account',
  CustomizeVideoName = 'customize_video_name',
  DownloadRecorder = 'download_recorder',
  EmailVerified = 'email_verified',
  FilledAccountSettings = 'filled_account_settings',
  FirstCamRecording = 'first_cam_recording',
  FirstVideoRecording = 'first_video_recording',
  FirstVideoUpload = 'first_video_upload',
  FirstVideoViewed = 'first_video_viewed',
  FollowedUsOnTwitter = 'followed_us_on_twitter',
  HasReachedRecordingLimit = 'has_reached_recording_limit',
  HasViewedScreenshots = 'has_viewed_screenshots',
  HasViewedVideos = 'has_viewed_videos',
  LikedUsOnFacebook = 'liked_us_on_facebook',
  MeetingRecording = 'meeting_recording',
  PushNotificationEnabled = 'push_notification_enabled',
  ShareVideo = 'share_video',
  SharedFirstVideoOnFacebook = 'shared_first_video_on_facebook',
  TweetedFirstVideo = 'tweeted_first_video'
}

export type ChecklistItems = {
  __typename?: 'ChecklistItems';
  add_teammate?: Maybe<Scalars['Boolean']['output']>;
  complete_onboarding?: Maybe<Scalars['Boolean']['output']>;
  create_account?: Maybe<Scalars['Boolean']['output']>;
  customize_video_name?: Maybe<Scalars['Boolean']['output']>;
  download_recorder?: Maybe<Scalars['Boolean']['output']>;
  email_verified?: Maybe<Scalars['Boolean']['output']>;
  filled_account_settings?: Maybe<Scalars['Boolean']['output']>;
  first_cam_recording?: Maybe<Scalars['Boolean']['output']>;
  first_video_recording?: Maybe<Scalars['Boolean']['output']>;
  first_video_upload?: Maybe<Scalars['Boolean']['output']>;
  first_video_viewed?: Maybe<Scalars['Boolean']['output']>;
  followed_us_on_twitter?: Maybe<Scalars['Boolean']['output']>;
  has_reached_recording_limit?: Maybe<Scalars['Boolean']['output']>;
  has_viewed_screenshots?: Maybe<Scalars['Boolean']['output']>;
  has_viewed_videos?: Maybe<Scalars['Boolean']['output']>;
  liked_us_on_facebook?: Maybe<Scalars['Boolean']['output']>;
  meeting_recording?: Maybe<Scalars['Boolean']['output']>;
  push_notification_enabled?: Maybe<Scalars['Boolean']['output']>;
  share_video?: Maybe<Scalars['Boolean']['output']>;
  shared_first_video_on_facebook?: Maybe<Scalars['Boolean']['output']>;
  tweeted_first_video?: Maybe<Scalars['Boolean']['output']>;
};

export type CheckoutPrices = {
  annual: Array<Scalars['String']['input']>;
  monthly: Array<Scalars['String']['input']>;
};

export type ChildOrParentVideoInfo = {
  __typename?: 'ChildOrParentVideoInfo';
  id: Scalars['String']['output'];
  recipientEmail?: Maybe<Scalars['String']['output']>;
  replacementWord?: Maybe<Scalars['String']['output']>;
};

export type ChurnRefundOptinPayload = {
  __typename?: 'ChurnRefundOptinPayload';
  success: Scalars['Boolean']['output'];
};

export type ClaimCalendarMeetingPayload = {
  __typename?: 'ClaimCalendarMeetingPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ClaimCalendarMeetingRecordingPayload = {
  __typename?: 'ClaimCalendarMeetingRecordingPayload';
  success: Scalars['Boolean']['output'];
};

export type ClaimCalendarMeetingRecordingResponse = ClaimCalendarMeetingRecordingPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type ClaimCalendarMeetingResponse = ClaimCalendarMeetingPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type ClarityChartPayloadType = {
  __typename?: 'ClarityChartPayloadType';
  isValid?: Maybe<Scalars['Boolean']['output']>;
  numberOfFillerWords?: Maybe<Scalars['Int']['output']>;
  numberOfWords?: Maybe<Scalars['Int']['output']>;
};

export type ClearCacheForSdkPartnerPayload = {
  __typename?: 'ClearCacheForSDKPartnerPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ClearCacheForSdkPartnerResponse = ClearCacheForSdkPartnerPayload | GenericError | UserNotAuthorizedError;

export type ClipUpdateError = Error & {
  __typename?: 'ClipUpdateError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type ClipWaveformData = {
  __typename?: 'ClipWaveformData';
  clipId?: Maybe<Scalars['ID']['output']>;
  peaks?: Maybe<Array<Scalars['Float']['output']>>;
  sourceDurationMs?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<WaveformGenerationStatus>;
};

export type ClipWithEditableTranscript = {
  __typename?: 'ClipWithEditableTranscript';
  clipId: Scalars['ID']['output'];
  clipTranscript?: Maybe<AdminEditableTranscript>;
  error?: Maybe<Scalars['String']['output']>;
  mediaS3Id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  revision?: Maybe<Scalars['String']['output']>;
};

export type ClipWithMediaTranscript = {
  __typename?: 'ClipWithMediaTranscript';
  clipId: Scalars['ID']['output'];
  clipTranscript?: Maybe<AdminMediaTranscript>;
  error?: Maybe<Scalars['String']['output']>;
  mediaS3Id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  revision?: Maybe<Scalars['String']['output']>;
};

export type ClipWithViewableTranscript = {
  __typename?: 'ClipWithViewableTranscript';
  clipId: Scalars['ID']['output'];
  clipTranscript?: Maybe<AdminViewableTranscript>;
  error?: Maybe<Scalars['String']['output']>;
  mediaS3Id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  revision?: Maybe<Scalars['String']['output']>;
};

export type CloudfrontSignedCredentialsPayload = {
  __typename?: 'CloudfrontSignedCredentialsPayload';
  Expires?: Maybe<Scalars['Int']['output']>;
  KeyPairId?: Maybe<Scalars['String']['output']>;
  Policy?: Maybe<Scalars['String']['output']>;
  Signature?: Maybe<Scalars['String']['output']>;
};

export type CloudfrontSignedUrlPayload = {
  __typename?: 'CloudfrontSignedUrlPayload';
  credentials: CloudfrontSignedCredentialsPayload;
  url: Scalars['String']['output'];
};

export enum CloudfrontVideoAcceptableMime {
  Dash = 'DASH',
  M3U8 = 'M3U8',
  Mp4 = 'MP4',
  Webm = 'WEBM'
}

export type CommunityProfilePropertyType = {
  __typename?: 'CommunityProfilePropertyType';
  location?: Maybe<Scalars['String']['output']>;
  /** Role within a company, e.g. engineer, designer */
  role?: Maybe<Scalars['String']['output']>;
};

export type CommunityUser = {
  __typename?: 'CommunityUser';
  avatars: Array<Avatar>;
  display_name: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<CommunityUserProfile>;
  profileUri: Scalars['String']['output'];
};

export type CommunityUserPayload = {
  __typename?: 'CommunityUserPayload';
  user?: Maybe<CommunityUser>;
};

export type CommunityUserProfile = {
  __typename?: 'CommunityUserProfile';
  communityVideoCount?: Maybe<Scalars['Int']['output']>;
  profileInfo?: Maybe<CommunityProfilePropertyType>;
  profileUrl?: Maybe<Scalars['String']['output']>;
  topUsedTags?: Maybe<TagConnection>;
};


export type CommunityUserProfileTopUsedTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type CompletableTrigger = {
  __typename?: 'CompletableTrigger';
  complete: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  show: Scalars['Boolean']['output'];
};

export type CompleteGettingStartedChecklistItemResponse = GenericError | GettingStartedChecklistPayload | UserNotAuthorizedError;

export type CompleteVideo = {
  __typename?: 'CompleteVideo';
  success: Scalars['Boolean']['output'];
};

export type CompleteVideoUnion = CompleteVideo | GenericError;

export type ConfigHlsJsPlayer = {
  __typename?: 'ConfigHlsJsPlayer';
  capLevelToPlayerSize?: Maybe<Scalars['Boolean']['output']>;
  maxMaxBufferLength?: Maybe<Scalars['Int']['output']>;
  startLevel?: Maybe<Scalars['Int']['output']>;
  testBandwidth?: Maybe<Scalars['Boolean']['output']>;
};

export type ConfluenceContentPayload = {
  __typename?: 'ConfluenceContentPayload';
  results?: Maybe<Array<Maybe<ConfluenceContent>>>;
};

export type ConfluenceContentResponse = ConfluenceContentPayload | GenericError | UserNotAuthorizedError;

export enum ConfluenceContentTypes {
  Database = 'database',
  Folder = 'folder',
  Page = 'page',
  Whiteboard = 'whiteboard'
}

export type ConfluenceSpaceIcon = {
  __typename?: 'ConfluenceSpaceIcon';
  url?: Maybe<Scalars['String']['output']>;
};

export type ConfluenceSpacesPayload = {
  __typename?: 'ConfluenceSpacesPayload';
  results?: Maybe<Array<Maybe<ConfluenceSpace>>>;
};

export type ConfluenceSpacesResponse = ConfluenceSpacesPayload | GenericError | UserNotAuthorizedError;

export type ConfluenceUserPermissionsPayload = {
  __typename?: 'ConfluenceUserPermissionsPayload';
  hasPermission: Scalars['Boolean']['output'];
};

export type ConfluenceUserPermissionsResponse = ConfluenceUserPermissionsPayload | GenericError | UserNotAuthorizedError;

export enum Conjunction {
  And = 'and',
  Or = 'or'
}

export enum ConnectedServiceIntegrationEnumType {
  Gcal = 'gcal',
  MicrosoftGraph = 'microsoft_graph'
}

/** Company size options in contact sales form */
export enum ContactSalesCompanySize {
  Range1 = 'Range1',
  Range2 = 'Range2',
  Range3 = 'Range3',
  Range4 = 'Range4',
  Range5 = 'Range5',
  Range6 = 'Range6',
  Range7 = 'Range7',
  Range8 = 'Range8'
}

/** Use case options in contact sales form */
export enum ContactSalesUseCase {
  BuyLicense = 'BuyLicense',
  LearnAboutEnterprise = 'LearnAboutEnterprise',
  LoomForSchool = 'LoomForSchool',
  ProductEvaluation = 'ProductEvaluation'
}

export enum ContentVisibilityProperty {
  Public = 'public',
  Workspace = 'workspace'
}

export enum ControlTypeEnum {
  DynamicConfig = 'dynamic_config',
  LaunchdarklyFeatureFlag = 'launchdarkly_feature_flag',
  StatsigExperiment = 'statsig_experiment',
  StatsigFeatureGate = 'statsig_feature_gate'
}

export enum CorrectionEditType {
  Insert = 'insert',
  Remove = 'remove',
  Replace = 'replace'
}

export enum CorrectionPositionType {
  After = 'after',
  Before = 'before'
}

export type CorrectionSource = {
  element: Scalars['Int']['input'];
  monologue: Scalars['Int']['input'];
};

export enum CorrectionSourceType {
  Auto = 'auto',
  User = 'user'
}

export type CountPayload = {
  __typename?: 'CountPayload';
  count?: Maybe<Scalars['Int']['output']>;
  hasFailed?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateAnonPartnerSessionRecordingCacheResponse = GenericError | CreateAnonPartnerSessionRecordingCachePayload;

export type CreateApiKeyUnion = GenericError | SdkApiKey;

export type CreateAutomationPayload = {
  __typename?: 'CreateAutomationPayload';
  automation?: Maybe<Automation>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateAutomationSuccessResponse = CreateAutomationPayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type CreateConfluencePagePayload = {
  __typename?: 'CreateConfluencePagePayload';
  confluencePageUrl?: Maybe<Scalars['String']['output']>;
};

export type CreateConfluencePageResponse = CreateConfluencePagePayload | GenericError | UserNotAuthorizedError;

export type CreateCredentialsForVideoDraftImages = {
  __typename?: 'CreateCredentialsForVideoDraftImages';
  credentials: S3Credentials;
};

export type CreateCredentialsForVideoDraftImagesResponse = CreateCredentialsForVideoDraftImages | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateDeveloperAccountRes = {
  __typename?: 'CreateDeveloperAccountRes';
  applications?: Maybe<Array<Maybe<RecordSdkApplication>>>;
  developerAccount?: Maybe<DeveloperAccount>;
};

export type CreateDeveloperAccountResponse = CreateDeveloperAccountRes | GenericError | UserNotAuthorizedError;

export type CreateDraftSceneImageOverlayPayload = {
  __typename?: 'CreateDraftSceneImageOverlayPayload';
  imageOverlay: GeneratedVideoImageOverlay;
};

export type CreateDraftSceneImageOverlayResponse = CreateDraftSceneImageOverlayPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateExternalApiTokenResponse = CreateExternalApiTokenResult | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateExternalApiTokenResult = {
  __typename?: 'CreateExternalAPITokenResult';
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
  workspaceId?: Maybe<Scalars['String']['output']>;
};

export type CreateFolderPayload = {
  __typename?: 'CreateFolderPayload';
  folder?: Maybe<RegularUserFolder>;
};

export type CreateFolderResponse = CreateFolderPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateGeneratedVideoDraftPayload = {
  __typename?: 'CreateGeneratedVideoDraftPayload';
  success: Scalars['Boolean']['output'];
  videoDraftId: Scalars['ID']['output'];
};

export type CreateGeneratedVideoDraftResponse = CreateGeneratedVideoDraftPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateGooglePreviewMappingResponse = GenericError | GooglePreviewPayloadType;

export type CreateIncentiveResponse = GenericError | UserNotAuthorizedError | CreateIncentivePayloadType;

export type CreateIntegrationSubscriptionResponse = GenericError | IntegrationSubscription | UserNotAuthorizedError;

export type CreateInviteLinkInput = {
  /** the role that an invitee will be assigned */
  role: OrgRole;
};

export type CreateInviteLinkPayload = {
  __typename?: 'CreateInviteLinkPayload';
  inviteLink?: Maybe<InviteLink>;
};

export type CreateInviteLinkResponse = CreateInviteLinkPayload | GenericError | InputValidationError | InvalidInviteLinkRoleError | InvalidWorkspaceTypeError | InviteLinkWorkspaceSsoError | UserNotAuthorizedError;

export type CreateJiraIssuePayload = {
  __typename?: 'CreateJiraIssuePayload';
  issueUrl?: Maybe<Scalars['String']['output']>;
  needsAtlassianAuth?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateJiraIssueResponse = CreateJiraIssuePayload | GenericError | InvalidRequestWarning | JiraCreateIssueError | UserNotAuthorizedError;

export type CreateLinearIssuePayload = {
  __typename?: 'CreateLinearIssuePayload';
  issueUrl?: Maybe<Scalars['String']['output']>;
  needsLinearAuth?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateLinearIssueResponse = CreateLinearIssuePayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type CreateOrganizationResponse = GenericError | InputValidationError | Organization | UserNotAuthorizedError;

export type CreatePhoneticHintsPayload = {
  __typename?: 'CreatePhoneticHintsPayload';
  /** Newly created phonetic hints entry */
  created: PhoneticHints;
};

export type CreatePhoneticHintsResponse = CreatePhoneticHintsPayload | GenericError | UserNotAuthorizedError;

export type CreateReferralLinkPayloadType = {
  __typename?: 'CreateReferralLinkPayloadType';
  created?: Maybe<Scalars['Boolean']['output']>;
  referralLinkId?: Maybe<Scalars['String']['output']>;
};

export type CreateReferralLinkResponse = CreateReferralLinkPayloadType | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateScrapedHtmlSignedUploadUrl = {
  __typename?: 'CreateScrapedHtmlSignedUploadUrl';
  signedUploadUrl: Scalars['String']['output'];
};

export type CreateScrapedHtmlSignedUploadUrlResponse = CreateScrapedHtmlSignedUploadUrl | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateScreenshotUpload = {
  __typename?: 'CreateScreenshotUpload';
  credentials: S3Credentials;
  paths: ScreenshotPaths;
  screenshotId: Scalars['ID']['output'];
};

export type CreateScreenshotUploadResponse = CreateScreenshotUpload | EntityNotFoundError | GenericError | UserNotAuthorizedError;

export type CreateSdkPrivateKeyRes = {
  __typename?: 'CreateSdkPrivateKeyRes';
  createdAt?: Maybe<Scalars['Date']['output']>;
  keyHash?: Maybe<Scalars['ID']['output']>;
  pem?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CreateSdkPrivateKeyResponse = CreateSdkPrivateKeyRes | GenericError | UserNotAuthorizedError | UserNotLoggedInError;

export type CreateSetupIntentPayload = {
  __typename?: 'CreateSetupIntentPayload';
  token: Scalars['String']['output'];
};

export type CreateSetupIntentResponse = CreateSetupIntentPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateSpacePayload = {
  __typename?: 'CreateSpacePayload';
  space?: Maybe<Space>;
};

export type CreateSpaceResponse = CreateSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type CreateSupportTicketNonLoggedInUserPayload = {
  __typename?: 'CreateSupportTicketNonLoggedInUserPayload';
  response?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateSupportTicketNonLoggedInUserResponse = CreateSupportTicketNonLoggedInUserPayload | GenericError;

export type CreateSupportTicketPayload = {
  __typename?: 'CreateSupportTicketPayload';
  success: Scalars['Boolean']['output'];
};

export type CreateSupportTicketResponse = CreateSupportTicketPayload | GenericError | UserNotAuthorizedError;

export type CreateTestVideoPayload = {
  __typename?: 'CreateTestVideoPayload';
  video?: Maybe<RegularUserVideo>;
};

export type CreateTestVideoResponse = CreateTestVideoPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type CreateTestVideosForUserMutationRes = {
  __typename?: 'CreateTestVideosForUserMutationRes';
  success: Scalars['Boolean']['output'];
};

export type CreateTestVideosForUserRes = CreateTestVideosForUserMutationRes | GenericError;

export type CreateTranscriptCorrectionsNewCorrectionV2Input = {
  /** ID of the clip for which the transcript will be corrected. It can be omitted only if the video is not clip-based yet */
  clipId?: InputMaybe<Scalars['ID']['input']>;
  /** The type of correction being made */
  correctionType: CorrectionEditType;
  /** IDs of the elements impacted by this correction */
  elementIds: Array<Scalars['ID']['input']>;
  /** The new text to be used */
  newContent?: InputMaybe<Scalars['String']['input']>;
  /** The relative position of an insert correction */
  position?: InputMaybe<CorrectionPositionType>;
};

export type CreateTranscriptCorrectionsV2Input = {
  /** The new corrections to be applied */
  transcriptCorrections: Array<CreateTranscriptCorrectionsNewCorrectionV2Input>;
  /** ID of the video */
  videoId: Scalars['ID']['input'];
};

export type CreateTranscriptCorrectionsV2Payload = {
  __typename?: 'CreateTranscriptCorrectionsV2Payload';
  /** The signed url for the updated captions file */
  captionsUrl: Scalars['String']['output'];
  /** The signed url for the updated phrases file */
  phrasesUrl: Scalars['String']['output'];
  /** The artifacts version number that was just created */
  version: Scalars['Int']['output'];
};

export type CreateTranscriptCorrectionsV2Response = CreateTranscriptCorrectionsV2Payload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type CreateUserWithEmailAndPasswordResponse = GenericError | InputValidationError | RegularUser | UserAlreadyExistsError | UserAlreadyLoggedInError;

export type CreateVideoAclEntriesPayload = {
  __typename?: 'CreateVideoAclEntriesPayload';
  entrySet?: Maybe<VideoAclEntrySet>;
  video?: Maybe<RegularUserVideo>;
};

export type CreateVideoAclEntriesResponse = CreateVideoAclEntriesPayload | GenericError | UserNotAuthorizedError;

export type CreateVideoRes = GenericError | RegularUserVideo;

export type CreateVideoTaskPayload = {
  __typename?: 'CreateVideoTaskPayload';
  task?: Maybe<VideoTask>;
};

export type CreateVideoTaskResponse = CreateVideoTaskPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type CreateVideoTextReplacementPayload = {
  __typename?: 'CreateVideoTextReplacementPayload';
  video: RegularUserVideo;
};

export type CreateVideoTextReplacementResponse = CreateVideoTextReplacementPayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type CreateWorkspaceGroupResponse = GenericError | InputValidationError | UserNotAuthorizedError | CreateWorkspaceGroupPayload;

export type CreatorExperiencePayload = {
  __typename?: 'CreatorExperiencePayload';
  showCommentToCreator: Scalars['Boolean']['output'];
  showFirstEmoji: Scalars['Boolean']['output'];
  showSecondEmoji: Scalars['Boolean']['output'];
  videoCreatedAt: Scalars['String']['output'];
  videoDuration: Scalars['Int']['output'];
};

export type CtaInput = {
  approved_at?: InputMaybe<Scalars['Date']['input']>;
  enabled: Scalars['Boolean']['input'];
  is_auto?: InputMaybe<Scalars['Boolean']['input']>;
  mods?: InputMaybe<CtaMods>;
  text?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CtaMods = {
  background_color?: InputMaybe<Scalars['String']['input']>;
  border_radius?: InputMaybe<Scalars['Int']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  only_show_at_end_of_video?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CustomBrandingSettings = {
  brandLogoPath?: InputMaybe<Scalars['String']['input']>;
  brandPrimaryColor?: InputMaybe<Scalars['String']['input']>;
  brandShowBranding?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};

export type CustomValidateEmailFailure = {
  __typename?: 'CustomValidateEmailFailure';
  reason: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CustomValidateEmailResponse = CustomValidateEmailFailure | CustomValidateEmailSuccess | GenericError;

export type CustomValidateEmailSuccess = {
  __typename?: 'CustomValidateEmailSuccess';
  success: Scalars['Boolean']['output'];
};

export type CustomVideoBackground = {
  __typename?: 'CustomVideoBackground';
  assetId: Scalars['String']['output'];
  src?: Maybe<Scalars['String']['output']>;
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Address>;
  currency?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  tax_id?: Maybe<Scalars['String']['output']>;
  test_clock?: Maybe<TestClock>;
  workspace_id?: Maybe<Scalars['String']['output']>;
};

export type CustomerInformationInput = {
  addressCity: Scalars['String']['input'];
  addressCountry: Scalars['String']['input'];
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  addressPostalCode: Scalars['String']['input'];
  addressState: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxType?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerMetadata = {
  __typename?: 'CustomerMetadata';
  third_tier_assignment?: Maybe<ThirdTierVariation>;
  trialLengthDays?: Maybe<Scalars['Int']['output']>;
};

export type CustomerStripeCardError = {
  __typename?: 'CustomerStripeCardError';
  /** Programmatic error code returned by Stripe */
  code?: Maybe<Scalars['String']['output']>;
  /** Decline code returned by Stripe */
  decline_code?: Maybe<Scalars['String']['output']>;
  /** Human-readable error message */
  message: Scalars['String']['output'];
  /** The type of error returned by Stripe */
  type: Scalars['String']['output'];
};

export type DataPoint = {
  __typename?: 'DataPoint';
  count?: Maybe<Scalars['Int']['output']>;
  lastModified?: Maybe<Scalars['Date']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type DataRetention = {
  __typename?: 'DataRetention';
  enabled: Scalars['Boolean']['output'];
  enabledAt?: Maybe<Scalars['Date']['output']>;
  interval?: Maybe<DataRetentionInterval>;
  intervalCount?: Maybe<Scalars['Int']['output']>;
  keep?: Maybe<Array<Maybe<DataRetentionKeep>>>;
};

export enum DataRetentionInterval {
  Days = 'days',
  Years = 'years'
}

export enum DataRetentionKeep {
  Published = 'published',
  Team = 'team'
}

export type DataRetentionResponse = DataRetention | GenericError | InputValidationError | UserNotAuthorizedError;

export type DataRetentionTriggerResponse = {
  __typename?: 'DataRetentionTriggerResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DataSyncCollectorTriggerResponse = {
  __typename?: 'DataSyncCollectorTriggerResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DatadogDistributionInput = {
  keyName: Scalars['String']['input'];
  tags: Array<DatadogTagInput>;
  value: Scalars['Float']['input'];
};

export type DatadogGuageInput = {
  keyName: Scalars['String']['input'];
  tags: Array<DatadogTagInput>;
  value: Scalars['Float']['input'];
};

export type DatadogHistogramInput = {
  keyName: Scalars['String']['input'];
  tags: Array<DatadogTagInput>;
  value: Scalars['Float']['input'];
};

export type DatadogIncrementInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  keyName: Scalars['String']['input'];
  tags: Array<DatadogTagInput>;
};

export type DatadogTagInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum Datasource {
  Db = 'db',
  Redis = 'redis'
}

/** The date types to fetch */
export enum DateType {
  AllTime = 'ALL_TIME',
  LastNinetyDays = 'LAST_NINETY_DAYS',
  LastYear = 'LAST_YEAR'
}

export type DeactivateApiKeyResult = {
  __typename?: 'DeactivateApiKeyResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeactivateApiKeyUnion = DeactivateApiKeyResult | GenericError;

export type DeclineInvitationResult = {
  __typename?: 'DeclineInvitationResult';
  success: Scalars['Boolean']['output'];
};

export enum DefaultSsoRoleEnum {
  Creator = 'creator',
  Viewer = 'viewer'
}

export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  effective: DeletionEffective;
  success: Scalars['Boolean']['output'];
};

export type DeleteAccountResponse = DeleteAccountPayload | GenericError | UserNotAuthorizedError;

export type DeleteAssetPayload = {
  __typename?: 'DeleteAssetPayload';
  asset: Asset;
};

export type DeleteAssetResponse = DeleteAssetPayload | GenericError | UserNotAuthorizedError;

export type DeleteBacklinkPayload = {
  __typename?: 'DeleteBacklinkPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteBacklinkResponse = DeleteBacklinkPayload | GenericError | UserNotAuthorizedError;

export type DeleteCachedSubscriptionDataResponse = DeleteSubscriptionCacheResult | GenericError | UserNotAuthorizedError;

export type DeleteDomainsFromApiKeyResult = {
  __typename?: 'DeleteDomainsFromApiKeyResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteDomainsFromApiKeyUnion = DeleteDomainsFromApiKeyResult | GenericError;

export type DeleteDraftClipsPayload = {
  __typename?: 'DeleteDraftClipsPayload';
  video?: Maybe<RegularUserVideo>;
};

export type DeleteDraftClipsResponse = DeleteDraftClipsPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type DeleteExternalApiTokenResponse = DeleteExternalApiTokenResult | GenericError | InputValidationError | UserNotAuthorizedError;

export type DeleteExternalApiTokenResult = {
  __typename?: 'DeleteExternalAPITokenResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteGmailScopeResponse = GenericError | InputValidationError | UserNotAuthorizedError | DeleteGmailScopePayload;

export type DeleteOauthProviderPayload = {
  __typename?: 'DeleteOauthProviderPayload';
  message: Scalars['String']['output'];
};

export type DeleteOauthProviderResponse = AccountIsExternallyMasteredError | DeleteOauthProviderPayload | GenericError | UserNotAuthorizedError;

export type DeletePhoneticHintsPayload = {
  __typename?: 'DeletePhoneticHintsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeletePhoneticHintsResponse = DeletePhoneticHintsPayload | GenericError | UserNotAuthorizedError;

export type DeleteScreenshotResponse = DeleteScreenshotResult | EntityNotFoundError | GenericError | UserNotAuthorizedError;

export type DeleteScreenshotResult = {
  __typename?: 'DeleteScreenshotResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteSdkPrivateKeyRes = {
  __typename?: 'DeleteSdkPrivateKeyRes';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteSdkPrivateKeyResponse = DeleteSdkPrivateKeyRes | GenericError | UserNotAuthorizedError | UserNotLoggedInError;

export type DeleteSlackMessageRequiredInfo = {
  messageTimestamp: Scalars['String']['input'];
  slackChannelId: Scalars['String']['input'];
  slackTeamId: Scalars['String']['input'];
};

export type DeleteSpacePayload = {
  __typename?: 'DeleteSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteSpaceResponse = DeleteSpacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type DeleteSsoDomain = {
  __typename?: 'DeleteSsoDomain';
  deleteSsoDomain: Scalars['Boolean']['output'];
};

export type DeleteSsoDomainForOrgResponse = DeleteSsoDomain | GenericError | InputValidationError | UserNotAuthorizedError | UserNotLoggedInError;

export type DeleteSubscriptionCacheResult = {
  __typename?: 'DeleteSubscriptionCacheResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteSubscriptionItemPayload = {
  __typename?: 'DeleteSubscriptionItemPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteSubscriptionItemResponse = DeleteSubscriptionItemPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type DeleteUserAvatarPayload = {
  __typename?: 'DeleteUserAvatarPayload';
  avatars?: Maybe<Array<Avatar>>;
};

export type DeleteUserAvatarResponse = AccountIsExternallyMasteredError | DeleteUserAvatarPayload | GenericError | UserNotAuthorizedError;

export type DeleteVideoAclEntryPayload = {
  __typename?: 'DeleteVideoAclEntryPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteVideoAclEntryResponse = DeleteVideoAclEntryPayload | GenericError | UserNotAuthorizedError;

export type DeleteVideoMutationRes = {
  __typename?: 'DeleteVideoMutationRes';
  success: Scalars['Boolean']['output'];
};

export type DeleteVideoRes = DeleteVideoMutationRes | GenericError;

export type DeleteVideoTaskPayload = {
  __typename?: 'DeleteVideoTaskPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteVideoTaskResponse = DeleteVideoTaskPayload | GenericError | InvalidRequestWarning | UserNotAuthorizedError;

export type DeleteVideoTextReplacementPayload = {
  __typename?: 'DeleteVideoTextReplacementPayload';
  video: RegularUserVideo;
};

export type DeleteVideoTextReplacementResponse = DeleteVideoTextReplacementPayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type DeleteWorkspaceContactsPayload = {
  __typename?: 'DeleteWorkspaceContactsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteWorkspaceContactsResponse = DeleteWorkspaceContactsPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type DeleteWorkspaceGroupResponse = GenericError | InputValidationError | UserNotAuthorizedError | DeleteWorkspaceGroupPayload;

export type DeleteWorkspaceMemberPayload = {
  __typename?: 'DeleteWorkspaceMemberPayload';
  success: Scalars['Boolean']['output'];
};

export type DeleteWorkspaceMemberResponse = DeleteWorkspaceMemberPayload | GenericError | UserNotAuthorizedError;

/** Describes when the deletion of the user will occur. If delayed, the deletion will be automatically occur some time in the future. If deferred, the account is pending some requirement (such as deletion from a workspace) to complete deletion. */
export enum DeletionEffective {
  Deferred = 'DEFERRED',
  Delayed = 'DELAYED',
  Immediately = 'IMMEDIATELY'
}

export enum DeliveryType {
  Instant = 'INSTANT',
  NextDay = 'NEXT_DAY',
  NextDaySkipWeekends = 'NEXT_DAY_SKIP_WEEKENDS'
}

export type DequeueBotMessagesResponse = BotMessagesResponse | GenericError | UserNotAuthorizedError;

export enum DesktopVersionTypes {
  Latest = 'latest',
  LowCadenceLatest = 'low_cadence_latest',
  Nightly = 'nightly',
  Trunk = 'trunk'
}

export type DestroyAutomationPayload = {
  __typename?: 'DestroyAutomationPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DestroyAutomationSuccessResponse = DestroyAutomationPayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type DestroyVideoPayload = {
  __typename?: 'DestroyVideoPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DestroyVideoResponse = DestroyVideoPayload | GenericError | UserNotAuthorizedError;

export type DetermineAudioPersonalizationEligibilityPayload = {
  __typename?: 'DetermineAudioPersonalizationEligibilityPayload';
  isEligible?: Maybe<Scalars['Boolean']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type DetermineAudioPersonalizationEligibilityResponse = DetermineAudioPersonalizationEligibilityPayload | GenericError | UserNotAuthorizedError;

export type DeveloperAccount = {
  __typename?: 'DeveloperAccount';
  applications?: Maybe<Array<Maybe<RecordSdkApplication>>>;
  id?: Maybe<Scalars['String']['output']>;
};

export type DeveloperAccountByUserQueryResponse = DeveloperAccountByUserReturnType | GenericError | UserNotAuthorizedError;

/** Get developer account by user ID */
export type DeveloperAccountByUserReturnType = {
  __typename?: 'DeveloperAccountByUserReturnType';
  developerAccountId?: Maybe<Scalars['Int']['output']>;
  integrationSubscriptions?: Maybe<Array<Maybe<IntegrationSubscription>>>;
};

export type DeveloperAccountMutations = {
  __typename?: 'DeveloperAccountMutations';
  addDomainsToApiKey?: Maybe<AddDomainsToApiKeyUnion>;
  addPlaybackAllowedDomainsToSDK?: Maybe<AddPlaybackAllowedDomainsToSdkUnion>;
  createApiKey?: Maybe<CreateApiKeyUnion>;
  deactivateApiKey?: Maybe<DeactivateApiKeyUnion>;
  deleteAllPlaybackAllowedDomains?: Maybe<DeleteAllPlaybackAllowedDomainsUnion>;
  deleteDomainsFromApiKey?: Maybe<DeleteDomainsFromApiKeyUnion>;
  deletePlaybackAllowedDomainsFromSDK?: Maybe<DeletePlaybackAllowedDomainsFromSdkUnion>;
  setRemoveLoomBranding?: Maybe<SetRemoveLoomBranding>;
};


export type DeveloperAccountMutationsAddDomainsToApiKeyArgs = {
  apiKeyId: Scalars['ID']['input'];
  newDomains: Array<Scalars['String']['input']>;
};


export type DeveloperAccountMutationsAddPlaybackAllowedDomainsToSdkArgs = {
  applicationId: Scalars['ID']['input'];
  newDomains: Array<Scalars['String']['input']>;
};


export type DeveloperAccountMutationsCreateApiKeyArgs = {
  hosts: Array<Scalars['String']['input']>;
  packageName?: InputMaybe<Scalars['String']['input']>;
  partnerName: Scalars['String']['input'];
};


export type DeveloperAccountMutationsDeactivateApiKeyArgs = {
  apiKeyId: Scalars['ID']['input'];
};


export type DeveloperAccountMutationsDeleteAllPlaybackAllowedDomainsArgs = {
  applicationId: Scalars['ID']['input'];
};


export type DeveloperAccountMutationsDeleteDomainsFromApiKeyArgs = {
  apiKeyId: Scalars['ID']['input'];
  domainsToDelete: Array<Scalars['String']['input']>;
};


export type DeveloperAccountMutationsDeletePlaybackAllowedDomainsFromSdkArgs = {
  applicationId: Scalars['ID']['input'];
  domainsToDelete: Array<Scalars['String']['input']>;
};


export type DeveloperAccountMutationsSetRemoveLoomBrandingArgs = {
  applicationId: Scalars['ID']['input'];
  removeLoomBranding: Scalars['Boolean']['input'];
};

export type DeveloperAccountQueries = {
  __typename?: 'DeveloperAccountQueries';
  developerAccountId?: Maybe<Scalars['String']['output']>;
  fetchApiKeys?: Maybe<FetchApiKeysUnion>;
  getApplication?: Maybe<GetApplicationUnion>;
  listApplications?: Maybe<ListApplicationsUnion>;
};


export type DeveloperAccountQueriesGetApplicationArgs = {
  applicationId: Scalars['ID']['input'];
};

export type DeveloperAccountQueriesResponse = DeveloperAccountQueries | GenericError | UserNotAuthorizedError;

export type DeveloperAccountResponse = DeveloperAccountMutations | GenericError | UserNotAuthorizedError;

export type DisableInviteLinkPayload = {
  __typename?: 'DisableInviteLinkPayload';
  success: Scalars['Boolean']['output'];
};

export type DisableInviteLinkResponse = DisableInviteLinkPayload | GenericError | InputValidationError | InvalidLinkModifierError | UserNotAuthorizedError;

export type DisconnectCalendarPayload = {
  __typename?: 'DisconnectCalendarPayload';
  success: Scalars['Boolean']['output'];
};

export type DisconnectCalendarResponse = DisconnectCalendarPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type DisconnectJiraConnectionForUserPayload = {
  __typename?: 'DisconnectJiraConnectionForUserPayload';
  /** Whether the disconnection was successful */
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DisconnectJiraConnectionForUserResponse = DisconnectJiraConnectionForUserPayload | GenericError | UserNotAuthorizedError;

export type DisconnectLinearConnectionForUserPayload = {
  __typename?: 'DisconnectLinearConnectionForUserPayload';
  /** Whether the disconnection was successful */
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DisconnectLinearConnectionForUserResponse = DisconnectLinearConnectionForUserPayload | GenericError | UserNotAuthorizedError;

export type DisconnectSfdcPayload = {
  __typename?: 'DisconnectSfdcPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DisconnectSfdcResponse = DisconnectSfdcPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type DisconnectSlackResponse = GenericError | InputValidationError | IntegrationSubscription | UserNotAuthorizedError;

export type DisconnectSlackSubscriptionConnectionsForUserPayload = {
  __typename?: 'DisconnectSlackSubscriptionConnectionsForUserPayload';
  numberOfDeletedConnections?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DisconnectSlackSubscriptionConnectionsForUserResponse = DisconnectSlackSubscriptionConnectionsForUserPayload | GenericError | UserNotAuthorizedError;

export type Discount = {
  __typename?: 'Discount';
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  durationInMonths?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DiscoverabilityEvaluation = {
  __typename?: 'DiscoverabilityEvaluation';
  canDiscover?: Maybe<Scalars['Boolean']['output']>;
  discoverabilityReason?: Maybe<Scalars['String']['output']>;
};

export type DismissWorkflowSneakpeekProperty = {
  __typename?: 'DismissWorkflowSneakpeekProperty';
  dismissWorkflowSneakpeek?: Maybe<Scalars['Boolean']['output']>;
};

export type DomainVideoAclEntry = VideoAclEntry & {
  __typename?: 'DomainVideoAclEntry';
  access?: Maybe<VideoAccessLevel>;
  domain: Scalars['String']['output'];
};

export type DownloadDisabled = {
  __typename?: 'DownloadDisabled';
  value: Scalars['Boolean']['output'];
};

export type DownloadDisabledResponse = DownloadDisabled | GenericError;

export enum DownloadableByType {
  Anyone = 'anyone',
  Editors = 'editors',
  NoOne = 'no_one',
  Owner = 'owner',
  Workspace = 'workspace'
}

export type DraftBackground = HexDraftBackground | PresetDraftBackground;

export type DraftScene = {
  __typename?: 'DraftScene';
  id: Scalars['ID']['output'];
  imageOverlays: Array<GeneratedVideoImageOverlay>;
  position: Scalars['Int']['output'];
  script?: Maybe<Scalars['String']['output']>;
  textOverlays: Array<GeneratedVideoTextOverlay>;
};

export type DuplicateFolderPayload = {
  __typename?: 'DuplicateFolderPayload';
  newFolder?: Maybe<RegularUserFolder>;
};

export type DuplicateFolderResponse = DuplicateFolderPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type DuplicateVideoPayload = {
  __typename?: 'DuplicateVideoPayload';
  newVideo?: Maybe<RegularUserVideo>;
};

export type DuplicateVideoResponse = DuplicateVideoPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type EditCommentResponse = GenericError | InvalidRequestWarning | EditCommentPayload;

export type EditZoomInstructionsMetadata = {
  __typename?: 'EditZoomInstructionsMetadata';
  clipId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  lowerMs: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  upperMs: Scalars['Int']['output'];
  videoId: Scalars['String']['output'];
  zoomCreatedBy: ZoomCreatedBy;
  zoomLevel: Scalars['Float']['output'];
  zoomType: ZoomType;
  zoomVersion: Scalars['String']['output'];
};

export type EditableMonologue = {
  __typename?: 'EditableMonologue';
  clipId?: Maybe<Scalars['ID']['output']>;
  elements: Array<EditableTranscriptElement>;
  speaker?: Maybe<Speaker>;
};

export type EditablePunctElement = {
  __typename?: 'EditablePunctElement';
  id: Scalars['ID']['output'];
  mediaEndMs: Scalars['Int']['output'];
  mediaStartMs: Scalars['Int']['output'];
  suppressed?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EditableTextElement = {
  __typename?: 'EditableTextElement';
  editableEndMs: Scalars['Int']['output'];
  editableStartMs: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mediaEndMs: Scalars['Int']['output'];
  mediaStartMs: Scalars['Int']['output'];
  suppressed?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EditableTranscriptElement = EditablePunctElement | EditableTextElement;

export type EducationEmailAddResult = {
  __typename?: 'EducationEmailAddResult';
  userResults: Scalars['String']['output'];
};

export enum EmailGateVideoType {
  Hard = 'HARD',
  None = 'NONE',
  Soft = 'SOFT'
}

export type EmitDatadogEventsPayload = {
  __typename?: 'EmitDatadogEventsPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EmitDatadogEventsResponse = EmitDatadogEventsPayload | GenericError;

export type EmptyChaptersPayload = {
  __typename?: 'EmptyChaptersPayload';
  content?: Maybe<Scalars['String']['output']>;
};

export type EndWorkspaceUserSessionsPayload = {
  __typename?: 'EndWorkspaceUserSessionsPayload';
  failedUserID?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EndWorkspaceUserSessionsResponse = EndWorkspaceUserSessionsPayload | GenericError | UserNotAuthorizedError;

export type EngagementInsightsAggregate = {
  __typename?: 'EngagementInsightsAggregate';
  cta?: Maybe<Scalars['Boolean']['output']>;
  ctaClicks?: Maybe<Scalars['Int']['output']>;
  events?: Maybe<Array<Maybe<ViEvent>>>;
  hasWatchSession?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  percentCompleted?: Maybe<Scalars['Int']['output']>;
  trackedViews?: Maybe<Scalars['Int']['output']>;
  user: EngagementInsightsViewer;
  views?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type EngagementInsightsAggregateConnection = {
  __typename?: 'EngagementInsightsAggregateConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<EngagementInsightsAggregateEdge>>>;
  /** Flattened list of EngagementInsightsAggregate type */
  nodes?: Maybe<Array<Maybe<EngagementInsightsAggregate>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type EngagementInsightsAggregateEdge = {
  __typename?: 'EngagementInsightsAggregateEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<EngagementInsightsAggregate>;
};

export type EngagementInsightsCsvRow = {
  __typename?: 'EngagementInsightsCsvRow';
  creator_email?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use playable_duration instead */
  duration?: Maybe<Scalars['String']['output']>;
  folder_name?: Maybe<Scalars['String']['output']>;
  has_cta?: Maybe<Scalars['String']['output']>;
  has_password?: Maybe<Scalars['String']['output']>;
  has_search_engine_indexing?: Maybe<Scalars['String']['output']>;
  playable_duration?: Maybe<Scalars['String']['output']>;
  public_access?: Maybe<Scalars['String']['output']>;
  total_comments?: Maybe<Scalars['String']['output']>;
  total_cta_clicks?: Maybe<Scalars['String']['output']>;
  total_download_clicks?: Maybe<Scalars['String']['output']>;
  total_reactions?: Maybe<Scalars['String']['output']>;
  total_unique_viewers?: Maybe<Scalars['String']['output']>;
  total_views?: Maybe<Scalars['String']['output']>;
  video_creation_date?: Maybe<Scalars['String']['output']>;
  video_is_archived?: Maybe<Scalars['String']['output']>;
  video_library?: Maybe<Scalars['String']['output']>;
  video_link?: Maybe<Scalars['String']['output']>;
  video_name?: Maybe<Scalars['String']['output']>;
  workspace_access?: Maybe<Scalars['String']['output']>;
};

export type EngagementInsightsExportPreviewResponse = EngagementInsightsPreview | GenericError | UserNotAuthorizedError;

export type EngagementInsightsPreview = {
  __typename?: 'EngagementInsightsPreview';
  csvRows?: Maybe<Array<EngagementInsightsCsvRow>>;
  totalRows: Scalars['Int']['output'];
};

export type EngagementInsightsStats = {
  __typename?: 'EngagementInsightsStats';
  completionPercentAvg?: Maybe<Scalars['Float']['output']>;
  ctaConversionPercent?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  trackedViewerCount?: Maybe<Scalars['Int']['output']>;
};

export type EngagementInsightsSummary = {
  __typename?: 'EngagementInsightsSummary';
  id: Scalars['ID']['output'];
  paginatedViewers?: Maybe<EngagementInsightsAggregateConnection>;
  stats?: Maybe<EngagementInsightsStats>;
  viewers: Array<Maybe<EngagementInsightsAggregate>>;
};


export type EngagementInsightsSummaryPaginatedViewersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  videoId: Scalars['ID']['input'];
};


export type EngagementInsightsSummaryStatsArgs = {
  videoId: Scalars['ID']['input'];
};

export type EngagementInsightsViewer = {
  __typename?: 'EngagementInsightsViewer';
  avatar?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profileUrl?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<Scalars['Int']['output']>;
};

export type Entitlement = {
  __typename?: 'Entitlement';
  autoConverting: Scalars['Boolean']['output'];
  currentLoomProductLevel: Scalars['Int']['output'];
  entitlementId: Scalars['String']['output'];
  isCollection: Scalars['Boolean']['output'];
  offeringId: Scalars['String']['output'];
  offeringName: Scalars['String']['output'];
  orgId: Scalars['String']['output'];
  pricingType: Scalars['String']['output'];
  productKey: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  timeLeft: Scalars['Float']['output'];
  trialing: Scalars['Boolean']['output'];
};

export type EntityNotFoundError = Error & {
  __typename?: 'EntityNotFoundError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type Error = {
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type ExternalApiToken = {
  __typename?: 'ExternalAPIToken';
  name?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type ExtraPropertiesInput = {
  /** Used to segment assignments based on android mobile app versions */
  androidAppVersion?: InputMaybe<Scalars['String']['input']>;
  /** the CPU architecture the app was compiled for */
  compiledArch?: InputMaybe<Scalars['String']['input']>;
  /** the CPU architecture info including if it is run on Apple Rosetta */
  cpuArch?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on desktop OS name */
  desktopAppOs?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on desktop OS versions */
  desktopAppOsVersion?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on desktop app versions */
  desktopAppVersion?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on iOS app versions */
  iOSAppVersion?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on iOS system versions */
  iOSSystemVersion?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment by integration partner subscription ID */
  integrationSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment by integration partner subscription name */
  integrationSubscriptionName?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on Loom SDK version */
  loomSDKVersion?: InputMaybe<Scalars['String']['input']>;
  /** Used to segment assignments based on contextual workspace of user */
  selectedWorkspaceId?: InputMaybe<Scalars['Int']['input']>;
  /** Used to segment assignemnts based on slack team ID */
  slackTeamId?: InputMaybe<Scalars['String']['input']>;
};

export type ExtractedMetadata = {
  __typename?: 'ExtractedMetadata';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ExtractedMetadataUnion = ExtractedMetadata | GenericError;

export type FailedFormFields = {
  __typename?: 'FailedFormFields';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FailedToDeleteSlackMessage = {
  __typename?: 'FailedToDeleteSlackMessage';
  error: Scalars['String']['output'];
  messageTimestamp: Scalars['String']['output'];
  slackChannelId: Scalars['String']['output'];
  slackTeamId: Scalars['String']['output'];
};

export type FailedUserOrGroupType = {
  __typename?: 'FailedUserOrGroupType';
  id?: Maybe<Scalars['ID']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['Date']['output'];
  entity_id: Scalars['ID']['output'];
  entity_type: Scalars['String']['output'];
  folder?: Maybe<RegularUserFolder>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  user: RegularUser;
  user_id: Scalars['ID']['output'];
  video?: Maybe<RegularUserVideo>;
};

export type FavoriteEntity = {
  id: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type FcmDataInputType = {
  name: Scalars['String']['input'];
  pushSet?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  web: WebFcmDataInputType;
};

export type FcmDataType = {
  __typename?: 'FcmDataType';
  name?: Maybe<Scalars['String']['output']>;
  pushSet?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  web?: Maybe<WebFcmDataType>;
};

export type Feature = {
  __typename?: 'Feature';
  name?: Maybe<Scalars['String']['output']>;
  team?: Maybe<FeatureTeam>;
};

export type FeatureFlagResponse = {
  __typename?: 'FeatureFlagResponse';
  flag: Scalars['String']['output'];
  resultDetails: FeatureFlagResultDetails;
};

export type FeatureFlagResponseV2 = {
  __typename?: 'FeatureFlagResponseV2';
  flag: Scalars['String']['output'];
  resultDetails: FeatureFlagResultDetailsV2;
};

export type FeatureFlagResponseV3 = {
  __typename?: 'FeatureFlagResponseV3';
  controlType: Scalars['String']['output'];
  flag: Scalars['String']['output'];
  resultDetails: FeatureFlagResultDetailsV2;
};

export type FeatureFlagResultDetails = {
  __typename?: 'FeatureFlagResultDetails';
  result: Scalars['String']['output'];
};

export type FeatureFlagResultDetailsV2 = {
  __typename?: 'FeatureFlagResultDetailsV2';
  result: Scalars['BasicScalar']['output'];
};

export type FeatureFlags = {
  __typename?: 'FeatureFlags';
  /**
   *
   *         PLEASE DON'T USE. We should implement a better way to fetch those feature flags
   *
   */
  featureFlags?: Maybe<Scalars['JSON']['output']>;
};

export type FeatureTeam = {
  __typename?: 'FeatureTeam';
  githubTeamName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  primarySlackChannelId?: Maybe<Scalars['String']['output']>;
};

export type FetchApiKeysUnion = GenericError | SdkApiKeys;

export type FetchAutoCommentDisplayControlsResponse = CreatorExperiencePayload | GenericError | InputValidationError | NoAutoCommentControlsFoundPayload | UserNotAuthorizedError;

export type FetchGettingStartedChecklistResponse = GenericError | GettingStartedChecklistPayload | UserNotAuthorizedError;

export type FetchInvitationCapabilitiesPayload = {
  __typename?: 'FetchInvitationCapabilitiesPayload';
  domains?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  inviteFlow: InviteFlow;
  inviteSetting: InviteSetting;
};

export type FetchInvitationCapabilitiesResponse = FetchInvitationCapabilitiesPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type FetchLiveTranscriptResponse = GenericError | LiveTranscript | LiveTranscriptNotReady | UserNotAuthorizedError;

export type FetchOrganizationMemberInfoForInviteLinkResponse = GenericError | OrganizationMemberInfoPayload;

export type FetchPreviewInvoiceResponse = {
  __typename?: 'FetchPreviewInvoiceResponse';
  pendingInvoiceItemsJSON?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  previewInvoiceJSON?: Maybe<Scalars['JSON']['output']>;
};

export type FetchRequestVideoAccessFlowPayload = {
  __typename?: 'FetchRequestVideoAccessFlowPayload';
  redirectUriForFlow?: Maybe<Scalars['String']['output']>;
  requestVideoAccessFlow: RequestVideoAccessFlow;
};

export type FetchRequestVideoAccessFlowResponse = FetchRequestVideoAccessFlowPayload | GenericError;

export type FetchTimestampedWordsResponse = GenericError | InvalidRequestWarning | TimestampedWordsPayload | UserNotAuthorizedError;

export type FetchVideoChaptersResponse = EmptyChaptersPayload | GenericError | InvalidRequestWarning | VideoChapters;

export type FetchVideoNudgesResponse = GenericError | NudgesPayload;

export type FetchVideoPinnedStatusForWorkspacePayload = {
  __typename?: 'FetchVideoPinnedStatusForWorkspacePayload';
  pinned?: Maybe<Scalars['Boolean']['output']>;
};

export type FetchVideoPinnedStatusForWorkspaceResponse = FetchVideoPinnedStatusForWorkspacePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type FetchVideosByIdPayload = {
  __typename?: 'FetchVideosByIdPayload';
  videos?: Maybe<Array<Maybe<RegularUserVideo>>>;
};

export type FetchVideosByIdResponse = FetchVideosByIdPayload | GenericError;

export enum FillerWordRemoval {
  None = 'none',
  Text = 'text',
  TextAudio = 'text_audio'
}

export type FinalizeCheckoutPayload = {
  __typename?: 'FinalizeCheckoutPayload';
  clientSecret: Scalars['String']['output'];
  intentId: Scalars['String']['output'];
  subscriptionId: Scalars['ID']['output'];
};

export type FinalizeCheckoutResponse = FinalizeCheckoutPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type FindUsersInDomainPayload = {
  __typename?: 'FindUsersInDomainPayload';
  memberships?: Maybe<Array<Maybe<OrganizationMember>>>;
  users?: Maybe<Array<Maybe<RegularUser>>>;
};

export type FlagAssignmentResponse = {
  __typename?: 'FlagAssignmentResponse';
  /** The flag assignment result which can be a string, boolean, number, object, or null */
  result?: Maybe<Scalars['BasicScalar']['output']>;
};

export type FlagAssignmentType = {
  __typename?: 'FlagAssignmentType';
  flagAssignmentValue: Scalars['String']['output'];
  flagName: Scalars['String']['output'];
};

export enum FolderAccessLevel {
  Read = 'read',
  Readwrite = 'readwrite'
}

export type FolderAclEntry = {
  access?: Maybe<FolderAccessLevel>;
};

/** The ACL entries for a folder */
export type FolderAclEntrySet = {
  __typename?: 'FolderAclEntrySet';
  /** The group ACL entries */
  groupEntries: Array<Maybe<GroupFolderAclEntry>>;
  /** The space ACL entry (a folder can have at most one entry) */
  spaceEntry?: Maybe<SpaceFolderAclEntry>;
  /** The user ACL entries */
  userEntries: Array<Maybe<UserFolderAclEntry>>;
};

export enum FolderSource {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Public = 'PUBLIC',
  Space = 'SPACE'
}

export enum FolderVisibilityType {
  Owner = 'owner',
  Workspace = 'workspace'
}

export type FormattedUserConnections = {
  __typename?: 'FormattedUserConnections';
  autoPublishToPrimarySpaceSetting?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  externalOrganizationId?: Maybe<Scalars['String']['output']>;
  externalUserId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  integrationSubscriptionId?: Maybe<Scalars['ID']['output']>;
  integrationSubscriptionStatus?: Maybe<Scalars['String']['output']>;
  notificationSettings?: Maybe<SlackNotificationSettings>;
  organizationId?: Maybe<Scalars['String']['output']>;
  slackTeamName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type GcmDatType = {
  __typename?: 'GcmDatType';
  androidId?: Maybe<Scalars['String']['output']>;
  appId?: Maybe<Scalars['String']['output']>;
  securityToken?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type GcmDataInputType = {
  androidId: Scalars['String']['input'];
  appId: Scalars['String']['input'];
  securityToken: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type GenerateDnsToken = {
  __typename?: 'GenerateDnsToken';
  generateDnsToken: Scalars['String']['output'];
};

export type GenerateDnsVerificationTokenResponse = GenerateDnsToken | GenericError | UserNotAuthorizedError | UserNotLoggedInError;

export type GenerateSpeechFromTextPayload = {
  __typename?: 'GenerateSpeechFromTextPayload';
  audioData?: Maybe<Scalars['String']['output']>;
};

export type GenerateSpeechFromTextResponse = GenerateSpeechFromTextPayload | GenericError | UserNotAuthorizedError;

export type GenerateSupportChatMessagesPayload = {
  __typename?: 'GenerateSupportChatMessagesPayload';
  messages: Array<SupportChatMessage>;
};

export type GenerateSupportChatMessagesResponse = GenerateSupportChatMessagesPayload | GenericError | UserNotAuthorizedError;

export type GenerateTtsVideosPayload = {
  __typename?: 'GenerateTtsVideosPayload';
  folder?: Maybe<RegularUserFolder>;
};

export type GenerateTtsVideosResponse = GenerateTtsVideosPayload | GenericError | UserNotAuthorizedError;

export type GenerateVideoForDraftPayload = {
  __typename?: 'GenerateVideoForDraftPayload';
  success: Scalars['Boolean']['output'];
};

export type GenerateVideoForDraftResponse = GenerateVideoForDraftPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export enum GenerateVideoSourceType {
  HtmlUploadId = 'HTML_UPLOAD_ID',
  ScrapableUrl = 'SCRAPABLE_URL'
}

export type GenerateVoiceAudioPreviewInput = {
  actorId: Scalars['ID']['input'];
  script: Scalars['String']['input'];
};

export type GenerateVoiceAudioPreviewPayload = {
  __typename?: 'GenerateVoiceAudioPreviewPayload';
  audioUrl?: Maybe<Scalars['String']['output']>;
};

export type GenerateVoiceAudioPreviewResponse = GenerateVoiceAudioPreviewPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type GeneratedCategory = {
  __typename?: 'GeneratedCategory';
  /** The assigned category by the LLM */
  assignedCategory: Scalars['String']['output'];
  /** The confidence score of the categorization */
  confidence: Scalars['Float']['output'];
};

export type GeneratedIssuePayload = {
  __typename?: 'GeneratedIssuePayload';
  /** The body of the issue from the LLM completion */
  body?: Maybe<Scalars['String']['output']>;
  /** Whether this is new content, saved content, or regenerated content */
  generationSource?: Maybe<GenerationSource>;
  /** The issue title from the LLM completion */
  title?: Maybe<Scalars['String']['output']>;
};

export type GeneratedIssueResponse = GeneratedIssuePayload | GenericError | InputValidationError | InvalidRequestWarning | RateLimitReachedError | UserNotAuthorizedError;

export type GeneratedJiraIssuePayload = {
  __typename?: 'GeneratedJiraIssuePayload';
  /** The body of the Jira issue from the LLM completion */
  body?: Maybe<Scalars['String']['output']>;
  /** Whether the user needs to authenticate with Atlassian or not before proceeding */
  needsAtlassianAuth?: Maybe<Scalars['Boolean']['output']>;
  /** The Jira issue title from the LLM completion */
  title?: Maybe<Scalars['String']['output']>;
};

export type GeneratedJiraIssueResponse = GeneratedJiraIssuePayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type GeneratedLinearIssuePayload = {
  __typename?: 'GeneratedLinearIssuePayload';
  /** The Linear issue description from the LLM completion */
  body?: Maybe<Scalars['String']['output']>;
  /** Whether the user needs to authenticate with Linear or not before proceeding */
  needsLinearAuth?: Maybe<Scalars['Boolean']['output']>;
  /** The Linear issue title from the LLM completion */
  title?: Maybe<Scalars['String']['output']>;
};

export type GeneratedLinearIssueResponse = GeneratedLinearIssuePayload | GenericError | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type GeneratedLoomCategorizationPayload = {
  __typename?: 'GeneratedLoomCategorizationPayload';
  /** The category identified by the LLM */
  generatedCategory: GeneratedCategory;
};

export type GeneratedLoomCategorizationResponse = GeneratedLoomCategorizationPayload | GenericError | InputValidationError | InvalidRequestWarning | RateLimitReachedError | UserNotAuthorizedError;

export type GeneratedShareMessagePayload = {
  __typename?: 'GeneratedShareMessagePayload';
  /** Whether this is new content, saved content, or regenerated content */
  generationSource?: Maybe<GenerationSource>;
  /** A shareable message that includes a link to the loom and brief context */
  markdownContent?: Maybe<Scalars['String']['output']>;
};

export type GeneratedShareMessageResponse = GeneratedShareMessagePayload | GenericError | InputValidationError | InvalidRequestWarning | RateLimitReachedError | UserNotAuthorizedError;

export type GeneratedSummaryForViewersPayload = {
  __typename?: 'GeneratedSummaryForViewersPayload';
  /** A short summary to be used by viewers */
  generatedText?: Maybe<Scalars['String']['output']>;
};

export type GeneratedSummaryForViewersResponse = GeneratedSummaryForViewersPayload | GenericError | InvalidRequestWarning | RateLimitReachedError | UserNotAuthorizedError;

export type GeneratedVideoDraft = {
  __typename?: 'GeneratedVideoDraft';
  actorId?: Maybe<Scalars['String']['output']>;
  background: DraftBackground;
  id: Scalars['ID']['output'];
  latestGeneratedVideoId?: Maybe<Scalars['ID']['output']>;
  mediaGenerationPercentComplete?: Maybe<Scalars['Int']['output']>;
  scenes: Array<DraftScene>;
  status: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type GeneratedVideoImageOverlay = {
  __typename?: 'GeneratedVideoImageOverlay';
  id: Scalars['ID']['output'];
  imageCornerRadius?: Maybe<Scalars['Float']['output']>;
  imageOffsetX: Scalars['Float']['output'];
  imageOffsetY: Scalars['Float']['output'];
  imageShadowBlurRadius?: Maybe<Scalars['Float']['output']>;
  imageShadowColor?: Maybe<Scalars['String']['output']>;
  imageShadowOffsetX?: Maybe<Scalars['Float']['output']>;
  imageShadowOffsetY?: Maybe<Scalars['Float']['output']>;
  imageShadowOpacity?: Maybe<Scalars['Float']['output']>;
  imageSizeX: Scalars['Float']['output'];
  imageSizeY: Scalars['Float']['output'];
  section?: Maybe<Scalars['String']['output']>;
  srcUrl: Scalars['String']['output'];
  zIndex: Scalars['Int']['output'];
};

export type GeneratedVideoQuestionPayload = {
  __typename?: 'GeneratedVideoQuestionPayload';
  /** The question from the LLM completion */
  question?: Maybe<Scalars['String']['output']>;
};

export type GeneratedVideoQuestionResponse = GeneratedVideoQuestionPayload | GenericError | InvalidRequestWarning;

export type GeneratedVideoTextOverlay = {
  __typename?: 'GeneratedVideoTextOverlay';
  boxBackgroundColor?: Maybe<Scalars['String']['output']>;
  boxBackgroundCornerRadius?: Maybe<Scalars['Float']['output']>;
  boxShadowBlurRadius?: Maybe<Scalars['Float']['output']>;
  boxShadowColor?: Maybe<Scalars['String']['output']>;
  boxShadowOffsetX?: Maybe<Scalars['Float']['output']>;
  boxShadowOffsetY?: Maybe<Scalars['Float']['output']>;
  boxShadowOpacity?: Maybe<Scalars['Float']['output']>;
  desiredTextWidth?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  section?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  textAlign: Scalars['String']['output'];
  textColor: Scalars['String']['output'];
  textFontFamily: Scalars['String']['output'];
  textFontSize?: Maybe<Scalars['Float']['output']>;
  textFontStyle?: Maybe<Scalars['String']['output']>;
  textLetterSpacing?: Maybe<Scalars['Float']['output']>;
  textLineHeight: Scalars['Float']['output'];
  textOffsetX: Scalars['Float']['output'];
  textOffsetY: Scalars['Float']['output'];
  textPadding?: Maybe<Scalars['Float']['output']>;
  textShadowBlurRadius?: Maybe<Scalars['Float']['output']>;
  textShadowColor?: Maybe<Scalars['String']['output']>;
  textShadowOffsetX?: Maybe<Scalars['Float']['output']>;
  textShadowOffsetY?: Maybe<Scalars['Float']['output']>;
  textShadowOpacity?: Maybe<Scalars['Float']['output']>;
  textSizeX: Scalars['Float']['output'];
  textSizeY: Scalars['Float']['output'];
  textVerticalAlign: Scalars['String']['output'];
  zIndex: Scalars['Int']['output'];
};

export type GeneratedWorkflowContentPayload = {
  __typename?: 'GeneratedWorkflowContentPayload';
  /** the source generation */
  generationSource?: Maybe<GenerationSource>;
  /** The text from the LLM completion along with images formatted in markdown or A shareable message that includes a link to the loom and brief context */
  markdownContent?: Maybe<Scalars['String']['output']>;
  /** Whether the document is currently visible to viewers */
  visibleToViewers?: Maybe<Scalars['Boolean']['output']>;
};

export type GeneratedWorkflowContentResponse = GeneratedWorkflowContentPayload | GenericError | InputValidationError | InvalidRequestWarning | RateLimitReachedError | UserNotAuthorizedError;

export type GeneratedWorkflowDocPayload = {
  __typename?: 'GeneratedWorkflowDocPayload';
  /** Whether this is new content, saved content, or regenerated content */
  generationSource?: Maybe<GenerationSource>;
  /** The text from the LLM completion along with images formatted in markdown */
  markdownContent?: Maybe<Scalars['String']['output']>;
};

export type GeneratedWorkflowDocResponse = GeneratedWorkflowDocPayload | GenericError | InputValidationError | InvalidRequestWarning | RateLimitReachedError | UserNotAuthorizedError;

export enum GenerationSource {
  New = 'new',
  Regenerated = 'regenerated',
  Saved = 'saved'
}

export type GenericError = Error & {
  __typename?: 'GenericError';
  error?: Maybe<Scalars['String']['output']>;
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type GetAggChangePlanUrlPayload = {
  __typename?: 'GetAGGChangePlanUrlPayload';
  isAvailableToUser: Scalars['Boolean']['output'];
  isCollection: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type GetAggChangePlanUrlResponse = AggTokenRefreshError | GenericError | GetAggChangePlanUrlPayload | InputValidationError | UserNotAuthorizedError;

export type GetAggManagementUrlPayload = {
  __typename?: 'GetAGGManagementUrlPayload';
  isAvailableToUser: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type GetAggManagementUrlResponse = AggTokenRefreshError | GenericError | GetAggManagementUrlPayload | InputValidationError | UserNotAuthorizedError;

export type GetAdminGraphInsightsPayloadType = {
  __typename?: 'GetAdminGraphInsightsPayloadType';
  activeUsersGraphInsights?: Maybe<ActiveUsersGraphInsights>;
  topCreatorInsights?: Maybe<TopCreatorInsights>;
  topViewerInsights?: Maybe<TopViewerInsights>;
  videoViewsGraphInsights?: Maybe<VideoViewsGraphInsights>;
};


export type GetAdminGraphInsightsPayloadTypeActiveUsersGraphInsightsArgs = {
  timeDuration: DateType;
  workspaceId: Scalars['ID']['input'];
};


export type GetAdminGraphInsightsPayloadTypeTopCreatorInsightsArgs = {
  timeDuration: DateType;
  topCreatorLimit?: InputMaybe<Scalars['Int']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type GetAdminGraphInsightsPayloadTypeTopViewerInsightsArgs = {
  timeDuration: DateType;
  topViewerLimit?: InputMaybe<Scalars['Int']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type GetAdminGraphInsightsPayloadTypeVideoViewsGraphInsightsArgs = {
  timeDuration: DateType;
  workspaceId: Scalars['ID']['input'];
};

export type GetAdminGraphInsightsResponse = GenericError | GetAdminGraphInsightsPayloadType | InputValidationError | UserNotAuthorizedError;

export type GetAllCommunityLoomsPayload = {
  __typename?: 'GetAllCommunityLoomsPayload';
  videos?: Maybe<RegularUserVideoConnection>;
};


export type GetAllCommunityLoomsPayloadVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetAllCommunityLoomsResponse = GenericError | GetAllCommunityLoomsPayload;

export type GetAllInviteLinksPayload = {
  __typename?: 'GetAllInviteLinksPayload';
  inviteLinks?: Maybe<Array<Maybe<InviteLink>>>;
};

export type GetAllInviteLinksResponse = GenericError | GetAllInviteLinksPayload | InputValidationError | UserNotAuthorizedError;

export type GetAllMeetingsForUserResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetAllMeetingsForUserPayload;

export type GetAllUserPropertiesPayload = {
  __typename?: 'GetAllUserPropertiesPayload';
  properties: Array<PersonProperty>;
};

export type GetAllUserPropertiesResponse = GenericError | GetAllUserPropertiesPayload | InputValidationError | UserNotAuthorizedError;

export type GetAllWorkspaceDeletionTokensPayload = {
  __typename?: 'GetAllWorkspaceDeletionTokensPayload';
  tokens?: Maybe<Array<WorkspaceDeletionToken>>;
};

export type GetAllWorkspaceDeletionTokensResponse = GenericError | GetAllWorkspaceDeletionTokensPayload | UserNotAuthorizedError;

export type GetAllWorkspacesByUserEmailDomainPayload = {
  __typename?: 'GetAllWorkspacesByUserEmailDomainPayload';
  workspaces?: Maybe<Array<Maybe<JoinableWorkspace>>>;
};

export type GetAllWorkspacesByUserEmailDomainResponse = GenericError | GetAllWorkspacesByUserEmailDomainPayload | UserNotAuthorizedError;

export type GetAndMaybeSyncLocalEmailSettingsPayload = {
  __typename?: 'GetAndMaybeSyncLocalEmailSettingsPayload';
  engagement?: Maybe<Scalars['String']['output']>;
  global?: Maybe<Scalars['String']['output']>;
};

export type GetAndMaybeSyncLocalEmailSettingsResponse = GenericError | GetAndMaybeSyncLocalEmailSettingsPayload | UserNotAuthorizedError;

export type GetApplicationUnion = ApplicationPageResult | GenericError;

export type GetAssetPayload = {
  __typename?: 'GetAssetPayload';
  asset: Asset;
};

export type GetAssetResponse = GenericError | GetAssetPayload | UserNotAuthorizedError;

export type GetAssetsForUserPayload = {
  __typename?: 'GetAssetsForUserPayload';
  /** The assets for the user */
  assets: Array<Asset>;
};

export type GetAssetsForUserResponse = GenericError | GetAssetsForUserPayload | UserNotAuthorizedError;

export type GetAtlassianLocalePayload = {
  __typename?: 'GetAtlassianLocalePayload';
  locale: Scalars['String']['output'];
  localeRequiresMarketingOptIn: Scalars['Boolean']['output'];
};

export type GetAtlassianOrganizationIdPayload = {
  __typename?: 'GetAtlassianOrganizationIdPayload';
  atlassianOrganizationId: Scalars['String']['output'];
};

export type GetAtlassianOrganizationIdResponse = GenericError | GetAtlassianOrganizationIdPayload | UserNotAuthorizedError;

export type GetAutoFeatureStatusesResponse = AutoFeatureStatuses | GenericError | InputValidationError | UserNotAuthorizedError;

export type GetAutomationsPayload = {
  __typename?: 'GetAutomationsPayload';
  automations?: Maybe<Array<Automation>>;
};

export type GetAutomationsResponse = GenericError | GetAutomationsPayload;

export type GetBannerInsightsPayload = {
  __typename?: 'GetBannerInsightsPayload';
  insights?: Maybe<Array<Maybe<BannerInsight>>>;
};

export type GetBannerInsightsResponse = GenericError | GetBannerInsightsPayload | InputValidationError | UserNotAuthorizedError;

export type GetBotControlsStateInput = {
  videoMeetingGuid: Scalars['ID']['input'];
};

export type GetCalendlySegmentPayload = {
  __typename?: 'GetCalendlySegmentPayload';
  isInCalendlySegment: Scalars['Boolean']['output'];
};

export type GetCheckoutPricesPayload = {
  __typename?: 'GetCheckoutPricesPayload';
  addon: AddonPrices;
  base: BasePrices;
  businessAi: BusinessAiPrices;
};

export type GetCheckoutPricesResponse = GenericError | GetCheckoutPricesPayload | InputValidationError | UserNotAuthorizedError;

export type GetCheckoutUpcomingInvoiceResponse = GenericError | InputValidationError | UpcomingInvoices | UserNotAuthorizedError;

export type GetChildVideosAndParentVideoInfoFromParentIdPayload = {
  __typename?: 'GetChildVideosAndParentVideoInfoFromParentIdPayload';
  childVideosInfo?: Maybe<Array<Maybe<ChildOrParentVideoInfo>>>;
  parentVideoInfo?: Maybe<ChildOrParentVideoInfo>;
};

export type GetChildVideosAndParentVideoInfoFromParentIdResponse = GenericError | GetChildVideosAndParentVideoInfoFromParentIdPayload | UserNotAuthorizedError;

export type GetChosenMembersCachePayload = {
  __typename?: 'GetChosenMembersCachePayload';
  chosenMembers?: Maybe<Array<Scalars['String']['output']>>;
};

export type GetChosenMembersCacheResponse = GenericError | GetChosenMembersCachePayload | InputValidationError | UserNotAuthorizedError;

export type GetCommunityLoomIdsForEmptyStatesPayload = {
  __typename?: 'GetCommunityLoomIdsForEmptyStatesPayload';
  starterVideos?: Maybe<Array<Maybe<RegularUserVideo>>>;
  watchSortedAndRandomizedIds: Array<Maybe<Scalars['ID']['output']>>;
};

export type GetCommunityLoomIdsForEmptyStatesResponse = GenericError | GetCommunityLoomIdsForEmptyStatesPayload | UserNotAuthorizedError;

export type GetCommunityLoomsForProfilePayload = {
  __typename?: 'GetCommunityLoomsForProfilePayload';
  videos?: Maybe<RegularUserVideoConnection>;
};


export type GetCommunityLoomsForProfilePayloadVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Array<Array<LoomsAnonProfileCollectionFilterType>>>;
  first: Scalars['Int']['input'];
  profileUrl: Scalars['String']['input'];
  sortOrder?: InputMaybe<LoomsSortOrder>;
  sortType?: InputMaybe<LoomsSortType>;
};

export type GetCommunityLoomsForProfileResponse = GenericError | GetCommunityLoomsForProfilePayload;

export type GetCountOfSlackSubscriptionConnectionsForUserPayload = {
  __typename?: 'GetCountOfSlackSubscriptionConnectionsForUserPayload';
  countOfSubscriptions?: Maybe<Scalars['Int']['output']>;
};

export type GetCountOfSlackSubscriptionConnectionsForUserResponse = GenericError | GetCountOfSlackSubscriptionConnectionsForUserPayload | UserNotAuthorizedError;

export type GetCurrencyPayload = {
  __typename?: 'GetCurrencyPayload';
  currency?: Maybe<Scalars['String']['output']>;
};

export type GetCurrencyResponse = GenericError | GetCurrencyPayload | UserNotAuthorizedError;

export type GetCurrentUserPayload = {
  __typename?: 'GetCurrentUserPayload';
  user?: Maybe<RegularUser>;
};

export type GetCurrentUserResponse = GenericError | GetCurrentUserPayload | UserNotLoggedIn;

export type GetCustomBranding = {
  __typename?: 'GetCustomBranding';
  organization?: Maybe<Organization>;
};

export type GetCustomBrandingResponse = GenericError | GetCustomBranding;

export type GetCustomerResponse = GenericError | InputValidationError | LoomCustomer | UserNotAuthorizedError;

export type GetDismissWorkflowSneakpeekResponse = DismissWorkflowSneakpeekProperty | GenericError | UserNotAuthorizedError | VideoNotFoundError;

export type GetDomainsForWorkspacePayload = {
  __typename?: 'GetDomainsForWorkspacePayload';
  domains: Array<WorkspaceDomain>;
};

export type GetDomainsForWorkspaceResponse = GenericError | GetDomainsForWorkspacePayload | InputValidationError | UserNotAuthorizedError;

export type GetDuplicateVideoReplacementsPayload = {
  __typename?: 'GetDuplicateVideoReplacementsPayload';
  duplicateVideos?: Maybe<Array<Maybe<DuplicateVideo>>>;
};

export type GetDuplicateVideoReplacementsResponse = GenericError | GetDuplicateVideoReplacementsPayload | UserNotAuthorizedError;

export type GetEmailDigestInsightsResponse = GenericError | UserNotAuthorizedError | GetEmailDigestInsightsPayloadType;

export type GetEnvVarsPayload = {
  __typename?: 'GetEnvVarsPayload';
  envVars?: Maybe<Scalars['String']['output']>;
};

export type GetEnvVarsResponse = GenericError | GetEnvVarsPayload | UserNotAuthorizedError | UserNotLoggedIn;

export type GetEoyInsightsForHubResponse = GenericError | InputValidationError | UserNotAuthorizedError | EoyTakeoverInsightsPayloadType;

export type GetEoyInsightsFromHashResponse = GenericError | EoyTakeoverInsightsPayloadType;

export type GetExperimentBatchAssignmentsPayload = {
  __typename?: 'GetExperimentBatchAssignmentsPayload';
  userBatchAssignments?: Maybe<Array<Maybe<FlagAssignmentType>>>;
  workspaceBatchAssignments?: Maybe<Array<Maybe<FlagAssignmentType>>>;
};

export type GetExperimentBatchAssignmentsResponse = GenericError | GetExperimentBatchAssignmentsPayload | UserNotAuthorizedError;

export type GetFeatureFlagValueForCustomKeyResponse = FeatureFlagResponseV2 | GenericError;

export type GetFlagAssignmentForUserResponse = FlagAssignmentResponse | GenericError | UserNotAuthorizedError;

export type GetFolderAclEntriesPayload = {
  __typename?: 'GetFolderAclEntriesPayload';
  folderSpecificPermissions?: Maybe<FolderAclEntrySet>;
  parentFolderPermissions?: Maybe<FolderAclEntrySet>;
};

export type GetFolderAclEntriesResponse = GenericError | GetFolderAclEntriesPayload | InputValidationError | UserNotAuthorizedError;

export type GetFollowedByStreamsforProfileResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetFollowedByPayload;

export type GetFollowsStreamsforProfileResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetFollowsPayload;

export type GetGenVideoDraftResponse = {
  __typename?: 'GetGenVideoDraftResponse';
  draft: GeneratedVideoDraft;
};

export type GetGeneratedVideoDraftResult = GenericError | GetGenVideoDraftResponse | InputValidationError | UserNotAuthorizedError;

export type GetGoogleOAuthResponse = GenericError | UserNotAuthorizedError | GetGoogleOauthDetails;

export type GetHasTrimmedFillerWordsPayload = {
  __typename?: 'GetHasTrimmedFillerWordsPayload';
  hasTrimmedFillerWords?: Maybe<Scalars['Boolean']['output']>;
};

export type GetHasTrimmedFillerWordsResponse = GenericError | GetHasTrimmedFillerWordsPayload | InvalidRequestWarning;

export type GetIncentivesForUserResponse = GenericError | GetIncentivesPayloadType | UserNotAuthorizedError;

export type GetIncentivesPayloadType = {
  __typename?: 'GetIncentivesPayloadType';
  incentives?: Maybe<Array<Maybe<IncentivesAndInviteeType>>>;
};

export type GetInsightsValueForTimeframesResponse = GenericError | InputValidationError | InsightsForTimeframes | UserNotAuthorizedError;

export type GetInsightsforHubResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetInsightsforHubPayloadType;

export type GetIntegrationActivePayload = {
  __typename?: 'GetIntegrationActivePayload';
  isActive: Scalars['Boolean']['output'];
};

export type GetIntegrationActiveResponse = GenericError | GetIntegrationActivePayload | InputValidationError | UserNotAuthorizedError;

export type GetIntelligenceStatusPayload = {
  __typename?: 'GetIntelligenceStatusPayload';
  autoChaptersCount?: Maybe<Scalars['Int']['output']>;
  autoChaptersStatus?: Maybe<AutoChapterStatusesType>;
  autoDescriptionStatus?: Maybe<IntelligenceStatusType>;
  autoTasksCount?: Maybe<Scalars['Int']['output']>;
  autoTasksStatus?: Maybe<IntelligenceStatusType>;
  autoTitleStatus?: Maybe<IntelligenceStatusType>;
  hasTrimmedFillerWords: Scalars['Boolean']['output'];
  hasTrimmedSilences: Scalars['Boolean']['output'];
  numberOfFillerWordsTrimmed: Scalars['Int']['output'];
  playableDuration?: Maybe<Scalars['Float']['output']>;
  processingInformation?: Maybe<ProcessingInformation>;
  secondsOfSilenceTrimmed: Scalars['Int']['output'];
};

export type GetIntelligenceStatusResponse = GenericError | GetIntelligenceStatusPayload | InputValidationError | UserNotAuthorizedError;

export type GetInviteLinkPayload = {
  __typename?: 'GetInviteLinkPayload';
  inviteLink?: Maybe<InviteLinkAcceptInfo>;
};

export type GetInviteLinkResponse = GenericError | GetInviteLinkPayload;

export type GetInvoicesPayload = {
  __typename?: 'GetInvoicesPayload';
  /** Invoices from Loom */
  loomInvoices: Array<LoomInvoice>;
  /** Invoices from Stripe */
  stripeInvoices: Array<StripeInvoice>;
};

export type GetInvoicesResponse = GenericError | GetInvoicesPayload | InputValidationError | UserNotAuthorizedError;

export type GetIsInCalendlySegmentResponse = GenericError | GetCalendlySegmentPayload;

export type GetIsVideoPinnedPayload = {
  __typename?: 'GetIsVideoPinnedPayload';
  isPinned: Scalars['Boolean']['output'];
};

export type GetIsVideoPinnedResponse = EntityNotFoundError | GenericError | GetIsVideoPinnedPayload | UserNotAuthorizedError | VideoNotFoundError;

export type GetJiraConnectionForUserPayload = {
  __typename?: 'GetJiraConnectionForUserPayload';
  /** Whether the user has an active Jira OAuth connection */
  hasConnection?: Maybe<Scalars['Boolean']['output']>;
};

export type GetJiraConnectionForUserResponse = GenericError | GetJiraConnectionForUserPayload | UserNotAuthorizedError;

export type GetJoinByOrgInvitePayload = {
  __typename?: 'GetJoinByOrgInvitePayload';
  joinByOrgInvite?: Maybe<Scalars['Boolean']['output']>;
};

export type GetJoinByOrgInviteResponse = GenericError | GetJoinByOrgInvitePayload;

export type GetLastWatchTimePayload = {
  __typename?: 'GetLastWatchTimePayload';
  lastWatchTime?: Maybe<Scalars['Int']['output']>;
};

export type GetLastWatchTimeResponse = GenericError | GetLastWatchTimePayload | UserNotAuthorizedError;

export type GetLinearConnectionForUserPayload = {
  __typename?: 'GetLinearConnectionForUserPayload';
  /** Whether the user has an active Linear OAuth connection */
  hasConnection?: Maybe<Scalars['Boolean']['output']>;
};

export type GetLinearConnectionForUserResponse = GenericError | GetLinearConnectionForUserPayload | UserNotAuthorizedError;

export type GetLinkedAtlassianInfoForUserResponse = GenericError | UserNotAuthorizedError | GetLinkedAtlassianInfoForUserPayload;

export type GetLoomsPayload = {
  __typename?: 'GetLoomsPayload';
  videos?: Maybe<GetLoomsPayloadVideos_Connection>;
};


export type GetLoomsPayloadVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Array<Array<LoomsCollectionFilter>>>;
  first: Scalars['Int']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
  sortGrouping?: InputMaybe<LoomsSortGrouping>;
  sortOrder: LoomsSortOrder;
  sortType: LoomsSortType;
  source: LoomsSource;
  sourceValue?: InputMaybe<Scalars['String']['input']>;
  sourceValues?: InputMaybe<Array<Scalars['String']['input']>>;
  timeRange?: InputMaybe<TimeRange>;
};

export type GetLoomsPayloadVideos_Connection = {
  __typename?: 'GetLoomsPayloadVideos_Connection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<GetLoomsPayloadVideos_Edge>>>;
  /** Flattened list of RegularUserVideo type */
  nodes?: Maybe<Array<Maybe<RegularUserVideo>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type GetLoomsPayloadVideos_Edge = {
  __typename?: 'GetLoomsPayloadVideos_Edge';
  /** The date a loom was added to a grouping specified by the sortGrouping arg */
  addedToGroupingAt?: Maybe<Scalars['Date']['output']>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<RegularUserVideo>;
  /** The sort order of the video in the profile */
  profileSort?: Maybe<Scalars['Float']['output']>;
};

export type GetLoomsResponse = GenericError | GetLoomsPayload | InputValidationError | UserNotAuthorizedError;

export type GetMeetingTakeawaysPayload = {
  __typename?: 'GetMeetingTakeawaysPayload';
  result?: Maybe<MeetingTakeaways>;
};

export type GetMeetingTakeawaysResponse = GenericError | GetMeetingTakeawaysPayload;

export type GetMemberPropertyResponse = GenericError | InputValidationError | PersonProperty | UserNotAuthorizedError;

export type GetMemberPropertyV2Response = GenericError | InputValidationError | PersonProperty | UserNotAuthorizedError;

export type GetMembersForWorkspaceGroupResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetMembersForWorkspaceGroupPayload;

export type GetMostRecentInvoiceInDunningPayload = {
  __typename?: 'GetMostRecentInvoiceInDunningPayload';
  invoice?: Maybe<Invoice>;
};

export type GetMostRecentInvoiceInDunningResponse = GenericError | GetMostRecentInvoiceInDunningPayload | InputValidationError | UserNotAuthorizedError;

export type GetMostRecentlyUsedAssetsPayload = {
  __typename?: 'GetMostRecentlyUsedAssetsPayload';
  assets?: Maybe<GetMostRecentlyUsedAssetsPayloadAssetsConnection>;
};


export type GetMostRecentlyUsedAssetsPayloadAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type GetMostRecentlyUsedAssetsPayloadAssetsConnection = {
  __typename?: 'GetMostRecentlyUsedAssetsPayloadAssetsConnection';
  edges?: Maybe<Array<Maybe<GetMostRecentlyUsedAssetsPayloadAssetsConnectionEdge>>>;
  nodes?: Maybe<Array<Maybe<Asset>>>;
  pageInfo: PageInfo;
};

export type GetMostRecentlyUsedAssetsPayloadAssetsConnectionEdge = {
  __typename?: 'GetMostRecentlyUsedAssetsPayloadAssetsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Asset>;
};

export type GetMostRecentlyUsedAssetsResponse = GenericError | GetMostRecentlyUsedAssetsPayload | UserNotAuthorizedError;

export type GetMyClosedSpaceMembershipsPayload = {
  __typename?: 'GetMyClosedSpaceMembershipsPayload';
  memberships?: Maybe<SpaceMemberConnection>;
};


export type GetMyClosedSpaceMembershipsPayloadMembershipsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetMyClosedSpaceMembershipsResponse = GenericError | GetMyClosedSpaceMembershipsPayload | InputValidationError | UserNotAuthorizedError;

export type GetMySpaceMembershipsPayload = {
  __typename?: 'GetMySpaceMembershipsPayload';
  memberships?: Maybe<SpaceMemberConnection>;
};


export type GetMySpaceMembershipsPayloadMembershipsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetMySpaceMembershipsResponse = GenericError | GetMySpaceMembershipsPayload | InputValidationError | UserNotAuthorizedError;

export type GetMySpacesPayload = {
  __typename?: 'GetMySpacesPayload';
  spaces?: Maybe<SpaceConnection>;
};


export type GetMySpacesPayloadSpacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetMySpacesResponse = GenericError | GetMySpacesPayload | InputValidationError | UserNotAuthorizedError;

/** Get notifications by type for notifications page */
export type GetNotificationsPayload = {
  __typename?: 'GetNotificationsPayload';
  /** Returns true if the user has notifications of any type */
  hasNotifications?: Maybe<Scalars['Boolean']['output']>;
  notifications?: Maybe<NotificationTrayItemConnection>;
};


/** Get notifications by type for notifications page */
export type GetNotificationsPayloadNotificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  notificationType: NotificationQueryType;
};

export type GetOAuthAndUserIdentityProviderForUserResponse = GenericError | GetOAuthAndUserIdentityProvidersForUser | UserNotAuthorizedError;

export type GetOAuthAndUserIdentityProvidersForUser = {
  __typename?: 'GetOAuthAndUserIdentityProvidersForUser';
  /** Users entries in user_identity table */
  identityProviders?: Maybe<Array<UserIdentitieProviderEnum>>;
  /** Users entries in user_identity table */
  oAuthMediums?: Maybe<Array<UserIdentitieProviderEnum>>;
};

export type GetOpenSpacesPayload = {
  __typename?: 'GetOpenSpacesPayload';
  spaces?: Maybe<SpaceConnection>;
};


export type GetOpenSpacesPayloadSpacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetOpenSpacesResponse = GenericError | GetOpenSpacesPayload | InputValidationError | UserNotAuthorizedError;

export type GetOrganizationAdminsResponse = GenericError | OrgAdmins | UserNotAuthorizedError;

export type GetPaginatedStripeInvoicesPayload = {
  __typename?: 'GetPaginatedStripeInvoicesPayload';
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** Response with Invoices from Stripe and cursor */
  invoices: Array<StripeInvoice>;
};

export type GetPaginatedStripeInvoicesResponse = GenericError | GetPaginatedStripeInvoicesPayload | InputValidationError | UserNotAuthorizedError;

export type GetParentFoldersPayload = {
  __typename?: 'GetParentFoldersPayload';
  currentFolder?: Maybe<RegularUserFolder>;
  parentFolders?: Maybe<Array<Maybe<RegularUserFolder>>>;
};

export type GetParentFoldersResponse = GenericError | GetParentFoldersPayload | UserNotAuthorizedError;

export type GetPaymentIntentClientSecretPayload = {
  __typename?: 'GetPaymentIntentClientSecretPayload';
  clientSecret?: Maybe<Scalars['String']['output']>;
};

export type GetPaymentIntentClientSecretResponse = GenericError | GetPaymentIntentClientSecretPayload | InputValidationError | UserNotAuthorizedError;

export type GetPaymentIntentRequiresActionPayload = {
  __typename?: 'GetPaymentIntentRequiresActionPayload';
  status?: Maybe<Scalars['String']['output']>;
};

export type GetPaymentIntentRequiresActionResponse = GenericError | GetPaymentIntentRequiresActionPayload | InputValidationError | UserNotAuthorizedError;

export type GetPaymentMethodOnFileResponse = GenericError | InputValidationError | StripePaymentMethod | UserNotAuthorizedError;

export type GetPendingWorkspaceInvitesForUserPayload = {
  __typename?: 'GetPendingWorkspaceInvitesForUserPayload';
  pendingInvites?: Maybe<Array<Maybe<OrganizationInvitation>>>;
};

export type GetPendingWorkspaceInvitesForUserResponse = GenericError | GetPendingWorkspaceInvitesForUserPayload | UserNotAuthorizedError;

export type GetPersonalizedVideoReplacementsPayload = {
  __typename?: 'GetPersonalizedVideoReplacementsPayload';
  replacementInfo?: Maybe<Array<Maybe<ReplacementInfo>>>;
};

export type GetPersonalizedVideoReplacementsResponse = GenericError | GetPersonalizedVideoReplacementsPayload | UserNotAuthorizedError;

export type GetPnpAssignmentsForUserResponse = GenericError | PnpAssignmentResponse | UserNotAuthorizedError;

export type GetPnpUpdatesForWorkspaceResponse = GenericError | PnpUpdatesResponse | UserNotAuthorizedError;

export type GetPrebucketedFeatureFlagsResponse = GenericError | UserNotAuthorizedError | GetPrebucketedFeatureFlagsPayload;

export type GetPreviewForReplacementsPayload = {
  __typename?: 'GetPreviewForReplacementsPayload';
  avServerSource: CloudfrontSignedUrlPayload;
};

export type GetPreviewForReplacementsResponse = GenericError | GetPreviewForReplacementsPayload | UserNotAuthorizedError;

export type GetPrimaryAuthTypeForEmailResponse = GenericError | GetPrimaryAuthTypePayload;

export type GetPrimaryAuthTypePayload = {
  __typename?: 'GetPrimaryAuthTypePayload';
  authType: Scalars['String']['output'];
  redirectUri?: Maybe<Scalars['String']['output']>;
};

export type GetPrimarySpacePayload = {
  __typename?: 'GetPrimarySpacePayload';
  space?: Maybe<Space>;
};

export type GetPrimarySpaceResponse = GenericError | GetPrimarySpacePayload | InputValidationError | UserNotAuthorizedError;

export type GetPublicFolderLoomsPayload = {
  __typename?: 'GetPublicFolderLoomsPayload';
  videos?: Maybe<RegularUserVideoConnection>;
};


export type GetPublicFolderLoomsPayloadVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  folderId: Scalars['String']['input'];
};

export type GetPublicFolderLoomsResponse = GenericError | GetPublicFolderLoomsPayload | UserNotAuthorizedError;

export type GetPublishedFoldersPayload = {
  __typename?: 'GetPublishedFoldersPayload';
  folders?: Maybe<RegularUserFolderConnection>;
};


export type GetPublishedFoldersPayloadFoldersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Array<LoomsCollectionFilter>>;
  first: Scalars['Int']['input'];
  parentFolderId?: InputMaybe<Scalars['String']['input']>;
  sortOrder: LoomsSortOrder;
  sortType: LoomsSortType;
  source: FolderSource;
  sourceValue?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type GetPublishedFoldersResponse = GenericError | GetPublishedFoldersPayload;

export type GetQuantitySmartSyncStoreResponse = GenericError | QuantitySmartSyncStorePayload | UserNotAuthorizedError;

export type GetRankedSmartInvitesPayload = {
  __typename?: 'GetRankedSmartInvitesPayload';
  invites?: Maybe<Array<SmartInvite>>;
};

export type GetRankedSmartInvitesResponse = GenericError | GetRankedSmartInvitesPayload | UserNotLoggedIn;

export type GetReceiptUrlPayload = {
  __typename?: 'GetReceiptUrlPayload';
  receiptUrl?: Maybe<Scalars['String']['output']>;
};

export type GetReceiptUrlResponse = GenericError | GetReceiptUrlPayload | InputValidationError | UserNotAuthorizedError;

export type GetRecordedInLast30DaysResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetRecordedInLast30DaysPayloadType;

export type GetReferralLinkUrlPayloadType = {
  __typename?: 'GetReferralLinkUrlPayloadType';
  enabled?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  referral_link_url?: Maybe<Scalars['String']['output']>;
};

export type GetReferralLinkUrlResponse = GenericError | GetReferralLinkUrlPayloadType | InputValidationError | UserNotAuthorizedError;

export type GetResumeSubscriptionInvoiceProjectionPayload = {
  __typename?: 'GetResumeSubscriptionInvoiceProjectionPayload';
  currency: Scalars['String']['output'];
  defaultPaymentLast4?: Maybe<Scalars['String']['output']>;
  interval: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GetResumeSubscriptionInvoiceProjectionResponse = GenericError | GetResumeSubscriptionInvoiceProjectionPayload | InputValidationError | UserNotAuthorizedError;

export type GetScreenshotAutoFeatureStatusesResponse = EntityNotFoundError | GenericError | ScreenshotAutoFeatureStatuses | UserNotAuthorizedError;

export type GetScreenshotsPayload = {
  __typename?: 'GetScreenshotsPayload';
  screenshots?: Maybe<ScreenshotConnection>;
};


export type GetScreenshotsPayloadScreenshotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  source?: InputMaybe<ScreenshotSource>;
};

export type GetScreenshotsResponse = GenericError | GetScreenshotsPayload | InputValidationError | UserNotAuthorizedError;

export type GetSecondaryTagsPayload = {
  __typename?: 'GetSecondaryTagsPayload';
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type GetSecondaryTagsResponse = GenericError | GetSecondaryTagsPayload | InputValidationError | UserNotAuthorizedError;

export type GetSessionSyncTokenPayload = {
  __typename?: 'GetSessionSyncTokenPayload';
  token: Scalars['String']['output'];
};

export type GetSessionSyncTokenResponse = AcknowledgedSessionSyncTokenError | GenericError | GetSessionSyncTokenPayload | UserNotAuthorizedError;

export type GetSharingRecommendationsPayload = {
  __typename?: 'GetSharingRecommendationsPayload';
  recommendations?: Maybe<RecommendationsTypeConnection>;
  /** Returns number of recommendations the user has stored */
  totalRecommendations?: Maybe<Scalars['Int']['output']>;
};


export type GetSharingRecommendationsPayloadRecommendationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetSharingRecommendationsResponse = GenericError | GetSharingRecommendationsPayload | InputValidationError | UserNotAuthorizedError;

export type GetSlackBacklinkPreviewInfoPayload = {
  __typename?: 'GetSlackBacklinkPreviewInfoPayload';
  connectUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isChannelMissingOrPrivate?: Maybe<Scalars['Boolean']['output']>;
  isUserConnectedToGivenSlackTeam: Scalars['Boolean']['output'];
  slackChannelName?: Maybe<Scalars['String']['output']>;
  slackTeamId: Scalars['String']['output'];
};

export type GetSlackBacklinkPreviewInfoResponse = GenericError | GetSlackBacklinkPreviewInfoPayload | UserNotAuthorizedError;

export type GetSpaceMembersPayload = {
  __typename?: 'GetSpaceMembersPayload';
  members?: Maybe<SpaceMemberConnection>;
};


export type GetSpaceMembersPayloadMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  spaceId: Scalars['ID']['input'];
};

export type GetSpaceMembersResponse = EntityNotFoundError | GenericError | GetSpaceMembersPayload | InputValidationError | UserNotAuthorizedError;

export type GetSpacePayload = {
  __typename?: 'GetSpacePayload';
  space?: Maybe<Space>;
};

export type GetSpaceResponse = EntityNotFoundError | GenericError | GetSpacePayload | InputValidationError | UserNotAuthorizedError;

export type GetStorageIncentivesTotalPayload = {
  __typename?: 'GetStorageIncentivesTotalPayload';
  invitees?: Maybe<Array<Maybe<IncentiveType>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type GetSuggestedStreamsResponse = GenericError | InputValidationError | SuggestedStreamsResponse | UserNotAuthorizedError;

export type GetSuggestedTagsPayload = {
  __typename?: 'GetSuggestedTagsPayload';
  recentlyUsedTags?: Maybe<Array<Maybe<Tag>>>;
  topUsedTags?: Maybe<Array<Maybe<Tag>>>;
};

export type GetSuggestedTagsResponse = GenericError | GetSuggestedTagsPayload | InputValidationError | UserNotAuthorizedError;

export type GetSuggestedWorkspaceForCurrentUserResponse = GenericError | JoinableWorkspace | UserNotAuthorizedError;

export type GetTagsByVideoIdPayload = {
  __typename?: 'GetTagsByVideoIdPayload';
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type GetTagsByVideoIdResponse = GenericError | GetTagsByVideoIdPayload | InputValidationError | UserNotAuthorizedError;

export type GetTestClockResponse = GenericError | UserNotAuthorizedError | GetTestClockPlayload;

export type GetTopWorkspaceByUserEmailDomainResponse = GenericError | JoinableWorkspace | UserNotAuthorizedError;

export type GetTotalVideosCountByUserResponse = GenericError | TotalVideosCountByUserPayload | UserNotAuthorizedError;

export type GetTranscriptCorrectionsPayload = {
  __typename?: 'GetTranscriptCorrectionsPayload';
  /** All the transcript corrections across all clips from the video. */
  corrections: Array<TranscriptCorrectionType>;
};

export type GetTranscriptCorrectionsResponse = GenericError | GetTranscriptCorrectionsPayload | InvalidRequestWarning | UserNotAuthorizedError;

export type GetTranscriptForNotificationPayload = {
  __typename?: 'GetTranscriptForNotificationPayload';
  nextTranscript?: Maybe<TranscriptChunk>;
  transcript?: Maybe<TranscriptChunk>;
};

export type GetTranscriptForNotificationResponse = GenericError | GetTranscriptForNotificationPayload | UserNotAuthorizedError;

export type GetUnsyncedRecordingsResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetUnsyncedRecordingsPayload;

export type GetUpcomingInvoiceResponse = GenericError | InputValidationError | UpcomingInvoicePayload | UserNotAuthorizedError;

export type GetUpgradeWorkspaceRequestStatusPayload = {
  __typename?: 'GetUpgradeWorkspaceRequestStatusPayload';
  status?: Maybe<RequestToUpgradeWorkspaceStatusType>;
};

export type GetUpgradeWorkspaceRequestStatusResponse = GenericError | GetUpgradeWorkspaceRequestStatusPayload | InputValidationError | UserNotAuthorizedError;

export type GetUserByIdResponse = CommunityUserPayload | GenericError | RegularUserPayload;

export type GetUserByProfileIdResponse = CommunityUserPayload | GenericError | RegularUserPayload;

export type GetUserEmailNotificationPreferencePayload = {
  __typename?: 'GetUserEmailNotificationPreferencePayload';
  consentSubscription?: Maybe<Scalars['Boolean']['output']>;
};

export type GetUserEmailNotificationPreferenceResponse = GenericError | GetUserEmailNotificationPreferencePayload | UserNotAuthorizedError;

export type GetUserFollowedStreamsResponse = GenericError | InputValidationError | UserFollowedStream | UserNotAuthorizedError;

export type GetUserFollowsCountResponse = GenericError | UserNotAuthorizedError | FollowsCount;

export type GetUserFollowsProfileResponse = GenericError | InputValidationError | UserFollowsStream | UserNotAuthorizedError;

export type GetUserFollowsTagResponse = GenericError | InputValidationError | UserFollowsStream | UserNotAuthorizedError;

export type GetUserFollowsVideoResponse = GenericError | UserFollowsStream | UserNotAuthorizedError;

export type GetUserFromProfileUrlResponse = GenericError | UserFromProfileUrl;

export type GetUserHasAccessToPersonalizedAudioPayload = {
  __typename?: 'GetUserHasAccessToPersonalizedAudioPayload';
  hasAccess?: Maybe<Scalars['Boolean']['output']>;
};

export type GetUserHasAccessToPersonalizedAudioResponse = GenericError | GetUserHasAccessToPersonalizedAudioPayload | UserNotAuthorizedError;

export type GetUserIdFromEmailPayload = {
  __typename?: 'GetUserIdFromEmailPayload';
  id?: Maybe<Scalars['String']['output']>;
};

export type GetUserIdFromEmailResponse = GenericError | GetUserIdFromEmailPayload;

export type GetUserIdFromProfileUrlResponse = GenericError | UserIdFromProfileUrlPayload | UserNotAuthorizedError;

export type GetUserLookoupPayload = {
  __typename?: 'GetUserLookoupPayload';
  user?: Maybe<RegularUser>;
};

export type GetUserLookupResponse = GenericError | GetUserLookoupPayload | UserNotAuthorizedError;

export type GetUserProfilePropertiesResponse = GenericError | InputValidationError | PersonProperty | UserNotAuthorizedError;

export type GetUserPropertiesForGmoiExplicitRefetchResponse = GenericError | GetUserPropertiesGmoiExplicitRefetch | UserNotAuthorizedError;

export type GetUserPropertiesGmoiExplicitRefetch = {
  __typename?: 'GetUserPropertiesGmoiExplicitRefetch';
  consentGranted?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localeRequiresMarketingCommunicationOptIn?: Maybe<Scalars['Boolean']['output']>;
  refetch?: Maybe<Scalars['Boolean']['output']>;
};

export type GetUserPropertyResponse = GenericError | InputValidationError | PersonProperty | UserNotAuthorizedError;

export type GetUserUgcDataUseSettingsPayload = {
  __typename?: 'GetUserUgcDataUseSettingsPayload';
  includeFaceAndVoiceData?: Maybe<Scalars['Boolean']['output']>;
};

export type GetUserUgcDataUseSettingsResponse = GenericError | GetUserUgcDataUseSettingsPayload | UserNotAuthorizedError;

export type GetUserVideoSettingsResponse = GenericError | UserVideoSettingsPayload;

export type GetUserWatchLaterListCountResponse = GenericError | InputValidationError | UserNotAuthorizedError | WatchLaterListVideoCount;

export type GetUserWorkspaceFromNotificationIdResponse = GenericError | InputValidationError | UserNotAuthorizedError | WorkspaceIdPayload;

export type GetVideoAclEntriesPayload = {
  __typename?: 'GetVideoAclEntriesPayload';
  entrySet?: Maybe<VideoAclEntrySet>;
};

export type GetVideoAclEntriesResponse = GenericError | GetVideoAclEntriesPayload | UserNotAuthorizedError;

export type GetVideoAutoGenInfoPayload = {
  __typename?: 'GetVideoAutoGenInfoPayload';
  draftId?: Maybe<Scalars['ID']['output']>;
  isAutoGenerated: Scalars['Boolean']['output'];
};

export type GetVideoAutoGenInfoResult = GenericError | GetVideoAutoGenInfoPayload | InputValidationError | UserNotAuthorizedError;

export type GetVideoBacklinksPayload = {
  __typename?: 'GetVideoBacklinksPayload';
  backlinks: Array<Backlink>;
};

export type GetVideoBacklinksResponse = GenericError | GetVideoBacklinksPayload | UserNotAuthorizedError;

export type GetVideoEditPreviewPayload = {
  __typename?: 'GetVideoEditPreviewPayload';
  avServerSource: CloudfrontSignedUrlPayload;
};

export type GetVideoEditPreviewResponse = GenericError | GetVideoEditPreviewPayload | UserNotAuthorizedError;

export type GetVideoPropertyResponse = GenericError | UserNotAuthorizedError | VideoProperty;

/** Returns object containing the status of a video recovery. */
export type GetVideoRecoveryStatusPayload = {
  __typename?: 'GetVideoRecoveryStatusPayload';
  complete?: Maybe<Scalars['Boolean']['output']>;
  externalUpload?: Maybe<Scalars['Boolean']['output']>;
  manifestName?: Maybe<Scalars['String']['output']>;
  manifestSegmentsSkipped?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  missingParts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  recordingVersion?: Maybe<Scalars['String']['output']>;
  recoverStatus?: Maybe<Scalars['String']['output']>;
  videoId: Scalars['String']['output'];
  videoParts?: Maybe<Scalars['Int']['output']>;
};

export type GetVideoRecoveryStatusResponse = GenericError | GetVideoRecoveryStatusPayload | UserNotAuthorizedError | UserNotLoggedInError | VideoNotFoundError;

export type GetVideoResponse = PrivateVideo | RegularUserVideo | VideoPasswordMissingOrIncorrect;

export type GetVideoSuggestionResponse = GenericError | VideoSuggestionPayload;

export type GetVideoTasksPayload = {
  __typename?: 'GetVideoTasksPayload';
  tasks: Array<VideoTask>;
};

export type GetVideoTasksResponse = GenericError | GetVideoTasksPayload | InputValidationError | InvalidRequestWarning | UserNotAuthorizedError;

export type GetVideoTranscodeStatus = {
  __typename?: 'GetVideoTranscodeStatus';
  error?: Maybe<Scalars['String']['output']>;
  jobStatus: Scalars['String']['output'];
  jobType: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
};

export type GetVideoTranscriptionLanguagePayload = {
  __typename?: 'GetVideoTranscriptionLanguagePayload';
  language: VideoLanguage;
};

export type GetVideoTranscriptionLanguageResponse = GenericError | GetVideoTranscriptionLanguagePayload | InvalidRequestWarning | UserNotAuthorizedError;

export type GetVideosForPartnerSession = {
  __typename?: 'GetVideosForPartnerSession';
  videoIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type GetVideosForPartnerSessionUnion = GenericError | GetVideosForPartnerSession;

export type GetVisibleTotalForTagPayload = {
  __typename?: 'GetVisibleTotalForTagPayload';
  total?: Maybe<Scalars['Int']['output']>;
};

export type GetVisibleTotalForTagResponse = GenericError | GetVisibleTotalForTagPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkOsAdminPortalLinkResponse = AdminPortalLinkPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type GetWorkosUser = {
  __typename?: 'GetWorkosUser';
  email: Scalars['String']['output'];
  loomUserId: Scalars['String']['output'];
  workosUserId: Scalars['String']['output'];
};

export type GetWorkosUserQueryFailure = {
  __typename?: 'GetWorkosUserQueryFailure';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type GetWorkspaceAggEntitlementsPayload = {
  __typename?: 'GetWorkspaceAGGEntitlementsPayload';
  entitlements: Array<Maybe<Entitlement>>;
};

export type GetWorkspaceAggEntitlementsResponse = AggTokenRefreshError | GenericError | GetWorkspaceAggEntitlementsPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkspaceAggGrantPayload = {
  __typename?: 'GetWorkspaceAGGGrantPayload';
  grant: Grant;
};

export type GetWorkspaceAggGrantResponse = AggTokenRefreshError | GenericError | GetWorkspaceAggGrantPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkspaceAggOrgIdPayload = {
  __typename?: 'GetWorkspaceAGGOrgIdPayload';
  atlassianOrgId: Scalars['String']['output'];
};

export type GetWorkspaceAggOrgIdResponse = AggTokenRefreshError | GenericError | GetWorkspaceAggOrgIdPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkspaceAddOnsPayload = {
  __typename?: 'GetWorkspaceAddOnsPayload';
  /** List of workspace subscribed add-ons */
  addOns: Array<Maybe<Scalars['String']['output']>>;
  /** Workspace ID */
  id?: Maybe<Scalars['Int']['output']>;
  idv2?: Maybe<Scalars['ID']['output']>;
};

export type GetWorkspaceAddOnsResponse = GenericError | GetWorkspaceAddOnsPayload | UserNotAuthorizedError;

export type GetWorkspaceArchivedSpacesPayload = {
  __typename?: 'GetWorkspaceArchivedSpacesPayload';
  spaces?: Maybe<SpaceConnection>;
};


export type GetWorkspaceArchivedSpacesPayloadSpacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetWorkspaceArchivedSpacesResponse = GenericError | GetWorkspaceArchivedSpacesPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkspaceDeletionTokensPayload = {
  __typename?: 'GetWorkspaceDeletionTokensPayload';
  activationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  expiryEventReceivedAt?: Maybe<Scalars['String']['output']>;
  restoredAt?: Maybe<Scalars['String']['output']>;
  siteId?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  workspaceId?: Maybe<Scalars['Int']['output']>;
};

export type GetWorkspaceDeletionTokensResponse = GenericError | GetWorkspaceDeletionTokensPayload | UserNotAuthorizedError;

export type GetWorkspaceGroupByIdResponse = GenericError | GetWorkspaceGroupPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkspaceGroupPayload = {
  __typename?: 'GetWorkspaceGroupPayload';
  group?: Maybe<WorkspaceGroup>;
};

export type GetWorkspaceGroupsForWorkspaceResponse = GenericError | InputValidationError | UserNotAuthorizedError | GetWorkspaceGroupsPayload;

export type GetWorkspaceSettingResponse = GenericError | InputValidationError | Setting | UserNotAuthorizedError;

export type GetWorkspaceSpacesPayload = {
  __typename?: 'GetWorkspaceSpacesPayload';
  spaces?: Maybe<SpaceConnection>;
};


export type GetWorkspaceSpacesPayloadSpacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type GetWorkspaceSpacesResponse = GenericError | GetWorkspaceSpacesPayload | InputValidationError | UserNotAuthorizedError;

export type GetWorkspaceUgcDataUseSettingsPayload = {
  __typename?: 'GetWorkspaceUgcDataUseSettingsPayload';
  dataUse?: Maybe<Scalars['String']['output']>;
  includeFaceAndVoiceData?: Maybe<Scalars['Boolean']['output']>;
};

export type GetWorkspaceUgcDataUseSettingsResponse = EntityNotFoundError | GenericError | GetWorkspaceUgcDataUseSettingsPayload | UserNotAuthorizedError;

export type GetWorkspaceUserResponse = GenericError | InputValidationError | UserNotAuthorizedError | UserQueryPayload;

export type GetWorkspaceVideosPayload = {
  __typename?: 'GetWorkspaceVideosPayload';
  pageInfo: WorkspaceVideoPageInfo;
  videos: Array<WorkspaceVideoSearchItem>;
};

export type GetWorkspaceVideosResponse = GenericError | GetWorkspaceVideosPayload | UserNotAuthorizedError;

export type GettingStartedChecklistPayload = {
  __typename?: 'GettingStartedChecklistPayload';
  add_teammate?: Maybe<Scalars['Boolean']['output']>;
  complete_onboarding?: Maybe<Scalars['Boolean']['output']>;
  create_account?: Maybe<Scalars['Boolean']['output']>;
  customize_video_name?: Maybe<Scalars['Boolean']['output']>;
  download_recorder?: Maybe<Scalars['Boolean']['output']>;
  email_verified?: Maybe<Scalars['Boolean']['output']>;
  filled_account_settings?: Maybe<Scalars['Boolean']['output']>;
  first_cam_recording?: Maybe<Scalars['Boolean']['output']>;
  first_video_recording?: Maybe<Scalars['Boolean']['output']>;
  first_video_upload?: Maybe<Scalars['Boolean']['output']>;
  first_video_viewed?: Maybe<Scalars['Boolean']['output']>;
  followed_us_on_twitter?: Maybe<Scalars['Boolean']['output']>;
  has_reached_recording_limit?: Maybe<Scalars['Boolean']['output']>;
  has_viewed_screenshots?: Maybe<Scalars['Boolean']['output']>;
  has_viewed_videos?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  liked_us_on_facebook?: Maybe<Scalars['Boolean']['output']>;
  meeting_recording?: Maybe<Scalars['Boolean']['output']>;
  push_notification_enabled?: Maybe<Scalars['Boolean']['output']>;
  share_video?: Maybe<Scalars['Boolean']['output']>;
  shared_first_video_on_facebook?: Maybe<Scalars['Boolean']['output']>;
  tweeted_first_video?: Maybe<Scalars['Boolean']['output']>;
};

export type GoogleLoginOrSignupUserResponse = {
  __typename?: 'GoogleLoginOrSignupUserResponse';
  accountCreated?: Maybe<Scalars['Boolean']['output']>;
  /** deprecated session sync token associated with a user session */
  loomSst?: Maybe<Scalars['String']['output']>;
  user?: Maybe<RegularUser>;
};

export type GooglePreviewPayloadType = {
  __typename?: 'GooglePreviewPayloadType';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GoogleTokenAuthError = Error & {
  __typename?: 'GoogleTokenAuthError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type Grant = {
  __typename?: 'Grant';
  add_ons: Array<Maybe<Scalars['String']['output']>>;
  base?: Maybe<Scalars['String']['output']>;
};

export type GroupFolderAclEntry = FolderAclEntry & {
  __typename?: 'GroupFolderAclEntry';
  access?: Maybe<FolderAccessLevel>;
  group?: Maybe<WorkspaceGroup>;
  id: Scalars['ID']['output'];
};

export type Grouping = {
  __typename?: 'Grouping';
  createdAt: Scalars['Date']['output'];
  groupingId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GroupingTypeEnum>;
  updatedAt: Scalars['Date']['output'];
  video?: Maybe<RegularUserVideo>;
  videoId?: Maybe<Scalars['String']['output']>;
};

export type GroupingConnection = {
  __typename?: 'GroupingConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<GroupingEdge>>>;
  /** Flattened list of Grouping type */
  nodes?: Maybe<Array<Maybe<Grouping>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type GroupingEdge = {
  __typename?: 'GroupingEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Grouping>;
};

export type GroupingPrimaryKey = {
  groupingId: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
};

export enum GroupingTypeEnum {
  CommunityProfileVideos = 'COMMUNITY_PROFILE_VIDEOS',
  CommunityVideos = 'COMMUNITY_VIDEOS',
  Folder = 'FOLDER',
  MeetingRecording = 'MEETING_RECORDING',
  PinnedVideosInFolder = 'PINNED_VIDEOS_IN_FOLDER',
  SpacePosted = 'SPACE_POSTED',
  UserArchivedVideos = 'USER_ARCHIVED_VIDEOS',
  UserCommunityVideos = 'USER_COMMUNITY_VIDEOS',
  UserOwnedVideos = 'USER_OWNED_VIDEOS',
  UserProfileVideos = 'USER_PROFILE_VIDEOS',
  UserSharedWithMeVideos = 'USER_SHARED_WITH_ME_VIDEOS',
  UserWatchLater = 'USER_WATCH_LATER',
  VideoPersonalization = 'VIDEO_PERSONALIZATION',
  VideoPersonalizationWithAudio = 'VIDEO_PERSONALIZATION_WITH_AUDIO',
  WorkspacePublished = 'WORKSPACE_PUBLISHED',
  WorkspaceTag = 'WORKSPACE_TAG'
}

export type HasAnonymousCreatorPrivilegesQueryResponse = GenericError | UserAlreadyLoggedInError | HasAnonymousCreatorPrivilegesPayload;

export type HasGmailScopeResponse = GenericError | InputValidationError | UserNotAuthorizedError | HasGmailScopePayload;

export type HexDraftBackground = {
  __typename?: 'HexDraftBackground';
  hexValue: Scalars['String']['output'];
};

export type HexVideoBackground = {
  __typename?: 'HexVideoBackground';
  hexValue: Scalars['String']['output'];
};

export type IdempotencyKeyError = {
  __typename?: 'IdempotencyKeyError';
  message: Scalars['String']['output'];
};

export type ImageProperties = {
  __typename?: 'ImageProperties';
  captureType?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  parentVideoId?: Maybe<Scalars['String']['output']>;
  system?: Maybe<SystemInfo>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ImageSources = {
  __typename?: 'ImageSources';
  original?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type ImpactfulVideosListPayloadType = {
  __typename?: 'ImpactfulVideosListPayloadType';
  isValid?: Maybe<Scalars['Boolean']['output']>;
  videoList?: Maybe<Array<Maybe<ImpactfulVideosPayloadType>>>;
};

export type ImpactfulVideosPayloadType = {
  __typename?: 'ImpactfulVideosPayloadType';
  connections?: Maybe<Array<Maybe<RegularUser>>>;
  createdDate?: Maybe<Scalars['String']['output']>;
  loomId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalUniqueViews?: Maybe<Scalars['Int']['output']>;
  totalViews?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  videoDuration?: Maybe<Scalars['Float']['output']>;
  videoThumbnail?: Maybe<VideoThumbnailsSources>;
};

export type ImpersonateResponse = AdminImpersonatePayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type ImportMeetingRecordingsResponse = GenericError | InputValidationError | UserNotAuthorizedError | ImportMeetingRecordingsPayload;

export type ImpromptuMeeting = {
  __typename?: 'ImpromptuMeeting';
  endedAt?: Maybe<Scalars['Date']['output']>;
  guid: Scalars['ID']['output'];
  startedAt: Scalars['Date']['output'];
  videoMeetingGuid: Scalars['ID']['output'];
};

export type IncentiveType = {
  __typename?: 'IncentiveType';
  email?: Maybe<Scalars['String']['output']>;
  expires?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  invitation_type?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  possible?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
};

export type IncentivesAndInviteeType = {
  __typename?: 'IncentivesAndInviteeType';
  Invitee?: Maybe<InviteeType>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expires?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  idv2?: Maybe<Scalars['ID']['output']>;
  incentiveDetails?: Maybe<StorageIncentiveTypes>;
  invite_type?: Maybe<Scalars['String']['output']>;
  invitee_id?: Maybe<Scalars['Int']['output']>;
  inviter_id?: Maybe<Scalars['Int']['output']>;
  organization_id?: Maybe<Scalars['Int']['output']>;
  organization_idv2?: Maybe<Scalars['ID']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InputCoordinates = {
  height?: InputMaybe<Scalars['Int']['input']>;
  left?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
};

export type InputImageProperties = {
  captureType?: InputMaybe<CaptureType>;
  coordinates?: InputMaybe<InputCoordinates>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  screen?: InputMaybe<InputScreenInfo>;
  system?: InputMaybe<InputSystemInfo>;
  timestamp: Scalars['Date']['input'];
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type InputScreenInfo = {
  height?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mediaSourceId?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  scaleFactor?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};

export type InputSystemInfo = {
  client?: InputMaybe<Scalars['String']['input']>;
  client_version?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  os_version?: InputMaybe<Scalars['String']['input']>;
};

export type InputValidationError = Error & {
  __typename?: 'InputValidationError';
  failedFields?: Maybe<Array<Maybe<FailedFormFields>>>;
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type InputVideoExtras = {
  isFromTutorial?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InputVideoProperties = {
  activitySessionId?: InputMaybe<Scalars['ID']['input']>;
  activitySessionVersion?: InputMaybe<Scalars['String']['input']>;
  avgBitRate?: InputMaybe<Scalars['Int']['input']>;
  browser?: InputMaybe<Scalars['String']['input']>;
  bucketVersion?: InputMaybe<Scalars['String']['input']>;
  camera_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  client?: InputMaybe<Scalars['String']['input']>;
  client_version?: InputMaybe<Scalars['String']['input']>;
  countdown?: InputMaybe<Scalars['Boolean']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  cpu?: InputMaybe<Scalars['String']['input']>;
  cpu_arch?: InputMaybe<Scalars['String']['input']>;
  currentAudioDeviceLabel?: InputMaybe<Scalars['String']['input']>;
  currentAudioDeviceValue?: InputMaybe<Scalars['String']['input']>;
  currentVideoDeviceLabel?: InputMaybe<Scalars['String']['input']>;
  currentVideoDeviceValue?: InputMaybe<Scalars['String']['input']>;
  desktop_app_version?: InputMaybe<Scalars['String']['input']>;
  desktop_architecture?: InputMaybe<Scalars['String']['input']>;
  desktop_operating_system?: InputMaybe<Scalars['String']['input']>;
  desktop_operating_system_version?: InputMaybe<Scalars['String']['input']>;
  desktop_os_human?: InputMaybe<Scalars['String']['input']>;
  doNativeHls?: InputMaybe<Scalars['Boolean']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  externalUpload?: InputMaybe<Scalars['Boolean']['input']>;
  file_anonymous_id?: InputMaybe<Scalars['String']['input']>;
  file_size?: InputMaybe<Scalars['Float']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  free_diskspace_estimate?: InputMaybe<Scalars['Float']['input']>;
  fromError?: InputMaybe<Scalars['Boolean']['input']>;
  fromShortcut?: InputMaybe<Scalars['Boolean']['input']>;
  from_url?: InputMaybe<Scalars['String']['input']>;
  gpu?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  ip?: InputMaybe<Scalars['String']['input']>;
  isVideoReply?: InputMaybe<Scalars['Boolean']['input']>;
  loomPlatform?: InputMaybe<Scalars['String']['input']>;
  manifest_version?: InputMaybe<Scalars['Int']['input']>;
  mediaMetadataRotation?: InputMaybe<Scalars['Int']['input']>;
  microphone_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  num_hls_parts?: InputMaybe<Scalars['Int']['input']>;
  openedCanvas?: InputMaybe<Scalars['Boolean']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  os_version?: InputMaybe<Scalars['String']['input']>;
  parentVideoId?: InputMaybe<Scalars['String']['input']>;
  platformRelease?: InputMaybe<Scalars['String']['input']>;
  recordingClient?: InputMaybe<RecordingClient>;
  recordingFeature?: InputMaybe<Scalars['String']['input']>;
  recording_type?: InputMaybe<RecordingType>;
  recording_version?: InputMaybe<RecordingVersion>;
  release_channel?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  restartCount?: InputMaybe<Scalars['Int']['input']>;
  screenCropType?: InputMaybe<Scalars['String']['input']>;
  screen_height?: InputMaybe<Scalars['Int']['input']>;
  screen_type?: InputMaybe<Scalars['String']['input']>;
  screen_width?: InputMaybe<Scalars['Int']['input']>;
  sdkPartnerId?: InputMaybe<Scalars['Int']['input']>;
  sdkPartnerIdv2?: InputMaybe<Scalars['ID']['input']>;
  segmentDuration?: InputMaybe<Scalars['Int']['input']>;
  session_type?: InputMaybe<Scalars['String']['input']>;
  slackRecordingSession?: InputMaybe<Scalars['String']['input']>;
  tab_audio?: InputMaybe<Scalars['Boolean']['input']>;
  time_since_app_launch?: InputMaybe<Scalars['Int']['input']>;
  totalMem?: InputMaybe<Scalars['String']['input']>;
  trim_duration?: InputMaybe<Scalars['Int']['input']>;
  trueBitRate?: InputMaybe<Scalars['Int']['input']>;
  ui_location?: InputMaybe<UiLocation>;
  uploadMethod?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  videoHasReachedRecordingLimit?: InputMaybe<Scalars['Boolean']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
  withSCK?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InsertClipInVideoPayload = {
  __typename?: 'InsertClipInVideoPayload';
  video?: Maybe<RegularUserVideo>;
};

export type InsertClipInVideoResponse = GenericError | InputValidationError | InsertClipInVideoPayload | InvalidRequestWarning | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type InsightsForTimeframes = {
  __typename?: 'InsightsForTimeframes';
  loom?: Maybe<InsightsForTimeframesData>;
  owner?: Maybe<InsightsForTimeframesData>;
  user?: Maybe<InsightsForTimeframesData>;
  workspace?: Maybe<InsightsForTimeframesData>;
};

export type InsightsForTimeframesData = {
  __typename?: 'InsightsForTimeframesData';
  numberOfFillerWords?: Maybe<Scalars['Int']['output']>;
  videoComment?: Maybe<Scalars['Int']['output']>;
  videoView?: Maybe<Scalars['Int']['output']>;
};

export type IntObject = {
  __typename?: 'IntObject';
  id?: Maybe<Scalars['ID']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type Integration = {
  __typename?: 'Integration';
  active: Scalars['Boolean']['output'];
  created_at: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export type IntegrationSubscription = {
  __typename?: 'IntegrationSubscription';
  createdAt: Scalars['Date']['output'];
  developerAccountId?: Maybe<Scalars['ID']['output']>;
  developerAccountUsers?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  encryptedTokenData?: Maybe<Scalars['JSON']['output']>;
  externalOrganizationId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  integration?: Maybe<Integration>;
  integrationId?: Maybe<Scalars['ID']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  privateKeys?: Maybe<Array<Maybe<PrivateKeyInfo>>>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type IntegrationSubscriptionMetadataInput = {
  lead_create_enabled: Scalars['Boolean']['input'];
};

export type IntegrationSubscriptionWithWorkspaceInformation = {
  __typename?: 'IntegrationSubscriptionWithWorkspaceInformation';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSandbox?: Maybe<Scalars['Boolean']['output']>;
  isV2?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  workspaceId?: Maybe<Scalars['ID']['output']>;
  workspaceName?: Maybe<Scalars['String']['output']>;
  workspaceType?: Maybe<Scalars['String']['output']>;
};

/** Indicates the state of the auto context */
export enum IntelligenceAvailableStatusType {
  Auto = 'AUTO',
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Unknown = 'UNKNOWN',
  User = 'USER'
}

export type IntelligenceStatusResponse = {
  __typename?: 'IntelligenceStatusResponse';
  autoChaptersCount?: Maybe<Scalars['Int']['output']>;
  autoChaptersStatus?: Maybe<AutoChapterStatusesType>;
  autoDescriptionStatus?: Maybe<IntelligenceAvailableStatusType>;
  autoTasksCount?: Maybe<Scalars['Int']['output']>;
  autoTasksStatus?: Maybe<IntelligenceAvailableStatusType>;
  autoTitleStatus?: Maybe<IntelligenceAvailableStatusType>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum IntelligenceStatusType {
  Auto = 'AUTO',
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Unknown = 'UNKNOWN',
  User = 'USER'
}

export type IntercomEventResponse = {
  __typename?: 'IntercomEventResponse';
  conversationId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InvalidInviteLinkRoleError = {
  __typename?: 'InvalidInviteLinkRoleError';
  message: Scalars['String']['output'];
};

export type InvalidLinkModifierError = {
  __typename?: 'InvalidLinkModifierError';
  message: Scalars['String']['output'];
};

export type InvalidMemberRoleUpdateEntry = {
  __typename?: 'InvalidMemberRoleUpdateEntry';
  key?: Maybe<Scalars['ID']['output']>;
  reasons?: Maybe<InvalidMemberRoleUpdateReasons>;
  role: Scalars['String']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
  workspaceId?: Maybe<Scalars['ID']['output']>;
};

export type InvalidMemberRoleUpdateReasons = {
  __typename?: 'InvalidMemberRoleUpdateReasons';
  isAbleToUpdate?: Maybe<Scalars['Boolean']['output']>;
  isUniqueUpdate?: Maybe<Scalars['Boolean']['output']>;
  isValidRole?: Maybe<Scalars['Boolean']['output']>;
  isValidUserid?: Maybe<Scalars['Boolean']['output']>;
  isValidWorkspaceId?: Maybe<Scalars['Boolean']['output']>;
};

export type InvalidRequestWarning = Warning & {
  __typename?: 'InvalidRequestWarning';
  message: Scalars['String']['output'];
};

export type InvalidWorkspaceTypeError = {
  __typename?: 'InvalidWorkspaceTypeError';
  message: Scalars['String']['output'];
};

export type InvalidatJitCdnCachePayload = {
  __typename?: 'InvalidatJitCdnCachePayload';
  identifier?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type InviteCounts = {
  __typename?: 'InviteCounts';
  google?: Maybe<Scalars['Int']['output']>;
};

/** Eligible invitation flow for workspace invitation */
export enum InviteFlow {
  Atlassian = 'ATLASSIAN',
  Loom = 'LOOM',
  None = 'NONE'
}

export type InviteLink = InviteLinkCommonFields & {
  __typename?: 'InviteLink';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  invite_link: Scalars['String']['output'];
  /** the role an invitee will be assigned  */
  role: OrgRole;
};

export type InviteLinkAcceptInfo = InviteLinkCommonFields & {
  __typename?: 'InviteLinkAcceptInfo';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  invite_link: Scalars['String']['output'];
  inviter?: Maybe<RegularUser>;
  /** the role an invitee will be assigned  */
  role: OrgRole;
  workspace?: Maybe<Organization>;
};

export type InviteLinkCommonFields = {
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  invite_link: Scalars['String']['output'];
  /** the role an invitee will be assigned  */
  role: OrgRole;
};

export type InviteLinkDisabledError = {
  __typename?: 'InviteLinkDisabledError';
  redirect: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type InviteLinkNotFoundError = {
  __typename?: 'InviteLinkNotFoundError';
  redirect: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type InviteLinkWorkspaceSsoError = {
  __typename?: 'InviteLinkWorkspaceSsoError';
  redirect: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type InviteOrgUserData = {
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type InviteResults = {
  __typename?: 'InviteResults';
  email: Scalars['String']['output'];
  status: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

/** Status of domain restriction for workspace invitation */
export enum InviteSetting {
  Anyone = 'ANYONE',
  AnyoneAdminApproval = 'ANYONE_ADMIN_APPROVAL',
  DomainRestricted = 'DOMAIN_RESTRICTED',
  DomainRestrictedDirectAnyoneAdminApproval = 'DOMAIN_RESTRICTED_DIRECT_ANYONE_ADMIN_APPROVAL',
  None = 'NONE'
}

export type InviteUsersToOrganizationPayload = {
  __typename?: 'InviteUsersToOrganizationPayload';
  inviteResults: Array<Maybe<InviteResults>>;
};

export type InviteUsersToOrganizationResponse = GenericError | InviteUsersToOrganizationPayload;

export enum InvitedRoleType {
  Admin = 'admin',
  Creator = 'creator',
  CreatorLite = 'creator_lite',
  Guest = 'guest',
  Viewer = 'viewer'
}

export type Invoice = {
  __typename?: 'Invoice';
  amount: Scalars['Int']['output'];
  billing_reason: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  download_link?: Maybe<Scalars['String']['output']>;
  external_invoice_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  idv2: Scalars['ID']['output'];
  invoice_created_at: Scalars['Float']['output'];
  next_payment_attempt_date: Scalars['Float']['output'];
  period_end: Scalars['Float']['output'];
  period_start: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type InvoiceNotPayableError = {
  __typename?: 'InvoiceNotPayableError';
  message: Scalars['String']['output'];
};

/** Status of an invoice */
export enum InvoiceStatus {
  Draft = 'draft',
  Open = 'open',
  Paid = 'paid',
  Uncollectible = 'uncollectible',
  Void = 'void'
}

export type Invoices = {
  __typename?: 'Invoices';
  loomInvoices?: Maybe<Array<Maybe<LoomInvoice>>>;
  stripeInvoices?: Maybe<Array<Maybe<StripeInvoice>>>;
};

export type IsAllowedDomain = {
  __typename?: 'IsAllowedDomain';
  isAllowed: Scalars['Boolean']['output'];
};

export type IsAllowedDomainForOrgResponse = GenericError | IsAllowedDomain | UserNotAuthorizedError | UserNotLoggedInError;

export type IsExistingDomain = {
  __typename?: 'IsExistingDomain';
  isExisting: Scalars['Boolean']['output'];
};

export type IsExistingSsoDomainResponse = GenericError | IsExistingDomain | UserNotAuthorizedError | UserNotLoggedInError;

export type IsSsoEnabled = {
  __typename?: 'IsSsoEnabled';
  isEnabled: Scalars['Boolean']['output'];
};

export type IsSsoEnabledForOrgResponse = GenericError | IsSsoEnabled | UserNotAuthorizedError | UserNotLoggedInError;

export type IsSsoEnabledForUserResponse = GenericError | IsSsoEnabled | UserNotAuthorizedError | UserNotLoggedInError;

export type IsUsersOnlyVideo = {
  __typename?: 'IsUsersOnlyVideo';
  isOnlyVideo?: Maybe<Scalars['Boolean']['output']>;
};

export type JsonObject = {
  __typename?: 'JSONObject';
  id?: Maybe<Scalars['ID']['output']>;
  value?: Maybe<Scalars['JSON']['output']>;
};

export enum JiraAuthResponseCode {
  TokenRefreshFailed = 'token_refresh_failed'
}

export type JiraCreateIssueError = {
  __typename?: 'JiraCreateIssueError';
  errorCode?: Maybe<JiraErrorCode>;
  errorMessage?: Maybe<Scalars['String']['output']>;
};

export enum JiraErrorCode {
  ApiResponse = 'apiResponse',
  Assignee = 'assignee',
  Customfield = 'customfield',
  JiraSiteIdRequired = 'jiraSiteIdRequired'
}

export type JiraFieldAssignees = {
  __typename?: 'JiraFieldAssignees';
  /** The users in the workspace */
  assignees: Array<JiraUserType>;
};

export type JiraFieldIssueTypes = {
  __typename?: 'JiraFieldIssueTypes';
  /** The Jira issue types available in the project */
  issueTypes: Array<JiraIssueType>;
};

export type JiraFieldProjects = {
  __typename?: 'JiraFieldProjects';
  projects: Array<JiraProject>;
};

export type JiraFieldSearchPayload = {
  __typename?: 'JiraFieldSearchPayload';
  /** Whether the user needs to authenticate with Atlassian or not before proceeding */
  needsAtlassianAuth?: Maybe<Scalars['Boolean']['output']>;
  responseMessage?: Maybe<Scalars['String']['output']>;
  results?: Maybe<JiraFieldSearchResults>;
};

export type JiraFieldSearchResponse = GenericError | InputValidationError | InvalidRequestWarning | JiraFieldSearchPayload | UserNotAuthorizedError;

export type JiraFieldSearchResults = JiraFieldAssignees | JiraFieldIssueTypes | JiraFieldProjects;

export type JiraIssuePriorityType = {
  __typename?: 'JiraIssuePriorityType';
  /** A description of the priority */
  description?: Maybe<Scalars['String']['output']>;
  /** The Jira issue priority ID */
  id: Scalars['String']['output'];
  /** The Jira issue priority name */
  name: Scalars['String']['output'];
  /** The Jira site ID this issue type lives within */
  siteId: Scalars['String']['output'];
};

/** A Jira issue type (eg "Bug", "Task", "Story"); these are specific to a Jira project */
export type JiraIssueType = {
  __typename?: 'JiraIssueType';
  /** The Jira issue type ID */
  id: Scalars['String']['output'];
  /** The Jira issue type name */
  name: Scalars['String']['output'];
  /** The Jira site ID this issue type lives within */
  siteId: Scalars['String']['output'];
};

export type JiraMetadata = {
  __typename?: 'JiraMetadata';
  /** The Jira site ID */
  id: Scalars['String']['output'];
  /** The priority types associated with an issue */
  issuePriorities?: Maybe<Array<JiraIssuePriorityType>>;
  /** The Jira site name */
  name: Scalars['String']['output'];
  /** The Jira projects available in the site */
  projects: Array<JiraProject>;
  /** The users in the workspace */
  users?: Maybe<Array<JiraUserType>>;
};

export type JiraProject = {
  __typename?: 'JiraProject';
  /** The Jira project ID */
  id: Scalars['String']['output'];
  /** The Jira project name */
  name: Scalars['String']['output'];
  /** The Jira site ID this project lives within */
  siteId: Scalars['String']['output'];
};

export enum JiraSearchableFieldType {
  Assignees = 'assignees',
  IssueTypes = 'issueTypes',
  Projects = 'projects'
}

export type JiraSite = {
  __typename?: 'JiraSite';
  /** The Jira site ID */
  id: Scalars['String']['output'];
  /** The Jira site name */
  name: Scalars['String']['output'];
  /** Base URL for this Jira site (eg https://yourcompany.atlassian.net) (the Jira web UI) */
  url: Scalars['String']['output'];
};

export type JiraSiteMetadataPayload = {
  __typename?: 'JiraSiteMetadataPayload';
  /** The metadata related to a Jira site */
  metadata?: Maybe<JiraMetadata>;
  /** Whether the user needs to authenticate with Atlassian or not before proceeding */
  needsAtlassianAuth?: Maybe<Scalars['Boolean']['output']>;
  responseMessage?: Maybe<Scalars['String']['output']>;
};

export type JiraSiteMetadataResponse = GenericError | InputValidationError | InvalidRequestWarning | JiraSiteMetadataPayload | UserNotAuthorizedError;

export type JiraUserType = {
  __typename?: 'JiraUserType';
  /** The account id of the jira user */
  accountId: Scalars['String']['output'];
  /** The name of the jira user */
  displayName: Scalars['String']['output'];
};

export type JoinSpacePayload = {
  __typename?: 'JoinSpacePayload';
  space?: Maybe<Space>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type JoinSpaceResponse = GenericError | InputValidationError | JoinSpacePayload | UserNotAuthorizedError;

/** A workspace with additional metadata about join conditions */
export type JoinableWorkspace = {
  __typename?: 'JoinableWorkspace';
  /** Whether or not the user can join the workspace without approval */
  autoJoin?: Maybe<Scalars['Boolean']['output']>;
  hasPendingInvitation?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Whether or not the workspace is part of the consolidation experiment */
  isConsolidated?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the current user is a member of this workspace */
  isCurrentUserMember?: Maybe<Scalars['Boolean']['output']>;
  /** The status of the current user's request to join the workspace, if they have requested. */
  requestStatus?: Maybe<WorkspaceJoinRequestStatus>;
  workspace?: Maybe<Organization>;
};

export type KnownUserVideoView = {
  __typename?: 'KnownUserVideoView';
  avatar?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
};

export enum Language {
  Af = 'af',
  Am = 'am',
  As = 'as',
  Ba = 'ba',
  Be = 'be',
  Bg = 'bg',
  Bn = 'bn',
  Bo = 'bo',
  Br = 'br',
  Bs = 'bs',
  Ca = 'ca',
  Cs = 'cs',
  Cy = 'cy',
  Da = 'da',
  De = 'de',
  El = 'el',
  En = 'en',
  Es = 'es',
  Et = 'et',
  Eu = 'eu',
  Fi = 'fi',
  Fo = 'fo',
  Fr = 'fr',
  Gl = 'gl',
  Gu = 'gu',
  Ha = 'ha',
  Haw = 'haw',
  Hi = 'hi',
  Hr = 'hr',
  Ht = 'ht',
  Hu = 'hu',
  Hy = 'hy',
  Id = 'id',
  Is = 'is',
  It = 'it',
  Ja = 'ja',
  Jw = 'jw',
  Ka = 'ka',
  Kk = 'kk',
  Km = 'km',
  Kn = 'kn',
  Ko = 'ko',
  La = 'la',
  Lb = 'lb',
  Ln = 'ln',
  Lo = 'lo',
  Lt = 'lt',
  Lv = 'lv',
  Mg = 'mg',
  Mi = 'mi',
  Mk = 'mk',
  Ml = 'ml',
  Mn = 'mn',
  Mr = 'mr',
  Ms = 'ms',
  Mt = 'mt',
  My = 'my',
  Ne = 'ne',
  Nl = 'nl',
  Nn = 'nn',
  No = 'no',
  Oc = 'oc',
  Pa = 'pa',
  Pl = 'pl',
  Ps = 'ps',
  Pt = 'pt',
  Ro = 'ro',
  Ru = 'ru',
  Sa = 'sa',
  Sd = 'sd',
  Si = 'si',
  Sk = 'sk',
  Sl = 'sl',
  Sn = 'sn',
  So = 'so',
  Sq = 'sq',
  Sr = 'sr',
  Su = 'su',
  Sv = 'sv',
  Sw = 'sw',
  Ta = 'ta',
  Te = 'te',
  Tg = 'tg',
  Th = 'th',
  Tk = 'tk',
  Tl = 'tl',
  Tr = 'tr',
  Tt = 'tt',
  Uk = 'uk',
  Unknown = 'unknown',
  Uz = 'uz',
  Vi = 'vi',
  Yi = 'yi',
  Yo = 'yo',
  Zh = 'zh'
}

export type LeaveSpacePayload = {
  __typename?: 'LeaveSpacePayload';
  space?: Maybe<Space>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LeaveSpaceResponse = GenericError | InputValidationError | LeaveSpacePayload | UserNotAuthorizedError;

export type LeaveWorkspacePayload = {
  __typename?: 'LeaveWorkspacePayload';
  success: Scalars['Boolean']['output'];
};

export type LeaveWorkspaceResponse = GenericError | LeaveWorkspacePayload | UserNotAuthorizedError;

export type LegacyUserMigrationInput = {
  dryRun: Scalars['Boolean']['input'];
  userIds: Array<Scalars['Int']['input']>;
};

export type LinearAssigneesPayload = {
  __typename?: 'LinearAssigneesPayload';
  /** A list of assignees in the workspace with pagination info */
  assignees?: Maybe<LinearFieldConnection>;
};


export type LinearAssigneesPayloadAssigneesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type LinearAssigneesResponse = GenericError | InputValidationError | InvalidRequestWarning | LinearAssigneesPayload | UnauthorizedToAccessLinearError | UserNotAuthorizedError;

export type LinearField = {
  __typename?: 'LinearField';
  /** The ID of the item */
  id: Scalars['String']['output'];
  /** The display name of the item */
  name: Scalars['String']['output'];
};

export type LinearFieldConnection = {
  __typename?: 'LinearFieldConnection';
  /** A list of edges that contains the data and cursor info */
  edges: Array<LinearFieldEdge>;
  /** Info to aid in pagination */
  pageInfo: LinearPageInfo;
};

export type LinearFieldEdge = {
  __typename?: 'LinearFieldEdge';
  /** The field data for each edge */
  node: LinearField;
};

export type LinearFieldsPayload = {
  __typename?: 'LinearFieldsPayload';
  /** The assignee(s) in the workspace */
  assignees: Array<LinearField>;
  /** Whether the user needs to authenticate with Linear or not before proceeding */
  needsAuth?: Maybe<Scalars['Boolean']['output']>;
  /** The current workspace authenticated with Linear */
  organization: LinearField;
  /** The project(s) in the workspace */
  projects: Array<LinearProjectField>;
  responseMessage?: Maybe<Scalars['String']['output']>;
  /** The team(s) in the workspace */
  teams: Array<LinearField>;
};

export type LinearFieldsResponse = GenericError | InputValidationError | InvalidRequestWarning | LinearFieldsPayload | UserNotAuthorizedError;

export type LinearPageInfo = {
  __typename?: 'LinearPageInfo';
  /** The cursor to be used for fetching the next page of items */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** A flag indicating whether there are more items to load */
  hasNextPage: Scalars['Boolean']['output'];
};

export type LinearProjectField = {
  __typename?: 'LinearProjectField';
  /** The ID of the item */
  id: Scalars['String']['output'];
  /** The display name of the item */
  name: Scalars['String']['output'];
  /** The teamId associated with the project */
  teamId: Scalars['String']['output'];
};

export type LinearProjectsPayload = {
  __typename?: 'LinearProjectsPayload';
  /** A list of projects in the workspace with pagination info */
  projects?: Maybe<LinearFieldConnection>;
};


export type LinearProjectsPayloadProjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
};

export type LinearProjectsResponse = GenericError | InputValidationError | InvalidRequestWarning | LinearProjectsPayload | UnauthorizedToAccessLinearError | UserNotAuthorizedError;

export type LinearTeamsPayload = {
  __typename?: 'LinearTeamsPayload';
  /** A list of teams in the workspace with pagination info */
  teams?: Maybe<LinearFieldConnection>;
};


export type LinearTeamsPayloadTeamsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type LinearTeamsResponse = GenericError | InputValidationError | InvalidRequestWarning | LinearTeamsPayload | UnauthorizedToAccessLinearError | UserNotAuthorizedError;

export enum LinkSharing {
  Anyone = 'anyone',
  OnlyPeopleAdded = 'only_people_added',
  Workspace = 'workspace'
}

export type ListApplications = {
  __typename?: 'ListApplications';
  applications: Array<Maybe<RecordSdkApplication>>;
  developerAccountId?: Maybe<Scalars['Int']['output']>;
};

export type ListApplicationsUnion = GenericError | ListApplications;

export type ListExternalApiTokenResponse = GenericError | InputValidationError | ListExternalApiTokenResult | UserNotAuthorizedError;

export type ListExternalApiTokenResult = {
  __typename?: 'ListExternalAPITokenResult';
  token?: Maybe<Array<Maybe<ExternalApiToken>>>;
};

export type ListPhoneticHintsPayload = {
  __typename?: 'ListPhoneticHintsPayload';
  /** List of phonetic hints results */
  results: Array<Maybe<PhoneticHints>>;
};

export type ListPhoneticHintsResponse = GenericError | ListPhoneticHintsPayload | UserNotAuthorizedError;

export type ListPricesPayload = {
  __typename?: 'ListPricesPayload';
  prices: Array<Price>;
};

export type ListPricesResponse = GenericError | ListPricesPayload | UserNotAuthorizedError;

export type ListTaxIdsPayload = {
  __typename?: 'ListTaxIdsPayload';
  taxIds?: Maybe<Array<Maybe<TaxId>>>;
};

/** Attributes to filter tax ids by server side */
export type ListTaxIdsPostQueryArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ListTaxIdsResponse = GenericError | ListTaxIdsPayload | UserNotAuthorizedError;

export type LiveTranscript = {
  __typename?: 'LiveTranscript';
  phrases?: Maybe<Array<Phrase>>;
  schemaVersion?: Maybe<Scalars['String']['output']>;
};

export type LiveTranscriptNotReady = {
  __typename?: 'LiveTranscriptNotReady';
  message: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type LiveTranscriptStatus = {
  __typename?: 'LiveTranscriptStatus';
  status?: Maybe<LiveTranscriptStatusType>;
};

export enum LiveTranscriptStatusType {
  Completed = 'completed',
  Updated = 'updated'
}

export type LogFileObject = {
  __typename?: 'LogFileObject';
  downloadUrl?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  lastModifiedAt?: Maybe<Scalars['Float']['output']>;
};

export type LogTagClickedResponse = GenericError | InputValidationError | TagClickedPayload | UserNotAuthorizedError;

export type LogTagViewedResponse = GenericError | InputValidationError | TagViewedPayload | UserNotAuthorizedError;

export type LoginOrSignupWithGoogleTokenResponse = AccountCreatedButNoTermsAccepted | GenericError | GoogleLoginOrSignupUserResponse | GoogleTokenAuthError | UserAlreadyLoggedInError | UserNotAuthorizedError;

export type LoginUserWithEmailAndPasswordResponse = GenericError | RegularUser | UserAlreadyLoggedInError | UserNotAuthorizedError;

export type LoomCustomer = {
  __typename?: 'LoomCustomer';
  currency: Scalars['String']['output'];
  external: StripeCustomer;
  external_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: CustomerMetadata;
  third_tier_assignment?: Maybe<ThirdTierVariation>;
  workspace_id: Scalars['Int']['output'];
  workspace_idv2: Scalars['ID']['output'];
};

export type LoomDiscounts = {
  __typename?: 'LoomDiscounts';
  discounts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type LoomInvoice = {
  __typename?: 'LoomInvoice';
  billing_reason: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  download_link: Scalars['String']['output'];
  external_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  idv2: Scalars['ID']['output'];
  invoice_created_at: Scalars['Float']['output'];
  next_payment_attempt_date?: Maybe<Scalars['Float']['output']>;
  period_end: Scalars['Float']['output'];
  period_start: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  total_paid: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type LoomMeeting = {
  __typename?: 'LoomMeeting';
  endsAt: Scalars['Date']['output'];
  guid: Scalars['ID']['output'];
  recurring: Scalars['Boolean']['output'];
  startsAt: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  videoMeetingGuid: Scalars['ID']['output'];
  workspaceGuid: Scalars['ID']['output'];
};

export type LoommateAddSubscriptionItemsResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateAttachSourceResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateDeleteSubscriptionItemsResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateFallLaunch24Response = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateGetCheckoutPricesResponse = GenericError | GetCheckoutPricesPayload | UserNotAuthorizedError;

export type LoommateGetCustomerResponse = GenericError | LoomCustomer | UserNotAuthorizedError;

export type LoommateGetPaymentMethodOnFileResponse = GenericError | StripePaymentMethod | UserNotAuthorizedError;

export type LoommateGetRedeemedDiscountsResponse = GenericError | LoomDiscounts | UserNotAuthorizedError;

export type LoommateGetSourceResponse = GenericError | StripeSource | UserNotAuthorizedError;

export type LoommatePauseSubscriptionResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateReleasePausedSubscriptionResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateResumePausedSubscriptionResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateUpdateCustomerAssignmentResponse = GenericError | OperationResultStatus | UserNotAuthorizedError;

export type LoommateWorkspaceConfigurePayload = {
  __typename?: 'LoommateWorkspaceConfigurePayload';
  accounts: Array<Scalars['String']['output']>;
  workspaceId: Scalars['Int']['output'];
  workspaceIdv2: Scalars['ID']['output'];
};

export type LoommateWorkspaceConfigureResponse = GenericError | LoommateWorkspaceConfigurePayload | UserNotAuthorizedError;

export enum LoomsAnonProfileCollectionFilterType {
  CommunityProfile = 'COMMUNITY_PROFILE'
}

export type LoomsCollectionFilter = {
  type: LoomsCollectionFilterType;
  /** Optional value associated with the filter */
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum LoomsCollectionFilterType {
  CommunityProfile = 'COMMUNITY_PROFILE',
  CommunityPublished = 'COMMUNITY_PUBLISHED',
  CreatedByMe = 'CREATED_BY_ME',
  CreatedByOthers = 'CREATED_BY_OTHERS',
  InFolder = 'IN_FOLDER',
  Looms = 'LOOMS',
  MeetingRecording = 'MEETING_RECORDING',
  NotInFolder = 'NOT_IN_FOLDER',
  Profile = 'PROFILE',
  Published = 'PUBLISHED',
  SharedWithMe = 'SHARED_WITH_ME',
  Tag = 'TAG',
  Unpublished = 'UNPUBLISHED',
  WorkspaceProfile = 'WORKSPACE_PROFILE'
}

export enum LoomsSortGrouping {
  CommunityProfileVideos = 'COMMUNITY_PROFILE_VIDEOS',
  CommunityVideos = 'COMMUNITY_VIDEOS',
  Folder = 'FOLDER',
  MeetingRecording = 'MEETING_RECORDING',
  PinnedVideosInFolder = 'PINNED_VIDEOS_IN_FOLDER',
  SpacePosted = 'SPACE_POSTED',
  UserArchivedVideos = 'USER_ARCHIVED_VIDEOS',
  UserCommunityVideos = 'USER_COMMUNITY_VIDEOS',
  UserOwnedVideos = 'USER_OWNED_VIDEOS',
  UserProfileVideos = 'USER_PROFILE_VIDEOS',
  UserSharedWithMeVideos = 'USER_SHARED_WITH_ME_VIDEOS',
  UserWatchLater = 'USER_WATCH_LATER',
  VideoPersonalization = 'VIDEO_PERSONALIZATION',
  VideoPersonalizationWithAudio = 'VIDEO_PERSONALIZATION_WITH_AUDIO',
  WorkspacePublished = 'WORKSPACE_PUBLISHED',
  WorkspaceTag = 'WORKSPACE_TAG'
}

export enum LoomsSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum LoomsSortType {
  Custom = 'CUSTOM',
  Grouping = 'GROUPING',
  Name = 'NAME',
  Recent = 'RECENT'
}

export enum LoomsSource {
  All = 'ALL',
  AllPublicSpaces = 'ALL_PUBLIC_SPACES',
  Archived = 'ARCHIVED',
  Mine = 'MINE',
  Shared = 'SHARED',
  Space = 'SPACE',
  UserProfileSpaces = 'USER_PROFILE_SPACES',
  UserPublicSpaces = 'USER_PUBLIC_SPACES',
  UserSpace = 'USER_SPACE',
  WatchLater = 'WATCH_LATER'
}

/** Error returned when unsuccessful with getting or creating meeting notes page */
export type MagicMeetingNotesFailure = {
  __typename?: 'MagicMeetingNotesFailure';
  reason: MagicMeetingNotesFailureReason;
};

/** Failure reason when getting or creating meeting notes page */
export enum MagicMeetingNotesFailureReason {
  ConfluenceHandledError = 'CONFLUENCE_HANDLED_ERROR',
  MissingPermissions = 'MISSING_PERMISSIONS',
  RecordingDisabled = 'RECORDING_DISABLED',
  Unexpected = 'UNEXPECTED'
}

/** Response for magic meeting notes page (get or create meeting notes page) */
export type MagicMeetingNotesPageLink = {
  __typename?: 'MagicMeetingNotesPageLink';
  url: Scalars['String']['output'];
};

export type MagicMeetingNotesPageLinkResponse = GenericError | InputValidationError | MagicMeetingNotesFailure | MagicMeetingNotesPageLink | UserNotAuthorizedError;

export type MakeFolderPublicPayload = {
  __typename?: 'MakeFolderPublicPayload';
  folder?: Maybe<RegularUserFolder>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MakeFolderPublicResponse = GenericError | InputValidationError | MakeFolderPublicPayload | UserNotAuthorizedError;

export type MarkSpaceContentAsReadPayload = {
  __typename?: 'MarkSpaceContentAsReadPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MarkSpaceContentAsReadResponse = GenericError | MarkSpaceContentAsReadPayload | UserNotAuthorizedError;

export type MarketingConsentOptionsInput = {
  consentDisplayedText?: InputMaybe<Scalars['String']['input']>;
  consentGranted?: InputMaybe<Scalars['Boolean']['input']>;
  formUrl?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  localeRequiresMarketingCommunicationOptIn?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MatchedTags = {
  __typename?: 'MatchedTags';
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type MaximumRecordsExceededError = Error & {
  __typename?: 'MaximumRecordsExceededError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type MediaMonologue = {
  __typename?: 'MediaMonologue';
  clipId?: Maybe<Scalars['ID']['output']>;
  elements: Array<MediaTranscriptElement>;
  speaker?: Maybe<Speaker>;
};

export type MediaTranscriptElement = TranscriptPunctElement | TranscriptTextElement;

export enum MediaTranscriptStatus {
  Final = 'final',
  Partial = 'partial'
}

export type Meeting = {
  __typename?: 'Meeting';
  autoRecording: Scalars['Boolean']['output'];
  externalId: Scalars['String']['output'];
  externalUserId: Scalars['String']['output'];
  isRecurring: Scalars['Boolean']['output'];
  source: MeetingSourceProperty;
  title: Scalars['String']['output'];
  type: MeetingTypeProperty;
  unixMSEndTime: Scalars['Date']['output'];
  unixMSStartTime: Scalars['Date']['output'];
  userId: Scalars['ID']['output'];
  videoId?: Maybe<Scalars['String']['output']>;
  videoPrivacy?: Maybe<VideoPrivacyProperty>;
  videoTags?: Maybe<Array<Scalars['String']['output']>>;
  videoVisibility?: Maybe<VideoVisibilityProperty>;
};

export type MeetingBotControlsState = {
  __typename?: 'MeetingBotControlsState';
  botControlsState: BotControlsState;
  meetingBotGuid: Scalars['ID']['output'];
};

export type MeetingInfoLog = {
  __typename?: 'MeetingInfoLog';
  at: Scalars['String']['output'];
  event: Scalars['String']['output'];
};

export type MeetingInfoStatusChange = {
  __typename?: 'MeetingInfoStatusChange';
  at: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type MeetingInvitee = {
  __typename?: 'MeetingInvitee';
  email: Scalars['String']['output'];
  isInternal: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organizer: Scalars['Boolean']['output'];
  user?: Maybe<CommunityUser>;
};

export type MeetingInviteesPayload = {
  __typename?: 'MeetingInviteesPayload';
  invitees: Array<MeetingInvitee>;
};

export type MeetingInviteesResponse = GenericError | InputValidationError | MeetingInviteesPayload | UserNotAuthorizedError;

export type MeetingNotesPage = {
  __typename?: 'MeetingNotesPage';
  lastUpdated: Scalars['String']['output'];
  pageTitle: Scalars['String']['output'];
  pageUrl: Scalars['String']['output'];
};

export type MeetingRecorderHasAmnPayload = {
  __typename?: 'MeetingRecorderHasAmnPayload';
  eligible?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type MeetingRecorderHasAmnResponse = GenericError | InputValidationError | MeetingRecorderHasAmnPayload | UserNotAuthorizedError;

export enum MeetingRecordingAccessInput {
  CanEdit = 'can_edit',
  CanView = 'can_view',
  Disabled = 'disabled'
}

export enum MeetingRecordingAccessType {
  CanEdit = 'can_edit',
  CanView = 'can_view',
  Disabled = 'disabled'
}

export type MeetingRecordingInfo = {
  __typename?: 'MeetingRecordingInfo';
  meetingType: Scalars['String']['output'];
};

export enum MeetingRecordingLinkSharingInput {
  Anyone = 'anyone',
  OnlyPeopleAdded = 'only_people_added',
  Workspace = 'workspace'
}

export enum MeetingRecordingLinkSharingType {
  Anyone = 'anyone',
  OnlyPeopleAdded = 'only_people_added',
  Workspace = 'workspace'
}

export type MeetingRecordingSettings = {
  __typename?: 'MeetingRecordingSettings';
  autoRecordOwnedMeetings: AutoRecordOwnedMeetingsType;
  externalInviteeAccess: MeetingRecordingAccessType;
  id: Scalars['ID']['output'];
  recordingLinkSharing: MeetingRecordingLinkSharingType;
  recordingSummaryNotificationSetting: MeetingRecordingSummaryNotificationType;
  recordingWorkspaceMemberAccess: MeetingRecordingAccessType;
};

export enum MeetingRecordingSummaryNotificationInput {
  Disabled = 'disabled',
  Everyone = 'everyone',
  ExternalOnly = 'external_only',
  InternalOnly = 'internal_only',
  RecorderOnly = 'recorder_only'
}

export enum MeetingRecordingSummaryNotificationType {
  Disabled = 'disabled',
  Everyone = 'everyone',
  ExternalOnly = 'external_only',
  InternalOnly = 'internal_only',
  RecorderOnly = 'recorder_only'
}

export type MeetingRestoreAutomationsPayload = {
  __typename?: 'MeetingRestoreAutomationsPayload';
  meetings?: Maybe<Array<Maybe<CalendarMeeting>>>;
  success: Scalars['Boolean']['output'];
};

export type MeetingRestoreAutomationsResponse = GenericError | InputValidationError | MeetingRestoreAutomationsPayload | UserNotAuthorizedError;

export enum MeetingSourceProperty {
  Zoom = 'zoom'
}

export type MeetingTakeaways = {
  __typename?: 'MeetingTakeaways';
  takeaways?: Maybe<Scalars['String']['output']>;
};

export enum MeetingTypeProperty {
  ZoomRecurringMeetingType = 'ZOOM_RECURRING_MEETING_TYPE',
  ZoomRecurringMeetingWithNoEnddateType = 'ZOOM_RECURRING_MEETING_WITH_NO_ENDDATE_TYPE',
  ZoomScheduledMeetingType = 'ZOOM_SCHEDULED_MEETING_TYPE'
}

export type MemberCounts = {
  __typename?: 'MemberCounts';
  folders: Scalars['JSON']['output'];
  screenshots: Scalars['JSON']['output'];
  videos: Scalars['JSON']['output'];
};

export enum MemberPropertyEnum {
  AmnSettings = 'amnSettings',
  BooleanValue = 'booleanValue',
  DeclinedSuggestedFollowStreams = 'declinedSuggestedFollowStreams',
  DefaultCta = 'defaultCta',
  DeletedVideoCount = 'deletedVideoCount',
  EnforceCreatorLiteLimit = 'enforceCreatorLiteLimit',
  HomeStateDensity = 'homeStateDensity',
  JsonValue = 'jsonValue',
  LimitsOverride = 'limitsOverride',
  NumberValue = 'numberValue',
  RecentlyUsedTags = 'recentlyUsedTags',
  StringValue = 'stringValue',
  ZoomAllIngestion = 'zoomAllIngestion',
  ZoomAutoIngestion = 'zoomAutoIngestion'
}

export type MemberProration = {
  __typename?: 'MemberProration';
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  daysLeft?: Maybe<Scalars['Int']['output']>;
  fromRole?: Maybe<OrgRole>;
  invoiceLineItemId?: Maybe<Scalars['ID']['output']>;
  membershipId?: Maybe<Scalars['ID']['output']>;
  membershipRoleUpdateRequestId?: Maybe<Scalars['ID']['output']>;
  toRole?: Maybe<OrgRole>;
};

export type MemberRole = {
  __typename?: 'MemberRole';
  inviteable?: Maybe<Scalars['Boolean']['output']>;
  is_free?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type MembershipRoleUpdates = {
  __typename?: 'MembershipRoleUpdates';
  createdAt?: Maybe<Scalars['Date']['output']>;
  from_role?: Maybe<Scalars['String']['output']>;
  initiator_email?: Maybe<Scalars['String']['output']>;
  initiator_id?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  to_role?: Maybe<Scalars['String']['output']>;
  user_email?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type MigratePendingItemsInvoicePayload = {
  __typename?: 'MigratePendingItemsInvoicePayload';
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MigratePendingItemsInvoiceResponse = GenericError | MigratePendingItemsInvoicePayload | UserNotAuthorizedError;

export type MobileHomeActivityInfo = {
  __typename?: 'MobileHomeActivityInfo';
  reasons: Array<Maybe<MobileHomeActivityReason>>;
  video: RegularUserVideo;
};

export type MobileHomeActivityPayload = {
  __typename?: 'MobileHomeActivityPayload';
  entries: Array<MobileHomeActivityInfo>;
};

export enum MobileHomeActivityReason {
  FirstVideoView = 'FIRST_VIDEO_VIEW',
  NewComment = 'NEW_COMMENT',
  NewCommentReply = 'NEW_COMMENT_REPLY',
  NewReaction = 'NEW_REACTION'
}

export type MobileHomeActivityResponse = GenericError | MobileHomeActivityPayload | UserNotAuthorizedError;

export type MoveFolderPayload = {
  __typename?: 'MoveFolderPayload';
  folders?: Maybe<Array<Maybe<RegularUserFolder>>>;
  newParentFolderId?: Maybe<Scalars['ID']['output']>;
};

export type MoveVideoPayload = {
  __typename?: 'MoveVideoPayload';
  videos?: Maybe<Array<Maybe<RegularUserVideo>>>;
};

export type MutateDataRetentionResponse = DataRetention | GenericError | InputValidationError | UserNotAuthorizedError;

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a push subscription for the user */
  RegisterNewPushSubscription?: Maybe<RegisterNewPushSubscriptionResponse>;
  /** Toggle unread on profile */
  ToggleUnreadForProfile?: Maybe<ToggleUnreadForProfileResponse>;
  /** Toggle unread on tag */
  ToggleUnreadForTag?: Maybe<ToggleUnreadForTagResponse>;
  /** Update user email */
  UpdateUserEmail?: Maybe<UpdateUserEmailResponse>;
  /** Update user first and last name */
  UpdateUserFirstAndLastName?: Maybe<UpdateUserFirstAndLastNameResponse>;
  UpdateUserLoomCompanionSettingsForDomainName?: Maybe<UpdateUserLoomCompanionSettingsForDomainNameResponse>;
  UpdateUserLoomCompanionSettingsForMasterSwitch?: Maybe<UpdateUserLoomCompanionSettingsForMasterSwitchResponse>;
  /** Update user password */
  UpdateUserPassword?: Maybe<UpdateUserPasswordResponse>;
  /** Update a user specific trigger */
  UpdateUserTrigger?: Maybe<UpdateUserTriggerResponse>;
  /** process invite link invitation */
  acceptInviteLinkInvitation?: Maybe<AcceptInviteLinkInvitationResponse>;
  acceptOrgInvite?: Maybe<Scalars['Boolean']['output']>;
  addActiveClipsToVideo?: Maybe<AddActiveClipsToVideoResponse>;
  /** Create a new asset */
  addAsset?: Maybe<AddAssetResponse>;
  /** Add auto zooms to a video */
  addAutoZoomsToVideo?: Maybe<AddAutoZoomsToVideoResponse>;
  /** Add multiple emails to the education whitelist. Limited to 25 at a time. */
  addEmailsToEducationWhitelist: Array<Maybe<EducationEmailAddResult>>;
  addFavorite?: Maybe<Scalars['Boolean']['output']>;
  addOrEditVideoEmail?: Maybe<AddOrEditVideoEmailResponse>;
  /** Adding parent space to folder permissions */
  addParentSpaceToFolderPermissions?: Maybe<AddParentSpaceToFolderPermissionsResponse>;
  addSsoDomainForOrg?: Maybe<AddSsoDomainForOrgResponse>;
  /** Add subscription add-on items to a subscription */
  addSubscriptionItems?: Maybe<AddSubscriptionItemsResponse>;
  addTagToVideo?: Maybe<AddTagToVideoResponse>;
  addUserToScreenshotAccess?: Maybe<AddUserToScreenshotAccessResponse>;
  addUserToSpace?: Maybe<AddUserToSpaceResponse>;
  /** Adding users or groups to folder permissions */
  addUsersOrGroupsToFolderPermissions?: Maybe<AddUsersOrGroupsToFolderPermissionsResponse>;
  /** Will add users to a workspace group. */
  addUsersToWorkspaceGroup?: Maybe<AddUsersToWorkspaceGroupResponse>;
  addVideoClips?: Maybe<AddVideoClipsResponse>;
  addVideoReaction?: Maybe<PublicVideoReaction>;
  addVideoToWatchLaterList?: Maybe<AddVideoToWatchLaterListResponse>;
  admin?: Maybe<AdminMutations>;
  adminAddMemberToWorkspace: AddMemberToWorkspaceResponse;
  adminAddMembersToWorkspace?: Maybe<AdminAddMembersToWorkspaceResponse>;
  adminAddOrExtendTrialForWorkspace?: Maybe<AdminAddOrExtendTrialPayload>;
  adminAddSpaceMembers?: Maybe<AdminAddSpaceMembersResponse>;
  adminAddWorkspaceDomain?: Maybe<AdminAddWorkspaceDomainResponse>;
  adminAddWorkspaceToQuantityJob?: Maybe<AdminAddWorkspaceToQuantityJobResponse>;
  /** Loommate API only: backfill a billing entity for a workspace */
  adminBackfillBillingEntity?: Maybe<AdminBackfillBillingEntityResponse>;
  /** Loommate API only: backfill a stripe customer for a workspace */
  adminBackfillStripeCustomer?: Maybe<AdminBackfillStripeCustomerResponse>;
  /** Bulk add given tag to a list of videoIds. */
  adminBulkAddTagToVideos?: Maybe<AdminBulkAddTagToVideosResponse>;
  adminBulkBanUsers?: Maybe<AdminBulkBanUsersResponse>;
  adminBulkDeleteGroupingsByPrimaryKey?: Maybe<AdminBulkDeleteGroupingsByPrimaryKeyResponse>;
  /** Bulk deletes slack messages */
  adminBulkDeleteSlackMessages?: Maybe<AdminBulkDeleteSlackMessagesResponse>;
  /** Imports videos from signed S3 links */
  adminBulkImportVideos?: Maybe<AdminBulkImportVideosResponse>;
  /** Bulk move folders from a user to another user */
  adminBulkMoveFolders?: Maybe<AdminBulkMoveFoldersResponse>;
  /** Bulk move folders to a space and folder */
  adminBulkMoveFoldersToSpace?: Maybe<AdminBulkMoveFoldersToSpaceResponse>;
  /** Bulk move videos */
  adminBulkMoveVideos?: Maybe<AdminBulkMoveVideosResponse>;
  /** Bulk move videos to a space and folder */
  adminBulkMoveVideosToSpace?: Maybe<AdminBulkMoveVideosToSpaceResponse>;
  adminBulkOverridePlaybackSource?: Maybe<AdminBulkOverridePlaybackSourceResponse>;
  /** Bulk share a list of videoIds to given space (and folder) */
  adminBulkShareVideosToSpace?: Maybe<AdminBulkShareVideosToSpaceResponse>;
  /** Transfer a list of video ownerships to a user */
  adminBulkTransferVideosToUser?: Maybe<AdminBulkTransferVideosToUserResponse>;
  /** Refresh the domain cache for the provided WorkOS Organization. */
  adminCacheWorkosOrgDomains?: Maybe<AdminCacheWorkosOrgDomainsResponse>;
  /** Admin: Cancel pending downgrade */
  adminCancelPendingDowngrade?: Maybe<AdminCancelPendingDowngradeResponse>;
  adminCancelSubscriptionForWorkspace: Scalars['JSON']['output'];
  adminChangeSpacesState?: Maybe<AdminChangeSpacesStateResponse>;
  /** Admin endpoint for changing a user's email */
  adminChangeUserEmail?: Maybe<AdminChangeUserEmailResponse>;
  /** Convert a video to v6. This is a no-op if the video is already v6. */
  adminConvertVideoToV6?: Maybe<AdminConvertVideoToV6Response>;
  /** Kills all active sessions for a given user ID. For Loommate employees only. */
  adminDeleteAllSessionsForUser?: Maybe<AdminDeleteAllSessionsForUserResponse>;
  /** Kills an active session for a given user ID. For Loommate employees only. */
  adminDeleteSessionForUser?: Maybe<AdminDeleteSessionForUserResponse>;
  adminDeleteUser?: Maybe<AdminDeleteUserResponse>;
  adminDeleteWorkspaceMember?: Maybe<AdminDeleteWorkspaceMemberResponse>;
  adminDisconnectSlackSubscriptionConnectionById?: Maybe<AdminDisconnectSlackSubscriptionConnectionByIdResponse>;
  adminDispatchStreamHubMessage?: Maybe<AdminDispatchStreamHubMessageResponse>;
  adminEmitEvent: Scalars['Boolean']['output'];
  adminEndTrialForWorkspace?: Maybe<AdminEndTrialPayload>;
  /** Manualy flush and repopulate from WorkOS. This is run once a day and it's recommended to use adminCacheWorkosOrgDomains instead. */
  adminFlushWorkosDomains?: Maybe<AdminFlushWorkosDomainsResponse>;
  adminForceAtlassianMasterUsers?: Maybe<AdminForceAtlassianMasterUsersResponse>;
  adminForceTriggerDataRetention?: Maybe<AdminForceTriggerDataRetentionResponse>;
  adminHideWorkspace?: Maybe<AdminHideWorkspaceResponse>;
  /** Invalidate Jit Cache for video */
  adminInvalidatJitCdnCache?: Maybe<AdminInvalidatJitCdnCacheResponse>;
  adminMarkInvoiceAsPaid?: Maybe<AdminMarkInvoiceAsPaidResponse>;
  /** Migrate all content to a new personal workspace for a user */
  adminMigrateContentToReactivatedPersonalWorkspace?: Maybe<AdminMigrateContentToReactivatedPersonalWorkspaceResponse>;
  adminOverrideDisableJit?: Maybe<Scalars['Boolean']['output']>;
  /** Admin override user limits */
  adminOverrideLimits?: Maybe<AdminOverrideLimitsResponse>;
  adminOverridePlaybackSource?: Maybe<Scalars['Boolean']['output']>;
  adminOverrideSubscription?: Maybe<AdminOverrideSubscriptionResponse>;
  adminPopulateSearchIndex?: Maybe<AdminPopulateSearchIndexResponse>;
  adminPurgeConnectionIdCache?: Maybe<AdminPurgeConnectionIdCacheResponse>;
  /** Reconcile the membership of the selected workspace with the linked Confluence workspace. */
  adminReconcileWorkspaceMembership?: Maybe<AdminReconcileWorkspaceMembershipResponse>;
  /** Recreate groupings for a user */
  adminRecreateUserGroupings?: Maybe<AdminRecreateUserGroupingsResponse>;
  /** Recreate groupings for videos */
  adminRecreateVideoGroupings?: Maybe<AdminRecreateVideoGroupingsResponse>;
  adminRegenerateAutoContext?: Maybe<AdminRegenerateAutoContextResponse>;
  adminRemoveSpaceMembers?: Maybe<AdminRemoveSpaceMembersResponse>;
  adminRemoveWorkspaceDomain?: Maybe<AdminRemoveWorkspaceDomainResponse>;
  adminRepairOverlays?: Maybe<AdminRepairOverlaysResponse>;
  /**
   *
   *         Admin function to transfer a user's personal library content between workspaces.
   *
   */
  adminRequestToTransferContent?: Maybe<AdminRequestToTransferContentResponse>;
  adminResetModelCache?: Maybe<AdminResetModelCacheResponse>;
  adminResetUser?: Maybe<AdminResetUserResponse>;
  adminRunTranscodeJob?: Maybe<Scalars['Boolean']['output']>;
  adminRunWorkspaceQuantitySyncJob?: Maybe<AdminRunWorkspaceQuantitySyncJobResponse>;
  adminStartSiteEntityMigration?: Maybe<AdminStartSiteEntityMigrationResponse>;
  adminSubmitBackgroundUserMigrationJob?: Maybe<AdminSubmitBackgroundUserMigrationJobResponse>;
  adminSubmitLegacyUserMigration?: Maybe<AdminSubmitLegacyUserMigrationResponse>;
  adminSubmitStripeEvent?: Maybe<AdminSubmitStripeEventResponse>;
  /** Sync Atlassian groups for the selected workspace with groups in Loom. */
  adminSyncAtlassianWorkspaceGroups?: Maybe<AdminSyncAtlassianWorkspaceGroupsResponse>;
  /** Loommate API only: Sync a given subscription for a workspace */
  adminSyncBillingEntity?: Maybe<AdminSyncBillingEntityResponse>;
  /** Sync Loom groups to WorkOS groups. */
  adminSyncWorkosGroups?: Maybe<AdminSyncWorkosGroupsResponse>;
  /** Sync Loom groups to WorkOS groups. */
  adminSyncWorkosGroupsByDirectory?: Maybe<AdminSyncWorkosGroupsByDirectoryResponse>;
  /** Sync Loom user to WorkOS user profile. */
  adminSyncWorkosUsers?: Maybe<AdminSyncWorkosUsersResponse>;
  /** Sync Loom users to WorkOS directory users */
  adminSyncWorkosUsersByDirectory?: Maybe<AdminSyncWorkosUsersByDirectoryResponse>;
  adminToggleAutoJoin?: Maybe<AdminToggleAutoJoinResponse>;
  adminToggleWorkspaceConsolidation?: Maybe<AdminToggleWorkspaceConsolidationResponse>;
  adminTriggerDataSyncCollector?: Maybe<AdminTriggerDataSyncCollectorResponse>;
  adminTriggerScheduledDowngradeForWorkspace: Scalars['JSON']['output'];
  adminUnhideWorkspace?: Maybe<AdminUnhideWorkspaceResponse>;
  adminUpdateCoupon?: Maybe<AdminUpdateCouponResponse>;
  /** Update a folder field */
  adminUpdateFolder?: Maybe<AdminUpdateFolderResponse>;
  /** Admin endpoint for updating a member's property for a particular workspace */
  adminUpdateMemberProperty?: Maybe<AdminUpdateMemberPropertyResponse>;
  adminUpdateMemberWorkspaceRole?: Maybe<AdminUpdateMemberWorkspaceRoleResponse>;
  adminUpdateMembersRole?: Maybe<AdminUpdateMembersRoleResponse>;
  adminUpdateMinimumSeatQuantity?: Maybe<UpdateOrganizationResponse>;
  /** Admin endpoint for Updating a prompt override */
  adminUpdatePromptOverrides?: Maybe<AdminUpdatePromptOverridesResponse>;
  /** Update a referral link's enabled field */
  adminUpdateReferralLinkEnabled?: Maybe<AdminUpdateReferralLinkEnabledResponse>;
  adminUpdateSalesSupportType?: Maybe<AdminUpdateSalesSupportTypeResponse>;
  adminUpdateUserDefaultWorkspace?: Maybe<AdminUpdateUserDefaultWorkspaceResponse>;
  /** Admin endpoint for Updating a user's property */
  adminUpdateUserProperty?: Maybe<AdminUpdateUserPropertyResponse>;
  adminUpdateUserStatus?: Maybe<AdminUpdateUserStatusResponse>;
  /** Update privacy for a group of videos */
  adminUpdateVideoPrivacy?: Maybe<AdminUpdateVideoPrivacyResponse>;
  adminUpdateWorkspaceAtlassianFields?: Maybe<AdminUpdateWorkspaceAtlassianFieldsResponse>;
  /** Loommate API only: update a stripe customer for a workspace */
  adminUpdateWorkspaceCustomer?: Maybe<AdminUpdateWorkspaceCustomerResponse>;
  adminUpdateWorkspacePlan?: Maybe<AdminUpdateWorkspacePlanResponse>;
  adminUpdateWorkspaceSetting?: Maybe<AdminUpdateWorkspaceSettingResponse>;
  /** Update tier package for workspace */
  adminUpdateWorkspaceTier?: Maybe<AdminUpdateWorkspaceTierResponse>;
  adminVerifyUser: AdminVerifyUserResponse;
  /** Advance stripe test clock for customer */
  advanceTestClock?: Maybe<AdvanceTestClockResponse>;
  /** Generate advanced AI meeting notes as either a Confluence page link or markdown content */
  advancedAiMeetingNotesPageLink?: Maybe<AdvancedAiMeetingNotesResponse>;
  /** Apply an enhanced filler word removal using TTS */
  applyFillerWordRemovalTTS?: Maybe<ApplyFillerWordRemovalTtsResponse>;
  /** apply video limit override to a user in a workspace */
  applyVideoLimitOverride?: Maybe<ApplyVideoLimitOverrideResponse>;
  approveAutoCta?: Maybe<ApproveAutoCtaResponse>;
  approveVideoTask?: Maybe<ApproveVideoTaskResponse>;
  /** Archive and unarchive folders */
  archiveFolders?: Maybe<ArchiveFoldersResponse>;
  /** Archives a space */
  archiveSpace?: Maybe<ArchiveSpaceResponse>;
  archiveVideos?: Maybe<ArchiveVideosResponse>;
  automationRestoreDefaults?: Maybe<AutomationRestoreDefaultsResponse>;
  /** Will take in folders existing in one space and duplicate them in the users library, moving all of its contents and destroy the previous folder */
  batchMoveFoldersToLibrary?: Maybe<BatchMoveFoldersToLibraryResponse>;
  /** Will take in folders existing in one space and duplicate it to another space, moving all of its contents and destroy the previous folder */
  batchMoveFoldersToSpace?: Maybe<BatchMoveFoldersToSpaceResponse>;
  /** This is an overwrite operation that will share each video to the list of spaces, first removing videos from all existing spaces. */
  batchShareVideosToSpaces?: Maybe<BatchShareVideosToSpacesResponse>;
  blacklistSdkPrivateKey?: Maybe<BlacklistSdkPrivateKeyResponse>;
  bulkDeleteFolders?: Maybe<BulkDeleteFoldersResponse>;
  bulkDeleteVideos?: Maybe<BulkDeleteVideosResponse>;
  /** Move folders */
  bulkMoveFolders?: Maybe<BulkMoveFoldersResponse>;
  /** Move videos */
  bulkMoveVideos?: Maybe<BulkMoveVideosResponse>;
  bulkSetUpNewSdkPartners?: Maybe<BulkSetUpNewSdkPartnersResponse>;
  bulkTrimClips?: Maybe<BulkTrimClipsResponse>;
  bulkUndoTrim?: Maybe<BulkUndoTrimResponse>;
  /** Delete a pending membership role downgrade request and adjust subscription */
  cancelMembershipRoleDowngradeRequest?: Maybe<CancelMembershipRoleDowngradeRequestResponse>;
  cancelPendingDeletion?: Maybe<CancelPendingDeletionResponse>;
  cancelScheduledDowngrade?: Maybe<UpdateOrganizationResponse>;
  changeInviteRole?: Maybe<Scalars['Boolean']['output']>;
  claimCalendarMeeting?: Maybe<ClaimCalendarMeetingResponse>;
  claimCalendarMeetingRecording?: Maybe<ClaimCalendarMeetingRecordingResponse>;
  clearCacheForSDKPartner?: Maybe<ClearCacheForSdkPartnerResponse>;
  /**
   *
   *       Marks the specified checklist item as complete for the user
   *
   */
  completeGettingStartedChecklistItem?: Maybe<CompleteGettingStartedChecklistItemResponse>;
  completeScreenshot?: Maybe<Screenshot>;
  completeVideo?: Maybe<Scalars['Boolean']['output']>;
  completeVideoFileUpload?: Maybe<RegularUserVideo>;
  contactSales?: Maybe<Scalars['Boolean']['output']>;
  contactSupport?: Maybe<Scalars['Boolean']['output']>;
  create: ScreenshotWithS3Credentials;
  createAnonPartnerSessionRecordingCache?: Maybe<CreateAnonPartnerSessionRecordingCacheResponse>;
  createAnonRecordingCache: CreateAnonRecordingCacheResponse;
  /** Creates an automation for a user. */
  createAutomation?: Maybe<CreateAutomationSuccessResponse>;
  createConfluencePage?: Maybe<CreateConfluencePageResponse>;
  createCredentialsForVideoDraftImages?: Maybe<CreateCredentialsForVideoDraftImagesResponse>;
  createDeveloperAccount?: Maybe<CreateDeveloperAccountResponse>;
  /** Creates an image overlay inside of a draft scene */
  createDraftSceneImageOverlay?: Maybe<CreateDraftSceneImageOverlayResponse>;
  /** Create an external API token */
  createExternalAPIToken?: Maybe<CreateExternalApiTokenResponse>;
  /** Create a folder */
  createFolder?: Maybe<CreateFolderResponse>;
  createGeneratedVideoDraft?: Maybe<CreateGeneratedVideoDraftResponse>;
  createGooglePreviewMapping?: Maybe<CreateGooglePreviewMappingResponse>;
  /** Create an incentive for a user in a workspace */
  createIncentive?: Maybe<CreateIncentiveResponse>;
  createIntegrationSubscription?: Maybe<CreateIntegrationSubscriptionResponse>;
  /** create an invite link for users to provide to invitees. The link will allow invitees to be assigned to a specific workspace with a specific user role */
  createInviteLink?: Maybe<CreateInviteLinkResponse>;
  createJiraIssue?: Maybe<CreateJiraIssueResponse>;
  createLinearIssue?: Maybe<CreateLinearIssueResponse>;
  createOrganization?: Maybe<CreateOrganizationResponse>;
  createPhoneticHints?: Maybe<CreatePhoneticHintsResponse>;
  /** Create a referral link for a user */
  createReferralLink?: Maybe<CreateReferralLinkResponse>;
  createScrapedHtmlSignedUploadUrl?: Maybe<CreateScrapedHtmlSignedUploadUrlResponse>;
  createScreenshotUpload?: Maybe<CreateScreenshotUploadResponse>;
  createSdkPrivateKey?: Maybe<CreateSdkPrivateKeyResponse>;
  createSetupIntent?: Maybe<CreateSetupIntentResponse>;
  createSpace?: Maybe<CreateSpaceResponse>;
  createSupportTicket?: Maybe<CreateSupportTicketResponse>;
  createSupportTicketNonLoggedInUser?: Maybe<CreateSupportTicketNonLoggedInUserResponse>;
  /** Creates a test video in the logged in user's default workspace. */
  createTestVideo?: Maybe<CreateTestVideoResponse>;
  /** Create a new transcript correction */
  createTranscriptCorrectionsV2?: Maybe<CreateTranscriptCorrectionsV2Response>;
  createUserWithEmailAndPassword?: Maybe<CreateUserWithEmailAndPasswordResponse>;
  /** Set all of a video's ACL entries, *overwriting all existing ACL entries*.Clients should use `getVideoAclEntries` to retrieve the existing permissions before calling this mutation. */
  createVideoAclEntries?: Maybe<CreateVideoAclEntriesResponse>;
  createVideoComment?: Maybe<PublicVideoComment>;
  createVideoFileUploadCredentials?: Maybe<S3Credentials>;
  createVideoTask?: Maybe<CreateVideoTaskResponse>;
  /** Create a new video text replacement using TTS */
  createVideoTextReplacement?: Maybe<CreateVideoTextReplacementResponse>;
  createVideoUploadCredentials?: Maybe<S3Credentials>;
  /** Will create a workspace group. */
  createWorkspaceGroup?: Maybe<CreateWorkspaceGroupResponse>;
  ctaClickMediaAnalyticsEvent?: Maybe<Scalars['Boolean']['output']>;
  declineWorkspaceInvitation: DeclineInvitationResult;
  deleteAccount?: Maybe<DeleteAccountResponse>;
  /** Delete an asset by ID */
  deleteAsset?: Maybe<DeleteAssetResponse>;
  /** Deletes a backlink by id */
  deleteBacklink?: Maybe<DeleteBacklinkResponse>;
  deleteCachedSubscriptionData?: Maybe<DeleteCachedSubscriptionDataResponse>;
  deleteComment?: Maybe<Scalars['Boolean']['output']>;
  deleteDraftClips?: Maybe<DeleteDraftClipsResponse>;
  /** Delete an external API token */
  deleteExternalAPIToken?: Maybe<DeleteExternalApiTokenResponse>;
  deleteFavorite?: Maybe<Scalars['Boolean']['output']>;
  /** Delete user's own gmail scope */
  deleteGmailScope?: Maybe<DeleteGmailScopeResponse>;
  /** delete an oauth provider */
  deleteOauthProvider?: Maybe<DeleteOauthProviderResponse>;
  deleteOrganizationMembership?: Maybe<Scalars['Boolean']['output']>;
  deletePhoneticHints?: Maybe<DeletePhoneticHintsResponse>;
  deleteScreenshot?: Maybe<DeleteScreenshotResponse>;
  deleteSdkPrivateKey?: Maybe<DeleteSdkPrivateKeyResponse>;
  deleteSpace?: Maybe<DeleteSpaceResponse>;
  deleteSsoDomainForOrg?: Maybe<DeleteSsoDomainForOrgResponse>;
  /** Delete subscription add-on items from a subscription */
  deleteSubscriptionItem?: Maybe<DeleteSubscriptionItemResponse>;
  /** delete an avatar for a user */
  deleteUserAvatar?: Maybe<DeleteUserAvatarResponse>;
  deleteVideo?: Maybe<Scalars['Boolean']['output']>;
  /** Deletes a single ACL entry */
  deleteVideoAclEntry?: Maybe<DeleteVideoAclEntryResponse>;
  deleteVideoReaction?: Maybe<Scalars['Boolean']['output']>;
  deleteVideoTask?: Maybe<DeleteVideoTaskResponse>;
  /** Delete a TTS video text replacement */
  deleteVideoTextReplacement?: Maybe<DeleteVideoTextReplacementResponse>;
  /** Will delete all contacts in the workspace. */
  deleteWorkspaceContacts?: Maybe<DeleteWorkspaceContactsResponse>;
  /** Will delete a workspace group. */
  deleteWorkspaceGroup?: Maybe<DeleteWorkspaceGroupResponse>;
  deleteWorkspaceMember?: Maybe<DeleteWorkspaceMemberResponse>;
  dequeueBotMessages?: Maybe<DequeueBotMessagesResponse>;
  /** Destroys a user's applied automation. */
  destroyAutomation?: Maybe<DestroyAutomationSuccessResponse>;
  destroyVideo?: Maybe<DestroyVideoResponse>;
  developerAccount?: Maybe<DeveloperAccountResponse>;
  /** disable an invite link */
  disableInviteLink?: Maybe<DisableInviteLinkResponse>;
  disconnectCalendar?: Maybe<DisconnectCalendarResponse>;
  /** Disconnect the user's Jira OAuth connection */
  disconnectJiraConnectionForUser?: Maybe<DisconnectJiraConnectionForUserResponse>;
  /** Disconnect the user's Linear OAuth connection */
  disconnectLinearConnectionForUser?: Maybe<DisconnectLinearConnectionForUserResponse>;
  /** Will disconnect workspace from SFDC integration. */
  disconnectSfdc?: Maybe<DisconnectSfdcResponse>;
  disconnectSlack?: Maybe<DisconnectSlackResponse>;
  disconnectSlackSubscriptionConnectionsForUser?: Maybe<DisconnectSlackSubscriptionConnectionsForUserResponse>;
  downloadClickMediaAnalyticsEvent?: Maybe<Scalars['Boolean']['output']>;
  /** Duplicate a folder */
  duplicateFolder?: Maybe<DuplicateFolderResponse>;
  /** Duplicate a video */
  duplicateVideo?: Maybe<DuplicateVideoResponse>;
  editComment?: Maybe<EditCommentResponse>;
  emitDatadogEvents?: Maybe<EmitDatadogEventsResponse>;
  /** Ends member sessions for a specific workspace */
  endWorkspaceUserSessions?: Maybe<EndWorkspaceUserSessionsResponse>;
  engagementInsightsView?: Maybe<Scalars['String']['output']>;
  /** Finalizes checkout "cart" and returns client secret to collect payment details */
  finalizeCheckout?: Maybe<FinalizeCheckoutResponse>;
  generateDnsVerificationToken?: Maybe<GenerateDnsVerificationTokenResponse>;
  generateSupportChatMessages?: Maybe<GenerateSupportChatMessagesResponse>;
  generateTtsVideos?: Maybe<GenerateTtsVideosResponse>;
  generateVideoForDraft?: Maybe<GenerateVideoForDraftResponse>;
  generateVoiceAudioPreview?: Maybe<GenerateVoiceAudioPreviewResponse>;
  getSessionSyncToken?: Maybe<GetSessionSyncTokenResponse>;
  handleOutgoingBotMessage?: Maybe<BotOutgoingMessageHandlerResponse>;
  /** Will import meeting cloud recordings to loom videos. */
  importMeetingRecordings?: Maybe<ImportMeetingRecordingsResponse>;
  insertClipInVideo?: Maybe<InsertClipInVideoResponse>;
  inviteUsersToOrganization?: Maybe<InviteUsersToOrganizationResponse>;
  issueMetadataExtractionJobForVideo?: Maybe<Scalars['Boolean']['output']>;
  joinSpace?: Maybe<JoinSpaceResponse>;
  leaveSpace?: Maybe<LeaveSpaceResponse>;
  leaveWorkspace?: Maybe<LeaveWorkspaceResponse>;
  logTagClicked?: Maybe<LogTagClickedResponse>;
  logTagViewed?: Maybe<LogTagViewedResponse>;
  loginOrSignupWithGoogleToken?: Maybe<LoginOrSignupWithGoogleTokenResponse>;
  loginUserWithEmailAndPassword?: Maybe<LoginUserWithEmailAndPasswordResponse>;
  logoutUser?: Maybe<Scalars['Boolean']['output']>;
  /** Add subscription add-on items to a subscription */
  loommateAddSubscriptionItems?: Maybe<LoommateAddSubscriptionItemsResponse>;
  /** Attach a Stripe payment source to a customer */
  loommateAttachSource?: Maybe<LoommateAttachSourceResponse>;
  /** Loommate Delete subscription add-on items from a subscription */
  loommateDeleteSubscriptionItems?: Maybe<LoommateDeleteSubscriptionItemsResponse>;
  /** Fall Launch 24 Mutation */
  loommateFallLaunch24?: Maybe<LoommateFallLaunch24Response>;
  /** Loommate pause subscription for a workspace at the end of the current period */
  loommatePauseSubscription?: Maybe<LoommatePauseSubscriptionResponse>;
  /** Loommate Cancels paused subscription schedule */
  loommateReleasePausedSubscription?: Maybe<LoommateReleasePausedSubscriptionResponse>;
  /** Loommate resume a paused subscription */
  loommateResumePausedSubscription?: Maybe<LoommateResumePausedSubscriptionResponse>;
  /** Update Customer Assignment */
  loommateUpdateCustomerAssignment?: Maybe<LoommateUpdateCustomerAssignmentResponse>;
  /** Configure workspace. This is not available in production. */
  loommateWorkspaceConfigure?: Maybe<LoommateWorkspaceConfigureResponse>;
  magicMeetingNotesPageLink?: Maybe<MagicMeetingNotesPageLinkResponse>;
  /** Make a folder public */
  makeFolderPublic?: Maybe<MakeFolderPublicResponse>;
  markNotificationsAsRead?: Maybe<Scalars['Boolean']['output']>;
  markOnboardingCardAsComplete: Scalars['JSON']['output'];
  markOnboardingCardAsDismissed: Scalars['JSON']['output'];
  markSpaceContentAsRead?: Maybe<MarkSpaceContentAsReadResponse>;
  meetingRestoreAutomations?: Maybe<MeetingRestoreAutomationsResponse>;
  /** Loommate tooling to migrate pending items invoice interval */
  migratePendingItemsInvoice?: Maybe<MigratePendingItemsInvoiceResponse>;
  mutateDataRetention?: Maybe<MutateDataRetentionResponse>;
  optInToRenewalChurnRefund?: Maybe<OptInToRenewalChurnRefundResponse>;
  /** Self serve mutation to schedule a subscription to be paused at the end of the current period */
  pauseSubscription?: Maybe<PauseSubscriptionResponse>;
  /** manually pay an invoice */
  payInvoice?: Maybe<PayInvoiceResponse>;
  prepareForEdit?: Maybe<PrepareForEditResponse>;
  /** Process checkout "cart" by attempting to capture the payment */
  processIntentConfirmation?: Maybe<ProcessIntentConfirmationResponse>;
  /** Process the Quantity Smart Sync Store */
  processQuantitySmartSyncStore?: Maybe<ProcessQuantitySmartSyncStoreResponse>;
  /** Provide feedback for edit TTS generation */
  provideEditTTSFeedback?: Maybe<ProvideEditTtsFeedbackResponse>;
  provideTtsFeedback?: Maybe<ProvideTtsFeedbackResponse>;
  recordSDK?: Maybe<RecordSdkResponse>;
  recoverVideo?: Maybe<RecoverVideoResponse>;
  /** Redeem an incentive for a user in a workspace */
  redeemIncentive?: Maybe<RedeemIncentiveResponse>;
  /** Regenerate an external API token */
  regenerateExternalAPIToken?: Maybe<RegenerateExternalApiTokenResponse>;
  regenerateMeetingRecap?: Maybe<RegenerateMeetingRecapResponse>;
  /** reinstate a suspended account */
  reinstateAccount?: Maybe<ReinstateAccountResponse>;
  /** Self serve mutation to release a scheduled paused subscription. Can be called both before and after the subscription is paused. */
  releasePausedSubscription?: Maybe<ReleasePausedSubscriptionResponse>;
  /** Cancels future Subscription Schedule phases and keeps current subscription */
  releaseSubscriptionSchedule?: Maybe<ReleaseSubscriptionScheduleResponse>;
  /** Remove all edit zoom instructions from a video */
  removeAllEditZoomInstructions?: Maybe<RemoveAllEditZoomInstructionsResponse>;
  /** Remove all transcript corrections from a video */
  removeAllTranscriptCorrections?: Maybe<RemoveAllTranscriptCorrectionsResponse>;
  removeClipFromVideo?: Maybe<RemoveClipFromVideoResponse>;
  removeDomainFromWorkspace?: Maybe<RemoveDomainFromWorkspaceResponse>;
  /** Remove a zoom by video id */
  removeEditZoomInstruction?: Maybe<RemoveEditZoomInstructionResponse>;
  removeOrganizationInvites?: Maybe<Scalars['Boolean']['output']>;
  /** Removing parent space from folder permissions */
  removeParentSpaceFromFolderPermissions?: Maybe<RemoveParentSpaceFromFolderPermissionsResponse>;
  /** Remove the background of a screenshot */
  removeScreenshotBackground?: Maybe<RemoveScreenshotBackgroundResponse>;
  removeTagFromVideo?: Maybe<RemoveTagFromVideoResponse>;
  removeTrackingForDuplicateFolder?: Maybe<RemoveTrackingForDuplicateFolderResponse>;
  removeUserFromScreenshotAccess?: Maybe<RemoveUserFromScreenshotAccessResponse>;
  removeUserFromSpace?: Maybe<RemoveUserFromSpaceResponse>;
  /** Removing a user/group from folder permissions */
  removeUserOrGroupFromFolderPermissions?: Maybe<RemoveUserOrGroupFromFolderPermissionsResponse>;
  /** Will remove users from a workspace group. */
  removeUsersFromWorkspaceGroup?: Maybe<RemoveUsersFromWorkspaceGroupResponse>;
  /** Remove the video background */
  removeVideoBackground?: Maybe<RemoveVideoBackgroundResponse>;
  removeVideoFromWatchLaterList?: Maybe<RemoveVideoFromWatchLaterListResponse>;
  removeVideoThumbnail?: Maybe<RemoveVideoThumbnailResponse>;
  removeViewedVideosFromWatchLaterList?: Maybe<RemoveViewedVideosFromWatchLaterListResponse>;
  /** Rename a folder */
  renameFolder?: Maybe<RenameFolderResponse>;
  reorderClipsOnVideo?: Maybe<ReorderClipsOnVideoResponse>;
  requestCustomAccessToPrivateVideo?: Maybe<RequestCustomAccessToPrivateVideoResponse>;
  /** Request to join a workspace. The requesting user must have an email domain matching one of the workspace's domains. */
  requestToJoinWorkspace?: Maybe<RequestToJoinWorkspaceResponse>;
  requestToJoinWorkspaceForVideo?: Maybe<RequestToJoinWorkspaceForVideoResponse>;
  /**
   *
   *         Request to transfer a user's content between workspaces. If the user
   *         is an admin, they can also transfer all the content in the team
   *         library to a different workspace of which the user is a member
   *         and the content will now belong to them.
   *
   */
  requestToTransferContent?: Maybe<RequestToTransferContentResponse>;
  requestToUpgradeWorkspace?: Maybe<RequestToUpgradeWorkspaceResponse>;
  resendOrganizationInvites?: Maybe<ResendOrganizationInvitesResponse>;
  resetDraftToReadyToEdit?: Maybe<ResetDraftToReadyToEditResponse>;
  resetFtuxComponent?: Maybe<ResetFtuxComponentResponse>;
  resolveVideoTask?: Maybe<ResolveVideoTaskResponse>;
  respondToVideoTask?: Maybe<RespondToVideoTaskResponse>;
  restoreComment?: Maybe<Scalars['Boolean']['output']>;
  /** Resume a paused subscription */
  resumePausedSubscription?: Maybe<ResumePausedSubscriptionResponse>;
  retranscribeVideo?: Maybe<RetranscribeVideoResponse>;
  retryPendingScimAction?: Maybe<RetryPendingScimActionResponse>;
  revertAllTranscriptCorrections?: Maybe<RevertTranscriptCorrectionsDetails>;
  revertToOriginal?: Maybe<RevertToOriginalResponse>;
  /**
   *
   *       Keeps onboarding survey results for signups prior to account verification. Currently used
   *       for signups generated by Record A Reply on share page
   *
   */
  saveOnboardingSurveyResponse: SaveOnboardingSurveyResponse;
  /** Update workflow document */
  saveWorkflowDoc?: Maybe<SaveWorkflowDocResponse>;
  /** Self serve downgrade subscription to starter_free at the end of the billing cycle */
  selfServeDowngradeSubscription?: Maybe<SelfServeDowngradeSubscriptionResponse>;
  sendBotAction?: Maybe<SendBotActionResponse>;
  sendDownloadLoomEmail?: Maybe<Scalars['Boolean']['output']>;
  sendEmailVerificationEmail?: Maybe<Scalars['Boolean']['output']>;
  /** Send an email using Gmail. */
  sendGmail?: Maybe<SendGmailResponse>;
  sendGsacSupportTicket?: Maybe<SendGsacSupportTicketResponse>;
  /** Sends an email to the user to manage their email preferences in HubSpot */
  sendManageSubscriptionPreferencesEmail?: Maybe<SendManageSubscriptionPreferencesEmailResponse>;
  sendNotificationsEvent?: Maybe<Scalars['Boolean']['output']>;
  sendPushNotificationReadReceipt?: Maybe<Scalars['Boolean']['output']>;
  sendRecordingEvent?: Maybe<Scalars['Boolean']['output']>;
  sendResetPasswordEmails?: Maybe<Array<Maybe<ResetEmailStatus>>>;
  sendVariablesEmails?: Maybe<SendVariablesEmailsResponse>;
  /** Restore parent folder permissions to the current folder */
  setFolderToInheritPermissions?: Maybe<SetFolderToInheritPermissionsResponse>;
  /** This is an overwrite operation that will replace the privacy of a given space. Only supports making a space more private. */
  setSpaceAclEntries?: Maybe<SetSpaceAclEntriesResponse>;
  /** This operation that will replace the spaces associated to a given group. */
  setSpaceGroupAclEntries?: Maybe<SetSpaceGroupAclEntriesResponse>;
  /** Sets the total number of parts this video is composed of */
  setTotalParts?: Maybe<SetTotalPartsResponse>;
  setUpNewSdkPartner?: Maybe<SetUpNewSdkPartnerResponse>;
  /** Used to set the user and workspace persona during user onboarding */
  setUserPersona?: Maybe<SetUserPersonaResponse>;
  setUserToEducationStatus?: Maybe<Scalars['Boolean']['output']>;
  /** Set all of a video's ACL entries, *overwriting all existing ACL entries*.Clients should use `getVideoAclEntries` to retrieve the existing permissions before calling this mutation. */
  setVideoAclEntries?: Maybe<SetVideoAclEntriesResponse>;
  /** Set all of a video's ACL entries, *overwriting all existing ACL entries*.Clients should use `getVideoAclEntries` to retrieve the existing permissions before calling this mutation. */
  setVideoAndWorkspaceAccess?: Maybe<SetVideoAndWorkspaceAccessResponse>;
  setupExtensionSmokeTestUser?: Maybe<SetupExtensionSmokeTestUserResponse>;
  /** This is an operation that will share a list of videos to a new target Space, not impacting the existing spaces each individual video is a part of */
  shareVideosToSpace?: Maybe<ShareVideosToSpaceResponse>;
  /** @deprecated Use signinOrSignupWithAppleV2 instead */
  signinOrSignupWithApple?: Maybe<SigninOrSignupWithAppleResponse>;
  signinOrSignupWithAppleV2?: Maybe<SigninOrSignupWithAppleV2Response>;
  spawnMeetingBot?: Maybe<SpawnMeetingBotResponse>;
  startNewRecordingSession?: Maybe<RegularUserVideo>;
  submitContactSales?: Maybe<SubmitContactSalesResponse>;
  subscribeBlockedInvitedUserToNotification: Scalars['Boolean']['output'];
  /** suspend an account */
  suspendAccount?: Maybe<SuspendAccountResponse>;
  /** Syncs local email subscription settings with related HubSpot contact */
  syncLocalEmailSettingsToHubspotContact?: Maybe<SyncLocalEmailSettingsToHubspotContactResponse>;
  /** Toggle whether a user follows a profile */
  toggleFollowingProfile?: Maybe<ToggleFollowingProfileResponse>;
  /** Toggle whether a user follows a tag */
  toggleFollowingTag?: Maybe<ToggleFollowingTagResponse>;
  /** Toggle whether a user follows a video */
  toggleFollowingVideo?: Maybe<ToggleFollowingVideoResponse>;
  trackEmailVerificationUserId?: Maybe<TrackEmailVerificationUserIdResponse>;
  transferAdminStatusToAnotherMember?: Maybe<TransferAdminStatusToAnotherMemberResult>;
  triggerTtsForVideos?: Maybe<TriggerTtsForVideosResponse>;
  trimDisfluencies?: Maybe<TrimDisfluenciesResponse>;
  /** Unarchives a space */
  unarchiveSpace?: Maybe<UnarchiveSpaceResponse>;
  /** Undo an enhanced filler word removal using TTS */
  undoFillerWordRemovalTTS?: Maybe<UndoFillerWordRemovalTtsResponse>;
  /** Undo a scheduled cancelation for a subscription add-on item */
  undoPendingAddOnCancelation?: Maybe<UndoPendingAddOnCancelationResponse>;
  /** This is an operation that will unshare a list of videos from an existing Space, not impacting the existing spaces each individual video is a part of */
  unshareVideosFromSpace?: Maybe<UnshareVideosFromSpaceResponse>;
  /** update all notification statuses for the logged in user in the active workspace */
  updateAllNotificationStatuses?: Maybe<UpdateAllNotificationStatusesResponse>;
  updateAllUserDefaultVideoSettingsInGroup?: Maybe<UpdateAllUserDefaultVideoSettingsInGroupResponse>;
  updateAnonRecordingOwnership: UpdateAnonRecordingOwnershipResponse;
  /** Updates display controls for auto-generated comments and reactions */
  updateAutoCommentDisplayControls?: Maybe<UpdateAutoCommentDisplayControlsResponse>;
  /** Will update auto recording setting for meeting. */
  updateAutoRecordMeetingSetting?: Maybe<UpdateAutoRecordMeetingSettingResponse>;
  /** Updates a user's applied automation. */
  updateAutomation?: Maybe<UpdateAutomationSuccessResponse>;
  updateBillingCycle?: Maybe<UpdateOrganizationResponse>;
  updateBillingEmail?: Maybe<UpdateBillingEmailResponse>;
  /** updating the billing source for a workspace */
  updateBillingPaymentSource?: Maybe<UpdateBillingPaymentSourceResponse>;
  updateCalendarMeetingRecord?: Maybe<UpdateCalendarMeetingRecordResponse>;
  updateCalendarMeetingShareSettings?: Maybe<UpdateCalendarMeetingShareSettingsResponse>;
  updateChapters?: Maybe<UpdateChaptersResponse>;
  /** Set user IDs to upgrade and downgrade in the checkout cache */
  updateCheckoutRoleChangeCache?: Maybe<UpdateCheckoutRoleChangeCacheResponse>;
  /** update the cache of chosen members on checkout page */
  updateChosenMembersCache?: Maybe<UpdateChosenMembersCacheResponse>;
  updateConfluenceMeetingNotesLocation?: Maybe<UpdateConfluenceMeetingNotesLocationResponse>;
  /** Update the custom video background */
  updateCustomVideoBackground?: Maybe<UpdateCustomVideoBackgroundResponse>;
  /** updates customer information in Stripe  */
  updateCustomerInformation?: Maybe<UpdateCustomerInformationResponse>;
  /** This mutation allows workspace_admins in enterprise plans to update the data_age_limit for a list of spaces. */
  updateDataAgeLimitForSpaces?: Maybe<UpdateDataAgeLimitForSpacesResponse>;
  updateDefaultMeetingRecordingSettings?: Maybe<UpdateDefaultMeetingRecordingSettingsResponse>;
  /** set the default payment source for a stripe customer */
  updateDefaultPaymentMethod?: Maybe<UpdateDefaultPaymentMethodResponse>;
  updateDefaultSSOUserRole?: Maybe<UpdateDefaultSsoUserRoleResponse>;
  /** @deprecated Use `updateUserVideoSettings` instead */
  updateDefaultVideoSettings?: Maybe<Scalars['Boolean']['output']>;
  /** Updates the dismissed workflow sneakpeek status for a video */
  updateDismissWorkflowSneakpeek?: Maybe<UpdateDismissWorkflowSneakpeekResponse>;
  updateDomainUsersStatus: Scalars['String']['output'];
  /** Update the draft actor */
  updateDraftActor?: Maybe<UpdateDraftActorResponse>;
  /** Updates an image overlay inside of a draft scene */
  updateDraftSceneImageOverlay?: Maybe<UpdateDraftSceneImageOverlayResponse>;
  /** Updates the script of a draft scene */
  updateDraftSceneScript?: Maybe<UpdateDraftSceneScriptResponse>;
  /** Updates a text overlay inside of a draft scene */
  updateDraftSceneTextOverlay?: Maybe<UpdateDraftSceneTextOverlayResponse>;
  /** Update the name of an external API token */
  updateExternalAPIToken?: Maybe<UpdateExternalApiTokenResponse>;
  /** update the visibility of a folder */
  updateFolderVisibility?: Maybe<UpdateFolderVisibilityResponse>;
  /** Update the hex draft background */
  updateHexDraftBackground?: Maybe<UpdateHexDraftBackgroundResponse>;
  /** Update the hex video background */
  updateHexVideoBackground?: Maybe<UpdateHexVideoBackgroundResponse>;
  updateIntegrationSubscription?: Maybe<UpdateIntegrationSubscriptionResponse>;
  updateIntegrationSubscriptionMetadata?: Maybe<UpdateIntegrationSubscriptionMetadataResponse>;
  /** Saves the last watched time for a logged in user */
  updateLastWatchTime?: Maybe<UpdateLastWatchTimeResponse>;
  updateLinkedUserToAtlassianMastered?: Maybe<UpdateLinkedUserToAtlassianMasteredResponse>;
  /** @deprecated Use `updateCalendarMeetingShareSettings` with a `GUID` instead */
  updateMeetingShareSettings?: Maybe<UpdateMeetingShareSettingsResponse>;
  /** Update a member property for a particular workspace */
  updateMemberProperty?: Maybe<UpdateMemberPropertyResponse>;
  updateMemberWorkspaceRole?: Maybe<UpdateMemberWorkspaceRoleResponse>;
  /** Updates the role of one or more members in a workspace. Only admins can update roles. */
  updateMembershipsRole?: Maybe<UpdateMembershipsRoleResponse>;
  updateNotificationSettings?: Maybe<NotificationSettings>;
  updateNotificationSettingsByDeliveryType?: Maybe<NotificationSettings>;
  updateNotificationStatus?: Maybe<Scalars['Boolean']['output']>;
  updateNotificationStatusBulk?: Maybe<Scalars['Boolean']['output']>;
  updateOrganization?: Maybe<Organization>;
  updateOrganizationBrandSettings?: Maybe<Organization>;
  updatePhoneticHints?: Maybe<UpdatePhoneticHintsResponse>;
  /** Update the preset draft background */
  updatePresetDraftBackground?: Maybe<UpdatePresetDraftBackgroundResponse>;
  /** Update the preset video background */
  updatePresetVideoBackground?: Maybe<UpdatePresetVideoBackgroundResponse>;
  updatePushNotificationCredentials?: Maybe<UpdatePushNotificationCredentialsResponse>;
  /** Updates the recording video document type for a video */
  updateRecordingVideoDocumentType?: Maybe<UpdateRecordingVideoDocumentTypeResponse>;
  /** Update a referral link's enabled field */
  updateReferralLinkEnabled?: Maybe<UpdateReferralLinkEnabledResponse>;
  updateScreenshotAnnotations?: Maybe<UpdateScreenshotAnnotationsResponse>;
  updateScreenshotCanvasOverlays?: Maybe<UpdateScreenshotCanvasOverlaysResponse>;
  /** Update the background selection of a screenshot */
  updateScreenshotHexBackground?: Maybe<UpdateScreenshotHexBackgroundResponse>;
  /** Update the background selection of a screenshot */
  updateScreenshotPresetBackground?: Maybe<UpdateScreenshotPresetBackgroundResponse>;
  updateScreenshotPrivacy?: Maybe<UpdateScreenshotPrivacyResponse>;
  /** Update a single source of a screenshot */
  updateScreenshotSource?: Maybe<UpdateScreenshotSourceResponse>;
  updateScreenshotTitle?: Maybe<UpdateScreenshotTitleResponse>;
  updateSelectedWorkspace?: Maybe<UpdateSelectedWorkspaceResponse>;
  /** Will update settings for all occurances of meeting. */
  updateSettingsForAllRecurringMeetings?: Maybe<UpdateSettingsForAllRecurringMeetingsResponse>;
  /** This is an overwrite operation that will replace the name and add users to the given space. */
  updateSpace?: Maybe<UpdateSpaceResponse>;
  updateUserAdmin?: Maybe<RegularUser>;
  /** updates avatars for a user */
  updateUserAvatars?: Maybe<UpdateUserAvatarsResponse>;
  updateUserDefaultWorkspace?: Maybe<UpdateUserDefaultWorkspaceResponse>;
  /** Updates user Email notification preference by its consent subscription key */
  updateUserEmailNotificationPreference?: Maybe<UpdateUserEmailNotificationPreferenceResponse>;
  /** Updating a user’s GMOI consent after displaying checkbox on welcome screen */
  updateUserGMOIConsent?: Maybe<UpdateUserGmoiConsentResponse>;
  updateUserIntegrationSettings?: Maybe<UpdateUserIntegrationSettingsResponse>;
  /** updates persona for a user */
  updateUserPersonaInfo?: Maybe<UpdateUserPersonaInfoResponse>;
  updateUserPinnedVideo?: Maybe<UpdateUserPinnedVideoResponse>;
  /** Update a user specific property */
  updateUserProperty?: Maybe<UpdateUserPropertyResponse>;
  updateUserReachedRecordingLimitChecklistItem: Scalars['Boolean']['output'];
  /** Update the screenshot settings for a user */
  updateUserScreenshotSettings?: Maybe<UpdateUserScreenshotSettingsResponse>;
  /** Update a user specific trigger */
  updateUserTriggerV2?: Maybe<UpdateUserTriggerV2Response>;
  /** Updates UGC data use settings for current user */
  updateUserUgcDataUseSettings?: Maybe<UpdateUserUgcDataUseSettingsResponse>;
  updateUserVideoSettings?: Maybe<UpdateUserVideoSettingsResponse>;
  /** Updates a single ACL entry */
  updateVideoAclEntry?: Maybe<UpdateVideoAclEntryResponse>;
  updateVideoCanvasOverlays?: Maybe<UpdateVideoCanvasOverlaysResponse>;
  updateVideoClips?: Maybe<UpdateVideoClipsResponse>;
  /** This is an operation that will update a videos community posting status. */
  updateVideoCommunityPosting?: Maybe<UpdateVideoCommunityPostingResponse>;
  updateVideoCta?: Maybe<UpdateVideoCtaResponse>;
  /** @deprecated This mutation is deprecated. Use updateVideoDescriptionV2 instead. */
  updateVideoDescription?: Maybe<RegularUserVideo>;
  /** Update a video's description. */
  updateVideoDescriptionV2?: Maybe<UpdateVideoDescriptionV2Response>;
  updateVideoDuration?: Maybe<UpdateVideoDurationResponse>;
  /** Update a video's expiration date in video properties. */
  updateVideoExpirationDate?: Maybe<UpdateVideoExpirationDateResponse>;
  updateVideoGifSettings?: Maybe<RegularUserVideo>;
  updateVideoName?: Maybe<UpdateVideoNameResponse>;
  updateVideoPassword?: Maybe<UpdateVideoPasswordResponse>;
  /** Update the pin status of a video */
  updateVideoPinStatus?: Maybe<UpdateVideoPinStatusResponse>;
  updateVideoPlayInterval?: Maybe<VideoPlayIntervalRes>;
  updateVideoPlaySegment?: Maybe<VideoPlaySegmentRes>;
  updateVideoPlaySegmentV2?: Maybe<UpdateVideoPlaySegmentV2Response>;
  updateVideoPrivacyStatus?: Maybe<UpdateVideoPrivacyStatusResponse>;
  updateVideoSearchEngineIndexing?: Maybe<UpdateVideoSearchEngineIndexingResponse>;
  updateVideoSettings?: Maybe<UpdateVideoSettingsResponse>;
  updateVideoTask?: Maybe<UpdateVideoTaskResponse>;
  updateVideoTranscript?: Maybe<UpdateVideoTranscriptDetails>;
  updateVideoTrimRanges?: Maybe<UpdateVideoTrimRangesResponse>;
  /** Update the visibility of a particular video */
  updateVideoVisibility?: Maybe<UpdateVideoVisibilityResponse>;
  /** Update the visibility of a workflow document to viewers */
  updateWorkflowDocVisibility?: Maybe<UpdateWorkflowDocVisibilityResponse>;
  /** Will update a workspace group. */
  updateWorkspaceGroup?: Maybe<UpdateWorkspaceGroupResponse>;
  /** Will update properties of a workspace group. */
  updateWorkspaceGroupProperties?: Maybe<UpdateWorkspaceGroupPropertiesResponse>;
  updateWorkspaceMemberStatus?: Maybe<UpdateMemberStatusResult>;
  updateWorkspaceMemberStatusAdmin?: Maybe<Scalars['Boolean']['output']>;
  updateWorkspaceSetting?: Maybe<UpdateWorkspaceSettingResponse>;
  /** Updates UGC data use settings for workspace */
  updateWorkspaceUgcDataUseSettings?: Maybe<UpdateWorkspaceUgcDataUseSettingsResponse>;
  validateEmailsCanBeInvitedToOrg?: Maybe<ValidateEmailsCanBeInvitedToOrgResponse>;
  verifyDnsDomain?: Maybe<VerifyDnsDomainResponse>;
  verifyUserEmailFromToken?: Maybe<VerifyUserEmailFromTokenResponse>;
  videoPartUploaded?: Maybe<VideoPartUploadedResponse>;
};


export type MutationRegisterNewPushSubscriptionArgs = {
  activatedLocation: Scalars['String']['input'];
  pushSubscription: Scalars['BasicScalar']['input'];
};


export type MutationToggleUnreadForProfileArgs = {
  hasUnread: Scalars['Boolean']['input'];
  profileId: Scalars['ID']['input'];
};


export type MutationToggleUnreadForTagArgs = {
  hasUnread: Scalars['Boolean']['input'];
  tag: Scalars['String']['input'];
};


export type MutationUpdateUserEmailArgs = {
  email: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  source: Scalars['String']['input'];
};


export type MutationUpdateUserFirstAndLastNameArgs = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type MutationUpdateUserLoomCompanionSettingsForDomainNameArgs = {
  disabledAt?: InputMaybe<Scalars['String']['input']>;
  domainName: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
};


export type MutationUpdateUserLoomCompanionSettingsForMasterSwitchArgs = {
  disabledAt?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
};


export type MutationUpdateUserPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdateUserTriggerArgs = {
  triggers: UpdateUserTriggerInput;
};


export type MutationAcceptInviteLinkInvitationArgs = {
  inviteLinkId: Scalars['ID']['input'];
  isNewUser: Scalars['Boolean']['input'];
};


export type MutationAcceptOrgInviteArgs = {
  token: Scalars['String']['input'];
};


export type MutationAddActiveClipsToVideoArgs = {
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  sourceVideoId: Scalars['ID']['input'];
  trimClipAtEnds?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationAddAssetArgs = {
  s3Id: Scalars['ID']['input'];
  uploadedFileName: Scalars['String']['input'];
};


export type MutationAddAutoZoomsToVideoArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationAddEmailsToEducationWhitelistArgs = {
  allowFreeEmails?: InputMaybe<Scalars['Boolean']['input']>;
  emails: Array<Scalars['String']['input']>;
};


export type MutationAddFavoriteArgs = {
  entities: Array<InputMaybe<FavoriteEntity>>;
};


export type MutationAddOrEditVideoEmailArgs = {
  email: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationAddParentSpaceToFolderPermissionsArgs = {
  folderId: Scalars['ID']['input'];
  spaceId: Scalars['ID']['input'];
};


export type MutationAddSsoDomainForOrgArgs = {
  domain: Scalars['String']['input'];
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  overrideEmail?: InputMaybe<Scalars['String']['input']>;
  verificationType: Scalars['String']['input'];
};


export type MutationAddSubscriptionItemsArgs = {
  addOnTypes: Array<Addon>;
  source?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddTagToVideoArgs = {
  context: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  tag: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationAddUserToScreenshotAccessArgs = {
  screenshotId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddUserToSpaceArgs = {
  spaceIds: Array<Scalars['ID']['input']>;
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationAddUsersOrGroupsToFolderPermissionsArgs = {
  folderId: Scalars['ID']['input'];
  groupIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationAddUsersToWorkspaceGroupArgs = {
  userIds: Array<Scalars['ID']['input']>;
  workspaceGroupId: Scalars['ID']['input'];
};


export type MutationAddVideoClipsArgs = {
  sourceVideoId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationAddVideoReactionArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  reactionType?: InputMaybe<ReactionType>;
  time: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  userName?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationAddVideoToWatchLaterListArgs = {
  minutesFromUTC: Scalars['Int']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationAdminAddMemberToWorkspaceArgs = {
  role: OrgRole;
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminAddMembersToWorkspaceArgs = {
  hidePreviousWorkspace: Scalars['Boolean']['input'];
  membersInfo: Array<ForceAddMembersInfo>;
  moveUserVideos: Scalars['Boolean']['input'];
  resetVideoGroupings: Scalars['Boolean']['input'];
  updateDefaultOrg: Scalars['Boolean']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminAddOrExtendTrialForWorkspaceArgs = {
  customTrialEnd?: InputMaybe<Scalars['Int']['input']>;
  numDays?: InputMaybe<Scalars['Int']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminAddSpaceMembersArgs = {
  spaceId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminAddWorkspaceDomainArgs = {
  autoJoin: Scalars['Boolean']['input'];
  defaultJoinRole?: InputMaybe<OrgRole>;
  domain: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminAddWorkspaceToQuantityJobArgs = {
  workspaceIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminBackfillBillingEntityArgs = {
  externalCustomerId: Scalars['ID']['input'];
  externalSubscriptionId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminBackfillStripeCustomerArgs = {
  externalCustomerId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminBulkAddTagToVideosArgs = {
  organizationId: Scalars['ID']['input'];
  tag: Scalars['String']['input'];
  videoIds: Array<Scalars['String']['input']>;
};


export type MutationAdminBulkBanUsersArgs = {
  userQueries: Array<Scalars['String']['input']>;
};


export type MutationAdminBulkDeleteGroupingsByPrimaryKeyArgs = {
  groupingPrimaryKeys: Array<GroupingPrimaryKey>;
};


export type MutationAdminBulkDeleteSlackMessagesArgs = {
  deleteSlackMessagesRequiredInfo: Array<DeleteSlackMessageRequiredInfo>;
  integrationId: Scalars['ID']['input'];
};


export type MutationAdminBulkImportVideosArgs = {
  designatedWorkspaceAdminEmail: Scalars['String']['input'];
  isMp4Only: Scalars['Boolean']['input'];
  s3Urls: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminBulkMoveFoldersArgs = {
  folderIds: Array<Scalars['String']['input']>;
  sourceUserId: Scalars['Int']['input'];
  sourceWorkspaceId?: InputMaybe<Scalars['Int']['input']>;
  sourceWorkspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
  targetFolderId?: InputMaybe<Scalars['String']['input']>;
  targetSpaceId?: InputMaybe<Scalars['Int']['input']>;
  targetSpaceIdv2?: InputMaybe<Scalars['ID']['input']>;
  targetUserId: Scalars['Int']['input'];
  targetWorkspaceId?: InputMaybe<Scalars['Int']['input']>;
  targetWorkspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminBulkMoveFoldersToSpaceArgs = {
  folderIds: Array<Scalars['String']['input']>;
  targetFolderId?: InputMaybe<Scalars['ID']['input']>;
  targetSpaceId: Scalars['ID']['input'];
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminBulkMoveVideosArgs = {
  sourceUserId: Scalars['Int']['input'];
  sourceWorkspaceId?: InputMaybe<Scalars['Int']['input']>;
  sourceWorkspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
  targetFolderId?: InputMaybe<Scalars['String']['input']>;
  targetSpaceId?: InputMaybe<Scalars['Int']['input']>;
  targetSpaceIdv2?: InputMaybe<Scalars['ID']['input']>;
  targetUserId: Scalars['Int']['input'];
  targetWorkspaceId?: InputMaybe<Scalars['Int']['input']>;
  targetWorkspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
  videoIds: Array<Scalars['String']['input']>;
};


export type MutationAdminBulkMoveVideosToSpaceArgs = {
  targetFolderId?: InputMaybe<Scalars['ID']['input']>;
  targetSpaceId: Scalars['ID']['input'];
  videoIds: Array<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminBulkOverridePlaybackSourceArgs = {
  mimeType?: InputMaybe<Scalars['String']['input']>;
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminBulkShareVideosToSpaceArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  organizationId: Scalars['ID']['input'];
  spaceId: Scalars['ID']['input'];
  videoIds: Array<Scalars['String']['input']>;
};


export type MutationAdminBulkTransferVideosToUserArgs = {
  userId: Scalars['ID']['input'];
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminCacheWorkosOrgDomainsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminCancelPendingDowngradeArgs = {
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminCancelSubscriptionForWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminChangeSpacesStateArgs = {
  spaceIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminChangeUserEmailArgs = {
  email: Scalars['String']['input'];
  newEmail: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAdminConvertVideoToV6Args = {
  videoId: Scalars['ID']['input'];
};


export type MutationAdminDeleteAllSessionsForUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAdminDeleteSessionForUserArgs = {
  sessionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAdminDeleteUserArgs = {
  userQuery: Scalars['String']['input'];
};


export type MutationAdminDeleteWorkspaceMemberArgs = {
  userQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminDisconnectSlackSubscriptionConnectionByIdArgs = {
  userConnectionId: Scalars['ID']['input'];
};


export type MutationAdminDispatchStreamHubMessageArgs = {
  message: Scalars['String']['input'];
  queue: StreamHubConsumerQueue;
};


export type MutationAdminEmitEventArgs = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  delay?: InputMaybe<Scalars['Int']['input']>;
  exchange: Scalars['String']['input'];
  routingKey: Scalars['String']['input'];
};


export type MutationAdminEndTrialForWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminForceAtlassianMasterUsersArgs = {
  userInput: Array<AdminForceAtlassianMasterUsersInput>;
};


export type MutationAdminForceTriggerDataRetentionArgs = {
  triggerAt: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};


export type MutationAdminHideWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminInvalidatJitCdnCacheArgs = {
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminMarkInvoiceAsPaidArgs = {
  invoiceId: Scalars['ID']['input'];
};


export type MutationAdminMigrateContentToReactivatedPersonalWorkspaceArgs = {
  teamWorkspaceId: Scalars['ID']['input'];
  userQuery: Scalars['String']['input'];
};


export type MutationAdminOverrideDisableJitArgs = {
  disableJit?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationAdminOverrideLimitsArgs = {
  limitType?: Scalars['String']['input'];
  newLimitValue: Scalars['Int']['input'];
  updateAllUsers: Scalars['Boolean']['input'];
  userQueries?: InputMaybe<Array<Scalars['String']['input']>>;
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminOverridePlaybackSourceArgs = {
  mimeType?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationAdminOverrideSubscriptionArgs = {
  billingCycleCadence: BillingCadenceType;
  billingTerms: Scalars['Int']['input'];
  contractEndDate: Scalars['String']['input'];
  contractStartDate: Scalars['String']['input'];
  minSeatQuantity: Scalars['Int']['input'];
  netTerms: Scalars['Int']['input'];
  nextBillingDate: Scalars['String']['input'];
  priceAIAddOn?: InputMaybe<Scalars['Int']['input']>;
  pricePerSeat: Scalars['Int']['input'];
  productType: Scalars['String']['input'];
  stripeCustomerId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminPopulateSearchIndexArgs = {
  modelTypes: Array<SearchModelType>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminPurgeConnectionIdCacheArgs = {
  domain: Scalars['String']['input'];
};


export type MutationAdminReconcileWorkspaceMembershipArgs = {
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminRecreateUserGroupingsArgs = {
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminRecreateVideoGroupingsArgs = {
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminRegenerateAutoContextArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationAdminRemoveSpaceMembersArgs = {
  memberIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminRemoveWorkspaceDomainArgs = {
  domain: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminRepairOverlaysArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationAdminRequestToTransferContentArgs = {
  fromWorkspaceId: Scalars['ID']['input'];
  toWorkspaceId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAdminResetModelCacheArgs = {
  model: Scalars['String']['input'];
  modelIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminResetUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAdminRunTranscodeJobArgs = {
  jobType: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  priority: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationAdminStartSiteEntityMigrationArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminSubmitBackgroundUserMigrationJobArgs = {
  context: Array<BackgroundUserMigrationInput>;
};


export type MutationAdminSubmitLegacyUserMigrationArgs = {
  context: Array<LegacyUserMigrationInput>;
};


export type MutationAdminSubmitStripeEventArgs = {
  eventId: Scalars['String']['input'];
};


export type MutationAdminSyncAtlassianWorkspaceGroupsArgs = {
  forceSyncGroupMembers: Scalars['Boolean']['input'];
  siteId: Scalars['String']['input'];
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminSyncBillingEntityArgs = {
  externalCustomerId: Scalars['ID']['input'];
  externalSubscriptionId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminSyncWorkosGroupsArgs = {
  workosGroupIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminSyncWorkosGroupsByDirectoryArgs = {
  directoryId: Scalars['ID']['input'];
};


export type MutationAdminSyncWorkosUsersArgs = {
  emails: Array<Scalars['String']['input']>;
};


export type MutationAdminSyncWorkosUsersByDirectoryArgs = {
  directoryId: Scalars['ID']['input'];
};


export type MutationAdminToggleAutoJoinArgs = {
  domain: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminToggleWorkspaceConsolidationArgs = {
  domain: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminTriggerScheduledDowngradeForWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUnhideWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateCouponArgs = {
  couponId?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateFolderArgs = {
  input: AdminUpdateFolderInput;
};


export type MutationAdminUpdateMemberPropertyArgs = {
  name: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  value: Scalars['BasicScalar']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateMemberWorkspaceRoleArgs = {
  processImmediately: Scalars['Boolean']['input'];
  role: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateMembersRoleArgs = {
  data: Array<UpdateMemberRolememberRoleUpdateEntry>;
};


export type MutationAdminUpdateMinimumSeatQuantityArgs = {
  minimumSeatQuantity: Scalars['Int']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdatePromptOverridesArgs = {
  promptOverrides?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationAdminUpdateReferralLinkEnabledArgs = {
  enabled: Scalars['Boolean']['input'];
  inviterQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateSalesSupportTypeArgs = {
  salesSupportType: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateUserDefaultWorkspaceArgs = {
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateUserPropertyArgs = {
  name: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  value: Scalars['BasicScalar']['input'];
};


export type MutationAdminUpdateUserStatusArgs = {
  newUserStatus: UserStatusEnum;
  userId: Scalars['ID']['input'];
};


export type MutationAdminUpdateVideoPrivacyArgs = {
  privacy: AdminVideoPrivacyType;
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationAdminUpdateWorkspaceAtlassianFieldsArgs = {
  activationId: Scalars['String']['input'];
  siteId: Scalars['String']['input'];
  status?: InputMaybe<WorkspaceAtlassianProvisioningStatus>;
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAdminUpdateWorkspaceCustomerArgs = {
  externalCustomerId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateWorkspacePlanArgs = {
  isYearly?: InputMaybe<Scalars['Boolean']['input']>;
  plan: WorkspacePlan;
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateWorkspaceSettingArgs = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminUpdateWorkspaceTierArgs = {
  updatedTier: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdminVerifyUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAdvanceTestClockArgs = {
  advanceToDate: Scalars['Int']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationAdvancedAiMeetingNotesPageLinkArgs = {
  input: AdvancedAiMeetingNotesPageLinkInput;
};


export type MutationApplyFillerWordRemovalTtsArgs = {
  input: ApplyFillerWordRemovalTtsInput;
};


export type MutationApplyVideoLimitOverrideArgs = {
  additionalVideoAmount: Scalars['Int']['input'];
  userQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationApproveAutoCtaArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationApproveVideoTaskArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationArchiveFoldersArgs = {
  folderIds: Array<Scalars['ID']['input']>;
  isArchived: Scalars['Boolean']['input'];
};


export type MutationArchiveSpaceArgs = {
  spaceId: Scalars['ID']['input'];
};


export type MutationArchiveVideosArgs = {
  isArchived: Scalars['Boolean']['input'];
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationAutomationRestoreDefaultsArgs = {
  appliedAutomationGuid: Scalars['ID']['input'];
};


export type MutationBatchMoveFoldersToLibraryArgs = {
  folderIds: Array<Scalars['ID']['input']>;
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  spaceId: Scalars['ID']['input'];
};


export type MutationBatchMoveFoldersToSpaceArgs = {
  folderIds: Array<Scalars['ID']['input']>;
  fromSpaceId: Scalars['ID']['input'];
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  toSpaceId: Scalars['ID']['input'];
};


export type MutationBatchShareVideosToSpacesArgs = {
  spaceIds: Array<Scalars['ID']['input']>;
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationBlacklistSdkPrivateKeyArgs = {
  applicationId?: InputMaybe<Scalars['ID']['input']>;
  keyHash?: InputMaybe<Scalars['String']['input']>;
  shouldBlacklist?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationBulkDeleteFoldersArgs = {
  folderIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationBulkDeleteVideosArgs = {
  videoIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationBulkMoveFoldersArgs = {
  folderIds: Array<Scalars['ID']['input']>;
  newParentFolderId?: InputMaybe<Scalars['ID']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationBulkMoveVideosArgs = {
  newParentFolderId?: InputMaybe<Scalars['ID']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  videoIds: Array<Scalars['ID']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationBulkSetUpNewSdkPartnersArgs = {
  integrationId: Scalars['ID']['input'];
  partnerInfo: Array<SdkPartnerInfoInput>;
};


export type MutationBulkTrimClipsArgs = {
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  includeFillers?: Scalars['Boolean']['input'];
  includeSilences?: Scalars['Boolean']['input'];
  lastTrimId: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationBulkUndoTrimArgs = {
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  includeFillerWordsPlus?: InputMaybe<Scalars['Boolean']['input']>;
  includeFillers?: Scalars['Boolean']['input'];
  includeSilences?: Scalars['Boolean']['input'];
  lastTrimId: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationCancelMembershipRoleDowngradeRequestArgs = {
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationCancelScheduledDowngradeArgs = {
  cancelAtPeriodEnd?: InputMaybe<Scalars['Boolean']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationChangeInviteRoleArgs = {
  id: Scalars['ID']['input'];
  role: Scalars['String']['input'];
};


export type MutationClaimCalendarMeetingArgs = {
  calendarMeetingGuid: Scalars['ID']['input'];
};


export type MutationClaimCalendarMeetingRecordingArgs = {
  calendarMeetingId: Scalars['ID']['input'];
};


export type MutationClearCacheForSdkPartnerArgs = {
  integrationSubscriptionId: Scalars['ID']['input'];
};


export type MutationCompleteGettingStartedChecklistItemArgs = {
  checklistItem: ChecklistItem;
};


export type MutationCompleteScreenshotArgs = {
  id: Scalars['String']['input'];
  source: Scalars['String']['input'];
};


export type MutationCompleteVideoArgs = {
  id: Scalars['ID']['input'];
  videoProperties?: InputMaybe<InputVideoProperties>;
};


export type MutationCompleteVideoFileUploadArgs = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['String']['input']>;
  keyPath: Scalars['String']['input'];
  spaceId?: InputMaybe<Scalars['String']['input']>;
  videoProperties: InputVideoProperties;
};


export type MutationContactSalesArgs = {
  company: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  numberOfEmployees: Scalars['String']['input'];
  planType: Scalars['String']['input'];
};


export type MutationContactSupportArgs = {
  message: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};


export type MutationCreateArgs = {
  imageProperties: InputImageProperties;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAnonPartnerSessionRecordingCacheArgs = {
  videoId: Scalars['String']['input'];
};


export type MutationCreateAnonRecordingCacheArgs = {
  addReplyId?: InputMaybe<Scalars['String']['input']>;
  repliedToVideoId: Scalars['String']['input'];
  replyVideoId: Scalars['String']['input'];
  videoCurrentTime?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationCreateAutomationArgs = {
  automation: AutomationCreateInput;
};


export type MutationCreateConfluencePageArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  template: WorkflowTemplateType;
  videoId: Scalars['ID']['input'];
};


export type MutationCreateCredentialsForVideoDraftImagesArgs = {
  draftUploadId: Scalars['ID']['input'];
};


export type MutationCreateDeveloperAccountArgs = {
  sdkApiKey?: InputMaybe<SdkApiKeyInput>;
};


export type MutationCreateDraftSceneImageOverlayArgs = {
  draftSceneId: Scalars['ID']['input'];
  position?: InputMaybe<OverlayPositionInput>;
  srcUrl: Scalars['String']['input'];
};


export type MutationCreateExternalApiTokenArgs = {
  name: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['String']['input']>;
  spaceId?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<FolderVisibilityType>;
};


export type MutationCreateGeneratedVideoDraftArgs = {
  content: Scalars['String']['input'];
  sourceType: GenerateVideoSourceType;
  videoDurationBounds?: InputMaybe<VideoDurationBoundsInput>;
};


export type MutationCreateGooglePreviewMappingArgs = {
  googleUserIdAlias: Scalars['String']['input'];
};


export type MutationCreateIncentiveArgs = {
  inviteId: Scalars['ID']['input'];
  inviteType: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationCreateIntegrationSubscriptionArgs = {
  integrationId?: InputMaybe<Scalars['ID']['input']>;
  metadata: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationCreateInviteLinkArgs = {
  input: CreateInviteLinkInput;
};


export type MutationCreateJiraIssueArgs = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  issueTypeId: Scalars['String']['input'];
  jiraSiteId: Scalars['String']['input'];
  priorityTypeId?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationCreateLinearIssueArgs = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateOrganizationArgs = {
  assignUser?: InputMaybe<Scalars['Boolean']['input']>;
  autoJoinEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  creationMethod?: InputMaybe<Scalars['String']['input']>;
  defaultJoinRole?: InputMaybe<OrgRole>;
  description?: InputMaybe<Scalars['String']['input']>;
  isUserDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  setAsSelectedWorkspace?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  useHiddenWorkspaceIfPresent?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePhoneticHintsArgs = {
  entityId?: InputMaybe<Scalars['Int']['input']>;
  entityIdv2?: InputMaybe<Scalars['ID']['input']>;
  hints?: InputMaybe<Scalars['String']['input']>;
  scope: Scalars['String']['input'];
  wordOrPhrase: Scalars['String']['input'];
};


export type MutationCreateScrapedHtmlSignedUploadUrlArgs = {
  uploadId: Scalars['ID']['input'];
};


export type MutationCreateScreenshotUploadArgs = {
  screenshotId: Scalars['ID']['input'];
};


export type MutationCreateSdkPrivateKeyArgs = {
  applicationId: Scalars['String']['input'];
  developerAccountId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateSetupIntentArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSpaceArgs = {
  analyticsSource?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  privacy?: InputMaybe<SpacePrivacy>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationCreateSupportTicketArgs = {
  category: Scalars['String']['input'];
  chatHistory?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['ID']['input']>;
  issue?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  permissionToImpersonate: Scalars['Boolean']['input'];
  platform?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  userLocale: Scalars['String']['input'];
  userTimezoneOffset?: InputMaybe<Scalars['Int']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSupportTicketNonLoggedInUserArgs = {
  category: Scalars['String']['input'];
  chatHistory?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  issue?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  permissionToImpersonate: Scalars['Boolean']['input'];
  platform?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  userLocale: Scalars['String']['input'];
  userTimezoneOffset?: InputMaybe<Scalars['Int']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTestVideoArgs = {
  cta?: InputMaybe<Scalars['Boolean']['input']>;
  duration: Scalars['Int']['input'];
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateTranscriptCorrectionsV2Args = {
  input: CreateTranscriptCorrectionsV2Input;
};


export type MutationCreateUserWithEmailAndPasswordArgs = {
  anonId?: InputMaybe<Scalars['String']['input']>;
  appSource?: InputMaybe<Scalars['String']['input']>;
  deviceId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  referrerPartnerId?: InputMaybe<Scalars['ID']['input']>;
  termsAccepted: Scalars['Boolean']['input'];
};


export type MutationCreateVideoAclEntriesArgs = {
  notificationText?: InputMaybe<Scalars['String']['input']>;
  peopleAccess?: InputMaybe<Array<InputMaybe<VideoAclEntryPersonInput>>>;
  sendVideoShareNotification: Scalars['Boolean']['input'];
  shareVideoEmailsSentViaPersonalESP?: InputMaybe<Scalars['Boolean']['input']>;
  spaceAccess?: InputMaybe<Array<InputMaybe<VideoAclEntrySpaceInput>>>;
  videoId: Scalars['ID']['input'];
};


export type MutationCreateVideoCommentArgs = {
  anonUserName?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  extendedReaction?: InputMaybe<Scalars['String']['input']>;
  mentions?: InputMaybe<VideoCommentContentMentionsInput>;
  parentPostId?: InputMaybe<Scalars['Int']['input']>;
  parentPostIdV2?: InputMaybe<Scalars['ID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  timestamp: Scalars['Int']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationCreateVideoFileUploadCredentialsArgs = {
  bucketVersion?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateVideoTaskArgs = {
  content: Scalars['String']['input'];
  timestamp: Scalars['Int']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationCreateVideoTextReplacementArgs = {
  selectionLowerMs: Scalars['Float']['input'];
  selectionReplacementText: Scalars['String']['input'];
  selectionUpperMs: Scalars['Float']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationCreateVideoUploadCredentialsArgs = {
  bucketVersion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationCreateWorkspaceGroupArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  groupProperties?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  source: WorkspaceGroupMemberSource;
  spaceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  userIds: Array<Scalars['ID']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationCtaClickMediaAnalyticsEventArgs = {
  anonName?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationDeclineWorkspaceInvitationArgs = {
  inviteId: Scalars['ID']['input'];
};


export type MutationDeleteAssetArgs = {
  assetId: Scalars['ID']['input'];
};


export type MutationDeleteBacklinkArgs = {
  backlinkId: Scalars['ID']['input'];
};


export type MutationDeleteCachedSubscriptionDataArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  type: PublicVideoCommentType;
};


export type MutationDeleteDraftClipsArgs = {
  rootVideoId: Scalars['ID']['input'];
};


export type MutationDeleteExternalApiTokenArgs = {
  tokenId: Scalars['String']['input'];
};


export type MutationDeleteFavoriteArgs = {
  entities: Array<InputMaybe<FavoriteEntity>>;
};


export type MutationDeleteOauthProviderArgs = {
  oAuthProvider: Scalars['String']['input'];
};


export type MutationDeleteOrganizationMembershipArgs = {
  organizationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeletePhoneticHintsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteScreenshotArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSdkPrivateKeyArgs = {
  applicationId: Scalars['String']['input'];
  developerAccountId?: InputMaybe<Scalars['ID']['input']>;
  keyHash: Scalars['String']['input'];
};


export type MutationDeleteSpaceArgs = {
  analyticsSource?: InputMaybe<Scalars['String']['input']>;
  spaceIds: Array<Scalars['ID']['input']>;
};


export type MutationDeleteSsoDomainForOrgArgs = {
  domain: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  status: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteSubscriptionItemArgs = {
  addOnTypes: Array<Addon>;
};


export type MutationDeleteUserAvatarArgs = {
  filename: Scalars['String']['input'];
};


export type MutationDeleteVideoArgs = {
  id: Scalars['ID']['input'];
  videoProperties?: InputMaybe<InputVideoProperties>;
};


export type MutationDeleteVideoAclEntryArgs = {
  entryId: Scalars['ID']['input'];
  entryType: VideoAclEntryType;
  videoId: Scalars['ID']['input'];
};


export type MutationDeleteVideoReactionArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  reactionId: Scalars['ID']['input'];
};


export type MutationDeleteVideoTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVideoTextReplacementArgs = {
  videoId: Scalars['ID']['input'];
  videoTextReplacementId: Scalars['ID']['input'];
};


export type MutationDeleteWorkspaceContactsArgs = {
  source?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationDeleteWorkspaceGroupArgs = {
  workspaceGroupIds: Array<Scalars['ID']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationDeleteWorkspaceMemberArgs = {
  keepPublishedContent: Scalars['Boolean']['input'];
  keepSharedContent: Scalars['Boolean']['input'];
  keepTeamContent: Scalars['Boolean']['input'];
  keepUnpublishedContent: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationDequeueBotMessagesArgs = {
  meetingBotExternalId: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
};


export type MutationDestroyAutomationArgs = {
  automation: AutomationDestroyInput;
};


export type MutationDestroyVideoArgs = {
  videoId: Scalars['ID']['input'];
  videoProperties?: InputMaybe<InputVideoProperties>;
};


export type MutationDeveloperAccountArgs = {
  developerAccountId: Scalars['ID']['input'];
};


export type MutationDisableInviteLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisconnectCalendarArgs = {
  integrationType: Scalars['String']['input'];
};


export type MutationDisconnectSlackArgs = {
  integrationSubscriptionId: Scalars['ID']['input'];
};


export type MutationDownloadClickMediaAnalyticsEventArgs = {
  sessionId?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationDuplicateFolderArgs = {
  folderId: Scalars['ID']['input'];
  newName: Scalars['String']['input'];
  spaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDuplicateVideoArgs = {
  newName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationEditCommentArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  mentions?: InputMaybe<VideoCommentContentMentionsInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  type: PublicVideoCommentType;
  videoId: Scalars['ID']['input'];
};


export type MutationEmitDatadogEventsArgs = {
  distribution?: InputMaybe<Array<DatadogDistributionInput>>;
  gauge?: InputMaybe<Array<DatadogGuageInput>>;
  histogram?: InputMaybe<Array<DatadogHistogramInput>>;
  increment?: InputMaybe<Array<DatadogIncrementInput>>;
};


export type MutationEndWorkspaceUserSessionsArgs = {
  workspaceID: Scalars['ID']['input'];
};


export type MutationEngagementInsightsViewArgs = {
  event?: InputMaybe<ViewEvent>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFinalizeCheckoutArgs = {
  addOnTypes?: InputMaybe<Array<Addon>>;
  annually: Scalars['Boolean']['input'];
  coupon?: InputMaybe<Scalars['String']['input']>;
  downgradeMemberUserIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  upgradeMemberUserIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationGenerateDnsVerificationTokenArgs = {
  domain: Scalars['String']['input'];
};


export type MutationGenerateSupportChatMessagesArgs = {
  context: Array<SupportChatMessageInput>;
};


export type MutationGenerateTtsVideosArgs = {
  audioVariableIds: Array<Array<Scalars['ID']['input']>>;
  editedVideoName?: InputMaybe<Scalars['String']['input']>;
  totalVideosPreviewed?: InputMaybe<Scalars['Int']['input']>;
  variableVideoProperties?: InputMaybe<Array<InputMaybe<VariableVideoProperties>>>;
  videoId: Scalars['ID']['input'];
  wordToReplace: Scalars['String']['input'];
};


export type MutationGenerateVideoForDraftArgs = {
  videoDraftId: Scalars['ID']['input'];
};


export type MutationGenerateVoiceAudioPreviewArgs = {
  input: GenerateVoiceAudioPreviewInput;
};


export type MutationHandleOutgoingBotMessageArgs = {
  context: BotOutgoingMessageHandlerInput;
};


export type MutationImportMeetingRecordingsArgs = {
  meetings: Array<UnsyncedMeetingInput>;
};


export type MutationInsertClipInVideoArgs = {
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  sourceVideoId: Scalars['ID']['input'];
  timestamp: Scalars['Int']['input'];
  trimClipAtEnds?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationInviteUsersToOrganizationArgs = {
  analyticsLinkingId: Scalars['ID']['input'];
  excludeLimits?: InputMaybe<Scalars['Boolean']['input']>;
  inviteCustomMessage?: InputMaybe<Scalars['String']['input']>;
  inviteData: Array<InputMaybe<InviteOrgUserData>>;
  inviteLoomId?: InputMaybe<Scalars['String']['input']>;
  inviteSource?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['ID']['input'];
};


export type MutationIssueMetadataExtractionJobForVideoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationJoinSpaceArgs = {
  analyticsSource?: InputMaybe<Scalars['String']['input']>;
  spaceId: Scalars['ID']['input'];
};


export type MutationLeaveSpaceArgs = {
  analyticsSource?: InputMaybe<Scalars['String']['input']>;
  spaceId: Scalars['ID']['input'];
};


export type MutationLeaveWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationLogTagClickedArgs = {
  context: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};


export type MutationLogTagViewedArgs = {
  tag: Scalars['String']['input'];
};


export type MutationLoginOrSignupWithGoogleTokenArgs = {
  acceptedTerms: Scalars['Boolean']['input'];
  googleToken: Scalars['ID']['input'];
};


export type MutationLoginUserWithEmailAndPasswordArgs = {
  app_source?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoommateAddSubscriptionItemsArgs = {
  addOnTypes: Array<Addon>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationLoommateAttachSourceArgs = {
  source: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationLoommateDeleteSubscriptionItemsArgs = {
  addOnTypes: Array<Addon>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationLoommateFallLaunch24Args = {
  deprovision: Array<Scalars['ID']['input']>;
  provision: Array<Scalars['ID']['input']>;
  trialDays?: Scalars['Int']['input'];
};


export type MutationLoommatePauseSubscriptionArgs = {
  months?: Scalars['Int']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationLoommateReleasePausedSubscriptionArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationLoommateResumePausedSubscriptionArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationLoommateUpdateCustomerAssignmentArgs = {
  third_tier_assignment?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoommateWorkspaceConfigureArgs = {
  add_ons: AddOnEnabled;
  base_plan: WorkspacePlan;
  domain: Scalars['String']['input'];
  name: Scalars['String']['input'];
  trialing: Scalars['Boolean']['input'];
  use_test_clock: Scalars['Boolean']['input'];
  users: RoleCountObject;
};


export type MutationMagicMeetingNotesPageLinkArgs = {
  meetingId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationMakeFolderPublicArgs = {
  folderId: Scalars['ID']['input'];
  makePublic: Scalars['Boolean']['input'];
};


export type MutationMarkNotificationsAsReadArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationMarkOnboardingCardAsCompleteArgs = {
  cardKey: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationMarkOnboardingCardAsDismissedArgs = {
  cardKey: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationMarkSpaceContentAsReadArgs = {
  spaceId: Scalars['ID']['input'];
};


export type MutationMeetingRestoreAutomationsArgs = {
  meetingId: Scalars['ID']['input'];
  timeZone: Scalars['String']['input'];
};


export type MutationMigratePendingItemsInvoiceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationMutateDataRetentionArgs = {
  enabled: Scalars['Boolean']['input'];
  interval?: InputMaybe<DataRetentionInterval>;
  intervalCount?: InputMaybe<Scalars['Int']['input']>;
  keep?: InputMaybe<Array<DataRetentionKeep>>;
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPauseSubscriptionArgs = {
  months?: Scalars['Int']['input'];
};


export type MutationPayInvoiceArgs = {
  idempotencyKey: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
  paymentMethodId: Scalars['ID']['input'];
};


export type MutationPrepareForEditArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationProcessIntentConfirmationArgs = {
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  intentId: Scalars['String']['input'];
};


export type MutationProcessQuantitySmartSyncStoreArgs = {
  input: UpdateSmartSyncStoreInput;
};


export type MutationProvideEditTtsFeedbackArgs = {
  input: ProvideEditTtsFeedbackInput;
};


export type MutationProvideTtsFeedbackArgs = {
  additionalOptions?: InputMaybe<TtsFeedbackAdditionalOptions>;
  audioVariableIds: Array<Scalars['ID']['input']>;
  feedbackType: TtsFeedbackType;
  videoId: Scalars['ID']['input'];
};


export type MutationRecoverVideoArgs = {
  force: Scalars['Boolean']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationRedeemIncentiveArgs = {
  incentiveAction: Scalars['String']['input'];
  incentiveId: Scalars['ID']['input'];
  inviteType: Scalars['String']['input'];
  inviteeEmail: Scalars['ID']['input'];
  userQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationRegenerateExternalApiTokenArgs = {
  tokenId: Scalars['String']['input'];
};


export type MutationRegenerateMeetingRecapArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
  meetingType: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationReinstateAccountArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationRemoveAllEditZoomInstructionsArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationRemoveAllTranscriptCorrectionsArgs = {
  input: RemoveAllTranscriptCorrectionsInput;
};


export type MutationRemoveClipFromVideoArgs = {
  clipId: Scalars['ID']['input'];
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationRemoveDomainFromWorkspaceArgs = {
  domain: Scalars['String']['input'];
  verificationType?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveEditZoomInstructionArgs = {
  input: RemoveEditZoomInstructionInput;
};


export type MutationRemoveOrganizationInvitesArgs = {
  inviteIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationRemoveParentSpaceFromFolderPermissionsArgs = {
  folderId: Scalars['ID']['input'];
  spaceId: Scalars['ID']['input'];
};


export type MutationRemoveScreenshotBackgroundArgs = {
  screenshotId: Scalars['ID']['input'];
};


export type MutationRemoveTagFromVideoArgs = {
  context: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  tag: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationRemoveTrackingForDuplicateFolderArgs = {
  folderId: Scalars['ID']['input'];
};


export type MutationRemoveUserFromScreenshotAccessArgs = {
  screenshotId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveUserFromSpaceArgs = {
  spaceId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveUserOrGroupFromFolderPermissionsArgs = {
  folderId: Scalars['ID']['input'];
  groupId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRemoveUsersFromWorkspaceGroupArgs = {
  userIds: Array<Scalars['ID']['input']>;
  workspaceGroupId: Scalars['ID']['input'];
};


export type MutationRemoveVideoBackgroundArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationRemoveVideoFromWatchLaterListArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationRemoveVideoThumbnailArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationRenameFolderArgs = {
  folderId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationReorderClipsOnVideoArgs = {
  clipIds: Array<Scalars['ID']['input']>;
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationRequestCustomAccessToPrivateVideoArgs = {
  videoId: Scalars['ID']['input'];
};


export type MutationRequestToJoinWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationRequestToJoinWorkspaceForVideoArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationRequestToTransferContentArgs = {
  input: RequestToTransferContentInput;
};


export type MutationRequestToUpgradeWorkspaceArgs = {
  requestUpgradeAddOnMessage?: InputMaybe<Scalars['String']['input']>;
  requestUpgradeRoleMessage?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  targetAddOn?: InputMaybe<RequestToUpgradeWorkspaceTargetAddOnType>;
  targetPlan: RequestToUpgradeWorkspaceTargetPlanType;
  targetRole: RequestToUpgradeWorkspaceTargetRoleType;
  upgradeType: RequestToUpgradeWorkspaceUpgradeType;
  workspaceId: Scalars['ID']['input'];
};


export type MutationResendOrganizationInvitesArgs = {
  inviteIds: Array<Scalars['ID']['input']>;
};


export type MutationResetDraftToReadyToEditArgs = {
  videoDraftId: Scalars['ID']['input'];
};


export type MutationResetFtuxComponentArgs = {
  ftux: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationResolveVideoTaskArgs = {
  id: Scalars['ID']['input'];
  resolved: Scalars['Boolean']['input'];
};


export type MutationRespondToVideoTaskArgs = {
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  responded: Scalars['Boolean']['input'];
};


export type MutationRestoreCommentArgs = {
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  type: PublicVideoCommentType;
};


export type MutationRetranscribeVideoArgs = {
  language?: InputMaybe<Language>;
  videoId: Scalars['ID']['input'];
};


export type MutationRevertAllTranscriptCorrectionsArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationRevertToOriginalArgs = {
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId?: InputMaybe<Scalars['ID']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationSaveOnboardingSurveyResponseArgs = {
  surveyResponse?: InputMaybe<OnboardingSurveyResponseInput>;
  userId: Scalars['Int']['input'];
  videoId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveWorkflowDocArgs = {
  documentType: WorkflowTemplateType;
  videoId: Scalars['ID']['input'];
  workflowContent: Scalars['String']['input'];
};


export type MutationSelfServeDowngradeSubscriptionArgs = {
  tier?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendBotActionArgs = {
  input: SendBotActionInput;
};


export type MutationSendDownloadLoomEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendEmailVerificationEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendGmailArgs = {
  body: Scalars['String']['input'];
  recipientEmails: Array<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
};


export type MutationSendGsacSupportTicketArgs = {
  category: Scalars['String']['input'];
  email: Scalars['String']['input'];
  issue: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationSendManageSubscriptionPreferencesEmailArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationSendNotificationsEventArgs = {
  eventName: Scalars['String']['input'];
  notifType?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  videoId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationSendPushNotificationReadReceiptArgs = {
  notificationId: Scalars['ID']['input'];
  platform: Scalars['String']['input'];
};


export type MutationSendRecordingEventArgs = {
  attributes?: InputMaybe<RecordingEventAttributes>;
  eventName: Scalars['String']['input'];
};


export type MutationSendResetPasswordEmailsArgs = {
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationSendVariablesEmailsArgs = {
  body: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  videoInfoList: Array<VideoInfoObject>;
};


export type MutationSetFolderToInheritPermissionsArgs = {
  folderId: Scalars['ID']['input'];
};


export type MutationSetSpaceAclEntriesArgs = {
  privacy?: InputMaybe<SpacePrivacy>;
  spaceIds: Array<Scalars['ID']['input']>;
};


export type MutationSetSpaceGroupAclEntriesArgs = {
  groupId: Scalars['ID']['input'];
  spaceIds: Array<Scalars['ID']['input']>;
};


export type MutationSetTotalPartsArgs = {
  id: Scalars['ID']['input'];
  packets: Scalars['Int']['input'];
  videoProperties?: InputMaybe<InputVideoProperties>;
};


export type MutationSetUpNewSdkPartnerArgs = {
  integrationId?: InputMaybe<Scalars['ID']['input']>;
  metadata: Scalars['String']['input'];
  partnerName: Scalars['String']['input'];
};


export type MutationSetUserPersonaArgs = {
  userPersona: UserPersonaInput;
};


export type MutationSetUserToEducationStatusArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetVideoAclEntriesArgs = {
  input: SetVideoAclEntriesInput;
};


export type MutationSetVideoAndWorkspaceAccessArgs = {
  publicAccess: Scalars['Boolean']['input'];
  videoId: Scalars['ID']['input'];
  workspaceAccess?: InputMaybe<VideoAccessLevel>;
};


export type MutationShareVideosToSpaceArgs = {
  spaceFolderId?: InputMaybe<Scalars['ID']['input']>;
  spaceId: Scalars['ID']['input'];
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationSigninOrSignupWithAppleArgs = {
  acceptedTerms?: InputMaybe<Scalars['Boolean']['input']>;
  code: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSigninOrSignupWithAppleV2Args = {
  acceptedTerms?: InputMaybe<Scalars['Boolean']['input']>;
  code: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSpawnMeetingBotArgs = {
  integrationType: Scalars['String']['input'];
  meetingUrl: Scalars['String']['input'];
};


export type MutationStartNewRecordingSessionArgs = {
  ctaUrl?: InputMaybe<Scalars['String']['input']>;
  flippedCamera?: InputMaybe<Scalars['Boolean']['input']>;
  meetingExternalId?: InputMaybe<Scalars['ID']['input']>;
  retries?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  transactionId?: InputMaybe<Scalars['String']['input']>;
  videoExtras?: InputMaybe<InputVideoExtras>;
  videoProperties: InputVideoProperties;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationSubmitContactSalesArgs = {
  companyName?: InputMaybe<Scalars['String']['input']>;
  companySize: ContactSalesCompanySize;
  customMessage?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  pageTitle?: InputMaybe<Scalars['String']['input']>;
  useCase: ContactSalesUseCase;
};


export type MutationSubscribeBlockedInvitedUserToNotificationArgs = {
  blockedReason: Scalars['String']['input'];
  email: Scalars['String']['input'];
  orgToken: Scalars['String']['input'];
};


export type MutationSuspendAccountArgs = {
  input: SuspendAccountInput;
};


export type MutationSyncLocalEmailSettingsToHubspotContactArgs = {
  userQuery: Scalars['String']['input'];
};


export type MutationToggleFollowingProfileArgs = {
  follow: Scalars['Boolean']['input'];
  profileId: Scalars['ID']['input'];
};


export type MutationToggleFollowingTagArgs = {
  follow: Scalars['Boolean']['input'];
  tag: Scalars['String']['input'];
};


export type MutationToggleFollowingVideoArgs = {
  follow: Scalars['Boolean']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['String']['input'];
};


export type MutationTrackEmailVerificationUserIdArgs = {
  anonUserId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  referrer: Scalars['String']['input'];
};


export type MutationTransferAdminStatusToAnotherMemberArgs = {
  userIdTo: Scalars['ID']['input'];
};


export type MutationTriggerTtsForVideosArgs = {
  priority: TtsPriorityCode;
  replacementsInput: Array<ReplacementForTtsInput>;
  videoId: Scalars['ID']['input'];
};


export type MutationTrimDisfluenciesArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationUnarchiveSpaceArgs = {
  spaceId: Scalars['ID']['input'];
};


export type MutationUndoFillerWordRemovalTtsArgs = {
  input: UndoFillerWordRemovalTtsInput;
};


export type MutationUndoPendingAddOnCancelationArgs = {
  addOnType: Addon;
};


export type MutationUnshareVideosFromSpaceArgs = {
  spaceId: Scalars['ID']['input'];
  videoIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateAllNotificationStatusesArgs = {
  status: NotificationStatus;
};


export type MutationUpdateAllUserDefaultVideoSettingsInGroupArgs = {
  videoSettingsToUpdate: VideoSettingsToUpdate;
  workspaceGroupId: Scalars['ID']['input'];
};


export type MutationUpdateAutoCommentDisplayControlsArgs = {
  target: AutoCommentUpdateTarget;
  videoId: Scalars['String']['input'];
};


export type MutationUpdateAutoRecordMeetingSettingArgs = {
  autoRecording: Scalars['Boolean']['input'];
  meetingId: Scalars['String']['input'];
  meetingIdAndTime: Scalars['String']['input'];
};


export type MutationUpdateAutomationArgs = {
  automation: AutomationUpdateInput;
};


export type MutationUpdateBillingCycleArgs = {
  isYearly?: InputMaybe<Scalars['Boolean']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateBillingEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateBillingPaymentSourceArgs = {
  captchaToken: Scalars['ID']['input'];
  tokenId: Scalars['ID']['input'];
};


export type MutationUpdateCalendarMeetingRecordArgs = {
  calendarMeetingId: Scalars['ID']['input'];
  record: Scalars['Boolean']['input'];
  timeZone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCalendarMeetingShareSettingsArgs = {
  input: UpdateCalendarMeetingShareSettingsInput;
};


export type MutationUpdateChaptersArgs = {
  content: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateCheckoutRoleChangeCacheArgs = {
  downgradeUserIds: Array<Scalars['ID']['input']>;
  upgradeUserIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateChosenMembersCacheArgs = {
  chosenMembers: Array<Scalars['ID']['input']>;
};


export type MutationUpdateConfluenceMeetingNotesLocationArgs = {
  calendarMeetingGuid?: InputMaybe<Scalars['ID']['input']>;
  calendarMeetingId?: InputMaybe<Scalars['String']['input']>;
  contentType: ConfluenceContentTypes;
  locationId: Scalars['ID']['input'];
};


export type MutationUpdateCustomVideoBackgroundArgs = {
  assetId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateCustomerInformationArgs = {
  input: CustomerInformationInput;
};


export type MutationUpdateDataAgeLimitForSpacesArgs = {
  dataAgeLimitInSeconds?: InputMaybe<Scalars['Int']['input']>;
  settingType: Scalars['String']['input'];
  spaceIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateDefaultMeetingRecordingSettingsArgs = {
  autoRecordOwnedMeetings?: InputMaybe<AutoRecordOwnedMeetingsType>;
  externalInviteeAccess?: InputMaybe<MeetingRecordingAccessType>;
  linkSharing?: InputMaybe<MeetingRecordingLinkSharingType>;
  summaryNotification?: InputMaybe<MeetingRecordingSummaryNotificationType>;
  workspaceMemberAccess?: InputMaybe<MeetingRecordingAccessType>;
};


export type MutationUpdateDefaultPaymentMethodArgs = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  paymentSourceId: Scalars['ID']['input'];
};


export type MutationUpdateDefaultSsoUserRoleArgs = {
  role: DefaultSsoRoleEnum;
};


export type MutationUpdateDefaultVideoSettingsArgs = {
  comments_email_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  comments_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  download_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  loom_branded_player?: InputMaybe<Scalars['Boolean']['input']>;
  record_reply_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  show_analytics_to_viewer?: InputMaybe<Scalars['Boolean']['input']>;
  show_transcript_to_viewer?: InputMaybe<Scalars['Boolean']['input']>;
  suggested_playback_rate?: InputMaybe<SuggestedPlaybackRate>;
  use_emojis?: InputMaybe<Scalars['Boolean']['input']>;
  use_gif?: InputMaybe<Scalars['Boolean']['input']>;
  viewers_can_weave_default?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateDismissWorkflowSneakpeekArgs = {
  dismissWorkflowSneakpeek: Scalars['Boolean']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateDomainUsersStatusArgs = {
  domain: Scalars['String']['input'];
};


export type MutationUpdateDraftActorArgs = {
  actorId: Scalars['ID']['input'];
  videoDraftId: Scalars['ID']['input'];
};


export type MutationUpdateDraftSceneImageOverlayArgs = {
  imageOverlayId: Scalars['ID']['input'];
  position?: InputMaybe<OverlayPositionInput>;
  srcUrl?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDraftSceneScriptArgs = {
  draftSceneId: Scalars['ID']['input'];
  script: Scalars['String']['input'];
};


export type MutationUpdateDraftSceneTextOverlayArgs = {
  position?: InputMaybe<OverlayPositionInput>;
  text?: InputMaybe<Scalars['String']['input']>;
  textOverlayId: Scalars['ID']['input'];
};


export type MutationUpdateExternalApiTokenArgs = {
  name: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};


export type MutationUpdateFolderVisibilityArgs = {
  folderId: Scalars['ID']['input'];
  shouldUpdateVideos: Scalars['Boolean']['input'];
  visibility: FolderVisibilityType;
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateHexDraftBackgroundArgs = {
  hexDraftBackground: Scalars['String']['input'];
  videoDraftId: Scalars['ID']['input'];
};


export type MutationUpdateHexVideoBackgroundArgs = {
  hexValue: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateIntegrationSubscriptionArgs = {
  integrationId?: InputMaybe<Scalars['ID']['input']>;
  integrationSubscriptionId: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateIntegrationSubscriptionMetadataArgs = {
  integrationSubscriptionId: Scalars['ID']['input'];
  metadata: IntegrationSubscriptionMetadataInput;
};


export type MutationUpdateLastWatchTimeArgs = {
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateMeetingShareSettingsArgs = {
  externalInviteeAccess?: InputMaybe<MeetingRecordingAccessType>;
  linkSharing?: InputMaybe<MeetingRecordingLinkSharingType>;
  meetingId: Scalars['ID']['input'];
  shareToFolderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  shareToSpaceIds?: InputMaybe<Array<Scalars['String']['input']>>;
  summaryNotification?: InputMaybe<MeetingRecordingSummaryNotificationType>;
  timeZone: Scalars['String']['input'];
  workspaceMemberAccess?: InputMaybe<MeetingRecordingAccessType>;
};


export type MutationUpdateMemberPropertyArgs = {
  name: Scalars['String']['input'];
  value: Scalars['BasicScalar']['input'];
};


export type MutationUpdateMemberWorkspaceRoleArgs = {
  role: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateMembershipsRoleArgs = {
  membershipIds: Array<Scalars['ID']['input']>;
  role: Scalars['String']['input'];
};


export type MutationUpdateNotificationSettingsArgs = {
  deliveryMethod: NotificationDeliveryType;
  deliveryValue: Scalars['Boolean']['input'];
  settingName: NotificationSettingName;
};


export type MutationUpdateNotificationSettingsByDeliveryTypeArgs = {
  deliveryMethod: NotificationDeliveryType;
  deliveryValue: Scalars['Boolean']['input'];
};


export type MutationUpdateNotificationStatusArgs = {
  id: Scalars['ID']['input'];
  status: NotificationStatus;
};


export type MutationUpdateNotificationStatusBulkArgs = {
  ids: Array<Scalars['ID']['input']>;
  status: NotificationStatus;
};


export type MutationUpdateOrganizationArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateOrganizationBrandSettingsArgs = {
  input: CustomBrandingSettings;
};


export type MutationUpdatePhoneticHintsArgs = {
  hints?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePresetDraftBackgroundArgs = {
  presetDraftBackground: Scalars['String']['input'];
  videoDraftId: Scalars['ID']['input'];
};


export type MutationUpdatePresetVideoBackgroundArgs = {
  presetBackgroundName: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdatePushNotificationCredentialsArgs = {
  credentials: PushCredentialsInput;
  platform: Scalars['String']['input'];
};


export type MutationUpdateRecordingVideoDocumentTypeArgs = {
  recordingDocumentationType: WorkflowTemplateType;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateReferralLinkEnabledArgs = {
  enabled: Scalars['Boolean']['input'];
  inviterId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateScreenshotAnnotationsArgs = {
  annotations: Scalars['String']['input'];
  screenshotId: Scalars['ID']['input'];
};


export type MutationUpdateScreenshotCanvasOverlaysArgs = {
  canvasOverlays: Scalars['String']['input'];
  screenshotId: Scalars['ID']['input'];
};


export type MutationUpdateScreenshotHexBackgroundArgs = {
  hexValue: Scalars['String']['input'];
  screenshotId: Scalars['ID']['input'];
};


export type MutationUpdateScreenshotPresetBackgroundArgs = {
  presetBackgroundName: Scalars['String']['input'];
  screenshotId: Scalars['ID']['input'];
};


export type MutationUpdateScreenshotPrivacyArgs = {
  privacy: ScreenshotPrivacyTypes;
  screenshotId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateScreenshotSourceArgs = {
  screenshotId: Scalars['ID']['input'];
  source: Scalars['String']['input'];
  sourceType: ScreenshotSource;
};


export type MutationUpdateScreenshotTitleArgs = {
  id: Scalars['String']['input'];
  isAutoTitle?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};


export type MutationUpdateSelectedWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateSettingsForAllRecurringMeetingsArgs = {
  meetingId: Scalars['String']['input'];
  peopleAccess?: InputMaybe<Array<VideoAclEntryPersonInput>>;
  startTime: Scalars['String']['input'];
  videoPrivacy: VideoPrivacyProperty;
  videoVisibility: VideoVisibilityProperty;
};


export type MutationUpdateSpaceArgs = {
  analyticsSource?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  spaceId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateUserAdminArgs = {
  id: Scalars['ID']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserAvatarsArgs = {
  avatars: Array<AvatarInput>;
};


export type MutationUpdateUserDefaultWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateUserEmailNotificationPreferenceArgs = {
  consentSubscriptionKey: Scalars['String']['input'];
  consentSubscriptionValue: Scalars['Boolean']['input'];
  userQuery: Scalars['Int']['input'];
};


export type MutationUpdateUserGmoiConsentArgs = {
  email: Scalars['String']['input'];
  marketingConsentOptions?: InputMaybe<MarketingConsentOptionsInput>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateUserIntegrationSettingsArgs = {
  integrationSettings: UserIntegrationSettings;
};


export type MutationUpdateUserPersonaInfoArgs = {
  company_name?: InputMaybe<Scalars['String']['input']>;
  company_position?: InputMaybe<Scalars['String']['input']>;
  persona: PersonaInput;
};


export type MutationUpdateUserPinnedVideoArgs = {
  sort: Scalars['Float']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateUserPropertyArgs = {
  name: Scalars['String']['input'];
  value: Scalars['BasicScalar']['input'];
};


export type MutationUpdateUserReachedRecordingLimitChecklistItemArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationUpdateUserScreenshotSettingsArgs = {
  screenshotSettings: UserScreenshotSettingsInput;
};


export type MutationUpdateUserTriggerV2Args = {
  triggers: UpdateUserTriggerV2Input;
};


export type MutationUpdateUserUgcDataUseSettingsArgs = {
  ugcDataUseSettings: UpdateUserUgcDataUseSettingsInput;
};


export type MutationUpdateUserVideoSettingsArgs = {
  videoSettings: UserVideoSettingsInput;
};


export type MutationUpdateVideoAclEntryArgs = {
  access: VideoAccessLevel;
  entryId: Scalars['ID']['input'];
  entryType: VideoAclEntryType;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoCanvasOverlaysArgs = {
  boundedCanvasArrowOverlays: Array<VideoCanvasArrowOverlayInput>;
  boundedCanvasBoxOverlays: Array<VideoCanvasBoxOverlayInput>;
  boundedCanvasTextOverlays: Array<VideoCanvasTextOverlayInput>;
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoClipsArgs = {
  clips: Array<VideoClipDetailsInput>;
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoCommunityPostingArgs = {
  isCommunity: Scalars['Boolean']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoCtaArgs = {
  cta: CtaInput;
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoDescriptionArgs = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateVideoDescriptionV2Args = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateVideoDurationArgs = {
  duration: Scalars['Float']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateVideoExpirationDateArgs = {
  id: Scalars['ID']['input'];
  removeExpiration?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateVideoGifSettingsArgs = {
  useGif?: InputMaybe<Scalars['Boolean']['input']>;
  useGifDefault?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoNameArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateVideoPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoPinStatusArgs = {
  input: UpdateVideoPinStatusInput;
};


export type MutationUpdateVideoPlayIntervalArgs = {
  anonName?: InputMaybe<Scalars['String']['input']>;
  watchedIntervals: VideoPlayIntervalInput;
};


export type MutationUpdateVideoPlaySegmentArgs = {
  segment: VideoPlaySegmentInput;
};


export type MutationUpdateVideoPlaySegmentV2Args = {
  segment: VideoPlaySegmentInput;
};


export type MutationUpdateVideoPrivacyStatusArgs = {
  privacy: VideoPrivacyStatus;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoSearchEngineIndexingArgs = {
  enabled: Scalars['Boolean']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoSettingsArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  settings: VideoSettingsInput;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoTaskArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateVideoTranscriptArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  transcriptCorrections: Array<TranscriptionCorrection>;
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoTrimRangesArgs = {
  boundedTrimRanges: Array<VideoTrimRangeInput>;
  forceSave?: InputMaybe<Scalars['Boolean']['input']>;
  lastTrimId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type MutationUpdateVideoVisibilityArgs = {
  videoId: Scalars['ID']['input'];
  visibility: VideoVisibilityType;
};


export type MutationUpdateWorkflowDocVisibilityArgs = {
  documentType: WorkflowTemplateType;
  videoId: Scalars['ID']['input'];
  visibleToViewers: Scalars['Boolean']['input'];
};


export type MutationUpdateWorkspaceGroupArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
  workspaceGroupId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceGroupPropertiesArgs = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
  workspaceGroupIds: Array<Scalars['ID']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceMemberStatusArgs = {
  status: Scalars['String']['input'];
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationUpdateWorkspaceMemberStatusAdminArgs = {
  status: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceSettingArgs = {
  name: Scalars['String']['input'];
  value: Scalars['BasicScalar']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateWorkspaceUgcDataUseSettingsArgs = {
  ugcDataUseSettings: UpdateWorkspaceUgcDataUseSettingsInput;
};


export type MutationValidateEmailsCanBeInvitedToOrgArgs = {
  emails: Array<Scalars['String']['input']>;
  orgId: Scalars['ID']['input'];
};


export type MutationVerifyDnsDomainArgs = {
  domain: Scalars['String']['input'];
};


export type MutationVerifyUserEmailFromTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationVideoPartUploadedArgs = {
  filename: Scalars['String']['input'];
};

export type NoAutoCommentControlsFoundPayload = {
  __typename?: 'NoAutoCommentControlsFoundPayload';
  videoCreatedAt: Scalars['String']['output'];
  videoDuration: Scalars['Int']['output'];
};

export type Notification = {
  __typename?: 'Notification';
  creator?: Maybe<RegularUser>;
  creator_id?: Maybe<Scalars['Int']['output']>;
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  notification_type: NotificationType;
  recipient_id: Scalars['Int']['output'];
  status: NotificationStatus;
};

/** Method of delivery for a notification */
export enum NotificationDeliveryType {
  AtlassianNotifications = 'atlassianNotifications',
  Mail = 'mail',
  Mobile = 'mobile',
  Slack = 'slack',
  Web = 'web'
}

export type NotificationDeliveryTypes = {
  __typename?: 'NotificationDeliveryTypes';
  mail?: Maybe<Scalars['Boolean']['output']>;
  mobile?: Maybe<Scalars['Boolean']['output']>;
  slack?: Maybe<Scalars['Boolean']['output']>;
  web?: Maybe<Scalars['Boolean']['output']>;
};

export type NotificationEnhancedVideo = PrivateVideo | RegularUserVideo | VideoPasswordMissingOrIncorrect;

export enum NotificationQueryType {
  All = 'all',
  Comments = 'comments',
  Other = 'other',
  ReactionsAndViews = 'reactions_and_views',
  Shared = 'shared'
}

/** Name of the notification setting */
export enum NotificationSettingName {
  AddedToWatchLaterNotification = 'added_to_watch_later_notification',
  CommentMentionNotification = 'comment_mention_notification',
  CommentReplyNotification = 'comment_reply_notification',
  ExternalIngestionCompletedNotification = 'external_ingestion_completed_notification',
  ExternalIngestionProcessingNotification = 'external_ingestion_processing_notification',
  FirstVideoViewNotification = 'first_video_view_notification',
  HighVideoViewsNotification = 'high_video_views_notification',
  InsightsDigestNotification = 'insights_digest_notification',
  InsightsMonthlyDigestNotification = 'insights_monthly_digest_notification',
  InsightsViewMilestoneNotification = 'insights_view_milestone_notification',
  NewFollowerNotification = 'new_follower_notification',
  ReminderToRecordNotification = 'reminder_to_record_notification',
  ReshareVideoNotification = 'reshare_video_notification',
  RetranscriptionFailureNotification = 'retranscription_failure_notification',
  RetranscriptionSuccessNotification = 'retranscription_success_notification',
  SendWatchLaterReminderWeekdaysOnlySetting = 'send_watch_later_reminder_weekdays_only_setting',
  ShareVideoNotification = 'share_video_notification',
  SpaceAdminActionNotification = 'space_admin_action_notification',
  SpaceAllHandsContentNotification = 'space_all_hands_content_notification',
  SpaceContentNotification = 'space_content_notification',
  SpaceInvitationNotification = 'space_invitation_notification',
  SpaceStateChangeNotification = 'space_state_change_notification',
  VideoCommentNotification = 'video_comment_notification',
  VideoPrivacyChangeNotification = 'video_privacy_change_notification',
  VideoReactionNotification = 'video_reaction_notification',
  VideoTaskMentionNotification = 'video_task_mention_notification',
  VideoTaskResponseNotification = 'video_task_response_notification',
  VideoUsedAsWeaveClip = 'video_used_as_weave_clip',
  WatchLaterReminderNotification = 'watch_later_reminder_notification',
  WeaveVideoFirstView = 'weave_video_first_view'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  added_to_watch_later_notification?: Maybe<NotificationDeliveryTypes>;
  comment_mention_notification?: Maybe<NotificationDeliveryTypes>;
  comment_reply_notification?: Maybe<NotificationDeliveryTypes>;
  external_ingestion_completed_notification?: Maybe<NotificationDeliveryTypes>;
  external_ingestion_processing_notification?: Maybe<NotificationDeliveryTypes>;
  first_video_view_notification?: Maybe<NotificationDeliveryTypes>;
  high_video_views_notification?: Maybe<NotificationDeliveryTypes>;
  insights_digest_notification?: Maybe<NotificationDeliveryTypes>;
  insights_monthly_digest_notification?: Maybe<NotificationDeliveryTypes>;
  insights_view_milestone_notification?: Maybe<NotificationDeliveryTypes>;
  new_follower_notification?: Maybe<NotificationDeliveryTypes>;
  reminder_to_record_notification?: Maybe<NotificationDeliveryTypes>;
  reshare_video_notification?: Maybe<NotificationDeliveryTypes>;
  retranscription_failure_notification?: Maybe<NotificationDeliveryTypes>;
  retranscription_success_notification?: Maybe<NotificationDeliveryTypes>;
  send_watch_later_reminder_weekdays_only_setting?: Maybe<NotificationDeliveryTypes>;
  share_video_notification?: Maybe<NotificationDeliveryTypes>;
  space_admin_action_notification?: Maybe<NotificationDeliveryTypes>;
  space_all_hands_content_notification?: Maybe<NotificationDeliveryTypes>;
  space_content_notification?: Maybe<NotificationDeliveryTypes>;
  space_invitation_notification?: Maybe<NotificationDeliveryTypes>;
  space_state_change_notification?: Maybe<NotificationDeliveryTypes>;
  video_comment_notification?: Maybe<NotificationDeliveryTypes>;
  video_privacy_change_notification?: Maybe<NotificationDeliveryTypes>;
  video_reaction_notification?: Maybe<NotificationDeliveryTypes>;
  video_task_mention_notification?: Maybe<NotificationDeliveryTypes>;
  video_task_response_notification?: Maybe<NotificationDeliveryTypes>;
  video_used_as_weave_clip?: Maybe<NotificationDeliveryTypes>;
  watch_later_reminder_notification?: Maybe<NotificationDeliveryTypes>;
  weave_video_first_view?: Maybe<NotificationDeliveryTypes>;
};

export type NotificationSettingsV2 = {
  __typename?: 'NotificationSettingsV2';
  delivery_type: DeliveryType;
  email_enabled: Scalars['Boolean']['output'];
  mobile_enabled: Scalars['Boolean']['output'];
  notification_type: NotificationType;
  setting_context_id: Scalars['String']['output'];
  web_enabled: Scalars['Boolean']['output'];
};

export enum NotificationStatus {
  Created = 'created',
  Delivered = 'delivered',
  Read = 'read',
  Seen = 'seen',
  Sent = 'sent'
}

export type NotificationTrayCta = {
  __typename?: 'NotificationTrayCta';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type NotificationTrayItem = {
  __typename?: 'NotificationTrayItem';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  cta?: Maybe<NotificationTrayCta>;
  data?: Maybe<Scalars['JSON']['output']>;
  defaultTitle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notificationType: NotificationTrayType;
  peopleCount?: Maybe<Scalars['Int']['output']>;
  privacyType?: Maybe<Scalars['String']['output']>;
  reactionTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  reactionsCount?: Maybe<Scalars['Int']['output']>;
  receiver?: Maybe<NotificationTrayReceiver>;
  receiverCount?: Maybe<Scalars['Int']['output']>;
  receiverType?: Maybe<Scalars['String']['output']>;
  status: NotificationStatus;
  timestamp?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<NotificationTrayUser>;
  video?: Maybe<NotificationTrayVideo>;
  workspace?: Maybe<NotificationTrayWorkspace>;
};


export type NotificationTrayItemContentArgs = {
  withMentionMarkups?: InputMaybe<Scalars['Boolean']['input']>;
};


export type NotificationTrayItemDataArgs = {
  withMentionMarkups?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NotificationTrayItemConnection = {
  __typename?: 'NotificationTrayItemConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<NotificationTrayItemEdge>>>;
  /** Flattened list of NotificationTrayItem type */
  nodes?: Maybe<Array<Maybe<NotificationTrayItem>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type NotificationTrayItemEdge = {
  __typename?: 'NotificationTrayItemEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<NotificationTrayItem>;
};

export type NotificationTrayReceiver = {
  __typename?: 'NotificationTrayReceiver';
  avatar?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum NotificationTrayType {
  BulkReaction = 'bulkReaction',
  BusinessAiTrialWelcome = 'business_ai_trial_welcome',
  CalendarEfficiencyNotification = 'calendar_efficiency_notification',
  Comment = 'comment',
  CommentMention = 'commentMention',
  ContentLimitApproaching = 'contentLimitApproaching',
  ContentLimitReached = 'contentLimitReached',
  CreatorLiteLimitApproaching = 'creatorLiteLimitApproaching',
  CreatorLiteLimitReached = 'creatorLiteLimitReached',
  ExternalIngestionCompleted = 'externalIngestionCompleted',
  ExternalIngestionProcessing = 'externalIngestionProcessing',
  HighVideoViewsNotification = 'high_video_views_notification',
  IngestionIntegrationEnabledNotification = 'ingestion_integration_enabled_notification',
  InsightsDigest = 'insightsDigest',
  InsightsMonthlyDigestNotification = 'insights_monthly_digest_notification',
  InsightsTimeSavedNotification = 'insights_time_saved_notification',
  InsightsViewMilestoneNotification = 'insights_view_milestone_notification',
  MembershipRoleChange = 'membershipRoleChange',
  Newfollower = 'newfollower',
  OrgInviteAcceptedWithIncentives = 'org_invite_accepted_with_incentives',
  PostCommentMention = 'postCommentMention',
  Reaction = 'reaction',
  RecordingNudgeAfterXViewsGivenNotification = 'recording_nudge_after_x_views_given_notification',
  ReminderToRecordNotification = 'reminder_to_record_notification',
  Reply = 'reply',
  ReplyCommentMention = 'replyCommentMention',
  ReshareVideo = 'reshareVideo',
  RetranscriptionFailureNotification = 'retranscription_failure_notification',
  RetranscriptionSuccessNotification = 'retranscription_success_notification',
  SendWatchLaterReminderWeekdaysOnlySetting = 'send_watch_later_reminder_weekdays_only_setting',
  ShareVideo = 'shareVideo',
  SpaceAdminActionNotification = 'space_admin_action_notification',
  SpaceAllHandsContentNotification = 'space_all_hands_content_notification',
  SpaceContentNotification = 'space_content_notification',
  SpaceInvitationNotification = 'space_invitation_notification',
  SpaceItemMovedNotification = 'space_item_moved_notification',
  SpaceStateChangeNotification = 'space_state_change_notification',
  Vfv = 'vfv',
  VideoPrivacyChange = 'videoPrivacyChange',
  VideoTaskMentionNotification = 'video_task_mention_notification',
  VideoTaskResponseNotification = 'video_task_response_notification',
  VideoTrimCompleteNotification = 'video_trim_complete_notification',
  VideoUsedAsWeaveClip = 'video_used_as_weave_clip',
  WatchList = 'watchList',
  WatchLaterReminderNotification = 'watch_later_reminder_notification',
  WeaveVideoFirstView = 'weave_video_first_view',
  WorkspaceInvitation = 'workspaceInvitation'
}

export type NotificationTrayUser = {
  __typename?: 'NotificationTrayUser';
  avatar?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NotificationTrayVideo = {
  __typename?: 'NotificationTrayVideo';
  enhancedVideo?: Maybe<NotificationEnhancedVideo>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type NotificationTrayWorkspace = {
  __typename?: 'NotificationTrayWorkspace';
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
};

export enum NotificationType {
  AddedToWatchLaterNotification = 'added_to_watch_later_notification',
  BusinessAiTrialWelcome = 'business_ai_trial_welcome',
  CalendarEfficiencyNotification = 'calendar_efficiency_notification',
  CommentReplyNotification = 'comment_reply_notification',
  ContentLimitApproachingNotification = 'content_limit_approaching_notification',
  ContentLimitReachedNotification = 'content_limit_reached_notification',
  CreatorLiteLimitApproachingNotification = 'creator_lite_limit_approaching_notification',
  CreatorLiteLimitReachedNotification = 'creator_lite_limit_reached_notification',
  ExternalIngestionCompletedNotification = 'external_ingestion_completed_notification',
  ExternalIngestionProcessingNotification = 'external_ingestion_processing_notification',
  FirstVideoViewNotification = 'first_video_view_notification',
  HighVideoViewsNotification = 'high_video_views_notification',
  IngestionIntegrationEnabledNotification = 'ingestion_integration_enabled_notification',
  InsightsDigestNotification = 'insights_digest_notification',
  InsightsMonthlyDigestNotification = 'insights_monthly_digest_notification',
  InsightsTimeSavedNotification = 'insights_time_saved_notification',
  InsightsViewMilestoneNotification = 'insights_view_milestone_notification',
  MembershipRoleChangeNotification = 'membership_role_change_notification',
  NewFollowerNotification = 'new_follower_notification',
  OrgInviteAcceptedWithIncentives = 'org_invite_accepted_with_incentives',
  PostCommentMentionNotification = 'post_comment_mention_notification',
  RecordingNudgeAfterXViewsGivenNotification = 'recording_nudge_after_x_views_given_notification',
  ReminderToRecordNotification = 'reminder_to_record_notification',
  ReplyCommentMentionNotification = 'reply_comment_mention_notification',
  ReshareVideoNotification = 'reshare_video_notification',
  RetranscriptionFailureNotification = 'retranscription_failure_notification',
  RetranscriptionSuccessNotification = 'retranscription_success_notification',
  ShareVideoNotification = 'share_video_notification',
  SpaceAdminActionNotification = 'space_admin_action_notification',
  SpaceAllHandsContentNotification = 'space_all_hands_content_notification',
  SpaceContentNotification = 'space_content_notification',
  SpaceInvitationNotification = 'space_invitation_notification',
  SpaceItemMovedNotification = 'space_item_moved_notification',
  SpaceStateChangeNotification = 'space_state_change_notification',
  VideoCommentNotification = 'video_comment_notification',
  VideoPrivacyChangeNotification = 'video_privacy_change_notification',
  VideoReactionNotification = 'video_reaction_notification',
  VideoTaskMentionNotification = 'video_task_mention_notification',
  VideoTaskResponseNotification = 'video_task_response_notification',
  VideoUsedAsWeaveClip = 'video_used_as_weave_clip',
  WeaveVideoFirstView = 'weave_video_first_view'
}

export type NotificationUser = {
  __typename?: 'NotificationUser';
  avatar?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NotificationWorkspace = {
  __typename?: 'NotificationWorkspace';
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NotificationsPageResponse = GenericError | GetNotificationsPayload | InputValidationError | UserNotAuthorizedError;

export type NotifiedClipUsers = {
  __typename?: 'NotifiedClipUsers';
  avatar_thumb?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
};

export enum NudgeType {
  Affirmation = 'affirmation',
  Inquiry = 'inquiry'
}

export type NudgesPayload = {
  __typename?: 'NudgesPayload';
  nudges?: Maybe<Array<VideoNudge>>;
  owner_name?: Maybe<Scalars['String']['output']>;
  video_creator_has_ai_features_enabled?: Maybe<Scalars['Boolean']['output']>;
};

export type OAuth = {
  __typename?: 'OAuth';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  external_avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  medium: Scalars['String']['output'];
  team_id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user_id: Scalars['Int']['output'];
};

export type OnboardingSurveyResponseInput = {
  response: Scalars['String']['input'];
  step: Scalars['String']['input'];
};

export type OperationResultStatus = {
  __typename?: 'OperationResultStatus';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type OptInToRenewalChurnRefundResponse = ChurnRefundOptinPayload | GenericError | InputValidationError | UserNotAuthorizedError;

export type OrgAdmins = {
  __typename?: 'OrgAdmins';
  user?: Maybe<Array<Maybe<RegularUser>>>;
};

export type OrgMemberLimitedInfo = {
  __typename?: 'OrgMemberLimitedInfo';
  avatarThumb?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
};

export type OrgMemberLimitedInfoForSignupPage = {
  __typename?: 'OrgMemberLimitedInfoForSignupPage';
  avatarList: Array<Maybe<Scalars['String']['output']>>;
  logo?: Maybe<Scalars['String']['output']>;
  members: Array<Maybe<OrgMemberLimitedInfo>>;
  name: Scalars['String']['output'];
  numMembers: Scalars['Int']['output'];
};

export enum OrgRole {
  Admin = 'admin',
  Creator = 'creator',
  CreatorLite = 'creator_lite',
  Guest = 'guest',
  Viewer = 'viewer'
}

export type Organization = {
  __typename?: 'Organization';
  activation_id?: Maybe<Scalars['String']['output']>;
  add_ons?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Contact email for the primary workspace admin */
  admin_contact?: Maybe<Scalars['String']['output']>;
  brandLogoPath?: Maybe<Scalars['String']['output']>;
  brandPrimaryColor?: Maybe<Scalars['String']['output']>;
  brandShowBranding?: Maybe<Scalars['Boolean']['output']>;
  counts: WorkspaceTotalCounts;
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hidden?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isAtlassianManagedWorkspace?: Maybe<Scalars['Boolean']['output']>;
  isCloudProvisionerManagedWorkspace?: Maybe<Scalars['Boolean']['output']>;
  isViewerRoleHidden?: Maybe<Scalars['Boolean']['output']>;
  is_pure_trial?: Maybe<Scalars['Boolean']['output']>;
  is_trialing?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if a legacy workspace is actively being migrated to Atlassian. This can be removed once all legacy workspace migrations are complete */
  legacyMigrationIsActive?: Maybe<Scalars['Boolean']['output']>;
  limits?: Maybe<Scalars['JSON']['output']>;
  /** List of member roles available for the workspace */
  member_roles: Array<Maybe<MemberRole>>;
  /** @deprecated This field is unpaginated. Use membersConnection instead. */
  members?: Maybe<Array<Maybe<OrganizationMember>>>;
  membersConnection?: Maybe<OrganizationMemberConnection>;
  name: Scalars['String']['output'];
  organization_properties: Scalars['JSON']['output'];
  pendingDowngradesFromAdmin?: Maybe<Scalars['Int']['output']>;
  pendingDowngradesFromCreator?: Maybe<Scalars['Int']['output']>;
  planIncludesAI?: Maybe<Scalars['Boolean']['output']>;
  pricing_elasticity_assignment?: Maybe<Scalars['String']['output']>;
  primarySpace?: Maybe<Space>;
  site_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  totalActiveCreators?: Maybe<Scalars['Int']['output']>;
  totalActiveMembers?: Maybe<Scalars['Int']['output']>;
  totalAdminCount?: Maybe<Scalars['Int']['output']>;
  totalMembers?: Maybe<Scalars['Int']['output']>;
  trial_ended?: Maybe<Scalars['Boolean']['output']>;
  trial_ends_at?: Maybe<Scalars['Date']['output']>;
  trial_type?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  upgrade_url?: Maybe<Scalars['String']['output']>;
  /** Indicates whether a workspace allows AI */
  workspaceAllowsAi?: Maybe<Scalars['Boolean']['output']>;
  workspaceLogoPath?: Maybe<Scalars['String']['output']>;
};


export type OrganizationMembersArgs = {
  role?: InputMaybe<Scalars['String']['input']>;
};


export type OrganizationMembersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationInvitation = {
  __typename?: 'OrganizationInvitation';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  invitee_email: Scalars['String']['output'];
  invitee_user_id?: Maybe<Scalars['ID']['output']>;
  inviter_user_id?: Maybe<Scalars['ID']['output']>;
  org_role: Scalars['String']['output'];
  organization_id: Scalars['ID']['output'];
  status?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  workspace: Organization;
};

export type OrganizationInvitationConnection = {
  __typename?: 'OrganizationInvitationConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<OrganizationInvitationEdge>>>;
  /** Flattened list of OrganizationInvitation type */
  nodes?: Maybe<Array<Maybe<OrganizationInvitation>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type OrganizationInvitationEdge = {
  __typename?: 'OrganizationInvitationEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<OrganizationInvitation>;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  calendarAutomations: Array<CalendarAutomation>;
  calendars: Array<CalendarInfo>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  isSelected: Scalars['Boolean']['output'];
  member_counts: MemberCounts;
  member_limits?: Maybe<Scalars['JSON']['output']>;
  member_role: Scalars['String']['output'];
  member_status: Scalars['String']['output'];
  onboarding: Scalars['JSON']['output'];
  organization: Organization;
  organization_id: Scalars['ID']['output'];
  pending_downgrade?: Maybe<PendingDowngrade>;
  role_last_updated_at: Scalars['Date']['output'];
  updatedAt: Scalars['Date']['output'];
  user: RegularUser;
  user_id: Scalars['ID']['output'];
  was_loom_user_before_membership?: Maybe<Scalars['Boolean']['output']>;
};

export type OrganizationMemberConnection = {
  __typename?: 'OrganizationMemberConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<OrganizationMemberEdge>>>;
  /** Flattened list of OrganizationMember type */
  nodes?: Maybe<Array<Maybe<OrganizationMember>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type OrganizationMemberEdge = {
  __typename?: 'OrganizationMemberEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<OrganizationMember>;
};

export type OrganizationMemberInfoPayload = {
  __typename?: 'OrganizationMemberInfoPayload';
  organizationInfo?: Maybe<OrgMemberLimitedInfoForSignupPage>;
};

export enum OrganizationMemberRole {
  Admin = 'admin',
  Creator = 'creator',
  CreatorLite = 'creator_lite',
  Guest = 'guest',
  Viewer = 'viewer'
}

export enum OrganizationMemberStatus {
  Active = 'active',
  Deactivated = 'deactivated',
  DeactivatedScim = 'deactivated_scim'
}

export type OverallBotControlsResponse = GenericError | OverallBotControlsState | UserNotAuthorizedError;

export type OverallBotControlsState = {
  __typename?: 'OverallBotControlsState';
  all: BotControlsState;
  individual: Array<MeetingBotControlsState>;
  /** If the recording is already stopped when we query, return video ID */
  videoId?: Maybe<Scalars['ID']['output']>;
};

export type OverlayPositionInput = {
  offsetX: Scalars['Float']['input'];
  offsetY: Scalars['Float']['input'];
  sizeX: Scalars['Float']['input'];
  sizeY: Scalars['Float']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginatedWorkspaceTrendingVideosPayload = {
  __typename?: 'PaginatedWorkspaceTrendingVideosPayload';
  videos?: Maybe<RegularUserVideoConnection>;
};


export type PaginatedWorkspaceTrendingVideosPayloadVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  algorithm: TrendingAlgorithm;
  first: Scalars['Int']['input'];
};

export type PaginatedWorkspaceTrendingVideosResponse = GenericError | InputValidationError | PaginatedWorkspaceTrendingVideosPayload | UserNotAuthorizedError;

export type ParentVideoProperties = {
  __typename?: 'ParentVideoProperties';
  id: Scalars['ID']['output'];
  ownerName?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export enum ParticipantsInclude {
  Anyone = 'anyone',
  External = 'external',
  Internal = 'internal'
}

export type PartnerNameIsUniqueResponse = GenericError | PartnerNameIsUniqueResult | UserNotAuthorizedError;

/** Check to see if the given partner name is unique */
export type PartnerNameIsUniqueResult = {
  __typename?: 'PartnerNameIsUniqueResult';
  unique?: Maybe<Scalars['Boolean']['output']>;
};

export type PauseSubscriptionResponse = GenericError | InputValidationError | OperationResultStatus | UserNotAuthorizedError;

export type PayInvoicePayload = {
  __typename?: 'PayInvoicePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PayInvoiceResponse = GenericError | IdempotencyKeyError | InputValidationError | InvoiceNotPayableError | PayInvoicePayload | PaymentFailedCardError | UserNotAuthorizedError;

export type PaymentFailedCardError = {
  __typename?: 'PaymentFailedCardError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type PendingDowngrade = {
  __typename?: 'PendingDowngrade';
  status?: Maybe<Scalars['String']['output']>;
  to_role?: Maybe<Scalars['String']['output']>;
};

export type PersonProperty = {
  __typename?: 'PersonProperty';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['BasicScalar']['output']>;
};

export type PersonaInput = {
  company_name?: InputMaybe<Scalars['String']['input']>;
  company_position?: InputMaybe<Scalars['String']['input']>;
  persona_v1: PersonaV1;
};

export type PersonaV1 = {
  company?: InputMaybe<Scalars['String']['input']>;
  company_industry?: InputMaybe<Scalars['String']['input']>;
  company_size?: InputMaybe<Scalars['String']['input']>;
  company_size_exact?: InputMaybe<Scalars['String']['input']>;
  complete?: InputMaybe<Scalars['Boolean']['input']>;
  custom_role?: InputMaybe<Scalars['String']['input']>;
  education_type?: InputMaybe<Scalars['String']['input']>;
  management_level?: InputMaybe<Scalars['String']['input']>;
  other_intent_case_explanation?: InputMaybe<Scalars['String']['input']>;
  other_se_case?: InputMaybe<Scalars['String']['input']>;
  other_use_case?: InputMaybe<Scalars['String']['input']>;
  persona_role?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  sharing_intent_case?: InputMaybe<Scalars['String']['input']>;
  use_case_plan?: InputMaybe<Scalars['String']['input']>;
  use_case_plan_persona?: InputMaybe<Scalars['String']['input']>;
  use_cases?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PersonalizedVideosInProgressResponse = CountPayload | GenericError;

export type PhoneticHints = {
  __typename?: 'PhoneticHints';
  createdAt?: Maybe<Scalars['Date']['output']>;
  entityId: Scalars['Int']['output'];
  entityIdv2: Scalars['ID']['output'];
  hints?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  scope: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  wordOrPhrase: Scalars['String']['output'];
};

export type Phrase = {
  __typename?: 'Phrase';
  ranges?: Maybe<Array<PhraseRange>>;
  speakerName?: Maybe<Scalars['String']['output']>;
  ts?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type PhraseRange = {
  __typename?: 'PhraseRange';
  length?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<TranscriptElementIndex>;
  start?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<PhraseRangeType>;
};

export enum PhraseRangeType {
  Punct = 'punct',
  Text = 'text'
}

export type Plan = {
  __typename?: 'Plan';
  current_status?: Maybe<Scalars['String']['output']>;
  days_until_due?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  interval_count?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  pricing?: Maybe<Pricing>;
  product?: Maybe<Scalars['String']['output']>;
  pure_trial?: Maybe<Scalars['Boolean']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  schedule?: Maybe<Scalars['JSON']['output']>;
  start_date?: Maybe<Scalars['Int']['output']>;
};

export enum PlanInterval {
  Month = 'month',
  Year = 'year'
}

export type PnpAssignment = {
  __typename?: 'PnpAssignment';
  flag: Scalars['String']['output'];
  result: Scalars['String']['output'];
};

export type PnpAssignmentResponse = {
  __typename?: 'PnpAssignmentResponse';
  pnpAssignments?: Maybe<Array<Maybe<PnpAssignment>>>;
};

export type PnpUpdate = {
  __typename?: 'PnpUpdate';
  affectedPlans?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  affectedRoles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  affectedUsers?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  pnpUpdate: Scalars['String']['output'];
};

export type PnpUpdatesResponse = {
  __typename?: 'PnpUpdatesResponse';
  PnpUpdates?: Maybe<Array<Maybe<PnpUpdate>>>;
};

export type PrepareForEditResponse = GenericError | InputValidationError | InvalidRequestWarning | PrepareVideoForEditPayload | UserNotAuthorizedError;

export type PrepareVideoForEditPayload = {
  __typename?: 'PrepareVideoForEditPayload';
  video?: Maybe<RegularUserVideo>;
};

export type PresetDraftBackground = {
  __typename?: 'PresetDraftBackground';
  presetBackgroundName: Scalars['String']['output'];
};

export enum PresetVariablesEnum {
  CompanyName = 'company_name',
  Name = 'name',
  Variable = 'variable'
}

export type PresetVideoBackground = {
  __typename?: 'PresetVideoBackground';
  presetBackgroundName: Scalars['String']['output'];
};

export type PreviewDataRetention = {
  __typename?: 'PreviewDataRetention';
  screenshots?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Scalars['Int']['output']>;
  videos?: Maybe<Scalars['Int']['output']>;
};

export type PreviewDataRetentionResponse = GenericError | InputValidationError | PreviewDataRetention | UserNotAuthorizedError;

export type PreviewUpcomingInvoicesResponse = GenericError | InputValidationError | UpcomingInvoices | UserNotAuthorizedError;

/** Price of a subscription item */
export type Price = {
  __typename?: 'Price';
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  product: Scalars['String']['output'];
  recurring: Recurring;
  type: Scalars['String']['output'];
  unit_amount: Scalars['Int']['output'];
};

export type PriceHistory = {
  __typename?: 'PriceHistory';
  tier2?: Maybe<Tier2PriceHistory>;
  tier3?: Maybe<Tier3PriceHistory>;
};

export type Pricing = {
  __typename?: 'Pricing';
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type PrivacyEvaluation = {
  __typename?: 'PrivacyEvaluation';
  canView?: Maybe<Scalars['Boolean']['output']>;
};

export type PrivateKeyInfo = {
  __typename?: 'PrivateKeyInfo';
  blacklisted?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  keyHash?: Maybe<Scalars['String']['output']>;
  pem?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

/** A sentinel object telling a client that a video is not accessible to the current user. Clients can allow users to request access to the video if its privacy status is `workspace`. */
export type PrivateVideo = {
  __typename?: 'PrivateVideo';
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<VideoPrivacyStatus>;
};

export type ProcessIntentConfirmationPayload = {
  __typename?: 'ProcessIntentConfirmationPayload';
  nextAction?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ProcessIntentConfirmationResponse = CustomerStripeCardError | GenericError | InputValidationError | ProcessIntentConfirmationPayload | RateLimitReachedError | UserNotAuthorizedError;

export type ProcessQuantitySmartSyncStoreResponse = GenericError | SuccessPayload | UserNotAuthorizedError;

export type ProcessingInformation = {
  __typename?: 'ProcessingInformation';
  instant_editing_enabled?: Maybe<Scalars['Boolean']['output']>;
  noise_cancellation_type?: Maybe<Scalars['Boolean']['output']>;
  replacements?: Maybe<Array<Maybe<VideoReplacementInfo>>>;
  split_segment_ttl?: Maybe<Scalars['String']['output']>;
  trim_id?: Maybe<Scalars['Float']['output']>;
  trim_progress?: Maybe<Scalars['Float']['output']>;
  trim_ranges?: Maybe<Array<Maybe<VideoTrimRange>>>;
  videoUploadMessage?: Maybe<Scalars['String']['output']>;
  videoUploadValid?: Maybe<Scalars['Boolean']['output']>;
};

export type ProcessingInformationInput = {
  noise_cancellation_type?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ProcessingServices {
  AssemblyAiAsync = 'assembly_ai_async',
  InstantWhisper = 'instant_whisper',
  RevAiAsync = 'rev_ai_async'
}

/** Loom products that can be purchased */
export enum Product {
  Ai = 'AI',
  Business = 'business',
  Enterprise = 'enterprise'
}

/** A collection containing a followed user and whether or not that user has unread content */
export type ProfileFollow = {
  __typename?: 'ProfileFollow';
  unread?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<RegularUser>;
};

export type ProfilePropertyType = {
  __typename?: 'ProfilePropertyType';
  location?: Maybe<Scalars['String']['output']>;
  /** Role within a company, e.g. engineer, designer */
  role?: Maybe<Scalars['String']['output']>;
};

export type ProvideEditTtsFeedbackInput = {
  feedback?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['String']['input'];
  replacementId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};

export type ProvideEditTtsFeedbackPayload = {
  __typename?: 'ProvideEditTTSFeedbackPayload';
  replacementBucketCount: Scalars['Int']['output'];
  replacementDurationMs: Scalars['Int']['output'];
  replacementWordCount: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type ProvideEditTtsFeedbackResponse = GenericError | InputValidationError | InvalidRequestWarning | ProvideEditTtsFeedbackPayload | UserNotAuthorizedError;

export type ProvideTtsFeedbackPayload = {
  __typename?: 'ProvideTtsFeedbackPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ProvideTtsFeedbackResponse = GenericError | ProvideTtsFeedbackPayload | UserNotAuthorizedError;

export type PublicVideoComment = {
  __typename?: 'PublicVideoComment';
  anon_user_id?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Avatar>;
  children_comments?: Maybe<Array<Maybe<PublicVideoComment>>>;
  comment_post_id?: Maybe<Scalars['Int']['output']>;
  comment_post_idv2?: Maybe<Scalars['ID']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  date_edited?: Maybe<Scalars['Date']['output']>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  edited: Scalars['Boolean']['output'];
  extended_reaction?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inFlightContent?: Maybe<Scalars['String']['output']>;
  isChatMessage: Scalars['Boolean']['output'];
  locallyDeleted?: Maybe<Scalars['Boolean']['output']>;
  mention_object?: Maybe<VideoCommentContentMentions>;
  parent_comment?: Maybe<PublicVideoComment>;
  parent_post_id?: Maybe<Scalars['Int']['output']>;
  textContent?: Maybe<Scalars['String']['output']>;
  time_stamp?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
  video: RegularUserVideo;
  video_id: Scalars['String']['output'];
};


export type PublicVideoCommentContentArgs = {
  withMentionMarkups?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PublicVideoCommentTextContentArgs = {
  withMentionMarkups?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PublicVideoCommentTime_StampArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};

export enum PublicVideoCommentType {
  Comment = 'COMMENT',
  Reply = 'REPLY'
}

export type PublicVideoReaction = {
  __typename?: 'PublicVideoReaction';
  anon_user_id?: Maybe<Scalars['String']['output']>;
  anon_user_name?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  extended_reaction?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  localId?: Maybe<Scalars['String']['output']>;
  locallyCreated?: Maybe<Scalars['Boolean']['output']>;
  reaction: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
  user?: Maybe<RegularUser>;
  user_id?: Maybe<Scalars['Int']['output']>;
  video_id: Scalars['ID']['output'];
};

export type PushCredentialKeysType = {
  __typename?: 'PushCredentialKeysType';
  authSecret?: Maybe<Scalars['String']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
};

export type PushCredentialsInput = {
  fcm: FcmDataInputType;
  gcm: GcmDataInputType;
  keys: UpdatePushCredentialKeysInput;
};

export type PushCredentialsType = {
  __typename?: 'PushCredentialsType';
  fcm?: Maybe<FcmDataType>;
  gcm?: Maybe<GcmDatType>;
  keys?: Maybe<PushCredentialKeysType>;
};

/** Allowed actions for Quantity Smart Sync Store */
export enum QuantitySmartSyncAction {
  Clear = 'clear',
  Process = 'process'
}

export type QuantitySmartSyncStoreData = {
  __typename?: 'QuantitySmartSyncStoreData';
  /** The number of members in the Smart Sync Store */
  length: Scalars['Int']['output'];
  /** The date when the proration was calculated */
  prorationDate: Scalars['Int']['output'];
  /** The ID of the workspace */
  workspaceId: Scalars['String']['output'];
};

export type QuantitySmartSyncStorePayload = {
  __typename?: 'QuantitySmartSyncStorePayload';
  /** List of Smart Sync Store data for each workspace */
  data?: Maybe<Array<QuantitySmartSyncStoreData>>;
};

export type Query = {
  __typename?: 'Query';
  /** Get the Jira sites accessible to the user and optional metadata */
  accessibleJiraSites?: Maybe<AccessibleJiraSitesResponse>;
  adminBillingProducts?: Maybe<AdminBillingProductsResponse>;
  adminEvaluatePrivacyAndDiscoverabilityForUser?: Maybe<AdminEvaluatePrivacyAndDiscoverabilityForUserResponse>;
  adminFindFolders?: Maybe<AdminFindFoldersResponse>;
  adminFindSpaces?: Maybe<AdminFindSpacesResponse>;
  adminFindUsersInDomain?: Maybe<AdminFindUsersInDomainResponse>;
  adminGetAILimit?: Maybe<AdminGetAiLimitResponse>;
  adminGetAutoContextAuditLog?: Maybe<AdminGetAutoContextAuditLogResponse>;
  adminGetBillingEntity?: Maybe<AdminGetBillingEntityResponse>;
  /** Get calendar info details for debugging */
  adminGetCalendarInfo?: Maybe<AdminGetCalendarInfoResponse>;
  /** Get desktop logs for a user, limited to first 50 results from s3. Auto sorts them descending by last modified date */
  adminGetDesktopLogs?: Maybe<AdminGetDesktopLogsResponse>;
  adminGetDesktopVersion?: Maybe<AdminGetDesktopVersionResponse>;
  adminGetDeveloperAccount?: Maybe<AdminGetDeveloperAccountResponse>;
  adminGetEditableTranscript?: Maybe<AdminGetEditableTranscriptResponse>;
  /** Fetches the previous month's insights for a provided user */
  adminGetEmailDigestInsights?: Maybe<AdminGetEmailDigestInsightsResponse>;
  adminGetFFProbeData?: Maybe<AdminFfProbeDataResponse>;
  /** Get all of the ACL entries for a folder */
  adminGetFolderPermissions?: Maybe<AdminGetFolderPermissionsResponse>;
  /** Get groupings for a video */
  adminGetGroupingsByVideoId?: Maybe<AdminGetGroupingsByVideoIdResponse>;
  /** get all incentives for a user in a workspace */
  adminGetIncentiveEligibleInvites?: Maybe<AdminGetIncentiveEligibleInvitesResponse>;
  adminGetIntegrationSubscriptionQuery?: Maybe<AdminGetIntegrationSubscriptionQueryResponse>;
  adminGetIntegrationSubscriptionsForSalesforce?: Maybe<AdminGetIntegrationSubscriptionsForSalesforceResponse>;
  adminGetInvoiceDetails?: Maybe<AdminGetInvoiceDetailsResponse>;
  adminGetInvoices?: Maybe<AdminGetInvoicesResponse>;
  adminGetJobStatus?: Maybe<AdminGetJobStatusResponse>;
  adminGetLegacyWorkspaceMigration?: Maybe<AdminGetLegacyWorkspaceMigrationResponse>;
  adminGetMediaTranscript?: Maybe<AdminGetMediaTranscriptResponse>;
  /** Get meeting bot info details for debugging */
  adminGetMeetingBotInfo?: Maybe<AdminGetMeetingBotInfoResponse>;
  adminGetMeetingInfo?: Maybe<AdminGetMeetingInfoResponse>;
  adminGetMostRecentUserVideoRecordingClientVersion?: Maybe<AdminGetMostRecentUserVideoRecordingClientVersionResponse>;
  adminGetReferralLinkUrl?: Maybe<AdminGetReferralLinkUrlResponse>;
  /** Fetches active sessions for given a user ID. For Loommate employees only. */
  adminGetSessionsForUser?: Maybe<AdminGetSessionsForUserResponse>;
  adminGetSlackSubscriptionConnectionsForUser?: Maybe<AdminGetSlackSubscriptionConnectionsForUserResponse>;
  adminGetSpace?: Maybe<AdminGetSpaceResponse>;
  adminGetSpaceMembers?: Maybe<AdminGetSpaceMembersResponse>;
  adminGetSpaceVideos?: Maybe<AdminGetSpaceVideosResponse>;
  adminGetStripeEventDetails?: Maybe<AdminGetStripeEventDetailsResponse>;
  adminGetTagsByVideoId?: Maybe<AdminGetTagsByVideoIdResponse>;
  /** Get prices that are part of customer tier */
  adminGetTierPrices?: Maybe<AdminGetTierPricesResponse>;
  adminGetTopWorkspaceByUserEmailDomain?: Maybe<AdminGetTopWorkspaceByUserEmailDomainResponse>;
  /** Get Transcode status for given videoIds and jobTypes */
  adminGetTranscodeStatus?: Maybe<AdminGetTranscodeStatusResponse>;
  adminGetUser?: Maybe<AdminGetUserResponse>;
  /** Admin endpoint for retrieving a user's property */
  adminGetUserProperty?: Maybe<AdminGetUserPropertyResponse>;
  adminGetUsers?: Maybe<AdminGetUsersResponse>;
  adminGetUsersByDomain?: Maybe<AdminGetUsersByDomainResponse>;
  adminGetVariablesVideosAndFolderInformation?: Maybe<AdminGetVariablesVideosAndFolderInformationResponse>;
  /** Get groupings for a user in a given workspace */
  adminGetVideoGroupingsByOwner?: Maybe<AdminGetVideoGroupingsByOwnerResponse>;
  adminGetVideoShares?: Maybe<AdminGetVideoSharesResponse>;
  adminGetVideos?: Maybe<AdminGetVideosResponse>;
  adminGetViewableTranscript?: Maybe<AdminGetViewableTranscriptResponse>;
  adminGetVisibleTotalForTag?: Maybe<AdminGetVisibleTotalForTagResponse>;
  adminGetWorkosConnection?: Maybe<AdminGetWorkosConnectionResponse>;
  /** Get the WorkOS domains set from Redis. */
  adminGetWorkosDomains?: Maybe<AdminGetWorkosDomainsResponse>;
  /** Get WorkOS directory user IDs from loom users. These should all be members of the same workspace. */
  adminGetWorkosUserIds?: Maybe<AdminGetWorkosUserIdsResponse>;
  adminGetWorkspaceAuditLogs?: Maybe<AdminGetWorkspaceAuditLogsResponse>;
  /** Get workspace by id, site id, or activation id. */
  adminGetWorkspaceByAnyId?: Maybe<AdminGetWorkspaceByAnyIdPayload>;
  adminGetWorkspaceDomains?: Maybe<AdminGetWorkspaceDomainsResponse>;
  adminGetWorkspaceEmailAuditLogs?: Maybe<AdminGetWorkspaceEmailAuditLogsResponse>;
  adminGetWorkspaceQuantitySyncCount?: Maybe<AdminGetWorkspaceQuantitySyncCountResponse>;
  adminGetWorkspaceSettings?: Maybe<AdminGetWorkspaceSettingsResponse>;
  adminGetWorkspaceVideoAction?: Maybe<AdminGetWorkspaceVideoActionResponse>;
  adminListIntegrationQuery?: Maybe<AdminListIntegrationQueryResponse>;
  adminListIntegrationSubscriptionQuery?: Maybe<AdminListIntegrationSubscriptionQueryResponse>;
  adminListSDKPartnersQuery?: Maybe<AdminListSdkPartnersQueryResponse>;
  adminListSubscriptionUserConnectionsQuery?: Maybe<AdminListSubscriptionUserConnectionsQueryResponse>;
  /** Search the filtered workspace members with pagination */
  adminSearchPaginatedWorkspaceMembers?: Maybe<AdminSearchPaginatedWorkspaceMembersResponse>;
  aiMeetingNotesLocation?: Maybe<AiMeetingNotesLocationResponse>;
  /** Returns if a user is within a GDPR locale or not */
  atlassianLocaleResponse?: Maybe<AtlassianLocaleResponseResponse>;
  automatedMeetingNotesUserPermissions?: Maybe<AutomatedMeetingNotesUserPermissionsResponse>;
  checkIfUserHasEducationStatus?: Maybe<UserEduStatusResult>;
  checkIfUserOnlyTeamAdmin?: Maybe<CheckIfUserOnlyTeamAdminResponse>;
  checkIfUserWithEmailExists: Scalars['Boolean']['output'];
  checkPassword?: Maybe<Scalars['Boolean']['output']>;
  checkUserBelongsToEnterpriseWorkosWorkspace?: Maybe<CheckUserBelongsToEnterpriseWorkosWorkspaceResponse>;
  confluenceContent?: Maybe<ConfluenceContentResponse>;
  confluenceSpaces?: Maybe<ConfluenceSpacesResponse>;
  confluenceUserPermissions?: Maybe<ConfluenceUserPermissionsResponse>;
  customValidateEmail?: Maybe<CustomValidateEmailResponse>;
  dataRetention?: Maybe<DataRetentionResponse>;
  determineAudioPersonalizationEligibility?: Maybe<DetermineAudioPersonalizationEligibilityResponse>;
  developerAccountByUserQuery?: Maybe<DeveloperAccountByUserQueryResponse>;
  developerAccountQueries?: Maybe<DeveloperAccountQueriesResponse>;
  /** Returns whether a video can be downloaded. */
  downloadDisabledForVideo?: Maybe<DownloadDisabledResponse>;
  engagementInsightsExportPreview?: Maybe<EngagementInsightsExportPreviewResponse>;
  engagementInsightsSummaryForVideo?: Maybe<EngagementInsightsSummary>;
  /** fetches display controls for auto-generated comments and reactions */
  fetchAutoCommentDisplayControls?: Maybe<FetchAutoCommentDisplayControlsResponse>;
  fetchGettingStartedChecklist?: Maybe<FetchGettingStartedChecklistResponse>;
  fetchInvitationCapabilities?: Maybe<FetchInvitationCapabilitiesResponse>;
  fetchLiveTranscript?: Maybe<FetchLiveTranscriptResponse>;
  /** get the organization membership information by invite link */
  fetchOrganizationMemberInfoForInviteLink?: Maybe<FetchOrganizationMemberInfoForInviteLinkResponse>;
  fetchOrganizationMemberInfoForInviteeSignup?: Maybe<OrgMemberLimitedInfoForSignupPage>;
  fetchPreviewBillingPlanChange: Scalars['JSON']['output'];
  fetchPreviewInvoice?: Maybe<FetchPreviewInvoiceResponse>;
  fetchRequestVideoAccessFlow?: Maybe<FetchRequestVideoAccessFlowResponse>;
  fetchTimestampedWords?: Maybe<FetchTimestampedWordsResponse>;
  fetchVideoChapters?: Maybe<FetchVideoChaptersResponse>;
  fetchVideoNudges?: Maybe<FetchVideoNudgesResponse>;
  fetchVideoPinnedStatusForWorkspace?: Maybe<FetchVideoPinnedStatusForWorkspaceResponse>;
  fetchVideoTranscript: VideoTranscriptResponse;
  /** Fetch a list of Looms by Id */
  fetchVideosById?: Maybe<FetchVideosByIdResponse>;
  findBillingEntityByInvoiceEmail?: Maybe<Array<Maybe<BillingEntity>>>;
  findBulkShareVideoAlias: Array<ShareVideoAlias>;
  findOrganizationByExternalCustomerId?: Maybe<Organization>;
  findOrganizationFromMemberEmail?: Maybe<Array<Maybe<Organization>>>;
  folder: RegularUserFolder;
  generateSpeechFromText?: Maybe<GenerateSpeechFromTextResponse>;
  /** Generate an issue LLM completion from the video transcript for Jira or Linear */
  generatedIssue?: Maybe<GeneratedIssueResponse>;
  /** Generate a Jira issue LLM completion from the video transcript */
  generatedJiraIssue?: Maybe<GeneratedJiraIssueResponse>;
  /** Generate a Linear issue LLM completion from the video transcript */
  generatedLinearIssue?: Maybe<GeneratedLinearIssueResponse>;
  /** Categorize a Loom from the video transcript */
  generatedLoomCategorization?: Maybe<GeneratedLoomCategorizationResponse>;
  /** Generate a share message for a loom based on its transcript */
  generatedShareMessage?: Maybe<GeneratedShareMessageResponse>;
  /** Generate a summary for a loom based on its transcript to be used by viewers */
  generatedSummaryForViewers?: Maybe<GeneratedSummaryForViewersResponse>;
  generatedVideoQuestion?: Maybe<GeneratedVideoQuestionResponse>;
  /** Create an LLM completion or a share message from the video transcript */
  generatedWorkflowContent?: Maybe<GeneratedWorkflowContentResponse>;
  /** Create an LLM completion from the video transcript */
  generatedWorkflowDoc?: Maybe<GeneratedWorkflowDocResponse>;
  /** Returns a URL to the Atlassian Change Plan page */
  getAGGChangePlanUrl?: Maybe<GetAggChangePlanUrlResponse>;
  /** Returns a URL to the Atlassian/BAC entitlement management */
  getAGGManagementUrl?: Maybe<GetAggManagementUrlResponse>;
  /** Get Admin Graph Insights for admin analytics */
  getAdminGraphInsights?: Maybe<GetAdminGraphInsightsResponse>;
  /** Get a list of all community Looms to display on the marketing site */
  getAllCommunityLooms?: Maybe<GetAllCommunityLoomsResponse>;
  /** get all of the invite links for a specific user and workspace */
  getAllInviteLinks?: Maybe<GetAllInviteLinksResponse>;
  /** Will return all the meetings for a user. */
  getAllMeetingsForUser?: Maybe<GetAllMeetingsForUserResponse>;
  /** Retrieve all user properties for the current user */
  getAllUserProperties?: Maybe<GetAllUserPropertiesResponse>;
  getAllWorkspaceDeletionTokens?: Maybe<GetAllWorkspaceDeletionTokensResponse>;
  /** Retrieve all discoverable workspaces with a domain that matches the user's email domain. Requires the user to have a verified email. */
  getAllWorkspacesByUserEmailDomain?: Maybe<GetAllWorkspacesByUserEmailDomainResponse>;
  /** Gets local email subscription settings; if none exist, syncs with related remote HubSpot contact */
  getAndMaybeSyncLocalEmailSettings?: Maybe<GetAndMaybeSyncLocalEmailSettingsResponse>;
  /** Get an asset by ID */
  getAsset?: Maybe<GetAssetResponse>;
  /** Get assets for a user */
  getAssetsForUser?: Maybe<GetAssetsForUserResponse>;
  getAtlassianOrganizationId?: Maybe<GetAtlassianOrganizationIdResponse>;
  getAutoFeatureStatuses?: Maybe<GetAutoFeatureStatusesResponse>;
  /** Get a list of automations to display on Meeting Recording Recording Rules page. */
  getAutomations?: Maybe<GetAutomationsResponse>;
  getBannerInsights?: Maybe<GetBannerInsightsResponse>;
  getBotControlsState?: Maybe<OverallBotControlsResponse>;
  /** @deprecated Use getBulkFlagsForUserV2 instead */
  getBulkFlagsForUser: Array<Maybe<FeatureFlagResponse>>;
  getBulkFlagsForUserV2: Array<Maybe<FeatureFlagResponseV2>>;
  /** updated to support Statsig experimentation */
  getBulkFlagsForUserV3: Array<Maybe<FeatureFlagResponseV3>>;
  getBusinessTrialWelcomeCardProps?: Maybe<BusinessTrialWelcomeCardPropsResponse>;
  /** Get prices for customer at checkout */
  getCheckoutPrices?: Maybe<GetCheckoutPricesResponse>;
  /** Get upcoming invoice for customer at checkout */
  getCheckoutUpcomingInvoice?: Maybe<GetCheckoutUpcomingInvoiceResponse>;
  getChildVideosAndParentVideoInfoFromParentId?: Maybe<GetChildVideosAndParentVideoInfoFromParentIdResponse>;
  /** Returns the cached selected members for workspace at checkout */
  getChosenMembersCache?: Maybe<GetChosenMembersCacheResponse>;
  /** Get a list of community Loom Ids to display on the empty states */
  getCommunityLoomIdsForEmptyStates?: Maybe<GetCommunityLoomIdsForEmptyStatesResponse>;
  /** Get a list of community Looms to display on the profile page when accessed anonymously */
  getCommunityLoomsForProfile?: Maybe<GetCommunityLoomsForProfileResponse>;
  getCountOfSlackSubscriptionConnectionsForUser?: Maybe<GetCountOfSlackSubscriptionConnectionsForUserResponse>;
  /** Get active workspace currency */
  getCurrency?: Maybe<GetCurrencyResponse>;
  /** Gets the current logged in user if there is one, otherwise returns a UserNotAuthorizedError object. This is a safe way to query for fields marked "Current user only." on the RegularUser schema. */
  getCurrentUser?: Maybe<GetCurrentUserResponse>;
  /** Retrieves the custom branding of an organization that owns a video */
  getCustomBranding?: Maybe<GetCustomBrandingResponse>;
  /** Get Customer */
  getCustomer?: Maybe<GetCustomerResponse>;
  /** Get dismiss workflow sneakpeek status */
  getDismissWorkflowSneakpeek?: Maybe<GetDismissWorkflowSneakpeekResponse>;
  getDomainsForWorkspace?: Maybe<GetDomainsForWorkspaceResponse>;
  getDuplicateVideoReplacements?: Maybe<GetDuplicateVideoReplacementsResponse>;
  /** Trigger an email of digest insights for the current user */
  getEmailDigestInsights?: Maybe<GetEmailDigestInsightsResponse>;
  getEnvVars?: Maybe<GetEnvVarsResponse>;
  /** Get end of year 2024 takeover insights for hub */
  getEoyInsightsForHub?: Maybe<GetEoyInsightsForHubResponse>;
  /** Returns the specified user from the decrypted hash. Used for server rendering the social share cards */
  getEoyInsightsFromHash?: Maybe<GetEoyInsightsFromHashResponse>;
  /** An admin-only query to view existing pre-bucketed experiment assignments for users and workspaces */
  getExperimentBatchAssignments?: Maybe<GetExperimentBatchAssignmentsResponse>;
  /** Used for fetching a feature flag value using a custom key */
  getFeatureFlagValueForCustomKey?: Maybe<GetFeatureFlagValueForCustomKeyResponse>;
  getFeatureFlags?: Maybe<FeatureFlags>;
  /** Get the reason why LaunchDarkly has assigned a flag value for a user */
  getFlagAssignmentForUser?: Maybe<GetFlagAssignmentForUserResponse>;
  /** Get all of the ACL entries for a folder */
  getFolderAclEntries?: Maybe<GetFolderAclEntriesResponse>;
  /** Returns all the streams that the current profile is followed by */
  getFollowedByStreamsforProfile?: Maybe<GetFollowedByStreamsforProfileResponse>;
  /** Returns all the streams that the current profile is following */
  getFollowsStreamsforProfile?: Maybe<GetFollowsStreamsforProfileResponse>;
  getGeneratedVideoDraft?: Maybe<GetGeneratedVideoDraftResult>;
  /** Check what the google scopes have been added for the user */
  getGoogleOAuth?: Maybe<GetGoogleOAuthResponse>;
  /** Get whether the video has trimmed filler words */
  getHasTrimmedFillerWords?: Maybe<GetHasTrimmedFillerWordsResponse>;
  /** get all incentives for a user in a workspace */
  getIncentivesForUser?: Maybe<GetIncentivesForUserResponse>;
  /** Get impactful videos for insights hub */
  getInsightsValueForTimeframes?: Maybe<GetInsightsValueForTimeframesResponse>;
  /** Get impactful videos for insights hub */
  getInsightsforHub?: Maybe<GetInsightsforHubResponse>;
  /** Retrieves the active status of the Integration for a workspace. */
  getIntegrationActive?: Maybe<GetIntegrationActiveResponse>;
  /**
   * Get if the video is using auto titling or auto description
   * @deprecated Use getAutoFeatureStatuses instead
   */
  getIntelligenceStatus?: Maybe<GetIntelligenceStatusResponse>;
  /** get the invite link for a specific user, workspace and role */
  getInviteLink?: Maybe<GetInviteLinkResponse>;
  getInvoices?: Maybe<GetInvoicesResponse>;
  /** Retrieves a boolean on whether or not the owner of the video is in the Calendly feature flag */
  getIsInCalendlySegment?: Maybe<GetIsInCalendlySegmentResponse>;
  /** Check if a video is pinned in the library */
  getIsVideoPinned?: Maybe<GetIsVideoPinnedResponse>;
  /** Check if the user has an active Jira OAuth connection */
  getJiraConnectionForUser?: Maybe<GetJiraConnectionForUserResponse>;
  /** Get whether the user joined by an organization invitation */
  getJoinByOrgInvite?: Maybe<GetJoinByOrgInviteResponse>;
  /** Retrieves the last watched time for a logged in user */
  getLastWatchTime?: Maybe<GetLastWatchTimeResponse>;
  /** Check if the user has an active Linear OAuth connection */
  getLinearConnectionForUser?: Maybe<GetLinearConnectionForUserResponse>;
  getLinkedAtlassianInfoForUser?: Maybe<GetLinkedAtlassianInfoForUserResponse>;
  /** Get a list of Looms to display on the Looms page */
  getLooms?: Maybe<GetLoomsResponse>;
  /** Get takeaways from a meeting recording. */
  getMeetingTakeaways?: Maybe<GetMeetingTakeawaysResponse>;
  /** Retrieve a member property for a particular workspace */
  getMemberProperty?: Maybe<GetMemberPropertyResponse>;
  /** Retrieve a member property for a particular workspace (typed args) */
  getMemberPropertyV2?: Maybe<GetMemberPropertyV2Response>;
  /** Will return all the workspace groups in a workspace. */
  getMembersForWorkspaceGroup?: Maybe<GetMembersForWorkspaceGroupResponse>;
  /** Get the most recent invoice with the given status */
  getMostRecentInvoiceInDunning?: Maybe<GetMostRecentInvoiceInDunningResponse>;
  /** Get the most recently used assets by user with pagination */
  getMostRecentlyUsedAssets?: Maybe<GetMostRecentlyUsedAssetsResponse>;
  /** Returns a list of closed spaces a user is a part of */
  getMyClosedSpaceMemberships?: Maybe<GetMyClosedSpaceMembershipsResponse>;
  /** Returns a list of spaces memberships for the user */
  getMySpaceMemberships?: Maybe<GetMySpaceMembershipsResponse>;
  /** Returns a list of spaces a user belongs to */
  getMySpaces?: Maybe<GetMySpacesResponse>;
  getOAuthAndUserIdentityProviderForUser?: Maybe<GetOAuthAndUserIdentityProviderForUserResponse>;
  /** Returns a list of spaces a user is eligible to join within the current workspace */
  getOpenSpaces?: Maybe<GetOpenSpacesResponse>;
  getOrganizationAdmins?: Maybe<GetOrganizationAdminsResponse>;
  getPaginatedStripeInvoices?: Maybe<GetPaginatedStripeInvoicesResponse>;
  /** Get a list of parent folders for the input folder, listed in hierarchal order, excluding special folders */
  getParentFolders?: Maybe<GetParentFoldersResponse>;
  /** Get client secret for Stripe payment intent */
  getPaymentIntentClientSecret?: Maybe<GetPaymentIntentClientSecretResponse>;
  /** Get Payment Method On File */
  getPaymentIntentRequiresAction?: Maybe<GetPaymentIntentRequiresActionResponse>;
  /** Get Payment Method On File */
  getPaymentMethodOnFile?: Maybe<GetPaymentMethodOnFileResponse>;
  getPendingWorkspaceInvitesForUser?: Maybe<GetPendingWorkspaceInvitesForUserResponse>;
  getPersonalizedVideoReplacements?: Maybe<GetPersonalizedVideoReplacementsResponse>;
  /** Get workspace assignments for PnP experiments */
  getPnpAssignmentsForUser?: Maybe<GetPnpAssignmentsForUserResponse>;
  /** Get PnP RBAC updates for workspace */
  getPnpUpdatesForWorkspace?: Maybe<GetPnpUpdatesForWorkspaceResponse>;
  /** Retrieve metadata for all flags in the prebucket registry */
  getPrebucketedFeatureFlags?: Maybe<GetPrebucketedFeatureFlagsResponse>;
  getPreviewForReplacements?: Maybe<GetPreviewForReplacementsResponse>;
  getPrimaryAuthTypeForEmail?: Maybe<GetPrimaryAuthTypeForEmailResponse>;
  getPrimarySpace?: Maybe<GetPrimarySpaceResponse>;
  /** Get a list of Looms to display for a public folder which may be accessed anonymously */
  getPublicFolderLooms?: Maybe<GetPublicFolderLoomsResponse>;
  /** Get a list of published folders to display on Destination pages. This includes folders created by the user in the workspace or their userspace */
  getPublishedFolders?: Maybe<GetPublishedFoldersResponse>;
  getRankedSmartInvites?: Maybe<GetRankedSmartInvitesResponse>;
  /** Get active workspace download receipt URL for Stripe invoice */
  getReceiptUrl?: Maybe<GetReceiptUrlResponse>;
  /** Get recorded in last 30 days */
  getRecordedInLast30Days?: Maybe<GetRecordedInLast30DaysResponse>;
  /** Get the referral link id for a user and build the referral url */
  getReferralLinkUrl?: Maybe<GetReferralLinkUrlResponse>;
  getResumeSubscriptionInvoiceProjection?: Maybe<GetResumeSubscriptionInvoiceProjectionResponse>;
  getRoleChangeProps?: Maybe<RoleChangePropsResponse>;
  /** Gets the auto feature statuses for a given screenshot, otherwise returns a UserNotAuthorizedError or EntityNotFoundError */
  getScreenshotAutoFeatureStatuses?: Maybe<GetScreenshotAutoFeatureStatusesResponse>;
  getScreenshots?: Maybe<GetScreenshotsResponse>;
  /** Get tags that are commonly used by the user in conjunction with the specified tag */
  getSecondaryTags?: Maybe<GetSecondaryTagsResponse>;
  /** Returns a list of max 10 recommendations for user based on sharing history and spaces user is a member of */
  getSharingRecommendations?: Maybe<GetSharingRecommendationsResponse>;
  /** Get information about a given Slack backlink */
  getSlackBacklinkPreviewInfo?: Maybe<GetSlackBacklinkPreviewInfoResponse>;
  getSpace?: Maybe<GetSpaceResponse>;
  getSpaceAdminProps?: Maybe<SpaceAdminPropsResponse>;
  getSpaceInvitationProps?: Maybe<SpaceInvitationPropsResponse>;
  /** Returns a list of members that belong to a space */
  getSpaceMembers?: Maybe<GetSpaceMembersResponse>;
  getSpaceStateChangeProps?: Maybe<SpaceStateChangePropsResponse>;
  getSpaceVideoMovedCardProps?: Maybe<SpaceVideoMovedCardPropsResponse>;
  /** Returns a list of suggested streams for the user to follow */
  getSuggestedStreams?: Maybe<GetSuggestedStreamsResponse>;
  getSuggestedTags?: Maybe<GetSuggestedTagsResponse>;
  getSuggestedWorkspaceForCurrentUser?: Maybe<GetSuggestedWorkspaceForCurrentUserResponse>;
  getTagsByVideoId?: Maybe<GetTagsByVideoIdResponse>;
  /** Returns the test_clock time for a customer */
  getTestClock?: Maybe<GetTestClockResponse>;
  getTopWorkspaceByUserEmailDomain?: Maybe<GetTopWorkspaceByUserEmailDomainResponse>;
  /** Returns the specified user's videos count */
  getTotalVideosCountByUser?: Maybe<GetTotalVideosCountByUserResponse>;
  /** Returns all transcript corrections in a video */
  getTranscriptCorrections?: Maybe<GetTranscriptCorrectionsResponse>;
  getTranscriptForNotification?: Maybe<GetTranscriptForNotificationResponse>;
  /** Will return all unsynced meetings for a user. */
  getUnsyncedRecordings?: Maybe<GetUnsyncedRecordingsResponse>;
  getUpcomingInvoice?: Maybe<GetUpcomingInvoiceResponse>;
  getUpgradeWorkspaceRequestStatus?: Maybe<GetUpgradeWorkspaceRequestStatusResponse>;
  /** Returns the user object for a specified user ID */
  getUserById?: Maybe<GetUserByIdResponse>;
  /** Returns the user object for a specified profile ID/URL */
  getUserByProfileId?: Maybe<GetUserByProfileIdResponse>;
  /** Gets user Email notification preferences by its consent subscription key */
  getUserEmailNotificationPreference?: Maybe<GetUserEmailNotificationPreferenceResponse>;
  /** Returns all the streams that the currently logged in user follows - tags, profiles etc. */
  getUserFollowedStreams?: Maybe<GetUserFollowedStreamsResponse>;
  /** Returns count of following and followed by profiles for user */
  getUserFollowsCount?: Maybe<GetUserFollowsCountResponse>;
  /** Returns a boolean indicating if the logged in user follows the passed in profile */
  getUserFollowsProfile?: Maybe<GetUserFollowsProfileResponse>;
  /** Returns a boolean indicating if the logged in user follows the passed in tag */
  getUserFollowsTag?: Maybe<GetUserFollowsTagResponse>;
  /** Returns a boolean indicating if the logged in user follows the passed in video */
  getUserFollowsVideo?: Maybe<GetUserFollowsVideoResponse>;
  /** Returns the user object for a user based on their profile URL. */
  getUserFromProfileUrl?: Maybe<GetUserFromProfileUrlResponse>;
  getUserHasAccessToPersonalizedAudio?: Maybe<GetUserHasAccessToPersonalizedAudioResponse>;
  getUserIdFromEmail?: Maybe<GetUserIdFromEmailResponse>;
  getUserIdFromProfileUrl?: Maybe<GetUserIdFromProfileUrlResponse>;
  getUserLookup?: Maybe<GetUserLookupResponse>;
  /** Retrieve a user property for another user in a particular workspace */
  getUserProfileProperties?: Maybe<GetUserProfilePropertiesResponse>;
  /** Retrieve locale, localeRequiresMarketingOptIn, and consentGranted when refetching consent on welcome screen */
  getUserPropertiesForGmoiExplicitRefetch?: Maybe<GetUserPropertiesForGmoiExplicitRefetchResponse>;
  /** Retrieve a user property for a particular workspace */
  getUserProperty?: Maybe<GetUserPropertyResponse>;
  getUserUgcDataUseSettings?: Maybe<GetUserUgcDataUseSettingsResponse>;
  /** Returns the specified user's video settings */
  getUserVideoSettings?: Maybe<GetUserVideoSettingsResponse>;
  /** Returns the count of videos on user's watch later list */
  getUserWatchLaterListCount?: Maybe<GetUserWatchLaterListCountResponse>;
  /** Get the workspace id from a notification id */
  getUserWorkspaceFromNotificationId?: Maybe<GetUserWorkspaceFromNotificationIdResponse>;
  /** Fetch a video by ID, and get either a video, a PrivateVideo placeholder object, or a VideoPasswordMissingOrIncorrect placeholder object */
  getVideo?: Maybe<GetVideoResponse>;
  /** Get all of the ACL entries for a video */
  getVideoAclEntries?: Maybe<GetVideoAclEntriesResponse>;
  getVideoAutoGenInfo?: Maybe<GetVideoAutoGenInfoResult>;
  /** Get a list of backlinks associated with a video */
  getVideoBacklinks?: Maybe<GetVideoBacklinksResponse>;
  getVideoEditPreview?: Maybe<GetVideoEditPreviewResponse>;
  /** Retrieve a video property for a particular video */
  getVideoProperty?: Maybe<GetVideoPropertyResponse>;
  /** Query that tells you the recovery status of a video. */
  getVideoRecoveryStatus?: Maybe<GetVideoRecoveryStatusResponse>;
  getVideoSuggestion?: Maybe<GetVideoSuggestionResponse>;
  /** Get a list of tasks associated with a video */
  getVideoTasks?: Maybe<GetVideoTasksResponse>;
  /** Gets a transcoded URL for a video */
  getVideoTranscodedUrl?: Maybe<VideoSourceResponse>;
  /** Get the language chosen for transcribing this video */
  getVideoTranscriptionLanguage?: Maybe<GetVideoTranscriptionLanguageResponse>;
  getVideoTrimProgress?: Maybe<VideoTrimProgress>;
  getVisibleTotalForTag?: Maybe<GetVisibleTotalForTagResponse>;
  getWorkOSAdminPortalLink?: Maybe<GetWorkOsAdminPortalLinkResponse>;
  /** Returns workspace-level entitlement details from AGG */
  getWorkspaceAGGEntitlements?: Maybe<GetWorkspaceAggEntitlementsResponse>;
  /** Returns workspace-level billing grant from AGG */
  getWorkspaceAGGGrant?: Maybe<GetWorkspaceAggGrantResponse>;
  /** Returns Atlassian organization ID for the workspace */
  getWorkspaceAGGOrgId?: Maybe<GetWorkspaceAggOrgIdResponse>;
  /** Returns workspace subscribed add-ons */
  getWorkspaceAddOns?: Maybe<GetWorkspaceAddOnsResponse>;
  /** Returns a list of all archived open spaces and closed spaces that are now archived that the user is a part of within the current workspace */
  getWorkspaceArchivedSpaces?: Maybe<GetWorkspaceArchivedSpacesResponse>;
  getWorkspaceBillingDetails?: Maybe<BillingEntity>;
  getWorkspaceBillingDetailsByExternalCustomerId?: Maybe<BillingEntity>;
  getWorkspaceDeletionTokens?: Maybe<GetWorkspaceDeletionTokensResponse>;
  /** Will return a specific workspace group by its ID. */
  getWorkspaceGroupById?: Maybe<GetWorkspaceGroupByIdResponse>;
  /** Will return all the workspace groups in a workspace. */
  getWorkspaceGroupsForWorkspace?: Maybe<GetWorkspaceGroupsForWorkspaceResponse>;
  getWorkspaceMembers?: Maybe<WorkspaceMembers>;
  /** Returns the value of a setting */
  getWorkspaceSetting?: Maybe<GetWorkspaceSettingResponse>;
  /** Returns the active admins of the workspace ordered by the membership 'createdAt' date */
  getWorkspaceSettings?: Maybe<WorkspaceSettingsResponse>;
  /** Returns a list of spaces in a workspace for admin settings view */
  getWorkspaceSpaces?: Maybe<GetWorkspaceSpacesResponse>;
  getWorkspaceUgcDataUseSettings?: Maybe<GetWorkspaceUgcDataUseSettingsResponse>;
  /** Returns the user object for other users in the requester's workspace */
  getWorkspaceUser?: Maybe<GetWorkspaceUserResponse>;
  hasAnonymousCreatorPrivilegesQuery?: Maybe<HasAnonymousCreatorPrivilegesQueryResponse>;
  /** Check if the user has added the Gmail scope */
  hasGmailScope?: Maybe<HasGmailScopeResponse>;
  /** Impersonating a user account */
  impersonate?: Maybe<ImpersonateResponse>;
  isAllowedDomainForOrg?: Maybe<IsAllowedDomainForOrgResponse>;
  isExistingSsoDomain?: Maybe<IsExistingSsoDomainResponse>;
  isSsoEnabledForOrg?: Maybe<IsSsoEnabledForOrgResponse>;
  isSsoEnabledForUser?: Maybe<IsSsoEnabledForUserResponse>;
  isUserLoggedIn?: Maybe<Scalars['Boolean']['output']>;
  isUsersOnlyVideo?: Maybe<IsUsersOnlyVideo>;
  /** Permits searching for additional data on a field */
  jiraFieldSearch?: Maybe<JiraFieldSearchResponse>;
  /** Get the metadata pertaining to a Jira sites */
  jiraSiteMetadata?: Maybe<JiraSiteMetadataResponse>;
  /** Get the assignees id and name in the workspace and the pagination info */
  linearAssignees?: Maybe<LinearAssigneesResponse>;
  /** Get the Linear fields information available in the workspace */
  linearFields?: Maybe<LinearFieldsResponse>;
  /** Get the projects id and name in the workspace and the pagination info */
  linearProjects?: Maybe<LinearProjectsResponse>;
  /** Get the teams id and name in the workspace and the pagination info */
  linearTeams?: Maybe<LinearTeamsResponse>;
  /** List external API tokens */
  listExternalAPIToken?: Maybe<ListExternalApiTokenResponse>;
  listPhoneticHints?: Maybe<ListPhoneticHintsResponse>;
  listPrices?: Maybe<ListPricesResponse>;
  listTaxIds?: Maybe<ListTaxIdsResponse>;
  /** Get prices assigned to a customer */
  loommateGetCheckoutPrices?: Maybe<LoommateGetCheckoutPricesResponse>;
  /** Get Customer */
  loommateGetCustomer?: Maybe<LoommateGetCustomerResponse>;
  /** Loommate Get Payment Method On File */
  loommateGetPaymentMethodOnFile?: Maybe<LoommateGetPaymentMethodOnFileResponse>;
  /** Get the state of the Quantity Smart Sync Store */
  loommateGetQuantitySmartSyncStore?: Maybe<GetQuantitySmartSyncStoreResponse>;
  /** Get Redeemed Discounts */
  loommateGetRedeemedDiscounts?: Maybe<LoommateGetRedeemedDiscountsResponse>;
  /** Get Source (deprecated) */
  loommateGetSource?: Maybe<LoommateGetSourceResponse>;
  me?: Maybe<RegularUser>;
  /** Get list of meeting invitees for a meeting recording */
  meetingInvitees?: Maybe<MeetingInviteesResponse>;
  /** Check if a meeting recorder has Automated Meeting Notes enabled */
  meetingRecorderHasAmn?: Maybe<MeetingRecorderHasAmnResponse>;
  /** Returns videos owned by the user that have been recently activity by others */
  mobileHomeActivity?: Maybe<MobileHomeActivityResponse>;
  myTopLevelFolders: Array<RegularUserFolder>;
  myVideosFolder: RegularUserFolder;
  notification?: Maybe<Notification>;
  notificationsForTray?: Maybe<Array<Maybe<NotificationTrayItem>>>;
  notificationsPage?: Maybe<NotificationsPageResponse>;
  organization?: Maybe<Organization>;
  /** Get all of the trending videos in a user's workspace */
  paginatedWorkspaceTrendingVideos?: Maybe<PaginatedWorkspaceTrendingVideosResponse>;
  partnerNameIsUnique?: Maybe<PartnerNameIsUniqueResponse>;
  personalizedVideosInProgress?: Maybe<PersonalizedVideosInProgressResponse>;
  previewDataRetention?: Maybe<PreviewDataRetentionResponse>;
  previewUpcomingInvoices?: Maybe<PreviewUpcomingInvoicesResponse>;
  pushNotificationCredentials?: Maybe<PushCredentialsType>;
  recentTeamVideos?: Maybe<RecentTeamVideosAnswer>;
  recentUserVideos?: Maybe<Array<Maybe<RegularUserVideo>>>;
  /** Add a feature flag to the prebucket registry */
  registerPrebucketedFeatureFlag?: Maybe<RegisterPrebucketedFeatureFlagResponse>;
  /** Remove a registered Prebucketed feature flag */
  removePrebucketedAudienceFromRedis?: Maybe<RemovePrebucketedAudienceFromRedisResponse>;
  /** Get the screenshot object by id */
  screenshot?: Maybe<Screenshot>;
  screenshotAnnotations?: Maybe<ScreenshotAnnotationsResponse>;
  screenshotCanvasOverlays?: Maybe<ScreenshotCanvasOverlaysResponse>;
  screenshotPrivacy?: Maybe<ScreenshotPrivacyResponse>;
  /** @deprecated Use searchV2 instead */
  search?: Maybe<Array<Maybe<VideoFromSearch>>>;
  searchFolders?: Maybe<SearchFoldersResponse>;
  /** Search for spaces a user is a member of, e.g. for use by a typeahead */
  searchMySpaces?: Maybe<SearchMySpacesResponse>;
  /** Search workspace groups by name or description, paginated */
  searchPaginatedWorkspaceGroups?: Maybe<SearchPaginatedWorkspaceGroupsResponse>;
  /** Search the filtered workspace invitees with pagination */
  searchPaginatedWorkspaceInvitees?: Maybe<SearchPaginatedWorkspaceInviteesResponse>;
  /** Search the filtered workspace members with pagination */
  searchPaginatedWorkspaceMembers?: Maybe<SearchPaginatedWorkspaceMembersResponse>;
  searchSemanticVideos?: Maybe<SearchSemanticVideosResponse>;
  /** Search for spaces a user is a member of and open spaces, e.g. for use by a typeahead */
  searchSpaces?: Maybe<SearchSpacesResponse>;
  /** Returns a video that can be added to a space */
  searchSpacesVideoId?: Maybe<SearchSpacesVideoIdResponse>;
  /** Search for a list of videos that can be added to a space */
  searchSpacesVideosKeyword?: Maybe<SearchSpacesVideosKeywordResponse>;
  searchVideos?: Maybe<SearchVideosResponse>;
  /** Will return a video that can be weaved */
  searchWeaveVideoId?: Maybe<SearchWeaveVideoIdResponse>;
  searchWeaveVideosKeyword?: Maybe<SearchWeaveVideosKeywordResponse>;
  /** Will return all the workspace contacts that match the query. */
  searchWorkspaceContacts?: Maybe<SearchWorkspaceContactsResponse>;
  /** Search among workspace groups by name */
  searchWorkspaceGroups?: Maybe<SearchWorkspaceGroupsResponse>;
  searchWorkspaceInviteByToken?: Maybe<SearchWorkspaceInviteByTokenResponse>;
  /** Search the workspace members */
  searchWorkspaceMembers?: Maybe<SearchWorkspaceMembersResponse>;
  /** Search the workspace members excluding specified roles */
  searchWorkspaceMembersExcludingRole?: Maybe<SearchWorkspaceMembersExcludingRoleResponse>;
  /** Searches a list of spaces in a workspace for admin settings view */
  searchWorkspaceSpaces?: Maybe<SearchWorkspaceSpacesResponse>;
  /** Will return all the workspace tags that match the query along with a count for how many videos are tagged. */
  searchWorkspaceTags?: Maybe<SearchWorkspaceTagsResponse>;
  /** Query that directs recorder clients on how to handle missing video parts that still remain on on the user machine. */
  shouldResumeFailedVideoUpload?: Maybe<ShouldResumeFailedVideoUploadResponse>;
  ssoInfo?: Maybe<SsoInfoResponse>;
  /** Retrieve storage incentives records for an inviter in a workspace */
  storageIncentivesTotal?: Maybe<StorageIncentivesTotalResponse>;
  teamVideosFolder?: Maybe<RegularUserFolder>;
  /** Start the transfer process for a registered Prebucketed feature flag */
  transferPrebucketedFeatureFlag?: Maybe<TransferPrebucketedFeatureFlagResponse>;
  unseenNotificationsCount?: Maybe<UnseenNotificationsCountResponse>;
  /** Create a pre-auth payment intent for a customer to update their payment method */
  updatePaymentMethodIntent?: Maybe<UpdatePaymentMethodIntentResponse>;
  userNotificationSettings?: Maybe<NotificationSettings>;
  userWorkspaceMemberships?: Maybe<Array<Maybe<OrganizationMember>>>;
  userWorkspaceMembershipsAdmin?: Maybe<UserWorkspaceMembershipsAdminResponse>;
  validatePromotionCode?: Maybe<ValidatePromotionCodeResponse>;
  videoReaction?: Maybe<PublicVideoReaction>;
  videoReactionsForVideo: Array<PublicVideoReaction>;
  video_comment?: Maybe<PublicVideoComment>;
  /**
   *
   *         Sends down the users activity history, cached upto the last
   *     400 views and all reactions/comments in the enclosing time range.
   *     Going further back will hit the DB in most cases. the queries are
   *     indexed but reach out to a backend eng to make sure the db can
   *     support the client use case
   *
   */
  viewerActivityHistory: Array<Maybe<RegularUserActivity>>;
  workspaceTrendingTags?: Maybe<WorkspaceTrendingTagsResponse>;
  /** Get videos for a specific workspace (for workspace admin only) - includes only public and workspace privacy videos, excludes owner-only privacy videos */
  workspaceVideos?: Maybe<GetWorkspaceVideosResponse>;
};


export type QueryAdminEvaluatePrivacyAndDiscoverabilityForUserArgs = {
  userId: Scalars['ID']['input'];
  videoId: Scalars['ID']['input'];
};


export type QueryAdminFindFoldersArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  parentFolderId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAdminFindSpacesArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  spaceId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAdminFindUsersInDomainArgs = {
  domain?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  excludeActiveMembers?: InputMaybe<Scalars['Boolean']['input']>;
  excludeDeactivatedMembers?: InputMaybe<Scalars['Boolean']['input']>;
  excludeExistingMembers?: InputMaybe<Scalars['Boolean']['input']>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetAiLimitArgs = {
  userQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetAutoContextAuditLogArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetBillingEntityArgs = {
  billingEntityId: Scalars['ID']['input'];
};


export type QueryAdminGetCalendarInfoArgs = {
  email: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetDesktopLogsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryAdminGetDesktopVersionArgs = {
  releaseChannel: DesktopVersionTypes;
};


export type QueryAdminGetDeveloperAccountArgs = {
  developerAccountId: Scalars['String']['input'];
};


export type QueryAdminGetEditableTranscriptArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetEmailDigestInsightsArgs = {
  userQuery: Scalars['String']['input'];
};


export type QueryAdminGetFfProbeDataArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetFolderPermissionsArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryAdminGetIncentiveEligibleInvitesArgs = {
  userQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetIntegrationSubscriptionQueryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminGetIntegrationSubscriptionsForSalesforceArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdminGetInvoiceDetailsArgs = {
  loomInvoiceId: Scalars['String']['input'];
};


export type QueryAdminGetInvoicesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetJobStatusArgs = {
  jobId: Scalars['ID']['input'];
};


export type QueryAdminGetLegacyWorkspaceMigrationArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetMediaTranscriptArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetMeetingBotInfoArgs = {
  externalId: Scalars['ID']['input'];
  meetingCode: Scalars['String']['input'];
  meetingUrl: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetMeetingInfoArgs = {
  meetingUrl: Scalars['String']['input'];
  workspaceIdOrGuid: Scalars['ID']['input'];
};


export type QueryAdminGetMostRecentUserVideoRecordingClientVersionArgs = {
  recordingClientType?: InputMaybe<RecordingClient>;
  userId: Scalars['Int']['input'];
};


export type QueryAdminGetReferralLinkUrlArgs = {
  inviterQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetSessionsForUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryAdminGetSlackSubscriptionConnectionsForUserArgs = {
  userQuery: Scalars['String']['input'];
};


export type QueryAdminGetSpaceArgs = {
  spaceId: Scalars['ID']['input'];
};


export type QueryAdminGetSpaceMembersArgs = {
  spaceId: Scalars['ID']['input'];
};


export type QueryAdminGetSpaceVideosArgs = {
  spaceId: Scalars['ID']['input'];
};


export type QueryAdminGetStripeEventDetailsArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryAdminGetTagsByVideoIdArgs = {
  videoId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetTierPricesArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetTopWorkspaceByUserEmailDomainArgs = {
  email: Scalars['String']['input'];
};


export type QueryAdminGetTranscodeStatusArgs = {
  videoIdsJobTypes: Array<AdminGetTranscodeStatusArgs>;
};


export type QueryAdminGetUserArgs = {
  userQuery: Scalars['String']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAdminGetUserPropertyArgs = {
  name: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryAdminGetUsersArgs = {
  userQueries: Array<Scalars['String']['input']>;
};


export type QueryAdminGetUsersByDomainArgs = {
  domain: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminGetVariablesVideosAndFolderInformationArgs = {
  childVideoId?: InputMaybe<Scalars['ID']['input']>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  parentVideoId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAdminGetVideoSharesArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetViewableTranscriptArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryAdminGetVisibleTotalForTagArgs = {
  source: LoomsSource;
  tag: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetWorkosConnectionArgs = {
  workspaceIdOrOrgId: Scalars['String']['input'];
};


export type QueryAdminGetWorkosUserIdsArgs = {
  loomUserQueries: Array<Scalars['String']['input']>;
};


export type QueryAdminGetWorkspaceAuditLogsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetWorkspaceByAnyIdArgs = {
  includeDeletedWorkspaces?: InputMaybe<Scalars['Boolean']['input']>;
  includeDestroyedWorkspaces?: InputMaybe<Scalars['Boolean']['input']>;
  query: Scalars['String']['input'];
};


export type QueryAdminGetWorkspaceDomainsArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetWorkspaceEmailAuditLogsArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetWorkspaceSettingsArgs = {
  names: Array<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminGetWorkspaceVideoActionArgs = {
  action: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryAdminListIntegrationSubscriptionQueryArgs = {
  excludeSandbox?: InputMaybe<Scalars['Boolean']['input']>;
  externalOrganizationIds?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  integrationType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  shouldDecryptTokenData?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdminListSdkPartnersQueryArgs = {
  excludeSandbox?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nameFilter?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminListSubscriptionUserConnectionsQueryArgs = {
  externalUserIds?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  shouldDecryptTokenData?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAiMeetingNotesLocationArgs = {
  calendarMeetingGuid?: InputMaybe<Scalars['ID']['input']>;
  calendarMeetingId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAutomatedMeetingNotesUserPermissionsArgs = {
  isFromWorkspaceSettings?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCheckIfUserHasEducationStatusArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckIfUserWithEmailExistsArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckPasswordArgs = {
  password: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};


export type QueryConfluenceContentArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  spaceKey: Scalars['String']['input'];
  visited?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryConfluenceSpacesArgs = {
  favourite?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  spaceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  visited?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCustomValidateEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryDataRetentionArgs = {
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDetermineAudioPersonalizationEligibilityArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryDeveloperAccountByUserQueryArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDownloadDisabledForVideoArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryEngagementInsightsExportPreviewArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEngagementInsightsSummaryForVideoArgs = {
  videoId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFetchAutoCommentDisplayControlsArgs = {
  videoId: Scalars['String']['input'];
};


export type QueryFetchInvitationCapabilitiesArgs = {
  isOnboarding?: InputMaybe<Scalars['Boolean']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryFetchLiveTranscriptArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryFetchOrganizationMemberInfoForInviteLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFetchOrganizationMemberInfoForInviteeSignupArgs = {
  token: Scalars['String']['input'];
};


export type QueryFetchPreviewBillingPlanChangeArgs = {
  addOnTypes?: InputMaybe<Array<Addon>>;
  coupon?: InputMaybe<Scalars['String']['input']>;
  membersToDowngrade?: InputMaybe<Scalars['Int']['input']>;
  membersToUpgrade?: InputMaybe<Scalars['Int']['input']>;
  plan: WorkspacePlan;
  workspaceId: Scalars['ID']['input'];
};


export type QueryFetchPreviewInvoiceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryFetchRequestVideoAccessFlowArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryFetchTimestampedWordsArgs = {
  clipId?: InputMaybe<Scalars['ID']['input']>;
  isVariables?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryFetchVideoChaptersArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryFetchVideoNudgesArgs = {
  nudgeType?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryFetchVideoPinnedStatusForWorkspaceArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryFetchVideoTranscriptArgs = {
  captionsLanguageSelection?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryFetchVideosByIdArgs = {
  videoIds: Array<Scalars['ID']['input']>;
};


export type QueryFindBillingEntityByInvoiceEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryFindBulkShareVideoAliasArgs = {
  videoId: Scalars['String']['input'];
};


export type QueryFindOrganizationByExternalCustomerIdArgs = {
  externalCustomerId: Scalars['String']['input'];
};


export type QueryFindOrganizationFromMemberEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryFolderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGenerateSpeechFromTextArgs = {
  sharePreamble?: InputMaybe<Scalars['Boolean']['input']>;
  speaker?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};


export type QueryGeneratedIssueArgs = {
  regenerate?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedJiraIssueArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedLinearIssueArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedLoomCategorizationArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedShareMessageArgs = {
  regenerate?: InputMaybe<Scalars['Boolean']['input']>;
  shareMessageType: ShareMessageType;
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedSummaryForViewersArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedVideoQuestionArgs = {
  currentTime: Scalars['Int']['input'];
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedWorkflowContentArgs = {
  contentTemplate: WorkflowTemplateType;
  regenerate?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGeneratedWorkflowDocArgs = {
  regenerate?: InputMaybe<Scalars['Boolean']['input']>;
  template: WorkflowTemplateType;
  videoId: Scalars['ID']['input'];
};


export type QueryGetAggChangePlanUrlArgs = {
  offeringKey?: InputMaybe<Scalars['ID']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetAggManagementUrlArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetAllUserPropertiesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetAllWorkspaceDeletionTokensArgs = {
  siteId?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetAllWorkspacesByUserEmailDomainArgs = {
  excludeFullCreatorLiteWorkspaces?: Scalars['Boolean']['input'];
  excludeUserOwnedWorkspaces?: Scalars['Boolean']['input'];
};


export type QueryGetAndMaybeSyncLocalEmailSettingsArgs = {
  userQuery: Scalars['String']['input'];
};


export type QueryGetAssetArgs = {
  assetId: Scalars['ID']['input'];
};


export type QueryGetAtlassianOrganizationIdArgs = {
  siteId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAutoFeatureStatusesArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetBannerInsightsArgs = {
  types: Array<BannerType>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetBotControlsStateArgs = {
  input: GetBotControlsStateInput;
};


export type QueryGetBulkFlagsForUserArgs = {
  anonId: Scalars['String']['input'];
  extraProperties?: InputMaybe<ExtraPropertiesInput>;
  flags: Array<Scalars['String']['input']>;
};


export type QueryGetBulkFlagsForUserV2Args = {
  anonId: Scalars['String']['input'];
  extraProperties?: InputMaybe<ExtraPropertiesInput>;
  flags: Array<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBulkFlagsForUserV3Args = {
  anonId: Scalars['String']['input'];
  dynamicConfigs?: InputMaybe<Array<Scalars['String']['input']>>;
  experiments?: InputMaybe<Array<Scalars['String']['input']>>;
  extraProperties?: InputMaybe<ExtraPropertiesInput>;
  flags?: InputMaybe<Array<Scalars['String']['input']>>;
  gates?: InputMaybe<Array<Scalars['String']['input']>>;
  launchDarklyFlags?: InputMaybe<Array<Scalars['String']['input']>>;
  legacyFlags?: InputMaybe<Array<Scalars['String']['input']>>;
  statsigExperiments?: InputMaybe<Array<Scalars['String']['input']>>;
  statsigGates?: InputMaybe<Array<Scalars['String']['input']>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBusinessTrialWelcomeCardPropsArgs = {
  notificationId: Scalars['ID']['input'];
};


export type QueryGetCheckoutUpcomingInvoiceArgs = {
  coupon?: InputMaybe<Scalars['String']['input']>;
  downgradeCount?: InputMaybe<Scalars['Int']['input']>;
  prices: CheckoutPrices;
  upgradeCount?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetChildVideosAndParentVideoInfoFromParentIdArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetCommunityLoomIdsForEmptyStatesArgs = {
  returnAll?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetCustomBrandingArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetCustomerArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetDismissWorkflowSneakpeekArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetDuplicateVideoReplacementsArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetEoyInsightsFromHashArgs = {
  hash: Scalars['ID']['input'];
};


export type QueryGetExperimentBatchAssignmentsArgs = {
  entityId: Scalars['ID']['input'];
};


export type QueryGetFeatureFlagValueForCustomKeyArgs = {
  controlType: Scalars['String']['input'];
  flag: Scalars['String']['input'];
  key: Scalars['String']['input'];
};


export type QueryGetFlagAssignmentForUserArgs = {
  controlType?: InputMaybe<ControlTypeEnum>;
  email?: InputMaybe<Scalars['String']['input']>;
  flag: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetFolderAclEntriesArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryGetGeneratedVideoDraftArgs = {
  videoDraftId: Scalars['ID']['input'];
};


export type QueryGetGoogleOAuthArgs = {
  userQuery: Scalars['String']['input'];
};


export type QueryGetHasTrimmedFillerWordsArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetIncentivesForUserArgs = {
  userQuery: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetInsightsValueForTimeframesArgs = {
  dateRangeType: Scalars['String']['input'];
  interval: Scalars['Int']['input'];
};


export type QueryGetInsightsforHubArgs = {
  dateRangeType: Scalars['String']['input'];
  interval: Scalars['Int']['input'];
};


export type QueryGetIntegrationActiveArgs = {
  integrationType: Scalars['String']['input'];
};


export type QueryGetIntelligenceStatusArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetInviteLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvoicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InvoiceStatus>;
};


export type QueryGetIsInCalendlySegmentArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetIsVideoPinnedArgs = {
  context: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetJoinByOrgInviteArgs = {
  email: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetLastWatchTimeArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetMeetingTakeawaysArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetMemberPropertyArgs = {
  name: MemberPropertyEnum;
};


export type QueryGetMemberPropertyV2Args = {
  name: MemberPropertyEnum;
};


export type QueryGetMembersForWorkspaceGroupArgs = {
  workspaceGroupId: Scalars['ID']['input'];
};


export type QueryGetOAuthAndUserIdentityProviderForUserArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOrganizationAdminsArgs = {
  orgId: Scalars['ID']['input'];
};


export type QueryGetPaginatedStripeInvoicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InvoiceStatus>;
};


export type QueryGetParentFoldersArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryGetPaymentIntentClientSecretArgs = {
  externalInvoiceId: Scalars['ID']['input'];
};


export type QueryGetPersonalizedVideoReplacementsArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetPnpAssignmentsForUserArgs = {
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetPnpUpdatesForWorkspaceArgs = {
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetPreviewForReplacementsArgs = {
  audioVariableIds: Array<Scalars['ID']['input']>;
  isOriginalAudio: Scalars['Boolean']['input'];
  previewStartTime?: InputMaybe<Scalars['Float']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetPrimaryAuthTypeForEmailArgs = {
  email: Scalars['String']['input'];
  requestSource?: InputMaybe<Scalars['String']['input']>;
  ssoOnly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetRankedSmartInvitesArgs = {
  inviteSource: Scalars['String']['input'];
};


export type QueryGetReceiptUrlArgs = {
  chargeId: Scalars['String']['input'];
};


export type QueryGetRecordedInLast30DaysArgs = {
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryGetReferralLinkUrlArgs = {
  inviterId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetRoleChangePropsArgs = {
  notificationId: Scalars['ID']['input'];
};


export type QueryGetScreenshotAutoFeatureStatusesArgs = {
  screenshotId: Scalars['ID']['input'];
};


export type QueryGetSecondaryTagsArgs = {
  tag: Scalars['String']['input'];
};


export type QueryGetSlackBacklinkPreviewInfoArgs = {
  backlinkId: Scalars['ID']['input'];
};


export type QueryGetSpaceArgs = {
  spaceId: Scalars['ID']['input'];
};


export type QueryGetSpaceAdminPropsArgs = {
  notificationId: Scalars['ID']['input'];
};


export type QueryGetSpaceInvitationPropsArgs = {
  notificationId: Scalars['ID']['input'];
};


export type QueryGetSpaceMembersArgs = {
  spaceId: Scalars['ID']['input'];
};


export type QueryGetSpaceStateChangePropsArgs = {
  notificationId: Scalars['ID']['input'];
};


export type QueryGetSpaceVideoMovedCardPropsArgs = {
  notificationId: Scalars['ID']['input'];
};


export type QueryGetTagsByVideoIdArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetTestClockArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetTotalVideosCountByUserArgs = {
  userId: Scalars['ID']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetTranscriptCorrectionsArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetTranscriptForNotificationArgs = {
  timestamp: Scalars['Float']['input'];
  videoId: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserByProfileIdArgs = {
  profileId: Scalars['String']['input'];
};


export type QueryGetUserEmailNotificationPreferenceArgs = {
  consentSubscriptionKey: Scalars['String']['input'];
  userQuery: Scalars['Int']['input'];
};


export type QueryGetUserFollowsCountArgs = {
  profileId: Scalars['ID']['input'];
};


export type QueryGetUserFollowsProfileArgs = {
  profileId: Scalars['ID']['input'];
};


export type QueryGetUserFollowsTagArgs = {
  tag: Scalars['String']['input'];
};


export type QueryGetUserFollowsVideoArgs = {
  videoId: Scalars['String']['input'];
};


export type QueryGetUserFromProfileUrlArgs = {
  profileUrl: Scalars['String']['input'];
};


export type QueryGetUserIdFromEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserIdFromProfileUrlArgs = {
  profileUrl: Scalars['String']['input'];
};


export type QueryGetUserLookupArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserProfilePropertiesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserPropertyArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetUserVideoSettingsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserWorkspaceFromNotificationIdArgs = {
  notificationId?: InputMaybe<Scalars['Int']['input']>;
  notificationIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetVideoArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetVideoAclEntriesArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoAutoGenInfoArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoBacklinksArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoEditPreviewArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoPropertyArgs = {
  name: VideoPropertyType;
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoRecoveryStatusArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoSuggestionArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoTasksArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoTranscodedUrlArgs = {
  forceOriginal?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoTranscriptionLanguageArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetVideoTrimProgressArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryGetVisibleTotalForTagArgs = {
  source: LoomsSource;
  tag: Scalars['String']['input'];
};


export type QueryGetWorkOsAdminPortalLinkArgs = {
  intent: Scalars['String']['input'];
};


export type QueryGetWorkspaceAggEntitlementsArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceAggOrgIdArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceAddOnsArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceBillingDetailsArgs = {
  includeDeletedWorkspaces?: InputMaybe<Scalars['Boolean']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceBillingDetailsByExternalCustomerIdArgs = {
  externalCustomerId: Scalars['String']['input'];
};


export type QueryGetWorkspaceDeletionTokensArgs = {
  workspaceDeletionToken: Scalars['String']['input'];
};


export type QueryGetWorkspaceGroupByIdArgs = {
  workspaceGroupId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceGroupsForWorkspaceArgs = {
  withContentPermissions?: InputMaybe<ContentVisibilityProperty>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetWorkspaceMembersArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceSettingArgs = {
  settingName?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['Int']['input']>;
  workspaceIdv2?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetWorkspaceSettingsArgs = {
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryGetWorkspaceUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHasAnonymousCreatorPrivilegesQueryArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryImpersonateArgs = {
  id: Scalars['ID']['input'];
  zendeskTicket: Scalars['ID']['input'];
};


export type QueryIsAllowedDomainForOrgArgs = {
  email: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
};


export type QueryIsExistingSsoDomainArgs = {
  domain: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIsSsoEnabledForOrgArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryIsUsersOnlyVideoArgs = {
  videoId: Scalars['ID']['input'];
};


export type QueryJiraFieldSearchArgs = {
  field: JiraSearchableFieldType;
  query?: InputMaybe<Scalars['String']['input']>;
  siteId: Scalars['String']['input'];
};


export type QueryJiraSiteMetadataArgs = {
  siteId: Scalars['String']['input'];
};


export type QueryListExternalApiTokenArgs = {
  tokenId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListPricesArgs = {
  product?: InputMaybe<Product>;
};


export type QueryListTaxIdsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  postQuery?: InputMaybe<ListTaxIdsPostQueryArgs>;
};


export type QueryLoommateGetCheckoutPricesArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryLoommateGetCustomerArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryLoommateGetPaymentMethodOnFileArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryLoommateGetRedeemedDiscountsArgs = {
  subscriptionId: Scalars['ID']['input'];
};


export type QueryLoommateGetSourceArgs = {
  source: Scalars['ID']['input'];
};


export type QueryMeetingInviteesArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryMeetingRecorderHasAmnArgs = {
  recorderId: Scalars['ID']['input'];
};


export type QueryMyVideosFolderArgs = {
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationsForTrayArgs = {
  isLatest?: Scalars['Boolean']['input'];
  useCache?: Scalars['Boolean']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPartnerNameIsUniqueArgs = {
  partnerName: Scalars['String']['input'];
};


export type QueryPersonalizedVideosInProgressArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryPreviewDataRetentionArgs = {
  interval: DataRetentionInterval;
  intervalCount: Scalars['Int']['input'];
  keep?: InputMaybe<Array<DataRetentionKeep>>;
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPreviewUpcomingInvoicesArgs = {
  addOnTypes?: InputMaybe<Array<Addon>>;
  coupon?: InputMaybe<Scalars['String']['input']>;
  quantityDelta: Scalars['Int']['input'];
};


export type QueryPushNotificationCredentialsArgs = {
  platform: Scalars['String']['input'];
};


export type QueryRecentTeamVideosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecentUserVideosArgs = {
  endDate: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset: Scalars['Int']['input'];
  startDate: Scalars['String']['input'];
};


export type QueryRegisterPrebucketedFeatureFlagArgs = {
  expectedEndDate: Scalars['String']['input'];
  flagName: Scalars['String']['input'];
};


export type QueryRemovePrebucketedAudienceFromRedisArgs = {
  flagName: Scalars['String']['input'];
};


export type QueryScreenshotArgs = {
  id: Scalars['String']['input'];
  source?: InputMaybe<ScreenshotSource>;
};


export type QueryScreenshotAnnotationsArgs = {
  screenshotId: Scalars['ID']['input'];
};


export type QueryScreenshotCanvasOverlaysArgs = {
  screenshotId: Scalars['ID']['input'];
};


export type QueryScreenshotPrivacyArgs = {
  screenshotId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QuerySearchArgs = {
  searchQuery: Scalars['String']['input'];
};


export type QuerySearchFoldersArgs = {
  searchQuery: Scalars['String']['input'];
};


export type QuerySearchSpacesVideoIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchSpacesVideosKeywordArgs = {
  searchQuery: Scalars['String']['input'];
};


export type QuerySearchWeaveVideoIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchWeaveVideosKeywordArgs = {
  searchQuery: Scalars['String']['input'];
};


export type QuerySearchWorkspaceContactsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  source?: InputMaybe<WorkspaceContactSource>;
};


export type QuerySearchWorkspaceGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  searchByDescription?: InputMaybe<Scalars['Boolean']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QuerySearchWorkspaceInviteByTokenArgs = {
  orgToken: Scalars['ID']['input'];
};


export type QuerySearchWorkspaceMembersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};


export type QuerySearchWorkspaceMembersExcludingRoleArgs = {
  excludeScimPendingActionUsers?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};


export type QuerySearchWorkspaceTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryShouldResumeFailedVideoUploadArgs = {
  videoIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type QuerySsoInfoArgs = {
  connectionId: Scalars['ID']['input'];
};


export type QueryTeamVideosFolderArgs = {
  organizationId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTransferPrebucketedFeatureFlagArgs = {
  flagName: Scalars['String']['input'];
};


export type QueryUserWorkspaceMembershipsArgs = {
  memberStatuses?: InputMaybe<Array<OrganizationMemberStatus>>;
};


export type QueryUserWorkspaceMembershipsAdminArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  memberStatuses?: InputMaybe<Array<OrganizationMemberStatus>>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  userQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryValidatePromotionCodeArgs = {
  productId?: Scalars['String']['input'];
  promotionCode?: Scalars['String']['input'];
  purchaseAmount: Scalars['Int']['input'];
};


export type QueryVideoReactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVideoReactionsForVideoArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type QueryVideo_CommentArgs = {
  id: Scalars['ID']['input'];
  type: PublicVideoCommentType;
};


export type QueryViewerActivityHistoryArgs = {
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  timeRange?: InputMaybe<TimeRange>;
};


export type QueryWorkspaceTrendingTagsArgs = {
  algorithm: TrendingTagAlgorithm;
};


export type QueryWorkspaceVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Array<WorkspaceVideoFilterInput>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<WorkspaceVideoSortInput>;
  workspaceId: Scalars['ID']['input'];
};

export type RateLimitReachedError = Error & {
  __typename?: 'RateLimitReachedError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export enum ReactionType {
  Extended = 'extended',
  Loom = 'loom'
}

export type ReceiveBotOutgoingMessagesPayload = {
  __typename?: 'ReceiveBotOutgoingMessagesPayload';
  /** The user who performed the action */
  actingUser?: Maybe<Scalars['String']['output']>;
  /** Whether all relevant bots have the expected status */
  allBotStatusesMatch?: Maybe<Scalars['Boolean']['output']>;
  /** The type of event triggered by the bot */
  event: Scalars['String']['output'];
  /** The GUID of the meeting bot */
  meetingBotGuid: Scalars['ID']['output'];
  /** Whether the receiver should process this message */
  shouldProcessMessage: Scalars['Boolean']['output'];
  /** The ID of the video meeting */
  videoId?: Maybe<Scalars['ID']['output']>;
};

export type RecentTeamVideosAnswer = {
  __typename?: 'RecentTeamVideosAnswer';
  allRecentTeamVideosFetched?: Maybe<Scalars['Boolean']['output']>;
  videos?: Maybe<Array<Maybe<RegularUserVideo>>>;
};

export type RecommendationsType = SpaceRecommendationType | UserRecommendationType;

export type RecommendationsTypeConnection = {
  __typename?: 'RecommendationsTypeConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<RecommendationsTypeEdge>>>;
  /** Flattened list of RecommendationsType type */
  nodes?: Maybe<Array<Maybe<RecommendationsType>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type RecommendationsTypeEdge = {
  __typename?: 'RecommendationsTypeEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<RecommendationsType>;
};

export type RecordSdkApplication = {
  __typename?: 'RecordSDKApplication';
  appName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  domains: Array<Maybe<Scalars['String']['output']>>;
  features?: Maybe<SdkApplicationMetadataFeatures>;
  id?: Maybe<Scalars['ID']['output']>;
  isSandboxKey?: Maybe<Scalars['Boolean']['output']>;
  package?: Maybe<Scalars['String']['output']>;
  privateKeys?: Maybe<Array<Maybe<PrivateKeyInfo>>>;
  publicAppId?: Maybe<Scalars['String']['output']>;
  restrictedPlaybackDomains?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  workspace?: Maybe<Organization>;
  workspaceId?: Maybe<Scalars['String']['output']>;
};

export type RecordSdkInput = {
  hosts: Array<Scalars['String']['input']>;
  partnerName: Scalars['String']['input'];
};

export type RecordSdkMutations = {
  __typename?: 'RecordSDKMutations';
  createVideo?: Maybe<CreateVideoRes>;
  getVideosForPartnerSession?: Maybe<GetVideosForPartnerSessionUnion>;
  videoOwnership?: Maybe<SdkOwnershipUnion>;
};


export type RecordSdkMutationsCreateVideoArgs = {
  flippedCamera: Scalars['Boolean']['input'];
  retries?: InputMaybe<Scalars['Int']['input']>;
  sdkEntryPointName?: InputMaybe<Scalars['String']['input']>;
  sdkProductName?: InputMaybe<Scalars['String']['input']>;
  siteId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  videoProperties: InputVideoProperties;
};


export type RecordSdkMutationsVideoOwnershipArgs = {
  id: Scalars['ID']['input'];
};

export type RecordSdkResponse = GenericError | RecordSdkMutations | UserNotAuthorizedError;

export enum RecordingClient {
  Android = 'android',
  Desktop = 'desktop',
  Extension = 'extension',
  Ios = 'ios',
  MeetingBot = 'meeting_bot',
  SdkRecorder = 'sdk_recorder'
}

export type RecordingEvent = {
  __typename?: 'RecordingEvent';
  cascadingRecordersTabUuid?: Maybe<Scalars['String']['output']>;
  eventName?: Maybe<Scalars['String']['output']>;
  slackRecordingSessionId?: Maybe<Scalars['String']['output']>;
  videoId?: Maybe<Scalars['String']['output']>;
};

export type RecordingEventAttributes = {
  activitySessionId?: InputMaybe<Scalars['ID']['input']>;
  activitySessionVersion?: InputMaybe<Scalars['String']['input']>;
  avgBitRate?: InputMaybe<Scalars['Int']['input']>;
  blur_used_in_recording?: InputMaybe<Scalars['Boolean']['input']>;
  cancelled_previous_recording?: InputMaybe<Scalars['Boolean']['input']>;
  cascadingRecordersTabUuid?: InputMaybe<Scalars['String']['input']>;
  client: Scalars['String']['input'];
  client_timestamp?: InputMaybe<Scalars['Date']['input']>;
  client_version: Scalars['String']['input'];
  countdown?: InputMaybe<Scalars['Boolean']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  cpu_arch?: InputMaybe<Scalars['String']['input']>;
  doNativeHls?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  fromShortcut?: InputMaybe<Scalars['Boolean']['input']>;
  has_been_blurred?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  ip?: InputMaybe<Scalars['String']['input']>;
  isRestart?: InputMaybe<Scalars['Boolean']['input']>;
  latency?: InputMaybe<Scalars['Int']['input']>;
  manifest_version?: InputMaybe<Scalars['Int']['input']>;
  microphone_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  num_elements_blurred?: InputMaybe<Scalars['Int']['input']>;
  openedCanvas?: InputMaybe<Scalars['Boolean']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  os_version?: InputMaybe<Scalars['String']['input']>;
  recordingClient?: InputMaybe<Scalars['String']['input']>;
  recordingFeature?: InputMaybe<Scalars['String']['input']>;
  recording_type?: InputMaybe<Scalars['String']['input']>;
  recording_version?: InputMaybe<Scalars['String']['input']>;
  release_channel?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  restartCount?: InputMaybe<Scalars['Int']['input']>;
  screen_height?: InputMaybe<Scalars['Int']['input']>;
  screen_width?: InputMaybe<Scalars['Int']['input']>;
  sdkPartnerId?: InputMaybe<Scalars['ID']['input']>;
  speaker_notes_rich_text_features_usage?: InputMaybe<SpeakerNotesRichText>;
  speaker_notes_text_length?: InputMaybe<Scalars['Int']['input']>;
  speaker_notes_used?: InputMaybe<Scalars['Boolean']['input']>;
  speedTestResult?: InputMaybe<Scalars['Int']['input']>;
  time_since_app_launch?: InputMaybe<Scalars['Int']['input']>;
  time_since_cancelled_recording?: InputMaybe<Scalars['Int']['input']>;
  uploadMethod?: InputMaybe<Scalars['String']['input']>;
  uploadThroughput?: InputMaybe<Scalars['Float']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  videoHasReachedRecordingLimit?: InputMaybe<Scalars['Boolean']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export enum RecordingType {
  Cam = 'cam',
  Screen = 'screen',
  ScreenCam = 'screen_cam'
}

export enum RecordingVersion {
  Default = 'default',
  Unknown = 'unknown',
  V2 = 'v2',
  V3 = 'v3',
  V4 = 'v4',
  V5 = 'v5',
  V6 = 'v6',
  V7 = 'v7',
  V8 = 'v8'
}

export type RecoverVideo = {
  __typename?: 'RecoverVideo';
  didRecoverVideo: Scalars['Boolean']['output'];
};

export type RecoverVideoResponse = GenericError | RecoverVideo | RecoveryAlreadyInProgressError | UnsupportedRecordingVersionError | UserNotAuthorizedError | UserNotLoggedInError | VideoAlreadyMarkedCompleteError | VideoNotFoundError;

export type RecoveryAlreadyInProgressError = Error & {
  __typename?: 'RecoveryAlreadyInProgressError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type RecreateUserGroupingsPayload = {
  __typename?: 'RecreateUserGroupingsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RecreateVideoGroupingsPayload = {
  __typename?: 'RecreateVideoGroupingsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Recurring pricing information */
export type Recurring = {
  __typename?: 'Recurring';
  interval: Scalars['String']['output'];
  interval_count: Scalars['Int']['output'];
};

export type RedeemIncentiveResponse = GenericError | UserNotAuthorizedError | RedeemIncentivePayloadType;

export type RegenerateExternalApiTokenResponse = GenericError | InputValidationError | RegenerateExternalApiTokenResult | UserNotAuthorizedError;

export type RegenerateExternalApiTokenResult = {
  __typename?: 'RegenerateExternalAPITokenResult';
  name?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type RegenerateMeetingRecap = {
  __typename?: 'RegenerateMeetingRecap';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RegenerateMeetingRecapPayload = {
  __typename?: 'RegenerateMeetingRecapPayload';
  regenerateMeetingRecap?: Maybe<RegenerateMeetingRecap>;
};

export type RegenerateMeetingRecapResponse = EntityNotFoundError | GenericError | RegenerateMeetingRecapPayload | UserNotAuthorizedError;

export type RegisterNewPushSubscriptionPayload = {
  __typename?: 'RegisterNewPushSubscriptionPayload';
  user?: Maybe<RegularUser>;
};

export type RegisterNewPushSubscriptionResponse = GenericError | RegisterNewPushSubscriptionPayload | UserNotAuthorizedError;

export type RegisterPrebucketedFeatureFlagResponse = GenericError | UserNotAuthorizedError | RegisterPrebucketedFeatureFlagPayload;

export type RegularUser = {
  __typename?: 'RegularUser';
  aa_date_linked?: Maybe<Scalars['Date']['output']>;
  aa_date_mastered?: Maybe<Scalars['Date']['output']>;
  aa_id?: Maybe<Scalars['String']['output']>;
  aa_is_mastered?: Maybe<Scalars['Boolean']['output']>;
  account_type?: Maybe<Scalars['String']['output']>;
  /** Current user only. A map of access control for AI features. */
  aiAccess?: Maybe<AiAccess>;
  app_settings?: Maybe<AppSettings>;
  /** Current user only. List of ftux notifications that have not been dismissed by the user. */
  availableFtux?: Maybe<Array<Maybe<AvailableFtux>>>;
  avatars: Array<Avatar>;
  basic_video_limit: Scalars['Int']['output'];
  /** @deprecated Do not use. No longer used... See GetAutomations */
  calendarAutomations?: Maybe<Array<Maybe<CalendarAutomation>>>;
  calendars: Array<CalendarInfo>;
  capabilities: Scalars['JSON']['output'];
  checklist?: Maybe<ChecklistItems>;
  /** Current user only. */
  companyPosition?: Maybe<Scalars['String']['output']>;
  company_name?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  default_workspace_id?: Maybe<Scalars['ID']['output']>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  deletion_pending?: Maybe<Scalars['Boolean']['output']>;
  desktopPushNotificationCredentials?: Maybe<PushCredentialsType>;
  display_name: Scalars['String']['output'];
  /**
   * Current user only. The hash used to identify the user in Elevio
   * @deprecated Do not use. Elevio is deprecated and this should not be referenced.
   */
  elevio_hash?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  /** @deprecated Return email count */
  email_change_count?: Maybe<Scalars['Int']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  /** Current user only. Whether the user has activated either Android or iOS app */
  hasActivatedMobile?: Maybe<Scalars['Boolean']['output']>;
  /** Current user only. Whether web push notifications are enabled for the user. */
  hasWebPushSubcription?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Current user only. Whether the user has activated the Android app
   * @deprecated Use hasActivatedMobile instead.
   */
  has_activated_android_app?: Maybe<Scalars['Boolean']['output']>;
  /** Current user only. Whether the user has activated the Chrome extension */
  has_activated_chrome_extension?: Maybe<Scalars['Boolean']['output']>;
  has_activated_desktop_app?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Current user only. Whether the user has activated the iOS app
   * @deprecated Use hasActivatedMobile instead.
   */
  has_activated_ios_app?: Maybe<Scalars['Boolean']['output']>;
  /** Checks to see if a user has a gmail account */
  has_gmail_account?: Maybe<Scalars['Boolean']['output']>;
  help_options?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  identityMigrationEligibleDate?: Maybe<Scalars['Date']['output']>;
  integration_settings?: Maybe<Scalars['JSON']['output']>;
  /** Current user only. The hash used to identify the user in Intercom */
  intercomHash?: Maybe<Scalars['String']['output']>;
  invite_counts: InviteCounts;
  /** Current user only. Whether the user is a verified education account. */
  isEducationVerified?: Maybe<Scalars['Boolean']['output']>;
  /** Current user only. Indicates if the user is viewing their first recording immediately after leaving a recorder. */
  isFirstRecording?: Maybe<Scalars['Boolean']['output']>;
  /** Current user only. Whether the user is an sdk shared user. */
  isSdkSharedUser?: Maybe<Scalars['Boolean']['output']>;
  is_primary?: Maybe<Scalars['Boolean']['output']>;
  jtbd?: Maybe<Scalars['JSON']['output']>;
  last_country?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  /** deprecated session sync token associated with a user session */
  loomSst?: Maybe<Scalars['String']['output']>;
  meetingRecordingSettings?: Maybe<MeetingRecordingSettings>;
  /** Current user only. The user's active organization memberships. */
  memberships?: Maybe<Array<Maybe<OrganizationMember>>>;
  my_videos?: Maybe<Array<Maybe<RegularUserVideo>>>;
  notification_settings: Scalars['JSON']['output'];
  notifications?: Maybe<Array<Maybe<Notification>>>;
  notifications_user_id: Scalars['String']['output'];
  oauths?: Maybe<Array<Maybe<OAuth>>>;
  onboarding: Scalars['JSON']['output'];
  /** Current user only. Whether the user has set a password. */
  passwordIsSet?: Maybe<Scalars['Boolean']['output']>;
  persona?: Maybe<Scalars['JSON']['output']>;
  profile?: Maybe<RegularUserProfile>;
  profileUri: Scalars['String']['output'];
  push_subscriptions?: Maybe<Scalars['JSON']['output']>;
  recorder_settings: Scalars['JSON']['output'];
  referrer_partner_id?: Maybe<Scalars['ID']['output']>;
  role: Scalars['String']['output'];
  scopes: Array<Maybe<Scalars['String']['output']>>;
  screenshotSettings?: Maybe<UserScreenshotSettings>;
  sensitive_pii_db_email?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  terms_accepted?: Maybe<Scalars['Boolean']['output']>;
  terms_accepted_created_at?: Maybe<Scalars['Date']['output']>;
  timezone_offset: Scalars['Int']['output'];
  tour_settings?: Maybe<Scalars['JSON']['output']>;
  tours?: Maybe<Scalars['JSON']['output']>;
  trial_status?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use "triggers" field instead. Does not resolve to any actual data. */
  trigger?: Maybe<Scalars['JSON']['output']>;
  /** Current user only. A list of completable triggers representing UI events like onboarding or permissions asks. */
  triggers?: Maybe<Array<Maybe<CompletableTrigger>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  /** Return user update sequence number */
  user_update_sequence_number?: Maybe<Scalars['String']['output']>;
  videoSettings?: Maybe<UserVideoSettings>;
  /** @deprecated Use the strongly typed videoSettings instead */
  video_settings?: Maybe<Scalars['JSON']['output']>;
  workspaceId?: Maybe<Scalars['String']['output']>;
};


export type RegularUserIsFirstRecordingArgs = {
  fromRecorder?: InputMaybe<Scalars['Boolean']['input']>;
  videoId?: InputMaybe<Scalars['String']['input']>;
};


export type RegularUserMembershipsArgs = {
  currentOnly?: Scalars['Boolean']['input'];
};


export type RegularUserMy_VideosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offsetDate?: InputMaybe<Scalars['Date']['input']>;
  toDate?: InputMaybe<Scalars['Date']['input']>;
};


export type RegularUserTriggersArgs = {
  triggerNames?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RegularUserActivity = {
  __typename?: 'RegularUserActivity';
  activityTime: Scalars['String']['output'];
  activityType: RegularUserActivityType;
  target?: Maybe<RegularUserVideo>;
  targetName: Scalars['String']['output'];
  targetOwnerName?: Maybe<Scalars['String']['output']>;
  targetThumbnail?: Maybe<Scalars['String']['output']>;
  targetUrl: Scalars['String']['output'];
};

export enum RegularUserActivityType {
  Comment = 'COMMENT',
  VideoReaction = 'VIDEO_REACTION',
  View = 'VIEW'
}

export type RegularUserFolder = {
  __typename?: 'RegularUserFolder';
  contentLastUpdated?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  currentUserCanEdit: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  favorite: Scalars['Boolean']['output'];
  hasSpaceACLRow?: Maybe<Scalars['Boolean']['output']>;
  hasSubFolders?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inheritPermissions?: Maybe<Scalars['Boolean']['output']>;
  isArchived: Scalars['Boolean']['output'];
  isTeamShared: Scalars['Boolean']['output'];
  isTopLevelFolder?: Maybe<Scalars['Boolean']['output']>;
  isUserFavorite?: Maybe<Scalars['Boolean']['output']>;
  library?: Maybe<Scalars['String']['output']>;
  mostRecentVideo?: Maybe<RegularUserVideo>;
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organization_id?: Maybe<Scalars['Int']['output']>;
  organization_idv2?: Maybe<Scalars['ID']['output']>;
  owner: RegularUser;
  owner_id: Scalars['Int']['output'];
  parent_folder?: Maybe<RegularUserFolder>;
  parent_folder_id?: Maybe<Scalars['ID']['output']>;
  personalizedVideo?: Maybe<RegularUserVideo>;
  recentVideos: Array<Maybe<RegularUserVideo>>;
  shared: Scalars['Boolean']['output'];
  space?: Maybe<Space>;
  special_id?: Maybe<Scalars['String']['output']>;
  sub_folders: Array<RegularUserFolder>;
  /** Returns the total number of videos that are in the folder, including videos in nested subfolders */
  totalNestedVideos?: Maybe<Scalars['Int']['output']>;
  totalSubfolders?: Maybe<Scalars['Int']['output']>;
  /** Returns the total number of videos that are in the folder, excluding nested subfolders */
  totalVideos?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Date']['output'];
  videos: Array<RegularUserVideo>;
  visibility?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use 'library' for read operations. This field is still valid for write operations */
  workspace?: Maybe<Scalars['String']['output']>;
};


export type RegularUserFolderSub_FoldersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type RegularUserFolderVideosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offsetDate?: InputMaybe<Scalars['Date']['input']>;
  toDate?: InputMaybe<Scalars['Date']['input']>;
};

export type RegularUserFolderConnection = {
  __typename?: 'RegularUserFolderConnection';
  edges?: Maybe<Array<Maybe<RegularUserFolderEdge>>>;
  nodes?: Maybe<Array<Maybe<RegularUserFolder>>>;
  pageInfo: PageInfo;
};

export type RegularUserFolderEdge = {
  __typename?: 'RegularUserFolderEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<RegularUserFolder>;
};

export type RegularUserPayload = {
  __typename?: 'RegularUserPayload';
  user?: Maybe<RegularUser>;
};

export type RegularUserProfile = {
  __typename?: 'RegularUserProfile';
  communityVideoCount?: Maybe<Scalars['Int']['output']>;
  followerCount?: Maybe<Scalars['Int']['output']>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  profileInfo?: Maybe<ProfilePropertyType>;
  profileUrl?: Maybe<Scalars['String']['output']>;
  profileVideoCount?: Maybe<Scalars['Int']['output']>;
  topUsedTags?: Maybe<TagConnection>;
};


export type RegularUserProfileTopUsedTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export type RegularUserVideo = {
  __typename?: 'RegularUserVideo';
  active_video_transcript_id?: Maybe<Scalars['String']['output']>;
  allow_search_engine_indexing?: Maybe<Scalars['Boolean']['output']>;
  archived: Scalars['Boolean']['output'];
  attachments: Array<VideoAttachment>;
  audioVariables?: Maybe<Array<Maybe<AudioVariable>>>;
  background?: Maybe<VideoBackground>;
  boundedCanvasOverlays: VideoCanvasOverlays;
  boundedTrimRanges: Array<VideoTrimRange>;
  calendarMeetingId?: Maybe<Scalars['String']['output']>;
  cameraBubbleRegion?: Maybe<CameraPickerRegion>;
  chapters?: Maybe<Scalars['String']['output']>;
  clips: Array<VideoClipDetails>;
  commentCount?: Maybe<Scalars['Int']['output']>;
  comments_email_enabled: Scalars['Boolean']['output'];
  comments_enabled: Scalars['Boolean']['output'];
  complete: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  credentials?: Maybe<VideoUploadCredentials>;
  cta: Cta;
  currentUserCanEdit: Scalars['Boolean']['output'];
  currentUserHasWatched?: Maybe<Scalars['Boolean']['output']>;
  current_user_is_owner: Scalars['Boolean']['output'];
  defaultThumbnails: VideoDefaultThumbnailsSources;
  description?: Maybe<Scalars['String']['output']>;
  do_not_show_comments: Scalars['Boolean']['output'];
  downloadDisabledForWorkspace: Scalars['Boolean']['output'];
  /** @deprecated +download_enabled+ is deprecated, use +downloadable+ instead */
  download_enabled: Scalars['Boolean']['output'];
  downloadable: Scalars['Boolean']['output'];
  downloadableBy: DownloadableByType;
  editPreview?: Maybe<CloudfrontSignedUrlPayload>;
  editZoomInstructions: Array<EditZoomInstructionsMetadata>;
  email_gate_video_type: EmailGateVideoType;
  emojiCount?: Maybe<Scalars['Int']['output']>;
  expirationDate?: Maybe<Scalars['String']['output']>;
  flipped_camera: Scalars['Boolean']['output'];
  folder?: Maybe<RegularUserFolder>;
  folder_id: Scalars['String']['output'];
  hasEngagementInsightsAccess?: Maybe<Scalars['Boolean']['output']>;
  hasPassword: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isCommunityLoom: Scalars['Boolean']['output'];
  isMeetingRecording?: Maybe<Scalars['Boolean']['output']>;
  isOnWatchLaterList: Scalars['Boolean']['output'];
  isParentOfPersonalizedCopies: Scalars['Boolean']['output'];
  /** @deprecated Use isParentOfPersonalizedCopies instead */
  isPersonalized: Scalars['Boolean']['output'];
  isTeamShared: Scalars['Boolean']['output'];
  isUserFavorite?: Maybe<Scalars['Boolean']['output']>;
  is_protected: Scalars['Boolean']['output'];
  lastWatchTime?: Maybe<Scalars['Int']['output']>;
  last_reaction_at?: Maybe<Scalars['Date']['output']>;
  library?: Maybe<Scalars['String']['output']>;
  loom_branded_player?: Maybe<Scalars['Boolean']['output']>;
  meetingNotesPage?: Maybe<MeetingNotesPage>;
  meetingRecordingInfo?: Maybe<MeetingRecordingInfo>;
  name: Scalars['String']['output'];
  needs_password: Scalars['Boolean']['output'];
  nullableRawCdnUrl?: Maybe<CloudfrontSignedUrlPayload>;
  organization: Organization;
  organization_id: Scalars['Int']['output'];
  organization_idv2: Scalars['ID']['output'];
  original_hash: Scalars['String']['output'];
  owner: RegularUser;
  owner_id: Scalars['Int']['output'];
  parentVideoProperties?: Maybe<ParentVideoProperties>;
  /** @deprecated Use `privacy` instead. */
  permitted_viewers_only?: Maybe<Scalars['Boolean']['output']>;
  personalizationType?: Maybe<VideoPersonalizationType>;
  playable_duration?: Maybe<Scalars['Float']['output']>;
  privacy?: Maybe<VideoPrivacyStatus>;
  processing_information: ProcessingInformation;
  /** @deprecated Use nullableRawCdnUrl instead */
  rawCdnUrl?: Maybe<CloudfrontSignedUrlPayload>;
  received_a_view: Scalars['Boolean']['output'];
  record_reply_enabled: Scalars['Boolean']['output'];
  s3_id: Scalars['String']['output'];
  salesforce_engagement_tracking?: Maybe<Scalars['Boolean']['output']>;
  seekPreviewCdnUrl?: Maybe<Scalars['String']['output']>;
  sharePageUri: Scalars['String']['output'];
  show_analytics_to_viewer: Scalars['Boolean']['output'];
  show_transcript_to_viewer: Scalars['Boolean']['output'];
  signedDefaultThumbnails: VideoDefaultThumbnailsSources;
  signedThumbnails: VideoThumbnailsSources;
  source_duration?: Maybe<Scalars['Float']['output']>;
  sources: VideoPayloadSources;
  spaceFolders?: Maybe<Array<Maybe<RegularUserFolder>>>;
  spaces?: Maybe<Array<Maybe<SpaceRegularUserVideo>>>;
  stylizedCaptions: Scalars['Boolean']['output'];
  suggested_playback_rate: SuggestedPlaybackRate;
  supportsCameraBubbleRegion: Scalars['Boolean']['output'];
  supportsEditZoomInstructions: Scalars['Boolean']['output'];
  /** A list of tags the user has applied to the video */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  textReplacements: Array<VideoTextReplacement>;
  thumbnails: VideoThumbnailsSources;
  totalComments: Scalars['Int']['output'];
  totalReactions: Scalars['Int']['output'];
  transcodedCdnUrl?: Maybe<CloudfrontSignedUrlPayload>;
  transcript_phrases?: Maybe<Array<Maybe<TranscriptPhrases>>>;
  updatedAt: Scalars['Date']['output'];
  uploadProxyUrl?: Maybe<Scalars['String']['output']>;
  use_emojis: Scalars['Boolean']['output'];
  use_gif: Scalars['Boolean']['output'];
  variableReplacement?: Maybe<VariableReplacement>;
  videoMeetingPlatform?: Maybe<Scalars['String']['output']>;
  video_comments: Array<PublicVideoComment>;
  /** @deprecated Use client-side flag fetching instead */
  video_feature_flags?: Maybe<VideoFeatureFlags>;
  video_properties: VideoProperties;
  video_reactions: Array<PublicVideoReaction>;
  viewerCaptionsOn: Scalars['Boolean']['output'];
  viewerNeedsPermission?: Maybe<Scalars['Boolean']['output']>;
  viewers_can_weave: Scalars['Boolean']['output'];
  views?: Maybe<RegularUserVideoViewCounts>;
  visibility: VideoVisibilityType;
  waveformData: Array<ClipWaveformData>;
  waveform_generation?: Maybe<VideoWaveformGenerationStatuses>;
  white_label_player: Scalars['Boolean']['output'];
  /** @deprecated Use 'library' for read operations. This field is still valid for write operations */
  workspace?: Maybe<Scalars['String']['output']>;
};


export type RegularUserVideoDefaultThumbnailsArgs = {
  withPlay?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RegularUserVideoDescriptionArgs = {
  useFirstComment?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RegularUserVideoNullableRawCdnUrlArgs = {
  acceptableMimes?: InputMaybe<Array<InputMaybe<CloudfrontVideoAcceptableMime>>>;
  forceOriginal?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type RegularUserVideoRawCdnUrlArgs = {
  acceptableMimes?: InputMaybe<Array<InputMaybe<CloudfrontVideoAcceptableMime>>>;
  forceOriginal?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type RegularUserVideoSeekPreviewCdnUrlArgs = {
  trimId?: InputMaybe<Scalars['String']['input']>;
};


export type RegularUserVideoSignedDefaultThumbnailsArgs = {
  withPlay?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RegularUserVideoTranscodedCdnUrlArgs = {
  forceOriginal?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type RegularUserVideoVideo_CommentsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegularUserVideoConnection = {
  __typename?: 'RegularUserVideoConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<RegularUserVideoEdge>>>;
  /** Flattened list of RegularUserVideo type */
  nodes?: Maybe<Array<Maybe<RegularUserVideo>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type RegularUserVideoEdge = {
  __typename?: 'RegularUserVideoEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<RegularUserVideo>;
};

export type RegularUserVideoViewCounts = {
  __typename?: 'RegularUserVideoViewCounts';
  distinct: Scalars['Int']['output'];
  named?: Maybe<Array<Maybe<KnownUserVideoView>>>;
  total: Scalars['Int']['output'];
};

export type ReinstateAccountPayload = {
  __typename?: 'ReinstateAccountPayload';
  success: Scalars['Boolean']['output'];
};

export type ReinstateAccountResponse = GenericError | ReinstateAccountPayload | UserNotAuthorizedError;

export type ReleasePausedSubscriptionResponse = GenericError | InputValidationError | OperationResultStatus | UserNotAuthorizedError;

export type ReleaseSubscriptionSchedulePayload = {
  __typename?: 'ReleaseSubscriptionSchedulePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReleaseSubscriptionScheduleResponse = GenericError | InputValidationError | ReleaseSubscriptionSchedulePayload | UserNotAuthorizedError;

export type RemoveAllEditZoomInstructionsPayload = {
  __typename?: 'RemoveAllEditZoomInstructionsPayload';
  video: RegularUserVideo;
};

export type RemoveAllEditZoomInstructionsResponse = GenericError | RemoveAllEditZoomInstructionsPayload | UserNotAuthorizedError;

export type RemoveAllTranscriptCorrectionsInput = {
  /** ID of the video */
  videoId: Scalars['ID']['input'];
};

export type RemoveAllTranscriptCorrectionsPayload = {
  __typename?: 'RemoveAllTranscriptCorrectionsPayload';
  /** The signed url for the updated captions file */
  captions_source_url: Scalars['String']['output'];
  /** Not used. Exists for backwards compatibility */
  message?: Maybe<Scalars['String']['output']>;
  /** The signed url for the updated phrases file */
  source_url: Scalars['String']['output'];
  /** The artifacts version number that was just created */
  version: Scalars['Int']['output'];
};

export type RemoveAllTranscriptCorrectionsResponse = GenericError | InvalidRequestWarning | RemoveAllTranscriptCorrectionsPayload | UserNotAuthorizedError;

export type RemoveClipFromVideoPayload = {
  __typename?: 'RemoveClipFromVideoPayload';
  video?: Maybe<RegularUserVideo>;
};

export type RemoveClipFromVideoResponse = GenericError | InputValidationError | InvalidRequestWarning | RemoveClipFromVideoPayload | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type RemoveDomainFromWorkspacePayload = {
  __typename?: 'RemoveDomainFromWorkspacePayload';
  domain: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RemoveDomainFromWorkspaceResponse = GenericError | InputValidationError | RemoveDomainFromWorkspacePayload | UserNotAuthorizedError;

export type RemoveEditZoomInstructionInput = {
  /** The videoId to remove the zoom for */
  videoId: Scalars['ID']['input'];
  /** The zoomId to remove on the video */
  zoomId: Scalars['ID']['input'];
};

export type RemoveEditZoomInstructionPayload = {
  __typename?: 'RemoveEditZoomInstructionPayload';
  video: RegularUserVideo;
};

export type RemoveEditZoomInstructionResponse = GenericError | RemoveEditZoomInstructionPayload | UserNotAuthorizedError;

export type RemoveParentSpaceFromFolderPermissionsResponse = GenericError | InputValidationError | UserNotAuthorizedError | RemoveParentSpaceFromFolderPermissionsPayload;

export type RemovePrebucketedAudienceFromRedisResponse = GenericError | UserNotAuthorizedError | RemovePrebucketedAudienceFromRedisPayload;

export type RemoveScreenshotBackgroundPayload = {
  __typename?: 'RemoveScreenshotBackgroundPayload';
  screenshot: Screenshot;
};

export type RemoveScreenshotBackgroundResponse = EntityNotFoundError | GenericError | RemoveScreenshotBackgroundPayload | UserNotAuthorizedError;

export type RemoveTagFromVideoPayload = {
  __typename?: 'RemoveTagFromVideoPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
};

export type RemoveTagFromVideoResponse = GenericError | InputValidationError | RemoveTagFromVideoPayload | TagsPasswordProtectedVideoError | UserNotAuthorizedError;

export type RemoveTrackingForDuplicateFolderPayload = {
  __typename?: 'RemoveTrackingForDuplicateFolderPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemoveTrackingForDuplicateFolderResponse = GenericError | InputValidationError | RemoveTrackingForDuplicateFolderPayload | UserNotAuthorizedError;

export type RemoveUserFromScreenshotAccess = {
  __typename?: 'RemoveUserFromScreenshotAccess';
  /** Screenshot privacy */
  privacy?: Maybe<ScreenshotPrivacyTypes>;
};

export type RemoveUserFromScreenshotAccessResponse = EntityNotFoundError | GenericError | RemoveUserFromScreenshotAccess | UserNotAuthorizedError;

export type RemoveUserFromSpacePayload = {
  __typename?: 'RemoveUserFromSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemoveUserFromSpaceResponse = GenericError | InputValidationError | RemoveUserFromSpacePayload | UserNotAuthorizedError;

export type RemoveUserOrGroupFromFolderPermissionsResponse = GenericError | InputValidationError | UserNotAuthorizedError | RemoveUserOrGroupFromFolderPermissionsPayload;

export type RemoveUsersFromWorkspaceGroupResponse = GenericError | InputValidationError | UserNotAuthorizedError | RemoveUsersFromWorkspaceGroupPayload;

export type RemoveVideoBackgroundPayload = {
  __typename?: 'RemoveVideoBackgroundPayload';
  video: RegularUserVideo;
};

export type RemoveVideoBackgroundResponse = GenericError | InvalidRequestWarning | RemoveVideoBackgroundPayload | UserNotAuthorizedError;

export type RemoveVideoFromWatchLaterListPayload = {
  __typename?: 'RemoveVideoFromWatchLaterListPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemoveVideoFromWatchLaterListResponse = GenericError | RemoveVideoFromWatchLaterListPayload | UserNotAuthorizedError;

export type RemoveVideoThumbnailPayload = {
  __typename?: 'RemoveVideoThumbnailPayload';
  video?: Maybe<RegularUserVideo>;
};

export type RemoveVideoThumbnailResponse = GenericError | InputValidationError | InvalidRequestWarning | RemoveVideoThumbnailPayload | UserNotAuthorizedError;

export type RemoveViewedVideosFromWatchLaterListPayload = {
  __typename?: 'RemoveViewedVideosFromWatchLaterListPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  viewedVideosRemovedCount?: Maybe<Scalars['Int']['output']>;
};

export type RemoveViewedVideosFromWatchLaterListResponse = GenericError | RemoveViewedVideosFromWatchLaterListPayload | UserNotAuthorizedError;

export type RenameFolderPayload = {
  __typename?: 'RenameFolderPayload';
  folder?: Maybe<RegularUserFolder>;
};

export type RenameFolderResponse = GenericError | InputValidationError | RenameFolderPayload | UserNotAuthorizedError;

export type ReorderClipsOnVideoPayload = {
  __typename?: 'ReorderClipsOnVideoPayload';
  video?: Maybe<RegularUserVideo>;
};

export type ReorderClipsOnVideoResponse = GenericError | InputValidationError | InvalidRequestWarning | ReorderClipsOnVideoPayload | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type ReplacementForTtsInput = {
  endTimestampForOriginalSelection: Scalars['Float']['input'];
  replacementWords: Array<Scalars['String']['input']>;
  startTimestampForOriginalSelection: Scalars['Float']['input'];
  variable: PresetVariablesEnum;
  wordToReplace: Scalars['String']['input'];
};

export type ReplacementInfo = {
  __typename?: 'ReplacementInfo';
  endTsForOriginalSelectionInSecs?: Maybe<Scalars['Float']['output']>;
  originalWord?: Maybe<Scalars['String']['output']>;
  replacementsUsed?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  startTsForOriginalSelectionInSecs?: Maybe<Scalars['Float']['output']>;
  variable: PresetVariablesEnum;
};

export type RequestCustomAccessToPrivateVideoPayload = {
  __typename?: 'RequestCustomAccessToPrivateVideoPayload';
  success: Scalars['Boolean']['output'];
};

export type RequestCustomAccessToPrivateVideoResponse = GenericError | RequestCustomAccessToPrivateVideoPayload | UserNotAuthorizedError;

export type RequestToJoinWorkspaceForVideoPayload = {
  __typename?: 'RequestToJoinWorkspaceForVideoPayload';
  status: RequestToJoinWorkspaceForVideoStatus;
};

export type RequestToJoinWorkspaceForVideoResponse = GenericError | RequestToJoinWorkspaceForVideoPayload | UserNotAuthorizedError;

export enum RequestToJoinWorkspaceForVideoStatus {
  FailureSso = 'failure_sso',
  Success = 'success'
}

export type RequestToJoinWorkspacePayload = {
  __typename?: 'RequestToJoinWorkspacePayload';
  message?: Maybe<Scalars['String']['output']>;
  status: RequestToJoinWorkspaceStatus;
  workspace?: Maybe<JoinableWorkspace>;
};

export type RequestToJoinWorkspaceResponse = GenericError | RequestToJoinWorkspacePayload | UserNotAuthorizedError;

export enum RequestToJoinWorkspaceStatus {
  AlreadyMember = 'already_member',
  AlreadyRequested = 'already_requested',
  Autojoined = 'autojoined',
  DomainNotAssociated = 'domain_not_associated',
  RequestFailed = 'request_failed',
  Requested = 'requested'
}

export type RequestToTransferContentInput = {
  changeDefaultWorkspace?: InputMaybe<Scalars['Boolean']['input']>;
  fromWorkspaceId: Scalars['ID']['input'];
  movePersonalLibrary?: InputMaybe<Scalars['Boolean']['input']>;
  moveSharedLibrary?: InputMaybe<Scalars['Boolean']['input']>;
  moveTeamLibrary?: InputMaybe<Scalars['Boolean']['input']>;
  toWorkspaceId: Scalars['ID']['input'];
};

export type RequestToTransferContentPayload = {
  __typename?: 'RequestToTransferContentPayload';
  status: Scalars['String']['output'];
};

export type RequestToTransferContentResponse = GenericError | RequestToTransferContentPayload | UserNotAuthorizedError;

export type RequestToUpgradeWorkspacePayload = {
  __typename?: 'RequestToUpgradeWorkspacePayload';
  success: Scalars['Boolean']['output'];
};

export type RequestToUpgradeWorkspaceResponse = GenericError | InputValidationError | RequestToUpgradeWorkspacePayload | UserNotAuthorizedError;

export enum RequestToUpgradeWorkspaceStatusType {
  Approved = 'APPROVED',
  Pending = 'PENDING'
}

export enum RequestToUpgradeWorkspaceTargetAddOnType {
  Ai = 'AI'
}

export enum RequestToUpgradeWorkspaceTargetPlanType {
  Business = 'business',
  Enterprise = 'enterprise'
}

export enum RequestToUpgradeWorkspaceTargetRoleType {
  Admin = 'admin',
  Creator = 'creator'
}

export enum RequestToUpgradeWorkspaceUpgradeType {
  AddOn = 'add_on',
  Plan = 'plan',
  Role = 'role'
}

/** Eligible Request access flow types */
export enum RequestVideoAccessFlow {
  AtlassianLogin = 'ATLASSIAN_LOGIN',
  AtlassianRequestWorkspaceAccess = 'ATLASSIAN_REQUEST_WORKSPACE_ACCESS',
  LoomLogin = 'LOOM_LOGIN',
  LoomRequestVideoAndWorkspaceAccessFlow = 'LOOM_REQUEST_VIDEO_AND_WORKSPACE_ACCESS_FLOW',
  MergeAccount = 'MERGE_ACCOUNT',
  None = 'NONE',
  RequestIndividualVideoAccess = 'REQUEST_INDIVIDUAL_VIDEO_ACCESS'
}

export type ResendOrganizationInvitesPayload = {
  __typename?: 'ResendOrganizationInvitesPayload';
  success: Scalars['Boolean']['output'];
};

export type ResendOrganizationInvitesResponse = GenericError | ResendOrganizationInvitesPayload | UserNotAuthorizedError;

export type ResetDraftToReadyToEditPayload = {
  __typename?: 'ResetDraftToReadyToEditPayload';
  success: Scalars['Boolean']['output'];
};

export type ResetDraftToReadyToEditResponse = GenericError | InputValidationError | ResetDraftToReadyToEditPayload | UserNotAuthorizedError;

export type ResetEmailStatus = {
  __typename?: 'ResetEmailStatus';
  email: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type ResetFtuxComponentResponse = GenericError | UserNotAuthorizedError | ResetFtuxComponentPayload;

export type ResolveVideoTaskPayload = {
  __typename?: 'ResolveVideoTaskPayload';
  task?: Maybe<VideoTask>;
};

export type ResolveVideoTaskResponse = GenericError | InvalidRequestWarning | ResolveVideoTaskPayload | UserNotAuthorizedError;

export type RespondToVideoTaskPayload = {
  __typename?: 'RespondToVideoTaskPayload';
  task?: Maybe<VideoTask>;
};

export type RespondToVideoTaskResponse = GenericError | InvalidRequestWarning | RespondToVideoTaskPayload | UserNotAuthorizedError;

/** Describes action recorder client should take from the following: RESUME uploads, SKIP video, DELETE video part in local storage. */
export enum ResumeFailedVideoUploadInstruction {
  Delete = 'DELETE',
  Resume = 'RESUME',
  Skip = 'SKIP'
}

export type ResumePausedSubscriptionResponse = GenericError | InputValidationError | OperationResultStatus | UserNotAuthorizedError;

export type RetranscribeVideoPayload = {
  __typename?: 'RetranscribeVideoPayload';
  language?: Maybe<Language>;
  video?: Maybe<RegularUserVideo>;
};

export type RetranscribeVideoResponse = GenericError | InvalidRequestWarning | RetranscribeVideoPayload;

export type RetryPendingScimActionPayload = {
  __typename?: 'RetryPendingScimActionPayload';
  success: Scalars['Boolean']['output'];
};

export type RetryPendingScimActionResponse = GenericError | InputValidationError | RetryPendingScimActionPayload | UserNotAuthorizedError;

export type RevertToOriginalPayload = {
  __typename?: 'RevertToOriginalPayload';
  video?: Maybe<RegularUserVideo>;
};

export type RevertToOriginalResponse = GenericError | InputValidationError | InvalidRequestWarning | RevertToOriginalPayload | SavingOverNewClipChangesPayload | UserNotAuthorizedError;

export type RevertTranscriptCorrectionsDetails = {
  __typename?: 'RevertTranscriptCorrectionsDetails';
  captions_source_url?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
  video_id: Scalars['ID']['output'];
};

export type RoleChangeData = {
  __typename?: 'RoleChangeData';
  newRole?: Maybe<Scalars['String']['output']>;
  orgName?: Maybe<Scalars['String']['output']>;
};

export type RoleChangeNotification = {
  __typename?: 'RoleChangeNotification';
  createdAt?: Maybe<Scalars['Date']['output']>;
  data?: Maybe<RoleChangeData>;
  workspace?: Maybe<NotificationWorkspace>;
};

export type RoleChangeProps = {
  __typename?: 'RoleChangeProps';
  notification?: Maybe<RoleChangeNotification>;
};

export type RoleChangePropsResponse = GenericError | InputValidationError | RoleChangeProps | UserNotAuthorizedError;

/** Role count object */
export type RoleCountObject = {
  admin?: Scalars['Int']['input'];
  creator?: Scalars['Int']['input'];
  creator_lite?: Scalars['Int']['input'];
  guest?: Scalars['Int']['input'];
  viewer?: Scalars['Int']['input'];
};

export type S3Credentials = {
  __typename?: 'S3Credentials';
  AccessKeyId: Scalars['String']['output'];
  Bucket: Scalars['String']['output'];
  DurationSeconds?: Maybe<Scalars['Int']['output']>;
  Path: Scalars['String']['output'];
  Region: Scalars['String']['output'];
  SecretAccessKey: Scalars['String']['output'];
  SessionToken: Scalars['String']['output'];
  endpoint?: Maybe<Scalars['String']['output']>;
};

export type S3UploadCredentialsUnion = GenericError | S3Credentials;

export type SdkApiKey = {
  __typename?: 'SDKApiKey';
  apiKey?: Maybe<Scalars['String']['output']>;
  appName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  domains: Array<Maybe<Scalars['String']['output']>>;
  id?: Maybe<Scalars['ID']['output']>;
  isSandboxKey?: Maybe<Scalars['Boolean']['output']>;
  package?: Maybe<Scalars['String']['output']>;
  privateKeys?: Maybe<Array<Maybe<PrivateKeyInfo>>>;
};

export type SdkApiKeyInput = {
  hosts: Array<Scalars['String']['input']>;
  packageName?: InputMaybe<Scalars['String']['input']>;
  partnerName: Scalars['String']['input'];
};

export type SdkApiKeys = {
  __typename?: 'SDKApiKeys';
  developerAccountId?: Maybe<Scalars['Int']['output']>;
  sdkApiKeys: Array<Maybe<SdkApiKey>>;
};

export type SdkApplicationMetadataFeatures = {
  __typename?: 'SDKApplicationMetadataFeatures';
  removeLoomBranding?: Maybe<Scalars['Boolean']['output']>;
};

export type SdkOwnershipUnion = GenericError | SdkUserHasOwnership;

export type SdkUserHasOwnership = {
  __typename?: 'SDKUserHasOwnership';
  completeVideo?: Maybe<CompleteVideoUnion>;
  createUploadCredentials?: Maybe<S3UploadCredentialsUnion>;
  deleteVideo?: Maybe<DeleteVideoRes>;
  extractMetadata?: Maybe<ExtractedMetadataUnion>;
  sendRecordingEvent?: Maybe<SendRecordingEventUnion>;
  setProgress?: Maybe<SetProgressUnion>;
  setTotalParts?: Maybe<SetTotalPartsUnion>;
};


export type SdkUserHasOwnershipCompleteVideoArgs = {
  format: Scalars['String']['input'];
  retries?: InputMaybe<Scalars['Int']['input']>;
  videoProperties: InputVideoProperties;
};


export type SdkUserHasOwnershipDeleteVideoArgs = {
  cancellingRecording?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  retries?: InputMaybe<Scalars['Int']['input']>;
  videoProperties?: InputMaybe<InputVideoProperties>;
};


export type SdkUserHasOwnershipExtractMetadataArgs = {
  s3FileKey: Scalars['String']['input'];
};


export type SdkUserHasOwnershipSendRecordingEventArgs = {
  eventName: Scalars['String']['input'];
  properties: RecordingEventAttributes;
};


export type SdkUserHasOwnershipSetProgressArgs = {
  packets: Scalars['Int']['input'];
};


export type SdkUserHasOwnershipSetTotalPartsArgs = {
  packets: Scalars['Int']['input'];
  pendingPackets: Scalars['Int']['input'];
  videoProperties: InputVideoProperties;
};

export type SrtResponse = {
  __typename?: 'SRTResponse';
  isImpersonating?: Maybe<Scalars['Boolean']['output']>;
  status: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type SsoInfoPayload = {
  __typename?: 'SSOInfoPayload';
  authType?: Maybe<Scalars['String']['output']>;
  workspaceName?: Maybe<Scalars['String']['output']>;
};

export type SaveOnboardingSurveyPayload = {
  __typename?: 'SaveOnboardingSurveyPayload';
  success: Scalars['Boolean']['output'];
};

export type SaveOnboardingSurveyResponse = GenericError | SaveOnboardingSurveyPayload;

export type SaveWorkflowDocPayload = {
  __typename?: 'SaveWorkflowDocPayload';
  success: Scalars['Boolean']['output'];
  updatedMarkdownContent: Scalars['String']['output'];
};

export type SaveWorkflowDocResponse = GenericError | SaveWorkflowDocPayload | UserNotAuthorizedError | VideoNotFoundError;

export type SavingOverNewClipChangesPayload = Warning & {
  __typename?: 'SavingOverNewClipChangesPayload';
  conflictMessage?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

/** An item in a phase of a subscription schedule */
export type SchedulePhaseItem = {
  __typename?: 'SchedulePhaseItem';
  metadata?: Maybe<Scalars['JSON']['output']>;
  price: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type Screenshot = {
  __typename?: 'Screenshot';
  background?: Maybe<ScreenshotBackground>;
  complete: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  current_user_is_owner: Scalars['Boolean']['output'];
  downloadUrl?: Maybe<Scalars['String']['output']>;
  folder_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image_properties: ImageProperties;
  name: Scalars['String']['output'];
  organizationIdV2?: Maybe<Scalars['ID']['output']>;
  organization_id?: Maybe<Scalars['Int']['output']>;
  owner: RegularUser;
  owner_id: Scalars['Int']['output'];
  s3_id: Scalars['String']['output'];
  source?: Maybe<ScreenshotSource>;
  sources: ImageSources;
  url?: Maybe<Scalars['String']['output']>;
};


export type ScreenshotSourceArgs = {
  source?: InputMaybe<ScreenshotSource>;
};


export type ScreenshotUrlArgs = {
  source?: InputMaybe<ScreenshotSource>;
};

export enum ScreenshotAccessLevel {
  Read = 'read',
  Readwrite = 'readwrite'
}

/** The ACL entries for a screenshot */
export type ScreenshotAclEntrySet = {
  __typename?: 'ScreenshotAclEntrySet';
  /** All of the ACL entries */
  entries?: Maybe<Array<Maybe<UserScreenshotAclEntry>>>;
  owner?: Maybe<RegularUser>;
};

export type ScreenshotAnnotations = {
  __typename?: 'ScreenshotAnnotations';
  /** Annotations history as a JSON string */
  annotations?: Maybe<Scalars['String']['output']>;
  /** The associated screenshotId */
  screenshotId: Scalars['String']['output'];
};

export type ScreenshotAnnotationsResponse = GenericError | ScreenshotAnnotations;

export type ScreenshotAutoFeatureStatusChangedPayload = {
  __typename?: 'ScreenshotAutoFeatureStatusChangedPayload';
  screenshotAutoFeatureStatuses?: Maybe<ScreenshotAutoFeatureStatuses>;
};

export type ScreenshotAutoFeatureStatuses = {
  __typename?: 'ScreenshotAutoFeatureStatuses';
  id?: Maybe<Scalars['ID']['output']>;
  screenshotAutoTitle?: Maybe<Scalars['String']['output']>;
  screenshotAutoTitleStatus?: Maybe<IntelligenceStatusType>;
};

export type ScreenshotBackground = ScreenshotHexBackground | ScreenshotPresetBackground;

export type ScreenshotCanvasOverlays = {
  __typename?: 'ScreenshotCanvasOverlays';
  /** Canvas overlays as a JSON string */
  canvasOverlays?: Maybe<Scalars['String']['output']>;
  /** The associated screenshotId */
  screenshotId: Scalars['String']['output'];
};

export type ScreenshotCanvasOverlaysResponse = GenericError | ScreenshotCanvasOverlays;

export type ScreenshotCompletedResponse = {
  __typename?: 'ScreenshotCompletedResponse';
  complete: Scalars['Boolean']['output'];
  source: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ScreenshotConnection = {
  __typename?: 'ScreenshotConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<ScreenshotEdge>>>;
  /** Flattened list of Screenshot type */
  nodes?: Maybe<Array<Maybe<Screenshot>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type ScreenshotEdge = {
  __typename?: 'ScreenshotEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Screenshot>;
};

export type ScreenshotHexBackground = {
  __typename?: 'ScreenshotHexBackground';
  hexValue: Scalars['String']['output'];
};

export type ScreenshotPaths = {
  __typename?: 'ScreenshotPaths';
  edited_original: Scalars['String']['output'];
  edited_thumbnail: Scalars['String']['output'];
  original: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
};

export type ScreenshotPresetBackground = {
  __typename?: 'ScreenshotPresetBackground';
  presetBackgroundName: Scalars['String']['output'];
};

export type ScreenshotPrivacy = {
  __typename?: 'ScreenshotPrivacy';
  entrySet?: Maybe<ScreenshotAclEntrySet>;
  /** Screenshot privacy */
  privacy?: Maybe<ScreenshotPrivacyTypes>;
};

export type ScreenshotPrivacyResponse = EntityNotFoundError | GenericError | ScreenshotPrivacy | UserNotAuthorizedError;

export enum ScreenshotPrivacyTypes {
  Private = 'private',
  Public = 'public',
  Workspace = 'workspace'
}

export enum ScreenshotSource {
  EditedOriginal = 'edited_original',
  EditedThumbnail = 'edited_thumbnail',
  Original = 'original',
  Thumbnail = 'thumbnail'
}

export type ScreenshotWithS3Credentials = {
  __typename?: 'ScreenshotWithS3Credentials';
  credentials: S3Credentials;
  screenshot: Screenshot;
  url: Scalars['String']['output'];
};

export type SdkPartnerInfoInput = {
  metadata: Scalars['String']['input'];
  partnerName: Scalars['String']['input'];
};

export type SdkPartnerInfoResponse = {
  __typename?: 'SdkPartnerInfoResponse';
  apiKey: Scalars['String']['output'];
  partnerName: Scalars['String']['output'];
};

export type SearchFoldersPayload = {
  __typename?: 'SearchFoldersPayload';
  folders: Array<RegularUserFolder>;
};

export type SearchFoldersResponse = GenericError | InputValidationError | SearchFoldersPayload | UserNotAuthorizedError;

export enum SearchModelType {
  Folder = 'folder',
  Video = 'video'
}

export type SearchMySpacesPayload = {
  __typename?: 'SearchMySpacesPayload';
  spaceResults?: Maybe<SpaceSearchResultConnection>;
};


export type SearchMySpacesPayloadSpaceResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  searchQuery: Scalars['String']['input'];
};

export type SearchMySpacesResponse = GenericError | InputValidationError | SearchMySpacesPayload | UserNotAuthorizedError;

export type SearchPaginatedWorkspaceGroupsResponse = GenericError | InputValidationError | SearchPaginatedWorkspaceGroupsResult | UserNotAuthorizedError;

export type SearchPaginatedWorkspaceGroupsResult = {
  __typename?: 'SearchPaginatedWorkspaceGroupsResult';
  groups?: Maybe<WorkspaceGroupConnection>;
};


export type SearchPaginatedWorkspaceGroupsResultGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  searchByDescription: Scalars['Boolean']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type SearchPaginatedWorkspaceInviteesResponse = GenericError | InputValidationError | SearchPaginatedWorkspaceInviteesResult | UserNotAuthorizedError;

export type SearchPaginatedWorkspaceInviteesResult = {
  __typename?: 'SearchPaginatedWorkspaceInviteesResult';
  invited?: Maybe<OrganizationInvitationConnection>;
};


export type SearchPaginatedWorkspaceInviteesResultInvitedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  roles: Array<InvitedRoleType>;
};

export type SearchPaginatedWorkspaceMembersResponse = GenericError | InputValidationError | SearchPaginatedWorkspaceMembersResult | UserNotAuthorizedError;

export type SearchPaginatedWorkspaceMembersResult = {
  __typename?: 'SearchPaginatedWorkspaceMembersResult';
  accepted?: Maybe<OrganizationMemberConnection>;
  /** Returns true if user has an admin role in workspace and false if not */
  revealMemberEmails?: Maybe<Scalars['Boolean']['output']>;
};


export type SearchPaginatedWorkspaceMembersResultAcceptedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  roles: Array<OrganizationMemberRole>;
  status: OrganizationMemberStatus;
};

export type SearchSemanticVideosPayload = {
  __typename?: 'SearchSemanticVideosPayload';
  semanticVideoResults?: Maybe<SemanticVideoSearchResultConnection>;
};


export type SearchSemanticVideosPayloadSemanticVideoResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  searchQuery: Scalars['String']['input'];
};

export type SearchSemanticVideosResponse = GenericError | InputValidationError | SearchSemanticVideosPayload | UserNotAuthorizedError;

export type SearchSpacesPayload = {
  __typename?: 'SearchSpacesPayload';
  spaceResults?: Maybe<SpaceSearchResultConnection>;
};


export type SearchSpacesPayloadSpaceResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  searchQuery: Scalars['String']['input'];
};

export type SearchSpacesResponse = GenericError | InputValidationError | SearchSpacesPayload | UserNotAuthorizedError;

export type SearchSpacesVideoIdPayload = {
  __typename?: 'SearchSpacesVideoIdPayload';
  video?: Maybe<RegularUserVideo>;
};

export type SearchSpacesVideoIdResponse = GenericError | InputValidationError | SearchSpacesVideoIdPayload | UserNotAuthorizedError | VideoNotFoundError;

export type SearchSpacesVideosKeywordPayload = {
  __typename?: 'SearchSpacesVideosKeywordPayload';
  videoResults: Array<VideoSearchResult>;
};

export type SearchSpacesVideosKeywordResponse = GenericError | InputValidationError | SearchSpacesVideosKeywordPayload | UserNotAuthorizedError | VideoNotFoundError;

export type SearchVideosPayload = {
  __typename?: 'SearchVideosPayload';
  videoResults?: Maybe<VideoSearchResultConnection>;
};


export type SearchVideosPayloadVideoResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  searchQuery: Scalars['String']['input'];
};

export type SearchVideosResponse = GenericError | InputValidationError | SearchVideosPayload | UserNotAuthorizedError;

export type SearchWeaveVideoIdPayload = {
  __typename?: 'SearchWeaveVideoIdPayload';
  video?: Maybe<RegularUserVideo>;
};

export type SearchWeaveVideoIdResponse = GenericError | SearchWeaveVideoIdPayload | UserNotAuthorizedError | VideoNotFoundError | WeaveCreatorDisabledStitching | WeavePasswordProtectedVideoError;

export type SearchWeaveVideosKeywordPayload = {
  __typename?: 'SearchWeaveVideosKeywordPayload';
  videoResults: Array<VideoSearchResult>;
};

export type SearchWeaveVideosKeywordResponse = GenericError | InputValidationError | SearchWeaveVideosKeywordPayload | UserNotAuthorizedError | VideoNotFoundError;

export type SearchWorkspaceContactsPayload = {
  __typename?: 'SearchWorkspaceContactsPayload';
  results: Array<WorkspaceContact>;
};

export type SearchWorkspaceContactsResponse = GenericError | InputValidationError | SearchWorkspaceContactsPayload | UserNotAuthorizedError;

export type SearchWorkspaceGroupsResponse = GenericError | InputValidationError | SearchWorkspaceGroupsResult | UserNotAuthorizedError;

export type SearchWorkspaceGroupsResult = {
  __typename?: 'SearchWorkspaceGroupsResult';
  groups?: Maybe<Array<Maybe<WorkspaceGroup>>>;
};

export type SearchWorkspaceInviteByTokenPayload = {
  __typename?: 'SearchWorkspaceInviteByTokenPayload';
  pendingInvite?: Maybe<OrganizationInvitation>;
};

export type SearchWorkspaceInviteByTokenResponse = GenericError | SearchWorkspaceInviteByTokenPayload;

export type SearchWorkspaceMembersExcludingRoleResponse = GenericError | InputValidationError | SearchWorkspaceMembersExcludingRoleResult | UserNotAuthorizedError;

export type SearchWorkspaceMembersExcludingRoleResult = {
  __typename?: 'SearchWorkspaceMembersExcludingRoleResult';
  accepted?: Maybe<Array<Maybe<OrganizationMember>>>;
};

export type SearchWorkspaceMembersResponse = GenericError | InputValidationError | SearchWorkspaceMembersResult | UserNotAuthorizedError;

export type SearchWorkspaceMembersResult = {
  __typename?: 'SearchWorkspaceMembersResult';
  users?: Maybe<Array<Maybe<RegularUser>>>;
};

export type SearchWorkspaceSpacesPayload = {
  __typename?: 'SearchWorkspaceSpacesPayload';
  spaceResults?: Maybe<SpaceSearchResultConnection>;
};


export type SearchWorkspaceSpacesPayloadSpaceResultsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  searchQuery: Scalars['String']['input'];
};

export type SearchWorkspaceSpacesResponse = GenericError | InputValidationError | SearchWorkspaceSpacesPayload | UserNotAuthorizedError;

export type SearchWorkspaceTagsResponse = GenericError | InputValidationError | MatchedTags | UserNotAuthorizedError;

export type SelfServeDowngradeResult = {
  __typename?: 'SelfServeDowngradeResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SelfServeDowngradeSubscriptionResponse = GenericError | InputValidationError | SelfServeDowngradeResult | UserNotAuthorizedError;

export type SemanticVideoSearchResult = {
  __typename?: 'SemanticVideoSearchResult';
  /** KNN hit score for the video */
  hitScore?: Maybe<Scalars['Float']['output']>;
  /** Start timestamp of the semantic chunk for the video */
  startTimestamp?: Maybe<Scalars['Float']['output']>;
  video?: Maybe<RegularUserVideo>;
};

export type SemanticVideoSearchResultConnection = {
  __typename?: 'SemanticVideoSearchResultConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<SemanticVideoSearchResultEdge>>>;
  /** Flattened list of SemanticVideoSearchResult type */
  nodes?: Maybe<Array<Maybe<SemanticVideoSearchResult>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type SemanticVideoSearchResultEdge = {
  __typename?: 'SemanticVideoSearchResultEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<SemanticVideoSearchResult>;
};

export type SendBotActionInput = {
  action: BotActionTypeInput;
  videoMeetingGuid: Scalars['ID']['input'];
};

export type SendBotActionPayload = {
  __typename?: 'SendBotActionPayload';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SendBotActionResponse = GenericError | SendBotActionPayload | UserNotAuthorizedError;

export type SendGmailResponse = GenericError | InputValidationError | UserNotAuthorizedError | SendGmailPayload;

export type SendGsacSupportTicketPayload = {
  __typename?: 'SendGsacSupportTicketPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SendGsacSupportTicketResponse = GenericError | SendGsacSupportTicketPayload | UserNotAuthorizedError;

export type SendManageSubscriptionPreferencesEmailPayload = {
  __typename?: 'SendManageSubscriptionPreferencesEmailPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SendManageSubscriptionPreferencesEmailResponse = GenericError | SendManageSubscriptionPreferencesEmailPayload | UserNotAuthorizedError;

export type SendRecordingEvent = {
  __typename?: 'SendRecordingEvent';
  success: Scalars['Boolean']['output'];
};

export type SendRecordingEventUnion = GenericError | SendRecordingEvent;

export type SendVariablesEmailsPayload = {
  __typename?: 'SendVariablesEmailsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SendVariablesEmailsResponse = GenericError | SendVariablesEmailsPayload | UserNotAuthorizedError;

export type SetFolderToInheritPermissionsResponse = GenericError | InputValidationError | UserNotAuthorizedError | SetFolderToInheritPermissionsPayload;

export type SetProgress = {
  __typename?: 'SetProgress';
  success: Scalars['Boolean']['output'];
};

export type SetProgressUnion = GenericError | SetProgress;

export type SetSpaceAclEntriesPayload = {
  __typename?: 'SetSpaceAclEntriesPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetSpaceAclEntriesResponse = GenericError | InputValidationError | SetSpaceAclEntriesPayload | UserNotAuthorizedError;

export type SetSpaceGroupAclEntriesPayload = {
  __typename?: 'SetSpaceGroupAclEntriesPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetSpaceGroupAclEntriesResponse = GenericError | InputValidationError | SetSpaceGroupAclEntriesPayload | UserNotAuthorizedError;

export type SetTotalParts = {
  __typename?: 'SetTotalParts';
  success: Scalars['Boolean']['output'];
};

export type SetTotalPartsPayload = {
  __typename?: 'SetTotalPartsPayload';
  success: Scalars['Boolean']['output'];
};

export type SetTotalPartsResponse = GenericError | InputValidationError | SetTotalPartsPayload | UserNotAuthorizedError;

export type SetTotalPartsUnion = GenericError | SetTotalParts;

export type SetUpNewSdkPartnerPayload = {
  __typename?: 'SetUpNewSdkPartnerPayload';
  integrationSubscriptionId: Scalars['ID']['output'];
};

export type SetUpNewSdkPartnerResponse = GenericError | SetUpNewSdkPartnerPayload | UserNotAuthorizedError;

export type SetUserPersonaResponse = GenericError | SetUserPersonaResponsePayload | UserNotAuthorizedError;

export type SetUserPersonaResponsePayload = {
  __typename?: 'SetUserPersonaResponsePayload';
  success: Scalars['Boolean']['output'];
};

export type SetVideoAclEntriesInput = {
  /** An optional message to go along with the notification if the user is notifying the recipient */
  notificationText?: InputMaybe<Scalars['String']['input']>;
  /** Permissions for individual people on a video. This can be either by user id or by email, but not both. If the person is in the workspace, specifying them by user id is preferred. */
  peopleAccess: Array<VideoAclEntryPersonInput>;
  publicAccess: Scalars['Boolean']['input'];
  /** Whether or not to notify new people added to the video ACL. If new users are to be invited, we'll still send an invitation email, but without the context of the video share. */
  sendVideoShareNotification: Scalars['Boolean']['input'];
  /** True if share modal prompted user to share videos via their personal Email Service Provider. */
  shareVideoEmailsSentViaPersonalESP?: Scalars['Boolean']['input'];
  /** Permissions for entire spaces */
  spaceAccess?: InputMaybe<Array<VideoAclEntrySpaceInput>>;
  videoId: Scalars['ID']['input'];
  workspaceAccess?: InputMaybe<VideoAccessLevel>;
};

export type SetVideoAclEntriesPayload = {
  __typename?: 'SetVideoAclEntriesPayload';
  entrySet?: Maybe<VideoAclEntrySet>;
};

export type SetVideoAclEntriesResponse = GenericError | SetVideoAclEntriesPayload | UserNotAuthorizedError;

export type SetVideoAndWorkspaceAccessPayload = {
  __typename?: 'SetVideoAndWorkspaceAccessPayload';
  aclEntries?: Maybe<AclEntries>;
  video?: Maybe<RegularUserVideo>;
};

export type SetVideoAndWorkspaceAccessResponse = GenericError | SetVideoAndWorkspaceAccessPayload | UserNotAuthorizedError;

export type Setting = {
  __typename?: 'Setting';
  id?: Maybe<Scalars['ID']['output']>;
  setting?: Maybe<ValueUnion>;
};

export type SetupExtensionSmokeTestUserResponse = GenericError | SetupExtensionUserInfo;

export type SetupExtensionUserInfo = {
  __typename?: 'SetupExtensionUserInfo';
  message: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
};

export enum ShareMessageType {
  Chat = 'chat',
  Email = 'email'
}

export type ShareVideoAlias = {
  __typename?: 'ShareVideoAlias';
  anonymousId: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  integrationId: Scalars['String']['output'];
  integrationSubscriptionId?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
};

export type ShareVideosToSpacePayload = {
  __typename?: 'ShareVideosToSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ShareVideosToSpaceResponse = GenericError | InputValidationError | ShareVideosToSpacePayload | UserNotAuthorizedError;

/** Returns object containing recorder client instruction, video ID and date of video creation. */
export type ShouldResumeFailedVideoUploadPayload = {
  __typename?: 'ShouldResumeFailedVideoUploadPayload';
  createdAt?: Maybe<Scalars['Date']['output']>;
  instruction: ResumeFailedVideoUploadInstruction;
  videoId: Scalars['String']['output'];
};

export type ShouldResumeFailedVideoUploadResponse = GenericError | ShouldResumeFailedVideoUploadResult | UserNotAuthorizedError;

export type ShouldResumeFailedVideoUploadResult = {
  __typename?: 'ShouldResumeFailedVideoUploadResult';
  result?: Maybe<Array<Maybe<ShouldResumeFailedVideoUploadPayload>>>;
};

export type SigninOrSignupWithAppleResponse = AccountCreatedButNoTermsAccepted | AppleAuthError | GenericError | RegularUser | UserAlreadyLoggedInError;

export type SigninOrSignupWithAppleV2Response = AccountCreatedButNoTermsAccepted | AppleAuthError | AppleLoginOrSignupUserResponse | GenericError | UserAlreadyLoggedInError;

export type SlackNotificationSettings = {
  __typename?: 'SlackNotificationSettings';
  comment?: Maybe<Scalars['Boolean']['output']>;
  comment_mention?: Maybe<Scalars['Boolean']['output']>;
  comment_reply?: Maybe<Scalars['Boolean']['output']>;
  reaction?: Maybe<Scalars['Boolean']['output']>;
  send_watch_later_reminder_weekdays_only?: Maybe<Scalars['Boolean']['output']>;
  share?: Maybe<Scalars['Boolean']['output']>;
  vfv?: Maybe<Scalars['Boolean']['output']>;
  watch_later_reminder?: Maybe<Scalars['Boolean']['output']>;
};

export type SmartInvite = {
  __typename?: 'SmartInvite';
  avatar?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Space = {
  __typename?: 'Space';
  createdAt?: Maybe<Scalars['Date']['output']>;
  currentUserCanEdit?: Maybe<Scalars['Boolean']['output']>;
  currentUserIsMember?: Maybe<Scalars['Boolean']['output']>;
  data_age_limit_in_seconds?: Maybe<Scalars['Int']['output']>;
  groups?: Maybe<Array<Maybe<WorkspaceGroup>>>;
  id: Scalars['ID']['output'];
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  is_primary: Scalars['Boolean']['output'];
  membersCount?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  privacy?: Maybe<SpacePrivacy>;
  topUsedTags?: Maybe<Array<Maybe<Tag>>>;
  totalFolders?: Maybe<Scalars['Int']['output']>;
  totalVideos?: Maybe<Scalars['Int']['output']>;
  workspace_id?: Maybe<Scalars['Int']['output']>;
  workspace_idv2?: Maybe<Scalars['ID']['output']>;
};

export type SpaceAdminData = {
  __typename?: 'SpaceAdminData';
  adminActionType?: Maybe<Scalars['String']['output']>;
  spaceId?: Maybe<Scalars['String']['output']>;
  spaceName?: Maybe<Scalars['String']['output']>;
};

export type SpaceAdminNotification = {
  __typename?: 'SpaceAdminNotification';
  createdAt?: Maybe<Scalars['Date']['output']>;
  data?: Maybe<SpaceAdminData>;
  user?: Maybe<NotificationUser>;
};

export type SpaceAdminProps = {
  __typename?: 'SpaceAdminProps';
  notification?: Maybe<SpaceAdminNotification>;
};

export type SpaceAdminPropsResponse = GenericError | InputValidationError | SpaceAdminProps | UserNotAuthorizedError;

export type SpaceConnection = {
  __typename?: 'SpaceConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<SpaceEdge>>>;
  /** Flattened list of Space type */
  nodes?: Maybe<Array<Maybe<Space>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type SpaceCountType = {
  __typename?: 'SpaceCountType';
  /** Returns the current active space count (open + closed and unarchived) for a workspace */
  total_active_spaces?: Maybe<Scalars['Int']['output']>;
};

export type SpaceEdge = {
  __typename?: 'SpaceEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Space>;
};

export type SpaceFolderAclEntry = FolderAclEntry & {
  __typename?: 'SpaceFolderAclEntry';
  access?: Maybe<FolderAccessLevel>;
  id: Scalars['ID']['output'];
  space?: Maybe<Space>;
};

export type SpaceInvitationData = {
  __typename?: 'SpaceInvitationData';
  spaceId?: Maybe<Scalars['String']['output']>;
  spaceName?: Maybe<Scalars['String']['output']>;
};

export type SpaceInvitationNotification = {
  __typename?: 'SpaceInvitationNotification';
  createdAt?: Maybe<Scalars['Date']['output']>;
  data?: Maybe<SpaceInvitationData>;
  user?: Maybe<NotificationUser>;
};

export type SpaceInvitationProps = {
  __typename?: 'SpaceInvitationProps';
  notification?: Maybe<SpaceInvitationNotification>;
};

export type SpaceInvitationPropsResponse = GenericError | InputValidationError | SpaceInvitationProps | UserNotAuthorizedError;

export type SpaceMember = {
  __typename?: 'SpaceMember';
  id: Scalars['ID']['output'];
  space: Space;
  space_id: Scalars['Int']['output'];
  space_idv2: Scalars['ID']['output'];
  unread?: Maybe<Scalars['Boolean']['output']>;
  user: RegularUser;
  user_id: Scalars['Int']['output'];
};

export type SpaceMemberConnection = {
  __typename?: 'SpaceMemberConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<SpaceMemberEdge>>>;
  /** Flattened list of SpaceMember type */
  nodes?: Maybe<Array<Maybe<SpaceMember>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type SpaceMemberEdge = {
  __typename?: 'SpaceMemberEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<SpaceMember>;
};

export enum SpacePrivacy {
  Workspace = 'workspace'
}

export type SpaceRecommendationType = {
  __typename?: 'SpaceRecommendationType';
  space?: Maybe<Space>;
};

export type SpaceRegularUserVideo = {
  __typename?: 'SpaceRegularUserVideo';
  data_age_limit_in_seconds?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  is_primary: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  privacy?: Maybe<SpacePrivacy>;
};

export type SpaceSearchResult = {
  __typename?: 'SpaceSearchResult';
  space?: Maybe<Space>;
};

export type SpaceSearchResultConnection = {
  __typename?: 'SpaceSearchResultConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<SpaceSearchResultEdge>>>;
  /** Flattened list of SpaceSearchResult type */
  nodes?: Maybe<Array<Maybe<SpaceSearchResult>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type SpaceSearchResultEdge = {
  __typename?: 'SpaceSearchResultEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<SpaceSearchResult>;
};

export type SpaceStateChangeData = {
  __typename?: 'SpaceStateChangeData';
  spaceId?: Maybe<Scalars['String']['output']>;
  spaceName?: Maybe<Scalars['String']['output']>;
  wasArchived?: Maybe<Scalars['Boolean']['output']>;
};

export type SpaceStateChangeNotification = {
  __typename?: 'SpaceStateChangeNotification';
  createdAt?: Maybe<Scalars['Date']['output']>;
  data?: Maybe<SpaceStateChangeData>;
  user?: Maybe<NotificationUser>;
};

export type SpaceStateChangeProps = {
  __typename?: 'SpaceStateChangeProps';
  notification?: Maybe<SpaceStateChangeNotification>;
};

export type SpaceStateChangePropsResponse = GenericError | InputValidationError | SpaceStateChangeProps | UserNotAuthorizedError;

export type SpaceVideoAclEntry = VideoAclEntry & {
  __typename?: 'SpaceVideoAclEntry';
  access?: Maybe<VideoAccessLevel>;
  space?: Maybe<Space>;
};

export type SpaceVideoMovedCardProps = {
  __typename?: 'SpaceVideoMovedCardProps';
  notification?: Maybe<SpaceVideoMovedNotification>;
};

export type SpaceVideoMovedCardPropsResponse = GenericError | InputValidationError | SpaceVideoMovedCardProps | UserNotAuthorizedError;

export type SpaceVideoMovedNotification = {
  __typename?: 'SpaceVideoMovedNotification';
  createdAt?: Maybe<Scalars['Date']['output']>;
  data?: Maybe<VisitSpaceData>;
  user?: Maybe<SpaceVideoMovedUser>;
};

export type SpaceVideoMovedUser = {
  __typename?: 'SpaceVideoMovedUser';
  avatar?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SpawnMeetingBotPayload = {
  __typename?: 'SpawnMeetingBotPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SpawnMeetingBotResponse = GenericError | InputValidationError | SpawnMeetingBotPayload | UserNotAuthorizedError;

export type SpeakerNotesRichText = {
  bold: Scalars['Boolean']['input'];
  bulletList: Scalars['Boolean']['input'];
  italic: Scalars['Boolean']['input'];
  orderedList: Scalars['Boolean']['input'];
  underline: Scalars['Boolean']['input'];
};

export type SsoInfoResponse = GenericError | SsoInfoPayload;

export type StorageIncentiveTypes = {
  __typename?: 'StorageIncentiveTypes';
  join_workspace?: Maybe<StorageIncentiveType>;
  record_first_video?: Maybe<StorageIncentiveType>;
};

export type StorageIncentivesTotalResponse = GenericError | GetStorageIncentivesTotalPayload | InputValidationError | UserNotAuthorizedError;

export enum StreamHubConsumerQueue {
  StreamhubConsumerBilling = 'streamhub_consumer_billing',
  StreamhubConsumerCloudProvisioner = 'streamhub_consumer_cloud_provisioner',
  StreamhubConsumerCsam = 'streamhub_consumer_csam',
  StreamhubConsumerGroups = 'streamhub_consumer_groups',
  StreamhubConsumerIdentity = 'streamhub_consumer_identity',
  StreamhubConsumerMeetings = 'streamhub_consumer_meetings',
  StreamhubConsumerPermissionsEvents = 'streamhub_consumer_permissions_events',
  StreamhubConsumerProfileUpdates = 'streamhub_consumer_profile_updates',
  StreamhubConsumerSessionDeletion = 'streamhub_consumer_session_deletion',
  StreamhubConsumerUserDeletion = 'streamhub_consumer_user_deletion'
}

export type StringObject = {
  __typename?: 'StringObject';
  id?: Maybe<Scalars['ID']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type StripeAddress = {
  __typename?: 'StripeAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type StripeCardError = Error & {
  __typename?: 'StripeCardError';
  code?: Maybe<Scalars['String']['output']>;
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

/** Partial Stripe PaymentMethod object */
export type StripeCardPaymentMethod = {
  __typename?: 'StripeCardPaymentMethod';
  brand: Scalars['String']['output'];
  last4: Scalars['String']['output'];
};

export type StripeCustomer = {
  __typename?: 'StripeCustomer';
  address?: Maybe<StripeAddress>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tax_id?: Maybe<Scalars['String']['output']>;
};

export type StripeError = {
  __typename?: 'StripeError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  type: StripeErrorType;
};

/** Type of Stripe error */
export enum StripeErrorType {
  StripeApiError = 'StripeAPIError',
  StripeAuthenticationError = 'StripeAuthenticationError',
  StripeCardError = 'StripeCardError',
  StripeConnectionError = 'StripeConnectionError',
  StripeError = 'StripeError',
  StripeIdempotencyError = 'StripeIdempotencyError',
  StripeInvalidGrantError = 'StripeInvalidGrantError',
  StripeInvalidRequestError = 'StripeInvalidRequestError',
  StripePermissionError = 'StripePermissionError',
  StripeRateLimitError = 'StripeRateLimitError',
  StripeSignatureVerificationError = 'StripeSignatureVerificationError'
}

export type StripeInvoice = {
  __typename?: 'StripeInvoice';
  chargeId?: Maybe<Scalars['String']['output']>;
  created: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  download_link?: Maybe<Scalars['String']['output']>;
  hosted_invoice_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  payment_intent?: Maybe<Scalars['String']['output']>;
  plan_id?: Maybe<Scalars['String']['output']>;
  products: Array<Scalars['String']['output']>;
  status: InvoiceStatus;
  total_paid: Scalars['Int']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

/** Partial Stripe PaymentMethod object */
export type StripePaymentMethod = {
  __typename?: 'StripePaymentMethod';
  card?: Maybe<StripeCardPaymentMethod>;
  id: Scalars['ID']['output'];
  object: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  us_bank_account?: Maybe<StripeUsBankAccountPaymentMethod>;
};

/** Partial Stripe Source object */
export type StripeSource = {
  __typename?: 'StripeSource';
  amount?: Maybe<Scalars['Int']['output']>;
  customer?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  object: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

/** Partial Stripe PaymentMethod object */
export type StripeUsBankAccountPaymentMethod = {
  __typename?: 'StripeUsBankAccountPaymentMethod';
  account_type?: Maybe<Scalars['String']['output']>;
  bank_name?: Maybe<Scalars['String']['output']>;
  last4?: Maybe<Scalars['String']['output']>;
};

export type SubmitContactSalesPayload = {
  __typename?: 'SubmitContactSalesPayload';
  isInvalidEmail?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SubmitContactSalesResponse = GenericError | SubmitContactSalesPayload;

export type Subscription = {
  __typename?: 'Subscription';
  adminTransferContentStatus?: Maybe<AdminTransferContentStatusResponse>;
  aiTriesCount?: Maybe<AiTriesCountPayload>;
  autoFeatureStatusChanged?: Maybe<AutoFeatureStatusChangedResponse>;
  botMessages: BotMessagesResponse;
  calendarUpdated: CalendarUpdatedResponse;
  /** Subscribe to caption translation completion events */
  captionTranslationCompleted?: Maybe<CaptionTranslationCompletedPayload>;
  /** Subscribe to recent videos created by the user */
  getLatestVideoSubscription?: Maybe<RegularUserVideo>;
  gifGeneratedForVideo: VideoThumbnailsSources;
  intelligenceAvailable?: Maybe<IntelligenceStatusResponse>;
  intercomEvent?: Maybe<IntercomEventResponse>;
  liveTranscriptEvent?: Maybe<LiveTranscriptStatus>;
  notificationsUpdated: Scalars['Boolean']['output'];
  receiveOutgoingBotMessages?: Maybe<ReceiveBotOutgoingMessagesPayload>;
  recordingCompleted: Scalars['Boolean']['output'];
  recordingEvent: RecordingEvent;
  /** Notifies when screenshot auto feature status changes */
  screenshotAutoFeatureStatusChanged?: Maybe<ScreenshotAutoFeatureStatusChangedPayload>;
  screenshotCompleted: ScreenshotCompletedResponse;
  sessionRequestToken: SrtResponse;
  taskStatus?: Maybe<TaskStatusPayload>;
  transcriptStatus: TranscriptStatusResponse;
  transferContentStatus?: Maybe<TransferContentStatusResponse>;
  videoChaptersUpdated?: Maybe<VideoChapters>;
  /** Subscribe to video comment added */
  videoCommentAdded: PublicVideoComment;
  videoGenerationStatus?: Maybe<GeneratedVideoDraft>;
  /** Video text replacements updated */
  videoTextReplacementsUpdated?: Maybe<VideoTextReplacementsUpdatedPayload>;
  /** Triggered when the transcoded Mp4 for a video is available */
  videoTranscodedUrlUpdated?: Maybe<VideoTranscodedUrlUpdatedPayload>;
  /** Video trim progress updated */
  videoTrimProgressUpdated?: Maybe<VideoTrimProgress>;
  /** Video upload progress updated */
  videoUploadProgressUpdated?: Maybe<VideoUploadProgress>;
  waveformDataChanged?: Maybe<WaveformDataChangedResponse>;
};


export type SubscriptionAdminTransferContentStatusArgs = {
  fromWorkspaceId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type SubscriptionAiTriesCountArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type SubscriptionAutoFeatureStatusChangedArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionBotMessagesArgs = {
  meetingBotExternalId: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
};


export type SubscriptionCaptionTranslationCompletedArgs = {
  captionsLanguageSelection: Scalars['String']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type SubscriptionGifGeneratedForVideoArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionIntelligenceAvailableArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionIntercomEventArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionLiveTranscriptEventArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionReceiveOutgoingBotMessagesArgs = {
  videoMeetingGuid: Scalars['ID']['input'];
};


export type SubscriptionRecordingCompletedArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionRecordingEventArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionScreenshotAutoFeatureStatusChangedArgs = {
  screenshotId: Scalars['ID']['input'];
};


export type SubscriptionScreenshotCompletedArgs = {
  id: Scalars['String']['input'];
  source: ScreenshotSource;
};


export type SubscriptionSessionRequestTokenArgs = {
  encodedPublicKey: Scalars['String']['input'];
};


export type SubscriptionTaskStatusArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionTranscriptStatusArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionTransferContentStatusArgs = {
  fromWorkspaceId: Scalars['ID']['input'];
};


export type SubscriptionVideoChaptersUpdatedArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type SubscriptionVideoCommentAddedArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['ID']['input'];
};


export type SubscriptionVideoGenerationStatusArgs = {
  videoDraftId: Scalars['ID']['input'];
};


export type SubscriptionVideoTextReplacementsUpdatedArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionVideoTranscodedUrlUpdatedArgs = {
  forceOriginal?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type SubscriptionVideoTrimProgressUpdatedArgs = {
  videoId: Scalars['ID']['input'];
};


export type SubscriptionVideoUploadProgressUpdatedArgs = {
  listenForTranscodedVideo?: InputMaybe<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};


export type SubscriptionWaveformDataChangedArgs = {
  videoId: Scalars['ID']['input'];
};

/** Add on within a subscription */
export type SubscriptionItem = {
  __typename?: 'SubscriptionItem';
  id: Scalars['ID']['output'];
  price: Price;
  quantity: Scalars['Int']['output'];
  /** The subscription the add on belongs to */
  subscriptionId: Scalars['String']['output'];
};

/** A schedule for a subscription */
export type SubscriptionSchedule = {
  __typename?: 'SubscriptionSchedule';
  current_phase?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  phases: Array<SubscriptionSchedulePhase>;
  status: SubscriptionScheduleStatus;
  subscription?: Maybe<Scalars['String']['output']>;
};

/** A phase of a subscription schedule */
export type SubscriptionSchedulePhase = {
  __typename?: 'SubscriptionSchedulePhase';
  end_date: Scalars['Float']['output'];
  items: Array<SchedulePhaseItem>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  start_date: Scalars['Float']['output'];
  trial_end?: Maybe<Scalars['Float']['output']>;
};

/** Status of a subscription schedule */
export enum SubscriptionScheduleStatus {
  Active = 'active',
  Canceled = 'canceled',
  Completed = 'completed',
  NotStarted = 'not_started',
  Released = 'released'
}

export type SubscriptionUserConnection = {
  __typename?: 'SubscriptionUserConnection';
  encryptedTokenData?: Maybe<Scalars['JSON']['output']>;
  externalUserId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  integrationSubscriptionId?: Maybe<Scalars['ID']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  organizationId?: Maybe<Scalars['ID']['output']>;
};

export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  result?: Maybe<Scalars['Boolean']['output']>;
};

export enum SuggestedPlaybackRate {
  None = 'none',
  X80 = 'x80',
  X100 = 'x100',
  X120 = 'x120',
  X150 = 'x150',
  X170 = 'x170',
  X200 = 'x200',
  X250 = 'x250'
}

/** A suggested user profile to follow */
export type SuggestedProfile = {
  __typename?: 'SuggestedProfile';
  user?: Maybe<RegularUser>;
};

export type SuggestedStreamsResponse = {
  __typename?: 'SuggestedStreamsResponse';
  profiles?: Maybe<Array<Maybe<SuggestedProfile>>>;
  tags?: Maybe<Array<Maybe<SuggestedTag>>>;
};

/** A suggested tag to follow */
export type SuggestedTag = {
  __typename?: 'SuggestedTag';
  name?: Maybe<Scalars['String']['output']>;
};

export enum SummaryNotification {
  Disabled = 'disabled',
  Everyone = 'everyone',
  ExternalOnly = 'external_only',
  InternalOnly = 'internal_only',
  RecorderOnly = 'recorder_only'
}

export type SupportChatMessage = {
  __typename?: 'SupportChatMessage';
  content: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type SupportChatMessageInput = {
  content: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type SuspendAccountInput = {
  /** the reason that an account is being suspended */
  reason: AccountSuspensionReasons;
  /** workspace id of the account being suspended */
  workspaceId: Scalars['ID']['input'];
};

export type SuspendAccountPayload = {
  __typename?: 'SuspendAccountPayload';
  success: Scalars['Boolean']['output'];
};

export type SuspendAccountResponse = GenericError | SuspendAccountPayload | UserNotAuthorizedError;

export type SyncLocalEmailSettingsToHubspotContactPayload = {
  __typename?: 'SyncLocalEmailSettingsToHubspotContactPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SyncLocalEmailSettingsToHubspotContactResponse = GenericError | SyncLocalEmailSettingsToHubspotContactPayload | UserNotAuthorizedError;

export type SyncedMeetingGrantee = {
  __typename?: 'SyncedMeetingGrantee';
  avatars: Array<Avatar>;
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
};

export type SyncedMeetingLoomUserGrantee = {
  __typename?: 'SyncedMeetingLoomUserGrantee';
  accessLevel: MeetingRecordingAccessType;
  id: Scalars['ID']['output'];
  user?: Maybe<SyncedMeetingGrantee>;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  client?: Maybe<Scalars['String']['output']>;
  client_version?: Maybe<Scalars['String']['output']>;
  os?: Maybe<Scalars['String']['output']>;
  os_version?: Maybe<Scalars['String']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  count?: Maybe<Scalars['Int']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  uri: Scalars['String']['output'];
};

export type TagClickedPayload = {
  __typename?: 'TagClickedPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TagEdge>>>;
  /** Flattened list of Tag type */
  nodes?: Maybe<Array<Maybe<Tag>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Tag>;
};

/** A collection containing a followed user and whether or not that user has unread content */
export type TagFollow = {
  __typename?: 'TagFollow';
  name?: Maybe<Scalars['String']['output']>;
  unread?: Maybe<Scalars['Boolean']['output']>;
};

export type TagViewedPayload = {
  __typename?: 'TagViewedPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
};

export type TagsPasswordProtectedVideoError = Error & {
  __typename?: 'TagsPasswordProtectedVideoError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type TaskStatusPayload = {
  __typename?: 'TaskStatusPayload';
  audioVariables: Array<AudioVariable>;
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

/** Customer's tax identification number */
export type TaxId = {
  __typename?: 'TaxId';
  country: Scalars['String']['output'];
  created: Scalars['Int']['output'];
  customer: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  livemode: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type TeamVideosConsumedBannerInsight = BannerInsight & {
  __typename?: 'TeamVideosConsumedBannerInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  secondaryMessage?: Maybe<Scalars['String']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  totalVideosCreated?: Maybe<Scalars['Int']['output']>;
  totalViewDurationSeconds?: Maybe<Scalars['Int']['output']>;
  totalViewsReceived?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export type TeamVideosPostedBannerInsight = BannerInsight & {
  __typename?: 'TeamVideosPostedBannerInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  secondaryMessage?: Maybe<Scalars['String']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  totalUniqueUsersPosted?: Maybe<Scalars['Int']['output']>;
  totalVideosPosted?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export enum TermMatch {
  Excludes = 'excludes',
  Includes = 'includes',
  Is = 'is'
}

/** Test clock object */
export type TestClock = {
  __typename?: 'TestClock';
  frozen_time?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  status?: Maybe<Scalars['String']['output']>;
};

/** The third tier variation assignment of the customer. */
export enum ThirdTierVariation {
  Control = 'control',
  Dec_2022PricingPackage = 'dec_2022_pricing_package',
  Ineligible = 'ineligible',
  Nov_2023PricingPackage = 'nov_2023_pricing_package',
  PhaseTwoAggressive = 'phase_two_aggressive',
  PhaseTwoConservative = 'phase_two_conservative'
}

export type Tier2PriceHistory = {
  __typename?: 'Tier2PriceHistory';
  annual?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  monthly?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Tier3PriceHistory = {
  __typename?: 'Tier3PriceHistory';
  annual?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  monthly?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type TierPricesArray = {
  __typename?: 'TierPricesArray';
  name?: Maybe<Scalars['String']['output']>;
  prices?: Maybe<Array<Maybe<Price>>>;
};

export type TimeRange = {
  from?: InputMaybe<Scalars['Date']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

/** The timestamp granularity returned */
export enum TimestampType {
  Day = 'DAY',
  Month = 'MONTH'
}

export type TimestampedPhrase = {
  __typename?: 'TimestampedPhrase';
  clipId?: Maybe<Scalars['String']['output']>;
  start: Scalars['Float']['output'];
  tokens: Array<TimestampedToken>;
  value: Scalars['String']['output'];
};

export type TimestampedToken = {
  __typename?: 'TimestampedToken';
  end?: Maybe<Scalars['Float']['output']>;
  start?: Maybe<Scalars['Float']['output']>;
  type: WordType;
  value: Scalars['String']['output'];
};

export type TimestampedWordsPayload = {
  __typename?: 'TimestampedWordsPayload';
  transcript: WordlevelTimestampTranscript;
};

export type ToggleFollowingProfileResponse = EntityNotFoundError | GenericError | InputValidationError | UserFollowsStream | UserNotAuthorizedError;

export type ToggleFollowingTagResponse = EntityNotFoundError | GenericError | InputValidationError | UserFollowsStream | UserNotAuthorizedError;

export type ToggleFollowingVideoResponse = EntityNotFoundError | GenericError | InputValidationError | InvalidRequestWarning | UserFollowsStream | UserNotAuthorizedError;

export type ToggleUnreadForProfileResponse = GenericError | InputValidationError | ToggleUnreadProfilesResponse | UserNotAuthorizedError;

export type ToggleUnreadForTagResponse = GenericError | InputValidationError | ToggleUnreadTagsResponse | UserNotAuthorizedError;

export type ToggleUnreadProfilesResponse = {
  __typename?: 'ToggleUnreadProfilesResponse';
  success: Scalars['Boolean']['output'];
};

export type ToggleUnreadTagsResponse = {
  __typename?: 'ToggleUnreadTagsResponse';
  success: Scalars['Boolean']['output'];
};

export type TopCreatorInsights = {
  __typename?: 'TopCreatorInsights';
  lastModified?: Maybe<Scalars['Date']['output']>;
  members?: Maybe<Array<Maybe<TopCreatorInsightsMember>>>;
  mostInteractionsMember?: Maybe<TopCreatorInsightsMember>;
  mostLoomsRecordedMember?: Maybe<TopCreatorInsightsMember>;
  mostViewsReceivedMember?: Maybe<TopCreatorInsightsMember>;
};

export type TopCreatorInsightsMember = {
  __typename?: 'TopCreatorInsightsMember';
  avatar?: Maybe<Scalars['String']['output']>;
  deactivated?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  lastActiveTime?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  totalScore?: Maybe<Scalars['Int']['output']>;
  videoCommentCount?: Maybe<Scalars['Int']['output']>;
  videoReactionCount?: Maybe<Scalars['Int']['output']>;
  videosRecorded?: Maybe<Scalars['Int']['output']>;
  viewsReceivedCount?: Maybe<Scalars['Int']['output']>;
};

export type TopViewerInsights = {
  __typename?: 'TopViewerInsights';
  lastModified?: Maybe<Scalars['Date']['output']>;
  members?: Maybe<Array<Maybe<TopViewerInsightsMember>>>;
  mostInteractionsMember?: Maybe<TopViewerInsightsMember>;
  mostLoomsWatchedMember?: Maybe<TopViewerInsightsMember>;
  mostViewtimeMember?: Maybe<TopViewerInsightsMember>;
};

export type TopViewerInsightsMember = {
  __typename?: 'TopViewerInsightsMember';
  avatar?: Maybe<Scalars['String']['output']>;
  deactivated?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  lastActiveTime?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  totalScore?: Maybe<Scalars['Int']['output']>;
  totalViewtimeSeconds?: Maybe<Scalars['Int']['output']>;
  videoCommentCount?: Maybe<Scalars['Int']['output']>;
  videoReactionCount?: Maybe<Scalars['Int']['output']>;
  videosWatched?: Maybe<Scalars['Int']['output']>;
};

export type TotalVideosCountByUserPayload = {
  __typename?: 'TotalVideosCountByUserPayload';
  videos_count?: Maybe<Scalars['Int']['output']>;
};

export type TrackEmailVerificationUserIdPayload = {
  __typename?: 'TrackEmailVerificationUserIdPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type TrackEmailVerificationUserIdResponse = GenericError | TrackEmailVerificationUserIdPayload;

export type TranscriptChunk = {
  __typename?: 'TranscriptChunk';
  ts?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type TranscriptCorrectionType = {
  __typename?: 'TranscriptCorrectionType';
  clipId?: Maybe<Scalars['ID']['output']>;
  correctionType: CorrectionEditType;
  elementIds: Array<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isPermanent: Scalars['Boolean']['output'];
  newContent?: Maybe<Scalars['String']['output']>;
  position?: Maybe<CorrectionPositionType>;
  source: CorrectionSourceType;
};

export type TranscriptElementIndex = {
  __typename?: 'TranscriptElementIndex';
  clipId?: Maybe<Scalars['String']['output']>;
  element?: Maybe<Scalars['Float']['output']>;
  elementId?: Maybe<Scalars['String']['output']>;
  monologue?: Maybe<Scalars['Float']['output']>;
};

export type TranscriptPhrases = {
  __typename?: 'TranscriptPhrases';
  ts: Scalars['Float']['output'];
  value: Scalars['String']['output'];
};

export type TranscriptPunctElement = {
  __typename?: 'TranscriptPunctElement';
  id: Scalars['ID']['output'];
  mediaEndMs: Scalars['Int']['output'];
  mediaStartMs: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TranscriptStatusResponse = {
  __typename?: 'TranscriptStatusResponse';
  status: Scalars['String']['output'];
};

export type TranscriptTextElement = {
  __typename?: 'TranscriptTextElement';
  id: Scalars['ID']['output'];
  mediaEndMs: Scalars['Int']['output'];
  mediaStartMs: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TranscriptionCorrection = {
  newValue: Scalars['String']['input'];
  sources: Array<CorrectionSource>;
};

export enum TranscriptionStatuses {
  Failed = 'failed',
  InProgress = 'in_progress',
  NoAudio = 'no_audio',
  Partial = 'partial',
  ReadyToTranscribe = 'ready_to_transcribe',
  ShortDuration = 'short_duration',
  Started = 'started',
  Success = 'success',
  TranscodingFailure = 'transcoding_failure',
  Trimming = 'trimming',
  UnsupportedLanguage = 'unsupported_language'
}

export type TransferAdminStatusToAnotherMemberResult = {
  __typename?: 'TransferAdminStatusToAnotherMemberResult';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type TransferContentStatusResponse = {
  __typename?: 'TransferContentStatusResponse';
  percentDone?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type TransferPrebucketedFeatureFlagResponse = GenericError | UserNotAuthorizedError | TransferPrebucketedFeatureFlagPayload;

export enum TrendingAlgorithm {
  TumblingTrending = 'tumbling_trending',
  TumblingTrendingEnsemble = 'tumbling_trending_ensemble'
}

export enum TrendingTagAlgorithm {
  TumblingTrendingTags = 'tumbling_trending_tags',
  TumblingTrendingTagsEnsemble = 'tumbling_trending_tags_ensemble'
}

export type TriggerTtsForVideosPayload = {
  __typename?: 'TriggerTtsForVideosPayload';
  audioVariables: Array<AudioVariable>;
};

export type TriggerTtsForVideosResponse = GenericError | TriggerTtsForVideosPayload | UserNotAuthorizedError;

export type TriggerValue = {
  complete: Scalars['Boolean']['input'];
  show: Scalars['Boolean']['input'];
};

export type TriggerValueInput = {
  complete: Scalars['Boolean']['input'];
  show: Scalars['Boolean']['input'];
};

export type TrimDisfluenciesPayload = {
  __typename?: 'TrimDisfluenciesPayload';
  video?: Maybe<RegularUserVideo>;
  wordsRemoved?: Maybe<Scalars['Int']['output']>;
};

export type TrimDisfluenciesResponse = GenericError | InputValidationError | InvalidRequestWarning | TrimDisfluenciesPayload | UserNotAuthorizedError;

export enum TtsCodes {
  Failure = 'FAILURE',
  Ignored = 'IGNORED',
  Pending = 'PENDING',
  Received = 'RECEIVED',
  Rejected = 'REJECTED',
  Retry = 'RETRY',
  Revoked = 'REVOKED',
  Started = 'STARTED',
  Success = 'SUCCESS'
}

export type TtsFeedbackAdditionalOptions = {
  freeTextFeedback?: InputMaybe<Scalars['String']['input']>;
  naturalSelected: Scalars['Boolean']['input'];
  pronunciationSelected: Scalars['Boolean']['input'];
  resemblanceSelected: Scalars['Boolean']['input'];
};

export enum TtsFeedbackType {
  Negative = 'negative',
  Positive = 'positive'
}

export enum TtsPriorityCode {
  Default = 'default',
  High = 'high',
  Low = 'low'
}

export enum UiLocation {
  Dashboard = 'dashboard',
  PostRecord = 'post_record',
  SharePage = 'share_page'
}

export type UnarchiveSpacePayload = {
  __typename?: 'UnarchiveSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UnarchiveSpaceResponse = GenericError | InputValidationError | UnarchiveSpacePayload | UserNotAuthorizedError;

export type UnauthorizedToAccessLinearError = Error & {
  __typename?: 'UnauthorizedToAccessLinearError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type UndoFillerWordRemovalTtsInput = {
  /** Password to access if the video is password protected. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** ID of the video to undo. */
  videoId: Scalars['ID']['input'];
};

export type UndoFillerWordRemovalTtsPayload = {
  __typename?: 'UndoFillerWordRemovalTTSPayload';
  video: RegularUserVideo;
};

export type UndoFillerWordRemovalTtsResponse = GenericError | InvalidRequestWarning | UndoFillerWordRemovalTtsPayload | UserNotAuthorizedError;

export type UndoPendingAddOnCancelationResponse = GenericError | InputValidationError | UserNotAuthorizedError | UndoPendingAddOnCancelationPayload;

export type UnseenNotificationPayload = {
  __typename?: 'UnseenNotificationPayload';
  count: Scalars['Int']['output'];
};

export type UnseenNotificationsCountResponse = GenericError | InputValidationError | UnseenNotificationPayload | UserNotAuthorizedError;

export type UnshareVideosFromSpacePayload = {
  __typename?: 'UnshareVideosFromSpacePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UnshareVideosFromSpaceResponse = GenericError | InputValidationError | UnshareVideosFromSpacePayload | UserNotAuthorizedError;

export type UnsupportedRecordingVersionError = Error & {
  __typename?: 'UnsupportedRecordingVersionError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type UnsyncedMeeting = {
  __typename?: 'UnsyncedMeeting';
  downloadUrl: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  isSynced: Scalars['Boolean']['output'];
  source: MeetingSourceProperty;
  title: Scalars['String']['output'];
  unixMSEndTime: Scalars['Date']['output'];
  unixMSStartTime: Scalars['Date']['output'];
};

export type UnsyncedMeetingInput = {
  downloadUrl: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  isSynced: Scalars['Boolean']['input'];
  source: MeetingSourceProperty;
  title: Scalars['String']['input'];
  unixMSEndTime: Scalars['Date']['input'];
  unixMSStartTime: Scalars['Date']['input'];
};

export type UpcomingInvoice = {
  __typename?: 'UpcomingInvoice';
  amount?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  periodEnd?: Maybe<Scalars['Int']['output']>;
  periodStart?: Maybe<Scalars['Int']['output']>;
  prorationAmount?: Maybe<Scalars['Int']['output']>;
};

export type UpcomingInvoicePayload = {
  __typename?: 'UpcomingInvoicePayload';
  invoice?: Maybe<UpcomingInvoice>;
  memberProrations?: Maybe<Array<Maybe<MemberProration>>>;
};

/** Return upcoming invoices for annual and monthly billing */
export type UpcomingInvoices = {
  __typename?: 'UpcomingInvoices';
  annual: Scalars['JSON']['output'];
  monthly: Scalars['JSON']['output'];
};

export type UpdateAllNotificationStatusesPayload = {
  __typename?: 'UpdateAllNotificationStatusesPayload';
  count?: Maybe<Scalars['Int']['output']>;
  notifications?: Maybe<Array<Maybe<NotificationTrayItem>>>;
};

export type UpdateAllNotificationStatusesResponse = GenericError | UpdateAllNotificationStatusesPayload | UserNotAuthorizedError;

export type UpdateAllUserDefaultVideoSettingsInGroupPayload = {
  __typename?: 'UpdateAllUserDefaultVideoSettingsInGroupPayload';
  numberOfUsersUpdated?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateAllUserDefaultVideoSettingsInGroupResponse = GenericError | InputValidationError | UpdateAllUserDefaultVideoSettingsInGroupPayload | UserNotAuthorizedError;

export type UpdateAutoCommentControlsResponse = {
  __typename?: 'UpdateAutoCommentControlsResponse';
  success: Scalars['Boolean']['output'];
};

export type UpdateAutoCommentDisplayControlsResponse = GenericError | InputValidationError | UpdateAutoCommentControlsResponse | UserNotAuthorizedError;

export type UpdateAutoRecordMeetingSettingResponse = GenericError | InputValidationError | UserNotAuthorizedError | UpdateAutoRecordMeetingSettingPayload;

export type UpdateAutomationPayload = {
  __typename?: 'UpdateAutomationPayload';
  automation?: Maybe<Automation>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateAutomationSuccessResponse = GenericError | InputValidationError | InvalidRequestWarning | UpdateAutomationPayload | UserNotAuthorizedError;

export type UpdateBillingEmailResponse = GenericError | InputValidationError | UserNotAuthorizedError | UpdateBillingEmailResult;

export type UpdateBillingPaymentSourceResponse = CardError | GenericError | InputValidationError | StripeCardError | UpdatedBillingSourcePayload | UserNotAuthorizedError;

export type UpdateCalendarMeetingRecordPayload = {
  __typename?: 'UpdateCalendarMeetingRecordPayload';
  meetings: Array<CalendarMeeting>;
  success: Scalars['Boolean']['output'];
};

export type UpdateCalendarMeetingRecordResponse = GenericError | InputValidationError | UpdateCalendarMeetingRecordPayload | UserNotAuthorizedError;

export type UpdateCalendarMeetingShareSettingsInput = {
  calendarMeetingGuid: Scalars['ID']['input'];
  externalInviteeAccess?: InputMaybe<MeetingRecordingAccessInput>;
  linkSharing?: InputMaybe<MeetingRecordingLinkSharingInput>;
  shareToFolderIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  shareToSpaceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  summaryNotification?: InputMaybe<MeetingRecordingSummaryNotificationInput>;
  timeZone: Scalars['String']['input'];
  workspaceMemberAccess?: InputMaybe<MeetingRecordingAccessInput>;
};

export type UpdateCalendarMeetingShareSettingsPayload = {
  __typename?: 'UpdateCalendarMeetingShareSettingsPayload';
  meetings: Array<CalendarMeeting>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateCalendarMeetingShareSettingsResponse = GenericError | InputValidationError | UpdateCalendarMeetingShareSettingsPayload | UserNotAuthorizedError;

export type UpdateChaptersResponse = GenericError | InvalidRequestWarning | UserNotAuthorizedError | VideoChapters;

export type UpdateCheckoutRoleChangeCachePayload = {
  __typename?: 'UpdateCheckoutRoleChangeCachePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateCheckoutRoleChangeCacheResponse = GenericError | InputValidationError | UpdateCheckoutRoleChangeCachePayload | UserNotAuthorizedError;

export type UpdateChosenMembersCachePayload = {
  __typename?: 'UpdateChosenMembersCachePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateChosenMembersCacheResponse = GenericError | InputValidationError | UpdateChosenMembersCachePayload | UserNotAuthorizedError;

export enum UpdateConfluenceMeetingNotesLocationErrorType {
  Exception = 'EXCEPTION',
  PermissionError = 'PERMISSION_ERROR',
  ValidationError = 'VALIDATION_ERROR'
}

export type UpdateConfluenceMeetingNotesLocationPayload = {
  __typename?: 'UpdateConfluenceMeetingNotesLocationPayload';
  /** It is preferred to only show the PERMISSION_ERROR value to clients and obfuscate the remaining values until there is a specific product use case */
  error?: Maybe<UpdateConfluenceMeetingNotesLocationErrorType>;
  success: Scalars['Boolean']['output'];
};

export type UpdateConfluenceMeetingNotesLocationResponse = GenericError | UpdateConfluenceMeetingNotesLocationPayload | UserNotAuthorizedError;

export type UpdateCustomVideoBackgroundPayload = {
  __typename?: 'UpdateCustomVideoBackgroundPayload';
  video: RegularUserVideo;
};

export type UpdateCustomVideoBackgroundResponse = GenericError | InvalidRequestWarning | UpdateCustomVideoBackgroundPayload | UserNotAuthorizedError;

export type UpdateCustomerInformationResponse = GenericError | InputValidationError | Organization | StripeError | UserNotAuthorizedError;

export type UpdateDataAgeLimitForSpacesPayload = {
  __typename?: 'UpdateDataAgeLimitForSpacesPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateDataAgeLimitForSpacesResponse = GenericError | InputValidationError | UpdateDataAgeLimitForSpacesPayload | UserNotAuthorizedError;

export type UpdateDefaultMeetingRecordingSettingsPayload = {
  __typename?: 'UpdateDefaultMeetingRecordingSettingsPayload';
  meetingRecordingSettings: MeetingRecordingSettings;
  success: Scalars['Boolean']['output'];
};

export type UpdateDefaultMeetingRecordingSettingsResponse = GenericError | InputValidationError | UpdateDefaultMeetingRecordingSettingsPayload | UserNotAuthorizedError;

export type UpdateDefaultPaymentMethodPayload = {
  __typename?: 'UpdateDefaultPaymentMethodPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateDefaultPaymentMethodResponse = GenericError | InputValidationError | UpdateDefaultPaymentMethodPayload | UserNotAuthorizedError;

export type UpdateDefaultSsoUserRolePayload = {
  __typename?: 'UpdateDefaultSSOUserRolePayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateDefaultSsoUserRoleResponse = GenericError | InputValidationError | UpdateDefaultSsoUserRolePayload | UserNotAuthorizedError;

export type UpdateDefaultWorkspaceResponse = {
  __typename?: 'UpdateDefaultWorkspaceResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateDismissWorkflowSneakpeekPayload = {
  __typename?: 'UpdateDismissWorkflowSneakpeekPayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateDismissWorkflowSneakpeekResponse = GenericError | UpdateDismissWorkflowSneakpeekPayload | UserNotAuthorizedError | VideoNotFoundError;

export type UpdateDraftActorPayload = {
  __typename?: 'UpdateDraftActorPayload';
  draft: GeneratedVideoDraft;
};

export type UpdateDraftActorResponse = GenericError | InputValidationError | UpdateDraftActorPayload | UserNotAuthorizedError;

export type UpdateDraftSceneImageOverlayPayload = {
  __typename?: 'UpdateDraftSceneImageOverlayPayload';
  imageOverlay: GeneratedVideoImageOverlay;
};

export type UpdateDraftSceneImageOverlayResponse = GenericError | InputValidationError | UpdateDraftSceneImageOverlayPayload | UserNotAuthorizedError;

export type UpdateDraftSceneScriptPayload = {
  __typename?: 'UpdateDraftSceneScriptPayload';
  scene: DraftScene;
};

export type UpdateDraftSceneScriptResponse = GenericError | InputValidationError | UpdateDraftSceneScriptPayload | UserNotAuthorizedError;

export type UpdateDraftSceneTextOverlayPayload = {
  __typename?: 'UpdateDraftSceneTextOverlayPayload';
  textOverlay: GeneratedVideoTextOverlay;
};

export type UpdateDraftSceneTextOverlayResponse = GenericError | InputValidationError | UpdateDraftSceneTextOverlayPayload | UserNotAuthorizedError;

export type UpdateExternalApiTokenResponse = GenericError | InputValidationError | UpdateExternalApiTokenResult | UserNotAuthorizedError;

export type UpdateExternalApiTokenResult = {
  __typename?: 'UpdateExternalAPITokenResult';
  name?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type UpdateFolderVisibility = {
  __typename?: 'UpdateFolderVisibility';
  folder?: Maybe<RegularUserFolder>;
};

export type UpdateFolderVisibilityResponse = GenericError | InputValidationError | UpdateFolderVisibility | UserNotAuthorizedError;

export type UpdateHexDraftBackgroundPayload = {
  __typename?: 'UpdateHexDraftBackgroundPayload';
  draft: GeneratedVideoDraft;
};

export type UpdateHexDraftBackgroundResponse = GenericError | InputValidationError | UpdateHexDraftBackgroundPayload | UserNotAuthorizedError;

export type UpdateHexVideoBackgroundPayload = {
  __typename?: 'UpdateHexVideoBackgroundPayload';
  video: RegularUserVideo;
};

export type UpdateHexVideoBackgroundResponse = GenericError | InvalidRequestWarning | UpdateHexVideoBackgroundPayload | UserNotAuthorizedError;

export type UpdateIntegrationSubscriptionMetadataResponse = GenericError | InputValidationError | IntegrationSubscription | UserNotAuthorizedError;

export type UpdateIntegrationSubscriptionResponse = GenericError | IntegrationSubscription | UserNotAuthorizedError;

export type UpdateLastWatchTimeResponse = GenericError | UpdateWatchTimePayload;

export type UpdateLinkedUserToAtlassianMasteredPayload = {
  __typename?: 'UpdateLinkedUserToAtlassianMasteredPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateLinkedUserToAtlassianMasteredResponse = GenericError | UpdateLinkedUserToAtlassianMasteredPayload | UserNotAuthorizedError;

export type UpdateMeetingShareSettingsPayload = {
  __typename?: 'UpdateMeetingShareSettingsPayload';
  meetings: Array<CalendarMeeting>;
  success: Scalars['Boolean']['output'];
};

export type UpdateMeetingShareSettingsResponse = GenericError | InputValidationError | UpdateMeetingShareSettingsPayload | UserNotAuthorizedError;

export type UpdateMemberPropertyResponse = GenericError | InputValidationError | UpdatedPersonProperty | UserNotAuthorizedError;

export type UpdateMemberRolememberRoleUpdateEntry = {
  key: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type UpdateMemberStatusResult = {
  __typename?: 'UpdateMemberStatusResult';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  updatedMembers?: Maybe<Array<UpdatedMemberStatus>>;
};

export type UpdateMemberWorkspaceRoleResponse = GenericError | InputValidationError | UpdateWorkspaceRoleResult | UserNotAuthorizedError;

export type UpdateMembershipsRoleResponse = GenericError | InputValidationError | UpdateMembershipsRoleResult | UserNotAuthorizedError;

export type UpdateMembershipsRoleResult = {
  __typename?: 'UpdateMembershipsRoleResult';
  errorMessage?: Maybe<Scalars['String']['output']>;
  failed?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  succeeded?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateOrganizationResponse = GenericError | Organization | UserNotAuthorizedError;

export type UpdatePaymentMethodIntentPayload = {
  __typename?: 'UpdatePaymentMethodIntentPayload';
  clientSecret: Scalars['String']['output'];
  intentId: Scalars['String']['output'];
};

export type UpdatePaymentMethodIntentResponse = GenericError | InputValidationError | UpdatePaymentMethodIntentPayload | UserNotAuthorizedError;

export type UpdatePhoneticHintsPayload = {
  __typename?: 'UpdatePhoneticHintsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdatePhoneticHintsResponse = GenericError | UpdatePhoneticHintsPayload | UserNotAuthorizedError;

export type UpdatePresetDraftBackgroundPayload = {
  __typename?: 'UpdatePresetDraftBackgroundPayload';
  draft: GeneratedVideoDraft;
};

export type UpdatePresetDraftBackgroundResponse = GenericError | InputValidationError | UpdatePresetDraftBackgroundPayload | UserNotAuthorizedError;

export type UpdatePresetVideoBackgroundPayload = {
  __typename?: 'UpdatePresetVideoBackgroundPayload';
  video: RegularUserVideo;
};

export type UpdatePresetVideoBackgroundResponse = GenericError | InvalidRequestWarning | UpdatePresetVideoBackgroundPayload | UserNotAuthorizedError;

export type UpdatePushCredentialKeysInput = {
  authSecret: Scalars['String']['input'];
  privateKey: Scalars['String']['input'];
  publicKey: Scalars['String']['input'];
};

export type UpdatePushNotificationCredentialsResponse = GenericError | UpdatePushNotificationPayload | UserNotAuthorizedError;

export type UpdatePushNotificationPayload = {
  __typename?: 'UpdatePushNotificationPayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateRecordingVideoDocumentTypePayload = {
  __typename?: 'UpdateRecordingVideoDocumentTypePayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateRecordingVideoDocumentTypeResponse = GenericError | UpdateRecordingVideoDocumentTypePayload | UserNotAuthorizedError | VideoNotFoundError;

export type UpdateReferralLinkEnabledPayloadType = {
  __typename?: 'UpdateReferralLinkEnabledPayloadType';
  updated?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateReferralLinkEnabledResponse = GenericError | InputValidationError | UpdateReferralLinkEnabledPayloadType | UserNotAuthorizedError;

export type UpdateScreenshotAnnotations = {
  __typename?: 'UpdateScreenshotAnnotations';
  annotations?: Maybe<Scalars['String']['output']>;
  screenshotId?: Maybe<Scalars['String']['output']>;
};

export type UpdateScreenshotAnnotationsResponse = EntityNotFoundError | GenericError | UpdateScreenshotAnnotations | UserNotAuthorizedError;

export type UpdateScreenshotCanvasOverlays = {
  __typename?: 'UpdateScreenshotCanvasOverlays';
  canvasOverlays?: Maybe<Scalars['String']['output']>;
  screenshotId?: Maybe<Scalars['String']['output']>;
};

export type UpdateScreenshotCanvasOverlaysResponse = EntityNotFoundError | GenericError | UpdateScreenshotCanvasOverlays | UserNotAuthorizedError;

export type UpdateScreenshotHexBackgroundPayload = {
  __typename?: 'UpdateScreenshotHexBackgroundPayload';
  screenshot: Screenshot;
};

export type UpdateScreenshotHexBackgroundResponse = EntityNotFoundError | GenericError | UpdateScreenshotHexBackgroundPayload | UserNotAuthorizedError;

export type UpdateScreenshotPresetBackgroundPayload = {
  __typename?: 'UpdateScreenshotPresetBackgroundPayload';
  screenshot: Screenshot;
};

export type UpdateScreenshotPresetBackgroundResponse = EntityNotFoundError | GenericError | UpdateScreenshotPresetBackgroundPayload | UserNotAuthorizedError;

export type UpdateScreenshotPrivacy = {
  __typename?: 'UpdateScreenshotPrivacy';
  /** Screenshot privacy */
  privacy?: Maybe<ScreenshotPrivacyTypes>;
};

export type UpdateScreenshotPrivacyResponse = EntityNotFoundError | GenericError | UpdateScreenshotPrivacy | UserNotAuthorizedError;

export type UpdateScreenshotSourcePayload = {
  __typename?: 'UpdateScreenshotSourcePayload';
  screenshotId: Scalars['ID']['output'];
};

export type UpdateScreenshotSourceResponse = EntityNotFoundError | GenericError | UpdateScreenshotSourcePayload | UserNotAuthorizedError;

export type UpdateScreenshotTitleResponse = EntityNotFoundError | GenericError | Screenshot | UserNotAuthorizedError;

export type UpdateSelectedWorkspaceResponse = {
  __typename?: 'UpdateSelectedWorkspaceResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSettingsForAllRecurringMeetingsResponse = GenericError | InputValidationError | UserNotAuthorizedError | UpdateSettingsForAllRecurringMeetingsPayload;

export type UpdateSmartSyncStoreInput = {
  /** Action to perform on the Smart Sync Store */
  action: QuantitySmartSyncAction;
  /** Unix timestamp for proration date */
  prorationDate?: InputMaybe<Scalars['String']['input']>;
  /** Workspace ID to process */
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSpacePayload = {
  __typename?: 'UpdateSpacePayload';
  space?: Maybe<Space>;
};

export type UpdateSpaceResponse = GenericError | InputValidationError | UpdateSpacePayload | UserNotAuthorizedError;

export type UpdateUserAvatarsPayload = {
  __typename?: 'UpdateUserAvatarsPayload';
  avatars?: Maybe<Array<Avatar>>;
};

export type UpdateUserAvatarsResponse = AccountIsExternallyMasteredError | GenericError | UpdateUserAvatarsPayload | UserNotAuthorizedError;

export type UpdateUserDefaultWorkspaceResponse = GenericError | InputValidationError | UpdateDefaultWorkspaceResponse | UserNotAuthorizedError;

export type UpdateUserEmailNotificationPreferencePayload = {
  __typename?: 'UpdateUserEmailNotificationPreferencePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateUserEmailNotificationPreferenceResponse = GenericError | UpdateUserEmailNotificationPreferencePayload | UserNotAuthorizedError;

export type UpdateUserEmailPayload = {
  __typename?: 'UpdateUserEmailPayload';
  message: Scalars['String']['output'];
};

export type UpdateUserEmailResponse = AccountIsExternallyMasteredError | GenericError | UpdateUserEmailPayload | UserNotAuthorizedError;

export type UpdateUserFirstAndLastNamePayload = {
  __typename?: 'UpdateUserFirstAndLastNamePayload';
  user?: Maybe<RegularUser>;
};

export type UpdateUserFirstAndLastNameResponse = AccountIsExternallyMasteredError | GenericError | UpdateUserFirstAndLastNamePayload | UserNotAuthorizedError;

export type UpdateUserGmoiConsentPayload = {
  __typename?: 'UpdateUserGMOIConsentPayload';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateUserGmoiConsentResponse = GenericError | UpdateUserGmoiConsentPayload;

export type UpdateUserIntegrationSettingsPayload = {
  __typename?: 'UpdateUserIntegrationSettingsPayload';
  user?: Maybe<RegularUser>;
};

export type UpdateUserIntegrationSettingsResponse = GenericError | UpdateUserIntegrationSettingsPayload | UserNotAuthorizedError;

export type UpdateUserLoomCompanionSettingsForDomainNamePayload = {
  __typename?: 'UpdateUserLoomCompanionSettingsForDomainNamePayload';
  domainName?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<RegularUser>;
};

export type UpdateUserLoomCompanionSettingsForDomainNameResponse = GenericError | UpdateUserLoomCompanionSettingsForDomainNamePayload | UserNotAuthorizedError;

export type UpdateUserLoomCompanionSettingsForMasterSwitchPayload = {
  __typename?: 'UpdateUserLoomCompanionSettingsForMasterSwitchPayload';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<RegularUser>;
};

export type UpdateUserLoomCompanionSettingsForMasterSwitchResponse = GenericError | UpdateUserLoomCompanionSettingsForMasterSwitchPayload | UserNotAuthorizedError;

export type UpdateUserPasswordPayload = {
  __typename?: 'UpdateUserPasswordPayload';
  message: Scalars['String']['output'];
};

export type UpdateUserPasswordResponse = AccountIsExternallyMasteredError | GenericError | UpdateUserPasswordPayload | UserNotAuthorizedError;

export type UpdateUserPersonaInfoResponse = GenericError | UpdateUserPersonaPayload | UserNotAuthorizedError;

export type UpdateUserPersonaPayload = {
  __typename?: 'UpdateUserPersonaPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateUserPinnedVideoPayload = {
  __typename?: 'UpdateUserPinnedVideoPayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateUserPinnedVideoResponse = GenericError | UpdateUserPinnedVideoPayload | UserNotAuthorizedError;

export type UpdateUserPropertyResponse = GenericError | InputValidationError | UpdatedPersonProperty | UserNotAuthorizedError;

export type UpdateUserScreenshotSettingsPayload = {
  __typename?: 'UpdateUserScreenshotSettingsPayload';
  user?: Maybe<RegularUser>;
};

export type UpdateUserScreenshotSettingsResponse = GenericError | UpdateUserScreenshotSettingsPayload | UserNotAuthorizedError;

export type UpdateUserTriggerInput = {
  desktop_stop_rec_tooltip?: InputMaybe<TriggerValue>;
  email_verified?: InputMaybe<TriggerValue>;
  gmail_integration_share_page_upsell?: InputMaybe<TriggerValue>;
  request_push_permissions?: InputMaybe<TriggerValue>;
  show_avatar_tooltip?: InputMaybe<TriggerValue>;
  show_data_retention_warning?: InputMaybe<TriggerValue>;
  show_download_video_info_modal?: InputMaybe<TriggerValue>;
  show_get_started_checklist?: InputMaybe<TriggerValue>;
  show_milestone_post_recording_celebration?: InputMaybe<TriggerValue>;
  show_mobile_banner_prompt?: InputMaybe<TriggerValue>;
  show_non_default_workspace_banner?: InputMaybe<TriggerValue>;
  website_show_new_get_started_checklist_banner?: InputMaybe<TriggerValue>;
};

export type UpdateUserTriggerPayload = {
  __typename?: 'UpdateUserTriggerPayload';
  user?: Maybe<RegularUser>;
};

export type UpdateUserTriggerResponse = GenericError | UpdateUserTriggerPayload | UserNotAuthorizedError;

export type UpdateUserTriggerV2Input = {
  desktop_stop_rec_tooltip?: InputMaybe<TriggerValueInput>;
  email_verified?: InputMaybe<TriggerValueInput>;
  gmail_integration_share_page_upsell?: InputMaybe<TriggerValueInput>;
  request_push_permissions?: InputMaybe<TriggerValueInput>;
  show_avatar_tooltip?: InputMaybe<TriggerValueInput>;
  show_data_retention_warning?: InputMaybe<TriggerValueInput>;
  show_download_video_info_modal?: InputMaybe<TriggerValueInput>;
  show_get_started_checklist?: InputMaybe<TriggerValueInput>;
  show_milestone_post_recording_celebration?: InputMaybe<TriggerValueInput>;
  show_mobile_banner_prompt?: InputMaybe<TriggerValueInput>;
  show_non_default_workspace_banner?: InputMaybe<TriggerValueInput>;
  website_show_new_get_started_checklist_banner?: InputMaybe<TriggerValueInput>;
};

export type UpdateUserTriggerV2Payload = {
  __typename?: 'UpdateUserTriggerV2Payload';
  user?: Maybe<RegularUser>;
};

export type UpdateUserTriggerV2Response = GenericError | UpdateUserTriggerV2Payload | UserNotAuthorizedError;

export type UpdateUserUgcDataUseSettingsInput = {
  /** UGC data use consent to include face and voice data */
  includeFaceAndVoiceData: Scalars['Boolean']['input'];
};

export type UpdateUserUgcDataUseSettingsPayload = {
  __typename?: 'UpdateUserUgcDataUseSettingsPayload';
  includeFaceAndVoiceData?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateUserUgcDataUseSettingsResponse = GenericError | UpdateUserUgcDataUseSettingsPayload | UserNotAuthorizedError;

export type UpdateUserVideoSettingsPayload = {
  __typename?: 'UpdateUserVideoSettingsPayload';
  user?: Maybe<RegularUser>;
};

export type UpdateUserVideoSettingsResponse = GenericError | UpdateUserVideoSettingsPayload | UserNotAuthorizedError;

export type UpdateVideoAclEntryPayload = {
  __typename?: 'UpdateVideoAclEntryPayload';
  entry: VideoAclEntry;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateVideoAclEntryResponse = GenericError | UpdateVideoAclEntryPayload | UserNotAuthorizedError;

export type UpdateVideoCanvasOverlaysPayload = {
  __typename?: 'UpdateVideoCanvasOverlaysPayload';
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoCanvasOverlaysResponse = GenericError | InputValidationError | InvalidRequestWarning | SavingOverNewClipChangesPayload | UpdateVideoCanvasOverlaysPayload | UserNotAuthorizedError;

export type UpdateVideoClipsPayload = {
  __typename?: 'UpdateVideoClipsPayload';
  commentsOrReactionsModified?: Maybe<Scalars['Boolean']['output']>;
  notifiedUsers?: Maybe<Array<Maybe<NotifiedClipUsers>>>;
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoClipsResponse = ClipUpdateError | GenericError | InvalidRequestWarning | SavingOverNewClipChangesPayload | UpdateVideoClipsPayload | UserNotAuthorizedError;

export type UpdateVideoCommunityPostingResponse = GenericError | UpdatedVideoCommunityPosting | UserNotAuthorizedError;

export type UpdateVideoCtaPayload = {
  __typename?: 'UpdateVideoCtaPayload';
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoCtaResponse = GenericError | InputValidationError | InvalidRequestWarning | UpdateVideoCtaPayload | UserNotAuthorizedError;

export type UpdateVideoDescriptionV2Response = GenericError | InvalidRequestWarning | RegularUserVideo | UserNotAuthorizedError;

export type UpdateVideoDurationPayload = {
  __typename?: 'UpdateVideoDurationPayload';
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoDurationResponse = GenericError | InvalidRequestWarning | UpdateVideoDurationPayload | UserNotAuthorizedError | VideoNotFoundError;

export type UpdateVideoExpirationDateResponse = GenericError | InvalidRequestWarning | RegularUserVideo | UserNotAuthorizedError;

export type UpdateVideoNamePayload = {
  __typename?: 'UpdateVideoNamePayload';
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoNameResponse = GenericError | InputValidationError | UpdateVideoNamePayload | UserNotAuthorizedError | VideoNotFoundError;

export type UpdateVideoPasswordPayload = {
  __typename?: 'UpdateVideoPasswordPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoPasswordResponse = GenericError | InputValidationError | UpdateVideoPasswordPayload | UserNotAuthorizedError;

export type UpdateVideoPinStatusInput = {
  context: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  newStatus: Scalars['Boolean']['input'];
  videoId: Scalars['ID']['input'];
};

export type UpdateVideoPinStatusPayload = {
  __typename?: 'UpdateVideoPinStatusPayload';
  video: RegularUserVideo;
};

export type UpdateVideoPinStatusResponse = GenericError | UpdateVideoPinStatusPayload | UserNotAuthorizedError;

export type UpdateVideoPlaySegmentV2Response = GenericError | InvalidRequestWarning | VideoPlaySegmentMutationRes;

export type UpdateVideoPrivacyStatusPayload = {
  __typename?: 'UpdateVideoPrivacyStatusPayload';
  video: RegularUserVideo;
};

export type UpdateVideoPrivacyStatusResponse = GenericError | UpdateVideoPrivacyStatusPayload | UserNotAuthorizedError;

export type UpdateVideoSearchEngineIndexingPayload = {
  __typename?: 'UpdateVideoSearchEngineIndexingPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateVideoSearchEngineIndexingResponse = GenericError | UpdateVideoSearchEngineIndexingPayload | UserNotAuthorizedError;

export type UpdateVideoSettingsPayload = {
  __typename?: 'UpdateVideoSettingsPayload';
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoSettingsResponse = GenericError | InvalidRequestWarning | UpdateVideoSettingsPayload | UserNotAuthorizedError;

export type UpdateVideoTaskPayload = {
  __typename?: 'UpdateVideoTaskPayload';
  task?: Maybe<VideoTask>;
};

export type UpdateVideoTaskResponse = GenericError | InvalidRequestWarning | UpdateVideoTaskPayload | UserNotAuthorizedError;

export type UpdateVideoTranscriptDetails = {
  __typename?: 'UpdateVideoTranscriptDetails';
  captions_source_url?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
  video_id: Scalars['ID']['output'];
};

export type UpdateVideoTrimRangesPayload = {
  __typename?: 'UpdateVideoTrimRangesPayload';
  video?: Maybe<RegularUserVideo>;
};

export type UpdateVideoTrimRangesResponse = GenericError | InputValidationError | InvalidRequestWarning | SavingOverNewClipChangesPayload | UpdateVideoTrimRangesPayload | UserNotAuthorizedError;

export type UpdateVideoVisibilityResponse = GenericError | InputValidationError | UpdatedVideoVisibility | UserNotAuthorizedError;

export type UpdateWatchTimePayload = {
  __typename?: 'UpdateWatchTimePayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateWorkflowDocVisibilityPayload = {
  __typename?: 'UpdateWorkflowDocVisibilityPayload';
  success: Scalars['Boolean']['output'];
  /** Whether the document is visible to viewers */
  visibleToViewers: Scalars['Boolean']['output'];
};

export type UpdateWorkflowDocVisibilityResponse = GenericError | UpdateWorkflowDocVisibilityPayload | UserNotAuthorizedError | VideoNotFoundError;

export type UpdateWorkspaceGroupPropertiesPayload = {
  __typename?: 'UpdateWorkspaceGroupPropertiesPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceGroupPropertiesResponse = GenericError | InputValidationError | UpdateWorkspaceGroupPropertiesPayload | UserNotAuthorizedError;

export type UpdateWorkspaceGroupResponse = GenericError | InputValidationError | UserNotAuthorizedError | UpdateWorkspaceGroupPayload;

export type UpdateWorkspaceRoleResult = {
  __typename?: 'UpdateWorkspaceRoleResult';
  member?: Maybe<OrganizationMember>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateWorkspaceSettingResponse = GenericError | InputValidationError | UpdatedWorkspaceSetting | UserNotAuthorizedError;

export type UpdateWorkspaceUgcDataUseSettingsInput = {
  /** UGC data use option */
  dataUse?: InputMaybe<Scalars['String']['input']>;
  /** UGC data use consent to include face and voice data */
  includeFaceAndVoiceData?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateWorkspaceUgcDataUseSettingsPayload = {
  __typename?: 'UpdateWorkspaceUgcDataUseSettingsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceUgcDataUseSettingsResponse = GenericError | UpdateWorkspaceUgcDataUseSettingsPayload | UserNotAuthorizedError;

export type UpdatedBillingSourcePayload = {
  __typename?: 'UpdatedBillingSourcePayload';
  sources?: Maybe<Scalars['String']['output']>;
};

export type UpdatedMemberStatus = {
  __typename?: 'UpdatedMemberStatus';
  id: Scalars['ID']['output'];
  role?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/** The updated member or user property along with whether it was created */
export type UpdatedPersonProperty = {
  __typename?: 'UpdatedPersonProperty';
  created?: Maybe<Scalars['Boolean']['output']>;
  property?: Maybe<PersonProperty>;
  updated?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdatedVideoCommunityPosting = {
  __typename?: 'UpdatedVideoCommunityPosting';
  video?: Maybe<RegularUserVideo>;
};

export type UpdatedVideoVisibility = {
  __typename?: 'UpdatedVideoVisibility';
  video?: Maybe<RegularUserVideo>;
};

export type UpdatedWorkspaceSetting = {
  __typename?: 'UpdatedWorkspaceSetting';
  created?: Maybe<Scalars['Boolean']['output']>;
  setting?: Maybe<WorkspaceSetting>;
  updated?: Maybe<Scalars['Boolean']['output']>;
};

export type UserAlreadyExistsError = Error & {
  __typename?: 'UserAlreadyExistsError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
  user?: Maybe<RegularUser>;
};

export type UserAlreadyLoggedInError = Error & {
  __typename?: 'UserAlreadyLoggedInError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type UserEduStatusResult = {
  __typename?: 'UserEduStatusResult';
  isTaggedAsEducation?: Maybe<Scalars['Boolean']['output']>;
};

export type UserEmailChangeResponse = {
  __typename?: 'UserEmailChangeResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type UserEmailVideoAclEntry = VideoAclEntry & {
  __typename?: 'UserEmailVideoAclEntry';
  access?: Maybe<VideoAccessLevel>;
  email: Scalars['String']['output'];
  hasPendingInvite?: Maybe<Scalars['Boolean']['output']>;
};

export type UserFolderAclEntry = FolderAclEntry & {
  __typename?: 'UserFolderAclEntry';
  access?: Maybe<FolderAccessLevel>;
  id: Scalars['ID']['output'];
  user?: Maybe<RegularUser>;
};

export type UserFollowedStream = {
  __typename?: 'UserFollowedStream';
  profiles?: Maybe<Array<Maybe<ProfileFollow>>>;
  tags?: Maybe<Array<Maybe<TagFollow>>>;
};

export type UserFollowsStream = {
  __typename?: 'UserFollowsStream';
  follow?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UserFromProfileUrl = {
  __typename?: 'UserFromProfileUrl';
  user?: Maybe<RegularUser>;
};

export type UserIdFromProfileUrlPayload = {
  __typename?: 'UserIdFromProfileUrlPayload';
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum UserIdentitieProviderEnum {
  Apple = 'apple',
  Google = 'google',
  Slack = 'slack',
  Windows = 'windows',
  Workos = 'workos'
}

export type UserIntegrationSetting = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  expand?: InputMaybe<Scalars['Boolean']['input']>;
  hint?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserIntegrationSettings = {
  integrate_confluence?: InputMaybe<UserIntegrationSetting>;
  integrate_dropbox?: InputMaybe<UserIntegrationSetting>;
  integrate_github?: InputMaybe<UserIntegrationSetting>;
  integrate_gitlab?: InputMaybe<UserIntegrationSetting>;
  integrate_gmail?: InputMaybe<UserIntegrationSetting>;
  integrate_google_docs?: InputMaybe<UserIntegrationSetting>;
  integrate_hacker_news?: InputMaybe<UserIntegrationSetting>;
  integrate_intercom?: InputMaybe<UserIntegrationSetting>;
  integrate_invision?: InputMaybe<UserIntegrationSetting>;
  integrate_jira?: InputMaybe<UserIntegrationSetting>;
  integrate_producthunt?: InputMaybe<UserIntegrationSetting>;
  integrate_salesforce?: InputMaybe<UserIntegrationSetting>;
  integrate_salesforce_iq?: InputMaybe<UserIntegrationSetting>;
};

export type UserLibraryInsight = BannerInsight & {
  __typename?: 'UserLibraryInsight';
  emoji?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  messageInChunks?: Maybe<Array<Maybe<BannerInsightMessageChunk>>>;
  name: BannerName;
  timePeriod?: Maybe<Scalars['String']['output']>;
  tooltip?: Maybe<Scalars['String']['output']>;
  totalAnonymousViewsReceived?: Maybe<Scalars['Int']['output']>;
  totalMeetingsReplaced?: Maybe<Scalars['Int']['output']>;
  totalMinutesSavedTalking?: Maybe<Scalars['Int']['output']>;
  totalVideosAboveThresholdViews?: Maybe<Scalars['Int']['output']>;
  totalVideosCreated?: Maybe<Scalars['Int']['output']>;
  totalVideosViewed?: Maybe<Scalars['Int']['output']>;
  totalViewsReceived?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<BannerType>;
  version: Scalars['Int']['output'];
};

export type UserNotAuthorizedError = Error & {
  __typename?: 'UserNotAuthorizedError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type UserNotFoundError = Error & {
  __typename?: 'UserNotFoundError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

/** Represents a non-exceptional case where a user is not logged in. This type is used to handle scenarios where login status is required but not met, without throwing an error. */
export type UserNotLoggedIn = {
  __typename?: 'UserNotLoggedIn';
  message?: Maybe<Scalars['String']['output']>;
};

export type UserNotLoggedInError = Error & {
  __typename?: 'UserNotLoggedInError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type UserPersonaInput = {
  complete: Scalars['Boolean']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  use_case_plan: Scalars['String']['input'];
  use_case_plan_persona: Scalars['String']['input'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UserProfileStream = {
  __typename?: 'UserProfileStream';
  followsId: Scalars['ID']['output'];
  user?: Maybe<RegularUser>;
};

export type UserProfileStreamConnection = {
  __typename?: 'UserProfileStreamConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<UserProfileStreamEdge>>>;
  /** Flattened list of UserProfileStream type */
  nodes?: Maybe<Array<Maybe<UserProfileStream>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type UserProfileStreamEdge = {
  __typename?: 'UserProfileStreamEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<UserProfileStream>;
};

/** A collection containing a video and its sort order for the user's selected workspace. */
export type UserProfileVideo = {
  __typename?: 'UserProfileVideo';
  sort?: Maybe<Scalars['Float']['output']>;
  video?: Maybe<RegularUserVideo>;
};

export type UserQueryPayload = {
  __typename?: 'UserQueryPayload';
  user?: Maybe<RegularUser>;
};

export type UserRecommendationType = {
  __typename?: 'UserRecommendationType';
  user?: Maybe<RegularUser>;
};

export type UserScreenshotAclEntry = {
  __typename?: 'UserScreenshotAclEntry';
  access: ScreenshotAccessLevel;
  user: RegularUser;
};

export type UserScreenshotSettings = {
  __typename?: 'UserScreenshotSettings';
  screenshotAutoTitle?: Maybe<Scalars['Boolean']['output']>;
};

export type UserScreenshotSettingsInput = {
  screenshotAutoTitle?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserSession = {
  __typename?: 'UserSession';
  expires_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  workspace_id: Scalars['ID']['output'];
};

/** Must be SCREAMING_SNAKE_CASE string literal of ALL_USER_STATUS_OBJ properties; e.g. "VERIFIED", not "verified" */
export enum UserStatusEnum {
  Banned = 'BANNED',
  Deactivated = 'DEACTIVATED',
  DeactivatedScim = 'DEACTIVATED_SCIM',
  NeedsEmailVerification = 'NEEDS_EMAIL_VERIFICATION',
  Verified = 'VERIFIED'
}

export type UserVideoAclEntry = VideoAclEntry & {
  __typename?: 'UserVideoAclEntry';
  access?: Maybe<VideoAccessLevel>;
  user?: Maybe<RegularUser>;
};

export type UserVideoSettings = {
  __typename?: 'UserVideoSettings';
  auto_chapters?: Maybe<Scalars['Boolean']['output']>;
  auto_cta?: Maybe<Scalars['Boolean']['output']>;
  auto_eovn?: Maybe<Scalars['Boolean']['output']>;
  auto_filler_word_removal?: Maybe<Scalars['Boolean']['output']>;
  auto_silence_removal?: Maybe<Scalars['Boolean']['output']>;
  auto_summary?: Maybe<Scalars['Boolean']['output']>;
  auto_tasks?: Maybe<Scalars['Boolean']['output']>;
  auto_title?: Maybe<Scalars['Boolean']['output']>;
  comments_email_enabled?: Maybe<Scalars['Boolean']['output']>;
  comments_enabled?: Maybe<Scalars['Boolean']['output']>;
  download_enabled?: Maybe<Scalars['Boolean']['output']>;
  email_gate_video_type?: Maybe<EmailGateVideoType>;
  loom_branded_player?: Maybe<Scalars['Boolean']['output']>;
  noise_suppression?: Maybe<Scalars['Boolean']['output']>;
  record_reply_enabled?: Maybe<Scalars['Boolean']['output']>;
  salesforce_engagement_tracking?: Maybe<Scalars['Boolean']['output']>;
  show_analytics_to_viewer?: Maybe<Scalars['Boolean']['output']>;
  show_transcript_to_viewer?: Maybe<Scalars['Boolean']['output']>;
  stylizedCaptions?: Maybe<Scalars['Boolean']['output']>;
  suggested_playback_rate?: Maybe<SuggestedPlaybackRate>;
  use_emojis?: Maybe<Scalars['Boolean']['output']>;
  use_gif?: Maybe<Scalars['Boolean']['output']>;
  viewerCaptionsOn?: Maybe<Scalars['Boolean']['output']>;
  viewers_can_weave_default?: Maybe<Scalars['Boolean']['output']>;
};

export type UserVideoSettingsInput = {
  auto_chapters?: InputMaybe<Scalars['Boolean']['input']>;
  auto_cta?: InputMaybe<Scalars['Boolean']['input']>;
  auto_eovn?: InputMaybe<Scalars['Boolean']['input']>;
  auto_filler_word_removal?: InputMaybe<Scalars['Boolean']['input']>;
  auto_silence_removal?: InputMaybe<Scalars['Boolean']['input']>;
  auto_summary?: InputMaybe<Scalars['Boolean']['input']>;
  auto_tasks?: InputMaybe<Scalars['Boolean']['input']>;
  auto_title?: InputMaybe<Scalars['Boolean']['input']>;
  comments_email_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  comments_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  download_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  email_gate_video_type?: InputMaybe<EmailGateVideoType>;
  loom_branded_player?: InputMaybe<Scalars['Boolean']['input']>;
  noise_suppression?: InputMaybe<Scalars['Boolean']['input']>;
  record_reply_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  salesforce_engagement_tracking?: InputMaybe<Scalars['Boolean']['input']>;
  show_analytics_to_viewer?: InputMaybe<Scalars['Boolean']['input']>;
  show_transcript_to_viewer?: InputMaybe<Scalars['Boolean']['input']>;
  stylizedCaptions?: InputMaybe<Scalars['Boolean']['input']>;
  suggested_playback_rate?: InputMaybe<SuggestedPlaybackRate>;
  use_emojis?: InputMaybe<Scalars['Boolean']['input']>;
  use_gif?: InputMaybe<Scalars['Boolean']['input']>;
  viewerCaptionsOn?: InputMaybe<Scalars['Boolean']['input']>;
  viewers_can_weave_default?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserVideoSettingsPayload = {
  __typename?: 'UserVideoSettingsPayload';
  video_settings?: Maybe<Scalars['JSON']['output']>;
};

export type UserWithWorkspacePlan = {
  __typename?: 'UserWithWorkspacePlan';
  membershipStatus?: Maybe<Scalars['String']['output']>;
  user?: Maybe<RegularUser>;
  workspacePlan?: Maybe<Scalars['String']['output']>;
};

export type UserWorkspaceMembershipsAdminResponse = {
  __typename?: 'UserWorkspaceMembershipsAdminResponse';
  memberships?: Maybe<Array<Maybe<OrganizationMember>>>;
  user?: Maybe<RegularUser>;
};

export type ViEvent = {
  __typename?: 'VIEvent';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ts?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ValidateEmailsCanBeInvitedToOrgResponse = GenericError | UserNotAuthorizedError | ValidatedEmailsForInviteResponse;

export type ValidatePromotionCodePayload = {
  __typename?: 'ValidatePromotionCodePayload';
  code?: Maybe<Scalars['String']['output']>;
  couponAmountOff?: Maybe<Scalars['String']['output']>;
  couponDuration?: Maybe<Scalars['String']['output']>;
  couponId?: Maybe<Scalars['String']['output']>;
  couponName?: Maybe<Scalars['String']['output']>;
  couponPercentOff?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type ValidatePromotionCodeResponse = GenericError | RateLimitReachedError | UserNotAuthorizedError | ValidatePromotionCodePayload;

export type ValidatedEmailsForInvite = {
  __typename?: 'ValidatedEmailsForInvite';
  email: Scalars['String']['output'];
  is_valid: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type ValidatedEmailsForInviteResponse = {
  __typename?: 'ValidatedEmailsForInviteResponse';
  response: Array<ValidatedEmailsForInvite>;
};

export type ValueUnion = BooleanObject | IntObject | JsonObject | StringObject;

export type VariableReplacement = {
  __typename?: 'VariableReplacement';
  originalWord?: Maybe<Scalars['String']['output']>;
  replacementWord?: Maybe<Scalars['String']['output']>;
};

export type VariableVideoProperties = {
  audioVariableIds: Array<Scalars['String']['input']>;
  recipientEmail?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyDnsDomain = {
  __typename?: 'VerifyDnsDomain';
  domain: Scalars['String']['output'];
  verifyDnsDomain: Scalars['Boolean']['output'];
};

export type VerifyDnsDomainResponse = GenericError | UserNotAuthorizedError | UserNotLoggedInError | VerifyDnsDomain;

export type VerifyUserEmailFromTokenResponse = GenericError | RegularUser;

export enum VideoAccessLevel {
  Read = 'read',
  Readwrite = 'readwrite'
}

export type VideoAclEntry = {
  access?: Maybe<VideoAccessLevel>;
};

export type VideoAclEntryPersonInput = {
  access: VideoAccessLevel;
  /** Invite the specified email address as a particular role. Only used if userEmail is provided. */
  inviteAsRole?: InputMaybe<OrgRole>;
  userEmail?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** The ACL entries for a video */
export type VideoAclEntrySet = {
  __typename?: 'VideoAclEntrySet';
  currentUserAccess?: Maybe<VideoAccessLevel>;
  /** The domain ACL entries, if they exist */
  domainEntries?: Maybe<Array<Maybe<DomainVideoAclEntry>>>;
  /** All of the ACL entries, including user entries, email entries, Space entries and workspace entries */
  entries?: Maybe<Array<Maybe<VideoAclEntry>>>;
  owner?: Maybe<RegularUser>;
  /** The user or email ACL entries */
  peopleEntries?: Maybe<Array<Maybe<VideoAclEntry>>>;
  /** The space ACL entries */
  spaceEntries?: Maybe<Array<Maybe<VideoAclEntry>>>;
  /** The workspace ACL entry, if one exists */
  workspaceEntry?: Maybe<WorkspaceVideoAclEntry>;
};

export type VideoAclEntrySpaceInput = {
  access: VideoAccessLevel;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum VideoAclEntryType {
  Space = 'space',
  User = 'user',
  UserEmail = 'userEmail'
}

export enum VideoActivitySource {
  Auto = 'auto',
  User = 'user'
}

export enum VideoActivityType {
  Comment = 'comment',
  Task = 'task'
}

export type VideoAlreadyMarkedCompleteError = Error & {
  __typename?: 'VideoAlreadyMarkedCompleteError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type VideoAttachment = {
  __typename?: 'VideoAttachment';
  id: Scalars['ID']['output'];
  service?: Maybe<VideoAttachmentService>;
  url: Scalars['String']['output'];
};

export type VideoAttachmentService = {
  __typename?: 'VideoAttachmentService';
  humanName: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type VideoBackground = CustomVideoBackground | HexVideoBackground | PresetVideoBackground;

export type VideoCanvasArrowOverlay = {
  __typename?: 'VideoCanvasArrowOverlay';
  arrowBaseOffsetX: Scalars['Float']['output'];
  arrowBaseOffsetY: Scalars['Float']['output'];
  arrowColor: Scalars['String']['output'];
  arrowHeadOffsetX: Scalars['Float']['output'];
  arrowHeadOffsetY: Scalars['Float']['output'];
  arrowShadowBlurRadius: Scalars['Float']['output'];
  arrowShadowColor: Scalars['String']['output'];
  arrowShadowOffsetX: Scalars['Float']['output'];
  arrowShadowOffsetY: Scalars['Float']['output'];
  arrowShadowOpacity: Scalars['Float']['output'];
  arrowThickness: Scalars['Float']['output'];
  arrowWingAngleDegrees: Scalars['Float']['output'];
  arrowWingLength: Scalars['Float']['output'];
  canvasOverlayId: Scalars['String']['output'];
  canvasType: Scalars['String']['output'];
  canvasZIndex: Scalars['Int']['output'];
  lowerMs: Scalars['Float']['output'];
  upperMs: Scalars['Float']['output'];
};

export type VideoCanvasArrowOverlayInput = {
  arrowBaseOffsetX: Scalars['Float']['input'];
  arrowBaseOffsetY: Scalars['Float']['input'];
  arrowColor: Scalars['String']['input'];
  arrowHeadOffsetX: Scalars['Float']['input'];
  arrowHeadOffsetY: Scalars['Float']['input'];
  arrowShadowBlurRadius: Scalars['Float']['input'];
  arrowShadowColor: Scalars['String']['input'];
  arrowShadowOffsetX: Scalars['Float']['input'];
  arrowShadowOffsetY: Scalars['Float']['input'];
  arrowShadowOpacity: Scalars['Float']['input'];
  arrowThickness: Scalars['Float']['input'];
  arrowWingAngleDegrees: Scalars['Float']['input'];
  arrowWingLength: Scalars['Float']['input'];
  canvasOverlayId: Scalars['String']['input'];
  canvasType: Scalars['String']['input'];
  canvasZIndex: Scalars['Int']['input'];
  lowerMs: Scalars['Float']['input'];
  upperMs: Scalars['Float']['input'];
};

export type VideoCanvasBoxOverlay = {
  __typename?: 'VideoCanvasBoxOverlay';
  boxBackgroundColor: Scalars['String']['output'];
  boxBorderColor: Scalars['String']['output'];
  boxBorderThickness: Scalars['Float']['output'];
  boxCornerRadius: Scalars['Float']['output'];
  boxOffsetX: Scalars['Float']['output'];
  boxOffsetY: Scalars['Float']['output'];
  boxShadowBlurRadius: Scalars['Float']['output'];
  boxShadowColor: Scalars['String']['output'];
  boxShadowOffsetX: Scalars['Float']['output'];
  boxShadowOffsetY: Scalars['Float']['output'];
  boxShadowOpacity: Scalars['Float']['output'];
  boxSizeX: Scalars['Float']['output'];
  boxSizeY: Scalars['Float']['output'];
  canvasOverlayId: Scalars['String']['output'];
  canvasType: Scalars['String']['output'];
  canvasZIndex: Scalars['Int']['output'];
  lowerMs: Scalars['Float']['output'];
  upperMs: Scalars['Float']['output'];
};

export type VideoCanvasBoxOverlayInput = {
  boxBackgroundColor: Scalars['String']['input'];
  boxBorderColor: Scalars['String']['input'];
  boxBorderThickness: Scalars['Float']['input'];
  boxCornerRadius: Scalars['Float']['input'];
  boxOffsetX: Scalars['Float']['input'];
  boxOffsetY: Scalars['Float']['input'];
  boxShadowBlurRadius: Scalars['Float']['input'];
  boxShadowColor: Scalars['String']['input'];
  boxShadowOffsetX: Scalars['Float']['input'];
  boxShadowOffsetY: Scalars['Float']['input'];
  boxShadowOpacity: Scalars['Float']['input'];
  boxSizeX: Scalars['Float']['input'];
  boxSizeY: Scalars['Float']['input'];
  canvasOverlayId: Scalars['String']['input'];
  canvasType: Scalars['String']['input'];
  canvasZIndex: Scalars['Int']['input'];
  lowerMs: Scalars['Float']['input'];
  upperMs: Scalars['Float']['input'];
};

export type VideoCanvasOverlays = {
  __typename?: 'VideoCanvasOverlays';
  boundedCanvasArrowOverlays?: Maybe<Array<Maybe<VideoCanvasArrowOverlay>>>;
  boundedCanvasBoxOverlays?: Maybe<Array<Maybe<VideoCanvasBoxOverlay>>>;
  boundedCanvasTextOverlays?: Maybe<Array<Maybe<VideoCanvasTextOverlay>>>;
};

export type VideoCanvasTextOverlay = {
  __typename?: 'VideoCanvasTextOverlay';
  boxBackgroundColor: Scalars['String']['output'];
  boxBackgroundCornerRadius: Scalars['Float']['output'];
  boxShadowBlurRadius: Scalars['Float']['output'];
  boxShadowColor: Scalars['String']['output'];
  boxShadowOffsetX: Scalars['Float']['output'];
  boxShadowOffsetY: Scalars['Float']['output'];
  boxShadowOpacity: Scalars['Float']['output'];
  canvasOverlayId: Scalars['String']['output'];
  canvasType: Scalars['String']['output'];
  canvasZIndex: Scalars['Int']['output'];
  desiredTextWidth?: Maybe<Scalars['Float']['output']>;
  lowerMs: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  textAlign: Scalars['String']['output'];
  textColor: Scalars['String']['output'];
  textFontFamily: Scalars['String']['output'];
  textFontSize: Scalars['Float']['output'];
  textLetterSpacing: Scalars['Float']['output'];
  textLineHeight: Scalars['Float']['output'];
  textOffsetX: Scalars['Float']['output'];
  textOffsetY: Scalars['Float']['output'];
  textPadding: Scalars['Float']['output'];
  textShadowBlurRadius: Scalars['Float']['output'];
  textShadowColor: Scalars['String']['output'];
  textShadowOffsetX: Scalars['Float']['output'];
  textShadowOffsetY: Scalars['Float']['output'];
  textShadowOpacity: Scalars['Float']['output'];
  textSizeX: Scalars['Float']['output'];
  textSizeY: Scalars['Float']['output'];
  upperMs: Scalars['Float']['output'];
};

export type VideoCanvasTextOverlayInput = {
  boxBackgroundColor: Scalars['String']['input'];
  boxBackgroundCornerRadius: Scalars['Float']['input'];
  boxShadowBlurRadius: Scalars['Float']['input'];
  boxShadowColor: Scalars['String']['input'];
  boxShadowOffsetX: Scalars['Float']['input'];
  boxShadowOffsetY: Scalars['Float']['input'];
  boxShadowOpacity: Scalars['Float']['input'];
  canvasOverlayId: Scalars['String']['input'];
  canvasType: Scalars['String']['input'];
  canvasZIndex: Scalars['Int']['input'];
  desiredTextWidth?: InputMaybe<Scalars['Float']['input']>;
  lowerMs: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  textAlign: Scalars['String']['input'];
  textColor: Scalars['String']['input'];
  textFontFamily: Scalars['String']['input'];
  textFontSize: Scalars['Float']['input'];
  textLetterSpacing: Scalars['Float']['input'];
  textLineHeight: Scalars['Float']['input'];
  textOffsetX: Scalars['Float']['input'];
  textOffsetY: Scalars['Float']['input'];
  textPadding: Scalars['Float']['input'];
  textShadowBlurRadius: Scalars['Float']['input'];
  textShadowColor: Scalars['String']['input'];
  textShadowOffsetX: Scalars['Float']['input'];
  textShadowOffsetY: Scalars['Float']['input'];
  textShadowOpacity: Scalars['Float']['input'];
  textSizeX: Scalars['Float']['input'];
  textSizeY: Scalars['Float']['input'];
  upperMs: Scalars['Float']['input'];
};

export type VideoChapters = {
  __typename?: 'VideoChapters';
  auto_chapter_status?: Maybe<AutoChapterStatusesType>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  edited_at?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  schema_version?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  video_id: Scalars['ID']['output'];
};

export type VideoClipBoundaryRange = {
  __typename?: 'VideoClipBoundaryRange';
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type VideoClipDetails = {
  __typename?: 'VideoClipDetails';
  boundaries?: Maybe<Array<Maybe<VideoClipBoundaryRange>>>;
  bounded_trim_ranges?: Maybe<Array<Maybe<VideoClipTrimRange>>>;
  createdAt: Scalars['Date']['output'];
  currentUserIsSourceOwner: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  hasBoundaries: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isSourceVideoExternalUpload: Scalars['Boolean']['output'];
  isSourceVideoMeetingRecording: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  playable_duration?: Maybe<Scalars['Float']['output']>;
  position: Scalars['Int']['output'];
  processing_information: ProcessingInformation;
  root_video_id: Scalars['ID']['output'];
  sourceOwner?: Maybe<RegularUser>;
  source_duration?: Maybe<Scalars['Float']['output']>;
  source_owner_id?: Maybe<Scalars['Int']['output']>;
  source_s3_id: Scalars['String']['output'];
  source_video_id?: Maybe<Scalars['String']['output']>;
  thumbnails: VideoThumbnailsSources;
  transcriptLanguage: Language;
  transcript_id?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Date']['output'];
  video_properties: VideoProperties;
  waveform_generation?: Maybe<VideoWaveformGenerationStatuses>;
  waveform_url?: Maybe<Scalars['String']['output']>;
};

export type VideoClipDetailsInput = {
  id: Scalars['ID']['input'];
  position: Scalars['Int']['input'];
  trim_ranges?: InputMaybe<Array<VideoTrimRangeInput>>;
};

export type VideoClipTrimRange = {
  __typename?: 'VideoClipTrimRange';
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type VideoCommentContentMentionedEntities = {
  __typename?: 'VideoCommentContentMentionedEntities';
  related_id: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
};

export type VideoCommentContentMentionedEntitiesInput = {
  related_id: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type VideoCommentContentMentions = {
  __typename?: 'VideoCommentContentMentions';
  mentions?: Maybe<Array<Maybe<VideoCommentContentMentionedEntities>>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type VideoCommentContentMentionsInput = {
  mentions?: InputMaybe<Array<InputMaybe<VideoCommentContentMentionedEntitiesInput>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type VideoDefaultThumbnailsSources = {
  __typename?: 'VideoDefaultThumbnailsSources';
  default: Scalars['String']['output'];
  static?: Maybe<Scalars['String']['output']>;
};

export type VideoDurationBoundsInput = {
  maxDurationMinutes: Scalars['Float']['input'];
  minDurationMinutes: Scalars['Float']['input'];
};

export type VideoFeatureFlags = {
  __typename?: 'VideoFeatureFlags';
  configHlsJsPlayer?: Maybe<ConfigHlsJsPlayer>;
  send_hls_playback_stats?: Maybe<Scalars['Boolean']['output']>;
};

export type VideoFromSearch = {
  __typename?: 'VideoFromSearch';
  createdAt?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  folder?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type VideoInfo = {
  __typename?: 'VideoInfo';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type VideoInfoObject = {
  recipientEmail: Scalars['String']['input'];
  replacementWord: Scalars['String']['input'];
  videoId: Scalars['ID']['input'];
};

/** Predominant language spoken in the video. */
export enum VideoLanguage {
  Af = 'af',
  Am = 'am',
  As = 'as',
  Ba = 'ba',
  Be = 'be',
  Bg = 'bg',
  Bn = 'bn',
  Bo = 'bo',
  Br = 'br',
  Bs = 'bs',
  Ca = 'ca',
  Cs = 'cs',
  Cy = 'cy',
  Da = 'da',
  De = 'de',
  El = 'el',
  En = 'en',
  Es = 'es',
  Et = 'et',
  Eu = 'eu',
  Fi = 'fi',
  Fo = 'fo',
  Fr = 'fr',
  Gl = 'gl',
  Gu = 'gu',
  Ha = 'ha',
  Haw = 'haw',
  Hi = 'hi',
  Hr = 'hr',
  Ht = 'ht',
  Hu = 'hu',
  Hy = 'hy',
  Id = 'id',
  Is = 'is',
  It = 'it',
  Ja = 'ja',
  Jw = 'jw',
  Ka = 'ka',
  Kk = 'kk',
  Km = 'km',
  Kn = 'kn',
  Ko = 'ko',
  La = 'la',
  Lb = 'lb',
  Ln = 'ln',
  Lo = 'lo',
  Lt = 'lt',
  Lv = 'lv',
  Mg = 'mg',
  Mi = 'mi',
  Mk = 'mk',
  Ml = 'ml',
  Mn = 'mn',
  Mr = 'mr',
  Ms = 'ms',
  Mt = 'mt',
  My = 'my',
  Ne = 'ne',
  Nl = 'nl',
  Nn = 'nn',
  No = 'no',
  Oc = 'oc',
  Pa = 'pa',
  Pl = 'pl',
  Ps = 'ps',
  Pt = 'pt',
  Ro = 'ro',
  Ru = 'ru',
  Sa = 'sa',
  Sd = 'sd',
  Si = 'si',
  Sk = 'sk',
  Sl = 'sl',
  Sn = 'sn',
  So = 'so',
  Sq = 'sq',
  Sr = 'sr',
  Su = 'su',
  Sv = 'sv',
  Sw = 'sw',
  Ta = 'ta',
  Te = 'te',
  Tg = 'tg',
  Th = 'th',
  Tk = 'tk',
  Tl = 'tl',
  Tr = 'tr',
  Tt = 'tt',
  Uk = 'uk',
  Unknown = 'unknown',
  Uz = 'uz',
  Vi = 'vi',
  Yi = 'yi',
  Yo = 'yo',
  Zh = 'zh'
}

export type VideoMeeting = {
  __typename?: 'VideoMeeting';
  code: Scalars['String']['output'];
  guid: Scalars['ID']['output'];
  passcode?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  workspaceGuid: Scalars['ID']['output'];
};

export type VideoNotFoundError = Error & {
  __typename?: 'VideoNotFoundError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type VideoNudge = {
  __typename?: 'VideoNudge';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  nudge_type: NudgeType;
  prompt_version: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type VideoPartUploadedPayload = {
  __typename?: 'VideoPartUploadedPayload';
  filename?: Maybe<Scalars['String']['output']>;
};

export type VideoPartUploadedResponse = GenericError | UserNotAuthorizedError | VideoPartUploadedPayload;

/** A sentinel object telling a client that a video is not accessible to the current user, due to a lack of a valid video password. */
export type VideoPasswordMissingOrIncorrect = {
  __typename?: 'VideoPasswordMissingOrIncorrect';
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type VideoPayloadSources = {
  __typename?: 'VideoPayloadSources';
  sourcePlayHls?: Maybe<Scalars['String']['output']>;
  sourcePlayMp4?: Maybe<Scalars['String']['output']>;
  sourcePlayTrimHls?: Maybe<Scalars['String']['output']>;
  sourcePlayTrimMp4?: Maybe<Scalars['String']['output']>;
  sourcePlayWebm?: Maybe<Scalars['String']['output']>;
  sourcePlayWebmStreamed?: Maybe<Scalars['String']['output']>;
};

export enum VideoPersonalizationType {
  Audio = 'Audio',
  Title = 'Title'
}

export type VideoPlayIntervalInput = {
  buckets: Array<Scalars['Boolean']['input']>;
  videoId: Scalars['ID']['input'];
};

export type VideoPlayIntervalMutationRes = {
  __typename?: 'VideoPlayIntervalMutationRes';
  buckets: Array<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
};

export type VideoPlayIntervalRes = GenericError | VideoPlayIntervalMutationRes;

export type VideoPlaySegmentInput = {
  end: Scalars['Int']['input'];
  sessionId: Scalars['String']['input'];
  sid?: InputMaybe<Scalars['ID']['input']>;
  speed: Scalars['Float']['input'];
  start: Scalars['Int']['input'];
  videoId: Scalars['ID']['input'];
};

export type VideoPlaySegmentMutationRes = {
  __typename?: 'VideoPlaySegmentMutationRes';
  id: Scalars['ID']['output'];
};

export type VideoPlaySegmentRes = GenericError | VideoPlaySegmentMutationRes;

export enum VideoPrivacyProperty {
  Owner = 'owner',
  Public = 'public',
  Workspace = 'workspace'
}

export enum VideoPrivacyStatus {
  Owner = 'owner',
  Public = 'public',
  Workspace = 'workspace'
}

export type VideoProperties = {
  __typename?: 'VideoProperties';
  avgBitRate?: Maybe<Scalars['Int']['output']>;
  browser?: Maybe<Scalars['String']['output']>;
  bucketVersion?: Maybe<Scalars['String']['output']>;
  camera_enabled?: Maybe<Scalars['Boolean']['output']>;
  client?: Maybe<Scalars['String']['output']>;
  client_version?: Maybe<Scalars['String']['output']>;
  countdown?: Maybe<Scalars['Boolean']['output']>;
  doNativeHls?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Use source_duration (without trims) or playable_duration (with trims) on parent (ex. RegularUserVideo) instead. */
  duration?: Maybe<Scalars['Int']['output']>;
  durationMs?: Maybe<Scalars['Int']['output']>;
  externalUpload?: Maybe<Scalars['Boolean']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  fromShortcut?: Maybe<Scalars['Boolean']['output']>;
  from_url?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  ingestion_type?: Maybe<Scalars['String']['output']>;
  ip?: Maybe<Scalars['String']['output']>;
  isVideoReply?: Maybe<Scalars['Boolean']['output']>;
  liveRewindTrimmedSections?: Maybe<Scalars['JSON']['output']>;
  mediaMetadataRotation?: Maybe<Scalars['Int']['output']>;
  microphone_enabled?: Maybe<Scalars['Boolean']['output']>;
  num_hls_parts?: Maybe<Scalars['Int']['output']>;
  os?: Maybe<Scalars['String']['output']>;
  os_version?: Maybe<Scalars['String']['output']>;
  parentVideoId?: Maybe<Scalars['String']['output']>;
  recordingClient?: Maybe<RecordingClient>;
  recording_type?: Maybe<RecordingType>;
  recording_version?: Maybe<RecordingVersion>;
  resolution?: Maybe<Scalars['String']['output']>;
  restartCount?: Maybe<Scalars['Int']['output']>;
  screen_height?: Maybe<Scalars['Int']['output']>;
  screen_type?: Maybe<Scalars['String']['output']>;
  screen_width?: Maybe<Scalars['Int']['output']>;
  sdkPartnerId?: Maybe<Scalars['Int']['output']>;
  sdkPartnerIdv2?: Maybe<Scalars['ID']['output']>;
  tab_audio?: Maybe<Scalars['Boolean']['output']>;
  thumbnail_is_png?: Maybe<Scalars['String']['output']>;
  time_since_app_launch?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use playable_duration on parent (ex. RegularUserVideo) instead. */
  trim_duration?: Maybe<Scalars['Float']['output']>;
  ui_location?: Maybe<UiLocation>;
  user_id?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type VideoProperty = {
  __typename?: 'VideoProperty';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['BasicScalar']['output']>;
};

export enum VideoPropertyType {
  AffirmationAiStatus = 'affirmation_ai_status',
  AutoChaptersStatus = 'auto_chapters_status',
  AutoSummaryStatus = 'auto_summary_status',
  AutoTasksStatus = 'auto_tasks_status',
  AutoTitleStatus = 'auto_title_status',
  AutoTrimSilenceAndFillerWords = 'auto_trim_silence_and_filler_words',
  BooleanValue = 'booleanValue',
  Chapters = 'chapters',
  DismissWorkflowSneekpeek = 'dismiss_workflow_sneekpeek',
  EmailGateVideoType = 'email_gate_video_type',
  ExpirationDate = 'expiration_date',
  GenVideoDraftId = 'gen_video_draft_id',
  InquiryAiStatus = 'inquiry_ai_status',
  JsonValue = 'jsonValue',
  LoomCategory = 'loom_category',
  Meeting = 'meeting',
  NumberValue = 'numberValue',
  PromptOverrides = 'prompt_overrides',
  RecordingDocumentationType = 'recording_documentation_type',
  RewatchImport = 'rewatch_import',
  SalesforceEngagementTracking = 'salesforce_engagement_tracking',
  StringValue = 'stringValue',
  StylizedCaptions = 'stylized_captions',
  SummaryPromptOverride = 'summary_prompt_override',
  TranscriptionLanguage = 'transcription_language',
  VariablesRecipientEmail = 'variablesRecipientEmail',
  VideoVariables = 'video_variables',
  ViewerCaptionsOn = 'viewer_captions_on'
}

export type VideoReplacementInfo = {
  __typename?: 'VideoReplacementInfo';
  type?: Maybe<Scalars['String']['output']>;
};

export type VideoSearchResult = {
  __typename?: 'VideoSearchResult';
  /** The fields of the video that the query matched on. */
  matchedFields?: Maybe<Array<Maybe<VideoSearchResultMatchedField>>>;
  video?: Maybe<RegularUserVideo>;
};

export type VideoSearchResultConnection = {
  __typename?: 'VideoSearchResultConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<VideoSearchResultEdge>>>;
  /** Flattened list of VideoSearchResult type */
  nodes?: Maybe<Array<Maybe<VideoSearchResult>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type VideoSearchResultEdge = {
  __typename?: 'VideoSearchResultEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<VideoSearchResult>;
};

/** A field on the indexed video that matched the search query. This can be used for providing context for why a search query returned a particular result. */
export type VideoSearchResultMatchedField = {
  __typename?: 'VideoSearchResultMatchedField';
  /** An array of chunks containing the matched and unmatched text of the field */
  chunks?: Maybe<Array<Maybe<VideoSearchResultMatchedFieldChunk>>>;
  /** The name of the attribute that the query matched on. */
  fieldName?: Maybe<Scalars['String']['output']>;
};

export type VideoSearchResultMatchedFieldChunk = {
  __typename?: 'VideoSearchResultMatchedFieldChunk';
  /** Whether or not this chunk was part of the query match */
  match?: Maybe<Scalars['Boolean']['output']>;
  /** The text in this chunk */
  text?: Maybe<Scalars['String']['output']>;
};

export type VideoSettingsInput = {
  comments_email_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  comments_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  download_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  email_gate_video_type?: InputMaybe<Scalars['String']['input']>;
  loom_branded_player?: InputMaybe<Scalars['Boolean']['input']>;
  noise_cancellation_type?: InputMaybe<Scalars['Boolean']['input']>;
  processing_information?: InputMaybe<ProcessingInformationInput>;
  record_reply_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  salesforce_engagement_tracking?: InputMaybe<Scalars['Boolean']['input']>;
  show_analytics_to_viewer?: InputMaybe<Scalars['Boolean']['input']>;
  show_transcript_to_viewer?: InputMaybe<Scalars['Boolean']['input']>;
  stylizedCaptions?: InputMaybe<Scalars['Boolean']['input']>;
  suggested_playback_rate?: InputMaybe<SuggestedPlaybackRate>;
  use_emojis?: InputMaybe<Scalars['Boolean']['input']>;
  use_gif?: InputMaybe<Scalars['Boolean']['input']>;
  viewerCaptionsOn?: InputMaybe<Scalars['Boolean']['input']>;
  viewers_can_weave?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoSettingsToUpdate = {
  email_gate_video_type?: InputMaybe<Scalars['String']['input']>;
  salesforce_engagement_tracking?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoSource = {
  __typename?: 'VideoSource';
  cookieExpireTime?: Maybe<Scalars['Date']['output']>;
  cookies?: Maybe<VideoSourceCookies>;
  url?: Maybe<Scalars['String']['output']>;
};

export type VideoSourceCookies = {
  __typename?: 'VideoSourceCookies';
  CloudFrontKeyPairId?: Maybe<Scalars['String']['output']>;
  CloudFrontPolicy?: Maybe<Scalars['String']['output']>;
  CloudFrontSignature?: Maybe<Scalars['String']['output']>;
};

export type VideoSourceResponse = EntityNotFoundError | GenericError | InputValidationError | UserNotAuthorizedError | VideoNotFoundError | VideoSource;

export type VideoSuggestionPayload = {
  __typename?: 'VideoSuggestionPayload';
  id: Scalars['String']['output'];
  length: Scalars['Int']['output'];
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type VideoTask = {
  __typename?: 'VideoTask';
  activity_type?: Maybe<VideoActivityType>;
  anon_user_id?: Maybe<Scalars['String']['output']>;
  approved_at?: Maybe<Scalars['Date']['output']>;
  avatar?: Maybe<Avatar>;
  children_comments: Array<PublicVideoComment>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  date_edited?: Maybe<Scalars['Date']['output']>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  edited: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  mention_object?: Maybe<VideoCommentContentMentions>;
  owner?: Maybe<RegularUser>;
  resolved_at?: Maybe<Scalars['Date']['output']>;
  responses: Array<ActivityResponse>;
  source: VideoActivitySource;
  textContent?: Maybe<Scalars['String']['output']>;
  time_stamp: Scalars['Int']['output'];
  user_id?: Maybe<Scalars['Int']['output']>;
  video: RegularUserVideo;
  video_id: Scalars['String']['output'];
};


export type VideoTaskChildren_CommentsArgs = {
  useMaster?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideoTaskContentArgs = {
  withMentionMarkups?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideoTaskResponsesArgs = {
  useMaster?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideoTaskTextContentArgs = {
  withMentionMarkups?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoTextReplacement = {
  __typename?: 'VideoTextReplacement';
  audioGenerationStatus: AudioGenerationStatus;
  clipId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  selectionLowerMs: Scalars['Float']['output'];
  selectionReplacementText: Scalars['String']['output'];
  selectionUpperMs: Scalars['Float']['output'];
  videoId: Scalars['ID']['output'];
};

export type VideoTextReplacementsUpdatedPayload = {
  __typename?: 'VideoTextReplacementsUpdatedPayload';
  video: RegularUserVideo;
};

export type VideoThumbnailsSources = {
  __typename?: 'VideoThumbnailsSources';
  animatedPreview?: Maybe<Scalars['String']['output']>;
  default?: Maybe<Scalars['String']['output']>;
  default4X3?: Maybe<Scalars['String']['output']>;
  defaultGif?: Maybe<Scalars['String']['output']>;
  defaultGifPlay?: Maybe<Scalars['String']['output']>;
  defaultPlay?: Maybe<Scalars['String']['output']>;
  full?: Maybe<Scalars['String']['output']>;
  fullPlay?: Maybe<Scalars['String']['output']>;
  ogFull?: Maybe<Scalars['String']['output']>;
};

export type VideoTranscodedUrlUpdatedPayload = {
  __typename?: 'VideoTranscodedUrlUpdatedPayload';
  videoId: Scalars['String']['output'];
  videoSource?: Maybe<VideoSource>;
};

export type VideoTranscriptDetails = {
  __typename?: 'VideoTranscriptDetails';
  captionTranslationErrorFallback?: Maybe<Scalars['Boolean']['output']>;
  captionsInOriginalLanguage?: Maybe<Scalars['Boolean']['output']>;
  captionsTranslatedLanguage?: Maybe<Scalars['String']['output']>;
  captionsTranslationInProgress?: Maybe<Scalars['Boolean']['output']>;
  captions_source_url?: Maybe<Scalars['String']['output']>;
  captions_url?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  /** @deprecated This feature has been retired */
  filler_word_removal: FillerWordRemoval;
  filler_words: Scalars['JSON']['output'];
  id: Scalars['Int']['output'];
  idv2: Scalars['ID']['output'];
  language?: Maybe<Language>;
  processing_end_time?: Maybe<Scalars['Date']['output']>;
  processing_service: ProcessingServices;
  processing_start_time?: Maybe<Scalars['Date']['output']>;
  s3_id: Scalars['String']['output'];
  source_url?: Maybe<Scalars['String']['output']>;
  transcript_url?: Maybe<Scalars['String']['output']>;
  transcription_status: TranscriptionStatuses;
  updatedAt: Scalars['Date']['output'];
  version: Scalars['Int']['output'];
  video_id: Scalars['ID']['output'];
};

export type VideoTranscriptResponse = GenericError | VideoTranscriptDetails;

export type VideoTrimProgress = {
  __typename?: 'VideoTrimProgress';
  progress?: Maybe<Scalars['Float']['output']>;
  transcodedUrl?: Maybe<Scalars['String']['output']>;
  videoId?: Maybe<Scalars['ID']['output']>;
};

export type VideoTrimRange = {
  __typename?: 'VideoTrimRange';
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type VideoTrimRangeInput = {
  from: Scalars['Float']['input'];
  to: Scalars['Float']['input'];
};

export type VideoUploadCredentials = {
  __typename?: 'VideoUploadCredentials';
  AccessKeyId: Scalars['String']['output'];
  Bucket: Scalars['String']['output'];
  Path: Scalars['String']['output'];
  Region: Scalars['String']['output'];
  SecretAccessKey: Scalars['String']['output'];
  SessionToken: Scalars['String']['output'];
};

/** Video upload progress information */
export type VideoUploadProgress = {
  __typename?: 'VideoUploadProgress';
  /** Whether the upload process is complete */
  done?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the video has been transcoded */
  isTranscoded?: Maybe<Scalars['Boolean']['output']>;
  /** Whether no upload is needed */
  noUpload?: Maybe<Scalars['Boolean']['output']>;
  /** Total number of packets expected */
  packetsTotal?: Maybe<Scalars['Float']['output']>;
  /** Upload progress percentage (0-100) */
  progress: Scalars['Float']['output'];
  /** Thumbnail URL if available */
  thumbUrl?: Maybe<Scalars['String']['output']>;
  /** ID of the video being uploaded */
  videoId: Scalars['ID']['output'];
  /** Message about the video upload status */
  videoUploadMessage?: Maybe<Scalars['String']['output']>;
  /** Whether the video upload is valid */
  videoUploadValid?: Maybe<Scalars['Boolean']['output']>;
};

export type VideoViewsGraphInsights = {
  __typename?: 'VideoViewsGraphInsights';
  videosCreatedDataPoints?: Maybe<Array<Maybe<DataPoint>>>;
  videosCreatedTimestampType?: Maybe<TimestampType>;
  viewsReceivedDataPoints?: Maybe<Array<Maybe<DataPoint>>>;
  viewsReceivedTimestampType?: Maybe<TimestampType>;
};

export enum VideoVisibilityProperty {
  Owner = 'owner',
  Public = 'public',
  Workspace = 'workspace'
}

export enum VideoVisibilityType {
  Owner = 'owner',
  Public = 'public',
  Workspace = 'workspace'
}

export type VideoWaveformDetails = {
  __typename?: 'VideoWaveformDetails';
  source_url?: Maybe<Scalars['String']['output']>;
  status?: Maybe<WaveformGenerationStatus>;
};

export enum VideoWaveformGenerationStatuses {
  Failure = 'failure',
  InProgress = 'inProgress',
  Success = 'success'
}

export type VideoWithEditableTranscriptOrClips = {
  __typename?: 'VideoWithEditableTranscriptOrClips';
  clips?: Maybe<Array<ClipWithEditableTranscript>>;
  error?: Maybe<Scalars['String']['output']>;
  mediaS3Id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  recordingVersion?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['String']['output']>;
  videoId: Scalars['ID']['output'];
  videoTranscript?: Maybe<AdminEditableTranscript>;
};

export type VideoWithMediaTranscriptOrClips = {
  __typename?: 'VideoWithMediaTranscriptOrClips';
  clips?: Maybe<Array<ClipWithMediaTranscript>>;
  error?: Maybe<Scalars['String']['output']>;
  mediaS3Id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  recordingVersion?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['String']['output']>;
  videoId: Scalars['ID']['output'];
  videoTranscript?: Maybe<AdminMediaTranscript>;
};

export type VideoWithViewableTranscriptOrClips = {
  __typename?: 'VideoWithViewableTranscriptOrClips';
  clips?: Maybe<Array<ClipWithViewableTranscript>>;
  error?: Maybe<Scalars['String']['output']>;
  mediaS3Id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  recordingVersion?: Maybe<Scalars['String']['output']>;
  revision?: Maybe<Scalars['String']['output']>;
  videoId: Scalars['ID']['output'];
  videoTranscript?: Maybe<AdminViewableTranscript>;
};

export type ViewCount = {
  __typename?: 'ViewCount';
  distinct: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ViewEvent = {
  anonName?: InputMaybe<Scalars['String']['input']>;
  appSource?: InputMaybe<AppSourceType>;
  embeddedOn?: InputMaybe<Scalars['String']['input']>;
  initialPlaybackRate?: InputMaybe<Scalars['String']['input']>;
  parentLocation?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  segmentAnonId?: InputMaybe<Scalars['String']['input']>;
  sessionId: Scalars['String']['input'];
  shareLoadId?: InputMaybe<Scalars['String']['input']>;
  speed?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['ID']['input']>;
  videoLoadId?: InputMaybe<Scalars['String']['input']>;
  viewerSessionId?: InputMaybe<Scalars['String']['input']>;
};

export type ViewableMonologue = {
  __typename?: 'ViewableMonologue';
  clipId?: Maybe<Scalars['ID']['output']>;
  elements: Array<ViewableTranscriptElement>;
  speaker?: Maybe<Speaker>;
};

export type ViewableTextElement = {
  __typename?: 'ViewableTextElement';
  endMs: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mediaEndMs: Scalars['Int']['output'];
  mediaStartMs: Scalars['Int']['output'];
  startMs: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ViewableTranscriptElement = TranscriptPunctElement | ViewableTextElement;

export type VisitSpaceData = {
  __typename?: 'VisitSpaceData';
  spaceId?: Maybe<Scalars['String']['output']>;
  spaceName?: Maybe<Scalars['String']['output']>;
  videosInfo?: Maybe<Array<VideoInfo>>;
};

export type Warning = {
  message: Scalars['String']['output'];
};

export type WatchLaterListVideoCount = {
  __typename?: 'WatchLaterListVideoCount';
  count?: Maybe<Scalars['Int']['output']>;
  unwatchedCount?: Maybe<Scalars['Int']['output']>;
};

export type WaveformDataChangedResponse = {
  __typename?: 'WaveformDataChangedResponse';
  waveformData?: Maybe<Array<ClipWaveformData>>;
};

export enum WaveformGenerationStatus {
  Failure = 'failure',
  InProgress = 'inProgress',
  Success = 'success'
}

export type WeaveCreatorDisabledStitching = Error & {
  __typename?: 'WeaveCreatorDisabledStitching';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type WeavePasswordProtectedVideoError = Error & {
  __typename?: 'WeavePasswordProtectedVideoError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export type WebFcmDataInputType = {
  auth: Scalars['String']['input'];
  endpoint: Scalars['String']['input'];
  p256dh: Scalars['String']['input'];
};

export type WebFcmDataType = {
  __typename?: 'WebFcmDataType';
  auth?: Maybe<Scalars['String']['output']>;
  endpoint?: Maybe<Scalars['String']['output']>;
  p256dh?: Maybe<Scalars['String']['output']>;
};

export enum WordType {
  Punct = 'punct',
  Silence = 'silence',
  Text = 'text'
}

export type WordlevelTimestampTranscript = {
  __typename?: 'WordlevelTimestampTranscript';
  phrases: Array<TimestampedPhrase>;
};

export enum WorkflowTemplateType {
  BugReport = 'BUG_REPORT',
  Message = 'MESSAGE',
  CategorizationFactuality = 'categorization_factuality',
  Chat = 'chat',
  CodeDocs = 'code_docs',
  Email = 'email',
  IssueGeneration = 'issue_generation',
  Jira = 'jira',
  Linear = 'linear',
  LoomCategorization = 'loom_categorization',
  PrDescription = 'pr_description',
  QaSteps = 'qa_steps',
  Sop = 'sop',
  StepByStep = 'step_by_step',
  Summary = 'summary'
}

export enum WorkspaceAtlassianProvisioningStatus {
  Active = 'active',
  Destroyed = 'destroyed',
  Suspended = 'suspended'
}

export type WorkspaceAuditLog = {
  __typename?: 'WorkspaceAuditLog';
  action: WorkspaceAuditLogAction;
  createdAt: Scalars['Date']['output'];
  data?: Maybe<Scalars['BasicScalar']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  user?: Maybe<RegularUser>;
  user_id?: Maybe<Scalars['ID']['output']>;
  workspace_id: Scalars['ID']['output'];
};

export enum WorkspaceAuditLogAction {
  ActionMembershipDsyncRoleChange = 'action_membership_dsync_role_change',
  ActionMembershipScimRoleChange = 'action_membership_scim_role_change',
  ActionScheduleSubscriptionPause = 'action_schedule_subscription_pause',
  ActionSpaceCreated = 'action_space_created',
  ActionSpaceDeleted = 'action_space_deleted',
  ActionSpaceGroupsUpdated = 'action_space_groups_updated',
  ActionSpaceMembersAdded = 'action_space_members_added',
  ActionSpaceMembersRemoved = 'action_space_members_removed',
  ActionSpacePrivacyUpdated = 'action_space_privacy_updated',
  ActionSpaceUpdatedWithDataAgeLimit = 'action_space_updated_with_data_age_limit',
  ActionSpaceVideoDeleted = 'action_space_video_deleted',
  ActionWorkspaceAccountReinstated = 'action_workspace_account_reinstated',
  ActionWorkspaceAccountSuspended = 'action_workspace_account_suspended',
  ActionWorkspaceAdhocBillAdjustment = 'action_workspace_adhoc_bill_adjustment',
  ActionWorkspaceAdhocBillCredit = 'action_workspace_adhoc_bill_credit',
  ActionWorkspaceBillableAdded = 'action_workspace_billable_added',
  ActionWorkspaceBillableDeleted = 'action_workspace_billable_deleted',
  ActionWorkspaceBillableRoleChange = 'action_workspace_billable_role_change',
  ActionWorkspaceBillableStatusChange = 'action_workspace_billable_status_change',
  ActionWorkspaceDunningEmailSent = 'action_workspace_dunning_email_sent',
  ActionWorkspaceInviteLinkCreated = 'action_workspace_invite_link_created',
  ActionWorkspaceInviteLinkDisabled = 'action_workspace_invite_link_disabled',
  ActionWorkspaceInviteLinkJoin = 'action_workspace_invite_link_join',
  ActionWorkspaceInviteLinkToggled = 'action_workspace_invite_link_toggled',
  ActionWorkspaceSubscriptionChanged = 'action_workspace_subscription_changed',
  ActionWorkspaceSubscriptionCreated = 'action_workspace_subscription_created',
  ActionWorkspaceSubscriptionDeleted = 'action_workspace_subscription_deleted',
  ActionWorkspaceUpdateUserRole = 'action_workspace_update_user_role',
  ActionWorkspaceVideoVisibilityChange = 'action_workspace_video_visibility_change',
  ActionWorkspaceZoomConnectChange = 'action_workspace_zoom_connect_change',
  UserLogin = 'user_login',
  UserStatusUpdate = 'user_status_update',
  VideoArchived = 'video_archived',
  VideoComment = 'video_comment',
  VideoCreated = 'video_created',
  VideoDeleted = 'video_deleted',
  VideoDirectShare = 'video_direct_share',
  VideoDownloaded = 'video_downloaded',
  VideoDuplicated = 'video_duplicated',
  VideoExpiredLinkAccessUpdated = 'video_expired_link_access_updated',
  VideoLinkExpirationChange = 'video_link_expiration_change',
  VideoPasswordChange = 'video_password_change',
  VideoPrivacyChange = 'video_privacy_change',
  VideoReaction = 'video_reaction',
  VideoRemovedDirectShare = 'video_removed_direct_share',
  VideoSearchIndexingChange = 'video_search_indexing_change',
  VideoUnarchived = 'video_unarchived',
  VideoUpdated = 'video_updated',
  VideoViewed = 'video_viewed',
  WorkspaceAutoJoin = 'workspace_auto_join',
  WorkspaceContentPrivacySettingChange = 'workspace_content_privacy_setting_change',
  WorkspaceDataRetentionChange = 'workspace_data_retention_change',
  WorkspaceDataRetentionDeletion = 'workspace_data_retention_deletion',
  WorkspaceDefaultPrivacyChange = 'workspace_default_privacy_change',
  WorkspaceDomainPrivacySettingChange = 'workspace_domain_privacy_setting_change',
  WorkspaceDomainSettingsChange = 'workspace_domain_settings_change',
  WorkspaceDomainVerificationChange = 'workspace_domain_verification_change',
  WorkspaceGoogleIntegrationChange = 'workspace_google_integration_change',
  WorkspaceGroupChange = 'workspace_group_change',
  WorkspaceGroupMemberChange = 'workspace_group_member_change',
  WorkspaceJoinRequestAcknowledgement = 'workspace_join_request_acknowledgement',
  WorkspaceLinkExpirationChange = 'workspace_link_expiration_change',
  WorkspaceSalesSupportTypeChange = 'workspace_sales_support_type_change',
  WorkspaceScimChange = 'workspace_scim_change',
  WorkspaceScimUserDeactivation = 'workspace_scim_user_deactivation',
  WorkspaceSettingChange = 'workspace_setting_change',
  WorkspaceSlackIntegrationChange = 'workspace_slack_integration_change',
  WorkspaceSsoChange = 'workspace_sso_change',
  WorkspaceStatusChange = 'workspace_status_change',
  WorkspaceUserDeletion = 'workspace_user_deletion',
  WorkspaceUserDeprovisioningSettingChange = 'workspace_user_deprovisioning_setting_change',
  WorkspaceUserTransferContent = 'workspace_user_transfer_content'
}

export type WorkspaceContact = {
  __typename?: 'WorkspaceContact';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  loomUserId?: Maybe<Scalars['ID']['output']>;
  source: WorkspaceContactSource;
  type: WorkspaceContactType;
  value: Scalars['String']['output'];
  workspaceId: Scalars['ID']['output'];
};

export enum WorkspaceContactSource {
  Google = 'google',
  Slack = 'slack',
  Zoom = 'zoom'
}

export enum WorkspaceContactType {
  Email = 'email',
  Handle = 'handle'
}

export type WorkspaceDeletionToken = {
  __typename?: 'WorkspaceDeletionToken';
  activationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  expiryEventReceivedAt?: Maybe<Scalars['String']['output']>;
  restoredAt?: Maybe<Scalars['String']['output']>;
  siteId?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  workspaceId?: Maybe<Scalars['Int']['output']>;
};

export type WorkspaceDomain = {
  __typename?: 'WorkspaceDomain';
  domain: Scalars['String']['output'];
  status: Scalars['String']['output'];
  verificationType?: Maybe<Scalars['String']['output']>;
};

export type WorkspaceEmailAuditLog = {
  __typename?: 'WorkspaceEmailAuditLog';
  action: WorkspaceEmailAuditLogAction;
  createdAt: Scalars['Date']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  user_id?: Maybe<Scalars['ID']['output']>;
  workspace_id: Scalars['ID']['output'];
};

export enum WorkspaceEmailAuditLogAction {
  ActionMembershipDsyncRoleChange = 'action_membership_dsync_role_change',
  ActionMembershipScimRoleChange = 'action_membership_scim_role_change',
  ActionScheduleSubscriptionPause = 'action_schedule_subscription_pause',
  ActionSpaceCreated = 'action_space_created',
  ActionSpaceDeleted = 'action_space_deleted',
  ActionSpaceGroupsUpdated = 'action_space_groups_updated',
  ActionSpaceMembersAdded = 'action_space_members_added',
  ActionSpaceMembersRemoved = 'action_space_members_removed',
  ActionSpacePrivacyUpdated = 'action_space_privacy_updated',
  ActionSpaceUpdatedWithDataAgeLimit = 'action_space_updated_with_data_age_limit',
  ActionSpaceVideoDeleted = 'action_space_video_deleted',
  ActionWorkspaceAccountReinstated = 'action_workspace_account_reinstated',
  ActionWorkspaceAccountSuspended = 'action_workspace_account_suspended',
  ActionWorkspaceAdhocBillAdjustment = 'action_workspace_adhoc_bill_adjustment',
  ActionWorkspaceAdhocBillCredit = 'action_workspace_adhoc_bill_credit',
  ActionWorkspaceBillableAdded = 'action_workspace_billable_added',
  ActionWorkspaceBillableDeleted = 'action_workspace_billable_deleted',
  ActionWorkspaceBillableRoleChange = 'action_workspace_billable_role_change',
  ActionWorkspaceBillableStatusChange = 'action_workspace_billable_status_change',
  ActionWorkspaceDunningEmailSent = 'action_workspace_dunning_email_sent',
  ActionWorkspaceInviteLinkCreated = 'action_workspace_invite_link_created',
  ActionWorkspaceInviteLinkDisabled = 'action_workspace_invite_link_disabled',
  ActionWorkspaceInviteLinkJoin = 'action_workspace_invite_link_join',
  ActionWorkspaceInviteLinkToggled = 'action_workspace_invite_link_toggled',
  ActionWorkspaceSubscriptionChanged = 'action_workspace_subscription_changed',
  ActionWorkspaceSubscriptionCreated = 'action_workspace_subscription_created',
  ActionWorkspaceSubscriptionDeleted = 'action_workspace_subscription_deleted',
  ActionWorkspaceUpdateUserRole = 'action_workspace_update_user_role',
  ActionWorkspaceVideoVisibilityChange = 'action_workspace_video_visibility_change',
  ActionWorkspaceZoomConnectChange = 'action_workspace_zoom_connect_change',
  UserLogin = 'user_login',
  UserStatusUpdate = 'user_status_update',
  VideoArchived = 'video_archived',
  VideoComment = 'video_comment',
  VideoCreated = 'video_created',
  VideoDeleted = 'video_deleted',
  VideoDirectShare = 'video_direct_share',
  VideoDownloaded = 'video_downloaded',
  VideoDuplicated = 'video_duplicated',
  VideoExpiredLinkAccessUpdated = 'video_expired_link_access_updated',
  VideoLinkExpirationChange = 'video_link_expiration_change',
  VideoPasswordChange = 'video_password_change',
  VideoPrivacyChange = 'video_privacy_change',
  VideoReaction = 'video_reaction',
  VideoRemovedDirectShare = 'video_removed_direct_share',
  VideoSearchIndexingChange = 'video_search_indexing_change',
  VideoUnarchived = 'video_unarchived',
  VideoUpdated = 'video_updated',
  VideoViewed = 'video_viewed',
  WorkspaceAutoJoin = 'workspace_auto_join',
  WorkspaceContentPrivacySettingChange = 'workspace_content_privacy_setting_change',
  WorkspaceDataRetentionChange = 'workspace_data_retention_change',
  WorkspaceDataRetentionDeletion = 'workspace_data_retention_deletion',
  WorkspaceDefaultPrivacyChange = 'workspace_default_privacy_change',
  WorkspaceDomainPrivacySettingChange = 'workspace_domain_privacy_setting_change',
  WorkspaceDomainSettingsChange = 'workspace_domain_settings_change',
  WorkspaceDomainVerificationChange = 'workspace_domain_verification_change',
  WorkspaceGoogleIntegrationChange = 'workspace_google_integration_change',
  WorkspaceGroupChange = 'workspace_group_change',
  WorkspaceGroupMemberChange = 'workspace_group_member_change',
  WorkspaceJoinRequestAcknowledgement = 'workspace_join_request_acknowledgement',
  WorkspaceLinkExpirationChange = 'workspace_link_expiration_change',
  WorkspaceSalesSupportTypeChange = 'workspace_sales_support_type_change',
  WorkspaceScimChange = 'workspace_scim_change',
  WorkspaceScimUserDeactivation = 'workspace_scim_user_deactivation',
  WorkspaceSettingChange = 'workspace_setting_change',
  WorkspaceSlackIntegrationChange = 'workspace_slack_integration_change',
  WorkspaceSsoChange = 'workspace_sso_change',
  WorkspaceStatusChange = 'workspace_status_change',
  WorkspaceUserDeletion = 'workspace_user_deletion',
  WorkspaceUserDeprovisioningSettingChange = 'workspace_user_deprovisioning_setting_change',
  WorkspaceUserTransferContent = 'workspace_user_transfer_content'
}

export type WorkspaceGroup = {
  __typename?: 'WorkspaceGroup';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  group_properties: WorkspaceGroupProperties;
  id: Scalars['ID']['output'];
  memberCount?: Maybe<Scalars['Int']['output']>;
  members: Array<WorkspaceGroupMember>;
  name: Scalars['String']['output'];
  source: WorkspaceGroupMemberSource;
  spaces?: Maybe<Array<Maybe<Space>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  workspace_id: Scalars['ID']['output'];
};

export type WorkspaceGroupConnection = {
  __typename?: 'WorkspaceGroupConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<WorkspaceGroupEdge>>>;
  /** Flattened list of WorkspaceGroup type */
  nodes?: Maybe<Array<Maybe<WorkspaceGroup>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type WorkspaceGroupEdge = {
  __typename?: 'WorkspaceGroupEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<WorkspaceGroup>;
};

export type WorkspaceGroupMember = {
  __typename?: 'WorkspaceGroupMember';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: RegularUser;
  user_id: Scalars['ID']['output'];
  workspace_group_id: Scalars['ID']['output'];
  workspace_id: Scalars['ID']['output'];
  workspace_member_id: Scalars['ID']['output'];
};

export enum WorkspaceGroupMemberSource {
  Admin = 'admin',
  Google = 'google',
  Scim = 'scim',
  Slack = 'slack'
}

export type WorkspaceGroupProperties = {
  __typename?: 'WorkspaceGroupProperties';
  content_permissions?: Maybe<ContentVisibilityProperty>;
};

export type WorkspaceIdPayload = {
  __typename?: 'WorkspaceIdPayload';
  workspace?: Maybe<WorkspaceInfo>;
};

export type WorkspaceInfo = {
  __typename?: 'WorkspaceInfo';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum WorkspaceJoinRequestStatus {
  Approved = 'approved',
  Declined = 'declined',
  Pending = 'pending',
  Voided = 'voided'
}

export type WorkspaceMembers = {
  __typename?: 'WorkspaceMembers';
  accepted?: Maybe<Array<Maybe<OrganizationMember>>>;
  invited?: Maybe<Array<Maybe<OrganizationInvitation>>>;
};

export type WorkspaceNotFoundError = Error & {
  __typename?: 'WorkspaceNotFoundError';
  feature?: Maybe<Feature>;
  message: Scalars['String']['output'];
};

export enum WorkspacePlan {
  Business = 'business',
  Education = 'education',
  Enterprise = 'enterprise',
  StarterFree = 'starter_free'
}

export type WorkspaceSetting = {
  __typename?: 'WorkspaceSetting';
  name: Scalars['String']['output'];
  value: Scalars['BasicScalar']['output'];
};

export type WorkspaceSettings = {
  __typename?: 'WorkspaceSettings';
  allowsAI?: Maybe<Scalars['Boolean']['output']>;
  allowsAMN?: Maybe<Scalars['Boolean']['output']>;
  billingEmailNotifications?: Maybe<Scalars['Boolean']['output']>;
  companyDomainDefault?: Maybe<Scalars['Boolean']['output']>;
  confluenceActivationId?: Maybe<Scalars['String']['output']>;
  contentDeletionProgress?: Maybe<Scalars['JSON']['output']>;
  contentPrivacyRestrictions?: Maybe<Scalars['JSON']['output']>;
  creatorLiteLimitEnforced?: Maybe<Scalars['Boolean']['output']>;
  creatorsTopInviteRole?: Maybe<Scalars['String']['output']>;
  customRoleUpgradeMessage?: Maybe<Scalars['String']['output']>;
  dataRetention?: Maybe<Scalars['JSON']['output']>;
  dateEligibileForDeletion?: Maybe<Scalars['String']['output']>;
  domainCapture?: Maybe<Scalars['Boolean']['output']>;
  downloadsDisabled?: Maybe<Scalars['Boolean']['output']>;
  enableAutoUserMigration?: Maybe<Scalars['Boolean']['output']>;
  fallLaunch2024BusinessDescopeEditByTranscript?: Maybe<Scalars['Boolean']['output']>;
  fallLaunch2024BusinessDescopeEditByTranscriptV2?: Maybe<Scalars['Boolean']['output']>;
  fallLaunch2024BusinessDescopeEditByTranscriptV3?: Maybe<Scalars['Boolean']['output']>;
  googleContactSync?: Maybe<Scalars['JSON']['output']>;
  hasCreatorLite?: Maybe<Scalars['Boolean']['output']>;
  hideViewerRole?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  linkExpiration?: Maybe<Scalars['JSON']['output']>;
  manualSkipCommunicationFlags?: Maybe<Scalars['JSON']['output']>;
  meetingRecordingLanguage?: Maybe<Scalars['String']['output']>;
  memberInvitationAllowed?: Maybe<Scalars['Boolean']['output']>;
  missingActiveSubscriptionRemediation?: Maybe<Scalars['JSON']['output']>;
  pnpCreatorLiteDownloadUpdate?: Maybe<Scalars['Boolean']['output']>;
  pnpFillerWordV1Update?: Maybe<Scalars['Boolean']['output']>;
  privateContentDefault?: Maybe<Scalars['Boolean']['output']>;
  salesforceVideoDefaultsForGroups?: Maybe<Scalars['JSON']['output']>;
  scim?: Maybe<Scalars['Boolean']['output']>;
  scimToS?: Maybe<Scalars['Boolean']['output']>;
  scimUsersPendingAction?: Maybe<Scalars['JSON']['output']>;
  settingsPopulated?: Maybe<Scalars['Boolean']['output']>;
  showVideoPreview?: Maybe<Scalars['Boolean']['output']>;
  slackContactSync?: Maybe<Scalars['JSON']['output']>;
  slackPrivateVideoPreview?: Maybe<Scalars['JSON']['output']>;
  ssoEnforcement?: Maybe<Scalars['Boolean']['output']>;
  userDeprovisioning?: Maybe<Scalars['JSON']['output']>;
  workos?: Maybe<Scalars['JSON']['output']>;
  workspaceAutojoin?: Maybe<Scalars['Boolean']['output']>;
  workspaceDeletionStage?: Maybe<Scalars['String']['output']>;
  workspaceDomainJoinInfo?: Maybe<Scalars['JSON']['output']>;
  workspacePersona?: Maybe<Scalars['JSON']['output']>;
  zoomContentDefault?: Maybe<Scalars['JSON']['output']>;
  zoomIngestionUserDefault?: Maybe<Scalars['Boolean']['output']>;
  zoomIntegration?: Maybe<Scalars['Boolean']['output']>;
};

export type WorkspaceSettingsResponse = UserNotAuthorizedError | WorkspaceSettings;

export type WorkspaceTotalCounts = {
  __typename?: 'WorkspaceTotalCounts';
  folders: Scalars['JSON']['output'];
  screenshots: Scalars['JSON']['output'];
  spaces?: Maybe<SpaceCountType>;
  unseenNotifications?: Maybe<Scalars['Int']['output']>;
  users: Scalars['JSON']['output'];
  videos: Scalars['JSON']['output'];
};

export type WorkspaceTrendingTagsPayload = {
  __typename?: 'WorkspaceTrendingTagsPayload';
  tags?: Maybe<TagConnection>;
};


export type WorkspaceTrendingTagsPayloadTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  algorithm: TrendingTagAlgorithm;
  first: Scalars['Int']['input'];
};

export type WorkspaceTrendingTagsResponse = GenericError | InputValidationError | UserNotAuthorizedError | WorkspaceTrendingTagsPayload;

export type WorkspaceVideoAclEntry = VideoAclEntry & {
  __typename?: 'WorkspaceVideoAclEntry';
  access?: Maybe<VideoAccessLevel>;
  workspace?: Maybe<Organization>;
};

export type WorkspaceVideoAction = {
  __typename?: 'WorkspaceVideoAction';
  createdAt: Scalars['Date']['output'];
  updatedAt: Scalars['Date']['output'];
  user_id?: Maybe<Scalars['ID']['output']>;
};

export type WorkspaceVideoFilterInput = {
  /** Start date for date range filters (ISO 8601 format) */
  fromDate?: InputMaybe<Scalars['String']['input']>;
  /** End date for date range filters (ISO 8601 format) */
  toDate?: InputMaybe<Scalars['String']['input']>;
  type: WorkspaceVideoFilterType;
  /** Filter value (e.g., "public" or "workspace" for privacy type) */
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum WorkspaceVideoFilterType {
  CreatedAt = 'CREATED_AT',
  OwnerId = 'OWNER_ID',
  Privacy = 'PRIVACY',
  PrivacyType = 'PRIVACY_TYPE',
  RecordingType = 'RECORDING_TYPE'
}

export type WorkspaceVideoPageInfo = {
  __typename?: 'WorkspaceVideoPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type WorkspaceVideoSearchItem = {
  __typename?: 'WorkspaceVideoSearchItem';
  organizationId: Scalars['Int']['output'];
  video?: Maybe<RegularUserVideo>;
  videoId: Scalars['ID']['output'];
};

export type WorkspaceVideoSortInput = {
  sortBy: WorkspaceVideoSortType;
  sortOrder: LoomsSortOrder;
};

export enum WorkspaceVideoSortType {
  CreatedAt = 'CREATED_AT',
  Privacy = 'PRIVACY',
  RecordingType = 'RECORDING_TYPE',
  TotalViews = 'TOTAL_VIEWS',
  VideoName = 'VIDEO_NAME'
}

export enum ZoomCreatedBy {
  Auto = 'AUTO',
  User = 'USER'
}

export enum ZoomType {
  Click = 'CLICK',
  Cursor = 'CURSOR',
  Static = 'STATIC'
}

export type AddDomainsToApiKeyResult = {
  __typename?: 'addDomainsToApiKeyResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddParentSpaceToFolderPermissionsPayload = {
  __typename?: 'addParentSpaceToFolderPermissionsPayload';
  spaceId?: Maybe<Scalars['ID']['output']>;
};

export type AddPlaybackAllowedDomainsToSdkResult = {
  __typename?: 'addPlaybackAllowedDomainsToSDKResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AddPlaybackAllowedDomainsToSdkUnion = GenericError | AddPlaybackAllowedDomainsToSdkResult;

export type AddUsersOrGroupsToFolderPermissionsPayload = {
  __typename?: 'addUsersOrGroupsToFolderPermissionsPayload';
  failedGroupIds?: Maybe<Array<Maybe<FailedUserOrGroupType>>>;
  failedUserIds?: Maybe<Array<Maybe<FailedUserOrGroupType>>>;
  folder?: Maybe<RegularUserFolder>;
};

export type AddUsersToWorkspaceGroupPayload = {
  __typename?: 'addUsersToWorkspaceGroupPayload';
  results: Array<WorkspaceGroupMember>;
};

export type AdminGetIncentiveEligibleInvitesPayloadType = {
  __typename?: 'adminGetIncentiveEligibleInvitesPayloadType';
  eligibleInvitations?: Maybe<Array<Maybe<EligibleInvitationsType>>>;
};

export type AdminReconcileWorkspaceMembershipPayload = {
  __typename?: 'adminReconcileWorkspaceMembershipPayload';
  success: Scalars['Boolean']['output'];
};

export type AdminResetUserPayload = {
  __typename?: 'adminResetUserPayload';
  success: Scalars['Boolean']['output'];
};

export type AdvanceClockPlayload = {
  __typename?: 'advanceClockPlayload';
  success: Scalars['Boolean']['output'];
};

export type ApplyVideoLimitOverridePayloadType = {
  __typename?: 'applyVideoLimitOverridePayloadType';
  memberVideoLimit?: Maybe<Scalars['Int']['output']>;
};

export type CancelMembershipRoleDowngradeRequestPayloadType = {
  __typename?: 'cancelMembershipRoleDowngradeRequestPayloadType';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ConfluenceContent = {
  __typename?: 'confluenceContent';
  id?: Maybe<Scalars['ID']['output']>;
  space?: Maybe<ConfluenceSpace>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ConfluenceContentTypes>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ConfluenceSpace = {
  __typename?: 'confluenceSpace';
  homepage?: Maybe<ConfluenceContent>;
  icon?: Maybe<ConfluenceSpaceIcon>;
  id?: Maybe<Scalars['ID']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CreateAnonPartnerSessionRecordingCachePayload = {
  __typename?: 'createAnonPartnerSessionRecordingCachePayload';
  success: Scalars['Boolean']['output'];
};

export type CreateAnonRecordingCachePayload = {
  __typename?: 'createAnonRecordingCachePayload';
  success: Scalars['Boolean']['output'];
};

export type CreateAnonRecordingCacheResponse = GenericError | UserNotAuthorizedError | CreateAnonRecordingCachePayload;

export type CreateIncentivePayloadType = {
  __typename?: 'createIncentivePayloadType';
  created?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateWorkspaceGroupPayload = {
  __typename?: 'createWorkspaceGroupPayload';
  workspaceGroup?: Maybe<WorkspaceGroup>;
};

export type DeleteAllPlaybackAllowedDomainsResult = {
  __typename?: 'deleteAllPlaybackAllowedDomainsResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteAllPlaybackAllowedDomainsUnion = GenericError | DeleteAllPlaybackAllowedDomainsResult;

export type DeleteGmailScopePayload = {
  __typename?: 'deleteGmailScopePayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeletePlaybackAllowedDomainsFromSdkResult = {
  __typename?: 'deletePlaybackAllowedDomainsFromSDKResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeletePlaybackAllowedDomainsFromSdkUnion = GenericError | DeletePlaybackAllowedDomainsFromSdkResult;

export type DeleteWorkspaceGroupPayload = {
  __typename?: 'deleteWorkspaceGroupPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DuplicateVideo = {
  __typename?: 'duplicateVideo';
  duplicateVideoReplacements?: Maybe<Array<Maybe<DuplicateVideoReplacement>>>;
  id: Scalars['String']['output'];
  recipientEmail?: Maybe<Scalars['String']['output']>;
};

export type DuplicateVideoReplacement = {
  __typename?: 'duplicateVideoReplacement';
  instanceTimestamps?: Maybe<Array<Maybe<InstanceTimestamp>>>;
  originalWord: Scalars['String']['output'];
  replacementWord: Scalars['String']['output'];
  variable: PresetVariablesEnum;
};

export type EditCommentPayload = {
  __typename?: 'editCommentPayload';
  success: Scalars['Boolean']['output'];
};

export type EligibleInvitationsType = {
  __typename?: 'eligibleInvitationsType';
  createdAt?: Maybe<Scalars['String']['output']>;
  hasIncentive?: Maybe<Scalars['String']['output']>;
  inviteType?: Maybe<Scalars['String']['output']>;
  inviteeEmail?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type EoyTakeoverInsightsPayloadType = {
  __typename?: 'eoyTakeoverInsightsPayloadType';
  downloadableImage?: Maybe<Scalars['String']['output']>;
  personalityMetricText?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  personalityScore?: Maybe<Scalars['String']['output']>;
  personalityType?: Maybe<Scalars['String']['output']>;
  socialShareImage?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalMeetingsEliminated?: Maybe<Scalars['String']['output']>;
  totalTimeSaved?: Maybe<Scalars['String']['output']>;
  totalVideosCreated?: Maybe<Scalars['String']['output']>;
  totalVideosViewed?: Maybe<Scalars['String']['output']>;
};

export type FollowsCount = {
  __typename?: 'followsCount';
  followerCount?: Maybe<Scalars['Int']['output']>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  streamType?: Maybe<Scalars['String']['output']>;
};

export type ForceAddMembersInfo = {
  id: Scalars['ID']['input'];
  role: Scalars['String']['input'];
};

export type GetAllMeetingsForUserPayload = {
  __typename?: 'getAllMeetingsForUserPayload';
  hideMeetings?: Maybe<Scalars['Boolean']['output']>;
  results: Array<Meeting>;
};

export type GetEmailDigestInsightsPayloadType = {
  __typename?: 'getEmailDigestInsightsPayloadType';
  status?: Maybe<Scalars['String']['output']>;
};

/** Get paginated followers list for profile */
export type GetFollowedByPayload = {
  __typename?: 'getFollowedByPayload';
  profileList?: Maybe<UserProfileStreamConnection>;
};


/** Get paginated followers list for profile */
export type GetFollowedByPayloadProfileListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  profileId: Scalars['ID']['input'];
};

/** Get paginated followers list for profile */
export type GetFollowsPayload = {
  __typename?: 'getFollowsPayload';
  profileList?: Maybe<UserProfileStreamConnection>;
};


/** Get paginated followers list for profile */
export type GetFollowsPayloadProfileListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  profileId: Scalars['ID']['input'];
};

export type GetGoogleOauthDetails = {
  __typename?: 'getGoogleOauthDetails';
  details?: Maybe<Array<Maybe<GetGoogleOauthDetailsList>>>;
};

export type GetGoogleOauthDetailsList = {
  __typename?: 'getGoogleOauthDetailsList';
  email?: Maybe<Scalars['String']['output']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type GetInsightsforHubPayloadType = {
  __typename?: 'getInsightsforHubPayloadType';
  ASYNC_BEHAVIOR?: Maybe<AsyncBehaviorListPayloadType>;
  INFLUENTIAL?: Maybe<ImpactfulVideosListPayloadType>;
  OLD_GEM?: Maybe<ImpactfulVideosListPayloadType>;
  ONE_ON_ONE_LOOP?: Maybe<ImpactfulVideosListPayloadType>;
  SINGLE_VIDEO?: Maybe<ImpactfulVideosListPayloadType>;
  SPEECH_CLARITY?: Maybe<ClarityChartPayloadType>;
};

export type GetLinkedAtlassianInfoForUserPayload = {
  __typename?: 'getLinkedAtlassianInfoForUserPayload';
  userProfile?: Maybe<UserProfile>;
};

export type GetMembersForWorkspaceGroupPayload = {
  __typename?: 'getMembersForWorkspaceGroupPayload';
  results: Array<WorkspaceGroupMember>;
};

export type GetPrebucketedFeatureFlagsPayload = {
  __typename?: 'getPrebucketedFeatureFlagsPayload';
  registrations?: Maybe<Array<Maybe<RegistrationType>>>;
};

export type GetRecordedInLast30DaysPayloadType = {
  __typename?: 'getRecordedInLast30DaysPayloadType';
  hasRecorded?: Maybe<Array<Maybe<Scalars['Boolean']['output']>>>;
};

export type GetTestClockPlayload = {
  __typename?: 'getTestClockPlayload';
  testClockStatus?: Maybe<Scalars['String']['output']>;
  unixCreatedTime?: Maybe<Scalars['Int']['output']>;
  unixFrozenTime?: Maybe<Scalars['Int']['output']>;
};

export type GetUnsyncedRecordingsPayload = {
  __typename?: 'getUnsyncedRecordingsPayload';
  results: Array<UnsyncedMeeting>;
};

export type GetWorkspaceGroupsPayload = {
  __typename?: 'getWorkspaceGroupsPayload';
  results: Array<WorkspaceGroup>;
};

export type HasAnonymousCreatorPrivilegesPayload = {
  __typename?: 'hasAnonymousCreatorPrivilegesPayload';
  hasPrivileges?: Maybe<Scalars['Boolean']['output']>;
};

export type HasGmailScopePayload = {
  __typename?: 'hasGmailScopePayload';
  hasScope?: Maybe<Scalars['Boolean']['output']>;
};

export type HistoryType = {
  __typename?: 'historyType';
  audience_size?: Maybe<Scalars['Int']['output']>;
  initiated_by?: Maybe<Scalars['String']['output']>;
  removed?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  transferred?: Maybe<Scalars['Int']['output']>;
};

export type ImportMeetingRecordingsPayload = {
  __typename?: 'importMeetingRecordingsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type InstanceTimestamp = {
  __typename?: 'instanceTimestamp';
  endTsForOriginalSelectionInSecs?: Maybe<Scalars['Float']['output']>;
  startTsForOriginalSelectionInSecs?: Maybe<Scalars['Float']['output']>;
};

export type InviteeType = {
  __typename?: 'inviteeType';
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
};

export type RedeemIncentivePayloadType = {
  __typename?: 'redeemIncentivePayloadType';
  redeemed?: Maybe<Scalars['Boolean']['output']>;
};

export type RegisterPrebucketedFeatureFlagPayload = {
  __typename?: 'registerPrebucketedFeatureFlagPayload';
  registration?: Maybe<RegistrationType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RegistrationType = {
  __typename?: 'registrationType';
  createdAt?: Maybe<Scalars['Date']['output']>;
  expected_end_date?: Maybe<Scalars['Date']['output']>;
  flag_name?: Maybe<Scalars['String']['output']>;
  history?: Maybe<Array<Maybe<HistoryType>>>;
  id?: Maybe<Scalars['Int']['output']>;
  idv2?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RemoveParentSpaceFromFolderPermissionsPayload = {
  __typename?: 'removeParentSpaceFromFolderPermissionsPayload';
  spaceId?: Maybe<Scalars['ID']['output']>;
};

export type RemovePrebucketedAudienceFromRedisPayload = {
  __typename?: 'removePrebucketedAudienceFromRedisPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemoveUserOrGroupFromFolderPermissionsPayload = {
  __typename?: 'removeUserOrGroupFromFolderPermissionsPayload';
  folder?: Maybe<RegularUserFolder>;
  groupId?: Maybe<Scalars['ID']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type RemoveUsersFromWorkspaceGroupPayload = {
  __typename?: 'removeUsersFromWorkspaceGroupPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
  userIds?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type ResetFtuxComponentPayload = {
  __typename?: 'resetFtuxComponentPayload';
  ftux: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SendGmailPayload = {
  __typename?: 'sendGmailPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetFolderToInheritPermissionsPayload = {
  __typename?: 'setFolderToInheritPermissionsPayload';
  folder?: Maybe<RegularUserFolder>;
};

export type SetRemoveLoomBranding = GenericError | SetRemoveLoomBrandingResult;

export type SetRemoveLoomBrandingResult = {
  __typename?: 'setRemoveLoomBrandingResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Speaker = {
  __typename?: 'speaker';
  name?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type StorageIncentiveType = {
  __typename?: 'storageIncentiveType';
  completed?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type TransferPrebucketedFeatureFlagPayload = {
  __typename?: 'transferPrebucketedFeatureFlagPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UndoPendingAddOnCancelationPayload = {
  __typename?: 'undoPendingAddOnCancelationPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateAnonRecordingOwnershipPayload = {
  __typename?: 'updateAnonRecordingOwnershipPayload';
  success: Scalars['Boolean']['output'];
};

export type UpdateAnonRecordingOwnershipResponse = GenericError | UserNotAuthorizedError | UpdateAnonRecordingOwnershipPayload;

export type UpdateAutoRecordMeetingSettingPayload = {
  __typename?: 'updateAutoRecordMeetingSettingPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateBillingEmailResult = {
  __typename?: 'updateBillingEmailResult';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateSettingsForAllRecurringMeetingsPayload = {
  __typename?: 'updateSettingsForAllRecurringMeetingsPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateWorkspaceGroupPayload = {
  __typename?: 'updateWorkspaceGroupPayload';
  workspaceGroup?: Maybe<WorkspaceGroup>;
};
