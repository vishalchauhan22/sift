import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoViewerPermissionsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoViewerPermissionsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, show_analytics_to_viewer: boolean, currentUserCanEdit: boolean, organization: { __typename: 'Organization', id: string } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoViewerPermissionsDocument = gql`
    query GetVideoViewerPermissions($videoId: ID!) {
  getVideo(id: $videoId) {
    __typename
    ... on RegularUserVideo {
      id
      show_analytics_to_viewer
      currentUserCanEdit
      organization {
        id
      }
    }
  }
}
    `;

/**
 * __useGetVideoViewerPermissionsQuery__
 *
 * To run a query within a React component, call `useGetVideoViewerPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoViewerPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoViewerPermissionsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoViewerPermissionsQuery(baseOptions: Apollo.QueryHookOptions<GetVideoViewerPermissionsQuery, GetVideoViewerPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoViewerPermissionsQuery, GetVideoViewerPermissionsQueryVariables>(GetVideoViewerPermissionsDocument, options);
      }
export function useGetVideoViewerPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoViewerPermissionsQuery, GetVideoViewerPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoViewerPermissionsQuery, GetVideoViewerPermissionsQueryVariables>(GetVideoViewerPermissionsDocument, options);
        }
export type GetVideoViewerPermissionsQueryHookResult = ReturnType<typeof useGetVideoViewerPermissionsQuery>;
export type GetVideoViewerPermissionsLazyQueryHookResult = ReturnType<typeof useGetVideoViewerPermissionsLazyQuery>;
export type GetVideoViewerPermissionsQueryResult = Apollo.QueryResult<GetVideoViewerPermissionsQuery, GetVideoViewerPermissionsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;