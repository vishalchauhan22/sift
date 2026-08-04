import { HexColor } from '@loomhq/shared-utilities';

type ColorPaletteOption = {
  hexValue: HexColor;
  label: string;
};

export const COLOR_PALETTE_OPTIONS: Array<ColorPaletteOption> = [
  { hexValue: '#625DF5', label: 'Blurple' },
  { hexValue: '#1D7AFC', label: 'Blue' },
  { hexValue: '#2898BD', label: 'Teal' },
  { hexValue: '#6A9A23', label: 'Green' },
  { hexValue: '#B38600', label: 'Yellow' },
  { hexValue: '#CD519D', label: 'Magenta' },
  { hexValue: '#C9372C', label: 'Red' },
  { hexValue: '#E56910', label: 'Orange' },
  { hexValue: '#758195', label: 'Gray' },
  { hexValue: '#101214', label: 'Black' },
];
