import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoCanBeEditedWithoutRetranscriptionQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type GetVideoCanBeEditedWithoutRetranscriptionQuery = { __typename: 'Query', getVideoCanBeEditedWithoutRetranscription: { __typename: 'GenericError', message: string } | { __typename: 'GetVideoCanBeEditedWithoutRetranscriptionPayload', canBeEdited: boolean } | { __typename: 'InvalidRequestWarning' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetVideoCanBeEditedWithoutRetranscriptionDocument = gql`
    query GetVideoCanBeEditedWithoutRetranscription($videoId: ID!) {
  getVideoCanBeEditedWithoutRetranscription(input: {videoId: $videoId}) {
    ... on GetVideoCanBeEditedWithoutRetranscriptionPayload {
      canBeEdited
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetVideoCanBeEditedWithoutRetranscriptionQuery__
 *
 * To run a query within a React component, call `useGetVideoCanBeEditedWithoutRetranscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoCanBeEditedWithoutRetranscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoCanBeEditedWithoutRetranscriptionQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useGetVideoCanBeEditedWithoutRetranscriptionQuery(baseOptions: Apollo.QueryHookOptions<GetVideoCanBeEditedWithoutRetranscriptionQuery, GetVideoCanBeEditedWithoutRetranscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoCanBeEditedWithoutRetranscriptionQuery, GetVideoCanBeEditedWithoutRetranscriptionQueryVariables>(GetVideoCanBeEditedWithoutRetranscriptionDocument, options);
      }
export function useGetVideoCanBeEditedWithoutRetranscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoCanBeEditedWithoutRetranscriptionQuery, GetVideoCanBeEditedWithoutRetranscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoCanBeEditedWithoutRetranscriptionQuery, GetVideoCanBeEditedWithoutRetranscriptionQueryVariables>(GetVideoCanBeEditedWithoutRetranscriptionDocument, options);
        }
export type GetVideoCanBeEditedWithoutRetranscriptionQueryHookResult = ReturnType<typeof useGetVideoCanBeEditedWithoutRetranscriptionQuery>;
export type GetVideoCanBeEditedWithoutRetranscriptionLazyQueryHookResult = ReturnType<typeof useGetVideoCanBeEditedWithoutRetranscriptionLazyQuery>;
export type GetVideoCanBeEditedWithoutRetranscriptionQueryResult = Apollo.QueryResult<GetVideoCanBeEditedWithoutRetranscriptionQuery, GetVideoCanBeEditedWithoutRetranscriptionQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;