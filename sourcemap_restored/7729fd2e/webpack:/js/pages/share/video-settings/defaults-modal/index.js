/* eslint-disable @loomhq/loom/no-js-extension */
import { useCurrentUserSelector } from '@js/common/current-user';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';
import React, { useState } from 'react';

import { Backdrop, ModalCard } from '@loomhq/lens';
import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';
import { SUGGESTED_PLAYBACK_RATE_NONE } from '@loomhq/shared-utilities/constants/video';

import { videoCannotUpdateDownloadEnabled } from '@loomhq/shared-utilities/utilities/videoDownload';

import { SettingsTabs } from '../common/video-settings-tabs';

// If a user does not have saved data for one of these default settings,
// the missing data can mean true or false depending on the value. This map
// defines those.
const DEFAULT_OPTION_VALUES = {
  comments_email_enabled: true,
  comments_enabled: true,
  download_enabled: true,
  email_gate_video_type: EmailGatingSetting.None,
  loom_branded_player: true,
  noise_suppression: false,
  record_reply_enabled: true,
  salesforce_engagement_tracking: false,
  show_analytics_to_viewer: true,
  show_transcript_to_viewer: true,
  stylized_captions: false,
  suggested_playback_rate: SUGGESTED_PLAYBACK_RATE_NONE,
  use_emojis: true,
  use_gif: true,
  viewer_captions_on: false,
  viewers_can_weave: true,
};

const getCurrentDefaultSettings = (userVideoSettings, video) => {
  const allKeys = new Set([
    ...Object.keys(DEFAULT_OPTION_VALUES),
    ...Object.keys(userVideoSettings),
  ]);

  const originalOptions = [...allKeys].reduce((options, key) => {
    // apply default value for settings that are missing or are null/undefined
    options[key] = userVideoSettings[key] ?? DEFAULT_OPTION_VALUES[key];

    return options;
  }, {});

  // remove download_enabled from original options list similar to video settings if download
  // enabled is not updatable
  if (videoCannotUpdateDownloadEnabled(video?.downloadableBy)) {
    delete originalOptions.download_enabled;
  }

  // basically rename viewers_can_weave_default to viewers_can_weave
  originalOptions.viewers_can_weave =
    userVideoSettings.viewers_can_weave_default ??
    DEFAULT_OPTION_VALUES.viewers_can_weave;
  delete originalOptions.viewers_can_weave_default;

  originalOptions.stylized_captions = userVideoSettings.stylizedCaptions
    ? userVideoSettings.stylizedCaptions
    : DEFAULT_OPTION_VALUES.stylized_captions;

  delete originalOptions.stylizedCaptions;

  originalOptions.viewer_captions_on = userVideoSettings.viewerCaptionsOn
    ? userVideoSettings.viewerCaptionsOn
    : DEFAULT_OPTION_VALUES.viewer_captions_on;

  delete originalOptions.viewerCaptionsOn;

  return originalOptions;
};

export const DefaultSettingsModal = ({
  video,
  currentSettings,
  updateCurrentSettings,
  onCloseDefaultsModal,
}) => {
  const userVideoSettings = useCurrentUserSelector(user => {
    if (user.videoSettings) {
      const { __typename, ...omitTypename } = user.videoSettings;

      return omitTypename;
    }
    return {};
  }, {});
  const workspaceAllowsAi = useWorkspaceAllowsAi();

  if (workspaceAllowsAi) {
    DEFAULT_OPTION_VALUES.auto_chapters = true;
    DEFAULT_OPTION_VALUES.auto_cta = true;
    DEFAULT_OPTION_VALUES.auto_filler_word_removal = true;
    DEFAULT_OPTION_VALUES.auto_silence_removal = true;
    DEFAULT_OPTION_VALUES.auto_summary = true;
    DEFAULT_OPTION_VALUES.auto_title = true;
    DEFAULT_OPTION_VALUES.auto_tasks = true;
  }
  const originalOptions = getCurrentDefaultSettings(userVideoSettings, video);
  const [options, setOptions] = useState(originalOptions);

  return (
    <Backdrop isOpen onClick={onCloseDefaultsModal}>
      <ModalCard
        isOpen
        noPadding
        onCloseClick={onCloseDefaultsModal}
        ariaLabel="Default video settings"
        maxWidth={68}
      >
        <SettingsTabs
          videoId={video.id}
          options={options}
          setOptions={setOptions}
          originalOptions={originalOptions}
          onCloseDefaultsModal={onCloseDefaultsModal}
          currentSettings={currentSettings}
          updateCurrentSettings={updateCurrentSettings}
        />
      </ModalCard>
    </Backdrop>
  );
};
