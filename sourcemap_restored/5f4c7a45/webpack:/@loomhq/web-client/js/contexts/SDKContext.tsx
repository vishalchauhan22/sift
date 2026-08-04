// TODO(tatiana): Move into common/sdk folder
// Checks if user is eligible for SDK and stores value.

import { SDK_BROWSER_COMPATIBILITY_TEST_FAILED } from '@js/constants/events';

import { useMount } from '@js/hooks/useMount';
import { isSdkSupported as importedIsSdkSupported } from '@js/pages/share/common/sdk/isSdkSupported';
import React, { createContext, useContext, useState } from 'react';

import uaParser from 'ua-parser-js';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../utilities/analytics/attribute-transformer';

type SDKSupportContextType = {
  isSDKSupported: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sdkNotSupportedReason?: any;
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const SDKSupportContext = createContext<SDKSupportContextType>({
  isSDKSupported: false,
});

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const useSDKSupport = (): SDKSupportContextType => {
  const context = useContext(SDKSupportContext);

  if (!context) {
    logger.warning('useSDKSupport must be used within a SDKSupportProvider', {
      feature: Feature.SDKRecorder,
    });
  }

  return context;
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const SDKSupportProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isSDKSupported, setIsSDKSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sdkNotSupportedReason, setSDKNotSupportedReason] = useState<any>();
  let videoId;

  const currentUrl = window.location.toString();

  if (currentUrl.includes('/share')) {
    videoId = currentUrl.slice(currentUrl.lastIndexOf('-') + 1);
  }

  useMount(() => {
    let isCanceled = false;

    (async () => {
      const { supported, error } = await importedIsSdkSupported();

      if (!supported) {
        const parser = new uaParser();
        const uaDetails = parser.getResult();

        analytics.track(SDK_BROWSER_COMPATIBILITY_TEST_FAILED, {
          ...withIdentifiers(
            SDK_BROWSER_COMPATIBILITY_TEST_FAILED,
            AnalyticsEntityId.video(videoId, 'videoId')
          ),
          browserName: uaDetails?.browser?.name,
          browserVersion: uaDetails?.browser?.version,
          osName: uaDetails?.os?.name,
          osVersion: uaDetails?.os?.version,
          sdkNotSupportedReason,
          userAgent: uaDetails?.ua,
        });
      }

      if (!isCanceled) {
        setIsSDKSupported(supported);
        setSDKNotSupportedReason(error);
      }
    })();

    return () => {
      isCanceled = true;
    };
  });

  const contextValue: SDKSupportContextType = {
    isSDKSupported,
    sdkNotSupportedReason,
  };

  return (
    <SDKSupportContext.Provider value={contextValue}>
      {children}
    </SDKSupportContext.Provider>
  );
};
