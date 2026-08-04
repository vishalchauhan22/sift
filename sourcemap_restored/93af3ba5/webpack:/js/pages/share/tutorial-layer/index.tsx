import { EXT_TUTORIAL_CLOSE_TUTORIAL_CLICKED } from '@js/constants/events';

import { SHOW_EXTENSION_TUTORIAL_OVERLAY } from '@js/constants/localStorage';

import React, { useEffect, useState } from 'react';

import useLocalStorageState from 'use-local-storage-state';

import { Button, Container } from '@loomhq/lens';
import { RecordButton } from '@js/components/record-button';
import { CHROME_EXTENSION } from '@js/components/record-button/constants';

import * as analytics from '@js/utilities/analytics';

import { TutorialCard } from './card';
import {
  EXT_TUTORIAL_COMPLETE_RECORD_CLICKED,
  WebappTutorialSteps,
} from './common/constants';

export const TutorialLayer = (): React.ReactElement | null => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [showTutorialOverlay, setShowTutorialOverlay] = useLocalStorageState(
    SHOW_EXTENSION_TUTORIAL_OVERLAY
  );

  const closeTutorial = (): void => {
    setShowTutorial(false);
    setShowTutorialOverlay(false);
  };

  let heading = '';
  let subheading = '';
  let cta;
  let tutorialStep: undefined | WebappTutorialSteps;

  if (showTutorialOverlay) {
    heading = 'Copy the link to share';
    subheading =
      'Fun fact—when you finish the recording, the link is auto-copied.';
    tutorialStep = WebappTutorialSteps.copyAndShare;
  } else {
    heading = 'Hey there, new Loom pro 🤩';
    subheading = 'First Loom, done. You’re now ready to make your own.';
    cta = (
      <RecordButton
        source={EXT_TUTORIAL_COMPLETE_RECORD_CLICKED}
        priorityList={[CHROME_EXTENSION]}
      >
        <Button onClick={closeTutorial}>Record another Loom video</Button>
      </RecordButton>
    );

    // Prevents sending tracking for both recordAnotherLoom and
    // copyAndShare events when share page initially renders
    // after recording a Loom during tutorial
    tutorialStep =
      showTutorialOverlay === false
        ? WebappTutorialSteps.recordAnotherLoom
        : undefined;
  }

  useEffect(() => {
    setShowTutorialOverlay(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showTutorial) {
    return (
      <>
        {showTutorialOverlay ? (
          <Container
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            left={0}
            backgroundColor="rgba(75, 66, 173, .8)"
            zIndex={2}
          />
        ) : null}
        <TutorialCard
          heading={heading}
          subheading={subheading}
          cta={cta}
          closeTutorial={() => {
            analytics.track(EXT_TUTORIAL_CLOSE_TUTORIAL_CLICKED, {
              tutorialStep,
            });

            closeTutorial();
          }}
          tutorialStep={tutorialStep}
          tutorialComplete={showTutorialOverlay ? false : true}
        />
      </>
    );
  }

  return null;
};
