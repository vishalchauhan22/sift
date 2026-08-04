import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLatestVideoSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLatestVideoSubscription = { __typename: 'Subscription', getLatestVideoSubscription: { __typename: 'RegularUserVideo', id: string } | null };


export const GetLatestVideoDocument = gql`
    subscription GetLatestVideo {
  getLatestVideoSubscription {
    id
  }
}
    `;

/**
 * __useGetLatestVideoSubscription__
 *
 * To run a query within a React component, call `useGetLatestVideoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestVideoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestVideoSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestVideoSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetLatestVideoSubscription, GetLatestVideoSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetLatestVideoSubscription, GetLatestVideoSubscriptionVariables>(GetLatestVideoDocument, options);
      }
export type GetLatestVideoSubscriptionHookResult = ReturnType<typeof useGetLatestVideoSubscription>;
export type GetLatestVideoSubscriptionResult = Apollo.SubscriptionResult<GetLatestVideoSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;