import * as Types from '../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoBacklinksQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoBacklinksQuery = { __typename: 'Query', getVideoBacklinks: { __typename: 'GenericError', message: string } | { __typename: 'GetVideoBacklinksPayload', backlinks: Array<{ __typename: 'Backlink', id: string, isSynced: boolean, source: Types.BacklinkSourceType, sourceLink: string }> } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetVideoBacklinksDocument = gql`
    query GetVideoBacklinks($videoId: ID!, $password: String) {
  getVideoBacklinks(videoId: $videoId, password: $password) {
    __typename
    ... on GetVideoBacklinksPayload {
      backlinks {
        id
        isSynced
        source
        sourceLink
      }
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetVideoBacklinksQuery__
 *
 * To run a query within a React component, call `useGetVideoBacklinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoBacklinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoBacklinksQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoBacklinksQuery(baseOptions: Apollo.QueryHookOptions<GetVideoBacklinksQuery, GetVideoBacklinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoBacklinksQuery, GetVideoBacklinksQueryVariables>(GetVideoBacklinksDocument, options);
      }
export function useGetVideoBacklinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoBacklinksQuery, GetVideoBacklinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoBacklinksQuery, GetVideoBacklinksQueryVariables>(GetVideoBacklinksDocument, options);
        }
export type GetVideoBacklinksQueryHookResult = ReturnType<typeof useGetVideoBacklinksQuery>;
export type GetVideoBacklinksLazyQueryHookResult = ReturnType<typeof useGetVideoBacklinksLazyQuery>;
export type GetVideoBacklinksQueryResult = Apollo.QueryResult<GetVideoBacklinksQuery, GetVideoBacklinksQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;