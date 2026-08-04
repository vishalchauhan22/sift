import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserIntegrationSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserIntegrationSettingsQuery = { __typename: 'Query', me: { __typename: 'RegularUser', id: string, integration_settings: unknown | null, calendars: Array<{ __typename: 'CalendarInfo', guid: string, lastSyncedAt: string | null }> } | null };


export const GetUserIntegrationSettingsDocument = gql`
    query GetUserIntegrationSettings {
  me {
    __typename
    id
    integration_settings
    calendars {
      guid
      lastSyncedAt
    }
  }
}
    `;

/**
 * __useGetUserIntegrationSettingsQuery__
 *
 * To run a query within a React component, call `useGetUserIntegrationSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIntegrationSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIntegrationSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserIntegrationSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserIntegrationSettingsQuery, GetUserIntegrationSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIntegrationSettingsQuery, GetUserIntegrationSettingsQueryVariables>(GetUserIntegrationSettingsDocument, options);
      }
export function useGetUserIntegrationSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIntegrationSettingsQuery, GetUserIntegrationSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIntegrationSettingsQuery, GetUserIntegrationSettingsQueryVariables>(GetUserIntegrationSettingsDocument, options);
        }
export type GetUserIntegrationSettingsQueryHookResult = ReturnType<typeof useGetUserIntegrationSettingsQuery>;
export type GetUserIntegrationSettingsLazyQueryHookResult = ReturnType<typeof useGetUserIntegrationSettingsLazyQuery>;
export type GetUserIntegrationSettingsQueryResult = Apollo.QueryResult<GetUserIntegrationSettingsQuery, GetUserIntegrationSettingsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;