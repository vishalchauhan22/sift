import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditGetAutoTrimStatusesQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetAutoTrimStatusesQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, hasFillerWordRemovalEnabled: boolean, hasFillerWordPlusRemovalEnabled: boolean, hasSilenceRemovalEnabled: boolean, numberOfFillerWordsTrimmed: number | null, numberOfFillerWordsPlusTrimmed: number | null, secondsOfSilenceTrimmed: number | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ConsolidatedEditGetAutoTrimStatusesDocument = gql`
    query ConsolidatedEditGetAutoTrimStatuses($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    ... on AutoFeatureStatuses {
      id
      hasFillerWordRemovalEnabled
      hasFillerWordPlusRemovalEnabled
      hasSilenceRemovalEnabled
      numberOfFillerWordsTrimmed
      numberOfFillerWordsPlusTrimmed
      secondsOfSilenceTrimmed
    }
    ... on Error {
      message
    }
  }
}
    `;

/**
 * __useConsolidatedEditGetAutoTrimStatusesQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetAutoTrimStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetAutoTrimStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetAutoTrimStatusesQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetAutoTrimStatusesQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetAutoTrimStatusesQuery, ConsolidatedEditGetAutoTrimStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetAutoTrimStatusesQuery, ConsolidatedEditGetAutoTrimStatusesQueryVariables>(ConsolidatedEditGetAutoTrimStatusesDocument, options);
      }
export function useConsolidatedEditGetAutoTrimStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetAutoTrimStatusesQuery, ConsolidatedEditGetAutoTrimStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetAutoTrimStatusesQuery, ConsolidatedEditGetAutoTrimStatusesQueryVariables>(ConsolidatedEditGetAutoTrimStatusesDocument, options);
        }
export type ConsolidatedEditGetAutoTrimStatusesQueryHookResult = ReturnType<typeof useConsolidatedEditGetAutoTrimStatusesQuery>;
export type ConsolidatedEditGetAutoTrimStatusesLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetAutoTrimStatusesLazyQuery>;
export type ConsolidatedEditGetAutoTrimStatusesQueryResult = Apollo.QueryResult<ConsolidatedEditGetAutoTrimStatusesQuery, ConsolidatedEditGetAutoTrimStatusesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;