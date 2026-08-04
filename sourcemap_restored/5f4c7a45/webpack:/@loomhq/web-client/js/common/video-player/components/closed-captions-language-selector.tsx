import { SHOW_CAPTIONS } from '@js/constants/localStorage';

import React from 'react';

import { setLocalStorageKey } from '@js/utilities/localStorage';

import {
  useCaptionsLanguageSelector,
  useShowCollapsedSettings,
  useToggleCaptions,
} from '../hooks';
import styles from './styles.module.css';
import { SettingDirectoryPill } from './setting-directory-pill';

type ClosedCaptionsSelectorProps = {
  videoId: string;
  returnToMenu: () => void;
};

export const ClosedCaptionsLanguageSelector: React.FC<
  React.PropsWithChildren<ClosedCaptionsSelectorProps>
> = ({ videoId, returnToMenu }) => {
  const {
    organisedLanguageList,
    captionsLanguageSelection,
    handleCaptionsLanguageChange,
  } = useCaptionsLanguageSelector();
  const { onToggle, captionsActive } = useToggleCaptions(videoId);

  const { showCollapsedSettings, showSmallheightSettings } =
    useShowCollapsedSettings(videoId);

  return (
    <div
      className={
        showCollapsedSettings || showSmallheightSettings
          ? styles.scrollableMenuSmallScreen
          : styles.scrollableMenu
      }
    >
      {organisedLanguageList.map((language, index) => (
        <SettingDirectoryPill
          isActive={captionsLanguageSelection === language.id}
          onClick={() => {
            if (!captionsActive) {
              onToggle();
              setLocalStorageKey(SHOW_CAPTIONS, true);
            }

            handleCaptionsLanguageChange(language.id);
            returnToMenu();
          }}
          key={index}
        >
          {language.label}
        </SettingDirectoryPill>
      ))}
    </div>
  );
};
