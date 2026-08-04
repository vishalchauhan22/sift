import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { CelebrationLayerProps } from './types';

const CelebrationLayer = reactLazyRetry(() =>
  import(/* webpackChunkName: "CelebrationLayer" */ './').then(module => ({
    default: module.CelebrationLayer,
  }))
);

export const CelebrationLayerAsync: React.FC<
  React.PropsWithChildren<CelebrationLayerProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <CelebrationLayer {...props} />
  </Suspense>
);
