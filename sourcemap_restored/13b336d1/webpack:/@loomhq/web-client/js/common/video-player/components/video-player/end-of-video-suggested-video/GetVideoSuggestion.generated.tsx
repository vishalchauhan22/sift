import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoSuggestionQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoSuggestionQuery = { __typename: 'Query', getVideoSuggestion: { __typename: 'GenericError', message: string, error: string | null } | { __typename: 'VideoSuggestionPayload', url: string, title: string, thumbnail: string, length: number, id: string } | null };


export const GetVideoSuggestionDocument = gql`
    query GetVideoSuggestion($videoId: ID!) {
  getVideoSuggestion(videoId: $videoId) {
    __typename
    ... on VideoSuggestionPayload {
      url
      title
      thumbnail
      length
      id
      __typename
    }
    ... on GenericError {
      message
      error
    }
  }
}
    `;

/**
 * __useGetVideoSuggestionQuery__
 *
 * To run a query within a React component, call `useGetVideoSuggestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoSuggestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoSuggestionQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoSuggestionQuery(baseOptions: Apollo.QueryHookOptions<GetVideoSuggestionQuery, GetVideoSuggestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoSuggestionQuery, GetVideoSuggestionQueryVariables>(GetVideoSuggestionDocument, options);
      }
export function useGetVideoSuggestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoSuggestionQuery, GetVideoSuggestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoSuggestionQuery, GetVideoSuggestionQueryVariables>(GetVideoSuggestionDocument, options);
        }
export type GetVideoSuggestionQueryHookResult = ReturnType<typeof useGetVideoSuggestionQuery>;
export type GetVideoSuggestionLazyQueryHookResult = ReturnType<typeof useGetVideoSuggestionLazyQuery>;
export type GetVideoSuggestionQueryResult = Apollo.QueryResult<GetVideoSuggestionQuery, GetVideoSuggestionQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;