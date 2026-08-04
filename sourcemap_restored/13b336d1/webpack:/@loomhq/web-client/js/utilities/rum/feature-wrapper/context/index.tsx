import { PageContext } from '@js/common/context/page';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import * as loggerX from '@js/utilities/loggerx';
import { reportFeatureEvent } from '@js/utilities/rum/reporting';

import { FeatureInfo } from '@loomhq/shared-utilities/constants/product';

import { FeatureEvents } from '../constants';

export const FeatureLoadContext = createContext<
  (ref: React.RefObject<HTMLElement>) => void
>(() => {
  loggerX.debug(
    'FeatureLoadContext must be used within the context of FeatureWrapper.',
    {}
  );
});

interface FeatureLoadContextProviderProps {
  children: ReactNode;
  feature: FeatureInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalLoggingValues?: Record<string, any>;
}

const REPORT_RERENDER_COUNTS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200,
];
const DELAY_INTERVAL_MS = 100; // If no activity for this interval, consider loaded. Not a perfect solution, but should handle most cases

// Watches DOM mutations for any changes within DELAY_INTERVAL_MS.
// If any mutations occur within that timeframe, component is not considered
// loaded yet. Once no intervals occur within interval, component is considered loaded.
// Crude way of measurement, but functional for our needs.
const handleMutations = (
  mutationsList,
  observer,
  isFirstLoad,
  timerId,
  feature,
  loggingValues
) => {
  if (!mutationsList || mutationsList.length === 0) {
    // Accounts for if mutations list is empty
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      clearTimeout(timerId.current);
      timerId.current = null;
      reportFeatureEvent(FeatureEvents.LOADED, feature, {
        loggingValues,
      });
    }
  } else {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Clear any existing timer
        if (timerId.current) {
          clearTimeout(timerId.current);
        }

        // Start a new timer
        timerId.current = setTimeout(() => {
          if (isFirstLoad.current) {
            isFirstLoad.current = false;
            observer.disconnect();
            timerId.current = null; // Clear the timerId post-execution
            // Accounts for if handleMutations is never triggered
            reportFeatureEvent(FeatureEvents.LOADED, feature, {
              loggingValues,
            });
          }
        }, DELAY_INTERVAL_MS);
      }
    }
  }
};

const handleRerenderCount = (rerenderCount, feature, loggingValues) => {
  rerenderCount.current++;

  if (REPORT_RERENDER_COUNTS.includes(rerenderCount.current)) {
    reportFeatureEvent(FeatureEvents.RERENDERED, feature, {
      rerenderCount: rerenderCount.current,
      ...loggingValues,
    });
  }
};

export const FeatureLoadContextProvider = ({
  children,
  feature,
  additionalLoggingValues,
}: FeatureLoadContextProviderProps): JSX.Element | null => {
  const rerenderCount = useRef(0);
  const isFirstLoad = useRef(true);
  const timerId = useRef<number | null>(null);

  const pageContext = useContext(PageContext);

  const loggingValues = useMemo(() => {
    return pageContext
      ? { ...pageContext.defaultLoggingValues, ...additionalLoggingValues }
      : additionalLoggingValues;
  }, [pageContext, additionalLoggingValues]);

  // To prevent re-renders in hooks below
  const loggingValuesRef = useRef(loggingValues);

  // We use useLayoutEffect here because we want this to run synchronously after React DOM mutations so it comes before the child's FeatureEvents.LOADED
  useLayoutEffect(() => {
    reportFeatureEvent(
      FeatureEvents.STARTED,
      feature,
      loggingValuesRef.current
    );
  }, [feature]);

  const onLoadSuccess = useCallback(
    (ref: React.RefObject<HTMLElement>) => {
      const observer = new MutationObserver((mutationsList, observer) => {
        handleMutations(
          mutationsList,
          observer,
          isFirstLoad,
          timerId,
          feature,
          loggingValuesRef.current
        );
      });

      timerId.current = window.setTimeout(() => {
        if (isFirstLoad.current) {
          isFirstLoad.current = false;
          observer.disconnect();
          timerId.current = null;
          // No mutations were observed, so we can report loaded
          reportFeatureEvent(
            FeatureEvents.LOADED,
            feature,
            loggingValuesRef.current
          );
        }
      }, DELAY_INTERVAL_MS);

      if (ref.current) {
        observer.observe(ref.current, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      if (!isFirstLoad.current) {
        handleRerenderCount(rerenderCount, feature, loggingValuesRef.current);
      }

      return () => {
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }

        observer.disconnect();
      };
    },
    [feature]
  );

  if (pageContext === undefined) {
    loggerX.debug(
      'PageContext must be used within the context of PageContextProvider.',
      {}
    );

    return null;
  }

  return (
    <FeatureLoadContext.Provider value={onLoadSuccess}>
      {children}
    </FeatureLoadContext.Provider>
  );
};

// TODO(wap): Update Lens Container ref type.
// It's over declaring options so we have to
// add this here to use the refHandler
type DOMElement = HTMLElement | HTMLDivElement | HTMLSpanElement;

export function useFeatureWrapper<T extends DOMElement = HTMLDivElement>(
  externalRef?: React.Ref<T>,
  customLoadedCheck?: () => boolean
): {
  featureLoadedRef: (node: T | null) => void;
  logFeatureLoadedAsExpected: () => void;
  reportError: (feature: FeatureInfo, error: Error) => void;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const internalRef = useRef<T | null>(null as any);
  const logFeatureLoadedAsExpected = useContext(FeatureLoadContext);

  const mergeRefs = useCallback(
    (node: T | null) => {
      internalRef.current = node;

      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef && 'current' in externalRef) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (externalRef as any).current = node;
      }
    },
    [externalRef]
  );

  useEffect(() => {
    if (customLoadedCheck?.()) {
      logFeatureLoadedAsExpected(internalRef);
    } else {
      logFeatureLoadedAsExpected(internalRef);
    }
  }, [customLoadedCheck, logFeatureLoadedAsExpected, internalRef]);

  const safeLogFeatureLoadedAsExpected = () => {
    if (logFeatureLoadedAsExpected) {
      logFeatureLoadedAsExpected(internalRef);
    } else {
      loggerX.debug('logFeatureLoadedAsExpected is not defined', {});
    }
  };
  const reportError = (feature: FeatureInfo, error: Error): void => {
    reportFeatureEvent(FeatureEvents.ERRORED, feature, {
      error,
    });
  };

  return {
    featureLoadedRef: mergeRefs,
    logFeatureLoadedAsExpected: safeLogFeatureLoadedAsExpected,
    reportError,
  };
}
