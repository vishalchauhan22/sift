import { useSiteTitleInternal } from '@js/common/useSiteInternalTitle';

import { DEFAULT_TITLE } from '@loomhq/shared-utilities/constants/seo';

const PUBLIC_GLOBAL_TITLE = 'Loom';

// TODO(next author): move useSiteTitle to common, colocate with useSiteTitleInternal in a collected folder and update imports

export const useSiteTitle = (title: string): void => {
  useSiteTitleInternal(title, PUBLIC_GLOBAL_TITLE, DEFAULT_TITLE);
};
