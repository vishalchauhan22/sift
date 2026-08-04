import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserByIdWithProfileQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type GetUserByIdWithProfileQuery = { __typename: 'Query', user: { __typename: 'CommunityUserPayload', user: { __typename: 'CommunityUser', id: string, first_name: string | null, last_name: string | null, avatars: Array<{ __typename: 'Avatar', thumb: string, large: string }>, profile: { __typename: 'CommunityUserProfile', profileUrl: string | null, communityVideoCount: number | null, profileInfo: { __typename: 'CommunityProfilePropertyType', role: string | null, location: string | null } | null } | null } | null } | { __typename: 'GenericError' } | { __typename: 'RegularUserPayload', user: { __typename: 'RegularUser', id: string, email: string, first_name: string | null, last_name: string | null, avatars: Array<{ __typename: 'Avatar', thumb: string, large: string, isAtlassianMastered: boolean | null }>, profile: { __typename: 'RegularUserProfile', profileUrl: string | null, profileVideoCount: number | null, communityVideoCount: number | null, profileInfo: { __typename: 'ProfilePropertyType', role: string | null, location: string | null } | null } | null } | null } | null };


export const GetUserByIdWithProfileDocument = gql`
    query GetUserByIdWithProfile($userId: ID!) {
  user: getUserById(userId: $userId) {
    __typename
    ... on RegularUserPayload {
      user {
        id
        email
        first_name
        last_name
        avatars {
          thumb
          large
          isAtlassianMastered
        }
        profile {
          profileUrl
          profileVideoCount
          communityVideoCount
          profileInfo {
            role
            location
          }
        }
      }
    }
    ... on CommunityUserPayload {
      user {
        id
        first_name
        last_name
        avatars {
          thumb
          large
        }
        profile {
          profileUrl
          communityVideoCount
          profileInfo {
            role
            location
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserByIdWithProfileQuery__
 *
 * To run a query within a React component, call `useGetUserByIdWithProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdWithProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdWithProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdWithProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdWithProfileQuery, GetUserByIdWithProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdWithProfileQuery, GetUserByIdWithProfileQueryVariables>(GetUserByIdWithProfileDocument, options);
      }
export function useGetUserByIdWithProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdWithProfileQuery, GetUserByIdWithProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdWithProfileQuery, GetUserByIdWithProfileQueryVariables>(GetUserByIdWithProfileDocument, options);
        }
export type GetUserByIdWithProfileQueryHookResult = ReturnType<typeof useGetUserByIdWithProfileQuery>;
export type GetUserByIdWithProfileLazyQueryHookResult = ReturnType<typeof useGetUserByIdWithProfileLazyQuery>;
export type GetUserByIdWithProfileQueryResult = Apollo.QueryResult<GetUserByIdWithProfileQuery, GetUserByIdWithProfileQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;