import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCalendarsConnectedForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCalendarsConnectedForUserQuery = { __typename: 'Query', me: { __typename: 'RegularUser', id: string, calendars: Array<{ __typename: 'CalendarInfo', guid: string, integrationType: Types.ConnectedServiceIntegrationEnumType }> } | null };


export const GetCalendarsConnectedForUserDocument = gql`
    query GetCalendarsConnectedForUser {
  me {
    id
    calendars {
      guid
      integrationType
    }
  }
}
    `;

/**
 * __useGetCalendarsConnectedForUserQuery__
 *
 * To run a query within a React component, call `useGetCalendarsConnectedForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarsConnectedForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarsConnectedForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCalendarsConnectedForUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCalendarsConnectedForUserQuery, GetCalendarsConnectedForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarsConnectedForUserQuery, GetCalendarsConnectedForUserQueryVariables>(GetCalendarsConnectedForUserDocument, options);
      }
export function useGetCalendarsConnectedForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarsConnectedForUserQuery, GetCalendarsConnectedForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarsConnectedForUserQuery, GetCalendarsConnectedForUserQueryVariables>(GetCalendarsConnectedForUserDocument, options);
        }
export type GetCalendarsConnectedForUserQueryHookResult = ReturnType<typeof useGetCalendarsConnectedForUserQuery>;
export type GetCalendarsConnectedForUserLazyQueryHookResult = ReturnType<typeof useGetCalendarsConnectedForUserLazyQuery>;
export type GetCalendarsConnectedForUserQueryResult = Apollo.QueryResult<GetCalendarsConnectedForUserQuery, GetCalendarsConnectedForUserQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;