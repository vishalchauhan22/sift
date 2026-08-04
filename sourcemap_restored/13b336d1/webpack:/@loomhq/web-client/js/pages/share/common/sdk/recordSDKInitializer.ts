// TODO(tatiana): Move into common/sdk folder

import { LOOM_SDK_API_KEY } from '@js/constants/runtimeConfig';

import fetch from '@js/utilities/fetch';
import * as loggerx from '@js/utilities/loggerx';

import { SDKResult, SDKConfig } from '@loomhq/record-sdk';
import { STATUS_OK } from '@loomhq/shared-utilities/constants/http';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { asyncRecordSDK } from './asyncRecordSDK';

const setupWithSecureKey = async (config: SDKConfig) => {
  try {
    const response = await fetch('/integrations-app/sdk/create-jws');

    if (response.status !== STATUS_OK) {
      throw new Error('Fetching access token to setup recordSDK failed.');
    }

    const { createInstance } = await asyncRecordSDK();
    const { jws } = await response.json();

    return createInstance({
      mode: 'custom',
      jws,
      config,
    });
  } catch (err) {
    loggerx.error(
      err,
      {
        message: 'recordSDK setup with secure key failed.',
      },
      { feature: Feature.SDKRecorder }
    );

    return setupWithAppId(config);
  }
};

const setupWithAppId = async (config: SDKConfig) => {
  const { createInstance } = await asyncRecordSDK();

  return createInstance({
    mode: 'standard',
    publicAppId: LOOM_SDK_API_KEY,
    config,
  });
};

export class RecordSDKInitializer {
  private instance?: SDKResult = undefined;
  private config: SDKConfig;

  constructor(config: SDKConfig = {}) {
    this.config = config;
  }

  private setup() {
    return setupWithSecureKey(this.config);
  }

  async waitOnInstance(): Promise<SDKResult> {
    if (this.instance) {
      return this.instance;
    }

    this.instance = await this.setup();

    return this.instance;
  }
}
