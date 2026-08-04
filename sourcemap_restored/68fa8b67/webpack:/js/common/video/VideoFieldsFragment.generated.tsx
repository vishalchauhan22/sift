import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
export type VideoFieldsFragment = { __typename: 'RegularUserVideo', id: string, name: string, complete: boolean, archived: boolean, createdAt: string, s3_id: string, totalReactions: number, totalComments: number, organization_idv2: string, currentUserHasWatched: boolean | null, playable_duration: number | null, owner_id: number, current_user_is_owner: boolean, download_enabled: boolean, downloadable: boolean, downloadableBy: Types.DownloadableByType, currentUserCanEdit: boolean, tags: Array<string | null> | null, use_gif: boolean, visibility: Types.VideoVisibilityType, is_protected: boolean, privacy: Types.VideoPrivacyStatus | null, isCommunityLoom: boolean, isParentOfPersonalizedCopies: boolean, personalizationType: Types.VideoPersonalizationType | null, views: { __typename: 'RegularUserVideoViewCounts', total: number } | null, thumbnails: { __typename: 'VideoThumbnailsSources', default: string | null, defaultPlay: string | null, ogFull: string | null, full: string | null, fullPlay: string | null, defaultGif: string | null, defaultGifPlay: string | null, animatedPreview: string | null }, owner: { __typename: 'RegularUser', first_name: string | null, last_name: string | null, id: string, avatars: Array<{ __typename: 'Avatar', name: string, large: string, thumb: string, isAtlassianMastered: boolean | null }> }, processing_information: { __typename: 'ProcessingInformation', videoUploadValid: boolean | null, videoUploadMessage: string | null, trim_id: number | null }, video_properties: { __typename: 'VideoProperties', thumbnail_is_png: string | null, duration: number | null, trim_duration: number | null, recording_version: Types.RecordingVersion | null, width: number | null, height: number | null }, organization: { __typename: 'Organization', id: string, name: string }, spaces: Array<{ __typename: 'SpaceRegularUserVideo', name: string, id: string, isArchived: boolean | null, privacy: Types.SpacePrivacy | null, is_primary: boolean, data_age_limit_in_seconds: number | null } | null> | null, folder: { __typename: 'RegularUserFolder', id: string, name: string, special_id: string | null, owner_id: number, visibility: string | null, owner: { __typename: 'RegularUser', first_name: string | null, id: string, last_name: string | null } } | null };

export const VideoFieldsFragmentDoc = gql`
    fragment VideoFields on RegularUserVideo {
  id
  name
  complete
  archived
  createdAt
  s3_id
  totalReactions
  totalComments
  organization_idv2
  currentUserHasWatched
  views {
    total
  }
  thumbnails {
    default
    defaultPlay
    ogFull
    full
    fullPlay
    defaultGif
    defaultGifPlay
    animatedPreview
  }
  owner {
    first_name
    last_name
    id
    avatars {
      name
      large
      thumb
      isAtlassianMastered
    }
  }
  processing_information {
    videoUploadValid
    videoUploadMessage
    trim_id
  }
  playable_duration
  video_properties {
    thumbnail_is_png
    duration
    trim_duration
    recording_version
    width
    height
  }
  organization {
    id
    name
  }
  owner_id
  current_user_is_owner
  download_enabled
  downloadable
  downloadableBy
  currentUserCanEdit
  tags
  use_gif
  visibility
  is_protected
  privacy
  isCommunityLoom
  spaces {
    name
    id
    isArchived
    privacy
    is_primary
    data_age_limit_in_seconds
  }
  folder {
    id
    name
    special_id
    owner_id
    visibility
    owner {
      first_name
      id
      last_name
    }
  }
  isParentOfPersonalizedCopies
  personalizationType
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;