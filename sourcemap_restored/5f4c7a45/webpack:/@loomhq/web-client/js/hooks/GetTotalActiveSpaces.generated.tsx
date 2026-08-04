import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTotalActiveSpacesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTotalActiveSpacesQuery = { __typename: 'Query', userWorkspaceMemberships: Array<{ __typename: 'OrganizationMember', id: string, organization: { __typename: 'Organization', id: string, counts: { __typename: 'WorkspaceTotalCounts', spaces: { __typename: 'SpaceCountType', total_active_spaces: number | null } | null } } } | null> | null };


export const GetTotalActiveSpacesDocument = gql`
    query GetTotalActiveSpaces {
  userWorkspaceMemberships {
    id
    organization {
      id
      counts {
        spaces {
          total_active_spaces
        }
      }
    }
  }
}
    `;

/**
 * __useGetTotalActiveSpacesQuery__
 *
 * To run a query within a React component, call `useGetTotalActiveSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalActiveSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalActiveSpacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalActiveSpacesQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalActiveSpacesQuery, GetTotalActiveSpacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalActiveSpacesQuery, GetTotalActiveSpacesQueryVariables>(GetTotalActiveSpacesDocument, options);
      }
export function useGetTotalActiveSpacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalActiveSpacesQuery, GetTotalActiveSpacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalActiveSpacesQuery, GetTotalActiveSpacesQueryVariables>(GetTotalActiveSpacesDocument, options);
        }
export type GetTotalActiveSpacesQueryHookResult = ReturnType<typeof useGetTotalActiveSpacesQuery>;
export type GetTotalActiveSpacesLazyQueryHookResult = ReturnType<typeof useGetTotalActiveSpacesLazyQuery>;
export type GetTotalActiveSpacesQueryResult = Apollo.QueryResult<GetTotalActiveSpacesQuery, GetTotalActiveSpacesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;