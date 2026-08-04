import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetWorkspaceSettingQueryVariables = Types.Exact<{
  settingName: Types.Scalars['String']['input'];
}>;


export type GetWorkspaceSettingQuery = { __typename: 'Query', getWorkspaceSetting: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'Setting', id: string | null, setting: { __typename: 'BooleanObject', id: string | null, booleanValue: boolean | null } | { __typename: 'IntObject', id: string | null, intValue: number | null } | { __typename: 'JSONObject', id: string | null, jsonValue: unknown | null } | { __typename: 'StringObject', id: string | null, stringValue: string | null } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetWorkspaceSettingDocument = gql`
    query GetWorkspaceSetting($settingName: String!) {
  getWorkspaceSetting(settingName: $settingName) {
    ... on Setting {
      id
      setting {
        __typename
        ... on BooleanObject {
          id
          booleanValue: value
        }
        ... on IntObject {
          id
          intValue: value
        }
        ... on StringObject {
          id
          stringValue: value
        }
        ... on JSONObject {
          id
          jsonValue: value
        }
      }
    }
  }
}
    `;

/**
 * __useGetWorkspaceSettingQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceSettingQuery({
 *   variables: {
 *      settingName: // value for 'settingName'
 *   },
 * });
 */
export function useGetWorkspaceSettingQuery(baseOptions: Apollo.QueryHookOptions<GetWorkspaceSettingQuery, GetWorkspaceSettingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceSettingQuery, GetWorkspaceSettingQueryVariables>(GetWorkspaceSettingDocument, options);
      }
export function useGetWorkspaceSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceSettingQuery, GetWorkspaceSettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceSettingQuery, GetWorkspaceSettingQueryVariables>(GetWorkspaceSettingDocument, options);
        }
export type GetWorkspaceSettingQueryHookResult = ReturnType<typeof useGetWorkspaceSettingQuery>;
export type GetWorkspaceSettingLazyQueryHookResult = ReturnType<typeof useGetWorkspaceSettingLazyQuery>;
export type GetWorkspaceSettingQueryResult = Apollo.QueryResult<GetWorkspaceSettingQuery, GetWorkspaceSettingQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;