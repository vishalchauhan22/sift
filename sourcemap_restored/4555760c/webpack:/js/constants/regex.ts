import { validateUtils } from '@loomhq/shared-utilities';

const { HEX_32_REGEX } = validateUtils;

export const VALIDATE_WORKSPACE_NAME_REGEX = /^[^.:@/\\]*$/;

export const ID_REGEX = new RegExp(`${HEX_32_REGEX}$`);
export const HTTPS_REGEX = /https:\/\//gi;

// remove the internal regex state between runs (must be done in order to declare in central file)
export const resetRegex = (regexes: RegExp[]): void => {
  regexes.forEach(r => (r.lastIndex = 0));
};
