import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateLastWatchTimeMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  timestamp?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UpdateLastWatchTimeMutation = { __typename: 'Mutation', updateLastWatchTime: { __typename: 'GenericError' } | { __typename: 'UpdateWatchTimePayload', success: boolean } | null };


export const UpdateLastWatchTimeDocument = gql`
    mutation UpdateLastWatchTime($videoId: ID!, $timestamp: Int) {
  updateLastWatchTime(videoId: $videoId, timestamp: $timestamp) {
    ... on UpdateWatchTimePayload {
      success
    }
  }
}
    `;
export type UpdateLastWatchTimeMutationFn = Apollo.MutationFunction<UpdateLastWatchTimeMutation, UpdateLastWatchTimeMutationVariables>;

/**
 * __useUpdateLastWatchTimeMutation__
 *
 * To run a mutation, you first call `useUpdateLastWatchTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastWatchTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastWatchTimeMutation, { data, loading, error }] = useUpdateLastWatchTimeMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useUpdateLastWatchTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLastWatchTimeMutation, UpdateLastWatchTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLastWatchTimeMutation, UpdateLastWatchTimeMutationVariables>(UpdateLastWatchTimeDocument, options);
      }
export type UpdateLastWatchTimeMutationHookResult = ReturnType<typeof useUpdateLastWatchTimeMutation>;
export type UpdateLastWatchTimeMutationResult = Apollo.MutationResult<UpdateLastWatchTimeMutation>;
export type UpdateLastWatchTimeMutationOptions = Apollo.BaseMutationOptions<UpdateLastWatchTimeMutation, UpdateLastWatchTimeMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;