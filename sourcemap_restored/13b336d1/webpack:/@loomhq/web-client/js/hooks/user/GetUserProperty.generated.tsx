import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserPropertyQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type GetUserPropertyQuery = { __typename: 'Query', result: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'PersonProperty', value: unknown | null, name: string | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetUserPropertyDocument = gql`
    query GetUserProperty($name: String!) {
  result: getUserProperty(name: $name) {
    ... on PersonProperty {
      value
      name
    }
  }
}
    `;

/**
 * __useGetUserPropertyQuery__
 *
 * To run a query within a React component, call `useGetUserPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPropertyQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUserPropertyQuery(baseOptions: Apollo.QueryHookOptions<GetUserPropertyQuery, GetUserPropertyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPropertyQuery, GetUserPropertyQueryVariables>(GetUserPropertyDocument, options);
      }
export function useGetUserPropertyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPropertyQuery, GetUserPropertyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPropertyQuery, GetUserPropertyQueryVariables>(GetUserPropertyDocument, options);
        }
export type GetUserPropertyQueryHookResult = ReturnType<typeof useGetUserPropertyQuery>;
export type GetUserPropertyLazyQueryHookResult = ReturnType<typeof useGetUserPropertyLazyQuery>;
export type GetUserPropertyQueryResult = Apollo.QueryResult<GetUserPropertyQuery, GetUserPropertyQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;