import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEditTabVideoDetailsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetEditTabVideoDetailsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo', id: string, message: string | null } | { __typename: 'RegularUserVideo', id: string, complete: boolean, cta: { __typename: 'CTA', enabled: boolean, url: string | null, is_auto: boolean | null } } | { __typename: 'VideoPasswordMissingOrIncorrect', id: string, message: string | null } | null };


export const GetEditTabVideoDetailsDocument = gql`
    query getEditTabVideoDetails($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      complete
      cta {
        enabled
        url
        is_auto
      }
    }
    ... on PrivateVideo {
      id
      message
    }
    ... on VideoPasswordMissingOrIncorrect {
      id
      message
    }
  }
}
    `;

/**
 * __useGetEditTabVideoDetailsQuery__
 *
 * To run a query within a React component, call `useGetEditTabVideoDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditTabVideoDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditTabVideoDetailsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetEditTabVideoDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetEditTabVideoDetailsQuery, GetEditTabVideoDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEditTabVideoDetailsQuery, GetEditTabVideoDetailsQueryVariables>(GetEditTabVideoDetailsDocument, options);
      }
export function useGetEditTabVideoDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEditTabVideoDetailsQuery, GetEditTabVideoDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEditTabVideoDetailsQuery, GetEditTabVideoDetailsQueryVariables>(GetEditTabVideoDetailsDocument, options);
        }
export type GetEditTabVideoDetailsQueryHookResult = ReturnType<typeof useGetEditTabVideoDetailsQuery>;
export type GetEditTabVideoDetailsLazyQueryHookResult = ReturnType<typeof useGetEditTabVideoDetailsLazyQuery>;
export type GetEditTabVideoDetailsQueryResult = Apollo.QueryResult<GetEditTabVideoDetailsQuery, GetEditTabVideoDetailsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;