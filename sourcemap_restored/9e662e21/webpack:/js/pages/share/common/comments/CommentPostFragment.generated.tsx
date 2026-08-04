import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { CommentReplyFragmentFragmentDoc } from './CommentReplyFragment.generated';
export type CommentPostFragmentFragment = { __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, createdAt: string | null, isChatMessage: boolean, user_id: number | null, anon_user_id: string | null, deletedAt: string | null, locallyDeleted: boolean | null, inFlightContent: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null, children_comments: Array<{ __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, user_id: number | null, anon_user_id: string | null, createdAt: string | null, isChatMessage: boolean, comment_post_idv2: string | null, extended_reaction: string | null, locallyDeleted: boolean | null, inFlightContent: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null } | null> | null };

export const CommentPostFragmentFragmentDoc = gql`
    fragment CommentPostFragment on PublicVideoComment {
  id
  content(withMentionMarkups: true)
  plainContent: content(withMentionMarkups: false)
  time_stamp(password: $password)
  user_name
  avatar {
    name
    thumb
    isAtlassianMastered
  }
  edited
  createdAt
  isChatMessage
  user_id
  anon_user_id
  deletedAt
  locallyDeleted @client
  inFlightContent @client
  children_comments {
    ...CommentReplyFragment
  }
}
    ${CommentReplyFragmentFragmentDoc}`;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;