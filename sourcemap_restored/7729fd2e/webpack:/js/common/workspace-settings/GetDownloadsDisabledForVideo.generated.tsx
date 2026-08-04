import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DownloadDisabledForVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DownloadDisabledForVideoQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', downloadDisabledForWorkspace: boolean } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const DownloadDisabledForVideoDocument = gql`
    query DownloadDisabledForVideo($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    __typename
    ... on RegularUserVideo {
      downloadDisabledForWorkspace
    }
  }
}
    `;

/**
 * __useDownloadDisabledForVideoQuery__
 *
 * To run a query within a React component, call `useDownloadDisabledForVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDownloadDisabledForVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDownloadDisabledForVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDownloadDisabledForVideoQuery(baseOptions: Apollo.QueryHookOptions<DownloadDisabledForVideoQuery, DownloadDisabledForVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DownloadDisabledForVideoQuery, DownloadDisabledForVideoQueryVariables>(DownloadDisabledForVideoDocument, options);
      }
export function useDownloadDisabledForVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DownloadDisabledForVideoQuery, DownloadDisabledForVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DownloadDisabledForVideoQuery, DownloadDisabledForVideoQueryVariables>(DownloadDisabledForVideoDocument, options);
        }
export type DownloadDisabledForVideoQueryHookResult = ReturnType<typeof useDownloadDisabledForVideoQuery>;
export type DownloadDisabledForVideoLazyQueryHookResult = ReturnType<typeof useDownloadDisabledForVideoLazyQuery>;
export type DownloadDisabledForVideoQueryResult = Apollo.QueryResult<DownloadDisabledForVideoQuery, DownloadDisabledForVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;