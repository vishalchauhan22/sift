import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditZoomInstructionsFragmentDoc } from '../../pages/consolidated-edit/ConsolidatedEditVideoFragment.generated';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../pages/consolidated-edit/preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidatedRemoveAllEditZoomInstructionsMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ConsolidatedRemoveAllEditZoomInstructionsMutation = { __typename: 'Mutation', removeAllEditZoomInstructions: { __typename: 'GenericError', message: string } | { __typename: 'RemoveAllEditZoomInstructionsPayload', video: { __typename: 'RegularUserVideo', id: string, editZoomInstructions: Array<{ __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number }>, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ConsolidatedRemoveAllEditZoomInstructionsDocument = gql`
    mutation ConsolidatedRemoveAllEditZoomInstructions($videoId: ID!) {
  removeAllEditZoomInstructions(videoId: $videoId) {
    __typename
    ... on RemoveAllEditZoomInstructionsPayload {
      video {
        ...ConsolidatedEditZoomInstructions
        ...ConsolidatedEditVideoPreview
      }
    }
    ... on GenericError {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
  }
}
    ${ConsolidatedEditZoomInstructionsFragmentDoc}
${ConsolidatedEditVideoPreviewFragmentDoc}`;
export type ConsolidatedRemoveAllEditZoomInstructionsMutationFn = Apollo.MutationFunction<ConsolidatedRemoveAllEditZoomInstructionsMutation, ConsolidatedRemoveAllEditZoomInstructionsMutationVariables>;

/**
 * __useConsolidatedRemoveAllEditZoomInstructionsMutation__
 *
 * To run a mutation, you first call `useConsolidatedRemoveAllEditZoomInstructionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConsolidatedRemoveAllEditZoomInstructionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [consolidatedRemoveAllEditZoomInstructionsMutation, { data, loading, error }] = useConsolidatedRemoveAllEditZoomInstructionsMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useConsolidatedRemoveAllEditZoomInstructionsMutation(baseOptions?: Apollo.MutationHookOptions<ConsolidatedRemoveAllEditZoomInstructionsMutation, ConsolidatedRemoveAllEditZoomInstructionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConsolidatedRemoveAllEditZoomInstructionsMutation, ConsolidatedRemoveAllEditZoomInstructionsMutationVariables>(ConsolidatedRemoveAllEditZoomInstructionsDocument, options);
      }
export type ConsolidatedRemoveAllEditZoomInstructionsMutationHookResult = ReturnType<typeof useConsolidatedRemoveAllEditZoomInstructionsMutation>;
export type ConsolidatedRemoveAllEditZoomInstructionsMutationResult = Apollo.MutationResult<ConsolidatedRemoveAllEditZoomInstructionsMutation>;
export type ConsolidatedRemoveAllEditZoomInstructionsMutationOptions = Apollo.BaseMutationOptions<ConsolidatedRemoveAllEditZoomInstructionsMutation, ConsolidatedRemoveAllEditZoomInstructionsMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;