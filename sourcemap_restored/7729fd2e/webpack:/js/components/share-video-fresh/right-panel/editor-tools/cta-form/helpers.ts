import { CORNER_STYLES } from './constants';

export const getBorderRadiusLabel = (radius: number): string => {
  if (radius === CORNER_STYLES['Slightly rounded'].value) {
    return 'Slightly rounded';
  }

  if (radius === CORNER_STYLES['Squared'].value) {
    return 'Squared';
  }

  return 'Rounded';
};
