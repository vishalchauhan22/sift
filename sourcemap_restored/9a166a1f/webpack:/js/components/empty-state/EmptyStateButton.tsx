import React from 'react';

import { Arrange, Button, Logo, Spacer } from '@loomhq/lens';
import {
  CONTENT_UPLOAD_ACTION_READ,
  CONTENT_UPLOAD_ACTION_WRITE,
} from '@loomhq/shared-utilities/constants/scopes';
import { useGetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';
import { UpgradeButton } from '@js/common/upgrade';
import UploadNewVideoButton from '@js/components/new-video-button/UploadNewVideoButton';
import { RecordButton } from '@js/components/record-button';
import Scopes from '@js/components/scopes';
import { EMPTY_STATE_CLICKED } from '@js/constants/events';

import { useEmptyStateContent } from '@js/hooks/useEmptyStateContent';
import { useWorkspaceDestinationStateData } from '@js/hooks/useWorkspaceDestinationStateData';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';

import { useHasScope } from '@js/hooks/useHasScopes';

import { track } from '@js/utilities/analytics';

import { isPureTrial } from '../../utilities/billingAndPayments/billingDetailsUtil';
import { COMMUNITY_EMPTY_STATE_CONTENT } from './community-empty-state/constants';
import {
  EmptyStateType,
  AnalyticsButtonCtaName,
  CustomButtonType,
} from './constants';

const DestinationEmptyStateButton = ({
  type,
  isCommunity = false,
}: {
  type: EmptyStateType;
  isCommunity: boolean | undefined;
}): JSX.Element => {
  // // TODO: CRX-1364 Clean up logic for gating free trial uploads
  const EMPTY_STATE_CONTENT = useEmptyStateContent();

  const workspace = useGetSelectedWorkspace();
  const { data } = useGetWorkspaceBillingDetailsQuery({
    variables: {
      workspaceId: workspace?.id,
    },
    skip: !workspace?.id,
  });
  const billingDetails = data?.billing?.billing_details;
  const isWorkspacePureTrialing = isPureTrial(billingDetails);

  const emptyStateConfig = isCommunity
    ? COMMUNITY_EMPTY_STATE_CONTENT[type]
    : EMPTY_STATE_CONTENT[type];

  const {
    source,
    buttonText,
    buttonAction,
    customButton,
    analyticsEmptyStateName,
    isViewerVariant,
    analyticsButtonCtaName,
  } = emptyStateConfig;

  const hasUploadWriteScope = useHasScope(CONTENT_UPLOAD_ACTION_WRITE);
  const workspaceDestinationStateData = useWorkspaceDestinationStateData();

  if (customButton === CustomButtonType.RECORD_AND_UPLOAD_LOOM) {
    return (
      <Arrange autoFlow="column" gap="small">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
        <div
          onClick={() => {
            track(EMPTY_STATE_CLICKED, {
              empty_state_name: analyticsEmptyStateName,
              is_viewer_variant: isViewerVariant,
              cta_clicked: analyticsButtonCtaName,
              ...workspaceDestinationStateData,
            });
          }}
        >
          <RecordButton source={source}>
            <Button variant="primary" data-testid="empty-state-record-button">
              <Arrange autoFlow="column">
                <Logo
                  variant="symbol"
                  maxWidth={2.5}
                  symbolColor="currentColor"
                />

                <Spacer right="small" />
                {buttonText}
              </Arrange>
            </Button>
          </RecordButton>
        </div>
        {!isWorkspacePureTrialing ? (
          <Scopes name={CONTENT_UPLOAD_ACTION_READ}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
            <div
              data-testid="empty-state-upload-button"
              onClick={() => {
                track(EMPTY_STATE_CLICKED, {
                  empty_state_name: analyticsEmptyStateName,
                  is_viewer_variant: isViewerVariant,
                  cta_clicked: AnalyticsButtonCtaName.UPLOAD_VIDEO,
                  ...workspaceDestinationStateData,
                });
              }}
            >
              <UploadNewVideoButton
                hasUploadScope={hasUploadWriteScope}
                plaintextButton={false}
                buttonVariant="neutral"
                buttonText={'Upload a video'}
              />
            </div>
          </Scopes>
        ) : null}
      </Arrange>
    );
  }

  if (customButton === CustomButtonType.REQUEST_ACCESS) {
    return (
      <UpgradeButton
        data-testid="empty-state-upgrade-button"
        defaultRoleText={buttonText}
        // TODO(next author): Add more specific language for aria label
        aria-label="upgrade"
        buttonVariant="primary"
        hideIcon
      />
    );
  }

  return (
    <Button
      data-testid="empty-state-button"
      variant="primary"
      onClick={() => {
        if (buttonAction) {
          buttonAction();
        }

        track(EMPTY_STATE_CLICKED, {
          empty_state_name: analyticsEmptyStateName,
          is_viewer_variant: isViewerVariant,
          cta_clicked: analyticsButtonCtaName,
          ...workspaceDestinationStateData,
        });
      }}
    >
      {buttonText}
    </Button>
  );
};

// eslint-disable-next-line import/no-default-export
export default DestinationEmptyStateButton;
