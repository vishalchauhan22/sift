import { ReactionType } from '../context/types';
import { emojiVariants, loomToExtendedMap } from '../utils';
import { useEmojiData } from './useEmojiData';
import { useSkinTone } from './useSkinTone';

// Can only access these emojis's skin variations with `code-code`
// eg. "1F3FB-1F3FB" instead of others with "1F3FB"
const EMOJIS_WITH_SKIN_TONE_COMBINATIONS: string[] = [
  'people_holding_hands',
  'woman-kiss-man',
  'man-kiss-man',
  'woman-kiss-woman',
  'woman-heart-man',
  'man-heart-man',
  'woman-heart-woman',
];

export function useEmojiWithSkinTone(): {
  getEmojiNameWithSkinTone: (variant?: string | null) => string;
  getEmojiByName: (variant?: string | null) => string;
} {
  const { skinTone } = useSkinTone();
  const { getEmojiWithSkinTones, getEmojiUnicodeByName } = useEmojiData();
  const emojiWithSkinTones = getEmojiWithSkinTones();
  const ifSkinToneCombination = (name: string) => {
    return EMOJIS_WITH_SKIN_TONE_COMBINATIONS.includes(name);
  };

  /**
   * Return the emoji name concatenated with skin tone
   * Examples:
   *  |      Emoji with      |            Params              |           Return           |
   *  | 1. No variation      | "pizza",   "hand::skin-tone-3" | "pizza"                    |
   *  | 2. Default skin tone | "no_good", "hand::skin-tone-1" | "no_good"                  |
   *  | 3. Other skin tone   | "wave",    "hand::skin-tone-6" | "wave::skin-tone-6"        |
   *  | 4. Skin tone         | "people_holding_hands",        | "people_holding_hands      |
   *  |    combinations      | "hand::skin-tone-4"            | ::skin-tone-4::skin-tone-4"|
   */
  const getEmojiNameWithSkinTone = (variant?: string | null): string => {
    if (!variant) {
      return '';
    }

    let name = variant;
    const skinToneSuffix = skinTone?.slice(6);

    // acquire the mapped value, eg, 'yay' => 'raised_hands'
    if ((variant as ReactionType) in emojiVariants) {
      name = loomToExtendedMap[variant as ReactionType];
    }

    if (emojiWithSkinTones.includes(name)) {
      // if not default skin tone, concatenate the skin tone
      if (skinTone && skinTone !== 'hand') {
        name = ifSkinToneCombination(name)
          ? `${name}::${skinToneSuffix}::${skinToneSuffix}`
          : `${name}::${skinToneSuffix}`;
      }
    }

    return name;
  };

  /**
   * Return the emoji unicode with corresponding skin tone
   */
  const getEmojiByName = (variant?: string | null): string => {
    if (!variant) {
      return '';
    }

    const name = getEmojiNameWithSkinTone(variant);

    return getEmojiUnicodeByName(name);
  };

  return { getEmojiNameWithSkinTone, getEmojiByName };
}
