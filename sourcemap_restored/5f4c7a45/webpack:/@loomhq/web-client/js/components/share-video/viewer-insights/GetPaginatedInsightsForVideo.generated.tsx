import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaginatedInsightsForVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  first: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPaginatedInsightsForVideoQuery = { __typename: 'Query', engagementInsightsSummaryForVideo: { __typename: 'EngagementInsightsSummary', id: string, paginatedViewers: { __typename: 'EngagementInsightsAggregateConnection', pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean }, edges: Array<{ __typename: 'EngagementInsightsAggregateEdge', node: { __typename: 'EngagementInsightsAggregate', id: string, hasWatchSession: boolean | null, percentCompleted: number | null, cta: boolean | null, ctaClicks: number | null, trackedViews: number | null, views: Array<string | null> | null, user: { __typename: 'EngagementInsightsViewer', id: string, avatar: string | null, name: string | null, color: string | null, variant: number | null, profileUrl: string | null }, events: Array<{ __typename: 'VIEvent', type: string | null, ts: number | null, id: string | null, content: string | null } | null> | null } | null } | null> | null } | null } | null };


export const GetPaginatedInsightsForVideoDocument = gql`
    query GetPaginatedInsightsForVideo($videoId: ID!, $first: Int!, $after: String) {
  engagementInsightsSummaryForVideo(videoId: $videoId) {
    id
    paginatedViewers(videoId: $videoId, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          hasWatchSession
          percentCompleted
          cta
          ctaClicks
          trackedViews
          views
          user {
            id
            avatar
            name
            color
            variant
            profileUrl
          }
          events {
            type
            ts
            id
            content
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetPaginatedInsightsForVideoQuery__
 *
 * To run a query within a React component, call `useGetPaginatedInsightsForVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedInsightsForVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedInsightsForVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPaginatedInsightsForVideoQuery(baseOptions: Apollo.QueryHookOptions<GetPaginatedInsightsForVideoQuery, GetPaginatedInsightsForVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginatedInsightsForVideoQuery, GetPaginatedInsightsForVideoQueryVariables>(GetPaginatedInsightsForVideoDocument, options);
      }
export function useGetPaginatedInsightsForVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedInsightsForVideoQuery, GetPaginatedInsightsForVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginatedInsightsForVideoQuery, GetPaginatedInsightsForVideoQueryVariables>(GetPaginatedInsightsForVideoDocument, options);
        }
export type GetPaginatedInsightsForVideoQueryHookResult = ReturnType<typeof useGetPaginatedInsightsForVideoQuery>;
export type GetPaginatedInsightsForVideoLazyQueryHookResult = ReturnType<typeof useGetPaginatedInsightsForVideoLazyQuery>;
export type GetPaginatedInsightsForVideoQueryResult = Apollo.QueryResult<GetPaginatedInsightsForVideoQuery, GetPaginatedInsightsForVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;