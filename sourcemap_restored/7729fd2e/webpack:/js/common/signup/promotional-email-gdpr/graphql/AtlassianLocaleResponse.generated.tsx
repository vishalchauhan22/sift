import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AtlassianLocaleResponseQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AtlassianLocaleResponseQuery = { __typename: 'Query', atlassianLocaleResponse: { __typename: 'GenericError' } | { __typename: 'GetAtlassianLocalePayload', localeRequiresMarketingOptIn: boolean, locale: string } | null };


export const AtlassianLocaleResponseDocument = gql`
    query AtlassianLocaleResponse {
  atlassianLocaleResponse {
    ... on GetAtlassianLocalePayload {
      localeRequiresMarketingOptIn
      locale
    }
  }
}
    `;

/**
 * __useAtlassianLocaleResponseQuery__
 *
 * To run a query within a React component, call `useAtlassianLocaleResponseQuery` and pass it any options that fit your needs.
 * When your component renders, `useAtlassianLocaleResponseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAtlassianLocaleResponseQuery({
 *   variables: {
 *   },
 * });
 */
export function useAtlassianLocaleResponseQuery(baseOptions?: Apollo.QueryHookOptions<AtlassianLocaleResponseQuery, AtlassianLocaleResponseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AtlassianLocaleResponseQuery, AtlassianLocaleResponseQueryVariables>(AtlassianLocaleResponseDocument, options);
      }
export function useAtlassianLocaleResponseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AtlassianLocaleResponseQuery, AtlassianLocaleResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AtlassianLocaleResponseQuery, AtlassianLocaleResponseQueryVariables>(AtlassianLocaleResponseDocument, options);
        }
export type AtlassianLocaleResponseQueryHookResult = ReturnType<typeof useAtlassianLocaleResponseQuery>;
export type AtlassianLocaleResponseLazyQueryHookResult = ReturnType<typeof useAtlassianLocaleResponseLazyQuery>;
export type AtlassianLocaleResponseQueryResult = Apollo.QueryResult<AtlassianLocaleResponseQuery, AtlassianLocaleResponseQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;