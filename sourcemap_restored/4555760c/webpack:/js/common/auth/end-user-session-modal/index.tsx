import { ErrorSeverities } from '@js/constants/error-severities';
import { LOGIN_PAGE, LOOM_URI } from '@js/constants/routes';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { BaseErrorBoundary } from '@js/common/error-management/error-boundary';
import React from 'react';
import * as logger from '@js/utilities/loggerx';

import { Button, Modal } from '@loomhq/lens';
import { urlUtils } from '@loomhq/shared-utilities';
import { Feature, Team } from '@loomhq/shared-utilities/constants/product';

const { getloginUrlWithRedirect } = urlUtils;

const ModalContent: React.FC<React.PropsWithChildren<unknown>> = () => {
  const currentUrl = window.location.href ?? '';
  const logInWithRedir = getloginUrlWithRedirect(
    currentUrl,
    'Please Login again',
    LOOM_URI + LOGIN_PAGE
  );

  return (
    <Modal
      isOpen
      maxWidth={60}
      title="Please sign in again"
      mainButton={
        <Button variant="primary" href={logInWithRedir} htmlTag="a">
          Sign in
        </Button>
      }
    >
      You’ve been signed out automatically. To continue using Loom, please sign
      in.
    </Modal>
  );
};

// TODO(tatiana): Replace with feature wrapper after mapping onError to the feature wrapper for base error boundaries
export const EndUserSessionModal = (): JSX.Element => {
  const { showErrorBar } = useErrorBar();

  return (
    <BaseErrorBoundary
      feature={Feature.Authentication}
      onError={error => {
        logger.error(
          error,
          { message: 'Error in End User Session Modal' },
          {
            team: Team.Outreach,
          }
        );
        showErrorBar({
          message: 'Something went wrong. Please try again later.',
          severity: ErrorSeverities.ERROR,
        });
      }}
    >
      <ModalContent />
    </BaseErrorBoundary>
  );
};
