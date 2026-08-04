import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResetDraftToReadyToEditMutationVariables = Types.Exact<{
  videoDraftId: Types.Scalars['ID']['input'];
}>;


export type ResetDraftToReadyToEditMutation = { __typename: 'Mutation', resetDraftToReadyToEdit: { __typename: 'GenericError', message: string, error: string | null } | { __typename: 'InputValidationError', message: string } | { __typename: 'ResetDraftToReadyToEditPayload', success: boolean } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ResetDraftToReadyToEditDocument = gql`
    mutation ResetDraftToReadyToEdit($videoDraftId: ID!) {
  resetDraftToReadyToEdit(videoDraftId: $videoDraftId) {
    __typename
    ... on GenericError {
      message
      error
    }
    ... on InputValidationError {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on ResetDraftToReadyToEditPayload {
      success
    }
  }
}
    `;
export type ResetDraftToReadyToEditMutationFn = Apollo.MutationFunction<ResetDraftToReadyToEditMutation, ResetDraftToReadyToEditMutationVariables>;

/**
 * __useResetDraftToReadyToEditMutation__
 *
 * To run a mutation, you first call `useResetDraftToReadyToEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetDraftToReadyToEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetDraftToReadyToEditMutation, { data, loading, error }] = useResetDraftToReadyToEditMutation({
 *   variables: {
 *      videoDraftId: // value for 'videoDraftId'
 *   },
 * });
 */
export function useResetDraftToReadyToEditMutation(baseOptions?: Apollo.MutationHookOptions<ResetDraftToReadyToEditMutation, ResetDraftToReadyToEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetDraftToReadyToEditMutation, ResetDraftToReadyToEditMutationVariables>(ResetDraftToReadyToEditDocument, options);
      }
export type ResetDraftToReadyToEditMutationHookResult = ReturnType<typeof useResetDraftToReadyToEditMutation>;
export type ResetDraftToReadyToEditMutationResult = Apollo.MutationResult<ResetDraftToReadyToEditMutation>;
export type ResetDraftToReadyToEditMutationOptions = Apollo.BaseMutationOptions<ResetDraftToReadyToEditMutation, ResetDraftToReadyToEditMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;