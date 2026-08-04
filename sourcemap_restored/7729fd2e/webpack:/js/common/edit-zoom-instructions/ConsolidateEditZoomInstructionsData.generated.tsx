import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditZoomInstructionsFragmentDoc } from '../../pages/consolidated-edit/ConsolidatedEditVideoFragment.generated';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../pages/consolidated-edit/preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditZoomInstructionsDataQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditZoomInstructionsDataQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, editZoomInstructions: Array<{ __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number }>, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const ConsolidatedEditZoomInstructionsDataDocument = gql`
    query ConsolidatedEditZoomInstructionsData($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditZoomInstructions
      ...ConsolidatedEditVideoPreview
    }
  }
}
    ${ConsolidatedEditZoomInstructionsFragmentDoc}
${ConsolidatedEditVideoPreviewFragmentDoc}`;

/**
 * __useConsolidatedEditZoomInstructionsDataQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditZoomInstructionsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditZoomInstructionsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditZoomInstructionsDataQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditZoomInstructionsDataQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditZoomInstructionsDataQuery, ConsolidatedEditZoomInstructionsDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditZoomInstructionsDataQuery, ConsolidatedEditZoomInstructionsDataQueryVariables>(ConsolidatedEditZoomInstructionsDataDocument, options);
      }
export function useConsolidatedEditZoomInstructionsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditZoomInstructionsDataQuery, ConsolidatedEditZoomInstructionsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditZoomInstructionsDataQuery, ConsolidatedEditZoomInstructionsDataQueryVariables>(ConsolidatedEditZoomInstructionsDataDocument, options);
        }
export type ConsolidatedEditZoomInstructionsDataQueryHookResult = ReturnType<typeof useConsolidatedEditZoomInstructionsDataQuery>;
export type ConsolidatedEditZoomInstructionsDataLazyQueryHookResult = ReturnType<typeof useConsolidatedEditZoomInstructionsDataLazyQuery>;
export type ConsolidatedEditZoomInstructionsDataQueryResult = Apollo.QueryResult<ConsolidatedEditZoomInstructionsDataQuery, ConsolidatedEditZoomInstructionsDataQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;