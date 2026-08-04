import { LOOM_VERSION } from '@js/constants/runtimeConfig';

import fetch from '@js/utilities/fetch';

import { STATUS_OK } from '@loomhq/shared-utilities/constants/http';
import { Team } from '@loomhq/shared-utilities/constants/product';

import { getAnalyticsIds } from '@js/utilities/analytics';

import * as logger from './loggerx';
import { PartCredentialType } from './part-credentials';

const POLLING_VIDEO_RAW = 1000;

const POLLING_VIDEO_MAX_RETRIES = 10;

const cancelledError = new Error('Polling cancelled');
const unauthorizedError = new Error('Response status not authorized');
const jsonError = new Error('ResponseJSON does not have a URL');
const timeoutError = new Error('Timed out');
const maxedOutError = new Error('max tries reached');

const sleepWithTimeout = (ms: number) =>
  new Promise<never>((_res, rej) => setTimeout(() => rej(timeoutError), ms));

type RawUrlRequestBody = {
  force_original: boolean;
  password: string | null;
  anonID: string | null;
  deviceID: string | null;
  client_name: string;
  client_version: string;
  supported_mime_types?: string[];
  clip_id?: string;
};

type TranscodedUrlRequestBody = {
  force_original: boolean;
  password: string | null;
  anonID: string | null;
  deviceID: string | null;
};

const makeRawUrlFetchPromise = (
  sessionID: string,
  password: string | null,
  forceOriginal = false,
  supportedMimeTypes: string[] | undefined = undefined,
  clipId: string | undefined = undefined
): { rawUrlRequest: Promise<Response>; rawUrlBody: RawUrlRequestBody } => {
  const { anonID, deviceID } = getAnalyticsIds();
  const rawUrlBody: RawUrlRequestBody = {
    force_original: forceOriginal,
    password,
    anonID,
    deviceID,
    client_name: 'web',
    client_version: LOOM_VERSION,
  };

  if (supportedMimeTypes) {
    rawUrlBody.supported_mime_types = supportedMimeTypes;
  }

  if (clipId) {
    rawUrlBody.clip_id = clipId;
  }

  return {
    rawUrlRequest: fetch(`/api/campaigns/sessions/${sessionID}/raw-url`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawUrlBody),
    }),
    rawUrlBody,
  };
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const postSessionRawURL = (
  sessionID: string,
  password: string | null,
  cb: (sourceUrl?: string, partCredentials?: PartCredentialType) => void,
  forceOriginal = false,
  supportedMimeTypes: string[] | undefined = undefined,
  clipId: string | undefined = undefined
): void => {
  const loggerPayload = {
    sessionID,
    forceOriginal,
    password,
  };
  const { rawUrlRequest, rawUrlBody } = makeRawUrlFetchPromise(
    sessionID,
    password,
    forceOriginal,
    supportedMimeTypes,
    clipId
  );

  requestRetryFetchURL(
    rawUrlRequest,
    cb,
    rawUrlBody,
    POLLING_VIDEO_RAW,
    '[postSessionRawURL]',
    loggerPayload
  );
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const requestRetryFetchURL = async (
  fetchPromise: Promise<Response>,
  cb: (sourceUrl?: string, partCredentials?: PartCredentialType) => void,
  requestBody: RawUrlRequestBody | TranscodedUrlRequestBody,
  retryTimeoutMs: number,
  loggerPrefix: string,
  loggerPayload: Record<string, unknown>,
  counter = 0
): Promise<void> => {
  const timeout = sleepWithTimeout(retryTimeoutMs);

  try {
    if (counter >= POLLING_VIDEO_MAX_RETRIES) {
      throw maxedOutError;
    }

    const response = await Promise.race<Response>([fetchPromise, timeout]);

    if (response.status !== STATUS_OK) {
      throw unauthorizedError;
    }

    const responseJson = await response.json();

    if (!responseJson || !responseJson.url) {
      throw jsonError;
    }

    cb(responseJson.url, responseJson.part_credentials || {});
  } catch (error) {
    if (error === timeoutError) {
      // try again.
      requestRetryFetchURL(
        fetchPromise,
        cb,
        requestBody,
        retryTimeoutMs,
        loggerPrefix,
        loggerPayload,
        counter + 1
      );
    } else if (error === maxedOutError) {
      logger.debug(`${loggerPrefix} Maxed out its retries`, {
        team: Team.Mint,
      });
    } else if (error === cancelledError) {
      logger.debug(`${loggerPrefix} Polling cancelled`, {
        team: Team.Mint,
      });
    } else if (error === unauthorizedError) {
      logger.debug(`${loggerPrefix} Unauthorized request`, {
        team: Team.Mint,
      });
    } else if (error === jsonError) {
      logger.debug(`${loggerPrefix} ResponseJSON does not have a URL`, {
        team: Team.Mint,
      });
    } else if (error.message.includes('json is not a function')) {
      logger.debug(`${loggerPrefix} Response not of JSON format`, {
        ...loggerPayload,
        counter,
        error,
        team: Team.Mint,
      });
    } else {
      logger.error(
        new Error(`${loggerPrefix} API endpoint errored out`),
        {
          ...loggerPayload,
          counter,
          requestBody,
          errorName: error.name,
          errorMessage: error.message,
          errorStack: error.stack,
        },
        { team: Team.Mint }
      );
    }
  }
};
