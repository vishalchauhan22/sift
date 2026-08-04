import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetGroupsWithPublicContentPermissionsQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
  withContentPermissions: Types.ContentVisibilityProperty;
}>;


export type GetGroupsWithPublicContentPermissionsQuery = { __typename: 'Query', getWorkspaceGroupsForWorkspace: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'getWorkspaceGroupsPayload', results: Array<{ __typename: 'WorkspaceGroup', id: string, name: string, members: Array<{ __typename: 'WorkspaceGroupMember', id: string, user_id: string }> }> } | null };


export const GetGroupsWithPublicContentPermissionsDocument = gql`
    query GetGroupsWithPublicContentPermissions($workspaceId: ID!, $withContentPermissions: ContentVisibilityProperty!) {
  getWorkspaceGroupsForWorkspace(
    workspaceId: $workspaceId
    withContentPermissions: $withContentPermissions
  ) {
    ... on getWorkspaceGroupsPayload {
      results {
        id
        name
        members {
          id
          user_id
        }
      }
    }
  }
}
    `;

/**
 * __useGetGroupsWithPublicContentPermissionsQuery__
 *
 * To run a query within a React component, call `useGetGroupsWithPublicContentPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupsWithPublicContentPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupsWithPublicContentPermissionsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      withContentPermissions: // value for 'withContentPermissions'
 *   },
 * });
 */
export function useGetGroupsWithPublicContentPermissionsQuery(baseOptions: Apollo.QueryHookOptions<GetGroupsWithPublicContentPermissionsQuery, GetGroupsWithPublicContentPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupsWithPublicContentPermissionsQuery, GetGroupsWithPublicContentPermissionsQueryVariables>(GetGroupsWithPublicContentPermissionsDocument, options);
      }
export function useGetGroupsWithPublicContentPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupsWithPublicContentPermissionsQuery, GetGroupsWithPublicContentPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupsWithPublicContentPermissionsQuery, GetGroupsWithPublicContentPermissionsQueryVariables>(GetGroupsWithPublicContentPermissionsDocument, options);
        }
export type GetGroupsWithPublicContentPermissionsQueryHookResult = ReturnType<typeof useGetGroupsWithPublicContentPermissionsQuery>;
export type GetGroupsWithPublicContentPermissionsLazyQueryHookResult = ReturnType<typeof useGetGroupsWithPublicContentPermissionsLazyQuery>;
export type GetGroupsWithPublicContentPermissionsQueryResult = Apollo.QueryResult<GetGroupsWithPublicContentPermissionsQuery, GetGroupsWithPublicContentPermissionsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;