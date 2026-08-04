import { toMap } from '@js/common/triggers/collection/toMap';
import once from 'lodash/once';

import { EDUCATION_VERIFIED_TAG } from '@loomhq/shared-utilities/constants/tags';

import { CompletableTrigger } from '@js/globalTypes.generated';

import { isLoggedOutUser } from '../isLoggedOutUser';
import { CurrentUserOrLoggedOut, LoggedInUserResponse } from '../types';
import { hasAnyAiScope } from './hasAnyAiScope';
import { mapOauth } from './mapOauth';

type LoomSsrUserLoggedOut = undefined;

type LoomSsrUserLoggedIn = {
  id: number;
  aa_date_linked:
    | NonNullable<LoggedInUserResponse['aa_date_linked']>
    | undefined;
  aa_date_mastered:
    | NonNullable<LoggedInUserResponse['aa_date_mastered']>
    | undefined;
  aa_id: NonNullable<LoggedInUserResponse['aa_id']> | undefined;
  aa_is_mastered:
    | NonNullable<LoggedInUserResponse['aa_is_mastered']>
    | undefined;
  account_type: LoggedInUserResponse['account_type'];
  aiAccess: LoggedInUserResponse['aiAccess'];
  availableFtux: LoggedInUserResponse['availableFtux'];
  checklist: LoggedInUserResponse['checklist'];
  company_name: LoggedInUserResponse['company_name'];
  company_position: LoggedInUserResponse['companyPosition'];
  createdAt: LoggedInUserResponse['createdAt'];
  tags: {
    [EDUCATION_VERIFIED_TAG]: LoggedInUserResponse['isEducationVerified'];
    // team_alpha purposely omitted because it isn't referenced
  };
  elevio_hash: LoggedInUserResponse['elevio_hash'];
  intercomHash: LoggedInUserResponse['intercomHash'];
  email: LoggedInUserResponse['email'];
  first_name: LoggedInUserResponse['first_name'];
  last_name: LoggedInUserResponse['last_name'];
  password_is_set: LoggedInUserResponse['passwordIsSet'];
  role: LoggedInUserResponse['role'];
  status: LoggedInUserResponse['status'];
  avatars: LoggedInUserResponse['avatars']; // TODO: this might not be the right shape
  persona: LoggedInUserResponse['persona'];
  onboarding: LoggedInUserResponse['onboarding'];
  integration_settings: LoggedInUserResponse['integration_settings'];
  notification_settings: LoggedInUserResponse['notification_settings'];
  recorder_settings: LoggedInUserResponse['recorder_settings'];
  help_options: LoggedInUserResponse['help_options'];
  capabilities: LoggedInUserResponse['capabilities'];
  default_workspace_id: LoggedInUserResponse['default_workspace_id'];
  deletion_pending: LoggedInUserResponse['deletion_pending'];
  has_activated_desktop_app: LoggedInUserResponse['has_activated_desktop_app'];
  hasWebPushSubscription: LoggedInUserResponse['hasWebPushSubcription'];
  isPureTrial: boolean;
  is_sdk_shared_user: LoggedInUserResponse['isSdkSharedUser'];
  oauth: Record<string, NonNullable<LoggedInUserResponse['oauths']>[number]>;
  seasonalLaunchFtuxProperties: {
    workspacePlan:
      | NonNullable<
          NonNullable<LoggedInUserResponse['memberships']>[number]
        >['organization']['type']
      | undefined;
    workspaceRole:
      | NonNullable<
          NonNullable<LoggedInUserResponse['memberships']>[number]
        >['member_role']
      | undefined;
    hasAiAddOn: boolean;
    isPureTrial: boolean;
    isFirstRecording: boolean;
  };
  scopes: LoggedInUserResponse['scopes'];
  terms_accepted: LoggedInUserResponse['terms_accepted'];
  terms_accepted_created_at: LoggedInUserResponse['terms_accepted_created_at'];
  triggers: Record<string, CompletableTrigger>;
  video_settings: LoggedInUserResponse['videoSettings'];
  workspacePlan:
    | NonNullable<
        NonNullable<LoggedInUserResponse['memberships']>[number]
      >['organization']['type']
    | undefined;
  workspaceRole:
    | NonNullable<
        NonNullable<LoggedInUserResponse['memberships']>[number]
      >['member_role']
    | undefined;

  // These properties all exist in the reducer but seem to be unreferenced
  dashboard_access: undefined;
  is_primary: undefined;
  basic_video_limit: undefined;
  has_gmail_account: undefined;

  // potentially missing properties
  // workspaceType: LoggedInUserResponse['workspaceType'];
};

