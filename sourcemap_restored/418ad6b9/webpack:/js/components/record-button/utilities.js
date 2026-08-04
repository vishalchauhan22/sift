/* eslint-disable @loomhq/loom/no-js-extension */
import {
  RECORDER_INITIATED,
  RECORDER_INITIATED_V2,
  SDK_RECORDING_CANCELED_V2,
  SDK_RECORDING_COMPLETED_V2,
  SDK_RECORD_BUTTON_CLICKED_V2,
  SDK_UPLOAD_COMPLETED_V2,
} from '@js/constants/events';
import {
  VIDEOS_LOOMS_PAGE,
  HOME_PAGE,
  ARCHIVED_LOOMS_PAGE,
  HISTORY_PAGE,
} from '@js/constants/routes';
import { NODE_ENV } from '@js/constants/runtimeConfig';

import { isSdkSupported } from '@js/pages/share/common/sdk/isSdkSupported';
import { getSdkInstance } from '@js/pages/share/common/sdk/use-cases/persistentRecord';

import { isWindows } from '@js/utilities/device';

import { incrementMetric } from '@js/utilities/metrics';

import { chooseDeeplinkingPrefix } from '@loomhq/shared-utilities/constants/environment';
import * as analytics from '@js/utilities/analytics';
import { blockUnload, unblockUnload } from '@js/utilities/block-unload';
import { openExtensionIfInstalled } from '@js/utilities/extension';

import { CHROME_EXTENSION, DESKTOP, SDK } from './constants';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

export const startDesktopRecording = (source, waitForDesktopInitFromFlag) =>
  new Promise(resolve => {
    // pages with higher number of requests (ex. due to having lots of looms)
    // seem to be the reason why the persistent record button could trigger two
    // recorders. the delay to start the desktop app targets those pages.
    const videoPagePaths = [
      VIDEOS_LOOMS_PAGE,
      HOME_PAGE,
      ARCHIVED_LOOMS_PAGE,
      HISTORY_PAGE,
    ];

    const isOnVideosPage =
      window.location.pathname.includes('/spaces') ||
      videoPagePaths.includes(window.location.pathname);

    const waitForDesktopInit =
      isOnVideosPage && isWindows ? waitForDesktopInitFromFlag : 500;

    const listener = () => {
      // A short timeout is required here for 'document.hasFocus' to update after
      // the 'beforeunload' event is triggered, otherwise hasFocus will always return true.
      setTimeout(() => {
        // If the document still has focus it means the desktop app has failed to launch (MacOS only)
        if (!document.hasFocus()) {
          analytics.track(RECORDER_INITIATED, {
            source,
            recorder_type: DESKTOP,
          });
          incrementMetric('recorder.initiate', {
            recorder_type: DESKTOP,
            source,
          });

          resolve(true);
        } else {
          resolve(false);
        }
      }, waitForDesktopInit);
    };

    window.addEventListener('beforeunload', listener);

    window.location.href = `${chooseDeeplinkingPrefix(NODE_ENV)}://`;

    setTimeout(
      () => window.removeEventListener('beforeunload', listener),
      10000
    );
  });

export const startChromeExtensionRecording = (source, shouldLaunchTutorial) =>
  new Promise(resolve => {
    // An extra window focus check is required for Windows before launching the Chrome extension
    if (isWindows && !document.hasFocus()) {
      return;
    }

    openExtensionIfInstalled(
      'persistent-record',
      shouldLaunchTutorial,
      success => {
        if (success) {
          analytics.track(RECORDER_INITIATED, {
            source,
            recorder_type: CHROME_EXTENSION,
          });
          incrementMetric('recorder.initiate', {
            recorder_type: CHROME_EXTENSION,
            source,
          });

          resolve(true);
        }

        resolve(false);
      }
    );
  });

let sdkButton = null;

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const setupSDK = async options => {
  if (sdkButton) {
    return;
  }

  const { configureButton } = await getSdkInstance().waitOnInstance();

  sdkButton = configureButton({
    hooks: {
      onStart: () => {
        options?.onStart?.();
        analytics.track(SDK_RECORD_BUTTON_CLICKED_V2, {
          source: options.source,
        });
        incrementMetric('recorder.start_recording', {
          recorder_type: SDK,
          source: options.source,
          isLoggedIn: options.isLoggedIn,
        });
      },
      onCancel: () => {
        options?.onCancel?.();
        analytics.track(SDK_RECORDING_CANCELED_V2, { source: options.source });
        incrementMetric('recorder.cancel_recording', {
          recorder_type: SDK,
          source: options.source,
          isLoggedIn: options.isLoggedIn,
        });
      },
      onRecordingComplete: oembed => {
        blockUnload();
        options?.onRecordingComplete?.(oembed);
        window.open(oembed.sharedUrl + '?from_recorder=1', '_blank');
        analytics.track(SDK_RECORDING_COMPLETED_V2, {
          ...withIdentifiers(
            SDK_RECORDING_COMPLETED_V2,
            AnalyticsEntityId.video(oembed.id, 'videoId')
          ),
          source: options.source,
          videoUrl: oembed.sharedUrl,
        });
        incrementMetric('recorder.recording_complete', {
          recorder_type: SDK,
          source: options.source,
          isLoggedIn: options.isLoggedIn,
        });
      },
      onUploadComplete: oembed => {
        unblockUnload();
        options?.onUploadComplete?.(oembed);
        analytics.track(SDK_UPLOAD_COMPLETED_V2, {
          ...withIdentifiers(
            SDK_UPLOAD_COMPLETED_V2,
            AnalyticsEntityId.video(oembed.id, 'videoId')
          ),
          source: options.source,
          videoUrl: oembed.sharedUrl,
        });
        incrementMetric('recorder.upload_complete', {
          recorder_type: SDK,
          source: options.source,
          isLoggedIn: options.isLoggedIn,
        });
      },
    },
  });
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const startSDKRecording = async options => {
  const { supported: isSDKSupported } = await isSdkSupported();

  if (isSDKSupported) {
    await setupSDK(options);
    analytics.track(RECORDER_INITIATED_V2, {
      source: options.source,
      recorder_type: SDK,
    });
    incrementMetric('recorder.initiate', {
      recorder_type: SDK,
      source: options.source,
      isLoggedIn: options.isLoggedIn,
    });
    sdkButton.openPreRecordPanel();

    return true;
  }

  return false;
};
