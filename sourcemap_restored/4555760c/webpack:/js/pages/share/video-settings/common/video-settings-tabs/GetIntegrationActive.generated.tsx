import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetIntegrationActiveStatusQueryVariables = Types.Exact<{
  integrationType: Types.Scalars['String']['input'];
}>;


export type GetIntegrationActiveStatusQuery = { __typename: 'Query', getIntegrationActive: { __typename: 'GenericError' } | { __typename: 'GetIntegrationActivePayload', isActive: boolean } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetIntegrationActiveStatusDocument = gql`
    query GetIntegrationActiveStatus($integrationType: String!) {
  getIntegrationActive(integrationType: $integrationType) {
    ... on GetIntegrationActivePayload {
      isActive
    }
  }
}
    `;

/**
 * __useGetIntegrationActiveStatusQuery__
 *
 * To run a query within a React component, call `useGetIntegrationActiveStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIntegrationActiveStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIntegrationActiveStatusQuery({
 *   variables: {
 *      integrationType: // value for 'integrationType'
 *   },
 * });
 */
export function useGetIntegrationActiveStatusQuery(baseOptions: Apollo.QueryHookOptions<GetIntegrationActiveStatusQuery, GetIntegrationActiveStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIntegrationActiveStatusQuery, GetIntegrationActiveStatusQueryVariables>(GetIntegrationActiveStatusDocument, options);
      }
export function useGetIntegrationActiveStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIntegrationActiveStatusQuery, GetIntegrationActiveStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIntegrationActiveStatusQuery, GetIntegrationActiveStatusQueryVariables>(GetIntegrationActiveStatusDocument, options);
        }
export type GetIntegrationActiveStatusQueryHookResult = ReturnType<typeof useGetIntegrationActiveStatusQuery>;
export type GetIntegrationActiveStatusLazyQueryHookResult = ReturnType<typeof useGetIntegrationActiveStatusLazyQuery>;
export type GetIntegrationActiveStatusQueryResult = Apollo.QueryResult<GetIntegrationActiveStatusQuery, GetIntegrationActiveStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;