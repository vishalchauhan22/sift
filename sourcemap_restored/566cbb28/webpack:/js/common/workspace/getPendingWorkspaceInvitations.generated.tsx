import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPendingWorkspaceInvitesForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPendingWorkspaceInvitesForUserQuery = { __typename: 'Query', invites: { __typename: 'GenericError' } | { __typename: 'GetPendingWorkspaceInvitesForUserPayload', pendingInvites: Array<{ __typename: 'OrganizationInvitation', id: string, token: string, organization_id: string, workspace: { __typename: 'Organization', id: string, name: string, workspaceLogoPath: string | null } } | null> | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetPendingWorkspaceInvitesForUserDocument = gql`
    query getPendingWorkspaceInvitesForUser {
  invites: getPendingWorkspaceInvitesForUser {
    __typename
    ... on GetPendingWorkspaceInvitesForUserPayload {
      pendingInvites {
        id
        token
        organization_id
        workspace {
          id
          name
          workspaceLogoPath
        }
      }
    }
  }
}
    `;

/**
 * __useGetPendingWorkspaceInvitesForUserQuery__
 *
 * To run a query within a React component, call `useGetPendingWorkspaceInvitesForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingWorkspaceInvitesForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingWorkspaceInvitesForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPendingWorkspaceInvitesForUserQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingWorkspaceInvitesForUserQuery, GetPendingWorkspaceInvitesForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingWorkspaceInvitesForUserQuery, GetPendingWorkspaceInvitesForUserQueryVariables>(GetPendingWorkspaceInvitesForUserDocument, options);
      }
export function useGetPendingWorkspaceInvitesForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingWorkspaceInvitesForUserQuery, GetPendingWorkspaceInvitesForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingWorkspaceInvitesForUserQuery, GetPendingWorkspaceInvitesForUserQueryVariables>(GetPendingWorkspaceInvitesForUserDocument, options);
        }
export type GetPendingWorkspaceInvitesForUserQueryHookResult = ReturnType<typeof useGetPendingWorkspaceInvitesForUserQuery>;
export type GetPendingWorkspaceInvitesForUserLazyQueryHookResult = ReturnType<typeof useGetPendingWorkspaceInvitesForUserLazyQuery>;
export type GetPendingWorkspaceInvitesForUserQueryResult = Apollo.QueryResult<GetPendingWorkspaceInvitesForUserQuery, GetPendingWorkspaceInvitesForUserQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;