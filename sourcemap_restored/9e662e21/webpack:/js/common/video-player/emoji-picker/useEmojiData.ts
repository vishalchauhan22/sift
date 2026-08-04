import { useEffect } from 'react';
import create from 'zustand';

import { ReactionType } from '..';
import { loomToExtendedMap } from '../utils';

import type { EmojiType } from './emoji-data';

export type GroupedEmojis = {
  category: string;
  emojis: EmojiType[];
};

interface EmojiUtilData {
  getEmojiUnicodeByName: (
    variant?: string | null,
    needsMap?: boolean
  ) => string;
  groupedEmojis: GroupedEmojis[];
  getEmojiWithSkinTones(): string[];
}

const getEmojiUnicodeByName =
  (getUnicode: (name?: string | null, skinTones?: string[] | null) => string) =>
  (variant?: string | null, needsMap?: boolean) => {
    if (!variant) {
      return '';
    }

    const [shortName, ...skinTones] = variant.split('::');

    let name = shortName;

    if (needsMap) {
      const mappedValue = loomToExtendedMap[shortName as ReactionType];

      if (mappedValue) {
        name = mappedValue;
      }
    }

    return getUnicode(name, skinTones);
  };

export function useEmojiData(): EmojiDataStoreCtx {
  const data = useEmojiDataStore();

  useEffect(() => {
    data.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}

type EmojiDataStoreCtx = EmojiUtilData & { fetch: () => void };

const useEmojiDataStore = create<EmojiDataStoreCtx>((set, get) => ({
  getEmojiUnicodeByName: () => '',
  groupedEmojis: [],
  getEmojiWithSkinTones: () => [],
  fetch: () => {
    // data already cached, nothing to do
    if (get().groupedEmojis.length) {
      return;
    }

    import(/* webpackChunkName: "emojiUtil" */ './emojiUtil').then(data => {
      // data already set by a concurrent call to fetch
      if (get().groupedEmojis.length) {
        return;
      }

      const emojiUtil = {
        ...data,
        getEmojiUnicodeByName: getEmojiUnicodeByName(
          data.getEmojiUnicodeByName
        ),
      };

      // cache data
      set({ ...emojiUtil });
    });
  },
}));
