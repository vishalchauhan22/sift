import create from 'zustand';

import { FeatureFlag } from '@js/hooks/featureFlag';

export interface FeatureFlagStore {
  featureFlags: Record<FeatureFlag, FlagState>;
  beginFeatureFlagFetch: (flag: string) => void;
  updateBulkFeatureFlagValues: (flags: Array<BulkFlagObject>) => void;
  updateFeatureFlagValue: (flag: FeatureFlag, value: any) => void;
  endFeatureFlagFetch: (flag: FeatureFlag) => void;
}
export interface FlagState {
  key: string | null;
  fetching: boolean;
  fetched: boolean;
  value: any;
}
export interface BulkFlagObject {
  flag: string;
  resultDetails: {
    result: any;
  };
}

const DEFAULT_FEATURE_FLAG_STATE: FlagState = {
  key: null,
  fetching: true,
  fetched: false,
  value: null,
};

export const useFeatureFlagStore = create<FeatureFlagStore>(set => ({
  featureFlags: {} as Record<FeatureFlag, FlagState>,

  beginFeatureFlagFetch: (flag: string) => {
    set(state => ({
      featureFlags: {
        ...state.featureFlags,
        [flag]: {
          ...DEFAULT_FEATURE_FLAG_STATE,
          key: flag,
        },
      },
    }));
  },
  updateBulkFeatureFlagValues: (flags: Array<BulkFlagObject>) => {
    const mappedFlags = flags.reduce(
      (acc, { flag, resultDetails: { result } }) => ({
        ...acc,
        [flag]: {
          key: flag,
          fetching: false,
          fetched: true,
          value: result,
        },
      }),
      {} as Record<FeatureFlag, FlagState>
    );
    set(state => ({
      featureFlags: { ...state.featureFlags, ...mappedFlags },
    }));
  },
  updateFeatureFlagValue: (flag: FeatureFlag, value: any) => {
    set(state => ({
      featureFlags: {
        ...state.featureFlags,
        [flag]: {
          key: flag,
          fetching: false,
          fetched: true,
          value,
        },
      },
    }));
  },
  endFeatureFlagFetch: (flag: FeatureFlag) => {
    set(state => ({
      featureFlags: {
        ...state.featureFlags,
        [flag]: {
          ...state.featureFlags[flag],
          fetching: false,
          fetched: true,
        },
      },
    }));
  },
}));
