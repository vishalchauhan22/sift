import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AmnUserPermsQueryVariables = Types.Exact<{
  isFromWorkspaceSettings?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type AmnUserPermsQuery = { __typename: 'Query', automatedMeetingNotesUserPermissions: { __typename: 'AutomatedMeetingNotesUserPermissionsPayload', hasPermission: boolean } | { __typename: 'GenericError' } | null };


export const AmnUserPermsDocument = gql`
    query AMNUserPerms($isFromWorkspaceSettings: Boolean) {
  automatedMeetingNotesUserPermissions(
    isFromWorkspaceSettings: $isFromWorkspaceSettings
  ) {
    ... on AutomatedMeetingNotesUserPermissionsPayload {
      hasPermission
    }
  }
}
    `;

/**
 * __useAmnUserPermsQuery__
 *
 * To run a query within a React component, call `useAmnUserPermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmnUserPermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmnUserPermsQuery({
 *   variables: {
 *      isFromWorkspaceSettings: // value for 'isFromWorkspaceSettings'
 *   },
 * });
 */
export function useAmnUserPermsQuery(baseOptions?: Apollo.QueryHookOptions<AmnUserPermsQuery, AmnUserPermsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AmnUserPermsQuery, AmnUserPermsQueryVariables>(AmnUserPermsDocument, options);
      }
export function useAmnUserPermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmnUserPermsQuery, AmnUserPermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AmnUserPermsQuery, AmnUserPermsQueryVariables>(AmnUserPermsDocument, options);
        }
export type AmnUserPermsQueryHookResult = ReturnType<typeof useAmnUserPermsQuery>;
export type AmnUserPermsLazyQueryHookResult = ReturnType<typeof useAmnUserPermsLazyQuery>;
export type AmnUserPermsQueryResult = Apollo.QueryResult<AmnUserPermsQuery, AmnUserPermsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;