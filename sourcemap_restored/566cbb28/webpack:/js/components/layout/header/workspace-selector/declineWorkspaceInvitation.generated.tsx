import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeclineWorkspaceInvitationMutationVariables = Types.Exact<{
  inviteId: Types.Scalars['ID']['input'];
}>;


export type DeclineWorkspaceInvitationMutation = { __typename: 'Mutation', declineWorkspaceInvitation: { __typename: 'DeclineInvitationResult', success: boolean } };


export const DeclineWorkspaceInvitationDocument = gql`
    mutation declineWorkspaceInvitation($inviteId: ID!) {
  declineWorkspaceInvitation(inviteId: $inviteId) {
    success
  }
}
    `;
export type DeclineWorkspaceInvitationMutationFn = Apollo.MutationFunction<DeclineWorkspaceInvitationMutation, DeclineWorkspaceInvitationMutationVariables>;

/**
 * __useDeclineWorkspaceInvitationMutation__
 *
 * To run a mutation, you first call `useDeclineWorkspaceInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineWorkspaceInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineWorkspaceInvitationMutation, { data, loading, error }] = useDeclineWorkspaceInvitationMutation({
 *   variables: {
 *      inviteId: // value for 'inviteId'
 *   },
 * });
 */
export function useDeclineWorkspaceInvitationMutation(baseOptions?: Apollo.MutationHookOptions<DeclineWorkspaceInvitationMutation, DeclineWorkspaceInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineWorkspaceInvitationMutation, DeclineWorkspaceInvitationMutationVariables>(DeclineWorkspaceInvitationDocument, options);
      }
export type DeclineWorkspaceInvitationMutationHookResult = ReturnType<typeof useDeclineWorkspaceInvitationMutation>;
export type DeclineWorkspaceInvitationMutationResult = Apollo.MutationResult<DeclineWorkspaceInvitationMutation>;
export type DeclineWorkspaceInvitationMutationOptions = Apollo.BaseMutationOptions<DeclineWorkspaceInvitationMutation, DeclineWorkspaceInvitationMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;