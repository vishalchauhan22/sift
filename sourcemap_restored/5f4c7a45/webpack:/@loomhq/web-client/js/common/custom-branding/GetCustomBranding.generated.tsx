import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCustomBrandingQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetCustomBrandingQuery = { __typename: 'Query', getCustomBranding: { __typename: 'GenericError' } | { __typename: 'GetCustomBranding', organization: { __typename: 'Organization', id: string, brandLogoPath: string | null, brandPrimaryColor: string | null, brandShowBranding: boolean | null } | null } | null };


export const GetCustomBrandingDocument = gql`
    query GetCustomBranding($id: ID!) {
  getCustomBranding(videoId: $id) {
    ... on GetCustomBranding {
      organization {
        id
        brandLogoPath
        brandPrimaryColor
        brandShowBranding
      }
    }
  }
}
    `;

/**
 * __useGetCustomBrandingQuery__
 *
 * To run a query within a React component, call `useGetCustomBrandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomBrandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomBrandingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCustomBrandingQuery(baseOptions: Apollo.QueryHookOptions<GetCustomBrandingQuery, GetCustomBrandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomBrandingQuery, GetCustomBrandingQueryVariables>(GetCustomBrandingDocument, options);
      }
export function useGetCustomBrandingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomBrandingQuery, GetCustomBrandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomBrandingQuery, GetCustomBrandingQueryVariables>(GetCustomBrandingDocument, options);
        }
export type GetCustomBrandingQueryHookResult = ReturnType<typeof useGetCustomBrandingQuery>;
export type GetCustomBrandingLazyQueryHookResult = ReturnType<typeof useGetCustomBrandingLazyQuery>;
export type GetCustomBrandingQueryResult = Apollo.QueryResult<GetCustomBrandingQuery, GetCustomBrandingQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;