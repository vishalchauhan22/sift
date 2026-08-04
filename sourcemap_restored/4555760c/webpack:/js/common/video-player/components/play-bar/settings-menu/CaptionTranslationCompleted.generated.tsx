import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CaptionTranslationCompletedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  captionsLanguageSelection: Types.Scalars['String']['input'];
  version?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CaptionTranslationCompletedSubscription = { __typename: 'Subscription', captionTranslationCompleted: { __typename: 'CaptionTranslationCompletedPayload', videoId: string, language: string, success: boolean, translatedCaptionsUrl: string | null, errorMessage: string | null } | null };


export const CaptionTranslationCompletedDocument = gql`
    subscription CaptionTranslationCompleted($videoId: ID!, $captionsLanguageSelection: String!, $version: String) {
  captionTranslationCompleted(
    videoId: $videoId
    captionsLanguageSelection: $captionsLanguageSelection
    version: $version
  ) {
    videoId
    language
    success
    translatedCaptionsUrl
    errorMessage
  }
}
    `;

/**
 * __useCaptionTranslationCompletedSubscription__
 *
 * To run a query within a React component, call `useCaptionTranslationCompletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCaptionTranslationCompletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCaptionTranslationCompletedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      captionsLanguageSelection: // value for 'captionsLanguageSelection'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useCaptionTranslationCompletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CaptionTranslationCompletedSubscription, CaptionTranslationCompletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CaptionTranslationCompletedSubscription, CaptionTranslationCompletedSubscriptionVariables>(CaptionTranslationCompletedDocument, options);
      }
export type CaptionTranslationCompletedSubscriptionHookResult = ReturnType<typeof useCaptionTranslationCompletedSubscription>;
export type CaptionTranslationCompletedSubscriptionResult = Apollo.SubscriptionResult<CaptionTranslationCompletedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;