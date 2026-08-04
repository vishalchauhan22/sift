import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { EditTabVideoTrimsFragmentDoc } from './EditTabVideoTrimsFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditTabFillerWordRemovalTtsMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type EditTabFillerWordRemovalTtsMutation = { __typename: 'Mutation', applyFillerWordRemovalTTS: { __typename: 'ApplyFillerWordRemovalTTSPayload', video: { __typename: 'RegularUserVideo', id: string, playable_duration: number | null, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null, trim_progress: number | null, videoUploadValid: boolean | null, trim_ranges: Array<{ __typename: 'VideoTrimRange', from: number, to: number } | null> | null } } } | { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning' } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const EditTabFillerWordRemovalTtsDocument = gql`
    mutation editTabFillerWordRemovalTTS($videoId: ID!, $password: String) {
  applyFillerWordRemovalTTS(input: {videoId: $videoId, password: $password}) {
    __typename
    ... on ApplyFillerWordRemovalTTSPayload {
      video {
        ...EditTabVideoTrims
      }
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on Error {
      message
    }
  }
}
    ${EditTabVideoTrimsFragmentDoc}`;
export type EditTabFillerWordRemovalTtsMutationFn = Apollo.MutationFunction<EditTabFillerWordRemovalTtsMutation, EditTabFillerWordRemovalTtsMutationVariables>;

/**
 * __useEditTabFillerWordRemovalTtsMutation__
 *
 * To run a mutation, you first call `useEditTabFillerWordRemovalTtsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTabFillerWordRemovalTtsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTabFillerWordRemovalTtsMutation, { data, loading, error }] = useEditTabFillerWordRemovalTtsMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEditTabFillerWordRemovalTtsMutation(baseOptions?: Apollo.MutationHookOptions<EditTabFillerWordRemovalTtsMutation, EditTabFillerWordRemovalTtsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTabFillerWordRemovalTtsMutation, EditTabFillerWordRemovalTtsMutationVariables>(EditTabFillerWordRemovalTtsDocument, options);
      }
export type EditTabFillerWordRemovalTtsMutationHookResult = ReturnType<typeof useEditTabFillerWordRemovalTtsMutation>;
export type EditTabFillerWordRemovalTtsMutationResult = Apollo.MutationResult<EditTabFillerWordRemovalTtsMutation>;
export type EditTabFillerWordRemovalTtsMutationOptions = Apollo.BaseMutationOptions<EditTabFillerWordRemovalTtsMutation, EditTabFillerWordRemovalTtsMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;