import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAllNotificationStatusesMutationVariables = Types.Exact<{
  status: Types.NotificationStatus;
}>;


export type UpdateAllNotificationStatusesMutation = { __typename: 'Mutation', updateAllNotificationStatuses: { __typename: 'GenericError', message: string } | { __typename: 'UpdateAllNotificationStatusesPayload', count: number | null, notifications: Array<{ __typename: 'NotificationTrayItem', id: string, status: Types.NotificationStatus } | null> | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const UpdateAllNotificationStatusesDocument = gql`
    mutation UpdateAllNotificationStatuses($status: NotificationStatus!) {
  updateAllNotificationStatuses(status: $status) {
    ... on UpdateAllNotificationStatusesPayload {
      __typename
      count
      notifications {
        id
        status
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
    `;
export type UpdateAllNotificationStatusesMutationFn = Apollo.MutationFunction<UpdateAllNotificationStatusesMutation, UpdateAllNotificationStatusesMutationVariables>;

/**
 * __useUpdateAllNotificationStatusesMutation__
 *
 * To run a mutation, you first call `useUpdateAllNotificationStatusesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAllNotificationStatusesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAllNotificationStatusesMutation, { data, loading, error }] = useUpdateAllNotificationStatusesMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateAllNotificationStatusesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAllNotificationStatusesMutation, UpdateAllNotificationStatusesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAllNotificationStatusesMutation, UpdateAllNotificationStatusesMutationVariables>(UpdateAllNotificationStatusesDocument, options);
      }
export type UpdateAllNotificationStatusesMutationHookResult = ReturnType<typeof useUpdateAllNotificationStatusesMutation>;
export type UpdateAllNotificationStatusesMutationResult = Apollo.MutationResult<UpdateAllNotificationStatusesMutation>;
export type UpdateAllNotificationStatusesMutationOptions = Apollo.BaseMutationOptions<UpdateAllNotificationStatusesMutation, UpdateAllNotificationStatusesMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;