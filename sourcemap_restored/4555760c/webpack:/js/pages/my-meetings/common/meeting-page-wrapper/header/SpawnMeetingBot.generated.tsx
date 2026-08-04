import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SpawnMeetingBotMutationVariables = Types.Exact<{
  meetingUrl: Types.Scalars['String']['input'];
  integrationType: Types.Scalars['String']['input'];
}>;


export type SpawnMeetingBotMutation = { __typename: 'Mutation', spawnMeetingBot: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'SpawnMeetingBotPayload', success: boolean } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const SpawnMeetingBotDocument = gql`
    mutation SpawnMeetingBot($meetingUrl: String!, $integrationType: String!) {
  spawnMeetingBot(meetingUrl: $meetingUrl, integrationType: $integrationType) {
    __typename
    ... on SpawnMeetingBotPayload {
      success
    }
    ... on Error {
      message
    }
  }
}
    `;
export type SpawnMeetingBotMutationFn = Apollo.MutationFunction<SpawnMeetingBotMutation, SpawnMeetingBotMutationVariables>;

/**
 * __useSpawnMeetingBotMutation__
 *
 * To run a mutation, you first call `useSpawnMeetingBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpawnMeetingBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spawnMeetingBotMutation, { data, loading, error }] = useSpawnMeetingBotMutation({
 *   variables: {
 *      meetingUrl: // value for 'meetingUrl'
 *      integrationType: // value for 'integrationType'
 *   },
 * });
 */
export function useSpawnMeetingBotMutation(baseOptions?: Apollo.MutationHookOptions<SpawnMeetingBotMutation, SpawnMeetingBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpawnMeetingBotMutation, SpawnMeetingBotMutationVariables>(SpawnMeetingBotDocument, options);
      }
export type SpawnMeetingBotMutationHookResult = ReturnType<typeof useSpawnMeetingBotMutation>;
export type SpawnMeetingBotMutationResult = Apollo.MutationResult<SpawnMeetingBotMutation>;
export type SpawnMeetingBotMutationOptions = Apollo.BaseMutationOptions<SpawnMeetingBotMutation, SpawnMeetingBotMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;