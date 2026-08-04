import OriginTracer from '@atlassiansox/origin-tracing';
import { useCallback } from 'react';

import { getAtlassianAnalyticsClient } from './get-analytics-client';

export const useSendButtonRequestUpgrade = (
  source: string,
  action: string,
  actionSubject: string,
  cloudId?: string,
  attributes?: unknown
): (() => void) => {
  const analyticsClient = getAtlassianAnalyticsClient();
  const TIMEOUT = 1000;
  return useCallback(async () => {
    const origin = new OriginTracer({ product: 'loom' });

    const event = {
      source,
      action,
      actionSubject,
      attributes: {
        ...(attributes ? attributes : {}),
        application: 'loom',
        ...origin.toAnalyticsAttributes({ hasGeneratedId: true }),
      },
      ...(cloudId && { tenantId: cloudId, tenantIdType: 'cloudId' }),
    };
    analyticsClient.sendTrackEvent(event);
    await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  }, [source, action, actionSubject, cloudId, attributes, analyticsClient]);
};
