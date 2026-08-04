import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateDefaultMeetingRecordingSettingsMutationVariables = Types.Exact<{
  summaryNotification?: Types.InputMaybe<Types.MeetingRecordingSummaryNotificationType>;
  linkSharing?: Types.InputMaybe<Types.MeetingRecordingLinkSharingType>;
  workspaceMemberAccess?: Types.InputMaybe<Types.MeetingRecordingAccessType>;
  autoRecordOwnedMeetings?: Types.InputMaybe<Types.AutoRecordOwnedMeetingsType>;
  externalInviteeAccess?: Types.InputMaybe<Types.MeetingRecordingAccessType>;
}>;


export type UpdateDefaultMeetingRecordingSettingsMutation = { __typename: 'Mutation', updateDefaultMeetingRecordingSettings: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError' } | { __typename: 'UpdateDefaultMeetingRecordingSettingsPayload', success: boolean, meetingRecordingSettings: { __typename: 'MeetingRecordingSettings', guid: string, recordingLinkSharing: Types.MeetingRecordingLinkSharingType, recordingWorkspaceMemberAccess: Types.MeetingRecordingAccessType, recordingSummaryNotificationSetting: Types.MeetingRecordingSummaryNotificationType, autoRecordOwnedMeetings: Types.AutoRecordOwnedMeetingsType, externalInviteeAccess: Types.MeetingRecordingAccessType } } | { __typename: 'UserNotAuthorizedError' } | null };


export const UpdateDefaultMeetingRecordingSettingsDocument = gql`
    mutation UpdateDefaultMeetingRecordingSettings($summaryNotification: MeetingRecordingSummaryNotificationType, $linkSharing: MeetingRecordingLinkSharingType, $workspaceMemberAccess: MeetingRecordingAccessType, $autoRecordOwnedMeetings: AutoRecordOwnedMeetingsType, $externalInviteeAccess: MeetingRecordingAccessType) {
  updateDefaultMeetingRecordingSettings(
    summaryNotification: $summaryNotification
    linkSharing: $linkSharing
    workspaceMemberAccess: $workspaceMemberAccess
    autoRecordOwnedMeetings: $autoRecordOwnedMeetings
    externalInviteeAccess: $externalInviteeAccess
  ) {
    __typename
    ... on UpdateDefaultMeetingRecordingSettingsPayload {
      success
      meetingRecordingSettings {
        guid
        recordingLinkSharing
        recordingWorkspaceMemberAccess
        recordingSummaryNotificationSetting
        autoRecordOwnedMeetings
        externalInviteeAccess
      }
    }
    ... on GenericError {
      message
    }
  }
}
    `;
export type UpdateDefaultMeetingRecordingSettingsMutationFn = Apollo.MutationFunction<UpdateDefaultMeetingRecordingSettingsMutation, UpdateDefaultMeetingRecordingSettingsMutationVariables>;

/**
 * __useUpdateDefaultMeetingRecordingSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateDefaultMeetingRecordingSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDefaultMeetingRecordingSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDefaultMeetingRecordingSettingsMutation, { data, loading, error }] = useUpdateDefaultMeetingRecordingSettingsMutation({
 *   variables: {
 *      summaryNotification: // value for 'summaryNotification'
 *      linkSharing: // value for 'linkSharing'
 *      workspaceMemberAccess: // value for 'workspaceMemberAccess'
 *      autoRecordOwnedMeetings: // value for 'autoRecordOwnedMeetings'
 *      externalInviteeAccess: // value for 'externalInviteeAccess'
 *   },
 * });
 */
export function useUpdateDefaultMeetingRecordingSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDefaultMeetingRecordingSettingsMutation, UpdateDefaultMeetingRecordingSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDefaultMeetingRecordingSettingsMutation, UpdateDefaultMeetingRecordingSettingsMutationVariables>(UpdateDefaultMeetingRecordingSettingsDocument, options);
      }
export type UpdateDefaultMeetingRecordingSettingsMutationHookResult = ReturnType<typeof useUpdateDefaultMeetingRecordingSettingsMutation>;
export type UpdateDefaultMeetingRecordingSettingsMutationResult = Apollo.MutationResult<UpdateDefaultMeetingRecordingSettingsMutation>;
export type UpdateDefaultMeetingRecordingSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateDefaultMeetingRecordingSettingsMutation, UpdateDefaultMeetingRecordingSettingsMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;