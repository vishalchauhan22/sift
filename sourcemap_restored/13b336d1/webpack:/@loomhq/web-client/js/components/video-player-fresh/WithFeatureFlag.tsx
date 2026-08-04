import { useVideoContext } from '@js/common/video-player';
import {
  EnabledFeatures,
  FeatureFlag,
} from '@js/common/video-player/context/types';
import React, { useEffect } from 'react';

import { getFlagValueForUser } from '@js/utilities/featureFlag';

export function WithFeatureFlags(): null {
  useFeatureFlagCheck();

  return null;
}

type FeatureFlagsCheck = {
  experiment: string;
  keyOnUserContext: FeatureFlag;
  enabledValue?: string | boolean;
  enabledValues?: string[];
};

const featureFlags: FeatureFlagsCheck[] = [
  // EXAMPLE
  // {
  //   experiment: EXPERIMENT_EMBED_PLAYER_REDESIGN,
  //   keyOnUserContext: EXPERIMENT_EMBED_PLAYER_REDESIGN,
  //   enabledValues: VARIANT,
  // },
];

/**
 * Feature flags are fetched async and only returns when all are settles
 * The requests are batched so it should minimize the number of network calls.
 * This will update the userContext.
 */
function useFeatureFlagCheck(): void {
  const { setEnabledFeatures } = useVideoContext();
  const enabledFeatures = React.useRef<EnabledFeatures>({});

  useEffect(() => {
    function fetchFeatureFlagValue(arg: FeatureFlagsCheck) {
      return getFlagValueForUser({ flag: arg.experiment }).then(result => {
        let isEnabled = false;

        enabledFeatures.current[arg.keyOnUserContext] = {
          variant: 'ineligible',
          enabled: false,
        };

        if (arg.enabledValue) {
          isEnabled = result === arg.enabledValue;
        } else if (arg.enabledValues) {
          isEnabled = arg.enabledValues.includes(result as string);
        }

        const currentObjectFeatureFlagObject =
          enabledFeatures.current[arg.keyOnUserContext];

        if (currentObjectFeatureFlagObject !== undefined) {
          currentObjectFeatureFlagObject.enabled = isEnabled;

          currentObjectFeatureFlagObject['variant'] = result as string;
        }
      });
    }

    const promises = featureFlags.map(fetchFeatureFlagValue);

    Promise.allSettled(promises).then(() => {
      setEnabledFeatures(enabledFeatures.current);
    });
  }, [setEnabledFeatures]);
}
