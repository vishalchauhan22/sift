import tinycolor from 'tinycolor2';

export function getPlayIconContrastedColor(
  color: string
): 'black' | 'white' | undefined {
  if (color) {
    const colorLuminance = tinycolor(color).getLuminance();

    return colorLuminance > 0.2 ? 'black' : 'white';
  }
}
