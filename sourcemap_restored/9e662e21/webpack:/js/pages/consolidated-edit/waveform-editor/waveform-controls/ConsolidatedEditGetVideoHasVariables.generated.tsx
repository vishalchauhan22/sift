import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditVideoHasVariablesFragment = { __typename: 'RegularUserVideo', id: string, personalizationType: Types.VideoPersonalizationType | null };

export type ConsolidatedEditGetVideoHasVariablesQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ConsolidatedEditGetVideoHasVariablesQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, personalizationType: Types.VideoPersonalizationType | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditVideoHasVariablesFragmentDoc = gql`
    fragment ConsolidatedEditVideoHasVariables on RegularUserVideo {
  id
  personalizationType
}
    `;
export const ConsolidatedEditGetVideoHasVariablesDocument = gql`
    query ConsolidatedEditGetVideoHasVariables($videoId: ID!) {
  getVideo(id: $videoId) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoHasVariables
    }
  }
}
    ${ConsolidatedEditVideoHasVariablesFragmentDoc}`;

/**
 * __useConsolidatedEditGetVideoHasVariablesQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetVideoHasVariablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetVideoHasVariablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetVideoHasVariablesQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useConsolidatedEditGetVideoHasVariablesQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetVideoHasVariablesQuery, ConsolidatedEditGetVideoHasVariablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetVideoHasVariablesQuery, ConsolidatedEditGetVideoHasVariablesQueryVariables>(ConsolidatedEditGetVideoHasVariablesDocument, options);
      }
export function useConsolidatedEditGetVideoHasVariablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetVideoHasVariablesQuery, ConsolidatedEditGetVideoHasVariablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetVideoHasVariablesQuery, ConsolidatedEditGetVideoHasVariablesQueryVariables>(ConsolidatedEditGetVideoHasVariablesDocument, options);
        }
export type ConsolidatedEditGetVideoHasVariablesQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoHasVariablesQuery>;
export type ConsolidatedEditGetVideoHasVariablesLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoHasVariablesLazyQuery>;
export type ConsolidatedEditGetVideoHasVariablesQueryResult = Apollo.QueryResult<ConsolidatedEditGetVideoHasVariablesQuery, ConsolidatedEditGetVideoHasVariablesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;