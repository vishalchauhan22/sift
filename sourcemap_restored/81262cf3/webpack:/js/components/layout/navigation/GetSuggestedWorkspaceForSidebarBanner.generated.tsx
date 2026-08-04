import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { SuggestedWorkspaceFragmentFragmentDoc } from './SuggestedWorkspaceFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSuggestedWorkspaceForSidebarBannerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSuggestedWorkspaceForSidebarBannerQuery = { __typename: 'Query', result: { __typename: 'GenericError' } | { __typename: 'JoinableWorkspace', id: string, autoJoin: boolean | null, isCurrentUserMember: boolean | null, requestStatus: Types.WorkspaceJoinRequestStatus | null, hasPendingInvitation: boolean | null, workspace: { __typename: 'Organization', id: string, name: string, workspaceLogoPath: string | null, counts: { __typename: 'WorkspaceTotalCounts', users: unknown }, members: { __typename: 'OrganizationMemberConnection', nodes: Array<{ __typename: 'OrganizationMember', id: string, member_role: string, user: { __typename: 'RegularUser', id: string, first_name: string | null, display_name: string, last_name: string | null, avatars: Array<{ __typename: 'Avatar', thumb: string }> } } | null> | null } | null } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetSuggestedWorkspaceForSidebarBannerDocument = gql`
    query GetSuggestedWorkspaceForSidebarBanner {
  result: getSuggestedWorkspaceForCurrentUser {
    __typename
    ... on JoinableWorkspace {
      ...SuggestedWorkspaceFragment
    }
  }
}
    ${SuggestedWorkspaceFragmentFragmentDoc}`;

/**
 * __useGetSuggestedWorkspaceForSidebarBannerQuery__
 *
 * To run a query within a React component, call `useGetSuggestedWorkspaceForSidebarBannerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedWorkspaceForSidebarBannerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedWorkspaceForSidebarBannerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestedWorkspaceForSidebarBannerQuery(baseOptions?: Apollo.QueryHookOptions<GetSuggestedWorkspaceForSidebarBannerQuery, GetSuggestedWorkspaceForSidebarBannerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuggestedWorkspaceForSidebarBannerQuery, GetSuggestedWorkspaceForSidebarBannerQueryVariables>(GetSuggestedWorkspaceForSidebarBannerDocument, options);
      }
export function useGetSuggestedWorkspaceForSidebarBannerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedWorkspaceForSidebarBannerQuery, GetSuggestedWorkspaceForSidebarBannerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuggestedWorkspaceForSidebarBannerQuery, GetSuggestedWorkspaceForSidebarBannerQueryVariables>(GetSuggestedWorkspaceForSidebarBannerDocument, options);
        }
export type GetSuggestedWorkspaceForSidebarBannerQueryHookResult = ReturnType<typeof useGetSuggestedWorkspaceForSidebarBannerQuery>;
export type GetSuggestedWorkspaceForSidebarBannerLazyQueryHookResult = ReturnType<typeof useGetSuggestedWorkspaceForSidebarBannerLazyQuery>;
export type GetSuggestedWorkspaceForSidebarBannerQueryResult = Apollo.QueryResult<GetSuggestedWorkspaceForSidebarBannerQuery, GetSuggestedWorkspaceForSidebarBannerQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;