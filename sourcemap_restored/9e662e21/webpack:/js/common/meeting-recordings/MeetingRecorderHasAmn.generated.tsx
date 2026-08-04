import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeetingRecorderHasAmnQueryVariables = Types.Exact<{
  recorderId: Types.Scalars['ID']['input'];
}>;


export type MeetingRecorderHasAmnQuery = { __typename: 'Query', meetingRecorderHasAmn: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError' } | { __typename: 'MeetingRecorderHasAmnPayload', id: string | null, eligible: boolean | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const MeetingRecorderHasAmnDocument = gql`
    query MeetingRecorderHasAmn($recorderId: ID!) {
  meetingRecorderHasAmn(recorderId: $recorderId) {
    __typename
    ... on MeetingRecorderHasAmnPayload {
      id
      eligible
    }
    ... on GenericError {
      message
    }
  }
}
    `;

/**
 * __useMeetingRecorderHasAmnQuery__
 *
 * To run a query within a React component, call `useMeetingRecorderHasAmnQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingRecorderHasAmnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingRecorderHasAmnQuery({
 *   variables: {
 *      recorderId: // value for 'recorderId'
 *   },
 * });
 */
export function useMeetingRecorderHasAmnQuery(baseOptions: Apollo.QueryHookOptions<MeetingRecorderHasAmnQuery, MeetingRecorderHasAmnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeetingRecorderHasAmnQuery, MeetingRecorderHasAmnQueryVariables>(MeetingRecorderHasAmnDocument, options);
      }
export function useMeetingRecorderHasAmnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeetingRecorderHasAmnQuery, MeetingRecorderHasAmnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeetingRecorderHasAmnQuery, MeetingRecorderHasAmnQueryVariables>(MeetingRecorderHasAmnDocument, options);
        }
export type MeetingRecorderHasAmnQueryHookResult = ReturnType<typeof useMeetingRecorderHasAmnQuery>;
export type MeetingRecorderHasAmnLazyQueryHookResult = ReturnType<typeof useMeetingRecorderHasAmnLazyQuery>;
export type MeetingRecorderHasAmnQueryResult = Apollo.QueryResult<MeetingRecorderHasAmnQuery, MeetingRecorderHasAmnQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;