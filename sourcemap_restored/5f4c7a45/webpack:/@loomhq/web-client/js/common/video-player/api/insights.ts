import { uid } from '@js/common/video-player';

export type Segment = {
  start?: number;
  end?: number;
  lastUpdateAt?: number;
  id?: string;
};

enum UpdateType {
  NO_UPDATE,
  UPDATE_CURRENT,
  UPDATE_LAST,
}

const roundTime = (time: number) => {
  if (time < 1) {
    return 0;
  }

  return Math.round(time);
};

export const isValidSegment = (segment: Segment): boolean => {
  const { start = 0, end = 0 } = segment;

  const invalidFormat = start == null || end == null;
  const smolSegment = end - start < 1;

  return !invalidFormat && !smolSegment;
};

export class Insights {
  duration = 0;
  lastCurrentTime = 0;
  totalTimePlayed = 0;
  speedChanged = false;
  triggeredView = false;

  readonly bucketsNum = 20;
  intervalsBuilt = false;
  intervals: boolean[] = [];

  segments = new Segments();

  onView: () => void = () => null;
  onInterval: (intervals: boolean[]) => void = () => null;
  onSegment: (segment: Segment) => void = () => null;

  getIntervals(): boolean[] {
    return this.intervals;
  }

  getSegments(): Segment[] {
    const current = this.segments.currentSegment;
    const segments = this.segments.segments.map(s => ({ ...s }));

    if (isValidSegment(current)) {
      segments.push(current);
    }

    return segments;
  }

  triggerView(): void {
    this.triggeredView = true;
    this.onView();
  }

  triggerInterval(): void {
    this.onInterval(this.intervals);
  }

  /* We bind AnalyticsEvents.segment with onSegment in setupInsightsTracking()
   * This will trigger useSegmentsDebugger() and useSegmentsListener(), the latter
   * is in analytics-hooks.ts of the loom repo
   */
  triggerSegment(current: boolean): void {
    const segment = current
      ? this.segments.currentSegment
      : this.segments.segments[this.segments.segments.length - 1];

    this.onSegment(segment);
  }

  // this is used to track a view
  // and to send a total time watched event
  trackEffectiveTime = (time: number): void => {
    if (time < this.lastCurrentTime) {
      this.lastCurrentTime = time;

      return;
    }

    if (time - this.lastCurrentTime > 1) {
      this.lastCurrentTime = time;

      return;
    }

    if (time > this.lastCurrentTime) {
      this.totalTimePlayed += time - this.lastCurrentTime;
      this.lastCurrentTime = time;
    }

    if (this.triggeredView) {
      return;
    }

    // trigger a view event
    if (this.totalTimePlayed > 1) {
      this.triggerView();
    }
  };

  /**
   * video is broken down into {this.bucketsNum} intervals
   * as soon as the video plays any portion of an interval
   * it's marked as watched.
   *
   * Eg: if we have 20 intervals, each interval represents
   * 5% of the duration of a video: [0-5%, 5.1-10%, 10.1-15%....95.1-100%]
   *
   * @param time {number} the currentTime on video in seconds
   */
  checkIntervals = (time: number): void => {
    if (!this.duration) {
      return;
    }

    // currentTime might be slightly over duration
    // causing a buckets overflow.
    // constrain it to duration max
    time = Math.min(time, this.duration);

    const bucketSize = 100 / this.bucketsNum;
    const position = (100 * time) / this.duration;

    // index should fall into 0 to 19 (bucketsNum - 1)
    let index = Math.min(
      Math.ceil(position / bucketSize) - 1,
      this.bucketsNum - 1
    );

    index = Math.max(0, index);

    if (!this.intervals[index]) {
      this.intervals[index] = true;
      this.triggerInterval();
    }
  };

  trackSegments = (time: number): void => {
    if (!Number.isFinite(time)) {
      return;
    }

    const res = this.segments.track(time, this.speedChanged);

    this.speedChanged = false;

    if (res === UpdateType.NO_UPDATE) {
      return;
    }

    this.triggerSegment(res === UpdateType.UPDATE_CURRENT);
  };

  buildIntervals = (duration: number): void => {
    if (this.intervalsBuilt) {
      return;
    }

    if (!Number.isFinite(duration)) {
      return;
    }

    this.duration = duration;
    this.intervalsBuilt = true;

    for (let i = 0; i < this.bucketsNum; i++) {
      this.intervals[i] = false;
    }
  };

  resetIntervals(): void {
    this.intervalsBuilt = false;
    this.intervals = [];
  }
}

export class Segments {
  timeRef = 0;
  segments: Segment[] = [];
  currentSegment: Segment = {};

  track = (currentTime: number, speedChanged: boolean): number => {
    const time = roundTime(currentTime);

    if (this.currentSegment.start == null) {
      return this.newSegment(time);
    }

    const isJumpBack = time < this.timeRef;
    const isJumpFwd = time - this.timeRef > 2;

    if (isJumpBack || isJumpFwd || speedChanged) {
      this.timeRef = time;

      return this.newSegment(time, isJumpBack || isJumpFwd, speedChanged);
    }

    this.timeRef = time;

    return this.nudgeSegment(time);
  };

  // This function is getting called every second. We add a
  // conditional check so that a real update happens every 5 second
  nudgeSegment(time: number): UpdateType.NO_UPDATE | UpdateType.UPDATE_CURRENT {
    if (time < (this.currentSegment.end || 0)) {
      return UpdateType.NO_UPDATE;
    }

    this.currentSegment.end = time;

    if (time - (this.currentSegment.lastUpdateAt as number) >= 5) {
      this.currentSegment.lastUpdateAt = time;

      return UpdateType.UPDATE_CURRENT;
    }

    return UpdateType.NO_UPDATE;
  }

  newSegment(
    time: number,
    jumped = false,
    speedChanged = false
  ): UpdateType.NO_UPDATE | UpdateType.UPDATE_LAST {
    const { start, end = 0 } = this.currentSegment;
    const segment = this.currentSegment;
    const diff = end - time;

    if (start && diff >= 0 && diff <= 2 && !speedChanged) {
      return UpdateType.NO_UPDATE;
    }

    this.currentSegment = { start: time, id: uid(), lastUpdateAt: time };

    if (jumped) {
      this.currentSegment.end = time;
    }

    if (!isValidSegment(segment)) {
      return UpdateType.NO_UPDATE;
    }

    this.segments.push(segment);

    return UpdateType.UPDATE_LAST;
  }
}
