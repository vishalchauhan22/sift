import {
  SPRING_LAUNCH_UPGRADE_BUTTON,
  SUMMER_LAUNCH_UPGRADE_BUTTON,
  FALL_LAUNCH_UPGRADE_BUTTON,
  WINTER_LAUNCH_UPGRADE_BUTTON,
  SEASONAL_LAUNCH_FTUX_MODAL_CTA_CLICKED,
} from '@js/constants/events';

import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { usePaywallRequest } from '@js/actions/request-upgrade';

import React from 'react';

import { incrementMetric } from '@js/utilities/metrics';

import { Button } from '@loomhq/lens';
import * as analytics from '@js/utilities/analytics';

import type { EventProps } from './common/types';

const CTA_METRIC = 'seasonal.launch.ftux.cta.clicked';

const getAnalyticEvent = (variant: string) => {
  if (variant.startsWith('fall')) {
    return FALL_LAUNCH_UPGRADE_BUTTON;
  }
  if (variant.startsWith('winter')) {
    return WINTER_LAUNCH_UPGRADE_BUTTON;
  }
  if (variant.startsWith('spring')) {
    return SPRING_LAUNCH_UPGRADE_BUTTON;
  }

  return SUMMER_LAUNCH_UPGRADE_BUTTON;
};

type PlanUpgradeCtaProps = Pick<
  React.ComponentProps<typeof Button>,
  'hasFullWidth'
> & {
  dismissModal: (source?: string) => Promise<void>;
  eventProps: EventProps;
};

export const PlanUpgradeCta: React.FC<
  React.PropsWithChildren<PlanUpgradeCtaProps>
> = ({
  dismissModal,
  eventProps,
  children,
  hasFullWidth,
}): React.ReactElement => {
  const variant = eventProps.variant;
  const analyticEvent = getAnalyticEvent(variant);
  const paywallRequest = usePaywallRequest();

  return (
    <Button
      autoFocus
      variant="primary"
      size="large"
      hasFullWidth={hasFullWidth}
      onClick={() => {
        incrementMetric(CTA_METRIC, {
          cta: `plan-upgrade-${variant}`,
          upgrade_type: `plan-${variant}`,
        });

        analytics.track(
          SEASONAL_LAUNCH_FTUX_MODAL_CTA_CLICKED,
          {
            ...eventProps,
            cta: `plan-upgrade-${variant}`,
            upgrade_type: `plan-${variant}`,
          },
          async () => {
            await dismissModal(`plan-upgrade-${variant}`);
            paywallRequest('loom-ai', {
              analyticEvent,
              source: RequestPlanUpgradeLocations.SEASONAL_LAUNCH_MODAL,
            });
          }
        );
      }}
    >
      {children || 'Upgrade now'}
    </Button>
  );
};
