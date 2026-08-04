import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserHasAccessToPersonalizedAudioQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserHasAccessToPersonalizedAudioQuery = { __typename: 'Query', getUserHasAccessToPersonalizedAudio: { __typename: 'GenericError' } | { __typename: 'GetUserHasAccessToPersonalizedAudioPayload', hasAccess: boolean | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetUserHasAccessToPersonalizedAudioDocument = gql`
    query GetUserHasAccessToPersonalizedAudio {
  getUserHasAccessToPersonalizedAudio {
    ... on GetUserHasAccessToPersonalizedAudioPayload {
      hasAccess
    }
  }
}
    `;

/**
 * __useGetUserHasAccessToPersonalizedAudioQuery__
 *
 * To run a query within a React component, call `useGetUserHasAccessToPersonalizedAudioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserHasAccessToPersonalizedAudioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserHasAccessToPersonalizedAudioQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserHasAccessToPersonalizedAudioQuery(baseOptions?: Apollo.QueryHookOptions<GetUserHasAccessToPersonalizedAudioQuery, GetUserHasAccessToPersonalizedAudioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserHasAccessToPersonalizedAudioQuery, GetUserHasAccessToPersonalizedAudioQueryVariables>(GetUserHasAccessToPersonalizedAudioDocument, options);
      }
export function useGetUserHasAccessToPersonalizedAudioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserHasAccessToPersonalizedAudioQuery, GetUserHasAccessToPersonalizedAudioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserHasAccessToPersonalizedAudioQuery, GetUserHasAccessToPersonalizedAudioQueryVariables>(GetUserHasAccessToPersonalizedAudioDocument, options);
        }
export type GetUserHasAccessToPersonalizedAudioQueryHookResult = ReturnType<typeof useGetUserHasAccessToPersonalizedAudioQuery>;
export type GetUserHasAccessToPersonalizedAudioLazyQueryHookResult = ReturnType<typeof useGetUserHasAccessToPersonalizedAudioLazyQuery>;
export type GetUserHasAccessToPersonalizedAudioQueryResult = Apollo.QueryResult<GetUserHasAccessToPersonalizedAudioQuery, GetUserHasAccessToPersonalizedAudioQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;