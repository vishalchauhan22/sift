import {
  ExtendedReactionType,
  VideoPlatform,
  checkPreferReducedMotion,
} from '..';

import { videoGlobalContainerClassName } from '../variables';
import { Insights, Segment } from './insights';
import {
  PlayRange,
  getNextPlayableTime,
  convertTrimTimeToFullTime,
  isTimePlayable,
  formatRanges,
  roundToDoublePrecision,
  convertTimeWithRanges,
  getLastPlayableTime,
} from './trimming';

type FIXME = any;

export enum BlinkEvents {
  play = 'play',
  pause = 'pause',
  stepBackward = 'stepBackward',
  stepForward = 'stepForward',
  mute = 'mute',
  unmute1 = 'unmute1',
  unmute2 = 'unmute2',
  speedUpdate = 'speedUpdate',
}

export enum SystemEvents {
  duration = 'duration',
  volume = 'volume',
  status = 'status',
  time = 'time',
  speed = 'speed',
  started = 'started',
  userPlay = 'userPlay',
  userPause = 'userPause',
  ready = 'ready',
  error = 'error',
  smoothTime = 'smoothTime',
  closedCaptions = 'closedCaptions',
  requestFallbackSource = 'requestFallbackSource',
  pipActiveChange = 'pipActiveChange',
  initialTimeLoaded = 'initialTimeLoaded',
  userStepForward = 'userStepForward',
  userStepBackward = 'userStepBackward',
  userMute = 'userMute',
  userUnmute1 = 'userUnmute1',
  userUnmute2 = 'userUnmute2',
  resolutionVariantOptionsAvailable = 'resolutionVariantOptionsAvailable',
  resolutionVariantChanged = 'resolutionVariantChanged',
}

export enum AnalyticsEvents {
  view = 'view',
  segment = 'segment',
  interval = 'interval',
}

// Those events get picked up by the player in the loom repo
export enum UiEvents {
  newComment = 'newComment',
  commentClicked = 'commentClicked',
  taskClicked = 'taskClicked',
  commentFormToggle = 'commentFormToggle',
  toggleReactionPicker = 'toggleReactionPicker',
  newReaction = 'newReaction',
  reactionClicked = 'reactionClicked',
  extendedReactionButtonClicked = 'extendedReactionButtonClicked',
  extendedReactions = 'extendedReactions',
  extendedReactionSearched = 'extendedReactionSearched',
  extendedReactionSearchClicked = 'extendedReactionSearchClicked',
  ctaClicked = 'ctaClicked',
  fullScreenClicked = 'fullScreenClicked',
  videoStepClicked = 'videoStepClicked',
  watchAgainClicked = 'watchAgainClicked',
  anonNameSubmitted = 'anonNameSubmitted',
  connectClicked = 'connectClicked',
  toggleTheaterMode = 'toggleTheaterMode',
  anonNewReaction = 'anonNewReaction',
  anonCancelReaction = 'anonCancelReaction',
  recordReplyInit = 'recordReplyInit',
  recordReplyClicked = 'recordReplyClicked',
  rateChangeClicked = 'rateChangeClicked',
  videoQualityChanged = 'videoQualityChanged',
  toggleWatchLater = 'toggleWatchLater',
}

type Event = SystemEvents | AnalyticsEvents | UiEvents;
type Listener = {
  event: Event;
  once: boolean;
  fn: (payload: FIXME) => void;
};

// A flattened version of Shaka Player's shaka.extern.Track
export type ResolutionVariant = {
  id: number;
  width: number;
  height: number;
};

const defaultAutoVariant: ResolutionVariant = {
  id: -1,
  width: -1,
  height: -1,
};

export type NewReactionPayload = {
  time: number;
  type: ExtendedReactionType;
  isNew: boolean;
  placeUsed?: string;
};

export type DeleteReactionPayload = {
  reactionId: string;
  type: ExtendedReactionType;
};

export type ReactionClickedPayload = DeleteReactionPayload;

export type VideoStepPayload = {
  amount: number;
  direction: 'forward' | 'back';
};

