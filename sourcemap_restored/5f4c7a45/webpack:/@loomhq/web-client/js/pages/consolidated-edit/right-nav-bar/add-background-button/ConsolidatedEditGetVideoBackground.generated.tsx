import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditVideoBackgroundFragment = { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null };

export type ConsolidatedEditGetVideoBackgroundQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditGetVideoBackgroundQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditVideoBackgroundFragmentDoc = gql`
    fragment ConsolidatedEditVideoBackground on RegularUserVideo {
  id
  background {
    ... on PresetVideoBackground {
      presetBackgroundName
    }
    ... on HexVideoBackground {
      hexValue
    }
    ... on CustomVideoBackground {
      assetId
      src
    }
  }
}
    `;
export const ConsolidatedEditGetVideoBackgroundDocument = gql`
    query ConsolidatedEditGetVideoBackground($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoBackground
      ...ConsolidatedEditVideoPreview
    }
  }
}
    ${ConsolidatedEditVideoBackgroundFragmentDoc}
${ConsolidatedEditVideoPreviewFragmentDoc}`;

/**
 * __useConsolidatedEditGetVideoBackgroundQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditGetVideoBackgroundQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditGetVideoBackgroundQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditGetVideoBackgroundQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditGetVideoBackgroundQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditGetVideoBackgroundQuery, ConsolidatedEditGetVideoBackgroundQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditGetVideoBackgroundQuery, ConsolidatedEditGetVideoBackgroundQueryVariables>(ConsolidatedEditGetVideoBackgroundDocument, options);
      }
export function useConsolidatedEditGetVideoBackgroundLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditGetVideoBackgroundQuery, ConsolidatedEditGetVideoBackgroundQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditGetVideoBackgroundQuery, ConsolidatedEditGetVideoBackgroundQueryVariables>(ConsolidatedEditGetVideoBackgroundDocument, options);
        }
export type ConsolidatedEditGetVideoBackgroundQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoBackgroundQuery>;
export type ConsolidatedEditGetVideoBackgroundLazyQueryHookResult = ReturnType<typeof useConsolidatedEditGetVideoBackgroundLazyQuery>;
export type ConsolidatedEditGetVideoBackgroundQueryResult = Apollo.QueryResult<ConsolidatedEditGetVideoBackgroundQuery, ConsolidatedEditGetVideoBackgroundQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;