import { useEffect, useReducer, useState } from 'react';

import {
  LARGE_TABLET_MIN_WIDTH,
  MOBILE_MAX_WIDTH,
  TABLET_MAX_WIDTH,
  TABLET_MIN_WIDTH,
  SMALL_DESKTOP_MAX_WIDTH,
  LARGE_TABLET_MAX_WIDTH,
  DESKTOP_MIN_WIDTH,
  WELCOME_STEP_DESKTOP_MIN_WIDTH,
} from '../constants/breakpoints';

export function useMatchMedia(query: string): boolean {
  const [mqList, setMqList] = useState(() => matchMedia(query));
  const [, forceRender] = useReducer(s => ++s, 0);

  useEffect(() => {
    const newMqList = matchMedia(query);
    const onChange = () => forceRender();

    setMqList(newMqList);
    addListener(newMqList, onChange);

    return () => removeListener(newMqList, onChange);
  }, [query]);

  return mqList.matches;
}

export function useMatchMobileOnly(): boolean {
  return useMatchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
}

export function useMatchMobileOrSmallTablet(): boolean {
  return useMatchMedia(`(max-width: ${LARGE_TABLET_MIN_WIDTH}px)`);
}

export function useMatchTabletOnly(): boolean {
  return useMatchMedia(
    `(min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${TABLET_MAX_WIDTH}px)`
  );
}

export function useMatchWelcomeStepDesktop(): boolean {
  return useMatchMedia(
    `(min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${WELCOME_STEP_DESKTOP_MIN_WIDTH}px)`
  );
}

export function useMatchLargeTablet(): boolean {
  return useMatchMedia(
    `(min-width: ${LARGE_TABLET_MIN_WIDTH}px) and (max-width: ${LARGE_TABLET_MAX_WIDTH}px)`
  );
}

export function useMatchLargeTabletOrSmaller(): boolean {
  return useMatchMedia(`(max-width: ${LARGE_TABLET_MAX_WIDTH}px)`);
}

export function useMatchLargeTabletOrDesktop(): boolean {
  return useMatchMedia(`(min-width: ${LARGE_TABLET_MIN_WIDTH}px)`);
}

export function useMatchSmallDesktop(): boolean {
  return useMatchMedia(`(max-width: ${SMALL_DESKTOP_MAX_WIDTH}px)`);
}

export function useMatchDesktop(): boolean {
  return useMatchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
}

function addListener(mqList, callback) {
  if (mqList.addEventListener) {
    mqList.addEventListener('change', callback, { passive: true });
  } else {
    mqList.addListener(callback);
  }
}

function removeListener(mqList, callback) {
  if (mqList.removeEventListener) {
    mqList.removeEventListener('change', callback);
  } else {
    mqList.removeListener(callback);
  }
}
