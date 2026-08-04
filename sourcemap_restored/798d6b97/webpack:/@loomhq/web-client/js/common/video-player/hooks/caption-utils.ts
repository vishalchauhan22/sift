import { useRef, useCallback, useEffect } from 'react';

interface GuideTextState {
  isVisible: boolean;
  subTextIsVisible: boolean;
  showTheWaitingCaptionText: boolean;
  timerPhase: 'idle' | 'initial' | 'extended' | 'waiting';
}

export const initialState: GuideTextState = {
  isVisible: false,
  subTextIsVisible: true,
  showTheWaitingCaptionText: false,
  timerPhase: 'idle',
};

type GuideTextAction =
  | { type: 'SHOW_GUIDE'; payload?: { startTimer?: boolean } }
  | { type: 'HIDE_GUIDE' }
  | { type: 'HIDE_SUB_TEXT' }
  | { type: 'SHOW_WAITING_TEXT' }
  | { type: 'START_TIMER_PHASE' }
  | { type: 'RESET' };

export const guideTextReducer = (
  state: GuideTextState,
  action: GuideTextAction
): GuideTextState => {
  switch (action.type) {
    case 'SHOW_GUIDE':
      return {
        ...state,
        isVisible: true,
        subTextIsVisible: true, // Always reset sub-text when showing
        showTheWaitingCaptionText: false, // Always reset waiting text
        timerPhase: action.payload?.startTimer ? 'initial' : state.timerPhase,
      };
    case 'HIDE_GUIDE':
      return { ...initialState }; // Atomic reset to valid state
    case 'HIDE_SUB_TEXT':
      return { ...state, subTextIsVisible: false, timerPhase: 'extended' };
    case 'SHOW_WAITING_TEXT':
      return {
        ...state,
        showTheWaitingCaptionText: true,
        timerPhase: 'waiting',
      };
    case 'START_TIMER_PHASE':
      return { ...state, timerPhase: 'initial' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const useTimerManager = (): {
  addTimer: (timer: NodeJS.Timeout) => NodeJS.Timeout;
  clearTimer: (timer: NodeJS.Timeout) => void;
  clearAllTimers: () => void;
} => {
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());

  const addTimer = useCallback((timer: NodeJS.Timeout) => {
    timersRef.current.add(timer);
    return timer;
  }, []);

  const clearTimer = useCallback((timer: NodeJS.Timeout) => {
    clearTimeout(timer);
    timersRef.current.delete(timer);
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  useEffect(() => {
    return clearAllTimers;
  }, [clearAllTimers]);

  return { addTimer, clearTimer, clearAllTimers };
};
