import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditVideoTextReplacementsFragmentDoc } from './ConsolidatedEditGetVideoTextReplacements.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditVideoTextReplacementsUpdatedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ConsolidatedEditVideoTextReplacementsUpdatedSubscription = { __typename: 'Subscription', videoTextReplacementsUpdated: { __typename: 'RegularUserVideo', id: string, textReplacements: Array<{ __typename: 'VideoTextReplacement', id: string, clipId: string, selectionLowerMs: number, selectionUpperMs: number, selectionReplacementText: string, audioGenerationStatus: Types.AudioGenerationStatus }> } | null };


export const ConsolidatedEditVideoTextReplacementsUpdatedDocument = gql`
    subscription ConsolidatedEditVideoTextReplacementsUpdated($videoId: ID!) {
  videoTextReplacementsUpdated(videoId: $videoId) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoTextReplacements
    }
  }
}
    ${ConsolidatedEditVideoTextReplacementsFragmentDoc}`;

/**
 * __useConsolidatedEditVideoTextReplacementsUpdatedSubscription__
 *
 * To run a query within a React component, call `useConsolidatedEditVideoTextReplacementsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditVideoTextReplacementsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditVideoTextReplacementsUpdatedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useConsolidatedEditVideoTextReplacementsUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ConsolidatedEditVideoTextReplacementsUpdatedSubscription, ConsolidatedEditVideoTextReplacementsUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConsolidatedEditVideoTextReplacementsUpdatedSubscription, ConsolidatedEditVideoTextReplacementsUpdatedSubscriptionVariables>(ConsolidatedEditVideoTextReplacementsUpdatedDocument, options);
      }
export type ConsolidatedEditVideoTextReplacementsUpdatedSubscriptionHookResult = ReturnType<typeof useConsolidatedEditVideoTextReplacementsUpdatedSubscription>;
export type ConsolidatedEditVideoTextReplacementsUpdatedSubscriptionResult = Apollo.SubscriptionResult<ConsolidatedEditVideoTextReplacementsUpdatedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;