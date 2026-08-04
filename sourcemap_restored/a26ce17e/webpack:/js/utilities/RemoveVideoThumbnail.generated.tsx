import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveVideoThumbnailMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RemoveVideoThumbnailMutation = { __typename: 'Mutation', removeVideoThumbnail: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'RemoveVideoThumbnailPayload', video: { __typename: 'RegularUserVideo', id: string, thumbnails: { __typename: 'VideoThumbnailsSources', default: string | null, default4X3: string | null, defaultPlay: string | null, ogFull: string | null, full: string | null, fullPlay: string | null, defaultGif: string | null, defaultGifPlay: string | null, animatedPreview: string | null }, defaultThumbnails: { __typename: 'VideoDefaultThumbnailsSources', default: string, static: string | null } } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const RemoveVideoThumbnailDocument = gql`
    mutation RemoveVideoThumbnail($videoId: ID!, $password: String) {
  removeVideoThumbnail(videoId: $videoId, password: $password) {
    __typename
    ... on RemoveVideoThumbnailPayload {
      video {
        id
        thumbnails {
          default
          default4X3
          defaultPlay
          ogFull
          full
          fullPlay
          defaultGif
          defaultGifPlay
          animatedPreview
        }
        defaultThumbnails {
          default
          static
        }
      }
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on Error {
      message
    }
  }
}
    `;
export type RemoveVideoThumbnailMutationFn = Apollo.MutationFunction<RemoveVideoThumbnailMutation, RemoveVideoThumbnailMutationVariables>;

/**
 * __useRemoveVideoThumbnailMutation__
 *
 * To run a mutation, you first call `useRemoveVideoThumbnailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVideoThumbnailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVideoThumbnailMutation, { data, loading, error }] = useRemoveVideoThumbnailMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRemoveVideoThumbnailMutation(baseOptions?: Apollo.MutationHookOptions<RemoveVideoThumbnailMutation, RemoveVideoThumbnailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveVideoThumbnailMutation, RemoveVideoThumbnailMutationVariables>(RemoveVideoThumbnailDocument, options);
      }
export type RemoveVideoThumbnailMutationHookResult = ReturnType<typeof useRemoveVideoThumbnailMutation>;
export type RemoveVideoThumbnailMutationResult = Apollo.MutationResult<RemoveVideoThumbnailMutation>;
export type RemoveVideoThumbnailMutationOptions = Apollo.BaseMutationOptions<RemoveVideoThumbnailMutation, RemoveVideoThumbnailMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;