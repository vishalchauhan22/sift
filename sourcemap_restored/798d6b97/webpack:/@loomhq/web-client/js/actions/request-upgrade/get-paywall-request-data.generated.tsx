import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaywallRequestDataQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetPaywallRequestDataQuery = { __typename: 'Query', billing: { __typename: 'BillingEntity', billing_details: { __typename: 'BillingDetails', customer: { __typename: 'Customer', currency: string | null } | null, plan: { __typename: 'Plan', id: string | null, pure_trial: boolean | null } | null, add_ons: Array<{ __typename: 'SubscriptionItem', id: string, price: { __typename: 'Price', id: string, nickname: string | null, product: string, unit_amount: number, recurring: { __typename: 'Recurring', interval: string, interval_count: number } } }>, paused: { __typename: 'SubscriptionSchedule', id: string, status: Types.SubscriptionScheduleStatus, phases: Array<{ __typename: 'SubscriptionSchedulePhase', start_date: number, end_date: number, items: Array<{ __typename: 'SchedulePhaseItem', quantity: number, price: string }> }> } | null } | null } | null, request_status: { __typename: 'GenericError' } | { __typename: 'GetUpgradeWorkspaceRequestStatusPayload', status: Types.RequestToUpgradeWorkspaceStatusType | null } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetPaywallRequestDataDocument = gql`
    query GetPaywallRequestData($workspaceId: ID!) {
  billing: getWorkspaceBillingDetails(workspaceId: $workspaceId) {
    billing_details {
      customer {
        currency
      }
      plan {
        id
        pure_trial
      }
      add_ons {
        id
        price {
          id
          nickname
          product
          unit_amount
          recurring {
            interval
            interval_count
          }
        }
      }
      paused {
        id
        status
        phases {
          start_date
          end_date
          items {
            quantity
            price
          }
        }
      }
    }
  }
  request_status: getUpgradeWorkspaceRequestStatus {
    ... on GetUpgradeWorkspaceRequestStatusPayload {
      status
    }
  }
}
    `;

/**
 * __useGetPaywallRequestDataQuery__
 *
 * To run a query within a React component, call `useGetPaywallRequestDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaywallRequestDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaywallRequestDataQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetPaywallRequestDataQuery(baseOptions: Apollo.QueryHookOptions<GetPaywallRequestDataQuery, GetPaywallRequestDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaywallRequestDataQuery, GetPaywallRequestDataQueryVariables>(GetPaywallRequestDataDocument, options);
      }
export function useGetPaywallRequestDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaywallRequestDataQuery, GetPaywallRequestDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaywallRequestDataQuery, GetPaywallRequestDataQueryVariables>(GetPaywallRequestDataDocument, options);
        }
export type GetPaywallRequestDataQueryHookResult = ReturnType<typeof useGetPaywallRequestDataQuery>;
export type GetPaywallRequestDataLazyQueryHookResult = ReturnType<typeof useGetPaywallRequestDataLazyQuery>;
export type GetPaywallRequestDataQueryResult = Apollo.QueryResult<GetPaywallRequestDataQuery, GetPaywallRequestDataQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;