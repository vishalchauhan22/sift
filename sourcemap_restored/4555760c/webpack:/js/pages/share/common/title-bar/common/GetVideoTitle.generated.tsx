import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoTitleQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoTitleQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, name: string } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoTitleDocument = gql`
    query GetVideoTitle($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    __typename
    ... on RegularUserVideo {
      id
      name
    }
  }
}
    `;

/**
 * __useGetVideoTitleQuery__
 *
 * To run a query within a React component, call `useGetVideoTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoTitleQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoTitleQuery(baseOptions: Apollo.QueryHookOptions<GetVideoTitleQuery, GetVideoTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoTitleQuery, GetVideoTitleQueryVariables>(GetVideoTitleDocument, options);
      }
export function useGetVideoTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoTitleQuery, GetVideoTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoTitleQuery, GetVideoTitleQueryVariables>(GetVideoTitleDocument, options);
        }
export type GetVideoTitleQueryHookResult = ReturnType<typeof useGetVideoTitleQuery>;
export type GetVideoTitleLazyQueryHookResult = ReturnType<typeof useGetVideoTitleLazyQuery>;
export type GetVideoTitleQueryResult = Apollo.QueryResult<GetVideoTitleQuery, GetVideoTitleQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;