import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import {
  VIDEO_UPLOADS_MODAL_CLOSED,
  VIDEO_UPLOADS_SHOW_MODAL_ON_PARAM_PAGE_LOAD,
  VIDEO_UPLOADS_UPLOAD_VIDEO_BUTTON_CLICKED,
} from '@js/constants/events';

import Uppy from '@uppy/core';
import { v4 as uuidv4 } from 'uuid';
import { DashboardModal } from '@uppy/react';
import cn from 'classnames';
import { BusinessHighlightTooltip } from '@js/components/share-video/common/business-highlight-tooltip';
import UpgradeTooltip from '@js/components/upgrade-tooltip';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import React, { useEffect } from 'react';
import { useHasScope } from '@js/hooks/useHasScopes';
import { UpgradeComponentFeature } from '@js/utilities/upgrades';
import { useVideoDashboard } from '@js/utilities/uppy/useVideoDashboard';

import {
  UPPY_LOCALE_OPTIONS,
  configureUppy,
  getDashboardData,
  unmountUppy,
} from '@js/utilities/uppy/videoUploads';

import { getParam } from '@js/utilities/url';

import {
  Align,
  Arrange,
  Button,
  Container,
  TextButton,
  Text,
  Icon,
} from '@loomhq/lens';
import { SvgUpload } from '@loomhq/lens/icons/upload';
import { SvgEditions } from '@loomhq/lens/icons/editions';
import { CONTENT_UPLOAD_ACTION_WRITE } from '@loomhq/shared-utilities/constants/scopes';

import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.less';

import { useUppyCSSLinkDynamically } from './useUppyCSSLinkDynamically';

let uppy: Uppy | null = null;

const showUploadModalOnLoad = getParam('upload') === '1';

export const useGetUploadOption = (
  showVideoUploadModal: (show: boolean) => void
): {
  title: JSX.Element;
  icon: JSX.Element;
  onClick?: VoidFunction;
  disabled?: boolean;
} => {
  const hasContentUploadWrite = useHasScope(CONTENT_UPLOAD_ACTION_WRITE);
  const isBusinessTrialUser = useOnBusinessTrial();

  if (hasContentUploadWrite && isBusinessTrialUser) {
    return {
      title: (
        <div className={styles.businessHighlightTooltipWrapper}>
          <BusinessHighlightTooltip
            tooltipDirection="bottomCenter"
            tooltipText="Create a centralized video library for your team by importing videos."
          >
            <Arrange gap="small">
              <Text>Upload a Video</Text>
              <Container
                width={3}
                height={3}
                backgroundColor="upgrade"
                className={styles.upgradeIcon}
              >
                <Align>
                  <Icon size={2} icon={<SvgEditions />} />
                </Align>
              </Container>
            </Arrange>
          </BusinessHighlightTooltip>
        </div>
      ),

      icon: <SvgUpload />,
      onClick: () => {
        showVideoUploadModal(true);
      },
    };
  }

  if (hasContentUploadWrite) {
    return {
      title: <Text>Upload a video</Text>,
      icon: <SvgUpload />,
      onClick: () => {
        showVideoUploadModal(true);
      },
    };
  }

  return {
    title: (
      <UpgradeTooltip feature={UpgradeComponentFeature.UPLOAD_VIDEO}>
        Upload a video
      </UpgradeTooltip>
    ),

    icon: <SvgUpload />,
    disabled: true,
  };
};

