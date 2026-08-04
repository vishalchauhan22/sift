import {
  FetchInvitationCapabilitiesPayload,
  InviteFlow,
  InviteSetting,
} from '@js/globalTypes.generated';

import { useFetchInvitationCapabilitiesQuery } from './FetchInvitationCapabilities.generated';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
import { useGetLegacyMigrationIsActive } from '@js/hooks/legacyMigration/useLegacyMigrationIsActive';

export const useInvitationCapabilities = ({
  isOnboarding,
}: { isOnboarding?: boolean } = {}): {
  showInviteButton: boolean;
  loading?: boolean;
  domains?: FetchInvitationCapabilitiesPayload['domains'];
  inviteSetting?: FetchInvitationCapabilitiesPayload['inviteSetting'];
  inviteFlow?: FetchInvitationCapabilitiesPayload['inviteFlow'];
  isLegacyMigrationActive: boolean;
} => {
  const { loading: workspaceMembershipsLoading, selectedWorkspace: workspace } =
    useGetWorkspaceMemberships();
  const isLegacyMigrationActive = useGetLegacyMigrationIsActive();
  const skip = Boolean(!workspace?.id);
  const {
    data,
    error,
    loading: loadingInvitationCapabilities,
  } = useFetchInvitationCapabilitiesQuery({
    variables: {
      workspaceId: workspace?.id as string, // we know this exists because of the skip check
      isOnboarding,
    },
    skip,
  });
  const loading = loadingInvitationCapabilities || workspaceMembershipsLoading;

  if (
    loading ||
    error ||
    data?.fetchInvitationCapabilities?.__typename !==
      'FetchInvitationCapabilitiesPayload'
  ) {
    return {
      showInviteButton: false,
      loading,
      isLegacyMigrationActive,
    };
  }

  const { domains, inviteFlow, inviteSetting } =
    data?.fetchInvitationCapabilities ?? {};

  if (
    !inviteFlow ||
    inviteFlow === InviteFlow.None ||
    inviteSetting === InviteSetting.None
  ) {
    return {
      showInviteButton: false,
      inviteFlow,
      inviteSetting,
      isLegacyMigrationActive,
    };
  }
  return {
    showInviteButton: true,
    domains,
    inviteSetting,
    inviteFlow,
    isLegacyMigrationActive,
  };
};
