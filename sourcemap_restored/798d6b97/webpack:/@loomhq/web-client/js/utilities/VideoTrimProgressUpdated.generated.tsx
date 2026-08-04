import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VideoTrimProgressUpdatedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type VideoTrimProgressUpdatedSubscription = { __typename: 'Subscription', videoTrimProgressUpdated: { __typename: 'VideoTrimProgress', progress: number | null, transcodedUrl: string | null } | null };


export const VideoTrimProgressUpdatedDocument = gql`
    subscription VideoTrimProgressUpdated($videoId: ID!) {
  videoTrimProgressUpdated(videoId: $videoId) {
    progress
    transcodedUrl
  }
}
    `;

/**
 * __useVideoTrimProgressUpdatedSubscription__
 *
 * To run a query within a React component, call `useVideoTrimProgressUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVideoTrimProgressUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoTrimProgressUpdatedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useVideoTrimProgressUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<VideoTrimProgressUpdatedSubscription, VideoTrimProgressUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VideoTrimProgressUpdatedSubscription, VideoTrimProgressUpdatedSubscriptionVariables>(VideoTrimProgressUpdatedDocument, options);
      }
export type VideoTrimProgressUpdatedSubscriptionHookResult = ReturnType<typeof useVideoTrimProgressUpdatedSubscription>;
export type VideoTrimProgressUpdatedSubscriptionResult = Apollo.SubscriptionResult<VideoTrimProgressUpdatedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;