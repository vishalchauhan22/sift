import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import { ConsolidatedEditVideoTrimsFragmentDoc } from '../ConsolidatedEditVideoFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TrimDisfluenciesMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type TrimDisfluenciesMutation = { __typename: 'Mutation', trimDisfluencies: { __typename: 'GenericError', message: string } | { __typename: 'InputValidationError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'TrimDisfluenciesPayload', wordsRemoved: number | null, video: { __typename: 'RegularUserVideo', id: string, source_duration: number | null, playable_duration: number | null, boundedTrimRanges: Array<{ __typename: 'VideoTrimRange', from: number, to: number }>, processing_information: { __typename: 'ProcessingInformation', trim_id: number | null } } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const TrimDisfluenciesDocument = gql`
    mutation TrimDisfluencies($videoId: ID!, $password: String) {
  trimDisfluencies(videoId: $videoId, password: $password) {
    __typename
    ... on TrimDisfluenciesPayload {
      video {
        ...ConsolidatedEditVideoTrims
      }
      wordsRemoved
    }
    ... on InvalidRequestWarning {
      message
    }
    ... on GenericError {
      message
    }
    ... on UserNotAuthorizedError {
      message
    }
    ... on InputValidationError {
      message
    }
  }
}
    ${ConsolidatedEditVideoTrimsFragmentDoc}`;
export type TrimDisfluenciesMutationFn = Apollo.MutationFunction<TrimDisfluenciesMutation, TrimDisfluenciesMutationVariables>;

/**
 * __useTrimDisfluenciesMutation__
 *
 * To run a mutation, you first call `useTrimDisfluenciesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrimDisfluenciesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trimDisfluenciesMutation, { data, loading, error }] = useTrimDisfluenciesMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTrimDisfluenciesMutation(baseOptions?: Apollo.MutationHookOptions<TrimDisfluenciesMutation, TrimDisfluenciesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrimDisfluenciesMutation, TrimDisfluenciesMutationVariables>(TrimDisfluenciesDocument, options);
      }
export type TrimDisfluenciesMutationHookResult = ReturnType<typeof useTrimDisfluenciesMutation>;
export type TrimDisfluenciesMutationResult = Apollo.MutationResult<TrimDisfluenciesMutation>;
export type TrimDisfluenciesMutationOptions = Apollo.BaseMutationOptions<TrimDisfluenciesMutation, TrimDisfluenciesMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;