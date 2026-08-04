import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const EngagementBar = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "EngagementBar" */ '@js/pages/share/engagement-bar'
  ).then(module => ({ default: module.EngagementBar }))
);

export const EngagementBarAsync: React.FC<
  React.PropsWithChildren<unknown>
> = (): JSX.Element => (
  <Suspense fallback={null}>
    <EngagementBar />
  </Suspense>
);
