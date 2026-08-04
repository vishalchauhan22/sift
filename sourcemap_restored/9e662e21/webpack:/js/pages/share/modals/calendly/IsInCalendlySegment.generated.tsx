import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetIsInCalendlySegmentQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetIsInCalendlySegmentQuery = { __typename: 'Query', getIsInCalendlySegment: { __typename: 'GenericError' } | { __typename: 'GetCalendlySegmentPayload', isInCalendlySegment: boolean } | null };


export const GetIsInCalendlySegmentDocument = gql`
    query GetIsInCalendlySegment($videoId: ID!) {
  getIsInCalendlySegment(videoId: $videoId) {
    ... on GetCalendlySegmentPayload {
      isInCalendlySegment
    }
  }
}
    `;

/**
 * __useGetIsInCalendlySegmentQuery__
 *
 * To run a query within a React component, call `useGetIsInCalendlySegmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsInCalendlySegmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsInCalendlySegmentQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetIsInCalendlySegmentQuery(baseOptions: Apollo.QueryHookOptions<GetIsInCalendlySegmentQuery, GetIsInCalendlySegmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsInCalendlySegmentQuery, GetIsInCalendlySegmentQueryVariables>(GetIsInCalendlySegmentDocument, options);
      }
export function useGetIsInCalendlySegmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsInCalendlySegmentQuery, GetIsInCalendlySegmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsInCalendlySegmentQuery, GetIsInCalendlySegmentQueryVariables>(GetIsInCalendlySegmentDocument, options);
        }
export type GetIsInCalendlySegmentQueryHookResult = ReturnType<typeof useGetIsInCalendlySegmentQuery>;
export type GetIsInCalendlySegmentLazyQueryHookResult = ReturnType<typeof useGetIsInCalendlySegmentLazyQuery>;
export type GetIsInCalendlySegmentQueryResult = Apollo.QueryResult<GetIsInCalendlySegmentQuery, GetIsInCalendlySegmentQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;