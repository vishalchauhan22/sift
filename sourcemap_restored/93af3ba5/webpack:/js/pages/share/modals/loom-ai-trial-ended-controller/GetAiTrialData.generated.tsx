import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAiTrialDataQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetAiTrialDataQuery = { __typename: 'Query', billing: { __typename: 'BillingEntity', billing_details: { __typename: 'BillingDetails', plan: { __typename: 'Plan', pure_trial: boolean | null } | null, add_ons: Array<{ __typename: 'SubscriptionItem', id: string, price: { __typename: 'Price', id: string, nickname: string | null, product: string, unit_amount: number, recurring: { __typename: 'Recurring', interval: string, interval_count: number } } }> } | null } | null };


export const GetAiTrialDataDocument = gql`
    query GetAiTrialData($workspaceId: ID!) {
  billing: getWorkspaceBillingDetails(workspaceId: $workspaceId) {
    billing_details {
      plan {
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
    }
  }
}
    `;

/**
 * __useGetAiTrialDataQuery__
 *
 * To run a query within a React component, call `useGetAiTrialDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAiTrialDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAiTrialDataQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetAiTrialDataQuery(baseOptions: Apollo.QueryHookOptions<GetAiTrialDataQuery, GetAiTrialDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAiTrialDataQuery, GetAiTrialDataQueryVariables>(GetAiTrialDataDocument, options);
      }
export function useGetAiTrialDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAiTrialDataQuery, GetAiTrialDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAiTrialDataQuery, GetAiTrialDataQueryVariables>(GetAiTrialDataDocument, options);
        }
export type GetAiTrialDataQueryHookResult = ReturnType<typeof useGetAiTrialDataQuery>;
export type GetAiTrialDataLazyQueryHookResult = ReturnType<typeof useGetAiTrialDataLazyQuery>;
export type GetAiTrialDataQueryResult = Apollo.QueryResult<GetAiTrialDataQuery, GetAiTrialDataQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;