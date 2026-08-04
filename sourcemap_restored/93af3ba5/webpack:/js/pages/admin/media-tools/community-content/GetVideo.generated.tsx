import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetVideoQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', createdAt: string, isCommunityLoom: boolean, name: string, id: string, owner: { __typename: 'RegularUser', id: string, first_name: string | null, last_name: string | null }, organization: { __typename: 'Organization', id: string, name: string } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoDocument = gql`
    query GetVideo($id: ID!) {
  getVideo(id: $id) {
    ... on RegularUserVideo {
      owner {
        id
        first_name
        last_name
      }
      organization {
        id
        name
      }
      createdAt
      isCommunityLoom
      name
      id
    }
  }
}
    `;

/**
 * __useGetVideoQuery__
 *
 * To run a query within a React component, call `useGetVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVideoQuery(baseOptions: Apollo.QueryHookOptions<GetVideoQuery, GetVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoQuery, GetVideoQueryVariables>(GetVideoDocument, options);
      }
export function useGetVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoQuery, GetVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoQuery, GetVideoQueryVariables>(GetVideoDocument, options);
        }
export type GetVideoQueryHookResult = ReturnType<typeof useGetVideoQuery>;
export type GetVideoLazyQueryHookResult = ReturnType<typeof useGetVideoLazyQuery>;
export type GetVideoQueryResult = Apollo.QueryResult<GetVideoQuery, GetVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;