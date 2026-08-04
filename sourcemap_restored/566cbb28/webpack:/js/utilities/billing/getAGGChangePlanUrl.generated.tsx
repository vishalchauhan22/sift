import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAggChangePlanUrlQueryVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
  offeringKey?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type GetAggChangePlanUrlQuery = { __typename: 'Query', getAGGChangePlanUrl: { __typename: 'AggTokenRefreshError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'GetAGGChangePlanUrlPayload', url: string, isAvailableToUser: boolean, isCollection: boolean } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetAggChangePlanUrlDocument = gql`
    query GetAGGChangePlanUrl($workspaceId: ID!, $offeringKey: ID) {
  getAGGChangePlanUrl(workspaceId: $workspaceId, offeringKey: $offeringKey) {
    __typename
    ... on GetAGGChangePlanUrlPayload {
      url
      isAvailableToUser
      isCollection
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
 * __useGetAggChangePlanUrlQuery__
 *
 * To run a query within a React component, call `useGetAggChangePlanUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAggChangePlanUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAggChangePlanUrlQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      offeringKey: // value for 'offeringKey'
 *   },
 * });
 */
export function useGetAggChangePlanUrlQuery(baseOptions: Apollo.QueryHookOptions<GetAggChangePlanUrlQuery, GetAggChangePlanUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAggChangePlanUrlQuery, GetAggChangePlanUrlQueryVariables>(GetAggChangePlanUrlDocument, options);
      }
export function useGetAggChangePlanUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAggChangePlanUrlQuery, GetAggChangePlanUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAggChangePlanUrlQuery, GetAggChangePlanUrlQueryVariables>(GetAggChangePlanUrlDocument, options);
        }
export type GetAggChangePlanUrlQueryHookResult = ReturnType<typeof useGetAggChangePlanUrlQuery>;
export type GetAggChangePlanUrlLazyQueryHookResult = ReturnType<typeof useGetAggChangePlanUrlLazyQuery>;
export type GetAggChangePlanUrlQueryResult = Apollo.QueryResult<GetAggChangePlanUrlQuery, GetAggChangePlanUrlQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;