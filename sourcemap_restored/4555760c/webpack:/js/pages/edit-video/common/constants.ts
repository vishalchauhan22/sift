import { unit } from '@loomhq/lens';

export const EDIT_MD_BP = '39rem'; // responsive breakpoint for horizontal layout
export const EDIT_LG_BP = '72rem'; // use larger transcript width here

export enum ZIndices {
  TOKEN = 0,
  TOKEN_SELECTED = 1,
  ACTIVE_PLAYBACK_TOKEN = 2,
  HEADER = 800,
  POPOVER = 900,
  TOUR_CARD = 1000,
  MODAL = 1000, // Lens default modal z-index (not exported from Lens currently; PR open here to export it https://github.com/loomhq/lens/pull/542)
  MODAL_CLOSE_BUTTON = 1001,
}

export const LG_TRANSCRIPT_COLUMN_WIDTH_REM = 48;

export const HEADER_COLUMNS = `1fr auto`;

export const HEADER_HEIGHT_PX = 10.5 * unit; // 10.5 base Lens units (8px / half rem) (--lns-unit CSS var)

export const MAGICAL_AI_GRADIENT_ID = 'magical-ai-gradient';

export const LOGGER_PREFIX = '[Edit by Transcript]';

export const POSSESSIVE_TOKEN = "'s";
