import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRemainingPersonalizedVideosQueryVariables = Types.Exact<{
  folderId: Types.Scalars['ID']['input'];
}>;


export type GetRemainingPersonalizedVideosQuery = { __typename: 'Query', personalizedVideosInProgress: { __typename: 'CountPayload', count: number | null, hasFailed: boolean | null } | { __typename: 'GenericError', message: string } | null };

export type GetTotalVideosForUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type GetTotalVideosForUserQuery = { __typename: 'Query', getTotalVideosCountByUser: { __typename: 'GenericError', message: string } | { __typename: 'TotalVideosCountByUserPayload', videos_count: number | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetRemainingPersonalizedVideosDocument = gql`
    query GetRemainingPersonalizedVideos($folderId: ID!) {
  personalizedVideosInProgress(folderId: $folderId) {
    ... on CountPayload {
      count
      hasFailed
    }
    ... on GenericError {
      message
    }
    __typename
  }
}
    `;

/**
 * __useGetRemainingPersonalizedVideosQuery__
 *
 * To run a query within a React component, call `useGetRemainingPersonalizedVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRemainingPersonalizedVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRemainingPersonalizedVideosQuery({
 *   variables: {
 *      folderId: // value for 'folderId'
 *   },
 * });
 */
export function useGetRemainingPersonalizedVideosQuery(baseOptions: Apollo.QueryHookOptions<GetRemainingPersonalizedVideosQuery, GetRemainingPersonalizedVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRemainingPersonalizedVideosQuery, GetRemainingPersonalizedVideosQueryVariables>(GetRemainingPersonalizedVideosDocument, options);
      }
export function useGetRemainingPersonalizedVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRemainingPersonalizedVideosQuery, GetRemainingPersonalizedVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRemainingPersonalizedVideosQuery, GetRemainingPersonalizedVideosQueryVariables>(GetRemainingPersonalizedVideosDocument, options);
        }
export type GetRemainingPersonalizedVideosQueryHookResult = ReturnType<typeof useGetRemainingPersonalizedVideosQuery>;
export type GetRemainingPersonalizedVideosLazyQueryHookResult = ReturnType<typeof useGetRemainingPersonalizedVideosLazyQuery>;
export type GetRemainingPersonalizedVideosQueryResult = Apollo.QueryResult<GetRemainingPersonalizedVideosQuery, GetRemainingPersonalizedVideosQueryVariables>;
export const GetTotalVideosForUserDocument = gql`
    query getTotalVideosForUser($userId: ID!) {
  getTotalVideosCountByUser(userId: $userId) {
    __typename
    ... on TotalVideosCountByUserPayload {
      videos_count
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetTotalVideosForUserQuery__
 *
 * To run a query within a React component, call `useGetTotalVideosForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalVideosForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalVideosForUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTotalVideosForUserQuery(baseOptions: Apollo.QueryHookOptions<GetTotalVideosForUserQuery, GetTotalVideosForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalVideosForUserQuery, GetTotalVideosForUserQueryVariables>(GetTotalVideosForUserDocument, options);
      }
export function useGetTotalVideosForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalVideosForUserQuery, GetTotalVideosForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalVideosForUserQuery, GetTotalVideosForUserQueryVariables>(GetTotalVideosForUserDocument, options);
        }
export type GetTotalVideosForUserQueryHookResult = ReturnType<typeof useGetTotalVideosForUserQuery>;
export type GetTotalVideosForUserLazyQueryHookResult = ReturnType<typeof useGetTotalVideosForUserLazyQuery>;
export type GetTotalVideosForUserQueryResult = Apollo.QueryResult<GetTotalVideosForUserQuery, GetTotalVideosForUserQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;