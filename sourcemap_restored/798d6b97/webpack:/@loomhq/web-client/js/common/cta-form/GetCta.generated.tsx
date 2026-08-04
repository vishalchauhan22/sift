import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCtaQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetCtaQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', cta: { __typename: 'CTA', approved_at: string | null, enabled: boolean, is_auto: boolean | null, mods: unknown | null, text: string | null, url: string | null } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetCtaDocument = gql`
    query GetCta($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    __typename
    ... on RegularUserVideo {
      cta {
        __typename
        ... on CTA {
          approved_at
          enabled
          is_auto
          mods
          text
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetCtaQuery__
 *
 * To run a query within a React component, call `useGetCtaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCtaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCtaQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetCtaQuery(baseOptions: Apollo.QueryHookOptions<GetCtaQuery, GetCtaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCtaQuery, GetCtaQueryVariables>(GetCtaDocument, options);
      }
export function useGetCtaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCtaQuery, GetCtaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCtaQuery, GetCtaQueryVariables>(GetCtaDocument, options);
        }
export type GetCtaQueryHookResult = ReturnType<typeof useGetCtaQuery>;
export type GetCtaLazyQueryHookResult = ReturnType<typeof useGetCtaLazyQuery>;
export type GetCtaQueryResult = Apollo.QueryResult<GetCtaQuery, GetCtaQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;