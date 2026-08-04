import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAutoTitleQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAutoTitleQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoTitle: string | null, autoTitleStatus: Types.IntelligenceStatusType | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetAutoTitleDocument = gql`
    query GetAutoTitle($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    __typename
    ... on AutoFeatureStatuses {
      id
      autoTitle
      autoTitleStatus
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetAutoTitleQuery__
 *
 * To run a query within a React component, call `useGetAutoTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoTitleQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetAutoTitleQuery(baseOptions: Apollo.QueryHookOptions<GetAutoTitleQuery, GetAutoTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoTitleQuery, GetAutoTitleQueryVariables>(GetAutoTitleDocument, options);
      }
export function useGetAutoTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoTitleQuery, GetAutoTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoTitleQuery, GetAutoTitleQueryVariables>(GetAutoTitleDocument, options);
        }
export type GetAutoTitleQueryHookResult = ReturnType<typeof useGetAutoTitleQuery>;
export type GetAutoTitleLazyQueryHookResult = ReturnType<typeof useGetAutoTitleLazyQuery>;
export type GetAutoTitleQueryResult = Apollo.QueryResult<GetAutoTitleQuery, GetAutoTitleQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;