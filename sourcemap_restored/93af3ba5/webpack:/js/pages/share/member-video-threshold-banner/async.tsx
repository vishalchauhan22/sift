import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { MemberVideoThresholdBannerProps } from './types';

const MemberVideoThresholdBanner = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "MemberVideoThresholdBanner" */ '@js/pages/share/member-video-threshold-banner'
  ).then(module => ({ default: module.MemberVideoThresholdBanner }))
);

export const MemberVideoThresholdBannerAsync: React.FC<
  React.PropsWithChildren<MemberVideoThresholdBannerProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <MemberVideoThresholdBanner {...props} />
  </Suspense>
);
