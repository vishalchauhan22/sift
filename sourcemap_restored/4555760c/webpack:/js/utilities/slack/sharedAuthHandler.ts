import { FetchResult } from '@apollo/client/link/core/types';
import fetch from '@js/utilities/fetch';
import { SharedAuthSource } from '@js/utilities/slack/source';
import { v4 as uuidv4 } from 'uuid';

import { SharedAuthEvent } from '@loomhq/enums';
import {
  decode,
  encode,
  generateRSAKeys,
  privateDecrypt,
} from '@loomhq/shared-auth-browser';
import { slackUtils } from '@loomhq/shared-utilities';
import { APP_SOURCE_SLACK_DESKTOP } from '@loomhq/shared-utilities/constants/analytics';
import { Team } from '@loomhq/shared-utilities/constants/product';

import { LOOM_URI } from '../../constants/routes';
import * as analytics from '../analytics';
import { getGraphQLClient } from '../graphql';
import * as loggerx from '../loggerx';
import onSessionRequestToken from './onSessionRequestToken.graphql';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../analytics/attribute-transformer';

const SESSION_REQUEST_CALLBACK_FAILED = 'failure';

export const invokeSharedAuthFlow = async (
  videoId: string | undefined,
  entryPoint?: SharedAuthSource
): Promise<string | undefined> => {
  const loginAttemptId = uuidv4();
  const trackingIds = analytics.getAnalyticsIds();

  const track = (eventName: SharedAuthEvent) => {
    analytics.track(eventName, {
      ...withIdentifiers(
        eventName,
        AnalyticsEntityId.video(videoId, 'videoId'),
        AnalyticsEntityId.loginAttempt(loginAttemptId, 'loginAttemptId'),
        AnalyticsEntityId.anonymous(trackingIds.anonID, 'anonymousId'),
        AnalyticsEntityId.device(trackingIds.deviceID, 'deviceId')
      ),
      source: APP_SOURCE_SLACK_DESKTOP,
      entryPoint,
      isSlackSharedAuthV2: true,
      unfurl: slackUtils.getUnfurlType(),
    });
  };

  track(SharedAuthEvent.Initiated);

  try {
    const { publicKeyAsPem, privateKey } = await generateRSAKeys();
    const encodedPublicKey = encode(publicKeyAsPem);

    const gqlClient = getGraphQLClient();
    const subscription = gqlClient
      .subscribe({
        variables: { encodedPublicKey },
        query: onSessionRequestToken,
      })
      .subscribe(body => {
        subscription.unsubscribe();
        gqlClient.stop();

        sessionRequestCallback({
          body,
          trackingIds,
          loginAttemptId,
          privateKey,
          track,
        });
      });

    track(SharedAuthEvent.GraphQLSubscribed);

    const queryParams = {
      anon_id: trackingIds.anonID,
      device_id: trackingIds.deviceID,
      app_source: APP_SOURCE_SLACK_DESKTOP,
      ak: encodedPublicKey,
      login_attempt_id: loginAttemptId,
      custom_title: encodeURIComponent(
        'Sign in to Loom to connect your account'
      ),
      redirect_after: `${LOOM_URI}/slack/shared-auth/success`,
    };
    const queryParamStrings = Object.keys(queryParams).map(
      key => `${key}=${queryParams[key]}`
    );
    const url = `${LOOM_URI}/shared-auth/login?${queryParamStrings.join('&')}`;

    window.open(url);

    return url;
  } catch (error) {
    loggerx.error(
      Error('Failed to invoke Slack shared auth flow.'),
      {
        error,
      },
      { team: Team.Outreach }
    );
  }
};

export const sessionRequestCallback = async ({
  body,
  trackingIds,
  loginAttemptId,
  privateKey,
  track,
}: {
  body: FetchResult<any, Record<string, any>, Record<string, any>>;
  trackingIds: { anonID: any; deviceID: any; userID: any };
  loginAttemptId: string;
  privateKey: CryptoKey;
  track: (eventName: SharedAuthEvent) => void;
}): Promise<void> => {
  track(SharedAuthEvent.GraphQLHeardBack);

  const { token: encryptedEncodedSRT, status } = body.data.sessionRequestToken;

  if (status === SESSION_REQUEST_CALLBACK_FAILED) {
    loggerx.error(
      Error('Session request callback failed.'),
      {
        message: `Server response: ${status}`,
      },
      { team: Team.Outreach }
    );

    return;
  }

  track(SharedAuthEvent.SessionRequestTokenReceived);

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const decryptedSRT = await privateDecrypt(
    privateKey,
    decode(encryptedEncodedSRT)
  );

  const queryParams = {
    anon_id: trackingIds.anonID,
    device_id: trackingIds.deviceID,
    login_attempt_id: loginAttemptId,
    app_source: 'slack',
  };
  const queryParamStrings = Object.keys(queryParams).map(
    key => `${key}=${queryParams[key]}`
  );

  const resp = await fetch(
    `${LOOM_URI}/api/auth/session?${queryParamStrings.join('&')}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        srt: encode(decryptedSRT),
      }),
    }
  );

  if (resp.status >= 400) {
    loggerx.error(
      Error('Fetch session request token failed.'),
      {
        message: `Response: [${resp.status}] ${resp.statusText}`,
      },
      { team: Team.Outreach }
    );

    return;
  }

  track(SharedAuthEvent.LoginSuccess);

  window.location.reload();
};
