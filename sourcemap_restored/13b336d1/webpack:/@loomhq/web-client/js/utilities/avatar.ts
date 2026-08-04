import { CLOUDFRONT_URI } from '@js/constants/routes';

import { isValidUrl } from '@js/utilities/url';

import { DEFAULT_AVATAR_PATH } from '@loomhq/shared-utilities/constants/userAppSettings';
import avatarPlaceholder from '@assets/img/icons/default-avatar.svg';

export interface Avatar {
  name?: string;
  thumb: string;
  isAtlassianMastered?: boolean | null;
}

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const getCloudfrontURI = (path: string | null): string | undefined => {
  if (path) {
    return `${CLOUDFRONT_URI}/${path}`;
  }
};

export const getAvatarThumbForUser = (avatars: any[]): string | undefined => {
  const thumb = avatars?.[0]?.thumb;
  const isValid = isValidUrl(thumb);

  return isValid ? thumb : getCloudfrontURI(thumb);
};

export const getAvatarLargeForUser = (avatars: any[]): string | undefined => {
  const thumb = avatars?.[0]?.thumb;
  const isValid = isValidUrl(thumb);

  if (isValid) {
    return thumb;
  }

  if (thumb !== DEFAULT_AVATAR_PATH) {
    return getCloudfrontURI(thumb);
  }
};

export const getAvatarFromPath = (path: string): string => {
  const isValid = isValidUrl(path);

  if (isValid) {
    return path;
  }

  return (path && getCloudfrontURI(path)) || avatarPlaceholder;
};

export const getUserAvatarThumb = (avatars: any[]): string | undefined => {
  const thumb = avatars?.[0]?.thumb;
  const isValid = isValidUrl(thumb);

  if (isValid) {
    return thumb;
  }

  if (thumb !== DEFAULT_AVATAR_PATH) {
    return getCloudfrontURI(thumb);
  }
};
