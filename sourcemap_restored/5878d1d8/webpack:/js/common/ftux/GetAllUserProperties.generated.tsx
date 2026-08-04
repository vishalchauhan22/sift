import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUserPropertiesQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type GetAllUserPropertiesQuery = { __typename: 'Query', getAllUserProperties: { __typename: 'GenericError' } | { __typename: 'GetAllUserPropertiesPayload', properties: Array<{ __typename: 'PersonProperty', name: string | null, value: unknown | null }> } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetAllUserPropertiesDocument = gql`
    query GetAllUserProperties($userId: ID!) {
  getAllUserProperties(userId: $userId) {
    ... on GetAllUserPropertiesPayload {
      properties {
        ... on PersonProperty {
          name
          value
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllUserPropertiesQuery__
 *
 * To run a query within a React component, call `useGetAllUserPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserPropertiesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllUserPropertiesQuery(baseOptions: Apollo.QueryHookOptions<GetAllUserPropertiesQuery, GetAllUserPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserPropertiesQuery, GetAllUserPropertiesQueryVariables>(GetAllUserPropertiesDocument, options);
      }
export function useGetAllUserPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserPropertiesQuery, GetAllUserPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserPropertiesQuery, GetAllUserPropertiesQueryVariables>(GetAllUserPropertiesDocument, options);
        }
export type GetAllUserPropertiesQueryHookResult = ReturnType<typeof useGetAllUserPropertiesQuery>;
export type GetAllUserPropertiesLazyQueryHookResult = ReturnType<typeof useGetAllUserPropertiesLazyQuery>;
export type GetAllUserPropertiesQueryResult = Apollo.QueryResult<GetAllUserPropertiesQuery, GetAllUserPropertiesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;