import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const Transcript = reactLazyRetry(() =>
  import(/* webpackChunkName: "Transcript" */ './').then(module => ({
    default: module.Transcript,
  }))
);

export const TranscriptAsync: React.FC<
  React.PropsWithChildren<unknown>
> = (): JSX.Element => (
  <Suspense fallback={null}>
    <Transcript />
  </Suspense>
);
