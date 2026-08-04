// When the user hits the stop button on the recorder
// It is still a V5 video that has not processed trim segments
// This is a way to update the duration and play the video properly

import {
  SystemEvents,
  Video,
  usePlayer,
  useVideoContext,
} from '@js/common/video-player';
import {
  PlayRange,
  getDurationWithRanges,
  roundToDoublePrecision,
} from '@js/common/video-player/api/trimming';

import { useEffect, useState } from 'react';

// in play for live rewind v5 videos until the video is v6 version
export function useLiveRewindTrim(video: Video): void {
  const player = usePlayer(video.id);
  const { setDisplayTimeOverride } = useVideoContext();
  const [roundedTime, setRoundedTime] = useState(0);
  const { videoProperties } = video;
  const shouldRun =
    videoProperties.recordingVersion === 'v5' &&
    Boolean(videoProperties.liveRewindTrimmedSections);

  useEffect(() => {
    if (!player || !shouldRun || !videoProperties.liveRewindTrimmedSections) {
      return;
    }

    const trimRanges = convertTrimmedSectionsToTrimRanges(
      videoProperties.liveRewindTrimmedSections
    );

    const durationAfter =
      getDurationWithRanges(
        (videoProperties.playableDuration as number) * 1000,
        videoProperties.liveRewindTrimmedSections
      ) / 1000;

    player.setTrimRanges(trimRanges);
    player.setTrimDuration(durationAfter);
  }, [
    player,
    shouldRun,
    videoProperties.liveRewindTrimmedSections,
    videoProperties.playableDuration,
  ]);

  useEffect(() => {
    if (!player || !shouldRun) {
      return;
    }

    const totalSourceDuration = roundToDoublePrecision(player.duration);
    const rangesBeforeCurrentTime = player.trimRanges.filter(
      ({ to }) => to < roundedTime
    );

    let nextCurrentTime = roundedTime;

    if (rangesBeforeCurrentTime.length > 0) {
      const totalAmtToRemove = rangesBeforeCurrentTime.reduce(
        (total, range) => total + (range.to - range.from),
        0
      );

      nextCurrentTime = nextCurrentTime - totalAmtToRemove;
    }

    if (totalSourceDuration) {
      setDisplayTimeOverride({
        duration: totalSourceDuration,
        currentTime: nextCurrentTime,
      });
    }

    return () => setDisplayTimeOverride();
  }, [player, roundedTime, setDisplayTimeOverride, shouldRun]);

  useEffect(() => {
    if (!player || !shouldRun) {
      return;
    }

    const onTimeUpdate = () => {
      setRoundedTime(Math.round(player.media.currentTime));
    };

    player.on([SystemEvents.time], onTimeUpdate);

    return () => {
      player.off([SystemEvents.time], onTimeUpdate);
    };
  }, [player, shouldRun]);
}

function convertTrimmedSectionsToTrimRanges(sections: PlayRange[]) {
  return sections.map(section => ({
    from: section.from / 1000,
    to: section.to / 1000,
  }));
}
