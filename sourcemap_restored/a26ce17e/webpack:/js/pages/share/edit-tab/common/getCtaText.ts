import normalizeUrl from 'normalize-url';

import * as logger from '@js/utilities/loggerx';

import { isValidCtaUrl } from '@loomhq/shared-utilities/utilities/ctaUtils';
import { CALENDLY_URL_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';

import { getDomainFromUrl } from './getDomainFromUrl';

export const getCtaText = (ctaUrl: string | null): string | undefined => {
  if (!ctaUrl) {
    return undefined;
  }

  if (!isValidCtaUrl(ctaUrl)) {
    logger.warning('Error getting CTA text', {
      err: 'Url contains undesired scheme',
    });

    return undefined;
  }

  try {
    const normalizedCtaUrl = normalizeUrl(ctaUrl, { stripWWW: true });

    if (CALENDLY_URL_REGEX.test(normalizedCtaUrl)) {
      return 'Book a meeting!';
    }

    const domain = getDomainFromUrl(ctaUrl);

    if (!domain) {
      return undefined;
    }

    const text = domain.charAt(0).toUpperCase() + domain.slice(1);

    return text;
  } catch (err) {
    logger.warning('Error getting CTA text', { err });

    return undefined;
  }
};
