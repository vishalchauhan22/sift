import { useIsEligibleForAiNudgeDisplay } from '@js/hooks/aiNudges';
import { useState } from 'react';

import { useMedia } from '@loomhq/lens';

export function useShouldShowEovCommentOverlayWithNudges(): [
  showAiEovn: boolean,
  setIsEovCommentsOverlayInvisible: (boolean) => void,
] {
  const [isEovCommentsOverlayInvisible, setIsEovCommentsOverlayInvisible] =
    useState(false);

  const isEligibleForAiNudges = useIsEligibleForAiNudgeDisplay();

  const isMobileScreenWidth = useMedia(['(max-width: 767px)'], [true], false);

  const showOverlay = Boolean(
    !isEovCommentsOverlayInvisible &&
      isEligibleForAiNudges &&
      !isMobileScreenWidth
  );

  return [showOverlay, setIsEovCommentsOverlayInvisible];
}
