import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { VideoMetadataMobileProps } from './types';

const VideoMetadataMobile = reactLazyRetry(() =>
  import(/* webpackChunkName: "VideoMetadataMobile" */ './').then(module => ({
    default: module.VideoMetadataMobile,
  }))
);

export const VideoMetadataMobileAsync: React.FC<
  React.PropsWithChildren<VideoMetadataMobileProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <VideoMetadataMobile {...props} />
  </Suspense>
);
