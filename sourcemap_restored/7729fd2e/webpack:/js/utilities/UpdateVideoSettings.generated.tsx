import * as Types from '../globalTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVideoSettingsMutationVariables = Types.Exact<{
  videoId: Types.Scalars['ID']['input'];
  settings: Types.VideoSettingsInput;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateVideoSettingsMutation = { __typename: 'Mutation', updateVideoSettings: { __typename: 'GenericError', message: string } | { __typename: 'InvalidRequestWarning', message: string } | { __typename: 'UpdateVideoSettingsPayload', video: { __typename: 'RegularUserVideo', id: string, comments_email_enabled: boolean, comments_enabled: boolean, download_enabled: boolean, loom_branded_player: boolean | null, record_reply_enabled: boolean, show_analytics_to_viewer: boolean, show_transcript_to_viewer: boolean, salesforce_engagement_tracking: boolean | null, suggested_playback_rate: Types.SuggestedPlaybackRate, use_emojis: boolean, use_gif: boolean, viewers_can_weave: boolean, stylizedCaptions: boolean, viewerCaptionsOn: boolean, processing_information: { __typename: 'ProcessingInformation', noise_cancellation_type: boolean | null } } | null } | { __typename: 'UserNotAuthorizedError', message: string } | null };


export const UpdateVideoSettingsDocument = gql`
    mutation UpdateVideoSettings($videoId: ID!, $settings: VideoSettingsInput!, $password: String) {
  updateVideoSettings(videoId: $videoId, settings: $settings, password: $password) {
    __typename
    ... on UpdateVideoSettingsPayload {
      video {
        id
        comments_email_enabled
        comments_enabled
        download_enabled
        loom_branded_player
        processing_information {
          noise_cancellation_type
        }
        record_reply_enabled
        show_analytics_to_viewer
        show_transcript_to_viewer
        salesforce_engagement_tracking
        suggested_playback_rate
        use_emojis
        use_gif
        viewers_can_weave
        stylizedCaptions
        viewerCaptionsOn
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
export type UpdateVideoSettingsMutationFn = Apollo.MutationFunction<UpdateVideoSettingsMutation, UpdateVideoSettingsMutationVariables>;

/**
 * __useUpdateVideoSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateVideoSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoSettingsMutation, { data, loading, error }] = useUpdateVideoSettingsMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      settings: // value for 'settings'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateVideoSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoSettingsMutation, UpdateVideoSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoSettingsMutation, UpdateVideoSettingsMutationVariables>(UpdateVideoSettingsDocument, options);
      }
export type UpdateVideoSettingsMutationHookResult = ReturnType<typeof useUpdateVideoSettingsMutation>;
export type UpdateVideoSettingsMutationResult = Apollo.MutationResult<UpdateVideoSettingsMutation>;
export type UpdateVideoSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateVideoSettingsMutation, UpdateVideoSettingsMutationVariables>;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;