import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetDefaultMeetingRecordingSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDefaultMeetingRecordingSettingsQuery = { __typename: 'Query', me: { __typename: 'RegularUser', id: string, meetingRecordingSettings: { __typename: 'MeetingRecordingSettings', id: string, recordingLinkSharing: Types.MeetingRecordingLinkSharingType, recordingWorkspaceMemberAccess: Types.MeetingRecordingAccessType, recordingSummaryNotificationSetting: Types.MeetingRecordingSummaryNotificationType, autoRecordOwnedMeetings: Types.AutoRecordOwnedMeetingsType } | null } | null };


export const GetDefaultMeetingRecordingSettingsDocument = gql`
    query GetDefaultMeetingRecordingSettings {
  me {
    id
    meetingRecordingSettings {
      id
      recordingLinkSharing
      recordingWorkspaceMemberAccess
      recordingSummaryNotificationSetting
      autoRecordOwnedMeetings
    }
  }
}
    `;

/**
 * __useGetDefaultMeetingRecordingSettingsQuery__
 *
 * To run a query within a React component, call `useGetDefaultMeetingRecordingSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultMeetingRecordingSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultMeetingRecordingSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDefaultMeetingRecordingSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetDefaultMeetingRecordingSettingsQuery, GetDefaultMeetingRecordingSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDefaultMeetingRecordingSettingsQuery, GetDefaultMeetingRecordingSettingsQueryVariables>(GetDefaultMeetingRecordingSettingsDocument, options);
      }
export function useGetDefaultMeetingRecordingSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDefaultMeetingRecordingSettingsQuery, GetDefaultMeetingRecordingSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDefaultMeetingRecordingSettingsQuery, GetDefaultMeetingRecordingSettingsQueryVariables>(GetDefaultMeetingRecordingSettingsDocument, options);
        }
export type GetDefaultMeetingRecordingSettingsQueryHookResult = ReturnType<typeof useGetDefaultMeetingRecordingSettingsQuery>;
export type GetDefaultMeetingRecordingSettingsLazyQueryHookResult = ReturnType<typeof useGetDefaultMeetingRecordingSettingsLazyQuery>;
export type GetDefaultMeetingRecordingSettingsQueryResult = Apollo.QueryResult<GetDefaultMeetingRecordingSettingsQuery, GetDefaultMeetingRecordingSettingsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;