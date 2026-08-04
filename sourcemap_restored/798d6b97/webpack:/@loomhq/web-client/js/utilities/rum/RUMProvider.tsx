import { isDev } from '@js/constants/environment';

import { ErrorSeverities } from '@js/constants/error-severities';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';

import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { TriggerProvider } from './TransitionTimer';
import { RUMContext } from './context';
import {
  reportDuplicateSuccessMarker,
  reportErrorMarker,
  reportMarkerTimeout,
  reportPageLoadFail,
  reportPageLoadSuccess,
  reportRUMInit,
  reportSuccessMarker,
  RUMReportingContext,
} from './reporting';
import {
  pageFailureReported,
  markError,
  RUMReducer,
  buildInitialState,
  timeoutsReported,
  pageSuccessReported,
  markSuccess,
  initReported,
} from './slice';
import { FailType, MarkerName, RUMMark, RUMMarkSuccess } from './types';
import { useDetectClockDrift } from './useDetectClockDrift';
import { usePageWasEverHidden } from './visibility';

interface Props<T extends undefined | RUMReportingContext> {
  pageName: string; // This should be a unique name for the page
  expectedMarkers: MarkerName[]; // These are the markers that are expected to be reported for the page to be considered successfully loaded
  optionalMarkers?: MarkerName[]; // These are markers that may or may not appear on the page, but should be recorded if we see them
  timeoutMs: number; // The timeout for detecting missing expectedMarkers
  extraReportingContext: T; // Extra context to be included in all RUM actions
  children: ReactNode;
}

// Decrease dev timeout to 15s instead of 30s
const DEFAULT_TIMEOUT_MS = isDev ? 15000 : 30000;
// RUM Marker docs: https://www.notion.so/loom/Setting-up-RUM-Real-User-Monitoring-769c269fce7a44abb0706a1067ff4ab9?pvs=4#299c254fca434cbfa835d6cd2dbb1077
// NOTE: If the avserver fails, certain video markers will timeout since they never complete
const RUM_MARKER_ERROR =
  'Your code changes may cause issues with RUM data collection in prod. Ensure [1] your avserver is running and [2] all expected RUM markers load properly before this code is shipped.';

