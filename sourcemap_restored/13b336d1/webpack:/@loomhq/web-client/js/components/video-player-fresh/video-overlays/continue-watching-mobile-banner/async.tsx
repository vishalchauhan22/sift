import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const ContinueWatchingMobileBanner = reactLazyRetry(() =>
  import(/* webpackChunkName: "ContinueWatchingMobileBanner" */ './').then(
    module => ({ default: module.MayRenderContinueWatchingWrapper })
  )
);

export const ContinueWatchingMobileBannerAsync = (): JSX.Element => (
  <Suspense fallback={null}>
    <ContinueWatchingMobileBanner />
  </Suspense>
);
