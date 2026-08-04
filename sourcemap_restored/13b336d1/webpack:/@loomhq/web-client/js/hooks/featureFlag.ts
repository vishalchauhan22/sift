import { useEffect } from 'react';

import * as featureFlagUtil from '@js/utilities/featureFlag';
import * as logger from '@js/utilities/loggerx';

import * as featureFlagConstants from '@loomhq/shared-utilities/constants/featureFlag';
import { Team } from '@loomhq/shared-utilities/constants/product';

import { ControlType } from '@loomhq/shared-utilities/constants/statsig';

import { EXPERIMENT_ELIGIBILTY_PRECHECK_FAILED } from '../constants/events';
import * as analytics from '../utilities/analytics';
import { useSearchParams } from './useSearchParams';
import { useFeatureFlagStore } from './featureFlag/useFeatureFlagStore';
import { useGetSelectedWorkspace } from './workspace';

export type FeatureFlag = Extract<
  (typeof featureFlagConstants)[keyof typeof featureFlagConstants],
  string
>;

export type EligibilityPreCheck = () =>
  | { pass: true }
  | { pass: false; failReason: string };

export interface FlagIsActivatedOptions {
  // TODO(activation): we should enforce type safety here and change this to a FeatureFlag type as a follow up
  flag: string;
  controlType?: ControlType;
  defaultValue?: string | number | boolean;
  activationValues: any[];
  skip?: boolean;
  eligibilityPreCheckFunction?: EligibilityPreCheck;
  extraProperties?: any;
  logEligibilityPreCheckToSegment?: boolean;
  returnAssignmentName?: boolean;
  workspaceIdOverride?: string;
}

export type FlagIsActivatedOptionsWithoutAssignmentName = Omit<
  FlagIsActivatedOptions,
  'returnAssignmentName'
>;

/**
 * TO DO: ACT-135 Refactoring this hook to return a loading state.
 *
 * If you pass in an eligibilityPreCheckFunction that depends on fetched data (i.e. it is not immediately available),
 * it is advised you make use of the 'skip' property.
 * This allows useFlagIsActivated to consistently return undefined for the boolean result until the data needed for the
 * pre-check is available.
 * You can rely on the undefined result to indicate that useFlagIsActivated is still loading.
 * This is handled similarly to how the fetched property is used from the feature flag state.
 * It also resembles the usage of apollo client hooks..
 */
export function useFlagIsActivated(
  options: FlagIsActivatedOptionsWithoutAssignmentName
): boolean;
export function useFlagIsActivated(
  options: FlagIsActivatedOptions
): [boolean, string];
export function useFlagIsActivated(options: FlagIsActivatedOptions): unknown {
  const {
    flag,
    controlType = ControlType.MIGRATED_FEATURE_FLAG,
    activationValues,
    skip,
    eligibilityPreCheckFunction,
    // NOTE(outreach): Mapping this to true to make mapping to Segment an opt-in model instead of an opt-out model, which should reduce the number of Segment calls. If you want Segment tracking, toggle this to false in your flag usage.
    logEligibilityPreCheckToSegment = false,

    // NOTE: Do not rely on values that need to get fetched/get updated
    // A given flag will only be fetched and stored in state a single time on page load,
    // regardless of how many times getFeatureFlag gets called. For example, if an extraProperty
    // has an initial value of false, and then gets updated to true, the flag will be fetched only
    // with the initial value of false, and not get fetched again with true.
    extraProperties,
    returnAssignmentName = false,
    defaultValue,

    // NOTE: Used for workspace-level feature rollouts and workspace-based targeting
    // If none is provided, the user's actively selected workspace will be used
    workspaceIdOverride,
  } = options;

  const filteredFlag = flag?.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');

  const currentFlag = useFeatureFlagStore(state => state.featureFlags[flag]);
  const searchParams = useSearchParams();
  const selectedWorkspace = useGetSelectedWorkspace();

  const workspaceId =
    workspaceIdOverride ||
    extraProperties?.workspace_id ||
    selectedWorkspace?.id;

  const flagUrlParam = searchParams.get(filteredFlag);

  const preCheckResult = eligibilityPreCheckFunction?.();
  const pass = preCheckResult?.pass;
  const failReason = !pass ? preCheckResult?.failReason : undefined;

  const getFeatureFlag = useGetFeatureFlag();

  useEffect(() => {
    if (skip) {
      return;
    }

    if (eligibilityPreCheckFunction) {
      if (pass === false && failReason === undefined) {
        logger.error(
          `failReason key required on object returned from Eligibility pre-check function if pass key points to false`,
          { pass, failReason },
          { team: Team.Outreach }
        );

        return;
      }

      if (!pass) {
        if (logEligibilityPreCheckToSegment) {
          analytics.track(EXPERIMENT_ELIGIBILTY_PRECHECK_FAILED, {
            flag,
            failReason,
          });
        }

        return;
      }
    }

    getFeatureFlag({
      flag: flag as FeatureFlag,
      controlType,
      extraProperties: {
        ...extraProperties,
        workspace_id: workspaceId,
      },
      defaultValue,
    });
  }, [
    getFeatureFlag,
    flag,
    logEligibilityPreCheckToSegment,
    eligibilityPreCheckFunction,
    extraProperties,
    pass,
    failReason,
    controlType,
    defaultValue,
    skip,
    workspaceId,
  ]);

  if (flagUrlParam) {
    let flagValue: string | boolean = flagUrlParam;

    if (flagValue === 'true') {
      flagValue = true;
    }

    if (flagValue === 'false') {
      flagValue = false;
    }

    if (returnAssignmentName) {
      return [activationValues.includes(flagValue), flagUrlParam];
    }

    return activationValues.includes(flagValue);
  }

  if (skip) {
    return returnAssignmentName ? [] : undefined;
  }

  if (preCheckResult && pass === false) {
    return returnAssignmentName ? [false, undefined] : false;
  }

  if (!currentFlag || !currentFlag.fetched) {
    return returnAssignmentName ? [] : undefined;
  }

  const result = activationValues.includes(currentFlag.value);

  if (returnAssignmentName) {
    return [result, currentFlag.value];
  }

  return result;
}

