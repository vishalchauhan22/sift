import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAutoSummaryStatusQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAutoSummaryStatusQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoDescription: string | null, autoDescriptionStatus: Types.IntelligenceStatusType | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetAutoSummaryStatusDocument = gql`
    query GetAutoSummaryStatus($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    __typename
    ... on AutoFeatureStatuses {
      id
      autoDescription
      autoDescriptionStatus
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetAutoSummaryStatusQuery__
 *
 * To run a query within a React component, call `useGetAutoSummaryStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoSummaryStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoSummaryStatusQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetAutoSummaryStatusQuery(baseOptions: Apollo.QueryHookOptions<GetAutoSummaryStatusQuery, GetAutoSummaryStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoSummaryStatusQuery, GetAutoSummaryStatusQueryVariables>(GetAutoSummaryStatusDocument, options);
      }
export function useGetAutoSummaryStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoSummaryStatusQuery, GetAutoSummaryStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoSummaryStatusQuery, GetAutoSummaryStatusQueryVariables>(GetAutoSummaryStatusDocument, options);
        }
export type GetAutoSummaryStatusQueryHookResult = ReturnType<typeof useGetAutoSummaryStatusQuery>;
export type GetAutoSummaryStatusLazyQueryHookResult = ReturnType<typeof useGetAutoSummaryStatusLazyQuery>;
export type GetAutoSummaryStatusQueryResult = Apollo.QueryResult<GetAutoSummaryStatusQuery, GetAutoSummaryStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;