import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLegacyMigrationIsActiveQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetLegacyMigrationIsActiveQuery = { __typename: 'Query', organization: { __typename: 'Organization', legacyMigrationIsActive: boolean | null } | null };


export const GetLegacyMigrationIsActiveDocument = gql`
    query getLegacyMigrationIsActive($workspaceId: ID!) {
  organization(id: $workspaceId) {
    legacyMigrationIsActive
  }
}
    `;

/**
 * __useGetLegacyMigrationIsActiveQuery__
 *
 * To run a query within a React component, call `useGetLegacyMigrationIsActiveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLegacyMigrationIsActiveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLegacyMigrationIsActiveQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetLegacyMigrationIsActiveQuery(baseOptions: Apollo.QueryHookOptions<GetLegacyMigrationIsActiveQuery, GetLegacyMigrationIsActiveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLegacyMigrationIsActiveQuery, GetLegacyMigrationIsActiveQueryVariables>(GetLegacyMigrationIsActiveDocument, options);
      }
export function useGetLegacyMigrationIsActiveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLegacyMigrationIsActiveQuery, GetLegacyMigrationIsActiveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLegacyMigrationIsActiveQuery, GetLegacyMigrationIsActiveQueryVariables>(GetLegacyMigrationIsActiveDocument, options);
        }
export type GetLegacyMigrationIsActiveQueryHookResult = ReturnType<typeof useGetLegacyMigrationIsActiveQuery>;
export type GetLegacyMigrationIsActiveLazyQueryHookResult = ReturnType<typeof useGetLegacyMigrationIsActiveLazyQuery>;
export type GetLegacyMigrationIsActiveQueryResult = Apollo.QueryResult<GetLegacyMigrationIsActiveQuery, GetLegacyMigrationIsActiveQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;