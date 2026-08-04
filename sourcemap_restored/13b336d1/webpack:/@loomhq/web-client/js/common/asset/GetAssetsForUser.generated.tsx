import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import { AssetFragmentDoc } from './AddAsset.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAssetsForUserQueryVariables = Types.Exact<{
  uploadLocation?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAssetsForUserQuery = { __typename: 'Query', getAssetsForUser: { __typename: 'GenericError', message: string } | { __typename: 'GetAssetsForUserPayload', assets: Array<{ __typename: 'Asset', id: string | null, s3Id: string | null, uploadedFileName: string | null, lastUsedAt: string | null, fileType: string | null, uploadLocation: string | null, srcUrl: string | null }> } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const GetAssetsForUserDocument = gql`
    query GetAssetsForUser($uploadLocation: String) {
  getAssetsForUser(uploadLocation: $uploadLocation) {
    __typename
    ... on GetAssetsForUserPayload {
      assets {
        ...Asset
      }
    }
    ... on Error {
      message
    }
  }
}
    ${AssetFragmentDoc}`;

/**
 * __useGetAssetsForUserQuery__
 *
 * To run a query within a React component, call `useGetAssetsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetsForUserQuery({
 *   variables: {
 *      uploadLocation: // value for 'uploadLocation'
 *   },
 * });
 */
export function useGetAssetsForUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsForUserQuery, GetAssetsForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsForUserQuery, GetAssetsForUserQueryVariables>(GetAssetsForUserDocument, options);
      }
export function useGetAssetsForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsForUserQuery, GetAssetsForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsForUserQuery, GetAssetsForUserQueryVariables>(GetAssetsForUserDocument, options);
        }
export type GetAssetsForUserQueryHookResult = ReturnType<typeof useGetAssetsForUserQuery>;
export type GetAssetsForUserLazyQueryHookResult = ReturnType<typeof useGetAssetsForUserLazyQuery>;
export type GetAssetsForUserQueryResult = Apollo.QueryResult<GetAssetsForUserQuery, GetAssetsForUserQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;