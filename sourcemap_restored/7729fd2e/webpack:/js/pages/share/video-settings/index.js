/* eslint-disable @loomhq/loom/no-js-extension */
import { SHARE_VIDEO_SETTINGS_DEFAULT_CLICKED } from '@js/constants/events';

import { useVideoContext } from '@js/common/video-player';
import React, { useEffect, useState } from 'react';

import { useLayer } from 'react-laag';

import { videoCannotUpdateDownloadEnabled } from '@loomhq/shared-utilities/utilities/videoDownload';

import { useDefaultSettings } from '@js/pages/share/common/settings/useDefaultSettingsStore';
import * as analytics from '@js/utilities/analytics';

import { SettingsTabs } from './common/video-settings-tabs';
import { DefaultSettingsModal } from './defaults-modal';

export const SettingsTabController = ({ goBackToEditPage }) => {
  const { showDefaultSettings } = useDefaultSettings();
  const { video } = useVideoContext();

  const getOriginalOptions = () => {
    const {
      commentsEmailEnabled,
      commentsEnabled,
      downloadEnabled,
      emailGateVideoType,
      loomBrandedPlayer,
      processingInformation,
      recordReplyEnabled,
      salesforceEngagementTracking,
      showAnalytics,
      showTranscriptToViewer,
      suggestedPlaybackRate,
      useEmojis,
      useGif,
      viewersCanWeave,
      viewerCaptionsOn,
      stylizedCaptions,
    } = video;

    const options = {
      comments_email_enabled: commentsEmailEnabled,
      comments_enabled: commentsEnabled,
      email_gate_video_type: emailGateVideoType,
      loom_branded_player: loomBrandedPlayer,
      noise_suppression: processingInformation?.noiseSuppression,
      record_reply_enabled: recordReplyEnabled,
      salesforce_engagement_tracking: salesforceEngagementTracking,
      show_analytics_to_viewer: showAnalytics,
      show_transcript_to_viewer: showTranscriptToViewer,
      stylized_captions: stylizedCaptions,
      suggested_playback_rate: suggestedPlaybackRate,
      use_emojis: useEmojis,
      use_gif: useGif,
      viewer_captions_on: viewerCaptionsOn,
      viewers_can_weave: viewersCanWeave,
    };

    // downloads being enabled for a video cannot be updated if the video is not downloadable to
    // anyone, or should only ever be downloadable to the owner
    if (!videoCannotUpdateDownloadEnabled(video.downloadableBy)) {
      options.download_enabled = downloadEnabled;
    }

    return options;
  };

  const originalOptions = getOriginalOptions();
  const [options, setOptions] = useState(originalOptions);
  const [isDefaultsModalOpen, setIsDefaultsModalOpen] = useState(false);

  useEffect(() => {
    if (showDefaultSettings) {
      setIsDefaultsModalOpen(true);
    }
  }, [showDefaultSettings]);

  // Adding these useEffects as the component is always mounted regardless of whether the
  // settings tab is visible so we can't rely on getOriginalOptions to repopulate the options state
  useEffect(() => {
    if (
      video?.stylizedCaptions !== undefined &&
      video?.stylizedCaptions !== null
    ) {
      setOptions(prevOptions => ({
        ...prevOptions,
        stylized_captions: video.stylizedCaptions,
      }));
    }
  }, [video.stylizedCaptions]);

  useEffect(() => {
    if (
      video?.viewerCaptionsOn !== undefined &&
      video?.viewerCaptionsOn !== null
    ) {
      setOptions(prevOptions => ({
        ...prevOptions,
        viewer_captions_on: video.viewerCaptionsOn,
      }));
    }
  }, [video.viewerCaptionsOn]);

  const onOpenDefaultsModal = () => {
    const backdropStyle = document.body.style;

    backdropStyle.top = `-${window.scrollY}px`;
    backdropStyle.position = 'fixed';

    setIsDefaultsModalOpen(true);
    analytics.track(SHARE_VIDEO_SETTINGS_DEFAULT_CLICKED);
  };

  const onCloseDefaultsModal = () => {
    const backdropStyle = document.body.style;

    const scrollY = backdropStyle.top;

    backdropStyle.position = '';
    backdropStyle.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    setIsDefaultsModalOpen(false);
  };

  // another layer for the default modal is needed because without it,
  // the modal stays in the sidebar that is set to position: sticky
  // and other components show up above the modal
  const { layerProps, triggerProps, renderLayer } = useLayer({
    isOpen: isDefaultsModalOpen,
  });

  return (
    <>
      <SettingsTabs
        videoId={video.id}
        options={options}
        setOptions={setOptions}
        originalOptions={originalOptions}
        onOpenDefaultsModal={onOpenDefaultsModal}
        onCloseVideoSettingsDrawer={goBackToEditPage}
        isInVideoSetting={true}
      />

      {isDefaultsModalOpen && (
        <div
          style={{ position: 'absolute', ...triggerProps.style }}
          {...triggerProps}
        >
          {renderLayer(
            <div {...layerProps} style={{ zIndex: '1' }}>
              <DefaultSettingsModal
                video={video}
                currentSettings={options}
                updateCurrentSettings={setOptions}
                onCloseDefaultsModal={onCloseDefaultsModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
