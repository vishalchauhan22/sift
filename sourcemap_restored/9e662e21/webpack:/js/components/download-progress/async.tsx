import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const DownloadProgress = reactLazyRetry(() =>
  import(/* webpackChunkName: "DownloadProgress" */ './').then(module => ({
    default: module.DownloadProgress,
  }))
);

export const DownloadProgressAsync = (): JSX.Element | null => {
  return (
    <Suspense fallback={null}>
      <DownloadProgress />
    </Suspense>
  );
};
