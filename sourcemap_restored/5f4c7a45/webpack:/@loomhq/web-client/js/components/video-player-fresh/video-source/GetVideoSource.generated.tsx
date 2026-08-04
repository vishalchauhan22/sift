import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoSourceQueryVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  acceptableMimes?: Types.InputMaybe<Array<Types.InputMaybe<Types.CloudfrontVideoAcceptableMime>> | Types.InputMaybe<Types.CloudfrontVideoAcceptableMime>>;
}>;


export type GetVideoSourceQuery = { __typename: 'Query', getVideo: { __typename: 'PrivateVideo' } | { __typename: 'RegularUserVideo', id: string, nullableRawCdnUrl: { __typename: 'CloudfrontSignedUrlPayload', url: string, credentials: { __typename: 'CloudfrontSignedCredentialsPayload', Policy: string | null, Signature: string | null, KeyPairId: string | null } } | null } | { __typename: 'VideoPasswordMissingOrIncorrect' } | null };


export const GetVideoSourceDocument = gql`
    query GetVideoSource($videoId: ID!, $password: String, $acceptableMimes: [CloudfrontVideoAcceptableMime]) {
  getVideo(id: $videoId, password: $password) {
    ... on RegularUserVideo {
      id
      nullableRawCdnUrl(acceptableMimes: $acceptableMimes, password: $password) {
        url
        credentials {
          Policy
          Signature
          KeyPairId
        }
      }
    }
  }
}
    `;

/**
 * __useGetVideoSourceQuery__
 *
 * To run a query within a React component, call `useGetVideoSourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoSourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoSourceQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *      acceptableMimes: // value for 'acceptableMimes'
 *   },
 * });
 */
export function useGetVideoSourceQuery(baseOptions: Apollo.QueryHookOptions<GetVideoSourceQuery, GetVideoSourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoSourceQuery, GetVideoSourceQueryVariables>(GetVideoSourceDocument, options);
      }
export function useGetVideoSourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoSourceQuery, GetVideoSourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoSourceQuery, GetVideoSourceQueryVariables>(GetVideoSourceDocument, options);
        }
export type GetVideoSourceQueryHookResult = ReturnType<typeof useGetVideoSourceQuery>;
export type GetVideoSourceLazyQueryHookResult = ReturnType<typeof useGetVideoSourceLazyQuery>;
export type GetVideoSourceQueryResult = Apollo.QueryResult<GetVideoSourceQuery, GetVideoSourceQueryVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;