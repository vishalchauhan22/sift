/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';
import classnames from 'classnames';

import { Arrange, Icon, Spacer, Switch, Text, Loader } from '@loomhq/lens';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';

import {
  useCaptionsLanguageSelector,
  useCaptionsSelector,
  usePlaybackRate,
  useQualitySelector,
  useShowCollapsedSettings,
  useToggleCaptions,
} from '../../../hooks';

import styles from './styles.module.css';
import { SettingsPopoversContent } from './types';
import { WithHotKey } from '../player-button/player-button-tooltip';
import { setLocalStorageKey } from '@js/utilities/localStorage';
import { SHOW_CAPTIONS } from '@js/constants/localStorage';
import { hotKeys } from '@js/common/video-player/hotkeys';
import { useIsVideoEmbedded } from '@js/components/video-player-fresh/hooks';
import { useTranscript } from '@js/common/transcripts/useTranscript';

import { useHasAccessToTranslatedCaptions } from './useHasAccessToTranslatedCaptions';

type SettingsDirectoryRootMenuProps = {
  onSettingMenuClick: (menuContent: SettingsPopoversContent) => void;
  videoId: string;
};

const MIN_WIDTH = '240px';

export const SettingsDirectoryRootMenu: React.FC<
  React.PropsWithChildren<SettingsDirectoryRootMenuProps>
