import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditPhraseFragmentFragment = { __typename: 'TimestampedPhrase', start: number, clipId: string | null, tokens: Array<{ __typename: 'TimestampedToken', value: string, start: number | null, end: number | null, type: Types.WordType }> };

export type ConsolidatedEditFetchTimestampedWordsQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditFetchTimestampedWordsQuery = { __typename: 'Query', fetchTimestampedWords: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'TimestampedWordsPayload', transcript: { __typename: 'WordlevelTimestampTranscript', phrases: Array<{ __typename: 'TimestampedPhrase', start: number, clipId: string | null, tokens: Array<{ __typename: 'TimestampedToken', value: string, start: number | null, end: number | null, type: Types.WordType }> }> } } | { __typename: 'UserNotAuthorizedError', message: string } | null };

export const ConsolidatedEditPhraseFragmentFragmentDoc = gql`
    fragment ConsolidatedEditPhraseFragment on TimestampedPhrase {
  start
  clipId
  tokens {
    value
    start
    end
    type
  }
}
    `;
export const ConsolidatedEditFetchTimestampedWordsDocument = gql`
    query ConsolidatedEditFetchTimestampedWords($videoId: ID!, $password: String) {
  fetchTimestampedWords(videoId: $videoId, password: $password) {
    __typename
    ... on TimestampedWordsPayload {
      transcript {
        phrases {
          ...ConsolidatedEditPhraseFragment
        }
      }
    }
    ... on Warning {
      message
    }
    ... on Error {
      message
    }
  }
}
    ${ConsolidatedEditPhraseFragmentFragmentDoc}`;

/**
 * __useConsolidatedEditFetchTimestampedWordsQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditFetchTimestampedWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditFetchTimestampedWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditFetchTimestampedWordsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditFetchTimestampedWordsQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditFetchTimestampedWordsQuery, ConsolidatedEditFetchTimestampedWordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditFetchTimestampedWordsQuery, ConsolidatedEditFetchTimestampedWordsQueryVariables>(ConsolidatedEditFetchTimestampedWordsDocument, options);
      }
export function useConsolidatedEditFetchTimestampedWordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditFetchTimestampedWordsQuery, ConsolidatedEditFetchTimestampedWordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditFetchTimestampedWordsQuery, ConsolidatedEditFetchTimestampedWordsQueryVariables>(ConsolidatedEditFetchTimestampedWordsDocument, options);
        }
export type ConsolidatedEditFetchTimestampedWordsQueryHookResult = ReturnType<typeof useConsolidatedEditFetchTimestampedWordsQuery>;
export type ConsolidatedEditFetchTimestampedWordsLazyQueryHookResult = ReturnType<typeof useConsolidatedEditFetchTimestampedWordsLazyQuery>;
export type ConsolidatedEditFetchTimestampedWordsQueryResult = Apollo.QueryResult<ConsolidatedEditFetchTimestampedWordsQuery, ConsolidatedEditFetchTimestampedWordsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;