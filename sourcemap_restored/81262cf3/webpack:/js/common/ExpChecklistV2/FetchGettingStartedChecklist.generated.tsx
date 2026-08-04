import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchGettingStartedChecklistQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchGettingStartedChecklistQuery = { __typename: 'Query', fetchGettingStartedChecklist: { __typename: 'GenericError' } | { __typename: 'GettingStartedChecklistPayload', id: string, add_teammate: boolean | null, complete_onboarding: boolean | null, create_account: boolean | null, customize_video_name: boolean | null, download_recorder: boolean | null, email_verified: boolean | null, filled_account_settings: boolean | null, first_cam_recording: boolean | null, first_video_recording: boolean | null, first_video_upload: boolean | null, first_video_viewed: boolean | null, followed_us_on_twitter: boolean | null, has_reached_recording_limit: boolean | null, has_viewed_screenshots: boolean | null, liked_us_on_facebook: boolean | null, push_notification_enabled: boolean | null, share_video: boolean | null, shared_first_video_on_facebook: boolean | null, tweeted_first_video: boolean | null, has_viewed_videos: boolean | null, meeting_recording: boolean | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const FetchGettingStartedChecklistDocument = gql`
    query fetchGettingStartedChecklist {
  fetchGettingStartedChecklist {
    __typename
    ... on GettingStartedChecklistPayload {
      id
      add_teammate
      complete_onboarding
      create_account
      customize_video_name
      download_recorder
      email_verified
      filled_account_settings
      first_cam_recording
      first_video_recording
      first_video_upload
      first_video_viewed
      followed_us_on_twitter
      has_reached_recording_limit
      has_viewed_screenshots
      liked_us_on_facebook
      push_notification_enabled
      share_video
      shared_first_video_on_facebook
      tweeted_first_video
      has_viewed_videos
      meeting_recording
    }
  }
}
    `;

/**
 * __useFetchGettingStartedChecklistQuery__
 *
 * To run a query within a React component, call `useFetchGettingStartedChecklistQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGettingStartedChecklistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGettingStartedChecklistQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchGettingStartedChecklistQuery(baseOptions?: Apollo.QueryHookOptions<FetchGettingStartedChecklistQuery, FetchGettingStartedChecklistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGettingStartedChecklistQuery, FetchGettingStartedChecklistQueryVariables>(FetchGettingStartedChecklistDocument, options);
      }
export function useFetchGettingStartedChecklistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGettingStartedChecklistQuery, FetchGettingStartedChecklistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGettingStartedChecklistQuery, FetchGettingStartedChecklistQueryVariables>(FetchGettingStartedChecklistDocument, options);
        }
export type FetchGettingStartedChecklistQueryHookResult = ReturnType<typeof useFetchGettingStartedChecklistQuery>;
export type FetchGettingStartedChecklistLazyQueryHookResult = ReturnType<typeof useFetchGettingStartedChecklistLazyQuery>;
export type FetchGettingStartedChecklistQueryResult = Apollo.QueryResult<FetchGettingStartedChecklistQuery, FetchGettingStartedChecklistQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;