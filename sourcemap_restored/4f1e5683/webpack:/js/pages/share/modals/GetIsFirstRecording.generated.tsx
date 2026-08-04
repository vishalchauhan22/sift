import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetIsFirstRecordingQueryVariables = Types.Exact<{
  fromRecorder: Types.Scalars['Boolean']['input'];
  videoId: Types.Scalars['String']['input'];
}>;


export type GetIsFirstRecordingQuery = { __typename: 'Query', getCurrentUser: { __typename: 'GenericError' } | { __typename: 'GetCurrentUserPayload', user: { __typename: 'RegularUser', id: string, isFirstRecording: boolean | null } | null } | { __typename: 'UserNotLoggedIn' } | null };


export const GetIsFirstRecordingDocument = gql`
    query GetIsFirstRecording($fromRecorder: Boolean!, $videoId: String!) {
  getCurrentUser {
    __typename
    ... on GetCurrentUserPayload {
      user {
        id
        isFirstRecording(fromRecorder: $fromRecorder, videoId: $videoId)
      }
    }
  }
}
    `;

/**
 * __useGetIsFirstRecordingQuery__
 *
 * To run a query within a React component, call `useGetIsFirstRecordingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsFirstRecordingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsFirstRecordingQuery({
 *   variables: {
 *      fromRecorder: // value for 'fromRecorder'
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetIsFirstRecordingQuery(baseOptions: Apollo.QueryHookOptions<GetIsFirstRecordingQuery, GetIsFirstRecordingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsFirstRecordingQuery, GetIsFirstRecordingQueryVariables>(GetIsFirstRecordingDocument, options);
      }
export function useGetIsFirstRecordingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsFirstRecordingQuery, GetIsFirstRecordingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsFirstRecordingQuery, GetIsFirstRecordingQueryVariables>(GetIsFirstRecordingDocument, options);
        }
export type GetIsFirstRecordingQueryHookResult = ReturnType<typeof useGetIsFirstRecordingQuery>;
export type GetIsFirstRecordingLazyQueryHookResult = ReturnType<typeof useGetIsFirstRecordingLazyQuery>;
export type GetIsFirstRecordingQueryResult = Apollo.QueryResult<GetIsFirstRecordingQuery, GetIsFirstRecordingQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;