export function useFeatureFlagValue<T>(
  flag: string,
  controlType?: ControlType
): T {
  const filteredFlag = flag.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const searchParams = useSearchParams();
  const featureFlag = useFeatureFlagStore(state => state.featureFlags[flag]);
  const flagUrlParam = searchParams.get(filteredFlag);
  const getFeatureFlag = useGetFeatureFlag();

  useEffect(() => {
    getFeatureFlag({ flag: flag as FeatureFlag, controlType });
  }, [getFeatureFlag, flag, controlType]);

  if (flagUrlParam) {
    let returnValue: boolean | string = flagUrlParam;

    if (returnValue === 'true') {
      returnValue = true;
    }

    if (returnValue === 'false') {
      returnValue = false;
    }

    return returnValue as any;
  }

  return !featureFlag || !featureFlag.fetched
    ? (undefined as T)
    : featureFlag.value;
}

export function useWorkspaceFeatureFlagValue<T>(
  flag: string,
  workspaceId: string,
  controlType?: ControlType
): T {
  const filteredFlag = flag.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const searchParams = useSearchParams();
  const featureFlag = useFeatureFlagStore(state => state.featureFlags[flag]);
  const flagUrlParam = searchParams.get(filteredFlag);
  const getFeatureFlag = useGetFeatureFlag();

  useEffect(() => {
    getFeatureFlag({
      flag: flag as FeatureFlag,
      controlType,
      extraProperties: {
        workspace_id: workspaceId,
      },
    });
  }, [getFeatureFlag, flag, controlType, workspaceId]);

  if (flagUrlParam) {
    let returnValue: boolean | string = flagUrlParam;

    if (returnValue === 'true') {
      returnValue = true;
    }

    if (returnValue === 'false') {
      returnValue = false;
    }

    return returnValue as any;
  }

  return !featureFlag || !featureFlag.fetched
    ? (undefined as T)
    : featureFlag.value;
}

/*
 * This version of useFeatureFlagValue strictly checks the redux store and
 * does not fetch the feature flag.
 * (useFeatureFlagValue, by contrast, uses getFeatureFlagCreator to perform a flag fetch)
 *
 * This hook is useful for cases where the flag fetching should be conditional
 * (e.g. by being wrapped in a conditionally-rendered component), but the checking
 * for the flag value should not.
 *
 * This is a workaround for the fact that the eligibilityPreCheckFunction nor the
 * extraProperties object can be dependably used to perform eligibility checks.
 *
 * WARNING: If you are expecting a non-undefined value from this hook, be sure the
 * flag is being fetched from a component that is being rendered at the same time
 * as the one calling this hook.
 *
 * This loom explains how this hook is being used and why:
 * https://www.loom.com/share/a6baf28b43e24f7baa00f4eca2affb56
 * */
export function useFeatureFlagValueNoFetch(
  flag: FeatureFlag
): string | undefined {
  const featureFlag = useFeatureFlagStore(state => state.featureFlags[flag]);

  return !featureFlag || !featureFlag.fetched ? undefined : featureFlag.value;
}

interface GetFeatureFlagOptions {
  flag: FeatureFlag;
  controlType?: ControlType;
  defaultValue?: boolean | string | number;
  extraProperties?: any;
}

function useGetFeatureFlag(): (options: GetFeatureFlagOptions) => Promise<any> {
  const {
    featureFlags,
    beginFeatureFlagFetch,
    updateFeatureFlagValue,
    endFeatureFlagFetch,
  } = useFeatureFlagStore();

  return async (options: GetFeatureFlagOptions): Promise<any> => {
    try {
      const { flag, extraProperties, controlType, defaultValue } = options;
      // @ts-expect-error - we don't technically need the second check since we should be type safe but just in case this doesn't hurt anyone
      if (!flag || flag === '') {
        return;
      }

      const currentValue = featureFlags[flag] || {};

      // in case we have already retrieved a flag or are retrieving
      // do not start again
      if (currentValue.fetched || currentValue.fetching) {
        return;
      }

      beginFeatureFlagFetch(flag);

      const flagValue = await featureFlagUtil.getFlagValueForUser({
        flag,
        controlType,
        defaultValue,
        extraProperties,
      });

      updateFeatureFlagValue(flag as FeatureFlag, flagValue);

      return flagValue;
    } catch (err) {
      endFeatureFlagFetch(options?.flag);
      logger.warning(err, { message: 'error while fetching feature flag' });
    }
  };
}
