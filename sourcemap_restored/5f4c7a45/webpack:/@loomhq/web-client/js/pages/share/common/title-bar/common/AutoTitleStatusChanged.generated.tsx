import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AutoTitleStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type AutoTitleStatusChangedSubscription = { __typename: 'Subscription', autoFeatureStatusChanged: { __typename: 'AutoFeatureStatusChangedResponse', autoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoTitle: string | null, autoTitleStatus: Types.IntelligenceStatusType | null } | null } | null };


export const AutoTitleStatusChangedDocument = gql`
    subscription AutoTitleStatusChanged($videoId: ID!) {
  autoFeatureStatusChanged(videoId: $videoId) {
    autoFeatureStatuses {
      id
      autoTitle
      autoTitleStatus
    }
  }
}
    `;

/**
 * __useAutoTitleStatusChangedSubscription__
 *
 * To run a query within a React component, call `useAutoTitleStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAutoTitleStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoTitleStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useAutoTitleStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<AutoTitleStatusChangedSubscription, AutoTitleStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AutoTitleStatusChangedSubscription, AutoTitleStatusChangedSubscriptionVariables>(AutoTitleStatusChangedDocument, options);
      }
export type AutoTitleStatusChangedSubscriptionHookResult = ReturnType<typeof useAutoTitleStatusChangedSubscription>;
export type AutoTitleStatusChangedSubscriptionResult = Apollo.SubscriptionResult<AutoTitleStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;