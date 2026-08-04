import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserWorkspaceMembershipsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserWorkspaceMembershipsQuery = { __typename: 'Query', userWorkspaceMemberships: Array<{ __typename: 'OrganizationMember', id: string, member_role: string, createdAt: string, isSelected: boolean, was_loom_user_before_membership: boolean | null, onboarding: unknown, member_limits: unknown | null, organization: { __typename: 'Organization', id: string, activation_id: string | null, site_id: string | null, createdAt: string, isAtlassianManagedWorkspace: boolean | null, isCloudProvisionerManagedWorkspace: boolean | null, name: string, type: string | null, workspaceLogoPath: string | null, organization_properties: unknown, limits: unknown | null, isViewerRoleHidden: boolean | null, counts: { __typename: 'WorkspaceTotalCounts', videos: unknown, screenshots: unknown, users: unknown, folders: unknown, unseenNotifications: number | null, spaces: { __typename: 'SpaceCountType', total_active_spaces: number | null } | null }, member_roles: Array<{ __typename: 'MemberRole', value: string | null, name: string | null, inviteable: boolean | null, is_free: boolean | null } | null> } } | null> | null };


export const UserWorkspaceMembershipsDocument = gql`
    query userWorkspaceMemberships {
  userWorkspaceMemberships {
    id
    member_role
    createdAt
    isSelected
    organization {
      id
      activation_id
      site_id
      createdAt
      isAtlassianManagedWorkspace
      isCloudProvisionerManagedWorkspace
      name
      type
      workspaceLogoPath
      organization_properties
      limits
      counts {
        videos
        screenshots
        users
        folders
        unseenNotifications
        spaces {
          total_active_spaces
        }
      }
      member_roles {
        value
        name
        inviteable
        is_free
      }
      isViewerRoleHidden
    }
    was_loom_user_before_membership
    onboarding
    member_limits
  }
}
    `;

/**
 * __useUserWorkspaceMembershipsQuery__
 *
 * To run a query within a React component, call `useUserWorkspaceMembershipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWorkspaceMembershipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWorkspaceMembershipsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserWorkspaceMembershipsQuery(baseOptions?: Apollo.QueryHookOptions<UserWorkspaceMembershipsQuery, UserWorkspaceMembershipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWorkspaceMembershipsQuery, UserWorkspaceMembershipsQueryVariables>(UserWorkspaceMembershipsDocument, options);
      }
export function useUserWorkspaceMembershipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWorkspaceMembershipsQuery, UserWorkspaceMembershipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWorkspaceMembershipsQuery, UserWorkspaceMembershipsQueryVariables>(UserWorkspaceMembershipsDocument, options);
        }
export type UserWorkspaceMembershipsQueryHookResult = ReturnType<typeof useUserWorkspaceMembershipsQuery>;
export type UserWorkspaceMembershipsLazyQueryHookResult = ReturnType<typeof useUserWorkspaceMembershipsLazyQuery>;
export type UserWorkspaceMembershipsQueryResult = Apollo.QueryResult<UserWorkspaceMembershipsQuery, UserWorkspaceMembershipsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;