export type RecordReplyPayload = {
  element: HTMLButtonElement;
};

type Comment = {
  content: string;
  source?: string;
};
/**
 * These events won't be triggered immediately
 * when attaching a listener
 */
const noImmediateTriggerList = [
  SystemEvents.ready,
  SystemEvents.started,
  SystemEvents.userPlay,
  SystemEvents.userPause,
  SystemEvents.requestFallbackSource,
  SystemEvents.error,
  ...Object.values(AnalyticsEvents),
  ...Object.values(UiEvents),
];
const UPDATE_REFRESH_INTERVAL = 16;

export class Player {
  mseTech: FIXME;
  mux: FIXME;
  mime!: string;
  media: HTMLVideoElement;
  listeners: Listener[] = [];

  timeOffset = 0;
  started = false;
  userRequestedPlayback = false;
  clipDuration: number | null = null;
  trimDuration: number | null = null;
  closedCaptions = false;
  pipActive = false;
  initialTimePreloaded = false;

  timerRef: number | undefined;
  readyRef: number | undefined;

  retrySourceCount = 0;
  retryFallbackCount = 0;

  insights!: Insights;

  isSeeking = false;
  isSplitSegment = false;

  isEnded = false;
  trimRanges: PlayRange[] = [];

  resolutionVariantOptions: ResolutionVariant[] = [defaultAutoVariant];
  selectedResolutionVariant: ResolutionVariant = defaultAutoVariant;

  logs: any[] = [];

  constructor(videoElement: HTMLVideoElement) {
    this.media = videoElement;
    this.setupListeners();
    this.setupSmoothTiming();
    this.setupInsightsTracking();
  }

  get currentTime(): number {
    return this.media.currentTime;
  }

  set currentTime(timeInSeconds: number) {
    this.media.currentTime = timeInSeconds;
  }

  get currentTimeWithOffset(): number {
    return this.media.currentTime - (this.timeOffset || 0);
  }

  get volume(): number {
    return this.media.volume;
  }

  set volume(amount: number) {
    this.media.volume = Math.max(0, Math.min(amount, 1));
  }

  get ended(): boolean {
    if (this.isEnded) {
      return true;
    }

    return this.media.ended;
  }

  get paused(): boolean {
    return this.media.paused;
  }

  get duration(): number {
    if (this.clipDuration) {
      return this.clipDuration;
    }

    if (this.trimDuration) {
      return this.trimDuration;
    }

    return this.media.duration;
  }

  get muted(): boolean {
    return this.media.muted;
  }

  get playbackRate(): number {
    return this.media.playbackRate;
  }

  set playbackRate(playbackRate: number) {
    this.media.playbackRate = playbackRate;
  }

  get status(): 'ended' | 'paused' | 'playing' {
    if (this.ended) {
      return 'ended';
    }

    if (this.paused) {
      return 'paused';
    }

    return 'playing';
  }

  get isWaiting(): boolean {
    return this.media.readyState < 4;
  }

  get isBuffering(): boolean {
    return this.media.readyState < 3;
  }

  get bufferedParts(): number[][] {
    const bufferedParts = this.media.buffered.length;
    const buffered = [] as number[][];

    for (let i = 0; i < bufferedParts; i++) {
      buffered.push([this.media.buffered.start(i), this.media.buffered.end(i)]);
    }

    return buffered;
  }

  get segments(): Segment[] {
    return this.insights.getSegments();
  }

  get intervals(): boolean[] {
    return this.insights.getIntervals();
  }

  /**
   * Returns the total time watched in a session
   */
  get totalTimePlayed(): number {
    return this.insights.totalTimePlayed;
  }

  static rates(): number[] {
    return [0.8, 1, 1.2, 1.5, 1.7, 2, 2.5];
  }

  pushLog(type: string, data = {}): void {
    this.logs.push({
      type,
      data,
      ts: window.performance.now(),
      referrer: document.referrer,
      playerStatus: this.status,
      time: this.currentTime,
    });
  }

  setIsEnded(isEnded = true): void {
    this.isEnded = isEnded;

    if (isEnded) {
      this.clearTimeout();
    }

    // update UI
    this.trigger(SystemEvents.time, this.currentTime);
  }

