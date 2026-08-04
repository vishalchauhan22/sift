import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
export type VideoPlayerV2FragmentFragment = { __typename: 'RegularUserVideo', id: string, name: string, tags: Array<string | null> | null, totalComments: number, totalReactions: number, playable_duration: number | null, flipped_camera: boolean, use_emojis: boolean, comments_enabled: boolean, createdAt: string, needs_password: boolean, loom_branded_player: boolean | null, complete: boolean, current_user_is_owner: boolean, white_label_player: boolean, clips: Array<{ __typename: 'VideoClipDetails', id: string, playable_duration: number | null, source_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, video_properties: { __typename: 'VideoProperties', duration: number | null, trim_duration: number | null } }>, signedDefaultThumbnails: { __typename: 'VideoDefaultThumbnailsSources', default: string, static: string | null }, signedThumbnails: { __typename: 'VideoThumbnailsSources', animatedPreview: string | null }, owner: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> }, cta: { __typename: 'CTA', enabled: boolean, text: string | null, url: string | null, mods: unknown | null }, views: { __typename: 'RegularUserVideoViewCounts', total: number, distinct: number, named: Array<{ __typename: 'KnownUserVideoView', avatar: string | null, firstName: string | null, lastName: string | null } | null> | null } | null, video_properties: { __typename: 'VideoProperties', duration: number | null, trim_duration: number | null, width: number | null, height: number | null, screen_type: string | null, os: string | null, recording_version: Types.RecordingVersion | null, mediaMetadataRotation: number | null, ingestion_type: string | null }, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, instant_editing_enabled: boolean | null, videoUploadValid: boolean | null, noise_cancellation_type: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, organization: { __typename: 'Organization', brandPrimaryColor: string | null, id: string, name: string, type: string | null, site_id: string | null, planIncludesAI: boolean | null } };

export const VideoPlayerV2FragmentFragmentDoc = gql`
    fragment VideoPlayerV2Fragment on RegularUserVideo {
  id
  name
  clips {
    id
    processing_information {
      trim_ranges {
        from
        to
      }
    }
    playable_duration
    source_duration
    video_properties {
      duration
      trim_duration
    }
  }
  signedDefaultThumbnails {
    default
    static
  }
  signedThumbnails {
    animatedPreview
  }
  tags
  owner {
    id
    display_name
    avatars {
      thumb
    }
  }
  cta {
    enabled
    text
    url
    mods
  }
  totalComments
  totalReactions
  views {
    total
    distinct
    named {
      avatar
      firstName
      lastName
    }
  }
  playable_duration
  video_properties {
    duration
    trim_duration
    width
    height
    screen_type
    os
    recording_version
    mediaMetadataRotation
    ingestion_type
  }
  flipped_camera
  processing_information {
    trim_id
    instant_editing_enabled
    videoUploadValid
    trim_ranges {
      from
      to
    }
    noise_cancellation_type
  }
  use_emojis
  comments_enabled
  createdAt
  needs_password
  loom_branded_player
  complete
  current_user_is_owner
  white_label_player
  organization {
    brandPrimaryColor
    id
    name
    type
    site_id
    planIncludesAI
  }
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;