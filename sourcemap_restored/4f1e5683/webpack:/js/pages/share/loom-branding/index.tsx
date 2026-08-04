import { LOOM_URI } from '@js/constants/routes';

import { LoomBadge } from '@js/common/loom-badge';
import { PersistentRecordButtonAsync as PersistentRecordButton } from '@js/components/record-button/persistent-record-button-async';
import { useSDKSupport } from '@js/contexts/SDKContext';
import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { Container } from '@loomhq/lens';

import { SDK } from '@js/components/record-button/constants';

import { useMatchMobileOnly } from '@js/hooks/useMatchMedia';

const RecordButton = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "RecordButton" */ '@js/components/record-button'
  ).then(module => ({ default: module.RecordButton }))
);

export const LoomBranding = (): JSX.Element | null => {
  const { isSDKSupported } = useSDKSupport();
  const isMobile = useMatchMobileOnly();

  const showPersistentRecordButton = isSDKSupported;

  if (isMobile) {
    return null;
  }

  return showPersistentRecordButton ? (
    <Container position="fixed" bottom={2.5} zIndex={10}>
      <Suspense fallback={null}>
        <RecordButton priorityList={[SDK]}>
          <PersistentRecordButton isCollapsed={false} />
        </RecordButton>
      </Suspense>
    </Container>
  ) : (
    <div className="share-video-loom-badge-section">
      <LoomBadge href={LOOM_URI} title="Loom homepage" />
    </div>
  );
};
