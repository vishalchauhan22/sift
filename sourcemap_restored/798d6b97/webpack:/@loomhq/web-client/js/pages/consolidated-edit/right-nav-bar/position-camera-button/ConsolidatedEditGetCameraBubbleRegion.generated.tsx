import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditCameraBubbleRegionFragment = { __typename: 'RegularUserVideo', cameraBubbleRegion: Types.CameraPickerRegion | null, supportsCameraBubbleRegion: boolean };

export type ConsolidatedEditGetCameraBubbleRegionQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetCameraBubbleRegionQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', cameraBubbleRegion: Types.CameraPickerRegion | null, supportsCameraBubbleRegion: boolean, id: string, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditCameraBubbleRegionFragmentDoc = gql`
    fragment ConsolidatedEditCameraBubbleRegion on RegularUserVideo {
  cameraBubbleRegion
  supportsCameraBubbleRegion
}
    `;
export const ConsolidatedEditGetCameraBubbleRegionDocument = gql`
    query ConsolidatedEditGetCameraBubbleRegion($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditCameraBubbleRegion
      ...ConsolidatedEditVideoPreview
    }
  }
}
    ${ConsolidatedEditCameraBubbleRegionFragmentDoc}
${ConsolidatedEditVideoPreviewFragmentDoc}`;

/**
 * __useConsolidatedEditGetCameraBubbleRegionQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetCameraBubbleRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetCameraBubbleRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetCameraBubbleRegionQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetCameraBubbleRegionQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetCameraBubbleRegionQuery, ConsolidatedEditGetCameraBubbleRegionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetCameraBubbleRegionQuery, ConsolidatedEditGetCameraBubbleRegionQueryVariables>(ConsolidatedEditGetCameraBubbleRegionDocument, options);
      }
export function useConsolidatedEditGetCameraBubbleRegionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetCameraBubbleRegionQuery, ConsolidatedEditGetCameraBubbleRegionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetCameraBubbleRegionQuery, ConsolidatedEditGetCameraBubbleRegionQueryVariables>(ConsolidatedEditGetCameraBubbleRegionDocument, options);
        }
export type ConsolidatedEditGetCameraBubbleRegionQueryHookResult = ReturnType<typeof useConsolidatedEditGetCameraBubbleRegionQuery>;
export type ConsolidatedEditGetCameraBubbleRegionLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetCameraBubbleRegionLazyQuery>;
export type ConsolidatedEditGetCameraBubbleRegionQueryResult = Apollo.QueryResult<ConsolidatedEditGetCameraBubbleRegionQuery, ConsolidatedEditGetCameraBubbleRegionQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;