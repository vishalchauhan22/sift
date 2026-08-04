import {
  Feature,
  FeatureInfo,
} from '@loomhq/shared-utilities/constants/product';

import {
  getVideoIdFromPageUrl,
  Page,
} from '@loomhq/shared-utilities/utilities/urlUtils';

export const getVideoIdForFeature = (feature?: FeatureInfo): string | null => {
  if (feature === Feature.EmbedSDK) {
    return getVideoIdFromPageUrl(window.location.href, Page.embed);
  } else if (feature === Feature.SharePage) {
    return getVideoIdFromPageUrl(window.location.href, Page.share);
  } else if (feature === Feature.EditPage) {
    return getVideoIdFromPageUrl(window.location.href, Page.edit);
  }

  return null;
};
