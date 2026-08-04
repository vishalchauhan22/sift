import _filter from 'lodash/filter';
import _map from 'lodash/map';

import { jsonParseOrDefault } from '@js/utilities/json/safe-json-parse';
import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

export type PartCredentialType = {
  Policy: string;
  Signature: string;
  'Key-Pair-Id': string;
};

// This takes all the key/value pairs of the partCredentials mapping and adds
// them as URL params to each part URL in the playlist file. Example:
//
// partCredentials: { 'Key-Pair-Id': 'ABCD', 'Expires': 100000, 'Token': 'EFGH' }
// output: '?Key-Pair-Id=ABCD&Expires=100000&Token=EFGH'
//
// Now 'output' can be appended to each part file in the playlist like so:
//
// cloudfront.net/sessions/raw/<video_id><output>
export const getCredentialParamsString = (
  partCredentials: Partial<PartCredentialType>
): string => {
  const nonEmptyKeys = _filter(
    Object.keys(partCredentials),
    paramKey => partCredentials[paramKey].length > 0
  );

  return `${_map(nonEmptyKeys, paramKey => {
    return `${paramKey}=${window.encodeURIComponent(
      partCredentials[paramKey]
    )}`;
  }).join('&')}`;
};

// Returns true when confident that the policy is expired.
export const isPolicyExpired = (policy: string): boolean => {
  let policyString: string;
  try {
    policyString = Buffer.from(policy, 'base64').toString('ascii');
  } catch (error) {
    logger.error(error, {}, { feature: Feature.VideoPlayer });
    // If we aren't able to parse the policy into a string then treat it as expired
    return true;
  }

  if (policyString.charAt(policyString.length - 1) == '?') {
    policyString = policyString.slice(0, policyString.length - 1);
  }

  const policyObj: any = jsonParseOrDefault(policyString, {});

  if (!policyObj.Statement) {
    return false;
  }

  if (policyObj.Statement.length < 1) {
    return false;
  }

  const statement = policyObj.Statement[0];

  if (!statement.Condition) {
    return false;
  }

  const condition = statement.Condition;

  if (!condition.DateLessThan) {
    return false;
  }

  const dateLessThan = condition.DateLessThan;

  const expiry = dateLessThan['AWS:EpochTime'];

  if (!expiry) {
    return false;
  }

  const remainingSeconds = expiry - Date.now() / 1000;

  return remainingSeconds < 0;
};
