import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoWorkspaceAiSettingForCaptionsLanguageQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVideoWorkspaceAiSettingForCaptionsLanguageQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, organization: { __typename: 'Organization', id: string, planIncludesAI: boolean | null, workspaceAllowsAi: boolean | null } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoWorkspaceAiSettingForCaptionsLanguageDocument = gql`
    query GetVideoWorkspaceAiSettingForCaptionsLanguage($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    __typename
    ... on RegularUserVideo {
      id
      organization {
        id
        planIncludesAI
        workspaceAllowsAi
      }
    }
  }
}
    `;

/**
 * __useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery__
 *
 * To run a query within a React component, call `useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery(baseOptions: Apollo.QueryHookOptions<GetVideoWorkspaceAiSettingForCaptionsLanguageQuery, GetVideoWorkspaceAiSettingForCaptionsLanguageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoWorkspaceAiSettingForCaptionsLanguageQuery, GetVideoWorkspaceAiSettingForCaptionsLanguageQueryVariables>(GetVideoWorkspaceAiSettingForCaptionsLanguageDocument, options);
      }
export function useGetVideoWorkspaceAiSettingForCaptionsLanguageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoWorkspaceAiSettingForCaptionsLanguageQuery, GetVideoWorkspaceAiSettingForCaptionsLanguageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoWorkspaceAiSettingForCaptionsLanguageQuery, GetVideoWorkspaceAiSettingForCaptionsLanguageQueryVariables>(GetVideoWorkspaceAiSettingForCaptionsLanguageDocument, options);
        }
export type GetVideoWorkspaceAiSettingForCaptionsLanguageQueryHookResult = ReturnType<typeof useGetVideoWorkspaceAiSettingForCaptionsLanguageQuery>;
export type GetVideoWorkspaceAiSettingForCaptionsLanguageLazyQueryHookResult = ReturnType<typeof useGetVideoWorkspaceAiSettingForCaptionsLanguageLazyQuery>;
export type GetVideoWorkspaceAiSettingForCaptionsLanguageQueryResult = Apollo.QueryResult<GetVideoWorkspaceAiSettingForCaptionsLanguageQuery, GetVideoWorkspaceAiSettingForCaptionsLanguageQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;