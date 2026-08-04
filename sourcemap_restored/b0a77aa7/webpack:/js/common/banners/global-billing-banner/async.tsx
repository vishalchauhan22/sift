import React, { Suspense } from 'react';

import { WORKSPACE_BILLING_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import Scopes from '@js/components/scopes';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

type GlobalContentLimitBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
};

export const GlobalBillingBanner = reactLazyRetry(() =>
  import(/* webpackChunkName: "GlobalBillingBanner" */ './').then(module => ({
    default: module.GlobalBillingBanner,
  }))
);

export const GlobalBillingBannerAsync: React.FC<
  React.PropsWithChildren<GlobalContentLimitBannerProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <Scopes name={WORKSPACE_BILLING_ACCESS} {...props}>
      <GlobalBillingBanner {...props} />
    </Scopes>
  </Suspense>
);
