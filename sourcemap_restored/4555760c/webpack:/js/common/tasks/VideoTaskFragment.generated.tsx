import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoTaskResponseFragmentFragmentDoc } from './VideoTaskResponseFragment.generated';
export type VideoTaskFragmentFragment = { __typename: 'VideoTask', id: string, video_id: string, time_stamp: number, activity_type: Types.VideoActivityType | null, content: string | null, createdAt: string | null, approved_at: string | null, resolved_at: string | null, source: Types.VideoActivitySource, owner: { __typename: 'RegularUser', id: string, display_name: string } | null, responses: Array<{ __typename: 'ActivityResponse', id: string, responded_at: string | null, user: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null }> };

export const VideoTaskFragmentFragmentDoc = gql`
    fragment VideoTaskFragment on VideoTask {
  id
  video_id
  owner {
    id
    display_name
  }
  time_stamp
  activity_type
  content(withMentionMarkups: true)
  createdAt
  approved_at
  resolved_at
  responses {
    ...VideoTaskResponseFragment
  }
  source
}
    ${VideoTaskResponseFragmentFragmentDoc}`;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;