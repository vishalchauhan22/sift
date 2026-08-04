import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchVideoNudgesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  nudgeType?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchVideoNudgesQuery = { __typename: 'Query', fetchVideoNudges: { __typename: 'GenericError' } | { __typename: 'NudgesPayload', nudges: Array<{ __typename: 'VideoNudge', id: string, content: string, prompt_version: number, nudge_type: Types.NudgeType, createdAt: string, updatedAt: string }> | null } | null };


export const FetchVideoNudgesDocument = gql`
    query fetchVideoNudges($id: ID!, $nudgeType: String) {
  fetchVideoNudges(videoId: $id, nudgeType: $nudgeType) {
    ... on NudgesPayload {
      __typename
      nudges {
        id
        content
        prompt_version
        nudge_type
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useFetchVideoNudgesQuery__
 *
 * To run a query within a React component, call `useFetchVideoNudgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchVideoNudgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchVideoNudgesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      nudgeType: // value for 'nudgeType'
 *   },
 * });
 */
export function useFetchVideoNudgesQuery(baseOptions: Apollo.QueryHookOptions<FetchVideoNudgesQuery, FetchVideoNudgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchVideoNudgesQuery, FetchVideoNudgesQueryVariables>(FetchVideoNudgesDocument, options);
      }
export function useFetchVideoNudgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchVideoNudgesQuery, FetchVideoNudgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchVideoNudgesQuery, FetchVideoNudgesQueryVariables>(FetchVideoNudgesDocument, options);
        }
export type FetchVideoNudgesQueryHookResult = ReturnType<typeof useFetchVideoNudgesQuery>;
export type FetchVideoNudgesLazyQueryHookResult = ReturnType<typeof useFetchVideoNudgesLazyQuery>;
export type FetchVideoNudgesQueryResult = Apollo.QueryResult<FetchVideoNudgesQuery, FetchVideoNudgesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;