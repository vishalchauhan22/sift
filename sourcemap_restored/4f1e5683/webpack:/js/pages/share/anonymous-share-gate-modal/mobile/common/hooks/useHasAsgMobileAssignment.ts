import { useEffect, useState } from 'react';

export const sessionKey = 'asgModalMobileSession';
export const asgModal = 'hideAsgMobileModal';
export const visitCountKey = 'asgMobileVisitCount';
// Intentional exception since this is the utility function
// eslint-disable-next-line no-restricted-properties
export const visitCount = Number(localStorage.getItem(visitCountKey));

export function useHasAsgMobileAssignment({
  meetsAsgMobilePrecheck,
}: {
  meetsAsgMobilePrecheck: boolean;
}): boolean {
  const [hasAsgMobileAssignment, setHasAsgMobileAssignment] =
    useState<boolean>(false);

  // Intentional exception since this is the utility function
  // eslint-disable-next-line no-restricted-properties
  const visitCount = localStorage.getItem(visitCountKey);
  const current = Boolean(sessionStorage.getItem(sessionKey));

  useEffect(() => {
    if (!window.sessionStorage) {
      return;
    }

    if (!current) {
      setSession();
    }
  }, [current]);

  useEffect(() => {
    // Prevent visitor count from running if eligibility conditions aren't met.
    if (!meetsAsgMobilePrecheck) {
      return setHasAsgMobileAssignment(false);
    }

    if (visitCount) {
      // We only increase the count if it is not in the same session (to eliminate refreshes)
      if (!current) {
        logVisit();
      }

      const hideModal = logHideModal();
      const visitCountNo = Number(visitCount);

      // We want user to see modal on visit 2 (translated for JS).
      const meetsVisitConditions = visitCountNo === 1 && !hideModal;

      if (meetsVisitConditions) {
        setHasAsgMobileAssignment(true);
      }
    }

    if (!visitCount) {
      setCounter();
    }
  }, [meetsAsgMobilePrecheck, current, visitCount]);

  return hasAsgMobileAssignment;
}

export function logHideModal(): boolean | void {
  // Ensure localStorage is available
  if (!window.localStorage) {
    return;
  }

  // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  const modalStatus = Boolean(localStorage.getItem(asgModal));

  return modalStatus;
}

export function setHideModal(): void {
  // TODO(next author): Please use setLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  localStorage.setItem(asgModal, JSON.stringify(true));
}

export function setCounter(): void {
  // TODO(next author): Please use setLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  localStorage.setItem(visitCountKey, JSON.stringify(0));
}

export function setSession(): void {
  sessionStorage.setItem(sessionKey, JSON.stringify(true));
}

// Registers visit to share page
export function logVisit(): void {
  // Converts value into number so we can add to it
  // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  const visitCount = Number(localStorage.getItem(visitCountKey));

  // Upticks visit
  const counter = visitCount + 1;

  // Restringifies JSON value
  // TODO(next author): Please use setLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  localStorage.setItem(visitCountKey, JSON.stringify(counter));
}
