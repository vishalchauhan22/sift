import create from 'zustand';

import { DEFAULT_SKIN_TONE, SKIN_TONE_KEY } from './emoji-data';
import { readFromLocalStorage } from './local-storage';

export type SkinToneCtx = {
  skinTone: string;
  setSkinTone: (skinTone: string) => void;
};

export const useSkinTone = create<SkinToneCtx>(set => {
  const skinTone = readFromLocalStorage(SKIN_TONE_KEY, DEFAULT_SKIN_TONE);

  return {
    skinTone,
    setSkinTone: (skinTone: string) => set({ skinTone }),
  };
});
