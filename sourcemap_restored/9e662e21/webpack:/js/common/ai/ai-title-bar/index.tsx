import React from 'react';

import { AiLoader } from './AiLoader';
import { AiTypingAnimation } from './AiTypingAnimation';
import { AiLoadingAnimation } from './AiLoadingAnimation';
import { useExpVizCohesionShareTitle } from '@js/hooks/experiments/useExpVizCohesionShareTitle';

/**
 * Handles AI loading and typing animations
 */
export const AutoTitleAnimations = ({
  setIsCompleted,
  autoTitle,
  isAutoTitleGenerated,
  onClick,
}: {
  setIsCompleted: (isCompleted: boolean) => void;
  autoTitle: string;
  isAutoTitleGenerated: boolean;
  onClick: () => void;
}): JSX.Element => {
  const { isExpVizCohesionShareTitle } = useExpVizCohesionShareTitle();

  if (!isAutoTitleGenerated) {
    if (isExpVizCohesionShareTitle) {
      return <AiLoadingAnimation onClick={onClick} />;
    }
    return <AiLoader onClick={onClick} />;
  }

  return (
    <AiTypingAnimation autoTitle={autoTitle} setIsCompleted={setIsCompleted} />
  );
};
