import * as Types from '../../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSlackBacklinkPreviewInfoQueryVariables = Types.Exact<{
  backlinkId: Types.Scalars['ID']['input'];
}>;


export type GetSlackBacklinkPreviewInfoQuery = { __typename: 'Query', getSlackBacklinkPreviewInfo: { __typename: 'GenericError', message: string } | { __typename: 'GetSlackBacklinkPreviewInfoPayload', id: string, isUserConnectedToGivenSlackTeam: boolean, isChannelMissingOrPrivate: boolean | null, slackTeamId: string, slackChannelName: string | null, connectUrl: string | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetSlackBacklinkPreviewInfoDocument = gql`
    query GetSlackBacklinkPreviewInfo($backlinkId: ID!) {
  getSlackBacklinkPreviewInfo(backlinkId: $backlinkId) {
    __typename
    ... on GetSlackBacklinkPreviewInfoPayload {
      id
      isUserConnectedToGivenSlackTeam
      isChannelMissingOrPrivate
      slackTeamId
      slackChannelName
      connectUrl
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useGetSlackBacklinkPreviewInfoQuery__
 *
 * To run a query within a React component, call `useGetSlackBacklinkPreviewInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSlackBacklinkPreviewInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSlackBacklinkPreviewInfoQuery({
 *   variables: {
 *      backlinkId: // value for 'backlinkId'
 *   },
 * });
 */
export function useGetSlackBacklinkPreviewInfoQuery(baseOptions: Apollo.QueryHookOptions<GetSlackBacklinkPreviewInfoQuery, GetSlackBacklinkPreviewInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSlackBacklinkPreviewInfoQuery, GetSlackBacklinkPreviewInfoQueryVariables>(GetSlackBacklinkPreviewInfoDocument, options);
      }
export function useGetSlackBacklinkPreviewInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSlackBacklinkPreviewInfoQuery, GetSlackBacklinkPreviewInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSlackBacklinkPreviewInfoQuery, GetSlackBacklinkPreviewInfoQueryVariables>(GetSlackBacklinkPreviewInfoDocument, options);
        }
export type GetSlackBacklinkPreviewInfoQueryHookResult = ReturnType<typeof useGetSlackBacklinkPreviewInfoQuery>;
export type GetSlackBacklinkPreviewInfoLazyQueryHookResult = ReturnType<typeof useGetSlackBacklinkPreviewInfoLazyQuery>;
export type GetSlackBacklinkPreviewInfoQueryResult = Apollo.QueryResult<GetSlackBacklinkPreviewInfoQuery, GetSlackBacklinkPreviewInfoQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;