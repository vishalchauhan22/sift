import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { isFromPublicSharePage, isAliasPage } from '@js/utilities/url';

import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

export const useShouldHideLeftNav = (): boolean => {
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const onLargeTabletOrDesktop: boolean = useMatchLargeTabletOrDesktop();

  const { fromPublicSharePage: isSharePage, parentLocation } =
    isFromPublicSharePage();
  const isEditPage = Boolean(parentLocation?.match('/edit/'));

  const isGenerateVideoPage = Boolean(
    parentLocation?.match('/generate-video/')
  );

  const isScreenshotPage = Boolean(parentLocation?.match('/i/'));

  return (
    isLoggedIn &&
    onLargeTabletOrDesktop &&
    (isSharePage ||
      isEditPage ||
      isAliasPage() ||
      isScreenshotPage ||
      isGenerateVideoPage)
  );
};
