import * as Types from '../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAutoCommentDisplayControlsMutationVariables = Types.Exact<{
  videoId: Types.Scalars['String']['input'];
  target: Types.AutoCommentUpdateTarget;
}>;


export type UpdateAutoCommentDisplayControlsMutation = { __typename: 'Mutation', updateAutoCommentDisplayControls: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError' } | { __typename: 'UpdateAutoCommentControlsResponse', success: boolean } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const UpdateAutoCommentDisplayControlsDocument = gql`
    mutation UpdateAutoCommentDisplayControls($videoId: String!, $target: AutoCommentUpdateTarget!) {
  updateAutoCommentDisplayControls(videoId: $videoId, target: $target) {
    __typename
    ... on UpdateAutoCommentControlsResponse {
      success
    }
    ... on GenericError {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
  }
}
    `;
export type UpdateAutoCommentDisplayControlsMutationFn = Apollo.MutationFunction<UpdateAutoCommentDisplayControlsMutation, UpdateAutoCommentDisplayControlsMutationVariables>;

/**
 * __useUpdateAutoCommentDisplayControlsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoCommentDisplayControlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoCommentDisplayControlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoCommentDisplayControlsMutation, { data, loading, error }] = useUpdateAutoCommentDisplayControlsMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      target: // value for 'target'
 *   },
 * });
 */
export function useUpdateAutoCommentDisplayControlsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAutoCommentDisplayControlsMutation, UpdateAutoCommentDisplayControlsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAutoCommentDisplayControlsMutation, UpdateAutoCommentDisplayControlsMutationVariables>(UpdateAutoCommentDisplayControlsDocument, options);
      }
export type UpdateAutoCommentDisplayControlsMutationHookResult = ReturnType<typeof useUpdateAutoCommentDisplayControlsMutation>;
export type UpdateAutoCommentDisplayControlsMutationResult = Apollo.MutationResult<UpdateAutoCommentDisplayControlsMutation>;
export type UpdateAutoCommentDisplayControlsMutationOptions = Apollo.BaseMutationOptions<UpdateAutoCommentDisplayControlsMutation, UpdateAutoCommentDisplayControlsMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;