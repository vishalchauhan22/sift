import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { PersistentRecordButtonProps } from './types';

const PersistentRecordButton = reactLazyRetry(
  () =>
    import(
      /* webpackChunkName: "PersistentRecordButton" */ '@js/components/record-button/persistent-record-button'
    )
);

export const PersistentRecordButtonAsync: React.FC<
  React.PropsWithChildren<PersistentRecordButtonProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <PersistentRecordButton {...props} />
  </Suspense>
);
