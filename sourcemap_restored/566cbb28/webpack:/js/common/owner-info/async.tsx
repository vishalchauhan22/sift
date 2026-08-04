import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const OwnerInfo = reactLazyRetry(() =>
  import(/* webpackChunkName: "OwnerInfo" */ './').then(module => ({
    default: module.OwnerInfo,
  }))
);

export const OwnerInfoAsync: React.FC<
  React.PropsWithChildren<unknown>
> = (): JSX.Element => (
  <Suspense fallback={null}>
    <OwnerInfo />
  </Suspense>
);
