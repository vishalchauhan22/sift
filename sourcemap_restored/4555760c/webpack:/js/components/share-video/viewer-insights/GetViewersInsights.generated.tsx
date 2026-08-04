import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetViewerInsightsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetViewerInsightsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, organization_idv2: string, current_user_is_owner: boolean, show_analytics_to_viewer: boolean, views: { __typename: 'RegularUserVideoViewCounts', total: number, distinct: number, named: Array<{ __typename: 'KnownUserVideoView', avatar: string | null, firstName: string | null, lastName: string | null } | null> | null } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetViewerInsightsDocument = gql`
    query GetViewerInsights($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      __typename
      organization_idv2
      current_user_is_owner
      show_analytics_to_viewer
      views {
        total
        distinct
        named {
          avatar
          firstName
          lastName
        }
      }
    }
  }
}
    `;

/**
 * __useGetViewerInsightsQuery__
 *
 * To run a query within a React component, call `useGetViewerInsightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerInsightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerInsightsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetViewerInsightsQuery(baseOptions: Apollo.QueryHookOptions<GetViewerInsightsQuery, GetViewerInsightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetViewerInsightsQuery, GetViewerInsightsQueryVariables>(GetViewerInsightsDocument, options);
      }
export function useGetViewerInsightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetViewerInsightsQuery, GetViewerInsightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetViewerInsightsQuery, GetViewerInsightsQueryVariables>(GetViewerInsightsDocument, options);
        }
export type GetViewerInsightsQueryHookResult = ReturnType<typeof useGetViewerInsightsQuery>;
export type GetViewerInsightsLazyQueryHookResult = ReturnType<typeof useGetViewerInsightsLazyQuery>;
export type GetViewerInsightsQueryResult = Apollo.QueryResult<GetViewerInsightsQuery, GetViewerInsightsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;