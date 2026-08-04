import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoCardVisibilityFragmentFragmentDoc } from '../../components/video-card/VideoCardVisibilityFragment.generated';
import { VideoPlayerV2FragmentFragmentDoc } from '../../components/video-player-fresh/VideoPlayerV2Fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMostRecentVideoV2QueryVariables = Types.Exact<{
  startDate: Types.Scalars['String']['input'];
  endDate: Types.Scalars['String']['input'];
  offset: Types.Scalars['Int']['input'];
  limit: Types.Scalars['Int']['input'];
}>;


export type GetMostRecentVideoV2Query = { __typename: 'Query', recentUserVideos: Array<{ __typename: 'RegularUserVideo', id: string, name: string, visibility: Types.VideoVisibilityType, privacy: Types.VideoPrivacyStatus | null, currentUserCanEdit: boolean, tags: Array<string | null> | null, totalComments: number, totalReactions: number, playable_duration: number | null, flipped_camera: boolean, use_emojis: boolean, comments_enabled: boolean, createdAt: string, needs_password: boolean, loom_branded_player: boolean | null, complete: boolean, current_user_is_owner: boolean, white_label_player: boolean, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, duration: number | null, trim_duration: number | null, screen_type: string | null, os: string | null, recording_version: Types.RecordingVersion | null, mediaMetadataRotation: number | null, ingestion_type: string | null }, spaces: Array<{ __typename: 'SpaceRegularUserVideo', name: string, id: string, privacy: Types.SpacePrivacy | null, isArchived: boolean | null } | null> | null, organization: { __typename: 'Organization', id: string, name: string, brandPrimaryColor: string | null, type: string | null, site_id: string | null, planIncludesAI: boolean | null }, clips: Array<{ __typename: 'VideoClipDetails', id: string, playable_duration: number | null, source_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, video_properties: { __typename: 'VideoProperties', duration: number | null, trim_duration: number | null } }>, signedDefaultThumbnails: { __typename: 'VideoDefaultThumbnailsSources', default: string, static: string | null }, signedThumbnails: { __typename: 'VideoThumbnailsSources', animatedPreview: string | null }, owner: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> }, cta: { __typename: 'CTA', enabled: boolean, text: string | null, url: string | null, mods: unknown | null }, views: { __typename: 'RegularUserVideoViewCounts', total: number, distinct: number, named: Array<{ __typename: 'KnownUserVideoView', avatar: string | null, firstName: string | null, lastName: string | null } | null> | null } | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, instant_editing_enabled: boolean | null, videoUploadValid: boolean | null, noise_cancellation_type: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null } } | null> | null, fetchGettingStartedChecklist: { __typename: 'GenericError' } | { __typename: 'GettingStartedChecklistPayload', id: string, add_teammate: boolean | null, complete_onboarding: boolean | null, create_account: boolean | null, customize_video_name: boolean | null, download_recorder: boolean | null, email_verified: boolean | null, filled_account_settings: boolean | null, first_cam_recording: boolean | null, first_video_recording: boolean | null, first_video_upload: boolean | null, first_video_viewed: boolean | null, followed_us_on_twitter: boolean | null, has_reached_recording_limit: boolean | null, has_viewed_screenshots: boolean | null, liked_us_on_facebook: boolean | null, push_notification_enabled: boolean | null, share_video: boolean | null, shared_first_video_on_facebook: boolean | null, tweeted_first_video: boolean | null, has_viewed_videos: boolean | null, meeting_recording: boolean | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetMostRecentVideoV2Document = gql`
    query GetMostRecentVideoV2($startDate: String!, $endDate: String!, $offset: Int!, $limit: Int!) {
  recentUserVideos(
    startDate: $startDate
    endDate: $endDate
    offset: $offset
    limit: $limit
  ) {
    id
    name
    video_properties {
      width
      height
    }
    ... on RegularUserVideo {
      ...VideoCardVisibilityFragment
      ...VideoPlayerV2Fragment
    }
  }
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
    ${VideoCardVisibilityFragmentFragmentDoc}
${VideoPlayerV2FragmentFragmentDoc}`;

/**
 * __useGetMostRecentVideoV2Query__
 *
 * To run a query within a React component, call `useGetMostRecentVideoV2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetMostRecentVideoV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMostRecentVideoV2Query({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMostRecentVideoV2Query(baseOptions: Apollo.QueryHookOptions<GetMostRecentVideoV2Query, GetMostRecentVideoV2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMostRecentVideoV2Query, GetMostRecentVideoV2QueryVariables>(GetMostRecentVideoV2Document, options);
      }
export function useGetMostRecentVideoV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMostRecentVideoV2Query, GetMostRecentVideoV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMostRecentVideoV2Query, GetMostRecentVideoV2QueryVariables>(GetMostRecentVideoV2Document, options);
        }
export type GetMostRecentVideoV2QueryHookResult = ReturnType<typeof useGetMostRecentVideoV2Query>;
export type GetMostRecentVideoV2LazyQueryHookResult = ReturnType<typeof useGetMostRecentVideoV2LazyQuery>;
export type GetMostRecentVideoV2QueryResult = Apollo.QueryResult<GetMostRecentVideoV2Query, GetMostRecentVideoV2QueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;