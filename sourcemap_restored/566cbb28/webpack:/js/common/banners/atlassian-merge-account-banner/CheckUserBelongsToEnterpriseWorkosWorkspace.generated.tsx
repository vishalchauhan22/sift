import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckUserBelongsToEnterpriseWorkosWorkspaceQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckUserBelongsToEnterpriseWorkosWorkspaceQuery = { __typename: 'Query', checkUserBelongsToEnterpriseWorkosWorkspace: { __typename: 'CheckUserBelongsToEnterpriseWorkosWorkspace', result: boolean | null } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const CheckUserBelongsToEnterpriseWorkosWorkspaceDocument = gql`
    query CheckUserBelongsToEnterpriseWorkosWorkspace {
  checkUserBelongsToEnterpriseWorkosWorkspace {
    __typename
    ... on CheckUserBelongsToEnterpriseWorkosWorkspace {
      result
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery__
 *
 * To run a query within a React component, call `useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery(baseOptions?: Apollo.QueryHookOptions<CheckUserBelongsToEnterpriseWorkosWorkspaceQuery, CheckUserBelongsToEnterpriseWorkosWorkspaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserBelongsToEnterpriseWorkosWorkspaceQuery, CheckUserBelongsToEnterpriseWorkosWorkspaceQueryVariables>(CheckUserBelongsToEnterpriseWorkosWorkspaceDocument, options);
      }
export function useCheckUserBelongsToEnterpriseWorkosWorkspaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserBelongsToEnterpriseWorkosWorkspaceQuery, CheckUserBelongsToEnterpriseWorkosWorkspaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserBelongsToEnterpriseWorkosWorkspaceQuery, CheckUserBelongsToEnterpriseWorkosWorkspaceQueryVariables>(CheckUserBelongsToEnterpriseWorkosWorkspaceDocument, options);
        }
export type CheckUserBelongsToEnterpriseWorkosWorkspaceQueryHookResult = ReturnType<typeof useCheckUserBelongsToEnterpriseWorkosWorkspaceQuery>;
export type CheckUserBelongsToEnterpriseWorkosWorkspaceLazyQueryHookResult = ReturnType<typeof useCheckUserBelongsToEnterpriseWorkosWorkspaceLazyQuery>;
export type CheckUserBelongsToEnterpriseWorkosWorkspaceQueryResult = Apollo.QueryResult<CheckUserBelongsToEnterpriseWorkosWorkspaceQuery, CheckUserBelongsToEnterpriseWorkosWorkspaceQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;