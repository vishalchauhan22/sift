import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const LegacyZoomIntegrationDisabledBanner = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "LegacyZoomIntegrationDisabledBanner" */ './controller'
  ).then(module => ({
    default: module.LegacyZoomIntegrationDisabledBannerController,
  }))
);

export const LegacyZoomIntegrationDisabledBannerAsync: React.FC =
  (): JSX.Element => (
    <Suspense fallback={null}>
      <LegacyZoomIntegrationDisabledBanner />
    </Suspense>
  );
