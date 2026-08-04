import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCalendarMeetingRecordMutationVariables = Types.Exact<{
  calendarMeetingId: Types.Scalars['ID']['input'];
  record: Types.Scalars['Boolean']['input'];
  timeZone: Types.Scalars['String']['input'];
}>;


export type UpdateCalendarMeetingRecordMutation = { __typename: 'Mutation', updateCalendarMeetingRecord: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UpdateCalendarMeetingRecordPayload', success: boolean, meetings: Array<{ __typename: 'CalendarMeeting', id: string, record: boolean, recordingLinkSharing: Types.MeetingRecordingLinkSharingType, automationsOverridden: boolean, recordingWorkspaceMemberAccess: Types.MeetingRecordingAccessType, recordingSummaryNotificationSetting: Types.MeetingRecordingSummaryNotificationType, recorder: { __typename: 'RegularUser', id: string } | null, recordingFolders: Array<{ __typename: 'RegularUserFolder', id: string, name: string } | null> | null, recordingSpaces: Array<{ __typename: 'Space', id: string, name: string } | null> | null }> } | { __typename: 'UserNotAuthorizedError' } | null };


export const UpdateCalendarMeetingRecordDocument = gql`
    mutation UpdateCalendarMeetingRecord($calendarMeetingId: ID!, $record: Boolean!, $timeZone: String!) {
  updateCalendarMeetingRecord(
    calendarMeetingId: $calendarMeetingId
    record: $record
    timeZone: $timeZone
  ) {
    __typename
    ... on UpdateCalendarMeetingRecordPayload {
      success
      meetings {
        id
        record
        recordingLinkSharing
        automationsOverridden
        recordingWorkspaceMemberAccess
        recordingSummaryNotificationSetting
        recorder {
          id
        }
        recordingFolders {
          id
          name
        }
        recordingSpaces {
          id
          name
        }
      }
    }
  }
}
    `;
export type UpdateCalendarMeetingRecordMutationFn = Apollo.MutationFunction<UpdateCalendarMeetingRecordMutation, UpdateCalendarMeetingRecordMutationVariables>;

/**
 * __useUpdateCalendarMeetingRecordMutation__
 *
 * To run a mutation, you first call `useUpdateCalendarMeetingRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalendarMeetingRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalendarMeetingRecordMutation, { data, loading, error }] = useUpdateCalendarMeetingRecordMutation({
 *   variables: {
 *      calendarMeetingId: // value for 'calendarMeetingId'
 *      record: // value for 'record'
 *      timeZone: // value for 'timeZone'
 *   },
 * });
 */
export function useUpdateCalendarMeetingRecordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCalendarMeetingRecordMutation, UpdateCalendarMeetingRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCalendarMeetingRecordMutation, UpdateCalendarMeetingRecordMutationVariables>(UpdateCalendarMeetingRecordDocument, options);
      }
export type UpdateCalendarMeetingRecordMutationHookResult = ReturnType<typeof useUpdateCalendarMeetingRecordMutation>;
export type UpdateCalendarMeetingRecordMutationResult = Apollo.MutationResult<UpdateCalendarMeetingRecordMutation>;
export type UpdateCalendarMeetingRecordMutationOptions = Apollo.BaseMutationOptions<UpdateCalendarMeetingRecordMutation, UpdateCalendarMeetingRecordMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;