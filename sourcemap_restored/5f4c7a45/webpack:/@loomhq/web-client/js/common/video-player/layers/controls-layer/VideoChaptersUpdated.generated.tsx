import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VideoChaptersUpdatedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type VideoChaptersUpdatedSubscription = { __typename: 'Subscription', videoChaptersUpdated: { __typename: 'VideoChapters', id: string, video_id: string, content: string | null, schema_version: string | null, updatedAt: string | null, edited_at: string | null, auto_chapter_status: Types.AutoChapterStatusesType | null } | null };


export const VideoChaptersUpdatedDocument = gql`
    subscription VideoChaptersUpdated($videoId: ID!, $password: String) {
  videoChaptersUpdated(videoId: $videoId, password: $password) {
    ... on VideoChapters {
      id
      video_id
      content
      schema_version
      updatedAt
      edited_at
      auto_chapter_status
    }
  }
}
    `;

/**
 * __useVideoChaptersUpdatedSubscription__
 *
 * To run a query within a React component, call `useVideoChaptersUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVideoChaptersUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoChaptersUpdatedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useVideoChaptersUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<VideoChaptersUpdatedSubscription, VideoChaptersUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VideoChaptersUpdatedSubscription, VideoChaptersUpdatedSubscriptionVariables>(VideoChaptersUpdatedDocument, options);
      }
export type VideoChaptersUpdatedSubscriptionHookResult = ReturnType<typeof useVideoChaptersUpdatedSubscription>;
export type VideoChaptersUpdatedSubscriptionResult = Apollo.SubscriptionResult<VideoChaptersUpdatedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;