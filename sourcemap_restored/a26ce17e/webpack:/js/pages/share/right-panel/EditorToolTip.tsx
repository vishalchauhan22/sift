import React from 'react';

import { Icon, Tooltip } from '@loomhq/lens';
import { SvgInfo } from '@loomhq/lens/icons/info';
import { useVideoContext } from '@js/common/video-player';
import { TAB_LIST, TabTypes } from '@js/pages/share/common';

export const EditorToolTip = ({
  tabName,
}: {
  tabName: TabTypes;
}): JSX.Element | null => {
  const {
    video: {
      commentsEnabled,
      currentUserCanEdit,
      showAnalytics: shouldShowInsightsToViewer,
      showTranscriptToViewer: transcriptsEnabled,
    },
  } = useVideoContext();

  let showToolTip = false;

  if (currentUserCanEdit) {
    switch (tabName) {
      case TAB_LIST.Edit:
        showToolTip = false;
        break;
      case TAB_LIST.Activity:
        showToolTip = !commentsEnabled;
        break;
      case TAB_LIST.Transcript:
        showToolTip = !transcriptsEnabled;
        break;
      case TAB_LIST.Views:
        showToolTip = !shouldShowInsightsToViewer;
        break;
      default:
        break;
    }
  }

  if (!showToolTip) {
    return null;
  }

  return (
    <Tooltip
      maxWidth="220px"
      triggerOffset={8}
      content="This tab is only visible to editors. To share with viewers update your video settings."
      placement="bottomCenter"
    >
      <Icon
        className="tab-tooltip-icon"
        altText="Information"
        color="bodyDimmed"
        size="1rem"
        icon={<SvgInfo />}
      />
    </Tooltip>
  );
};
