import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ToggleFollowingProfileMutationVariables = Types.Exact<{
  profileId: Types.Scalars['ID']['input'];
  follow: Types.Scalars['Boolean']['input'];
}>;


export type ToggleFollowingProfileMutation = { __typename: 'Mutation', result: { __typename: 'EntityNotFoundError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserFollowsStream', id: string | null, follow: boolean | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ToggleFollowingProfileDocument = gql`
    mutation ToggleFollowingProfile($profileId: ID!, $follow: Boolean!) {
  result: toggleFollowingProfile(profileId: $profileId, follow: $follow) {
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
export type ToggleFollowingProfileMutationFn = Apollo.MutationFunction<ToggleFollowingProfileMutation, ToggleFollowingProfileMutationVariables>;

/**
 * __useToggleFollowingProfileMutation__
 *
 * To run a mutation, you first call `useToggleFollowingProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFollowingProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFollowingProfileMutation, { data, loading, error }] = useToggleFollowingProfileMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      follow: // value for 'follow'
 *   },
 * });
 */
export function useToggleFollowingProfileMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFollowingProfileMutation, ToggleFollowingProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFollowingProfileMutation, ToggleFollowingProfileMutationVariables>(ToggleFollowingProfileDocument, options);
      }
export type ToggleFollowingProfileMutationHookResult = ReturnType<typeof useToggleFollowingProfileMutation>;
export type ToggleFollowingProfileMutationResult = Apollo.MutationResult<ToggleFollowingProfileMutation>;
export type ToggleFollowingProfileMutationOptions = Apollo.BaseMutationOptions<ToggleFollowingProfileMutation, ToggleFollowingProfileMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;