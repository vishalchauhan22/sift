import {
  SEASONAL_LAUNCH_TOUR_CLOSED,
  SEASONAL_LAUNCH_TOUR_FEATURE_SHOWN,
  SEASONAL_LAUNCH_TOUR_STARTED,
} from '@js/constants/events';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { WorkflowType } from '@js/common/workflows/common/types';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useOnDismissFtux } from '@js/hooks/ftux';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import * as logger from '@js/utilities/loggerx';
import { incrementMetric } from '@js/utilities/metrics';

import { Align, Arrange, Button, Text, TextButton } from '@loomhq/lens';
import { SEASONAL_LAUNCH_TOUR } from '@loomhq/shared-utilities/constants/featureFlag';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

import * as analytics from '@js/utilities/analytics';

import { Background } from './Background';
import { SeasonalLaunchSharePageTourContextType, TourStepType } from './types';
import { useGetTourSteps } from './use-get-tour-steps';
import { useSyncWorkflowsModalWithTour } from './use-sync-workflows-modal-with-tour';

const MIN_TOUR_WIDTH = 1200;

const BackgroundWrapper = styled.div`
  background: #3d2e7c;
  opacity: 80%;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 500;
`;

const Menu = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  overflow: hidden;
  width: 625px;
  background: #2b1c50;
  border-radius: 30px;
  color: white;
  padding: 40px;
  z-index: 1001;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const SeasonalLaunchSharePageTourContext =
  createContext<SeasonalLaunchSharePageTourContextType | null>(null);

type TourMenuProps = {
  tourSteps: TourStepType[];
  step: number;
  handleNextStep: () => void;
  handleCloseTour: () => void;
  setShouldShowTour: React.Dispatch<React.SetStateAction<boolean>>;
};

const TourMenu = ({
  tourSteps,
  step,
  handleNextStep,
  handleCloseTour,
}: TourMenuProps) => {
  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const NextButton = () => {
    if (step + 1 < tourSteps.length) {
      return (
        <Button
          style={{ background: 'white', color: 'black' }}
          size="large"
          onClick={handleNextStep}
        >
          Next
        </Button>
      );
    }

    return null;
  };

  return (
    <Menu>
      <Background />
      <Content>
        <Text size="heading-md" fontWeight="bold" noWrap className="mb:medium">
          {tourSteps[step].title}
        </Text>
        <Text size="heading-sm" color="white" className="mb:medium">
          {tourSteps[step].description}
        </Text>
        <Arrange gap="small" columns={['50%', '50%']}>
          <Arrange gap="small">
            <NextButton />
            {step === tourSteps.length - 1 ? (
              <Button
                size="large"
                onClick={handleCloseTour}
                style={{ background: 'white', color: 'black' }}
              >
                Close tour
              </Button>
            ) : (
              <TextButton
                size="large"
                style={{ color: 'white' }}
                onClick={handleCloseTour}
              >
                Close
              </TextButton>
            )}
          </Arrange>
          <Align alignment="centerRight" style={{ paddingRight: '10px' }}>
            <Text size="body-lg" color="white">
              {step + 1}/{tourSteps.length}
            </Text>
          </Align>
        </Arrange>
      </Content>
    </Menu>
  );
};

export const SeasonalLaunchSharePageTourContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const onDismissFtux = useOnDismissFtux();

  const syncWorkflowsModalWithTour = useSyncWorkflowsModalWithTour();

  const [isActive, setIsActive] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [shouldShowTour, setShouldShowTour] = React.useState(true);
  const [tourStarted, setTourStarted] = React.useState(false);
  const [userOpenedWorkflowType, setUserOpenedWorkflowType] =
    React.useState<WorkflowType | null>(null);

  const tourSteps = useGetTourSteps(userOpenedWorkflowType);
  const flagIsEnabled = useFlagIsActivated({
    flag: SEASONAL_LAUNCH_TOUR,
    activationValues: [true],
  });

  const tourStep = tourSteps[step];

  const handleCloseTour = useCallback(() => {
    analytics.track(SEASONAL_LAUNCH_TOUR_CLOSED);

    incrementMetric('seasonal.launch.tour.closed');

    onDismissFtux(UserPropertyEnum.SEASONAL_LAUNCH_TOUR);

    setIsActive(false);
    setShouldShowTour(false);
  }, [onDismissFtux]);

  const contextValue = useMemo(
    () => ({
      tourStep,
      isActive,
      shouldShowTour,
      setShouldShowTour,
      handleCloseTour,

      startSeasonalLaunchTour: () => {
        if (tourStarted) {
          return;
        }

        if (!flagIsEnabled) {
          logger.warning('SeasonalLaunchTour: Feature protected', {
            tourStepsLength: tourSteps.length,
          });

          return;
        }

        setStep(0);

        if (tourSteps.length === 0) {
          logger.warning('SeasonalLaunchTour: No steps to show', {
            tourStepsLength: tourSteps.length,
          });

          return;
        }

        if (document.body.clientWidth <= MIN_TOUR_WIDTH) {
          logger.warning('SeasonalLaunchTour: Screen too small', {
            clientWidth: document.body.clientWidth,
          });

          return;
        }

        analytics.track(SEASONAL_LAUNCH_TOUR_STARTED);
        analytics.track(SEASONAL_LAUNCH_TOUR_FEATURE_SHOWN, {
          feature: tourStep.step,
        });

        incrementMetric('seasonal.launch.tour.feature.shown', {
          feature: tourStep.step,
        });

        setIsActive(true);
        setTourStarted(true);
      },
      onUserOpenedWorkflow: (workflowType: WorkflowType) => {
        if (!isActive) {
          return;
        }

        setUserOpenedWorkflowType(workflowType);
        setStep(1);
      },
    }),
    [
      tourStep,
      isActive,
      tourSteps.length,
      flagIsEnabled,
      shouldShowTour,
      tourStarted,
      handleCloseTour,
    ]
  );

  const scrollToFeature = (tourStep: TourStepType) => {
    const elements = document.getElementsByClassName(tourStep.step);

    if (elements.length === 0) {
      return;
    }

    const element = elements[0];

    // 200 is the height of the menu
    const top = element.getBoundingClientRect().top - 200;
    const container = document.getElementById('activity-sidebar-container');

    if (!container) {
      return;
    }

    container.scrollTo({
      top,
      behavior: 'smooth',
    });

    analytics.track(SEASONAL_LAUNCH_TOUR_FEATURE_SHOWN, {
      feature: tourStep.step,
    });

    incrementMetric('seasonal.launch.tour.feature.shown', {
      feature: tourStep.step,
    });
  };

  const handleNextStep = () => {
    if (step <= tourSteps.length - 1) {
      const newStepIndex = step + 1;
      const newStep = tourSteps[newStepIndex];

      syncWorkflowsModalWithTour(newStep, newStepIndex);

      setStep(newStepIndex);
      scrollToFeature(tourSteps[newStepIndex]);
    }
  };

  return (
    <>
      {isActive && (
        <>
          <BackgroundWrapper />
          <TourMenu
            step={step}
            tourSteps={tourSteps}
            handleNextStep={handleNextStep}
            handleCloseTour={handleCloseTour}
            setShouldShowTour={setShouldShowTour}
          />
        </>
      )}
      <SeasonalLaunchSharePageTourContext.Provider value={contextValue}>
        {children}
      </SeasonalLaunchSharePageTourContext.Provider>
    </>
  );
};

export const useSeasonalLaunchSharePageTourContext =
  function (): SeasonalLaunchSharePageTourContextType {
    const context = useContext(SeasonalLaunchSharePageTourContext);

    if (!context) {
      throw new Error(
        'useSeasonalLaunchSharePageTourContext must be used within a SeasonalLaunchSharePageTourContextProvider'
      );
    }

    return context;
  };