  isReady(): boolean {
    return this.media.readyState > 0;
  }

  toggleClosedCaptions(): void {
    this.closedCaptions = !this.closedCaptions;
    this.trigger(SystemEvents.closedCaptions);
  }

  setClipDuration(clip: [number, number]): void {
    const [start, end] = clip;

    this.clipDuration = end - start;
    this.timeOffset = start;

    if (start <= 0) {
      return;
    }

    this.media.currentTime = start;
  }

  // For the small period where v6 video has not been proceeded
  // During live rewind
  setTrimDuration(duration: number): void {
    this.trimDuration = duration;
  }

  setTrimRanges(ranges: PlayRange[]): void {
    this.trimRanges = formatRanges(ranges);
    this.on([SystemEvents.smoothTime], this.onTrimRangeCheck);

    if (!this.media.duration) {
      return;
    }

    const lastPlayableTime = getLastPlayableTime(
      roundToDoublePrecision(this.media.duration),
      this.trimRanges
    );
    const paddedCurrentTime = roundToDoublePrecision(this.currentTime + 0.01);

    if (paddedCurrentTime >= lastPlayableTime) {
      this.pause();
    }
  }

  removeTrimRanges(): void {
    this.trimRanges = [];
    this.setIsEnded(false);

    this.off([SystemEvents.smoothTime], this.onTrimRangeCheck);
  }

  onTrimRangeCheck = (): void => {
    if (!this.trimRanges.length) {
      return;
    }

    if (this.status !== 'playing') {
      // if video is not currently playing, we don't have to worry about the trim ranges
      return;
    }

    const roundedCurrentTime = roundToDoublePrecision(this.media.currentTime);

    const canPlay = isTimePlayable(roundedCurrentTime, this.trimRanges);

    // if the current time is not within the trimmed out ranges, it's playable, so we can return
    if (canPlay) {
      return;
    }
    // if not, we want to move the player to the next playable time

    // first check if we are at the end of the video (final duration or at the beginning of a trimmed range that goes to the end)
    const videoDuration = roundToDoublePrecision(this.media.duration);
    const lastPlayableTime = getLastPlayableTime(
      videoDuration,
      this.trimRanges
    );

    // if the current time is past the last playable time, pause the video
    // and set the current time to the last playable time
    const paddingCurrentTime = roundedCurrentTime + 0.01;

    if (paddingCurrentTime >= lastPlayableTime) {
      if (roundedCurrentTime !== lastPlayableTime) {
        this.media.currentTime = lastPlayableTime;
      }

      this.pause();

      return;
    }

    // if the current time is not past the last playable time, we can move to the next playable time

    const nextPlayableTime = getNextPlayableTime(
      roundedCurrentTime,
      this.trimRanges
    );

    this.media.currentTime = nextPlayableTime;
  };

  play(): void {
    this.userRequestedPlayback = true;
    this.trigger(SystemEvents.userPlay);

    // If player isn't ready yet, register a one-time ready listener like autoPlay()
    if (!this.isReady()) {
      this.autoPlay();
    }

    // If player is already ready, play immediately
    this.media.play().catch(err => {
      this.trigger(SystemEvents.error, err);
    });
  }

  safePlay(): void {
    this.media.play().catch(() => null);
  }

  autoPlay(): void {
    if (checkPreferReducedMotion()) {
      return;
    }

    this.on(
      [SystemEvents.ready],
      () => {
        this.media
          .play()
          // if the video cannot play it's probably because the browser is saying no
          // we now try to play the video muted
          // if that also fails: we tried, the browser just won't allow it
          .catch(e => {
            if (e instanceof DOMException && !this.muted) {
              // Try another play after muting. If that doesn't work, fail silently.
              this.toggleMute({ notify: false });
              this.safePlay();
            }
          });
      },
      true
    );
  }

  pause(): void {
    this.media.pause();
  }

  increaseVolume(amount = 0.1): void {
    this.media.volume = Math.min(this.media.volume + amount, 1);
  }

