import * as Types from '../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContactSupportNonLoggedInUserMutationVariables = Types.Exact<{
  subject: Types.Scalars['String']['input'];
  category: Types.Scalars['String']['input'];
  issue?: Types.InputMaybe<Types.Scalars['String']['input']>;
  platform?: Types.InputMaybe<Types.Scalars['String']['input']>;
  message: Types.Scalars['String']['input'];
  videoUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
  permissionToImpersonate: Types.Scalars['Boolean']['input'];
  chatHistory?: Types.InputMaybe<Types.Scalars['String']['input']>;
  userLocale: Types.Scalars['String']['input'];
  userTimezoneOffset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  email: Types.Scalars['String']['input'];
  conversationId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type ContactSupportNonLoggedInUserMutation = { __typename: 'Mutation', createSupportTicketNonLoggedInUser: { __typename: 'CreateSupportTicketNonLoggedInUserPayload', success: boolean } | { __typename: 'GenericError', message: string } | null };


export const ContactSupportNonLoggedInUserDocument = gql`
    mutation ContactSupportNonLoggedInUser($subject: String!, $category: String!, $issue: String, $platform: String, $message: String!, $videoUrl: String, $permissionToImpersonate: Boolean!, $chatHistory: String, $userLocale: String!, $userTimezoneOffset: Int, $email: String!, $conversationId: ID) {
  createSupportTicketNonLoggedInUser(
    subject: $subject
    category: $category
    issue: $issue
    platform: $platform
    message: $message
    videoUrl: $videoUrl
    permissionToImpersonate: $permissionToImpersonate
    chatHistory: $chatHistory
    userLocale: $userLocale
    userTimezoneOffset: $userTimezoneOffset
    email: $email
    conversationId: $conversationId
  ) {
    ... on CreateSupportTicketNonLoggedInUserPayload {
      success
    }
    ... on Error {
      message
    }
  }
}
    `;
export type ContactSupportNonLoggedInUserMutationFn = Apollo.MutationFunction<ContactSupportNonLoggedInUserMutation, ContactSupportNonLoggedInUserMutationVariables>;

/**
 * __useContactSupportNonLoggedInUserMutation__
 *
 * To run a mutation, you first call `useContactSupportNonLoggedInUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactSupportNonLoggedInUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactSupportNonLoggedInUserMutation, { data, loading, error }] = useContactSupportNonLoggedInUserMutation({
 *   variables: {
 *      subject: // value for 'subject'
 *      category: // value for 'category'
 *      issue: // value for 'issue'
 *      platform: // value for 'platform'
 *      message: // value for 'message'
 *      videoUrl: // value for 'videoUrl'
 *      permissionToImpersonate: // value for 'permissionToImpersonate'
 *      chatHistory: // value for 'chatHistory'
 *      userLocale: // value for 'userLocale'
 *      userTimezoneOffset: // value for 'userTimezoneOffset'
 *      email: // value for 'email'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useContactSupportNonLoggedInUserMutation(baseOptions?: Apollo.MutationHookOptions<ContactSupportNonLoggedInUserMutation, ContactSupportNonLoggedInUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactSupportNonLoggedInUserMutation, ContactSupportNonLoggedInUserMutationVariables>(ContactSupportNonLoggedInUserDocument, options);
      }
export type ContactSupportNonLoggedInUserMutationHookResult = ReturnType<typeof useContactSupportNonLoggedInUserMutation>;
export type ContactSupportNonLoggedInUserMutationResult = Apollo.MutationResult<ContactSupportNonLoggedInUserMutation>;
export type ContactSupportNonLoggedInUserMutationOptions = Apollo.BaseMutationOptions<ContactSupportNonLoggedInUserMutation, ContactSupportNonLoggedInUserMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;