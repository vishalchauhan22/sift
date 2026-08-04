import {
  getLocalStorageKey,
  clearLocalStorageKey,
  setLocalStorageKey,
} from '../localStorage';
import { webLoggerConfig, setLogLevel } from './config';
import { buildBrowserLogger } from '@loomhq/loggerx/browser';
import { LOG_LEVEL_KEY, CONSOLE_LOGGING_ENABLED_KEY } from './constants';
import { isDevOrTest } from '@js/constants/environment';
import { initializeDatadog } from './initializeDatadog';

const consoleLoggingEnabled =
  getLocalStorageKey(CONSOLE_LOGGING_ENABLED_KEY) ?? isDevOrTest;

initializeDatadog(consoleLoggingEnabled);

const logger = buildBrowserLogger(webLoggerConfig);

// Export individual methods for backward compatibility
export const fatal = logger.fatal;
export const error = logger.error;
export const warning = logger.warning;
export const info = logger.info;
export const debug = logger.debug;
export const addCrumb = logger.addCrumb;
export const captureCrumb = logger.captureCrumb;

const loomLogging = {
  setLogLevel,
  unsetLogLevel: () => {
    clearLocalStorageKey(LOG_LEVEL_KEY);
  },
  enableConsoleLogging: () => {
    setLocalStorageKey(CONSOLE_LOGGING_ENABLED_KEY, true);
    // Using console log since loggerx will explicitly not display the message to the dev here
    // eslint-disable-next-line no-console
    console.log('Reload the page to begin seeing console logs');
  },
  unsetConsoleLogging: () => {
    clearLocalStorageKey(CONSOLE_LOGGING_ENABLED_KEY);
  },
};

// @ts-expect-error window is a global
window.setLoomDebuggingLevel = setLogLevel;
// @ts-expect-error window is a global
window.loomLogging = loomLogging;
