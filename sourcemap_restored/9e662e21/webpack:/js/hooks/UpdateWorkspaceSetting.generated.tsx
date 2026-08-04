import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateWorkspaceSettingMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  value: Types.Scalars['BasicScalar']['input'];
}>;


export type UpdateWorkspaceSettingMutation = { __typename: 'Mutation', result: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UpdatedWorkspaceSetting', created: boolean | null, updated: boolean | null, setting: { __typename: 'WorkspaceSetting', name: string, value: unknown } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const UpdateWorkspaceSettingDocument = gql`
    mutation UpdateWorkspaceSetting($name: String!, $value: BasicScalar!) {
  result: updateWorkspaceSetting(name: $name, value: $value) {
    ... on UpdatedWorkspaceSetting {
      setting {
        name
        value
      }
      created
      updated
    }
  }
}
    `;
export type UpdateWorkspaceSettingMutationFn = Apollo.MutationFunction<UpdateWorkspaceSettingMutation, UpdateWorkspaceSettingMutationVariables>;

/**
 * __useUpdateWorkspaceSettingMutation__
 *
 * To run a mutation, you first call `useUpdateWorkspaceSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkspaceSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkspaceSettingMutation, { data, loading, error }] = useUpdateWorkspaceSettingMutation({
 *   variables: {
 *      name: // value for 'name'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateWorkspaceSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkspaceSettingMutation, UpdateWorkspaceSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkspaceSettingMutation, UpdateWorkspaceSettingMutationVariables>(UpdateWorkspaceSettingDocument, options);
      }
export type UpdateWorkspaceSettingMutationHookResult = ReturnType<typeof useUpdateWorkspaceSettingMutation>;
export type UpdateWorkspaceSettingMutationResult = Apollo.MutationResult<UpdateWorkspaceSettingMutation>;
export type UpdateWorkspaceSettingMutationOptions = Apollo.BaseMutationOptions<UpdateWorkspaceSettingMutation, UpdateWorkspaceSettingMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;