  decreaseVolume(amount = 0.1): void {
    this.media.volume = Math.max(this.media.volume - amount, 0);
  }

  forward(amount = 1): void {
    let time = this.media.currentTime + amount;

    // TODO: this also needs to take into account
    // multiple clips
    if (this.trimRanges.length) {
      const t = convertTimeWithRanges(this.media.currentTime, this.trimRanges);

      time = Math.min(
        convertTrimTimeToFullTime(t + amount, this.trimRanges),
        this.duration
      );
    }

    if (Number.isNaN(time)) {
      return;
    }

    this.media.currentTime = time;

    const payload: VideoStepPayload = {
      amount,
      direction: 'forward',
    };

    this.trigger(UiEvents.videoStepClicked, payload);
    this.trigger(SystemEvents.userStepForward);
  }

  backward(amount = 1): void {
    let time = this.media.currentTime - amount;

    // TODO: this also needs to take into account
    // multiple clips
    if (this.trimRanges.length) {
      const t = convertTimeWithRanges(this.media.currentTime, this.trimRanges);

      time = Math.max(
        convertTrimTimeToFullTime(t - amount, this.trimRanges),
        0
      );
    }

    if (Number.isNaN(time)) {
      return;
    }

    this.media.currentTime = time;

    const payload: VideoStepPayload = {
      amount,
      direction: 'back',
    };

    this.trigger(UiEvents.videoStepClicked, payload);
    this.trigger(SystemEvents.userStepBackward);
  }

  toggleMute({ notify = true }: { notify?: boolean } = {}): void {
    if (!this.media.muted && this.media.volume === 0) {
      this.media.volume = 1;

      return;
    }

    this.media.muted = !this.media.muted;

    if (!this.media.muted && this.media.volume === 0) {
      this.media.volume = 1;
    }

    if (!notify) {
      return;
    }

    if (this.media.muted) {
      this.trigger(SystemEvents.userMute);
    } else {
      this.trigger(
        this.media.volume >= 0.5
          ? SystemEvents.userUnmute2
          : SystemEvents.userUnmute1
      );
    }
  }

  togglePlay(): void {
    // // mseTech is our shaka player. If it's not initialized yet don't try to play or pause
    // // Avoids "Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause()"
    // if (!this.mseTech) {
    //   return;
    // }

    if (this.status === 'playing') {
      this.trigger(SystemEvents.userPause);

      return this.media.pause();
    }

    this.play();
  }

