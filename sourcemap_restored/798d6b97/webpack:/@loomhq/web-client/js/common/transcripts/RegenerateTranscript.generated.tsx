import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegenerateTranscriptMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  language?: Types.InputMaybe<Types.Language>;
  source?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RegenerateTranscriptMutation = { __typename: 'Mutation', retranscribeVideo: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'RetranscribeVideoPayload', video: { __typename: 'RegularUserVideo', id: string, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null }, video_properties: { __typename: 'VideoProperties', recording_version: Types.RecordingVersion | null } } | null } | null };


export const RegenerateTranscriptDocument = gql`
    mutation RegenerateTranscript($videoId: ID!, $language: Language, $source: String) {
  retranscribeVideo(videoId: $videoId, language: $language, source: $source) {
    __typename
    ... on RetranscribeVideoPayload {
      video {
        id
        processing_information {
          trim_id
        }
        video_properties {
          recording_version
        }
      }
    }
    ... on Warning {
      message
      __typename
    }
    ... on Error {
      message
      __typename
    }
  }
}
    `;
export type RegenerateTranscriptMutationFn = Apollo.MutationFunction<RegenerateTranscriptMutation, RegenerateTranscriptMutationVariables>;

/**
 * __useRegenerateTranscriptMutation__
 *
 * To run a mutation, you first call `useRegenerateTranscriptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegenerateTranscriptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regenerateTranscriptMutation, { data, loading, error }] = useRegenerateTranscriptMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      language: // value for 'language'
 *      source: // value for 'source'
 *   },
 * });
 */
export function useRegenerateTranscriptMutation(baseOptions?: Apollo.MutationHookOptions<RegenerateTranscriptMutation, RegenerateTranscriptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegenerateTranscriptMutation, RegenerateTranscriptMutationVariables>(RegenerateTranscriptDocument, options);
      }
export type RegenerateTranscriptMutationHookResult = ReturnType<typeof useRegenerateTranscriptMutation>;
export type RegenerateTranscriptMutationResult = Apollo.MutationResult<RegenerateTranscriptMutation>;
export type RegenerateTranscriptMutationOptions = Apollo.BaseMutationOptions<RegenerateTranscriptMutation, RegenerateTranscriptMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;