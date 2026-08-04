import React from 'react';

import { Arrange, Icon } from '@loomhq/lens';

import { WithHotKey } from '../player-button/player-button-tooltip';
import { SubMenuBackButton } from './sub-menu-back-button';
import { SettingsPopoversContent, SettingsMenuProps } from './types';
import { SvgChevronLeft } from '@loomhq/lens/icons/chevron-left';
import { ClosedCaptionsLanguageSelector } from '../../closed-captions-language-selector';

export const SettingsClosedCaptionsLanguageMenu: React.FC<
  React.PropsWithChildren<SettingsMenuProps>
> = ({ onBackButtonClick, videoId }) => {
  const handleOnBackButtonClick = React.useCallback(() => {
    onBackButtonClick(SettingsPopoversContent.root);
  }, [onBackButtonClick]);

  return (
    <Arrange autoFlow="row">
      <SubMenuBackButton
        onClick={handleOnBackButtonClick}
        type="button"
        rolloutTranslateCaptions={true}
      >
        <Arrange autoFlow="column" gap="small">
          <Icon icon={<SvgChevronLeft />} color="white" />
          <WithHotKey label="Caption Language" />
        </Arrange>
      </SubMenuBackButton>
      <ClosedCaptionsLanguageSelector
        videoId={videoId}
        returnToMenu={handleOnBackButtonClick}
      />
    </Arrange>
  );
};
