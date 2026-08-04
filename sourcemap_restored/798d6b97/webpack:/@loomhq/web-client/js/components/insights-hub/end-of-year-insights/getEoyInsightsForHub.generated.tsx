import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEoyInsightsForHubQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetEoyInsightsForHubQuery = { __typename: 'Query', getEoyInsightsForHub: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'eoyTakeoverInsightsPayloadType', personalityType: string | null, personalityScore: string | null, totalMeetingsEliminated: string | null, totalTimeSaved: string | null, totalVideosViewed: string | null, totalVideosCreated: string | null, socialShareImage: string | null, personalityMetricText: Array<string | null> | null, downloadableImage: string | null, success: boolean | null } | null };


export const GetEoyInsightsForHubDocument = gql`
    query getEoyInsightsForHub {
  getEoyInsightsForHub {
    ... on eoyTakeoverInsightsPayloadType {
      personalityType
      personalityScore
      totalMeetingsEliminated
      totalTimeSaved
      totalVideosViewed
      totalVideosCreated
      socialShareImage
      personalityMetricText
      downloadableImage
      success
    }
  }
}
    `;

/**
 * __useGetEoyInsightsForHubQuery__
 *
 * To run a query within a React component, call `useGetEoyInsightsForHubQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEoyInsightsForHubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEoyInsightsForHubQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEoyInsightsForHubQuery(baseOptions?: Apollo.QueryHookOptions<GetEoyInsightsForHubQuery, GetEoyInsightsForHubQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEoyInsightsForHubQuery, GetEoyInsightsForHubQueryVariables>(GetEoyInsightsForHubDocument, options);
      }
export function useGetEoyInsightsForHubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEoyInsightsForHubQuery, GetEoyInsightsForHubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEoyInsightsForHubQuery, GetEoyInsightsForHubQueryVariables>(GetEoyInsightsForHubDocument, options);
        }
export type GetEoyInsightsForHubQueryHookResult = ReturnType<typeof useGetEoyInsightsForHubQuery>;
export type GetEoyInsightsForHubLazyQueryHookResult = ReturnType<typeof useGetEoyInsightsForHubLazyQuery>;
export type GetEoyInsightsForHubQueryResult = Apollo.QueryResult<GetEoyInsightsForHubQuery, GetEoyInsightsForHubQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;