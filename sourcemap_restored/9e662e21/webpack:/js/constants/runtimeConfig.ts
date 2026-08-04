import { stringUtils } from '@loomhq/shared-utilities';

const { rot13Cipher } = stringUtils;

// runtime configuration passed down by the app
const _LOOM_ = getConfig();

export const NODE_ENV = _LOOM_.NODE_ENV;
export const CLIENT_LOG_LEVELS = _LOOM_.CLIENT_LOG_LEVELS;
export const LOOM_SHOW_RUM_FEATURE_LOGS = _LOOM_.LOOM_SHOW_RUM_FEATURE_LOGS;
export const BILLING_RECAPTCHA_SITE_KEY = _LOOM_.BILLING_RECAPTCHA_SITE_KEY;
export const GOOGLE_API_CLIENT_ID = _LOOM_.GOOGLE_API_CLIENT_ID;
export const CHROME_EXTENSION_ID = _LOOM_.CHROME_EXTENSION_ID;
export const CLOUDFRONT_URI = _LOOM_.CLOUDFRONT_URI;
export const AVSERVER_CLOUDFRONT_URI = _LOOM_.AVSERVER_CLOUDFRONT_URI;
export const ANON_COOKIE_DOMAIN = _LOOM_.ANON_COOKIE_DOMAIN;
export const LOOM_BARE_URI = _LOOM_.LOOM_BARE_URI;
export const LOOM_URI = _LOOM_.LOOM_URI;
export const LOOM_RECORD_WS_URI = _LOOM_.LOOM_RECORD_WS_URI;
export const LOOM_DESKTOP_PROTOCOL = _LOOM_.LOOM_DESKTOP_PROTOCOL;
export const LOOM_VERSION = _LOOM_.LOOM_VERSION;
export const LOOM_VERSION_NUMERIC = _LOOM_.LOOM_VERSION_NUMERIC;
export const LOOM_WEB_REQUEST_SOURCE = `loom_web_${_LOOM_.LOOM_VERSION}`;
export const DATADOG_RUM_ENABLE = _LOOM_.DATADOG_RUM_ENABLE;
export const DATADOG_RUM_SERVICE = _LOOM_.DATADOG_RUM_SERVICE;
export const DATADOG_CLIENT_KEY = _LOOM_.DATADOG_CLIENT_KEY;
export const DATADOG_RUM_APPLICATION_ID = _LOOM_.DATADOG_RUM_APPLICATION_ID;
export const DATADOG_RUM_CLIENT_TOKEN = _LOOM_.DATADOG_RUM_CLIENT_TOKEN;
export const DATADOG_RUM_SESSION_SAMPLE_RATE =
  _LOOM_.DATADOG_RUM_SESSION_SAMPLE_RATE;
export const DATADOG_RUM_SESSION_REPLAY_SAMPLE_RATE =
  _LOOM_.DATADOG_RUM_SESSION_REPLAY_SAMPLE_RATE;
export const DATADOG_LOG_ENABLE = _LOOM_.DATADOG_LOG_ENABLE;
export const DATADOG_LOG_SERVICE = _LOOM_.DATADOG_LOG_SERVICE;
export const DATADOG_LOG_CLIENT_TOKEN = _LOOM_.DATADOG_LOG_CLIENT_TOKEN;
export const DATADOG_LOG_SAMPLE_RATE = _LOOM_.DATADOG_LOG_SAMPLE_RATE;
export const PUSH_SERVER_PUBLIC_KEY = _LOOM_.PUSH_SERVER_PUBLIC_KEY;
export const STRIPE_PUBLIC_KEY = _LOOM_.STRIPE_PUBLIC_KEY;
export const INTEGRATIONS_APP_URL = _LOOM_.INTEGRATIONS_APP_URL;
export const LOOM_SDK_API_KEY = _LOOM_.LOOM_SDK_API_KEY;
export const LOOM_WORKSPACE_SIZE = _LOOM_.LOOM_WORKSPACE_SIZE;
export const CANNY_IO_APP_ID = _LOOM_.CANNY_IO_APP_ID;
export const INTERCOM_APP_ID = _LOOM_.INTERCOM_APP_ID;
export const SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE =
  _LOOM_.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE;
export const FB_APP_ID = _LOOM_.FB_APP_ID;
export const ATLASSIAN_OIDC_INITIATION_ROUTE =
  _LOOM_.ATLASSIAN_OIDC_INITIATION_ROUTE;
export const ADMIN_HUB_URI = _LOOM_.ADMIN_HUB_URI;
export const ATLASSIAN_PROFILE_MANAGEMENT_URI =
  _LOOM_.ATLASSIAN_PROFILE_MANAGEMENT_URI;
export const ATLASSIAN_CLOUD_OPERATIONAL_URI =
  _LOOM_.ATLASSIAN_CLOUD_OPERATIONAL_URI;
export const ATLASSIAN_SNOOPR_URI = _LOOM_.ATLASSIAN_SNOOPR_URI;
export const ATLASSIAN_GOVERNATOR_URI = _LOOM_.ATLASSIAN_GOVERNATOR_URI;

function getConfig() {
  if (!window['_LOOM_']) {
    return {};
  }

  try {
    // eslint-disable-next-line no-restricted-properties
    return JSON.parse(decodeURIComponent(rot13Cipher(window['_LOOM_'])));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse runtime config:', e, {
      encodedString: window['_LOOM_'],
    });
  }

  return {};
}

// clearing the state to make it a tiny lil baby bit more difficult to find it
delete window['_LOOM_'];
