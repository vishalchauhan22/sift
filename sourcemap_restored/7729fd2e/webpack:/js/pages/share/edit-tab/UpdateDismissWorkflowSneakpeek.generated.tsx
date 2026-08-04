import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateDismissWorkflowSneakpeekMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  dismissWorkflowSneakpeek: Types.Scalars['Boolean']['input'];
}>;


export type UpdateDismissWorkflowSneakpeekMutation = { __typename: 'Mutation', result: { __typename: 'GenericError' } | { __typename: 'UpdateDismissWorkflowSneakpeekPayload', success: boolean } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'VideoNotFoundError', message: string } | null };


export const UpdateDismissWorkflowSneakpeekDocument = gql`
    mutation UpdateDismissWorkflowSneakpeek($videoId: ID!, $dismissWorkflowSneakpeek: Boolean!) {
  result: updateDismissWorkflowSneakpeek(
    videoId: $videoId
    dismissWorkflowSneakpeek: $dismissWorkflowSneakpeek
  ) {
    ... on UpdateDismissWorkflowSneakpeekPayload {
      success
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on VideoNotFoundError {
      message
    }
  }
}
    `;
export type UpdateDismissWorkflowSneakpeekMutationFn = Apollo.MutationFunction<UpdateDismissWorkflowSneakpeekMutation, UpdateDismissWorkflowSneakpeekMutationVariables>;

/**
 * __useUpdateDismissWorkflowSneakpeekMutation__
 *
 * To run a mutation, you first call `useUpdateDismissWorkflowSneakpeekMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDismissWorkflowSneakpeekMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDismissWorkflowSneakpeekMutation, { data, loading, error }] = useUpdateDismissWorkflowSneakpeekMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      dismissWorkflowSneakpeek: // value for 'dismissWorkflowSneakpeek'
 *   },
 * });
 */
export function useUpdateDismissWorkflowSneakpeekMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDismissWorkflowSneakpeekMutation, UpdateDismissWorkflowSneakpeekMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDismissWorkflowSneakpeekMutation, UpdateDismissWorkflowSneakpeekMutationVariables>(UpdateDismissWorkflowSneakpeekDocument, options);
      }
export type UpdateDismissWorkflowSneakpeekMutationHookResult = ReturnType<typeof useUpdateDismissWorkflowSneakpeekMutation>;
export type UpdateDismissWorkflowSneakpeekMutationResult = Apollo.MutationResult<UpdateDismissWorkflowSneakpeekMutation>;
export type UpdateDismissWorkflowSneakpeekMutationOptions = Apollo.BaseMutationOptions<UpdateDismissWorkflowSneakpeekMutation, UpdateDismissWorkflowSneakpeekMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;