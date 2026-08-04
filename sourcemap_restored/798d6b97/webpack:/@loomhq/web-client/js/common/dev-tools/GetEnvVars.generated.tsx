import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEnvVarsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetEnvVarsQuery = { __typename: 'Query', getEnvVars: { __typename: 'GenericError', message: string } | { __typename: 'GetEnvVarsPayload', envVars: string | null } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'UserNotLoggedIn' } | null };


export const GetEnvVarsDocument = gql`
    query GetEnvVars {
  getEnvVars {
    __typename
    ... on GetEnvVarsPayload {
      envVars
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetEnvVarsQuery__
 *
 * To run a query within a React component, call `useGetEnvVarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnvVarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnvVarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEnvVarsQuery(baseOptions?: Apollo.QueryHookOptions<GetEnvVarsQuery, GetEnvVarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnvVarsQuery, GetEnvVarsQueryVariables>(GetEnvVarsDocument, options);
      }
export function useGetEnvVarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnvVarsQuery, GetEnvVarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnvVarsQuery, GetEnvVarsQueryVariables>(GetEnvVarsDocument, options);
        }
export type GetEnvVarsQueryHookResult = ReturnType<typeof useGetEnvVarsQuery>;
export type GetEnvVarsLazyQueryHookResult = ReturnType<typeof useGetEnvVarsLazyQuery>;
export type GetEnvVarsQueryResult = Apollo.QueryResult<GetEnvVarsQuery, GetEnvVarsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;