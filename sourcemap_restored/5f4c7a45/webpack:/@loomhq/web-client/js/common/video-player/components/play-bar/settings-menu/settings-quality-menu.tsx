/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { QualitySelector } from '../../quality-selector';
import { WithHotKey } from '../player-button/player-button-tooltip';
import { SubMenuBackButton } from './sub-menu-back-button';
import { SettingsPopoversContent, SettingsMenuProps } from './types';
import { SvgChevronLeft } from '@loomhq/lens/icons/chevron-left';
import { SvgArrowLeft } from '@loomhq/lens/icons/arrow-left';

export const SettingsQualityMenu: React.FC<
  React.PropsWithChildren<SettingsMenuProps>
> = ({ onBackButtonClick, videoId, rolloutTranslateCaptions }) => {
  const handleOnBackButtonClick = React.useCallback(() => {
    onBackButtonClick(SettingsPopoversContent.root);
  }, [onBackButtonClick]);

  return (
    <Arrange gap={rolloutTranslateCaptions ? '0px' : 'medium'} autoFlow="row">
      <SubMenuBackButton onClick={handleOnBackButtonClick} type="button">
        <Arrange autoFlow="column" gap="small">
          <Icon
            icon={
              rolloutTranslateCaptions ? <SvgChevronLeft /> : <SvgArrowLeft />
            }
            color={rolloutTranslateCaptions ? 'white' : undefined}
          />
          {rolloutTranslateCaptions ? (
            <Text size="body-sm" fontWeight="bold">
              {'Quality'}
            </Text>
          ) : (
            <WithHotKey label="Quality" />
          )}
        </Arrange>
      </SubMenuBackButton>
      <QualitySelector
        videoId={videoId}
        rolloutTranslateCaptions={rolloutTranslateCaptions}
        returnToMenu={handleOnBackButtonClick}
      />
    </Arrange>
  );
};
