import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVideoNameMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  name: Types.Scalars['String']['input'];
  force?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UpdateVideoNameMutation = { __typename: 'Mutation', result: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string, failedFields: Array<{ __typename: 'FailedFormFields', field: string, message: string } | null> | null } | { __typename: 'UpdateVideoNamePayload', video: { __typename: 'RegularUserVideo', id: string, name: string } | null } | { __typename: 'UserNotAuthorizedError' } | { __typename: 'VideoNotFoundError' } | null };


export const UpdateVideoNameDocument = gql`
    mutation UpdateVideoName($id: ID!, $name: String!, $force: Boolean) {
  result: updateVideoName(id: $id, name: $name, force: $force) {
    ... on GenericError {
      message
    }
    ... on InputValidationError {
      message
      failedFields {
        field
        message
      }
    }
    ... on UpdateVideoNamePayload {
      __typename
      video {
        id
        name
      }
    }
  }
}
    `;
export type UpdateVideoNameMutationFn = Apollo.MutationFunction<UpdateVideoNameMutation, UpdateVideoNameMutationVariables>;

/**
 * __useUpdateVideoNameMutation__
 *
 * To run a mutation, you first call `useUpdateVideoNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoNameMutation, { data, loading, error }] = useUpdateVideoNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      force: // value for 'force'
 *   },
 * });
 */
export function useUpdateVideoNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoNameMutation, UpdateVideoNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoNameMutation, UpdateVideoNameMutationVariables>(UpdateVideoNameDocument, options);
      }
export type UpdateVideoNameMutationHookResult = ReturnType<typeof useUpdateVideoNameMutation>;
export type UpdateVideoNameMutationResult = Apollo.MutationResult<UpdateVideoNameMutation>;
export type UpdateVideoNameMutationOptions = Apollo.BaseMutationOptions<UpdateVideoNameMutation, UpdateVideoNameMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;