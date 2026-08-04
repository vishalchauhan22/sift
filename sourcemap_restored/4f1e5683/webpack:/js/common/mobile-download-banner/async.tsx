import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { MobileDownloadBannerProps } from './types';

const MobileDownloadBanner = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "MobileDownloadBanner" */ '@js/common/mobile-download-banner'
  ).then(module => ({ default: module.MobileDownloadBanner }))
);

export const MobileDownloadBannerAsync: React.FC<
  React.PropsWithChildren<MobileDownloadBannerProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <MobileDownloadBanner {...props} />
  </Suspense>
);
