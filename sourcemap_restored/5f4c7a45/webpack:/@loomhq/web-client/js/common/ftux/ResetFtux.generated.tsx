import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResetFtuxMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  ftux: Types.Scalars['String']['input'];
}>;


export type ResetFtuxMutation = { __typename: 'Mutation', resetFtuxComponent: { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'resetFtuxComponentPayload', success: boolean, ftux: string } | null };


export const ResetFtuxDocument = gql`
    mutation ResetFtux($userId: ID!, $ftux: String!) {
  resetFtuxComponent(userId: $userId, ftux: $ftux) {
    ... on resetFtuxComponentPayload {
      success
      ftux
    }
    ... on Error {
      message
    }
  }
}
    `;
export type ResetFtuxMutationFn = Apollo.MutationFunction<ResetFtuxMutation, ResetFtuxMutationVariables>;

/**
 * __useResetFtuxMutation__
 *
 * To run a mutation, you first call `useResetFtuxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetFtuxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetFtuxMutation, { data, loading, error }] = useResetFtuxMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      ftux: // value for 'ftux'
 *   },
 * });
 */
export function useResetFtuxMutation(baseOptions?: Apollo.MutationHookOptions<ResetFtuxMutation, ResetFtuxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetFtuxMutation, ResetFtuxMutationVariables>(ResetFtuxDocument, options);
      }
export type ResetFtuxMutationHookResult = ReturnType<typeof useResetFtuxMutation>;
export type ResetFtuxMutationResult = Apollo.MutationResult<ResetFtuxMutation>;
export type ResetFtuxMutationOptions = Apollo.BaseMutationOptions<ResetFtuxMutation, ResetFtuxMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;