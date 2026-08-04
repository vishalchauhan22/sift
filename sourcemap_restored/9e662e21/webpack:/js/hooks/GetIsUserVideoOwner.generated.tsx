import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetIsUserVideoOwnerQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetIsUserVideoOwnerQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, current_user_is_owner: boolean } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetIsUserVideoOwnerDocument = gql`
    query GetIsUserVideoOwner($id: ID!) {
  getVideo(id: $id) {
    ... on RegularUserVideo {
      id
      current_user_is_owner
    }
  }
}
    `;

/**
 * __useGetIsUserVideoOwnerQuery__
 *
 * To run a query within a React component, call `useGetIsUserVideoOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsUserVideoOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsUserVideoOwnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIsUserVideoOwnerQuery(baseOptions: Apollo.QueryHookOptions<GetIsUserVideoOwnerQuery, GetIsUserVideoOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsUserVideoOwnerQuery, GetIsUserVideoOwnerQueryVariables>(GetIsUserVideoOwnerDocument, options);
      }
export function useGetIsUserVideoOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsUserVideoOwnerQuery, GetIsUserVideoOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsUserVideoOwnerQuery, GetIsUserVideoOwnerQueryVariables>(GetIsUserVideoOwnerDocument, options);
        }
export type GetIsUserVideoOwnerQueryHookResult = ReturnType<typeof useGetIsUserVideoOwnerQuery>;
export type GetIsUserVideoOwnerLazyQueryHookResult = ReturnType<typeof useGetIsUserVideoOwnerLazyQuery>;
export type GetIsUserVideoOwnerQueryResult = Apollo.QueryResult<GetIsUserVideoOwnerQuery, GetIsUserVideoOwnerQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;