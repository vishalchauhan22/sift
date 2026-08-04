import classNames from 'classnames';

import { useCurrentUserCallback } from '@js/common/current-user';
import { BusinessHighlightTooltip } from '@js/components/share-video/common/business-highlight-tooltip';
import UpgradeTooltip from '@js/components/upgrade-tooltip';

import UploadVideoButton from '@js/components/upload-video-button';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import React from 'react';

import { UpgradeComponentFeature } from '@js/utilities/upgrades';

import { Container, Icon } from '@loomhq/lens';
import { SvgEditions } from '@loomhq/lens/icons/editions';

import { track } from '@js/utilities/analytics';

import { VIDEO_UPLOADS_HOVER_ACCESS_DENIED } from '../../constants/events';
import { useGetSelectedWorkspace } from '../../hooks/workspace-basic';

import styles from './styles.module.less';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

const UploadNewVideoButton = ({
  hasUploadScope,
  plaintextButton = false,
  icon = null,
  inDropdown = false,
  buttonVariant = undefined,
  customStyle = undefined,
  buttonText,
}: {
  hasUploadScope: boolean;
  plaintextButton?: boolean;
  icon?: JSX.Element | null;
  inDropdown?: boolean;
  // TODO(lens): update types when exported from Lens
  buttonVariant:
    | 'neutral'
    | 'primary'
    | 'record'
    | 'upgrade'
    | 'danger'
    | undefined;
  customStyle?: string | undefined;
  buttonText?: string;
}): JSX.Element => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const isBusinessTrialUser = useOnBusinessTrial();

  const trackVideoUploadButtonHoverEvent = useCurrentUserCallback(
    user => {
      track(
        VIDEO_UPLOADS_HOVER_ACCESS_DENIED,
        withIdentifiers(
          VIDEO_UPLOADS_HOVER_ACCESS_DENIED,
          AnalyticsEntityId.user(user.id, 'userId'),
          AnalyticsEntityId.workspace(
            selectedWorkspace.id,
            'string',
            'workspaceId'
          )
        )
      );
    },
    () => {
      return;
    }
  );

  if (!hasUploadScope) {
    return (
      <UpgradeTooltip feature={UpgradeComponentFeature.UPLOAD_VIDEO}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onMouseEnter={trackVideoUploadButtonHoverEvent}>
          <UploadVideoButton
            isDisabled={true}
            plaintextButton={plaintextButton}
            icon={icon}
            inDropdown={inDropdown}
            buttonVariant={buttonVariant}
            customStyle={customStyle}
            buttonText={buttonText}
          />
        </div>
      </UpgradeTooltip>
    );
  }

  if (isBusinessTrialUser) {
    return (
      <div className={styles.businessHighlightTooltipWrapper}>
        <BusinessHighlightTooltip
          tooltipDirection="topCenter"
          tooltipText="Create a centralized video library for your team by importing videos."
        >
          <UploadVideoButton
            inDropdown={inDropdown}
            plaintextButton={plaintextButton}
            icon={
              <Container
                width={3}
                height={3}
                backgroundColor="upgrade"
                className={classNames(
                  styles.upgradeIcon,
                  'flex items:center justify:center'
                )}
                paddingTop="1px"
              >
                <Icon color="backdropDark" size={2} icon={<SvgEditions />} />
              </Container>
            }
            buttonVariant={buttonVariant}
            customStyle={customStyle}
            buttonText={buttonText}
          />
        </BusinessHighlightTooltip>
      </div>
    );
  }

  return (
    <UploadVideoButton
      inDropdown={inDropdown}
      plaintextButton={plaintextButton}
      icon={icon}
      buttonVariant={buttonVariant}
      customStyle={customStyle}
      buttonText={buttonText}
    />
  );
};

// eslint-disable-next-line import/no-default-export
export default UploadNewVideoButton;
