import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditClipDimensionsFragment = { __typename: 'VideoClipDetails', id: string, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } };

export type ConsolidatedEditVideoClipDimensionsFragment = { __typename: 'RegularUserVideo', id: string, clips: Array<{ __typename: 'VideoClipDetails', id: string, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } }> };

export type ConsolidatedEditGetClipDimensionsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetClipDimensionsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, clips: Array<{ __typename: 'VideoClipDetails', id: string, video_properties: { __typename: 'VideoProperties', width: number | null, height: number | null, durationMs: number | null } }> } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditClipDimensionsFragmentDoc = gql`
    fragment ConsolidatedEditClipDimensions on VideoClipDetails {
  id
  video_properties {
    width
    height
    durationMs
  }
}
    `;
export const ConsolidatedEditVideoClipDimensionsFragmentDoc = gql`
    fragment ConsolidatedEditVideoClipDimensions on RegularUserVideo {
  id
  clips {
    ...ConsolidatedEditClipDimensions
  }
}
    ${ConsolidatedEditClipDimensionsFragmentDoc}`;
export const ConsolidatedEditGetClipDimensionsDocument = gql`
    query ConsolidatedEditGetClipDimensions($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoClipDimensions
    }
  }
}
    ${ConsolidatedEditVideoClipDimensionsFragmentDoc}`;

/**
 * __useConsolidatedEditGetClipDimensionsQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetClipDimensionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetClipDimensionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetClipDimensionsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetClipDimensionsQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetClipDimensionsQuery, ConsolidatedEditGetClipDimensionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetClipDimensionsQuery, ConsolidatedEditGetClipDimensionsQueryVariables>(ConsolidatedEditGetClipDimensionsDocument, options);
      }
export function useConsolidatedEditGetClipDimensionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetClipDimensionsQuery, ConsolidatedEditGetClipDimensionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetClipDimensionsQuery, ConsolidatedEditGetClipDimensionsQueryVariables>(ConsolidatedEditGetClipDimensionsDocument, options);
        }
export type ConsolidatedEditGetClipDimensionsQueryHookResult = ReturnType<typeof useConsolidatedEditGetClipDimensionsQuery>;
export type ConsolidatedEditGetClipDimensionsLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetClipDimensionsLazyQuery>;
export type ConsolidatedEditGetClipDimensionsQueryResult = Apollo.QueryResult<ConsolidatedEditGetClipDimensionsQuery, ConsolidatedEditGetClipDimensionsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;