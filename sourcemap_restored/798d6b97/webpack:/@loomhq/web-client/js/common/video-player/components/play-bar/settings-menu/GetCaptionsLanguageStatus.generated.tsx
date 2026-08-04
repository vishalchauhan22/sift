import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCaptionsLanguageStatusQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  captionsLanguageSelection?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetCaptionsLanguageStatusQuery = { __typename: 'Query', fetchVideoTranscript: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'VideoTranscriptDetails', language: Types.Language | null, captions_url: string | null, captionsTranslationInProgress: boolean | null, captions_source_url: string | null, captionsInOriginalLanguage: boolean | null, captionTranslationErrorFallback: boolean | null, captionsTranslatedLanguage: string | null } };


export const GetCaptionsLanguageStatusDocument = gql`
    query GetCaptionsLanguageStatus($videoId: ID!, $password: String, $captionsLanguageSelection: String) {
  fetchVideoTranscript(
    videoId: $videoId
    password: $password
    captionsLanguageSelection: $captionsLanguageSelection
  ) {
    ... on VideoTranscriptDetails {
      language
      captions_url
      captionsTranslationInProgress
      captions_source_url
      captionsInOriginalLanguage
      captionTranslationErrorFallback
      captionsTranslatedLanguage
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetCaptionsLanguageStatusQuery__
 *
 * To run a query within a React component, call `useGetCaptionsLanguageStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCaptionsLanguageStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCaptionsLanguageStatusQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *      captionsLanguageSelection: // value for 'captionsLanguageSelection'
 *   },
 * });
 */
export function useGetCaptionsLanguageStatusQuery(baseOptions: Apollo.QueryHookOptions<GetCaptionsLanguageStatusQuery, GetCaptionsLanguageStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCaptionsLanguageStatusQuery, GetCaptionsLanguageStatusQueryVariables>(GetCaptionsLanguageStatusDocument, options);
      }
export function useGetCaptionsLanguageStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCaptionsLanguageStatusQuery, GetCaptionsLanguageStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCaptionsLanguageStatusQuery, GetCaptionsLanguageStatusQueryVariables>(GetCaptionsLanguageStatusDocument, options);
        }
export type GetCaptionsLanguageStatusQueryHookResult = ReturnType<typeof useGetCaptionsLanguageStatusQuery>;
export type GetCaptionsLanguageStatusLazyQueryHookResult = ReturnType<typeof useGetCaptionsLanguageStatusLazyQuery>;
export type GetCaptionsLanguageStatusQueryResult = Apollo.QueryResult<GetCaptionsLanguageStatusQuery, GetCaptionsLanguageStatusQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;