import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoTaskFragmentFragmentDoc } from './VideoTaskFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVideoTaskMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  content?: Types.InputMaybe<Types.Scalars['String']['input']>;
  timestamp?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UpdateVideoTaskMutation = { __typename: 'Mutation', updateVideoTask: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UpdateVideoTaskPayload', task: { __typename: 'VideoTask', id: string, video_id: string, time_stamp: number, activity_type: Types.VideoActivityType | null, content: string | null, createdAt: string | null, approved_at: string | null, resolved_at: string | null, source: Types.VideoActivitySource, owner: { __typename: 'RegularUser', id: string, display_name: string } | null, responses: Array<{ __typename: 'ActivityResponse', id: string, responded_at: string | null, user: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null }> } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const UpdateVideoTaskDocument = gql`
    mutation UpdateVideoTask($id: ID!, $content: String, $timestamp: Int) {
  updateVideoTask(id: $id, content: $content, timestamp: $timestamp) {
    __typename
    ... on UpdateVideoTaskPayload {
      task {
        ...VideoTaskFragment
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
    ${VideoTaskFragmentFragmentDoc}`;
export type UpdateVideoTaskMutationFn = Apollo.MutationFunction<UpdateVideoTaskMutation, UpdateVideoTaskMutationVariables>;

/**
 * __useUpdateVideoTaskMutation__
 *
 * To run a mutation, you first call `useUpdateVideoTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoTaskMutation, { data, loading, error }] = useUpdateVideoTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useUpdateVideoTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoTaskMutation, UpdateVideoTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoTaskMutation, UpdateVideoTaskMutationVariables>(UpdateVideoTaskDocument, options);
      }
export type UpdateVideoTaskMutationHookResult = ReturnType<typeof useUpdateVideoTaskMutation>;
export type UpdateVideoTaskMutationResult = Apollo.MutationResult<UpdateVideoTaskMutation>;
export type UpdateVideoTaskMutationOptions = Apollo.BaseMutationOptions<UpdateVideoTaskMutation, UpdateVideoTaskMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;