import * as Types from '../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GeneratedIssueQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  regenerate?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type GeneratedIssueQuery = { __typename: 'Query', generatedIssue: { __typename: 'GeneratedIssuePayload', title: string | null, body: string | null, generationSource: Types.GenerationSource | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning' } | { __typename: 'RateLimitReachedError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GeneratedIssueDocument = gql`
    query GeneratedIssue($videoId: ID!, $regenerate: Boolean) {
  generatedIssue(videoId: $videoId, regenerate: $regenerate) {
    __typename
    ... on GeneratedIssuePayload {
      __typename
      title
      body
      generationSource
    }
    ... on Error {
      message
      __typename
    }
  }
}
    `;

/**
 * __useGeneratedIssueQuery__
 *
 * To run a query within a React component, call `useGeneratedIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneratedIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneratedIssueQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      regenerate: // value for 'regenerate'
 *   },
 * });
 */
export function useGeneratedIssueQuery(baseOptions: Apollo.QueryHookOptions<GeneratedIssueQuery, GeneratedIssueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneratedIssueQuery, GeneratedIssueQueryVariables>(GeneratedIssueDocument, options);
      }
export function useGeneratedIssueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneratedIssueQuery, GeneratedIssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneratedIssueQuery, GeneratedIssueQueryVariables>(GeneratedIssueDocument, options);
        }
export type GeneratedIssueQueryHookResult = ReturnType<typeof useGeneratedIssueQuery>;
export type GeneratedIssueLazyQueryHookResult = ReturnType<typeof useGeneratedIssueLazyQuery>;
export type GeneratedIssueQueryResult = Apollo.QueryResult<GeneratedIssueQuery, GeneratedIssueQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;