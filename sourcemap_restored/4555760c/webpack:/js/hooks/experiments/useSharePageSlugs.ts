import {
  EXP_SHARE_PAGE_SLUGS,
  VARIANT_AND_ACTIVE,
} from '@loomhq/shared-utilities/constants/featureFlag';

import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { isAliasPage } from '@js/utilities/url';

export function useSharePageSlugs(): boolean {
  const isFlagOn = useFlagIsActivated({
    flag: EXP_SHARE_PAGE_SLUGS,
    activationValues: VARIANT_AND_ACTIVE,
  });

  return isFlagOn && !isAliasPage();
}
