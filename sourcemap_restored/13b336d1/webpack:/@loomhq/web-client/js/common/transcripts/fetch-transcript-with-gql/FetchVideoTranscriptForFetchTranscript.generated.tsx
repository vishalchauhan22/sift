import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchVideoTranscriptForFetchTranscriptQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchVideoTranscriptForFetchTranscriptQuery = { __typename: 'Query', fetchVideoTranscript: { __typename: 'GenericError', message: string } | { __typename: 'VideoTranscriptDetails', idv2: string, video_id: string, s3_id: string, version: number, transcript_url: string | null, captions_url: string | null, processing_service: Types.ProcessingServices, transcription_status: Types.TranscriptionStatuses, processing_start_time: string | null, processing_end_time: string | null, createdAt: string, updatedAt: string, source_url: string | null, captions_source_url: string | null, language: Types.Language | null } };


export const FetchVideoTranscriptForFetchTranscriptDocument = gql`
    query FetchVideoTranscriptForFetchTranscript($videoId: ID!, $password: String) {
  fetchVideoTranscript(videoId: $videoId, password: $password) {
    ... on VideoTranscriptDetails {
      idv2
      video_id
      s3_id
      version
      transcript_url
      captions_url
      processing_service
      transcription_status
      processing_start_time
      processing_end_time
      createdAt
      updatedAt
      source_url
      captions_source_url
      language
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useFetchVideoTranscriptForFetchTranscriptQuery__
 *
 * To run a query within a React component, call `useFetchVideoTranscriptForFetchTranscriptQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchVideoTranscriptForFetchTranscriptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchVideoTranscriptForFetchTranscriptQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFetchVideoTranscriptForFetchTranscriptQuery(baseOptions: Apollo.QueryHookOptions<FetchVideoTranscriptForFetchTranscriptQuery, FetchVideoTranscriptForFetchTranscriptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchVideoTranscriptForFetchTranscriptQuery, FetchVideoTranscriptForFetchTranscriptQueryVariables>(FetchVideoTranscriptForFetchTranscriptDocument, options);
      }
export function useFetchVideoTranscriptForFetchTranscriptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchVideoTranscriptForFetchTranscriptQuery, FetchVideoTranscriptForFetchTranscriptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchVideoTranscriptForFetchTranscriptQuery, FetchVideoTranscriptForFetchTranscriptQueryVariables>(FetchVideoTranscriptForFetchTranscriptDocument, options);
        }
export type FetchVideoTranscriptForFetchTranscriptQueryHookResult = ReturnType<typeof useFetchVideoTranscriptForFetchTranscriptQuery>;
export type FetchVideoTranscriptForFetchTranscriptLazyQueryHookResult = ReturnType<typeof useFetchVideoTranscriptForFetchTranscriptLazyQuery>;
export type FetchVideoTranscriptForFetchTranscriptQueryResult = Apollo.QueryResult<FetchVideoTranscriptForFetchTranscriptQuery, FetchVideoTranscriptForFetchTranscriptQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;