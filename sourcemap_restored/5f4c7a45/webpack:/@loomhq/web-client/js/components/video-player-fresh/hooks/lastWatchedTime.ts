/* eslint-disable no-console */
import {
  Video,
  usePlayerFromContext,
  SystemEvents,
  useUserContext,
} from '@js/common/video-player';
import debounce from 'lodash/debounce';
import React, { useRef } from 'react';

import * as logger from '@js/utilities/loggerx';
import { getParam } from '@js/utilities/url';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useSearchParams } from '../../../hooks/useSearchParams';
import { useGetVideoLastWatchTimeLazyQuery } from './GetVideoLastWatchTime.generated';
import { useUpdateLastWatchTimeMutation } from './UpdateLastWatchTime.generated';

const WATCHED_THRESHOLD = 5; // seconds
const debugParam = getParam('debug') || '';
const DEBUG = debugParam.includes('continueWatching');

export function useLastWatchedTime(video: Video, skipFetch = false): void {
  useFetchLastWatchedTime(video, skipFetch);
  useSetLastWatchedTime(video);
}

/**
 * Saves the last watched time when the user pauses the video.
 * Clears the last watched time when the video has ended.
 * Calls are debounced by a second
 */
function useSetLastWatchedTime(video: Video) {
  const player = usePlayerFromContext();
  const { isLoggedUser } = useUserContext();
  const playWasTriggered = useRef<boolean>(false);

  const [updateLastWatchTime] = useUpdateLastWatchTimeMutation({
    onError: error => {
      logger.error(
        error,
        {
          message: `LastWatched: Unable to update watch time`,
        },
        { feature: Feature.VideoPlayback }
      );

      throw error;
    },
  });

  React.useEffect(() => {
    if (!player || !isLoggedUser) {
      return;
    }

    const debouncedUpdate = debounce(
      (videoId: string, timestamp: number | null) => {
        if (timestamp && timestamp > player?.duration) {
          // don't attempt update if timestamp > duration, something went wrong
          return;
        }
        if (DEBUG) {
          logger.debug('Sending request to update watch time', {});
        }
        updateLastWatchTime({
          variables: {
            videoId,
            timestamp: timestamp ? Math.round(timestamp) : null,
          },
        });
      },
      1000
    );

    const onEnded = () => {
      if (DEBUG) {
        logger.debug('Ended HOOK. Clearing watch time', {});
      }
      debouncedUpdate(video.modelId as string, null);
    };

    const onPaused = () => {
      const timeLeft = player.duration - player.currentTime;

      if (timeLeft <= WATCHED_THRESHOLD || !playWasTriggered.current) {
        return;
      }
      if (DEBUG) {
        logger.debug('PAUSE hook. Saving watch time', {
          currentTime: player.currentTime,
        });
      }
      debouncedUpdate(video.modelId as string, player.currentTime);
    };

    const onStatusUpdate = () => {
      if (player.status === 'ended') {
        onEnded();
      }

      if (player.status === 'paused') {
        onPaused();
      }

      if (player.status === 'playing') {
        playWasTriggered.current = true;
      }
    };

    player.on([SystemEvents.status], onStatusUpdate);

    return () => {
      player.off([SystemEvents.status], onStatusUpdate);
    };
  }, [player, isLoggedUser, updateLastWatchTime, video.modelId]);
}

/**
 * Fetches the last watched time if any are stored.
 * Only sets it on the player when the player invokes the `ready` event
 *
 */
function useFetchLastWatchedTime(video: Video, skip: boolean) {
  const player = usePlayerFromContext();
  const searchParams = useSearchParams();
  const hasTimeParam = Boolean(searchParams.get('t'));
  const { isLoggedUser } = useUserContext();
  const [getLastWatchedTime] = useGetVideoLastWatchTimeLazyQuery();

  React.useEffect(() => {
    // Note: If we have a url time param, this will always take priority over last watched time.
    if (!player || !isLoggedUser || hasTimeParam || skip) {
      return;
    }

    async function fetchLastWatchedTime(): Promise<number | null> {
      if (DEBUG) {
        logger.debug('Fetching Last Watched Time', {});
      }
      const response = video.modelId
        ? await getLastWatchedTime({
            variables: {
              videoId: video.modelId,
            },
          })
        : undefined;

      if (
        response?.data?.getLastWatchTime?.__typename !==
        'GetLastWatchTimePayload'
      ) {
        return null;
      }

      return response.data.getLastWatchTime.lastWatchTime;
    }

    const lastWatchedTimePromise = fetchLastWatchedTime();

    const onReady = async () => {
      const watchedTime = await lastWatchedTimePromise;

      if (watchedTime) {
        player.setInitialTimePreloaded(watchedTime);
      }
    };

    player.on([SystemEvents.ready], onReady);

    return () => {
      player.off([SystemEvents.ready], onReady);
    };
  }, [
    getLastWatchedTime,
    player,
    isLoggedUser,
    video.modelId,
    hasTimeParam,
    skip,
  ]);
}
