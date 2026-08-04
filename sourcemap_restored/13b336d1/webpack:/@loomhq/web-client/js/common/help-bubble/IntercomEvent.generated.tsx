import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IntercomEventSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type IntercomEventSubscription = { __typename: 'Subscription', intercomEvent: { __typename: 'IntercomEventResponse', conversationId: number | null, message: string | null, createdAt: string | null, updatedAt: string | null } | null };


export const IntercomEventDocument = gql`
    subscription IntercomEvent($userId: ID!) {
  intercomEvent(userId: $userId) {
    conversationId
    message
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useIntercomEventSubscription__
 *
 * To run a query within a React component, call `useIntercomEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIntercomEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntercomEventSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIntercomEventSubscription(baseOptions: Apollo.SubscriptionHookOptions<IntercomEventSubscription, IntercomEventSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IntercomEventSubscription, IntercomEventSubscriptionVariables>(IntercomEventDocument, options);
      }
export type IntercomEventSubscriptionHookResult = ReturnType<typeof useIntercomEventSubscription>;
export type IntercomEventSubscriptionResult = Apollo.SubscriptionResult<IntercomEventSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;