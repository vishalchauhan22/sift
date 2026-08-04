import { EXT_TUTORIAL_STEP_VIEWED } from '@js/constants/events';

import React, { useEffect } from 'react';

import { Arrange, Container, Spacer, Text, TextButton } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import { TutorialProgressBar } from './progress-bar';
import styles from './styles.module.css';

import type { WebappTutorialSteps } from '../common/constants';

export const TutorialCard = ({
  heading,
  subheading,
  cta,
  closeTutorial,
  tutorialStep,
  tutorialComplete,
}: {
  heading: string;
  subheading: string;
  cta: React.ReactElement;
  closeTutorial?: () => void;
  tutorialStep: undefined | WebappTutorialSteps;
  tutorialComplete: boolean;
}): React.ReactElement => {
  useEffect(() => {
    if (tutorialStep !== undefined) {
      analytics.track(EXT_TUTORIAL_STEP_VIEWED, { tutorialStep });
    }
  }, [tutorialStep]);

  return (
    <div className={styles.tutorialWrapper}>
      {tutorialComplete && (
        <>
          <span className={styles.purpleBlur} />
          <span className={styles.pinkBlur} />
          <span className={styles.orangeBlur} />
        </>
      )}
      <Container
        data-lens-theme="dark"
        width="38.25rem"
        height="18.625rem"
        padding={7}
      >
        <TutorialProgressBar tutorialComplete={tutorialComplete} />
        <Container position="relative" zIndex={2}>
          <Spacer y="large">
            <Text fontWeight="bold" size="heading-md" color="body">
              {heading}
            </Text>
          </Spacer>
          <Text size="body-lg" color="body">
            {subheading}
          </Text>
          <Spacer top="xlarge" />
          <Arrange gap="xlarge">
            {cta && (
              <Container
                backgroundColor="white"
                radius="full"
                data-lens-theme="light"
              >
                {cta}
              </Container>
            )}
            {closeTutorial && (
              <TextButton onClick={closeTutorial} offsetSide="left">
                Close tutorial
              </TextButton>
            )}
          </Arrange>
        </Container>
      </Container>
    </div>
  );
};
