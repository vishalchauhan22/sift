import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditZoomInstructionsFragmentDoc } from '../../pages/consolidated-edit/ConsolidatedEditVideoFragment.generated';
import { ConsolidatedEditVideoPreviewFragmentDoc } from '../../pages/consolidated-edit/preview-player/ConsolidatedEditVideoPreview.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConsolidateEditZoomInstructionRemovalByVideoIdMutationVariables = Types.Exact<{
  input: Types.RemoveEditZoomInstructionInput;
}>;


export type ConsolidateEditZoomInstructionRemovalByVideoIdMutation = { __typename: 'Mutation', removeEditZoomInstruction: { __typename: 'GenericError', message: string } | { __typename: 'RemoveEditZoomInstructionPayload', video: { __typename: 'RegularUserVideo', id: string, supportsEditZoomInstructions: boolean, editZoomInstructions: Array<{ __typename: 'EditZoomInstructionsMetadata', id: string, zoomCreatedBy: Types.ZoomCreatedBy, lowerMs: number, upperMs: number }>, editPreview: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null, Expires: number | null } } | null } } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ConsolidateEditZoomInstructionRemovalByVideoIdDocument = gql`
    mutation ConsolidateEditZoomInstructionRemovalByVideoId($input: RemoveEditZoomInstructionInput!) {
  removeEditZoomInstruction(input: $input) {
    ... on RemoveEditZoomInstructionPayload {
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
export type ConsolidateEditZoomInstructionRemovalByVideoIdMutationFn = Apollo.MutationFunction<ConsolidateEditZoomInstructionRemovalByVideoIdMutation, ConsolidateEditZoomInstructionRemovalByVideoIdMutationVariables>;

/**
 * __useConsolidateEditZoomInstructionRemovalByVideoIdMutation__
 *
 * To run a mutation, you first call `useConsolidateEditZoomInstructionRemovalByVideoIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConsolidateEditZoomInstructionRemovalByVideoIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [consolidateEditZoomInstructionRemovalByVideoIdMutation, { data, loading, error }] = useConsolidateEditZoomInstructionRemovalByVideoIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConsolidateEditZoomInstructionRemovalByVideoIdMutation(baseOptions?: Apollo.MutationHookOptions<ConsolidateEditZoomInstructionRemovalByVideoIdMutation, ConsolidateEditZoomInstructionRemovalByVideoIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConsolidateEditZoomInstructionRemovalByVideoIdMutation, ConsolidateEditZoomInstructionRemovalByVideoIdMutationVariables>(ConsolidateEditZoomInstructionRemovalByVideoIdDocument, options);
      }
export type ConsolidateEditZoomInstructionRemovalByVideoIdMutationHookResult = ReturnType<typeof useConsolidateEditZoomInstructionRemovalByVideoIdMutation>;
export type ConsolidateEditZoomInstructionRemovalByVideoIdMutationResult = Apollo.MutationResult<ConsolidateEditZoomInstructionRemovalByVideoIdMutation>;
export type ConsolidateEditZoomInstructionRemovalByVideoIdMutationOptions = Apollo.BaseMutationOptions<ConsolidateEditZoomInstructionRemovalByVideoIdMutation, ConsolidateEditZoomInstructionRemovalByVideoIdMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;