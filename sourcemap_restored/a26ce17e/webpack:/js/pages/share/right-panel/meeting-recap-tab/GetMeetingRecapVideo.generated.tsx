import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMeetingRecapVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetMeetingRecapVideoQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, description: string | null, playable_duration: number | null, attachments: Array<{ __typename: 'VideoAttachment', id: string, url: string, service: { __typename: 'VideoAttachmentService', name: string, humanName: string } | null }>, meetingRecordingInfo: { __typename: 'MeetingRecordingInfo', meetingType: string } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetMeetingRecapVideoDocument = gql`
    query GetMeetingRecapVideo($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      description
      playable_duration
      attachments {
        id
        url
        service {
          name
          humanName
        }
      }
      meetingRecordingInfo {
        meetingType
      }
    }
  }
}
    `;

/**
 * __useGetMeetingRecapVideoQuery__
 *
 * To run a query within a React component, call `useGetMeetingRecapVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingRecapVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingRecapVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetMeetingRecapVideoQuery(baseOptions: Apollo.QueryHookOptions<GetMeetingRecapVideoQuery, GetMeetingRecapVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingRecapVideoQuery, GetMeetingRecapVideoQueryVariables>(GetMeetingRecapVideoDocument, options);
      }
export function useGetMeetingRecapVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingRecapVideoQuery, GetMeetingRecapVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingRecapVideoQuery, GetMeetingRecapVideoQueryVariables>(GetMeetingRecapVideoDocument, options);
        }
export type GetMeetingRecapVideoQueryHookResult = ReturnType<typeof useGetMeetingRecapVideoQuery>;
export type GetMeetingRecapVideoLazyQueryHookResult = ReturnType<typeof useGetMeetingRecapVideoLazyQuery>;
export type GetMeetingRecapVideoQueryResult = Apollo.QueryResult<GetMeetingRecapVideoQuery, GetMeetingRecapVideoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;