// Broken out into a constant to keep this referentially stable
const DEFAULT_OPTIONAL_MARKERS = [];

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const RUMProvider = <T extends RUMReportingContext>({
  pageName,
  expectedMarkers,
  optionalMarkers = DEFAULT_OPTIONAL_MARKERS,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  extraReportingContext,
  children,
}: Props<T>): ReactElement => {
  const rumInitAt = useMemo<DOMHighResTimeStamp>(() => performance.now(), []);
  const pageWasEverHidden = usePageWasEverHidden();
  const [hasClockDrifted, setHasClockDrifted] = useState(false);
  const getClockHasDrifted = useDetectClockDrift();
  const extraReportingData = useRef({
    pageWasEverHidden,
    ...(extraReportingContext ?? {}),
  });

  useEffect(() => {
    extraReportingData.current = {
      pageWasEverHidden,
      hasClockDrifted,
      ...(extraReportingContext ?? {}),
    };
  }, [extraReportingContext, hasClockDrifted, pageWasEverHidden]);

  const [rumState, dispatch] = useReducer(RUMReducer, buildInitialState());

  const {
    hasReportedInit,
    hasReportedFailure,
    hasReportedTimeouts,
    hasReportedSuccess,
    errors,
    allSuccessMarks,
    reportableSuccessMarks,
  } = rumState;
  const missingMarkers = expectedMarkers.filter(
    markerName => !reportableSuccessMarks[markerName]
  );

  const lastReportedSuccessMarkIndex = useRef<number>(-1);

  // Initial rum action
  useLayoutEffect(() => {
    if (!hasReportedInit) {
      dispatch(initReported);
      reportRUMInit<T>({
        pageName,
        timestamp: rumInitAt,
        ...extraReportingData.current,
      });
    }
  }, [hasReportedInit, pageName, rumInitAt]);

  // Report page load failure once if there are any errors
  useEffect(() => {
    if (!hasReportedFailure && errors.length) {
      reportPageLoadFail<T>({
        pageName,
        timestamp: errors[0].markedAt,
        failType: errors[0].failType,
        ...extraReportingData.current,
      });
      dispatch(pageFailureReported);
    }
  }, [errors, hasReportedFailure, pageName]);

  const reportSuccessMark = useCallback(
    (mark: RUMMarkSuccess) => {
      if (
        reportableSuccessMarks[mark.name] &&
        reportableSuccessMarks[mark.name] !== mark
      ) {
        reportDuplicateSuccessMarker<T>({
          pageName,
          mark,
          ...extraReportingData.current,
        });
      } else {
        reportSuccessMarker<T>({
          pageName,
          mark,
          ...extraReportingData.current,
        });
      }
    },
    [pageName, reportableSuccessMarks]
  );

  // Report a success marker
  useEffect(() => {
    if (allSuccessMarks.length) {
      // Get all the success marks that have not been reported yet by slicing the array for every entry after the last reported success mark
      const unreportedSuccessMarks = allSuccessMarks.slice(
        lastReportedSuccessMarkIndex.current + 1
      );
      for (const successMark of unreportedSuccessMarks) {
        reportSuccessMark(successMark);
      }

      lastReportedSuccessMarkIndex.current = allSuccessMarks.length - 1;
    }
  }, [allSuccessMarks, reportSuccessMark]);

  // Report page load success one time if no expected markers are missing and there are no errors
  useEffect(() => {
    if (!hasReportedSuccess && !missingMarkers.length && !errors.length) {
      const slowestMarkAt = Math.max(
        ...Object.values(reportableSuccessMarks)
          .filter(mark => !mark.isOptional)
          .map(mark => mark.markedAt)
      );

      reportPageLoadSuccess<T>({
        pageName,
        timestamp: slowestMarkAt,
        ...extraReportingData.current,
      });
      dispatch(pageSuccessReported);
    }
  }, [
    errors.length,
    hasReportedSuccess,
    missingMarkers.length,
    pageName,
    reportableSuccessMarks,
  ]);

  const onMarkerSuccess = useCallback(
    (mark: RUMMark) => {
      if (expectedMarkers.includes(mark.name)) {
        // This is async so that multiple marks that render at the same time each trigger independent state updates
        Promise.resolve().then(() => {
          dispatch(markSuccess({ ...mark, isOptional: false }));
        });
      } else if (optionalMarkers.includes(mark.name)) {
        // This is async so that multiple marks that render at the same time each trigger independent state updates
        Promise.resolve().then(() => {
          dispatch(markSuccess({ ...mark, isOptional: true }));
        });
      }
    },
    [expectedMarkers, optionalMarkers]
  );

  const { showErrorBar } = useErrorBar();

  const onMarkerError = useCallback(
    (mark: RUMMark, error?: Error) => {
      dispatch(markError({ ...mark, failType: FailType.ERROR_MARKER }));

      if (isDev) {
        showErrorBar({
          message: RUM_MARKER_ERROR,
          severity: ErrorSeverities.ERROR,
        });
      }

      reportErrorMarker<T>({
        pageName,
        mark,
        ...extraReportingData.current,
        error,
      });
    },
    [pageName, showErrorBar]
  );

  const rumContextValue = useMemo(
    () => ({
      markSuccess: onMarkerSuccess,
      markError: onMarkerError,
    }),
    [onMarkerError, onMarkerSuccess]
  );

  // Manage the timeout for detecting missing markers
  useEffect(() => {
    if (!hasReportedTimeouts && !hasReportedSuccess) {
      const timeoutAt = timeoutMs - window.performance.now();
      const timeoutId = setTimeout(() => {
        // If the clock has drifted then we don't want to report a timeout
        if (getClockHasDrifted() && !hasClockDrifted) {
          setHasClockDrifted(true);
        } else {
          const now = window.performance.now();

          missingMarkers.forEach(markerName => {
            reportMarkerTimeout<T>({
              pageName,
              mark: {
                name: markerName,
                markedAt: now,
              },
              ...extraReportingData.current,
            });
            dispatch(
              markError({
                name: markerName,
                markedAt: now,
                failType: FailType.TIMEOUT,
              })
            );

            if (isDev) {
              showErrorBar({
                message: RUM_MARKER_ERROR,
                severity: ErrorSeverities.INTERNAL,
              });
            }
          });

          dispatch(timeoutsReported);
        }
      }, timeoutAt);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [
    getClockHasDrifted,
    hasClockDrifted,
    hasReportedSuccess,
    hasReportedTimeouts,
    missingMarkers,
    pageName,
    showErrorBar,
    timeoutMs,
  ]);

  return (
    <RUMContext.Provider value={rumContextValue}>
      <TriggerProvider>{children}</TriggerProvider>
    </RUMContext.Provider>
  );
};
