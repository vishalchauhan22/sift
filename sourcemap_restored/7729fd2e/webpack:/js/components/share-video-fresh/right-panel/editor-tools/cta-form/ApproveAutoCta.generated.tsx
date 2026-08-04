import * as Types from '../../../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ApproveAutoCtaMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
}>;


export type ApproveAutoCtaMutation = { __typename: 'Mutation', approveAutoCta: { __typename: 'ApproveAutoCtaPayload', approved_at: string | null } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const ApproveAutoCtaDocument = gql`
    mutation ApproveAutoCta($videoId: ID!) {
  approveAutoCta(videoId: $videoId) {
    __typename
    ... on ApproveAutoCtaPayload {
      approved_at
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
export type ApproveAutoCtaMutationFn = Apollo.MutationFunction<ApproveAutoCtaMutation, ApproveAutoCtaMutationVariables>;

/**
 * __useApproveAutoCtaMutation__
 *
 * To run a mutation, you first call `useApproveAutoCtaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveAutoCtaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveAutoCtaMutation, { data, loading, error }] = useApproveAutoCtaMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useApproveAutoCtaMutation(baseOptions?: Apollo.MutationHookOptions<ApproveAutoCtaMutation, ApproveAutoCtaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveAutoCtaMutation, ApproveAutoCtaMutationVariables>(ApproveAutoCtaDocument, options);
      }
export type ApproveAutoCtaMutationHookResult = ReturnType<typeof useApproveAutoCtaMutation>;
export type ApproveAutoCtaMutationResult = Apollo.MutationResult<ApproveAutoCtaMutation>;
export type ApproveAutoCtaMutationOptions = Apollo.BaseMutationOptions<ApproveAutoCtaMutation, ApproveAutoCtaMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;