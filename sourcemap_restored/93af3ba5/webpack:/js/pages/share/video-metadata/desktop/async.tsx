import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

const VideoMetadata = reactLazyRetry(() =>
  import(/* webpackChunkName: "VideoMetadata" */ './').then(module => ({
    default: module.VideoMetadata,
  }))
);

export const VideoMetadataAsync = (): JSX.Element => (
  <Suspense fallback={null}>
    <VideoMetadata />
  </Suspense>
);
