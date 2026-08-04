import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoFieldsFragmentDoc } from '../../../common/video/VideoFieldsFragment.generated';
import { VideoPlayerV2FragmentFragmentDoc } from '../../video-player-fresh/VideoPlayerV2Fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchVideosByIdQueryVariables = Types.Exact<{
  videoIds: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
}>;


export type FetchVideosByIdQuery = { __typename: 'Query', fetchVideosById: { __typename: 'FetchVideosByIdPayload', videos: Array<{ __typename: 'RegularUserVideo', id: string, name: string, complete: boolean, archived: boolean, createdAt: string, s3_id: string, totalReactions: number, totalComments: number, organization_idv2: string, currentUserHasWatched: boolean | null, playable_duration: number | null, owner_id: number, current_user_is_owner: boolean, download_enabled: boolean, downloadable: boolean, downloadableBy: Types.DownloadableByType, currentUserCanEdit: boolean, tags: Array<string | null> | null, use_gif: boolean, visibility: Types.VideoVisibilityType, is_protected: boolean, privacy: Types.VideoPrivacyStatus | null, isCommunityLoom: boolean, isParentOfPersonalizedCopies: boolean, personalizationType: Types.VideoPersonalizationType | null, flipped_camera: boolean, use_emojis: boolean, comments_enabled: boolean, needs_password: boolean, loom_branded_player: boolean | null, white_label_player: boolean, views: { __typename: 'RegularUserVideoViewCounts', total: number, distinct: number, named: Array<{ __typename: 'KnownUserVideoView', avatar: string | null, firstName: string | null, lastName: string | null } | null> | null } | null, thumbnails: { __typename: 'VideoThumbnailsSources', default: string | null, defaultPlay: string | null, ogFull: string | null, full: string | null, fullPlay: string | null, defaultGif: string | null, defaultGifPlay: string | null, animatedPreview: string | null }, owner: { __typename: 'RegularUser', first_name: string | null, last_name: string | null, id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', name: string, large: string, thumb: string, isAtlassianMastered: boolean | null }> }, processing_information: { __typename: 'ProcessingInformation', videoUploadValid: boolean | null, videoUploadMessage: string | null, trim_id: number | null, instant_editing_enabled: boolean | null, noise_cancellation_type: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, video_properties: { __typename: 'VideoProperties', thumbnail_is_png: string | null, duration: number | null, trim_duration: number | null, recording_version: Types.RecordingVersion | null, width: number | null, height: number | null, screen_type: string | null, os: string | null, mediaMetadataRotation: number | null, ingestion_type: string | null }, organization: { __typename: 'Organization', id: string, name: string, brandPrimaryColor: string | null, type: string | null, site_id: string | null, planIncludesAI: boolean | null }, spaces: Array<{ __typename: 'SpaceRegularUserVideo', name: string, id: string, isArchived: boolean | null, privacy: Types.SpacePrivacy | null, is_primary: boolean, data_age_limit_in_seconds: number | null } | null> | null, folder: { __typename: 'RegularUserFolder', id: string, name: string, special_id: string | null, owner_id: number, visibility: string | null, owner: { __typename: 'RegularUser', first_name: string | null, id: string, last_name: string | null } } | null, clips: Array<{ __typename: 'VideoClipDetails', id: string, playable_duration: number | null, source_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, video_properties: { __typename: 'VideoProperties', duration: number | null, trim_duration: number | null } }>, signedDefaultThumbnails: { __typename: 'VideoDefaultThumbnailsSources', default: string, static: string | null }, signedThumbnails: { __typename: 'VideoThumbnailsSources', animatedPreview: string | null }, cta: { __typename: 'CTA', enabled: boolean, text: string | null, url: string | null, mods: unknown | null } } | null> | null } | { __typename: 'GenericError', message: string } | null };


export const FetchVideosByIdDocument = gql`
    query FetchVideosById($videoIds: [ID!]!) {
  fetchVideosById(videoIds: $videoIds) {
    ... on FetchVideosByIdPayload {
      __typename
      videos {
        ...VideoFields
        ...VideoPlayerV2Fragment
      }
    }
    ... on Error {
      message
    }
  }
}
    ${VideoFieldsFragmentDoc}
${VideoPlayerV2FragmentFragmentDoc}`;

/**
 * __useFetchVideosByIdQuery__
 *
 * To run a query within a React component, call `useFetchVideosByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchVideosByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchVideosByIdQuery({
 *   variables: {
 *      videoIds: // value for 'videoIds'
 *   },
 * });
 */
export function useFetchVideosByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchVideosByIdQuery, FetchVideosByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchVideosByIdQuery, FetchVideosByIdQueryVariables>(FetchVideosByIdDocument, options);
      }
export function useFetchVideosByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchVideosByIdQuery, FetchVideosByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchVideosByIdQuery, FetchVideosByIdQueryVariables>(FetchVideosByIdDocument, options);
        }
export type FetchVideosByIdQueryHookResult = ReturnType<typeof useFetchVideosByIdQuery>;
export type FetchVideosByIdLazyQueryHookResult = ReturnType<typeof useFetchVideosByIdLazyQuery>;
export type FetchVideosByIdQueryResult = Apollo.QueryResult<FetchVideosByIdQuery, FetchVideosByIdQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;