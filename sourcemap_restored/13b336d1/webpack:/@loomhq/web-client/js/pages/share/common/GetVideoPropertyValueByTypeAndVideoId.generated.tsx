import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoPropertyValueByTypeAndVideoIdQueryVariables = Types.Exact<{
  name: Types.VideoPropertyType;
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoPropertyValueByTypeAndVideoIdQuery = { __typename: 'Query', getVideoProperty: { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'VideoProperty', name: string | null, value: unknown | null } | null };


export const GetVideoPropertyValueByTypeAndVideoIdDocument = gql`
    query GetVideoPropertyValueByTypeAndVideoId($name: VideoPropertyType!, $videoId: ID!) {
  getVideoProperty(name: $name, videoId: $videoId) {
    __typename
    ... on VideoProperty {
      name
      value
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetVideoPropertyValueByTypeAndVideoIdQuery__
 *
 * To run a query within a React component, call `useGetVideoPropertyValueByTypeAndVideoIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoPropertyValueByTypeAndVideoIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoPropertyValueByTypeAndVideoIdQuery({
 *   variables: {
 *      name: // value for 'name'
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoPropertyValueByTypeAndVideoIdQuery(baseOptions: Apollo.QueryHookOptions<GetVideoPropertyValueByTypeAndVideoIdQuery, GetVideoPropertyValueByTypeAndVideoIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoPropertyValueByTypeAndVideoIdQuery, GetVideoPropertyValueByTypeAndVideoIdQueryVariables>(GetVideoPropertyValueByTypeAndVideoIdDocument, options);
      }
export function useGetVideoPropertyValueByTypeAndVideoIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoPropertyValueByTypeAndVideoIdQuery, GetVideoPropertyValueByTypeAndVideoIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoPropertyValueByTypeAndVideoIdQuery, GetVideoPropertyValueByTypeAndVideoIdQueryVariables>(GetVideoPropertyValueByTypeAndVideoIdDocument, options);
        }
export type GetVideoPropertyValueByTypeAndVideoIdQueryHookResult = ReturnType<typeof useGetVideoPropertyValueByTypeAndVideoIdQuery>;
export type GetVideoPropertyValueByTypeAndVideoIdLazyQueryHookResult = ReturnType<typeof useGetVideoPropertyValueByTypeAndVideoIdLazyQuery>;
export type GetVideoPropertyValueByTypeAndVideoIdQueryResult = Apollo.QueryResult<GetVideoPropertyValueByTypeAndVideoIdQuery, GetVideoPropertyValueByTypeAndVideoIdQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;