import { isDev } from '@js/constants/environment';

import { SilentErrorBoundary } from '@js/common/error-management';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import React, { Suspense, useCallback, useEffect } from 'react';
import { getParam } from '@js/utilities/url';

import { Backdrop } from '@loomhq/lens';
import { CONFIG_ENABLE_DEV_TOOLS } from '@loomhq/shared-utilities/constants/featureFlag';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { ModalComponents } from './modal-components';
import { ModalTypeKeys } from './types';
import { useModals } from './useModals';

export const ModalContainer = (): JSX.Element | null => {
  // Note: This is the flag we use to determine whether or not to show
  // the devtools modal
  const isLoommate = useFeatureFlagValue<boolean>(CONFIG_ENABLE_DEV_TOOLS);

  const modalAllowed = isDev || isLoommate;

  const modalParam = modalAllowed ? getParam('modal') : null;
  const { modalType, options, closeModal, openModal } = useModals();

  const closeModalCallback = useCallback(() => closeModal(), [closeModal]);
  const openModalCallback = useCallback(() => {
    if (modalType) {
      openModal({ modalType, options });
    }
  }, [modalType, openModal, options]);

  useEffect(() => {
    if (modalParam && ModalComponents[modalParam]) {
      openModal({ modalType: modalParam as ModalTypeKeys });
    }
  }, [openModal, modalParam]);

  if (!modalType) {
    return null;
  }

  const ActiveModal = ModalComponents[modalType];

  if (!ActiveModal) {
    return null;
  }

  return (
    <SilentErrorBoundary
      feature={Feature.ModalContainer}
      name="Modal Container"
    >
      <Suspense fallback={<Backdrop isOpen />}>
        <ActiveModal
          {...options}
          openModal={openModalCallback}
          closeModal={closeModalCallback}
        />
      </Suspense>
    </SilentErrorBoundary>
  );
};
