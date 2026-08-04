import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { CommentPostFragmentFragmentDoc } from './CommentPostFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchVideoCommentsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchVideoCommentsQuery = { __typename: 'Query', video: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, videoMeetingPlatform: string | null, video_comments: Array<{ __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, createdAt: string | null, isChatMessage: boolean, user_id: number | null, anon_user_id: string | null, deletedAt: string | null, locallyDeleted: boolean | null, inFlightContent: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null, children_comments: Array<{ __typename: 'PublicVideoComment', id: string, content: string | null, time_stamp: number | null, user_name: string | null, edited: boolean, user_id: number | null, anon_user_id: string | null, createdAt: string | null, isChatMessage: boolean, comment_post_idv2: string | null, extended_reaction: string | null, locallyDeleted: boolean | null, inFlightContent: string | null, plainContent: string | null, avatar: { __typename: 'Avatar', name: string, thumb: string, isAtlassianMastered: boolean | null } | null } | null> | null }> } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const FetchVideoCommentsDocument = gql`
    query fetchVideoComments($id: ID!, $password: String) {
  video: getVideo(id: $id, password: $password) {
    __typename
    ... on RegularUserVideo {
      id
      videoMeetingPlatform
      video_comments(includeDeleted: true) {
        ...CommentPostFragment
      }
    }
  }
}
    ${CommentPostFragmentFragmentDoc}`;

/**
 * __useFetchVideoCommentsQuery__
 *
 * To run a query within a React component, call `useFetchVideoCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchVideoCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchVideoCommentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFetchVideoCommentsQuery(baseOptions: Apollo.QueryHookOptions<FetchVideoCommentsQuery, FetchVideoCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchVideoCommentsQuery, FetchVideoCommentsQueryVariables>(FetchVideoCommentsDocument, options);
      }
export function useFetchVideoCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchVideoCommentsQuery, FetchVideoCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchVideoCommentsQuery, FetchVideoCommentsQueryVariables>(FetchVideoCommentsDocument, options);
        }
export type FetchVideoCommentsQueryHookResult = ReturnType<typeof useFetchVideoCommentsQuery>;
export type FetchVideoCommentsLazyQueryHookResult = ReturnType<typeof useFetchVideoCommentsLazyQuery>;
export type FetchVideoCommentsQueryResult = Apollo.QueryResult<FetchVideoCommentsQuery, FetchVideoCommentsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;