import {
  EXPLICIT_CONSENT_REQUIRED_DISPLAYED_TEXT,
  IMPLICIT_CONSENT_DISPLAY_TEXT,
} from '@js/constants/promotionalEmails';

import type { MarketingConsentOptions } from '@loomhq/shared-utilities/types/marketingConsent';

export function createMarketingConsentOptions(
  granted: boolean,
  locale: string | null,
  localeRequiresMarketingOptIn: boolean | null
): MarketingConsentOptions | null {
  const formUrl = window.location.href;

  if (locale === null || localeRequiresMarketingOptIn === null) {
    return null;
  }

  let displayedText = '';
  let consentGranted = granted;

  if (localeRequiresMarketingOptIn) {
    displayedText = EXPLICIT_CONSENT_REQUIRED_DISPLAYED_TEXT;
  } else {
    consentGranted = true;
    displayedText = IMPLICIT_CONSENT_DISPLAY_TEXT;
  }

  return {
    localeRequiresMarketingCommunicationOptIn: localeRequiresMarketingOptIn,
    locale,
    formUrl,
    consentGranted,
    consentDisplayedText: displayedText,
  };
}
