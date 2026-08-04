import { ControlType } from '@loomhq/shared-utilities/constants/statsig';

import * as analytics from '@js/utilities/analytics';
import fetch from '@js/utilities/fetch';
import * as logger from '@js/utilities/loggerx';
import { getParam } from '@js/utilities/url';
import { useFeatureFlagStore } from '@js/hooks/featureFlag/useFeatureFlagStore';
const FLAG_BATCH_TIMEOUT = 150;
let batchedFlags: [string?] = [];
let batchedExperiments: [string?] = [];
let batchedGates: [string?] = [];
let batchedConfigs: [string?] = [];

let flagBatchTimeout;
let flagbatchTimeoutPromise;
let flagbatchTimeoutResolve;

let batchedExtraProperties = {};
let batchedDefaultValueMap = {};

export const getFlagValueForUser = async ({
  flag,
  controlType = ControlType.MIGRATED_FEATURE_FLAG,
  defaultValue,
  extraProperties = false,
  forceFetch = false,
}: {
  flag: string;
  controlType?: ControlType;
  defaultValue?: string | number | boolean;
  extraProperties?: any;
  forceFetch?: boolean;
}): Promise<boolean | string> => {
  const flagUrlParam = getParam(flag);

  if (flagUrlParam) {
    let flagValue: boolean | string = flagUrlParam;

    if (flagValue === 'true') {
      flagValue = true;
    }

    if (flagValue === 'false') {
      flagValue = false;
    }

    return flagValue;
  }

  const currentValue = useFeatureFlagStore.getState().featureFlags[flag] || {};

  // if forceRefetch isn't true just return currentValue
  if (currentValue.fetched && !forceFetch) {
    return currentValue.value;
  }

  const { anonID } = analytics.getAnalyticsIds();

  // TODO: should be default true until SS integration
  if (controlType === ControlType.MIGRATED_FEATURE_FLAG) {
    batchedFlags.push(flag);
  }

  if (controlType === ControlType.STATSIG_EXPERIMENT) {
    batchedExperiments.push(flag);
  }

  if (controlType === ControlType.STATSIG_FEATURE_GATE) {
    batchedGates.push(flag);
  }

  if (controlType === ControlType.DYNAMIC_CONFIG) {
    batchedConfigs.push(flag);
  }

  batchedExtraProperties = {
    ...batchedExtraProperties,
    ...extraProperties,
  };

  batchedDefaultValueMap = {
    ...batchedDefaultValueMap,
    [flag]: defaultValue,
  };

  if (!flagBatchTimeout) {
    flagbatchTimeoutPromise = new Promise(resolve => {
      flagbatchTimeoutResolve = resolve;
    });

    flagBatchTimeout = setTimeout(async () => {
      const flagsToSend = [...batchedFlags];
      const statsigExperimentsToSend = [...batchedExperiments];
      const statsigGatesToSend = [...batchedGates];
      const dynamicConfigsToSend = [...batchedConfigs];

      const extraPropertiesToSend = {
        ...batchedExtraProperties,
      };
      const defaultValueMaptoSend = {
        ...batchedDefaultValueMap,
      };

      // clear out timeouts as the fetch happens
      // we do not need to wait for the fetch to resolve
      // waiting causes there to be a race condition where a new flag might come in
      // get added to batchedFlags but the await call happens with an older version
      // this ensures that if a new flag request comes in during the await fetch it
      // gets added to the next round of calls
      batchedFlags = [];
      batchedExperiments = [];
      batchedGates = [];
      batchedConfigs = [];

      batchedExtraProperties = {};
      batchedDefaultValueMap = {};
      clearTimeout(flagBatchTimeout);
      flagBatchTimeout = null;

      flagbatchTimeoutResolve(
        await bulkFetchFlags({
          flags: flagsToSend,
          statsigExperiments: statsigExperimentsToSend,
          statsigGates: statsigGatesToSend,
          dynamicConfigs: dynamicConfigsToSend,
          defaultValueMap: defaultValueMaptoSend,
          anonID,
          extraProperties: extraPropertiesToSend,
        })
      );
    }, FLAG_BATCH_TIMEOUT);
  }

  const flagsResult = (await flagbatchTimeoutPromise) || [];

  const matchingFlag = flagsResult.find(flagResult => flagResult.flag === flag);

  if (!matchingFlag || !matchingFlag.resultDetails) {
    return false;
  }

  return matchingFlag.resultDetails.result;
};

function bulkFetchFlags({
  flags,
  statsigExperiments,
  statsigGates,
  dynamicConfigs,
  defaultValueMap,
  anonID,
  extraProperties = {},
}: {
  flags: (string | undefined)[];
  statsigExperiments?: (string | undefined)[];
  statsigGates?: (string | undefined)[];
  dynamicConfigs?: (string | undefined)[];
  anonID?: string;
  extraProperties?: any;
  defaultValueMap?: any;
}) {
  if (Array.isArray(flags)) {
    flags.map(flag => {
      if (typeof flag !== 'string') {
        logger.warning(new Error('invalid flag value'), {
          flag: JSON.stringify(flag),
        });
      }
    });
  }

  const bulkFlagParams = {
    flags,
    statsigExperiments: statsigExperiments?.length
      ? statsigExperiments
      : undefined,
    statsigGates: statsigGates?.length ? statsigGates : undefined,
    dynamicConfigs: dynamicConfigs?.length ? dynamicConfigs : undefined,
    defaultValueMap: Object.keys(defaultValueMap)?.length
      ? JSON.stringify(defaultValueMap)
      : undefined,
    hash: anonID,
    extraProperties: JSON.stringify(extraProperties),
  };

  const paramString = Object.keys(bulkFlagParams)
    .filter(key => bulkFlagParams[key])
    .map(key => `${key}=${bulkFlagParams[key]}`)
    .join('&');

  return fetch(`/v1/users/feature_flag/bulk?${paramString}`, {
    credentials: 'include',
  })
    .then(resp => {
      if (resp.status >= 400) {
        throw new Error(`got a bad response for feature flag: ${resp.status}`);
      }

      return resp.json();
    })
    .then(flags => {
      useFeatureFlagStore.getState().updateBulkFeatureFlagValues(flags);

      return flags;
    })
    .catch(err => {
      logger.warning(err, {
        message: `Error in getting bulk feature flags`,
        flags: JSON.stringify(flags),
      });

      return null;
    });
}
