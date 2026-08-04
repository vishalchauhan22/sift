import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { AutoFeatureStatusesFragmentDoc } from './AutoFeatureStatuses.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAutoFeatureStatusesQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAutoFeatureStatusesQuery = { __typename: 'Query', getAutoFeatureStatuses: { __typename: 'AutoFeatureStatuses', id: string | null, autoTitle: string | null, autoDescription: string | null, autoTitleStatus: Types.IntelligenceStatusType | null, autoDescriptionStatus: Types.IntelligenceStatusType | null, autoChaptersStatus: Types.AutoChapterStatusesType | null, autoTasksStatus: Types.IntelligenceStatusType | null, autoTasksCount: number | null, hasSilenceRemovalEnabled: boolean, hasFillerWordRemovalEnabled: boolean, hasFillerWordPlusRemovalEnabled: boolean, numberOfFillerWordsTrimmed: number | null, numberOfFillerWordsPlusTrimmed: number | null, secondsOfSilenceTrimmed: number | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetAutoFeatureStatusesDocument = gql`
    query GetAutoFeatureStatuses($videoId: ID!, $password: String) {
  getAutoFeatureStatuses(videoId: $videoId, password: $password) {
    ... on AutoFeatureStatuses {
      ...AutoFeatureStatuses
    }
    ... on Error {
      message
    }
  }
}
    ${AutoFeatureStatusesFragmentDoc}`;

/**
 * __useGetAutoFeatureStatusesQuery__
 *
 * To run a query within a React component, call `useGetAutoFeatureStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoFeatureStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoFeatureStatusesQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetAutoFeatureStatusesQuery(baseOptions: Apollo.QueryHookOptions<GetAutoFeatureStatusesQuery, GetAutoFeatureStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoFeatureStatusesQuery, GetAutoFeatureStatusesQueryVariables>(GetAutoFeatureStatusesDocument, options);
      }
export function useGetAutoFeatureStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoFeatureStatusesQuery, GetAutoFeatureStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoFeatureStatusesQuery, GetAutoFeatureStatusesQueryVariables>(GetAutoFeatureStatusesDocument, options);
        }
export type GetAutoFeatureStatusesQueryHookResult = ReturnType<typeof useGetAutoFeatureStatusesQuery>;
export type GetAutoFeatureStatusesLazyQueryHookResult = ReturnType<typeof useGetAutoFeatureStatusesLazyQuery>;
export type GetAutoFeatureStatusesQueryResult = Apollo.QueryResult<GetAutoFeatureStatusesQuery, GetAutoFeatureStatusesQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;