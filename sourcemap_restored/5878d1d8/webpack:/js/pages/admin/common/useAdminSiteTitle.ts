import { useSiteTitleInternal } from '@js/common/useSiteInternalTitle';

const ADMIN_PORTAL_GLOBAL_TITLE = 'Loommate Admin Portal';

export const useAdminSiteTitle = (title: string): void => {
  useSiteTitleInternal(
    title,
    ADMIN_PORTAL_GLOBAL_TITLE,
    ADMIN_PORTAL_GLOBAL_TITLE
  );
};
