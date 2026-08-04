/* eslint-disable no-console */
import { getAnchorHrefFromText } from '@js/common/video-player/utils';
import { prependUrlProtocol } from '@js/pages/share/comments/common/helpers';
import urlRegexSafe from 'url-regex-safe';

import { urlUtils } from '@loomhq/shared-utilities';

import { ID_REGEX } from '@js/constants/regex';

import { ComponentType, HandlerFnType, SemanticPart } from '../types';

import * as logger from '@js/utilities/loggerx';

export const linksHandler: HandlerFnType = (semanticParts, options = {}) => {
  const { getVideoIdFromPageUrl } = urlUtils;
  const { useNewEmbedPlayer } = options;
  const linkTestRegexp = /<a[^>]+>.+?<\/a>/gm;
  const urlRegexp = urlRegexSafe({
    apostrophes: true,
    strict: true,
    re2: false,
  });
  const result: Array<SemanticPart | string> = [];

  semanticParts.forEach(semanticPart => {
    if (typeof semanticPart === 'string') {
      const anchorsFound = semanticPart.match(linkTestRegexp);

      let anchorFreeSemanticPart = semanticPart;

      if (anchorsFound) {
        anchorFreeSemanticPart = anchorsFound.reduce((part, anchor) => {
          const hrefValue = getAnchorHrefFromText(anchor);

          return hrefValue ? part.replace(anchor, hrefValue) : part;
        }, semanticPart);
      }

      const splittedString = anchorFreeSemanticPart.split(urlRegexp);
      const urlsFound = anchorFreeSemanticPart.match(urlRegexp) || [];

      splittedString.forEach((stringElem, index) => {
        if (stringElem !== '') {
          result.push(stringElem);
        }

        const url = urlsFound[index];

        if (url) {
          let videoId;

          try {
            videoId = getVideoIdFromPageUrl(url);
          } catch (err) {
            logger.warning(err, {
              message: 'URL provided in semantic link is invalid',
            });
          }

          if (useNewEmbedPlayer && videoId && ID_REGEX.test(videoId)) {
            result.push({ type: ComponentType.LoomLink, videoId });
          } else {
            result.push({
              type: ComponentType.Link,
              url: prependUrlProtocol({ url }).href,
              displayText: url,
              trimmable: true,
            });
          }
        }
      });
    } else {
      result.push(semanticPart);
    }
  });

  return result;
};
