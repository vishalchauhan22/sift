import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ToggleCalendarMeetingMutationVariables = Types.Exact<{
  input: Types.ToggleCalendarMeetingInput;
}>;


export type ToggleCalendarMeetingMutation = { __typename: 'Mutation', toggleCalendarMeeting: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'ToggleCalendarMeetingPayload', success: boolean | null, meetings: Array<{ __typename: 'CalendarMeeting', calendarMeetingGuid: string, record: boolean, recordingLinkSharing: Types.MeetingRecordingLinkSharingType, automationsOverridden: boolean, recordingWorkspaceMemberAccess: Types.MeetingRecordingAccessType, recordingSummaryNotificationSetting: Types.MeetingRecordingSummaryNotificationType, recorder: { __typename: 'RegularUser', id: string } | null, recordingFolders: Array<{ __typename: 'RegularUserFolder', id: string, name: string } | null> | null, recordingSpaces: Array<{ __typename: 'Space', id: string, name: string } | null> | null }> | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const ToggleCalendarMeetingDocument = gql`
    mutation ToggleCalendarMeeting($input: ToggleCalendarMeetingInput!) {
  toggleCalendarMeeting(input: $input) {
    __typename
    ... on ToggleCalendarMeetingPayload {
      success
      meetings {
        calendarMeetingGuid
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
export type ToggleCalendarMeetingMutationFn = Apollo.MutationFunction<ToggleCalendarMeetingMutation, ToggleCalendarMeetingMutationVariables>;

/**
 * __useToggleCalendarMeetingMutation__
 *
 * To run a mutation, you first call `useToggleCalendarMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCalendarMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCalendarMeetingMutation, { data, loading, error }] = useToggleCalendarMeetingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleCalendarMeetingMutation(baseOptions?: Apollo.MutationHookOptions<ToggleCalendarMeetingMutation, ToggleCalendarMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleCalendarMeetingMutation, ToggleCalendarMeetingMutationVariables>(ToggleCalendarMeetingDocument, options);
      }
export type ToggleCalendarMeetingMutationHookResult = ReturnType<typeof useToggleCalendarMeetingMutation>;
export type ToggleCalendarMeetingMutationResult = Apollo.MutationResult<ToggleCalendarMeetingMutation>;
export type ToggleCalendarMeetingMutationOptions = Apollo.BaseMutationOptions<ToggleCalendarMeetingMutation, ToggleCalendarMeetingMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;