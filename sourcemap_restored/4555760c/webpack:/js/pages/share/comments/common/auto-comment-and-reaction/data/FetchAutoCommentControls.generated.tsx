import * as Types from '../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchAutoCommentDisplayControlsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['String']['input'];
}>;


export type FetchAutoCommentDisplayControlsQuery = { __typename: 'Query', fetchAutoCommentDisplayControls: { __typename: 'CreatorExperiencePayload', videoDuration: number, videoCreatedAt: string, showCommentToCreator: boolean, showFirstEmoji: boolean, showSecondEmoji: boolean } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError' } | { __typename: 'NoAutoCommentControlsFoundPayload', videoDuration: number, videoCreatedAt: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const FetchAutoCommentDisplayControlsDocument = gql`
    query FetchAutoCommentDisplayControls($videoId: String!) {
  fetchAutoCommentDisplayControls(videoId: $videoId) {
    __typename
    ... on NoAutoCommentControlsFoundPayload {
      videoDuration
      videoCreatedAt
    }
    ... on CreatorExperiencePayload {
      videoDuration
      videoCreatedAt
      showCommentToCreator
      showFirstEmoji
      showSecondEmoji
    }
    ... on GenericError {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
  }
}
    `;

/**
 * __useFetchAutoCommentDisplayControlsQuery__
 *
 * To run a query within a React component, call `useFetchAutoCommentDisplayControlsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAutoCommentDisplayControlsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAutoCommentDisplayControlsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useFetchAutoCommentDisplayControlsQuery(baseOptions: Apollo.QueryHookOptions<FetchAutoCommentDisplayControlsQuery, FetchAutoCommentDisplayControlsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAutoCommentDisplayControlsQuery, FetchAutoCommentDisplayControlsQueryVariables>(FetchAutoCommentDisplayControlsDocument, options);
      }
export function useFetchAutoCommentDisplayControlsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAutoCommentDisplayControlsQuery, FetchAutoCommentDisplayControlsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAutoCommentDisplayControlsQuery, FetchAutoCommentDisplayControlsQueryVariables>(FetchAutoCommentDisplayControlsDocument, options);
        }
export type FetchAutoCommentDisplayControlsQueryHookResult = ReturnType<typeof useFetchAutoCommentDisplayControlsQuery>;
export type FetchAutoCommentDisplayControlsLazyQueryHookResult = ReturnType<typeof useFetchAutoCommentDisplayControlsLazyQuery>;
export type FetchAutoCommentDisplayControlsQueryResult = Apollo.QueryResult<FetchAutoCommentDisplayControlsQuery, FetchAutoCommentDisplayControlsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;