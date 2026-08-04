import { ApolloError } from '@apollo/client';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import {
  useUserWorkspaceMembershipsQuery,
  useUserWorkspaceMembershipsLazyQuery,
  UserWorkspaceMembershipsQuery,
} from '@js/common/workspace-memberships/getUserWorkspaceMemberships.generated';
import { useMemo } from 'react';
import * as logger from '@js/utilities/loggerx';

import { Team } from '@loomhq/shared-utilities/constants/product';

type WorkspaceMembershipFromQuery = NonNullable<
  UserWorkspaceMembershipsQuery['userWorkspaceMemberships']
>[number];

type OrganizationFromQuery =
  NonNullable<WorkspaceMembershipFromQuery>['organization'];

// We have numbers because counts.users is of type unknown
// So we cannot extract the types from the query
// TODO: We should update the schema to be more specific and
// remove the unknown type
export type FormattedWorkspaceMembership = {
  activation_id: OrganizationFromQuery['activation_id'];
  counts: OrganizationFromQuery['counts'];
  id: OrganizationFromQuery['id'];
  isAtlassianManagedWorkspace: OrganizationFromQuery['isAtlassianManagedWorkspace'];
  isCloudProvisionerManagedWorkspace: OrganizationFromQuery['isCloudProvisionerManagedWorkspace'];
  isSelected: NonNullable<WorkspaceMembershipFromQuery>['isSelected'];
  isViewerRoleHidden: OrganizationFromQuery['isViewerRoleHidden'];
  limits: OrganizationFromQuery['limits'];
  memberJoined: NonNullable<WorkspaceMembershipFromQuery>['createdAt'];
  memberLimits: NonNullable<WorkspaceMembershipFromQuery>['member_limits'];
  memberRole: NonNullable<WorkspaceMembershipFromQuery>['member_role'];
  memberRoles: OrganizationFromQuery['member_roles'];
  members: number;
  name: OrganizationFromQuery['name'];
  onboarding: NonNullable<WorkspaceMembershipFromQuery>['onboarding'];
  organization_createdAt: OrganizationFromQuery['createdAt'];
  organization_id: OrganizationFromQuery['id'];
  organization_properties: OrganizationFromQuery['organization_properties'];
  pendingDowngradesFromAdmin: number;
  pendingDowngradesFromCreator: number;
  site_id: OrganizationFromQuery['site_id'];
  totalActiveCreators: number;
  totalAdminCount: number;
  type: OrganizationFromQuery['type'];
  was_loom_user_before_membership: NonNullable<WorkspaceMembershipFromQuery>['was_loom_user_before_membership'];
  workspaceMigrationEligibleDate: OrganizationFromQuery['workspaceMigrationEligibleDate'];
  isMigrationCompleted: OrganizationFromQuery['isMigrationCompleted'];
  workspaceLogoPath: OrganizationFromQuery['workspaceLogoPath'];
};

function formatUserWorkspaceMembershipsData(
  data: UserWorkspaceMembershipsQuery | undefined
): Array<FormattedWorkspaceMembership> {
  const memberships = data?.userWorkspaceMemberships
    ?.map(membership => {
      if (!membership) {
        return null;
      }

      const { organization: org } = membership;

      const {
        total_active_admins,
        total_active_creators,
        total_workspace_users,
        pending_downgrades_from_admin,
        pending_downgrades_from_creator,
      } = org.counts.users as any;

      const totalAdminCount = total_active_admins;

      const totalActiveCreators = totalAdminCount + total_active_creators;

      const members = total_workspace_users;

      return {
        activation_id: org.activation_id,
        counts: org.counts,
        id: org.id,
        isAtlassianManagedWorkspace: org.isAtlassianManagedWorkspace,
        isCloudProvisionerManagedWorkspace:
          org.isCloudProvisionerManagedWorkspace,
        isMigrationCompleted: org.isMigrationCompleted,
        isSelected: membership.isSelected,
        isViewerRoleHidden: org.isViewerRoleHidden,
        limits: org.limits,
        memberJoined: membership.createdAt,
        memberLimits: membership.member_limits,
        memberRole: membership.member_role,
        memberRoles: org.member_roles,
        members,
        name: org.name,
        onboarding: membership.onboarding,
        organization_createdAt: org.createdAt,
        organization_id: org.id,
        organization_properties: org.organization_properties,
        pendingDowngradesFromAdmin: pending_downgrades_from_admin,
        pendingDowngradesFromCreator: pending_downgrades_from_creator,
        site_id: org.site_id,
        totalActiveCreators,
        totalAdminCount,
        type: org.type,
        was_loom_user_before_membership:
          membership.was_loom_user_before_membership,
        workspaceLogoPath: org.workspaceLogoPath,
        workspaceMigrationEligibleDate: org.workspaceMigrationEligibleDate,
      };
    })
    .filter(Boolean) as Array<FormattedWorkspaceMembership>;

  return memberships || [];
}

type UseGetWorkspaceMembershipsReturnType = {
  data: Array<FormattedWorkspaceMembership>;
  error: ApolloError | undefined;
  loading: boolean;
  fetchWorkspaceMemberships: ReturnType<
    typeof useUserWorkspaceMembershipsLazyQuery
  >[0];
  selectedWorkspace: FormattedWorkspaceMembership | undefined;
};

export function useGetWorkspaceMemberships(): UseGetWorkspaceMembershipsReturnType {
  const authenticated = useIsCurrentUserLoggedIn();

  const { data, error, loading } = useUserWorkspaceMembershipsQuery({
    skip: !authenticated,
    onError: error => {
      logger.error(
        error,
        {
          message: 'Failed to fetch user workspace memberships.',
        },
        {
          team: Team.Outreach,
        }
      );
    },
  });

  const [
    fetchWorkspaceMemberships,
    {
      loading: isFetchingWorkspaceMemberships,
      error: fetchWorkspaceMembershipsError,
    },
  ] = useUserWorkspaceMembershipsLazyQuery({
    onError: error => {
      logger.error(
        error,
        {
          message: 'Failed to fetch user workspace memberships.',
        },
        {
          team: Team.Outreach,
        }
      );
    },
  });

  const workspaces = useMemo(
    () => formatUserWorkspaceMembershipsData(data),
    [data]
  );

  const selectedWorkspace = useMemo(
    () =>
      workspaces?.find(workspaceMembership => workspaceMembership?.isSelected),
    [workspaces]
  );

  return {
    data: workspaces,
    error: error || fetchWorkspaceMembershipsError,
    loading: loading || isFetchingWorkspaceMemberships,
    fetchWorkspaceMemberships,
    selectedWorkspace,
  };
}
