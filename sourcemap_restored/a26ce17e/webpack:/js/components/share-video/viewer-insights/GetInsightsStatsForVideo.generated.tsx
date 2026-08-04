import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInsightsStatsForVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetInsightsStatsForVideoQuery = { __typename: 'Query', engagementInsightsSummaryForVideo: { __typename: 'EngagementInsightsSummary', id: string, stats: { __typename: 'EngagementInsightsStats', id: string, trackedViewerCount: number | null, completionPercentAvg: number | null, ctaConversionPercent: number | null } | null } | null };


export const GetInsightsStatsForVideoDocument = gql`
    query GetInsightsStatsForVideo($videoId: ID!) {
  engagementInsightsSummaryForVideo(videoId: $videoId) {
    id
    stats(videoId: $videoId) {
      id
      trackedViewerCount
      completionPercentAvg
      ctaConversionPercent
    }
  }
}
    `;

/**
 * __useGetInsightsStatsForVideoQuery__
 *
 * To run a query within a React component, call `useGetInsightsStatsForVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInsightsStatsForVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInsightsStatsForVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetInsightsStatsForVideoQuery(baseOptions: Apollo.QueryHookOptions<GetInsightsStatsForVideoQuery, GetInsightsStatsForVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInsightsStatsForVideoQuery, GetInsightsStatsForVideoQueryVariables>(GetInsightsStatsForVideoDocument, options);
      }
export function useGetInsightsStatsForVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInsightsStatsForVideoQuery, GetInsightsStatsForVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInsightsStatsForVideoQuery, GetInsightsStatsForVideoQueryVariables>(GetInsightsStatsForVideoDocument, options);
        }
export type GetInsightsStatsForVideoQueryHookResult = ReturnType<typeof useGetInsightsStatsForVideoQuery>;
export type GetInsightsStatsForVideoLazyQueryHookResult = ReturnType<typeof useGetInsightsStatsForVideoLazyQuery>;
export type GetInsightsStatsForVideoQueryResult = Apollo.QueryResult<GetInsightsStatsForVideoQuery, GetInsightsStatsForVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;