import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditClipDimensionsFragmentDoc } from '../../../common/use-clips-dimensions/ConsolidatedEditGetClipDimensions.generated';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../../preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditClipFragment = { __typename: 'VideoClipDetails', id: string, name: string | null, source_duration: number | null, playable_duration: number | null, source_video_id: string | null, currentUserIsSourceOwner: boolean, isSourceVideoMeetingRecording: boolean, isSourceVideoExternalUpload: boolean, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } };

export type ConsolidatedEditVideoClipsFragment = { __typename: 'RegularUserVideo', id: string, source_duration: number | null, playable_duration: number | null, clips: Array<{ __typename: 'VideoClipDetails', id: string, name: string | null, source_duration: number | null, playable_duration: number | null, source_video_id: string | null, currentUserIsSourceOwner: boolean, isSourceVideoMeetingRecording: boolean, isSourceVideoExternalUpload: boolean, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } }> };

export type ConsolidatedEditGetClipsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetClipsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, source_duration: number | null, playable_duration: number | null, clips: Array<{ __typename: 'VideoClipDetails', id: string, name: string | null, source_duration: number | null, playable_duration: number | null, source_video_id: string | null, currentUserIsSourceOwner: boolean, isSourceVideoMeetingRecording: boolean, isSourceVideoExternalUpload: boolean, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } }>, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditClipFragmentDoc = gql`
    fragment ConsolidatedEditClip on VideoClipDetails {
  id
  name
  source_duration
  playable_duration
  source_video_id
  currentUserIsSourceOwner
  isSourceVideoMeetingRecording
  isSourceVideoExternalUpload
  ...ConsolidatedEditClipDimensions
}
    ${ConsolidatedEditClipDimensionsFragmentDoc}`;
export const ConsolidatedEditVideoClipsFragmentDoc = gql`
    fragment ConsolidatedEditVideoClips on RegularUserVideo {
  id
  source_duration
  playable_duration
  clips {
    ...ConsolidatedEditClip
  }
}
    ${ConsolidatedEditClipFragmentDoc}`;
export const ConsolidatedEditGetClipsDocument = gql`
    query ConsolidatedEditGetClips($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoClips
      ...ConsolidatedEditVideoPreview
    }
  }
}
    ${ConsolidatedEditVideoClipsFragmentDoc}
${ConsolidatedEditVideoPreviewFragmentDoc}`;

/**
 * __useConsolidatedEditGetClipsQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetClipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetClipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetClipsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetClipsQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetClipsQuery, ConsolidatedEditGetClipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetClipsQuery, ConsolidatedEditGetClipsQueryVariables>(ConsolidatedEditGetClipsDocument, options);
      }
export function useConsolidatedEditGetClipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetClipsQuery, ConsolidatedEditGetClipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetClipsQuery, ConsolidatedEditGetClipsQueryVariables>(ConsolidatedEditGetClipsDocument, options);
        }
export type ConsolidatedEditGetClipsQueryHookResult = ReturnType<typeof useConsolidatedEditGetClipsQuery>;
export type ConsolidatedEditGetClipsLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetClipsLazyQuery>;
export type ConsolidatedEditGetClipsQueryResult = Apollo.QueryResult<ConsolidatedEditGetClipsQuery, ConsolidatedEditGetClipsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;