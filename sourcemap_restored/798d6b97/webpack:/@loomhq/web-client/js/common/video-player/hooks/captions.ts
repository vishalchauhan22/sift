import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useReducer,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { SystemEvents } from '../api/player';

import { useVideoContext } from '../context';

import {
  debounce,
  usePlayer,
  usePlayerHasStarted,
  useStylizedCaptionsEnabled,
  useToggleCaptions,
} from '.';
import { captionsStore, getAvailableLanguages } from './captionsStore';
import { useTranscript } from '@js/common/transcripts';
import {
  guideTextReducer,
  initialState,
  useTimerManager,
} from './caption-utils';
import { useMarkRUMSuccess } from '@js/utilities/rum/markers';
import { SuccessMarkers } from '@js/utilities/rum/constants';

const GUIDE_TEXT_TIMEOUTS = {
  BUTTON_CLICK_DISPLAY: 4000,
  CAPTIONS_ACTIVE_DISPLAY: 4000,
  CACHED_RESULT_DISPLAY: 4000,
  SHOW_SUB_TEXT: 10000,
  CHANGE_WAITING_TEXT: 10000,
  HIDE_WAITING_TEXT: 2000,
} as const;

export function useDraggableCaption(
  captionsUrl: string
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  const { video } = useVideoContext();
  const { stylizedCaptionsEnabled } = useStylizedCaptionsEnabled();
  const lock = useRef(false);
  const isDirty = useRef(false);
  const initialCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });
  const offsetCoords = useRef({ x: 0, y: 0 });

  const animationRef = useRef<Animation | null>(null);

  const translate = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const captionBox = ref.current;

    captionBox.style.top = `${currentCoords.current.y}px`;
    captionBox.style.left = `${currentCoords.current.x}px`;
  }, []);

  // adjust the box to stay inside its boundaries
  const onReposition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const captionBox = ref.current;
    const boundingBox = captionBox.parentNode as HTMLElement;

    const cbox = captionBox.getBoundingClientRect();
    const box = boundingBox.getBoundingClientRect();

    let { x } = offsetCoords.current;
    let { y } = offsetCoords.current;

    const diffRight = Math.max(cbox.right - box.right, 0);
    const diffBottom = Math.max(cbox.bottom - box.bottom, 0);
    const diffLeft = Math.max(box.left - cbox.left, 0);
    const diffTop = Math.max(box.top - cbox.top, 0);

    y += diffTop;
    y -= diffBottom;
    x += diffLeft;
    x -= diffRight;

    currentCoords.current.x = x;
    currentCoords.current.y = y;

    offsetCoords.current.x = currentCoords.current.x;
    offsetCoords.current.y = currentCoords.current.y;

    translate();
  }, [translate]);

  // center the captions box in its default position
  const onReset = useCallback(() => {
    currentCoords.current.x = 0;
    currentCoords.current.y = 0;

    offsetCoords.current.x = currentCoords.current.x;
    offsetCoords.current.y = currentCoords.current.y;

    translate();
  }, [translate]);

  // if the user has not interacted with the captions, keep them centered
  // once the captions have been moved, make sure they stay in their boundaries
  const onResize = useCallback(() => {
    isDirty.current ? onReposition() : onReset();
  }, [onReposition, onReset]);

  // handle centered positioning reset
  // when toggling captions on/off
  const onToggle = useCallback((e: CustomEvent) => {
    if (!ref.current) {
      return;
    }

    const captionBox = ref.current;

    if (!e.detail) {
      captionBox.classList.remove('active');

      return;
    }

    isDirty.current = false;
  }, []);

  // custom event that accept the text to display as detail
  const onTextChange = useCallback(
    (e: CustomEvent) => {
      if (!ref.current) {
        return;
      }

      const captionBox = ref.current;

      const txt = e.detail;

      // no text content means hide the box
      if (!txt) {
        captionBox.classList.remove('active');

        if (animationRef.current) {
          animationRef.current.cancel();
        }

        return;
      }

      captionBox.classList.add('active');
      captionBox.textContent = txt;

      const isReducedMotion = window.matchMedia(
        `(prefers-reduced-motion: reduce)`
      );

      if (stylizedCaptionsEnabled && captionBox) {
        let keyframes = [
          { opacity: '50%', transform: 'translateY(0)' },
          { opacity: '95%', transform: 'translateY(0)' },
        ];

        if (!isReducedMotion.matches) {
          keyframes = [
            { opacity: '50%', transform: 'translateY(8px)' },
            { opacity: '95%', transform: 'translateY(0px)' },
          ];
        }

        const animationFillMode: FillMode = 'forwards';

        const options = {
          duration: 200,
          fill: animationFillMode,
        };

        animationRef.current = captionBox.animate(keyframes, options);
      }

      onResize();
    },
    [onResize, stylizedCaptionsEnabled]
  );

  const onMouseDown = useCallback((e: MouseEvent) => {
    lock.current = true;
    isDirty.current = true;

    initialCoords.current.x = e.clientX - offsetCoords.current.x;
    initialCoords.current.y = e.clientY - offsetCoords.current.y;
  }, []);

  const onMouseUp = useCallback(() => {
    lock.current = false;
    initialCoords.current.x = currentCoords.current.x;
    initialCoords.current.y = currentCoords.current.y;
  }, []);

  // move the box within its boundaries
  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      const captionBox = ref.current;
      const boundingBox = captionBox.parentNode as HTMLElement;
      const box = boundingBox.getBoundingClientRect();
      const cbox = captionBox.getBoundingClientRect();

      if (!lock.current) {
        return;
      }

      let x = e.clientX - initialCoords.current.x;
      let y = e.clientY - initialCoords.current.y;

      // move the box stays within its left boundaries
      if (x < (cbox.width - box.width) / 2) {
        x = (cbox.width - box.width) / 2;
      }

      // move the box stays within its right boundaries
      if (x > (box.width - cbox.width) / 2) {
        x = (box.width - cbox.width) / 2;
      }

      // move the box stays within its bottom boundaries
      if (y > 0) {
        y = 0;
      }

      // move the box stays within its top boundaries
      if (y < -box.height + cbox.height) {
        y = -box.height + cbox.height;
      }

      currentCoords.current.x = x;
      currentCoords.current.y = y;

      offsetCoords.current.x = currentCoords.current.x;
      offsetCoords.current.y = currentCoords.current.y;

      translate();
    },
    [translate]
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const captionBox = ref.current;
    const boundingBox = captionBox.parentNode as HTMLElement;

    const obs = new ResizeObserver(debounce(onResize, 100));

    obs.observe(boundingBox);

    onReset();

    captionBox.addEventListener('mousedown', onMouseDown);
    captionBox.addEventListener('change', onTextChange as EventListener);
    captionBox.addEventListener('toggle', onToggle as EventListener);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDrag);

    return () => {
      obs.disconnect();
      captionBox.removeEventListener('mousedown', onMouseDown);
      captionBox.removeEventListener('change', onTextChange as EventListener);
      captionBox.removeEventListener('toggle', onToggle as EventListener);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onDrag);
    };
  }, [
    ref,
    captionsUrl,
    video.stylizedCaptions,
    onResize,
    onReset,
    onMouseDown,
    onTextChange,
    onToggle,
    onMouseUp,
    onDrag,
  ]);

  return ref;
}

