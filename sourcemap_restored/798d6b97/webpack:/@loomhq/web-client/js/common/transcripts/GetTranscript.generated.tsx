import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTranscriptQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  captionsLanguageSelection?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetTranscriptQuery = { __typename: 'Query', fetchVideoTranscript: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'VideoTranscriptDetails', idv2: string, video_id: string, s3_id: string, version: number, transcript_url: string | null, captions_url: string | null, processing_service: Types.ProcessingServices, transcription_status: Types.TranscriptionStatuses, processing_start_time: string | null, processing_end_time: string | null, createdAt: string, updatedAt: string, source_url: string | null, captions_source_url: string | null, captionsTranslatedLanguage: string | null, captionsInOriginalLanguage: boolean | null, captionsTranslationInProgress: boolean | null, captionTranslationErrorFallback: boolean | null, language: Types.Language | null } };


export const GetTranscriptDocument = gql`
    query GetTranscript($videoId: ID!, $password: String, $captionsLanguageSelection: String) {
  fetchVideoTranscript(
    videoId: $videoId
    password: $password
    captionsLanguageSelection: $captionsLanguageSelection
  ) {
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
      captionsTranslatedLanguage
      captionsInOriginalLanguage
      captionsTranslationInProgress
      captionTranslationErrorFallback
      language
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetTranscriptQuery__
 *
 * To run a query within a React component, call `useGetTranscriptQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranscriptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranscriptQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *      captionsLanguageSelection: // value for 'captionsLanguageSelection'
 *   },
 * });
 */
export function useGetTranscriptQuery(baseOptions: Apollo.QueryHookOptions<GetTranscriptQuery, GetTranscriptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTranscriptQuery, GetTranscriptQueryVariables>(GetTranscriptDocument, options);
      }
export function useGetTranscriptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTranscriptQuery, GetTranscriptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTranscriptQuery, GetTranscriptQueryVariables>(GetTranscriptDocument, options);
        }
export type GetTranscriptQueryHookResult = ReturnType<typeof useGetTranscriptQuery>;
export type GetTranscriptLazyQueryHookResult = ReturnType<typeof useGetTranscriptLazyQuery>;
export type GetTranscriptQueryResult = Apollo.QueryResult<GetTranscriptQuery, GetTranscriptQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;