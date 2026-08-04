import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
export type EditTabVideoTrimsFragment = { __typename: 'RegularUserVideo', id: string, playable_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null } };

export const EditTabVideoTrimsFragmentDoc = gql`
    fragment EditTabVideoTrims on RegularUserVideo {
  id
  playable_duration
  processing_information {
    trim_id
    trim_progress
    trim_ranges {
      from
      to
    }
    videoUploadValid
  }
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;