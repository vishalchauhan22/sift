import { useVideoContext } from '@js/common/video-player/';
import React from 'react';

import { getParam } from '@js/utilities/url';

import {
  FEATURE_GATES,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import { shouldWaitForTranscodeComplete } from '../utils';
import {
  MIME_TYPE_UNKNOWN,
  useVideoSourceFromGraphql,
  VideoSourceState,
} from './useVideoSource';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

type VideoSourceContextType = VideoSourceState & {
  forceMp4: boolean;
  setForceMp4: (forceMp4: boolean) => void;
};

const DEFAULT_VALUE: VideoSourceContextType = {
  source: null,
  initialMimeType: MIME_TYPE_UNKNOWN,
  forceMp4: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setForceMp4: () => {},
};

export const VideoSourceContext =
  React.createContext<VideoSourceContextType>(DEFAULT_VALUE);

export const VideoSourceProvider = ({
  children,
  videoId,
  shouldUseSsrSource = false,
}: {
  children: React.ReactNode;
  videoId: string;
  shouldUseSsrSource?: boolean;
}): JSX.Element => {
  const { video } = useVideoContext();
  const waitForTranscodeComplete = shouldWaitForTranscodeComplete(
    video.videoProperties?.mediaMetadataRotation
  );

  const recordingVersion = video.videoProperties?.recordingVersion;
  const shouldForceMp4 = getParam('forceMp4') === 'true';
  const [forceMp4, setForceMp4] = React.useState<boolean>(
    waitForTranscodeComplete || shouldForceMp4
  );
  // The parent might tell us to ignore SSR sources, for example if we
  // just did a Weave, which would invalidate the SSR source. Also if
  // there are multiple players on a page, we only want to use
  // the SSR for the main player.
  const preferSsr = shouldUseSsrSource;

  const isPlaylistValidationEnabled = useFlagIsActivated({
    flag: FEATURE_GATES.ROLLOUT_PLAYLIST_VALIDATION,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  const { source, initialMimeType } = useVideoSourceFromGraphql({
    videoId,
    forceMp4,
    setForceMp4,
    preferSsr,
    recordingVersion,
    isPlaylistValidationEnabled,
  });

  const contextValue = React.useMemo<VideoSourceContextType>(
    () => ({
      source,
      initialMimeType,
      forceMp4,
      setForceMp4,
    }),
    [source, initialMimeType, forceMp4]
  );

  return (
    <VideoSourceContext.Provider value={contextValue}>
      {children}
    </VideoSourceContext.Provider>
  );
};
