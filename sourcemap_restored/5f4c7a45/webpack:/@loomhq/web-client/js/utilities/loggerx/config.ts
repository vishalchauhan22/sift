import { CLIENT_LOG_LEVELS } from '@js/constants/runtimeConfig';

import { logOutput, validateLogLevel } from './utils';
import { getLocalStorageKey, setLocalStorageKey } from '../localStorage';
import * as tracker from '../sentry';
import { type BrowserLoggerConfig } from '@loomhq/loggerx/browser';
import { ALL_LEVELS, LOG_LEVEL_KEY } from './constants';
import { Level } from '@loomhq/loggerx';

const localStorageLogLevel = getLocalStorageKey(LOG_LEVEL_KEY);
// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
let LOG_LEVELS: string = localStorageLogLevel || CLIENT_LOG_LEVELS || '';

export const setLogLevel = (level: Level): Level[] => {
  const levels = level.replace(/\s/g, '').split(',').filter(validateLogLevel);

  if (!levels.length) {
    throw `Invalid levels, levels allowed: ${ALL_LEVELS}`;
  }

  LOG_LEVELS = levels.join(',');
  setLocalStorageKey(LOG_LEVEL_KEY, LOG_LEVELS);

  return levels as Level[];
};

export const webLoggerConfig: BrowserLoggerConfig = {
  LOG_LEVELS,
  logOutput,
  tracker: {
    logError: tracker.logError,
    logFatal: tracker.logFatal,
    addBreadcrumb: tracker.addBreadcrumb,
  },
};
