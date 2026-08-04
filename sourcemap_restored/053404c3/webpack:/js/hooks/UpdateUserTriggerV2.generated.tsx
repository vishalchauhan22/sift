import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserTriggerV2MutationVariables = Types.Exact<{
  triggers: Types.UpdateUserTriggerV2Input;
}>;


export type UpdateUserTriggerV2Mutation = { __typename: 'Mutation', updateUserTriggerV2: { __typename: 'GenericError', message: string, error: string | null } | { __typename: 'UpdateUserTriggerV2Payload', user: { __typename: 'RegularUser', id: string, triggers: Array<{ __typename: 'CompletableTrigger', complete: boolean, name: string, show: boolean } | null> | null } | null } | { __typename: 'UserNotAuthorizedError', message: string, feature: { __typename: 'Feature', name: string | null } | null } | null };


export const UpdateUserTriggerV2Document = gql`
    mutation UpdateUserTriggerV2($triggers: UpdateUserTriggerV2Input!) {
  updateUserTriggerV2(triggers: $triggers) {
    ... on GenericError {
      __typename
      message
      error
    }
    ... on UserNotAuthorizedError {
      __typename
      message
      feature {
        name
      }
    }
    ... on UpdateUserTriggerV2Payload {
      __typename
      user {
        id
        triggers {
          complete
          name
          show
        }
      }
    }
  }
}
    `;
export type UpdateUserTriggerV2MutationFn = Apollo.MutationFunction<UpdateUserTriggerV2Mutation, UpdateUserTriggerV2MutationVariables>;

/**
 * __useUpdateUserTriggerV2Mutation__
 *
 * To run a mutation, you first call `useUpdateUserTriggerV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTriggerV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserTriggerV2Mutation, { data, loading, error }] = useUpdateUserTriggerV2Mutation({
 *   variables: {
 *      triggers: // value for 'triggers'
 *   },
 * });
 */
export function useUpdateUserTriggerV2Mutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserTriggerV2Mutation, UpdateUserTriggerV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserTriggerV2Mutation, UpdateUserTriggerV2MutationVariables>(UpdateUserTriggerV2Document, options);
      }
export type UpdateUserTriggerV2MutationHookResult = ReturnType<typeof useUpdateUserTriggerV2Mutation>;
export type UpdateUserTriggerV2MutationResult = Apollo.MutationResult<UpdateUserTriggerV2Mutation>;
export type UpdateUserTriggerV2MutationOptions = Apollo.BaseMutationOptions<UpdateUserTriggerV2Mutation, UpdateUserTriggerV2MutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;