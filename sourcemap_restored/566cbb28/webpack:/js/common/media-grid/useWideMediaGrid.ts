/*
 * Checks localStorage for show-wide-grid setting.
 * If it's not set, then check the feature flag to
 * set its value. Defaults to false.
 * Temporary for internal rollout to QA.
 * Will not be GA code.
 *
 */

import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useEffect, useRef } from 'react';
import { jsonParseOrDefault } from '@js/utilities/json/safe-json-parse';

import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

const SHOW_WIDE_GRID_KEY = 'show-wide-grid';

export const useWideMediaGrid = (): boolean => {
  const mediaGridRef = useRef(false);

  useEffect(() => {
    if (!mediaGridRef.current) {
      return;
    }

    if (mediaGridRef.current === true) {
      document.documentElement.style.setProperty(
        '--wideSearchBar',
        '166.75rem'
      );
      document.documentElement.style.setProperty(
        '--profileBubbleWideOffset',
        '1.5rem'
      );
    }
  }, []);
  const flagValue = useFlagIsActivated({
    flag: FEATURE_GATES.ROLLOUT_MEETING_RECORDING_GA_UX,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  const storedValue = getLocalStorageKey(SHOW_WIDE_GRID_KEY);
  if (storedValue !== null) {
    mediaGridRef.current = jsonParseOrDefault(storedValue, false);
  } else if (flagValue !== undefined) {
    const isActive = flagValue === true;
    setLocalStorageKey(SHOW_WIDE_GRID_KEY, isActive);
    mediaGridRef.current = isActive;
  }
  return mediaGridRef.current;
};
