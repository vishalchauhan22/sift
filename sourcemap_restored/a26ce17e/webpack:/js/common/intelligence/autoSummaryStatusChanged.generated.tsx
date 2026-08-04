import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AutoSummaryStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type AutoSummaryStatusChangedSubscription = { __typename: 'Subscription', autoFeatureStatusChanged: { __typename: 'AutoFeatureStatusChangedResponse', autoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoDescription: string | null, autoDescriptionStatus: Types.IntelligenceStatusType | null } | null } | null };


export const AutoSummaryStatusChangedDocument = gql`
    subscription AutoSummaryStatusChanged($videoId: ID!) {
  autoFeatureStatusChanged(videoId: $videoId) {
    autoFeatureStatuses {
      id
      autoDescription
      autoDescriptionStatus
    }
  }
}
    `;

/**
 * __useAutoSummaryStatusChangedSubscription__
 *
 * To run a query within a React component, call `useAutoSummaryStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAutoSummaryStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoSummaryStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useAutoSummaryStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<AutoSummaryStatusChangedSubscription, AutoSummaryStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AutoSummaryStatusChangedSubscription, AutoSummaryStatusChangedSubscriptionVariables>(AutoSummaryStatusChangedDocument, options);
      }
export type AutoSummaryStatusChangedSubscriptionHookResult = ReturnType<typeof useAutoSummaryStatusChangedSubscription>;
export type AutoSummaryStatusChangedSubscriptionResult = Apollo.SubscriptionResult<AutoSummaryStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;