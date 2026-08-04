import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetWorkspaceBillingDetailsQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetWorkspaceBillingDetailsQuery = { __typename: 'Query', customer: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'LoomCustomer', id: string, external_id: string, workspace_idv2: string, currency: string, third_tier_assignment: Types.ThirdTierVariation | null, metadata: { __typename: 'CustomerMetadata', third_tier_assignment: Types.ThirdTierVariation | null }, external: { __typename: 'StripeCustomer', id: string, name: string | null, email: string | null, tax_id: string | null, address: { __typename: 'StripeAddress', city: string | null, country: string | null, line1: string | null, line2: string | null, postal_code: string | null, state: string | null } | null } } | { __typename: 'UserNotAuthorizedError' } | null, billing: { __typename: 'BillingEntity', id: string, billing_details: { __typename: 'BillingDetails', hasPaymentSource: boolean | null, customer: { __typename: 'Customer', name: string | null, email: string | null, workspace_id: string | null, external_id: string | null, tax_id: string | null, currency: string | null, address: { __typename: 'Address', line1: string | null, line2: string | null, city: string | null, country: string | null, state: string | null, postal_code: string | null } | null, test_clock: { __typename: 'TestClock', id: string, frozen_time: number | null } | null } | null, plan: { __typename: 'Plan', id: string | null, nickname: string | null, interval: string | null, interval_count: number | null, schedule: unknown | null, current_status: string | null, pure_trial: boolean | null, product: string | null, start_date: number | null, days_until_due: number | null, quantity: number | null, pricing: { __typename: 'Pricing', external_id: string | null, amount: number | null, quantity: number | null } | null } | null, billing_period: { __typename: 'BillingPeriod', account_balance: number | null, next_charge_date: number | null, period_start: number | null, period_end: number | null, cancel_at_period_end: boolean | null, cancel_at: number | null, trial_end: number | null, discount: { __typename: 'Discount', id: string | null, duration: string | null, durationInMonths: number | null, name: string | null, type: string | null, amount: number | null, currency: string | null } | null } | null, add_ons: Array<{ __typename: 'SubscriptionItem', id: string, price: { __typename: 'Price', id: string, nickname: string | null, product: string, unit_amount: number, recurring: { __typename: 'Recurring', interval: string, interval_count: number } } }>, paused: { __typename: 'SubscriptionSchedule', id: string, status: Types.SubscriptionScheduleStatus, phases: Array<{ __typename: 'SubscriptionSchedulePhase', start_date: number, end_date: number, items: Array<{ __typename: 'SchedulePhaseItem', quantity: number, price: string }> }> } | null } | null } | null };


export const GetWorkspaceBillingDetailsDocument = gql`
    query getWorkspaceBillingDetails($workspaceId: ID!) {
  customer: getCustomer(workspaceId: $workspaceId) {
    __typename
    ... on LoomCustomer {
      id
      external_id
      workspace_idv2
      currency
      third_tier_assignment
      metadata {
        third_tier_assignment
      }
      external {
        __typename
        id
        name
        email
        address {
          city
          country
          line1
          line2
          postal_code
          state
        }
        tax_id
      }
    }
  }
  billing: getWorkspaceBillingDetails(workspaceId: $workspaceId) {
    id
    billing_details {
      customer {
        name
        email
        address {
          line1
          line2
          city
          country
          state
          postal_code
        }
        workspace_id
        external_id
        tax_id
        currency
        test_clock {
          id
          frozen_time
        }
      }
      plan {
        id
        nickname
        pricing {
          external_id
          amount
          quantity
        }
        interval
        interval_count
        schedule
        current_status
        pure_trial
        product
        start_date
        days_until_due
        quantity
      }
      billing_period {
        account_balance
        next_charge_date
        period_start
        period_end
        cancel_at_period_end
        cancel_at
        discount {
          id
          duration
          durationInMonths
          name
          type
          amount
          currency
        }
        trial_end
      }
      hasPaymentSource
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
}
    `;

/**
 * __useGetWorkspaceBillingDetailsQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceBillingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceBillingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceBillingDetailsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetWorkspaceBillingDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetWorkspaceBillingDetailsQuery, GetWorkspaceBillingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceBillingDetailsQuery, GetWorkspaceBillingDetailsQueryVariables>(GetWorkspaceBillingDetailsDocument, options);
      }
export function useGetWorkspaceBillingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceBillingDetailsQuery, GetWorkspaceBillingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceBillingDetailsQuery, GetWorkspaceBillingDetailsQueryVariables>(GetWorkspaceBillingDetailsDocument, options);
        }
export type GetWorkspaceBillingDetailsQueryHookResult = ReturnType<typeof useGetWorkspaceBillingDetailsQuery>;
export type GetWorkspaceBillingDetailsLazyQueryHookResult = ReturnType<typeof useGetWorkspaceBillingDetailsLazyQuery>;
export type GetWorkspaceBillingDetailsQueryResult = Apollo.QueryResult<GetWorkspaceBillingDetailsQuery, GetWorkspaceBillingDetailsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;