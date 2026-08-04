import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OnRecordingCompletedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type OnRecordingCompletedSubscription = { __typename: 'Subscription', recordingCompleted: boolean };


export const OnRecordingCompletedDocument = gql`
    subscription OnRecordingCompleted($videoId: ID!) {
  recordingCompleted(id: $videoId)
}
    `;

/**
 * __useOnRecordingCompletedSubscription__
 *
 * To run a query within a React component, call `useOnRecordingCompletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnRecordingCompletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnRecordingCompletedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useOnRecordingCompletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnRecordingCompletedSubscription, OnRecordingCompletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnRecordingCompletedSubscription, OnRecordingCompletedSubscriptionVariables>(OnRecordingCompletedDocument, options);
      }
export type OnRecordingCompletedSubscriptionHookResult = ReturnType<typeof useOnRecordingCompletedSubscription>;
export type OnRecordingCompletedSubscriptionResult = Apollo.SubscriptionResult<OnRecordingCompletedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;