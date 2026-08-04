import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkSpaceContentAsReadMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID']['input'];
}>;


export type MarkSpaceContentAsReadMutation = { __typename: 'Mutation', markSpaceContentAsRead: { __typename: 'GenericError', message: string } | { __typename: 'MarkSpaceContentAsReadPayload', success: boolean | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const MarkSpaceContentAsReadDocument = gql`
    mutation MarkSpaceContentAsRead($spaceId: ID!) {
  markSpaceContentAsRead(spaceId: $spaceId) {
    __typename
    ... on MarkSpaceContentAsReadPayload {
      __typename
      success
    }
    ... on Error {
      message
    }
  }
}
    `;
export type MarkSpaceContentAsReadMutationFn = Apollo.MutationFunction<MarkSpaceContentAsReadMutation, MarkSpaceContentAsReadMutationVariables>;

/**
 * __useMarkSpaceContentAsReadMutation__
 *
 * To run a mutation, you first call `useMarkSpaceContentAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSpaceContentAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSpaceContentAsReadMutation, { data, loading, error }] = useMarkSpaceContentAsReadMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useMarkSpaceContentAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkSpaceContentAsReadMutation, MarkSpaceContentAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkSpaceContentAsReadMutation, MarkSpaceContentAsReadMutationVariables>(MarkSpaceContentAsReadDocument, options);
      }
export type MarkSpaceContentAsReadMutationHookResult = ReturnType<typeof useMarkSpaceContentAsReadMutation>;
export type MarkSpaceContentAsReadMutationResult = Apollo.MutationResult<MarkSpaceContentAsReadMutation>;
export type MarkSpaceContentAsReadMutationOptions = Apollo.BaseMutationOptions<MarkSpaceContentAsReadMutation, MarkSpaceContentAsReadMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;