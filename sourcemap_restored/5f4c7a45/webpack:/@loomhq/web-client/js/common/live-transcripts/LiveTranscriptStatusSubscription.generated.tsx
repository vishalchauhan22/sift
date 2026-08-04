import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LiveTranscriptUpdatedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type LiveTranscriptUpdatedSubscription = { __typename: 'Subscription', liveTranscriptEvent: { __typename: 'LiveTranscriptStatus', status: Types.LiveTranscriptStatusType | null } | null };


export const LiveTranscriptUpdatedDocument = gql`
    subscription LiveTranscriptUpdated($videoId: ID!) {
  liveTranscriptEvent(videoId: $videoId) {
    status
  }
}
    `;

/**
 * __useLiveTranscriptUpdatedSubscription__
 *
 * To run a query within a React component, call `useLiveTranscriptUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLiveTranscriptUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiveTranscriptUpdatedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useLiveTranscriptUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<LiveTranscriptUpdatedSubscription, LiveTranscriptUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LiveTranscriptUpdatedSubscription, LiveTranscriptUpdatedSubscriptionVariables>(LiveTranscriptUpdatedDocument, options);
      }
export type LiveTranscriptUpdatedSubscriptionHookResult = ReturnType<typeof useLiveTranscriptUpdatedSubscription>;
export type LiveTranscriptUpdatedSubscriptionResult = Apollo.SubscriptionResult<LiveTranscriptUpdatedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;