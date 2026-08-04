import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMeetingNotesLocationQueryVariables = Types.Exact<{
  calendarMeetingGuid?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type GetMeetingNotesLocationQuery = { __typename: 'Query', aiMeetingNotesLocation: { __typename: 'AiMeetingNotesLocationError', locationValidationError: boolean } | { __typename: 'AiMeetingNotesLocationPayload', location: { __typename: 'confluenceContent', id: string | null, title: string | null, type: Types.ConfluenceContentTypes | null, space: { __typename: 'confluenceSpace', id: string | null, name: string | null, key: string | null, icon: { __typename: 'ConfluenceSpaceIcon', url: string | null } | null, homepage: { __typename: 'confluenceContent', id: string | null } | null } | null } | null } | { __typename: 'GenericError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const GetMeetingNotesLocationDocument = gql`
    query getMeetingNotesLocation($calendarMeetingGuid: ID) {
  aiMeetingNotesLocation(calendarMeetingGuid: $calendarMeetingGuid) {
    ... on AiMeetingNotesLocationPayload {
      __typename
      location {
        id
        title
        space {
          id
          name
          key
          icon {
            url
          }
          homepage {
            id
          }
        }
        type
      }
    }
    ... on AiMeetingNotesLocationError {
      __typename
      locationValidationError
    }
  }
}
    `;

/**
 * __useGetMeetingNotesLocationQuery__
 *
 * To run a query within a React component, call `useGetMeetingNotesLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeetingNotesLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeetingNotesLocationQuery({
 *   variables: {
 *      calendarMeetingGuid: // value for 'calendarMeetingGuid'
 *   },
 * });
 */
export function useGetMeetingNotesLocationQuery(baseOptions?: Apollo.QueryHookOptions<GetMeetingNotesLocationQuery, GetMeetingNotesLocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeetingNotesLocationQuery, GetMeetingNotesLocationQueryVariables>(GetMeetingNotesLocationDocument, options);
      }
export function useGetMeetingNotesLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeetingNotesLocationQuery, GetMeetingNotesLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeetingNotesLocationQuery, GetMeetingNotesLocationQueryVariables>(GetMeetingNotesLocationDocument, options);
        }
export type GetMeetingNotesLocationQueryHookResult = ReturnType<typeof useGetMeetingNotesLocationQuery>;
export type GetMeetingNotesLocationLazyQueryHookResult = ReturnType<typeof useGetMeetingNotesLocationLazyQuery>;
export type GetMeetingNotesLocationQueryResult = Apollo.QueryResult<GetMeetingNotesLocationQuery, GetMeetingNotesLocationQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;