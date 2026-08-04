import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
export type VideoTaskResponseFragmentFragment = { __typename: 'ActivityResponse', id: string, responded_at: string | null, user: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null };

export const VideoTaskResponseFragmentFragmentDoc = gql`
    fragment VideoTaskResponseFragment on ActivityResponse {
  id
  responded_at
  user {
    id
    display_name
    avatars {
      thumb
    }
  }
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;