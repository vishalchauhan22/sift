import { Gates } from '@js/pages/share/common/constants/gates';
import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { AnonymousShareGateDesktopModalProps } from './types';
const AnonymousShareGateDesktopModalSyncer = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "AnonymousShareGateDesktopModal" */ '@js/pages/share/anonymous-share-gate-modal/desktop'
  ).then(module => ({ default: module.AnonymousShareGateDesktopModal }))
);

export const AnonymousShareGateDesktopModalAsync: React.FC<
  React.PropsWithChildren<AnonymousShareGateDesktopModalProps>
> = ({
  showModal = true,
  gate = Gates.ASG,
}: AnonymousShareGateDesktopModalProps): JSX.Element => (
  <Suspense fallback={null}>
    <AnonymousShareGateDesktopModalSyncer showModal={showModal} gate={gate} />
  </Suspense>
);
