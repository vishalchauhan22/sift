import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteVideoTaskMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteVideoTaskMutation = { __typename: 'Mutation', deleteVideoTask: { __typename: 'DeleteVideoTaskPayload', success: boolean | null } | { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const DeleteVideoTaskDocument = gql`
    mutation DeleteVideoTask($id: ID!) {
  deleteVideoTask(id: $id) {
    __typename
    ... on DeleteVideoTaskPayload {
      success
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on GenericError {
      message
    }
  }
}
    `;
export type DeleteVideoTaskMutationFn = Apollo.MutationFunction<DeleteVideoTaskMutation, DeleteVideoTaskMutationVariables>;

/**
 * __useDeleteVideoTaskMutation__
 *
 * To run a mutation, you first call `useDeleteVideoTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoTaskMutation, { data, loading, error }] = useDeleteVideoTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVideoTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVideoTaskMutation, DeleteVideoTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVideoTaskMutation, DeleteVideoTaskMutationVariables>(DeleteVideoTaskDocument, options);
      }
export type DeleteVideoTaskMutationHookResult = ReturnType<typeof useDeleteVideoTaskMutation>;
export type DeleteVideoTaskMutationResult = Apollo.MutationResult<DeleteVideoTaskMutation>;
export type DeleteVideoTaskMutationOptions = Apollo.BaseMutationOptions<DeleteVideoTaskMutation, DeleteVideoTaskMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;