import React, { useState } from 'react';

import { Arrange, Button, Text, Toast } from '@loomhq/lens';
import { SvgOutlook } from '@loomhq/lens/icons/outlook';
import { ConnectedServiceIntegrationType } from '@loomhq/shared-utilities/constants/calendarMeetings';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { ErrorSeverities } from '@js/constants/error-severities';

import { ChecklistItem } from '@js/globalTypes.generated';
import { useCompleteChecklistItem } from '@js/hooks/checklist';
import { openOAuthPopup } from '@js/utilities/auth';

import {
  useDisableLegacyZoomIntegrationForUser,
  useGetCalendarsConnected,
  useShouldDisableLegacyZoomIntegration,
} from '../common';
import { useDisconnectCalendarMutation } from '../graphql/DisconnectCalendar.generated';
import {
  ConnectCalendarButtonVariant,
  getButtonVariant,
  isBrandedVariant,
} from '../types';

type ButtonSize = 'small' | 'medium' | 'large';

interface ConnectMicrosoftOutlookProps {
  handleCalendarConnectionChange?: (connected: boolean) => void;
  handleClick?: () => void;
  shouldRedirect?: boolean;
  shouldRedirectToSetup?: boolean;
  variant?: ConnectCalendarButtonVariant;
  size?: ButtonSize;
  hasFullWidth?: boolean;
}

export const ConnectMicrosoftOutlook = ({
  handleCalendarConnectionChange,
  handleClick,
  shouldRedirect,
  shouldRedirectToSetup = false,
  variant = 'branded-neutral',
  size = 'medium',
  hasFullWidth = false,
}: ConnectMicrosoftOutlookProps): JSX.Element | null => {
  const { showErrorBar } = useErrorBar();
  const {
    shouldDisableLegacyZoomIntegration,
    shouldDisableLegacyZoomIntegrationLoading,
  } = useShouldDisableLegacyZoomIntegration();

  const { completeChecklistItem } = useCompleteChecklistItem(
    ChecklistItem.MeetingRecording
  );

  const disableLegacyZoomIntegrationForUser =
    useDisableLegacyZoomIntegrationForUser();

  const { microsoftOutlookConnected } = useGetCalendarsConnected();

  const connectMicrosoftOutlook = () => {
    openOAuthPopup(`microsoft-outlook`, {}, data => {
      if (data.error) {
        showErrorBar({
          message: data.error,
          severity: ErrorSeverities.ERROR,
        });
      } else {
        completeChecklistItem();
        if (shouldDisableLegacyZoomIntegration) {
          disableLegacyZoomIntegrationForUser();
        }
        handleCalendarConnectionChange?.(true);
        if (shouldRedirect) {
          window.location.href = '/calendar?showSettings=1';
        }
        if (shouldRedirectToSetup) {
          window.location.href = '/meetings/setup';
        }
      }
    });
  };
  const [disconnectCalendarMutation] = useDisconnectCalendarMutation({
    variables: {
      integrationType: ConnectedServiceIntegrationType.MICROSOFT_OUTLOOK,
    },
    onCompleted: data => {
      if (
        data.disconnectCalendar?.__typename === `DisconnectCalendarPayload` &&
        data.disconnectCalendar.success
      ) {
        handleCalendarConnectionChange?.(false);
        setDisconnectedToastIsOpen(true);
      }
    },
  });

  const disconnectMicrosoftOutlook = () => {
    disconnectCalendarMutation();
  };

  const [disconnectedToastIsOpen, setDisconnectedToastIsOpen] = useState(false);

  const buttonVariant = getButtonVariant(variant, microsoftOutlookConnected);
  const isBranded = isBrandedVariant(variant);

  const connectButtonLabel = isBranded ? 'Connect Outlook Calendar' : 'Connect';

  if (shouldDisableLegacyZoomIntegrationLoading) {
    return null;
  }

  return (
    <>
      <Toast
        isOpen={disconnectedToastIsOpen}
        onCloseClick={() => setDisconnectedToastIsOpen(false)}
        duration="long"
      >
        <Arrange alignItems="start" gap="small">
          <Text>Microsoft Outlook has been disconnected.</Text>
        </Arrange>
      </Toast>

      <Button
        size={size}
        variant={buttonVariant}
        icon={!microsoftOutlookConnected && isBranded ? <SvgOutlook /> : null}
        onClick={() => {
          if (microsoftOutlookConnected) {
            disconnectMicrosoftOutlook();
          } else {
            connectMicrosoftOutlook();
          }
          if (handleClick) {
            handleClick();
          }
        }}
        hasFullWidth={hasFullWidth}
      >
        {microsoftOutlookConnected ? 'Disconnect' : connectButtonLabel}
      </Button>
    </>
  );
};
