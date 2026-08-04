import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAggPlanUrlAndProductQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
  offeringKey?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type GetAggPlanUrlAndProductQuery = { __typename: 'Query', planUrl: { __typename: 'AggTokenRefreshError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'GetAGGChangePlanUrlPayload', url: string, isAvailableToUser: boolean, isCollection: boolean, isCurrentUserBillingAdmin: boolean } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null, entitlements: { __typename: 'AggTokenRefreshError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'GetWorkspaceAGGEntitlementsPayload', entitlements: Array<{ __typename: 'Entitlement', currentLoomProductLevel: number } | null> } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetAggPlanUrlAndProductDocument = gql`
    query GetAGGPlanUrlAndProduct($workspaceId: ID!, $offeringKey: ID) {
  planUrl: getAGGChangePlanUrl(
    workspaceId: $workspaceId
    offeringKey: $offeringKey
  ) {
    __typename
    ... on GetAGGChangePlanUrlPayload {
      url
      isAvailableToUser
      isCollection
      isCurrentUserBillingAdmin
    }
    ... on GenericError {
      message
    }
    ... on AggTokenRefreshError {
      message
    }
  }
  entitlements: getWorkspaceAGGEntitlements(workspaceId: $workspaceId) {
    __typename
    ... on GetWorkspaceAGGEntitlementsPayload {
      entitlements {
        currentLoomProductLevel
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
 * __useGetAggPlanUrlAndProductQuery__
 *
 * To run a query within a React component, call `useGetAggPlanUrlAndProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAggPlanUrlAndProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAggPlanUrlAndProductQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      offeringKey: // value for 'offeringKey'
 *   },
 * });
 */
export function useGetAggPlanUrlAndProductQuery(baseOptions: Apollo.QueryHookOptions<GetAggPlanUrlAndProductQuery, GetAggPlanUrlAndProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAggPlanUrlAndProductQuery, GetAggPlanUrlAndProductQueryVariables>(GetAggPlanUrlAndProductDocument, options);
      }
export function useGetAggPlanUrlAndProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAggPlanUrlAndProductQuery, GetAggPlanUrlAndProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAggPlanUrlAndProductQuery, GetAggPlanUrlAndProductQueryVariables>(GetAggPlanUrlAndProductDocument, options);
        }
export type GetAggPlanUrlAndProductQueryHookResult = ReturnType<typeof useGetAggPlanUrlAndProductQuery>;
export type GetAggPlanUrlAndProductLazyQueryHookResult = ReturnType<typeof useGetAggPlanUrlAndProductLazyQuery>;
export type GetAggPlanUrlAndProductQueryResult = Apollo.QueryResult<GetAggPlanUrlAndProductQuery, GetAggPlanUrlAndProductQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;