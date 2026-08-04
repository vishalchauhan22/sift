import { useIsNotOwnerAndCommentsEnabled } from '@js/hooks/comments';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useState } from 'react';

import { useMedia } from '@loomhq/lens';
import {
  ControlType,
  EXPERIMENTS,
  FlagReturnValues,
} from '@loomhq/shared-utilities/constants/statsig';

export function useShouldShowEovCommentOverlay(
  // 🚩 EXP_MWEB_EOVN - added param to allow mobile web display for experiment.
  allowMobileWebDisplay?: boolean
): [showOverlay: boolean, setIsEovCommentsOverlayInvisible: (boolean) => void] {
  const [isEovCommentsOverlayInvisible, setIsEovCommentsOverlayInvisible] =
    useState(false);

  const isNotOwnerAndCommentsEnabled = useIsNotOwnerAndCommentsEnabled();

  const isMobileScreenWidth = useMedia(['(max-width: 767px)'], [true], false);

  // 🚩 EXP_MWEB_EOVN - start
  const isEligibleForExpMwebEovn = useFlagIsActivated({
    activationValues: [FlagReturnValues.VARIANT],
    controlType: ControlType.STATSIG_EXPERIMENT,
    flag: EXPERIMENTS.EXP_MWEB_EOVN,
  });

  const allowMwebDisplay =
    allowMobileWebDisplay && isEligibleForExpMwebEovn
      ? true
      : !isMobileScreenWidth;

  const showOverlay = Boolean(
    !isEovCommentsOverlayInvisible &&
      isNotOwnerAndCommentsEnabled &&
      allowMwebDisplay
  );

  // 🚩 EXP_MWEB_EOVN - end

  return [showOverlay, setIsEovCommentsOverlayInvisible];
}
