import { delayAnalyticsEvent } from '@js/common/analytics';
import { getCurrentUserFromCache } from '@js/common/current-user';
import { getLoomSsrUserCompat } from '@js/common/current-user/schema/getLoomSsrUserCompat';
import { useCallback } from 'react';

import * as logger from '@js/utilities/loggerx';

import * as sentry from '@js/utilities/sentry';
import { isFromPublicSharePage, inEmbedPlayer } from '@js/utilities/url';

import { getMostCompleteNamePossible } from '@js/utilities/user';

import { Team } from '@loomhq/shared-utilities/constants/product';
import { EDUCATION_VERIFIED_TAG } from '@loomhq/shared-utilities/constants/tags';
import * as analytics from '@js/utilities/analytics';

import { useOnboardingStore } from '@js/hooks/onboarding/useOnboardingStore';

/**
 * @deprecated User related data should live in our GraphQL cache.
 * @returns A function that dispatches user data into the redux store.
 */
export const useGetUserCreator = (): (() => void) => {
  const { updateWelcomeRole, updateWelcomeUseCasePlan } = useOnboardingStore();

  return useCallback(() => {
    try {
      const userJson = getLoomSsrUserCompat(getCurrentUserFromCache());

      if (!userJson) {
        return;
      }

      const context: Record<string, unknown> = {};

      // do not pass page URL on public share page
      if (isFromPublicSharePage().fromPublicSharePage) {
        context.page = { url: null };
      }

      sentry.setUserContext({ id: userJson.id });

      // Segment will instantiate the Intercom messenger again if we identify -
      // we should simply not identify within the embed player
      if (!inEmbedPlayer()) {
        const userId = userJson.is_sdk_shared_user ? null : userJson.id;

        delayAnalyticsEvent(
          analytics.identify,
          userId,
          {
            accountType: userJson.account_type,
            company_name: userJson.company_name,
            createdAt: userJson.createdAt,
            dashboard_access: userJson.dashboard_access,
            education_verified: Boolean(
              userJson.tags && userJson.tags[EDUCATION_VERIFIED_TAG]
            ),
            email: userJson.email,
            firstName: userJson.first_name,
            lastName: userJson.last_name,
            loom_sign_up_date: userJson.createdAt,
            name: getMostCompleteNamePossible(userJson),
            password_is_set: userJson.password_is_set,
            role: userJson.role,
            status: userJson.status,
          },
          { context }
        );
      }

      const { persona } = userJson;

      const { persona_v1: personaV1 } = persona as Record<
        string,
        Record<string, unknown>
      >;

      updateWelcomeRole(personaV1?.role);
      updateWelcomeUseCasePlan(personaV1?.use_case_plan);
    } catch (err) {
      logger.error(
        err,
        {
          message: 'Error setting up current user',
        },
        { team: Team.CorePlatform }
      );
    }
  }, [updateWelcomeRole, updateWelcomeUseCasePlan]);
};
