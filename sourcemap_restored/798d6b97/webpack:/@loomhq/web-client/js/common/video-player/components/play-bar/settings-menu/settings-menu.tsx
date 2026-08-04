/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { SvgSettings } from '@loomhq/lens/icons/settings';

import { usePopoverHandler } from '../../../hooks';

import { PlayerButton } from '../player-button';
import { SettingsPopover } from '../settings-popover';
import { SettingsClosedCaptionsMenu } from './settings-closed-captions-menu';
import { SettingsPlaybackSpeedMenu } from './settings-playback-speed-menu';
import { SettingsQualityMenu } from './settings-quality-menu';
import { SettingsRootMenu } from './settings-root-menu';
import { SettingsPopoversContent } from './types';
import { SettingsDirectoryRootMenu } from './settings-directory-root-menu';
import { SettingsClosedCaptionsLanguageMenu } from './settings-closed-captions-language-menu';

import { useHasAccessToTranslatedCaptions } from './useHasAccessToTranslatedCaptions';

export const SettingsMenu = ({
  videoId,
  rolloutTranslateCaptions,
}: {
  videoId: string;
  rolloutTranslateCaptions: boolean;
}): JSX.Element => {
  const [contentToDisplay, setContentToDisplay] =
    React.useState<SettingsPopoversContent>(SettingsPopoversContent.root);
  const [settingsIsOpen, setSettingsIsOpen, settingsBtnRef] = usePopoverHandler(
    () => setContentToDisplay(SettingsPopoversContent.root)
  );

  const hasAccessToTranslateCaptions = useHasAccessToTranslatedCaptions();

  const handleOnSettingMenuClick = React.useCallback(
    (newContentType: SettingsPopoversContent): void => {
      setContentToDisplay(newContentType);
    },
    [setContentToDisplay]
  );

  const SettingsMenuContent = React.useMemo(() => {
    if (
      rolloutTranslateCaptions &&
      contentToDisplay === SettingsPopoversContent.root
    ) {
      return (
        <SettingsDirectoryRootMenu
          onSettingMenuClick={handleOnSettingMenuClick}
          videoId={videoId}
        />
      );
    }

    if (
      !rolloutTranslateCaptions &&
      contentToDisplay === SettingsPopoversContent.root
    ) {
      return (
        <SettingsRootMenu
          onSettingMenuClick={handleOnSettingMenuClick}
          videoId={videoId}
        />
      );
    }

    if (contentToDisplay === SettingsPopoversContent.speedSelector) {
      return (
        <SettingsPlaybackSpeedMenu
          onBackButtonClick={handleOnSettingMenuClick}
          videoId={videoId}
          rolloutTranslateCaptions={rolloutTranslateCaptions}
        />
      );
    }
    if (contentToDisplay === SettingsPopoversContent.qualitySelector) {
      return (
        <SettingsQualityMenu
          onBackButtonClick={handleOnSettingMenuClick}
          videoId={videoId}
          rolloutTranslateCaptions={rolloutTranslateCaptions}
        />
      );
    }

    if (contentToDisplay === SettingsPopoversContent.closedCaptionsSelector) {
      return (
        <SettingsClosedCaptionsMenu
          onBackButtonClick={handleOnSettingMenuClick}
          videoId={videoId}
          rolloutTranslateCaptions={rolloutTranslateCaptions}
        />
      );
    }

    if (
      hasAccessToTranslateCaptions &&
      contentToDisplay ===
        SettingsPopoversContent.closedCaptionsLanguageSelector
    ) {
      return (
        <SettingsClosedCaptionsLanguageMenu
          onBackButtonClick={handleOnSettingMenuClick}
          videoId={videoId}
        />
      );
    }
  }, [
    contentToDisplay,
    handleOnSettingMenuClick,
    videoId,
    rolloutTranslateCaptions,
    hasAccessToTranslateCaptions,
  ]);

  return (
    <div ref={settingsBtnRef}>
      <SettingsPopover
        paddingTop="small"
        paddingBottom="small"
        isOpen={settingsIsOpen}
        content={SettingsMenuContent}
      >
        <PlayerButton
          label={settingsIsOpen ? '' : 'Settings'}
          icon={<SvgSettings />}
          onClick={() => setSettingsIsOpen(!settingsIsOpen)}
        />
      </SettingsPopover>
    </div>
  );
};
