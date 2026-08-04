import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { SharePageVideoBackgroundFragmentDoc, SharePageVideoProcessingInformationFragmentDoc } from './SharePageGetVideoBackground.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharePageRemoveVideoBackgroundMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type SharePageRemoveVideoBackgroundMutation = { __typename: 'Mutation', removeVideoBackground: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'RemoveVideoBackgroundPayload', video: { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null } } } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const SharePageRemoveVideoBackgroundDocument = gql`
    mutation SharePageRemoveVideoBackground($videoId: ID!) {
  removeVideoBackground(videoId: $videoId) {
    ... on RemoveVideoBackgroundPayload {
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
export type SharePageRemoveVideoBackgroundMutationFn = Apollo.MutationFunction<SharePageRemoveVideoBackgroundMutation, SharePageRemoveVideoBackgroundMutationVariables>;

/**
 * __useSharePageRemoveVideoBackgroundMutation__
 *
 * To run a mutation, you first call `useSharePageRemoveVideoBackgroundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSharePageRemoveVideoBackgroundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sharePageRemoveVideoBackgroundMutation, { data, loading, error }] = useSharePageRemoveVideoBackgroundMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useSharePageRemoveVideoBackgroundMutation(baseOptions?: Apollo.MutationHookOptions<SharePageRemoveVideoBackgroundMutation, SharePageRemoveVideoBackgroundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SharePageRemoveVideoBackgroundMutation, SharePageRemoveVideoBackgroundMutationVariables>(SharePageRemoveVideoBackgroundDocument, options);
      }
export type SharePageRemoveVideoBackgroundMutationHookResult = ReturnType<typeof useSharePageRemoveVideoBackgroundMutation>;
export type SharePageRemoveVideoBackgroundMutationResult = Apollo.MutationResult<SharePageRemoveVideoBackgroundMutation>;
export type SharePageRemoveVideoBackgroundMutationOptions = Apollo.BaseMutationOptions<SharePageRemoveVideoBackgroundMutation, SharePageRemoveVideoBackgroundMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;