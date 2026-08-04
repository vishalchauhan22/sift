import { datadogLogs } from '@datadog/browser-logs';
import {
  DATADOG_LOG_CLIENT_TOKEN,
  DATADOG_LOG_ENABLE,
  DATADOG_LOG_SAMPLE_RATE,
  DATADOG_LOG_SERVICE,
  LOOM_VERSION,
  NODE_ENV,
  LOOM_VERSION_NUMERIC,
} from '@js/constants/runtimeConfig';
import { removeViewData } from './removeViewData';

export const initializeDatadog = (consoleLoggingEnabled: boolean): void => {
  if (DATADOG_LOG_ENABLE) {
    datadogLogs.init({
      clientToken: DATADOG_LOG_CLIENT_TOKEN,
      forwardErrorsToLogs: false,
      forwardConsoleLogs: ['log', 'debug', 'info', 'warn'], // Exclude errors since these get tracked to Sentry
      site: 'datadoghq.com',
      env: NODE_ENV,
      version: LOOM_VERSION,
      service: DATADOG_LOG_SERVICE,
      sessionSampleRate: parseInt(DATADOG_LOG_SAMPLE_RATE, 10),
      telemetrySampleRate: 0,
      beforeSend: removeViewData,
    });

    // Log to both datadog and the console
    datadogLogs.logger.setHandler(
      consoleLoggingEnabled ? ['http', 'console'] : ['http']
    );
    datadogLogs.logger.addContext('loomVersionNumeric', LOOM_VERSION_NUMERIC);
  }
};
