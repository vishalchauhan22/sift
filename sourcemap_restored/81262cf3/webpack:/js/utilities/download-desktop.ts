import { isMac, isWindows } from '@js/utilities/device';
import fetch from '@js/utilities/fetch';

import * as logger from '@js/utilities/loggerx';

export const MAC_SUPPORT = 'mac';
export const WIN_SUPPORT = 'windows';

const MAC_PATH = '/v1/desktop/download/mac';
const WIN_PATH = '/v1/desktop/download/win';

export const isSupportedDesktopPlatform = (): boolean =>
  Boolean(getSupportedPlatformType());

type PlatformType = typeof MAC_SUPPORT | typeof WIN_SUPPORT | undefined;

export const getSupportedPlatformType = (): PlatformType => {
  if (isMac) {
    return MAC_SUPPORT;
  }

  if (isWindows) {
    return WIN_SUPPORT;
  }
};

type Url = typeof MAC_PATH | typeof WIN_PATH;

const requestLink = async (url: Url): Promise<string[]> => {
  try {
    const resp = await fetch(url, { credentials: 'include' });
    const { urls } = await resp.json();

    if (!urls) {
      throw new Error('No recorder download links found');
    }

    return urls;
  } catch (err) {
    logger.warning(err, { message: 'Error fetching desktop download link' });

    return [];
  }
};

type Platform = typeof MAC_SUPPORT | typeof WIN_SUPPORT;
type RequestLinkFuncReturn = ReturnType<typeof requestLink>;

export const fetchLinkByPlatform = (
  platform: Platform
): RequestLinkFuncReturn | Promise<string> => {
  if (platform === MAC_SUPPORT) {
    return requestLink(MAC_PATH);
  }

  if (platform === WIN_SUPPORT) {
    return requestLink(WIN_PATH);
  }

  return Promise.reject<string>('Users platform not supported');
};
