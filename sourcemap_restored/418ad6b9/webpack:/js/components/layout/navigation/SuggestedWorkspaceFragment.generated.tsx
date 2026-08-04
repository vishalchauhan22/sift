import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
export type SuggestedWorkspaceFragmentFragment = { __typename: 'JoinableWorkspace', id: string, autoJoin: boolean | null, isCurrentUserMember: boolean | null, requestStatus: Types.WorkspaceJoinRequestStatus | null, hasPendingInvitation: boolean | null, workspace: { __typename: 'Organization', id: string, name: string, workspaceLogoPath: string | null, counts: { __typename: 'WorkspaceTotalCounts', users: unknown }, members: { __typename: 'OrganizationMemberConnection', nodes: Array<{ __typename: 'OrganizationMember', id: string, member_role: string, user: { __typename: 'RegularUser', id: string, first_name: string | null, display_name: string, last_name: string | null, avatars: Array<{ __typename: 'Avatar', thumb: string }> } } | null> | null } | null } | null };

export const SuggestedWorkspaceFragmentFragmentDoc = gql`
    fragment SuggestedWorkspaceFragment on JoinableWorkspace {
  id
  workspace {
    id
    counts {
      users
    }
    name
    workspaceLogoPath
    members: membersConnection(first: 4) {
      nodes {
        id
        member_role
        user {
          id
          first_name
          display_name
          last_name
          avatars {
            thumb
          }
        }
      }
    }
  }
  autoJoin
  isCurrentUserMember
  requestStatus
  hasPendingInvitation
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;