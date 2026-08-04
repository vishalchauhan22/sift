import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditVideoWaveformFragment = { __typename: 'RegularUserVideo', id: string, source_duration: number | null, waveformData: Array<{ __typename: 'ClipWaveformData', clipId: string | null, status: Types.WaveformGenerationStatus | null, sourceDurationMs: number | null, peaks: Array<number> | null }> };

export type ConsolidatedEditWaveformDataQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConsolidatedEditWaveformDataQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, source_duration: number | null, waveformData: Array<{ __typename: 'ClipWaveformData', clipId: string | null, status: Types.WaveformGenerationStatus | null, sourceDurationMs: number | null, peaks: Array<number> | null }> } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };

export const ConsolidatedEditVideoWaveformFragmentDoc = gql`
    fragment ConsolidatedEditVideoWaveform on RegularUserVideo {
  id
  source_duration
  waveformData {
    clipId
    status
    sourceDurationMs
    peaks
  }
}
    `;
export const ConsolidatedEditWaveformDataDocument = gql`
    query ConsolidatedEditWaveformData($videoId: ID!, $password: String) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      ...ConsolidatedEditVideoWaveform
    }
  }
}
    ${ConsolidatedEditVideoWaveformFragmentDoc}`;

/**
 * __useConsolidatedEditWaveformDataQuery__
 *
 * To run a query within a React component, call `useConsolidatedEditWaveformDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditWaveformDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsolidatedEditWaveformDataQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConsolidatedEditWaveformDataQuery(baseOptions: Apollo.QueryHookOptions<ConsolidatedEditWaveformDataQuery, ConsolidatedEditWaveformDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConsolidatedEditWaveformDataQuery, ConsolidatedEditWaveformDataQueryVariables>(ConsolidatedEditWaveformDataDocument, options);
      }
export function useConsolidatedEditWaveformDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConsolidatedEditWaveformDataQuery, ConsolidatedEditWaveformDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConsolidatedEditWaveformDataQuery, ConsolidatedEditWaveformDataQueryVariables>(ConsolidatedEditWaveformDataDocument, options);
        }
export type ConsolidatedEditWaveformDataQueryHookResult = ReturnType<typeof useConsolidatedEditWaveformDataQuery>;
export type ConsolidatedEditWaveformDataLazyQueryHookResult = ReturnType<typeof useConsolidatedEditWaveformDataLazyQuery>;
export type ConsolidatedEditWaveformDataQueryResult = Apollo.QueryResult<ConsolidatedEditWaveformDataQuery, ConsolidatedEditWaveformDataQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;