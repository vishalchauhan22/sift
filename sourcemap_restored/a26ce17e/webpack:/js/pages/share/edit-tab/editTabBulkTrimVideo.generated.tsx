import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { EditTabVideoTrimsFragmentDoc } from './EditTabVideoTrimsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditTabBulkTrimVideoMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  forceSave: Types.Scalars['Boolean']['input'];
  lastTrimId: Types.Scalars['ID']['input'];
  includeSilences: Types.Scalars['Boolean']['input'];
  includeFillers: Types.Scalars['Boolean']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type EditTabBulkTrimVideoMutation = { __typename: 'Mutation', bulkTrimClips: { __typename: 'BulkTrimClipsPayload', removalWasPartial: boolean | null, removalCounts: { __typename: 'BulkTrimClipsRemovalCounts', fillerWords: number | null, secondsOfSilence: number | null } | null, video: { __typename: 'RegularUserVideo', id: string, playable_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null } } | null } | { __typename: 'ClipUpdateError', message: string, reason: string } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'SavingOverNewClipChangesPayload', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const EditTabBulkTrimVideoDocument = gql`
    mutation editTabBulkTrimVideo($videoId: ID!, $forceSave: Boolean!, $lastTrimId: ID!, $includeSilences: Boolean!, $includeFillers: Boolean!, $password: String) {
  bulkTrimClips(
    videoId: $videoId
    forceSave: $forceSave
    lastTrimId: $lastTrimId
    includeSilences: $includeSilences
    includeFillers: $includeFillers
    password: $password
  ) {
    ... on BulkTrimClipsPayload {
      removalCounts {
        fillerWords
        secondsOfSilence
      }
      removalWasPartial
      video {
        ...EditTabVideoTrims
      }
    }
    ... on ClipUpdateError {
      message
      reason
    }
    ... on Warning {
      message
    }
    ... on Error {
      message
    }
  }
}
    ${EditTabVideoTrimsFragmentDoc}`;
export type EditTabBulkTrimVideoMutationFn = Apollo.MutationFunction<EditTabBulkTrimVideoMutation, EditTabBulkTrimVideoMutationVariables>;

/**
 * __useEditTabBulkTrimVideoMutation__
 *
 * To run a mutation, you first call `useEditTabBulkTrimVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTabBulkTrimVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTabBulkTrimVideoMutation, { data, loading, error }] = useEditTabBulkTrimVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      forceSave: // value for 'forceSave'
 *      lastTrimId: // value for 'lastTrimId'
 *      includeSilences: // value for 'includeSilences'
 *      includeFillers: // value for 'includeFillers'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEditTabBulkTrimVideoMutation(baseOptions?: Apollo.MutationHookOptions<EditTabBulkTrimVideoMutation, EditTabBulkTrimVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTabBulkTrimVideoMutation, EditTabBulkTrimVideoMutationVariables>(EditTabBulkTrimVideoDocument, options);
      }
export type EditTabBulkTrimVideoMutationHookResult = ReturnType<typeof useEditTabBulkTrimVideoMutation>;
export type EditTabBulkTrimVideoMutationResult = Apollo.MutationResult<EditTabBulkTrimVideoMutation>;
export type EditTabBulkTrimVideoMutationOptions = Apollo.BaseMutationOptions<EditTabBulkTrimVideoMutation, EditTabBulkTrimVideoMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;