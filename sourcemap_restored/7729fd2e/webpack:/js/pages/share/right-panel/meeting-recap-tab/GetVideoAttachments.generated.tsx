import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoAttachmentsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoAttachmentsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, attachments: Array<{ __typename: 'VideoAttachment', id: string, url: string, service: { __typename: 'VideoAttachmentService', name: string, humanName: string } | null }> } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoAttachmentsDocument = gql`
    query GetVideoAttachments($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      attachments {
        id
        url
        service {
          name
          humanName
        }
      }
    }
  }
}
    `;

/**
 * __useGetVideoAttachmentsQuery__
 *
 * To run a query within a React component, call `useGetVideoAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoAttachmentsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoAttachmentsQuery(baseOptions: Apollo.QueryHookOptions<GetVideoAttachmentsQuery, GetVideoAttachmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoAttachmentsQuery, GetVideoAttachmentsQueryVariables>(GetVideoAttachmentsDocument, options);
      }
export function useGetVideoAttachmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoAttachmentsQuery, GetVideoAttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoAttachmentsQuery, GetVideoAttachmentsQueryVariables>(GetVideoAttachmentsDocument, options);
        }
export type GetVideoAttachmentsQueryHookResult = ReturnType<typeof useGetVideoAttachmentsQuery>;
export type GetVideoAttachmentsLazyQueryHookResult = ReturnType<typeof useGetVideoAttachmentsLazyQuery>;
export type GetVideoAttachmentsQueryResult = Apollo.QueryResult<GetVideoAttachmentsQuery, GetVideoAttachmentsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;