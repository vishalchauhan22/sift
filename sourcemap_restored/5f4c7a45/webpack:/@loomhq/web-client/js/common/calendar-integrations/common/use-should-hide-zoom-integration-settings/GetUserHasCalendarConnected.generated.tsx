import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserHasCalendarConnectedQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserHasCalendarConnectedQuery = { __typename: 'Query', me: { __typename: 'RegularUser', id: string, calendars: Array<{ __typename: 'CalendarInfo', guid: string }> } | null };


export const GetUserHasCalendarConnectedDocument = gql`
    query GetUserHasCalendarConnected {
  me {
    id
    calendars {
      guid
    }
  }
}
    `;

/**
 * __useGetUserHasCalendarConnectedQuery__
 *
 * To run a query within a React component, call `useGetUserHasCalendarConnectedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserHasCalendarConnectedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserHasCalendarConnectedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserHasCalendarConnectedQuery(baseOptions?: Apollo.QueryHookOptions<GetUserHasCalendarConnectedQuery, GetUserHasCalendarConnectedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserHasCalendarConnectedQuery, GetUserHasCalendarConnectedQueryVariables>(GetUserHasCalendarConnectedDocument, options);
      }
export function useGetUserHasCalendarConnectedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserHasCalendarConnectedQuery, GetUserHasCalendarConnectedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserHasCalendarConnectedQuery, GetUserHasCalendarConnectedQueryVariables>(GetUserHasCalendarConnectedDocument, options);
        }
export type GetUserHasCalendarConnectedQueryHookResult = ReturnType<typeof useGetUserHasCalendarConnectedQuery>;
export type GetUserHasCalendarConnectedLazyQueryHookResult = ReturnType<typeof useGetUserHasCalendarConnectedLazyQuery>;
export type GetUserHasCalendarConnectedQueryResult = Apollo.QueryResult<GetUserHasCalendarConnectedQuery, GetUserHasCalendarConnectedQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;