import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoCurrentUserCanEditQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoCurrentUserCanEditQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, currentUserCanEdit: boolean } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoCurrentUserCanEditDocument = gql`
    query GetVideoCurrentUserCanEdit($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      currentUserCanEdit
    }
  }
}
    `;

/**
 * __useGetVideoCurrentUserCanEditQuery__
 *
 * To run a query within a React component, call `useGetVideoCurrentUserCanEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoCurrentUserCanEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoCurrentUserCanEditQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoCurrentUserCanEditQuery(baseOptions: Apollo.QueryHookOptions<GetVideoCurrentUserCanEditQuery, GetVideoCurrentUserCanEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoCurrentUserCanEditQuery, GetVideoCurrentUserCanEditQueryVariables>(GetVideoCurrentUserCanEditDocument, options);
      }
export function useGetVideoCurrentUserCanEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoCurrentUserCanEditQuery, GetVideoCurrentUserCanEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoCurrentUserCanEditQuery, GetVideoCurrentUserCanEditQueryVariables>(GetVideoCurrentUserCanEditDocument, options);
        }
export type GetVideoCurrentUserCanEditQueryHookResult = ReturnType<typeof useGetVideoCurrentUserCanEditQuery>;
export type GetVideoCurrentUserCanEditLazyQueryHookResult = ReturnType<typeof useGetVideoCurrentUserCanEditLazyQuery>;
export type GetVideoCurrentUserCanEditQueryResult = Apollo.QueryResult<GetVideoCurrentUserCanEditQuery, GetVideoCurrentUserCanEditQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;