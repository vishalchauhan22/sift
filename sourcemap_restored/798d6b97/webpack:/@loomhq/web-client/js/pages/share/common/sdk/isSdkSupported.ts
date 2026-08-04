import * as loggerx from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { asyncRecordSDKIsSupported } from './asyncRecordSDKIsSupported';

import type { isSupported } from '@loomhq/record-sdk/is-supported';

type ReturnValue = ReturnType<typeof isSupported>;

export async function isSdkSupported(): Promise<ReturnValue> {
  try {
    const { isSupported } = await asyncRecordSDKIsSupported();

    return isSupported();
  } catch (error) {
    loggerx.error(error, undefined, { feature: Feature.SDKRecorder });

    return { supported: false, error };
  }
}
