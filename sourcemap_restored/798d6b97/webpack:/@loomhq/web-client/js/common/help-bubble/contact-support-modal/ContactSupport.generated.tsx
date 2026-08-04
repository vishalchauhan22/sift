import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContactSupportMutationVariables = Types.Exact<{
  subject: Types.Scalars['String']['input'];
  category: Types.Scalars['String']['input'];
  issue?: Types.InputMaybe<Types.Scalars['String']['input']>;
  platform?: Types.InputMaybe<Types.Scalars['String']['input']>;
  priority?: Types.InputMaybe<Types.Scalars['String']['input']>;
  message: Types.Scalars['String']['input'];
  videoUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
  permissionToImpersonate: Types.Scalars['Boolean']['input'];
  chatHistory?: Types.InputMaybe<Types.Scalars['String']['input']>;
  userLocale: Types.Scalars['String']['input'];
  userTimezoneOffset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  conversationId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type ContactSupportMutation = { __typename: 'Mutation', createSupportTicket: { __typename: 'CreateSupportTicketPayload', success: boolean } | { __typename: 'GenericError', message: string } | { __typename: 'UserNotAuthorizedError' } | null };


export const ContactSupportDocument = gql`
    mutation ContactSupport($subject: String!, $category: String!, $issue: String, $platform: String, $priority: String, $message: String!, $videoUrl: String, $permissionToImpersonate: Boolean!, $chatHistory: String, $userLocale: String!, $userTimezoneOffset: Int, $conversationId: ID) {
  createSupportTicket(
    subject: $subject
    category: $category
    issue: $issue
    platform: $platform
    priority: $priority
    message: $message
    videoUrl: $videoUrl
    permissionToImpersonate: $permissionToImpersonate
    chatHistory: $chatHistory
    userLocale: $userLocale
    userTimezoneOffset: $userTimezoneOffset
    conversationId: $conversationId
  ) {
    ... on CreateSupportTicketPayload {
      success
    }
    ... on GenericError {
      message
    }
  }
}
    `;
export type ContactSupportMutationFn = Apollo.MutationFunction<ContactSupportMutation, ContactSupportMutationVariables>;

/**
 * __useContactSupportMutation__
 *
 * To run a mutation, you first call `useContactSupportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactSupportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactSupportMutation, { data, loading, error }] = useContactSupportMutation({
 *   variables: {
 *      subject: // value for 'subject'
 *      category: // value for 'category'
 *      issue: // value for 'issue'
 *      platform: // value for 'platform'
 *      priority: // value for 'priority'
 *      message: // value for 'message'
 *      videoUrl: // value for 'videoUrl'
 *      permissionToImpersonate: // value for 'permissionToImpersonate'
 *      chatHistory: // value for 'chatHistory'
 *      userLocale: // value for 'userLocale'
 *      userTimezoneOffset: // value for 'userTimezoneOffset'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useContactSupportMutation(baseOptions?: Apollo.MutationHookOptions<ContactSupportMutation, ContactSupportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactSupportMutation, ContactSupportMutationVariables>(ContactSupportDocument, options);
      }
export type ContactSupportMutationHookResult = ReturnType<typeof useContactSupportMutation>;
export type ContactSupportMutationResult = Apollo.MutationResult<ContactSupportMutation>;
export type ContactSupportMutationOptions = Apollo.BaseMutationOptions<ContactSupportMutation, ContactSupportMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;