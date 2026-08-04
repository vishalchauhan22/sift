import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QueryNotificationsV2QueryVariables = Types.Exact<{
  first: Types.Scalars['Int']['input'];
  cursor?: Types.InputMaybe<Types.Scalars['String']['input']>;
  notificationType: Types.NotificationQueryType;
}>;


export type QueryNotificationsV2Query = { __typename: 'Query', response: { __typename: 'GenericError', message: string } | { __typename: 'GetNotificationsPayload', hasNotifications: boolean | null, notifications: { __typename: 'NotificationTrayItemConnection', edges: Array<{ __typename: 'NotificationTrayItemEdge', cursor: string, node: { __typename: 'NotificationTrayItem', id: string, url: string | null, content: string | null, timestamp: number | null, data: unknown | null, reactionsCount: number | null, createdAt: string, notificationType: Types.NotificationTrayType, status: Types.NotificationStatus, privacyType: string | null, video: { __typename: 'NotificationTrayVideo', id: string, name: string, enhancedVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, name: string, totalComments: number, totalReactions: number, playable_duration: number | null, isMeetingRecording: boolean | null, flipped_camera: boolean, use_emojis: boolean, comments_enabled: boolean, createdAt: string, needs_password: boolean, loom_branded_player: boolean | null, complete: boolean, current_user_is_owner: boolean, white_label_player: boolean, clips: Array<{ __typename: 'VideoClipDetails', id: string, playable_duration: number | null, source_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, video_properties: { __typename: 'VideoProperties', duration: number | null, trim_duration: number | null } }>, signedDefaultThumbnails: { __typename: 'VideoDefaultThumbnailsSources', default: string, static: string | null }, signedThumbnails: { __typename: 'VideoThumbnailsSources', animatedPreview: string | null }, owner: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> }, cta: { __typename: 'CTA', enabled: boolean, text: string | null, url: string | null, mods: unknown | null }, views: { __typename: 'RegularUserVideoViewCounts', total: number } | null, video_properties: { __typename: 'VideoProperties', duration: number | null, trim_duration: number | null, width: number | null, height: number | null, screen_type: string | null, os: string | null, recording_version: Types.RecordingVersion | null, mediaMetadataRotation: number | null, ingestion_type: string | null }, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, instant_editing_enabled: boolean | null, videoUploadValid: boolean | null, noise_cancellation_type: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null }, organization: { __typename: 'Organization', brandPrimaryColor: string | null, id: string, site_id: string | null, type: string | null, planIncludesAI: boolean | null } } | { __typename: 'VideoPasswordMissingOrIncorrect', id: string } | null } | null, user: { __typename: 'NotificationTrayUser', id: string | null, name: string | null, avatar: string | null } | null, workspace: { __typename: 'NotificationTrayWorkspace', id: string | null, name: string, icon: string | null } | null, receiver: { __typename: 'NotificationTrayReceiver', name: string | null } | null } | null } | null> | null, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean } } | null } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null, unseenNotificationsCount: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UnseenNotificationPayload', count: number } | { __typename: 'UserNotAuthorizedError' } | null };


export const QueryNotificationsV2Document = gql`
    query QueryNotificationsV2($first: Int!, $cursor: String, $notificationType: NotificationQueryType!) {
  response: notificationsPage {
    ... on GetNotificationsPayload {
      hasNotifications
      notifications(
        first: $first
        after: $cursor
        notificationType: $notificationType
      ) {
        edges {
          cursor
          node {
            id
            url
            content(withMentionMarkups: true)
            timestamp
            data(withMentionMarkups: true)
            reactionsCount
            createdAt
            notificationType
            status
            video {
              enhancedVideo {
                ... on RegularUserVideo {
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
                  }
                  playable_duration
                  isMeetingRecording
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
                    site_id
                    type
                    planIncludesAI
                  }
                }
                ... on VideoPasswordMissingOrIncorrect {
                  __typename
                  id
                }
              }
              id
              name
            }
            user {
              id
              name
              avatar
            }
            workspace {
              id
              name
              icon
            }
            privacyType
            receiver {
              name
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    ... on Error {
      message
    }
  }
  unseenNotificationsCount {
    __typename
    ... on UnseenNotificationPayload {
      count
    }
  }
}
    `;

/**
 * __useQueryNotificationsV2Query__
 *
 * To run a query within a React component, call `useQueryNotificationsV2Query` and pass it any options that fit your needs.
 * When your component renders, `useQueryNotificationsV2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryNotificationsV2Query({
 *   variables: {
 *      first: // value for 'first'
 *      cursor: // value for 'cursor'
 *      notificationType: // value for 'notificationType'
 *   },
 * });
 */
export function useQueryNotificationsV2Query(baseOptions: Apollo.QueryHookOptions<QueryNotificationsV2Query, QueryNotificationsV2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryNotificationsV2Query, QueryNotificationsV2QueryVariables>(QueryNotificationsV2Document, options);
      }
export function useQueryNotificationsV2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryNotificationsV2Query, QueryNotificationsV2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryNotificationsV2Query, QueryNotificationsV2QueryVariables>(QueryNotificationsV2Document, options);
        }
export type QueryNotificationsV2QueryHookResult = ReturnType<typeof useQueryNotificationsV2Query>;
export type QueryNotificationsV2LazyQueryHookResult = ReturnType<typeof useQueryNotificationsV2LazyQuery>;
export type QueryNotificationsV2QueryResult = Apollo.QueryResult<QueryNotificationsV2Query, QueryNotificationsV2QueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;