import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateRecordingVideoDocumentTypeMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  recordingDocumentationType: Types.WorkflowTemplateType;
}>;


export type UpdateRecordingVideoDocumentTypeMutation = { __typename: 'Mutation', result: { __typename: 'GenericError' } | { __typename: 'UpdateRecordingVideoDocumentTypePayload', success: boolean } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'VideoNotFoundError', message: string } | null };


export const UpdateRecordingVideoDocumentTypeDocument = gql`
    mutation UpdateRecordingVideoDocumentType($videoId: ID!, $recordingDocumentationType: WorkflowTemplateType!) {
  result: updateRecordingVideoDocumentType(
    videoId: $videoId
    recordingDocumentationType: $recordingDocumentationType
  ) {
    ... on UpdateRecordingVideoDocumentTypePayload {
      success
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on VideoNotFoundError {
      message
    }
  }
}
    `;
export type UpdateRecordingVideoDocumentTypeMutationFn = Apollo.MutationFunction<UpdateRecordingVideoDocumentTypeMutation, UpdateRecordingVideoDocumentTypeMutationVariables>;

/**
 * __useUpdateRecordingVideoDocumentTypeMutation__
 *
 * To run a mutation, you first call `useUpdateRecordingVideoDocumentTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecordingVideoDocumentTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecordingVideoDocumentTypeMutation, { data, loading, error }] = useUpdateRecordingVideoDocumentTypeMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      recordingDocumentationType: // value for 'recordingDocumentationType'
 *   },
 * });
 */
export function useUpdateRecordingVideoDocumentTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecordingVideoDocumentTypeMutation, UpdateRecordingVideoDocumentTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecordingVideoDocumentTypeMutation, UpdateRecordingVideoDocumentTypeMutationVariables>(UpdateRecordingVideoDocumentTypeDocument, options);
      }
export type UpdateRecordingVideoDocumentTypeMutationHookResult = ReturnType<typeof useUpdateRecordingVideoDocumentTypeMutation>;
export type UpdateRecordingVideoDocumentTypeMutationResult = Apollo.MutationResult<UpdateRecordingVideoDocumentTypeMutation>;
export type UpdateRecordingVideoDocumentTypeMutationOptions = Apollo.BaseMutationOptions<UpdateRecordingVideoDocumentTypeMutation, UpdateRecordingVideoDocumentTypeMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;