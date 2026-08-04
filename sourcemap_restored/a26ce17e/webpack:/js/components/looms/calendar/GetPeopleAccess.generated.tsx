import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPeopleAccessQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetPeopleAccessQuery = { __typename: 'Query', aclResult: { __typename: 'GenericError' } | { __typename: 'GetVideoAclEntriesPayload', entrySet: { __typename: 'VideoAclEntrySet', peopleEntries: Array<{ __typename: 'DomainVideoAclEntry', access: Types.VideoAccessLevel | null } | { __typename: 'SpaceVideoAclEntry', access: Types.VideoAccessLevel | null } | { __typename: 'UserEmailVideoAclEntry', email: string, hasPendingInvite: boolean | null, access: Types.VideoAccessLevel | null } | { __typename: 'UserVideoAclEntry', access: Types.VideoAccessLevel | null, user: { __typename: 'RegularUser', id: string } | null } | { __typename: 'WorkspaceVideoAclEntry', access: Types.VideoAccessLevel | null } | null> | null } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetPeopleAccessDocument = gql`
    query GetPeopleAccess($videoId: ID!) {
  aclResult: getVideoAclEntries(videoId: $videoId) {
    __typename
    ... on GetVideoAclEntriesPayload {
      entrySet {
        peopleEntries {
          __typename
          access
          ... on UserVideoAclEntry {
            user {
              id
            }
          }
          ... on UserEmailVideoAclEntry {
            email
            hasPendingInvite
          }
        }
      }
    }
    ... on UserNotAuthorizedError {
      message
    }
  }
}
    `;

/**
 * __useGetPeopleAccessQuery__
 *
 * To run a query within a React component, call `useGetPeopleAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeopleAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeopleAccessQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetPeopleAccessQuery(baseOptions: Apollo.QueryHookOptions<GetPeopleAccessQuery, GetPeopleAccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeopleAccessQuery, GetPeopleAccessQueryVariables>(GetPeopleAccessDocument, options);
      }
export function useGetPeopleAccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeopleAccessQuery, GetPeopleAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeopleAccessQuery, GetPeopleAccessQueryVariables>(GetPeopleAccessDocument, options);
        }
export type GetPeopleAccessQueryHookResult = ReturnType<typeof useGetPeopleAccessQuery>;
export type GetPeopleAccessLazyQueryHookResult = ReturnType<typeof useGetPeopleAccessLazyQuery>;
export type GetPeopleAccessQueryResult = Apollo.QueryResult<GetPeopleAccessQuery, GetPeopleAccessQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;