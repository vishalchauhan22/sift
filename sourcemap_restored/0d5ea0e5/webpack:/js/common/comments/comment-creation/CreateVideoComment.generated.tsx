import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UtilityCreateVideoCommentMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  content: Types.Scalars['String']['input'];
  timestamp: Types.Scalars['Int']['input'];
  mentions?: Types.InputMaybe<Types.VideoCommentContentMentionsInput>;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  anonUserName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  parentPostIdV2?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type UtilityCreateVideoCommentMutation = { __typename: 'Mutation', createVideoComment: { __typename: 'PublicVideoComment', comment_post_idv2: string | null, createdAt: string | null, id: string, content: string | null, time_stamp: number | null, user_id: number | null, user_name: string | null, anon_user_id: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string } | null, children_comments: Array<{ __typename: 'PublicVideoComment', id: string } | null> | null } | null };


export const UtilityCreateVideoCommentDocument = gql`
    mutation UtilityCreateVideoComment($videoId: ID!, $content: String!, $timestamp: Int!, $mentions: VideoCommentContentMentionsInput, $password: String, $anonUserName: String, $parentPostIdV2: ID) {
  createVideoComment(
    videoId: $videoId
    content: $content
    timestamp: $timestamp
    mentions: $mentions
    password: $password
    anonUserName: $anonUserName
    parentPostIdV2: $parentPostIdV2
  ) {
    avatar {
      name
      thumb
    }
    comment_post_idv2
    createdAt
    id
    content(withMentionMarkups: true)
    time_stamp(password: $password)
    user_id
    user_name
    anon_user_id
    children_comments {
      id
    }
  }
}
    `;
export type UtilityCreateVideoCommentMutationFn = Apollo.MutationFunction<UtilityCreateVideoCommentMutation, UtilityCreateVideoCommentMutationVariables>;

/**
 * __useUtilityCreateVideoCommentMutation__
 *
 * To run a mutation, you first call `useUtilityCreateVideoCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUtilityCreateVideoCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [utilityCreateVideoCommentMutation, { data, loading, error }] = useUtilityCreateVideoCommentMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      content: // value for 'content'
 *      timestamp: // value for 'timestamp'
 *      mentions: // value for 'mentions'
 *      password: // value for 'password'
 *      anonUserName: // value for 'anonUserName'
 *      parentPostIdV2: // value for 'parentPostIdV2'
 *   },
 * });
 */
export function useUtilityCreateVideoCommentMutation(baseOptions?: Apollo.MutationHookOptions<UtilityCreateVideoCommentMutation, UtilityCreateVideoCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UtilityCreateVideoCommentMutation, UtilityCreateVideoCommentMutationVariables>(UtilityCreateVideoCommentDocument, options);
      }
export type UtilityCreateVideoCommentMutationHookResult = ReturnType<typeof useUtilityCreateVideoCommentMutation>;
export type UtilityCreateVideoCommentMutationResult = Apollo.MutationResult<UtilityCreateVideoCommentMutation>;
export type UtilityCreateVideoCommentMutationOptions = Apollo.BaseMutationOptions<UtilityCreateVideoCommentMutation, UtilityCreateVideoCommentMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;