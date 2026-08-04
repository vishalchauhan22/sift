// Importing necessary hooks and utilities from React and other libraries
import { GoogleOneTapMoments } from '@js/constants/google';

import { GOOGLE_API_CLIENT_ID } from '@js/constants/runtimeConfig';

import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useEffect, useLayoutEffect, useState } from 'react';
import { openOAuthPopup } from '@js/utilities/auth';
import { incrementMetric } from '@js/utilities/metrics';
import { getFilteredPathnames } from '@js/utilities/url';

import { GOOGLE_ID_TOKEN } from '@loomhq/shared-utilities/constants/oAuthKeys';
import {
  EXPERIMENTS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';

interface GoogleAccountsId {
  initialize(config: any): void;
  prompt(callback: (notification: any) => void): void;
}
interface GoogleAccounts {
  id: GoogleAccountsId;
}
declare global {
  interface Window {
    google?: {
      accounts?: GoogleAccounts;
    };
  }
}

export function GoogleIdentity(): JSX.Element | null {
  const [prompted, setPrompted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const currentPath: string = getFilteredPathnames(window.location.pathname)[0];

  const shouldUseFedCm = useFlagIsActivated({
    flag: EXPERIMENTS.EXP_ROLLOUT_FEDCM_FOR_ONE_TAP,
    controlType: ControlType.STATSIG_EXPERIMENT,
    activationValues: [true],
  });

  useEffect(() => {
    if (shouldUseFedCm !== undefined) {
      window?.google?.accounts?.id?.initialize?.({
        client_id: GOOGLE_API_CLIENT_ID,
        use_fedcm_for_prompt: shouldUseFedCm,
        callback(data: any) {
          // Consider using a more specific type if the structure of 'data' is known
          if (data?.credential) {
            openOAuthPopup(GOOGLE_ID_TOKEN, {
              id_token: data.credential,
              authURL: window.location.href,
              fromWebSignup: true,
            });
          }

          incrementMetric('google_one_tap.accepted', {
            source: currentPath,
          });
        },
      });

      setInitialized(true);
    }
  }, [currentPath, prompted, initialized, shouldUseFedCm]);

  useLayoutEffect(() => {
    if (!prompted && initialized) {
      window?.google?.accounts?.id?.prompt((notification: any) => {
        // Consider using a more specific type for notification if its structure is known
        if (notification.isDisplayed()) {
          incrementMetric('google_one_tap.displayed', {
            source: currentPath,
          });
        } else {
          switch (notification.getMomentType()) {
            case GoogleOneTapMoments.DISPLAY:
              incrementMetric('google_one_tap.not_displayed', {
                reason: notification.getNotDisplayedReason(),
                source: currentPath,
              });
              break;
            case GoogleOneTapMoments.SKIPPED:
              incrementMetric('google_one_tap.skipped', {
                reason: notification.getSkippedReason(),
                source: currentPath,
              });
              break;
            case GoogleOneTapMoments.DISMISSED:
              incrementMetric('google_one_tap.dismissed', {
                reason: notification.getDismissedReason(),
                source: currentPath,
              });
              break;
            default:
              break;
          }
        }
      });

      setPrompted(true);
    }
  }, [prompted, initialized, currentPath, setPrompted]);

  return null;
}