// enhance the useDraggableCaption behavior
// by hokking it up to the current video's text track
export function useCaptions(
  videoId: string,
  captionsUrl = '',
  forceActive = false
): React.RefObject<HTMLDivElement> {
  const player = usePlayer(videoId);
  const ref = useDraggableCaption(captionsUrl);
  const markSuccess = useMarkRUMSuccess();
  const hasMarkedSuccess = useRef(false);

  useEffect(() => {
    if (!player || !ref.current || !captionsUrl) {
      return;
    }

    const hideTracks = () => {
      [...player.media.textTracks]
        .filter(t => t.kind === 'captions')
        .forEach(track => {
          track.mode = 'hidden';
        });
    };

    if (forceActive) {
      player.closedCaptions = true;
    }

    player.media.textTracks.addEventListener('addtrack', hideTracks);

    const captionBox = ref.current as HTMLElement;
    const track = createTrack(captionsUrl, () => {
      if (!hasMarkedSuccess.current) {
        markSuccess(SuccessMarkers.CaptionsLoaded);
        hasMarkedSuccess.current = true;
      }
    });

    const dispatchCueChange = (detail?: string | null) => {
      captionBox.dispatchEvent(new CustomEvent('change', { detail }));

      return false;
    };

    const onCaptionsToggle = () => {
      captionBox.dispatchEvent(
        new CustomEvent('toggle', { detail: player.closedCaptions })
      );
      onCueChange();
    };

    const onCueChange = () => {
      if (!player.closedCaptions) {
        return dispatchCueChange();
      }

      const cues = track.track.activeCues;
      const currentCue = cues?.[0] as VTTCue;

      const text = currentCue?.getCueAsHTML().textContent;

      return dispatchCueChange(text);
    };

    const onAddTrack = () => player.media.appendChild(track);
    const onEnded = () => dispatchCueChange('');

    track.addEventListener('cuechange', onCueChange);
    player.on([SystemEvents.closedCaptions], onCaptionsToggle);
    player.mediaOn(['ended'], onEnded);

    player.on([SystemEvents.ready], onAddTrack, true);

    return () => {
      track.removeEventListener('cuechange', onCueChange);
      player.off([SystemEvents.closedCaptions], onCaptionsToggle);
      player.media.textTracks.removeEventListener('addtrack', hideTracks);
      player.mediaOff(['ended'], onEnded);
    };
  }, [player, ref, captionsUrl, forceActive, markSuccess]);

  return ref;
}

