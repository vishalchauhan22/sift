import { SHOW_CAPTIONS } from '@js/constants/localStorage';

import React from 'react';

import { setLocalStorageKey } from '@js/utilities/localStorage';

import {
  getActiveLanguageName,
  useCaptionsLanguageSelector,
  useShowCollapsedSettings,
  useToggleCaptions,
} from '../hooks';
import styles from './styles.module.css';
import { SettingDirectoryPill } from './setting-directory-pill';
import * as analytics from '@js/utilities/analytics';
import { EDIT_CLICK_CAPTION_LANGUAGE } from '@js/constants/events';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { useTranscript } from '@js/common/transcripts';
import { useVideoContext } from '../context';

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

  const { isCaptionsInOriginalLanguage, version } = useTranscript();

  const {
    video: {
      isOwner,
      owner: { id: ownerId },
    },
  } = useVideoContext();

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

            analytics.track(EDIT_CLICK_CAPTION_LANGUAGE, {
              is_Default_Language: isCaptionsInOriginalLanguage,
              language: getActiveLanguageName(language.id),
              version,
              isCurrentUserOwner: isOwner,
              ...withIdentifiers(
                EDIT_CLICK_CAPTION_LANGUAGE,
                AnalyticsEntityId.user(ownerId, 'creator_id')
              ),
            });

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
