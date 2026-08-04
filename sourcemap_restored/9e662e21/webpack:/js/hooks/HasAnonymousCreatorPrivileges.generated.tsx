import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HasAnonymousCreatorPrivilegesQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type HasAnonymousCreatorPrivilegesQuery = { __typename: 'Query', result: { __typename: 'GenericError' } | { __typename: 'UserAlreadyLoggedInError' } | { __typename: 'hasAnonymousCreatorPrivilegesPayload', hasPrivileges: boolean | null } | null };


export const HasAnonymousCreatorPrivilegesDocument = gql`
    query HasAnonymousCreatorPrivileges($videoId: ID!) {
  result: hasAnonymousCreatorPrivilegesQuery(videoId: $videoId) {
    ... on hasAnonymousCreatorPrivilegesPayload {
      hasPrivileges
    }
  }
}
    `;

/**
 * __useHasAnonymousCreatorPrivilegesQuery__
 *
 * To run a query within a React component, call `useHasAnonymousCreatorPrivilegesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasAnonymousCreatorPrivilegesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasAnonymousCreatorPrivilegesQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useHasAnonymousCreatorPrivilegesQuery(baseOptions: Apollo.QueryHookOptions<HasAnonymousCreatorPrivilegesQuery, HasAnonymousCreatorPrivilegesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasAnonymousCreatorPrivilegesQuery, HasAnonymousCreatorPrivilegesQueryVariables>(HasAnonymousCreatorPrivilegesDocument, options);
      }
export function useHasAnonymousCreatorPrivilegesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasAnonymousCreatorPrivilegesQuery, HasAnonymousCreatorPrivilegesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasAnonymousCreatorPrivilegesQuery, HasAnonymousCreatorPrivilegesQueryVariables>(HasAnonymousCreatorPrivilegesDocument, options);
        }
export type HasAnonymousCreatorPrivilegesQueryHookResult = ReturnType<typeof useHasAnonymousCreatorPrivilegesQuery>;
export type HasAnonymousCreatorPrivilegesLazyQueryHookResult = ReturnType<typeof useHasAnonymousCreatorPrivilegesLazyQuery>;
export type HasAnonymousCreatorPrivilegesQueryResult = Apollo.QueryResult<HasAnonymousCreatorPrivilegesQuery, HasAnonymousCreatorPrivilegesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;