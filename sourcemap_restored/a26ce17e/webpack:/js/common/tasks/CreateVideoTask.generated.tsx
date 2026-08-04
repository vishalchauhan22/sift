import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoTaskFragmentFragmentDoc } from './VideoTaskFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateVideoTaskMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  content: Types.Scalars['String']['input'];
  timestamp: Types.Scalars['Int']['input'];
}>;


export type CreateVideoTaskMutation = { __typename: 'Mutation', createVideoTask: { __typename: 'CreateVideoTaskPayload', task: { __typename: 'VideoTask', id: string, video_id: string, time_stamp: number, activity_type: Types.VideoActivityType | null, content: string | null, createdAt: string | null, approved_at: string | null, resolved_at: string | null, source: Types.VideoActivitySource, owner: { __typename: 'RegularUser', id: string, display_name: string } | null, responses: Array<{ __typename: 'ActivityResponse', id: string, responded_at: string | null, user: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null }> } | null } | { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const CreateVideoTaskDocument = gql`
    mutation CreateVideoTask($videoId: ID!, $content: String!, $timestamp: Int!) {
  createVideoTask(videoId: $videoId, content: $content, timestamp: $timestamp) {
    __typename
    ... on CreateVideoTaskPayload {
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
export type CreateVideoTaskMutationFn = Apollo.MutationFunction<CreateVideoTaskMutation, CreateVideoTaskMutationVariables>;

/**
 * __useCreateVideoTaskMutation__
 *
 * To run a mutation, you first call `useCreateVideoTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoTaskMutation, { data, loading, error }] = useCreateVideoTaskMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      content: // value for 'content'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useCreateVideoTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoTaskMutation, CreateVideoTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoTaskMutation, CreateVideoTaskMutationVariables>(CreateVideoTaskDocument, options);
      }
export type CreateVideoTaskMutationHookResult = ReturnType<typeof useCreateVideoTaskMutation>;
export type CreateVideoTaskMutationResult = Apollo.MutationResult<CreateVideoTaskMutation>;
export type CreateVideoTaskMutationOptions = Apollo.BaseMutationOptions<CreateVideoTaskMutation, CreateVideoTaskMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;