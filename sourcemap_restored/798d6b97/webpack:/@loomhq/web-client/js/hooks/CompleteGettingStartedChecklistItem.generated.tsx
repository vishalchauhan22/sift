import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompleteGettingStartedChecklistItemMutationVariables = Types.Exact<{
  checklistItem: Types.ChecklistItem;
}>;


export type CompleteGettingStartedChecklistItemMutation = { __typename: 'Mutation', result: { __typename: 'GenericError', message: string } | { __typename: 'GettingStartedChecklistPayload', id: string, add_teammate: boolean | null, complete_onboarding: boolean | null, create_account: boolean | null, customize_video_name: boolean | null, download_recorder: boolean | null, email_verified: boolean | null, filled_account_settings: boolean | null, first_cam_recording: boolean | null, first_video_recording: boolean | null, first_video_upload: boolean | null, first_video_viewed: boolean | null, followed_us_on_twitter: boolean | null, has_reached_recording_limit: boolean | null, has_viewed_screenshots: boolean | null, liked_us_on_facebook: boolean | null, push_notification_enabled: boolean | null, share_video: boolean | null, shared_first_video_on_facebook: boolean | null, tweeted_first_video: boolean | null, has_viewed_videos: boolean | null, meeting_recording: boolean | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const CompleteGettingStartedChecklistItemDocument = gql`
    mutation CompleteGettingStartedChecklistItem($checklistItem: ChecklistItem!) {
  result: completeGettingStartedChecklistItem(checklistItem: $checklistItem) {
    ... on GettingStartedChecklistPayload {
      id
      add_teammate
      complete_onboarding
      create_account
      customize_video_name
      download_recorder
      email_verified
      filled_account_settings
      first_cam_recording
      first_video_recording
      first_video_upload
      first_video_viewed
      followed_us_on_twitter
      has_reached_recording_limit
      has_viewed_screenshots
      liked_us_on_facebook
      push_notification_enabled
      share_video
      shared_first_video_on_facebook
      tweeted_first_video
      has_viewed_videos
      meeting_recording
    }
    ... on Error {
      message
    }
  }
}
    `;
export type CompleteGettingStartedChecklistItemMutationFn = Apollo.MutationFunction<CompleteGettingStartedChecklistItemMutation, CompleteGettingStartedChecklistItemMutationVariables>;

/**
 * __useCompleteGettingStartedChecklistItemMutation__
 *
 * To run a mutation, you first call `useCompleteGettingStartedChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteGettingStartedChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeGettingStartedChecklistItemMutation, { data, loading, error }] = useCompleteGettingStartedChecklistItemMutation({
 *   variables: {
 *      checklistItem: // value for 'checklistItem'
 *   },
 * });
 */
export function useCompleteGettingStartedChecklistItemMutation(baseOptions?: Apollo.MutationHookOptions<CompleteGettingStartedChecklistItemMutation, CompleteGettingStartedChecklistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteGettingStartedChecklistItemMutation, CompleteGettingStartedChecklistItemMutationVariables>(CompleteGettingStartedChecklistItemDocument, options);
      }
export type CompleteGettingStartedChecklistItemMutationHookResult = ReturnType<typeof useCompleteGettingStartedChecklistItemMutation>;
export type CompleteGettingStartedChecklistItemMutationResult = Apollo.MutationResult<CompleteGettingStartedChecklistItemMutation>;
export type CompleteGettingStartedChecklistItemMutationOptions = Apollo.BaseMutationOptions<CompleteGettingStartedChecklistItemMutation, CompleteGettingStartedChecklistItemMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;