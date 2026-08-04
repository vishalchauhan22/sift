import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ClaimCalendarMeetingRecordingMutationVariables = Types.Exact<{
  calendarMeetingId: Types.Scalars['ID']['input'];
}>;


export type ClaimCalendarMeetingRecordingMutation = { __typename: 'Mutation', claimCalendarMeetingRecording: { __typename: 'ClaimCalendarMeetingRecordingPayload', success: boolean } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const ClaimCalendarMeetingRecordingDocument = gql`
    mutation ClaimCalendarMeetingRecording($calendarMeetingId: ID!) {
  claimCalendarMeetingRecording(calendarMeetingId: $calendarMeetingId) {
    __typename
    ... on ClaimCalendarMeetingRecordingPayload {
      success
    }
  }
}
    `;
export type ClaimCalendarMeetingRecordingMutationFn = Apollo.MutationFunction<ClaimCalendarMeetingRecordingMutation, ClaimCalendarMeetingRecordingMutationVariables>;

/**
 * __useClaimCalendarMeetingRecordingMutation__
 *
 * To run a mutation, you first call `useClaimCalendarMeetingRecordingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClaimCalendarMeetingRecordingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [claimCalendarMeetingRecordingMutation, { data, loading, error }] = useClaimCalendarMeetingRecordingMutation({
 *   variables: {
 *      calendarMeetingId: // value for 'calendarMeetingId'
 *   },
 * });
 */
export function useClaimCalendarMeetingRecordingMutation(baseOptions?: Apollo.MutationHookOptions<ClaimCalendarMeetingRecordingMutation, ClaimCalendarMeetingRecordingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClaimCalendarMeetingRecordingMutation, ClaimCalendarMeetingRecordingMutationVariables>(ClaimCalendarMeetingRecordingDocument, options);
      }
export type ClaimCalendarMeetingRecordingMutationHookResult = ReturnType<typeof useClaimCalendarMeetingRecordingMutation>;
export type ClaimCalendarMeetingRecordingMutationResult = Apollo.MutationResult<ClaimCalendarMeetingRecordingMutation>;
export type ClaimCalendarMeetingRecordingMutationOptions = Apollo.BaseMutationOptions<ClaimCalendarMeetingRecordingMutation, ClaimCalendarMeetingRecordingMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;