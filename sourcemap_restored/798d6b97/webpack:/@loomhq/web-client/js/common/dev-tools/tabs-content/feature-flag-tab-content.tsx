import React from 'react';

import { Container, Link, List, ListRow, Text, Tooltip } from '@loomhq/lens';
import { STATSIG_MIGRATION_FLAGS_OBJ } from '@loomhq/shared-utilities/constants/featureFlag';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  EXPERIMENTS,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';
import { useFeatureFlagStore } from '@js/hooks/featureFlag/useFeatureFlagStore';

const BASE_STATSIG_URL = 'https://console.statsig.com';
const EXPERIMENT_KEYS = new Set(Object.values(EXPERIMENTS));
const FEATURE_GATE_KEYS = new Set(Object.values(FEATURE_GATES));

export const FeatureFlagTabContentWithoutFeatureWrapper = (): JSX.Element => {
  const { featureLoadedRef } = useFeatureWrapper();

  // TODO: replace with a fetch of all the FF this is a hack to get the value of the FF
  // that have already been fetched but it's not getting the value of BE only FF
  const featureFlags = useFeatureFlagStore(state => state.featureFlags);

  // Links are different for flags and gates in Statsig so we compare to the constants objs
  const getStatSigLink = (key: string): string | null => {
    if (
      STATSIG_MIGRATION_FLAGS_OBJ[key] &&
      STATSIG_MIGRATION_FLAGS_OBJ[key]?.statsigLink
    ) {
      return STATSIG_MIGRATION_FLAGS_OBJ[key].statsigLink;
    }

    if ((EXPERIMENT_KEYS as Set<string>).has(key)) {
      return `${BASE_STATSIG_URL}/experiments/${key}`;
    } else if ((FEATURE_GATE_KEYS as Set<string>).has(key)) {
      return `${BASE_STATSIG_URL}/gates/${key}`;
    }
    // This means that the flag is not listed within the EXPERIMENT or GATES so we don't have a way of knowing which it is. Likely a flag mid-migration
    return null;
  };

  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  // Sort featureFlags as an array
  const sortedFeatureFlags = Object.values(featureFlags).sort((a, b) => {
    return a.key?.localeCompare(b.key ?? '') ?? 0;
  });

  return (
    <Container refHandler={refHandler}>
      <List columns={['1fr', '2fr']} gap="small">
        {sortedFeatureFlags.map(featureFlag => {
          let value;

          if (typeof featureFlag.value === 'string') {
            value = featureFlag.value;
          } else if (typeof featureFlag.value === 'boolean') {
            value = featureFlag.value.toString();
          }

          const statSigLink = getStatSigLink(featureFlag.key || '');

          return (
            <ListRow key={featureFlag.key} paddingX="medium" paddingY="small">
              {statSigLink ? (
                <Link href={statSigLink} target="_blank">
                  {featureFlag.key}
                </Link>
              ) : (
                <Tooltip content="Flag is not listed in EXPERIMENT or GATES so link cannot be determined">
                  <Text>{featureFlag.key}</Text>
                </Tooltip>
              )}
              <Text>{value}</Text>
            </ListRow>
          );
        })}
      </List>
    </Container>
  );
};

export const FeatureFlagTabContent = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.DevToolsFeatureFlags}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <FeatureFlagTabContentWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};
