import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditGetTranscriptStatusQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetTranscriptStatusQuery = { __typename: 'Query', fetchVideoTranscript: { __typename: 'GenericError', message: string } | { __typename: 'VideoTranscriptDetails', idv2: string, video_id: string, transcription_status: Types.TranscriptionStatuses } };


export const ConsolidatedEditGetTranscriptStatusDocument = gql`
    query ConsolidatedEditGetTranscriptStatus($videoId: ID!, $password: String) {
  fetchVideoTranscript(videoId: $videoId, password: $password) {
    ... on VideoTranscriptDetails {
      idv2
      video_id
      transcription_status
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useConsolidatedEditGetTranscriptStatusQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetTranscriptStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetTranscriptStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetTranscriptStatusQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetTranscriptStatusQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetTranscriptStatusQuery, ConsolidatedEditGetTranscriptStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetTranscriptStatusQuery, ConsolidatedEditGetTranscriptStatusQueryVariables>(ConsolidatedEditGetTranscriptStatusDocument, options);
      }
export function useConsolidatedEditGetTranscriptStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetTranscriptStatusQuery, ConsolidatedEditGetTranscriptStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetTranscriptStatusQuery, ConsolidatedEditGetTranscriptStatusQueryVariables>(ConsolidatedEditGetTranscriptStatusDocument, options);
        }
export type ConsolidatedEditGetTranscriptStatusQueryHookResult = ReturnType<typeof useConsolidatedEditGetTranscriptStatusQuery>;
export type ConsolidatedEditGetTranscriptStatusLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetTranscriptStatusLazyQuery>;
export type ConsolidatedEditGetTranscriptStatusQueryResult = Apollo.QueryResult<ConsolidatedEditGetTranscriptStatusQuery, ConsolidatedEditGetTranscriptStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;