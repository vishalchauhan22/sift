import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AutoChaptersStatusChangedSubscriptionVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type AutoChaptersStatusChangedSubscription = { __typename: 'Subscription', autoFeatureStatusChanged: { __typename: 'AutoFeatureStatusChangedResponse', autoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoChaptersStatus: Types.AutoChapterStatusesType | null } | null } | null };


export const AutoChaptersStatusChangedDocument = gql`
    subscription AutoChaptersStatusChanged($videoId: ID!) {
  autoFeatureStatusChanged(videoId: $videoId) {
    autoFeatureStatuses {
      id
      autoChaptersStatus
    }
  }
}
    `;

/**
 * __useAutoChaptersStatusChangedSubscription__
 *
 * To run a query within a React component, call `useAutoChaptersStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAutoChaptersStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoChaptersStatusChangedSubscription({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useAutoChaptersStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<AutoChaptersStatusChangedSubscription, AutoChaptersStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AutoChaptersStatusChangedSubscription, AutoChaptersStatusChangedSubscriptionVariables>(AutoChaptersStatusChangedDocument, options);
      }
export type AutoChaptersStatusChangedSubscriptionHookResult = ReturnType<typeof useAutoChaptersStatusChangedSubscription>;
export type AutoChaptersStatusChangedSubscriptionResult = Apollo.SubscriptionResult<AutoChaptersStatusChangedSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;