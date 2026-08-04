import React from 'react';

import { DEFAULT_CTA_MODS } from '@loomhq/shared-utilities/constants/cta';

import { SvgRoundedCorner } from './icons/rounded-corner';
import { SvgSlightlyRoundedCorner } from './icons/slightly-rounded-corner';
import { SvgSquareCorner } from './icons/square-corner';

export const URL_ERROR = 'Yikes! Doesn’t look like a valid URL';
export const COLOR_ERROR = 'Yikes! Doesn’t look like a valid color';

export const COLOR_PICKER_POSITIONS = [
  'bottom-start',
  'bottom-center',
  'bottom-end',
  'top-start',
  'top-center',
  'top-end',
];

export const CORNER_STYLES = {
  Rounded: { value: 24, icon: <SvgRoundedCorner /> },
  Squared: { value: 0, icon: <SvgSquareCorner /> },
  'Slightly rounded': { value: 20, icon: <SvgSlightlyRoundedCorner /> },
};

export const PRESET_COLORS_HEX_CODE = [
  '#FF623E', // orange
  '#1F845A', // green
  '#FCA700', // yellowDark
  '#1868DB', // blue
  '#F8F6F0', // offWhite
  '#505258', // grey6
  '#FFFFFF', // white
];

export const DEFAULT_BUTTON_COLOR = DEFAULT_CTA_MODS.background_color;
export const DEFAULT_TEXT_COLOR = DEFAULT_CTA_MODS.color;
export const DEFAULT_BORDER_RADIUS = DEFAULT_CTA_MODS.border_radius;
export const DEFAULT_LOCATION = DEFAULT_CTA_MODS.location;
export const DEFAULT_BUTTON_COLOR_FOR_CALENDLY = '#006BFF';
