import {
  type OperationalEventPayload,
  type ScreenEventPayload,
  type TrackEventPayload,
  type UIEventPayload,
} from '@atlassiansox/analytics-web-client/dist/types/types';
import { useCallback } from 'react';

import { getAtlassianAnalyticsClient } from './get-analytics-client';

export const useAnalytics = (): {
  sendScreenEvent: (options: ScreenEventPayload) => Promise<void>;
  sendUiEvent: (options: UIEventPayload) => Promise<void>;
  sendTrackEvent: (options: TrackEventPayload) => Promise<void>;
  sendOperationalEvent: (options: OperationalEventPayload) => Promise<void>;
} => {
  const analyticsClient = getAtlassianAnalyticsClient();

  const sendScreenEvent = useCallback(
    (options: ScreenEventPayload) => {
      return analyticsClient.sendScreenEvent({
        ...options,
      });
    },
    [analyticsClient]
  );

  const sendUiEvent = useCallback(
    (options: UIEventPayload) => {
      return analyticsClient.sendUIEvent({
        ...options,
      });
    },
    [analyticsClient]
  );

  const sendTrackEvent = useCallback(
    (options: TrackEventPayload) => {
      return analyticsClient.sendTrackEvent({
        ...options,
      });
    },
    [analyticsClient]
  );

  const sendOperationalEvent = useCallback(
    (options: OperationalEventPayload) => {
      return analyticsClient.sendOperationalEvent({
        ...options,
      });
    },
    [analyticsClient]
  );

  return {
    sendScreenEvent,
    sendUiEvent,
    sendTrackEvent,
    sendOperationalEvent,
  };
};
