import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GeneratedWorkflowContentQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  workflowTemplate: Types.WorkflowTemplateType;
  regenerate?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type GeneratedWorkflowContentQuery = { __typename: 'Query', generatedWorkflowContent: { __typename: 'GeneratedWorkflowContentPayload', markdownContent: string | null, generationSource: Types.GenerationSource | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning' } | { __typename: 'RateLimitReachedError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GeneratedWorkflowContentDocument = gql`
    query GeneratedWorkflowContent($videoId: ID!, $workflowTemplate: WorkflowTemplateType!, $regenerate: Boolean) {
  generatedWorkflowContent(
    videoId: $videoId
    contentTemplate: $workflowTemplate
    regenerate: $regenerate
  ) {
    __typename
    ... on GeneratedWorkflowContentPayload {
      __typename
      markdownContent
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
 * __useGeneratedWorkflowContentQuery__
 *
 * To run a query within a React component, call `useGeneratedWorkflowContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneratedWorkflowContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneratedWorkflowContentQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      workflowTemplate: // value for 'workflowTemplate'
 *      regenerate: // value for 'regenerate'
 *   },
 * });
 */
export function useGeneratedWorkflowContentQuery(baseOptions: Apollo.QueryHookOptions<GeneratedWorkflowContentQuery, GeneratedWorkflowContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneratedWorkflowContentQuery, GeneratedWorkflowContentQueryVariables>(GeneratedWorkflowContentDocument, options);
      }
export function useGeneratedWorkflowContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneratedWorkflowContentQuery, GeneratedWorkflowContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneratedWorkflowContentQuery, GeneratedWorkflowContentQueryVariables>(GeneratedWorkflowContentDocument, options);
        }
export type GeneratedWorkflowContentQueryHookResult = ReturnType<typeof useGeneratedWorkflowContentQuery>;
export type GeneratedWorkflowContentLazyQueryHookResult = ReturnType<typeof useGeneratedWorkflowContentLazyQuery>;
export type GeneratedWorkflowContentQueryResult = Apollo.QueryResult<GeneratedWorkflowContentQuery, GeneratedWorkflowContentQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;