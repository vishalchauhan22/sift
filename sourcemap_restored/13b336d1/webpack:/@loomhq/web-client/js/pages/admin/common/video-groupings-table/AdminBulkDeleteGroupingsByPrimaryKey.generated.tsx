import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AdminBulkDeleteGroupingsByPrimaryKeyMutationVariables = Types.Exact<{
  groupingPrimaryKeys: Array<Types.GroupingPrimaryKey> | Types.GroupingPrimaryKey;
}>;


export type AdminBulkDeleteGroupingsByPrimaryKeyMutation = { __typename: 'Mutation', adminBulkDeleteGroupingsByPrimaryKey: { __typename: 'AdminBulkDeleteGroupingsByPrimaryKeyPayload', success: boolean | null } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError' } | null };


export const AdminBulkDeleteGroupingsByPrimaryKeyDocument = gql`
    mutation AdminBulkDeleteGroupingsByPrimaryKey($groupingPrimaryKeys: [GroupingPrimaryKey!]!) {
  adminBulkDeleteGroupingsByPrimaryKey(groupingPrimaryKeys: $groupingPrimaryKeys) {
    ... on AdminBulkDeleteGroupingsByPrimaryKeyPayload {
      success
    }
    ... on GenericError {
      message
    }
    __typename
  }
}
    `;
export type AdminBulkDeleteGroupingsByPrimaryKeyMutationFn = Apollo.MutationFunction<AdminBulkDeleteGroupingsByPrimaryKeyMutation, AdminBulkDeleteGroupingsByPrimaryKeyMutationVariables>;

/**
 * __useAdminBulkDeleteGroupingsByPrimaryKeyMutation__
 *
 * To run a mutation, you first call `useAdminBulkDeleteGroupingsByPrimaryKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminBulkDeleteGroupingsByPrimaryKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminBulkDeleteGroupingsByPrimaryKeyMutation, { data, loading, error }] = useAdminBulkDeleteGroupingsByPrimaryKeyMutation({
 *   variables: {
 *      groupingPrimaryKeys: // value for 'groupingPrimaryKeys'
 *   },
 * });
 */
export function useAdminBulkDeleteGroupingsByPrimaryKeyMutation(baseOptions?: Apollo.MutationHookOptions<AdminBulkDeleteGroupingsByPrimaryKeyMutation, AdminBulkDeleteGroupingsByPrimaryKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminBulkDeleteGroupingsByPrimaryKeyMutation, AdminBulkDeleteGroupingsByPrimaryKeyMutationVariables>(AdminBulkDeleteGroupingsByPrimaryKeyDocument, options);
      }
export type AdminBulkDeleteGroupingsByPrimaryKeyMutationHookResult = ReturnType<typeof useAdminBulkDeleteGroupingsByPrimaryKeyMutation>;
export type AdminBulkDeleteGroupingsByPrimaryKeyMutationResult = Apollo.MutationResult<AdminBulkDeleteGroupingsByPrimaryKeyMutation>;
export type AdminBulkDeleteGroupingsByPrimaryKeyMutationOptions = Apollo.BaseMutationOptions<AdminBulkDeleteGroupingsByPrimaryKeyMutation, AdminBulkDeleteGroupingsByPrimaryKeyMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;