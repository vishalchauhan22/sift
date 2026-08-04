import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAutoTasksStatusQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAutoTasksStatusQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoTasksStatus: Types.IntelligenceStatusType | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetAutoTasksStatusDocument = gql`
    query GetAutoTasksStatus($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    __typename
    ... on AutoFeatureStatuses {
      id
      autoTasksStatus
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetAutoTasksStatusQuery__
 *
 * To run a query within a React component, call `useGetAutoTasksStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoTasksStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoTasksStatusQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetAutoTasksStatusQuery(baseOptions: Apollo.QueryHookOptions<GetAutoTasksStatusQuery, GetAutoTasksStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoTasksStatusQuery, GetAutoTasksStatusQueryVariables>(GetAutoTasksStatusDocument, options);
      }
export function useGetAutoTasksStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoTasksStatusQuery, GetAutoTasksStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoTasksStatusQuery, GetAutoTasksStatusQueryVariables>(GetAutoTasksStatusDocument, options);
        }
export type GetAutoTasksStatusQueryHookResult = ReturnType<typeof useGetAutoTasksStatusQuery>;
export type GetAutoTasksStatusLazyQueryHookResult = ReturnType<typeof useGetAutoTasksStatusLazyQuery>;
export type GetAutoTasksStatusQueryResult = Apollo.QueryResult<GetAutoTasksStatusQuery, GetAutoTasksStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;