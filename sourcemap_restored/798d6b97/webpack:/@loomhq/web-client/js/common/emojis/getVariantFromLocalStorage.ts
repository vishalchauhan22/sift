import {
  EMOJI_REACTION_LIST_VARIANT_TYPE,
  EMOJI_REACTION_LIST_VARIANT,
  EMOJI_REACTION_LIST_VARIANT_KEY,
} from '@js/common/emojis';

// NOTE: This should be migrated to the emoji folder
import { readFromLocalStorage } from '@js/common/video-player/emoji-picker/local-storage';

export const getVariantFromLocalStorage =
  (): EMOJI_REACTION_LIST_VARIANT_TYPE => {
    return readFromLocalStorage(
      EMOJI_REACTION_LIST_VARIANT_KEY,
      EMOJI_REACTION_LIST_VARIANT.DEFAULT
    );
  };
