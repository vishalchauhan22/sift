import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditVideoPreviewFragment = { __typename: 'RegularUserVideo', id: string, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null };

export type ConsolidatedEditVideoPreviewQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditVideoPreviewQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo', id: string, message: string | null } | { __typename: 'RegularUserVideo', id: string, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } | { __typename: 'VideoPasswordMissingOrIncorrect', id: string, message: string | null } | null };

export const ConsolidatedEditVideoPreviewFragmentDoc = gql`
    fragment ConsolidatedEditVideoPreview on RegularUserVideo {
  id
  editPreview {
    url
    credentials {
      Policy
      Signature
      KeyPairId
      Expires
    }
  }
}
    `;
export const ConsolidatedEditVideoPreviewDocument = gql`
    query ConsolidatedEditVideoPreview($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoPreview
    }
    ... on PrivateVideo {
      id
      message
    }
    ... on VideoPasswordMissingOrIncorrect {
      id
      message
    }
  }
}
    ${ConsolidatedEditVideoPreviewFragmentDoc}`;

/**
 * __useConsolidatedEditVideoPreviewQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditVideoPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditVideoPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditVideoPreviewQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditVideoPreviewQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditVideoPreviewQuery, ConsolidatedEditVideoPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditVideoPreviewQuery, ConsolidatedEditVideoPreviewQueryVariables>(ConsolidatedEditVideoPreviewDocument, options);
      }
export function useConsolidatedEditVideoPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditVideoPreviewQuery, ConsolidatedEditVideoPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditVideoPreviewQuery, ConsolidatedEditVideoPreviewQueryVariables>(ConsolidatedEditVideoPreviewDocument, options);
        }
export type ConsolidatedEditVideoPreviewQueryHookResult = ReturnType<typeof useConsolidatedEditVideoPreviewQuery>;
export type ConsolidatedEditVideoPreviewLazyQueryHookResult = ReturnType<typeof useConsolidatedEditVideoPreviewLazyQuery>;
export type ConsolidatedEditVideoPreviewQueryResult = Apollo.QueryResult<ConsolidatedEditVideoPreviewQuery, ConsolidatedEditVideoPreviewQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;