import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUpgradeWorkspaceRequestStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUpgradeWorkspaceRequestStatusQuery = { __typename: 'Query', getUpgradeWorkspaceRequestStatus: { __typename: 'GenericError' } | { __typename: 'GetUpgradeWorkspaceRequestStatusPayload', status: Types.RequestToUpgradeWorkspaceStatusType | null } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetUpgradeWorkspaceRequestStatusDocument = gql`
    query GetUpgradeWorkspaceRequestStatus {
  getUpgradeWorkspaceRequestStatus {
    ... on GetUpgradeWorkspaceRequestStatusPayload {
      status
    }
  }
}
    `;

/**
 * __useGetUpgradeWorkspaceRequestStatusQuery__
 *
 * To run a query within a React component, call `useGetUpgradeWorkspaceRequestStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpgradeWorkspaceRequestStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpgradeWorkspaceRequestStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpgradeWorkspaceRequestStatusQuery(baseOptions?: Apollo.QueryHookOptions<GetUpgradeWorkspaceRequestStatusQuery, GetUpgradeWorkspaceRequestStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpgradeWorkspaceRequestStatusQuery, GetUpgradeWorkspaceRequestStatusQueryVariables>(GetUpgradeWorkspaceRequestStatusDocument, options);
      }
export function useGetUpgradeWorkspaceRequestStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpgradeWorkspaceRequestStatusQuery, GetUpgradeWorkspaceRequestStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpgradeWorkspaceRequestStatusQuery, GetUpgradeWorkspaceRequestStatusQueryVariables>(GetUpgradeWorkspaceRequestStatusDocument, options);
        }
export type GetUpgradeWorkspaceRequestStatusQueryHookResult = ReturnType<typeof useGetUpgradeWorkspaceRequestStatusQuery>;
export type GetUpgradeWorkspaceRequestStatusLazyQueryHookResult = ReturnType<typeof useGetUpgradeWorkspaceRequestStatusLazyQuery>;
export type GetUpgradeWorkspaceRequestStatusQueryResult = Apollo.QueryResult<GetUpgradeWorkspaceRequestStatusQuery, GetUpgradeWorkspaceRequestStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;