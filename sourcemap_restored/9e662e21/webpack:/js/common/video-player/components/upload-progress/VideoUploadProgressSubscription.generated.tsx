import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VideoUploadProgressUpdatedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  listenForTranscodedVideo?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type VideoUploadProgressUpdatedSubscription = { __typename: 'Subscription', videoUploadProgressUpdated: { __typename: 'VideoUploadProgress', videoId: string, progress: number, thumbUrl: string | null, videoUploadValid: boolean | null, videoUploadMessage: string | null, isTranscoded: boolean | null, done: boolean | null, noUpload: boolean | null, packetsTotal: number | null } | null };


export const VideoUploadProgressUpdatedDocument = gql`
    subscription VideoUploadProgressUpdated($videoId: ID!, $listenForTranscodedVideo: Boolean) {
  videoUploadProgressUpdated(
    videoId: $videoId
    listenForTranscodedVideo: $listenForTranscodedVideo
  ) {
    videoId
    progress
    thumbUrl
    videoUploadValid
    videoUploadMessage
    isTranscoded
    done
    noUpload
    packetsTotal
  }
}
    `;

/**
 * __useVideoUploadProgressUpdatedSubscription__
 *
 * To run a query within a React component, call `useVideoUploadProgressUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVideoUploadProgressUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoUploadProgressUpdatedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      listenForTranscodedVideo: // value for 'listenForTranscodedVideo'
 *   },
 * });
 */
export function useVideoUploadProgressUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<VideoUploadProgressUpdatedSubscription, VideoUploadProgressUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VideoUploadProgressUpdatedSubscription, VideoUploadProgressUpdatedSubscriptionVariables>(VideoUploadProgressUpdatedDocument, options);
      }
export type VideoUploadProgressUpdatedSubscriptionHookResult = ReturnType<typeof useVideoUploadProgressUpdatedSubscription>;
export type VideoUploadProgressUpdatedSubscriptionResult = Apollo.SubscriptionResult<VideoUploadProgressUpdatedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;