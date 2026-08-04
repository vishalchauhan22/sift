import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAudioVariablesEligibilityForVariablesEntryPointQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetAudioVariablesEligibilityForVariablesEntryPointQuery = { __typename: 'Query', determineAudioPersonalizationEligibility: { __typename: 'DetermineAudioPersonalizationEligibilityPayload', isEligible: boolean | null, reason: string | null } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetAudioVariablesEligibilityForVariablesEntryPointDocument = gql`
    query GetAudioVariablesEligibilityForVariablesEntryPoint($videoId: ID!) {
  determineAudioPersonalizationEligibility(videoId: $videoId) {
    ... on DetermineAudioPersonalizationEligibilityPayload {
      isEligible
      reason
    }
    ... on GenericError {
      message
    }
    __typename
  }
}
    `;

/**
 * __useGetAudioVariablesEligibilityForVariablesEntryPointQuery__
 *
 * To run a query within a React component, call `useGetAudioVariablesEligibilityForVariablesEntryPointQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAudioVariablesEligibilityForVariablesEntryPointQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAudioVariablesEligibilityForVariablesEntryPointQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetAudioVariablesEligibilityForVariablesEntryPointQuery(baseOptions: Apollo.QueryHookOptions<GetAudioVariablesEligibilityForVariablesEntryPointQuery, GetAudioVariablesEligibilityForVariablesEntryPointQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAudioVariablesEligibilityForVariablesEntryPointQuery, GetAudioVariablesEligibilityForVariablesEntryPointQueryVariables>(GetAudioVariablesEligibilityForVariablesEntryPointDocument, options);
      }
export function useGetAudioVariablesEligibilityForVariablesEntryPointLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAudioVariablesEligibilityForVariablesEntryPointQuery, GetAudioVariablesEligibilityForVariablesEntryPointQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAudioVariablesEligibilityForVariablesEntryPointQuery, GetAudioVariablesEligibilityForVariablesEntryPointQueryVariables>(GetAudioVariablesEligibilityForVariablesEntryPointDocument, options);
        }
export type GetAudioVariablesEligibilityForVariablesEntryPointQueryHookResult = ReturnType<typeof useGetAudioVariablesEligibilityForVariablesEntryPointQuery>;
export type GetAudioVariablesEligibilityForVariablesEntryPointLazyQueryHookResult = ReturnType<typeof useGetAudioVariablesEligibilityForVariablesEntryPointLazyQuery>;
export type GetAudioVariablesEligibilityForVariablesEntryPointQueryResult = Apollo.QueryResult<GetAudioVariablesEligibilityForVariablesEntryPointQuery, GetAudioVariablesEligibilityForVariablesEntryPointQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;