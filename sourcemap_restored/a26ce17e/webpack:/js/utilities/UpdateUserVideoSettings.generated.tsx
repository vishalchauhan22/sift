import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserVideoSettingsMutationVariables = Types.Exact<{
  videoSettings: Types.UserVideoSettingsInput;
}>;


export type UpdateUserVideoSettingsMutation = { __typename: 'Mutation', updateUserVideoSettings: { __typename: 'GenericError' } | { __typename: 'UpdateUserVideoSettingsPayload', user: { __typename: 'RegularUser', id: string, videoSettings: { __typename: 'UserVideoSettings', auto_filler_word_removal: boolean | null, auto_silence_removal: boolean | null, show_transcript_to_viewer: boolean | null, show_analytics_to_viewer: boolean | null, suggested_playback_rate: Types.SuggestedPlaybackRate | null, download_enabled: boolean | null, record_reply_enabled: boolean | null, viewers_can_weave_default: boolean | null, comments_enabled: boolean | null, comments_email_enabled: boolean | null, use_emojis: boolean | null, use_gif: boolean | null, auto_cta: boolean | null, auto_title: boolean | null, auto_eovn: boolean | null, auto_summary: boolean | null, auto_chapters: boolean | null, auto_tasks: boolean | null, loom_branded_player: boolean | null, noise_suppression: boolean | null, email_gate_video_type: Types.EmailGateVideoType | null, salesforce_engagement_tracking: boolean | null, stylizedCaptions: boolean | null, viewerCaptionsOn: boolean | null } | null } | null } | { __typename: 'UserNotAuthorizedError' } | null };


export const UpdateUserVideoSettingsDocument = gql`
    mutation UpdateUserVideoSettings($videoSettings: UserVideoSettingsInput!) {
  updateUserVideoSettings(videoSettings: $videoSettings) {
    __typename
    ... on UpdateUserVideoSettingsPayload {
      user {
        id
        videoSettings {
          auto_filler_word_removal
          auto_silence_removal
          show_transcript_to_viewer
          show_analytics_to_viewer
          suggested_playback_rate
          download_enabled
          record_reply_enabled
          viewers_can_weave_default
          comments_enabled
          comments_email_enabled
          use_emojis
          use_gif
          auto_cta
          auto_title
          auto_eovn
          auto_summary
          auto_chapters
          auto_tasks
          loom_branded_player
          noise_suppression
          email_gate_video_type
          salesforce_engagement_tracking
          stylizedCaptions
          viewerCaptionsOn
        }
      }
    }
  }
}
    `;
export type UpdateUserVideoSettingsMutationFn = Apollo.MutationFunction<UpdateUserVideoSettingsMutation, UpdateUserVideoSettingsMutationVariables>;

/**
 * __useUpdateUserVideoSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserVideoSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserVideoSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserVideoSettingsMutation, { data, loading, error }] = useUpdateUserVideoSettingsMutation({
 *   variables: {
 *      videoSettings: // value for 'videoSettings'
 *   },
 * });
 */
export function useUpdateUserVideoSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserVideoSettingsMutation, UpdateUserVideoSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserVideoSettingsMutation, UpdateUserVideoSettingsMutationVariables>(UpdateUserVideoSettingsDocument, options);
      }
export type UpdateUserVideoSettingsMutationHookResult = ReturnType<typeof useUpdateUserVideoSettingsMutation>;
export type UpdateUserVideoSettingsMutationResult = Apollo.MutationResult<UpdateUserVideoSettingsMutation>;
export type UpdateUserVideoSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateUserVideoSettingsMutation, UpdateUserVideoSettingsMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;