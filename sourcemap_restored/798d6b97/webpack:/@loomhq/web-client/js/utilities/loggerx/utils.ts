import { datadogLogs, type StatusType } from '@datadog/browser-logs';
import { DATADOG_LOG_ENABLE } from '@js/constants/runtimeConfig';
import type { Level, SanitizedContext } from '@loomhq/loggerx';
import { ALL_LEVELS } from './constants';
import type { LogLevel } from '@loomhq/enums';

export const isLogLevelAllowed = (level: Level, logLevels: string): boolean => {
  return logLevels.split(',').includes(level);
};

export const validateLogLevel = (level: string): boolean =>
  Boolean(level && ALL_LEVELS.includes(level as LogLevel));

export const logOutput = (
  level: StatusType,
  message: string,
  context?: SanitizedContext,
  tags?: Record<string, unknown>
): void => {
  // When logging to datadog we also log to the console, so no need to do both
  if (DATADOG_LOG_ENABLE) {
    try {
      datadogLogs.logger.log(
        String(message),
        { message, ...context, ...tags },
        level
      );
    } catch {
      console[level](message, context, tags);
    }
  } else {
    console[level](message, context, tags);
  }
};
