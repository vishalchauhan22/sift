/* eslint-disable camelcase */
import emojis from './emoji.json';

export interface EmojiType {
  unified: string;
  short_name: string;
  short_names: string[];
  name: string;
  category: string;
  skin_variations?: Record<string, { unified: string } | undefined>;
  obsoleted_by?: string;
  obsoletes?: string;
}

export const SELECTED_EMOJI_CN = 'selected-emoji';
export const GRID_SELECTOR = '[data-name="emoji-grid"]';
export const EMOJI_SELECTOR = '[data-name="emoji"]';

export const EMOJI_CATEGORIES = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Activities',
  'Travel & Places',
  'Objects',
  'Symbols',
  'Flags',
];

// Vars related to skin tone preference in local storage
export const SKIN_TONE_KEY = 'skinTone';
export const DEFAULT_SKIN_TONE = 'hand';

export type SkinTone = {
  label: string;
  short_name: string;
};

export const skinTones: SkinTone[] = [
  {
    label: 'tone-1',
    short_name: 'hand',
  },
  {
    label: 'tone-2',
    short_name: 'hand::skin-tone-2',
  },
  {
    label: 'tone-3',
    short_name: 'hand::skin-tone-3',
  },
  {
    label: 'tone-4',
    short_name: 'hand::skin-tone-4',
  },
  {
    label: 'tone-5',
    short_name: 'hand::skin-tone-5',
  },
  {
    label: 'tone-6',
    short_name: 'hand::skin-tone-6',
  },
];

export function getEmojiWithSkinTones(): string[] {
  return (emojis as unknown as EmojiType[]).flatMap((e: EmojiType) => {
    return e.skin_variations ? [e.short_name] : [];
  });
}

export function createEmojiGroup(
  category: string,
  emojiNames: string[]
): {
  category: string;
  emojis: EmojiType[];
} {
  const emojisInGroup: EmojiType[] = [];
  const uniqueNames = new Set(emojiNames);

  uniqueNames.forEach(name => {
    const emoji = (emojis as unknown as EmojiType[]).find(
      e => e.short_name === name
    ) as EmojiType;

    if (emoji) {
      emojisInGroup.push(emoji);
    }
  });

  return { category, emojis: emojisInGroup };
}

export class EmojiData {
  private emojiValMap: Map<string, EmojiType> = new Map();
  public emojiCategoryLookUp: Map<string, EmojiType[]> = new Map();

  constructor() {
    this.initEmojiMap();
  }

  public getEmojiByName(emojiStr: string): EmojiType | undefined {
    return this.emojiValMap.get(emojiStr);
  }

  private initEmojiMap() {
    (emojis as unknown as EmojiType[]).forEach((e: EmojiType) => {
      const { short_names } = e;

      short_names.forEach(name => {
        this.emojiValMap.set(name, e);
      });
    });

    EMOJI_CATEGORIES.forEach(category => {
      const filteredList = (emojis as unknown as EmojiType[]).filter(
        e => e.category === category
      );

      this.emojiCategoryLookUp.set(category, filteredList);
    });
  }
}
