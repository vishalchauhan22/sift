import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoRecordingClientQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoRecordingClientQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, video_properties: { __typename: 'VideoProperties', recordingClient: Types.RecordingClient | null } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoRecordingClientDocument = gql`
    query GetVideoRecordingClient($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      video_properties {
        recordingClient
      }
    }
  }
}
    `;

/**
 * __useGetVideoRecordingClientQuery__
 *
 * To run a query within a React component, call `useGetVideoRecordingClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoRecordingClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoRecordingClientQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoRecordingClientQuery(baseOptions: Apollo.QueryHookOptions<GetVideoRecordingClientQuery, GetVideoRecordingClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoRecordingClientQuery, GetVideoRecordingClientQueryVariables>(GetVideoRecordingClientDocument, options);
      }
export function useGetVideoRecordingClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoRecordingClientQuery, GetVideoRecordingClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoRecordingClientQuery, GetVideoRecordingClientQueryVariables>(GetVideoRecordingClientDocument, options);
        }
export type GetVideoRecordingClientQueryHookResult = ReturnType<typeof useGetVideoRecordingClientQuery>;
export type GetVideoRecordingClientLazyQueryHookResult = ReturnType<typeof useGetVideoRecordingClientLazyQuery>;
export type GetVideoRecordingClientQueryResult = Apollo.QueryResult<GetVideoRecordingClientQuery, GetVideoRecordingClientQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;