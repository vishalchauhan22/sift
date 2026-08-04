import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserFollowsProfileQueryVariables = Types.Exact<{
  profileId: Types.Scalars['ID']['input'];
}>;


export type GetUserFollowsProfileQuery = { __typename: 'Query', result: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserFollowsStream', follow: boolean | null, id: string | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetUserFollowsProfileDocument = gql`
    query GetUserFollowsProfile($profileId: ID!) {
  result: getUserFollowsProfile(profileId: $profileId) {
    ... on UserFollowsStream {
      follow
      id
    }
  }
}
    `;

/**
 * __useGetUserFollowsProfileQuery__
 *
 * To run a query within a React component, call `useGetUserFollowsProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFollowsProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFollowsProfileQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useGetUserFollowsProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserFollowsProfileQuery, GetUserFollowsProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFollowsProfileQuery, GetUserFollowsProfileQueryVariables>(GetUserFollowsProfileDocument, options);
      }
export function useGetUserFollowsProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFollowsProfileQuery, GetUserFollowsProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFollowsProfileQuery, GetUserFollowsProfileQueryVariables>(GetUserFollowsProfileDocument, options);
        }
export type GetUserFollowsProfileQueryHookResult = ReturnType<typeof useGetUserFollowsProfileQuery>;
export type GetUserFollowsProfileLazyQueryHookResult = ReturnType<typeof useGetUserFollowsProfileLazyQuery>;
export type GetUserFollowsProfileQueryResult = Apollo.QueryResult<GetUserFollowsProfileQuery, GetUserFollowsProfileQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;