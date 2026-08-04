import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchTranscriptStatusForFetchTranscriptQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchTranscriptStatusForFetchTranscriptQuery = { __typename: 'Query', fetchVideoTranscript: { __typename: 'GenericError', message: string } | { __typename: 'VideoTranscriptDetails', idv2: string, video_id: string, transcription_status: Types.TranscriptionStatuses } };


export const FetchTranscriptStatusForFetchTranscriptDocument = gql`
    query FetchTranscriptStatusForFetchTranscript($videoId: ID!, $password: String) {
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
 * __useFetchTranscriptStatusForFetchTranscriptQuery__
 *
 * To run a query within a React component, call `useFetchTranscriptStatusForFetchTranscriptQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTranscriptStatusForFetchTranscriptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTranscriptStatusForFetchTranscriptQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFetchTranscriptStatusForFetchTranscriptQuery(baseOptions: Apollo.QueryHookOptions<FetchTranscriptStatusForFetchTranscriptQuery, FetchTranscriptStatusForFetchTranscriptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTranscriptStatusForFetchTranscriptQuery, FetchTranscriptStatusForFetchTranscriptQueryVariables>(FetchTranscriptStatusForFetchTranscriptDocument, options);
      }
export function useFetchTranscriptStatusForFetchTranscriptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTranscriptStatusForFetchTranscriptQuery, FetchTranscriptStatusForFetchTranscriptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTranscriptStatusForFetchTranscriptQuery, FetchTranscriptStatusForFetchTranscriptQueryVariables>(FetchTranscriptStatusForFetchTranscriptDocument, options);
        }
export type FetchTranscriptStatusForFetchTranscriptQueryHookResult = ReturnType<typeof useFetchTranscriptStatusForFetchTranscriptQuery>;
export type FetchTranscriptStatusForFetchTranscriptLazyQueryHookResult = ReturnType<typeof useFetchTranscriptStatusForFetchTranscriptLazyQuery>;
export type FetchTranscriptStatusForFetchTranscriptQueryResult = Apollo.QueryResult<FetchTranscriptStatusForFetchTranscriptQuery, FetchTranscriptStatusForFetchTranscriptQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;