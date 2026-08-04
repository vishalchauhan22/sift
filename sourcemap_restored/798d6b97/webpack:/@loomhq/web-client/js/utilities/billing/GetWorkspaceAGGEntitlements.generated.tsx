import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetWorkspaceAggEntitlementsQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type GetWorkspaceAggEntitlementsQuery = { __typename: 'Query', getWorkspaceAGGEntitlements: { __typename: 'AggTokenRefreshError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'GetWorkspaceAGGEntitlementsPayload', entitlements: Array<{ __typename: 'Entitlement', orgId: string, entitlementId: string, offeringId: string, sku: string, productKey: string, pricingType: string, offeringName: string, currentLoomProductLevel: number, trialing: boolean, autoConverting: boolean, timeLeft: number, isCollection: boolean, isTrialingChangeOfferingAvailableToUser: boolean, trialingChangeOfferingUrl: string, invoiceable: boolean } | null> } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetWorkspaceAggEntitlementsDocument = gql`
    query GetWorkspaceAGGEntitlements($workspaceId: ID!) {
  getWorkspaceAGGEntitlements(workspaceId: $workspaceId) {
    __typename
    ... on GetWorkspaceAGGEntitlementsPayload {
      entitlements {
        orgId
        entitlementId
        offeringId
        sku
        productKey
        pricingType
        offeringName
        currentLoomProductLevel
        trialing
        autoConverting
        timeLeft
        isCollection
        isTrialingChangeOfferingAvailableToUser
        trialingChangeOfferingUrl
        invoiceable
      }
    }
    ... on GenericError {
      message
    }
    ... on AggTokenRefreshError {
      message
    }
  }
}
    `;

/**
 * __useGetWorkspaceAggEntitlementsQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceAggEntitlementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceAggEntitlementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceAggEntitlementsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useGetWorkspaceAggEntitlementsQuery(baseOptions: Apollo.QueryHookOptions<GetWorkspaceAggEntitlementsQuery, GetWorkspaceAggEntitlementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceAggEntitlementsQuery, GetWorkspaceAggEntitlementsQueryVariables>(GetWorkspaceAggEntitlementsDocument, options);
      }
export function useGetWorkspaceAggEntitlementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceAggEntitlementsQuery, GetWorkspaceAggEntitlementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceAggEntitlementsQuery, GetWorkspaceAggEntitlementsQueryVariables>(GetWorkspaceAggEntitlementsDocument, options);
        }
export type GetWorkspaceAggEntitlementsQueryHookResult = ReturnType<typeof useGetWorkspaceAggEntitlementsQuery>;
export type GetWorkspaceAggEntitlementsLazyQueryHookResult = ReturnType<typeof useGetWorkspaceAggEntitlementsLazyQuery>;
export type GetWorkspaceAggEntitlementsQueryResult = Apollo.QueryResult<GetWorkspaceAggEntitlementsQuery, GetWorkspaceAggEntitlementsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;