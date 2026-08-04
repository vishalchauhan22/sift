import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TranscriptStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type TranscriptStatusChangedSubscription = { __typename: 'Subscription', transcriptStatus: { __typename: 'TranscriptStatusResponse', status: string } };


export const TranscriptStatusChangedDocument = gql`
    subscription TranscriptStatusChanged($videoId: ID!) {
  transcriptStatus(videoId: $videoId) {
    status
  }
}
    `;

/**
 * __useTranscriptStatusChangedSubscription__
 *
 * To run a query within a React component, call `useTranscriptStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTranscriptStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranscriptStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useTranscriptStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<TranscriptStatusChangedSubscription, TranscriptStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TranscriptStatusChangedSubscription, TranscriptStatusChangedSubscriptionVariables>(TranscriptStatusChangedDocument, options);
      }
export type TranscriptStatusChangedSubscriptionHookResult = ReturnType<typeof useTranscriptStatusChangedSubscription>;
export type TranscriptStatusChangedSubscriptionResult = Apollo.SubscriptionResult<TranscriptStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;