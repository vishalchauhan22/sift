import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoTaskResponseFragmentFragmentDoc } from './VideoTaskResponseFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RespondToVideoTaskMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  responded: Types.Scalars['Boolean']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RespondToVideoTaskMutation = { __typename: 'Mutation', respondToVideoTask: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'RespondToVideoTaskPayload', task: { __typename: 'VideoTask', id: string, responses: Array<{ __typename: 'ActivityResponse', id: string, responded_at: string | null, user: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null }> } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const RespondToVideoTaskDocument = gql`
    mutation RespondToVideoTask($id: ID!, $responded: Boolean!, $password: String) {
  respondToVideoTask(id: $id, responded: $responded, password: $password) {
    __typename
    ... on RespondToVideoTaskPayload {
      task {
        id
        responses(useMaster: true) {
          ...VideoTaskResponseFragment
        }
      }
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
    ${VideoTaskResponseFragmentFragmentDoc}`;
export type RespondToVideoTaskMutationFn = Apollo.MutationFunction<RespondToVideoTaskMutation, RespondToVideoTaskMutationVariables>;

/**
 * __useRespondToVideoTaskMutation__
 *
 * To run a mutation, you first call `useRespondToVideoTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToVideoTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToVideoTaskMutation, { data, loading, error }] = useRespondToVideoTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      responded: // value for 'responded'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRespondToVideoTaskMutation(baseOptions?: Apollo.MutationHookOptions<RespondToVideoTaskMutation, RespondToVideoTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondToVideoTaskMutation, RespondToVideoTaskMutationVariables>(RespondToVideoTaskDocument, options);
      }
export type RespondToVideoTaskMutationHookResult = ReturnType<typeof useRespondToVideoTaskMutation>;
export type RespondToVideoTaskMutationResult = Apollo.MutationResult<RespondToVideoTaskMutation>;
export type RespondToVideoTaskMutationOptions = Apollo.BaseMutationOptions<RespondToVideoTaskMutation, RespondToVideoTaskMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;