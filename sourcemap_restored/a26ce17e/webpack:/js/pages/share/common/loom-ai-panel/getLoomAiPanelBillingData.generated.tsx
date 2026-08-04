import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLoomAiPanelBillingDataQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetLoomAiPanelBillingDataQuery = { __typename: 'Query', getWorkspaceBillingDetails: { __typename: 'BillingEntity', id: string, billing_details: { __typename: 'BillingDetails', plan: { __typename: 'Plan', id: string | null, pure_trial: boolean | null } | null } | null } | null };


export const GetLoomAiPanelBillingDataDocument = gql`
    query getLoomAiPanelBillingData($workspaceId: ID!) {
  getWorkspaceBillingDetails(workspaceId: $workspaceId) {
    id
    billing_details {
      plan {
        id
        pure_trial
      }
    }
  }
}
    `;

/**
 * __useGetLoomAiPanelBillingDataQuery__
 *
 * To run a query within a React component, call `useGetLoomAiPanelBillingDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoomAiPanelBillingDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoomAiPanelBillingDataQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetLoomAiPanelBillingDataQuery(baseOptions: Apollo.QueryHookOptions<GetLoomAiPanelBillingDataQuery, GetLoomAiPanelBillingDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoomAiPanelBillingDataQuery, GetLoomAiPanelBillingDataQueryVariables>(GetLoomAiPanelBillingDataDocument, options);
      }
export function useGetLoomAiPanelBillingDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoomAiPanelBillingDataQuery, GetLoomAiPanelBillingDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoomAiPanelBillingDataQuery, GetLoomAiPanelBillingDataQueryVariables>(GetLoomAiPanelBillingDataDocument, options);
        }
export type GetLoomAiPanelBillingDataQueryHookResult = ReturnType<typeof useGetLoomAiPanelBillingDataQuery>;
export type GetLoomAiPanelBillingDataLazyQueryHookResult = ReturnType<typeof useGetLoomAiPanelBillingDataLazyQuery>;
export type GetLoomAiPanelBillingDataQueryResult = Apollo.QueryResult<GetLoomAiPanelBillingDataQuery, GetLoomAiPanelBillingDataQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;