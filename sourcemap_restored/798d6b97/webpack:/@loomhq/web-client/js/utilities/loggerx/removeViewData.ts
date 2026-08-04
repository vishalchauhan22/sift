/**
 * Utility functions for removing sensitive view data from Datadog logs
 */

import type { LogsEvent } from '@datadog/browser-logs';

/**
 *  https://docs.datadoghq.com/logs/log_collection/javascript/#scrub-sensitive-data-from-your-browser-logs
 * Removes the view object entirely from log attributes to prevent any sensitive data leakage
 */
export const removeViewData = (log: LogsEvent): void => {
  if (log?.view) {
    delete (log as { view?: unknown }).view;
  }
};