  togglePictureInPicture(): void {
    if (!document.pictureInPictureEnabled) {
      return;
    }

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      this.media.requestPictureInPicture();
    }
  }

  getFullscreenElement(): HTMLElement {
    return this.media.closest(
      `.${videoGlobalContainerClassName}`
    ) as HTMLElement;
  }

  isInFullScreen(): any {
    const doc = document as any;

    return doc.fullscreenElement || doc.webkitIsFullScreen;
  }

  isFullScreenEnabled(): boolean {
    const videoElement = this.media as any;

    // standard property that tells you if fullscreen is possible
    const documentFullScreenEnabled = document.fullscreenEnabled;

    const {
      webkitFullscreenEnabled, // Safari API
    } = document as any;

    return (
      // ios browsers
      documentFullScreenEnabled ||
      webkitFullscreenEnabled ||
      Boolean(videoElement.webkitEnterFullscreen)
    );
  }

  toggleFullscreen(): void {
    const doc = document as any;
    const el = this.getFullscreenElement();
    const videoElement = this.media;

    if (!this.isFullScreenEnabled()) {
      return;
    }

    if (this.isInFullScreen()) {
      doc.exitFullscreen?.();
      doc.webkitExitFullscreen?.();
      this.trigger(UiEvents.fullScreenClicked, false);
    } else {
      el.requestFullscreen?.();

      // @ts-expect-error webkit specific stuff is not typed
      if (el.webkitRequestFullscreen) {
        // @ts-expect-error webkit specific stuff is not typed
        el.webkitRequestFullscreen();
      } else {
        // @ts-expect-error webkit specific stuff is not typed
        // specific fix for iOS mobile web browsers
        videoElement.webkitEnterFullscreen?.();
      }

      this.trigger(UiEvents.fullScreenClicked, true);
    }
  }

  toggleRate = (): void => {
    const rates = Player.rates();
    const i = rates.findIndex(r => r === this.playbackRate);
    const newRate = rates[i + 1] || rates[0];

    this.playbackRate = newRate;
  };

  setInitialTimePreloaded(time: number): void {
    this.initialTimePreloaded = true;
    this.currentTime = time;
    this.trigger(SystemEvents.initialTimeLoaded);
  }

  updateSource(source: string): void {
    if (!this.mseTech) {
      this.media.src = source;
      this.media.load();
    }

    // hls.js
    // TODO: this does not actually work
    // remove
    if (this.mseTech?.loadSource) {
      this.mseTech.loadSource(source);
    }
  }

  updateTranscodedSource(source: string): void {
    this.pause();
    this.media.src = source;
    this.media.load();
    this.safePlay();

    this.retryFallbackCount++;
  }

  retryLoadingSource(): void {
    const time = this.currentTime;

    this.pause();
    this.media.load();
    this.currentTime = time;
    this.safePlay();

    this.retrySourceCount++;
  }

  firstFrame(): void {
    this.currentTime = 0.01;
  }

  private onSeeking = () => {
    this.isSeeking = true;
  };

  private onCanPlay = () => {
    this.isSeeking = false;
  };

  setupListeners(): void {
    this.readyRef = window.setInterval(this.checkReady, 100);

    this.mediaOn(['seeking'], this.onSeeking);
    this.mediaOn(['canplay'], this.onCanPlay);

    this.mediaOn(['timeupdate', 'loadeddata'], this.timeUpdate);
    this.mediaOn(['volumechange'], this.volumeUpdate);
    this.mediaOn(['ratechange'], this.playbackRateUpdate);
    this.mediaOn(['play'], this.hasStartedUpdate);
    this.mediaOn(
      ['durationchange', 'loadeddata', 'loadedmetadata'],
      this.durationUpdate
    );
    this.mediaOn(
      [
        'playing',
        'play',
        'pause',
        'ended',
        'emptied',
        'timeupdate',
        'loadeddata',
      ],
      this.statusUpdate
    );
    this.mediaOn(['enterpictureinpicture'], this.pipEnter);
    this.mediaOn(['leavepictureinpicture'], this.pipExit);
    this.mediaOn(['error'], this.onError);
  }

  destroyListeners(): void {
    this.mediaOff(['seeking'], this.onSeeking);
    this.mediaOff(['canplay'], this.onCanPlay);
    this.mediaOff(['timeupdate', 'loadeddata'], this.timeUpdate);
    this.mediaOff(['volumechange'], this.volumeUpdate);
    this.mediaOff(['ratechange'], this.playbackRateUpdate);
    this.mediaOff(['play'], this.hasStartedUpdate);
    this.mediaOff(
      ['durationchange', 'loadeddata', 'loadedmetadata'],
      this.durationUpdate
    );
    this.mediaOff(
      [
        'playing',
        'play',
        'pause',
        'ended',
        'emptied',
        'timeupdate',
        'loadeddata',
      ],
      this.statusUpdate
    );
    this.mediaOff(['enterpictureinpicture'], this.pipEnter);
    this.mediaOff(['leavepictureinpicture'], this.pipExit);
    this.mediaOff(['error'], this.onError);

    this.destroySmoothTiming();
    clearInterval(this.readyRef);
  }

  mediaOn = (events: string[], fn: (e?: FIXME) => void): void => {
    events.forEach(event => this.media.addEventListener(event, fn));
  };

  mediaOff = (events: string[], fn: (e?: FIXME) => void): void => {
    events.forEach(event => this.media.removeEventListener(event, fn));
  };

  on = (
    events: Event[] = [],
    callback: (e?: FIXME) => void,
    once = false,
    noImmediate = false
  ): void => {
    events.forEach(event => {
      this.listeners.push({ event, fn: callback, once });

      if (event === SystemEvents.ready && this.isReady()) {
        callback();

        return;
      }

      // Do not callback if specified not to.
      if (noImmediate || noImmediateTriggerList.includes(event)) {
        return;
      }

      // Most events should update immediately
      callback();
    });
  };

  off = (events: Event[] = [], callback: (e?: FIXME) => void): void => {
    this.listeners.forEach((listener, index) => {
      if (events.includes(listener.event) && listener.fn === callback) {
        delete this.listeners[index];
      }
    });
  };

  trigger = (event: Event, payload?: FIXME): void => {
    this.listeners
      .filter(listener => listener.event === event)
      .forEach(listener => {
        listener.fn(payload);

        if (listener.once) {
          const i = this.listeners.findIndex(l => l === listener);

          delete this.listeners[i];
        }
      });
  };

  private timeUpdate = () => {
    this.trigger(SystemEvents.time, this.currentTime);
  };

  private pipEnter = () => {
    this.pipActive = true;
    this.trigger(SystemEvents.pipActiveChange, this.pipActive);
  };

  private pipExit = () => {
    this.pipActive = false;
    this.trigger(SystemEvents.pipActiveChange, this.pipActive);
  };

  private volumeUpdate = () => {
    this.trigger(SystemEvents.volume, this.volume);
  };

  private durationUpdate = () => {
    this.trigger(SystemEvents.duration, this.duration);
  };

  private statusUpdate = () => {
    this.trigger(SystemEvents.status, this.status);
  };

  private playbackRateUpdate = () => {
    this.trigger(SystemEvents.speed, this.playbackRate);
  };

  private hasStartedUpdate = (e: { type: string }) => {
    if (e.type === 'timeupdate' && this.currentTimeWithOffset <= 0) {
      return;
    }

    if (e.type === 'timeupdate' && this.initialTimePreloaded) {
      // debounce to avoid unintentional pre-play skip
      // as timeupdate might be fired twice when video loads
      setTimeout(() => {
        this.initialTimePreloaded = false;
      }, 250);

      return;
    }

    this.started = true;
    this.trigger(SystemEvents.started);
  };

  private onError = (e: { target: HTMLMediaElement }) => {
    this.trigger(SystemEvents.error, e.target.error);
  };

  // smooth progress bar animation hooks
  setupSmoothTiming = (): void => {
    this.mediaOn(['timeupdate', 'play'], this.onTimeUpdate);
    this.mediaOn(['pause', 'waiting'], this.clearTimeout);
    this.mediaOn(['playing'], this.onTimeUpdateInterval);
  };
  destroySmoothTiming = (): void => {
    this.mediaOff(['timeupdate', 'play'], this.onTimeUpdate);
    this.mediaOff(['pause', 'waiting'], this.clearTimeout);
    this.mediaOff(['playing'], this.onTimeUpdateInterval);
  };

  private clearTimeout = () => clearTimeout(this.timerRef);
  private onTimeUpdate = () =>
    this.trigger(SystemEvents.smoothTime, this.currentTime);

  private runTimeoutLoop() {
    this.timerRef = window.setTimeout(() => {
      requestAnimationFrame(() => {
        this.onTimeUpdate();
        this.runTimeoutLoop();
      });
      // This tries to run time updates every 16ms or about 60fps. This means
      // that if anything subscribed to time updates takes longer than 16ms,
      // it will lead everything subscribed to those time updates to be delayed.
    }, UPDATE_REFRESH_INTERVAL);
  }

  private onTimeUpdateInterval = () => {
    this.clearTimeout();
    this.runTimeoutLoop();
  };

  // triggers on player ready
  checkReady = (): void => {
    if (!this.isReady()) {
      return;
    }

    clearInterval(this.readyRef);
    this.trigger(SystemEvents.ready);
  };

  setupInsightsTracking(): void {
    const onView = () => {
      this.trigger(AnalyticsEvents.view);
    };
    const onInterval = (intervals: boolean[]) => {
      this.trigger(AnalyticsEvents.interval, intervals);
    };
    const onSegment = (segment: Segment) => {
      this.trigger(AnalyticsEvents.segment, segment);
    };

    this.insights = new Insights();
    this.insights.onView = onView;
    this.insights.onInterval = onInterval;
    this.insights.onSegment = onSegment;

    const onTime = (time: number) => {
      // only trigger when is playing
      if (this.media.paused) {
        return;
      }

      this.insights.trackEffectiveTime(time);
      this.insights.checkIntervals(time);
      this.insights.trackSegments(time);
    };

    const onPause = () => {
      this.insights.triggerSegment(true);
    };

    const onSpeedChange = () => {
      this.insights.speedChanged = true;
    };

    this.on([SystemEvents.duration], () =>
      this.insights.buildIntervals(this.duration)
    );
    this.on([SystemEvents.smoothTime], onTime);
    this.on([SystemEvents.userPause], onPause);
    this.on([SystemEvents.speed], onSpeedChange);
  }

  submitNewComment({ content, source }: Comment): void {
    this.trigger(UiEvents.newComment, {
      content,
      time: this.currentTime,
      source,
    });
  }

  submitNewReaction(
    type: ExtendedReactionType,
    placeUsed?: VideoPlatform
  ): void {
    this.trigger(UiEvents.newReaction, {
      time: this.currentTime,
      type,
      placeUsed: placeUsed as string,
    });
  }

  reactionClicked(payload: ReactionClickedPayload): void {
    this.trigger(UiEvents.reactionClicked, payload);
  }

  commentClicked(commentIds?: string[]): void {
    this.trigger(UiEvents.commentClicked, commentIds);
  }

  taskClicked(taskId: string): void {
    this.trigger(UiEvents.taskClicked, taskId);
  }

  watchAgainClicked(): void {
    this.trigger(UiEvents.watchAgainClicked);
  }

  ctaClicked(url: string): void {
    this.trigger(UiEvents.ctaClicked, url);
  }

  commentFormToggle(open = false): void {
    let timeout = 0;

    // change UI if in pre-play
    if (open && !this.started) {
      // give react some time to mount the playbar
      timeout = 100;

      // skip to first frame to avoid black screen
      if (this.currentTime <= 0) {
        this.currentTime = 0.01;
      }

      this.hasStartedUpdate({ type: 'comment' });
    }

    setTimeout(() => this.trigger(UiEvents.commentFormToggle, open), timeout);
  }

  toggleReactionPicker(): void {
    this.trigger(UiEvents.toggleReactionPicker);
  }

  anonNameSubmitted(name: string): void {
    this.trigger(UiEvents.anonNameSubmitted, name);
  }

  connectClicked(source: string | undefined): void {
    this.trigger(UiEvents.connectClicked, source);
  }

  toggleTheaterMode(): void {
    this.trigger(UiEvents.toggleTheaterMode);
  }

  anonNewReaction(type: ExtendedReactionType): void {
    this.trigger(UiEvents.anonNewReaction, type);
  }

  anonCancelReaction(): void {
    this.trigger(UiEvents.anonCancelReaction);
  }

  recordReplyInit(payload: RecordReplyPayload): void {
    this.trigger(UiEvents.recordReplyInit, payload);
  }

  recordReplyClicked(): void {
    this.trigger(UiEvents.recordReplyClicked);
  }

  rateChangeClicked(): void {
    this.trigger(UiEvents.rateChangeClicked);
  }

  videoQualityChanged(qualitySelection?: string): void {
    this.trigger(UiEvents.videoQualityChanged, { qualitySelection });
  }

  toggleWatchLater(newValue: boolean): void {
    this.trigger(UiEvents.toggleWatchLater, newValue);
  }

  // Always start with auto variant selected.
  private setInitialResolutionVariantOptions() {
    const unselectedVariantOptions =
      this.compactMapShakaVariantToResolutionVariant(
        this.mseTech.getVariantTracks()
      );

    this.resolutionVariantOptions = [
      ...unselectedVariantOptions,
      defaultAutoVariant,
    ];
    this.selectedResolutionVariant = defaultAutoVariant;
    this.trigger(SystemEvents.resolutionVariantOptionsAvailable);
  }

  private updateResolutionVariants = () => {
    const shaka = this.mseTech;

    const activeVariant = shaka
      .getVariantTracks()
      .find((variant: FIXME) => variant.active);

    if (!activeVariant) {
      return;
    }

    const unselectedVariantOptions =
      this.compactMapShakaVariantToResolutionVariant(
        this.mseTech.getVariantTracks()
      );

    if (this.selectedResolutionVariant.id === -1) {
      const updatedAutoVariant = {
        id: -1,
        width: activeVariant.width,
        height: activeVariant.height,
      };

      this.selectedResolutionVariant = updatedAutoVariant;
      this.trigger(SystemEvents.resolutionVariantChanged);
      this.resolutionVariantOptions = [
        ...unselectedVariantOptions,
        updatedAutoVariant,
      ];
      this.trigger(SystemEvents.resolutionVariantOptionsAvailable);
    } else {
      // Do not show the resolution for auto if auto is not selected.
      this.resolutionVariantOptions = [
        ...unselectedVariantOptions,
        defaultAutoVariant,
      ];
      this.trigger(SystemEvents.resolutionVariantOptionsAvailable);
    }
  };

  private compactMapShakaVariantToResolutionVariant = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shakaVariants: any[]
  ): ResolutionVariant[] => {
    return shakaVariants
      .filter(track => track.width && track.height)
      .map(shakaVariant => {
        return {
          id: shakaVariant.id,
          width: shakaVariant.width,
          height: shakaVariant.height,
        };
      });
  };

  listenToResolutionVariantEvents(): void {
    if (
      !this.mseTech ||
      !this.mseTech.configure ||
      !this.mseTech.getVariantTracks ||
      !this.mseTech.selectVariantTrack
    ) {
      throw new Error('mseTech should not be missing critical functions');
    }

    const shaka = this.mseTech;

    this.setInitialResolutionVariantOptions();

    // Fired when an automatic adaptation causes the active tracks to change.
    // Does not fire when the application calls selectVariantTrack()
    shaka.addEventListener('adaptation', () => {
      this.updateResolutionVariants();
    });

    // Fired when a call from the application caused a variant change.
    // Does not fire when an automatic adaptation causes a variant change.
    shaka.addEventListener('variantchanged', () => {
      this.updateResolutionVariants();
    });

    // Fired when ABR status is changed, regardless of track change.
    shaka.addEventListener('abrstatuschanged', () => {
      this.updateResolutionVariants();
    });

    // Fired when buffering starts and ends.
    shaka.addEventListener('buffering', () => {
      this.updateResolutionVariants();
    });
  }

  // When the user selects the resolution variant
  selectResolutionVariantById(resolutionVariantId: number): void {
    if (
      !this.mseTech ||
      !this.mseTech.configure ||
      !this.mseTech.getVariantTracks ||
      !this.mseTech.selectVariantTrack
    ) {
      throw new Error('mseTech should not be missing Shaka functions');
    }

    const variantTrack = this.mseTech
      .getVariantTracks()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .find((track: any) => track.id === resolutionVariantId);

    if (!variantTrack || resolutionVariantId === defaultAutoVariant.id) {
      // Select auto
      this.mseTech.configure({ abr: { enabled: true } });
      // Optimistically update selectedResolutionVariant
      this.selectedResolutionVariant =
        this.resolutionVariantOptions.find(opt => opt.id === -1) ??
        defaultAutoVariant;
    } else {
      this.mseTech.configure({ abr: { enabled: false } });
      /* Clear buffer when selecting a non-auto variant track to play it sooner.
       * selectVariantTrack(track, clearBufferopt, safeMarginopt) */
      try {
        this.mseTech.selectVariantTrack(variantTrack, true, 6);
        // Optimistically update selectedResolutionVariant
        this.selectedResolutionVariant = {
          id: variantTrack.id,
          width: variantTrack.width,
          height: variantTrack.height,
        };
      } catch (err) {
        this.trigger(SystemEvents.error, err);
      }
    }

    this.trigger(SystemEvents.resolutionVariantChanged);
  }
}
