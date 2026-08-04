import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AssetFragment = { __typename: 'Asset', id: string | null, s3Id: string | null, uploadedFileName: string | null, lastUsedAt: string | null, fileType: string | null, uploadLocation: string | null, srcUrl: string | null };

export type AddAssetMutationVariables = Types.Exact<{
  s3Id: Types.Scalars['ID']['input'];
  uploadedFileName: Types.Scalars['String']['input'];
  uploadLocation: Types.Scalars['String']['input'];
}>;


export type AddAssetMutation = { __typename: 'Mutation', addAsset: { __typename: 'AddAssetPayload', asset: { __typename: 'Asset', id: string | null, s3Id: string | null, uploadedFileName: string | null, lastUsedAt: string | null, fileType: string | null, uploadLocation: string | null, srcUrl: string | null } } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };

export const AssetFragmentDoc = gql`
    fragment Asset on Asset {
  id
  s3Id
  uploadedFileName
  lastUsedAt
  fileType
  uploadLocation
  srcUrl
}
    `;
export const AddAssetDocument = gql`
    mutation AddAsset($s3Id: ID!, $uploadedFileName: String!, $uploadLocation: String!) {
  addAsset(
    s3Id: $s3Id
    uploadedFileName: $uploadedFileName
    uploadLocation: $uploadLocation
  ) {
    __typename
    ... on AddAssetPayload {
      asset {
        ...Asset
      }
    }
    ... on Error {
      message
    }
  }
}
    ${AssetFragmentDoc}`;
export type AddAssetMutationFn = Apollo.MutationFunction<AddAssetMutation, AddAssetMutationVariables>;

/**
 * __useAddAssetMutation__
 *
 * To run a mutation, you first call `useAddAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssetMutation, { data, loading, error }] = useAddAssetMutation({
 *   variables: {
 *      s3Id: // value for 's3Id'
 *      uploadedFileName: // value for 'uploadedFileName'
 *      uploadLocation: // value for 'uploadLocation'
 *   },
 * });
 */
export function useAddAssetMutation(baseOptions?: Apollo.MutationHookOptions<AddAssetMutation, AddAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAssetMutation, AddAssetMutationVariables>(AddAssetDocument, options);
      }
export type AddAssetMutationHookResult = ReturnType<typeof useAddAssetMutation>;
export type AddAssetMutationResult = Apollo.MutationResult<AddAssetMutation>;
export type AddAssetMutationOptions = Apollo.BaseMutationOptions<AddAssetMutation, AddAssetMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;