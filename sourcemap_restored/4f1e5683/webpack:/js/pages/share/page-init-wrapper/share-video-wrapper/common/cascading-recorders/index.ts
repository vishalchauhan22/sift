import { VideoModel } from '@js/common/video-player';
import React, { useEffect } from 'react';

import { CascadedRecordingDetails } from '@loomhq/shared-utilities/constants/cascadingRecorders';
import { setLocalStorageKey } from '@js/utilities/localStorage';

const setCascadingRecordersDetails = (
  videoDetails: CascadedRecordingDetails
): void => {
  setLocalStorageKey('videoDetails', videoDetails);
};

export const useSetCascadingRecordersDetails = (
  video: VideoModel & { modelId: string },
  cascadingRecordersTabUuidParam?: string
): void => {
  const [sentCascadingRecordersMessage, setSentCascadingRecordersMessage] =
    React.useState(false);
  const { id: videoId, title, videoProperties } = video;
  const { width, height, playableDuration } = videoProperties || {};

  useEffect(() => {
    if (
      cascadingRecordersTabUuidParam &&
      !sentCascadingRecordersMessage &&
      videoId &&
      title &&
      videoProperties &&
      playableDuration &&
      width &&
      height
    ) {
      setCascadingRecordersDetails({
        id: videoId,
        title,
        duration: playableDuration,
        dimensions: { width, height },
        tabUuid: cascadingRecordersTabUuidParam,
      });
      setSentCascadingRecordersMessage(true);
    }
  }, [
    videoId,
    cascadingRecordersTabUuidParam,
    title,
    videoProperties,
    playableDuration,
    width,
    height,
    sentCascadingRecordersMessage,
    setSentCascadingRecordersMessage,
  ]);
};
