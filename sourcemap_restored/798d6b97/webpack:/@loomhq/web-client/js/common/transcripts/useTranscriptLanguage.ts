import { isTranscriptLanguageEnglish } from '@loomhq/shared-utilities/utilities/transcriptionUtils';

import { useTranscript } from './useTranscript';
import { Language } from '@loomhq/shared-utilities/types/transcription';

export const useTranscriptLanguage = (): {
  language: Language | null;
  isEnglish: boolean;
} => {
  const { language } = useTranscript();

  return {
    language,
    isEnglish: isTranscriptLanguageEnglish(language),
  };
};
