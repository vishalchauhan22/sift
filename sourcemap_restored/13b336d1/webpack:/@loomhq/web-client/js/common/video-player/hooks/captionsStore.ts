import { LANGUAGES, LANGUAGE_NAME, Language } from '@loomhq/shared-utilities';

import create from 'zustand';
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

import * as analytics from '@js/utilities/analytics';
import { VIDEO_QUALITY_CONTROL_CLOSED_CAPTIONS } from '@js/constants/events';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

export const VIEWER_CAPTIONS_STYLE = 'viewerCaptionsStyle';
export const STYLIZED_CAPTIONS = 'stylizedCaptions';
export const DEFAULT_CAPTIONS = 'defaultCaptions';

export type CaptionsStyle =
  | typeof STYLIZED_CAPTIONS
  | typeof DEFAULT_CAPTIONS
  | null;

type CaptionsStore = {
  captionsLanguageSelection: string;
  hasCaptionsLanguageChanged: boolean;
  setHasCaptionsLanguageChanged: (hasCaptionsLanguageChanged: boolean) => void;
  setCaptionsLanguageSelection: (captionsLanguageSelection: string) => void;
  captionsStyleSelection: CaptionsStyle;
  setCaptionsStyleSelection: (style: CaptionsStyle, videoId: string) => void;
};

export type availableLanguagesReturnType = {
  id: Language;
  label: string;
}[];

export const getAvailableLanguages = (): availableLanguagesReturnType => {
  return LANGUAGES.map(langCode => ({
    id: langCode,
    label: LANGUAGE_NAME[langCode] || langCode,
  }))
    .filter(lang => lang.label !== lang.id)
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const isLanguageValid = (language: string): boolean => {
  const availableLanguages = getAvailableLanguages();
  const validLanguageIds = new Set(availableLanguages.map(lang => lang.id));

  return validLanguageIds.has(language as Language);
};

const useGetInitialCaptionsStyleSelection = (): CaptionsStyle => {
  const storedStyle = getLocalStorageKey(VIEWER_CAPTIONS_STYLE);
  const validCaptionsStyle =
    storedStyle === STYLIZED_CAPTIONS || storedStyle === DEFAULT_CAPTIONS
      ? storedStyle
      : null;
  return validCaptionsStyle;
};

export const captionsStore = create<CaptionsStore>(set => ({
  hasCaptionsLanguageChanged: false,
  captionsLanguageSelection: '',
  captionsStyleSelection: useGetInitialCaptionsStyleSelection(),
  setCaptionsLanguageSelection: (captionsLanguageSelection: string) => {
    return set(state => {
      if (state.captionsLanguageSelection !== captionsLanguageSelection) {
        return {
          captionsLanguageSelection,
          hasCaptionsLanguageChanged: true,
        };
      }

      return {
        captionsLanguageSelection,
        hasCaptionsLanguageChanged: false,
      };
    });
  },
  setHasCaptionsLanguageChanged: (hasCaptionsLanguageChanged: boolean) =>
    set({ hasCaptionsLanguageChanged }),
  setCaptionsStyleSelection: (style: CaptionsStyle, videoId: string) => {
    return set(state => {
      setLocalStorageKey(VIEWER_CAPTIONS_STYLE, style);

      const validCaptionsStyle =
        style === STYLIZED_CAPTIONS || style === DEFAULT_CAPTIONS;

      if (!validCaptionsStyle || state.captionsStyleSelection === style) {
        return state;
      }

      analytics.track(VIDEO_QUALITY_CONTROL_CLOSED_CAPTIONS, {
        type: style,
        ...withIdentifiers(
          VIDEO_QUALITY_CONTROL_CLOSED_CAPTIONS,
          AnalyticsEntityId.video(videoId, 'video_id')
        ),
      });

      return { captionsStyleSelection: style };
    });
  },
}));
