import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchInvitationCapabilitiesQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
  isOnboarding?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type FetchInvitationCapabilitiesQuery = { __typename: 'Query', fetchInvitationCapabilities: { __typename: 'FetchInvitationCapabilitiesPayload', id: string, domains: Array<string | null> | null, inviteSetting: Types.InviteSetting, inviteFlow: Types.InviteFlow } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const FetchInvitationCapabilitiesDocument = gql`
    query FetchInvitationCapabilities($workspaceId: ID!, $isOnboarding: Boolean) {
  fetchInvitationCapabilities(
    workspaceId: $workspaceId
    isOnboarding: $isOnboarding
  ) {
    ... on FetchInvitationCapabilitiesPayload {
      id
      domains
      inviteSetting
      inviteFlow
    }
  }
}
    `;

/**
 * __useFetchInvitationCapabilitiesQuery__
 *
 * To run a query within a React component, call `useFetchInvitationCapabilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchInvitationCapabilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchInvitationCapabilitiesQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      isOnboarding: // value for 'isOnboarding'
 *   },
 * });
 */
export function useFetchInvitationCapabilitiesQuery(baseOptions: Apollo.QueryHookOptions<FetchInvitationCapabilitiesQuery, FetchInvitationCapabilitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchInvitationCapabilitiesQuery, FetchInvitationCapabilitiesQueryVariables>(FetchInvitationCapabilitiesDocument, options);
      }
export function useFetchInvitationCapabilitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchInvitationCapabilitiesQuery, FetchInvitationCapabilitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchInvitationCapabilitiesQuery, FetchInvitationCapabilitiesQueryVariables>(FetchInvitationCapabilitiesDocument, options);
        }
export type FetchInvitationCapabilitiesQueryHookResult = ReturnType<typeof useFetchInvitationCapabilitiesQuery>;
export type FetchInvitationCapabilitiesLazyQueryHookResult = ReturnType<typeof useFetchInvitationCapabilitiesLazyQuery>;
export type FetchInvitationCapabilitiesQueryResult = Apollo.QueryResult<FetchInvitationCapabilitiesQuery, FetchInvitationCapabilitiesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;