import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegenerateMeetingRecapMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  meetingType: Types.Scalars['String']['input'];
}>;


export type RegenerateMeetingRecapMutation = { __typename: 'Mutation', regenerateMeetingRecap: { __typename: 'EntityNotFoundError', message: string } | { __typename: 'GenericError', message: string } | { __typename: 'RegenerateMeetingRecapPayload', regenerateMeetingRecap: { __typename: 'RegenerateMeetingRecap', success: boolean, message: string | null } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const RegenerateMeetingRecapDocument = gql`
    mutation RegenerateMeetingRecap($videoId: ID!, $meetingType: String!) {
  regenerateMeetingRecap(videoId: $videoId, meetingType: $meetingType) {
    ... on RegenerateMeetingRecapPayload {
      regenerateMeetingRecap {
        success
        message
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export type RegenerateMeetingRecapMutationFn = Apollo.MutationFunction<RegenerateMeetingRecapMutation, RegenerateMeetingRecapMutationVariables>;

/**
 * __useRegenerateMeetingRecapMutation__
 *
 * To run a mutation, you first call `useRegenerateMeetingRecapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegenerateMeetingRecapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regenerateMeetingRecapMutation, { data, loading, error }] = useRegenerateMeetingRecapMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      meetingType: // value for 'meetingType'
 *   },
 * });
 */
export function useRegenerateMeetingRecapMutation(baseOptions?: Apollo.MutationHookOptions<RegenerateMeetingRecapMutation, RegenerateMeetingRecapMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegenerateMeetingRecapMutation, RegenerateMeetingRecapMutationVariables>(RegenerateMeetingRecapDocument, options);
      }
export type RegenerateMeetingRecapMutationHookResult = ReturnType<typeof useRegenerateMeetingRecapMutation>;
export type RegenerateMeetingRecapMutationResult = Apollo.MutationResult<RegenerateMeetingRecapMutation>;
export type RegenerateMeetingRecapMutationOptions = Apollo.BaseMutationOptions<RegenerateMeetingRecapMutation, RegenerateMeetingRecapMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;