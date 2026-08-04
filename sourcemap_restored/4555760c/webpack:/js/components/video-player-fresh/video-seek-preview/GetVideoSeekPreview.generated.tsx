import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoSeekPreviewQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  trimId?: Types.InputMaybe<Types.Scalars['String']['input']>;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoSeekPreviewQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, seekPreviewCdnUrl: string | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoSeekPreviewDocument = gql`
    query GetVideoSeekPreview($videoId: ID!, $trimId: String, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      seekPreviewCdnUrl(trimId: $trimId)
    }
  }
}
    `;

/**
 * __useGetVideoSeekPreviewQuery__
 *
 * To run a query within a React component, call `useGetVideoSeekPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoSeekPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoSeekPreviewQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      trimId: // value for 'trimId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoSeekPreviewQuery(baseOptions: Apollo.QueryHookOptions<GetVideoSeekPreviewQuery, GetVideoSeekPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoSeekPreviewQuery, GetVideoSeekPreviewQueryVariables>(GetVideoSeekPreviewDocument, options);
      }
export function useGetVideoSeekPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoSeekPreviewQuery, GetVideoSeekPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoSeekPreviewQuery, GetVideoSeekPreviewQueryVariables>(GetVideoSeekPreviewDocument, options);
        }
export type GetVideoSeekPreviewQueryHookResult = ReturnType<typeof useGetVideoSeekPreviewQuery>;
export type GetVideoSeekPreviewLazyQueryHookResult = ReturnType<typeof useGetVideoSeekPreviewLazyQuery>;
export type GetVideoSeekPreviewQueryResult = Apollo.QueryResult<GetVideoSeekPreviewQuery, GetVideoSeekPreviewQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;