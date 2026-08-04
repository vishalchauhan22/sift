import {
  GET_STARTED_CHECKLIST_DESKTOP_APP_INSTALL_CLICKED,
  GET_STARTED_CHECKLIST_EXTENSION_INSTALL_CLICKED,
} from '@js/constants/events';

import { CHROME_EXT_WEBSTORE_URL } from '@js/constants/routes';

import { useCompleteChecklistItem } from '@js/hooks/checklist';
import { useShowExtensionDownload } from '@js/hooks/useShowExtensionDownload';
import React from 'react';

import {
  getSupportedPlatformType,
  isSupportedDesktopPlatform,
} from '@js/utilities/download-desktop';

import { Button, Spacer } from '@loomhq/lens';
import { SvgChrome } from '@loomhq/lens/icons/chrome';

import DownloadDesktopButton from '@js/components/download-desktop-button';
import { ChecklistItem } from '@js/globalTypes.generated';

import * as analytics from '@js/utilities/analytics';

import { ChecklistV2DisplayContext } from '../types';

export const DownloadCta = ({
  displayContext,
  buttonSize = 'medium',
}: {
  displayContext: ChecklistV2DisplayContext | null;
  buttonSize?: 'medium' | 'small';
}): JSX.Element => {
  const { completeChecklistItem } = useCompleteChecklistItem(
    ChecklistItem.DownloadRecorder
  );

  const platform = getSupportedPlatformType();
  const canDownloadDesktop = isSupportedDesktopPlatform();
  const showExtensionDownload = useShowExtensionDownload();

  return (
    <>
      <Button
        icon={<SvgChrome />}
        onClick={() => {
          analytics.track(GET_STARTED_CHECKLIST_EXTENSION_INSTALL_CLICKED, {
            displayContext,
          });
          completeChecklistItem();
          window.open(CHROME_EXT_WEBSTORE_URL, '_blank');
        }}
        hasFullWidth
        size={buttonSize}
        // check to see if we should temporarily disable the checklist if needed due to problems with MV3 rollout
        disabled={!showExtensionDownload}
      >
        Install Chrome Extension
      </Button>

      {canDownloadDesktop && (
        <Spacer top="small">
          <DownloadDesktopButton
            variant="primary"
            size={buttonSize}
            hasFullWidth
            afterOnClick={() => {
              analytics.track(
                GET_STARTED_CHECKLIST_DESKTOP_APP_INSTALL_CLICKED,
                {
                  platform,
                  displayContext,
                }
              );

              completeChecklistItem();
            }}
          />
        </Spacer>
      )}
    </>
  );
};
