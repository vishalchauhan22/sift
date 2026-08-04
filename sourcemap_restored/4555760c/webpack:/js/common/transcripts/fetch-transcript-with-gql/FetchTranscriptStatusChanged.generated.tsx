import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchTranscriptStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type FetchTranscriptStatusChangedSubscription = { __typename: 'Subscription', transcriptStatus: { __typename: 'TranscriptStatusResponse', status: string } };


export const FetchTranscriptStatusChangedDocument = gql`
    subscription FetchTranscriptStatusChanged($videoId: ID!) {
  transcriptStatus(videoId: $videoId) {
    status
  }
}
    `;

/**
 * __useFetchTranscriptStatusChangedSubscription__
 *
 * To run a query within a React component, call `useFetchTranscriptStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFetchTranscriptStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTranscriptStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useFetchTranscriptStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FetchTranscriptStatusChangedSubscription, FetchTranscriptStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FetchTranscriptStatusChangedSubscription, FetchTranscriptStatusChangedSubscriptionVariables>(FetchTranscriptStatusChangedDocument, options);
      }
export type FetchTranscriptStatusChangedSubscriptionHookResult = ReturnType<typeof useFetchTranscriptStatusChangedSubscription>;
export type FetchTranscriptStatusChangedSubscriptionResult = Apollo.SubscriptionResult<FetchTranscriptStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;