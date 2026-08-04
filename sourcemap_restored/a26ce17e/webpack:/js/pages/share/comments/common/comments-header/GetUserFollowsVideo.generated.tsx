import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserFollowsVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['String']['input'];
}>;


export type GetUserFollowsVideoQuery = { __typename: 'Query', result: { __typename: 'GenericError', message: string } | { __typename: 'UserFollowsStream', id: string | null, follow: boolean | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetUserFollowsVideoDocument = gql`
    query GetUserFollowsVideo($videoId: String!) {
  result: getUserFollowsVideo(videoId: $videoId) {
    ... on UserFollowsStream {
      id
      follow
    }
    ... on GenericError {
      message
    }
    __typename
  }
}
    `;

/**
 * __useGetUserFollowsVideoQuery__
 *
 * To run a query within a React component, call `useGetUserFollowsVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFollowsVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFollowsVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetUserFollowsVideoQuery(baseOptions: Apollo.QueryHookOptions<GetUserFollowsVideoQuery, GetUserFollowsVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFollowsVideoQuery, GetUserFollowsVideoQueryVariables>(GetUserFollowsVideoDocument, options);
      }
export function useGetUserFollowsVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFollowsVideoQuery, GetUserFollowsVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFollowsVideoQuery, GetUserFollowsVideoQueryVariables>(GetUserFollowsVideoDocument, options);
        }
export type GetUserFollowsVideoQueryHookResult = ReturnType<typeof useGetUserFollowsVideoQuery>;
export type GetUserFollowsVideoLazyQueryHookResult = ReturnType<typeof useGetUserFollowsVideoLazyQuery>;
export type GetUserFollowsVideoQueryResult = Apollo.QueryResult<GetUserFollowsVideoQuery, GetUserFollowsVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;