import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegenerateMp4MutationVariables = Types.Exact<{
  input: Types.RegenerateMp4Input;
}>;


export type RegenerateMp4Mutation = { __typename: 'Mutation', regenerateMP4: { __typename: 'GenericError', message: string } | { __typename: 'RegenerateMP4Payload', success: boolean | null } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'VideoNotFoundError', message: string } | null };


export const RegenerateMp4Document = gql`
    mutation RegenerateMP4($input: RegenerateMP4Input!) {
  regenerateMP4(input: $input) {
    ... on RegenerateMP4Payload {
      __typename
      success
    }
    ... on GenericError {
      __typename
      message
    }
    ... on VideoNotFoundError {
      __typename
      message
    }
  }
}
    `;
export type RegenerateMp4MutationFn = Apollo.MutationFunction<RegenerateMp4Mutation, RegenerateMp4MutationVariables>;

/**
 * __useRegenerateMp4Mutation__
 *
 * To run a mutation, you first call `useRegenerateMp4Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegenerateMp4Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regenerateMp4Mutation, { data, loading, error }] = useRegenerateMp4Mutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegenerateMp4Mutation(baseOptions?: Apollo.MutationHookOptions<RegenerateMp4Mutation, RegenerateMp4MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegenerateMp4Mutation, RegenerateMp4MutationVariables>(RegenerateMp4Document, options);
      }
export type RegenerateMp4MutationHookResult = ReturnType<typeof useRegenerateMp4Mutation>;
export type RegenerateMp4MutationResult = Apollo.MutationResult<RegenerateMp4Mutation>;
export type RegenerateMp4MutationOptions = Apollo.BaseMutationOptions<RegenerateMp4Mutation, RegenerateMp4MutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;