import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEditTabWorkspaceBillingDetailsQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetEditTabWorkspaceBillingDetailsQuery = { __typename: 'Query', getWorkspaceBillingDetails: { __typename: 'BillingEntity', id: string, billing_details: { __typename: 'BillingDetails', plan: { __typename: 'Plan', id: string | null, pure_trial: boolean | null } | null } | null } | null };


export const GetEditTabWorkspaceBillingDetailsDocument = gql`
    query getEditTabWorkspaceBillingDetails($workspaceId: ID!) {
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
 * __useGetEditTabWorkspaceBillingDetailsQuery__
 *
 * To run a query within a React component, call `useGetEditTabWorkspaceBillingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditTabWorkspaceBillingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditTabWorkspaceBillingDetailsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetEditTabWorkspaceBillingDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetEditTabWorkspaceBillingDetailsQuery, GetEditTabWorkspaceBillingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEditTabWorkspaceBillingDetailsQuery, GetEditTabWorkspaceBillingDetailsQueryVariables>(GetEditTabWorkspaceBillingDetailsDocument, options);
      }
export function useGetEditTabWorkspaceBillingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEditTabWorkspaceBillingDetailsQuery, GetEditTabWorkspaceBillingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEditTabWorkspaceBillingDetailsQuery, GetEditTabWorkspaceBillingDetailsQueryVariables>(GetEditTabWorkspaceBillingDetailsDocument, options);
        }
export type GetEditTabWorkspaceBillingDetailsQueryHookResult = ReturnType<typeof useGetEditTabWorkspaceBillingDetailsQuery>;
export type GetEditTabWorkspaceBillingDetailsLazyQueryHookResult = ReturnType<typeof useGetEditTabWorkspaceBillingDetailsLazyQuery>;
export type GetEditTabWorkspaceBillingDetailsQueryResult = Apollo.QueryResult<GetEditTabWorkspaceBillingDetailsQuery, GetEditTabWorkspaceBillingDetailsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;