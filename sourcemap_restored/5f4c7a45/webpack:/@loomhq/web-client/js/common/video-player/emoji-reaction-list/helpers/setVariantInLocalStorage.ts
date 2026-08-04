/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import {
  EMOJI_REACTION_LIST_VARIANT_KEY,
  EMOJI_REACTION_LIST_VARIANT_TYPE,
} from '@js/common/emojis';

import { writeToLocalStorage } from '../../emoji-picker/local-storage';

export const setVariantInLocalStorage = (
  quickReactListVariant: EMOJI_REACTION_LIST_VARIANT_TYPE
): void => {
  writeToLocalStorage(EMOJI_REACTION_LIST_VARIANT_KEY, quickReactListVariant);
};
