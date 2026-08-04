// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports

import React from 'react';

import { usePlaybackRate, useShowCollapsedSettings } from '../hooks';

import { SettingPill } from './setting-pill';
import styles from './styles.module.css';
import { SettingDirectoryPill } from './setting-directory-pill';
import { Arrange } from '@loomhq/lens';
import classNames from 'classnames';

const SelectorLayout = ({
  children,
  videoId,
  rolloutTranslateCaptions,
}: {
  children: React.ReactNode;
  videoId: string;
  rolloutTranslateCaptions?: boolean;
}): JSX.Element => {
  const { showCollapsedSettings, showSmallheightSettings } =
    useShowCollapsedSettings(videoId);
  const isSmallScreen = showCollapsedSettings || showSmallheightSettings;

  if (rolloutTranslateCaptions) {
    return (
      <div
        className={
          isSmallScreen
            ? classNames(styles.scrollableMenuSmallScreen, {
                [styles.scrollableElementPlaybackSpeedSmallScreen]: true,
              })
            : styles.scrollableMenu
        }
      >
        {children}
      </div>
    );
  }

  return (
    <div className={styles.selectorWrapper}>
      <Arrange
        gap={rolloutTranslateCaptions ? 'xsmall' : 'small'}
        justifyContent="space-between"
        autoFlow={rolloutTranslateCaptions ? 'row' : 'column'}
      >
        {children}
      </Arrange>
    </div>
  );
};

export const SpeedSelector = ({
  videoId,
  rolloutTranslateCaptions,
  returnToMenu,
}: {
  videoId: string;
  rolloutTranslateCaptions?: boolean;
  returnToMenu?: () => void;
}): JSX.Element => {
  const { rates, rate, onChange } = usePlaybackRate(videoId);
  const { showCollapsedSettings, showSmallheightSettings } =
    useShowCollapsedSettings(videoId);
  const Pill = rolloutTranslateCaptions ? SettingDirectoryPill : SettingPill;
  const isSmallScreen = showCollapsedSettings || showSmallheightSettings;

  return (
    <SelectorLayout
      rolloutTranslateCaptions={rolloutTranslateCaptions}
      videoId={videoId}
    >
      {rates.map((speedValue, index) => (
        <Pill
          isActive={rate === speedValue}
          isSpeedMenu={true}
          isSmallScreen={isSmallScreen}
          onClick={() => {
            onChange(speedValue);

            if (returnToMenu) {
              returnToMenu();
            }
          }}
          key={index}
        >
          {speedValue}×
        </Pill>
      ))}
    </SelectorLayout>
  );
};
