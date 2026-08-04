import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DuplicateVideoMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  newName: Types.Scalars['String']['input'];
  spaceId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DuplicateVideoMutation = { __typename: 'Mutation', duplicateVideo: { __typename: 'DuplicateVideoPayload', newVideo: { __typename: 'RegularUserVideo', id: string, name: string } | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const DuplicateVideoDocument = gql`
    mutation DuplicateVideo($videoId: ID!, $newName: String!, $spaceId: ID, $password: String) {
  duplicateVideo(
    videoId: $videoId
    newName: $newName
    spaceId: $spaceId
    password: $password
  ) {
    __typename
    ... on GenericError {
      __typename
      message
    }
    ... on DuplicateVideoPayload {
      __typename
      newVideo {
        __typename
        id
        name
      }
    }
  }
}
    `;
export type DuplicateVideoMutationFn = Apollo.MutationFunction<DuplicateVideoMutation, DuplicateVideoMutationVariables>;

/**
 * __useDuplicateVideoMutation__
 *
 * To run a mutation, you first call `useDuplicateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateVideoMutation, { data, loading, error }] = useDuplicateVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      newName: // value for 'newName'
 *      spaceId: // value for 'spaceId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDuplicateVideoMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateVideoMutation, DuplicateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateVideoMutation, DuplicateVideoMutationVariables>(DuplicateVideoDocument, options);
      }
export type DuplicateVideoMutationHookResult = ReturnType<typeof useDuplicateVideoMutation>;
export type DuplicateVideoMutationResult = Apollo.MutationResult<DuplicateVideoMutation>;
export type DuplicateVideoMutationOptions = Apollo.BaseMutationOptions<DuplicateVideoMutation, DuplicateVideoMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;