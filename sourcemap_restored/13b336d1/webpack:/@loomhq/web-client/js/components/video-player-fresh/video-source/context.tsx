import { useVideoContext } from '@js/common/video-player/';
import React from 'react';

import { getParam } from '@js/utilities/url';

import { shouldWaitForTranscodeComplete } from '../utils';
import {
  MIME_TYPE_UNKNOWN,
  useVideoSourceFromGraphql,
  VideoSourceState,
} from './useVideoSource';

type VideoSourceContextType = VideoSourceState & {
  forceMp4: boolean;
  setForceMp4: (forceMp4: boolean) => void;
  setSource: (source: VideoSourceState) => void;
  shouldRegenerateMp4: boolean;
  setShouldRegenerateMp4: (shouldRegenerateMp4: boolean) => void;
};

const DEFAULT_VALUE: VideoSourceContextType = {
  source: null,
  initialMimeType: MIME_TYPE_UNKNOWN,
  forceMp4: false,
  shouldRegenerateMp4: false,
  setForceMp4: () => {},
  setSource: () => {},
  setShouldRegenerateMp4: () => {},
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
  const [{ source, initialMimeType }, setSource] =
    React.useState<VideoSourceState>({
      source: null,
      initialMimeType: MIME_TYPE_UNKNOWN,
    });
  const [shouldRegenerateMp4, setShouldRegenerateMp4] =
    React.useState<boolean>(false);

  useVideoSourceFromGraphql({
    videoId,
    forceMp4,
    setForceMp4,
    preferSsr,
    recordingVersion,
    source,
    initialMimeType,
    setSource,
    shouldRegenerateMp4,
    setShouldRegenerateMp4,
  });

  const contextValue = React.useMemo<VideoSourceContextType>(
    () => ({
      source,
      initialMimeType,
      forceMp4,
      setForceMp4,
      setSource,
      shouldRegenerateMp4,
      setShouldRegenerateMp4,
    }),
    [
      source,
      initialMimeType,
      forceMp4,
      shouldRegenerateMp4,
      setShouldRegenerateMp4,
    ]
  );

  return (
    <VideoSourceContext.Provider value={contextValue}>
      {children}
    </VideoSourceContext.Provider>
  );
};
