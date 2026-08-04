/* eslint-disable no-console */
import React, {
  useState,
  useMemo,
  useEffect,
  createContext,
  ReactNode,
  useCallback,
} from 'react';

import {
  MarkersForTriggers,
  TriggerNames,
  TriggersWithMarkers,
} from './constants';
import {
  reportTriggerCancelled,
  reportTriggerEnds,
  reportTriggerStarts,
  reportingMarkerUpdated,
} from './reporting';

import { RUMTrigger, CancelType, RUMTriggerExtraProps } from './types';

import * as logger from '@js/utilities/loggerx';

const DEFAULT_MARKER_DURATION = -1;

interface TriggerContextState {
  start: ({
    name,
    properties,
  }: {
    name: TriggerNames;
    properties?: RUMTriggerExtraProps;
  }) => void;
  markSuccess: (event: MarkersForTriggers) => void;
  getActiveTrigger: () => RUMTrigger | null;
}

interface TriggerContextProviderProps {
  children: ReactNode;
}

type MarkerResults = {
  [K in MarkersForTriggers]: number;
};

export const TriggerContext = createContext<TriggerContextState>({
  start: () => {
    logger.debug('start function not set');
  },
  markSuccess: () => {
    logger.debug('track function not set');
  },
  getActiveTrigger: () => {
    logger.debug('getActiveTrigger function not set');

    return null;
  },
});

export const useTriggerContext = (): TriggerContextState => {
  const trigger = React.useContext(TriggerContext);

  return trigger;
};

const TRIGGER_TIMEOUT = 30000;

export const TriggerProvider: React.FC<
  React.PropsWithChildren<TriggerContextProviderProps>
> = ({ children }) => {
  const [activeTrigger, setActiveTrigger] = useState<RUMTrigger | null>(null);
  const [activeMarkerList, setActiveMarkerList] = useState<
    MarkerResults | Record<string, never>
  >({});
  const [shouldCancelTrigger, setShouldCancelTrigger] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [successfulTriggers, setSuccessfulTriggers] = useState<TriggerNames[]>(
    []
  );

  const cancelTrigger = useCallback(
    (reason: CancelType) => {
      if (!activeTrigger) {
        return;
      }

      activeTrigger.timestamp = window.performance.now();
      reportTriggerCancelled({ trigger: activeTrigger }, reason);

      setActiveTrigger(null);
      setActiveMarkerList({});
      setShouldCancelTrigger(false);
    },
    [activeTrigger]
  );

  useEffect(() => {
    if (activeTrigger && verifyTriggerSuccess()) {
      end();
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMarkerList]);

  const populateDefaultState = (trigger: RUMTrigger) => {
    const expectedMarkers = TriggersWithMarkers[trigger.name] || [];
    const list = {};

    // by default, the duration is -1
    for (const marker of expectedMarkers) {
      list[marker] = DEFAULT_MARKER_DURATION;
    }

    setActiveMarkerList(list);
  };

  const verifyTriggerSuccess = () => {
    if (activeTrigger && activeMarkerList) {
      const expectedMarkers = TriggersWithMarkers[activeTrigger.name] || [];

      for (const marker of expectedMarkers) {
        if (activeMarkerList[marker] === DEFAULT_MARKER_DURATION) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  useEffect(() => {
    if (shouldCancelTrigger) {
      cancelTrigger(CancelType.TIMEOUT);
    }
  }, [shouldCancelTrigger, cancelTrigger]);

  // TODO(next author): Please update this hook to fix dependency issue
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const start = useCallback(
    ({
      name,
      properties,
    }: {
      name: TriggerNames;
      properties?: RUMTriggerExtraProps;
    }) => {
      // cancel current trigger before starting new one
      if (activeTrigger) {
        cancelTrigger(CancelType.NEW_TRIGGER);
      }

      const now = window.performance.now();
      const trigger: RUMTrigger = { name, timestamp: now, properties: {} };

      if (properties) {
        trigger.properties = properties;
      }

      populateDefaultState(trigger);
      setActiveTrigger(trigger);
      reportTriggerStarts({ trigger });

      // initiate the timeout for cancellation
      const timeoutId = setTimeout(() => {
        setShouldCancelTrigger(true);
      }, TRIGGER_TIMEOUT);

      setTimeoutId(timeoutId);
    },
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const end = () => {
    const now = window.performance.now();

    if (activeTrigger) {
      const difference = now - activeTrigger.timestamp;
      const wasSuccessful = successfulTriggers.includes(activeTrigger.name);

      activeTrigger.timestamp = now;
      activeTrigger.duration = difference;
      activeTrigger.properties = {
        ...activeTrigger.properties,
        isInitialLoad: !wasSuccessful,
      };

      // reporting trigger and marker(s)
      reportTriggerEnds({ trigger: activeTrigger });

      for (const marker of Object.keys(activeMarkerList)) {
        reportingMarkerUpdated({
          name: marker as MarkersForTriggers,
          trigger: activeTrigger.name,
          duration: activeMarkerList[marker],
        });
      }

      setSuccessfulTriggers([...successfulTriggers, activeTrigger.name]);
      clearTimeout(timeoutId);
    }

    setActiveTrigger(null);
    setActiveMarkerList({});
  };

  const markSuccess = useCallback(
    (marker: MarkersForTriggers) => {
      // only mark success when the active trigger associates with the marker
      if (activeTrigger) {
        const markerIsAssociatedWithActiveTrigger = Boolean(
          TriggersWithMarkers[activeTrigger.name].find(e => e === marker)
        );

        if (markerIsAssociatedWithActiveTrigger) {
          const duration = window.performance.now() - activeTrigger.timestamp;

          setActiveMarkerList({
            ...(activeMarkerList as MarkerResults),
            [marker]: duration,
          });
        }
      }
    },
    [activeMarkerList, activeTrigger]
  );

  const getActiveTrigger = useCallback(() => {
    return activeTrigger;
  }, [activeTrigger]);

  const triggerContext = useMemo(
    () => ({ start, markSuccess, getActiveTrigger }),
    [start, markSuccess, getActiveTrigger]
  );

  return (
    <TriggerContext.Provider value={triggerContext}>
      {children}
    </TriggerContext.Provider>
  );
};
