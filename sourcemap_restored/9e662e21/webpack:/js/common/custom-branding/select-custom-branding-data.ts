import { selectFromCurrentUserCache } from '@js/common/current-user/cache/selectFromCurrentUserCache';
import { getCloudfrontURI } from '@js/utilities/avatar';

import { AUTHENTICATED_USER_ACCESS } from '@loomhq/shared-utilities/constants/scopes';

import { GetCustomBrandingQuery } from './GetCustomBranding.generated';
import { CustomBrandingAPI } from './type';

export const selectCustomBrandingData = (
  data: GetCustomBrandingQuery | undefined
): CustomBrandingAPI => {
  let brandLogoPath: string | undefined;
  let shouldShowLoomBranding = false;
  const brandPrimaryColor = null;

  if (data?.getCustomBranding?.__typename !== 'GetCustomBranding') {
    return {
      brandLogoPath,
      shouldShowLoomBranding,
      brandPrimaryColor,
    };
  }

  const organization = data.getCustomBranding.organization;

  if (organization?.brandLogoPath) {
    brandLogoPath = getCloudfrontURI(organization?.brandLogoPath);
  }

  const userScopes = selectFromCurrentUserCache(user => user.scopes, []);

  // NOTE: this relies on user being injected in window. should prefer to use the hook for scope here.
  if (userScopes.includes(AUTHENTICATED_USER_ACCESS)) {
    shouldShowLoomBranding = false;
  } else {
    shouldShowLoomBranding = organization?.brandShowBranding ?? false;
  }

  return {
    brandLogoPath,
    shouldShowLoomBranding,
    brandPrimaryColor: organization?.brandPrimaryColor ?? null,
  };
};
