import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditVideoNameFragment = { __typename: 'RegularUserVideo', id: string, name: string };

export type ConsolidatedEditVideoNameQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditVideoNameQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, name: string } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditVideoNameFragmentDoc = gql`
    fragment ConsolidatedEditVideoName on RegularUserVideo {
  id
  name
}
    `;
export const ConsolidatedEditVideoNameDocument = gql`
    query ConsolidatedEditVideoName($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoName
    }
  }
}
    ${ConsolidatedEditVideoNameFragmentDoc}`;

/**
 * __useConsolidatedEditVideoNameQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditVideoNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditVideoNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditVideoNameQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditVideoNameQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditVideoNameQuery, ConsolidatedEditVideoNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditVideoNameQuery, ConsolidatedEditVideoNameQueryVariables>(ConsolidatedEditVideoNameDocument, options);
      }
export function useConsolidatedEditVideoNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditVideoNameQuery, ConsolidatedEditVideoNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditVideoNameQuery, ConsolidatedEditVideoNameQueryVariables>(ConsolidatedEditVideoNameDocument, options);
        }
export type ConsolidatedEditVideoNameQueryHookResult = ReturnType<typeof useConsolidatedEditVideoNameQuery>;
export type ConsolidatedEditVideoNameLazyQueryHookResult = ReturnType<typeof useConsolidatedEditVideoNameLazyQuery>;
export type ConsolidatedEditVideoNameQueryResult = Apollo.QueryResult<ConsolidatedEditVideoNameQuery, ConsolidatedEditVideoNameQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;