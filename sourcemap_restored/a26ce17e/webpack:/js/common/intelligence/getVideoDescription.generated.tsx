import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoDescriptionQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoDescriptionQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, description: string | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoDescriptionDocument = gql`
    query GetVideoDescription($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      description
    }
  }
}
    `;

/**
 * __useGetVideoDescriptionQuery__
 *
 * To run a query within a React component, call `useGetVideoDescriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoDescriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoDescriptionQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoDescriptionQuery(baseOptions: Apollo.QueryHookOptions<GetVideoDescriptionQuery, GetVideoDescriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoDescriptionQuery, GetVideoDescriptionQueryVariables>(GetVideoDescriptionDocument, options);
      }
export function useGetVideoDescriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoDescriptionQuery, GetVideoDescriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoDescriptionQuery, GetVideoDescriptionQueryVariables>(GetVideoDescriptionDocument, options);
        }
export type GetVideoDescriptionQueryHookResult = ReturnType<typeof useGetVideoDescriptionQuery>;
export type GetVideoDescriptionLazyQueryHookResult = ReturnType<typeof useGetVideoDescriptionLazyQuery>;
export type GetVideoDescriptionQueryResult = Apollo.QueryResult<GetVideoDescriptionQuery, GetVideoDescriptionQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;