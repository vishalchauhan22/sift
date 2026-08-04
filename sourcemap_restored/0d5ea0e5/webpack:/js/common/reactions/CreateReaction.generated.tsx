import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ReactionFragmentFragmentDoc } from './ReactionFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddVideoReactionMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  time: Types.Scalars['Int']['input'];
  type: Types.Scalars['String']['input'];
  userName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  reactionType?: Types.InputMaybe<Types.ReactionType>;
}>;


export type AddVideoReactionMutation = { __typename: 'Mutation', addVideoReaction: { __typename: 'PublicVideoReaction', id: string, time: number, reaction: number, extended_reaction: string | null, anon_user_id: string | null, anon_user_name: string | null, locallyCreated: boolean | null, localId: string | null, user: { __typename: 'RegularUser', id: string, display_name: string } | null } | null };


export const AddVideoReactionDocument = gql`
    mutation addVideoReaction($videoId: ID!, $time: Int!, $type: String!, $userName: String, $password: String, $reactionType: ReactionType) {
  addVideoReaction(
    videoId: $videoId
    time: $time
    type: $type
    userName: $userName
    password: $password
    reactionType: $reactionType
  ) {
    ...ReactionFragment
  }
}
    ${ReactionFragmentFragmentDoc}`;
export type AddVideoReactionMutationFn = Apollo.MutationFunction<AddVideoReactionMutation, AddVideoReactionMutationVariables>;

/**
 * __useAddVideoReactionMutation__
 *
 * To run a mutation, you first call `useAddVideoReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVideoReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVideoReactionMutation, { data, loading, error }] = useAddVideoReactionMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      time: // value for 'time'
 *      type: // value for 'type'
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *      reactionType: // value for 'reactionType'
 *   },
 * });
 */
export function useAddVideoReactionMutation(baseOptions?: Apollo.MutationHookOptions<AddVideoReactionMutation, AddVideoReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVideoReactionMutation, AddVideoReactionMutationVariables>(AddVideoReactionDocument, options);
      }
export type AddVideoReactionMutationHookResult = ReturnType<typeof useAddVideoReactionMutation>;
export type AddVideoReactionMutationResult = Apollo.MutationResult<AddVideoReactionMutation>;
export type AddVideoReactionMutationOptions = Apollo.BaseMutationOptions<AddVideoReactionMutation, AddVideoReactionMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;