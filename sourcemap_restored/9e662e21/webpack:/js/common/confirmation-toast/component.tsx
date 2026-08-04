import React from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Toast } from '@loomhq/lens';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useConfirmationToast } from './useConfirmationToast';

export const ConfirmationToastWithoutFeatureWrapper =
  (): JSX.Element | null => {
    const { show, message, setHideConfirmationToast } = useConfirmationToast();

    const { featureLoadedRef } = useFeatureWrapper();

    return (
      // role="status" on the parent div as it's always present in the DOM
      // makes the Toast accessible for screenreader users by announcing without interrupting (as aria-live polite)
      <div
        id="confirmation-toast-container"
        role="status"
        aria-live="polite"
        ref={featureLoadedRef}
      >
        <Toast
          duration="long"
          isOpen={show}
          onCloseClick={() => setHideConfirmationToast()}
        >
          {message}
        </Toast>
      </div>
    );
  };

// TODO: rename this component to ConfirmationToast since it's not a modal
export const ConfirmationToast = (): JSX.Element => (
  <FeatureWrapper
    feature={Feature.ConfirmationToast}
    errorType={ErrorBoundaryTypes.SILENT}
    additionalLoggingValues={{ version: 'confirmation toast' }}
  >
    <ConfirmationToastWithoutFeatureWrapper />
  </FeatureWrapper>
);
