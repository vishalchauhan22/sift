import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserWorkspaceMembershipsCountsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserWorkspaceMembershipsCountsQuery = { __typename: 'Query', userWorkspaceMemberships: Array<{ __typename: 'OrganizationMember', id: string, organization: { __typename: 'Organization', id: string, counts: { __typename: 'WorkspaceTotalCounts', videos: unknown } } } | null> | null };


export const GetUserWorkspaceMembershipsCountsDocument = gql`
    query getUserWorkspaceMembershipsCounts {
  userWorkspaceMemberships {
    id
    organization {
      id
      counts {
        videos
      }
    }
  }
}
    `;

/**
 * __useGetUserWorkspaceMembershipsCountsQuery__
 *
 * To run a query within a React component, call `useGetUserWorkspaceMembershipsCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWorkspaceMembershipsCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWorkspaceMembershipsCountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserWorkspaceMembershipsCountsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserWorkspaceMembershipsCountsQuery, GetUserWorkspaceMembershipsCountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWorkspaceMembershipsCountsQuery, GetUserWorkspaceMembershipsCountsQueryVariables>(GetUserWorkspaceMembershipsCountsDocument, options);
      }
export function useGetUserWorkspaceMembershipsCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWorkspaceMembershipsCountsQuery, GetUserWorkspaceMembershipsCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWorkspaceMembershipsCountsQuery, GetUserWorkspaceMembershipsCountsQueryVariables>(GetUserWorkspaceMembershipsCountsDocument, options);
        }
export type GetUserWorkspaceMembershipsCountsQueryHookResult = ReturnType<typeof useGetUserWorkspaceMembershipsCountsQuery>;
export type GetUserWorkspaceMembershipsCountsLazyQueryHookResult = ReturnType<typeof useGetUserWorkspaceMembershipsCountsLazyQuery>;
export type GetUserWorkspaceMembershipsCountsQueryResult = Apollo.QueryResult<GetUserWorkspaceMembershipsCountsQuery, GetUserWorkspaceMembershipsCountsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;