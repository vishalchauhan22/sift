import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoSiteIdQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoSiteIdQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, organization: { __typename: 'Organization', id: string, site_id: string | null } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoSiteIdDocument = gql`
    query GetVideoSiteId($videoId: ID!) {
  getVideo(id: $videoId) {
    __typename
    ... on RegularUserVideo {
      id
      organization {
        id
        site_id
      }
    }
  }
}
    `;

/**
 * __useGetVideoSiteIdQuery__
 *
 * To run a query within a React component, call `useGetVideoSiteIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoSiteIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoSiteIdQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoSiteIdQuery(baseOptions: Apollo.QueryHookOptions<GetVideoSiteIdQuery, GetVideoSiteIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoSiteIdQuery, GetVideoSiteIdQueryVariables>(GetVideoSiteIdDocument, options);
      }
export function useGetVideoSiteIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoSiteIdQuery, GetVideoSiteIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoSiteIdQuery, GetVideoSiteIdQueryVariables>(GetVideoSiteIdDocument, options);
        }
export type GetVideoSiteIdQueryHookResult = ReturnType<typeof useGetVideoSiteIdQuery>;
export type GetVideoSiteIdLazyQueryHookResult = ReturnType<typeof useGetVideoSiteIdLazyQuery>;
export type GetVideoSiteIdQueryResult = Apollo.QueryResult<GetVideoSiteIdQuery, GetVideoSiteIdQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;