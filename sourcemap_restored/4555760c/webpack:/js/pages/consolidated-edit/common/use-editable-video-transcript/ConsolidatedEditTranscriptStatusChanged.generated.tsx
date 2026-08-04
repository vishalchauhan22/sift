import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditTranscriptStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ConsolidatedEditTranscriptStatusChangedSubscription = { __typename: 'Subscription', transcriptStatus: { __typename: 'TranscriptStatusResponse', status: string } };


export const ConsolidatedEditTranscriptStatusChangedDocument = gql`
    subscription ConsolidatedEditTranscriptStatusChanged($videoId: ID!) {
  transcriptStatus(videoId: $videoId) {
    status
  }
}
    `;

/**
 * __useConsolidatedEditTranscriptStatusChangedSubscription__
 *
 * To run a query within a React component, call `useConsolidatedEditTranscriptStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditTranscriptStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditTranscriptStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useConsolidatedEditTranscriptStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ConsolidatedEditTranscriptStatusChangedSubscription, ConsolidatedEditTranscriptStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConsolidatedEditTranscriptStatusChangedSubscription, ConsolidatedEditTranscriptStatusChangedSubscriptionVariables>(ConsolidatedEditTranscriptStatusChangedDocument, options);
      }
export type ConsolidatedEditTranscriptStatusChangedSubscriptionHookResult = ReturnType<typeof useConsolidatedEditTranscriptStatusChangedSubscription>;
export type ConsolidatedEditTranscriptStatusChangedSubscriptionResult = Apollo.SubscriptionResult<ConsolidatedEditTranscriptStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;