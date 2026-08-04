import { useCallback, useRef } from 'react';

const CLOCK_DRIFT_THRESHOLD_MILLIS = 1000;

/**
 * window.performance uses a monotonically increasing clock, but on some systems it can drift from the system clock.
 * This tends to happen on Windows systems that have been suspended / hibernated / slept. This presents as the Date
 * clock measuring a different span of time than the perfomance clock and can result in timeouts, like for RUM or
 * Webpack chunk loads that seemingly trigger early when measured via performance.now(). This hook records a starting
 * date time and performance time and returns a callback that can be used to determine if the clocks have drifted
 * apart. Ideally this callback is used called in time dependent code, like in a setTimeout or setInterval to determine
 * if we need to reset the interval or timeout.
 * @returns A function that returns true if the clock has drifted by more than CLOCK_DRIFT_THRESHOLD_MILLIS
 */
export const useDetectClockDrift = (): (() => boolean) => {
  const startDateTimeMillis = useRef(new Date().getTime());
  const startPerfTimeMillis = useRef(performance.now());

  const getHasClockDrifted = useCallback(() => {
    const nowDateTimeMillis = new Date().getTime();
    const nowPerfTimeMillis = performance.now();

    const dateTimeSpan = nowDateTimeMillis - startDateTimeMillis.current;
    const perfTimeSpan = nowPerfTimeMillis - startPerfTimeMillis.current;

    const clockDriftMillis = Math.abs(dateTimeSpan - perfTimeSpan);

    // Given we are checking for clock drift, we are running code and are good to now reset the start times
    startDateTimeMillis.current = nowDateTimeMillis;
    startPerfTimeMillis.current = nowPerfTimeMillis;

    return clockDriftMillis > CLOCK_DRIFT_THRESHOLD_MILLIS;
  }, []);

  return getHasClockDrifted;
};
