import {
  type GenericAnalyticWebClientInstance,
  init,
} from '@atlaskit/react-ufo/interaction-metrics-init';

import { getAtlassianAnalyticsClient } from '@js/common/analytics';
import { emitDatadogEvents } from './emitDatadogEvents';

function getAnalyticsClient(): Promise<GenericAnalyticWebClientInstance> {
  const analyticsClient = getAtlassianAnalyticsClient();
  const interceptEventAndSendToDatadog: GenericAnalyticWebClientInstance['sendOperationalEvent'] =
    event => {
      emitDatadogEvents(event);
      return analyticsClient.sendOperationalEvent(event);
    };

  return Promise.resolve({
    ...analyticsClient,
    sendOperationalEvent: interceptEventAndSendToDatadog,
  });
}

type InitConfig = {
  enableTtvc?: boolean;
};

export function initUFO(initConfig: InitConfig = { enableTtvc: false }): void {
  // TTVC Config is not enabled by default to prevent possible
  // UGC / PII leakage as DOM attributes are captured
  const ttvcConfig = {
    vc: {
      enabled: true,
      heatmapSize: 200,
      oldDomUpdates: false,
      devToolsEnabled: true,

      // Account for possible UGC/PII in DOM attributes here
      selectorConfig: {
        id: false,
        role: true,
        className: true,
        testId: true,
      },
    },
  };

  const enableTtvc = Boolean(initConfig.enableTtvc);

  const config = {
    product: 'loom',
    region: 'unknown', // e.g. stg-apse, stg-east, prod-west2, but since loom is not hosted on Micros, this is unknown
    kind: {
      page_load: 1,
      transition: 1,
      press: 1,
      typing: 0,
      legacy: 0,
      hover: 0,
    },
    // if the enableTtvc is true, we want to add the ttvcConfig to the config
    ...(enableTtvc ? ttvcConfig : {}),
  };

  // should we only add this for the hello workspace?

  // Only run this on dev or staging
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging'
  ) {
    init(getAnalyticsClient(), config);
  }
}
