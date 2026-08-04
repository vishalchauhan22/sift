import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DisconnectCalendarMutationVariables = Types.Exact<{
  integrationType: Types.Scalars['String']['input'];
}>;


export type DisconnectCalendarMutation = { __typename: 'Mutation', disconnectCalendar: { __typename: 'DisconnectCalendarPayload', success: boolean } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const DisconnectCalendarDocument = gql`
    mutation DisconnectCalendar($integrationType: String!) {
  disconnectCalendar(integrationType: $integrationType) {
    __typename
    ... on DisconnectCalendarPayload {
      success
    }
  }
}
    `;
export type DisconnectCalendarMutationFn = Apollo.MutationFunction<DisconnectCalendarMutation, DisconnectCalendarMutationVariables>;

/**
 * __useDisconnectCalendarMutation__
 *
 * To run a mutation, you first call `useDisconnectCalendarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectCalendarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectCalendarMutation, { data, loading, error }] = useDisconnectCalendarMutation({
 *   variables: {
 *      integrationType: // value for 'integrationType'
 *   },
 * });
 */
export function useDisconnectCalendarMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectCalendarMutation, DisconnectCalendarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectCalendarMutation, DisconnectCalendarMutationVariables>(DisconnectCalendarDocument, options);
      }
export type DisconnectCalendarMutationHookResult = ReturnType<typeof useDisconnectCalendarMutation>;
export type DisconnectCalendarMutationResult = Apollo.MutationResult<DisconnectCalendarMutation>;
export type DisconnectCalendarMutationOptions = Apollo.BaseMutationOptions<DisconnectCalendarMutation, DisconnectCalendarMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;