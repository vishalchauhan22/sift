import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { EditTabVideoTrimsFragmentDoc } from './EditTabVideoTrimsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditTabRemoveFillerWordsPlusMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type EditTabRemoveFillerWordsPlusMutation = { __typename: 'Mutation', trimDisfluencies: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'TrimDisfluenciesPayload', wordsRemoved: number | null, video: { __typename: 'RegularUserVideo', id: string, playable_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null } } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const EditTabRemoveFillerWordsPlusDocument = gql`
    mutation editTabRemoveFillerWordsPlus($videoId: ID!, $password: String) {
  trimDisfluencies(videoId: $videoId, password: $password) {
    __typename
    ... on TrimDisfluenciesPayload {
      video {
        ...EditTabVideoTrims
      }
      wordsRemoved
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on GenericError {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on InputValidationError {
      message
    }
  }
}
    ${EditTabVideoTrimsFragmentDoc}`;
export type EditTabRemoveFillerWordsPlusMutationFn = Apollo.MutationFunction<EditTabRemoveFillerWordsPlusMutation, EditTabRemoveFillerWordsPlusMutationVariables>;

/**
 * __useEditTabRemoveFillerWordsPlusMutation__
 *
 * To run a mutation, you first call `useEditTabRemoveFillerWordsPlusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTabRemoveFillerWordsPlusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTabRemoveFillerWordsPlusMutation, { data, loading, error }] = useEditTabRemoveFillerWordsPlusMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEditTabRemoveFillerWordsPlusMutation(baseOptions?: Apollo.MutationHookOptions<EditTabRemoveFillerWordsPlusMutation, EditTabRemoveFillerWordsPlusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTabRemoveFillerWordsPlusMutation, EditTabRemoveFillerWordsPlusMutationVariables>(EditTabRemoveFillerWordsPlusDocument, options);
      }
export type EditTabRemoveFillerWordsPlusMutationHookResult = ReturnType<typeof useEditTabRemoveFillerWordsPlusMutation>;
export type EditTabRemoveFillerWordsPlusMutationResult = Apollo.MutationResult<EditTabRemoveFillerWordsPlusMutation>;
export type EditTabRemoveFillerWordsPlusMutationOptions = Apollo.BaseMutationOptions<EditTabRemoveFillerWordsPlusMutation, EditTabRemoveFillerWordsPlusMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;