function createTrack(url: string, onLoad: () => void) {
  const track = document.createElement('track');

  track.kind = 'captions';
  track.label = 'English';
  track.srclang = 'en';
  track.src = url;
  track.addEventListener('load', onLoad);

  return track;
}

export function useGuideTextVisibilityFromButtons(videoId: string): {
  isVisible: boolean;
} {
  const [isVisible, setIsVisible] = useState(false);
  const { captionsActive } = useToggleCaptions(videoId);

  const { setHasCaptionsLanguageChanged } = captionsStore(state => state);

  const hasPlayButtonBeenClicked = usePlayerHasStarted(videoId);

  const { addTimer, clearAllTimers } = useTimerManager();

  const showTextTemporarily = useCallback(() => {
    setIsVisible(true);
    setHasCaptionsLanguageChanged(false);
  }, [setHasCaptionsLanguageChanged]);

  // Displays the text on the 1st play
  useEffect(() => {
    if (hasPlayButtonBeenClicked && captionsActive) {
      showTextTemporarily();

      addTimer(
        setTimeout(() => {
          setIsVisible(false);
        }, GUIDE_TEXT_TIMEOUTS.CAPTIONS_ACTIVE_DISPLAY)
      );
    }
  }, [addTimer, captionsActive, hasPlayButtonBeenClicked, showTextTemporarily]);

  // Displays the text when the CC button is clicked
  useEffect(() => {
    if (captionsActive) {
      showTextTemporarily();

      addTimer(
        setTimeout(() => {
          setIsVisible(false);
        }, GUIDE_TEXT_TIMEOUTS.BUTTON_CLICK_DISPLAY)
      );
    } else {
      setIsVisible(false);
      setHasCaptionsLanguageChanged(false);
    }

    return clearAllTimers;
  }, [
    captionsActive,
    showTextTemporarily,
    setHasCaptionsLanguageChanged,
    addTimer,
    clearAllTimers,
  ]);

  return {
    isVisible,
  };
}

