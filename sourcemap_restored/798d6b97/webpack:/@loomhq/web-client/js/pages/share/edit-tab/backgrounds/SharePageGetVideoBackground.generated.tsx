import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharePageVideoBackgroundFragment = { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null };

export type SharePageVideoProcessingInformationFragment = { __typename: 'RegularUserVideo', processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null } };

export type SharePageGetVideoBackgroundQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type SharePageGetVideoBackgroundQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null } } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const SharePageVideoBackgroundFragmentDoc = gql`
    fragment SharePageVideoBackground on RegularUserVideo {
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
export const SharePageVideoProcessingInformationFragmentDoc = gql`
    fragment SharePageVideoProcessingInformation on RegularUserVideo {
  processing_information {
    trim_id
    trim_progress
    videoUploadValid
  }
}
    `;
export const SharePageGetVideoBackgroundDocument = gql`
    query SharePageGetVideoBackground($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...SharePageVideoBackground
      ...SharePageVideoProcessingInformation
    }
  }
}
    ${SharePageVideoBackgroundFragmentDoc}
${SharePageVideoProcessingInformationFragmentDoc}`;

/**
 * __useSharePageGetVideoBackgroundQuery__
 *
 * To run a query within a React component, call `useSharePageGetVideoBackgroundQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharePageGetVideoBackgroundQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharePageGetVideoBackgroundQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSharePageGetVideoBackgroundQuery(baseOptions: Apollo.QueryHookOptions<SharePageGetVideoBackgroundQuery, SharePageGetVideoBackgroundQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharePageGetVideoBackgroundQuery, SharePageGetVideoBackgroundQueryVariables>(SharePageGetVideoBackgroundDocument, options);
      }
export function useSharePageGetVideoBackgroundLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharePageGetVideoBackgroundQuery, SharePageGetVideoBackgroundQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharePageGetVideoBackgroundQuery, SharePageGetVideoBackgroundQueryVariables>(SharePageGetVideoBackgroundDocument, options);
        }
export type SharePageGetVideoBackgroundQueryHookResult = ReturnType<typeof useSharePageGetVideoBackgroundQuery>;
export type SharePageGetVideoBackgroundLazyQueryHookResult = ReturnType<typeof useSharePageGetVideoBackgroundLazyQuery>;
export type SharePageGetVideoBackgroundQueryResult = Apollo.QueryResult<SharePageGetVideoBackgroundQuery, SharePageGetVideoBackgroundQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;