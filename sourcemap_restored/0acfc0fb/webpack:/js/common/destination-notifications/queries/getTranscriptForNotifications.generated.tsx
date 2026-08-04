import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTranscriptForNotificationQueryVariables = Types.Exact<{
  videoId: Types.Scalars['String']['input'];
  timestamp: Types.Scalars['Float']['input'];
}>;


export type GetTranscriptForNotificationQuery = { __typename: 'Query', getTranscriptForNotification: { __typename: 'GenericError' } | { __typename: 'GetTranscriptForNotificationPayload', transcript: { __typename: 'TranscriptChunk', ts: string | null, value: string | null } | null, nextTranscript: { __typename: 'TranscriptChunk', ts: string | null, value: string | null } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetTranscriptForNotificationDocument = gql`
    query GetTranscriptForNotification($videoId: String!, $timestamp: Float!) {
  getTranscriptForNotification(videoId: $videoId, timestamp: $timestamp) {
    __typename
    ... on GetTranscriptForNotificationPayload {
      transcript {
        ts
        value
      }
      nextTranscript {
        ts
        value
      }
    }
  }
}
    `;

/**
 * __useGetTranscriptForNotificationQuery__
 *
 * To run a query within a React component, call `useGetTranscriptForNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranscriptForNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranscriptForNotificationQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useGetTranscriptForNotificationQuery(baseOptions: Apollo.QueryHookOptions<GetTranscriptForNotificationQuery, GetTranscriptForNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTranscriptForNotificationQuery, GetTranscriptForNotificationQueryVariables>(GetTranscriptForNotificationDocument, options);
      }
export function useGetTranscriptForNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTranscriptForNotificationQuery, GetTranscriptForNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTranscriptForNotificationQuery, GetTranscriptForNotificationQueryVariables>(GetTranscriptForNotificationDocument, options);
        }
export type GetTranscriptForNotificationQueryHookResult = ReturnType<typeof useGetTranscriptForNotificationQuery>;
export type GetTranscriptForNotificationLazyQueryHookResult = ReturnType<typeof useGetTranscriptForNotificationLazyQuery>;
export type GetTranscriptForNotificationQueryResult = Apollo.QueryResult<GetTranscriptForNotificationQuery, GetTranscriptForNotificationQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;