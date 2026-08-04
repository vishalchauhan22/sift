import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoTrimProgressQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoTrimProgressQuery = { __typename: 'Query', getVideoTrimProgress: { __typename: 'VideoTrimProgress', progress: number | null } | null };


export const GetVideoTrimProgressDocument = gql`
    query GetVideoTrimProgress($videoId: ID!) {
  getVideoTrimProgress(videoId: $videoId) {
    progress
  }
}
    `;

/**
 * __useGetVideoTrimProgressQuery__
 *
 * To run a query within a React component, call `useGetVideoTrimProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoTrimProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoTrimProgressQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoTrimProgressQuery(baseOptions: Apollo.QueryHookOptions<GetVideoTrimProgressQuery, GetVideoTrimProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoTrimProgressQuery, GetVideoTrimProgressQueryVariables>(GetVideoTrimProgressDocument, options);
      }
export function useGetVideoTrimProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoTrimProgressQuery, GetVideoTrimProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoTrimProgressQuery, GetVideoTrimProgressQueryVariables>(GetVideoTrimProgressDocument, options);
        }
export type GetVideoTrimProgressQueryHookResult = ReturnType<typeof useGetVideoTrimProgressQuery>;
export type GetVideoTrimProgressLazyQueryHookResult = ReturnType<typeof useGetVideoTrimProgressLazyQuery>;
export type GetVideoTrimProgressQueryResult = Apollo.QueryResult<GetVideoTrimProgressQuery, GetVideoTrimProgressQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;