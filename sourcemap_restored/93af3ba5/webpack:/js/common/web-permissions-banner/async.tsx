import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { WebPermissionsBannerProps } from './types';

const WebPermissionsBanner = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "WebPermissionsBanner" */ '@js/common/web-permissions-banner'
  ).then(module => ({ default: module.WebPermissionsBanner }))
);

export const WebPermissionsBannerAsync: React.FC<
  React.PropsWithChildren<WebPermissionsBannerProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <WebPermissionsBanner {...props} />
  </Suspense>
);
