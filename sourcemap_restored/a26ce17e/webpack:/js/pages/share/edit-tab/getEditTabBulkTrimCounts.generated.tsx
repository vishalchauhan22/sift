import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEditTabBulkTrimCountsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetEditTabBulkTrimCountsQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, hasFillerWordRemovalEnabled: boolean, hasFillerWordPlusRemovalEnabled: boolean, hasSilenceRemovalEnabled: boolean, numberOfFillerWordsTrimmed: number | null, numberOfFillerWordsPlusTrimmed: number | null, secondsOfSilenceTrimmed: number | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetEditTabBulkTrimCountsDocument = gql`
    query getEditTabBulkTrimCounts($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    ... on AutoFeatureStatuses {
      id
      hasFillerWordRemovalEnabled
      hasFillerWordPlusRemovalEnabled
      hasSilenceRemovalEnabled
      numberOfFillerWordsTrimmed
      numberOfFillerWordsPlusTrimmed
      secondsOfSilenceTrimmed
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetEditTabBulkTrimCountsQuery__
 *
 * To run a query within a React component, call `useGetEditTabBulkTrimCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditTabBulkTrimCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditTabBulkTrimCountsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetEditTabBulkTrimCountsQuery(baseOptions: Apollo.QueryHookOptions<GetEditTabBulkTrimCountsQuery, GetEditTabBulkTrimCountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEditTabBulkTrimCountsQuery, GetEditTabBulkTrimCountsQueryVariables>(GetEditTabBulkTrimCountsDocument, options);
      }
export function useGetEditTabBulkTrimCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEditTabBulkTrimCountsQuery, GetEditTabBulkTrimCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEditTabBulkTrimCountsQuery, GetEditTabBulkTrimCountsQueryVariables>(GetEditTabBulkTrimCountsDocument, options);
        }
export type GetEditTabBulkTrimCountsQueryHookResult = ReturnType<typeof useGetEditTabBulkTrimCountsQuery>;
export type GetEditTabBulkTrimCountsLazyQueryHookResult = ReturnType<typeof useGetEditTabBulkTrimCountsLazyQuery>;
export type GetEditTabBulkTrimCountsQueryResult = Apollo.QueryResult<GetEditTabBulkTrimCountsQuery, GetEditTabBulkTrimCountsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;