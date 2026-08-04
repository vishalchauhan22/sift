import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteAssetMutationVariables = Types.Exact<{
  assetId: Types.Scalars['ID']['input'];
}>;


export type DeleteAssetMutation = { __typename: 'Mutation', deleteAsset: { __typename: 'DeleteAssetPayload', asset: { __typename: 'Asset', id: string | null, s3Id: string | null, uploadedFileName: string | null, lastUsedAt: string | null, fileType: string | null, uploadLocation: string | null } } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const DeleteAssetDocument = gql`
    mutation DeleteAsset($assetId: ID!) {
  deleteAsset(assetId: $assetId) {
    __typename
    ... on DeleteAssetPayload {
      asset {
        id
        s3Id
        uploadedFileName
        lastUsedAt
        fileType
        uploadLocation
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export type DeleteAssetMutationFn = Apollo.MutationFunction<DeleteAssetMutation, DeleteAssetMutationVariables>;

/**
 * __useDeleteAssetMutation__
 *
 * To run a mutation, you first call `useDeleteAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssetMutation, { data, loading, error }] = useDeleteAssetMutation({
 *   variables: {
 *      assetId: // value for 'assetId'
 *   },
 * });
 */
export function useDeleteAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssetMutation, DeleteAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssetMutation, DeleteAssetMutationVariables>(DeleteAssetDocument, options);
      }
export type DeleteAssetMutationHookResult = ReturnType<typeof useDeleteAssetMutation>;
export type DeleteAssetMutationResult = Apollo.MutationResult<DeleteAssetMutation>;
export type DeleteAssetMutationOptions = Apollo.BaseMutationOptions<DeleteAssetMutation, DeleteAssetMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;