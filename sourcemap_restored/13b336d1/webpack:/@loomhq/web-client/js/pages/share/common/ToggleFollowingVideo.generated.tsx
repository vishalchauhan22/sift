import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ToggleFollowingVideoMutationVariables = Types.Exact<{
  videoId: Types.Scalars['String']['input'];
  follow: Types.Scalars['Boolean']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ToggleFollowingVideoMutation = { __typename: 'Mutation', result: { __typename: 'EntityNotFoundError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning' } | { __typename: 'UserFollowsStream', id: string | null, follow: boolean | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ToggleFollowingVideoDocument = gql`
    mutation ToggleFollowingVideo($videoId: String!, $follow: Boolean!, $password: String) {
  result: toggleFollowingVideo(
    videoId: $videoId
    follow: $follow
    password: $password
  ) {
    ... on UserFollowsStream {
      id
      follow
    }
    ... on Error {
      __typename
      message
    }
  }
}
    `;
export type ToggleFollowingVideoMutationFn = Apollo.MutationFunction<ToggleFollowingVideoMutation, ToggleFollowingVideoMutationVariables>;

/**
 * __useToggleFollowingVideoMutation__
 *
 * To run a mutation, you first call `useToggleFollowingVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFollowingVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFollowingVideoMutation, { data, loading, error }] = useToggleFollowingVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      follow: // value for 'follow'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useToggleFollowingVideoMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFollowingVideoMutation, ToggleFollowingVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFollowingVideoMutation, ToggleFollowingVideoMutationVariables>(ToggleFollowingVideoDocument, options);
      }
export type ToggleFollowingVideoMutationHookResult = ReturnType<typeof useToggleFollowingVideoMutation>;
export type ToggleFollowingVideoMutationResult = Apollo.MutationResult<ToggleFollowingVideoMutation>;
export type ToggleFollowingVideoMutationOptions = Apollo.BaseMutationOptions<ToggleFollowingVideoMutation, ToggleFollowingVideoMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;