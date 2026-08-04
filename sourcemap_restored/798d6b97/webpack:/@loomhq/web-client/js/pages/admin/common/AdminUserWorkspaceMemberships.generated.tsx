import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AdminUserWorkspaceMembershipsQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  email?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AdminUserWorkspaceMembershipsQuery = { __typename: 'Query', userWorkspaceMembershipsAdmin: { __typename: 'UserWorkspaceMembershipsAdminResponse', memberships: Array<{ __typename: 'OrganizationMember', id: string, createdAt: string, user_id: string, organization_id: string, member_role: string, member_status: string, member_limits: unknown | null, organization: { __typename: 'Organization', id: string, name: string, type: string | null, hidden: boolean | null, site_id: string | null, counts: { __typename: 'WorkspaceTotalCounts', videos: unknown, users: unknown } }, user: { __typename: 'RegularUser', id: string, display_name: string, email: string, account_type: string | null, default_workspace_id: string | null, capabilities: unknown, role: string }, member_counts: { __typename: 'MemberCounts', videos: unknown }, calendars: Array<{ __typename: 'CalendarInfo', guid: string, active: boolean, integrationType: Types.ConnectedServiceIntegrationEnumType, integrationKey: string, activatedAt: string, lastSyncedAt: string | null }> } | null> | null, user: { __typename: 'RegularUser', id: string, company_name: string | null, display_name: string, email: string, account_type: string | null, default_workspace_id: string | null, capabilities: unknown, role: string } | null } | null };


export const AdminUserWorkspaceMembershipsDocument = gql`
    query AdminUserWorkspaceMemberships($userId: ID, $email: String) {
  userWorkspaceMembershipsAdmin(userId: $userId, email: $email) {
    memberships {
      id
      createdAt
      user_id
      organization_id
      member_role
      member_status
      organization {
        id
        name
        type
        hidden
        site_id
        counts {
          videos
          users
        }
      }
      user {
        id
        display_name
        email
        account_type
        default_workspace_id
        capabilities
        role
      }
      member_counts {
        videos
      }
      member_limits
      calendars {
        guid
        active
        integrationType
        integrationKey
        activatedAt
        lastSyncedAt
      }
    }
    user {
      id
      company_name
      display_name
      email
      account_type
      default_workspace_id
      capabilities
      role
    }
  }
}
    `;

/**
 * __useAdminUserWorkspaceMembershipsQuery__
 *
 * To run a query within a React component, call `useAdminUserWorkspaceMembershipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserWorkspaceMembershipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserWorkspaceMembershipsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAdminUserWorkspaceMembershipsQuery(baseOptions?: Apollo.QueryHookOptions<AdminUserWorkspaceMembershipsQuery, AdminUserWorkspaceMembershipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminUserWorkspaceMembershipsQuery, AdminUserWorkspaceMembershipsQueryVariables>(AdminUserWorkspaceMembershipsDocument, options);
      }
export function useAdminUserWorkspaceMembershipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminUserWorkspaceMembershipsQuery, AdminUserWorkspaceMembershipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminUserWorkspaceMembershipsQuery, AdminUserWorkspaceMembershipsQueryVariables>(AdminUserWorkspaceMembershipsDocument, options);
        }
export type AdminUserWorkspaceMembershipsQueryHookResult = ReturnType<typeof useAdminUserWorkspaceMembershipsQuery>;
export type AdminUserWorkspaceMembershipsLazyQueryHookResult = ReturnType<typeof useAdminUserWorkspaceMembershipsLazyQuery>;
export type AdminUserWorkspaceMembershipsQueryResult = Apollo.QueryResult<AdminUserWorkspaceMembershipsQuery, AdminUserWorkspaceMembershipsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;