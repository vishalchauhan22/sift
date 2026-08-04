import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteVideoReactionMutationVariables = Types.Exact<{
  reactionId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DeleteVideoReactionMutation = { __typename: 'Mutation', deleteVideoReaction: boolean | null };


export const DeleteVideoReactionDocument = gql`
    mutation DeleteVideoReaction($reactionId: ID!, $password: String) {
  deleteVideoReaction(reactionId: $reactionId, password: $password)
}
    `;
export type DeleteVideoReactionMutationFn = Apollo.MutationFunction<DeleteVideoReactionMutation, DeleteVideoReactionMutationVariables>;

/**
 * __useDeleteVideoReactionMutation__
 *
 * To run a mutation, you first call `useDeleteVideoReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoReactionMutation, { data, loading, error }] = useDeleteVideoReactionMutation({
 *   variables: {
 *      reactionId: // value for 'reactionId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteVideoReactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVideoReactionMutation, DeleteVideoReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVideoReactionMutation, DeleteVideoReactionMutationVariables>(DeleteVideoReactionDocument, options);
      }
export type DeleteVideoReactionMutationHookResult = ReturnType<typeof useDeleteVideoReactionMutation>;
export type DeleteVideoReactionMutationResult = Apollo.MutationResult<DeleteVideoReactionMutation>;
export type DeleteVideoReactionMutationOptions = Apollo.BaseMutationOptions<DeleteVideoReactionMutation, DeleteVideoReactionMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;