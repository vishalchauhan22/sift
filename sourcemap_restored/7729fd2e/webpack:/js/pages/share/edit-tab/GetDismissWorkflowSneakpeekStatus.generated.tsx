import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetDismissWorkflowSneakpeekStatusQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetDismissWorkflowSneakpeekStatusQuery = { __typename: 'Query', result: { __typename: 'DismissWorkflowSneakpeekProperty', dismissWorkflowSneakpeek: boolean | null } | { __typename: 'GenericError' } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'VideoNotFoundError', message: string } | null };


export const GetDismissWorkflowSneakpeekStatusDocument = gql`
    query GetDismissWorkflowSneakpeekStatus($videoId: ID!) {
  result: getDismissWorkflowSneakpeek(videoId: $videoId) {
    ... on DismissWorkflowSneakpeekProperty {
      dismissWorkflowSneakpeek
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on VideoNotFoundError {
      message
    }
  }
}
    `;

/**
 * __useGetDismissWorkflowSneakpeekStatusQuery__
 *
 * To run a query within a React component, call `useGetDismissWorkflowSneakpeekStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDismissWorkflowSneakpeekStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDismissWorkflowSneakpeekStatusQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetDismissWorkflowSneakpeekStatusQuery(baseOptions: Apollo.QueryHookOptions<GetDismissWorkflowSneakpeekStatusQuery, GetDismissWorkflowSneakpeekStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDismissWorkflowSneakpeekStatusQuery, GetDismissWorkflowSneakpeekStatusQueryVariables>(GetDismissWorkflowSneakpeekStatusDocument, options);
      }
export function useGetDismissWorkflowSneakpeekStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDismissWorkflowSneakpeekStatusQuery, GetDismissWorkflowSneakpeekStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDismissWorkflowSneakpeekStatusQuery, GetDismissWorkflowSneakpeekStatusQueryVariables>(GetDismissWorkflowSneakpeekStatusDocument, options);
        }
export type GetDismissWorkflowSneakpeekStatusQueryHookResult = ReturnType<typeof useGetDismissWorkflowSneakpeekStatusQuery>;
export type GetDismissWorkflowSneakpeekStatusLazyQueryHookResult = ReturnType<typeof useGetDismissWorkflowSneakpeekStatusLazyQuery>;
export type GetDismissWorkflowSneakpeekStatusQueryResult = Apollo.QueryResult<GetDismissWorkflowSneakpeekStatusQuery, GetDismissWorkflowSneakpeekStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;