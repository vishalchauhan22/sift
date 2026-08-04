import {
  getVideoIdFromPageUrl,
  Page,
} from '@loomhq/shared-utilities/utilities/urlUtils';

/**
 * Similar to getVideoIdForFeature but doesn't require a feature parameter
 */
export const getVideoIdFromCurrentUrl = (): string | null => {
  const currentUrl = window.location.href;

  // Check different page types based on URL pattern
  if (currentUrl.includes('/embed/')) {
    return getVideoIdFromPageUrl(currentUrl, Page.embed);
  } else if (currentUrl.includes('/share/')) {
    return getVideoIdFromPageUrl(currentUrl, Page.share);
  } else if (currentUrl.includes('/edit/')) {
    return getVideoIdFromPageUrl(currentUrl, Page.edit);
  }

  return null;
};
