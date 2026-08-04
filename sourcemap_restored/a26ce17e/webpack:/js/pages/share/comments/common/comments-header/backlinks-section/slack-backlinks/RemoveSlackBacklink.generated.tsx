import * as Types from '../../../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveSlackBacklinkMutationVariables = Types.Exact<{
  backlinkId: Types.Scalars['ID']['input'];
}>;


export type RemoveSlackBacklinkMutation = { __typename: 'Mutation', deleteBacklink: { __typename: 'DeleteBacklinkPayload', success: boolean | null } | { __typename: 'GenericError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const RemoveSlackBacklinkDocument = gql`
    mutation RemoveSlackBacklink($backlinkId: ID!) {
  deleteBacklink(backlinkId: $backlinkId) {
    __typename
    ... on DeleteBacklinkPayload {
      success
    }
  }
}
    `;
export type RemoveSlackBacklinkMutationFn = Apollo.MutationFunction<RemoveSlackBacklinkMutation, RemoveSlackBacklinkMutationVariables>;

/**
 * __useRemoveSlackBacklinkMutation__
 *
 * To run a mutation, you first call `useRemoveSlackBacklinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSlackBacklinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSlackBacklinkMutation, { data, loading, error }] = useRemoveSlackBacklinkMutation({
 *   variables: {
 *      backlinkId: // value for 'backlinkId'
 *   },
 * });
 */
export function useRemoveSlackBacklinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSlackBacklinkMutation, RemoveSlackBacklinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSlackBacklinkMutation, RemoveSlackBacklinkMutationVariables>(RemoveSlackBacklinkDocument, options);
      }
export type RemoveSlackBacklinkMutationHookResult = ReturnType<typeof useRemoveSlackBacklinkMutation>;
export type RemoveSlackBacklinkMutationResult = Apollo.MutationResult<RemoveSlackBacklinkMutation>;
export type RemoveSlackBacklinkMutationOptions = Apollo.BaseMutationOptions<RemoveSlackBacklinkMutation, RemoveSlackBacklinkMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;