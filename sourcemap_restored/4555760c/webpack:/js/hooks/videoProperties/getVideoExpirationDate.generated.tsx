import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoExpirationDateQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoExpirationDateQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', expirationDate: string | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoExpirationDateDocument = gql`
    query GetVideoExpirationDate($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    __typename
    ... on RegularUserVideo {
      expirationDate
    }
  }
}
    `;

/**
 * __useGetVideoExpirationDateQuery__
 *
 * To run a query within a React component, call `useGetVideoExpirationDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoExpirationDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoExpirationDateQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoExpirationDateQuery(baseOptions: Apollo.QueryHookOptions<GetVideoExpirationDateQuery, GetVideoExpirationDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoExpirationDateQuery, GetVideoExpirationDateQueryVariables>(GetVideoExpirationDateDocument, options);
      }
export function useGetVideoExpirationDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoExpirationDateQuery, GetVideoExpirationDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoExpirationDateQuery, GetVideoExpirationDateQueryVariables>(GetVideoExpirationDateDocument, options);
        }
export type GetVideoExpirationDateQueryHookResult = ReturnType<typeof useGetVideoExpirationDateQuery>;
export type GetVideoExpirationDateLazyQueryHookResult = ReturnType<typeof useGetVideoExpirationDateLazyQuery>;
export type GetVideoExpirationDateQueryResult = Apollo.QueryResult<GetVideoExpirationDateQuery, GetVideoExpirationDateQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;