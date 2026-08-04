import { WORKSPACE_SUGGESTION_CLICK } from '@js/constants/events';

import React, { useState } from 'react';

import { getAvatarThumbForUser } from '@js/utilities/avatar';

import { REQUEST_TO_JOIN_WORKSPACE_AUTOJOINED } from '@loomhq/shared-utilities/constants/organizationInvitations';
import { REQUEST_STATUSES } from '@loomhq/shared-utilities/constants/workspaceJoinRequests';
import * as analytics from '@js/utilities/analytics';

import {
  useGetSuggestedWorkspaceBannerQuery,
  GetSuggestedWorkspaceBannerQuery,
} from './GetSuggestedWorkspaceForBanner.generated';
import { useRequestToJoinWorkspaceMutationMutation } from './RequestToJoinWorkspace.generated';
import { JoinTeamBannerComponent } from './component';
import { Avatar, JoinTeamBannerProps, TransformedWorkspaceData } from './types';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

type WorkspaceData = Extract<
  GetSuggestedWorkspaceBannerQuery['result'],
  { __typename: 'JoinableWorkspace' }
>;

export const JoinTeamBanner = ({
  organizationId,
}: JoinTeamBannerProps): JSX.Element | null => {
  const [dismissed, setDismissed] = useState(false);

  const handleSetDismissed = () => {
    setDismissed(true);
  };

  const { data, loading } = useGetSuggestedWorkspaceBannerQuery({
    skip: !organizationId,
    fetchPolicy: 'cache-first',
  });

  const [requestToJoinWorkspaceMutationMutation] =
    useRequestToJoinWorkspaceMutationMutation();

  if (!data?.result || data?.result?.__typename !== 'JoinableWorkspace') {
    return null;
  }

  const suggestedWorkspace = transformWorkspaceData(data.result);

  const videoIsInSuggestedWorkspace =
    suggestedWorkspace.workspace.id === organizationId;

  const requestPending =
    suggestedWorkspace.requestStatus === REQUEST_STATUSES.PENDING;

  const isCurrentMember = suggestedWorkspace.isCurrentUserMember;

  const shouldRender =
    !isCurrentMember &&
    !dismissed &&
    !loading &&
    !suggestedWorkspace.hasPendingInvitation &&
    !requestPending &&
    videoIsInSuggestedWorkspace;

  function onRequestClick(workspaceId) {
    requestToJoinWorkspaceMutationMutation({
      variables: { workspaceId },
      onCompleted: data => {
        if (
          data.result?.__typename === 'RequestToJoinWorkspacePayload' &&
          data.result.status
        ) {
          analytics.track(WORKSPACE_SUGGESTION_CLICK, {
            ...withIdentifiers(
              WORKSPACE_SUGGESTION_CLICK,
              AnalyticsEntityId.workspace(
                workspaceId,
                'string',
                'suggestedWorkspaceId'
              )
            ),
            source: 'share-page-banner',
            status: data.result.status,
          });

          if (data.result.status === REQUEST_TO_JOIN_WORKSPACE_AUTOJOINED) {
            window.location.href = '/';
          }
        }
      },
    });
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <JoinTeamBannerComponent
      memberCount={suggestedWorkspace.memberCount}
      suggestedWorkspace={suggestedWorkspace.workspace}
      requestPending={requestPending}
      autoJoin={suggestedWorkspace.autoJoin}
      avatars={suggestedWorkspace.avatars}
      handleSetDismissed={handleSetDismissed}
      onRequestClick={onRequestClick}
    />
  );
};

function transformWorkspaceData(data: WorkspaceData): TransformedWorkspaceData {
  const {
    requestStatus,
    hasPendingInvitation,
    autoJoin,
    workspace,
    isCurrentUserMember,
  } = data;

  const memberCount =
    (
      workspace?.counts?.users as {
        total_active_workspace_users?: number;
      }
    ).total_active_workspace_users ?? 0;

  const avatars: Avatar[] | undefined = workspace?.members?.nodes?.map(
    (member, index) => ({
      id: index,
      name: member ? member.user.first_name : null,
      avatarSrc: member
        ? getAvatarThumbForUser(member.user.avatars)
        : undefined,
    })
  );

  return {
    workspace: {
      id: workspace?.id ?? '',
      name: workspace?.name ?? '',
      workspaceLogoPath: workspace?.workspaceLogoPath ?? undefined,
    },
    memberCount: memberCount ?? undefined,
    hasPendingInvitation,
    autoJoin: autoJoin ?? null,
    avatars: avatars ?? [],
    requestStatus,
    isCurrentUserMember: isCurrentUserMember ?? null,
  };
}
