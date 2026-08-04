import { useVideoPasswordContext } from '@js/common/video-password';

import { useVideoContext } from '@js/common/video-player/context';
import React from 'react';
import * as logger from '@js/utilities/loggerx';
import { SuccessMarkers } from '@js/utilities/rum/constants';
import { useMarkRUMSuccess } from '@js/utilities/rum/markers';
import { getLoomBrowserSupportedMimeTypes } from '@js/utilities/video-supported-mime';

import {
  MP4,
  VIDEO_PLAYBACK_MIME_TYPES_TO_ENUM_STRING,
  VideoPlaybackMimeType,
} from '@loomhq/shared-utilities/constants/mimes';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { processVideoSource, PlaylistInfo } from '../utils';
import { useGetVideoSourceLazyQuery } from './GetVideoSource.generated';

type VideoPlaybackMimeTypeCopy = VideoPlaybackMimeType;

export const MIME_TYPE_UNKNOWN = 'unknown';

export type VideoSource = PlaylistInfo & { plainSourceUrl?: string };
export type VideoSourceState = {
  source: VideoSource | null;
  initialMimeType: VideoPlaybackMimeTypeCopy | typeof MIME_TYPE_UNKNOWN;
};

const sourceStateUpdater =
  (newSource: VideoSource) =>
  (prevSourceState: VideoSourceState): VideoSourceState => {
    // If the previous source exists and if the mimetype of the new
    // source is different from the previous source, return without any change
    if (
      prevSourceState.source &&
      newSource.sourceMimeType === prevSourceState.source.sourceMimeType
    ) {
      return prevSourceState;
    }

    let newInitialMimeType = prevSourceState.initialMimeType;

    // Also update the initial mime type if the previous mime type was MIME_TYPE_UNKNOWN
    if (prevSourceState.initialMimeType === MIME_TYPE_UNKNOWN) {
      newInitialMimeType = newSource.sourceMimeType;
    }

    return {
      source: newSource,
      initialMimeType: newInitialMimeType,
    };
  };

export function useVideoSourceFromGraphql({
  videoId,
  forceMp4,
  setForceMp4,
  preferSsr = false,
  skip = false,
  recordingVersion,
  source,
  initialMimeType,
  setSource,
  shouldRegenerateMp4,
  setShouldRegenerateMp4,
}: {
  videoId: string;
  forceMp4?: boolean;
  setForceMp4: React.Dispatch<React.SetStateAction<boolean>>;
  preferSsr?: boolean;
  skip?: boolean;
  recordingVersion?: string;
  source: VideoSource | null;
  initialMimeType: VideoPlaybackMimeTypeCopy | typeof MIME_TYPE_UNKNOWN;
  setSource: React.Dispatch<React.SetStateAction<VideoSourceState>>;
  shouldRegenerateMp4: boolean;
  setShouldRegenerateMp4: React.Dispatch<React.SetStateAction<boolean>>;
}): VideoSourceState {
  const markSuccess = useMarkRUMSuccess();
  const {
    video: { uploadComplete },
  } = useVideoContext();
  const { password, needsPassword } = useVideoPasswordContext();
  const [runQuery] = useGetVideoSourceLazyQuery({
    // CRX-4288: remove once a fix is in place to update cache instead of this workaround
    fetchPolicy: 'no-cache',
    onError: error => {
      if (error.networkError) {
        return;
      }

      logger.error(
        'Video source query errored',
        { error, videoId, forceMp4, recordingVersion },
        { feature: Feature.VideoPlayer }
      );

      if (forceMp4 && !shouldRegenerateMp4) {
        setShouldRegenerateMp4(true);
      }
      if (!forceMp4) {
        setForceMp4(true);
      }
    },
    onCompleted: async data => {
      if (initialMimeType === MIME_TYPE_UNKNOWN) {
        // This is the first playlist we've fetched
        markSuccess(SuccessMarkers.VideoSourceFetched);
      }

      try {
        if (!data.getVideo || data.getVideo.__typename !== 'RegularUserVideo') {
          logger.error(
            new Error('Error fetching video source - invalid response'),
            {
              videoId,
              recordingVersion,
            },
            { feature: Feature.VideoPlayer }
          );
          throw new Error('Error fetching video source');
        }

        if (!data.getVideo.nullableRawCdnUrl) {
          logger.error(
            new Error(
              'Error fetching video source - raw cdn url was not present'
            ),
            {
              videoId,
              recordingVersion,
            },
            { feature: Feature.VideoPlayer }
          );
          throw new Error('Video raw cdn url was not present');
        }

        const { url, credentials } = data.getVideo.nullableRawCdnUrl;

        const videoSource = await processVideoSource(url, {
          Signature: credentials.Signature ?? undefined,
          Policy: credentials.Policy ?? undefined,
          'Key-Pair-Id': credentials.KeyPairId ?? undefined,
        });
        markSuccess(SuccessMarkers.VideoSourceParsed);
        setSource(sourceStateUpdater(videoSource));
      } catch (error) {
        logger.error(
          error,
          { videoId, recordingVersion, source: 'useVideoSource' },
          { feature: Feature.VideoPlayer }
        );

        if (forceMp4 && !shouldRegenerateMp4) {
          setShouldRegenerateMp4(true);
        }
        if (!forceMp4) {
          setForceMp4(true);
        }
      }
    },
  });

  React.useEffect(() => {
    if (skip) {
      return;
    }

    if (!uploadComplete) {
      return;
    }

    async function getMimesAndRunQuery() {
      let supportedMimeTypes: string[] | undefined;
      const supportedMimeTypesReturnedValue =
        getLoomBrowserSupportedMimeTypes();

      // We avoid doing an await here if we don't need it because `await` sometimes takes over 100ms
      // to run, even if the function doesn't do any async work.
      // https://useloom.slack.com/archives/C058L11LY68/p1684792402621869?thread_ts=1684790219.346049&cid=C058L11LY68
      if (Array.isArray(supportedMimeTypesReturnedValue)) {
        supportedMimeTypes = supportedMimeTypesReturnedValue;
      } else {
        supportedMimeTypes = await supportedMimeTypesReturnedValue;
      }

      const mimeTypesToRequest = forceMp4
        ? // If we're forcing MP4, we don't need to request any other mime types
          [MP4]
        : supportedMimeTypes.includes(MP4)
          ? // Always request MP4, since we'll use it as a fallback. If that somehow
            // fails too, we're out of options.
            supportedMimeTypes
          : supportedMimeTypes.concat(MP4);

      // Mark that we're about to start fetching the video source.
      // processSsrSource will log the other RUM events if it's successful.
      markSuccess(SuccessMarkers.VideoSourceFetchStart);

      runQuery({
        variables: {
          videoId,
          password,
          acceptableMimes: mimeTypesToRequest.map(
            mime => VIDEO_PLAYBACK_MIME_TYPES_TO_ENUM_STRING[mime]
          ),
        },
      });
    }

    getMimesAndRunQuery();
  }, [
    runQuery,
    videoId,
    password,
    markSuccess,
    uploadComplete,
    forceMp4,
    setForceMp4,
    preferSsr,
    skip,
    needsPassword,
  ]);

  return { source, initialMimeType };
}