> = ({ onSettingMenuClick, videoId }) => {
  const { onToggle, captionsActive } = useToggleCaptions(videoId);
  const { rate } = usePlaybackRate(videoId);
  const { currentQualityId, availableQualities, shouldDisplayQualitySelector } =
    useQualitySelector(videoId);

  const isEmbedPlayer = useIsVideoEmbedded();

  const {
    currentCaptionsStyle,
    availableStyles,
    shouldDisplayCaptionsSelector,
  } = useCaptionsSelector();

  const { captionsUrl, isCaptionsTranslationInProgress } = useTranscript();

  const { availableLanguages, originalLanguageKey, captionsLanguageSelection } =
    useCaptionsLanguageSelector();

  const { showCollapsedSettings } = useShowCollapsedSettings(videoId);

  const handleOnPlaybackSpeedButtonClick = React.useCallback(() => {
    onSettingMenuClick(SettingsPopoversContent.speedSelector);
  }, [onSettingMenuClick]);

  const handleOnQualityButtonClick = React.useCallback(() => {
    onSettingMenuClick(SettingsPopoversContent.qualitySelector);
  }, [onSettingMenuClick]);

  const handleOnClosedCaptionsButtonClick = React.useCallback(() => {
    onSettingMenuClick(SettingsPopoversContent.closedCaptionsSelector);
  }, [onSettingMenuClick]);

  const handleOnClosedCaptionsLanguageSelectionClick = React.useCallback(() => {
    if (isCaptionsTranslationInProgress) {
      return;
    }
    onSettingMenuClick(SettingsPopoversContent.closedCaptionsLanguageSelector);
  }, [isCaptionsTranslationInProgress, onSettingMenuClick]);

  const hasAccessToTranslateCaptions = useHasAccessToTranslatedCaptions();

  const shouldDisplayClosedCaptionsToggle = Boolean(
    isCaptionsTranslationInProgress || captionsUrl
  );

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

  const captionsLanguageDisplayLabel = () => {
    if (
      captionsLanguageSelection === '' ||
      captionsLanguageSelection === originalLanguageKey
    ) {
      return 'Default';
    }

    return availableLanguages.find(language => {
      return language.id === captionsLanguageSelection;
    })?.label;
  };

  const playBackSpeedSelector = () => {
    return (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */
      <div
        className={classnames(
          styles.clickableSettingsMenuButton,
          styles.clickableSettingsMenuButtonHoverState
        )}
        onClick={handleOnPlaybackSpeedButtonClick}
      >
        <Arrange
          gap="medium"
          autoFlow="column"
          justifyContent="space-between"
          minWidth={MIN_WIDTH}
        >
          <WithHotKey label="Playback Speed" shortcut={hotKeys.speed.label} />
          <Arrange autoFlow="column">
            <Text size="body-sm" fontWeight="bold">
              {rate}×
            </Text>
            <Icon icon={<SvgChevronRight />} color="white" />
          </Arrange>
        </Arrange>
      </div>
    );
  };
  const closedCaptionsSelector = () => {
    return (
      <div
        className={classnames(
          styles.clickableSettingsMenuButton,
          styles.clickableSettingsMenuButtonHoverState
        )}
      >
        <Arrange
          gap="medium"
          justifyContent="space-between"
          minWidth={MIN_WIDTH}
        >
          <Text fontWeight="bold">
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
    );
  };
  const qualitySelector = () => {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
      <div
        className={classnames(
          styles.clickableSettingsMenuButton,
          styles.clickableSettingsMenuButtonHoverState
        )}
        onClick={handleOnQualityButtonClick}
      >
        <Arrange
          gap="medium"
          autoFlow="column"
          justifyContent="space-between"
          minWidth={MIN_WIDTH}
        >
          <Text size="body-sm" fontWeight="bold" color="grey4">
            Quality
          </Text>
          <Arrange autoFlow="column">
            <Text size="body-sm" fontWeight="bold">
              <label htmlFor="closedCaptions">{displayLabel()}</label>
            </Text>
            <Icon icon={<SvgChevronRight />} color="white" />
          </Arrange>
        </Arrange>
      </div>
    );
  };
  const captionLanguageSelector = () => {
    return (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */
      <div
        className={classnames(styles.clickableSettingsMenuButton, {
          [styles.clickableSettingsMenuButtonHoverState]:
            !isCaptionsTranslationInProgress,
        })}
        onClick={handleOnClosedCaptionsLanguageSelectionClick}
      >
        <Arrange
          gap="medium"
          autoFlow="column"
          justifyContent="space-between"
          minWidth={MIN_WIDTH}
        >
          <Text size="body-sm" fontWeight="bold" color="grey4">
            Caption Language
          </Text>
          <Arrange autoFlow="column">
            <Text size="body-sm" fontWeight="bold">
              <label htmlFor="closedCaptions">
                {captionsLanguageDisplayLabel()}
              </label>
            </Text>
            {isCaptionsTranslationInProgress ? (
              <Spacer left="small">
                <Loader size="small" color="body" />
              </Spacer>
            ) : (
              <Icon icon={<SvgChevronRight />} color="white" />
            )}
          </Arrange>
        </Arrange>
      </div>
    );
  };
  const captionStyleSelector = () => {
    return (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */
      <div
        className={classnames(
          styles.clickableSettingsMenuButton,
          styles.clickableSettingsMenuButtonHoverState
        )}
        onClick={handleOnClosedCaptionsButtonClick}
      >
        <Arrange
          gap="medium"
          autoFlow="column"
          justifyContent="space-between"
          minWidth={MIN_WIDTH}
        >
          <Text size="body-sm" fontWeight="bold" color="grey4">
            Caption Style
          </Text>
          <Arrange autoFlow="column">
            <Text size="body-sm" fontWeight="bold">
              <label htmlFor="captionStyle">{captionsDisplayLabel()}</label>
            </Text>
            <Icon icon={<SvgChevronRight />} color="white" />
          </Arrange>
        </Arrange>
      </div>
    );
  };

  const menuItems = isEmbedPlayer
    ? [
        {
          show: true,
          render: playBackSpeedSelector,
          key: 'playback-speed',
        },
        {
          show: shouldDisplayClosedCaptionsToggle,
          render: closedCaptionsSelector,
          key: 'closed-captions',
        },
        {
          show: hasAccessToTranslateCaptions,
          render: captionLanguageSelector,
          key: 'caption-language',
        },
        {
          show: shouldDisplayCaptionsSelector,
          render: captionStyleSelector,
          key: 'caption-style',
        },
        {
          show: shouldDisplayQualitySelector,
          render: qualitySelector,
          key: 'quality',
        },
      ]
    : showCollapsedSettings
      ? [
          {
            show: shouldDisplayQualitySelector,
            render: qualitySelector,
            key: 'quality',
          },
          {
            show: hasAccessToTranslateCaptions,
            render: captionLanguageSelector,
            key: 'caption-language',
          },
          {
            show: shouldDisplayCaptionsSelector,
            render: captionStyleSelector,
            key: 'caption-style',
          },
          {
            show: true,
            render: playBackSpeedSelector,
            key: 'playback-speed',
          },
        ]
      : [
          // Note: If you are adding a new menu item here, please ensure that we are also adding it to useSettingsSelector as well
          {
            show: shouldDisplayQualitySelector,
            render: qualitySelector,
            key: 'quality',
          },
          {
            show: hasAccessToTranslateCaptions,
            render: captionLanguageSelector,
            key: 'caption-language',
          },
          {
            show: shouldDisplayCaptionsSelector,
            render: captionStyleSelector,
            key: 'caption-style',
          },
        ];

  return (
    <Arrange autoFlow={'row'} width={'fit-content'}>
      <Text size="body-sm" fontWeight="bold" color="white">
        {'Settings'}
      </Text>
      <Spacer bottom="small" />
      {menuItems
        .filter(item => item.show)
        .map(item => (
          <React.Fragment key={item.key}>{item.render()}</React.Fragment>
        ))}
    </Arrange>
  );
};
