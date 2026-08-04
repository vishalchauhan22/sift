import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { SharePageVideoBackgroundFragmentDoc, SharePageVideoProcessingInformationFragmentDoc } from './SharePageGetVideoBackground.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharePageUpdateHexVideoBackgroundMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  hexValue: Types.Scalars['String']['input'];
}>;


export type SharePageUpdateHexVideoBackgroundMutation = { __typename: 'Mutation', updateHexVideoBackground: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UpdateHexVideoBackgroundPayload', video: { __typename: 'RegularUserVideo', id: string, background: { __typename: 'CustomVideoBackground', assetId: string, src: string | null } | { __typename: 'HexVideoBackground', hexValue: string } | { __typename: 'PresetVideoBackground', presetBackgroundName: string } | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null } } } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const SharePageUpdateHexVideoBackgroundDocument = gql`
    mutation SharePageUpdateHexVideoBackground($videoId: ID!, $hexValue: String!) {
  updateHexVideoBackground(videoId: $videoId, hexValue: $hexValue) {
    ... on UpdateHexVideoBackgroundPayload {
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
export type SharePageUpdateHexVideoBackgroundMutationFn = Apollo.MutationFunction<SharePageUpdateHexVideoBackgroundMutation, SharePageUpdateHexVideoBackgroundMutationVariables>;

/**
 * __useSharePageUpdateHexVideoBackgroundMutation__
 *
 * To run a mutation, you first call `useSharePageUpdateHexVideoBackgroundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSharePageUpdateHexVideoBackgroundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sharePageUpdateHexVideoBackgroundMutation, { data, loading, error }] = useSharePageUpdateHexVideoBackgroundMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      hexValue: // value for 'hexValue'
 *   },
 * });
 */
export function useSharePageUpdateHexVideoBackgroundMutation(baseOptions?: Apollo.MutationHookOptions<SharePageUpdateHexVideoBackgroundMutation, SharePageUpdateHexVideoBackgroundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SharePageUpdateHexVideoBackgroundMutation, SharePageUpdateHexVideoBackgroundMutationVariables>(SharePageUpdateHexVideoBackgroundDocument, options);
      }
export type SharePageUpdateHexVideoBackgroundMutationHookResult = ReturnType<typeof useSharePageUpdateHexVideoBackgroundMutation>;
export type SharePageUpdateHexVideoBackgroundMutationResult = Apollo.MutationResult<SharePageUpdateHexVideoBackgroundMutation>;
export type SharePageUpdateHexVideoBackgroundMutationOptions = Apollo.BaseMutationOptions<SharePageUpdateHexVideoBackgroundMutation, SharePageUpdateHexVideoBackgroundMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;