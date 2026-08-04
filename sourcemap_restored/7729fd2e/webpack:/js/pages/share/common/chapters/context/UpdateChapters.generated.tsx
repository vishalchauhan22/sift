import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateChaptersMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  content: Types.Scalars['String']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateChaptersMutation = { __typename: 'Mutation', updateChapters: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | { __typename: 'VideoChapters', id: string, video_id: string, content: string | null, schema_version: string | null, updatedAt: string | null, edited_at: string | null, auto_chapter_status: Types.AutoChapterStatusesType | null } | null };


export const UpdateChaptersDocument = gql`
    mutation UpdateChapters($videoId: ID!, $content: String!, $password: String) {
  updateChapters(videoId: $videoId, content: $content, password: $password) {
    ... on VideoChapters {
      id
      video_id
      content
      schema_version
      updatedAt
      edited_at
      auto_chapter_status
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on GenericError {
      message
    }
  }
}
    `;
export type UpdateChaptersMutationFn = Apollo.MutationFunction<UpdateChaptersMutation, UpdateChaptersMutationVariables>;

/**
 * __useUpdateChaptersMutation__
 *
 * To run a mutation, you first call `useUpdateChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChaptersMutation, { data, loading, error }] = useUpdateChaptersMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      content: // value for 'content'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateChaptersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChaptersMutation, UpdateChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChaptersMutation, UpdateChaptersMutationVariables>(UpdateChaptersDocument, options);
      }
export type UpdateChaptersMutationHookResult = ReturnType<typeof useUpdateChaptersMutation>;
export type UpdateChaptersMutationResult = Apollo.MutationResult<UpdateChaptersMutation>;
export type UpdateChaptersMutationOptions = Apollo.BaseMutationOptions<UpdateChaptersMutation, UpdateChaptersMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;