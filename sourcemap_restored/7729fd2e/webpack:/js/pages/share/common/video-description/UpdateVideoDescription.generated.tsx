import * as Types from '../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVideoDescriptionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  description: Types.Scalars['String']['input'];
}>;


export type UpdateVideoDescriptionMutation = { __typename: 'Mutation', updateVideoDescriptionV2: { __typename: 'GenericError' } | { __typename: 'InvalidRequestWarning' } | { __typename: 'RegularUserVideo', id: string, description: string | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const UpdateVideoDescriptionDocument = gql`
    mutation UpdateVideoDescription($id: ID!, $description: String!) {
  updateVideoDescriptionV2(id: $id, description: $description) {
    ... on RegularUserVideo {
      id
      description
    }
  }
}
    `;
export type UpdateVideoDescriptionMutationFn = Apollo.MutationFunction<UpdateVideoDescriptionMutation, UpdateVideoDescriptionMutationVariables>;

/**
 * __useUpdateVideoDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateVideoDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoDescriptionMutation, { data, loading, error }] = useUpdateVideoDescriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateVideoDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoDescriptionMutation, UpdateVideoDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoDescriptionMutation, UpdateVideoDescriptionMutationVariables>(UpdateVideoDescriptionDocument, options);
      }
export type UpdateVideoDescriptionMutationHookResult = ReturnType<typeof useUpdateVideoDescriptionMutation>;
export type UpdateVideoDescriptionMutationResult = Apollo.MutationResult<UpdateVideoDescriptionMutation>;
export type UpdateVideoDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateVideoDescriptionMutation, UpdateVideoDescriptionMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;