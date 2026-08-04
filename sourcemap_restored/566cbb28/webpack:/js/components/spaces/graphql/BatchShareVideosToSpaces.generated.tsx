import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BatchShareVideosToSpacesMutationVariables = Types.Exact<{
  videoIds: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
  spaceIds: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
}>;


export type BatchShareVideosToSpacesMutation = { __typename: 'Mutation', batchShareVideosToSpaces: { __typename: 'BatchShareVideosToSpacesPayload', success: boolean | null } | { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const BatchShareVideosToSpacesDocument = gql`
    mutation BatchShareVideosToSpaces($videoIds: [ID!]!, $spaceIds: [ID!]!) {
  batchShareVideosToSpaces(videoIds: $videoIds, spaceIds: $spaceIds) {
    __typename
    ... on BatchShareVideosToSpacesPayload {
      __typename
      success
    }
    ... on Error {
      message
    }
  }
}
    `;
export type BatchShareVideosToSpacesMutationFn = Apollo.MutationFunction<BatchShareVideosToSpacesMutation, BatchShareVideosToSpacesMutationVariables>;

/**
 * __useBatchShareVideosToSpacesMutation__
 *
 * To run a mutation, you first call `useBatchShareVideosToSpacesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBatchShareVideosToSpacesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [batchShareVideosToSpacesMutation, { data, loading, error }] = useBatchShareVideosToSpacesMutation({
 *   variables: {
 *      videoIds: // value for 'videoIds'
 *      spaceIds: // value for 'spaceIds'
 *   },
 * });
 */
export function useBatchShareVideosToSpacesMutation(baseOptions?: Apollo.MutationHookOptions<BatchShareVideosToSpacesMutation, BatchShareVideosToSpacesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BatchShareVideosToSpacesMutation, BatchShareVideosToSpacesMutationVariables>(BatchShareVideosToSpacesDocument, options);
      }
export type BatchShareVideosToSpacesMutationHookResult = ReturnType<typeof useBatchShareVideosToSpacesMutation>;
export type BatchShareVideosToSpacesMutationResult = Apollo.MutationResult<BatchShareVideosToSpacesMutation>;
export type BatchShareVideosToSpacesMutationOptions = Apollo.BaseMutationOptions<BatchShareVideosToSpacesMutation, BatchShareVideosToSpacesMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;