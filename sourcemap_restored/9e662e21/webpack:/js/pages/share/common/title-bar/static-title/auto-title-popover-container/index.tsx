import React from 'react';

import {
  useOpenRightPanelAndSwitchToTab,
  TAB_LIST,
} from '@js/pages/share/common';
import { useDefaultSettings } from '@js/pages/share/common/settings/useDefaultSettingsStore';
import { AutoContextPopover } from '@js/pages/share/common/auto-context-popover';

type AutoTitlePopoverContainerProps = {
  isOpen: boolean;
};

export const AutoTitlePopoverContainer = ({
  isOpen,
}: AutoTitlePopoverContainerProps): JSX.Element => {
  const { setShowDefaultSettings } = useDefaultSettings();
  const openRightPanelAndSwitchToTab = useOpenRightPanelAndSwitchToTab();
  const triggerDefaultSettingsModal = () => {
    openRightPanelAndSwitchToTab(TAB_LIST.Edit);
    setShowDefaultSettings(true);
  };

  return (
    <AutoContextPopover
      isOpen={isOpen}
      onPrimaryClick={triggerDefaultSettingsModal}
      title="Your video title, instantly created"
      subtitle="Loom AI automatically generated a title based on your video's content."
      placement="bottomLeft"
    />
  );
};
