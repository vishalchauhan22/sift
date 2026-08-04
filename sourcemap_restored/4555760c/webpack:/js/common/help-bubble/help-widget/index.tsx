import React, { Fragment, memo, useEffect, useState } from 'react';

import { CsmWidgetBubble } from './bubble';
import { useCsmJourneyId } from './csm-journey-id';
import { useLoomMenuGroups } from './hooks';
import { CsmWidgetPanel } from './panel';
import { useCannyExtScriptDynamically } from '../help-menu/useCannyExtScriptDynamically';
import { useScreenInLandscapeMode } from '@js/hooks/useScreenInLandscapeMode';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';
import { incrementMetric } from '@js/utilities/metrics';

type CsmWidgetProps = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  rightOffset: number;
};

const LoadCannyExtScriptDynamically = () => {
  useCannyExtScriptDynamically();
  return null;
};

export const CsmWidget = memo(
  ({
    buttonRef,
    expanded,
    setExpanded,
    rightOffset,
  }: CsmWidgetProps): React.ReactNode => {
    const [preload, setPreload] = useState(false);
    const menuGroups = useLoomMenuGroups();
    const csmJourneyId = useCsmJourneyId();
    const isInLandscapeMode = useScreenInLandscapeMode();
    const { isExpMwebCommenting } = useExpMwebCommenting();
    const isLandscapeModeOnExpMwebCommenting =
      isInLandscapeMode && isExpMwebCommenting;

    if (!preload && expanded) {
      setPreload(true);
    }

    useEffect(() => {
      if (preload) {
        incrementMetric('csm.widget.embed.preloading');
      }
    }, [preload, csmJourneyId]);

    return (
      <Fragment>
        <CsmWidgetBubble
          ref={buttonRef}
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          onMouseEnter={() => setPreload(true)}
          onFocus={() => setPreload(true)}
          rightOffset={isLandscapeModeOnExpMwebCommenting ? 64 : rightOffset}
        />
        <CsmWidgetPanel
          expanded={expanded}
          preload={preload}
          onClose={() => setExpanded(false)}
          menuGroups={menuGroups}
          rightOffset={isLandscapeModeOnExpMwebCommenting ? 64 : rightOffset}
        />
        {preload && <LoadCannyExtScriptDynamically />}
      </Fragment>
    );
  }
);

CsmWidget.displayName = 'CsmWidget';
