// TODO(tatiana): Move into common/sdk folder
import { DEFAULT_RETRY_OPTIONS } from '@js/utilities/RetryOptions';
import { retry } from '@js/utilities/reactLazyRetry';

// Exports the endpoint only without the full bundle
// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const asyncRecordSDKIsSupported = (): Promise<
  typeof import('@loomhq/record-sdk/is-supported')
> =>
  retry(
    () =>
      import(
        /* webpackChunkName: "record-sdk-supported-endpoint" */ '@loomhq/record-sdk/is-supported'
      ).then(module => module),
    DEFAULT_RETRY_OPTIONS
  );