declare global {
  interface Window {
    /**
     * @deprecated Use common/current-user instead
     */
    loomSSRUser: LoomSsrUserLoggedIn | LoomSsrUserLoggedOut;
  }
}

// The purpose of the 'once' is that window.loomSSRUser is effectively constant, so we don't want to compare it to a potentially
// up to date currentUser every time we call this function.
const toLoomSsrUser = once(
  (
    currentUser: CurrentUserOrLoggedOut
  ): LoomSsrUserLoggedOut | LoomSsrUserLoggedIn => {
    if (isLoggedOutUser(currentUser)) {
      return undefined;
    }

    return {
      aa_date_linked: currentUser.aaDateLinked
        ? currentUser.aaDateLinked.toUTCString()
        : undefined,
      aa_date_mastered: currentUser.aaDateMastered
        ? currentUser.aaDateMastered.toUTCString()
        : undefined,
      aa_id: currentUser.aaId ?? undefined,
      aa_is_mastered: currentUser.aaIsMastered ?? undefined,
      account_type: currentUser.accountType,
      aiAccess: currentUser.aiAccess,
      availableFtux: currentUser.availableFtux,
      avatars: currentUser.avatars,
      basic_video_limit: undefined,
      capabilities: currentUser.capabilities,
      checklist: currentUser.checklist,
      company_name: currentUser.companyName,
      company_position: currentUser.companyPosition,
      createdAt: currentUser.createdAt.toUTCString(),
      dashboard_access: undefined,
      default_workspace_id: currentUser.defaultWorkspaceId
        ? currentUser.defaultWorkspaceId.toString()
        : null,
      deletion_pending: currentUser.deletionPending,
      elevio_hash: currentUser.elevioHash,
      email: currentUser.email,
      first_name: currentUser.firstName,
      has_activated_desktop_app: currentUser.hasActivatedDesktopApp,
      has_gmail_account: undefined,
      hasWebPushSubscription: currentUser.hasWebPushSubscription,
      help_options: currentUser.helpOptions,
      id: Number(currentUser.id),
      integration_settings: currentUser.integrationSettings,
      intercomHash: currentUser.intercomHash,
      is_primary: undefined,
      is_sdk_shared_user: currentUser.isSdkSharedUser,
      isPureTrial:
        currentUser.memberships?.[0]?.organization.is_pure_trial ?? false,
      last_name: currentUser.lastName,
      notification_settings: currentUser.notificationSettings,
      oauth: mapOauth(currentUser.oauths),
      onboarding: currentUser.onboarding,
      password_is_set: currentUser.passwordIsSet,
      persona: currentUser.persona,
      recorder_settings: currentUser.recorderSettings,
      role: currentUser.role,
      scopes: currentUser.scopes,
      seasonalLaunchFtuxProperties: {
        workspacePlan: currentUser.memberships?.[0]?.organization.type,
        workspaceRole: currentUser.memberships?.[0]?.member_role,
        hasAiAddOn: hasAnyAiScope(currentUser),
        isFirstRecording: currentUser.isFirstRecording ?? false,
        isPureTrial:
          currentUser.memberships?.[0]?.organization.is_pure_trial ?? false,
      },
      status: currentUser.status,
      tags: {
        [EDUCATION_VERIFIED_TAG]: currentUser.isEducationVerified,
      },
      terms_accepted: currentUser.termsAccepted,
      terms_accepted_created_at: currentUser.termsAcceptedCreatedAt,
      triggers: toMap(currentUser.triggers ?? []),
      video_settings: currentUser.videoSettings,
      workspacePlan: currentUser.memberships?.[0]?.organization.type,
      workspaceRole: currentUser.memberships?.[0]?.member_role,
    };
  }
);

export const getLoomSsrUserCompat = (
  currentUser: CurrentUserOrLoggedOut
): LoomSsrUserLoggedOut | LoomSsrUserLoggedIn => {
  return toLoomSsrUser(currentUser);
};
