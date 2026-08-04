/* eslint-disable @loomhq/loom/no-js-extension */
import { CLOUDFRONT_URI, LOOM_URI } from '@js/constants/routes';

import DOMPurify from 'dompurify';

import { copyVideoUrlWithShareId } from '@js/utilities/url';

import { urlUtils, videoUtils } from '@loomhq/shared-utilities';
import {
  PLACEHOLDER_PASSWORD_PROTECTED_THUMBNAIL_PATH,
  PLACEHOLDER_PRIVATE_THUMBNAIL_PATH,
} from '@loomhq/shared-utilities/constants/video';

export * from './video-supported-mime';

const { hasPassword, isPrivate, isPublicVideo } = videoUtils;

export const getThumbnailUrlForShareModal = video => {
  return getThumbnailForExternalSharing(video);
};

export const getEmbedCode = (videoId, embedWidth, embedHeight) => {
  const [embedURL] = copyVideoUrlWithShareId({
    videoUrl: `${LOOM_URI}/embed/${videoId}`,
    copyToClipboard: false,
  });

  return (
    `<iframe width="${embedWidth}" ` +
    `height="${embedHeight}" src="${embedURL}" ` +
    'frameborder="0" webkitallowfullscreen mozallowfullscreen ' +
    'allowfullscreen></iframe>'
  );
};

// iframes need a wrapping div and specific css in order allow fluid responsiveness
// https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
export const getResponsiveEmbedCode = (videoId, heightAspectRatio) => {
  const [embedURL] = copyVideoUrlWithShareId({
    videoUrl: `${LOOM_URI}/embed/${videoId}`,
    copyToClipboard: false,
  });

  const padding = `${heightAspectRatio * 100}%`;
  const wrapperStyles = `position: relative; padding-bottom: ${padding}; height: 0;`;
  const iframeStyles =
    'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';

  return (
    `<div style="${wrapperStyles}"><iframe src="${embedURL}" ` +
    'frameborder="0" webkitallowfullscreen mozallowfullscreen ' +
    `allowfullscreen style="${iframeStyles}"></iframe></div>`
  );
};

export const isAliasVideoUrl = url => /\/a\/[\w-]*[a-z0-9]{32}$/.test(url);
export const isShareVideoUrl = url => /\/share\/[a-z0-9]{32}$/.test(url);
/**
 * @param {string} videoId
 * @param {Object} [options={}]
 * @param {number} [options.currentSeconds]
 * @param {string | null} [options.nameForSlug]
 * @returns {string}
 */
export const getShareVideoUrl = (
  videoId,
  { currentSeconds, nameForSlug } = {}
) => {
  // Only keep the integer
  const trimmedCurrentSec = Math.round(currentSeconds ?? 0);

  const slugWithHyphen = nameForSlug
    ? `${urlUtils.getSlugForVideo(nameForSlug)}-`
    : '';

  if (trimmedCurrentSec > 0) {
    return `${LOOM_URI}/share/${slugWithHyphen}${videoId}?t=${trimmedCurrentSec}`;
  }

  return `${LOOM_URI}/share/${slugWithHyphen}${videoId}`;
};

export const getAliasVideoUrl = (aliasId, currentSeconds) => {
  // Only keep the integer
  const trimmedCurrentSec = Math.round(currentSeconds ?? 0);

  if (trimmedCurrentSec > 0) {
    return `${LOOM_URI}/a/${aliasId}?t=${trimmedCurrentSec}`;
  }

  return `${LOOM_URI}/a/${aliasId}`;
};

export const getThumbnailForExternalSharing = video => {
  const isAnimated = video.use_gif;
  const videoThumbnail = isAnimated
    ? video.thumbnails?.defaultGifPlay
    : video.thumbnails?.default;
  const customThumbnailSet = Boolean(video.thumbnails?.full);
  const customThumb = video.thumbnails?.full;

  if (isPublicVideo(video) && customThumbnailSet) {
    return `${CLOUDFRONT_URI}/${customThumb}`;
  } else if (isPublicVideo(video) && videoThumbnail) {
    return `${CLOUDFRONT_URI}/${videoThumbnail}`;
  } else if (isPrivate(video)) {
    return `${CLOUDFRONT_URI}/${PLACEHOLDER_PRIVATE_THUMBNAIL_PATH['.gif']}`;
  } else if (hasPassword(video) || video.is_protected) {
    // The second part of this clause is because the video data dpes not always
    // have the password or have has_password set even when it has a password.
    return `${CLOUDFRONT_URI}/${PLACEHOLDER_PASSWORD_PROTECTED_THUMBNAIL_PATH['.gif']}`;
  }

  return null;
};

export const getAnimatedPreviewEmbed = video => {
  let name = video.name;

  if (isPrivate(video)) {
    name = 'Private Video';
  } else if (hasPassword(video) || video.is_protected) {
    name = 'Password Protected Video';
  }

  return `<div>
    <a href="${getShareVideoUrl(video.id)}">
      <p>${DOMPurify.sanitize(name)} - Watch Video</p>
    </a>
    <a href="${getShareVideoUrl(video.id)}">
      <img style="max-width:300px;" src="${getThumbnailUrlForShareModal(
        video
      )}">
    </a>
  </div>`;
};

export const setDocumentTitle = (customText = '') => {
  if (!customText) {
    return;
  }

  document.title = customText;
};
