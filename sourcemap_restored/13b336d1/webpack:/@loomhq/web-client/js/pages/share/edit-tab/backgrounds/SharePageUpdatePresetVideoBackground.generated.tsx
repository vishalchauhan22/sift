import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { SharePageVideoBackgroundFragmentDoc, SharePageVideoProcessingInformationFragmentDoc } from './SharePageGetVideoBackground.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharePageUpdatePresetVideoBackgroundMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  presetBackgroundName: Types.Scalars['String']['input'];
}>;


export type SharePageUpdatePresetVideoBackgroundMutation = { __typename: 'Mutation', updatePresetVideoBackground: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UpdatePresetVideoBackgroundPayload', video: { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null } } } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const SharePageUpdatePresetVideoBackgroundDocument = gql`
    mutation SharePageUpdatePresetVideoBackground($videoId: ID!, $presetBackgroundName: String!) {
  updatePresetVideoBackground(
    videoId: $videoId
    presetBackgroundName: $presetBackgroundName
  ) {
    ... on UpdatePresetVideoBackgroundPayload {
      video {
        ...SharePageVideoBackground
        ...SharePageVideoProcessingInformation
      }
    }
    ... on Warning {
      message
    }
    ... on Error {
      message
    }
  }
}
    ${SharePageVideoBackgroundFragmentDoc}
${SharePageVideoProcessingInformationFragmentDoc}`;
export type SharePageUpdatePresetVideoBackgroundMutationFn = Apollo.MutationFunction<SharePageUpdatePresetVideoBackgroundMutation, SharePageUpdatePresetVideoBackgroundMutationVariables>;

/**
 * __useSharePageUpdatePresetVideoBackgroundMutation__
 *
 * To run a mutation, you first call `useSharePageUpdatePresetVideoBackgroundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSharePageUpdatePresetVideoBackgroundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sharePageUpdatePresetVideoBackgroundMutation, { data, loading, error }] = useSharePageUpdatePresetVideoBackgroundMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      presetBackgroundName: // value for 'presetBackgroundName'
 *   },
 * });
 */
export function useSharePageUpdatePresetVideoBackgroundMutation(baseOptions?: Apollo.MutationHookOptions<SharePageUpdatePresetVideoBackgroundMutation, SharePageUpdatePresetVideoBackgroundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SharePageUpdatePresetVideoBackgroundMutation, SharePageUpdatePresetVideoBackgroundMutationVariables>(SharePageUpdatePresetVideoBackgroundDocument, options);
      }
export type SharePageUpdatePresetVideoBackgroundMutationHookResult = ReturnType<typeof useSharePageUpdatePresetVideoBackgroundMutation>;
export type SharePageUpdatePresetVideoBackgroundMutationResult = Apollo.MutationResult<SharePageUpdatePresetVideoBackgroundMutation>;
export type SharePageUpdatePresetVideoBackgroundMutationOptions = Apollo.BaseMutationOptions<SharePageUpdatePresetVideoBackgroundMutation, SharePageUpdatePresetVideoBackgroundMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;