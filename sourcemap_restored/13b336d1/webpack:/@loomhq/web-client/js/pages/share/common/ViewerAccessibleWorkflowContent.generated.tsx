import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewerAccessibleWorkflowContentQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ViewerAccessibleWorkflowContentQuery = { __typename: 'Query', viewerAccessibleWorkflowContent: { __typename: 'GenericError', error: string | null, message: string } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'ViewerAccessibleWorkflowContentPayload', viewerAccessibleDocument: { __typename: 'ViewerAccessibleDocument', documentType: string | null, markdownContent: string | null } | null, viewerAccessibleIssue: { __typename: 'ViewerAccessibleIssue', body: string | null, generationSource: Types.GenerationSource | null, title: string | null, visibleToViewers: boolean | null } | null } | null };


export const ViewerAccessibleWorkflowContentDocument = gql`
    query ViewerAccessibleWorkflowContent($videoId: ID!) {
  viewerAccessibleWorkflowContent(videoId: $videoId) {
    ... on ViewerAccessibleWorkflowContentPayload {
      viewerAccessibleDocument {
        documentType
        markdownContent
      }
      viewerAccessibleIssue {
        body
        generationSource
        title
        visibleToViewers
      }
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on GenericError {
      error
      message
    }
  }
}
    `;

/**
 * __useViewerAccessibleWorkflowContentQuery__
 *
 * To run a query within a React component, call `useViewerAccessibleWorkflowContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerAccessibleWorkflowContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerAccessibleWorkflowContentQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useViewerAccessibleWorkflowContentQuery(baseOptions: Apollo.QueryHookOptions<ViewerAccessibleWorkflowContentQuery, ViewerAccessibleWorkflowContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerAccessibleWorkflowContentQuery, ViewerAccessibleWorkflowContentQueryVariables>(ViewerAccessibleWorkflowContentDocument, options);
      }
export function useViewerAccessibleWorkflowContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerAccessibleWorkflowContentQuery, ViewerAccessibleWorkflowContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerAccessibleWorkflowContentQuery, ViewerAccessibleWorkflowContentQueryVariables>(ViewerAccessibleWorkflowContentDocument, options);
        }
export type ViewerAccessibleWorkflowContentQueryHookResult = ReturnType<typeof useViewerAccessibleWorkflowContentQuery>;
export type ViewerAccessibleWorkflowContentLazyQueryHookResult = ReturnType<typeof useViewerAccessibleWorkflowContentLazyQuery>;
export type ViewerAccessibleWorkflowContentQueryResult = Apollo.QueryResult<ViewerAccessibleWorkflowContentQuery, ViewerAccessibleWorkflowContentQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;