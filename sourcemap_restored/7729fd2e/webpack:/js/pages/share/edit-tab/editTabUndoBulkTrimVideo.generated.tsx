import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { EditTabVideoTrimsFragmentDoc } from './EditTabVideoTrimsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditTabUndoBulkTrimVideoMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  forceSave: Types.Scalars['Boolean']['input'];
  lastTrimId: Types.Scalars['ID']['input'];
  includeSilences: Types.Scalars['Boolean']['input'];
  includeFillers: Types.Scalars['Boolean']['input'];
  includeFillerWordsPlus?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type EditTabUndoBulkTrimVideoMutation = { __typename: 'Mutation', bulkUndoTrim: { __typename: 'BulkUndoTrimPayload', video: { __typename: 'RegularUserVideo', id: string, playable_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null } } | null } | { __typename: 'ClipUpdateError', message: string, reason: string } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'SavingOverNewClipChangesPayload', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const EditTabUndoBulkTrimVideoDocument = gql`
    mutation editTabUndoBulkTrimVideo($videoId: ID!, $forceSave: Boolean!, $lastTrimId: ID!, $includeSilences: Boolean!, $includeFillers: Boolean!, $includeFillerWordsPlus: Boolean, $password: String) {
  bulkUndoTrim(
    videoId: $videoId
    forceSave: $forceSave
    lastTrimId: $lastTrimId
    includeSilences: $includeSilences
    includeFillers: $includeFillers
    includeFillerWordsPlus: $includeFillerWordsPlus
    password: $password
  ) {
    ... on BulkUndoTrimPayload {
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
export type EditTabUndoBulkTrimVideoMutationFn = Apollo.MutationFunction<EditTabUndoBulkTrimVideoMutation, EditTabUndoBulkTrimVideoMutationVariables>;

/**
 * __useEditTabUndoBulkTrimVideoMutation__
 *
 * To run a mutation, you first call `useEditTabUndoBulkTrimVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTabUndoBulkTrimVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTabUndoBulkTrimVideoMutation, { data, loading, error }] = useEditTabUndoBulkTrimVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      forceSave: // value for 'forceSave'
 *      lastTrimId: // value for 'lastTrimId'
 *      includeSilences: // value for 'includeSilences'
 *      includeFillers: // value for 'includeFillers'
 *      includeFillerWordsPlus: // value for 'includeFillerWordsPlus'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEditTabUndoBulkTrimVideoMutation(baseOptions?: Apollo.MutationHookOptions<EditTabUndoBulkTrimVideoMutation, EditTabUndoBulkTrimVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTabUndoBulkTrimVideoMutation, EditTabUndoBulkTrimVideoMutationVariables>(EditTabUndoBulkTrimVideoDocument, options);
      }
export type EditTabUndoBulkTrimVideoMutationHookResult = ReturnType<typeof useEditTabUndoBulkTrimVideoMutation>;
export type EditTabUndoBulkTrimVideoMutationResult = Apollo.MutationResult<EditTabUndoBulkTrimVideoMutation>;
export type EditTabUndoBulkTrimVideoMutationOptions = Apollo.BaseMutationOptions<EditTabUndoBulkTrimVideoMutation, EditTabUndoBulkTrimVideoMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;