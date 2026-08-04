import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { VideoPlayerReactionFragmentFragmentDoc } from './ReactionFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchVideoReactionsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FetchVideoReactionsQuery = { __typename: 'Query', videoReactionsForVideo: Array<{ __typename: 'PublicVideoReaction', id: string, time: number, reaction: number, extended_reaction: string | null, anon_user_id: string | null, anon_user_name: string | null, locallyCreated: boolean | null, localId: string | null, user: { __typename: 'RegularUser', id: string, display_name: string } | null }> };


export const FetchVideoReactionsDocument = gql`
    query fetchVideoReactions($id: ID!, $password: String) {
  videoReactionsForVideo(videoId: $id, password: $password) {
    ...VideoPlayerReactionFragment
  }
}
    ${VideoPlayerReactionFragmentFragmentDoc}`;

/**
 * __useFetchVideoReactionsQuery__
 *
 * To run a query within a React component, call `useFetchVideoReactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchVideoReactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchVideoReactionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFetchVideoReactionsQuery(baseOptions: Apollo.QueryHookOptions<FetchVideoReactionsQuery, FetchVideoReactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchVideoReactionsQuery, FetchVideoReactionsQueryVariables>(FetchVideoReactionsDocument, options);
      }
export function useFetchVideoReactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchVideoReactionsQuery, FetchVideoReactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchVideoReactionsQuery, FetchVideoReactionsQueryVariables>(FetchVideoReactionsDocument, options);
        }
export type FetchVideoReactionsQueryHookResult = ReturnType<typeof useFetchVideoReactionsQuery>;
export type FetchVideoReactionsLazyQueryHookResult = ReturnType<typeof useFetchVideoReactionsLazyQuery>;
export type FetchVideoReactionsQueryResult = Apollo.QueryResult<FetchVideoReactionsQuery, FetchVideoReactionsQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;