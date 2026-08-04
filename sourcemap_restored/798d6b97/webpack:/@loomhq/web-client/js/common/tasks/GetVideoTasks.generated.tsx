import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoTaskFragmentFragmentDoc } from './VideoTaskFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoTasksQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoTasksQuery = { __typename: 'Query', getVideoTasks: { __typename: 'GenericError', message: string } | { __typename: 'GetVideoTasksPayload', tasks: Array<{ __typename: 'VideoTask', id: string, video_id: string, time_stamp: number, activity_type: Types.VideoActivityType | null, content: string | null, createdAt: string | null, approved_at: string | null, resolved_at: string | null, source: Types.VideoActivitySource, owner: { __typename: 'RegularUser', id: string, display_name: string } | null, responses: Array<{ __typename: 'ActivityResponse', id: string, responded_at: string | null, user: { __typename: 'RegularUser', id: string, display_name: string, avatars: Array<{ __typename: 'Avatar', thumb: string }> } | null }> }> } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning' } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetVideoTasksDocument = gql`
    query GetVideoTasks($videoId: ID!, $password: String) {
  getVideoTasks(videoId: $videoId, password: $password) {
    ... on GetVideoTasksPayload {
      tasks {
        ...VideoTaskFragment
      }
    }
    ... on Error {
      message
    }
  }
}
    ${VideoTaskFragmentFragmentDoc}`;

/**
 * __useGetVideoTasksQuery__
 *
 * To run a query within a React component, call `useGetVideoTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoTasksQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoTasksQuery(baseOptions: Apollo.QueryHookOptions<GetVideoTasksQuery, GetVideoTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoTasksQuery, GetVideoTasksQueryVariables>(GetVideoTasksDocument, options);
      }
export function useGetVideoTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoTasksQuery, GetVideoTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoTasksQuery, GetVideoTasksQueryVariables>(GetVideoTasksDocument, options);
        }
export type GetVideoTasksQueryHookResult = ReturnType<typeof useGetVideoTasksQuery>;
export type GetVideoTasksLazyQueryHookResult = ReturnType<typeof useGetVideoTasksLazyQuery>;
export type GetVideoTasksQueryResult = Apollo.QueryResult<GetVideoTasksQuery, GetVideoTasksQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;