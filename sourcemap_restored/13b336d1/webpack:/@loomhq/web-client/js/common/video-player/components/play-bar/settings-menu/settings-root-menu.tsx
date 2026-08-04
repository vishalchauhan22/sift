/* eslint-disable @loomhq/loom/limit-parent-import-depth */
import { SHOW_CAPTIONS } from '@js/constants/localStorage';

import React from 'react';

import { Arrange, Icon, Switch, Text } from '@loomhq/lens';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';

import { setLocalStorageKey } from '@js/utilities/localStorage';

import {
  useCaptionsSelector,
  usePlaybackRate,
  useQualitySelector,
  useToggleCaptions,
} from '../../../hooks';
import { hotKeys } from '../../../hotkeys';

import { WithHotKey } from '../player-button/player-button-tooltip';
import styles from './styles.module.css';
import { SettingsPopoversContent } from './types';

type SettingsRootMenuProps = {
  onSettingMenuClick: (menuContent: SettingsPopoversContent) => void;
  videoId: string;
};

export const SettingsRootMenu: React.FC<
  React.PropsWithChildren<SettingsRootMenuProps>
> = ({ onSettingMenuClick, videoId }) => {
  const { onToggle, captionsActive } = useToggleCaptions(videoId);
  const { rate } = usePlaybackRate(videoId);
  const { currentQualityId, availableQualities, shouldDisplayQualitySelector } =
    useQualitySelector(videoId);

  const {
    shouldDisplayCaptionsSelector,
    currentCaptionsStyle,
    availableStyles,
  } = useCaptionsSelector();

  const handleOnPlaybackSpeedButtonClick = React.useCallback(() => {
    onSettingMenuClick(SettingsPopoversContent.speedSelector);
  }, [onSettingMenuClick]);

  const handleOnQualityButtonClick = React.useCallback(() => {
    onSettingMenuClick(SettingsPopoversContent.qualitySelector);
  }, [onSettingMenuClick]);

  const handleOnClosedCaptionsButtonClick = React.useCallback(() => {
    onSettingMenuClick(SettingsPopoversContent.closedCaptionsSelector);
  }, [onSettingMenuClick]);

  const displayLabel = () => {
    return availableQualities.find(quality => {
      return quality.id === currentQualityId;
    })?.label;
  };

  const captionsDisplayLabel = () => {
    if (!captionsActive) {
      return 'Off';
    }
    return availableStyles.find(style => {
      return style.id === currentCaptionsStyle;
    })?.label;
  };

  return (
    <Arrange autoFlow={'row'} width={'fit-content'}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
      <div
        className={styles.clickableSettingsMenuButton}
        onClick={handleOnPlaybackSpeedButtonClick}
      >
        <Arrange gap="medium" autoFlow="column" justifyContent="space-between">
          <Text fontWeight="bold">
            <WithHotKey label="Playback Speed" shortcut={hotKeys.speed.label} />
          </Text>
          <Arrange autoFlow="column">
            <Text size="body-sm" fontWeight="bold">
              {rate}×
            </Text>
            <Icon icon={<SvgChevronRight />} />
          </Arrange>
        </Arrange>
      </div>
      {shouldDisplayCaptionsSelector ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
        <div
          className={styles.clickableSettingsMenuButton}
          onClick={handleOnClosedCaptionsButtonClick}
        >
          <Arrange
            gap="medium"
            autoFlow="column"
            justifyContent="space-between"
          >
            <Text fontWeight="bold">
              <WithHotKey
                label="Closed Captions"
                shortcut={hotKeys.closeCaptions.label}
              />
            </Text>
            <Arrange autoFlow="column">
              <Text size="body-sm" fontWeight="bold">
                {captionsDisplayLabel()}
              </Text>
              <Icon icon={<SvgChevronRight />} />
            </Arrange>
          </Arrange>
        </div>
      ) : (
        <div className={styles.settingsMenuItemWrapper}>
          <Arrange gap="medium" justifyContent="space-between">
            <Text fontWeight="bold">
              {/* eslint-disable-next-line */}
              <label htmlFor="closedCaptions">
                <WithHotKey
                  label="Closed Captions"
                  shortcut={hotKeys.closeCaptions.label}
                />
              </label>
            </Text>
            <Switch
              id="closedCaptions"
              isActive={captionsActive}
              onChange={() => {
                onToggle();
                setLocalStorageKey(SHOW_CAPTIONS, !captionsActive);
              }}
            />
          </Arrange>
        </div>
      )}

      {shouldDisplayQualitySelector && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
        <div
          className={styles.clickableSettingsMenuButton}
          onClick={handleOnQualityButtonClick}
        >
          <Arrange
            gap="medium"
            autoFlow="column"
            justifyContent="space-between"
          >
            <Text size="body-sm" fontWeight="bold">
              Quality
            </Text>
            <Arrange autoFlow="column">
              <Text size="body-sm" fontWeight="bold">
                {displayLabel()}
              </Text>
              <Icon icon={<SvgChevronRight />} />
            </Arrange>
          </Arrange>
        </div>
      )}
    </Arrange>
  );
};
