import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserWatchLaterListCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserWatchLaterListCountQuery = { __typename: 'Query', result: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'WatchLaterListVideoCount', unwatchedCount: number | null } | null };


export const GetUserWatchLaterListCountDocument = gql`
    query GetUserWatchLaterListCount {
  result: getUserWatchLaterListCount {
    ... on WatchLaterListVideoCount {
      unwatchedCount
    }
  }
}
    `;

/**
 * __useGetUserWatchLaterListCountQuery__
 *
 * To run a query within a React component, call `useGetUserWatchLaterListCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWatchLaterListCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWatchLaterListCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserWatchLaterListCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUserWatchLaterListCountQuery, GetUserWatchLaterListCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWatchLaterListCountQuery, GetUserWatchLaterListCountQueryVariables>(GetUserWatchLaterListCountDocument, options);
      }
export function useGetUserWatchLaterListCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWatchLaterListCountQuery, GetUserWatchLaterListCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWatchLaterListCountQuery, GetUserWatchLaterListCountQueryVariables>(GetUserWatchLaterListCountDocument, options);
        }
export type GetUserWatchLaterListCountQueryHookResult = ReturnType<typeof useGetUserWatchLaterListCountQuery>;
export type GetUserWatchLaterListCountLazyQueryHookResult = ReturnType<typeof useGetUserWatchLaterListCountLazyQuery>;
export type GetUserWatchLaterListCountQueryResult = Apollo.QueryResult<GetUserWatchLaterListCountQuery, GetUserWatchLaterListCountQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;