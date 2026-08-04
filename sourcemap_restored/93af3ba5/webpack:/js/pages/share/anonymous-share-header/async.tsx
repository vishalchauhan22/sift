import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const AnonymousShareHeader = reactLazyRetry(() =>
  import(/* webpackChunkName: "AnonymousShareHeader" */ './').then(module => ({
    default: module.AnonymousShareHeader,
  }))
);

export const AnonymousShareHeaderAsync: React.FC<
  React.PropsWithChildren<unknown>
> = (): JSX.Element => (
  <Suspense fallback={null}>
    <AnonymousShareHeader />
  </Suspense>
);
