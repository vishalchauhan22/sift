// DO NOT USE THIS FILE DIRECTLY, USE "useEmojiData"
import { EmojiData, EMOJI_CATEGORIES, EmojiType } from './emoji-data';

const emojiData = new EmojiData();

export const groupedEmojis = getGroupedEmojis();

export { getEmojiWithSkinTones } from './emoji-data';

const SKIN_TONE_UNICODE_MAP: Record<string, string> = {
  'skin-tone-2': '1F3FB',
  'skin-tone-3': '1F3FC',
  'skin-tone-4': '1F3FD',
  'skin-tone-5': '1F3FE',
  'skin-tone-6': '1F3FF',
};

function getGroupedEmojis() {
  const results: { category: string; emojis: EmojiType[] }[] = [];

  EMOJI_CATEGORIES.forEach(category => {
    const emojis = emojiData.emojiCategoryLookUp.get(category);

    if (emojis) {
      results.push({ category, emojis });
    }
  });

  return results;
}

/**
 * For more details about emojis representation in javascript
 * https://thekevinscott.com/emojis-in-javascript/
 *
 * Example walkthrough (variant = wave::skin-tone-4)
 * - has skin tone? => yes
 * - find emoji object
 * - find code based on skin tone => 1F3FD
 * - get the unified => 1F44B-1F3FD
 * - convert it to unicode and return
 */
export function getEmojiUnicodeByName(
  name?: string | null,
  skinTones?: string[] | null
): string {
  if (!name) {
    return '';
  }

  const emoji = emojiData.getEmojiByName(name);

  if (!emoji) {
    return '';
  }

  // if has skin tones
  if (skinTones?.length) {
    const code = skinTones.map(tone => SKIN_TONE_UNICODE_MAP[tone]).join('-');

    if (!code || !emoji.skin_variations) {
      return '';
    }

    const unifiedObj = emoji.skin_variations[code];

    if (!unifiedObj) {
      return '';
    }

    const { unified } = unifiedObj;

    return convertToUnicodeStr(unified);
  }

  if (emoji) {
    return convertToUnicodeStr(emoji.unified);
  }

  return '';
}

function convertToUnicodeStr(unified: string) {
  const points = unified.split('-').map(section => Number(`0x${section}`));

  return String.fromCodePoint(...points);
}
