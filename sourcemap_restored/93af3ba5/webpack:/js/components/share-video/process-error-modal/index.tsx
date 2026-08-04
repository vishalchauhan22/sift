import { MY_VIDEOS_PAGE } from '@js/constants/routes';

import { useVideoContext } from '@js/common/video-player';
import React from 'react';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Button, Modal, Text } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  MAX_FPS,
  MAX_HOURS,
  VIDEO_VALIDATION_FILE_UNSUPPORTED,
  VIDEO_VALIDATION_FPS_TOO_HIGH,
  VIDEO_VALIDATION_MAX_DURATION,
  VIDEO_VALIDATION_RESOLUTION_TOO_HIGH,
  VIDEO_VALIDATION_SCAN_ERROR,
  VIDEO_VALIDATION_SUSPICIOUS,
} from '@loomhq/shared-utilities/constants/videoUploads';

const validationMessages = {
  [VIDEO_VALIDATION_FILE_UNSUPPORTED]:
    'This file is currently unsupported on Loom',
  [VIDEO_VALIDATION_SUSPICIOUS]:
    'Suspicious content found in file. This file will be removed from your library.',
  [VIDEO_VALIDATION_SCAN_ERROR]: 'There was an issue processing your video.',
  [VIDEO_VALIDATION_FPS_TOO_HIGH]: `The Frames Per Second of your video is above the allowed limit: ${MAX_FPS}fps.`,
  [VIDEO_VALIDATION_RESOLUTION_TOO_HIGH]:
    'The resolution of your video is above the allowed limit: (4k)',
  [VIDEO_VALIDATION_MAX_DURATION]: `The video length is longer than the allowed limit: ${MAX_HOURS} hours`,
};

const GENERIC_VALIDATION_MSG = 'The file could not be processed';
const MY_VIDEOS_UPLOAD_URL = `${MY_VIDEOS_PAGE}?upload=1`;

const onPersonalLibClick = () => {
  window.location.href = MY_VIDEOS_PAGE;
};

const onUploadNewClick = () => {
  window.location.href = MY_VIDEOS_UPLOAD_URL;
};

const ProcessErrorModalWithoutFeatureWrapper = (): JSX.Element => {
  const {
    video: {
      processingInformation,
      videoProperties: { externalUpload },
    },
  } = useVideoContext();
  const { featureLoadedRef } = useFeatureWrapper();
  const { videoUploadMessage, videoUploadValid } = processingInformation ?? {};
  const isVideoUpload = externalUpload === true;

  // Only show if explicitly 'false' and NOT null/undefined
  const showModal = isVideoUpload && videoUploadValid === false;

  return (
    <div ref={featureLoadedRef}>
      <Modal
        isOpen={showModal}
        mainButton={
          <Button
            href={MY_VIDEOS_UPLOAD_URL}
            htmlTag="a"
            variant="primary"
            onClick={onUploadNewClick}
          >
            Upload New File
          </Button>
        }
        secondaryButton={
          <Button
            href={MY_VIDEOS_PAGE}
            htmlTag="a"
            onClick={onPersonalLibClick}
          >
            Go to Personal Library
          </Button>
        }
      >
        <Text fontWeight="bold" size="body-lg">
          {(videoUploadMessage && validationMessages[videoUploadMessage]) ||
            GENERIC_VALIDATION_MSG}
        </Text>
      </Modal>
    </div>
  );
};

export const ProcessErrorModal = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.VideoUpload}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <ProcessErrorModalWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};

// eslint-disable-next-line import/no-default-export
export default ProcessErrorModal;
