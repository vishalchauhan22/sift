import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVideoCtaMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  cta: Types.CtaInput;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateVideoCtaMutation = { __typename: 'Mutation', updateVideoCta: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UpdateVideoCtaPayload', video: { __typename: 'RegularUserVideo', id: string, cta: { __typename: 'CTA', url: string | null, text: string | null, enabled: boolean, is_auto: boolean | null, approved_at: string | null, mods: unknown | null } } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const UpdateVideoCtaDocument = gql`
    mutation UpdateVideoCta($videoId: ID!, $cta: CtaInput!, $password: String) {
  updateVideoCta(videoId: $videoId, cta: $cta, password: $password) {
    __typename
    ... on UpdateVideoCtaPayload {
      video {
        id
        cta {
          url
          text
          enabled
          is_auto
          approved_at
          mods
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
export type UpdateVideoCtaMutationFn = Apollo.MutationFunction<UpdateVideoCtaMutation, UpdateVideoCtaMutationVariables>;

/**
 * __useUpdateVideoCtaMutation__
 *
 * To run a mutation, you first call `useUpdateVideoCtaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoCtaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoCtaMutation, { data, loading, error }] = useUpdateVideoCtaMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      cta: // value for 'cta'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateVideoCtaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoCtaMutation, UpdateVideoCtaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoCtaMutation, UpdateVideoCtaMutationVariables>(UpdateVideoCtaDocument, options);
      }
export type UpdateVideoCtaMutationHookResult = ReturnType<typeof useUpdateVideoCtaMutation>;
export type UpdateVideoCtaMutationResult = Apollo.MutationResult<UpdateVideoCtaMutation>;
export type UpdateVideoCtaMutationOptions = Apollo.BaseMutationOptions<UpdateVideoCtaMutation, UpdateVideoCtaMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;