export const UppyDashboardModal: React.FC<{
  showDashboardModal: boolean;
  setShowDashboardModal: (showDashboardModal: boolean) => void;
}> = ({ showDashboardModal, setShowDashboardModal }) => {
  useUppyCSSLinkDynamically();
  const { setRenameId, currentFolderId, currentSpaceId } = useVideoDashboard();
  const onModalClosed = () => {
    setShowDashboardModal(false);

    const dashData = getDashboardData(currentFolderId);

    analytics.track(VIDEO_UPLOADS_MODAL_CLOSED, {
      pathname: window.location.pathname,
      ...dashData,
    });
  };

  useEffect(() => {
    uppy = configureUppy(
      {
        allowMultipleUploadBatches: true,
        allowMultipleUploads: true,
      },
      setRenameId,
      currentFolderId,
      currentSpaceId
    );

    if (showUploadModalOnLoad) {
      setShowDashboardModal(true);

      const dashData = getDashboardData(currentFolderId);

      analytics.track(VIDEO_UPLOADS_SHOW_MODAL_ON_PARAM_PAGE_LOAD, {
        pathname: window.location.pathname,
        ...dashData,
      });
    }

    return () => {
      unmountUppy(setRenameId, currentFolderId, currentSpaceId);

      uppy = null;
    };
  }, [setShowDashboardModal, currentFolderId, currentSpaceId, setRenameId]);

  useEffect(() => {
    // Removes the completed files when the uppy modal is opened
    if (showDashboardModal && uppy) {
      const files = uppy.getFiles();

      files.forEach(file => {
        if (file.progress?.uploadComplete) {
          uppy?.removeFile(file.id);
        }
      });
    }
  }, [showDashboardModal]);

  if (!uppy) {
    return null;
  }

  return (
    <DashboardModal
      // Setting the ID will avoid the following error:
      // Already found a plugin named 'react:DashboardModal'. Uppy plugins must have unique `id` options
      id={uuidv4()}
      uppy={uppy}
      showLinkToFileUploadResult={true}
      open={showDashboardModal}
      closeModalOnClickOutside={true}
      onRequestClose={onModalClosed}
      // @ts-expect-error FIXME: These types do not match
      locale={UPPY_LOCALE_OPTIONS}
      closeAfterFinish={false}
    />
  );
};

/**
 * @param {obj} param
 * @param {boolean} [param.isDisabled]
 * @param {boolean} [param.plaintextButton]
 * @param {any|null} [param.icon]
 * @param {boolean} [param.inDropdown]
 * @param {string} [param.buttonVariant]
 * @param {any|undefined} [param.customStyle]
 * @param {string} [buttonText]
 */
const UploadVideoButton = ({
  isDisabled = false,
  plaintextButton = false,
  icon = null,
  inDropdown = false,
  buttonVariant = 'primary',
  customStyle = undefined,
  buttonText = 'Upload video',
  hasFullWidth = false,
}: {
  isDisabled?: boolean;
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
  customStyle?: string;
  buttonText?: string;
  hasFullWidth?: boolean;
}): JSX.Element => {
  const [showDashboardModal, setShowDashboardModal] = React.useState(false);
  const { currentFolderId } = useVideoDashboard();

  const onUploadVideoClick = () => {
    setShowDashboardModal(true);

    const dashData = getDashboardData(currentFolderId);

    analytics.track(VIDEO_UPLOADS_UPLOAD_VIDEO_BUTTON_CLICKED, {
      pathname: window.location.pathname,
      ...dashData,
    });
  };

  if (inDropdown) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
      <span onClick={!isDisabled ? onUploadVideoClick : () => {}}>
        Upload video
      </span>
    );
  }

  if (plaintextButton) {
    return (
      <TextButton
        onClick={!isDisabled ? onUploadVideoClick : () => {}}
        icon={icon}
      >
        Upload video
      </TextButton>
    );
  }

  return (
    <>
      <UppyDashboardModal
        showDashboardModal={showDashboardModal}
        setShowDashboardModal={setShowDashboardModal}
      />
      <Button
        className={cn(customStyle && customStyle)}
        variant={buttonVariant}
        onClick={onUploadVideoClick}
        isDisabled={isDisabled}
        icon={icon}
        hasFullWidth={hasFullWidth}
      >
        <span>{buttonText}</span>
      </Button>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default UploadVideoButton;
