import { ErrorSeverities } from '@js/constants/error-severities';
import { NODE_ENV } from '@js/constants/runtimeConfig';

import { useCurrentUserSelector } from '@js/common/current-user';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { CHECKLIST_RECORD_BUTTON_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import React from 'react';
import * as logger from '@js/utilities/loggerx';

import { chooseDeeplinkingPrefix } from '@loomhq/shared-utilities/constants/environment';
import { Team } from '@loomhq/shared-utilities/constants/product';
import {
  isInstalled,
  requestExtensionOpenIfInstalled,
} from '@js/utilities/extension';

import { useMount } from './useMount';

export function useRecordLoom(): {
  record: () => void;
  recorder: {
    chrome: boolean;
    desktop: boolean;
  };
} {
  const { openModal } = useModals();
  const { showErrorBar } = useErrorBar();
  const [chromeRecorderInstalled, setChromeRecorderInstalled] =
    React.useState(false);
  const usedChromeRecorder = useCurrentUserSelector(
    user => user.hasActivatedChromeExtension,
    null
  );
  const usedDesktopRecorder = useCurrentUserSelector(
    user => user.hasActivatedDesktopApp,
    null
  );

  useMount(() => {
    isInstalled(setChromeRecorderInstalled);
  });

  const record = () => {
    if (usedChromeRecorder && chromeRecorderInstalled) {
      requestExtensionOpenIfInstalled('first-video-share-modal', success => {
        if (!success) {
          logger.error(
            'Unable to re-record with the browser extension from the get started checklist',
            {},
            { team: Team.Outreach }
          );

          showErrorBar({
            message: 'An error occurred attempting to start a recording',
            severity: ErrorSeverities.ERROR,
          });
        }
      });

      return;
    }

    if (usedDesktopRecorder) {
      document.location.href = `${chooseDeeplinkingPrefix(NODE_ENV)}://`;

      return;
    }

    openModal({ modalType: CHECKLIST_RECORD_BUTTON_MODAL });
  };

  const recorder = {
    chrome: Boolean(usedChromeRecorder && chromeRecorderInstalled),
    desktop: Boolean(usedDesktopRecorder),
  };

  return { record, recorder };
}
