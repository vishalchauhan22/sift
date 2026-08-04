import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAutoChaptersStatusQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAutoChaptersStatusQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoChaptersStatus: Types.AutoChapterStatusesType | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetAutoChaptersStatusDocument = gql`
    query GetAutoChaptersStatus($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    __typename
    ... on AutoFeatureStatuses {
      id
      autoChaptersStatus
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useGetAutoChaptersStatusQuery__
 *
 * To run a query within a React component, call `useGetAutoChaptersStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoChaptersStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoChaptersStatusQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetAutoChaptersStatusQuery(baseOptions: Apollo.QueryHookOptions<GetAutoChaptersStatusQuery, GetAutoChaptersStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoChaptersStatusQuery, GetAutoChaptersStatusQueryVariables>(GetAutoChaptersStatusDocument, options);
      }
export function useGetAutoChaptersStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoChaptersStatusQuery, GetAutoChaptersStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoChaptersStatusQuery, GetAutoChaptersStatusQueryVariables>(GetAutoChaptersStatusDocument, options);
        }
export type GetAutoChaptersStatusQueryHookResult = ReturnType<typeof useGetAutoChaptersStatusQuery>;
export type GetAutoChaptersStatusLazyQueryHookResult = ReturnType<typeof useGetAutoChaptersStatusLazyQuery>;
export type GetAutoChaptersStatusQueryResult = Apollo.QueryResult<GetAutoChaptersStatusQuery, GetAutoChaptersStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;