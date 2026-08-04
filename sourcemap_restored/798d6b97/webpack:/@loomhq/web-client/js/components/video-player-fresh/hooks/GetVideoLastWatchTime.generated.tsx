import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoLastWatchTimeQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoLastWatchTimeQuery = { __typename: 'Query', getLastWatchTime: { __typename: 'GenericError', message: string } | { __typename: 'GetLastWatchTimePayload', lastWatchTime: number | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetVideoLastWatchTimeDocument = gql`
    query GetVideoLastWatchTime($videoId: ID!) {
  getLastWatchTime(videoId: $videoId) {
    ... on GetLastWatchTimePayload {
      lastWatchTime
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetVideoLastWatchTimeQuery__
 *
 * To run a query within a React component, call `useGetVideoLastWatchTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoLastWatchTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoLastWatchTimeQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoLastWatchTimeQuery(baseOptions: Apollo.QueryHookOptions<GetVideoLastWatchTimeQuery, GetVideoLastWatchTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoLastWatchTimeQuery, GetVideoLastWatchTimeQueryVariables>(GetVideoLastWatchTimeDocument, options);
      }
export function useGetVideoLastWatchTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoLastWatchTimeQuery, GetVideoLastWatchTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoLastWatchTimeQuery, GetVideoLastWatchTimeQueryVariables>(GetVideoLastWatchTimeDocument, options);
        }
export type GetVideoLastWatchTimeQueryHookResult = ReturnType<typeof useGetVideoLastWatchTimeQuery>;
export type GetVideoLastWatchTimeLazyQueryHookResult = ReturnType<typeof useGetVideoLastWatchTimeLazyQuery>;
export type GetVideoLastWatchTimeQueryResult = Apollo.QueryResult<GetVideoLastWatchTimeQuery, GetVideoLastWatchTimeQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;