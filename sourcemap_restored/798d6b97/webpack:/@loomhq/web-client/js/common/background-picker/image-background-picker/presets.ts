import gradient_blue_pink from '@assets/img/background-for-editing/gradient_blue_pink.svg';
import gradient_blue_white from '@assets/img/background-for-editing/gradient_blue_white.svg';
import gradient_green_blue from '@assets/img/background-for-editing/gradient_green_blue.svg';
import gradient_green_white from '@assets/img/background-for-editing/gradient_green_white.svg';
import gradient_orange_purple from '@assets/img/background-for-editing/gradient_orange_purple.svg';
import gradient_pink_purple from '@assets/img/background-for-editing/gradient_pink_purple.svg';
import gradient_purple_blue from '@assets/img/background-for-editing/gradient_purple_blue.svg';
import gradient_purple_yellow from '@assets/img/background-for-editing/gradient_purple_yellow.svg';
import gradient_yellow_pink from '@assets/img/background-for-editing/gradient_yellow_pink.svg';

import { PresetBackgroundName } from '@loomhq/shared-utilities';

export const PRESET_BACKGROUND_NAME_TO_SRC_MAP: Record<
  PresetBackgroundName,
  string
> = {
  gradient_blue_pink,
  gradient_yellow_pink,
  gradient_purple_yellow,
  gradient_green_blue,
  gradient_pink_purple,
  gradient_orange_purple,
  gradient_blue_white,
  gradient_green_white,
  gradient_purple_blue,
};

export type PresetOption = {
  presetBackgroundName: PresetBackgroundName;
  src: string;
};

export const PRESET_OPTIONS: Array<PresetOption> = Object.entries(
  PRESET_BACKGROUND_NAME_TO_SRC_MAP
).map(([presetBackgroundName, src]) => ({
  presetBackgroundName,
  src,
})) as PresetOption[];
