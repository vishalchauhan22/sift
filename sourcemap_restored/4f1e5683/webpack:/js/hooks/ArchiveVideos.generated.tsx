import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArchiveVideosMutationVariables = Types.Exact<{
  videoIds: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
  isArchived: Types.Scalars['Boolean']['input'];
}>;


export type ArchiveVideosMutation = { __typename: 'Mutation', result: { __typename: 'ArchiveVideosPayload', videos: Array<{ __typename: 'RegularUserVideo', id: string }> | null } | { __typename: 'GenericError' } | { __typename: 'InputValidationError' } | { __typename: 'UserNotAuthorizedError' } | null };


export const ArchiveVideosDocument = gql`
    mutation ArchiveVideos($videoIds: [ID!]!, $isArchived: Boolean!) {
  result: archiveVideos(videoIds: $videoIds, isArchived: $isArchived) {
    ... on ArchiveVideosPayload {
      videos {
        id
      }
    }
  }
}
    `;
export type ArchiveVideosMutationFn = Apollo.MutationFunction<ArchiveVideosMutation, ArchiveVideosMutationVariables>;

/**
 * __useArchiveVideosMutation__
 *
 * To run a mutation, you first call `useArchiveVideosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveVideosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveVideosMutation, { data, loading, error }] = useArchiveVideosMutation({
 *   variables: {
 *      videoIds: // value for 'videoIds'
 *      isArchived: // value for 'isArchived'
 *   },
 * });
 */
export function useArchiveVideosMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveVideosMutation, ArchiveVideosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveVideosMutation, ArchiveVideosMutationVariables>(ArchiveVideosDocument, options);
      }
export type ArchiveVideosMutationHookResult = ReturnType<typeof useArchiveVideosMutation>;
export type ArchiveVideosMutationResult = Apollo.MutationResult<ArchiveVideosMutation>;
export type ArchiveVideosMutationOptions = Apollo.BaseMutationOptions<ArchiveVideosMutation, ArchiveVideosMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;