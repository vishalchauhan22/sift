import React, { useState } from 'react';

import { Tooltip } from '@loomhq/lens';

import {
  FTUX_TOOLTIP_RENDERED,
  ALL_HANDS_SPACE,
  FTUX_TOOLTIP_DISMISSED,
} from '@js/constants/events';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import * as analytics from '@js/utilities/analytics';

function PrimarySpaceTooltip({
  children,
  isDisabled,
}: {
  isDisabled: boolean;
  children: JSX.Element;
}): JSX.Element {
  const { name: workspaceName } = useGetSelectedWorkspace();
  const [isRendered, setIsRendered] = useState(false);
  const trackAnalytics = (event: string) => {
    analytics.track(event, {
      source: ALL_HANDS_SPACE,
    });
    setIsRendered(!isRendered);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseEnter={() => trackAnalytics(FTUX_TOOLTIP_RENDERED)}
      onMouseLeave={() => trackAnalytics(FTUX_TOOLTIP_DISMISSED)}
    >
      <Tooltip
        tabIndex={-1}
        content={`The videos in this Space are visible to everyone at ${workspaceName}. Previously posted videos have also been moved here.`}
        isInline={false}
        placement="rightCenter"
        isDisabled={isDisabled}
      >
        {children}
      </Tooltip>
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default PrimarySpaceTooltip;
