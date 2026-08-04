import { useCurrentUserSelector } from '@js/common/current-user';
import { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { getCookie } from '@js/utilities/cookieUtils';

import { KEY_AJS_ANON_ID } from '@loomhq/shared-utilities/constants/cookie';

// Store a map of { [userId]: val } for users who dismissed a UI element.
// Returns a tuple of [valueForUser, setValueForUser], following a shape
// similar to useState
export function useStoredStateForUser<T>(key: string): [T, (val?: T) => void] {
  const [value, setValue] = useLocalStorageState(key);
  const currentUserId = useCurrentUserSelector(user => user.id, -1);

  return [
    value?.[currentUserId] as T,
    (val: T | boolean = true) => {
      setValue(prevValue => ({ ...prevValue, [currentUserId]: val }));
    },
  ];
}

// Store a map of { [anonId] : val} for users who dismissed a UI element.
// Returns a tuple of [valueForUser, setValueForUser], following a shape
// similar to useState
export function useStoredStateForAnonUser<T>(
  key: string
): [T, (val: T) => void] {
  const [value, setValue] = useLocalStorageState(key);
  const ajsIdEncoded = getCookie(KEY_AJS_ANON_ID);
  const ajsIdDecoded = (ajsIdEncoded || '').replace(/"/g, '');

  return [
    value?.[ajsIdDecoded],
    useCallback(
      (val: T | boolean = true) => {
        setValue({
          ...(value as Record<string, T>),
          [ajsIdDecoded]: val,
        });
      },
      [value, setValue, ajsIdDecoded]
    ),
  ];
}

// Takes in a map of:
//    manualDismissed: Boolean,
//    timeDismissal: String or Boolean (Unix timestamp or true if already time-dismissed)
//    setTimedDismissal: (a hook to set a new timeDismissal or toggle the element as time-dismissed)
// Returns a boolean of whether or not to dimiss element
export function useTimedDismissal({
  manualDismissed,
  timeDismissal,
  setTimedDismissal,
}: {
  manualDismissed: boolean;
  timeDismissal: string | boolean;
  setTimedDismissal: (val: boolean) => void;
}): boolean {
  if (manualDismissed || timeDismissal === true) {
    return true;
  }

  if (typeof timeDismissal === 'undefined') {
    return false;
  }

  const now = Date.now();

  if (now > Number(timeDismissal)) {
    setTimedDismissal(true);

    return true;
  }

  return false;
}
