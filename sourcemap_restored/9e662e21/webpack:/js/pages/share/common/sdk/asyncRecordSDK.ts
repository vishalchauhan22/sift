// TODO(tatiana): Move into common/sdk folder

import { DEFAULT_RETRY_OPTIONS } from '@js/utilities/RetryOptions';
import { retry } from '@js/utilities/reactLazyRetry';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const asyncRecordSDK = (): Promise<
  typeof import('@loomhq/record-sdk')
> =>
  retry(
    () => import(/* webpackChunkName: "record-sdk" */ '@loomhq/record-sdk'),
    DEFAULT_RETRY_OPTIONS
  );
