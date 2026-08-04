import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUnseenNotificationsCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUnseenNotificationsCountQuery = { __typename: 'Query', unseenNotificationsCount: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UnseenNotificationPayload', count: number } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetUnseenNotificationsCountDocument = gql`
    query GetUnseenNotificationsCount {
  unseenNotificationsCount {
    __typename
    ... on UnseenNotificationPayload {
      count
    }
  }
}
    `;

/**
 * __useGetUnseenNotificationsCountQuery__
 *
 * To run a query within a React component, call `useGetUnseenNotificationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnseenNotificationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnseenNotificationsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnseenNotificationsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnseenNotificationsCountQuery, GetUnseenNotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnseenNotificationsCountQuery, GetUnseenNotificationsCountQueryVariables>(GetUnseenNotificationsCountDocument, options);
      }
export function useGetUnseenNotificationsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnseenNotificationsCountQuery, GetUnseenNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnseenNotificationsCountQuery, GetUnseenNotificationsCountQueryVariables>(GetUnseenNotificationsCountDocument, options);
        }
export type GetUnseenNotificationsCountQueryHookResult = ReturnType<typeof useGetUnseenNotificationsCountQuery>;
export type GetUnseenNotificationsCountLazyQueryHookResult = ReturnType<typeof useGetUnseenNotificationsCountLazyQuery>;
export type GetUnseenNotificationsCountQueryResult = Apollo.QueryResult<GetUnseenNotificationsCountQuery, GetUnseenNotificationsCountQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;