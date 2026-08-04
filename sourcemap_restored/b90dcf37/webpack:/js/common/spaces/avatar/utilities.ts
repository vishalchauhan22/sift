import * as stringHash from 'string-hash';

enum SpaceColors {
  ORANGE_LIGHT = 'orangeLight',
  BLUE_LIGHT = 'blueLight',
  YELLOW_LIGHT = 'yellowLight',
  TEAL = 'tealLight',
}

enum AvatarTextColors {
  ORANGE_DARK = 'dangerHover',
  BLUE_DARK = 'blueDark',
  YELLOW_DARK = '#9E4C00',
  TEAL_DARK = 'tealDark',
}

const AVATAR_CONTAINER_COLORS = [
  SpaceColors.ORANGE_LIGHT,
  SpaceColors.BLUE_LIGHT,
  SpaceColors.YELLOW_LIGHT,
  SpaceColors.TEAL,
];

const AVATAR_TEXT_COLORS = [
  AvatarTextColors.ORANGE_DARK,
  AvatarTextColors.BLUE_DARK,
  AvatarTextColors.YELLOW_DARK,
  AvatarTextColors.TEAL_DARK,
];

const AVATAR_THEME_COLORS = ['orange', 'blue', 'yellow', 'teal'] as const;
type AvatarThemeColor = (typeof AVATAR_THEME_COLORS)[number];

const hash = (str: string): number => {
  let hash = stringHash(str);

  hash = ~hash;

  return Math.abs(Number(hash));
};

export const getAvatarText = (spaceName: string): string => {
  return spaceName?.trim().length ? spaceName.trim()[0].toUpperCase() : '';
};

export const pickContainerColor = (spaceName: string): SpaceColors => {
  const avatarHash = hash(spaceName);

  return AVATAR_CONTAINER_COLORS[avatarHash % AVATAR_CONTAINER_COLORS.length];
};

export const pickTextColor = (spaceName: string): AvatarTextColors => {
  const avatarHash = hash(spaceName);

  return AVATAR_TEXT_COLORS[avatarHash % AVATAR_TEXT_COLORS.length];
};

export const pickThemeColor = (spaceName: string): AvatarThemeColor => {
  const avatarHash = hash(spaceName);

  return AVATAR_THEME_COLORS[avatarHash % AVATAR_THEME_COLORS.length];
};
