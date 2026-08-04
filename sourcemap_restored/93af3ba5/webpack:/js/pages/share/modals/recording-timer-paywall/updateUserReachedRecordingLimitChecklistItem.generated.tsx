import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserReachedRecordingLimitChecklistItemMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UpdateUserReachedRecordingLimitChecklistItemMutation = { __typename: 'Mutation', successful: boolean };


export const UpdateUserReachedRecordingLimitChecklistItemDocument = gql`
    mutation UpdateUserReachedRecordingLimitChecklistItem($userId: ID!) {
  successful: updateUserReachedRecordingLimitChecklistItem(userId: $userId)
}
    `;
export type UpdateUserReachedRecordingLimitChecklistItemMutationFn = Apollo.MutationFunction<UpdateUserReachedRecordingLimitChecklistItemMutation, UpdateUserReachedRecordingLimitChecklistItemMutationVariables>;

/**
 * __useUpdateUserReachedRecordingLimitChecklistItemMutation__
 *
 * To run a mutation, you first call `useUpdateUserReachedRecordingLimitChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserReachedRecordingLimitChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserReachedRecordingLimitChecklistItemMutation, { data, loading, error }] = useUpdateUserReachedRecordingLimitChecklistItemMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserReachedRecordingLimitChecklistItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserReachedRecordingLimitChecklistItemMutation, UpdateUserReachedRecordingLimitChecklistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserReachedRecordingLimitChecklistItemMutation, UpdateUserReachedRecordingLimitChecklistItemMutationVariables>(UpdateUserReachedRecordingLimitChecklistItemDocument, options);
      }
export type UpdateUserReachedRecordingLimitChecklistItemMutationHookResult = ReturnType<typeof useUpdateUserReachedRecordingLimitChecklistItemMutation>;
export type UpdateUserReachedRecordingLimitChecklistItemMutationResult = Apollo.MutationResult<UpdateUserReachedRecordingLimitChecklistItemMutation>;
export type UpdateUserReachedRecordingLimitChecklistItemMutationOptions = Apollo.BaseMutationOptions<UpdateUserReachedRecordingLimitChecklistItemMutation, UpdateUserReachedRecordingLimitChecklistItemMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;