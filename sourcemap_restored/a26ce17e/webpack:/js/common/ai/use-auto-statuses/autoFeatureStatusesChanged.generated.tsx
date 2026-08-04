import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { AutoFeatureStatusesFragmentDoc } from './AutoFeatureStatuses.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AutoFeatureStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type AutoFeatureStatusChangedSubscription = { __typename: 'Subscription', autoFeatureStatusChanged: { __typename: 'AutoFeatureStatusChangedResponse', autoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoTitle: string | null, autoDescription: string | null, autoTitleStatus: Types.IntelligenceStatusType | null, autoDescriptionStatus: Types.IntelligenceStatusType | null, autoChaptersStatus: Types.AutoChapterStatusesType | null, autoTasksStatus: Types.IntelligenceStatusType | null, autoTasksCount: number | null, hasSilenceRemovalEnabled: boolean, hasFillerWordRemovalEnabled: boolean, hasFillerWordPlusRemovalEnabled: boolean, numberOfFillerWordsTrimmed: number | null, numberOfFillerWordsPlusTrimmed: number | null, secondsOfSilenceTrimmed: number | null } | null } | null };


export const AutoFeatureStatusChangedDocument = gql`
    subscription AutoFeatureStatusChanged($videoId: ID!) {
  autoFeatureStatusChanged(videoId: $videoId) {
    autoFeatureStatuses {
      ...AutoFeatureStatuses
    }
  }
}
    ${AutoFeatureStatusesFragmentDoc}`;

/**
 * __useAutoFeatureStatusChangedSubscription__
 *
 * To run a query within a React component, call `useAutoFeatureStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAutoFeatureStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoFeatureStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useAutoFeatureStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<AutoFeatureStatusChangedSubscription, AutoFeatureStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AutoFeatureStatusChangedSubscription, AutoFeatureStatusChangedSubscriptionVariables>(AutoFeatureStatusChangedDocument, options);
      }
export type AutoFeatureStatusChangedSubscriptionHookResult = ReturnType<typeof useAutoFeatureStatusChangedSubscription>;
export type AutoFeatureStatusChangedSubscriptionResult = Apollo.SubscriptionResult<AutoFeatureStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;