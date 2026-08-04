import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ClaimCalendarMeetingMutationVariables = Types.Exact<{
  calendarMeetingGuid: Types.Scalars['ID']['input'];
}>;


export type ClaimCalendarMeetingMutation = { __typename: 'Mutation', claimCalendarMeeting: { __typename: 'ClaimCalendarMeetingPayload', success: boolean | null } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const ClaimCalendarMeetingDocument = gql`
    mutation ClaimCalendarMeeting($calendarMeetingGuid: ID!) {
  claimCalendarMeeting(calendarMeetingGuid: $calendarMeetingGuid) {
    __typename
    ... on ClaimCalendarMeetingPayload {
      success
    }
  }
}
    `;
export type ClaimCalendarMeetingMutationFn = Apollo.MutationFunction<ClaimCalendarMeetingMutation, ClaimCalendarMeetingMutationVariables>;

/**
 * __useClaimCalendarMeetingMutation__
 *
 * To run a mutation, you first call `useClaimCalendarMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClaimCalendarMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [claimCalendarMeetingMutation, { data, loading, error }] = useClaimCalendarMeetingMutation({
 *   variables: {
 *      calendarMeetingGuid: // value for 'calendarMeetingGuid'
 *   },
 * });
 */
export function useClaimCalendarMeetingMutation(baseOptions?: Apollo.MutationHookOptions<ClaimCalendarMeetingMutation, ClaimCalendarMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClaimCalendarMeetingMutation, ClaimCalendarMeetingMutationVariables>(ClaimCalendarMeetingDocument, options);
      }
export type ClaimCalendarMeetingMutationHookResult = ReturnType<typeof useClaimCalendarMeetingMutation>;
export type ClaimCalendarMeetingMutationResult = Apollo.MutationResult<ClaimCalendarMeetingMutation>;
export type ClaimCalendarMeetingMutationOptions = Apollo.BaseMutationOptions<ClaimCalendarMeetingMutation, ClaimCalendarMeetingMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;