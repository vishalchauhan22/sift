import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditZoomInstructionsFragmentDoc } from '../../pages/consolidated-edit/ConsolidatedEditVideoFragment.generated';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../pages/consolidated-edit/preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedEditAddAutoZoomsToVideoMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ConsolidatedEditAddAutoZoomsToVideoMutation = { __typename: 'Mutation', addAutoZoomsToVideo: { __typename: 'AddAutoZoomsToVideoPayload', video: { __typename: 'RegularUserVideo', id: string, supportsEditZoomInstructions: boolean, editZoomInstructions: Array<{ __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number }>, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } } | { __typename: 'GenericError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const ConsolidatedEditAddAutoZoomsToVideoDocument = gql`
    mutation ConsolidatedEditAddAutoZoomsToVideo($videoId: ID!) {
  addAutoZoomsToVideo(videoId: $videoId) {
    __typename
    ... on AddAutoZoomsToVideoPayload {
      video {
        ...ConsolidatedEditZoomInstructions
        ...ConsolidatedEditVideoPreview
      }
    }
  }
}
    ${ConsolidatedEditZoomInstructionsFragmentDoc}
${ConsolidatedEditVideoPreviewFragmentDoc}`;
export type ConsolidatedEditAddAutoZoomsToVideoMutationFn = Apollo.MutationFunction<ConsolidatedEditAddAutoZoomsToVideoMutation, ConsolidatedEditAddAutoZoomsToVideoMutationVariables>;

/**
 * __useConsolidatedEditAddAutoZoomsToVideoMutation__
 *
 * To run a mutation, you first call `useConsolidatedEditAddAutoZoomsToVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedEditAddAutoZoomsToVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [consolidatedEditAddAutoZoomsToVideoMutation, { data, loading, error }] = useConsolidatedEditAddAutoZoomsToVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useConsolidatedEditAddAutoZoomsToVideoMutation(baseOptions?: Apollo.MutationHookOptions<ConsolidatedEditAddAutoZoomsToVideoMutation, ConsolidatedEditAddAutoZoomsToVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConsolidatedEditAddAutoZoomsToVideoMutation, ConsolidatedEditAddAutoZoomsToVideoMutationVariables>(ConsolidatedEditAddAutoZoomsToVideoDocument, options);
      }
export type ConsolidatedEditAddAutoZoomsToVideoMutationHookResult = ReturnType<typeof useConsolidatedEditAddAutoZoomsToVideoMutation>;
export type ConsolidatedEditAddAutoZoomsToVideoMutationResult = Apollo.MutationResult<ConsolidatedEditAddAutoZoomsToVideoMutation>;
export type ConsolidatedEditAddAutoZoomsToVideoMutationOptions = Apollo.BaseMutationOptions<ConsolidatedEditAddAutoZoomsToVideoMutation, ConsolidatedEditAddAutoZoomsToVideoMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;