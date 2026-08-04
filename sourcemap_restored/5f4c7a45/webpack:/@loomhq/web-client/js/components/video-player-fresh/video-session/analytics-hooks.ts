/* eslint-disable no-console */

import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoPasswordContext } from '@js/common/video-password';

import {
  AnalyticsEvents,
  SystemEvents,
  UiEvents,
  Video,
  usePlayerFromContext,
  usePlaybackRate,
} from '@js/common/video-player';
import { Segment } from '@js/common/video-player/api/insights';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';
import { useEffect, useRef } from 'react';

import { trackCtaEvent } from './cta-event';
import { markAsViewed } from './mark-as-viewed';
import { usePlayerEventsListener } from './player-events';
import getVideoIntervalSync from './sync-intervals';
import { createSegmentSyncer, isSyncable } from './sync-segments';
import { trackVideoWatchDuration } from './total-duration';
import { createVideoSessionData, VideoSessionData } from './video-session';
import { addWindowUnloadEvent } from './window-unload';

export function useInitVideoSession(video: Video): void {
  const sessionData = useRef<VideoSessionData>();

  useFirstViewListener(video, sessionData.current);
  useIntervalListener(video);
  useSegmentsListener(video, sessionData.current);
  useTotalDurationListener(video);
  useCtaClickListener(video, sessionData.current);
  usePlayerEventsListener(video);

  useEffect(() => {
    sessionData.current = createVideoSessionData({
      videoId: video.modelId || '',
      trimId: video.processingInformation?.trimId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.uploadComplete]);
}

function useSegmentsListener(video: Video, sessionData?: VideoSessionData) {
  const player = usePlayerFromContext();

  useEffect(() => {
    if (video.isOwner || !player) {
      return;
    }

    const videoId = video.modelId ?? '';
    const syncSegments = createSegmentSyncer(videoId);

    const onSegment = (segment: Segment) => {
      if (isSyncable(segment)) {
        syncSegments({
          segment,
          videoId,
          speed: player.playbackRate,
          sessionId: sessionData?.id,
        });
      }
    };

    player.on([AnalyticsEvents.segment], onSegment);

    return () => {
      player.off([AnalyticsEvents.segment], onSegment);
    };
  }, [player, video.modelId, video.isOwner, sessionData]);
}

function useIntervalListener(video: Video) {
  const player = usePlayerFromContext();
  const { anonUserName } = useAnonUserName();

  useEffect(() => {
    if (video.isOwner || !player) {
      return;
    }

    const syncIntervals = getVideoIntervalSync();
    const videoId = video.modelId || '';

    const onInterval = (buckets: boolean[]) => {
      syncIntervals({ watchedIntervals: { videoId, buckets }, anonUserName });
    };

    const onInitialLoad = () => {
      const initialBuckets = player.intervals;

      syncIntervals({
        watchedIntervals: { videoId, buckets: initialBuckets },
        anonUserName,
      });
    };

    player.on([SystemEvents.ready], onInitialLoad);
    player.on([AnalyticsEvents.interval], onInterval);

    return () => {
      player.off([SystemEvents.ready], onInitialLoad);
      player.off([AnalyticsEvents.interval], onInterval);
    };
  }, [player, video.isOwner, video.modelId, anonUserName]);
}

function useFirstViewListener(
  video: Video,
  sessionData?: VideoSessionData
): void {
  const player = usePlayerFromContext();
  const { anonUserName } = useAnonUserName();

  const { rate } = usePlaybackRate(video.id || '');

  const { password } = useVideoPasswordContext();

  useEffect(() => {
    if (!player) {
      return;
    }

    async function onView() {
      try {
        await markAsViewed({
          sessionData,
          password: password || undefined,
          speed: rate,
          anonUserName,
        });
      } catch (e) {
        console.log('unable to mark first view');
      }
    }

    player.on([AnalyticsEvents.view], onView);

    return () => {
      player.off([AnalyticsEvents.view], onView);
    };
  }, [
    player,
    sessionData,
    video.isOwner,
    video.isMainVideoOnPage,
    password,
    rate,
    anonUserName,
  ]);
}

function useTotalDurationListener(video: Video) {
  const player = usePlayerFromContext();
  const { selectedWorkspace } = useGetWorkspaceMemberships();

  useEffect(() => {
    if (video.isOwner || !player) {
      return;
    }

    const onUnload = async () => {
      const totalDuration = player.totalTimePlayed;

      try {
        if (totalDuration > 0) {
          await trackVideoWatchDuration({
            videoId: video.modelId || '',
            player,
            totalDuration,
            selectedWorkspaceId: selectedWorkspace?.id,
          });
        }
      } catch (e) {
        console.log('unable to track the total duration');
      }
    };

    const removeListener = addWindowUnloadEvent(onUnload);

    return () => {
      removeListener();
    };
  }, [player, video.isOwner, video.modelId, selectedWorkspace?.id]);
}

function useCtaClickListener(video: Video, sessionData?: VideoSessionData) {
  const player = usePlayerFromContext();

  const { anonUserName } = useAnonUserName();

  useEffect(() => {
    if (video.isOwner || !player || !sessionData) {
      return;
    }

    const onCtaClick = () => {
      trackCtaEvent({
        videoId: video.modelId || '',
        sessionId: sessionData.id,
        isOwner: Boolean(video.isOwner),
        anonUserName,
      });
    };

    player.on([UiEvents.ctaClicked], onCtaClick);

    return () => {
      player.off([UiEvents.ctaClicked], onCtaClick);
    };
  }, [player, video, sessionData, anonUserName]);
}
