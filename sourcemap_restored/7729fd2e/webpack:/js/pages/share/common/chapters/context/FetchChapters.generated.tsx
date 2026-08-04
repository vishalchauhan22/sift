import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchChaptersQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchChaptersQuery = { __typename: 'Query', fetchVideoChapters: { __typename: 'EmptyChaptersPayload', content: string | null } | { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'VideoChapters', id: string, video_id: string, content: string | null, schema_version: string | null, updatedAt: string | null, edited_at: string | null, auto_chapter_status: Types.AutoChapterStatusesType | null } | null };


export const FetchChaptersDocument = gql`
    query FetchChapters($videoId: ID!, $password: String) {
  fetchVideoChapters(videoId: $videoId, password: $password) {
    ... on VideoChapters {
      id
      video_id
      content
      schema_version
      updatedAt
      edited_at
      auto_chapter_status
    }
    ... on EmptyChaptersPayload {
      content
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useFetchChaptersQuery__
 *
 * To run a query within a React component, call `useFetchChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchChaptersQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFetchChaptersQuery(baseOptions: Apollo.QueryHookOptions<FetchChaptersQuery, FetchChaptersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchChaptersQuery, FetchChaptersQueryVariables>(FetchChaptersDocument, options);
      }
export function useFetchChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchChaptersQuery, FetchChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchChaptersQuery, FetchChaptersQueryVariables>(FetchChaptersDocument, options);
        }
export type FetchChaptersQueryHookResult = ReturnType<typeof useFetchChaptersQuery>;
export type FetchChaptersLazyQueryHookResult = ReturnType<typeof useFetchChaptersLazyQuery>;
export type FetchChaptersQueryResult = Apollo.QueryResult<FetchChaptersQuery, FetchChaptersQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;