import { SENTRY_ENABLED } from '@js/constants/environment';

import { WEBSITE_SENTRY_DSN } from '@js/constants/ids';
import { LOOM_VERSION_NUMERIC, NODE_ENV } from '@js/constants/runtimeConfig';

import { LOOM_VERSION } from '@js/constants/versions';

import * as Sentry from '@sentry/browser';
import { selectFromCurrentUserCache } from '@js/common/current-user/cache/selectFromCurrentUserCache';

let sentryMemo;

enum SentrySeverityLevels {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Log = 'log',
  Info = 'info',
  Debug = 'debug',
}

export const init = (): any => {
  if (!SENTRY_ENABLED) {
    return;
  }

  if (sentryMemo) {
    return sentryMemo;
  }

  const userEmail = selectFromCurrentUserCache(user => user.email, '');

  // Passing any falsey value as the DSN will disable sending events upstream
  Sentry.init({
    dsn: WEBSITE_SENTRY_DSN,
    release: LOOM_VERSION,
    environment: NODE_ENV,
    // Log all errors for loommates, but sample them for other users (and anonymous users).
    // We account for Loom subdomains here as well, for support contractors.
    sampleRate:
      userEmail?.endsWith('@loom.com') || userEmail?.endsWith('.loom.com')
        ? 1
        : 0.2,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Failed to fetch',
      'NetworkError when attempting to fetch resource.',
      'Fullscreen request denied',
      'Not in fullscreen mode',
      'GraphQL error: No Video found',
      'GraphQL error: Need logged in viewer to fetch info',
      "Cannot read property 'focus' of null",
      'Unexpected token < in JSON at position 0',
      /Users platform not supported/,
      /NotFoundError/,
      /AbortError/,
      'There is no clipping info for given tab',
    ],
    // ignore errors NOT coming from our CDN or website
    // https://github.com/getsentry/sentry-javascript/blob/master/packages/browser/examples/app.js
    allowUrls: [new RegExp(/loom\.com/)],
    beforeBreadcrumb(breadcrumb) {
      // noisy redux actions
      return breadcrumb.message &&
        ['update-video-player-current-time'].includes(breadcrumb.message)
        ? null
        : breadcrumb;
    },
    replaysOnErrorSampleRate: 0.001,
    integrations: [
      new Sentry.Replay({
        // TODO (Romain): Update privacy config after evaluating the impact
        // starting with the most private config
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });

  Sentry.setContext('app', {
    loomVersionNumeric: LOOM_VERSION_NUMERIC,
  });

  sentryMemo = Sentry;

  return sentryMemo;
};

export const setUserContext = (context: Sentry.User): void => {
  if (!SENTRY_ENABLED) {
    return;
  }

  Sentry.configureScope(scope => {
    scope.setUser(context);
  });
};

const trackError = (
  exception,
  context = {},
  level = SentrySeverityLevels.Error,
  tags = {}
): void => {
  if (!SENTRY_ENABLED) {
    return;
  }

  Sentry.withScope(scope => {
    scope.setTags(tags);
    scope.setLevel(level);
    scope.setExtras(context);
    Sentry.captureException(exception);
  });
};

export const logFatal = (
  exception: Error | string,
  context = {},
  tags = {}
): void => {
  return trackError(exception, context, SentrySeverityLevels.Fatal, tags);
};

export const logError = (
  exception: Error | string,
  context = {},
  tags = {}
): void => {
  return trackError(exception, context, SentrySeverityLevels.Error, tags);
};

export const addBreadcrumb = (args: Sentry.Breadcrumb): void =>
  Sentry.addBreadcrumb(args);
