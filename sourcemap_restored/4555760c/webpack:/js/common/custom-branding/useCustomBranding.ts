import React from 'react';

import { useGetCustomBrandingQuery } from './GetCustomBranding.generated';
import { getPlayIconContrastedColor } from './getPlayIconContrastedColor';
import { selectCustomBrandingData } from './select-custom-branding-data';
import { CustomBrandingAPI } from './type';

type useCustomBrandingReturn = Pick<
  CustomBrandingAPI,
  'brandLogoPath' | 'shouldShowLoomBranding'
> & {
  hasCustomLogo: boolean;
  injectCustomBrandColors: () => void;
};

export const useCustomBranding = ({
  videoId,
}: {
  videoId?: string | null;
}): useCustomBrandingReturn => {
  const { data } = useGetCustomBrandingQuery({
    variables: {
      id: videoId as string,
    },
    skip: !videoId,
  });

  const { brandLogoPath, shouldShowLoomBranding, brandPrimaryColor } =
    selectCustomBrandingData(data);

  const injectCustomBrandColors = React.useCallback(() => {
    const injectedStyles = document.getElementById(
      'injected-custom-branding-styles'
    );

    if (injectedStyles) {
      return;
    }

    if (brandPrimaryColor) {
      const style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      style.setAttribute('id', 'injected-custom-branding-styles');
      style.innerHTML = `:root {
        --brandThemedPlayProgressBarColor: ${brandPrimaryColor};
        --brandThemedBigPlayButtonColor: ${brandPrimaryColor};
        --brandThemedBigPlayButtonIconColor: ${getPlayIconContrastedColor(
          brandPrimaryColor
        )};
        --brandThemedLinkColor: var(--lns-color-body);
        --brandThemedLinkDecoration: underline;
        --brandThemedLinkDecorationColor: var(--lns-color-grey4);
        --brandThemedLinkUnderlinePosition: under;
        --brandThemedPrimaryButtonBackgroundColor: var(--lns-color-body);
      }`;
      document.head.appendChild(style);
    }
  }, [brandPrimaryColor]);

  return {
    brandLogoPath,
    hasCustomLogo: Boolean(brandLogoPath),
    shouldShowLoomBranding,
    injectCustomBrandColors,
  };
};
