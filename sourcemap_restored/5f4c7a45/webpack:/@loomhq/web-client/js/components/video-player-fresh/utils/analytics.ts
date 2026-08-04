import { getParam, isFromPublicSharePage } from '@js/utilities/url';

import { TARGET_SHARE_PAGE_EMBED_PARAM } from '@loomhq/shared-utilities/constants/oEmbed';

type AnalyticsProps = {
  isInlineEmbedOnLoom: boolean;
  parentLocation: string;
  fromLinkExpand: boolean;
  fromPublicSharePage: boolean;
  fromUrl: string;
  product: string | null;
};

/**
 * @isInlineEmbedOnLoom - whether this is an embedded loom on the loom.com domain (ie inline comment)
 * @from_link_expand - whether this loom was use within a link expansion from the chrome extension
 * @parentLocation - the parent location this video was embedded on (used for analytics)
 *  this can come from both link expanding (?from_url) or the public share page
 * @fromPublicSharePage - whether the player is being loaded on the public share page
 * @product - the product source of where the video is being played
 */
export const getAnalyticsProps = (): AnalyticsProps => {
  const {
    fromPublicSharePage,
    parentLocation: parentLocationFromPublicSharePage,
  } = isFromPublicSharePage();
  const fromUrl = window.decodeURIComponent(getParam('from_url') || '');

  // reference: https://github.com/loomhq/loom/blob/4d91b65ef166314c4b114b831b2983937e3e4b2a/src/client/js/embed-video.js
  // isInlineEmbedOnLoom is set to !isMainVideoEmbedOnSharePage
  // and isMainVideoEmbedOnSharePage = fromPublicSharePage && getParam(TARGET_SHARE_PAGE_EMBED_PARAM) === '1';
  const isInlineEmbedOnLoom = !(
    fromPublicSharePage && getParam(TARGET_SHARE_PAGE_EMBED_PARAM) === '1'
  );

  const parentLocation = parentLocationFromPublicSharePage || fromUrl;

  const fromLinkExpand = getParam('from_link_expand') === 'true';

  const product = getParam('product') || null;

  return {
    isInlineEmbedOnLoom,
    parentLocation,
    fromLinkExpand,
    fromPublicSharePage,
    fromUrl,
    product,
  };
};
