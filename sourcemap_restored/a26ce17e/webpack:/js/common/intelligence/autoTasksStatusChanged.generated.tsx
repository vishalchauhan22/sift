import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AutoTasksStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type AutoTasksStatusChangedSubscription = { __typename: 'Subscription', autoFeatureStatusChanged: { __typename: 'AutoFeatureStatusChangedResponse', autoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoTasksStatus: Types.IntelligenceStatusType | null } | null } | null };


export const AutoTasksStatusChangedDocument = gql`
    subscription AutoTasksStatusChanged($videoId: ID!) {
  autoFeatureStatusChanged(videoId: $videoId) {
    autoFeatureStatuses {
      id
      autoTasksStatus
    }
  }
}
    `;

/**
 * __useAutoTasksStatusChangedSubscription__
 *
 * To run a query within a React component, call `useAutoTasksStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAutoTasksStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoTasksStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useAutoTasksStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<AutoTasksStatusChangedSubscription, AutoTasksStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AutoTasksStatusChangedSubscription, AutoTasksStatusChangedSubscriptionVariables>(AutoTasksStatusChangedDocument, options);
      }
export type AutoTasksStatusChangedSubscriptionHookResult = ReturnType<typeof useAutoTasksStatusChangedSubscription>;
export type AutoTasksStatusChangedSubscriptionResult = Apollo.SubscriptionResult<AutoTasksStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;