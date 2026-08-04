import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditTextReplacementFragment = { __typename: 'VideoTextReplacement', id: string, clipId: string, selectionLowerMs: number, selectionUpperMs: number, selectionReplacementText: string, audioGenerationStatus: Types.AudioGenerationStatus };

export type ConsolidatedEditVideoTextReplacementsFragment = { __typename: 'RegularUserVideo', id: string, textReplacements: Array<{ __typename: 'VideoTextReplacement', id: string, clipId: string, selectionLowerMs: number, selectionUpperMs: number, selectionReplacementText: string, audioGenerationStatus: Types.AudioGenerationStatus }> };

export type ConsolidatedEditGetVideoTextReplacementsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetVideoTextReplacementsQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, textReplacements: Array<{ __typename: 'VideoTextReplacement', id: string, clipId: string, selectionLowerMs: number, selectionUpperMs: number, selectionReplacementText: string, audioGenerationStatus: Types.AudioGenerationStatus }> } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditTextReplacementFragmentDoc = gql`
    fragment ConsolidatedEditTextReplacement on VideoTextReplacement {
  id
  clipId
  selectionLowerMs
  selectionUpperMs
  selectionReplacementText
  audioGenerationStatus
}
    `;
export const ConsolidatedEditVideoTextReplacementsFragmentDoc = gql`
    fragment ConsolidatedEditVideoTextReplacements on RegularUserVideo {
  id
  textReplacements {
    id
    ...ConsolidatedEditTextReplacement
  }
}
    ${ConsolidatedEditTextReplacementFragmentDoc}`;
export const ConsolidatedEditGetVideoTextReplacementsDocument = gql`
    query ConsolidatedEditGetVideoTextReplacements($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoTextReplacements
    }
  }
}
    ${ConsolidatedEditVideoTextReplacementsFragmentDoc}`;

/**
 * __useConsolidatedEditGetVideoTextReplacementsQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetVideoTextReplacementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetVideoTextReplacementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetVideoTextReplacementsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetVideoTextReplacementsQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetVideoTextReplacementsQuery, ConsolidatedEditGetVideoTextReplacementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetVideoTextReplacementsQuery, ConsolidatedEditGetVideoTextReplacementsQueryVariables>(ConsolidatedEditGetVideoTextReplacementsDocument, options);
      }
export function useConsolidatedEditGetVideoTextReplacementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetVideoTextReplacementsQuery, ConsolidatedEditGetVideoTextReplacementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetVideoTextReplacementsQuery, ConsolidatedEditGetVideoTextReplacementsQueryVariables>(ConsolidatedEditGetVideoTextReplacementsDocument, options);
        }
export type ConsolidatedEditGetVideoTextReplacementsQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoTextReplacementsQuery>;
export type ConsolidatedEditGetVideoTextReplacementsLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoTextReplacementsLazyQuery>;
export type ConsolidatedEditGetVideoTextReplacementsQueryResult = Apollo.QueryResult<ConsolidatedEditGetVideoTextReplacementsQuery, ConsolidatedEditGetVideoTextReplacementsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;