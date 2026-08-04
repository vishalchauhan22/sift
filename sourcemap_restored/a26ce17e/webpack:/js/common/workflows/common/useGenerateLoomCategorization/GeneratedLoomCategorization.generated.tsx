import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GeneratedLoomCategorizationQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GeneratedLoomCategorizationQuery = { __typename: 'Query', generatedLoomCategorization: { __typename: 'GeneratedLoomCategorizationPayload', generatedCategory: { __typename: 'GeneratedCategory', assignedCategory: string, confidence: number } } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning' } | { __typename: 'RateLimitReachedError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GeneratedLoomCategorizationDocument = gql`
    query GeneratedLoomCategorization($videoId: ID!) {
  generatedLoomCategorization(videoId: $videoId) {
    __typename
    ... on GeneratedLoomCategorizationPayload {
      generatedCategory {
        assignedCategory
        confidence
      }
      __typename
    }
    ... on Error {
      message
      __typename
    }
  }
}
    `;

/**
 * __useGeneratedLoomCategorizationQuery__
 *
 * To run a query within a React component, call `useGeneratedLoomCategorizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneratedLoomCategorizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneratedLoomCategorizationQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGeneratedLoomCategorizationQuery(baseOptions: Apollo.QueryHookOptions<GeneratedLoomCategorizationQuery, GeneratedLoomCategorizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneratedLoomCategorizationQuery, GeneratedLoomCategorizationQueryVariables>(GeneratedLoomCategorizationDocument, options);
      }
export function useGeneratedLoomCategorizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneratedLoomCategorizationQuery, GeneratedLoomCategorizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneratedLoomCategorizationQuery, GeneratedLoomCategorizationQueryVariables>(GeneratedLoomCategorizationDocument, options);
        }
export type GeneratedLoomCategorizationQueryHookResult = ReturnType<typeof useGeneratedLoomCategorizationQuery>;
export type GeneratedLoomCategorizationLazyQueryHookResult = ReturnType<typeof useGeneratedLoomCategorizationLazyQuery>;
export type GeneratedLoomCategorizationQueryResult = Apollo.QueryResult<GeneratedLoomCategorizationQuery, GeneratedLoomCategorizationQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;