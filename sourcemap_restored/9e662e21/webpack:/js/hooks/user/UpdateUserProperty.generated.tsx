import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserPropertyMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  value: Types.Scalars['BasicScalar']['input'];
}>;


export type UpdateUserPropertyMutation = { __typename: 'Mutation', result: { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UpdatedPersonProperty', created: boolean | null, updated: boolean | null, property: { __typename: 'PersonProperty', name: string | null, value: unknown | null } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const UpdateUserPropertyDocument = gql`
    mutation UpdateUserProperty($name: String!, $value: BasicScalar!) {
  result: updateUserProperty(name: $name, value: $value) {
    ... on UpdatedPersonProperty {
      property {
        name
        value
      }
      created
      updated
    }
  }
}
    `;
export type UpdateUserPropertyMutationFn = Apollo.MutationFunction<UpdateUserPropertyMutation, UpdateUserPropertyMutationVariables>;

/**
 * __useUpdateUserPropertyMutation__
 *
 * To run a mutation, you first call `useUpdateUserPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPropertyMutation, { data, loading, error }] = useUpdateUserPropertyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateUserPropertyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPropertyMutation, UpdateUserPropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPropertyMutation, UpdateUserPropertyMutationVariables>(UpdateUserPropertyDocument, options);
      }
export type UpdateUserPropertyMutationHookResult = ReturnType<typeof useUpdateUserPropertyMutation>;
export type UpdateUserPropertyMutationResult = Apollo.MutationResult<UpdateUserPropertyMutation>;
export type UpdateUserPropertyMutationOptions = Apollo.BaseMutationOptions<UpdateUserPropertyMutation, UpdateUserPropertyMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;