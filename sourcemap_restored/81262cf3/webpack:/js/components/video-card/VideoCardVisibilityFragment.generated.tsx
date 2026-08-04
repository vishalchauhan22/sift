import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
export type VideoCardVisibilityFragmentFragment = { __typename: 'RegularUserVideo', visibility: Types.VideoVisibilityType, privacy: Types.VideoPrivacyStatus | null, currentUserCanEdit: boolean, spaces: Array<{ __typename: 'SpaceRegularUserVideo', name: string, id: string, privacy: Types.SpacePrivacy | null, isArchived: boolean | null } | null> | null, organization: { __typename: 'Organization', id: string, name: string } };

export const VideoCardVisibilityFragmentFragmentDoc = gql`
    fragment VideoCardVisibilityFragment on RegularUserVideo {
  visibility
  spaces {
    name
    id
    privacy
    isArchived
  }
  organization {
    id
    name
  }
  privacy
  currentUserCanEdit
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;