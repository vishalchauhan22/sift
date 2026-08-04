import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveVideoFromWatchLaterListMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type RemoveVideoFromWatchLaterListMutation = { __typename: 'Mutation', removeVideoFromWatchLaterList: { __typename: 'GenericError', message: string } | { __typename: 'RemoveVideoFromWatchLaterListPayload', success: boolean | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const RemoveVideoFromWatchLaterListDocument = gql`
    mutation RemoveVideoFromWatchLaterList($videoId: ID!) {
  removeVideoFromWatchLaterList(videoId: $videoId) {
    ... on RemoveVideoFromWatchLaterListPayload {
      success
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on GenericError {
      message
    }
    __typename
  }
}
    `;
export type RemoveVideoFromWatchLaterListMutationFn = Apollo.MutationFunction<RemoveVideoFromWatchLaterListMutation, RemoveVideoFromWatchLaterListMutationVariables>;

/**
 * __useRemoveVideoFromWatchLaterListMutation__
 *
 * To run a mutation, you first call `useRemoveVideoFromWatchLaterListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVideoFromWatchLaterListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVideoFromWatchLaterListMutation, { data, loading, error }] = useRemoveVideoFromWatchLaterListMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useRemoveVideoFromWatchLaterListMutation(baseOptions?: Apollo.MutationHookOptions<RemoveVideoFromWatchLaterListMutation, RemoveVideoFromWatchLaterListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveVideoFromWatchLaterListMutation, RemoveVideoFromWatchLaterListMutationVariables>(RemoveVideoFromWatchLaterListDocument, options);
      }
export type RemoveVideoFromWatchLaterListMutationHookResult = ReturnType<typeof useRemoveVideoFromWatchLaterListMutation>;
export type RemoveVideoFromWatchLaterListMutationResult = Apollo.MutationResult<RemoveVideoFromWatchLaterListMutation>;
export type RemoveVideoFromWatchLaterListMutationOptions = Apollo.BaseMutationOptions<RemoveVideoFromWatchLaterListMutation, RemoveVideoFromWatchLaterListMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;