import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoTranscodedUrlQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  forceOriginal?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type GetVideoTranscodedUrlQuery = { __typename: 'Query', getVideoTranscodedUrl: { __typename: 'EntityNotFoundError' } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'VideoNotFoundError' } | { __typename: 'VideoSource', url: string | null } | null };


export const GetVideoTranscodedUrlDocument = gql`
    query GetVideoTranscodedUrl($videoId: ID!, $forceOriginal: Boolean) {
  getVideoTranscodedUrl(videoId: $videoId, forceOriginal: $forceOriginal) {
    ... on VideoSource {
      url
    }
  }
}
    `;

/**
 * __useGetVideoTranscodedUrlQuery__
 *
 * To run a query within a React component, call `useGetVideoTranscodedUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoTranscodedUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoTranscodedUrlQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      forceOriginal: // value for 'forceOriginal'
 *   },
 * });
 */
export function useGetVideoTranscodedUrlQuery(baseOptions: Apollo.QueryHookOptions<GetVideoTranscodedUrlQuery, GetVideoTranscodedUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoTranscodedUrlQuery, GetVideoTranscodedUrlQueryVariables>(GetVideoTranscodedUrlDocument, options);
      }
export function useGetVideoTranscodedUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoTranscodedUrlQuery, GetVideoTranscodedUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoTranscodedUrlQuery, GetVideoTranscodedUrlQueryVariables>(GetVideoTranscodedUrlDocument, options);
        }
export type GetVideoTranscodedUrlQueryHookResult = ReturnType<typeof useGetVideoTranscodedUrlQuery>;
export type GetVideoTranscodedUrlLazyQueryHookResult = ReturnType<typeof useGetVideoTranscodedUrlLazyQuery>;
export type GetVideoTranscodedUrlQueryResult = Apollo.QueryResult<GetVideoTranscodedUrlQuery, GetVideoTranscodedUrlQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;