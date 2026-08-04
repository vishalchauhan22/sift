import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCalendarMeetingsQueryVariables = Types.Exact<{
  rangeStart: Types.Scalars['String']['input'];
  rangeEnd: Types.Scalars['String']['input'];
}>;


export type GetCalendarMeetingsQuery = { __typename: 'Query', me: { __typename: 'RegularUser', id: string, meetingRecordingSettings: { __typename: 'MeetingRecordingSettings', id: string, recordingLinkSharing: Types.MeetingRecordingLinkSharingType, recordingWorkspaceMemberAccess: Types.MeetingRecordingAccessType, recordingSummaryNotificationSetting: Types.MeetingRecordingSummaryNotificationType, autoRecordOwnedMeetings: Types.AutoRecordOwnedMeetingsType } | null, calendars: Array<{ __typename: 'CalendarInfo', guid: string, integrationType: Types.ConnectedServiceIntegrationEnumType, lastSyncedAt: string | null, emailDomains: Array<string>, meetings: Array<{ __typename: 'CalendarMeeting', id: string, title: string | null, description: string | null, platform: string | null, url: string | null, code: string | null, organizerEmail: string | null, startTime: string | null, durationMins: number | null, createdAt: string | null, updatedAt: string | null, recurring: boolean | null, hasExternalParticipants: boolean, automationsOverridden: boolean, owned: boolean, record: boolean, past: boolean, videoId: string | null, recordingLinkSharing: Types.MeetingRecordingLinkSharingType, recordingWorkspaceMemberAccess: Types.MeetingRecordingAccessType, recordingSummaryNotificationSetting: Types.MeetingRecordingSummaryNotificationType, calendarMeetingId: string, calendarMeetingGuid: string, organizer: { __typename: 'RegularUser', id: string, first_name: string | null, last_name: string | null, email: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null, recorder: { __typename: 'RegularUser', id: string, first_name: string | null, last_name: string | null, email: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null, recordingFolders: Array<{ __typename: 'RegularUserFolder', id: string, name: string } | null> | null, recordingSpaces: Array<{ __typename: 'Space', id: string, name: string } | null> | null } | null> }> } | null };


export const GetCalendarMeetingsDocument = gql`
    query GetCalendarMeetings($rangeStart: String!, $rangeEnd: String!) {
  me {
    id
    meetingRecordingSettings {
      id
      recordingLinkSharing
      recordingWorkspaceMemberAccess
      recordingSummaryNotificationSetting
      autoRecordOwnedMeetings
    }
    calendars {
      guid
      integrationType
      lastSyncedAt
      emailDomains
      meetings(rangeStart: $rangeStart, rangeEnd: $rangeEnd) {
        id
        title
        description
        platform
        url
        code
        organizer {
          id
          first_name
          last_name
          email
          avatars {
            thumb
          }
        }
        recorder {
          id
          first_name
          last_name
          email
          avatars {
            thumb
          }
        }
        organizerEmail
        startTime
        durationMins
        createdAt
        updatedAt
        recurring
        hasExternalParticipants
        automationsOverridden
        owned
        record
        past
        videoId
        recordingLinkSharing
        recordingWorkspaceMemberAccess
        recordingSummaryNotificationSetting
        recordingFolders {
          id
          name
        }
        recordingSpaces {
          id
          name
        }
        calendarMeetingId
        calendarMeetingGuid
      }
    }
  }
}
    `;

/**
 * __useGetCalendarMeetingsQuery__
 *
 * To run a query within a React component, call `useGetCalendarMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarMeetingsQuery({
 *   variables: {
 *      rangeStart: // value for 'rangeStart'
 *      rangeEnd: // value for 'rangeEnd'
 *   },
 * });
 */
export function useGetCalendarMeetingsQuery(baseOptions: Apollo.QueryHookOptions<GetCalendarMeetingsQuery, GetCalendarMeetingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarMeetingsQuery, GetCalendarMeetingsQueryVariables>(GetCalendarMeetingsDocument, options);
      }
export function useGetCalendarMeetingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarMeetingsQuery, GetCalendarMeetingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarMeetingsQuery, GetCalendarMeetingsQueryVariables>(GetCalendarMeetingsDocument, options);
        }
export type GetCalendarMeetingsQueryHookResult = ReturnType<typeof useGetCalendarMeetingsQuery>;
export type GetCalendarMeetingsLazyQueryHookResult = ReturnType<typeof useGetCalendarMeetingsLazyQuery>;
export type GetCalendarMeetingsQueryResult = Apollo.QueryResult<GetCalendarMeetingsQuery, GetCalendarMeetingsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;