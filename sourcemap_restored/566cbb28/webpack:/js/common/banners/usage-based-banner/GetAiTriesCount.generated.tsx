import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAiTriesCountSubscriptionVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetAiTriesCountSubscription = { __typename: 'Subscription', aiTriesCount: { __typename: 'AiTriesCountPayload', aiTries: number } | null };


export const GetAiTriesCountDocument = gql`
    subscription GetAiTriesCount($workspaceId: ID!) {
  aiTriesCount(workspaceId: $workspaceId) {
    aiTries
  }
}
    `;

/**
 * __useGetAiTriesCountSubscription__
 *
 * To run a query within a React component, call `useGetAiTriesCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAiTriesCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAiTriesCountSubscription({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetAiTriesCountSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetAiTriesCountSubscription, GetAiTriesCountSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAiTriesCountSubscription, GetAiTriesCountSubscriptionVariables>(GetAiTriesCountDocument, options);
      }
export type GetAiTriesCountSubscriptionHookResult = ReturnType<typeof useGetAiTriesCountSubscription>;
export type GetAiTriesCountSubscriptionResult = Apollo.SubscriptionResult<GetAiTriesCountSubscription>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;