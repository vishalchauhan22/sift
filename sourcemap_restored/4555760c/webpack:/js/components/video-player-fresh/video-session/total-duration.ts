import { Player } from '@js/common/video-player';

import { getAppSource } from '@js/utilities/device';
import * as loggerx from '@js/utilities/loggerx';
import { getParam } from '@js/utilities/url';

/* eslint-disable no-console */ import { Feature } from '@loomhq/shared-utilities/constants/product';
import { getAnalyticsIds } from '@js/utilities/analytics';

import { getAnalyticsProps } from '../utils/analytics';

interface DurationParams {
  videoId: string;
  player: Player;
  totalDuration: number;
  selectedWorkspaceId?: string;
}

export function trackVideoWatchDuration(params: DurationParams): void {
  const { totalDuration, player, videoId, selectedWorkspaceId } = params;
  const { anonID, deviceID } = getAnalyticsIds();
  const sharedAppSource = getParam('sharedAppSource');

  const {
    isInlineEmbedOnLoom,
    parentLocation,
    fromLinkExpand,
    fromPublicSharePage,
  } = getAnalyticsProps();

  // protect against overflow errors - we treat someone watching this video over
  // 1000 times in a single session as an anomaly that gets discarded
  if (totalDuration >= player.duration * 1000) {
    loggerx.error(
      'large video watch track duration',
      {
        totalDuration,
        video_id: videoId,
      },
      { feature: Feature.VideoPlayer }
    );

    return;
  }

  try {
    sendBeaconRequest(
      JSON.stringify({
        anonID,
        deviceID,
        duration: totalDuration,
        speed: player.playbackRate,
        // This need to be updated when we work on embedding the player for the share page
        // embedded_on: isMainVideoOnSharePage ? null : document.referrer,
        // theater_mode_enabled: theaterModeEnabled,
        from_link_expand: fromLinkExpand,
        is_inline_embed_on_loom: isInlineEmbedOnLoom,
        embedded_on: document.referrer,
        from_public_share_page: fromPublicSharePage,
        full_screen_enabled: Boolean(isVideoInFullScreen()),
        parent_location: parentLocation,
        theater_mode_enabled: false,
        shared_app_source: sharedAppSource,
        organization_id: selectedWorkspaceId,
        appSource: getAppSource(),
      })
    );
  } catch (err) {
    loggerx.error(
      err,
      {
        message:
          'ViewCountTracking: Error sending beacon request for watch duration',
        videoId,
      },
      { feature: Feature.VideoPlayer }
    );
  }
}

function sendBeaconRequest(reqBody: string): Promise<void> {
  const url = '/api/a/tvv';

  // we must use XHR here since fetch doesn't support synchronous requests and
  // this creator is called on window unload:
  //
  // https://github.com/github/fetch/issues/248
  if (!navigator.sendBeacon) {
    return sendAsXHR(url, reqBody);
  }

  navigator.sendBeacon(url + '?beacon', reqBody);

  return Promise.resolve();
}

// TODO: add this on the player object
function isVideoInFullScreen() {
  return document.fullscreenEnabled && document.fullscreenElement;
}

function sendAsXHR(url: string, reqBody: string) {
  const xhr = new XMLHttpRequest();

  return new Promise<void>((res, rej) => {
    xhr.open('POST', url + '?xhr', true);

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 400) {
          rej(
            Error(
              'Oops! Error tracking video watch duration - ' +
                `HTTP response: ${xhr.status}`
            )
          );
        }
      }

      res();
    };

    xhr.onerror = () => {
      rej(
        Error(
          'Oops! Error tracking video watch duration - ' +
            `HTTP response: ${xhr.status}`
        )
      );
    };

    xhr.send(reqBody);
    loggerx.debug('sending xhr', {});
  });
}