export function useGuideTextVisibilityFromLanguageChange(): {
  isVisible: boolean;
  subTextIsVisible: boolean;
  showTheWaitingCaptionText: boolean;
} {
  const [reducerState, dispatch] = useReducer(guideTextReducer, initialState);

  const { hasCaptionsLanguageChanged, setHasCaptionsLanguageChanged } =
    captionsStore(state => state);

  const { isCaptionsTranslationInProgress, captionsUrl } = useTranscript();

  const { addTimer, clearAllTimers } = useTimerManager();

  // Manages the guide text visibility when a language changes
  useEffect(() => {
    clearAllTimers(); // Clean slate - no competing timers

    if (
      isCaptionsTranslationInProgress &&
      hasCaptionsLanguageChanged &&
      captionsUrl === null
    ) {
      if (reducerState.timerPhase === 'idle') {
        dispatch({ type: 'SHOW_GUIDE', payload: { startTimer: true } });

        addTimer(
          setTimeout(() => {
            dispatch({ type: 'HIDE_GUIDE' });
            setHasCaptionsLanguageChanged(false);
          }, GUIDE_TEXT_TIMEOUTS.SHOW_SUB_TEXT)
        );
      }

      if (reducerState.timerPhase === 'initial') {
        addTimer(
          setTimeout(() => {
            dispatch({ type: 'HIDE_SUB_TEXT' });
          }, GUIDE_TEXT_TIMEOUTS.SHOW_SUB_TEXT)
        );
      }

      if (reducerState.timerPhase === 'extended') {
        addTimer(
          setTimeout(() => {
            dispatch({ type: 'SHOW_WAITING_TEXT' });
          }, GUIDE_TEXT_TIMEOUTS.CHANGE_WAITING_TEXT)
        );
      }

      if (reducerState.timerPhase === 'waiting') {
        // Extension logic - cancels hideTimer if needed
        addTimer(
          setTimeout(() => {
            if (isCaptionsTranslationInProgress && captionsUrl === null) {
              dispatch({ type: 'HIDE_GUIDE' });
              setHasCaptionsLanguageChanged(false);
            }
          }, GUIDE_TEXT_TIMEOUTS.HIDE_WAITING_TEXT)
        );
      }
    } else if (captionsUrl) {
      addTimer(
        setTimeout(() => {
          dispatch({ type: 'HIDE_GUIDE' });
          setHasCaptionsLanguageChanged(false);
        }, GUIDE_TEXT_TIMEOUTS.CACHED_RESULT_DISPLAY)
      );
    } else {
      dispatch({ type: 'HIDE_GUIDE' });
      setHasCaptionsLanguageChanged(false);
    }
  }, [
    hasCaptionsLanguageChanged,
    isCaptionsTranslationInProgress,
    setHasCaptionsLanguageChanged,
    addTimer,
    clearAllTimers,
    captionsUrl,
    reducerState.timerPhase,
  ]);

  return {
    isVisible: reducerState.isVisible,
    subTextIsVisible: reducerState.subTextIsVisible,
    showTheWaitingCaptionText: reducerState.showTheWaitingCaptionText,
  };
}

export function useGuideTextVisibility(videoId: string): {
  isVisible: boolean;
  subTextIsVisible: boolean;
  showTheWaitingCaptionText: boolean;
} {
  const {
    isVisible: visibilityFromLanguageChange,
    subTextIsVisible,
    showTheWaitingCaptionText,
  } = useGuideTextVisibilityFromLanguageChange();
  const { isVisible: visibilityFromButtons } =
    useGuideTextVisibilityFromButtons(videoId);

  return {
    isVisible: visibilityFromButtons || visibilityFromLanguageChange,
    subTextIsVisible,
    showTheWaitingCaptionText,
  };
}

export const getActiveLanguageName = (
  captionsLanguageSelection: string
): string => {
  const availableLanguages = getAvailableLanguages();

  const languageName = availableLanguages.find(language => {
    return language.id === captionsLanguageSelection;
  })?.label;

  return languageName ? languageName : '';
};
