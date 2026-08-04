import { REFRESH_VIDEO_COMMENTS_CLICKED } from '@js/constants/events';

import {
  RightPanelContentButton,
  RightPanelIconButton,
} from '@js/components/share-video-fresh/right-panel/right-panel-button';
import { getFormattedDateForHeader } from '@js/pages/share/comments/common/helpers';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import * as analytics from '@js/utilities/analytics';

import { Tooltip } from '@loomhq/lens';
import { SvgRefresh } from '@loomhq/lens/icons/refresh';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

// Wait 1 min before showing button
const TIME_DELAY_BEFORE_SHOWING_BUTTON_IN_MS = 1000 * 60;

type RefreshCommentsButtonProps = {
  refreshCommentsOnClick: () => void;
  isCompact?: boolean;
};

export const RefreshCommentsButton = ({
  refreshCommentsOnClick,
  isCompact = false,
}: RefreshCommentsButtonProps): React.ReactElement => {
  const timeLastUpdated = useRef<number>(Date.now());

  const isRealtimeCommentsEnabled = useFeatureFlagValue(
    FEATURE_GATES.LOOM_REALTIME_COMMENTS,
    ControlType.STATSIG_FEATURE_GATE
  );

  const [lastUpdatedFormatted, setLastUpdatedFormatted] = useState<string>('');
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldShowButton) {
      const timer = setTimeout(() => {
        setShouldShowButton(true);
      }, TIME_DELAY_BEFORE_SHOWING_BUTTON_IN_MS);

      return () => clearTimeout(timer);
    }
  }, [shouldShowButton]);

  const onClick = useCallback(() => {
    refreshCommentsOnClick();
    analytics.track(REFRESH_VIDEO_COMMENTS_CLICKED);

    setShouldShowButton(false);
    timeLastUpdated.current = Date.now();
  }, [refreshCommentsOnClick]);

  const onMouseEnter = useCallback(() => {
    setLastUpdatedFormatted(getFormattedDateForHeader(timeLastUpdated.current));
  }, []);

  return (
    <>
      {shouldShowButton && !isRealtimeCommentsEnabled && (
        <Tooltip content={`Last updated ${lastUpdatedFormatted}`}>
          {isCompact ? (
            <RightPanelIconButton
              onClick={onClick}
              buttonIcon={<SvgRefresh />}
              onMouseEnter={onMouseEnter}
              altText="Refresh comments"
            />
          ) : (
            <RightPanelContentButton
              onClick={onClick}
              buttonIcon={<SvgRefresh />}
              buttonText="Refresh"
              onMouseEnter={onMouseEnter}
              isNewStyle
            />
          )}
        </Tooltip>
      )}
    </>
  );
};
