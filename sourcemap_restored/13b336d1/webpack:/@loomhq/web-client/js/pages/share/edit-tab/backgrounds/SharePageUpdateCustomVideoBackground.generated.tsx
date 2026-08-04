import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { SharePageVideoBackgroundFragmentDoc, SharePageVideoProcessingInformationFragmentDoc } from './SharePageGetVideoBackground.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharePageUpdateCustomVideoBackgroundMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  assetId: Types.Scalars['ID']['input'];
}>;


export type SharePageUpdateCustomVideoBackgroundMutation = { __typename: 'Mutation', updateCustomVideoBackground: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UpdateCustomVideoBackgroundPayload', video: { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null } } } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const SharePageUpdateCustomVideoBackgroundDocument = gql`
    mutation SharePageUpdateCustomVideoBackground($videoId: ID!, $assetId: ID!) {
  updateCustomVideoBackground(videoId: $videoId, assetId: $assetId) {
    ... on UpdateCustomVideoBackgroundPayload {
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
export type SharePageUpdateCustomVideoBackgroundMutationFn = Apollo.MutationFunction<SharePageUpdateCustomVideoBackgroundMutation, SharePageUpdateCustomVideoBackgroundMutationVariables>;

/**
 * __useSharePageUpdateCustomVideoBackgroundMutation__
 *
 * To run a mutation, you first call `useSharePageUpdateCustomVideoBackgroundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSharePageUpdateCustomVideoBackgroundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sharePageUpdateCustomVideoBackgroundMutation, { data, loading, error }] = useSharePageUpdateCustomVideoBackgroundMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      assetId: // value for 'assetId'
 *   },
 * });
 */
export function useSharePageUpdateCustomVideoBackgroundMutation(baseOptions?: Apollo.MutationHookOptions<SharePageUpdateCustomVideoBackgroundMutation, SharePageUpdateCustomVideoBackgroundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SharePageUpdateCustomVideoBackgroundMutation, SharePageUpdateCustomVideoBackgroundMutationVariables>(SharePageUpdateCustomVideoBackgroundDocument, options);
      }
export type SharePageUpdateCustomVideoBackgroundMutationHookResult = ReturnType<typeof useSharePageUpdateCustomVideoBackgroundMutation>;
export type SharePageUpdateCustomVideoBackgroundMutationResult = Apollo.MutationResult<SharePageUpdateCustomVideoBackgroundMutation>;
export type SharePageUpdateCustomVideoBackgroundMutationOptions = Apollo.BaseMutationOptions<SharePageUpdateCustomVideoBackgroundMutation, SharePageUpdateCustomVideoBackgroundMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;