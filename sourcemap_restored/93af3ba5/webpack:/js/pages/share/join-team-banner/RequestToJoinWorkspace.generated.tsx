import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestToJoinWorkspaceMutationMutationVariables = Types.Exact<{
  workspaceId: Types.Scalars['ID']['input'];
}>;


export type RequestToJoinWorkspaceMutationMutation = { __typename: 'Mutation', result: { __typename: 'GenericError' } | { __typename: 'RequestToJoinWorkspacePayload', status: Types.RequestToJoinWorkspaceStatus, message: string | null, workspace: { __typename: 'JoinableWorkspace', id: string, autoJoin: boolean | null, requestStatus: Types.WorkspaceJoinRequestStatus | null } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const RequestToJoinWorkspaceMutationDocument = gql`
    mutation RequestToJoinWorkspaceMutation($workspaceId: ID!) {
  result: requestToJoinWorkspace(workspaceId: $workspaceId) {
    __typename
    ... on RequestToJoinWorkspacePayload {
      status
      message
      workspace {
        id
        autoJoin
        requestStatus
      }
    }
  }
}
    `;
export type RequestToJoinWorkspaceMutationMutationFn = Apollo.MutationFunction<RequestToJoinWorkspaceMutationMutation, RequestToJoinWorkspaceMutationMutationVariables>;

/**
 * __useRequestToJoinWorkspaceMutationMutation__
 *
 * To run a mutation, you first call `useRequestToJoinWorkspaceMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestToJoinWorkspaceMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestToJoinWorkspaceMutationMutation, { data, loading, error }] = useRequestToJoinWorkspaceMutationMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useRequestToJoinWorkspaceMutationMutation(baseOptions?: Apollo.MutationHookOptions<RequestToJoinWorkspaceMutationMutation, RequestToJoinWorkspaceMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestToJoinWorkspaceMutationMutation, RequestToJoinWorkspaceMutationMutationVariables>(RequestToJoinWorkspaceMutationDocument, options);
      }
export type RequestToJoinWorkspaceMutationMutationHookResult = ReturnType<typeof useRequestToJoinWorkspaceMutationMutation>;
export type RequestToJoinWorkspaceMutationMutationResult = Apollo.MutationResult<RequestToJoinWorkspaceMutationMutation>;
export type RequestToJoinWorkspaceMutationMutationOptions = Apollo.BaseMutationOptions<RequestToJoinWorkspaceMutationMutation, RequestToJoinWorkspaceMutationMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;