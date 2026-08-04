import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { CommentReplyFragmentFragmentDoc } from './CommentReplyFragment.generated';
import { CommentPostFragmentFragmentDoc } from './CommentPostFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CommentAddedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CommentAddedSubscription = { __typename: 'Subscription', videoCommentAdded: { __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, user_id: number | null, anon_user_id: string | null, createdAt: string | null, isChatMessage: boolean, comment_post_idv2: string | null, extended_reaction: string | null, locallyDeleted: boolean | null, inFlightContent: string | null, deletedAt: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null, children_comments: Array<{ __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, user_id: number | null, anon_user_id: string | null, createdAt: string | null, isChatMessage: boolean, comment_post_idv2: string | null, extended_reaction: string | null, locallyDeleted: boolean | null, inFlightContent: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null } | null> | null } };


export const CommentAddedDocument = gql`
    subscription CommentAdded($videoId: ID!, $password: String) {
  videoCommentAdded(videoId: $videoId, password: $password) {
    ...CommentReplyFragment
    ...CommentPostFragment
  }
}
    ${CommentReplyFragmentFragmentDoc}
${CommentPostFragmentFragmentDoc}`;

/**
 * __useCommentAddedSubscription__
 *
 * To run a query within a React component, call `useCommentAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentAddedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCommentAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CommentAddedSubscription, CommentAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentAddedSubscription, CommentAddedSubscriptionVariables>(CommentAddedDocument, options);
      }
export type CommentAddedSubscriptionHookResult = ReturnType<typeof useCommentAddedSubscription>;
export type CommentAddedSubscriptionResult = Apollo.SubscriptionResult<CommentAddedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;