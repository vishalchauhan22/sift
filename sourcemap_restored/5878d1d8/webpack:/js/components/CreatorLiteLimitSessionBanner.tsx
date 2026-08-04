import { ADMIN_DEACTIVATED_CREATOR_LITE_BANNER_SHOWN } from '@js/constants/events';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useUserProperty } from '@js/hooks/user/useUserProperty';
import React from 'react';

import {
  LIMITS,
  CREATOR_LITE_LIMIT_BANNER_ID,
} from '@loomhq/shared-utilities/constants/limits';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import * as analytics from '@js/utilities/analytics';

import { ErrorSeverities } from '../constants/error-severities';
import { useSessionStorage } from '../hooks/useSessionStorage';

const key = 'loom_creator_lite_limit_session_banner_dismissed';

export const CreatorLiteLimitSessionBanner = (): null => {
  const { showErrorBar } = useErrorBar();

  const [seen, looking] = useSessionStorage<boolean>(key, undefined);
  const { value: dismissedBanner, loading } = useUserProperty(
    UserPropertyEnum.CREATOR_LITE_MEMBER_LIMIT_GLOBAL_BANNER
  );
  const dismissed = dismissedBanner || seen;

  React.useEffect(() => {
    if (!loading && !dismissed) {
      analytics.track(ADMIN_DEACTIVATED_CREATOR_LITE_BANNER_SHOWN);

      showErrorBar({
        actionHref: 'https://www.loom.com/connect/creator-lite-limit',
        actionHrefLabel: 'Contact our sales team',
        bannerId: CREATOR_LITE_LIMIT_BANNER_ID,
        message: `You have exceeded the ${LIMITS.BUSINESS.CREATOR_LITE_MEMBER_LIMIT} Creator Lite limit for your workspace.`,
        severity: ErrorSeverities.ERROR,
      });
    }
  }, [dismissed, loading, looking, showErrorBar]);

  return null;
};
