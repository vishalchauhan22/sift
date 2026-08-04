import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfluenceUserPermissionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ConfluenceUserPermissionsQuery = { __typename: 'Query', confluenceUserPermissions: { __typename: 'ConfluenceUserPermissionsPayload', hasPermission: boolean } | { __typename: 'GenericError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const ConfluenceUserPermissionsDocument = gql`
    query ConfluenceUserPermissions {
  confluenceUserPermissions {
    ... on ConfluenceUserPermissionsPayload {
      hasPermission
    }
  }
}
    `;

/**
 * __useConfluenceUserPermissionsQuery__
 *
 * To run a query within a React component, call `useConfluenceUserPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfluenceUserPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfluenceUserPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfluenceUserPermissionsQuery(baseOptions?: Apollo.QueryHookOptions<ConfluenceUserPermissionsQuery, ConfluenceUserPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConfluenceUserPermissionsQuery, ConfluenceUserPermissionsQueryVariables>(ConfluenceUserPermissionsDocument, options);
      }
export function useConfluenceUserPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConfluenceUserPermissionsQuery, ConfluenceUserPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConfluenceUserPermissionsQuery, ConfluenceUserPermissionsQueryVariables>(ConfluenceUserPermissionsDocument, options);
        }
export type ConfluenceUserPermissionsQueryHookResult = ReturnType<typeof useConfluenceUserPermissionsQuery>;
export type ConfluenceUserPermissionsLazyQueryHookResult = ReturnType<typeof useConfluenceUserPermissionsLazyQuery>;
export type ConfluenceUserPermissionsQueryResult = Apollo.QueryResult<ConfluenceUserPermissionsQuery, ConfluenceUserPermissionsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;