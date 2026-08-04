import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { AnonymousShareGateMobileModalProps } from './types';

const AnonymousShareGateMobileModalSyncer = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "AnonymousShareGateMobileModal" */ '@js/pages/share/anonymous-share-gate-modal/mobile'
  ).then(module => ({ default: module.AnonymousShareGateMobileModal }))
);

export const AnonymousShareGateMobileModalAsync: React.FC<
  React.PropsWithChildren<AnonymousShareGateMobileModalProps>
> = ({ showModal = true }: AnonymousShareGateMobileModalProps): JSX.Element => (
  <Suspense fallback={null}>
    <AnonymousShareGateMobileModalSyncer showModal={showModal} />
  </Suspense>
);
