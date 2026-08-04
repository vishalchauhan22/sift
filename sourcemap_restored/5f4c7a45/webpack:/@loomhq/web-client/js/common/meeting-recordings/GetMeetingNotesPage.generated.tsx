import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMeetingNotesPageQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetMeetingNotesPageQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', meetingNotesPage: { __typename: 'MeetingNotesPage', pageUrl: string } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetMeetingNotesPageDocument = gql`
    query GetMeetingNotesPage($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      meetingNotesPage {
        pageUrl
      }
    }
  }
}
    `;

/**
 * __useGetMeetingNotesPageQuery__
 *
 * To run a query within a React component, call `useGetMeetingNotesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingNotesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingNotesPageQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetMeetingNotesPageQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingNotesPageQuery, GetMeetingNotesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingNotesPageQuery, GetMeetingNotesPageQueryVariables>(GetMeetingNotesPageDocument, options);
      }
export function useGetMeetingNotesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingNotesPageQuery, GetMeetingNotesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingNotesPageQuery, GetMeetingNotesPageQueryVariables>(GetMeetingNotesPageDocument, options);
        }
export type GetMeetingNotesPageQueryHookResult = ReturnType<typeof useGetMeetingNotesPageQuery>;
export type GetMeetingNotesPageLazyQueryHookResult = ReturnType<typeof useGetMeetingNotesPageLazyQuery>;
export type GetMeetingNotesPageQueryResult = Apollo.QueryResult<GetMeetingNotesPageQuery, GetMeetingNotesPageQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;