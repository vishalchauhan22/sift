import { v4 as uuidv4 } from 'uuid';

import { MILLISECONDS_TO } from '@loomhq/shared-utilities/constants/units';
import { VIEWER_SESSION_DATA } from '@js/constants/localStorage';

import { getLocalStorageKey, setLocalStorageKey } from './index';

const EXPIRATION_PERIOD = 6 * MILLISECONDS_TO.HOUR;

export const getViewerSessionIdAndUpdateTimestamp = (): string => {
  const setNewSessionIdInStorage = (): string => {
    const sessionId = uuidv4();

    setLocalStorageKey(VIEWER_SESSION_DATA, {
      lastUpdatedTimestamp: Date.now(),
      sessionId,
    });

    return sessionId;
  };

  const sessionData = getLocalStorageKey(VIEWER_SESSION_DATA);

  if (!sessionData) {
    return setNewSessionIdInStorage();
  }

  const { sessionId, lastUpdatedTimestamp } = sessionData;

  if (Date.now() - lastUpdatedTimestamp > EXPIRATION_PERIOD) {
    // The session has expired, generate a new id
    return setNewSessionIdInStorage();
  }

  // Prolong the existing active session
  setLocalStorageKey(VIEWER_SESSION_DATA, {
    lastUpdatedTimestamp: Date.now(),
    sessionId,
  });

  return sessionId;
};
