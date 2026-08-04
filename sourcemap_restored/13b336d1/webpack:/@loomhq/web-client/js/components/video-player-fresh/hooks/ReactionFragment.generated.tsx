import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
export type VideoPlayerReactionFragmentFragment = { __typename: 'PublicVideoReaction', id: string, time: number, reaction: number, extended_reaction: string | null, anon_user_id: string | null, anon_user_name: string | null, locallyCreated: boolean | null, localId: string | null, user: { __typename: 'RegularUser', id: string, display_name: string } | null };

export const VideoPlayerReactionFragmentFragmentDoc = gql`
    fragment VideoPlayerReactionFragment on PublicVideoReaction {
  id
  time
  user {
    id
    display_name
  }
  reaction
  extended_reaction
  anon_user_id
  anon_user_name
  locallyCreated @client
  localId @client
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;