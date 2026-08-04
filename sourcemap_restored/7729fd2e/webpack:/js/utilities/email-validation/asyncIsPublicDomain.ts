import once from 'lodash/once';

import { DEFAULT_RETRY_OPTIONS } from '../RetryOptions';
import { retry } from '../reactLazyRetry';

const asyncEmailValidation = once(() =>
  retry(
    () =>
      import(
        /* webpackChunkName: "email-validation" */ '@loomhq/email-validation'
      ),
    DEFAULT_RETRY_OPTIONS
  )
);

export const asyncIsPublicDomain = async (domain: string): Promise<boolean> =>
  (await asyncEmailValidation()).isPublicDomain(domain);
