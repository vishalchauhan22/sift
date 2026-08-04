import React, { useCallback, useMemo, useState } from 'react';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { useOnDismissFtux } from '@js/hooks/ftux';
import { useCurrentUserCanEdit } from '@js/pages/share/common';
import { useVideoContext } from '@js/common/video-player/context';
import { usePlayerHasStarted } from '@js/common/video-player/hooks';
import {
  Button,
  Arrange,
  Container,
  Text,
  Align,
  IconButton,
  Spacer,
} from '@loomhq/lens';

import styles from './styles.module.css';
import { SvgClose } from '@loomhq/lens/icons/close';
import { useEditZoomInstructions } from '@js/common/edit-zoom-instructions';
import { ZoomCreatedBy } from '@js/globalTypes.generated';

type ZoomToClickSharePageFtuxStep = {
  subtitle: string;
  description: string;
};

const FTUX_TITLE = 'More polish, more control over camera and screen';

const TOUR_STEPS: ZoomToClickSharePageFtuxStep[] = [
  {
    subtitle: 'Set camera location while editing',
    description:
      'Moved your camera to a better spot while recording? We’ll save that spot next time you record.',
  },
  {
    subtitle: 'Automatic "Zoom to click"',
    description: 'We’ll smoothly zoom into areas where you clicked.',
  },
  {
    subtitle: 'Manual zoom (coming soon)',
    description: 'Add additional focus to any part of your video.',
  },
];

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.closeButton}>
    <IconButton
      altText="close"
      onClick={onClick}
      icon={<SvgClose />}
      size="small"
      iconColor="bodyDimmed"
    />
  </div>
);

const StepEllipse = ({ isCurrentStep }: { isCurrentStep: boolean }) => (
  <Container
    radius="full"
    width={1}
    height={1}
    backgroundColor={isCurrentStep ? 'blurple' : 'grey3'}
  />
);

const PlaceholderForGif = () => (
  <Container
    radius="medium"
    overflow="hidden"
    height="135px"
    width="100%"
    backgroundColor="blurpleLight"
  >
    <Align alignment="center">
      <Text size="xxxlarge" color="bodyDimmed" fontWeight="book">
        GIF
      </Text>
    </Align>
  </Container>
);

const ZoomToClickSharePageFtuxContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  const onDismissFtux = useOnDismissFtux();

  const handleDismiss = useCallback(() => {
    onDismissFtux(UserPropertyEnum.ZOOM_TO_CLICK_SHARE_PAGE_FTUX);
  }, [onDismissFtux]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleDismiss();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [isLastStep, handleDismiss, setCurrentStep]);

  return (
    <Container
      radius="medium"
      padding="medium"
      backgroundColor="background"
      borderWidth="1px"
      shadow="medium"
      width={32}
    >
      <CloseButton onClick={handleDismiss} />

      <Spacer top={1.5} />

      <Arrange gap="medium" autoFlow="row">
        <Text size="body-lg" fontWeight="bold">
          {FTUX_TITLE}
        </Text>

        <PlaceholderForGif />

        <Container>
          <Text size="body-md" fontWeight="bold">
            {TOUR_STEPS[currentStep].subtitle}
          </Text>
          <Text size="body-md">{TOUR_STEPS[currentStep].description}</Text>
        </Container>

        <Arrange autoFlow="column" justifyContent="space-between">
          <Arrange gap={0.5}>
            <StepEllipse isCurrentStep={currentStep === 0} />
            <StepEllipse isCurrentStep={currentStep === 1} />
            <StepEllipse isCurrentStep={currentStep === 2} />
          </Arrange>
          <Button variant="primary" onClick={handleNext}>
            {isLastStep ? 'Got it' : 'Next'}
          </Button>
        </Arrange>
      </Arrange>
    </Container>
  );
};

export const ZoomToClickSharePageFtux = (): JSX.Element | null => {
  const {
    video: { id: videoId },
  } = useVideoContext();
  const hasPlayerStarted = usePlayerHasStarted(videoId);
  const currentUserCanEdit = useCurrentUserCanEdit();

  const { isLoomZoomToClickEnabled, zooms } = useEditZoomInstructions(videoId);

  const isAiZoomApplied = useMemo(
    () => zooms.some(zoom => zoom.zoomCreatedBy === ZoomCreatedBy.Auto),
    [zooms]
  );

  const shouldShowFtux =
    !hasPlayerStarted &&
    currentUserCanEdit &&
    isLoomZoomToClickEnabled &&
    isAiZoomApplied;

  if (!shouldShowFtux) {
    return null;
  }

  return (
    <div className={styles.ftuxWrapper}>
      <FtuxWrapper name={UserPropertyEnum.ZOOM_TO_CLICK_SHARE_PAGE_FTUX}>
        <ZoomToClickSharePageFtuxContent />
      </FtuxWrapper>
    </div>
  );
};
