import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
export type CommentReplyFragmentFragment = { __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, user_id: number | null, anon_user_id: string | null, createdAt: string | null, isChatMessage: boolean, comment_post_idv2: string | null, extended_reaction: string | null, guid: string, locallyDeleted: boolean | null, inFlightContent: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null };

export const CommentReplyFragmentFragmentDoc = gql`
    fragment CommentReplyFragment on PublicVideoComment {
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
  user_id
  anon_user_id
  createdAt
  isChatMessage
  comment_post_idv2
  extended_reaction
  guid
  locallyDeleted @client
  inFlightContent @client
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;