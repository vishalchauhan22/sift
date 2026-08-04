// eslint-disable-next-line no-restricted-imports
import { lazy } from 'react';

import { RetryOptions, DEFAULT_RETRY_OPTIONS } from './RetryOptions';

import type { ComponentType, LazyExoticComponent } from 'react';

type RetryFn<T> = () => Promise<T>;

export const retry = <T>(
  fn: RetryFn<T>,
  { retries, interval, onRetry, failures = 0 }: RetryOptions
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const nextInterval =
      typeof interval === 'number' ? interval : interval(retries - 1, failures);

    fn()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          if (retries === 1) {
            reject(error);

            return;
          }

          onRetry && onRetry();
          retry(fn, {
            retries: retries - 1,
            interval,
            failures: failures + 1,
          }).then(resolve, reject);
        }, nextInterval);
      });
  });
};
export const reactLazyRetry = <
  T extends ComponentType<React.PropsWithChildren<any>>,
>(
  componentModule: () => Promise<{ default: T }>
): LazyExoticComponent<T> => {
  return lazy(() => retry(componentModule, DEFAULT_RETRY_OPTIONS));
};
