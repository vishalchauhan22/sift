import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLiveTranscriptQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetLiveTranscriptQuery = { __typename: 'Query', fetchLiveTranscript: { __typename: 'GenericError', message: string } | { __typename: 'LiveTranscript', schemaVersion: string | null, phrases: Array<{ __typename: 'Phrase', ts: number | null, value: string | null, speakerName: string | null, ranges: Array<{ __typename: 'PhraseRange', start: number | null, length: number | null, type: Types.PhraseRangeType | null, source: { __typename: 'TranscriptElementIndex', monologue: number | null, element: number | null, elementId: string | null, clipId: string | null } | null }> | null }> | null } | { __typename: 'LiveTranscriptNotReady', message: string, reason: string } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetLiveTranscriptDocument = gql`
    query GetLiveTranscript($videoId: ID!) {
  fetchLiveTranscript(videoId: $videoId) {
    ... on LiveTranscript {
      phrases {
        ts
        value
        speakerName
        ranges {
          start
          length
          source {
            monologue
            element
            elementId
            clipId
          }
          type
        }
      }
      schemaVersion
    }
    ... on LiveTranscriptNotReady {
      message
      reason
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetLiveTranscriptQuery__
 *
 * To run a query within a React component, call `useGetLiveTranscriptQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiveTranscriptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiveTranscriptQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetLiveTranscriptQuery(baseOptions: Apollo.QueryHookOptions<GetLiveTranscriptQuery, GetLiveTranscriptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiveTranscriptQuery, GetLiveTranscriptQueryVariables>(GetLiveTranscriptDocument, options);
      }
export function useGetLiveTranscriptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiveTranscriptQuery, GetLiveTranscriptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiveTranscriptQuery, GetLiveTranscriptQueryVariables>(GetLiveTranscriptDocument, options);
        }
export type GetLiveTranscriptQueryHookResult = ReturnType<typeof useGetLiveTranscriptQuery>;
export type GetLiveTranscriptLazyQueryHookResult = ReturnType<typeof useGetLiveTranscriptLazyQuery>;
export type GetLiveTranscriptQueryResult = Apollo.QueryResult<GetLiveTranscriptQuery, GetLiveTranscriptQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;